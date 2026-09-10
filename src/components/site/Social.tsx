import { useEffect, useRef, useState } from "react";
import { ContactRedesign } from "@/components/site/ContactRedesign";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  Quote,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";
import { CtaLink, SectionHeading } from "./primitives";
import p1 from "@/assets/person-1.jpg";
import p2 from "@/assets/person-2.jpg";
import p3 from "@/assets/person-3.jpg";

/* -------------------------------- Testimonials -------------------------------- */

const QUOTES = [
  {
    quote:
      "They understood our stack well enough to challenge our own job spec. That saved us a full hiring cycle and a mis-hire we would have regretted.",
    attribution: "- Rohan Mehta, Director of Engineering, Toronto SaaS scale-up",
  },
  {
    quote:
      "Venus filled three controller roles in six weeks after two agencies stalled. The shortlists were tight, calibrated and genuinely interview-ready.",
    attribution: "- Amara Okafor, VP People, national manufacturing group",
  },
  {
    quote:
      "The fractional HR support carried us through a plant expansion — compliance, onboarding and workforce planning handled without adding headcount.",
    attribution: "- Catherine Boyle, COO, automotive supplier, Windsor",
  },
];

export function Testimonials() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < maxScroll - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScroll();
    el.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      el.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.clientWidth;
    const scrollAmount = direction === "left" ? -containerWidth * 0.8 : containerWidth * 0.8;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="relative isolate overflow-hidden bg-white section-padding border-b border-slate-200">
      <div className="shell relative">
        {/* Main Title Section */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
            Employers who hire with us, hire again
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Ninety-two percent of our engagements come from repeat clients and referrals across Canada and the US Midwest.
          </p>
        </div>

        {/* Horizontal Testimonials Track */}
        <div
          ref={ref}
          className={cn("reveal-item transition-all duration-700", shown && "is-shown")}
        >
          <div
            ref={scrollRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 select-none [-webkit-overflow-scrolling:touch]"
          >
            {QUOTES.map((q, i) => (
              <div
                key={i}
                className="w-[90%] sm:w-[48%] shrink-0 snap-start bg-white border border-slate-200/90 rounded-[2.2rem] p-8 sm:p-10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[220px] sm:min-h-[260px]"
              >
                <blockquote className="text-slate-800 text-base sm:text-lg lg:text-xl font-normal italic leading-relaxed">
                  “{q.quote}”
                </blockquote>
                <div className="mt-8 sm:mt-10 text-slate-800 font-semibold text-sm sm:text-base">
                  {q.attribution}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls (Bottom Right) */}
          <div className="mt-8 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-slate-800 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-slate-800 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Insights ---------------------------------- */

const ARTICLES = [
  {
    tag: "Hiring · Engineering",
    date: "Mar 12, 2025",
    title: "How to hire remote engineers without wasting time",
    copy: "A streamlined process for sourcing, interviewing and onboarding remote engineering talent that actually sticks.",
    href: "https://www.venushiring.ca/blog/how-to-hire-remote-engineers",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop&auto=format",
  },
  {
    tag: "Diversity · Recruitment",
    date: "Feb 26, 2025",
    title: "Building an inclusive interview process",
    copy: "Simple adjustments to job descriptions, interviewing and feedback loops that make hiring fairer and more effective.",
    href: "https://www.venushiring.ca/blog/build-a-inclusive-interview-process",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=500&fit=crop&auto=format",
  },
  {
    tag: "Branding · Startups",
    date: "Feb 04, 2025",
    title: "Employer branding for startups: what actually works",
    copy: "From employee storytelling to practical social proof — tactics that help early-stage companies attract the right talent.",
    href: "https://www.venushiring.ca/blog/employer-branding-matters",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop&auto=format",
  },
];

export function Insights() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section
      id="insights"
      className="section-curve relative -mt-8 overflow-hidden border-b border-border bg-porcelain section-padding"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 dot-grid-light opacity-[0.28]"
        aria-hidden
      />
      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading title="Hiring intelligence from our consultants" />
          <CtaLink
            href="https://www.venushiring.ca/blog"
            variant="outline"
            size="lg"
            className="justify-self-start"
          >
            View all articles
          </CtaLink>
        </div>

        <div ref={ref} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <a
              key={a.title}
              href={a.href}
              className={cn(
                "group relative overflow-hidden rounded-[1.75rem] glass-panel p-3",
                "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_28px_70px_-42px_rgba(15,23,42,0.5)]",
                "transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "hover:-translate-y-2 hover:ring-brand-soft",
                "reveal-item",
                shown && "is-shown",
              )}
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              <div className="sheen relative aspect-[16/10] overflow-hidden rounded-[1.35rem]">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  width={800}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.09]"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-[11px] font-semibold text-foreground backdrop-blur">
                  <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                  {a.date}
                </span>
              </div>
              <div className="p-5 pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                  {a.tag}
                </p>
                <h3 className="mt-4 text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-brand">
                  {a.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.copy}</p>
                <span className="mt-6 flex items-center justify-between gap-3 border-t border-border pt-5 text-sm font-semibold text-foreground">
                  <span className="relative">
                    Read more
                    <span
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100"
                      aria-hidden
                    />
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 ease-out group-hover:rotate-45 group-hover:border-transparent group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------ FAQ ------------------------------------- */

const FAQS = [
  {
    q: "How quickly can you present qualified candidates?",
    a: "For most standard and specialized roles, you receive a calibrated shortlist of pre-screened candidates within 5 business days of our initial discovery session. Complex executive or niche technical searches typically take 2 to 3 weeks.",
  },
  {
    q: "Do you support international hiring and Canadian work-permit pathways?",
    a: "Yes. We regularly source internationally trained professionals and guide employers through LMIA applications, work-permit transitions, and PR-pathway considerations alongside our domestic Canadian talent pools.",
  },
  {
    q: "What placement guarantees do you provide?",
    a: "All permanent placements carry a written replacement guarantee. If a hire does not work out inside the agreed period, we restart the search at zero additional fee.",
  },
  {
    q: "Which industries and sectors do you specialize in?",
    a: "We specialize in Finance & Accounting, Technology, Automotive & EV, Aerospace, Advanced Manufacturing, Skilled Trades, and Executive Leadership across Canada and the US Midwest.",
  },
  {
    q: "Can Venus Consultancy function as our fractional HR department?",
    a: "Our fractional HR and advisory practice provides interim HR leadership for workforce planning, compliance frameworks, policy drafting, and team scaling without adding permanent overhead.",
  },
  {
    q: "What is the difference between direct placement and SOW project pods?",
    a: "Direct placement focuses on sourcing full-time employees for your internal payroll. SOW (Statement of Work) pods deploy specialized, managed teams committed to specific project deliverables and milestones under a fixed budget.",
  },
  {
    q: "How do you screen and vet candidates before presenting them?",
    a: "Every candidate undergoes a multi-stage vetting process including structured technical interviews, behavioral evaluations, credential verification, and deep reference checks tailored to your technical requirements.",
  },
  {
    q: "What are your recruitment fee structures and engagement options?",
    a: "We offer transparent contingency pricing for standard placements, retained search structures for executive roles, and milestone-based pricing for SOW delivery pods.",
  },
];

import { useFaqs } from "@/lib/faq-store";

export function Faq() {
  const { faqs } = useFaqs();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-b border-border bg-background section-padding scroll-mt-20 sm:scroll-mt-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-brand/10 blur-[140px]"
        aria-hidden
      />

      <div className="shell relative grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 items-start">
        {/* Left Column: Sticky Content */}
        <div className="flex flex-col items-start gap-6 lg:sticky lg:top-28 lg:self-start">

          {/* Main Display Heading */}
          <h2 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            Recruitment & hiring questions,{" "}
            <span className="text-gradient-brand">answered.</span>
          </h2>

          {/* Subtitle */}
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Clear answers for teams comparing recruitment partners, shaping a hiring brief, or deciding how to begin.
          </p>

          {/* Down CTA Link (Capermint Style) */}
          <a
            href="https://www.venushiring.ca/contact"
            className="group mt-2 inline-flex items-center gap-2 text-base font-semibold text-brand underline decoration-brand/30 decoration-2 underline-offset-8 transition-colors duration-300 hover:text-brand hover:decoration-brand"
          >
            Ask about your hiring needs
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Right Column: Scrollable List of FAQ Accordion Rows (First 8 for Homepage) */}
        <div className="flex flex-col border-t border-border/80">
          {(faqs.length > 0 ? faqs : FAQS).slice(0, 8).map((f, i) => {
            const isOpen = open === i;
            const itemNum = (i + 1).toString().padStart(2, "0");
            return (
              <div
                key={f.q}
                className={cn(
                  "border-b border-border/80 transition-colors duration-300",
                  isOpen ? "bg-card/40" : "hover:bg-card/20",
                )}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <div className="flex items-start gap-4 min-w-0 pr-4">
                      <span className="font-display text-xs sm:text-sm font-bold text-muted-foreground/60 tracking-wider pt-1 shrink-0">
                        {itemNum}
                      </span>
                      <span
                        className={cn(
                          "text-base sm:text-lg font-bold leading-snug transition-colors duration-300",
                          isOpen ? "text-brand" : "text-foreground group-hover:text-brand",
                        )}
                      >
                        {f.q}
                      </span>
                    </div>

                    <span
                      className={cn(
                        "grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isOpen
                          ? "rotate-180 border-transparent bg-primary text-primary-foreground shadow-brand"
                          : "border-border/80 bg-card text-muted-foreground hover:border-brand/40 hover:text-foreground",
                      )}
                      aria-hidden
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                </h3>

                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen
                      ? "grid-rows-[1fr] pb-6 opacity-100"
                      : "grid-rows-[0fr] opacity-0 pointer-events-none",
                  )}
                >
                  <div className="overflow-hidden pl-9 sm:pl-10 pr-6 sm:pr-12">
                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- CTA banner --------------------------------- */

export function CtaBanner() {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section
      className="relative overflow-hidden bg-background section-padding"
      aria-label="Get started"
    >
      {/* Background glow graphics */}
      <div
        className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-brand/10 blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-10 -z-10 h-72 w-72 rounded-full bg-brand/5 blur-[100px]"
        aria-hidden
      />

      <div className="shell relative">
        <div ref={ref} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Text & CTAs */}
          <div className={cn("flex flex-col items-start gap-6 reveal-item", shown && "is-shown")}>
            <h2 className="text-4xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
              Find the Right People.
              <br />
              <span className="text-gradient-brand">Build the Right Teams.</span>
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                At Venus Consultancy, we connect exceptional Canadian talent with forward-thinking
                companies across Canada—from coast to coast.
              </p>
              <p>
                Whether you're a Canadian business looking to hire or a professional seeking your
                next opportunity, we make the perfect match happen.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <a
                href="https://www.venushiring.ca/contact"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-brand transition-all duration-300 ease-out hover:-translate-y-1 hover:brightness-110 hover:shadow-lg"
              >
                Hire Top Talent
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </a>

              <a
                href="/careers"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-brand bg-white px-7 py-3.5 text-base font-semibold text-brand transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-brand/5 hover:shadow-md"
              >
                Explore Career Opportunities
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Graphic Image with Floating Glass Badges & Motion */}
          <div
            className={cn(
              "group relative isolate mx-auto w-full max-w-xl lg:max-w-none reveal-item",
              shown && "is-shown",
            )}
            style={{ transitionDelay: "180ms" }}
          >
            {/* Background Ambient Glow */}
            <div
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-r from-brand/20 via-brand/10 to-transparent blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden
            />

            {/* Main Featured Image Card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:shadow-[0_35px_70px_-15px_rgba(0,0,0,0.22)]">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&h=750&fit=crop&auto=format"
                alt="Canadian business team collaborating in a modern office meeting"
                width={1000}
                height={750}
                loading="lazy"
                className="h-[380px] sm:h-[440px] w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40"
                aria-hidden
              />
            </div>

            {/* Floating Glassmorphism Badge 1 - Top Left */}
            <div className="float-soft absolute -left-4 top-6 hidden sm:flex items-center gap-3 rounded-2xl border border-white/40 bg-white/85 p-3.5 backdrop-blur-md shadow-lg transition-transform duration-300 hover:scale-105">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <span className="text-xl">🇨🇦</span>
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">Coast-to-Coast Reach</p>
                <p className="text-[11px] font-medium text-muted-foreground">
                  Serving Canada & USA
                </p>
              </div>
            </div>

            {/* Floating Glassmorphism Badge 2 - Bottom Right */}
            <div
              className="float-soft absolute -bottom-5 -right-4 flex items-center gap-3 rounded-2xl border border-white/40 bg-white/90 p-4 backdrop-blur-md shadow-xl transition-transform duration-300 hover:scale-105"
              style={{ animationDelay: "1.8s" }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white shadow-brand">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">100% Verified Candidates</p>
                <p className="text-xs font-medium text-muted-foreground">Vetted Canadian Talent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Contact Us --------------------------------- */

const COUNTRY_PREFIXES = [
  { id: "ca", label: "Canada", flag: "🇨🇦", code: "+1", placeholder: "+1 (647) 000-0000" },
  { id: "us", label: "Michigan, USA", flag: "🇺🇸", code: "+1", placeholder: "+1 (248) 000-0000" },
  { id: "in", label: "India", flag: "🇮🇳", code: "+91", placeholder: "+91 98765 43210" },
  { id: "other", label: "Other / International", flag: "🌐", code: "+", placeholder: "+1 (000) 000-0000" },
];

export function ContactSection() {
  return (
    <section id="contact">
      <ContactRedesign />
    </section>
  );
}
