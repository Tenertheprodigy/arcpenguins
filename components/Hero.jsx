"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Slideshow from "./Slideshow";
import Reveal, { RevealItem } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1];
const spring = { type: "spring", stiffness: 170, damping: 22, mass: 1 };

export default function Hero() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  // Scroll-linked parallax: the artwork drifts slower than the page around it.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const eased = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.6,
  });

  const artY = useTransform(eased, [0, 1], ["0%", "-16%"]);
  const artScale = useTransform(eased, [0, 1], [1, 0.94]);
  const artFade = useTransform(eased, [0, 0.85], [1, 0.25]);
  const copyY = useTransform(eased, [0, 1], ["0%", "-42%"]);
  const copyFade = useTransform(eased, [0, 0.5], [1, 0]);

  const parallax = reduced ? {} : { y: artY, scale: artScale, opacity: artFade };
  const copyParallax = reduced ? {} : { y: copyY, opacity: copyFade };

  return (
    <section className="hero" ref={ref}>
      <motion.div style={copyParallax}>
        <Reveal className="shell" style={{ display: "grid", justifyItems: "center" }}>
          <RevealItem className="hero-eyebrow">
            <Pulse /> 5,000 on Arc
          </RevealItem>

          <motion.h1
            className="hero-title display"
            initial={reduced ? false : { opacity: 0, y: 46, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ ...spring, delay: 0.12 }}
          >
            Arc <span className="accent">Penguins</span>
          </motion.h1>
        </Reveal>
      </motion.div>

      {/* Outer node owns the scroll-linked parallax, inner node owns the
          entrance — keeping them apart avoids two writers on one transform. */}
      <motion.div style={parallax}>
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.24 }}
        >
          <Slideshow />
        </motion.div>
      </motion.div>

      <motion.div style={reduced ? {} : { opacity: copyFade }}>
        <motion.div
          className="scroll-cue"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <span>Scroll</span>
          <span className="scroll-cue-line" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Pulse() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
      <motion.circle
        cx="5"
        cy="5"
        r="4"
        fill="currentColor"
        animate={{ opacity: [1, 0.35, 1], scale: [1, 0.82, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "5px 5px" }}
      />
    </svg>
  );
}
