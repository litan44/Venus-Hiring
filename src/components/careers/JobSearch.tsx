import { useState, useMemo, useEffect } from "react";
import { Search, SearchX, Loader2, X, AlertTriangle, CheckCircle2 } from "lucide-react";
import { JobCard } from "./JobCard";
import { JobFilters } from "./JobFilters";
import { MOCK_JOBS, type JobItem } from "./mockJobs";

export function JobSearch() {
  const [jobs, setJobs] = useState<JobItem[]>(MOCK_JOBS);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("All");
  const [location, setLocation] = useState("All");
  const [employmentType, setEmploymentType] = useState("All");
  const [experienceLevel, setExperienceLevel] = useState("All");

  useEffect(() => {
    fetch("/api/careers/jobs")
      .then((r) => (r.ok ? r.json() : MOCK_JOBS))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setJobs(data);
        }
      })
      .catch((err) => {
        console.warn("Failed to load jobs from /api/careers/jobs:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const dataSource = useMemo(() => {
    if (jobs.some((j) => j.source === "crm")) return "crm";
    if (jobs.some((j) => j.source === "database")) return "database";
    return jobs[0]?.source || "crm";
  }, [jobs]);

  const departments = useMemo(() => ["All", ...Array.from(new Set(jobs.map((j) => j.department)))], [jobs]);
  const locations = useMemo(() => ["All", ...Array.from(new Set(jobs.map((j) => j.location)))], [jobs]);
  const employmentTypes = useMemo(() => ["All", ...Array.from(new Set(jobs.map((j) => j.employmentType)))], [jobs]);
  const experienceLevels = useMemo(() => ["All", ...Array.from(new Set(jobs.map((j) => j.experienceLevel)))], [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        !searchQuery.trim() ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = department === "All" || job.department === department;
      const matchesLoc = location === "All" || job.location.includes(location);
      const matchesType = employmentType === "All" || job.employmentType === employmentType;
      const matchesLevel = experienceLevel === "All" || job.experienceLevel === experienceLevel;
      return matchesSearch && matchesDept && matchesLoc && matchesType && matchesLevel;
    });
  }, [jobs, searchQuery, department, location, employmentType, experienceLevel]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setDepartment("All");
    setLocation("All");
    setEmploymentType("All");
    setExperienceLevel("All");
  };

  return (
    <section id="open-positions" className="section-padding bg-porcelain/50 py-20 sm:py-24">
      <div className="shell">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-brand-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            CAREER OPPORTUNITIES
          </div>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            OPEN POSITIONS
          </h2>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            Discover roles where you can innovate, grow, and shape the future of talent with Venus Hiring.
          </p>
        </div>

        {/* Fallback Notice Banner when CRM is offline/maintenance */}
        {dataSource === "mock_fallback" && (
          <div className="relative mx-auto max-w-4xl mb-8 rounded-2xl border border-amber-300/60 bg-amber-50/80 p-4 sm:p-5 text-amber-900 shadow-soft flex items-start gap-3.5">
            <div className="mt-0.5 rounded-full bg-amber-200/80 p-1.5 text-amber-800 shrink-0">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div className="text-xs sm:text-sm">
              <h4 className="font-bold text-amber-950">Live Vacancy Synchronization Notice</h4>
              <p className="mt-1 text-amber-800 leading-relaxed">
                Live vacancy synchronization with Venus CRM is currently undergoing scheduled refresh. The positions displayed below represent our active recruitment categories and compensation benchmarks. Applications remain fully active.
              </p>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative mx-auto max-w-2xl mb-8">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs..."
              className="h-14 w-full rounded-2xl border border-border/80 bg-card pl-12 pr-10 text-sm font-medium text-foreground shadow-soft placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 sm:text-base"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-4 rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filters Box */}
        <JobFilters
          departments={departments}
          locations={locations}
          employmentTypes={employmentTypes}
          experienceLevels={experienceLevels}
          selectedDepartment={department}
          selectedLocation={location}
          selectedEmploymentType={employmentType}
          selectedExperienceLevel={experienceLevel}
          onDepartmentChange={setDepartment}
          onLocationChange={setLocation}
          onEmploymentTypeChange={setEmploymentType}
          onExperienceLevelChange={setExperienceLevel}
          onResetFilters={handleResetFilters}
        />

        {/* Results Info Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 px-1 text-xs font-semibold text-muted-foreground sm:text-sm">
          <div className="flex items-center gap-3">
            <span>
              Showing <strong className="text-foreground">{filteredJobs.length}</strong>{" "}
              {filteredJobs.length === 1 ? "position" : "positions"}
            </span>

            {/* Source Identification Badge */}
            {dataSource === "crm" ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live CRM Openings
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Representative Positions
              </span>
            )}
          </div>

          {loading && (
            <div className="flex items-center gap-2 text-brand">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-xs">Updating listings...</span>
            </div>
          )}
        </div>

        {/* Job Listings Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job: JobItem) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center my-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
              <SearchX className="h-7 w-7" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
              No matching positions found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              We couldn't find any positions matching your search filters. Try clearing your filters or searching for different keywords.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 rounded-full bg-brand px-6 py-2.5 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
