import { createFileRoute } from "@tanstack/react-router";
import { pool } from "@/lib/db";
import { initCareerDatabase } from "@/lib/careers/schema";
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

export const Route = createFileRoute("/api/careers/jobs")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await initCareerDatabase();
          const res = await pool.query(
            `SELECT 
              id, title, slug, department, location,
              employment_type AS "employmentType",
              experience_level AS "experienceLevel",
              salary_range AS "salaryRange",
              description, about_role AS "aboutRole",
              responsibilities, qualifications, nice_to_have AS "niceToHave",
              benefits, status, posted_date AS "postedDate", created_at AS "createdAt"
            FROM career_jobs ORDER BY created_at DESC;`
          );

          const formatted = res.rows.map((row) => ({
            ...row,
            responsibilities: safeParseArray(row.responsibilities),
            qualifications: safeParseArray(row.qualifications),
            niceToHave: safeParseArray(row.niceToHave),
            benefits: safeParseArray(row.benefits),
          }));

          return new Response(JSON.stringify(formatted), {
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          console.error("GET /api/careers/jobs error:", err);
          // Return MOCK_JOBS as fallback so public site never breaks if database is temporarily unavailable
          return new Response(JSON.stringify(MOCK_JOBS), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
      },

      POST: async ({ request }) => {
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

          const slug =
            (body.slug && body.slug.trim()) ||
            body.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)+/g, "");

          const id = body.id || `job_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
          const postedDate = body.postedDate || "Just now";
          const status = body.status || "Published";
          const department = body.department || "Technology";
          const location = body.location || "Remote";
          const employmentType = body.employmentType || "Full-Time";
          const experienceLevel = body.experienceLevel || "Mid-Level";

          const result = await pool.query(
            `INSERT INTO career_jobs (
              id, title, slug, department, location, employment_type, experience_level,
              salary_range, description, about_role, responsibilities, qualifications,
              nice_to_have, benefits, status, posted_date
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            ON CONFLICT (slug) DO UPDATE SET
              title = EXCLUDED.title,
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
              posted_date = EXCLUDED.posted_date
            RETURNING id, title, slug, status, posted_date;`,
            [
              id,
              body.title.trim(),
              slug,
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
            ]
          );

          const savedRow = result.rows[0];

          return new Response(
            JSON.stringify({
              success: true,
              id: savedRow ? savedRow.id : id,
              slug: savedRow ? savedRow.slug : slug,
              job: savedRow,
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

      PUT: async ({ request }) => {
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
          const updatedSlug = body.slug !== undefined ? body.slug : existing.slug;
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

          await pool.query(
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
              status = $14
            WHERE id = $15;`,
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
              body.id,
            ]
          );

          return new Response(JSON.stringify({ success: true, id: body.id }), {
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

      DELETE: async ({ request }) => {
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
