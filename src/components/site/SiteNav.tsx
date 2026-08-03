import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import logo from "@/assets/venus-logo.png";
import { scrollToSection } from "@/lib/scroll";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "Insights", href: "#insights" },
  { label: "FAQ", href: "#faq" },
];

const SECTION_IDS = NAV.map((item) => item.href.slice(1));

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const isNavigatingRef = useRef(false);

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
  const handleNavClick = (targetId: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActive(targetId === "top" ? null : targetId);
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

  const light = !scrolled && !open;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <header
        className={cn(
          "nav-drop fixed inset-x-0 top-0 z-50 transition-[padding,background-color,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "border-b border-border/70 bg-background/75 py-2 shadow-[0_10px_40px_-30px_rgba(15,23,42,0.6)] backdrop-blur-xl"
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
                  const targetId = item.href.slice(1);
                  const isActive = active === targetId;
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(targetId, e)}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "group relative inline-block py-1 text-[0.95rem] tracking-[0.005em] transition-colors duration-300 ease-out",
                          light
                            ? isActive
                              ? "font-semibold text-ink-foreground"
                              : "font-medium text-ink-foreground/70 hover:text-ink-foreground"
                            : isActive
                              ? "font-semibold text-brand"
                              : "font-medium text-muted-foreground hover:text-brand",
                        )}
                      >
                        {item.label}
                        <span
                          aria-hidden
                          className={cn(
                            "pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-center rounded-full bg-brand transition-transform duration-300 ease-out",
                            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
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
                href="https://www.venushiring.ca/contact"
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
              const targetId = item.href.slice(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => handleNavClick(targetId, e)}
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
                href="https://www.venushiring.ca/contact"
                tabIndex={open ? 0 : -1}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-[0.95rem] font-semibold text-primary-foreground shadow-brand"
              >
                Book a call <span aria-hidden>→</span>
              </a>
              <a
                href="https://www.venushiring.ca/find-jobs"
                tabIndex={open ? 0 : -1}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-card px-7 text-[0.95rem] font-semibold text-foreground"
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
