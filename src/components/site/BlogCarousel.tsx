import { useState, useEffect, useRef, useMemo } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { useBlogs, type BlogPost } from "@/lib/blog-store";
import { BlogModal } from "./BlogModal";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export function BlogCarousel() {
  const { blogs } = useBlogs();
  const { ref, shown } = useReveal<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Filter ONLY featured blogs selected by Admin
  const featuredBlogs = useMemo(
    () => blogs.filter((b) => b.isFeatured),
    [blogs]
  );
  const displayBlogs = useMemo(
    () => (featuredBlogs.length > 0 ? featuredBlogs : blogs),
    [featuredBlogs, blogs]
  );

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

  // Auto-sliding timer: 2 seconds (2000ms) interval ONLY when visible in viewport and not hovered
  useEffect(() => {
    if (isPaused || !isInViewport || displayBlogs.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % displayBlogs.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [isPaused, isInViewport, displayBlogs.length]);

  const go = (next: number) => {
    setIndex((next + displayBlogs.length) % displayBlogs.length);
  };

  return (
    <>
      <section
        id="blog"
        ref={containerRef}
        className="relative overflow-hidden border-b border-border bg-porcelain section-padding"
        aria-label="Featured Recruitment Insights"
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
                Recruitment Insights & Executive Leadership
              </h2>
              <p className="mt-3 text-base text-muted-foreground sm:text-lg max-w-3xl">
                Stay updated with Canadian & US workforce trends, salary benchmarks, and talent acquisition strategies.
              </p>
            </div>

            {/* Manual Navigation Arrows */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous featured article"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:border-brand hover:bg-brand hover:text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next featured article"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-all duration-300 hover:scale-105 hover:border-brand hover:bg-brand hover:text-white"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Sliding Carousel Container with 2s Auto-Slide (Pause on Hover / Viewport Leave) */}
          <div
            ref={ref}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className={cn("reveal-item mt-12 overflow-hidden rounded-[2.25rem]", shown && "is-shown")}
          >
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
              style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
            >
              {displayBlogs.map((b) => (
                <div key={b.id} className="w-full shrink-0 px-1">
                  <div className="group relative isolate grid gap-8 overflow-hidden rounded-[2.25rem] border border-border/80 bg-background/90 p-6 sm:p-10 shadow-xl backdrop-blur-xl lg:grid-cols-12 lg:gap-12 items-center">
                    {/* Left: Article Cover Image */}
                    <div className="lg:col-span-6 relative overflow-hidden rounded-2xl border border-border/60 aspect-[16/10]">
                      <img
                        src={b.featuredImage}
                        alt={b.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="rounded-full bg-brand px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md">
                          {b.category}
                        </span>
                      </div>
                    </div>

                    {/* Right: Article Details & CTA */}
                    <div className="lg:col-span-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-brand" /> {b.readTime}
                          </span>
                          <span>&bull;</span>
                          <span>{b.publishDate}</span>
                        </div>

                        <h3
                          onClick={() => setSelectedBlog(b)}
                          className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground hover:text-brand transition-colors cursor-pointer leading-snug"
                        >
                          {b.title}
                        </h3>

                        <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground line-clamp-3">
                          {b.excerpt}
                        </p>
                      </div>

                      {/* Author Info & Read Article Action */}
                      <div className="mt-8 flex items-center justify-between pt-6 border-t border-border/80">
                        <div className="flex items-center gap-3">
                          <img
                            src={b.author.avatar}
                            alt={b.author.name}
                            loading="lazy"
                            className="h-10 w-10 rounded-full object-cover border border-brand/30"
                          />
                          <div>
                            <p className="text-xs font-bold text-foreground">{b.author.name}</p>
                            <p className="text-[11px] text-muted-foreground">{b.author.role}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedBlog(b)}
                          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-brand hover:scale-105 transition-all"
                        >
                          Read Article <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicator Dots */}
          <div className="mt-7 flex items-center justify-center gap-2">
            {displayBlogs.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-500 ease-out",
                  i === index ? "w-10 bg-brand" : "w-4 bg-border hover:bg-brand/40"
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Full Article Reader Modal */}
      <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
    </>
  );
}
