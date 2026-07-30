"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Site-wide smooth scroll.
 *
 * Lenis drives the real window scroll (no transform hijack), so native scroll
 * events still fire and Framer Motion's `useScroll` / `whileInView` keep working.
 * Disabled outright when the visitor asks for reduced motion.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const lenis = new Lenis({
      lerp: 0.09, // weighted, buttery — lower = heavier
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      smoothWheel: true,
      syncTouch: false, // native inertia on touch feels better than emulated
    });

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Anchor links ride the same easing curve.
    const onClick = (event) => {
      const anchor = event.target.closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.1 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  // Land at the top on every route change, without an animated scroll-back.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
