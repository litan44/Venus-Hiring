import { MOCK_JOBS, type JobItem } from "@/components/careers/mockJobs";

export interface AdminJobItem extends JobItem {
  status: "Draft" | "Published" | "Closed";
  createdAt?: string;
}

// In-memory store initialized with MOCK_JOBS
let jobsStore: AdminJobItem[] = MOCK_JOBS.map((j) => ({
  ...j,
  status: "Published",
  createdAt: new Date().toISOString(),
}));

export async function fetchAllAdminJobs(): Promise<AdminJobItem[]> {
  return [...jobsStore];
}

export async function createAdminJob(jobData: Omit<AdminJobItem, "id" | "postedDate">): Promise<AdminJobItem> {
  const newJob: AdminJobItem = {
    ...jobData,
    id: `job_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    postedDate: "Just now",
    createdAt: new Date().toISOString(),
  };

  jobsStore.unshift(newJob);
  return newJob;
}

export async function updateAdminJob(id: string, updatedFields: Partial<AdminJobItem>): Promise<AdminJobItem | null> {
  const idx = jobsStore.findIndex((j) => j.id === id);
  if (idx === -1) return null;

  jobsStore[idx] = {
    ...jobsStore[idx],
    ...updatedFields,
  };

  return jobsStore[idx];
}

export async function deleteAdminJob(id: string): Promise<boolean> {
  const initialLength = jobsStore.length;
  jobsStore = jobsStore.filter((j) => j.id !== id);
  return jobsStore.length < initialLength;
}
