import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  Building2,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cpu,
  Crown,
  Factory,
  FlaskConical,
  Globe2,
  Handshake,
  Headphones,
  Plane,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  Target,
  TrendingUp,
  Users2,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";
import { CtaLink, SectionHeading } from "./primitives";
import whyImg from "@/assets/hero-team.jpg";

/* ------------------------------ Trusted advisory ------------------------------ */

const STRIP_ROW1 =
  "Workforce Planning // Talent Acquisition // Executive Search // Leadership Hiring // Skills Assessment //";
const STRIP_ROW2 =
  "Contract Staffing // Permanent Staffing // HR Advisory // Talent Consulting // Recruitment Process Outsourcing //";

function OutlineRow({
  text,
  reverse,
  duration,
}: {
  text: string;
  reverse?: boolean;
  duration: number;
}) {
  return (
    <div className="group overflow-hidden select-none cursor-default" aria-hidden>
      <div
        className={cn(
          "marquee-lane flex w-max items-center gap-0 transition-[animation-play-state] group-hover:[animation-play-state:paused]",
          reverse && "marquee-lane-reverse",
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {[0, 1].map((half) => (
          <span
            key={half}
            className="shrink-0 whitespace-nowrap font-display text-[4rem] font-bold uppercase leading-none tracking-tight sm:text-[5.5rem] lg:text-[7rem]"
            style={{
              color: "transparent",
              WebkitTextStroke:
                "1.5px color-mix(in oklab, var(--color-foreground) 28%, transparent)",
              transition:
                "color 0.45s cubic-bezier(0.22,1,0.36,1), -webkit-text-stroke-color 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.45s cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--color-brand)";
              el.style.webkitTextStrokeColor = "var(--color-brand)";
              el.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "transparent";
              el.style.webkitTextStrokeColor =
                "color-mix(in oklab, var(--color-foreground) 28%, transparent)";
              el.style.transform = "scale(1)";
            }}
          >
            {text}&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

export function TrustedStrip() {
  return (
    <section
      aria-label="Trusted advisory"
      className="section-curve relative overflow-hidden border-b border-border bg-background py-16 sm:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-70"
        aria-hidden
      />
      <div className="shell relative text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-muted-foreground">
          Trusted Advisory
        </p>
        <span
          className="mx-auto mt-5 block h-px w-16 bg-gradient-to-r from-transparent via-brand to-transparent"
          aria-hidden
        />
      </div>

      <div
        className="relative mt-10 space-y-4 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <OutlineRow text={STRIP_ROW1} duration={40} />
        <OutlineRow text={STRIP_ROW2} reverse duration={52} />
      </div>
    </section>
  );
}

/* ---------------------------------- Why us ---------------------------------- */

const REASONS = [
  {
    pill: "Screening",
    title: "Vetted before you meet them",
    copy: "Structured screening, skills assessment and reference depth — shortlists average three candidates, not thirty.",
    Icon: BadgeCheck,
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop&auto=format",
  },
  {
    pill: "Local expertise",
    title: "Canadian market fluency",
    copy: "Provincial compliance, PR and work-permit pathways, and salary benchmarking across every major Canadian metro.",
    Icon: Globe2,
    image:
      "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&h=600&fit=crop&auto=format",
  },
  {
    pill: "Sourcing",
    title: "Global sourcing reach",
    copy: "Teams in Toronto, Michigan and India give you round-the-clock sourcing and access to international professionals.",
    Icon: Users2,
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop&auto=format",
  },
  {
    pill: "Partnership",
    title: "Accountable partnership",
    copy: "Weekly pipeline reporting, a named consultant and replacement guarantees written into every engagement.",
    Icon: Handshake,
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop&auto=format",
  },
];

export function WhyUs() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);

  return (
    <section
      id="why"
      className="relative isolate flex flex-col justify-center overflow-hidden bg-ink section-padding border-b border-ink-line"
    >
      <img
        src={whyImg}
        alt=""
        aria-hidden
        loading="lazy"
        width={1920}
        height={1280}
        className="absolute inset-0 -z-20 h-full w-full object-cover brightness-50 ken-burns"
      />
      <div className="absolute inset-0 -z-10 hero-scrim" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-ink/100 via-ink/95 to-ink/80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-[0.2]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-brand/25 blur-[140px]"
        aria-hidden
      />

      <div className="shell relative my-auto">
        <SectionHeading
          tone="dark"
          title="Recruitment that behaves like an in-house team"
          copy="We embed with your hiring managers, run a disciplined process, and stay accountable to the same metrics you are."
        />

        <div
          ref={ref}
          className="mt-8 lg:mt-10 flex flex-col gap-5 lg:flex-row lg:h-[460px] lg:gap-4 bg-ink/50 p-2 rounded-[2.5rem]"
        >
          {REASONS.map((reason, i) => {
            const isActive = active === i;
            const { Icon } = reason;
            return (
              <button
                key={reason.title}
                type="button"
                aria-expanded={isActive}
                onClick={() => setActive(i)}
                style={{ transitionDelay: shown ? "0ms" : `${i * 110}ms` }}
                className={cn(
                  "group relative isolate flex min-h-[22rem] flex-col overflow-hidden rounded-[2rem] p-8 text-left sm:min-h-[28rem]",
                  "glass-frost shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)]",
                  "transition-[flex,background-color,border-color,box-shadow,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "hover:-translate-y-1 lg:h-full lg:min-h-0",
                  isActive ? "lg:flex-[2.8] border-brand/60" : "lg:flex-1",
                  "reveal-item",
                  shown && "is-shown",
                )}
              >
                {/* Large Card background image */}
                <img
                  src={reason.image}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive
                      ? "scale-105 opacity-70"
                      : "scale-100 opacity-35 group-hover:opacity-50",
                  )}
                />
                {/* Gradient scrim for readable high-contrast text */}
                <span
                  className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-transparent transition-opacity duration-700 ease-out"
                  aria-hidden
                />

                <span
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-10 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    "bg-[radial-gradient(90%_70%_at_20%_0%,color-mix(in_oklab,var(--color-brand)_45%,transparent),transparent_72%)]",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                  aria-hidden
                />

                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isActive
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 -translate-y-2 scale-90 pointer-events-none",
                    )}
                  >
                    {reason.pill}
                  </span>
                  <span
                    className={cn(
                      "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-md",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-brand scale-110"
                        : "bg-white/10 text-white group-hover:bg-white/20",
                    )}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                </div>

                <h3 className="mt-auto pt-8 text-xl font-bold leading-snug text-white sm:text-2xl lg:text-[1.75rem]">
                  {reason.title}
                </h3>

                <div
                  className={cn(
                    "grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive
                      ? "mt-3 grid-rows-[1fr] opacity-100"
                      : "mt-0 grid-rows-[0fr] opacity-0 pointer-events-none",
                  )}
                >
                  <p className="overflow-hidden text-base leading-relaxed text-white/90">
                    {reason.copy}
                  </p>
                </div>

                <span
                  className={cn(
                    "mt-5 block h-1 rounded-full bg-gradient-to-r from-brand via-brand to-transparent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isActive ? "w-full opacity-100" : "w-10 opacity-30",
                  )}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
} /* --------------------------------- Services --------------------------------- */

const SERVICES_BENTO = [
  {
    id: "perm",
    tag: "Permanent Placement & Executive Search",
    metric: "98.4% Retention Rate",
    title: "Permanent & Executive Search",
    copy: "Full-time professionals and executive leadership across technology, engineering, corporate functions, and specialized operations.",
    features: ["Executive Search", "Full-Time Hiring", "Guaranteed Retention", "Skilled Trades"],
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=900&fit=crop&auto=format",
    gridClass: "lg:col-span-2 min-h-[24rem] lg:min-h-[28rem]",
  },
  {
    id: "contract",
    tag: "Flexible Staffing",
    metric: "12hr Deployment",
    title: "Contract & Temporary Staffing",
    copy: "Short- or long-term talent that flexes with project demand, fully compliant and payrolled.",
    features: ["Project Staffing", "Turnkey Payroll"],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format",
    gridClass: "lg:col-span-1 min-h-[24rem] lg:min-h-[28rem]",
  },
  {
    id: "advisory",
    tag: "Strategic Advisory",
    metric: "C-Level HR Pods",
    title: "Fractional HR & HR Advisory",
    copy: "Interim HR leadership for workforce planning, compliance frameworks, and employee engagement.",
    features: ["Compliance Audits", "Org Planning"],
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&auto=format",
    gridClass: "lg:col-span-1 min-h-[24rem] lg:min-h-[28rem]",
  },
  {
    id: "sow",
    tag: "Outcome-Based Pods",
    metric: "100% SLA Guarantee",
    title: "Statement of Work & Project Delivery",
    copy: "Specialized pods deployed against defined deliverables — outcomes, not headcount commitments.",
    features: ["Outcome SLAs", "Agile Pods", "Fixed Budget"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&h=600&fit=crop&auto=format",
    gridClass: "lg:col-span-2 min-h-[24rem] lg:min-h-[28rem]",
  },
];

const SERVICE_STATS = [
  {
    value: "14 Days",
    label: "Average Time-to-Fill",
    sub: "Fast turnaround with zero compromise on quality",
  },
  {
    value: "98.4%",
    label: "First-Year Retention Rate",
    sub: "Engineered for long-term organizational fit",
  },
  {
    value: "10,000+",
    label: "Vetted Candidate Network",
    sub: "Pre-screened professionals ready to deploy",
  },
  {
    value: "100%",
    label: "Guaranteed SLA Compliance",
    sub: "Transparent milestones & full accountability",
  },
];

export function Services() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-porcelain section-padding border-b border-border"
    >
      {/* Background Watermark Marquee */}
      <div
        className="pointer-events-none absolute top-12 left-0 right-0 -z-10 overflow-hidden opacity-[0.06] select-none"
        aria-hidden
      >
        <div className="flex w-max marquee-lane gap-8 font-display text-[7rem] lg:text-[10rem] font-black uppercase tracking-tighter text-slate-900">
          <span>
            Solutions // Permanent Staffing // Executive Search // SOW Pods // HR Advisory //
          </span>
          <span>
            Solutions // Permanent Staffing // Executive Search // SOW Pods // HR Advisory //
          </span>
        </div>
      </div>

      {/* Light background mesh, ambient glows & grid textures */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 dot-grid-light opacity-50"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-brand/15 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-brand/15 blur-[120px]"
        aria-hidden
      />

      <div className="shell relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Comprehensive Talent & Workforce Solutions"
            copy="End-to-end recruitment capabilities, agile staffing models, and strategic HR advisory tailored for high-growth enterprises and industry leaders."
          />
          <div className="flex items-center gap-3 shrink-0 self-start lg:self-end">
            <CtaLink href="https://www.venushiring.ca/contact" variant="outline" size="lg">
              Talk to a consultant
            </CtaLink>
          </div>
        </div>

        {/* Outer Panel Wrapper that frames and fills space around the cards */}
        <div className="mt-10 rounded-[3rem] border border-slate-200/80 bg-slate-100/60 p-3 sm:p-5 lg:p-6 shadow-inner backdrop-blur-md">
          {/* 4-Bento Grid */}
          <div ref={ref} className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_BENTO.map((item, i) => (
              <a
                key={item.id}
                href="https://www.venushiring.ca/contact"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative isolate flex flex-col justify-between overflow-hidden rounded-[2.25rem] p-8 sm:p-10",
                  "border border-border/80 bg-background/90 backdrop-blur-xl shadow-[0_20px_50px_-20px_rgba(15,23,42,0.15)]",
                  "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_25px_60px_-25px_rgba(224,30,55,0.25)]",
                  "reveal-item",
                  shown && "is-shown",
                  item.gridClass,
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Card background image with zoom effect */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover brightness-[0.4] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:brightness-[0.48]"
                />
                {/* Gradient scrim */}
                <span
                  className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/80 to-ink/20"
                  aria-hidden
                />

                {/* Hover red radial glow */}
                <span
                  className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(80%_80%_at_50%_0%,color-mix(in_oklab,var(--color-brand)_35%,transparent),transparent_75%)]"
                  aria-hidden
                />

                {/* Top badges bar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md">
                    {item.tag}
                  </span>
                </div>

                {/* Card Bottom content */}
                <div className="mt-12 flex flex-col justify-end">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[1.85rem]">
                      {item.title}
                    </h3>
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-brand group-hover:border-brand group-hover:text-white backdrop-blur-md">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>

                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85">
                    {item.copy}
                  </p>

                  {/* Feature pills */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.features.map((feat) => (
                      <span
                        key={feat}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm transition-colors group-hover:border-white/30 group-hover:bg-white/20"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}

            {/* Master Full-Width Feature Card for Startup & Employer Brand Strategy */}
            <a
              href="https://www.venushiring.ca/contact"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative isolate flex flex-col justify-between overflow-hidden rounded-[2.25rem] p-8 sm:p-10 lg:col-span-3",
                "border border-border/80 bg-gradient-to-br from-white via-slate-50 to-brand-soft/20 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.12)] backdrop-blur-xl",
                "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "hover:border-brand/60 hover:shadow-[0_25px_60px_-25px_rgba(224,30,55,0.2)]",
                "reveal-item",
                shown && "is-shown",
              )}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-foreground shadow-sm">
                      Startup & Talent Strategy
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand-soft/50 px-3.5 py-1.5 text-xs font-semibold text-brand">
                      <TrendingUp className="h-3.5 w-3.5 text-brand" />
                      Scaleup Accelerator
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-3xl">
                    Startup Scaleup & Employer Brand Consulting
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    Process design, hiring manager training, candidate experience optimization, and
                    employer branding that compounds over every single hire.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    {[
                      "Founding-Team Hiring",
                      "Pipeline Architecture",
                      "Employer Branding",
                      "0-50 Scaleup Pods",
                    ].map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start lg:items-end justify-center lg:col-span-5 border-t lg:border-t-0 lg:border-l border-border/70 pt-6 lg:pt-0 lg:pl-8">
                  <div className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-brand transition-all duration-300 group-hover:scale-105 group-hover:brightness-110">
                    Book Strategy Call
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Industries -------------------------------- */

const INDUSTRIES = [
  {
    id: "01",
    name: "Finance & Accounting",
    icon: Building2,
    copy: "Connecting top financial controllers, CPAs, and FP&A leaders to drive sustainable fiscal growth.",
    roles: ["Financial Controller", "CPA", "FP&A Analyst", "Internal Auditor"],
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: "02",
    name: "Technology",
    icon: Cpu,
    copy: "High-caliber engineering, AI, cloud, and product leaders built for rapid technical execution.",
    roles: ["Full Stack Engineer", "DevOps Lead", "AI/ML Engineer", "Product Director"],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: "03",
    name: "Automotive & EV",
    icon: Car,
    copy: "Next-gen mobility leaders across EV battery architecture, plant operations, and autonomous tech.",
    roles: ["EV Battery Engineer", "Plant Manager", "Quality Engineer", "Supply Chain Lead"],
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: "04",
    name: "Aerospace",
    icon: Plane,
    copy: "Cleared, certified, and compliance-ready aerospace design engineers, avionics, and flight systems talent.",
    roles: [
      "Aerospace Systems Engineer",
      "Avionics Specialist",
      "Stress Analyst",
      "Compliance Lead",
    ],
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: "05",
    name: "AutoTech",
    icon: Zap,
    copy: "Bridging software innovation with automotive hardware to build the connected vehicles of tomorrow.",
    roles: ["Embedded Systems Developer", "CAN Bus Architect", "ADAS Engineer", "Firmware Lead"],
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: "06",
    name: "Customer Service & Tech Support",
    icon: Headphones,
    copy: "Tier 1-3 support specialists and customer success directors focused on retention and satisfaction.",
    roles: ["Technical Support Lead", "Customer Success VP", "Helpdesk Supervisor", "CX Manager"],
    image:
      "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: "07",
    name: "C-Suite & Executive",
    icon: Crown,
    copy: "Retained and confidential executive search for visionary CEOs, CTOs, CFOs, and Board Directors.",
    roles: [
      "CEO / President",
      "Chief Technology Officer",
      "Chief Financial Officer",
      "VP Operations",
    ],
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: "08",
    name: "Clinical Research",
    icon: Stethoscope,
    copy: "Pharma, biotech, and clinical trial managers ensuring regulatory compliance and trial excellence.",
    roles: [
      "Clinical Trial Manager",
      "Biostatistician",
      "Regulatory Affairs Lead",
      "CRA Specialist",
    ],
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: "09",
    name: "E-commerce & Supply Chain",
    icon: ShoppingBag,
    copy: "End-to-end logistics, warehouse automation, and omnichannel fulfillment operational experts.",
    roles: [
      "Supply Chain Director",
      "Logistics Specialist",
      "Warehouse Ops Manager",
      "Fulfillment Director",
    ],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: "10",
    name: "Manufacturing & Skilled Trade",
    icon: Factory,
    copy: "Skilled tradespeople, millwrights, CNC programmers, and industrial plant operations leaders.",
    roles: ["CNC Machinist", "Industrial Millwright", "Tool & Die Maker", "Production Supervisor"],
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&auto=format",
  },
  {
    id: "11",
    name: "Scientific Outsourcing",
    icon: FlaskConical,
    copy: "Specialized lab technicians, chemists, and R&D researchers for contract laboratory engagements.",
    roles: ["Lab Research Scientist", "Analytical Chemist", "QA/QC Auditor", "Biochemist"],
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&h=600&fit=crop&auto=format",
  },
];

export function Industries() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Automatic continuous smooth scroll loop (with reduced motion & focus safety)
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    let animId: number;
    let lastTime = performance.now();

    const scroll = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (!isDragging && !isHovered && containerRef.current) {
        containerRef.current.scrollLeft += delta * 0.06;

        // Reset scroll position when reaching the end
        const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth;
        if (containerRef.current.scrollLeft >= maxScroll - 2) {
          containerRef.current.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(scroll);
    };

    animId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animId);
  }, [isDragging, isHovered]);

  // Pointer drag interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.clientX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.clientX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.6;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollNav = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    setIsHovered(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    const scrollAmount = 380;
    const current = containerRef.current.scrollLeft;
    const target = direction === "left" ? current - scrollAmount : current + scrollAmount;

    containerRef.current.scrollTo({
      left: target,
      behavior: "smooth",
    });

    pauseTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 1800);
  };

  // Render exactly the 11 unique industry cards (01 to 11)
  const items = INDUSTRIES;

  return (
    <section
      id="industries"
      className="relative isolate overflow-hidden bg-ink section-padding border-b border-ink-line"
      aria-label="Industries we serve"
    >
      {/* High-tech ambient background glow & mesh grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-[0.18]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand/20 blur-[150px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-brand/15 blur-[140px]"
        aria-hidden
      />

      <div className="shell relative">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading tone="dark" title="Industries We Serve" />

          {/* Interactive Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollNav("left")}
              aria-label="Scroll left"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-line bg-ink-soft/50 text-ink-foreground transition-all duration-300 hover:scale-105 hover:border-brand hover:bg-brand/20 hover:text-white active:scale-95 shadow-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollNav("right")}
              aria-label="Scroll right"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-line bg-ink-soft/50 text-ink-foreground transition-all duration-300 hover:scale-105 hover:border-brand hover:bg-brand/20 hover:text-white active:scale-95 shadow-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Loop Canvas Scroll */}
      <div
        className="relative mt-14 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handlePointerUp();
          }}
          className={cn(
            "no-scrollbar flex gap-6 overflow-x-auto select-none py-6 px-6 touch-pan-y",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex gap-6 shrink-0">
            {items.map((ind, i) => {
              return (
                <a
                  key={`${ind.name}-${i}`}
                  href="https://www.venushiring.ca/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex w-[330px] shrink-0 flex-col overflow-hidden rounded-3xl border border-ink-line bg-ink-soft/30 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-brand/60 hover:shadow-[0_20px_50px_-15px_rgba(239,68,68,0.35)] sm:w-[360px]"
                >
                  {/* Card Background Image Header */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={ind.image}
                      alt={ind.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent opacity-90"
                      aria-hidden
                    />

                    {/* ID Badge */}
                    <span className="absolute top-4 right-4 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-mono font-semibold text-white/90 backdrop-blur-md">
                      {ind.id}
                    </span>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-xl font-bold text-ink-foreground transition-colors duration-300 group-hover:text-brand">
                      {ind.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-foreground/75">
                      {ind.copy}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Process ---------------------------------- */

const PROCESS_STEPS = [
  {
    n: "01",
    tag: "Discovery",
    title: "Deep Role & Culture Discovery",
    copy: "We map position requirements, compensation, team culture, and non-negotiables in one focused calibration session.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&h=1200&fit=crop&auto=format",
    topNumber: true,
  },
  {
    n: "02",
    tag: "Sourcing",
    title: "Targeted Precision Sourcing",
    copy: "Agile outreach across top-tier Canadian and international talent pools to present candidates within 5 days.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&h=1200&fit=crop&auto=format",
    topNumber: false,
  },
  {
    n: "03",
    tag: "Assessment",
    title: "Rigorous Skills Verification",
    copy: "Structured interviews, technical evaluations, and deep reference checks before any profile reaches your desk.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&h=1200&fit=crop&auto=format",
    topNumber: true,
  },
  {
    n: "04",
    tag: "Shortlist",
    title: "Calibrated Shortlist Delivery",
    copy: "Three to five interview-ready candidates with written rationale, skill assessments, and salary expectations.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=1200&fit=crop&auto=format",
    topNumber: false,
  },
  {
    n: "05",
    tag: "Offer & Onboard",
    title: "Offer & Retention Onboarding",
    copy: "We manage offer negotiation, compliance, and guaranteed 90-day retention check-ins for complete peace of mind.",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&h=1200&fit=crop&auto=format",
    topNumber: true,
  },
];

export function Process() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [activeStep, setActiveStep] = useState<number | null>(0);

  return (
    <section
      id="process"
      className="relative overflow-hidden border-b border-border bg-porcelain section-padding"
    >
      {/* Background aesthetics */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 dot-grid-light opacity-[0.25]"
        aria-hidden
      />

      <div className="shell relative">
        <SectionHeading
          title="A hiring process built for speed and precision"
          copy="Five transparent stages, defined timelines, and dedicated recruitment experts committed to your success."
        />

        {/* 5 Vertical High-Tech Accordion Cards */}
        <div ref={ref} className="mt-14 flex flex-col gap-4 lg:flex-row lg:h-[580px] lg:gap-5">
          {PROCESS_STEPS.map((s, i) => {
            const isActive = activeStep === i;
            return (
              <div
                key={s.n}
                onMouseEnter={() => setActiveStep(i)}
                onFocus={() => setActiveStep(i)}
                onClick={() => setActiveStep(i)}
                onTouchStart={() => setActiveStep(i)}
                className={cn(
                  "group relative isolate flex flex-col justify-between overflow-hidden rounded-[2.25rem] p-7 sm:p-9",
                  "cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  "shadow-[0_15px_45px_-20px_rgba(15,23,42,0.25)] hover:shadow-[0_30px_70px_-20px_rgba(224,30,55,0.35)]",
                  "min-h-[420px] lg:min-h-0 lg:h-full",
                  isActive ? "lg:flex-[2.6] border-brand/60" : "lg:flex-1 lg:hover:flex-[2.6]",
                  "reveal-item",
                  shown && "is-shown",
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Background Image with Zoom */}
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={900}
                  height={1200}
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive ? "scale-105" : "group-hover:scale-105",
                  )}
                />

                {/* Default Scrim & Red Accent Overlay on Hover */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink/95 via-ink/65 to-ink/20 transition-opacity duration-700 ease-out",
                    isActive ? "opacity-0" : "group-hover:opacity-0 opacity-100",
                  )}
                  aria-hidden
                />
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-brand/95 via-brand/80 to-black/30 transition-opacity duration-700 ease-out",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                  )}
                  aria-hidden
                />

                {/* 1. Header (Category Badge on Left + Step Number on Right) - Absolute Z-30 */}
                <div className="absolute top-6 left-6 right-6 sm:top-8 sm:left-8 sm:right-8 z-30 flex items-center justify-between pointer-events-none">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-500 backdrop-blur-md shadow-sm truncate max-w-[calc(100%-48px)]",
                      isActive
                        ? "border-white bg-white text-brand"
                        : "border-white/30 bg-black/50 text-white group-hover:border-white group-hover:bg-white group-hover:text-brand",
                    )}
                  >
                    {s.tag}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-2xl sm:text-3xl font-black tracking-tight transition-all duration-500 shrink-0 ml-2 drop-shadow-md",
                      isActive ? "text-white opacity-100" : "text-white/80 opacity-90 group-hover:opacity-100",
                    )}
                  >
                    {s.n}
                  </span>
                </div>

                {/* 2. Arrow Button - Absolutely Positioned Bottom Right (Z-30) */}
                <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 pointer-events-none">
                  <span
                    className={cn(
                      "inline-flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full transition-all duration-500 ease-out backdrop-blur-md shadow-lg",
                      isActive
                        ? "bg-white text-brand scale-110"
                        : "bg-white/25 text-white group-hover:bg-white group-hover:text-brand group-hover:scale-110",
                    )}
                  >
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                {/* 3. Main Card Body Safe Container (pt-20 pb-20 prevents header/footer collisions) */}
                <div className="relative z-10 flex h-full flex-col justify-between pt-14 pb-12 sm:pt-16 sm:pb-14">
                  {/* Vertical Title (Closed) / Horizontal Title (Open) */}
                  <div className="my-auto flex items-center justify-center lg:justify-start">
                    <h3
                      className={cn(
                        "font-bold leading-tight text-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] text-2xl sm:text-3xl drop-shadow-sm",
                        isActive
                          ? "lg:[writing-mode:horizontal-tb] lg:rotate-0 lg:whitespace-normal lg:text-3xl"
                          : "lg:[writing-mode:vertical-rl] lg:rotate-180 lg:whitespace-nowrap lg:tracking-wide lg:text-2.5xl",
                      )}
                    >
                      {s.title}
                    </h3>
                  </div>

                  {/* Open State Only Content: Description & Phase Label */}
                  {isActive && (
                    <div className="mt-4 transition-all duration-500 pr-12">
                      <p className="text-sm leading-relaxed text-white/95 mb-4">
                        {s.copy}
                      </p>
                      <div className="pt-3 border-t border-white/30">
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          Phase {s.n}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------- Stats ----------------------------------- */

const METRICS = [
  {
    value: 12,
    suffix: "+",
    label: "Years of expertise",
    sub: "Decades of refined recruitment strategy",
  },
  {
    value: 4800,
    suffix: "+",
    label: "Successful placements",
    sub: "Connecting talent with opportunity",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client satisfaction",
    sub: "Consistently exceeding expectations",
  },
  { value: 14, suffix: " days", label: "Average time to hire", sub: "From brief to signed offer" },
];

function useCountUp(target: number, run: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let frame = 0;
    const total = 60;
    const id = setInterval(() => {
      frame += 1;
      const p = 1 - Math.pow(1 - frame / total, 3);
      setValue(Math.round(target * p));
      if (frame >= total) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [target, run]);
  return value;
}

function Metric({
  metric,
  run,
  index,
}: {
  metric: (typeof METRICS)[number];
  run: boolean;
  index: number;
}) {
  const v = useCountUp(metric.value, run);
  return (
    <div
      className={cn(
        "group relative isolate overflow-hidden rounded-[1.75rem] glass-panel p-8",
        "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_30px_70px_-40px_rgba(15,23,42,0.5)]",
        "transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:-translate-y-2 hover:ring-brand-soft",
        "reveal-item",
        run && "is-shown",
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <span
        className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(50%_100%_at_50%_100%,var(--color-brand-soft),transparent_70%)]"
        aria-hidden
      />
      <p className="font-display text-5xl font-semibold tracking-[-0.04em] lg:text-6xl">
        {v.toLocaleString("en-CA")}
        <span className="text-brand">{metric.suffix}</span>
      </p>
      <p className="mt-5 text-base font-semibold">{metric.label}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{metric.sub}</p>
      <span
        className="mt-6 block h-px w-12 bg-brand/70 transition-all duration-500 ease-out group-hover:w-full"
        aria-hidden
      />
    </div>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setRun(true)),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section-curve relative -mt-8 overflow-hidden border-b border-border bg-porcelain section-padding">
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 dot-grid-light opacity-[0.28]"
        aria-hidden
      />
      <div className="shell relative" ref={ref}>
        <SectionHeading
          title="Our proven track record speaks volumes"
          copy="We deliver measurable results through strategic talent solutions across Canadian and North American industries."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <Metric key={m.label} metric={m} run={run} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { BlogCarousel } from "./BlogCarousel";
