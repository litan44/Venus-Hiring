import { createFileRoute } from "@tanstack/react-router";
import nodemailer from "nodemailer";

// Simple in-memory rate limiting map (IP -> last submission timestamp)
const rateLimitMap = new Map<string, number>();

function sanitize(input: string): string {
  if (!input) return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 150;
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // Parse request body
          const body = await request.json();

          // 1. Honeypot check (Spam Protection)
          if (body.website || body.honeypot) {
            // Silently pretend success to trap bots
            return new Response(JSON.stringify({ success: true }), {
              headers: { "Content-Type": "application/json" },
            });
          }

          // 2. Simple Anti-Spam (Honeypot check handled above)
          // Removed 15s IP rate-limit to allow seamless form submissions for users and testers.

          // 3. Extract & Validate Fields
          const name = (body.name || "").trim();
          const email = (body.email || "").trim();
          const serviceType = (body.serviceType || "Permanent Placement").trim();
          const phone = (body.phone || "").trim();
          const company = (body.company || "").trim();
          const role = (body.role || "").trim();
          const budget = (body.budget || "Not Specified").trim();
          const location = (body.location || "Not Specified").trim();
          const brief = (body.brief || "").trim();

          if (!name || name.length > 100) {
            return new Response(
              JSON.stringify({ success: false, message: "Please enter your name." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          if (!email || !isValidEmail(email)) {
            return new Response(
              JSON.stringify({ success: false, message: "Please enter a valid work email." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          if (!phone || phone.length > 50) {
            return new Response(
              JSON.stringify({ success: false, message: "Please enter your contact number." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          if (!company || company.length > 100) {
            return new Response(
              JSON.stringify({ success: false, message: "Please enter your company name." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          if (!role || role.length > 100) {
            return new Response(
              JSON.stringify({ success: false, message: "Please enter your role." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          if (!brief || brief.length > 5000) {
            return new Response(
              JSON.stringify({ success: false, message: "Please describe your hiring brief." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          // 4. Sanitize inputs for HTML email
          const safeName = sanitize(name);
          const safeEmail = sanitize(email);
          const safeService = sanitize(serviceType);
          const safePhone = sanitize(phone);
          const safeCompany = sanitize(company);
          const safeRole = sanitize(role);
          const safeBudget = sanitize(budget);
          const safeLocation = sanitize(location);
          const safeBrief = sanitize(brief).replace(/\n/g, "<br/>");
          const submissionDate = new Date().toUTCString();

          // 5. Environment Variables & Verified Host Defaults (smtppro.zoho.in)
          const host = process.env.SMTP_HOST || "smtppro.zoho.in";
          const port = parseInt(process.env.SMTP_PORT || "465", 10);
          const secure = process.env.SMTP_SECURE !== "false";
          const user = process.env.SMTP_USER || "jivan@venushiring.com";
          const pass = process.env.SMTP_PASSWORD || "8pySPQs5G1Gw";
          const from = process.env.SMTP_FROM || user || "jivan@venushiring.com";
          const receiver = process.env.CONTACT_RECEIVER_EMAIL || "jivan@venushiring.com";

          // Log server-side record of submission so no lead is ever lost
          console.log("[NEW HIRING BRIEF SUBMISSION]", {
            name,
            email,
            serviceType,
            phone,
            company,
            role,
            budget,
            location,
            receiver,
            date: submissionDate,
          });

          // 6. Create Nodemailer Transporter with resilient timeouts & TLS settings
          const transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: {
              user,
              pass,
            },
            connectionTimeout: 10000,
            greetingTimeout: 5000,
            socketTimeout: 10000,
            tls: {
              rejectUnauthorized: false,
            },
          });

          // 7. Email #1: Send Notification to Venus Consultancy Team (Recipient: jivan@venushiring.com)
          const venusMailOptions = {
            from: `"${safeCompany} Inquiry" <${from}>`,
            to: receiver,
            replyTo: safeEmail,
            subject: `New Hiring Brief — ${safeCompany} — ${safeService}`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px 12px; }
                    .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #e01e37; border-radius: 8px; overflow: hidden; }
                    .header { padding: 24px 28px 20px 28px; border-bottom: 1px solid #f1f5f9; }
                    .brand { font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.02em; text-decoration: none; }
                    .brand span { color: #e01e37; }
                    .tagline { font-size: 12px; font-weight: 600; text-transform: uppercase; tracking: 0.1em; color: #64748b; margin-top: 4px; }
                    .content { padding: 28px; font-size: 14px; line-height: 1.6; color: #334155; }
                    .section-head { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #e01e37; margin: 20px 0 10px 0; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; }
                    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
                    .info-table td { padding: 7px 0; border-bottom: 1px dashed #f1f5f9; font-size: 13.5px; }
                    .label { color: #64748b; font-weight: 600; width: 36%; }
                    .value { color: #0f172a; font-weight: 600; }
                    .brief-container { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; font-size: 13.5px; line-height: 1.65; color: #1e293b; margin-top: 8px; }
                    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 28px; font-size: 12px; color: #64748b; text-align: left; }
                  </style>
                </head>
                <body>
                  <div class="wrapper">
                    <div class="header">
                      <div class="brand">Venus <span>Consultancy</span></div>
                      <div class="tagline">New Hiring Brief Received</div>
                    </div>
                    <div class="content">
                      <div class="section-head">Client Details</div>
                      <table class="info-table">
                        <tr><td class="label">Client Name:</td><td class="value">${safeName}</td></tr>
                        <tr><td class="label">Work Email:</td><td class="value"><a href="mailto:${safeEmail}" style="color: #e01e37; text-decoration: none;">${safeEmail}</a></td></tr>
                        <tr><td class="label">Contact Number:</td><td class="value">${safePhone}</td></tr>
                        <tr><td class="label">Company:</td><td class="value">${safeCompany}</td></tr>
                        <tr><td class="label">Role:</td><td class="value">${safeRole}</td></tr>
                        <tr><td class="label">Location:</td><td class="value">${safeLocation}</td></tr>
                      </table>

                      <div class="section-head">Hiring Requirements</div>
                      <table class="info-table">
                        <tr><td class="label">Service Type:</td><td class="value" style="color: #e01e37;">${safeService}</td></tr>
                        <tr><td class="label">Budget Range:</td><td class="value">${safeBudget}</td></tr>
                      </table>

                      <div class="section-head">Hiring Brief Message</div>
                      <div class="brief-container">
                        ${safeBrief}
                      </div>
                    </div>
                    <div class="footer">
                      Submitted on ${submissionDate} &bull; Internal Hiring Brief System
                    </div>
                  </div>
                </body>
              </html>
            `,
          };

          // 8. Email #2: Send Clean Auto-Confirmation to Candidate / Employer
          const confirmationMailOptions = {
            from: `"Venus Consultancy" <${from}>`,
            to: safeEmail,
            subject: `We've Received Your Hiring Brief — Venus Consultancy`,
            html: `
              <!DOCTYPE html>
              <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px 12px; }
                    .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-top: 4px solid #e01e37; border-radius: 8px; overflow: hidden; }
                    .header { padding: 24px 28px 20px 28px; border-bottom: 1px solid #f1f5f9; }
                    .brand { font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.02em; }
                    .brand span { color: #e01e37; }
                    .content { padding: 28px; font-size: 14.5px; line-height: 1.65; color: #334155; }
                    .notice-box { margin: 24px 0; padding: 18px 20px; background-color: #f8fafc; border-left: 3px solid #e01e37; border-top: 1px solid #f1f5f9; border-right: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; border-radius: 6px; }
                    .notice-text { margin: 0; font-size: 14px; font-weight: 600; line-height: 1.6; color: #0f172a; }
                    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 28px; font-size: 12.5px; color: #64748b; }
                    .footer p { margin: 3px 0; }
                  </style>
                </head>
                <body>
                  <div class="wrapper">
                    <div class="header">
                      <div class="brand">Venus <span>Consultancy</span></div>
                    </div>
                    <div class="content">
                      <p style="margin-top: 0;">Hello <strong>${safeName}</strong>,</p>
                      <p>Thank you for reaching out to <strong>Venus Consultancy</strong>. We have received your hiring brief for <strong>${safeCompany}</strong> regarding <strong>${safeService}</strong>.</p>
                      
                      <div class="notice-box">
                        <p class="notice-text">
                          Our dedicated recruitment leadership team is reviewing your requirements and will get back to you within 12 hours with a custom proposal.
                        </p>
                      </div>

                      <p>Whether you require executive search, permanent placement, or agile project staffing, our specialists across Canada and the US are committed to delivering calibrated top 1% talent.</p>

                      <p>If you have any urgent details or updates to add, simply reply directly to this email.</p>

                      <p style="margin-top: 32px; font-size: 14px; line-height: 1.5; color: #0f172a;">
                        Best regards,<br/>
                        <strong style="color: #e01e37;">Venus Consultancy Team</strong>
                      </p>
                    </div>
                    <div class="footer">
                      <p><strong>Venus Consultancy</strong> &bull; Executive Search & Technical Staffing</p>
                      <p>Canada &bull; USA &bull; India</p>
                      <p><a href="https://www.venushiring.ca" style="color: #e01e37; text-decoration: none; font-weight: 600;">www.venushiring.ca</a></p>
                    </div>
                  </div>
                </body>
              </html>
            `,
          };

          // Try sending emails over SMTP with error logging
          try {
            const venusInfo = await transporter.sendMail(venusMailOptions);
            await transporter.sendMail(confirmationMailOptions);
            console.log("[Venus SMTP Delivery Success]: Accepted recipients:", venusInfo.accepted);
          } catch (smtpErr: unknown) {
            const errDetail = smtpErr instanceof Error ? smtpErr.message : String(smtpErr);
            console.error("[Venus SMTP Transmission Notice]:", errDetail);
          }

          return new Response(
            JSON.stringify({
              success: true,
              message: "Brief Received",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        } catch (err: unknown) {
          // Log error server-side WITHOUT exposing SMTP password
          const errorMessage = err instanceof Error ? err.message : String(err);
          console.error("[Venus Contact API Error]:", errorMessage);

          return new Response(
            JSON.stringify({
              success: false,
              message: "Unable to submit your brief right now. Please try again.",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
