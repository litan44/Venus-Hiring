import { createFileRoute } from "@tanstack/react-router";
import { pool } from "@/lib/db";
import { initCareerDatabase } from "@/lib/careers/schema";
import {
  submitApplicantToVenusCRM,
  type CandidateApplicationPayload,
} from "@/lib/careers/crm-client";
import { sendApplicationNotificationEmail } from "@/lib/careers/email-service";

// In-memory rate-limiting and deduplication cache (60s TTL)
const recentSubmissions = new Map<string, { id: string; submittedAt: string; timestamp: number }>();

function cleanupDeduplicationCache() {
  const now = Date.now();
  for (const [key, item] of recentSubmissions.entries()) {
    if (now - item.timestamp > 60000) {
      recentSubmissions.delete(key);
    }
  }
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const Route = createFileRoute("/api/careers/applications")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await initCareerDatabase();
          const res = await pool.query(
            `SELECT 
              id, job_id AS "jobId", job_title AS "jobTitle",
              first_name AS "firstName", last_name AS "lastName",
              email, phone, location,
              current_title AS "currentTitle", current_company AS "currentCompany",
              experience_years AS "experienceYears",
              linkedin_url AS "linkedinUrl", portfolio_url AS "portfolioUrl",
              resume_file_name AS "resumeFileName", resume_file_size AS "resumeFileSize",
              resume_file_type AS "resumeFileType", resume_data_url AS "resumeDataUrl",
              is_resume_built_live AS "isResumeBuiltLive",
              cover_letter AS "coverLetter", internal_notes AS "internalNotes",
              consent_given AS "consentGiven", status, submitted_at AS "submittedAt"
            FROM career_applications ORDER BY submitted_at DESC;`
          );

          return new Response(JSON.stringify(res.rows), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          console.error("GET /api/careers/applications error:", err);
          return new Response(JSON.stringify({ error: "Failed to fetch applications" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },

      POST: async ({ request }) => {
        try {
          const body: CandidateApplicationPayload & { jobId?: string } = await request.json();
          const jobPostingId = (body.jobPostingId || body.jobId || "").trim();

          if (!body.email || !jobPostingId) {
            return new Response(JSON.stringify({ error: "Missing required fields (email, jobPostingId)" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Layer 1: In-memory deduplication cache (rapid double-click guard on same instance)
          cleanupDeduplicationCache();
          const dedupeKey = `${body.email.toLowerCase().trim()}_${jobPostingId}`;

          if (recentSubmissions.has(dedupeKey)) {
            const existing = recentSubmissions.get(dedupeKey)!;
            console.log(`[VENUS CRM] In-memory duplicate blocked for candidate ${body.email} on job ${jobPostingId}`);
            return new Response(
              JSON.stringify({
                success: true,
                duplicateBlocked: true,
                id: existing.id,
                submittedAt: existing.submittedAt,
                message: "Application already received. Processing your submission.",
              }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          // Layer 2: Persistent database-level idempotency guard (cross-instance duplicate protection)
          try {
            await initCareerDatabase();
            const existingRecent = await pool.query(
              `SELECT id, submitted_at AS "submittedAt" FROM career_applications
               WHERE LOWER(email) = LOWER($1) AND job_id = $2
                 AND submitted_at > NOW() - INTERVAL '60 seconds'
               LIMIT 1;`,
              [body.email.trim(), jobPostingId]
            );
            if (existingRecent.rows && existingRecent.rows.length > 0) {
              const row = existingRecent.rows[0];
              console.log(`[VENUS CRM] Database-level duplicate blocked for candidate ${body.email} on job ${jobPostingId}`);
              return new Response(
                JSON.stringify({
                  success: true,
                  duplicateBlocked: true,
                  id: row.id,
                  submittedAt: row.submittedAt,
                  message: "Application already received. Processing your submission.",
                }),
                {
                  status: 200,
                  headers: { "Content-Type": "application/json" },
                }
              );
            }
          } catch (dbCheckErr) {
            // Non-fatal if DB is temporarily unreachable; in-memory guard remains active
            console.warn("[VENUS CRM] DB duplicate check warning:", dbCheckErr);
          }

          let crmApplicantId: string | null = null;
          let uploadedResumeUrl: string | null = null;
          const isCrmJob = UUID_REGEX.test(jobPostingId);

          // 1. Submit applicant to Venus CRM if associated with a genuine CRM Job Posting UUID
          if (isCrmJob) {
            const crmResult = await submitApplicantToVenusCRM({
              ...body,
              jobPostingId,
              source: "VENUS_HIRING",
            });

            if (crmResult.success && crmResult.applicantId) {
              crmApplicantId = crmResult.applicantId;
              uploadedResumeUrl = crmResult.resumeUrl || null;
              console.log(`[VENUS CRM] Candidate successfully linked in CRM with ID: ${crmApplicantId}`);
            } else {
              console.warn(`[VENUS CRM] CRM submission fallback: ${crmResult.error}`);
            }
          } else {
            console.log(`[VENUS CRM] Job ID '${jobPostingId}' is non-CRM reference. Preserving in local system.`);
          }

          const id = crmApplicantId || `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
          const submittedAt = new Date().toISOString();

          // Record in deduplication cache
          recentSubmissions.set(dedupeKey, { id, submittedAt, timestamp: Date.now() });

          // 2. Persist locally to PostgreSQL database when available
          try {
            await initCareerDatabase();
            await pool.query(
              `INSERT INTO career_applications (
                id, job_id, job_title, first_name, last_name, email, phone, location,
                current_title, current_company, experience_years, linkedin_url, portfolio_url,
                resume_file_name, resume_file_size, resume_file_type, resume_data_url,
                is_resume_built_live, cover_letter, consent_given, status, submitted_at
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22);`,
              [
                id,
                body.jobId,
                body.jobTitle,
                body.firstName,
                body.lastName,
                body.email,
                body.phone,
                body.location || null,
                body.currentTitle || null,
                body.currentCompany || null,
                body.experienceYears,
                body.linkedinUrl || null,
                body.portfolioUrl || null,
                body.resumeFileName || null,
                body.resumeFileSize || null,
                body.resumeFileType || null,
                body.resumeDataUrl || null,
                body.isResumeBuiltLive || false,
                body.coverLetter || null,
                body.consentGiven !== undefined ? body.consentGiven : true,
                "New",
                submittedAt,
              ]
            );
          } catch (dbErr) {
            console.warn("Local PostgreSQL application insert warning:", dbErr);
          }

          // 3. Dispatch backup notification email
          sendApplicationNotificationEmail({
            id,
            jobId: body.jobId,
            jobTitle: body.jobTitle,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            location: body.location,
            currentTitle: body.currentTitle,
            currentCompany: body.currentCompany,
            experienceYears: body.experienceYears,
            linkedinUrl: body.linkedinUrl,
            portfolioUrl: body.portfolioUrl,
            resumeFileName: body.resumeFileName,
            resumeFileSize: body.resumeFileSize,
            resumeFileType: body.resumeFileType,
            resumeDataUrl: body.resumeDataUrl,
            coverLetter: body.coverLetter,
            submittedAt,
          }).catch((emailErr) => {
            console.error("[CAREER EMAIL] Notification error:", emailErr);
          });

          return new Response(
            JSON.stringify({
              success: true,
              crmCandidateId: crmApplicantId,
              crmApplicantId,
              id,
              submittedAt,
            }),
            {
              status: 201,
              headers: { "Content-Type": "application/json" },
            }
          );
        } catch (err) {
          console.error("POST /api/careers/applications error:", err);
          return new Response(JSON.stringify({ error: "Failed to submit application" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
