import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Minus,
  Plus,
  Quote,
  Star,
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
  const go = (next: number) => setIndex((next + QUOTES.length) % QUOTES.length);

  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-24">
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
          className={cn("reveal-item mt-12 overflow-hidden rounded-[2rem]", shown && "is-shown")}
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
      className="section-curve relative -mt-8 overflow-hidden border-b border-border bg-porcelain py-24"
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
    q: "How quickly can you present candidates?",
    a: "For most roles you receive a calibrated shortlist within five business days of the discovery session. Specialist and executive searches typically run two to three weeks.",
  },
  {
    q: "Do you support international and work-permit hiring?",
    a: "Yes. We regularly place internationally trained professionals and guide employers through LMIA, work-permit and PR-pathway considerations alongside our Canadian sourcing.",
  },
  {
    q: "What guarantees do you offer?",
    a: "Permanent placements carry a written replacement guarantee. If a hire does not work out inside the agreed period, we restart the search at no additional fee.",
  },
  {
    q: "Which industries do you specialize in?",
    a: "Finance and accounting, technology, automotive and EV, aerospace, manufacturing, skilled trades and corporate functions — across Canada and the US Midwest.",
  },
  {
    q: "Can you act as our HR team?",
    a: "Our fractional HR and advisory practice provides interim HR leadership for workforce planning, compliance, policy and engagement without adding permanent overhead.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-b border-border bg-background py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-60"
        aria-hidden
      />
      <div className="shell relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <SectionHeading
          title="Answers before you book the call"
          copy="Still deciding? Here is what employers and candidates ask us most often."
        />

        <div className="flex flex-col gap-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={cn(
                  "overflow-hidden rounded-2xl glass-panel px-6 transition-[border-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-lg",
                  isOpen
                    ? "border-brand/45 shadow-[0_26px_60px_-40px_rgba(15,23,42,0.55)]"
                    : "hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-soft",
                )}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "text-base font-semibold transition-colors duration-300",
                        isOpen ? "text-brand" : "text-foreground",
                      )}
                    >
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        "grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-out",
                        isOpen
                          ? "rotate-180 border-transparent bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground",
                      )}
                      aria-hidden
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                </h3>
                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                  style={{
                    transitionProperty: "grid-template-rows, opacity, padding-bottom",
                  }}
                >
                  <p
                    className="overflow-hidden pr-10 text-sm leading-relaxed text-muted-foreground"
                    style={{
                      opacity: isOpen ? 1 : 0,
                      transform: isOpen ? "translateY(0)" : "translateY(-10px)",
                      transition: "opacity 0.4s, transform 0.4s",
                    }}
                  >
                    {f.a}
                  </p>
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
      className="relative overflow-hidden bg-background py-20 lg:py-28"
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
