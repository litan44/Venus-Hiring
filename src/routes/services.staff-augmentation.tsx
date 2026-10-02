import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Clock,
  DollarSign,
  ShieldCheck,
  Users,
  Code,
  Building2,
  Sparkles,
  HelpCircle,
  Briefcase,
  Calendar,
  Zap,
  Scale,
  Globe,
  ChevronDown,
  AlertCircle,
  TrendingUp,
  Layers,
  FileText,
  UserCheck,
  Check,
  X,
  PhoneCall,
  Laptop,
  HeartPulse,
  Car,
  Calculator,
} from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import servicesHero from "@/assets/services-hero.jpg";

const META_TITLE = "Staff Augmentation Services for US & Canada | Venus Hiring";
const META_DESCRIPTION =
  "Venus Hiring provides staff augmentation services and contract staffing for US and Canadian employers in IT, finance, healthcare, and automotive. Get a quote.";
const CANONICAL_URL = "https://venushiring.com/services/staff-augmentation";

export const Route = createFileRoute("/services/staff-augmentation")({
  head: () => ({
    meta: [
      { title: META_TITLE },
      { name: "description", content: META_DESCRIPTION },
      {
        name: "keywords",
        content:
          "staff augmentation services, staff augmentation company, flexible staffing, contract staffing, team augmentation, extended teams, workforce augmentation, resource augmentation, offshore staffing, nearshore staffing",
      },
      { property: "og:title", content: META_TITLE },
      { property: "og:description", content: META_DESCRIPTION },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: META_TITLE },
      { name: "twitter:description", content: META_DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: CANONICAL_URL }],
  }),
  component: StaffAugmentationPage,
});

// ── FAQ DATA (All 11 FAQs from finalized document) ──
const FAQ_ITEMS = [
  {
    q: "What is staff augmentation?",
    a: "Staff augmentation is a flexible hiring model where a company adds external professionals to its existing team for a defined period or project, without making them permanent employees.",
  },
  {
    q: "How does staff augmentation work?",
    a: "A staffing partner sources and screens candidates, presents a shortlist, and the employer selects and onboards the chosen professional, who then works under the employer's management for the length of the engagement.",
  },
  {
    q: "What is the difference between staff augmentation and contract staffing?",
    a: "The terms are closely related. Staff augmentation typically describes embedding an individual directly into your team under your management, while contract staffing can refer more broadly to any fixed-term placement, including through a staffing agency.",
  },
  {
    q: "What is the difference between staff augmentation and direct hiring?",
    a: "Direct hire brings on a permanent employee for a long-term role. Staff augmentation adds a professional for a defined period or project, without the long-term commitment.",
  },
  {
    q: "How much does staff augmentation cost?",
    a: "Cost depends on skill level, role complexity, location, and contract duration. On current benchmark roles, direct-hire placements typically run 12–18% of base salary, with flat-fee contractor options available for select technical roles — below the 20–25% many traditional agencies charge.",
  },
  {
    q: "How quickly can staff augmentation talent be hired?",
    a: "Timelines vary by role and specialization. On current benchmark roles (engineering, technical, and GTM positions), Venus typically delivers a vetted shortlist in 2–3 days, compared with a roughly 44-day industry average. Timelines for other roles are confirmed at the start of each engagement.",
  },
  {
    q: "What types of professionals can be hired through staff augmentation?",
    a: "Venus Hiring provides staff augmentation across IT & Technology, Finance & Accounting, Healthcare, and Automotive & EV.",
  },
  {
    q: "Is staff augmentation suitable for small businesses?",
    a: "Yes. It allows smaller teams to access specialized skills for a project without the overhead of a permanent hire.",
  },
  {
    q: "Can staff augmentation support remote teams?",
    a: "Yes. With delivery operations across the US, Canada, and India, Venus Hiring supports remote and cross-border staffing arrangements.",
  },
  {
    q: "How long can a staff augmentation engagement last?",
    a: "Engagement length depends on the project or need — from a short-term coverage gap to a longer multi-month engagement.",
  },
  {
    q: "What happens if a placement doesn't work out?",
    a: "Venus Hiring works to find a suitable replacement rather than leave you without coverage. Exact replacement terms are confirmed as part of each engagement's contract.",
  },
];

