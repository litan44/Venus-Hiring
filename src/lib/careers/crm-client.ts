import { CRM_API_URL } from "./constants";
import type { JobItem } from "@/components/careers/mockJobs";

export interface CrmJobPosting {
  id: string;
  jobCode: string | null;
  title: string;
  description: string | null;
  location: string | null;
  employmentType: string;
  skillsRequired: string[];
  minExperienceYears: number;
  budgetMin: number | null;
  budgetMax: number | null;
  currency: string;
  salaryPeriod: string;
  industry?: string | null;
  createdAt: string;
  hiringDepartment: { name: string } | null;
}

// In-memory SWR (Stale-While-Revalidate) Cache
let cachedJobs: JobItem[] | null = null;
let lastJobsFetchTime = 0;
const CACHE_TTL_MS = 30_000; // 30 seconds fresh cache

export function invalidateCrmCache() {
  cachedJobs = null;
  lastJobsFetchTime = 0;
  console.log("[VENUS CRM CACHE] Invalidation triggered. Cache cleared.");
}

/**
 * Normalizes CRM API URLs to target the backend REST API endpoints.
 * Returns null if baseUrl is not configured (fails closed without silent fallbacks).
 */
export function resolveCrmApiUrl(endpointPath: string, baseUrl: string = CRM_API_URL): string | null {
  if (!baseUrl || baseUrl.trim() === "") {
    return null;
  }
  let base = baseUrl.trim().replace(/\/+$/, "");
  const cleanPath = endpointPath.startsWith("/") ? endpointPath : `/${endpointPath}`;

  // If pointing to Venus CRM domain and base doesn't end with /api, ensure /api is included
  if (base.includes("crm.venusglobaltech.com") && !base.endsWith("/api")) {
    base = `${base}/api`;
  }

  // Avoid duplicate /api/api
  if (base.endsWith("/api") && cleanPath.startsWith("/api/")) {
    return `${base}${cleanPath.substring(4)}`;
  }

  return `${base}${cleanPath}`;
}

export function formatSalaryRange(job: CrmJobPosting): string {
  if (!job.budgetMin && !job.budgetMax) return "Competitive";
  const currencySymbol = job.currency === "CAD" ? "CAD $" : job.currency === "USD" ? "$ USD " : "$";
  const period =
    job.salaryPeriod === "HOURLY"
      ? "/hr"
      : job.salaryPeriod === "MONTHLY"
      ? "/mo"
      : "/yr";

  if (job.budgetMin && job.budgetMax && job.budgetMin !== job.budgetMax) {
    return `${currencySymbol}${job.budgetMin.toLocaleString()} - ${currencySymbol}${job.budgetMax.toLocaleString()} ${period}`;
  }
  const val = job.budgetMin || job.budgetMax;
  return `${currencySymbol}${val?.toLocaleString()} ${period}`;
}

function formatEmploymentType(type?: string): string {
  if (!type) return "Full-Time";
  const normalized = type.toUpperCase().replace("-", "_");
  if (normalized === "FULL_TIME") return "Full-Time";
  if (normalized === "PART_TIME") return "Part-Time";
  if (normalized === "CONTRACT") return "Contract";
  if (normalized === "TEMPORARY") return "Temporary";
  if (normalized === "INTERNSHIP") return "Internship";
  return type.replace(/_/g, "-");
}

