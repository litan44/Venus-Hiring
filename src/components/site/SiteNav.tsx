import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/venus-logo.png";
import heroTeam from "@/assets/hero-team.jpg";
import heroOffice from "@/assets/hero-office.jpg";
import { scrollToSection } from "@/lib/scroll";

const NAV = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services", hasMega: true },
  { label: "Industries", href: "#industries", hasMega: true },
  { label: "Blog", href: "#insights" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact Us", href: "#contact" },
];

const SECTION_IDS = NAV.filter((item) => item.href.startsWith("#")).map((item) =>
  item.href.slice(1),
);

/* ---------------- Mega Menu Data (Capermint Replica) ---------------- */

const SERVICES_MEGA = {
  categories: [
    {
      id: "perm",
      name: "Permanent Placement",
      description: "Direct hire & executive search across Canada & US",
      items: [
        { title: "Executive Search", desc: "C-Suite & VP search with guaranteed retention", href: "#services" },
        { title: "Direct Hire Staffing", desc: "Permanent full-time specialized talent", href: "#services" },
        { title: "Technical Leadership", desc: "Engineering Directors & Product VPs", href: "#services" },
        { title: "Senior Professionals", desc: "CPAs, Financial Controllers & Senior Devs", href: "#services" },
        { title: "Skilled Trades & Ops", desc: "Plant Directors & Industrial Specialists", href: "#services" },
      ],
    },
    {
      id: "contract",
      name: "Contract & Temporary",
      description: "Agile staffing and project-based talent solutions",
      items: [
        { title: "Project Staffing", desc: "Short or long-term specialized contractors", href: "#services" },
        { title: "Interim Leadership", desc: "Interim Executives, CFOs & CTOs", href: "#services" },
        { title: "Turnkey Payroll & EOR", desc: "Full payroll compliance across North America", href: "#services" },
        { title: "Scaleup Talent Pods", desc: "Dedicated team augmentation for rapid scale", href: "#services" },
      ],
    },
    {
      id: "advisory",
      name: "HR & Strategic Advisory",
      description: "Interim HR leadership & organizational planning",
      items: [
        { title: "Compliance Audits", desc: "Canadian & US employment law frameworks", href: "#services" },
        { title: "Workforce Planning", desc: "Organizational design & headcount forecasting", href: "#services" },
        { title: "Compensation Benchmarking", desc: "Market rate analysis & incentive plans", href: "#services" },
        { title: "Retention Programs", desc: "Structured onboarding & 90-day retention checks", href: "#services" },
      ],
    },
    {
      id: "sow",
      name: "Statement of Work (SOW)",
      description: "Outcome-based team delivery with strict SLAs",
      items: [
        { title: "Outcome SLAs", desc: "Fixed-budget deliverable commitments", href: "#services" },
        { title: "Agile Project Pods", desc: "Managed engineering & product pods", href: "#services" },
        { title: "Fixed Budget Delivery", desc: "Predictable project cost structures", href: "#services" },
        { title: "Turnkey Execution", desc: "End-to-end milestone accountability", href: "#services" },
      ],
    },
  ],
  promo: {
    title: "Hire Top 1% Canadian Talent across Canada & USA",
    copy: "Calibrated shortlists delivered in under 14 days with our 98.4% retention guarantee.",
    ctaText: "Book a Call →",
    href: "#contact",
    image: heroTeam,
  },
  bottomBanner: {
    title: "Let's grow together, Partner with us!",
    ctaText: "REQUEST FREE QUOTE",
    href: "#contact",
  },
};