export function StaffAugmentationPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Structured Schemas
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Venus Hiring",
    legalName: "Venus Consultancy",
    url: "https://venushiring.com",
    logo: "https://venushiring.com/venus-logo.png",
    sameAs: [
      "https://www.linkedin.com/company/venushiring",
      "https://twitter.com/venushiring",
      "https://www.facebook.com/venushiring",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-248-275-1077",
        contactType: "customer service",
        areaServed: ["US", "CA"],
        availableLanguage: ["English"],
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Staff Augmentation Services",
    serviceType: "Staff Augmentation & Flexible Contract Staffing",
    provider: {
      "@type": "Organization",
      name: "Venus Hiring",
      url: "https://venushiring.com",
    },
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    description:
      "Venus Hiring connects US and Canadian employers with vetted contract talent and full project teams across IT, finance, healthcare, and automotive without permanent overhead.",
    offers: {
      "@type": "Offer",
      description:
        "Flat-fee contractor options with no markup or 12-18% direct-hire placements with no-placement no-fee guarantee.",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://venushiring.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://venushiring.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Staff Augmentation Services",
        item: "https://venushiring.com/services/staff-augmentation",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between selection:bg-brand selection:text-white">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <SiteNav />

      <main id="main-content" className="flex-1">
        {/* ── 1. HERO SECTION ── */}
        <section className="relative isolate overflow-hidden min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-center bg-slate-950 text-white pt-28 sm:pt-36 pb-20 border-b border-slate-800">
          {/* Background Image with Black/Slate Overlay */}
          <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
            <img
              src={servicesHero}
              alt="Engineering and operations leaders reviewing staff augmentation strategy"
              className="h-full w-full object-cover object-center filter brightness-[0.55] contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50" />
            <div className="absolute inset-0 bg-slate-950/30" />
          </div>

          <div
            className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-brand/20 blur-[140px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 bottom-10 -z-10 h-96 w-96 rounded-full bg-blue-600/10 blur-[150px]"
            aria-hidden
          />

          <div className="shell relative z-10">
            {/* Breadcrumb Navigation */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600 shrink-0" />
              <Link
                to="/services"
                className="hover:text-white transition-colors"
              >
                Services
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-600 shrink-0" />
              <span className="text-brand font-black">Staff Augmentation</span>
            </div>

            <div className="max-w-3xl space-y-6">
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.08]">
                Staff Augmentation Services
              </h1>

              <p className="text-base sm:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl">
                Venus Hiring's staff augmentation services connect US and
                Canadian employers with vetted contract talent and full project
                teams across IT, finance, healthcare, and automotive. Add skilled
                professionals to your team without the cost and delay of a
                permanent hire. Typical shortlists arrive in 2–3 days, compared
                with the roughly 44-day industry average time-to-fill.
              </p>

              {/* Hero Action CTA */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-7 py-4 text-xs font-extrabold text-white shadow-brand transition-all hover:brightness-110 cursor-pointer"
                >
                  <span>Talk to a Staffing Specialist</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="#quick-answer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/70 backdrop-blur-sm px-6 py-4 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-500 transition-all"
                >
                  <span>How Fast & How Much?</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. QUICK ANSWER: HOW FAST AND HOW MUCH? ── */}
        <section
          id="quick-answer"
          className="relative py-12 sm:py-16 -mt-8 z-20"
        >
          <div className="shell">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-extrabold text-blue-700 uppercase tracking-wider mb-2">
                    <Zap className="h-3.5 w-3.5" />
                    <span>EXECUTIVE SUMMARY</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Quick Answer: How Fast and How Much?
                  </h2>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-blue-300 hover:decoration-blue-600 font-semibold text-sm transition-colors shrink-0"
                >
                  <span>Talk to a Staffing Specialist →</span>
                </Link>
              </div>

              {/* 3 Answer Columns */}
              <div className="grid gap-6 md:grid-cols-3 pt-6">
                {/* Speed */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Turnaround
                      </span>
                      <h3 className="font-display text-lg font-black text-slate-900">
                        Speed
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    Venus Hiring typically delivers a vetted shortlist in{" "}
                    <strong className="text-slate-950 font-bold">
                      2–3 days
                    </strong>
                    , versus the{" "}
                    <span className="text-slate-500">
                      ~44-day industry average
                    </span>{" "}
                    time-to-fill.
                  </p>
                </div>

                {/* Cost */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Transparent Rates
                      </span>
                      <h3 className="font-display text-lg font-black text-slate-900">
                        Cost
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    Flat-fee contractors{" "}
                    <strong className="text-slate-950 font-bold">
                      (no markup)
                    </strong>{" "}
                    for select technical roles, or roughly{" "}
                    <strong className="text-slate-950 font-bold">
                      12–18% of base salary
                    </strong>{" "}
                    for direct-hire placements — well below the 20–25% many
                    traditional agencies charge.
                  </p>
                </div>

                {/* Risk */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Guaranteed
                      </span>
                      <h3 className="font-display text-lg font-black text-slate-900">
                        Risk
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    If we don't place a candidate,{" "}
                    <strong className="text-emerald-700 font-bold">
                      you don't pay
                    </strong>
                    . 100% contingency and performance-aligned guarantee.
                  </p>
                </div>
              </div>


            </div>
          </div>
        </section>

        {/* ── 3. WHAT IS STAFF AUGMENTATION & WHY BUSINESSES USE IT ── */}
        <section className="py-16 sm:py-24 bg-white border-y border-slate-200/70">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              {/* Left Column: What Is Staff Augmentation (Sticky on desktop) */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 self-start">
                <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-extrabold text-brand uppercase tracking-wider">
                  <span>FOUNDATIONAL CONCEPT</span>
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  What Is Staff Augmentation?
                </h2>

                <div className="space-y-4 text-base text-slate-600 font-medium leading-relaxed">
                  <p>
                    Staff augmentation is a flexible hiring model where a
                    company adds external professionals to its existing team for
                    a defined period or project, without making them permanent
                    employees. The professionals work under the company's
                    management and processes while the staffing partner handles
                    sourcing, vetting, and administration.
                  </p>
                  <p>
                    Unlike a traditional placement, where the goal is a
                    permanent hire, staff augmentation is built around
                    flexibility: you scale your team up when workload increases
                    and scale back down when the need ends, without the overhead
                    of severance, benefits, or long-term commitment.
                  </p>
                  <p>
                    This model is sometimes called{" "}
                    <strong className="text-slate-900 font-semibold">
                      workforce augmentation
                    </strong>{" "}
                    or{" "}
                    <strong className="text-slate-900 font-semibold">
                      resource augmentation
                    </strong>
                    , and can be delivered onshore, nearshore, or offshore
                    depending on the role and timeline.
                  </p>
                </div>
              </div>

              {/* Right Column: Why Businesses Use Staff Augmentation */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3.5 py-1 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  <span>SOLVING IMMEDIATE BOTTLENECKS</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Why Businesses Use Staff Augmentation
                </h3>

                <p className="text-base text-slate-600 font-medium">
                  Companies turn to staff augmentation when a specific,
                  practical problem needs solving quickly:
                </p>

                {/* 5 Scenario Trigger Cards */}
                <div className="space-y-3 pt-2">
                  {[
                    {
                      title: "Hiring Freeze or Budget Limits",
                      desc: "A hiring freeze or budget limit rules out a new permanent headcount, but the work still needs to get done.",
                    },
                    {
                      title: "Fixed Project End Dates",
                      desc: "A project has a defined end date — bringing on a permanent employee doesn't make sense.",
                    },
                    {
                      title: "Immediate Skill Gaps",
                      desc: "A skill gap has opened up that the current team can't fill in time.",
                    },
                    {
                      title: "Spikes in Demand or Seasonal Surges",
                      desc: "Demand has spiked — a new contract, a product launch, or a seasonal surge — and the team needs more hands.",
                    },
                    {
                      title: "Coverage During Searches",
                      desc: "A key employee has left and the role needs to be covered while a permanent search is underway.",
                    },
                  ].map((trigger, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all hover:border-slate-200 hover:bg-slate-100/60"
                    >
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-brand font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {trigger.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                          {trigger.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-slate-500 font-medium italic pt-2">
                  In each case, the business need is temporary or uncertain, but
                  the skill requirement is real and immediate. This workforce
                  augmentation approach gives employers access to needed
                  expertise without committing to permanent headcount.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. VENUS HIRING'S STAFF AUGMENTATION SERVICES (TWO ENGAGEMENT MODELS) ── */}
        <section id="models" className="py-16 sm:py-24 bg-slate-50">
          <div className="shell">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-200/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                <span>FLEXIBLE ENGAGEMENT MODELS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Venus Hiring's Staff Augmentation Services
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Venus Hiring offers two ways to bring in flexible talent,
                depending on whether you need an individual specialist or a full
                extended team (team augmentation).
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Model 1: Individual Contract Staffing */}
              <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-blue-50 px-3.5 py-1 text-xs font-extrabold text-blue-700 uppercase tracking-wider">
                      INDIVIDUAL SPECIALISTS
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <UserCheck className="h-6 w-6" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-black text-slate-900">
                    Individual Contract Staffing
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                    We source, screen, and place individual professionals
                    directly onto your team. They report into your management,
                    follow your processes, and use your tools — we handle
                    recruitment, vetting, and administrative overhead so your
                    team can focus on the work.
                  </p>

                  <div className="space-y-3 pt-2">
                    {[
                      "Requirements intake and role definition",
                      "Candidate sourcing and technical/skills screening",
                      "Shortlist presentation and interview coordination",
                      "Onboarding support and ongoing account management",
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800"
                      >
                        <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 mt-8 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    to="/services/contract-staffing"
                    className="text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-blue-300 hover:decoration-blue-600 font-bold text-sm transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Explore Contract Staffing →</span>
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-brand transition-colors"
                  >
                    <span>Request Specialist</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Model 2: SOW Project Pods */}
              <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-block rounded-full bg-brand/10 px-3.5 py-1 text-xs font-extrabold text-brand uppercase tracking-wider">
                      OUTCOME ACCOUNTABILITY
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                      <Layers className="h-6 w-6" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-black text-slate-900">
                    SOW Project Pods
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                    For larger or more defined initiatives, we assemble a
                    complete project team — including a lead — under a Statement
                    of Work with fixed-fee or milestone-based billing. This suits
                    software builds, system migrations, and similar
                    project-scoped work where you want outcome accountability
                    rather than hourly management.
                  </p>

                  <div className="space-y-3 pt-2">
                    {[
                      "Dedicated multi-disciplinary agile team architecture",
                      "Technical delivery lead and QA oversight included",
                      "Milestone-based delivery sign-offs & SLA accountability",
                      "Fixed-fee predictable project budgeting without scope creep",
                    ].map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800"
                      >
                        <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 mt-8 flex flex-wrap items-center justify-between gap-4">
                  <Link
                    to="/services/sow-project-pods"
                    className="text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-blue-300 hover:decoration-blue-600 font-bold text-sm transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Explore Project Pods →</span>
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-brand transition-colors"
                  >
                    <span>Assemble a Pod</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. TALENT CATEGORIES WE PROVIDE ── */}
        <section
          id="talent-categories"
          className="py-16 sm:py-24 bg-white border-y border-slate-200/70"
        >
          <div className="shell">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                <span>CROSS-FUNCTIONAL PRACTICE COVERAGE</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Talent Categories We Provide
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Deep recruitment networks delivering specialized contractors
                across four primary industries in North America.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* IT & Technology */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between hover:border-brand/40 hover:bg-white hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Laptop className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    IT & Technology
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Software developers, DevOps and cloud engineers, QA and
                    test automation, data engineers, cybersecurity
                    specialists, and UI/UX designers.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60">
                  <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                    ~3 Day Shortlists
                  </span>
                </div>
              </div>

              {/* Finance & Accounting */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between hover:border-brand/40 hover:bg-white hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    Finance & Accounting
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Accountants, financial analysts, controllers, and finance
                    operations professionals for project work or interim
                    coverage.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60">
                  <span className="inline-block rounded-full bg-slate-200/70 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                    Timeline confirmed on intake
                  </span>
                </div>
              </div>

              {/* Healthcare */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between hover:border-brand/40 hover:bg-white hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    Healthcare
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Administrative, operations, and support professionals for
                    healthcare organizations managing variable staffing needs.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60">
                  <span className="inline-block rounded-full bg-slate-200/70 px-2.5 py-1 text-[11px] font-bold text-slate-600">
                    Timeline confirmed on intake
                  </span>
                </div>
              </div>

              {/* Automotive & EV */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between hover:border-brand/40 hover:bg-white hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                    <Car className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    Automotive & EV
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Engineering, quality, and operations professionals
                    supporting automotive and EV manufacturing and program work.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-200/60">
                  <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                    ~3 Day Shortlist (Mfg & Process)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. WHEN TO USE STAFF AUGMENTATION (TABLE MATRIX) ── */}
        <section className="py-16 sm:py-24 bg-slate-50">
          <div className="shell">
            <div className="max-w-3xl space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-200/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                <Scale className="h-3.5 w-3.5" />
                <span>DECISION MATRIX</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                When to Use Staff Augmentation
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Assess whether resource augmentation is the optimal talent
                strategy for your project context.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/70 text-xs font-black uppercase tracking-wider text-slate-700">
                      <th className="py-4 px-6 sm:px-8 w-1/2">Situation</th>
                      <th className="py-4 px-6 sm:px-8 w-1/2">
                        Why Augmentation Fits
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {[
                      {
                        sit: "Project with a fixed end date",
                        fit: "No long-term commitment needed",
                      },
                      {
                        sit: "Sudden skill gap or departure",
                        fit: "Fill the gap while you plan your next permanent hire",
                      },
                      {
                        sit: "Seasonal or demand spike",
                        fit: "Scale up temporarily, scale down when it passes",
                      },
                      {
                        sit: "New technology or initiative",
                        fit: "Bring in expertise you don't need year-round",
                      },
                      {
                        sit: "Hiring freeze with active workload",
                        fit: "Get the work done without adding permanent headcount",
                      },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="py-4 px-6 sm:px-8 font-bold text-slate-900">
                          <div className="flex items-center gap-2.5">
                            <span className="h-2 w-2 rounded-full bg-brand shrink-0" />
                            <span>{row.sit}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 sm:px-8 font-medium text-slate-600">
                          {row.fit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. TYPICAL SHORTLIST TIMELINES BY ROLE (TABLE & BENCHMARK) ── */}
        <section className="py-16 sm:py-24 bg-white border-t border-slate-200/70">
          <div className="shell">
            <div className="max-w-3xl space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800">
                <Clock className="h-3.5 w-3.5" />
                <span>SPEED BENCHMARKS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Typical Shortlist Timelines by Role
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Speed to hire is where traditional recruiting breaks down. Here
                is how Venus Hiring's calibrated network compares against the
                broader North American staffing market.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/70 text-xs font-black uppercase tracking-wider text-slate-700">
                      <th className="py-4 px-6 sm:px-8">Role Category</th>
                      <th className="py-4 px-6 sm:px-8">Venus Shortlist</th>
                      <th className="py-4 px-6 sm:px-8">Market Average</th>
                      <th className="py-4 px-6 sm:px-8 text-right">Advantage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {[
                      {
                        role: "Manufacturing / Process Engineering",
                        venus: "~3 days",
                        market: "40–50 days",
                        speed: "93% Faster",
                      },
                      {
                        role: "AI / Python / Software Engineering",
                        venus: "~3 days",
                        market: "45–70 days",
                        speed: "94% Faster",
                      },
                      {
                        role: "International Placements",
                        venus: "~2 days",
                        market: "40–60 days",
                        speed: "95% Faster",
                      },
                      {
                        role: "Sales & GTM",
                        venus: "~3 days",
                        market: "25–45 days",
                        speed: "90% Faster",
                      },
                      {
                        role: "Finance, Healthcare, Automotive (non-engineering roles)",
                        venus: "[to be confirmed]",
                        market: "—",
                        speed: "Confirmed on intake",
                      },
                    ].map((item, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <td className="py-4 px-6 sm:px-8 font-bold text-slate-900">
                          {item.role}
                        </td>
                        <td className="py-4 px-6 sm:px-8">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-black ${
                              item.venus.includes("days")
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {item.venus}
                          </span>
                        </td>
                        <td className="py-4 px-6 sm:px-8 font-semibold text-slate-500">
                          {item.market}
                        </td>
                        <td className="py-4 px-6 sm:px-8 text-right font-black text-brand text-xs">
                          {item.speed}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>

        {/* ── 8. STAFF AUGMENTATION VS. OTHER HIRING MODELS (TABLE) ── */}
        <section className="py-16 sm:py-24 bg-slate-50">
          <div className="shell">
            <div className="max-w-3xl space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-200/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                <span>HIRING MODEL COMPARISON</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Staff Augmentation vs. Other Hiring Models
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Compare models across delivery governance, management structure,
                and business commitment.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-100/70 text-xs font-black uppercase tracking-wider text-slate-700">
                      <th className="py-4 px-6 sm:px-8">Model</th>
                      <th className="py-4 px-6 sm:px-8">Best For</th>
                      <th className="py-4 px-6 sm:px-8">Management</th>
                      <th className="py-4 px-6 sm:px-8">Commitment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {[
                      {
                        model: "Staff Augmentation",
                        best: "Filling skill gaps or scaling a team temporarily",
                        mgmt: "You manage the professional directly",
                        commit: "Short to mid-term, flexible",
                        highlight: true,
                      },
                      {
                        model: "Direct Hire / Permanent Placement",
                        best: "Long-term, core team roles",
                        mgmt: "You manage as a full-time employee",
                        commit: "Long-term",
                        highlight: false,
                      },
                      {
                        model: "Contract Staffing",
                        best: "Similar to augmentation; often shorter, defined-duration roles",
                        mgmt: "You manage",
                        commit: "Fixed-term",
                        highlight: false,
                      },
                      {
                        model: "SOW Project Pods (Managed Services)",
                        best: "Full projects with a defined outcome",
                        mgmt: "Staffing partner manages delivery",
                        commit: "Project-length",
                        highlight: false,
                      },
                      {
                        model: "RPO (Recruitment Process Outsourcing)",
                        best: "Outsourcing your entire hiring function",
                        mgmt: "Your team manages new hires; partner manages recruiting",
                        commit: "Ongoing",
                        highlight: false,
                      },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className={
                          row.highlight
                            ? "bg-brand/5 border-l-4 border-l-brand"
                            : "hover:bg-slate-50/80 transition-colors"
                        }
                      >
                        <td className="py-4 px-6 sm:px-8 font-black text-slate-900">
                          {row.model}
                          {row.highlight && (
                            <span className="ml-2 inline-block rounded-md bg-brand px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                              Current Page
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 sm:px-8 font-medium text-slate-700">
                          {row.best}
                        </td>
                        <td className="py-4 px-6 sm:px-8 font-medium text-slate-600">
                          {row.mgmt}
                        </td>
                        <td className="py-4 px-6 sm:px-8 font-semibold text-slate-800">
                          {row.commit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-slate-500 font-medium">
              There isn't a universally "better" model — the right choice
              depends on whether you need an individual embedded in your team, a
              full outcome-based project, or a permanent employee.
            </p>
          </div>
        </section>

        {/* ── 9. STAFF AUGMENTATION VS. HIRING AN IN-HOUSE RECRUITER (FINANCIAL ROI) ── */}
        <section className="py-16 sm:py-24 bg-white border-t border-slate-200/70">
          <div className="shell">
            <div className="max-w-3xl space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-blue-800">
                <DollarSign className="h-3.5 w-3.5" />
                <span>TRUE COST OF RECRUITMENT</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Staff Augmentation vs. Hiring an In-House Recruiter
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                The most honest comparison isn't Venus vs. another agency — it's
                Venus vs. building recruiting capacity yourself. An additional
                in-house recruiter plus sourcing tools carries a cost every
                working day, whether or not a role gets filled.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-950 text-white text-xs font-black uppercase tracking-wider">
                      <th className="py-5 px-6 sm:px-8 w-2/5">Cost / Factor</th>
                      <th className="py-5 px-6 sm:px-8 w-3/10 text-slate-300">
                        Extra In-House Recruiter + Tools
                      </th>
                      <th className="py-5 px-6 sm:px-8 w-3/10 text-brand font-black">
                        Venus Hiring
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {[
                      {
                        factor: "Recruiter Salary (fully loaded)",
                        inHouse: "~$120,000/yr",
                        venus: "— (Zero fixed overhead)",
                        highlight: false,
                      },
                      {
                        factor: "Sourcing Tools (ATS, LinkedIn Recruiter)",
                        inHouse: "~$20,000/yr",
                        venus: "Included",
                        highlight: false,
                      },
                      {
                        factor: "Cost per working day",
                        inHouse: "~$540/day, regardless of outcome",
                        venus: "$0/day — you pay on a hire",
                        highlight: true,
                      },
                      {
                        factor: "Time to first shortlist",
                        inHouse: "~44 days",
                        venus: "~2–3 days (varies by role)",
                        highlight: false,
                      },
                      {
                        factor: "If no one is hired",
                        inHouse: "Cost is sunk (100% loss)",
                        venus: "You've paid nothing ($0)",
                        highlight: true,
                      },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className={
                          row.highlight
                            ? "bg-emerald-50/60 font-bold"
                            : "hover:bg-slate-50/80 transition-colors"
                        }
                      >
                        <td className="py-4 px-6 sm:px-8 font-black text-slate-900">
                          {row.factor}
                        </td>
                        <td className="py-4 px-6 sm:px-8 font-semibold text-slate-600">
                          {row.inHouse}
                        </td>
                        <td className="py-4 px-6 sm:px-8 font-black text-brand">
                          {row.venus}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── 10. HOW THE VENUS HIRING PROCESS WORKS (5 STEPS) ── */}
        <section id="process" className="py-16 sm:py-24 bg-slate-50">
          <div className="shell">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-200/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                <span>OUR 5-STEP PROTOCOL</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                How the Venus Hiring Process Works
              </h2>
              <p className="text-base text-slate-600 font-medium">
                From initial scoping to ongoing management, a calibrated,
                frictionless journey built for velocity and quality.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-5">
              {[
                {
                  step: "01",
                  title: "Requirements Call",
                  desc: "We learn your project, timeline, and the skills you need.",
                },
                {
                  step: "02",
                  title: "Talent Matching",
                  desc: "We source and screen candidates from our active talent network.",
                },
                {
                  step: "03",
                  title: "Shortlist & Interview",
                  desc: "You review and interview your preferred candidates within 2–3 days.",
                },
                {
                  step: "04",
                  title: "Selection & Onboarding",
                  desc: "The chosen professional is onboarded into your systems and workflows.",
                },
                {
                  step: "05",
                  title: "Ongoing Support",
                  desc: "We stay involved for the length of the engagement to manage any changes.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:border-brand/40 hover:-translate-y-1 transition-all"
                >
                  <div className="space-y-4">
                    <span className="font-display text-3xl font-black text-brand">
                      {item.step}
                    </span>
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 11. INDUSTRIES WE SERVE & WHERE WE OPERATE ── */}
        <section className="py-16 sm:py-24 bg-white border-y border-slate-200/70">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Industries We Serve */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-extrabold text-blue-700 uppercase tracking-wider">
                    <Building2 className="h-3.5 w-3.5" />
                    <span>TARGET VERTICALS</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
                    Industries We Serve
                  </h3>
                  <p className="text-base text-slate-600 font-medium leading-relaxed">
                    Venus Hiring supports staff augmentation across Technology &
                    Software, Finance & Accounting, Healthcare, and Automotive &
                    EV.
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      "Technology & Software",
                      "Finance & Accounting",
                      "Healthcare",
                      "Automotive & EV",
                    ].map((ind, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs font-bold text-slate-800"
                      >
                        <CheckCircle2 className="h-4 w-4 text-brand shrink-0" />
                        <span>{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/60">
                  <Link
                    to="/industries"
                    className="text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-blue-300 hover:decoration-blue-600 font-bold text-sm transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>See All Industries We Serve →</span>
                  </Link>
                </div>
              </div>

              {/* Where We Operate */}
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3.5 py-1 text-xs font-extrabold text-brand uppercase tracking-wider">
                    <Globe className="h-3.5 w-3.5" />
                    <span>CROSS-BORDER DELIVERY</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-900">
                    Where We Operate
                  </h3>
                  <p className="text-base text-slate-600 font-medium leading-relaxed">
                    Venus Hiring supports employers across the United States and
                    Canada, with delivery operations in the US, Canada, and India
                    that allow for flexible time-zone coverage. This gives
                    employers access to onshore, nearshore, and offshore talent
                    depending on budget, urgency, and time-zone needs.
                  </p>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
                      <span className="text-xl">🇺🇸</span>
                      <div className="font-bold text-xs text-slate-900 mt-1">
                        United States
                      </div>
                      <div className="text-[10px] text-slate-500">Troy, MI</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
                      <span className="text-xl">🇨🇦</span>
                      <div className="font-bold text-xs text-slate-900 mt-1">
                        Canada
                      </div>
                      <div className="text-[10px] text-slate-500">Toronto, ON</div>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-3 text-center">
                      <span className="text-xl">🇮🇳</span>
                      <div className="font-bold text-xs text-slate-900 mt-1">
                        India Delivery
                      </div>
                      <div className="text-[10px] text-slate-500">24/7 Sourcing</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200/60">
                  <Link
                    to="/contact"
                    className="text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-blue-300 hover:decoration-blue-600 font-bold text-sm transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Consult Cross-Border Delivery Options →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 12. HOW VENUS HIRING HANDLES RISK ── */}
        <section className="py-16 sm:py-24 bg-slate-50">
          <div className="shell">
            <div className="max-w-3xl space-y-4 mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-emerald-800">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>CONTRACT GUARANTEE</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                How Venus Hiring Handles Risk
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Eliminating the financial, operational, and legal pitfalls of
                external hiring through complete contractual alignment.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  No-Placement, No-Fee
                </h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  If we don't place a candidate, you don't pay — Venus Hiring
                  operates on a strict no-placement, no-fee contingency basis.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <UserCheck className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Replacement Support
                </h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  If a placement doesn't work out, Venus Hiring will work to
                  find a suitable replacement rather than leave you without
                  coverage.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Legal & IP Protection
                </h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Co-employment, IP assignment, and worker classification terms
                  are confirmed as part of the contracting process for each
                  engagement.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ── 13. BENEFITS OF STAFF AUGMENTATION ── */}
        <section className="py-16 sm:py-24 bg-white border-t border-slate-200/70">
          <div className="shell">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                <span>BUSINESS ADVANTAGES</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Benefits of Staff Augmentation
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Why forward-thinking organizations prioritize workforce
                augmentation to stay agile.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Velocity",
                  desc: "Faster access to talent than a full permanent hiring cycle.",
                  icon: Zap,
                },
                {
                  title: "Agility",
                  desc: "Flexible staffing that lets you scale your team up or down as project needs change.",
                  icon: Scale,
                },
                {
                  title: "Niche Skills",
                  desc: "Access to specialized skills you don't need on a permanent basis.",
                  icon: Sparkles,
                },
                {
                  title: "HR Relief",
                  desc: "Reduced recruiting workload on your internal HR/TA team.",
                  icon: Users,
                },
                {
                  title: "Project Continuity",
                  desc: "Project continuity without gaps caused by hiring delays.",
                  icon: Clock,
                },
                {
                  title: "Cost Containment",
                  desc: "No long-term benefits, severance, or employer payroll tax liabilities.",
                  icon: DollarSign,
                },
              ].map((ben, idx) => {
                const Icon = ben.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-3 hover:border-brand/40 hover:bg-white hover:shadow-lg transition-all"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      {ben.title}
                    </h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      {ben.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 14. WHAT AFFECTS STAFF AUGMENTATION COST ── */}
        <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/70">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-200/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span>PRICING DYNAMICS</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  What Affects Staff Augmentation Cost
                </h2>
                <p className="text-base text-slate-600 font-medium leading-relaxed">
                  Staff augmentation pricing varies based on several factors,
                  but as a general benchmark: flat-fee contractors are available
                  for select technical roles with no markup, and direct-hire
                  placements typically run 12–18% of base salary — below the
                  20–25% many traditional agencies charge.
                </p>
                <div className="pt-2">
                  <Link
                    to="/contact"
                    className="text-blue-600 hover:text-blue-700 underline underline-offset-4 decoration-blue-300 hover:decoration-blue-600 font-bold text-base transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>
                      Book a call to get a quote based on your specific role and
                      timeline →
                    </span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Skill level and specialization",
                    desc: "Niche or senior expertise costs more than general skill sets.",
                  },
                  {
                    title: "Contract duration",
                    desc: "Short-term engagements are typically priced differently than longer multi-month programs.",
                  },
                  {
                    title: "Location & Geography",
                    desc: "Onshore, nearshore, and offshore talent carry different rate structures.",
                  },
                  {
                    title: "Engagement model",
                    desc: "Individual contract staffing vs. a full SOW project pod are priced differently.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2 shadow-sm"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold text-xs">
                      {idx + 1}
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 15. RESULTS & CLIENT FEEDBACK ── */}
        <section className="py-16 sm:py-24 bg-white border-t border-slate-200/70">
          <div className="shell">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>PERFORMANCE & PROOF</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Results & Client Feedback
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Verified delivery velocity, placement metrics, and feedback from North American employers.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center space-y-2">
                <div className="font-display text-3xl sm:text-4xl font-black text-brand">
                  2–3 Days
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Shortlist Delivery
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Average velocity across engineering & technical disciplines
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center space-y-2">
                <div className="font-display text-3xl sm:text-4xl font-black text-slate-900">
                  40+ Days
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Time Saved Per Role
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Compared to 44-day traditional recruitment cycles
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center space-y-2">
                <div className="font-display text-3xl sm:text-4xl font-black text-emerald-600">
                  100%
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Placement Contingency
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  No-placement, no-fee performance structure
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center space-y-2">
                <div className="font-display text-3xl sm:text-4xl font-black text-blue-600">
                  3 Hubs
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Global Delivery
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Troy (US), Toronto (Canada), India operations
                </p>
              </div>
            </div>

            {/* Case Study & Client Feedback Assurance Card */}
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100/80 p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-700">
                  <span>CONFIDENTIAL CLIENT METRICS</span>
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Enterprise Client Verification & Case Studies
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Detailed case briefs, client pod metrics, and placement testimonials are shared with prospective employers under reciprocal confidentiality agreements.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-xs font-bold text-white hover:bg-brand transition-colors shrink-0"
              >
                <span>Request Case Briefs</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 16. WHY VENUS HIRING ── */}
        <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/70">
          <div className="shell">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand">
                <Sparkles className="h-3.5 w-3.5" />
                <span>THE VENUS ADVANTAGE</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Why Venus Hiring
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Engineered for speed, transparency, and enterprise rigor across
                North America.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Established industry focus",
                  desc: "As a staff augmentation company, Venus Hiring runs dedicated recruitment practices in IT, Finance, Healthcare, and Automotive & EV, not generalist staffing spread thin across every sector.",
                },
                {
                  title: "Two engagement models",
                  desc: "Individual contract staffing and full SOW project pods, so you're not forced into a one-size-fits-all structure.",
                },
                {
                  title: "Cross-border delivery",
                  desc: "Onshore, nearshore, and offshore operations in the US, Canada, and India for flexible coverage and cost control.",
                },
                {
                  title: "Speed and pricing built for urgency",
                  desc: "Typical shortlists in 2–3 days and rates below standard agency fees on our current benchmark roles.",
                },
                {
                  title: "Direct sourcing approach",
                  desc: "Our technology recruiting team sources the majority of placements through direct, confidential outreach rather than relying solely on job board applicants.",
                },
                {
                  title: "Risk-aligned engagement",
                  desc: "No-placement, no-fee model, with replacement support if a placement doesn't work out.",
                },
              ].map((point, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 space-y-3 hover:border-brand/40 hover:bg-white hover:shadow-lg transition-all"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-black text-sm">
                    0{idx + 1}
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    {point.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 16. FREQUENTLY ASKED QUESTIONS (ACCORDION) ── */}
        <section id="faq" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/70">
          <div className="shell max-w-4xl">
            <div className="text-center space-y-4 mb-14">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-200/80 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-800">
                <HelpCircle className="h-3.5 w-3.5" />
                <span>FREQUENT QUESTIONS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-base text-slate-600 font-medium">
                Everything you need to know about our staff augmentation
                delivery and engagement terms.
              </p>
            </div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="flex w-full items-center justify-between p-5 sm:p-6 text-left font-bold text-slate-900 hover:text-brand transition-colors gap-4"
                    >
                      <span className="font-display text-base sm:text-lg">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-brand" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 17. FINAL CTA: GET STARTED ── */}
        <section className="py-16 sm:py-24 bg-slate-950 text-white relative isolate overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-20 top-0 -z-10 h-72 w-72 rounded-full bg-brand/30 blur-[130px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-0 bottom-0 -z-10 h-72 w-72 rounded-full bg-blue-600/20 blur-[140px]"
            aria-hidden
          />

          <div className="shell text-center max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand">
              <Sparkles className="h-3.5 w-3.5" />
              <span>READY TO SCALE</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Get Started with Venus Hiring
            </h2>

            <p className="text-base sm:text-xl text-slate-300 font-medium leading-relaxed">
              Tell us what you need, and we'll put together a shortlist of
              qualified professionals.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand px-8 py-4 text-xs font-extrabold text-white shadow-brand hover:brightness-110 transition-all cursor-pointer"
              >
                <span>Book a Call</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-500 transition-all"
              >
                <span>Browse All Services</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
