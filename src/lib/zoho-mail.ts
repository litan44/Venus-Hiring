import nodemailer from "nodemailer";

interface SendMailParams {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

let cachedAccessToken: string | null = null;
let tokenExpiryTime: number = 0;

export async function getZohoAccessToken(): Promise<string | null> {
  const accountDomain = process.env.ZOHO_ACCOUNTS_DOMAIN || "https://accounts.zoho.in";
  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  // Return cached token if still valid (with 60s buffer)
  if (cachedAccessToken && Date.now() < tokenExpiryTime - 60000) {
    return cachedAccessToken;
  }

  try {
    const tokenUrl = `${accountDomain}/oauth/v2/token?refresh_token=${encodeURIComponent(
      refreshToken
    )}&client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(
      clientSecret
    )}&grant_type=refresh_token`;

    const res = await fetch(tokenUrl, { method: "POST" });
    const data = await res.json();

    if (data.access_token) {
      cachedAccessToken = data.access_token;
      tokenExpiryTime = Date.now() + (data.expires_in || 3600) * 1000;
      return cachedAccessToken;
    } else {
      console.error("[Zoho OAuth Error]:", data);
      return null;
    }
  } catch (err) {
    console.error("[Zoho OAuth Exception]:", err);
    return null;
  }
}

export async function sendEmail(params: SendMailParams): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const accountId = process.env.ZOHO_ACCOUNT_ID || "8158642000000002002";
  const apiDomain = process.env.ZOHO_API_DOMAIN || "https://mail.zoho.in";
  const defaultFrom = process.env.SMTP_FROM || process.env.SMTP_USER || "jivan@venushiring.com";
  const rawFrom = params.from || defaultFrom;
  const cleanFrom = rawFrom.includes("<") ? rawFrom.match(/<([^>]+)>/)?.[1] || defaultFrom : rawFrom;

  // 1. Try Zoho REST API first (bypasses cloud SMTP relay blocks & delivers instantly)
  const accessToken = await getZohoAccessToken();

  if (accessToken) {
    try {
      const sendMailUrl = `${apiDomain}/api/v1/accounts/${accountId}/messages`;
      const payload: Record<string, any> = {
        fromAddress: cleanFrom,
        toAddress: params.to,
        subject: params.subject,
        content: params.html,
        mailFormat: "html",
      };

      const apiRes = await fetch(sendMailUrl, {
        method: "POST",
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const apiData = await apiRes.json();

      if (apiRes.ok && apiData.status?.code === 200) {
        console.log(`[Zoho REST API Delivery Success] Sent to: ${params.to} | messageId:`, apiData.data?.messageId || apiData.data?.mailId);
        return {
          success: true,
          messageId: apiData.data?.messageId || apiData.data?.mailId,
        };
      } else {
        console.error("[Zoho REST API Delivery Failure]:", apiData);
      }
    } catch (apiErr: any) {
      console.error("[Zoho REST API Exception]:", apiErr?.message || apiErr);
    }
  } else {
    console.warn("[Zoho REST API Warning]: No access token available. Proceeding to SMTP fallback...");
  }

  // 2. Fallback to Nodemailer SMTP if REST API is unavailable or fails
  try {
    const host = process.env.SMTP_HOST || "smtppro.zoho.in";
    const port = parseInt(process.env.SMTP_PORT || "465", 10);
    const secure = process.env.SMTP_SECURE !== "false";
    const user = process.env.SMTP_USER || "jivan@venushiring.com";
    const pass = process.env.SMTP_PASSWORD || "8pySPQs5G1Gw";

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      connectionTimeout: 6000,
      greetingTimeout: 3000,
      socketTimeout: 6000,
      tls: { rejectUnauthorized: false },
    });

    const info = await transporter.sendMail({
      from: `"Venus Hiring" <${user}>`,
      to: params.to,
      replyTo: params.replyTo,
      subject: params.subject,
      html: params.html,
    });

    console.log(`[SMTP Fallback Delivery Success] Sent to: ${params.to} | messageId:`, info.messageId);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (smtpErr: any) {
    const errStr = smtpErr?.message || String(smtpErr);
    console.error("[SMTP Fallback Error]:", errStr);
    return {
      success: false,
      error: errStr,
    };
  }
}