const INDUSTRIES_MEGA = {
  categories: [
    {
      id: "tech",
      name: "Technology & Software",
      description: "AI, Cloud, Engineering & Digital Transformation",
      items: [
        { title: "Full Stack & Frontend", desc: "React, Node, Python & Cloud Architects", href: "#industries" },
        { title: "AI/ML & Data Science", desc: "Machine Learning & AI Infrastructure Leads", href: "#industries" },
        { title: "DevOps & Cybersecurity", desc: "SREs, Cloud Security & CI/CD Experts", href: "#industries" },
        { title: "Tech Leadership", desc: "VPs of Tech, CTOs & Product Directors", href: "#industries" },
      ],
    },
    {
      id: "finance",
      name: "Finance & Accounting",
      description: "Corporate Finance, CPAs & Fiscal Management",
      items: [
        { title: "Financial Controllers", desc: "Senior Controllers & Corporate Treasurers", href: "#industries" },
        { title: "CPAs & Audit Leads", desc: "Public & Corporate Chartered Accountants", href: "#industries" },
        { title: "FP&A & Financial Analysts", desc: "Strategic Financial Planning & Analytics", href: "#industries" },
        { title: "CFO Executive Search", desc: "Retained search for C-Suite Finance Leaders", href: "#industries" },
      ],
    },
    {
      id: "auto",
      name: "Automotive & EV",
      description: "EV Battery Tech, Plant Ops & Mobility",
      items: [
        { title: "EV Battery Architecture", desc: "Cell Design & Battery Management Systems", href: "#industries" },
        { title: "Plant & Operations Managers", desc: "Automotive Plant Directors & Lean Leads", href: "#industries" },
        { title: "Autonomous Systems", desc: "ADAS, Sensor Fusion & Vehicle Software", href: "#industries" },
        { title: "Supply Chain & Quality", desc: "TS16949 Quality & Global Logistics Leads", href: "#industries" },
      ],
    },
    {
      id: "aerospace",
      name: "Aerospace & Engineering",
      description: "Avionics, Flight Systems & Defense",
      items: [
        { title: "Avionics & Flight Systems", desc: "Hardware & Firmware Aerospace Engineers", href: "#industries" },
        { title: "Structural & Stress Analysts", desc: "Structural & FEA Thermal Engineers", href: "#industries" },
        { title: "Compliance & Regulatory Leads", desc: "FAA & Transport Canada Certified Pros", href: "#industries" },
        { title: "Flight Test Engineers", desc: "Systems Integration & Flight Testing Leads", href: "#industries" },
      ],
    },
  ],
  promo: {
    title: "Specialized Industry Headhunters across Canada & USA",
    copy: "Deep sector expertise and pre-screened candidate pipelines ready to deploy.",
    ctaText: "Explore Industries →",
    href: "#industries",
    image: heroOffice,
  },
  bottomBanner: {
    title: "Need specialized talent for your sector?",
    ctaText: "GET CANDIDATE SHORTLIST",
    href: "#contact",
  },
};

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>("top");
  const [open, setOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<"services" | "industries" | null>(null);
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [activeIndustryIdx, setActiveIndustryIdx] = useState(0);
  const isNavigatingRef = useRef(false);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMenuEnter = (menu: "services" | "industries") => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    setActiveMegaMenu(menu);
  };

  const handleMenuLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  // Throttled scroll state listener (only triggers re-renders on boundary change)
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const isScrolled = window.scrollY > 40;
        setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // IntersectionObserver for active tab highlight (bypassed during navigation clicks)
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigatingRef.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Body scroll lock while mobile menu is open
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Escape key handler to close mobile nav
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Fast, lag-free navigation handler
  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (href.startsWith("http")) {
      if (open) setOpen(false);
      return;
    }
    if (e) e.preventDefault();
    const targetId = href.startsWith("#") ? href.slice(1) : href;
    setActive(targetId === "top" ? "top" : targetId);
    isNavigatingRef.current = true;
    if (open) setOpen(false);

    scrollToSection(targetId, {
      offset: 75,
      onComplete: () => {
        setTimeout(() => {
          isNavigatingRef.current = false;
        }, 50);
      },
    });
  };

  const light = !scrolled && !open && !activeMegaMenu;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <header
        onMouseLeave={handleMenuLeave}
        className={cn(
          "nav-drop fixed inset-x-0 top-0 z-50 transition-[padding,background-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled || activeMegaMenu
            ? "border-b border-border/70 bg-background/90 py-2 shadow-[0_10px_40px_-30px_rgba(15,23,42,0.6)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-4",
        )}
      >
        <div className="shell">
          <div className="relative flex items-center justify-between gap-6">
            {/* Brand */}
            <a
              href="#top"
              onClick={(e) => handleNavClick("top", e)}
              className="flex min-w-0 items-center gap-3"
              aria-label="Venus Consultancy — back to top"
            >
              <img
                src={logo}
                alt="Venus Consultancy logo"
                width={96}
                height={96}
                decoding="async"
                className={cn(
                  "shrink-0 rounded-lg object-contain transition-all duration-500 ease-out",
                  light ? "h-11 w-11 bg-ink-foreground/90 p-0.5" : "h-9 w-9",
                )}
              />
              <span
                className={cn(
                  "truncate font-display font-semibold tracking-[-0.02em] transition-all duration-500 ease-out",
                  light ? "text-[1.15rem] text-ink-foreground" : "text-[1rem] text-foreground",
                )}
              >
                Venus Consultancy
              </span>
            </a>

            {/* Center navigation */}
            <nav
              aria-label="Primary"
              className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
            >
              <ul
                className={cn(
                  "flex items-center transition-[gap] duration-500 ease-out",
                  scrolled ? "gap-8" : "gap-10",
                )}
              >
                {NAV.map((item) => {
                  const targetId = item.href.startsWith("#") ? item.href.slice(1) : "";
                  const isActive = active === targetId;
                  const isMegaActive =
                    (item.label === "Services" && activeMegaMenu === "services") ||
                    (item.label === "Industries" && activeMegaMenu === "industries");

                  return (
                    <li
                      key={item.label}
                      onMouseEnter={() => {
                        if (item.label === "Services") handleMenuEnter("services");
                        else if (item.label === "Industries") handleMenuEnter("industries");
                        else {
                          if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
                          setActiveMegaMenu(null);
                        }
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={(e) => {
                          handleNavClick(item.href, e);
                          setActiveMegaMenu(null);
                        }}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "group relative inline-flex items-center gap-1.5 py-1 text-[0.95rem] tracking-[0.005em] transition-colors duration-300 ease-out",
                          light
                            ? isActive
                              ? "font-semibold text-ink-foreground"
                              : "font-medium text-ink-foreground/70 hover:text-ink-foreground"
                            : isActive || isMegaActive
                              ? "font-semibold text-brand"
                              : "font-medium text-muted-foreground hover:text-brand",
                        )}
                      >
                        {item.label}
                        {item.hasMega && (
                          <ChevronDown
                            className={cn(
                              "h-3.5 w-3.5 transition-transform duration-300",
                              isMegaActive
                                ? "rotate-180 text-brand"
                                : "text-muted-foreground group-hover:text-brand",
                            )}
                          />
                        )}
                        <span
                          aria-hidden
                          className={cn(
                            "pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-center rounded-full bg-brand transition-transform duration-300 ease-out",
                            isActive || isMegaActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                          )}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Actions */}
            <div className="hidden items-center gap-3 lg:flex">
              <a
                href="https://www.venushiring.ca/find-jobs"
                className={cn(
                  "rounded-full border px-5 py-2.5 text-[0.875rem] font-medium transition-all duration-300 ease-out hover:-translate-y-0.5",
                  light
                    ? "border-ink-line bg-ink-foreground/10 text-ink-foreground backdrop-blur hover:bg-ink-foreground/20"
                    : "border-border bg-card text-foreground hover:border-brand/50 hover:text-brand",
                )}
              >
                Find jobs
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick("#contact", e)}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-[0.875rem] font-semibold text-primary-foreground shadow-brand transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:brightness-110 active:translate-y-0 active:scale-100"
              >
                Book a call
                <span
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </a>
            </div>

            {/* Mobile trigger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300 ease-out lg:hidden",
                light
                  ? "border-ink-line bg-ink-foreground/10 backdrop-blur"
                  : "border-border bg-card/70 hover:border-brand/50",
              )}
            >
              <span className="flex flex-col gap-[5px]" aria-hidden>
                <span
                  className={cn(
                    "block h-px w-4.5 transition-transform duration-300 ease-out",
                    light ? "bg-ink-foreground" : "bg-foreground",
                    open && "translate-y-[3px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "block h-px w-4.5 transition-transform duration-300 ease-out",
                    light ? "bg-ink-foreground" : "bg-foreground",
                    open && "-translate-y-[3px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Capermint Replica Ultra-Premium Mega Menu Dropdown */}
        {activeMegaMenu && (
          <div
            onMouseEnter={() => {
              if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
            }}
            onMouseLeave={handleMenuLeave}
            className="absolute left-1/2 top-full -translate-x-1/2 w-full max-w-6xl pt-3 px-4 transition-all duration-300 ease-out z-50 hidden lg:block"
          >
            <div className="overflow-hidden rounded-[2.25rem] border border-border/80 bg-background/95 backdrop-blur-2xl shadow-[0_30px_90px_-20px_rgba(15,23,42,0.35)] transition-all duration-300 text-foreground">
              {/* Upper 3-Column Content Grid */}
              <div className="grid grid-cols-12 p-6 sm:p-8 gap-8 items-stretch">
                {/* Left Column: Sub-Categories List */}
                <div className="col-span-4 flex flex-col gap-2 border-r border-border/60 pr-6">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand mb-2">
                    {activeMegaMenu === "services" ? "Service Categories" : "Industry Sectors"}
                  </span>
                  {(activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).categories.map(
                    (cat, idx) => {
                      const selected =
                        (activeMegaMenu === "services" ? activeServiceIdx : activeIndustryIdx) === idx;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onMouseEnter={() => {
                            if (activeMegaMenu === "services") setActiveServiceIdx(idx);
                            else setActiveIndustryIdx(idx);
                          }}
                          onClick={() => {
                            handleNavClick(
                              activeMegaMenu === "services" ? "#services" : "#industries"
                            );
                            setActiveMegaMenu(null);
                          }}
                          className={cn(
                            "group flex items-center justify-between rounded-2xl p-3.5 text-left transition-all duration-200",
                            selected
                              ? "bg-brand/10 text-brand font-bold shadow-sm"
                              : "text-foreground hover:bg-card hover:text-brand",
                          )}
                        >
                          <div>
                            <p className="text-sm font-semibold">{cat.name}</p>
                            <p className="text-[11px] text-muted-foreground line-clamp-1">
                              {cat.description}
                            </p>
                          </div>
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 shrink-0 transition-transform duration-200",
                              selected
                                ? "translate-x-1 text-brand"
                                : "text-muted-foreground group-hover:translate-x-1 group-hover:text-brand",
                            )}
                          />
                        </button>
                      );
                    }
                  )}
                </div>

                {/* Middle Column: Active Category Specialized Sub-Items */}
                <div className="col-span-5 flex flex-col gap-3 pr-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand mb-2">
                    Specialized Offerings & Roles
                  </span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {(
                      (activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).categories[
                        activeMegaMenu === "services" ? activeServiceIdx : activeIndustryIdx
                      ] || (activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).categories[0]
                    ).items.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.href}
                        onClick={(e) => {
                          handleNavClick(subItem.href, e);
                          setActiveMegaMenu(null);
                        }}
                        className="group flex flex-col rounded-xl p-3 border border-border/50 bg-background/50 hover:border-brand/40 hover:bg-card transition-all duration-200"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-foreground group-hover:text-brand transition-colors">
                            {subItem.title}
                          </p>
                          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{subItem.desc}</p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Right Column: Featured Promo Graphic Card */}
                <div className="col-span-3">
                  {(() => {
                    const promo = (activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).promo;
                    return (
                      <div className="relative h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-white/20 bg-slate-900 p-5 text-white shadow-xl">
                        <img
                          src={promo.image}
                          alt={promo.title}
                          className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-80 transition-transform duration-700 hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/30" />
                        <div>
                          <h4 className="text-sm font-bold leading-snug">{promo.title}</h4>
                          <p className="mt-2 text-[11px] text-white/80 leading-relaxed">{promo.copy}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/20">
                          <a
                            href={promo.href}
                            onClick={(e) => {
                              handleNavClick(promo.href, e);
                              setActiveMegaMenu(null);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-brand hover:brightness-110 transition-all"
                          >
                            {promo.ctaText}
                          </a>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Bottom Full-Width Gradient Banner Bar (Capermint Replica) */}
              <div className="flex items-center justify-between bg-gradient-to-r from-brand via-brand/90 to-brand/70 px-8 py-4 text-white">
                <p className="font-display text-lg font-bold tracking-tight">
                  {(activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).bottomBanner.title}
                </p>
                <a
                  href={(activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).bottomBanner.href}
                  onClick={(e) => {
                    handleNavClick(
                      (activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).bottomBanner.href,
                      e
                    );
                    setActiveMegaMenu(null);
                  }}
                  className="rounded-full bg-black px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-xl hover:bg-slate-950 hover:scale-105 transition-all"
                >
                  {(activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).bottomBanner.ctaText}
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Mobile fullscreen menu */}
        <div
          id="mobile-nav"
          className={cn(
            "fixed inset-0 top-0 -z-10 bg-background/95 backdrop-blur-2xl transition-opacity duration-500 ease-out lg:hidden",
            open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          )}
          aria-hidden={!open}
        >
          <nav
            aria-label="Mobile"
            className="shell flex h-full flex-col justify-center gap-2 pb-16"
          >
            {NAV.map((item, index) => {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => handleNavClick(item.href, e)}
                  style={{ transitionDelay: open ? `${80 + index * 45}ms` : "0ms" }}
                  className={cn(
                    "border-b border-border/70 py-4 font-display text-2xl font-medium tracking-[-0.02em] transition-all duration-500 ease-out hover:text-brand",
                    open ? "translate-y-0 opacity-100 blur-0" : "translate-y-3 opacity-0 blur-sm",
                  )}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="#contact"
                tabIndex={open ? 0 : -1}
                onClick={(e) => handleNavClick("#contact", e)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-[0.95rem] font-semibold text-primary-foreground shadow-brand"
              >
                Book a call <span aria-hidden>→</span>
              </a>
              <a
                href="https://www.venushiring.ca/find-jobs"
                tabIndex={open ? 0 : -1}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-7 text-[0.95rem] font-medium text-foreground"
              >
                Find jobs
              </a>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
