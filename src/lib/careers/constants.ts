// Safe CRM URL resolution across SSR and Client environments
export const CRM_WEB_URL =
  (typeof process !== "undefined" && process.env?.CRM_WEB_URL) ||
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_CRM_URL) ||
  (typeof import.meta !== "undefined" &&
    (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_CRM_URL) ||
  "https://crm.venusglobaltech.com";

export const CRM_API_URL =
  (typeof process !== "undefined" && process.env?.CRM_API_URL) ||
  (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_CRM_API_URL) ||
  (typeof import.meta !== "undefined" &&
    (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_CRM_API_URL) ||
  "https://crm.venusglobaltech.com/api";
