import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Home,
  Briefcase,
  Building2,
  BookOpen,
  Image as ImageIcon,
  HelpCircle,
  PhoneCall,
  Sparkles,
  Search,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/venus-logo.png";
import heroTeam from "@/assets/hero-team.jpg";
import heroOffice from "@/assets/hero-office.jpg";
import { scrollToSection } from "@/lib/scroll";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasMega: true },
  { label: "Industries", href: "/industries", hasMega: true },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

const SECTION_IDS = ["services", "industries", "blog", "faq", "contact"];

/* ---------------- Mega Menu Data (Capermint Replica) ---------------- */

const SERVICES_MEGA = {
  categories: [
    {
      id: "perm",
      name: "Permanent Placement",
      description: "Direct hire & executive search across Canada & US",
      href: "/services/executive-search",
      items: [
        { title: "Executive Search", desc: "C-Suite, VP and senior leadership recruitment", href: "/services/executive-search" },
        { title: "Direct Hire Staffing", desc: "Permanent full-time specialized talent", href: "/services/direct-hire-staffing" },
        { title: "Technical Leadership", desc: "Engineering Directors, CTOs and Product Leaders", href: "/services/executive-search#exec-c-suite" },
        { title: "Senior Professionals", desc: "CPAs, Financial Controllers and senior specialists", href: "/services/executive-search#exec-vps" },
        { title: "Skilled Trades & Operations", desc: "Plant Directors, technicians and industrial specialists", href: "/services/direct-hire-staffing#dh-ops" },
        { title: "IT & Digital Talent", desc: "Software, cloud, data and digital transformation experts", href: "/services/direct-hire-staffing#dh-technical" },
      ],
    },
    {
      id: "contract",
      name: "Contract & Temporary",
      description: "Agile staffing and project-based talent solutions",
      href: "/services/contract-staffing",
      items: [
        { title: "Project Staffing", desc: "Short or long-term specialized contractors", href: "/services/contract-staffing" },
        { title: "Interim Leadership", desc: "Interim Executives, CFOs & CTOs", href: "/services/contract-staffing" },
        { title: "Turnkey Payroll & EOR", desc: "Full payroll compliance across North America", href: "/services/contract-staffing" },
        { title: "Scaleup Talent Pods", desc: "Dedicated team augmentation for rapid scale", href: "/services/contract-staffing" },
        { title: "Engineering & Project Talent", desc: "Engineering, project management and technical specialists", href: "/services/contract-staffing" },
        { title: "Recruitment Process Outsourcing", desc: "Flexible recruitment support for growing organizations", href: "/services/contract-staffing" },
      ],
    },
    {
      id: "startup",
      name: "Startup Hiring",
      description: "0–50 team scaling, early-stage hiring & employer branding",
      href: "/services/startup-hiring",
      items: [
        { title: "Founding-Team Hiring", desc: "Critical first hires for seed & Series A startups", href: "/services/startup-hiring" },
        { title: "Early-Stage Recruitment", desc: "0 to 50 employee team scaling", href: "/services/startup-hiring" },
        { title: "Scale-Up Talent Pods", desc: "Dedicated recruitment infrastructure for rapid growth", href: "/services/startup-hiring" },
        { title: "Employer Branding", desc: "Brand positioning to attract top startup talent", href: "/services/startup-hiring" },
      ],
    },
    {
      id: "consulting",
      name: "Talent Consulting & Advisory",
      description: "Strategic workforce planning, pipeline architecture & hiring process optimization",
      href: "/services/talent-consulting",
      items: [
        { title: "Talent Strategy", desc: "Comprehensive talent pipeline architecture", href: "/services/talent-consulting" },
        { title: "Workforce Planning", desc: "Headcount forecasting & market rate intelligence", href: "/services/talent-consulting" },
        { title: "Recruitment Optimization", desc: "Hiring process improvement & manager enablement", href: "/services/talent-consulting" },
        { title: "Employer Brand Strategy", desc: "Positioning your organization as an employer of choice", href: "/services/talent-consulting" },
      ],
    },
    {
      id: "advisory",
      name: "HR & Strategic Advisory",
      description: "Interim HR leadership & organizational planning",
      href: "/services/hr-advisory",
      items: [
        { title: "Talent Acquisition Strategy", desc: "Strategic hiring programs, talent pipelines and workforce planning", href: "/services/hr-advisory" },
        { title: "HR & People Advisory", desc: "Workforce planning, organizational development and HR support", href: "/services/hr-advisory" },
        { title: "Compliance Audits", desc: "Canadian & US employment law frameworks", href: "/services/hr-advisory" },
        { title: "Compensation Benchmarking", desc: "Market rate analysis & incentive plans", href: "/services/hr-advisory" },
        { title: "Retention Programs", desc: "Structured onboarding & 90-day retention checks", href: "/services/hr-advisory" },
        { title: "Workforce Planning", desc: "Organizational design & headcount forecasting", href: "/services/hr-advisory" },
      ],
    },
    {
      id: "sow",
      name: "Statement of Work (SOW)",
      description: "Outcome-based team delivery with strict SLAs",
      href: "/services/sow-project-pods",
      items: [
        { title: "Outcome SLAs", desc: "Fixed-budget deliverable commitments", href: "/services/sow-project-pods" },
        { title: "Agile Project Pods", desc: "Managed engineering & product pods", href: "/services/sow-project-pods" },
        { title: "Fixed Budget Delivery", desc: "Predictable project cost structures", href: "/services/sow-project-pods" },
        { title: "Turnkey Execution", desc: "End-to-end milestone accountability", href: "/services/sow-project-pods" },
        { title: "Milestone Verification", desc: "Quality audits and milestone sign-offs", href: "/services/sow-project-pods" },
        { title: "Risk Mitigation Pods", desc: "Guaranteed deliverable outcomes", href: "/services/sow-project-pods" },
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
      href: "/industries/technology",
      items: [
        { title: "Full Stack & Frontend", desc: "React, Node, Python & Cloud Architects", href: "/industries/technology" },
        { title: "AI/ML & Data Science", desc: "Machine Learning & AI Infrastructure Leads", href: "/industries/technology" },
        { title: "DevOps & Cybersecurity", desc: "SREs, Cloud Security & CI/CD Experts", href: "/industries/technology" },
        { title: "Cloud & Infrastructure", desc: "AWS, Azure & Enterprise Infrastructure Leads", href: "/industries/technology" },
        { title: "Technical Leadership", desc: "VPs of Technology, CTOs & Product Directors", href: "/industries/technology" },
        { title: "Product & Engineering", desc: "Product Managers, Engineering Leads & Scrums", href: "/industries/technology" },
      ],
    },
    {
      id: "finance",
      name: "Finance & Accounting",
      description: "Corporate Finance, CPAs & Fiscal Management",
      href: "/industries/finance-corporate",
      items: [
        { title: "Financial Controllers", desc: "Senior Controllers & Corporate Treasurers", href: "/industries/finance-corporate" },
        { title: "CPAs & Audit Leads", desc: "Public & Corporate Chartered Accountants", href: "/industries/finance-corporate" },
        { title: "FP&A & Financial Analysts", desc: "Strategic Financial Planning & Analytics", href: "/industries/finance-corporate" },
        { title: "CFO Executive Search", desc: "Retained search for C-Suite Finance Leaders", href: "/industries/finance-corporate" },
        { title: "Risk & Compliance", desc: "Regulatory Compliance & Risk Assessment", href: "/industries/finance-corporate" },
        { title: "Corporate Treasury", desc: "Capital Structure & Cash Flow Management", href: "/industries/finance-corporate" },
      ],
    },
    {
      id: "auto",
      name: "Automotive & EV",
      description: "EV Battery Tech, Plant Ops & Mobility",
      href: "/industries/automotive-ev",
      items: [
        { title: "EV Battery Architecture", desc: "Cell Design & Battery Management Systems", href: "/industries/automotive-ev" },
        { title: "Plant & Ops Managers", desc: "Automotive Plant Directors & Lean Leads", href: "/industries/automotive-ev" },
        { title: "Autonomous Systems", desc: "ADAS, Sensor Fusion & Vehicle Software", href: "/industries/automotive-ev" },
        { title: "Supply Chain & Quality", desc: "TS16949 Quality & Global Logistics Leads", href: "/industries/automotive-ev" },
        { title: "Manufacturing & Tooling", desc: "Tooling Engineers & Assembly Line Directors", href: "/industries/automotive-ev" },
        { title: "Robotics & Automation", desc: "PLC Programmers & Automated Assembly Leads", href: "/industries/automotive-ev" },
      ],
    },
    {
      id: "aerospace",
      name: "Aerospace & Engineering",
      description: "Avionics, Flight Systems & Defense",
      href: "/industries/aerospace",
      items: [
        { title: "Avionics & Flight Systems", desc: "Hardware & Firmware Aerospace Engineers", href: "/industries/aerospace" },
        { title: "Structural & Stress Analysts", desc: "Structural & FEA Thermal Engineers", href: "/industries/aerospace" },
        { title: "Compliance & Regulatory Leads", desc: "FAA & Transport Canada Certified Pros", href: "/industries/aerospace" },
        { title: "Flight Test Engineers", desc: "Systems Integration & Flight Testing Leads", href: "/industries/aerospace" },
        { title: "Systems Architecture", desc: "Defense & Commercial Aircraft Systems", href: "/industries/aerospace" },
        { title: "Propulsion Specialists", desc: "Turbine & Jet Engine Design Engineers", href: "/industries/aerospace" },
      ],
    },
    {
      id: "mfg",
      name: "Manufacturing & Industrial",
      description: "Plant Operations, Engineering & Production",
      href: "/industries/manufacturing",
      items: [
        { title: "Plant Operations Directors", desc: "Multi-site Operations & Facility Management", href: "/industries/manufacturing" },
        { title: "Production Engineers", desc: "Industrial & Manufacturing Process Leads", href: "/industries/manufacturing" },
        { title: "Quality Assurance Leads", desc: "ISO Quality Managers & Audit Directors", href: "/industries/manufacturing" },
        { title: "EHS & Safety Directors", desc: "Environmental Health & Safety Managers", href: "/industries/manufacturing" },
        { title: "Maintenance Supervisors", desc: "Reliability & Preventive Maintenance Leads", href: "/industries/manufacturing" },
        { title: "Lean & Six Sigma Black Belts", desc: "Continuous Improvement & Operational Excellence", href: "/industries/manufacturing" },
      ],
    },
    {
      id: "health",
      name: "Healthcare & Life Sciences",
      description: "Healthcare Operations, Life Sciences & Specialized Talent",
      href: "/industries/healthcare",
      items: [
        { title: "Clinical Operations Leads", desc: "Clinical Trial & Healthcare Operations VPs", href: "/industries/healthcare" },
        { title: "Life Sciences Researchers", desc: "Pharma R&D & Biotech Specialists", href: "/industries/healthcare" },
        { title: "Regulatory Affairs Managers", desc: "Health Canada & FDA Compliance Directors", href: "/industries/healthcare" },
        { title: "Biostatisticians & Analysts", desc: "Clinical Data & Bioanalytical Leads", href: "/industries/healthcare" },
        { title: "Medical Device Engineers", desc: "ISO 13485 Medical Hardware Specialists", href: "/industries/healthcare" },
        { title: "Biotech Project Managers", desc: "Pharma Pipeline & Lab Operations Leads", href: "/industries/healthcare" },
      ],
    },
    {
      id: "corp",
      name: "Professional & Corporate Services",
      description: "Business Operations, HR, Sales & Corporate Functions",
      href: "/industries/professional-services",
      items: [
        { title: "VPs of Corporate Operations", desc: "Enterprise Operations & Business Strategy", href: "/industries/professional-services" },
        { title: "HR Directors & Talent VPs", desc: "Chief Human Resources Officers & HR VPs", href: "/industries/professional-services" },
        { title: "Enterprise Sales Leaders", desc: "VPs of Sales, Business Development Directors", href: "/industries/professional-services" },
        { title: "Strategy & Transformation Leads", desc: "Management Consultants & Change Leaders", href: "/industries/professional-services" },
        { title: "Chief Legal Officers", desc: "General Counsel & Corporate Legal Directors", href: "/industries/professional-services" },
        { title: "Marketing & Growth Executives", desc: "CMOs, Brand & Demand Generation Directors", href: "/industries/professional-services" },
      ],
    },
    {
      id: "supply",
      name: "Supply Chain & Logistics",
      description: "Procurement, Distribution, Operations & Supply Chain",
      href: "/industries/supply-chain",
      items: [
        { title: "Global Procurement Leads", desc: "Strategic Sourcing & Vendor Directors", href: "/industries/supply-chain" },
        { title: "Warehouse & Distribution Ops", desc: "Distribution Center Managers & WMS Leads", href: "/industries/supply-chain" },
        { title: "Logistics & Freight Leads", desc: "Logistics Directors & Customs Managers", href: "/industries/supply-chain" },
        { title: "Demand Planning & S&OP", desc: "Demand Planners & Inventory Control Leads", href: "/industries/supply-chain" },
        { title: "Supply Chain ERP Leads", desc: "SAP & Kinaxis Supply Chain Consultants", href: "/industries/supply-chain" },
        { title: "Executive Supply Chain", desc: "VPs of Global Supply Chain & Logistics", href: "/industries/supply-chain" },
      ],
    },
  ],
  promo: {
    title: "Specialized Industry Headhunters across Canada & USA",
    copy: "Deep sector expertise and pre-screened candidate pipelines ready to deploy.",
    ctaText: "Explore Industries →",
    href: "/industries",
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
  const [mobileExpanded, setMobileExpanded] = useState<"services" | "industries" | null>(null);
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

  // Throttled scroll state listener
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

  // IntersectionObserver for active tab highlight
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
      if (event.key === "Escape") {
        setOpen(false);
        setActiveMegaMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  let locationPathname = "/";
  try {
    const loc = useLocation();
    locationPathname = loc.pathname;
  } catch (_err) {
    if (typeof window !== "undefined") {
      locationPathname = window.location.pathname;
    }
  }

  const [currentPath, setCurrentPath] = useState(locationPathname);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, [locationPathname]);

  const pathname = currentPath || locationPathname;
  const isHomePage = pathname === "/";

  // Fast, lag-free navigation handler
  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    if (href.startsWith("http") || href.startsWith("/")) {
      if (open) setOpen(false);
      return;
    }
    if (e) e.preventDefault();
    const targetId = href.startsWith("#") ? href.slice(1) : href;

    if (!isHomePage) {
      window.location.href = targetId === "top" ? "/" : `/#${targetId}`;
      return;
    }

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

  const isHeroDarkPage = isHomePage || pathname.startsWith("/industries/") || pathname.startsWith("/services/");
  const light = isHeroDarkPage && !scrolled && !activeMegaMenu;

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
          scrolled || activeMegaMenu || !isHeroDarkPage
            ? "border-b border-border/70 bg-background/95 text-foreground py-2.5 shadow-[0_10px_40px_-30px_rgba(15,23,42,0.6)] backdrop-blur-xl"
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
                  light ? "h-10 w-10 bg-white/95 p-0.5 shadow-sm" : "h-9 w-9",
                )}
              />
              <span
                className={cn(
                  "truncate font-display font-semibold tracking-[-0.02em] transition-all duration-500 ease-out",
                  light ? "text-[1.1rem] sm:text-[1.15rem] text-white drop-shadow-sm" : "text-[1rem] text-foreground",
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
                  const itemSectionId = item.href === "/" ? "top" : item.href.replace(/^\//, "");
                  const isActive = isHomePage
                    ? (active === itemSectionId || (item.href === "/" && (!active || active === "top")))
                    : (pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)));
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
                              ? "font-semibold text-white"
                              : "font-medium text-white/80 hover:text-white"
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
                                : light
                                  ? "text-white/70 group-hover:text-white"
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
                href="/careers"
                className={cn(
                  "rounded-full border px-5 py-2.5 text-[0.875rem] font-medium transition-all duration-300 ease-out hover:-translate-y-0.5",
                  light
                    ? "border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20"
                    : "border-border bg-card text-foreground hover:border-brand/50 hover:text-brand",
                )}
              >
                Find jobs
              </a>
              <a
                href="/contact"
                onClick={(e) => handleNavClick("/contact", e)}
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

            {/* Mobile Hamburger Trigger */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Open navigation menu"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ease-out active:scale-95 lg:hidden",
                light
                  ? "border-white/20 bg-white/15 text-white backdrop-blur-md hover:bg-white/25 shadow-sm"
                  : "border-border bg-card text-foreground hover:border-brand/50 shadow-sm",
              )}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown */}
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
              <div className="grid grid-cols-12 p-5 sm:p-6 gap-6 items-stretch min-h-[270px]">
                {/* Left Column: Sub-Categories List */}
                <div className="col-span-3 flex flex-col justify-start border-r border-border/60 pr-5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand mb-2">
                    {activeMegaMenu === "services" ? "Service Categories" : "Industry Sectors"}
                  </span>
                  <div className="flex flex-col gap-1 mt-1">
                    {(activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).categories.map(
                      (cat, idx) => {
                        const selected =
                          (activeMegaMenu === "services" ? activeServiceIdx : activeIndustryIdx) === idx;
                        const isIndustries = activeMegaMenu === "industries";

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
                              "group flex items-center justify-between rounded-xl text-left transition-all duration-200",
                              isIndustries ? "py-1.5 px-2.5" : "py-2.5 px-3",
                              selected
                                ? "bg-brand/10 text-brand font-bold shadow-sm"
                                : "text-foreground hover:bg-card hover:text-brand",
                            )}
                          >
                            <div className="min-w-0 pr-1">
                              <p className={cn("font-semibold truncate", isIndustries ? "text-[11.5px]" : "text-xs")}>
                                {cat.name}
                              </p>
                              {!isIndustries && (
                                <p className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
                                  {cat.description}
                                </p>
                              )}
                            </div>
                            <ChevronRight
                              className={cn(
                                "h-3.5 w-3.5 shrink-0 transition-transform duration-200",
                                selected
                                  ? "translate-x-1 text-brand"
                                  : "text-muted-foreground/50 group-hover:translate-x-1 group-hover:text-brand",
                              )}
                            />
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>

                {/* Middle Column: Active Category Specialized Sub-Items */}
                <div className="col-span-6 flex flex-col justify-start px-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                      Specialized Offerings & Roles
                    </span>
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                      {(activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).categories[
                        (activeMegaMenu === "services" ? activeServiceIdx : activeIndustryIdx) >=
                        (activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).categories.length
                          ? 0
                          : activeMegaMenu === "services"
                            ? activeServiceIdx
                            : activeIndustryIdx
                      ]?.name}
                    </span>
                  </div>

                  {/* 2-Column Sub-Item Grid */}
                  <div className="grid grid-cols-2 gap-2.5 mt-1">
                    {(
                      (activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).categories[
                        (activeMegaMenu === "services" ? activeServiceIdx : activeIndustryIdx) >=
                        (activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).categories.length
                          ? 0
                          : activeMegaMenu === "services"
                            ? activeServiceIdx
                            : activeIndustryIdx
                      ] || (activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).categories[0]
                    ).items.map((subItem) => (
                      <a
                        key={subItem.title}
                        href={subItem.href}
                        onClick={(e) => {
                          handleNavClick(subItem.href, e);
                          setActiveMegaMenu(null);
                        }}
                        className="group flex flex-col justify-between rounded-xl p-2.5 border border-border/50 bg-background/60 hover:border-brand/40 hover:bg-card hover:shadow-md transition-all duration-200 min-h-[58px]"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <p className="text-[11.5px] font-bold text-foreground group-hover:text-brand transition-colors leading-tight">
                            {subItem.title}
                          </p>
                          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                        <p className="text-[10.5px] text-muted-foreground mt-1 leading-snug line-clamp-1">
                          {subItem.desc}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Right Column: Featured Promo Graphic Card */}
                <div className="col-span-3 pl-1 flex flex-col">
                  {(() => {
                    const promo = (activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).promo;
                    return (
                      <div className="group relative isolate flex h-full min-h-[235px] flex-col justify-between overflow-hidden rounded-2xl border border-white/20 p-4 sm:p-5 text-white shadow-xl">
                        <img
                          src={promo.image}
                          alt={promo.title}
                          className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/50" />
                        <div className="relative z-10">
                          <h4 className="text-xs sm:text-sm font-bold leading-snug text-white drop-shadow-sm">{promo.title}</h4>
                          <p className="mt-1.5 text-[10.5px] text-white/90 leading-relaxed drop-shadow-sm line-clamp-3">{promo.copy}</p>
                        </div>
                        <div className="relative z-10 mt-3 pt-2.5 border-t border-white/20">
                          <a
                            href={promo.href}
                            onClick={(e) => {
                              handleNavClick(promo.href, e);
                              setActiveMegaMenu(null);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-brand px-3.5 py-1.5 text-[11px] font-bold text-white shadow-brand hover:brightness-110 transition-all"
                          >
                            {promo.ctaText}
                          </a>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Bottom Banner */}
              <div className="flex items-center justify-between bg-gradient-to-r from-brand via-brand/90 to-brand/70 px-8 py-3 text-white">
                <p className="font-display text-sm sm:text-base font-bold tracking-tight">
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
                  className="rounded-full bg-black px-6 py-2.5 text-[11.5px] font-extrabold uppercase tracking-wider text-white shadow-xl hover:bg-slate-950 hover:scale-105 transition-all"
                >
                  {(activeMegaMenu === "services" ? SERVICES_MEGA : INDUSTRIES_MEGA).bottomBanner.ctaText}
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* MOBILE SOLID WHITE SIDEBAR DRAWER (Root Level z-[999])                    */}
      {/* ========================================================================= */}

      {/* Backdrop Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[998] bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-out White Sidebar */}
      <aside
        id="mobile-nav"
        aria-label="Mobile Navigation"
        aria-hidden={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-[999] flex w-full max-w-[340px] sm:max-w-[380px] flex-col bg-white text-slate-900 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Top Header of Sidebar */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
          <a
            href="#top"
            onClick={(e) => {
              handleNavClick("top", e);
              setOpen(false);
            }}
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              alt="Venus Consultancy"
              width={38}
              height={38}
              className="h-9 w-9 shrink-0 rounded-lg object-contain bg-red-50 p-0.5 border border-red-100 shadow-xs"
            />
            <div className="min-w-0">
              <span className="block truncate font-display text-[0.95rem] sm:text-base font-bold tracking-tight text-slate-900">
                Venus Consultancy
              </span>
              <span className="block text-[10.5px] font-medium text-slate-500 uppercase tracking-wider">
                Recruitment & Staffing
              </span>
            </div>
          </a>

          {/* Close X Button */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Navigation Menu Cards */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2.5 overscroll-contain">
          {/* Home Card */}
          <a
            href="/"
            onClick={(e) => {
              handleNavClick("/", e);
              setOpen(false);
            }}
            className={cn(
              "flex items-center justify-between rounded-xl p-3 border transition-all duration-200",
              pathname === "/" && (!active || active === "top")
                ? "border-brand/30 bg-brand/5 text-brand font-semibold shadow-xs"
                : "border-slate-100 bg-slate-50/70 text-slate-800 hover:bg-slate-100/80 hover:border-slate-200",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-xs border border-slate-100 text-brand">
                <Home className="h-4 w-4" />
              </div>
              <span className="text-[0.9rem] sm:text-[0.95rem] font-medium">Home</span>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </a>

          {/* Services Expandable Card */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 overflow-hidden transition-all duration-200">
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-100/80 transition-colors"
              onClick={() =>
                setMobileExpanded((prev) => (prev === "services" ? null : "services"))
              }
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-xs border border-slate-100 text-brand">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[0.9rem] sm:text-[0.95rem] font-medium text-slate-800">
                    Services
                  </span>
                  <span className="block text-[10px] text-slate-500">
                    Permanent, Contract, Startup & HR
                  </span>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-slate-400 transition-transform duration-200",
                  mobileExpanded === "services" && "rotate-180 text-brand",
                )}
              />
            </div>

            {/* Expanded Services Sub-Links */}
            {mobileExpanded === "services" && (
              <div className="border-t border-slate-200/60 bg-white p-2.5 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                {SERVICES_MEGA.categories.map((cat) => (
                  <a
                    key={cat.id}
                    href={cat.href}
                    onClick={(e) => {
                      handleNavClick(cat.href, e);
                      setOpen(false);
                    }}
                    className="flex items-center justify-between rounded-lg p-2 hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-[12px] sm:text-[13px] font-semibold text-slate-900 leading-tight">
                        {cat.name}
                      </p>
                      <p className="text-[10px] sm:text-[10.5px] text-slate-500 line-clamp-1 mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  </a>
                ))}
                <a
                  href="/services"
                  onClick={(e) => {
                    handleNavClick("/services", e);
                    setOpen(false);
                  }}
                  className="mt-1 flex items-center justify-center gap-1.5 rounded-lg bg-slate-50 py-2 text-[11px] font-bold text-brand hover:bg-slate-100 transition-colors"
                >
                  View All Services <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>

          {/* Industries Expandable Card */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 overflow-hidden transition-all duration-200">
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-100/80 transition-colors"
              onClick={() =>
                setMobileExpanded((prev) => (prev === "industries" ? null : "industries"))
              }
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-xs border border-slate-100 text-brand">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-[0.9rem] sm:text-[0.95rem] font-medium text-slate-800">
                    Industries
                  </span>
                  <span className="block text-[10px] text-slate-500">
                    Tech, Finance, Auto, Healthcare
                  </span>
                </div>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-slate-400 transition-transform duration-200",
                  mobileExpanded === "industries" && "rotate-180 text-brand",
                )}
              />
            </div>

            {/* Expanded Industries Sub-Links */}
            {mobileExpanded === "industries" && (
              <div className="border-t border-slate-200/60 bg-white p-2.5 space-y-1.5 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="grid grid-cols-2 gap-1.5">
                  {INDUSTRIES_MEGA.categories.map((cat) => (
                    <a
                      key={cat.id}
                      href={cat.href}
                      onClick={(e) => {
                        handleNavClick(cat.href, e);
                        setOpen(false);
                      }}
                      className="flex flex-col justify-between rounded-lg p-2 bg-slate-50/80 hover:bg-slate-100 border border-slate-100/80 transition-colors min-h-[48px]"
                    >
                      <p className="text-[11.5px] font-semibold text-slate-900 line-clamp-1">
                        {cat.name}
                      </p>
                      <span className="text-[9.5px] text-slate-500 line-clamp-1 mt-0.5">
                        {cat.description.split(",")[0]}
                      </span>
                    </a>
                  ))}
                </div>
                <a
                  href="/industries"
                  onClick={(e) => {
                    handleNavClick("/industries", e);
                    setOpen(false);
                  }}
                  className="mt-1 flex items-center justify-center gap-1.5 rounded-lg bg-slate-50 py-2 text-[11px] font-bold text-brand hover:bg-slate-100 transition-colors"
                >
                  View All Industries <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>

          {/* Blog Card */}
          <a
            href="/blog"
            onClick={(e) => {
              handleNavClick("/blog", e);
              setOpen(false);
            }}
            className={cn(
              "flex items-center justify-between rounded-xl p-3 border transition-all duration-200",
              pathname.startsWith("/blog")
                ? "border-brand/30 bg-brand/5 text-brand font-semibold shadow-xs"
                : "border-slate-100 bg-slate-50/70 text-slate-800 hover:bg-slate-100/80 hover:border-slate-200",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-xs border border-slate-100 text-brand">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-[0.9rem] sm:text-[0.95rem] font-medium">Blog</span>
                <span className="block text-[10px] text-slate-500 font-normal">Hiring trends & market intelligence</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </a>

          {/* Gallery Card */}
          <a
            href="/gallery"
            onClick={(e) => {
              handleNavClick("/gallery", e);
              setOpen(false);
            }}
            className={cn(
              "flex items-center justify-between rounded-xl p-3 border transition-all duration-200",
              pathname === "/gallery"
                ? "border-brand/30 bg-brand/5 text-brand font-semibold shadow-xs"
                : "border-slate-100 bg-slate-50/70 text-slate-800 hover:bg-slate-100/80 hover:border-slate-200",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-xs border border-slate-100 text-brand">
                <ImageIcon className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-[0.9rem] sm:text-[0.95rem] font-medium">Gallery</span>
                <span className="block text-[10px] text-slate-500 font-normal">Team moments & corporate culture</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </a>

          {/* FAQ Card */}
          <a
            href="/faq"
            onClick={(e) => {
              handleNavClick("/faq", e);
              setOpen(false);
            }}
            className={cn(
              "flex items-center justify-between rounded-xl p-3 border transition-all duration-200",
              pathname === "/faq" || (isHomePage && active === "faq")
                ? "border-brand/30 bg-brand/5 text-brand font-semibold shadow-xs"
                : "border-slate-100 bg-slate-50/70 text-slate-800 hover:bg-slate-100/80 hover:border-slate-200",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-xs border border-slate-100 text-brand">
                <HelpCircle className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-[0.9rem] sm:text-[0.95rem] font-medium">FAQ</span>
                <span className="block text-[10px] text-slate-500 font-normal">Candidate & employer questions</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </a>

          {/* Contact Card */}
          <a
            href="/contact"
            onClick={(e) => {
              handleNavClick("/contact", e);
              setOpen(false);
            }}
            className={cn(
              "flex items-center justify-between rounded-xl p-3 border transition-all duration-200",
              pathname === "/contact" || (isHomePage && active === "contact")
                ? "border-brand/30 bg-brand/5 text-brand font-semibold shadow-xs"
                : "border-slate-100 bg-slate-50/70 text-slate-800 hover:bg-slate-100/80 hover:border-slate-200",
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-xs border border-slate-100 text-brand">
                <PhoneCall className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-[0.9rem] sm:text-[0.95rem] font-medium">Contact Us</span>
                <span className="block text-[10px] text-slate-500 font-normal">Get candidate shortlists & quotes</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </a>
        </div>

        {/* Bottom CTA Action Buttons & Footer */}
        <div className="border-t border-slate-100 bg-slate-50/90 p-4 space-y-2.5">
          <a
            href="/contact"
            onClick={(e) => {
              handleNavClick("/contact", e);
              setOpen(false);
            }}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground shadow-brand transition-all hover:brightness-110 active:scale-[0.99]"
          >
            Book a call
            <span aria-hidden>→</span>
          </a>

          <a
            href="/careers"
            onClick={(e) => {
              handleNavClick("/careers", e);
              setOpen(false);
            }}
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-800 shadow-xs transition-colors hover:bg-slate-100 active:scale-[0.99]"
          >
            Find jobs / Careers
          </a>

          <div className="pt-1 text-center">
            <p className="text-[10px] text-slate-400 font-medium">
              Toronto • Vancouver • New York | +1 (800) VENUS-HIRE
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

