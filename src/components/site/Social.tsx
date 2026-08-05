import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
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
      "Venus filled three controller roles in six weeks after two agencies stalled. The shortlists were tight, calibrated and genuinely interview-ready.",
    name: "Amara Okafor",
    role: "VP People, national manufacturing group",
    photo: p1,
  },
  {
    quote:
      "They understood our stack well enough to challenge our own job spec. That saved us a full hiring cycle and a mis-hire we would have regretted.",
    name: "Rohan Mehta",
    role: "Director of Engineering, Toronto SaaS scale-up",
    photo: p2,
  },
  {
    quote:
      "The fractional HR support carried us through a plant expansion — compliance, onboarding and workforce planning handled without adding headcount.",
    name: "Catherine Boyle",
    role: "COO, automotive supplier, Windsor",
    photo: p3,
  },
];

function Stars() {
  return (
    <div className="flex gap-1" aria-label="Rated five out of five">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 text-gold"
          fill="currentColor"
          strokeWidth={0}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const go = (next: number) => setIndex((next + QUOTES.length) % QUOTES.length);

  const minSwipeDistance = 40;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      go(index + 1);
    } else if (distance < -minSwipeDistance) {
      go(index - 1);
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-border bg-background section-padding">
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-70"
        aria-hidden
      />
      <div className="shell relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            title="Employers who hire with us, hire again"
            copy="Ninety-two percent of our engagements come from repeat clients and referrals across Canada and the US Midwest."
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-transparent hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-transparent hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={ref}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={cn("reveal-item mt-12 overflow-hidden rounded-[2rem] touch-pan-y", shown && "is-shown")}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
          >
            {QUOTES.map((q) => (
              <figure
                key={q.name}
                className="relative isolate w-full shrink-0 overflow-hidden rounded-[2rem] glass-panel p-8 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.55)] sm:p-12"
              >
                <span
                  className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_0%,var(--color-brand-soft),transparent_70%)]"
                  aria-hidden
                />
                <Quote
                  className="absolute right-8 top-8 -z-10 h-24 w-24 text-brand/10"
                  aria-hidden
                />
                <Stars />
                <blockquote className="mt-7 max-w-3xl text-xl leading-relaxed text-foreground sm:text-2xl">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-9 flex items-center gap-4 border-t border-border pt-7">
                  <span className="shrink-0 rounded-full bg-gradient-to-br from-brand to-brand/20 p-[2px]">
                    <img
                      src={q.photo}
                      alt={q.name}
                      loading="lazy"
                      width={640}
                      height={640}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold">{q.name}</p>
                    <p className="truncate text-sm text-muted-foreground">{q.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-center gap-2">
          {QUOTES.map((q, i) => (
            <button
              key={q.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial from ${q.name}`}
              aria-current={i === index}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500 ease-out",
                i === index ? "w-10 bg-brand" : "w-4 bg-border hover:bg-brand/40",
              )}
            />
          ))}
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

        <div ref={ref} className="mt-14 grid gap-5 md:grid-cols-3">
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

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative border-b border-border bg-background section-padding"
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

        {/* Right Column: Scrollable List of FAQ Accordion Rows */}
        <div className="flex flex-col border-t border-border/80">
          {FAQS.map((f, i) => {
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
                href="https://www.venushiring.ca/find-jobs"
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

export function ContactSection() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const [roleType, setRoleType] = useState<"employer" | "candidate">("employer");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    source: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", service: "", source: "", message: "" });
    }, 4500);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-b border-border bg-background section-padding"
      aria-label="Contact Us"
    >
      {/* Background ambient lighting and mesh graphics */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand/15 blur-[160px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-1/4 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand/10 blur-[150px]"
        aria-hidden
      />

      <div className="shell relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
            Let's Build Together
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
            Ready to scale your team?{" "}
            <span className="text-gradient-brand">Let's talk.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Whether you are hiring top talent across Canada & the US or exploring executive career pathways, our recruitment partners respond within 24 hours.
          </p>
        </div>

        {/* Master Glassmorphic Grid Container */}
        <div
          ref={ref}
          className={cn(
            "mt-14 overflow-hidden rounded-[2.5rem] border border-border/80 bg-card/90 p-6 sm:p-10 lg:p-12 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.18)] backdrop-blur-xl reveal-item",
            shown && "is-shown",
          )}
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            {/* Left Column: Direct Contact Hub, SLA Guarantees & Socials */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                  Direct Contact Hub
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Reach out directly
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Connect with our Canadian executive search team or book a discovery session.
                </p>
              </div>

              {/* Direct Info Cards */}
              <div className="flex flex-col gap-4">
                {/* Phone Box */}
                <a
                  href="tel:+16477220837"
                  className="group flex items-center justify-between rounded-2xl border border-border/80 bg-background/80 p-4 transition-all duration-300 hover:border-brand/50 hover:bg-card hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Direct Phone
                      </p>
                      <p className="text-base font-bold text-foreground transition-colors group-hover:text-brand">
                        +1-647-722-0837
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-bold uppercase text-brand">
                    Call Now
                  </span>
                </a>

                {/* Email Box */}
                <a
                  href="mailto:info@venushiring.ca"
                  className="group flex items-center justify-between rounded-2xl border border-border/80 bg-background/80 p-4 transition-all duration-300 hover:border-brand/50 hover:bg-card hover:shadow-md"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Email Inquiry
                      </p>
                      <p className="text-base font-bold text-foreground transition-colors group-hover:text-brand truncate">
                        info@venushiring.ca
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 shrink-0">
                    24h SLA
                  </span>
                </a>

                {/* Location Box */}
                <div className="flex items-center gap-4 rounded-2xl border border-border/80 bg-background/80 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      Toronto Headquarters
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      #205 - 1085 Bellamy Rd N, Toronto, ON
                    </p>
                  </div>
                </div>
              </div>

              {/* Response SLA Badges */}
              <div className="rounded-2xl border border-brand/20 bg-brand/5 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-brand">
                  Our Service Level Guarantee
                </p>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-brand/20 bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                    <Clock className="h-3.5 w-3.5 text-brand" />
                    24-Hour Callback
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-brand/20 bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                    <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                    100% Replacement Guarantee
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-brand/20 bg-background/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
                    🇨🇦 Coast-to-Coast Reach
                  </span>
                </div>
              </div>

              {/* Social Channels */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Follow & Connect
                </p>
                <div className="mt-3 flex items-center gap-3">
                  {[
                    { icon: Linkedin, href: "https://www.linkedin.com/company/venus-consultancy", label: "LinkedIn" },
                    { icon: Facebook, href: "https://www.facebook.com/venushiring", label: "Facebook" },
                    { icon: Instagram, href: "https://www.instagram.com/venushiring", label: "Instagram" },
                  ].map((soc) => (
                    <a
                      key={soc.label}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={soc.label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-border/80 bg-background text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-brand hover:bg-brand hover:text-white hover:shadow-brand"
                    >
                      <soc.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Premium Interactive Form */}
            <div className="lg:col-span-7 flex flex-col gap-6 lg:border-l lg:border-border/60 lg:pl-12">
              {/* Audience Selector Pills */}
              <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-border/80 bg-background/80 p-1.5 shadow-inner">
                <button
                  type="button"
                  onClick={() => setRoleType("employer")}
                  className={cn(
                    "flex-1 rounded-xl py-2.5 px-4 text-xs font-bold transition-all duration-300",
                    roleType === "employer"
                      ? "bg-primary text-primary-foreground shadow-sm scale-[1.02]"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  🏢 I am an Employer looking to hire
                </button>
                <button
                  type="button"
                  onClick={() => setRoleType("candidate")}
                  className={cn(
                    "flex-1 rounded-xl py-2.5 px-4 text-xs font-bold transition-all duration-300",
                    roleType === "candidate"
                      ? "bg-primary text-primary-foreground shadow-sm scale-[1.02]"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  💼 I am a Professional seeking jobs
                </button>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                  {roleType === "employer" ? "Request Talent Shortlist" : "Submit Your Profile"}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {roleType === "employer"
                    ? "Fill in your requirements below to receive a calibrated shortlist of pre-vetted candidates."
                    : "Connect with our talent acquisition partners to explore confidential job opportunities."}
                </p>
              </div>

              {submitted ? (
                <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-500/15 to-emerald-500/5 p-10 text-center backdrop-blur-md shadow-lg">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="mt-5 text-2xl font-bold text-foreground">Inquiry Received!</h4>
                  <p className="mt-2 text-base text-muted-foreground max-w-md mx-auto">
                    Thank you for contacting Venus Consultancy. A senior recruitment specialist will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="relative">
                      <label htmlFor="contact-name" className="sr-only">
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Full Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-2xl border border-border/80 bg-background/80 px-4 py-3.5 pl-11 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-brand focus:bg-background focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-sm"
                      />
                      <User className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/60" />
                    </div>

                    <div className="relative">
                      <label htmlFor="contact-email" className="sr-only">
                        Work Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder={roleType === "employer" ? "Work Email *" : "Email Address *"}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-2xl border border-border/80 bg-background/80 px-4 py-3.5 pl-11 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-brand focus:bg-background focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-sm"
                      />
                      <Mail className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/60" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="relative">
                      <label htmlFor="contact-phone" className="sr-only">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-2xl border border-border/80 bg-background/80 px-4 py-3.5 pl-11 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-brand focus:bg-background focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-sm"
                      />
                      <Phone className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/60" />
                    </div>

                    <div className="relative">
                      <label htmlFor="contact-service" className="sr-only">
                        Role / Industry Interest
                      </label>
                      <select
                        id="contact-service"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full rounded-2xl border border-border/80 bg-background/80 px-4 py-3.5 pl-11 text-sm text-foreground transition-all duration-300 focus:border-brand focus:bg-background focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-sm"
                      >
                        <option value="" disabled>
                          {roleType === "employer" ? "Select Hiring Service *" : "Select Primary Sector *"}
                        </option>
                        {roleType === "employer" ? (
                          <>
                            <option value="direct">Permanent Direct Hire</option>
                            <option value="executive">Executive Search</option>
                            <option value="sow">SOW Project Pods</option>
                            <option value="hr">Fractional HR & Advisory</option>
                          </>
                        ) : (
                          <>
                            <option value="finance">Finance & Accounting</option>
                            <option value="tech">Technology & Software</option>
                            <option value="auto">Automotive & EV</option>
                            <option value="aerospace">Aerospace & Engineering</option>
                            <option value="other">Other Executive Role</option>
                          </>
                        )}
                      </select>
                      <Building2 className="absolute left-4 top-4 h-4 w-4 text-muted-foreground/60" />
                    </div>
                  </div>

                  <div className="relative">
                    <label htmlFor="contact-message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder={
                        roleType === "employer"
                          ? "Tell us about your open roles, required skills, or hiring timeline *"
                          : "Tell us about your career experience, targets, or preferred location *"
                      }
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-2xl border border-border/80 bg-background/80 px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-brand focus:bg-background focus:outline-none focus:ring-2 focus:ring-brand/20 resize-none shadow-sm"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="group inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-brand py-4 text-base font-bold text-white shadow-brand transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      {roleType === "employer" ? "Submit Hiring Request" : "Submit Career Inquiry"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
