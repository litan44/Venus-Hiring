import { useState, useEffect, useRef, useMemo } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import { useBlogs, type BlogPost } from "@/lib/blog-store";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function BlogCarousel() {
  const { blogs } = useBlogs();
  const { ref, shown } = useReveal<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  // Filter ONLY featured blogs selected by Admin
  const featuredBlogs = useMemo(
    () => blogs.filter((b) => b.isFeatured),
    [blogs]
  );
  const displayBlogs = useMemo(
    () => (featuredBlogs.length > 0 ? featuredBlogs : blogs),
    [featuredBlogs, blogs]
  );

  // Maximum valid slide index to prevent blank whitespace gaps
  const maxIndex = useMemo(
    () => Math.max(0, displayBlogs.length - visibleCount),
    [displayBlogs.length, visibleCount]
  );

  // Responsive items per view listener
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clamp index if viewport resize changes maxIndex
  useEffect(() => {
    if (index > maxIndex) {
      setIndex(maxIndex);
    }
  }, [maxIndex, index]);

  // Track viewport visibility so auto-slide timer ONLY runs when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-sliding timer: 4s interval ONLY when there are more blogs than visible on screen
  useEffect(() => {
    if (isPaused || !isInViewport || maxIndex === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, isInViewport, maxIndex]);

  const goNext = () => {
    if (maxIndex === 0) return;
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goPrev = () => {
    if (maxIndex === 0) return;
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const getBlogTargetUrl = (b: BlogPost) => {
    if (b.seo?.canonicalUrl && b.seo.canonicalUrl.startsWith("http")) {
      return b.seo.canonicalUrl;
    }
    if (b.slug && b.slug.startsWith("http")) {
      return b.slug;
    }
    return `https://www.venushiring.ca/blog/${b.slug || ""}`;
  };

  return (
    <section
      id="blog"
      ref={containerRef}
      className="relative overflow-hidden border-b border-border bg-porcelain section-padding"
      aria-label="Hiring intelligence from our consultants"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 mesh-light opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 dot-grid-light opacity-[0.25]"
        aria-hidden
      />

      <div className="shell relative">
        {/* Section Header with Navigation Arrows */}
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Hiring intelligence from our consultants
            </h2>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg max-w-3xl">
              Stay updated with Canadian & US workforce trends, salary benchmarks, and talent acquisition strategies.
            </p>
          </div>

          {/* Manual Navigation Arrows */}
          {maxIndex > 0 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous articles"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:border-brand hover:bg-brand hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next articles"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:border-brand hover:bg-brand hover:text-white"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Sliding Carousel Grid matching exact original card design */}
        <div
          ref={ref}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={cn("reveal-item mt-12 overflow-hidden", shown && "is-shown")}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform -mx-2.5"
            style={{
              transform: `translate3d(-${index * (100 / visibleCount)}%, 0, 0)`,
            }}
          >
            {displayBlogs.map((b) => {
              const targetUrl = getBlogTargetUrl(b);
              return (
                <div
                  key={b.id}
                  className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-2.5"
                >
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative h-full flex flex-col justify-between cursor-pointer overflow-hidden rounded-[1.75rem] glass-panel p-3 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_28px_70px_-42px_rgba(15,23,42,0.5)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:ring-brand-soft bg-card border border-border/80 text-foreground"
                  >
                    {/* Top Image with Date Badge */}
                    <div className="sheen relative aspect-[16/10] overflow-hidden rounded-[1.35rem]">
                      <img
                        src={b.featuredImage}
                        alt={b.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.09]"
                      />
                      <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-[11px] font-semibold text-foreground backdrop-blur shadow-sm border border-border/40">
                        <CalendarDays className="h-3.5 w-3.5 text-brand" />
                        {b.publishDate}
                      </span>
                    </div>

                    {/* Bottom Details */}
                    <div className="p-5 pt-6 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                          {b.category}
                        </p>
                        <h3 className="mt-3 text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-brand text-foreground line-clamp-2">
                          {b.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {b.excerpt}
                        </p>
                      </div>

                      <span className="mt-6 flex items-center justify-between gap-3 border-t border-border/80 pt-5 text-sm font-semibold text-foreground">
                        <span className="relative">
                          Read article
                          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-x-100" />
                        </span>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 ease-out group-hover:rotate-45 group-hover:border-transparent group-hover:bg-primary group-hover:text-primary-foreground">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </span>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Indicator Dots */}
        {maxIndex > 0 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to article slide ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-500 ease-out",
                  i === index ? "w-8 bg-brand" : "w-2 bg-border hover:bg-brand/40"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