function formatRelativeDate(isoDateString?: string): string {
  if (!isoDateString) return "Recently posted";
  try {
    const diffMs = Date.now() - new Date(isoDateString).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 24) return diffHours <= 1 ? "Just now" : `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    return new Date(isoDateString).toLocaleDateString("en-CA", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recently posted";
  }
}

export function transformCrmJobToJobItem(crmJob: CrmJobPosting): JobItem {
  const baseSlug = crmJob.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "career";

  // Derive short 8-char identifier from job UUID to ensure multiple postings with identical titles have unique, reliable detail URLs
  const shortId = crmJob.id ? crmJob.id.split("-")[0] : "";
  const slug = shortId ? `${baseSlug}-${shortId}` : baseSlug;

  const experienceLevel =
    crmJob.minExperienceYears >= 8
      ? "Executive / Lead"
      : crmJob.minExperienceYears >= 5
      ? "Senior"
      : crmJob.minExperienceYears >= 2
      ? "Mid-Level"
      : "Entry-Level";

  // Clean brackets or formatting from location string (e.g. "[Midtown Toronto, Ontario]")
  const cleanLocation = crmJob.location
    ? crmJob.location.replace(/^\[|\]$/g, "").trim()
    : "Midtown Toronto, ON (Remote available)";

  return {
    id: crmJob.id,
    title: crmJob.title,
    slug: slug || crmJob.id,
    department: crmJob.hiringDepartment?.name || crmJob.industry || "General",
    location: cleanLocation,
    employmentType: formatEmploymentType(crmJob.employmentType),
    experienceLevel,
    salaryRange: formatSalaryRange(crmJob),
    description: crmJob.description || "Exciting career opportunity at Venus Global Tech.",
    postedDate: formatRelativeDate(crmJob.createdAt),
    aboutRole: crmJob.description || undefined,
    responsibilities: [],
    qualifications: Array.isArray(crmJob.skillsRequired) ? crmJob.skillsRequired : [],
    niceToHave: [],
    benefits: [
      "Competitive performance bonuses",
      "Comprehensive Canadian health & dental coverage",
      "RRSP matching & professional development stipend",
      "Flexible hybrid/remote schedule",
    ],
    source: "crm",
  };
}

/**
 * Internal helper to fetch with timeout and handle failover
 */
async function fetchWithFallback<T>(
  endpointPath: string,
  transform: (data: any) => T
): Promise<{ data: T; endpointUsed: string } | null> {
  const primaryUrl = resolveCrmApiUrl(endpointPath, CRM_API_URL);
  if (!primaryUrl) {
    console.warn("[VENUS CRM] CRM_API_URL is not configured in environment. Live CRM queries disabled.");
    return null;
  }

  // Helper fetcher
  const doFetch = async (url: string): Promise<T> => {
    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 4000) : null;
    try {
      const res = await fetch(url, {
        headers: { Accept: "application/json", "X-Site": "venus_hiring", Origin: "https://venushiring.com" },
        signal: controller?.signal,
      });
      if (!res.ok) throw new Error(`CRM API HTTP ${res.status}`);
      const json = await res.json();
      return transform(json);
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
  };

  try {
    const data = await doFetch(primaryUrl);
    return { data, endpointUsed: primaryUrl };
  } catch (primaryErr: any) {
    console.warn(`[VENUS CRM] Failed to query configured CRM API at ${primaryUrl}:`, primaryErr?.message || primaryErr);
    return null;
  }
}

export async function fetchCrmJobs(forceRefresh = false): Promise<JobItem[]> {
  const now = Date.now();
  if (!forceRefresh && cachedJobs && (now - lastJobsFetchTime < CACHE_TTL_MS)) {
    return cachedJobs;
  }

  const result = await fetchWithFallback<JobItem[]>("/careers/jobs?site=venus_hiring", (json) => {
    if (!Array.isArray(json)) return [];
    return json.map(transformCrmJobToJobItem);
  });

  if (!result || !result.data) {
    if (cachedJobs) {
      console.warn("[VENUS CRM] Background refresh failed, serving stale cached jobs");
      return cachedJobs;
    }
    throw new Error("CRM API unreachable");
  }

  cachedJobs = result.data;
  lastJobsFetchTime = now;
  return result.data;
}

export async function fetchCrmJob(idOrSlug: string): Promise<JobItem | null> {
  const normalized = idOrSlug.trim().toLowerCase();

  // 1. First, search within active CRM jobs (resolves unique slug, shortId, or bare slug immediately)
  try {
    const allJobs = await fetchCrmJobs();
    const match = allJobs.find((j) => {
      const jSlug = (j.slug || "").toLowerCase();
      const jId = (j.id || "").toLowerCase();
      const shortId = jId.split("-")[0];
      return (
        jSlug === normalized ||
        jId === normalized ||
        (shortId && normalized.endsWith(shortId)) ||
        jSlug.startsWith(`${normalized}-`)
      );
    });
    if (match) return match;
  } catch (err) {
    console.warn("[VENUS CRM] Failed to search cached jobs for single job lookup:", err);
  }

  // 2. Direct lookup against CRM API endpoint
  const result = await fetchWithFallback<JobItem | null>(`/careers/jobs/${encodeURIComponent(idOrSlug.trim())}?site=venus_hiring`, (json) => {
    if (!json || typeof json !== "object") return null;
    return transformCrmJobToJobItem(json);
  });

  return result?.data || null;
}

/**
 * Uploads a resume data URL to the CRM /careers/apply/upload-resume endpoint
 * Returns the relative resume URL matching CRM's RESUME_URL_PATTERN or null if failed.
 */
export async function uploadResumeToCrm(
  dataUrl: string,
  fileName: string = "resume.pdf"
): Promise<string | null> {
  try {
    const parts = dataUrl.split(",");
    if (parts.length < 2) return null;

    const mimeMatch = parts[0].match(/:(.*?);/);
    const mimeType = mimeMatch ? mimeMatch[1] : "application/pdf";
    const binary = atob(parts[1]);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      array[i] = binary.charCodeAt(i);
    }

    const blob = new Blob([array], { type: mimeType });
    const formData = new FormData();
    formData.append("file", blob, fileName);

    const uploadUrl = resolveCrmApiUrl("/careers/apply/upload-resume");
    if (!uploadUrl) {
      console.warn("[VENUS CRM] Resume upload skipped: CRM_API_URL is not configured.");
      return null;
    }

    const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
    const timeoutId = controller ? setTimeout(() => controller.abort(), 6000) : null;

    try {
      const res = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
        signal: controller?.signal,
      });

      if (!res.ok) {
        console.warn(`[VENUS CRM] Resume upload returned HTTP ${res.status}`);
        return null;
      }

      const data = await res.json();
      if (data?.url && typeof data.url === "string") {
        console.log(`[VENUS CRM] Resume successfully uploaded to CRM: ${data.url}`);
        return data.url;
      }
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
    }
  } catch (err: any) {
    console.warn(`[VENUS CRM] Resume upload to CRM failed:`, err?.message || err);
  }

  return null;
}
