"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];
const spring = { type: "spring", stiffness: 150, damping: 20, mass: 1 };

export default function WLMessage() {
  const reduced = useReducedMotion();

  return (
    <section className="wl">
      <ArcBackdrop />

      <div className="wl-inner">
        <motion.h1
          className="wl-message display"
          initial={reduced ? false : { opacity: 0, y: 40, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ ...spring, delay: 0.1 }}
        >
          WL application isn&rsquo;t live yet
        </motion.h1>

        <motion.p
          className="wl-note"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.3 }}
        >
          Applications open soon. Follow{" "}
          <a
            href="https://x.com/arcpenguins"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--highlight)" }}
          >
            @arcpenguins
          </a>{" "}
          to be first in line.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.42 }}
        >
          <Link href="/" className="back-link">
            <span className="back-arrow" aria-hidden="true">
              &larr;
            </span>
            Back to home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/** Slow line-drawn arc behind the message. */
function ArcBackdrop() {
  const reduced = useReducedMotion();

  return (
    <svg className="wl-arc" viewBox="0 0 800 400" fill="none" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M40 ${360 - i * 26}C40 ${150 - i * 40} 220 ${40 + i * 10} 400 ${
            40 + i * 10
          }s360 ${110 - i * 50} 360 ${320 - i * 26}`}
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.2 + i * 0.14 }}
        />
      ))}
    </svg>
  );
}
