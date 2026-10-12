import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ApplicationForm } from "@/components/careers/ApplicationForm";
import { MOCK_JOBS, type JobItem } from "@/components/careers/mockJobs";
import { getStoredJobs } from "@/lib/careers/jobs";

export const Route = createFileRoute("/careers/$slug/apply")({
  head: ({ params }) => {
    const stored = getStoredJobs();
    const job = stored.find((j) => j.slug === params.slug || j.id === params.slug) ||
      MOCK_JOBS.find((j) => j.slug === params.slug || j.id === params.slug);

    const formattedTitle = params.slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    const title = job
      ? `Apply for ${job.title} | Venus Hiring Careers`
      : `Apply for ${formattedTitle} | Venus Hiring Careers`;
    const description = job
      ? `Submit your application for the ${job.title} position in ${job.location}.`
      : "Submit your application to Venus Hiring.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: ApplicationPage,
});

function ApplicationPage() {
  const { slug } = Route.useParams();
  const decodedSlug = decodeURIComponent(slug || "").toLowerCase().trim();

  const [job, setJob] = useState<JobItem | undefined>(() =>
    MOCK_JOBS.find(
      (j) =>
        (j.slug || "").toLowerCase().trim() === decodedSlug ||
        (j.id || "").toLowerCase().trim() === decodedSlug
    )
  );

  useEffect(() => {
    const stored = getStoredJobs();
    const cached = stored.find(
      (j) =>
        (j.slug || "").toLowerCase().trim() === decodedSlug ||
        (j.id || "").toLowerCase().trim() === decodedSlug
    );
    if (cached) {
      setJob(cached);
    }

    async function loadJobDetails() {
      try {
        const res = await fetch("/api/careers/jobs");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const found = data.find(
              (j: any) =>
                (j.slug || "").toLowerCase().trim() === decodedSlug ||
                (j.id || "").toLowerCase().trim() === decodedSlug
            );
            if (found) {
              setJob(found);
            }
          }
        }
      } catch (err) {
        console.warn("Failed to fetch job details from API:", err);
      }
    }

    loadJobDetails();

    const handleUpdate = () => {
      const stored = getStoredJobs();
      const found = stored.find(
        (j) =>
          (j.slug || "").toLowerCase().trim() === decodedSlug ||
          (j.id || "").toLowerCase().trim() === decodedSlug
      );
      if (found) {
        setJob(found);
      }
      loadJobDetails();
    };

    window.addEventListener("venus_jobs_updated", handleUpdate);
    return () => window.removeEventListener("venus_jobs_updated", handleUpdate);
  }, [decodedSlug]);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main id="main-content">
        <ApplicationForm job={job} />
      </main>
      <SiteFooter />
    </div>
  );
}
