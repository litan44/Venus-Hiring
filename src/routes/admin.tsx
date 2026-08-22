import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BlogAdmin } from "@/components/admin/BlogAdmin";
import { CareerAdmin } from "@/components/careers/CareerAdmin";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Sparkles, ArrowLeft, BookOpen, Briefcase } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Control Panel | Venus Consultancy" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [isAdminOpen, setIsAdminOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Main Admin Page Container */}
      <main className="shell section-padding min-h-[75vh] py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                VENUS EXECUTIVE ADMIN
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl tracking-tight">
                Blog CMS Control Panel
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/admin/careers"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
              >
                <Briefcase className="h-4 w-4" /> Career Admin Panel →
              </a>

              <button
                type="button"
                onClick={() => navigate({ to: "/" })}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-xs font-bold text-foreground hover:bg-accent transition-colors shadow-soft"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Website
              </button>
            </div>
          </div>

          {/* Blog CMS Management Content */}
          <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-soft text-center space-y-4 py-16">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/20">
              <BookOpen className="h-7 w-7" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">Blog & Content Management System</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Create, edit, delete recruitment articles, manage SEO meta tags, and configure categories.
            </p>
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="rounded-full bg-brand px-6 py-3 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
            >
              Open Blog Admin Panel →
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />

      {/* Existing Blog Admin Modal */}
      <BlogAdmin isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
