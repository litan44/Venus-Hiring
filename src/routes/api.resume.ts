import { createFileRoute } from "@tanstack/react-router";
import { pool, initDatabase } from "@/lib/db";
import { initCareerDatabase } from "@/lib/careers/schema";

export const Route = createFileRoute("/api/resume")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const id = url.searchParams.get("id");
          const type = url.searchParams.get("type") || "contact"; // "contact" or "career"
          const action = url.searchParams.get("action") || "view"; // "view" or "download"

          if (!id) {
            return new Response("Missing application or resume ID parameter.", {
              status: 400,
              headers: { "Content-Type": "text/plain" },
            });
          }

          let resumeFileName: string | null = null;
          let resumeDataUrl: string | null = null;

          if (type === "career") {
            await initCareerDatabase();
            const res = await pool.query(
              `SELECT resume_file_name, resume_data_url FROM career_applications WHERE id = $1;`,
              [id]
            );
            if (res.rows.length > 0) {
              resumeFileName = res.rows[0].resume_file_name;
              resumeDataUrl = res.rows[0].resume_data_url;
            }
          } else {
            await initDatabase();
            const numericId = parseInt(id, 10);
            if (!isNaN(numericId)) {
              const res = await pool.query(
                `SELECT resume_file_name, resume_data_url FROM contact_briefs WHERE id = $1;`,
                [numericId]
              );
              if (res.rows.length > 0) {
                resumeFileName = res.rows[0].resume_file_name;
                resumeDataUrl = res.rows[0].resume_data_url;
              }
            } else {
              // Fallback query if string id was stored
              const res = await pool.query(
                `SELECT resume_file_name, resume_data_url FROM contact_briefs WHERE brief LIKE $1;`,
                [`%${id}%`]
              );
              if (res.rows.length > 0) {
                resumeFileName = res.rows[0].resume_file_name;
                resumeDataUrl = res.rows[0].resume_data_url;
              }
            }
          }

          if (!resumeDataUrl) {
            return new Response(
              `<html><body style="font-family:sans-serif;padding:40px;text-align:center;"><h2>Resume Not Found</h2><p>No uploaded resume file was found for this submission record (ID: ${id}).</p></body></html>`,
              { status: 404, headers: { "Content-Type": "text/html" } }
            );
          }

          // Parse Data URL format: "data:<mimeType>;base64,<data>"
          const matches = resumeDataUrl.match(/^data:(.*?);base64,(.*)$/);
          let mimeType = "application/pdf";
          let base64Data = resumeDataUrl;

          if (matches && matches.length === 3) {
            mimeType = matches[1] || "application/pdf";
            base64Data = matches[2];
          }

          const fileBuffer = Buffer.from(base64Data, "base64");
          const safeFilename = (resumeFileName || `candidate_resume_${id}.pdf`).replace(/["\r\n]/g, "_");

          const dispositionType = action === "download" ? "attachment" : "inline";

          return new Response(fileBuffer, {
            status: 200,
            headers: {
              "Content-Type": mimeType,
              "Content-Length": fileBuffer.length.toString(),
              "Content-Disposition": `${dispositionType}; filename="${safeFilename}"`,
              "Cache-Control": "public, max-age=86400",
            },
          });
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : String(err);
          console.error("[Resume File API Error]:", errorMessage);
          return new Response(`Error retrieving resume: ${errorMessage}`, {
            status: 500,
            headers: { "Content-Type": "text/plain" },
          });
        }
      },
    },
  },
});
