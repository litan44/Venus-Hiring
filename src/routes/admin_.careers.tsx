import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CareerAdmin } from "@/components/careers/CareerAdmin";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Sparkles, ArrowLeft, Briefcase, BookOpen } from "lucide-react";

export const Route = createFileRoute("/admin_/careers")({
  head: () => ({
    meta: [
      { title: "Career Management Panel | Venus Consultancy Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CareerAdminPage,
});

function CareerAdminPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Main Career Admin Container */}
      <main className="shell section-padding min-h-[75vh] py-12">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                VENUS CAREER MANAGEMENT
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl tracking-tight">
                Career Admin Panel
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/admin"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-xs font-bold text-foreground hover:bg-accent transition-colors shadow-soft"
              >
                <BookOpen className="h-4 w-4" /> Blog CMS Admin
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

          {/* Dedicated Career Admin Dashboard & Management */}
          <CareerAdmin />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
