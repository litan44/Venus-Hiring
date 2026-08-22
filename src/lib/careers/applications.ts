export type ApplicationStatus =
  | "New"
  | "Reviewing"
  | "Shortlisted"
  | "Interview"
  | "Rejected"
  | "Hired";

export interface CareerApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location?: string;
  currentTitle?: string;
  currentCompany?: string;
  experienceYears: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  resumeFileName?: string;
  resumeFileSize?: string;
  resumeFileType?: string;
  resumeDataUrl?: string;
  isResumeBuiltLive?: boolean;
  coverLetter?: string;
  consentGiven: boolean;
  submittedAt: string;
  status: ApplicationStatus;
}

// Initial mock applications for Phase 5 testing
const localApplications: CareerApplication[] = [
  {
    id: "app-101",
    jobId: "job-1",
    jobTitle: "Senior Full Stack Engineer (React & Node.js)",
    firstName: "Marcus",
    lastName: "Vance",
    email: "marcus.vance@example.com",
    phone: "+1 (416) 555-0144",
    location: "Toronto, ON",
    currentTitle: "Full Stack Developer",
    currentCompany: "Shopify",
    experienceYears: "5-8 years",
    linkedinUrl: "https://linkedin.com/in/marcusvance",
    portfolioUrl: "https://marcusvance.dev",
    resumeFileName: "Marcus_Vance_Resume.pdf",
    resumeFileSize: "1.2 MB",
    resumeFileType: "application/pdf",
    isResumeBuiltLive: false,
    coverLetter: "Excited to apply for the Senior Full Stack role. I have extensive experience scaling React and Node.js applications.",
    consentGiven: true,
    submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: "Reviewing",
  },
  {
    id: "app-102",
    jobId: "job-2",
    jobTitle: "Executive Recruitment Manager",
    firstName: "Elena",
    lastName: "Rostova",
    email: "elena.r@example.com",
    phone: "+1 (647) 555-0199",
    location: "Toronto, ON",
    currentTitle: "Senior Talent Acquisition Lead",
    currentCompany: "KPMG Canada",
    experienceYears: "8+ years",
    linkedinUrl: "https://linkedin.com/in/elenarostova",
    resumeFileName: "Elena_Rostova_CV.pdf",
    resumeFileSize: "850 KB",
    resumeFileType: "application/pdf",
    isResumeBuiltLive: true,
    coverLetter: "Bringing 8+ years of high-touch executive recruitment experience across financial services and technology.",
    consentGiven: true,
    submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    status: "Shortlisted",
  },
  {
    id: "app-103",
    jobId: "job-3",
    jobTitle: "Cloud Infrastructure Architect (AWS / Azure)",
    firstName: "David",
    lastName: "Chen",
    email: "dchen.cloud@example.com",
    phone: "+1 (604) 555-0122",
    location: "Vancouver, BC",
    currentTitle: "Principal DevOps Engineer",
    currentCompany: "AWS Partner Network",
    experienceYears: "8+ years",
    linkedinUrl: "https://linkedin.com/in/dchencloud",
    portfolioUrl: "https://dchen.io",
    resumeFileName: "David_Chen_Architect.pdf",
    resumeFileSize: "2.1 MB",
    resumeFileType: "application/pdf",
    isResumeBuiltLive: false,
    coverLetter: "I specialize in multi-region AWS cloud migrations and automated Terraform deployment pipelines.",
    consentGiven: true,
    submittedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: "Interview",
  },
];

export async function submitCareerApplication(
  data: Omit<CareerApplication, "id" | "submittedAt" | "status">
): Promise<CareerApplication> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const application: CareerApplication = {
    ...data,
    id: `app_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    submittedAt: new Date().toISOString(),
    status: "New",
  };

  localApplications.unshift(application);
  return application;
}

export function getSubmittedApplications(): CareerApplication[] {
  return [...localApplications];
}

export function updateApplicationStatus(id: string, newStatus: ApplicationStatus): boolean {
  const app = localApplications.find((a) => a.id === id);
  if (!app) return false;
  app.status = newStatus;
  return true;
}
