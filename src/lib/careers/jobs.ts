import { MOCK_JOBS, type JobItem } from "@/components/careers/mockJobs";

export interface AdminJobItem extends JobItem {
  status: "Draft" | "Published" | "Paused" | "Closed";
  category?: string;
  workMode?: "Remote" | "Hybrid" | "On-site" | "Onsite" | string;
  currency?: string;
  minExperience?: string;
  maxExperience?: string;
  openingsCount?: number;
  hiringManager?: string;
  applicationDeadline?: string;
  preferredQualifications?: string[];
  aboutCompany?: string;
  createdAt?: string;
}

export const CAREERS_STORAGE_KEY = "venus_careers_jobs";

// Initial fallback in-memory store initialized with MOCK_JOBS
let jobsStore: AdminJobItem[] = MOCK_JOBS.map((j) => ({
  ...j,
  status: "Published",
  createdAt: new Date().toISOString(),
}));

export function getStoredJobs(): AdminJobItem[] {
  if (typeof window === "undefined") return jobsStore;
  try {
    const raw = localStorage.getItem(CAREERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // Ignore storage parse errors
  }
  return jobsStore;
}

export function saveStoredJobs(jobs: AdminJobItem[]): void {
  jobsStore = jobs;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CAREERS_STORAGE_KEY, JSON.stringify(jobs));
      window.dispatchEvent(new Event("venus_jobs_updated"));
    } catch (e) {
      console.warn("Failed to save jobs to local storage", e);
    }
  }
}

export async function fetchAllAdminJobs(): Promise<AdminJobItem[]> {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/careers/jobs");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const formatted: AdminJobItem[] = data.map((j: any) => ({
            ...j,
            status: j.status || "Published",
            postedDate: j.postedDate || "Just now",
          }));
          saveStoredJobs(formatted);
          return formatted;
        }
      }
    } catch (err) {
      console.warn("[Careers] Using cached admin jobs:", err);
    }
    return getStoredJobs();
  }
  return [...jobsStore];
}

export async function createAdminJob(jobData: Omit<AdminJobItem, "id" | "postedDate">): Promise<AdminJobItem> {
  let createdJob: AdminJobItem;

  if (typeof window !== "undefined") {
    const res = await fetch("/api/careers/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Failed to create job (${res.status})`);
    }

    const resData = await res.json();
    const id = resData.id || `job_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    createdJob = {
      ...jobData,
      id,
      postedDate: resData.job?.posted_date || "Just now",
      createdAt: new Date().toISOString(),
      status: jobData.status || "Published",
    };
  } else {
    createdJob = {
      ...jobData,
      id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      postedDate: "Just now",
      createdAt: new Date().toISOString(),
      status: jobData.status || "Published",
    };
  }

  const currentJobs = getStoredJobs();
  // Filter out any existing item with the same slug or id to prevent duplicates
  const updated = [createdJob, ...currentJobs.filter((j) => j.id !== createdJob.id && j.slug !== createdJob.slug)];
  saveStoredJobs(updated);
  return createdJob;
}

export async function updateAdminJob(id: string, updatedFields: Partial<AdminJobItem>): Promise<AdminJobItem | null> {
  if (typeof window !== "undefined") {
    const res = await fetch("/api/careers/jobs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updatedFields }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Failed to update job (${res.status})`);
    }
  }

  const currentJobs = getStoredJobs();
  const idx = currentJobs.findIndex((j) => j.id === id);
  if (idx === -1) return null;

  const updatedJob: AdminJobItem = {
    ...currentJobs[idx],
    ...updatedFields,
  };

  currentJobs[idx] = updatedJob;
  saveStoredJobs([...currentJobs]);
  return updatedJob;
}

export async function deleteAdminJob(id: string): Promise<boolean> {
  if (typeof window !== "undefined") {
    const res = await fetch("/api/careers/jobs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `Failed to delete job (${res.status})`);
    }
  }

  const currentJobs = getStoredJobs();
  const initialLength = currentJobs.length;
  const filtered = currentJobs.filter((j) => j.id !== id);
  saveStoredJobs(filtered);
  return filtered.length < initialLength;
}

export async function duplicateAdminJob(id: string): Promise<AdminJobItem | null> {
  const currentJobs = getStoredJobs();
  const existing = currentJobs.find((j) => j.id === id);
  if (!existing) return null;

  const duplicatedData: Omit<AdminJobItem, "id" | "postedDate"> = {
    ...existing,
    title: `${existing.title} (Copy)`,
    slug: `${existing.slug}-copy-${Date.now().toString(36)}`,
    status: "Draft",
    createdAt: new Date().toISOString(),
  };

  return await createAdminJob(duplicatedData);
}
