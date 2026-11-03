import { createFileRoute } from "@tanstack/react-router";
import * as crypto from "crypto";
import { invalidateCrmCache, fetchCrmJobs } from "@/lib/careers/crm-client";

// Shared secret from environment variable (never exposed to browser, fails closed if not configured)
function getWebhookSecret(): string | null {
  const secret = process.env.CAREERS_WEBHOOK_SECRET || process.env.VENUS_HIRING_WEBHOOK_SECRET;
  if (!secret || secret.trim() === "") {
    return null;
  }
  return secret.trim();
}

// Replay protection cache (stores eventId for 10 minutes)
const processedEvents = new Map<string, number>();
const REPLAY_WINDOW_MS = 5 * 60 * 1000; // 5 minutes max timestamp drift
const DEDUPE_TTL_MS = 10 * 60 * 1000; // 10 minutes idempotency memory

function cleanupProcessedEvents() {
  const cutoff = Date.now() - DEDUPE_TTL_MS;
  for (const [id, time] of processedEvents.entries()) {
    if (time < cutoff) {
      processedEvents.delete(id);
    }
  }
}

function verifyHmac(rawBody: string, timestamp: string, receivedSignature: string): boolean {
  try {
    const secret = getWebhookSecret();
    if (!secret) {
      console.error("[CRM WEBHOOK SECURITY] Refusing to verify signature: Webhook secret not configured in environment. Failing closed.");
      return false;
    }

    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${timestamp}.${rawBody}`)
      .digest("hex");

    if (expected.length !== receivedSignature.length) {
      return false;
    }
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(receivedSignature));
  } catch (err) {
    console.error("[CRM WEBHOOK SECURITY] Error computing HMAC signature:", err);
    return false;
  }
}

export const Route = createFileRoute("/api/careers/sync")({
  server: {
    handlers: {
      // Secure manual sync (Requires Authorization Bearer token or ?token= matching secret)
      GET: async ({ request }: { request?: Request }) => {
        try {
          if (!request) {
            return new Response(JSON.stringify({ error: "Invalid request context" }), { status: 400 });
          }

          const secret = getWebhookSecret();
          if (!secret) {
            console.error("[CRM WEBHOOK SECURITY] Server misconfiguration: Webhook secret missing. Failing closed.");
            return new Response(
              JSON.stringify({
                error: "Service unavailable: Webhook authentication misconfigured.",
              }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          const authHeader = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "")?.trim();
          if (!authHeader) {
            return new Response(
              JSON.stringify({
                error: "Unauthorized. Authorization Bearer header required (query-string token disabled for security).",
              }),
              {
                status: 401,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          const tokenBuf = Buffer.from(authHeader);
          const secretBuf = Buffer.from(secret);
          const isValidToken = tokenBuf.length === secretBuf.length && crypto.timingSafeEqual(tokenBuf, secretBuf);

          if (!isValidToken) {
            return new Response(
              JSON.stringify({
                error: "Unauthorized. Invalid administrator Bearer token.",
              }),
              {
                status: 401,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          invalidateCrmCache();
          const jobs = await fetchCrmJobs(true);

          return new Response(
            JSON.stringify({
              success: true,
              message: "CRM jobs cache successfully invalidated and re-synchronized.",
              jobsCount: jobs.length,
              timestamp: new Date().toISOString(),
              source: "crm",
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        } catch (err: any) {
          return new Response(
            JSON.stringify({
              success: false,
              error: err?.message || "Failed to synchronize with Venus CRM",
              timestamp: new Date().toISOString(),
            }),
            {
              status: 502,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },

      // Event-driven inbound webhook from Venus CRM
      POST: async ({ request }: { request?: Request }) => {
        try {
          if (!request) {
            return new Response(JSON.stringify({ error: "Missing request context" }), { status: 400 });
          }

          const secret = getWebhookSecret();
          if (!secret) {
            console.error("[CRM WEBHOOK SECURITY] Server misconfiguration: Webhook secret missing. Failing closed.");
            return new Response(
              JSON.stringify({
                error: "Service unavailable: Webhook authentication misconfigured.",
              }),
              {
                status: 500,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          const signature = request.headers.get("x-webhook-signature");
          const timestamp = request.headers.get("x-webhook-timestamp");
          const eventId = request.headers.get("x-webhook-event-id");

          if (!signature || !timestamp || !eventId) {
            console.warn("[CRM WEBHOOK] Rejected request: Missing required security headers");
            return new Response(
              JSON.stringify({
                error: "Missing required webhook headers (x-webhook-signature, x-webhook-timestamp, x-webhook-event-id)",
              }),
              {
                status: 401,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          // 1. Timestamp validation & replay attack prevention
          const now = Date.now();
          const eventTime = new Date(timestamp).getTime();
          if (isNaN(eventTime) || Math.abs(now - eventTime) > REPLAY_WINDOW_MS) {
            console.warn(`[CRM WEBHOOK] Rejected: Timestamp drift ${Math.abs(now - eventTime)}ms exceeds window`);
            return new Response(
              JSON.stringify({
                error: "Webhook timestamp expired or exceeds allowed drift window (5 minutes)",
              }),
              {
                status: 401,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          // 2. Read raw body and verify cryptographic HMAC-SHA256 signature
          const rawBody = await request.text();
          const isValidSignature = verifyHmac(rawBody, timestamp, signature);

          if (!isValidSignature) {
            console.warn(`[CRM WEBHOOK] Signature verification failed for event ${eventId}`);
            return new Response(
              JSON.stringify({ error: "Invalid webhook signature" }),
              {
                status: 401,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          // 3. Idempotency / Duplicate event check
          cleanupProcessedEvents();
          if (processedEvents.has(eventId)) {
            console.log(`[CRM WEBHOOK] Duplicate event ${eventId} safely ignored`);
            return new Response(
              JSON.stringify({
                success: true,
                duplicate: true,
                message: `Event ${eventId} already processed`,
              }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          // Record event in idempotency table
          processedEvents.set(eventId, now);

          let payload: any = {};
          try {
            payload = JSON.parse(rawBody);
          } catch {
            return new Response(JSON.stringify({ error: "Invalid JSON payload" }), { status: 400 });
          }

          const event = payload?.event;
          const allowedEvents = ["job.published", "job.updated", "job.unpublished", "job.closed", "job.reopened"];

          if (!event || !allowedEvents.includes(event)) {
            return new Response(
              JSON.stringify({ error: `Unsupported event type: ${event}` }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              }
            );
          }

          // 4. Invalidate the website CRM job cache and trigger fresh pre-warm
          invalidateCrmCache();
          console.log(`[CRM WEBHOOK] Successfully processed '${event}' for job ${payload?.job?.id ?? "unknown"} (${eventId})`);

          // Background warm-up
          fetchCrmJobs(true).catch((warmErr) => {
            console.warn("[CRM WEBHOOK] Cache warm-up failed:", warmErr?.message || warmErr);
          });

          return new Response(
            JSON.stringify({
              success: true,
              eventId,
              event,
              cacheInvalidated: true,
              timestamp: new Date().toISOString(),
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            }
          );
        } catch (err: any) {
          console.error("[CRM WEBHOOK ERROR]:", err);
          return new Response(
            JSON.stringify({
              success: false,
              error: "Internal webhook handler error",
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      },
    },
  },
});
