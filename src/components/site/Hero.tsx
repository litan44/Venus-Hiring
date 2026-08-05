import { useEffect, useRef, useState } from "react";
import { CtaLink } from "./primitives";
import heroImg from "@/assets/hero-office.jpg";
import { scrollToSection } from "@/lib/scroll";

const TRUST = [
  "Trusted Recruitment Partner",
  "Technology • Talent • Opportunity",
  "Serving Canada, USA & India",
];

export function Hero() {
  const [offset, setOffset] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const nextOffset = Math.min(window.scrollY, 700) * 0.16;
        setOffset((prev) => (prev !== nextOffset ? nextOffset : prev));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    if (media.matches || coarse.matches) return;
    const node = sectionRef.current;
    if (!node) return;
    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = node.getBoundingClientRect();
        setPointer({
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        });
      });
    };
    node.addEventListener("pointermove", onMove);
    return () => {
      node.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink"
    >
      {/* Background photograph with Ken Burns + soft parallax */}
      <div
        className="absolute inset-0 -z-20"
        style={{ transform: `translate3d(0, ${offset}px, 0)` }}
      >
        <img
          src={heroImg}
          alt="Diverse team of professionals in a modern Canadian corporate office meeting"
          width={1920}
          height={1280}
          fetchPriority="high"
          decoding="async"
          className="ken-burns h-full w-full scale-105 object-cover object-center"
        />
      </div>

      {/* Elegant dark gradient overlay */}
      <div className="absolute inset-0 -z-10 hero-scrim" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-ink/25 backdrop-blur-[2px]" aria-hidden />

      {/* Floating light shapes with mouse parallax */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <span
          className="float-soft absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-brand/25 blur-3xl transition-transform duration-700 ease-out"
          style={{ transform: `translate3d(${pointer.x * 40}px, ${pointer.y * 28}px, 0)` }}
        />
        <span
          className="float-soft absolute right-[8%] top-10 h-64 w-64 rounded-full bg-ink-foreground/10 blur-3xl transition-transform duration-700 ease-out"
          style={{
            animationDelay: "1.6s",
            transform: `translate3d(${pointer.x * -55}px, ${pointer.y * -34}px, 0)`,
          }}
        />
        <span className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      </div>

      <div className="shell relative w-full py-20 sm:py-24 lg:py-28">
        <div className="max-w-4xl">
          <h1
            className="blur-reveal text-[3rem] font-semibold leading-[1.02] tracking-tight text-ink-foreground sm:text-6xl lg:text-[5.5rem]"
            style={{ animationDelay: "80ms" }}
          >
            Beyond solutions,
            <br />
            we build <span className="text-gradient-brand">success</span>
          </h1>

          <p
            className="blur-reveal mt-7 max-w-xl text-lg leading-relaxed text-ink-foreground/80 sm:text-xl"
            style={{ animationDelay: "300ms" }}
          >
            We unite technology, talent and opportunity — partnering with Canadian employers to hire
            faster, and with professionals to land the role that fits.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <div className="rise-in" style={{ animationDelay: "420ms" }}>
              <CtaLink href="https://www.venushiring.ca/contact" size="lg">
                Hire Talent
              </CtaLink>
            </div>
            <div className="rise-in" style={{ animationDelay: "520ms" }}>
              <CtaLink href="https://www.venushiring.ca/find-jobs" variant="outlineLight" size="lg">
                Find Jobs
              </CtaLink>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("services", { offset: 70 });
        }}
        aria-label="Scroll to content"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-foreground/60 transition-colors duration-300 hover:text-ink-foreground sm:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">Scroll</span>
        <span className="relative grid h-9 w-5 place-items-start justify-center overflow-hidden rounded-full border border-ink-line pt-1.5">
          <span className="scroll-cue block h-1.5 w-1 rounded-full bg-brand" aria-hidden />
        </span>
      </a>
    </section>
  );
}
