import { sendEmail } from "@/lib/zoho-mail";
import type { CareerApplication } from "./applications";

const DEFAULT_RECIPIENTS = ["jivan@venushiring.com", "paresh@venushiring.com"];

const TARGET_RECIPIENTS = process.env.CAREER_NOTIFICATION_EMAIL
  ? process.env.CAREER_NOTIFICATION_EMAIL.split(",").map((s) => s.trim())
  : (process.env.CONTACT_RECEIVER_EMAIL
      ? process.env.CONTACT_RECEIVER_EMAIL.split(",").map((s) => s.trim())
      : DEFAULT_RECIPIENTS);

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  response?: string;
  error?: string;
}

export async function sendApplicationNotificationEmail(app: Partial<CareerApplication>): Promise<EmailSendResult> {
  const subject = `New Career Application Received - ${app.jobTitle || "Job Position"}`;
  const receiversList = Array.from(new Set([...TARGET_RECIPIENTS, "jivan@venushiring.com", "paresh@venushiring.com"])).join(", ");

  const baseUrl = "https://venus-hiring-production.up.railway.app";
  const viewUrl = app.id ? `${baseUrl}/api/resume?id=${app.id}&type=career&action=view` : `${baseUrl}/careers`;
  const downloadUrl = app.id ? `${baseUrl}/api/resume?id=${app.id}&type=career&action=download` : `${baseUrl}/careers`;

  let emailAttachments: any[] = [];
  if (app.resumeDataUrl) {
    try {
      const matches = app.resumeDataUrl.match(/^data:(.*?);base64,(.*)$/);
      const base64Data = matches && matches[2] ? matches[2] : app.resumeDataUrl;
      const fileBuf = Buffer.from(base64Data, "base64");
      emailAttachments.push({
        filename: app.resumeFileName || "candidate_resume.pdf",
        content: fileBuf,
      });
    } catch (attErr) {
      console.error("[Career Resume Attachment Buffer Error]:", attErr);
    }
  }

  const resumeCardHtml = app.resumeDataUrl
    ? `
      <div style="margin: 20px 0; padding: 20px; background-color: #f0fdf4; border: 2px solid #22c55e; border-radius: 12px;">
        <div style="font-size: 15px; font-weight: 700; color: #15803d; margin-bottom: 4px;">
          📄 Uploaded Candidate Resume / CV: ${app.resumeFileName || "candidate_resume.pdf"}
        </div>
        <p style="font-size: 13px; color: #166534; margin: 0 0 16px 0; font-weight: 500;">
          Click below to view or download the candidate's uploaded resume file:
        </p>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <a href="${viewUrl}" target="_blank" style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 11px 22px; border-radius: 6px; font-weight: 700; font-size: 13px; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            👁️ VIEW RESUME IN BROWSER
          </a>
          <a href="${downloadUrl}" target="_blank" style="display: inline-block; background-color: #dc2626; color: #ffffff; padding: 11px 22px; border-radius: 6px; font-weight: 700; font-size: 13px; text-decoration: none; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            ⬇️ DOWNLOAD RESUME FILE
          </a>
        </div>
      </div>
    `
    : "";

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a;">
  <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05);">
    
    <!-- Header -->
    <div style="background-color: #dc2626; padding: 24px 32px; text-align: left;">
      <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">
        Venus Hiring • Career Application
      </h1>
      <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0 0; font-size: 13px;">
        New submission for ${app.jobTitle || "Job Position"}
      </p>
    </div>

    <!-- Main Content -->
    <div style="padding: 32px;">
      
      <!-- Candidate Overview Banner -->
      <div style="background-color: #f1f5f9; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px;">
        <h2 style="margin: 0; font-size: 18px; color: #0f172a; font-weight: 700;">
          ${app.firstName || ""} ${app.lastName || ""}
        </h2>
        <p style="margin: 4px 0 0 0; font-size: 14px; color: #475569;">
          ${app.email || "N/A"} &nbsp;•&nbsp; ${app.phone || "N/A"}
        </p>
      </div>

      <!-- Detail Grid -->
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600; width: 140px;">Applied Position:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 700;">${app.jobTitle || "N/A"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Location:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${app.location || "Not specified"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Current Role:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${app.currentTitle || "Not specified"} ${app.currentCompany ? `at ${app.currentCompany}` : ""}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Experience:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${app.experienceYears || "Not specified"}</td>
        </tr>
        ${app.linkedinUrl ? `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">LinkedIn:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="${app.linkedinUrl}" style="color: #dc2626; text-decoration: none; font-weight: 600;">${app.linkedinUrl}</a></td>
        </tr>` : ""}
        ${app.portfolioUrl ? `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Portfolio:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="${app.portfolioUrl}" style="color: #dc2626; text-decoration: none; font-weight: 600;">${app.portfolioUrl}</a></td>
        </tr>` : ""}
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-weight: 600;">Resume File:</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${app.resumeFileName || "Uploaded Resume"} (${app.resumeFileSize || "N/A"})</td>
        </tr>
      </table>

      ${resumeCardHtml}

      ${app.coverLetter ? `
      <!-- Cover Letter Block -->
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 13px; text-transform: uppercase; tracking: 1px; color: #64748b; margin: 0 0 8px 0;">Cover Letter</h3>
        <div style="background-color: #fafafa; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; font-size: 13px; color: #334155; line-height: 1.6;">
          ${app.coverLetter.replace(/\n/g, '<br/>')}
        </div>
      </div>` : ""}

      <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 24px; font-size: 11px; color: #94a3b8; text-align: center;">
        Submitted on ${app.submittedAt ? new Date(app.submittedAt).toLocaleString() : new Date().toLocaleString()} • Recipients: ${receiversList}
      </div>

    </div>
  </div>
</body>
</html>
`;

  return await sendEmail({
    to: receiversList,
    subject,
    html: htmlBody,
    replyTo: app.email,
    attachments: emailAttachments.length > 0 ? emailAttachments : undefined,
  });
}
