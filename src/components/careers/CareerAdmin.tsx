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
} from "lucide-react";
import {
  fetchAllAdminJobs,
  createAdminJob,
  updateAdminJob,
  deleteAdminJob,
  type AdminJobItem,
} from "@/lib/careers/jobs";
import {
  getSubmittedApplications,
  updateApplicationStatus,
  type CareerApplication,
  type ApplicationStatus,
} from "@/lib/careers/applications";

export function CareerAdmin() {
  const [jobs, setJobs] = useState<AdminJobItem[]>([]);
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");
  const [searchQuery, setSearchQuery] = useState("");

  // Modal States
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<AdminJobItem | null>(null);
  const [selectedApp, setSelectedApp] = useState<CareerApplication | null>(null);
  const [deletingJobId, setDeletingJobId] = useState<string | null>(null);

  // Job Form State
  const [jobForm, setJobForm] = useState({
    title: "",
    slug: "",
    department: "Technology",
    location: "Toronto, ON (Hybrid)",
    employmentType: "Full-Time",
    experienceLevel: "Senior",
    salaryRange: "",
    description: "",
    aboutRole: "",
    responsibilities: "",
    qualifications: "",
    niceToHave: "",
    benefits: "",
    status: "Published" as "Draft" | "Published" | "Closed",
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
  const closedJobs = jobs.filter((j) => j.status === "Closed").length;
  const totalApps = applications.length;

  // Open Create Job Modal
  const handleOpenCreateModal = () => {
    setEditingJob(null);
    setJobForm({
      title: "",
      slug: "",
      department: "Technology",
      location: "Toronto, ON (Hybrid)",
      employmentType: "Full-Time",
      experienceLevel: "Senior",
      salaryRange: "$120,000 - $150,000 CAD",
      description: "",
      aboutRole: "",
      responsibilities: "",
      qualifications: "",
      niceToHave: "",
      benefits: "",
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
      location: job.location,
      employmentType: job.employmentType,
      experienceLevel: job.experienceLevel,
      salaryRange: job.salaryRange || "",
      description: job.description,
      aboutRole: job.aboutRole || "",
      responsibilities: job.responsibilities ? job.responsibilities.join("\n") : "",
      qualifications: job.qualifications ? job.qualifications.join("\n") : "",
      niceToHave: job.niceToHave ? job.niceToHave.join("\n") : "",
      benefits: job.benefits ? job.benefits.join("\n") : "",
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

    const formattedData = {
      title: jobForm.title.trim(),
      slug,
      department: jobForm.department,
      location: jobForm.location,
      employmentType: jobForm.employmentType,
      experienceLevel: jobForm.experienceLevel,
      salaryRange: jobForm.salaryRange.trim() || undefined,
      description: jobForm.description.trim(),
      aboutRole: jobForm.aboutRole.trim() || undefined,
      responsibilities: jobForm.responsibilities
        ? jobForm.responsibilities.split("\n").filter((line) => line.trim())
        : [],
      qualifications: jobForm.qualifications
        ? jobForm.qualifications.split("\n").filter((line) => line.trim())
        : [],
      niceToHave: jobForm.niceToHave
        ? jobForm.niceToHave.split("\n").filter((line) => line.trim())
        : [],
      benefits: jobForm.benefits
        ? jobForm.benefits.split("\n").filter((line) => line.trim())
        : [],
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

  // Application Status Handler
  const handleStatusChange = (appId: string, status: ApplicationStatus) => {
    updateApplicationStatus(appId, status);
    setApplications(getSubmittedApplications());
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, status });
    }
  };

  // Filtered Jobs
  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtered Applications
  const filteredApps = applications.filter(
    (a) =>
      `${a.firstName} ${a.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 text-left">
      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Jobs</span>
            <div className="h-9 w-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
              <Briefcase className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-foreground">{totalJobs}</p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Published</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-emerald-600">{activeJobs}</p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Closed</span>
            <div className="h-9 w-9 rounded-xl bg-slate-500/10 text-slate-600 flex items-center justify-center">
              <XCircle className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-slate-600">{closedJobs}</p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Applicants</span>
            <div className="h-9 w-9 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl font-bold text-brand">{totalApps}</p>
        </div>
      </div>

      {/* Main Admin Content Container */}
      <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-soft space-y-6">
        {/* Navigation Tabs & Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("jobs")}
              className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
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
              className={`rounded-xl px-5 py-2.5 text-xs font-bold transition-all ${
                activeTab === "applications"
                  ? "bg-brand text-white shadow-brand"
                  : "bg-porcelain text-foreground hover:bg-accent"
              }`}
            >
              Candidate Applications ({applications.length})
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="h-10 rounded-xl border border-border bg-background pl-9 pr-3 text-xs font-medium text-foreground focus:border-brand focus:outline-none"
              />
            </div>

            {activeTab === "jobs" && (
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
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-foreground">
              <thead>
                <tr className="border-b border-border/80 uppercase tracking-wider text-[11px] text-muted-foreground font-semibold">
                  <th className="py-3 px-4">Job Title</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-porcelain/50 transition-colors">
                    <td className="py-4 px-4 font-bold text-foreground">{job.title}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex rounded-md bg-brand-soft px-2.5 py-1 text-[11px] font-semibold text-brand">
                        {job.department}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{job.location}</td>
                    <td className="py-4 px-4 text-muted-foreground">{job.employmentType}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          job.status === "Published"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : job.status === "Draft"
                            ? "bg-amber-500/10 text-amber-600"
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
                          onClick={() => handleOpenEditModal(job)}
                          aria-label="Edit position"
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingJobId(job.id)}
                          aria-label="Delete position"
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: APPLICATION MANAGEMENT */}
        {activeTab === "applications" && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-foreground">
              <thead>
                <tr className="border-b border-border/80 uppercase tracking-wider text-[11px] text-muted-foreground font-semibold">
                  <th className="py-3 px-4">Candidate Name</th>
                  <th className="py-3 px-4">Position</th>
                  <th className="py-3 px-4">Email / Phone</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Details</th>
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
                        className="rounded-lg border border-border bg-background px-2 py-1 text-xs font-bold text-foreground focus:border-brand"
                      >
                        <option value="New">New</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedApp(app)}
                        className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-bold text-foreground hover:border-brand hover:text-brand"
                      >
                        <Eye className="h-3.5 w-3.5" /> View Application
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CREATE / EDIT JOB MODAL */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lift max-h-[90vh] overflow-y-auto space-y-6">
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  placeholder="e.g. Toronto, ON (Hybrid)"
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Employment Type</label>
                <select
                  value={jobForm.employmentType}
                  onChange={(e) => setJobForm({ ...jobForm, employmentType: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-Time">Part-Time</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Experience Level</label>
                <select
                  value={jobForm.experienceLevel}
                  onChange={(e) => setJobForm({ ...jobForm, experienceLevel: e.target.value })}
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                >
                  <option value="Entry-Level">Entry-Level</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior">Senior</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Salary Range</label>
                <input
                  type="text"
                  value={jobForm.salaryRange}
                  onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                  placeholder="e.g. $120,000 - $150,000 CAD"
                  className="h-10 w-full rounded-xl border border-border bg-background px-3 text-xs font-medium text-foreground"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs font-medium text-foreground"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground block mb-1">About the Role</label>
                <textarea
                  rows={3}
                  value={jobForm.aboutRole}
                  onChange={(e) => setJobForm({ ...jobForm, aboutRole: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs font-medium text-foreground"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Key Responsibilities (One per line)</label>
                <textarea
                  rows={3}
                  value={jobForm.responsibilities}
                  onChange={(e) => setJobForm({ ...jobForm, responsibilities: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs font-medium text-foreground"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Qualifications & Requirements (One per line)</label>
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
                Save as Draft
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

      {/* CANDIDATE APPLICATION DETAIL MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-lift max-h-[90vh] overflow-y-auto space-y-6 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand">Candidate Details</span>
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

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 rounded-xl border border-border/60 p-4 bg-porcelain/30">
                <div>
                  <span className="text-muted-foreground block mb-0.5">Applied Position</span>
                  <span className="font-bold text-foreground">{selectedApp.jobTitle}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-0.5">Status</span>
                  <span className="font-bold text-brand">{selectedApp.status}</span>
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
                <div>
                  <span className="text-muted-foreground block mb-0.5">Location</span>
                  <span className="font-semibold text-foreground">{selectedApp.location || "N/A"}</span>
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

              <div className="space-y-2 pt-2">
                <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">Resume / CV Information</span>
                {selectedApp.resumeFileName ? (
                  <div className="flex items-center justify-between rounded-xl border border-brand/30 bg-brand-soft/20 p-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-brand" />
                      <span className="font-bold text-foreground">{selectedApp.resumeFileName} ({selectedApp.resumeFileSize})</span>
                    </div>
                  </div>
                ) : selectedApp.isResumeBuiltLive ? (
                  <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 font-bold text-emerald-600">
                    <Sparkles className="h-4 w-4" /> Built Live with Interactive Resume Builder
                  </div>
                ) : (
                  <span className="text-muted-foreground">No file attached</span>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="rounded-full bg-brand px-6 py-2 text-xs font-bold text-white shadow-brand"
              >
                Close Candidate Details
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
            <p className="text-xs text-muted-foreground">Are you sure you want to delete this job posting? This action cannot be undone.</p>
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
