import { useState, useEffect } from "react";
import {
  Briefcase,
  Users,
  CheckCircle,
  XCircle,
  Plus,
  Edit2,
  Trash2,
  Eye,
  FileText,
  Search,
  X,
  Building,
  MapPin,
  Clock,
  Sparkles,
  Copy,
  Calendar,
  Filter,
  Shield,
  UserCheck,
  Award,
  Settings,
  Mail,
  Phone,
  FileCode,
  Download,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import {
  fetchAllAdminJobs,
  createAdminJob,
  updateAdminJob,
  deleteAdminJob,
  duplicateAdminJob,
  type AdminJobItem,
} from "@/lib/careers/jobs";
import {
  getSubmittedApplications,
  updateApplicationStatus,
  updateApplicationNotes,
  scheduleInterview,
  type CareerApplication,
  type ApplicationStatus,
} from "@/lib/careers/applications";

export function CareerAdmin() {
  const [jobs, setJobs] = useState<AdminJobItem[]>([]);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [activeTab, setActiveTab] = useState<
    "jobs" | "applications" | "interviews" | "settings"
  >("jobs");
  const [userRole, setUserRole] = useState<
    "Super Admin" | "HR Manager" | "Recruiter" | "Viewer"
  >("Super Admin");

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [jobDeptFilter, setJobDeptFilter] = useState("all");
  const [jobStatusFilter, setJobStatusFilter] = useState("all");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");

  const [appStatusFilter, setAppStatusFilter] = useState("all");
  const [appPosFilter, setAppPosFilter] = useState("all");

  // Modal States
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<AdminJobItem | null>(null);
  const [selectedApp, setSelectedApp] = useState<CareerApplication | null>(null);
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);
  const [interviewModalApp, setInterviewModalApp] = useState<CareerApplication | null>(null);

  // Application Notes State
  const [currentNotes, setCurrentNotes] = useState("");

  // Interview Form State
  const [interviewForm, setInterviewForm] = useState({
    interviewDate: new Date().toISOString().split("T")[0],
    interviewTime: "10:00 AM",
    interviewType: "Video" as "Phone" | "Video" | "In-person",
    interviewerName: "Sarah Jenkins (HR Lead)",
    interviewNotes: "",
    interviewFeedback: "",
    interviewResult: "Pending" as "Passed" | "Pending" | "Failed",
  });

  // Settings Form State
  const [careerSettings, setCareerSettings] = useState({
    headline: "Build Your Career at Venus Consultancy",
    description: "Join Canada's leading technology & executive talent firm.",
    benefitsText: "Competitive compensation, health insurance, hybrid work mode, learning budget.",
    cultureText: "Inclusive, merit-based, and fast-paced environment.",
    equalOpportunityText: "Venus Consultancy is an Equal Opportunity Employer.",
    contactEmail: "careers@venushiring.com",
  });

  // Job Form State
  const [jobForm, setJobForm] = useState({
    title: "",
    slug: "",
    department: "Technology",
    category: "Software Development",
    location: "Toronto, ON",
    workMode: "Hybrid" as "Remote" | "Hybrid" | "On-site",
    employmentType: "Full-Time" as "Full-Time" | "Part-Time" | "Contract" | "Internship",
    experienceLevel: "Senior" as "Entry-Level" | "Mid-Level" | "Senior" | "Executive",
    minExperience: "3 years",
    maxExperience: "7 years",
    salaryRange: "$120,000 - $150,000",
    currency: "CAD",
    description: "",
    aboutRole: "",
    responsibilities: "",
    qualifications: "",
    preferredQualifications: "",
    skills: "",
    benefits: "",
    aboutCompany: "",
    openingsCount: 1,
    hiringManager: "Executive Recruitment Team",
    applicationDeadline: "2026-12-31",
    status: "Published" as "Draft" | "Published" | "Paused" | "Closed",
  });

  // Load Data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const fetchedJobs = await fetchAllAdminJobs();
    setJobs(fetchedJobs);
    setApplications(getSubmittedApplications());
  };

  // Stats Calculations
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((j) => j.status === "Published").length;
  const draftJobs = jobs.filter((j) => j.status === "Draft").length;
  const closedJobs = jobs.filter((j) => j.status === "Closed" || j.status === "Paused").length;

  const totalApps = applications.length;
  const newApps = applications.filter((a) => a.status === "New").length;
  const shortlistedApps = applications.filter((a) => a.status === "Shortlisted").length;
  const interviewApps = applications.filter(
    (a) => a.status === "Interview Scheduled" || a.status === "Interview"
  ).length;
  const hiredApps = applications.filter((a) => a.status === "Hired").length;

  // Open Create Job Modal
  const handleOpenCreateModal = () => {
    setEditingJob(null);
    setJobForm({
      title: "",
      slug: "",
      department: "Technology",
      category: "Engineering",
      location: "Toronto, ON",
      workMode: "Hybrid",
      employmentType: "Full-Time",
      experienceLevel: "Senior",
      minExperience: "3 years",
      maxExperience: "7 years",
      salaryRange: "$120,000 - $150,000",
      currency: "CAD",
      description: "",
      aboutRole: "",
      responsibilities: "",
      qualifications: "",
      preferredQualifications: "",
      skills: "React, Node.js, TypeScript, AWS",
      benefits: "Health Insurance, Hybrid Work, Learning Allowance",
      aboutCompany: "Venus Consultancy is a premier talent solutions firm.",
      openingsCount: 1,
      hiringManager: "Recruitment Lead",
      applicationDeadline: "2026-12-31",
      status: "Published",
    });
    setIsJobModalOpen(true);
  };

  // Open Edit Job Modal
  const handleOpenEditModal = (job: AdminJobItem) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      slug: job.slug,
      department: job.department,
      category: job.category || "General",
      location: job.location,
      workMode: (job.workMode as "Remote" | "Hybrid" | "On-site") || "Hybrid",
      employmentType: (job.employmentType as "Full-Time" | "Part-Time" | "Contract" | "Internship") || "Full-Time",
      experienceLevel: (job.experienceLevel as "Entry-Level" | "Mid-Level" | "Senior" | "Executive") || "Senior",
      minExperience: job.minExperience || "3 years",
      maxExperience: job.maxExperience || "7 years",
      salaryRange: job.salaryRange || "",
      currency: job.currency || "CAD",
      description: job.description,
      aboutRole: job.aboutRole || "",
      responsibilities: job.responsibilities ? job.responsibilities.join("\n") : "",
      qualifications: job.qualifications ? job.qualifications.join("\n") : "",
      preferredQualifications: job.preferredQualifications ? job.preferredQualifications.join("\n") : "",
      skills: job.niceToHave ? job.niceToHave.join(", ") : "",
      benefits: job.benefits ? job.benefits.join("\n") : "",
      aboutCompany: job.aboutCompany || "",
      openingsCount: job.openingsCount || 1,
      hiringManager: job.hiringManager || "Hiring Team",
      applicationDeadline: job.applicationDeadline || "2026-12-31",
      status: job.status,
    });
    setIsJobModalOpen(true);
  };

  // Save Job Handler
  const handleSaveJob = async (statusOverride?: "Draft" | "Published") => {
    if (!jobForm.title.trim()) return;

    const slug =
      jobForm.slug.trim() ||
      jobForm.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const formattedData: Omit<AdminJobItem, "id" | "postedDate"> = {
      title: jobForm.title.trim(),
      slug,
      department: jobForm.department,
      category: jobForm.category,
      location: jobForm.location,
      workMode: jobForm.workMode,
      employmentType: jobForm.employmentType,
      experienceLevel: jobForm.experienceLevel,
      minExperience: jobForm.minExperience,
      maxExperience: jobForm.maxExperience,
      salaryRange: jobForm.salaryRange.trim() || undefined,
      currency: jobForm.currency,
      description: jobForm.description.trim(),
      aboutRole: jobForm.aboutRole.trim() || undefined,
      responsibilities: jobForm.responsibilities
        ? jobForm.responsibilities.split("\n").filter((l) => l.trim())
        : [],
      qualifications: jobForm.qualifications
        ? jobForm.qualifications.split("\n").filter((l) => l.trim())
        : [],
      preferredQualifications: jobForm.preferredQualifications
        ? jobForm.preferredQualifications.split("\n").filter((l) => l.trim())
        : [],
      niceToHave: jobForm.skills
        ? jobForm.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      benefits: jobForm.benefits
        ? jobForm.benefits.split("\n").filter((l) => l.trim())
        : [],
      aboutCompany: jobForm.aboutCompany,
      openingsCount: jobForm.openingsCount,
      hiringManager: jobForm.hiringManager,
      applicationDeadline: jobForm.applicationDeadline,
      status: statusOverride || jobForm.status,
    };

    if (editingJob) {
      await updateAdminJob(editingJob.id, formattedData);
    } else {
      await createAdminJob(formattedData);
    }

    setIsJobModalOpen(false);
    loadData();
  };

  // Delete Job Handler
  const handleDeleteJob = async (id: string) => {
    await deleteAdminJob(id);
    setDeletingJobId(null);
    loadData();
  };

  // Duplicate Job Handler
  const handleDuplicateJob = async (id: string) => {
    await duplicateAdminJob(id);
    loadData();
  };

  // Application Status Handler
  const handleStatusChange = (appId: string, status: ApplicationStatus) => {
    updateApplicationStatus(appId, status);
    setApplications(getSubmittedApplications());
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status });
    }
  };

  // Save Notes Handler
  const handleSaveNotes = () => {
    if (!selectedApp) return;
    updateApplicationNotes(selectedApp.id, currentNotes);
    setApplications(getSubmittedApplications());
    setSelectedApp({ ...selectedApp, internalNotes: currentNotes });
  };

  // Interview Save Handler
  const handleSaveInterview = () => {
    if (!interviewModalApp) return;
    scheduleInterview(interviewModalApp.id, interviewForm);
    setApplications(getSubmittedApplications());
    setInterviewModalApp(null);
  };

  // Filtered Jobs
  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = jobDeptFilter === "all" || j.department === jobDeptFilter;
    const matchesStatus = jobStatusFilter === "all" || j.status === jobStatusFilter;
    const matchesType = jobTypeFilter === "all" || j.employmentType === jobTypeFilter;
    return matchesSearch && matchesDept && matchesStatus && matchesType;
  });

  // Filtered Applications
  const filteredApps = applications.filter((a) => {
    const matchesSearch =
      `${a.firstName} ${a.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = appStatusFilter === "all" || a.status === appStatusFilter;
    const matchesPos = appPosFilter === "all" || a.jobTitle === appPosFilter;
    return matchesSearch && matchesStatus && matchesPos;
  });

  return (
    <div className="space-y-10 text-left">
      {/* Top Header Role Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card p-4 sm:px-6 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground block">
              Recruitment Access Level
            </span>
            <span className="text-sm font-bold text-foreground">{userRole}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground hidden sm:inline">Role View:</span>
          {(["Super Admin", "HR Manager", "Recruiter", "Viewer"] as const).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setUserRole(role)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                userRole === role
                  ? "bg-brand text-white shadow-soft"
                  : "bg-porcelain text-foreground hover:bg-accent border border-border/60"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Analytics Cards (9 Cards Grid) */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-soft hover:border-brand/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Total Jobs</span>
            <div className="h-9 w-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-foreground">{totalJobs}</p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-soft hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Active Jobs</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-emerald-600">{activeJobs}</p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-soft hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Draft Jobs</span>
            <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-amber-600">{draftJobs}</p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-soft hover:border-slate-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Closed / Paused</span>
            <div className="h-9 w-9 rounded-xl bg-slate-500/10 text-slate-600 flex items-center justify-center">
              <XCircle className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-slate-600">{closedJobs}</p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-soft hover:border-brand/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Total Apps</span>
            <div className="h-9 w-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-brand">{totalApps}</p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-soft hover:border-blue-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">New Apps</span>
            <div className="h-9 w-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-blue-600">{newApps}</p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-soft hover:border-indigo-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Shortlisted</span>
            <div className="h-9 w-9 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-indigo-600">{shortlistedApps}</p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-soft hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Interviews</span>
            <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-purple-600">{interviewApps}</p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-soft hover:border-emerald-600/30 transition-all col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Hired</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 font-display text-2xl font-bold text-emerald-600">{hiredApps}</p>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 shadow-soft space-y-6">
        {/* Navigation Tabs & Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("jobs")}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                activeTab === "jobs"
                  ? "bg-brand text-white shadow-brand"
                  : "bg-porcelain text-foreground hover:bg-accent"
              }`}
            >
              Job Postings ({jobs.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("applications")}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                activeTab === "applications"
                  ? "bg-brand text-white shadow-brand"
                  : "bg-porcelain text-foreground hover:bg-accent"
              }`}
            >
              Candidate Applications ({applications.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("interviews")}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                activeTab === "interviews"
                  ? "bg-brand text-white shadow-brand"
                  : "bg-porcelain text-foreground hover:bg-accent"
              }`}
            >
              Interview Tracker
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("settings")}
              className={`rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                activeTab === "settings"
                  ? "bg-brand text-white shadow-brand"
                  : "bg-porcelain text-foreground hover:bg-accent"
              }`}
            >
              Career Content Settings
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs, candidates..."
                className="h-10 rounded-xl border border-border bg-background pl-9 pr-3 text-xs font-medium text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            {activeTab === "jobs" && userRole !== "Viewer" && (
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand px-5 py-2.5 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
              >
                <Plus className="h-4 w-4" /> Create New Job
              </button>
            )}
          </div>
        </div>

        {/* TAB 1: JOB MANAGEMENT */}
        {activeTab === "jobs" && (
          <div className="space-y-4">
            {/* Filter Sub-bar */}
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-porcelain/40 p-3 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-muted-foreground uppercase text-[11px]">
                <Filter className="h-3.5 w-3.5" /> Filters:
              </div>

              <select
                value={jobDeptFilter}
                onChange={(e) => setJobDeptFilter(e.target.value)}
                className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground"
              >
                <option value="all">All Departments</option>
                <option value="Technology">Technology</option>
                <option value="Executive & HR">Executive & HR</option>
                <option value="Finance & Operations">Finance & Operations</option>
                <option value="Sales & Marketing">Sales & Marketing</option>
              </select>

              <select
                value={jobStatusFilter}
                onChange={(e) => setJobStatusFilter(e.target.value)}
                className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground"
              >
                <option value="all">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Paused">Paused</option>
                <option value="Closed">Closed</option>
              </select>

              <select
                value={jobTypeFilter}
                onChange={(e) => setJobTypeFilter(e.target.value)}
                className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground"
              >
                <option value="all">All Employment Types</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Contract">Contract</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-foreground">
                <thead>
                  <tr className="border-b border-border/80 uppercase tracking-wider text-[11px] text-muted-foreground font-semibold">
                    <th className="py-3 px-4">Job Title</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Location / Mode</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-porcelain/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-foreground">
                        <div>{job.title}</div>
                        <div className="text-[11px] text-muted-foreground font-normal">/{job.slug}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-flex rounded-md bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand">
                          {job.department}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        <div>{job.location}</div>
                        <div className="text-[11px] text-brand font-semibold">{job.workMode || "Hybrid"}</div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{job.employmentType}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                            job.status === "Published"
                              ? "bg-emerald-500/10 text-emerald-600"
                              : job.status === "Draft"
                              ? "bg-amber-500/10 text-amber-600"
                              : job.status === "Paused"
                              ? "bg-blue-500/10 text-blue-600"
                              : "bg-slate-500/10 text-slate-600"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleDuplicateJob(job.id)}
                            title="Duplicate Job"
                            aria-label="Duplicate position"
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-brand transition-colors"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditModal(job)}
                            aria-label="Edit position"
                            className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          {userRole !== "Viewer" && (
                            <button
                              type="button"
                              onClick={() => setDeletingJobId(job.id)}
                              aria-label="Delete position"
                              className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: APPLICATION MANAGEMENT & PIPELINE */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {/* Filter Sub-bar */}
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-porcelain/40 p-3 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-muted-foreground uppercase text-[11px]">
                <Filter className="h-3.5 w-3.5" /> Pipeline Filter:
              </div>

              <select
                value={appStatusFilter}
                onChange={(e) => setAppStatusFilter(e.target.value)}
                className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground"
              >
                <option value="all">All Pipeline Statuses</option>
                <option value="New">New Application</option>
                <option value="Under Review">Under Review</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Selected">Selected</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-foreground">
                <thead>
                  <tr className="border-b border-border/80 uppercase tracking-wider text-[11px] text-muted-foreground font-semibold">
                    <th className="py-3 px-4">Candidate Name</th>
                    <th className="py-3 px-4">Position</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Experience</th>
                    <th className="py-3 px-4">Pipeline Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-porcelain/50 transition-colors">
                      <td className="py-4 px-4 font-bold text-foreground">
                        {app.firstName} {app.lastName}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground max-w-[200px] truncate">
                        {app.jobTitle}
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">
                        <div>{app.email}</div>
                        <div className="text-[11px] text-muted-foreground/80">{app.phone}</div>
                      </td>
                      <td className="py-4 px-4 text-muted-foreground">{app.experienceYears}</td>
                      <td className="py-4 px-4">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleStatusChange(app.id, e.target.value as ApplicationStatus)
                          }
                          className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-bold text-foreground focus:border-brand"
                        >
                          <option value="New">New Application</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Interview Scheduled">Interview Scheduled</option>
                          <option value="Selected">Selected</option>
                          <option value="Hired">Hired</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedApp(app);
                              setCurrentNotes(app.internalNotes || "");
                            }}
                            className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-bold text-foreground hover:border-brand hover:text-brand"
                          >
                            <Eye className="h-3.5 w-3.5" /> Details
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setInterviewModalApp(app);
                              setInterviewForm({
                                interviewDate: new Date().toISOString().split("T")[0],
                                interviewTime: "10:00 AM",
                                interviewType: "Video",
                                interviewerName: "HR Lead",
                                interviewNotes: "",
                                interviewFeedback: "",
                                interviewResult: "Pending",
                              });
                            }}
                            className="inline-flex items-center gap-1 rounded-full bg-brand/10 border border-brand/20 px-3 py-1 text-[11px] font-bold text-brand hover:bg-brand hover:text-white"
                          >
                            <Calendar className="h-3.5 w-3.5" /> Interview
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: INTERVIEW MANAGEMENT */}
        {activeTab === "interviews" && (
          <div className="space-y-6 text-left">
            <h3 className="font-display text-lg font-bold text-foreground">Scheduled Interviews Tracker</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {applications
                .filter((a) => a.interviewDate || a.status === "Interview Scheduled")
                .map((app) => (
                  <div key={app.id} className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-soft">
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <span className="font-bold text-foreground text-sm">
                        {app.firstName} {app.lastName}
                      </span>
                      <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-bold text-brand">
                        {app.interviewType || "Video"}
                      </span>
                    </div>

                    <div className="text-xs space-y-1.5 text-muted-foreground">
                      <div><strong className="text-foreground">Position:</strong> {app.jobTitle}</div>
                      <div><strong className="text-foreground">Date & Time:</strong> {app.interviewDate || "TBD"} at {app.interviewTime || "10:00 AM"}</div>
                      <div><strong className="text-foreground">Interviewer:</strong> {app.interviewerName || "Recruiter Lead"}</div>
                      {app.interviewNotes && (
                        <div className="pt-2 italic text-foreground bg-porcelain/40 p-2 rounded-lg">
                          "{app.interviewNotes}"
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-brand">Result: {app.interviewResult || "Pending"}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="text-xs font-bold text-brand hover:underline flex items-center gap-1"
                      >
                        View Full File <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 4: CAREER CONTENT SETTINGS */}
        {activeTab === "settings" && (
          <div className="space-y-6 text-left max-w-3xl">
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">Careers Page Content Settings</h3>
              <p className="text-xs text-muted-foreground">Configure public career portal dynamic descriptions and messaging.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Careers Page Headline</label>
                <input
                  type="text"
                  value={careerSettings.headline}
                  onChange={(e) => setCareerSettings({ ...careerSettings, headline: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Careers Page Description</label>
                <textarea
                  rows={2}
                  value={careerSettings.description}
                  onChange={(e) => setCareerSettings({ ...careerSettings, description: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs font-medium text-foreground"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Company Benefits Summary</label>
                <textarea
                  rows={2}
                  value={careerSettings.benefitsText}
                  onChange={(e) => setCareerSettings({ ...careerSettings, benefitsText: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs font-medium text-foreground"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Equal Opportunity Statement</label>
                <textarea
                  rows={2}
                  value={careerSettings.equalOpportunityText}
                  onChange={(e) => setCareerSettings({ ...careerSettings, equalOpportunityText: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs font-medium text-foreground"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Careers Contact Email</label>
                <input
                  type="email"
                  value={careerSettings.contactEmail}
                  onChange={(e) => setCareerSettings({ ...careerSettings, contactEmail: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert("Career Settings saved successfully!")}
                  className="rounded-full bg-brand px-6 py-2.5 text-xs font-bold text-white shadow-brand hover:brightness-110"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CREATE / EDIT JOB MODAL */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lift max-h-[90vh] overflow-y-auto space-y-6 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <h2 className="font-display text-xl font-bold text-foreground">
                {editingJob ? "Edit Job Posting" : "Create New Job Posting"}
              </h2>
              <button
                type="button"
                onClick={() => setIsJobModalOpen(false)}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Job Title *</label>
                <input
                  type="text"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  placeholder="e.g. Senior Full Stack Engineer"
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Department</label>
                <select
                  value={jobForm.department}
                  onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                >
                  <option value="Technology">Technology</option>
                  <option value="Executive & HR">Executive & HR</option>
                  <option value="Finance & Operations">Finance & Operations</option>
                  <option value="Sales & Marketing">Sales & Marketing</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Location</label>
                <input
                  type="text"
                  value={jobForm.location}
                  onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                  placeholder="e.g. Toronto, ON"
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Work Mode</label>
                <select
                  value={jobForm.workMode}
                  onChange={(e) => setJobForm({ ...jobForm, workMode: e.target.value as "Remote" | "Hybrid" | "On-site" })}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                >
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Employment Type</label>
                <select
                  value={jobForm.employmentType}
                  onChange={(e) => setJobForm({ ...jobForm, employmentType: e.target.value as any })}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Experience Level</label>
                <select
                  value={jobForm.experienceLevel}
                  onChange={(e) => setJobForm({ ...jobForm, experienceLevel: e.target.value as any })}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                >
                  <option value="Entry-Level">Entry-Level</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior">Senior</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Salary Range</label>
                <input
                  type="text"
                  value={jobForm.salaryRange}
                  onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                  placeholder="e.g. $120,000 - $150,000"
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Currency</label>
                <select
                  value={jobForm.currency}
                  onChange={(e) => setJobForm({ ...jobForm, currency: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                >
                  <option value="CAD">CAD</option>
                  <option value="USD">USD</option>
                  <option value="INR">INR</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs font-medium text-foreground"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-semibold text-muted-foreground block mb-1">About the Role</label>
                <textarea
                  rows={3}
                  value={jobForm.aboutRole}
                  onChange={(e) => setJobForm({ ...jobForm, aboutRole: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs font-medium text-foreground"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Key Responsibilities (One per line)</label>
                <textarea
                  rows={3}
                  value={jobForm.responsibilities}
                  onChange={(e) => setJobForm({ ...jobForm, responsibilities: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs font-medium text-foreground"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Required Qualifications (One per line)</label>
                <textarea
                  rows={3}
                  value={jobForm.qualifications}
                  onChange={(e) => setJobForm({ ...jobForm, qualifications: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs font-medium text-foreground"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={() => handleSaveJob("Draft")}
                className="rounded-full border border-border bg-card px-6 py-2.5 text-xs font-bold text-foreground hover:bg-accent"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => handleSaveJob("Published")}
                className="rounded-full bg-brand px-6 py-2.5 text-xs font-bold text-white shadow-brand hover:brightness-110"
              >
                Publish Position
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANDIDATE DETAIL MODAL & NOTES */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lift max-h-[90vh] overflow-y-auto space-y-6 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand">Candidate Application File</span>
                <h2 className="font-display text-xl font-bold text-foreground">
                  {selectedApp.firstName} {selectedApp.lastName}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="rounded-full p-1.5 text-muted-foreground hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 text-xs">
              <div className="grid grid-cols-2 gap-4 rounded-xl border border-border/60 p-4 bg-porcelain/30 sm:grid-cols-3">
                <div>
                  <span className="text-muted-foreground block mb-0.5">Applied Position</span>
                  <span className="font-bold text-foreground">{selectedApp.jobTitle}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-0.5">Pipeline Status</span>
                  <span className="font-bold text-brand">{selectedApp.status}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-0.5">Applied Date</span>
                  <span className="font-semibold text-foreground">
                    {new Date(selectedApp.submittedAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-0.5">Email</span>
                  <span className="font-semibold text-foreground">{selectedApp.email}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-0.5">Phone</span>
                  <span className="font-semibold text-foreground">{selectedApp.phone}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-0.5">Experience</span>
                  <span className="font-semibold text-foreground">{selectedApp.experienceYears}</span>
                </div>
              </div>

              {selectedApp.coverLetter && (
                <div className="space-y-1">
                  <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">Cover Letter</span>
                  <p className="rounded-xl border border-border/60 p-3 bg-card text-muted-foreground leading-relaxed">
                    {selectedApp.coverLetter}
                  </p>
                </div>
              )}

              {/* Internal Notes Section */}
              <div className="space-y-2 pt-2 border-t border-border/60">
                <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">Internal Recruiter Notes</span>
                <textarea
                  rows={3}
                  value={currentNotes}
                  onChange={(e) => setCurrentNotes(e.target.value)}
                  placeholder="Add internal evaluation feedback, interview comments, or background checks..."
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs font-medium text-foreground"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="rounded-lg bg-brand px-4 py-1.5 text-xs font-bold text-white shadow-soft"
                >
                  Save Internal Notes
                </button>
              </div>

              <div className="space-y-2 pt-2 border-t border-border/60">
                <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">Resume / Attachment</span>
                {selectedApp.resumeFileName ? (
                  <div className="flex items-center justify-between rounded-xl border border-brand/30 bg-brand-soft/20 p-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-brand" />
                      <span className="font-bold text-foreground">{selectedApp.resumeFileName} ({selectedApp.resumeFileSize})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`Downloading resume: ${selectedApp.resumeFileName}`)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand hover:underline"
                    >
                      <Download className="h-3.5 w-3.5" /> Download
                    </button>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 font-bold text-emerald-600">
                    <Sparkles className="h-4 w-4" /> Built Live with Interactive Resume Builder
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="rounded-full bg-brand px-6 py-2 text-xs font-bold text-white shadow-brand"
              >
                Close File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INTERVIEW SCHEDULER MODAL */}
      {interviewModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lift text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <h3 className="font-display text-base font-bold text-foreground">
                Schedule Interview: {interviewModalApp.firstName} {interviewModalApp.lastName}
              </h3>
              <button
                type="button"
                onClick={() => setInterviewModalApp(null)}
                className="rounded-full p-1 text-muted-foreground hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Interview Date</label>
                <input
                  type="date"
                  value={interviewForm.interviewDate}
                  onChange={(e) => setInterviewForm({ ...interviewForm, interviewDate: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Interview Time</label>
                <input
                  type="text"
                  value={interviewForm.interviewTime}
                  onChange={(e) => setInterviewForm({ ...interviewForm, interviewTime: e.target.value })}
                  placeholder="e.g. 10:30 AM EST"
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                />
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Interview Type</label>
                <select
                  value={interviewForm.interviewType}
                  onChange={(e) => setInterviewForm({ ...interviewForm, interviewType: e.target.value as any })}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                >
                  <option value="Video">Video Call</option>
                  <option value="Phone">Phone Screening</option>
                  <option value="In-person">In-Person Meeting</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-muted-foreground block mb-1">Interviewer Name</label>
                <input
                  type="text"
                  value={interviewForm.interviewerName}
                  onChange={(e) => setInterviewForm({ ...interviewForm, interviewerName: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/60">
              <button
                type="button"
                onClick={() => setInterviewModalApp(null)}
                className="rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveInterview}
                className="rounded-full bg-brand px-5 py-2 text-xs font-bold text-white shadow-brand"
              >
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingJobId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-lift text-center space-y-4">
            <h3 className="font-display text-lg font-bold text-foreground">Confirm Deletion</h3>
            <p className="text-xs text-muted-foreground">
              Are you sure you want to delete this position? This action cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingJobId(null)}
                className="rounded-full border border-border bg-card px-5 py-2 text-xs font-bold text-foreground hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteJob(deletingJobId)}
                className="rounded-full bg-destructive px-5 py-2 text-xs font-bold text-white shadow-soft"
              >
                Delete Position
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
