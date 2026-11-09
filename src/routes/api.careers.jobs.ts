import { createFileRoute } from "@tanstack/react-router";
import { pool } from "@/lib/db";
import { initCareerDatabase } from "@/lib/careers/schema";
import { fetchCrmJobs, fetchCrmJob } from "@/lib/careers/crm-client";
import { MOCK_JOBS } from "@/components/careers/mockJobs";

function safeParseArray(val: unknown): string[] {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [val];
    } catch {
      return [val];
    }
  }
  return [];
}

function verifyAdminAuth(request?: Request): boolean {
  if (!request) return false;
  try {
    const authHeader = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "")?.trim();
    if (!authHeader) return false;

    const expectedSecret =
      process.env.VITE_CAREER_ADMIN_PASSWORD ||
      process.env.CAREER_ADMIN_PASSWORD ||
      "VenusAdmin2025!";
    const webhookSecret =
      process.env.CAREERS_WEBHOOK_SECRET ||
      process.env.VENUS_HIRING_WEBHOOK_SECRET;

    if (authHeader === expectedSecret) return true;
    if (webhookSecret && authHeader === webhookSecret) return true;

    return false;
  } catch {
    return false;
  }
}

export const Route = createFileRoute("/api/careers/jobs")({
  server: {
    handlers: {
      GET: async ({ request }: { request?: Request }) => {
        // Support single-job lookup via ?slug= or ?id=
        const url = request ? new URL(request.url) : null;
        const querySlug = url?.searchParams.get("slug") || url?.searchParams.get("id");
        const isAdmin =
          (url?.searchParams.get("admin") === "true" ||
            url?.searchParams.get("all") === "true") &&
          verifyAdminAuth(request);

        if (querySlug) {
          const normalized = querySlug.trim().toLowerCase();

          // 1. Try Venus CRM lookup
          try {
            const singleJob = await fetchCrmJob(querySlug);
            if (singleJob) {
              console.log(`[VENUS CRM] Fetched single live job '${singleJob.title}' (${singleJob.id})`);
              return new Response(JSON.stringify(singleJob), {
                headers: {
                  "Content-Type": "application/json",
                  "X-Jobs-Source": "crm",
                },
              });
            }
          } catch (err) {
            console.warn(`[VENUS CRM] Single job query failed for '${querySlug}':`, err);
          }

          // 2. Query PostgreSQL database for manual jobs
          try {
            await initCareerDatabase();
            const res = await pool.query(
              `SELECT 
                id, title, slug, department, location,
                employment_type AS "employmentType",
                experience_level AS "experienceLevel",
                work_mode AS "workMode",
                salary_range AS "salaryRange",
                description, about_role AS "aboutRole",
                responsibilities, qualifications, nice_to_have AS "niceToHave",
                benefits, status, posted_date AS "postedDate", created_at AS "createdAt"
              FROM career_jobs 
              WHERE LOWER(slug) = $1 OR LOWER(id) = $1
              LIMIT 1;`,
              [normalized]
            );

            if (res.rows && res.rows.length > 0) {
              const row = res.rows[0];
              const formatted = {
                ...row,
                workMode: row.workMode || "Hybrid",
                responsibilities: safeParseArray(row.responsibilities),
                qualifications: safeParseArray(row.qualifications),
                niceToHave: safeParseArray(row.niceToHave),
                benefits: safeParseArray(row.benefits),
                source: "database" as const,
              };

              console.log(`[DATABASE] Found manual job '${formatted.title}' (${formatted.id})`);
              return new Response(JSON.stringify(formatted), {
                headers: {
                  "Content-Type": "application/json",
                  "X-Jobs-Source": "database",
                },
              });
            }
          } catch (dbErr: any) {
            console.warn("[DATABASE] Single job query failed:", dbErr?.message || dbErr);
          }

          // 3. Fallback check in mock jobs
          const mockMatch = MOCK_JOBS.find(
            (j) =>
              (j.slug || "").toLowerCase() === normalized ||
              (j.id || "").toLowerCase() === normalized
          );
          if (mockMatch) {
            return new Response(
              JSON.stringify({ ...mockMatch, source: "mock_fallback" as const }),
              {
                headers: {
                  "Content-Type": "application/json",
                  "X-Jobs-Source": "mock_fallback",
                },
              }
            );
          }

          return new Response(JSON.stringify({ error: "Job not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }

        // ==================== LIST QUERY ====================
        // 1. Fetch live jobs from Venus CRM
        let liveCrmJobs: any[] = [];
        try {
          const crmRes = await fetchCrmJobs();
          if (Array.isArray(crmRes) && crmRes.length > 0) {
            liveCrmJobs = crmRes;
            console.log(`[VENUS CRM] Retrieved ${liveCrmJobs.length} live job(s) from Venus CRM.`);
          }
        } catch (crmErr: any) {
          console.warn("[VENUS CRM] Venus CRM API unreachable, relying on database jobs:", crmErr?.message || crmErr);
        }

        // 2. Fetch jobs from PostgreSQL database
        let dbJobs: any[] = [];
        try {
          await initCareerDatabase();
          const queryText = isAdmin
            ? `SELECT 
                id, title, slug, department, location,
                employment_type AS "employmentType",
                experience_level AS "experienceLevel",
                work_mode AS "workMode",
                salary_range AS "salaryRange",
                description, about_role AS "aboutRole",
                responsibilities, qualifications, nice_to_have AS "niceToHave",
                benefits, status, posted_date AS "postedDate", created_at AS "createdAt"
              FROM career_jobs ORDER BY created_at DESC;`
            : `SELECT 
                id, title, slug, department, location,
                employment_type AS "employmentType",
                experience_level AS "experienceLevel",
                work_mode AS "workMode",
                salary_range AS "salaryRange",
                description, about_role AS "aboutRole",
                responsibilities, qualifications, nice_to_have AS "niceToHave",
                benefits, status, posted_date AS "postedDate", created_at AS "createdAt"
              FROM career_jobs 
              WHERE status = 'Published' OR status IS NULL
              ORDER BY created_at DESC;`;

          const res = await pool.query(queryText);
          if (res.rows && res.rows.length > 0) {
            dbJobs = res.rows.map((row) => ({
              ...row,
              workMode: row.workMode || "Hybrid",
              responsibilities: safeParseArray(row.responsibilities),
              qualifications: safeParseArray(row.qualifications),
              niceToHave: safeParseArray(row.niceToHave),
              benefits: safeParseArray(row.benefits),
              source: "database" as const,
            }));
            console.log(`[DATABASE] Retrieved ${dbJobs.length} manual/database job(s) from PostgreSQL.`);
          }
        } catch (dbErr: any) {
          console.warn("[DATABASE] PostgreSQL query failed:", dbErr?.message || dbErr);
        }

        // 3. Merge CRM jobs and Database jobs without duplicates
        const combined: any[] = [];
        const seenIds = new Set<string>();
        const seenSlugs = new Set<string>();

        const addJob = (job: any) => {
          const normId = (job.id || "").toLowerCase().trim();
          const normSlug = (job.slug || "").toLowerCase().trim();
          if (normId && seenIds.has(normId)) return false;
          if (normSlug && seenSlugs.has(normSlug)) return false;
          if (normId) seenIds.add(normId);
          if (normSlug) seenSlugs.add(normSlug);
          combined.push(job);
          return true;
        };

        // Live CRM postings take precedence if identical ID/slug exists
        for (const job of liveCrmJobs) {
          addJob(job);
        }

        // Add PostgreSQL manual jobs
        for (const job of dbJobs) {
          addJob(job);
        }

        // Sort: newest jobs first
        combined.sort((a, b) => {
          const timeA = a.createdAt
            ? new Date(a.createdAt).getTime()
            : a.postedDate === "Just now"
            ? Date.now()
            : 0;
          const timeB = b.createdAt
            ? new Date(b.createdAt).getTime()
            : b.postedDate === "Just now"
            ? Date.now()
            : 0;
          return timeB - timeA;
        });

        // 4. Fallback if both CRM and DB are empty
        if (combined.length === 0) {
          console.warn(`[MOCK FALLBACK] CRM and Database offline/empty. Serving ${MOCK_JOBS.length} fallback mock jobs.`);
          const taggedMocks = MOCK_JOBS.map((j) => ({ ...j, source: "mock_fallback" as const }));
          return new Response(JSON.stringify(taggedMocks), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "X-Jobs-Source": "mock_fallback",
            },
          });
        }

        const hasCrm = combined.some((j) => j.source === "crm");
        const hasDb = combined.some((j) => j.source === "database");
        const sourceHeader = hasCrm && hasDb ? "crm+database" : hasCrm ? "crm" : "database";

        return new Response(JSON.stringify(combined), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "X-Jobs-Source": sourceHeader,
          },
        });
      },

      POST: async ({ request }: { request?: Request }) => {
        if (!verifyAdminAuth(request)) {
          return new Response(
            JSON.stringify({ error: "Unauthorized. Administrative authorization required to create jobs." }),
            {
              status: 401,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        try {
          await initCareerDatabase();
          const body = await request.json();

          if (!body.title || !body.title.trim()) {
            return new Response(JSON.stringify({ error: "Job title is required" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          if (!body.description || !body.description.trim()) {
            return new Response(JSON.stringify({ error: "Job description is required" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const id = body.id || `job_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
          let finalSlug =
            (body.slug && body.slug.trim()) ||
            body.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)+/g, "");

          // Check if slug is already used by a DIFFERENT job to prevent accidental overrides
          try {
            const conflictCheck = await pool.query(
              "SELECT id FROM career_jobs WHERE slug = $1 AND id != $2 LIMIT 1;",
              [finalSlug, id]
            );
            if (conflictCheck.rows.length > 0) {
              finalSlug = `${finalSlug}-${Date.now().toString(36)}`;
            }
          } catch {
            // Non-fatal if table check fails
          }

          const postedDate = body.postedDate || "Just now";
          const status = body.status || "Published";
          const department = body.department || "Technology";
          const location = body.location || "Remote";
          const employmentType = body.employmentType || "Full-Time";
          const experienceLevel = body.experienceLevel || "Mid-Level";
          const workMode = body.workMode || "Hybrid";

          const insertSql = `INSERT INTO career_jobs (
            id, title, slug, department, location, employment_type, experience_level,
            salary_range, description, about_role, responsibilities, qualifications,
            nice_to_have, benefits, status, posted_date, work_mode
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            slug = EXCLUDED.slug,
            department = EXCLUDED.department,
            location = EXCLUDED.location,
            employment_type = EXCLUDED.employment_type,
            experience_level = EXCLUDED.experience_level,
            salary_range = EXCLUDED.salary_range,
            description = EXCLUDED.description,
            about_role = EXCLUDED.about_role,
            responsibilities = EXCLUDED.responsibilities,
            qualifications = EXCLUDED.qualifications,
            nice_to_have = EXCLUDED.nice_to_have,
            benefits = EXCLUDED.benefits,
            status = EXCLUDED.status,
            posted_date = EXCLUDED.posted_date,
            work_mode = EXCLUDED.work_mode
          RETURNING 
            id, title, slug, department, location,
            employment_type AS "employmentType",
            experience_level AS "experienceLevel",
            work_mode AS "workMode",
            salary_range AS "salaryRange",
            description, about_role AS "aboutRole",
            responsibilities, qualifications, nice_to_have AS "niceToHave",
            benefits, status, posted_date AS "postedDate", created_at AS "createdAt";`;

          const values = [
            id,
            body.title.trim(),
            finalSlug,
            department,
            location,
            employmentType,
            experienceLevel,
            body.salaryRange || null,
            body.description.trim(),
            body.aboutRole ? body.aboutRole.trim() : null,
            JSON.stringify(body.responsibilities || []),
            JSON.stringify(body.qualifications || []),
            JSON.stringify(body.niceToHave || []),
            JSON.stringify(body.benefits || []),
            status,
            postedDate,
            workMode,
          ];

          let result;
          try {
            result = await pool.query(insertSql, values);
          } catch (insertErr: any) {
            // Slug collision recovery: append unique suffix and retry
            if (insertErr.code === "23505" && insertErr.detail?.includes("slug")) {
              values[2] = `${finalSlug}-${Date.now().toString(36)}`;
              result = await pool.query(insertSql, values);
            } else {
              throw insertErr;
            }
          }

          const savedRow = result.rows[0];
          const formattedJob = savedRow
            ? {
                ...savedRow,
                workMode: savedRow.workMode || workMode,
                responsibilities: safeParseArray(savedRow.responsibilities),
                qualifications: safeParseArray(savedRow.qualifications),
                niceToHave: safeParseArray(savedRow.niceToHave),
                benefits: safeParseArray(savedRow.benefits),
                source: "database" as const,
              }
            : { id, slug: finalSlug, workMode, status, source: "database" as const };

          return new Response(
            JSON.stringify({
              success: true,
              id: formattedJob.id,
              slug: formattedJob.slug,
              job: formattedJob,
            }),
            {
              status: 201,
              headers: { "Content-Type": "application/json" },
            }
          );
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error("POST /api/careers/jobs error:", msg);
          return new Response(JSON.stringify({ error: msg || "Failed to create job" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },

      PUT: async ({ request }: { request?: Request }) => {
        if (!verifyAdminAuth(request)) {
          return new Response(
            JSON.stringify({ error: "Unauthorized. Administrative authorization required to update jobs." }),
            {
              status: 401,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        try {
          await initCareerDatabase();
          const body = await request.json();

          if (!body.id) {
            return new Response(JSON.stringify({ error: "Job ID is required" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const existingRes = await pool.query("SELECT * FROM career_jobs WHERE id = $1;", [body.id]);
          if (existingRes.rows.length === 0) {
            return new Response(JSON.stringify({ error: "Job not found" }), {
              status: 404,
              headers: { "Content-Type": "application/json" },
            });
          }

          const existing = existingRes.rows[0];

          const updatedTitle = body.title !== undefined ? body.title : existing.title;
          let updatedSlug = body.slug !== undefined ? body.slug : existing.slug;
          if (body.slug && body.slug !== existing.slug) {
            const conflictCheck = await pool.query(
              "SELECT id FROM career_jobs WHERE slug = $1 AND id != $2 LIMIT 1;",
              [body.slug, body.id]
            );
            if (conflictCheck.rows.length > 0) {
              updatedSlug = `${body.slug}-${Date.now().toString(36)}`;
            }
          }

          const updatedDepartment = body.department !== undefined ? body.department : existing.department;
          const updatedLocation = body.location !== undefined ? body.location : existing.location;
          const updatedEmploymentType = body.employmentType !== undefined ? body.employmentType : existing.employment_type;
          const updatedExperienceLevel = body.experienceLevel !== undefined ? body.experienceLevel : existing.experience_level;
          const updatedSalaryRange = body.salaryRange !== undefined ? body.salaryRange : existing.salary_range;
          const updatedDescription = body.description !== undefined ? body.description : existing.description;
          const updatedAboutRole = body.aboutRole !== undefined ? body.aboutRole : existing.about_role;
          const updatedResponsibilities = body.responsibilities !== undefined ? JSON.stringify(body.responsibilities) : existing.responsibilities;
          const updatedQualifications = body.qualifications !== undefined ? JSON.stringify(body.qualifications) : existing.qualifications;
          const updatedNiceToHave = body.niceToHave !== undefined ? JSON.stringify(body.niceToHave) : existing.nice_to_have;
          const updatedBenefits = body.benefits !== undefined ? JSON.stringify(body.benefits) : existing.benefits;
          const updatedStatus = body.status !== undefined ? body.status : existing.status;
          const updatedWorkMode = body.workMode !== undefined ? body.workMode : (existing.work_mode || "Hybrid");

          const updateRes = await pool.query(
            `UPDATE career_jobs SET
              title = $1,
              slug = $2,
              department = $3,
              location = $4,
              employment_type = $5,
              experience_level = $6,
              salary_range = $7,
              description = $8,
              about_role = $9,
              responsibilities = $10,
              qualifications = $11,
              nice_to_have = $12,
              benefits = $13,
              status = $14,
              work_mode = $15
            WHERE id = $16
            RETURNING 
              id, title, slug, department, location,
              employment_type AS "employmentType",
              experience_level AS "experienceLevel",
              work_mode AS "workMode",
              salary_range AS "salaryRange",
              description, about_role AS "aboutRole",
              responsibilities, qualifications, nice_to_have AS "niceToHave",
              benefits, status, posted_date AS "postedDate", created_at AS "createdAt";`,
            [
              updatedTitle,
              updatedSlug,
              updatedDepartment,
              updatedLocation,
              updatedEmploymentType,
              updatedExperienceLevel,
              updatedSalaryRange,
              updatedDescription,
              updatedAboutRole,
              updatedResponsibilities,
              updatedQualifications,
              updatedNiceToHave,
              updatedBenefits,
              updatedStatus,
              updatedWorkMode,
              body.id,
            ]
          );

          const updatedRow = updateRes.rows[0];
          const formattedUpdated = {
            ...updatedRow,
            workMode: updatedRow.workMode || "Hybrid",
            responsibilities: safeParseArray(updatedRow.responsibilities),
            qualifications: safeParseArray(updatedRow.qualifications),
            niceToHave: safeParseArray(updatedRow.niceToHave),
            benefits: safeParseArray(updatedRow.benefits),
            source: "database" as const,
          };

          return new Response(JSON.stringify({ success: true, id: body.id, job: formattedUpdated }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error("PUT /api/careers/jobs error:", msg);
          return new Response(JSON.stringify({ error: msg || "Failed to update job" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },

      DELETE: async ({ request }: { request?: Request }) => {
        if (!verifyAdminAuth(request)) {
          return new Response(
            JSON.stringify({ error: "Unauthorized. Administrative authorization required to delete jobs." }),
            {
              status: 401,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        try {
          await initCareerDatabase();
          const body = await request.json();

          if (!body.id) {
            return new Response(JSON.stringify({ error: "Job ID is required" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          await pool.query("DELETE FROM career_jobs WHERE id = $1;", [body.id]);

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error("DELETE /api/careers/jobs error:", msg);
          return new Response(JSON.stringify({ error: msg || "Failed to delete job" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
