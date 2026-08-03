let activeAnimFrame: number | null = null;

/** Cancel any currently running smooth scroll animation */
export function stopScrollAnimation() {
  if (activeAnimFrame !== null) {
    cancelAnimationFrame(activeAnimFrame);
    activeAnimFrame = null;
  }
}

/** Smoothly scroll to a section by element ID with zero lag and instant interruptible animation */
export function scrollToSection(
  targetId: string,
  options?: {
    offset?: number;
    duration?: number;
    onComplete?: () => void;
  },
) {
  stopScrollAnimation();

  let targetY = 0;
  if (targetId !== "top") {
    const element = document.getElementById(targetId);
    if (!element) return;
    const offset = options?.offset ?? 70;
    targetY = Math.max(0, element.getBoundingClientRect().top + window.scrollY - offset);
  }

  const startY = window.scrollY;
  const distance = targetY - startY;

  if (Math.abs(distance) < 2) {
    options?.onComplete?.();
    return;
  }

  // Dynamic duration capped between 240ms and 400ms for high responsiveness
  const calcDuration = Math.min(400, Math.max(240, Math.abs(distance) * 0.28));
  const duration = options?.duration ?? calcDuration;
  const startTime = performance.now();

  // Fast & smooth Ease Out Quart easing curve
  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / duration);
    const eased = easeOutQuart(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      activeAnimFrame = requestAnimationFrame(animate);
    } else {
      activeAnimFrame = null;
      options?.onComplete?.();
    }
  };

  activeAnimFrame = requestAnimationFrame(animate);
}
