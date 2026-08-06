import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BlogAdmin } from "@/components/admin/BlogAdmin";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Sparkles, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Blog Admin Panel | Venus Consultancy" },
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
      <SiteNav onOpenAdmin={() => setIsAdminOpen(true)} />
      <main className="shell section-padding min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand border border-brand/30">
            <Sparkles className="h-8 w-8" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Blog & Content Management System
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Create, edit, delete recruitment articles, manage SEO tags, feature posts on the Homepage, and configure categories.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsAdminOpen(true)}
              className="rounded-full bg-brand px-6 py-3 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
            >
              Open Admin Control Panel →
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-xs font-bold text-foreground hover:bg-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Website
            </button>
          </div>
        </div>
      </main>
      <SiteFooter />

      <BlogAdmin isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
