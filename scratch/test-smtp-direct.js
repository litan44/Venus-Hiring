import nodemailer from "nodemailer";

const host = process.env.SMTP_HOST || "smtppro.zoho.in";
const port = parseInt(process.env.SMTP_PORT || "465", 10);
const secure = true;
const user = process.env.SMTP_USER || "jivan@venushiring.com";
const pass = process.env.SMTP_PASSWORD || "8pySPQs5G1Gw";
const targetEmail = "jivan@venushiring.com";

console.log("Testing SMTP connection with settings:", { host, port, secure, user, targetEmail });

const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 10000,
  tls: { rejectUnauthorized: false },
});

async function main() {
  try {
    await transporter.verify();
    console.log("✅ SMTP Server Connection Verified Successfully!");

    const info = await transporter.sendMail({
      from: `"Venus Hiring Test" <${user}>`,
      to: targetEmail,
      subject: "Test Notification - Venus Hiring API Verification",
      text: "This is a test notification to verify that jivan@venushiring.com receives form submissions.",
    });

    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
  } catch (err) {
    console.error("❌ SMTP Error:", err);
  }
}

main();
