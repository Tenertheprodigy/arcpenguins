"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The Arc Penguins mark: the hooded penguin artwork, framed in a circle.
 *
 * It blinks on the same cadence the old SVG penguin did. The head is solid
 * black around the eyes, so dropping a dark lid over each one reads as a real
 * blink — the lids are positioned as percentages of the artwork itself
 * (see `.mark-lid-*` in globals.css), so they stay pinned however the mark is
 * scaled. Swap the image and you only need to re-tune those four numbers.
 */

const BOB = { duration: 3.4, ease: "easeInOut", repeat: Infinity };

// Shut fast, hold a beat, open — all inside the last ~12% of the loop.
const BLINK = {
  duration: 4.6,
  times: [0, 0.88, 0.93, 1],
  ease: "easeInOut",
  repeat: Infinity,
};
const BLINK_KEYFRAMES = { scaleY: [0, 0, 1, 0] };

export default function PenguinMark() {
  const reduced = useReducedMotion();

  return (
    <span className="mark" aria-hidden="true">
      <motion.span
        className="mark-bob"
        animate={reduced ? undefined : { y: [0, -2.4, 0] }}
        transition={BOB}
      >
        <span className="mark-avatar">
          <span className="mark-zoom">
            <Image
              src="/art/arc-penguin-mark.jpg"
              alt=""
              fill
              sizes="80px"
              priority
            />
            <motion.span
              className="mark-lid mark-lid-left"
              animate={reduced ? undefined : BLINK_KEYFRAMES}
              transition={BLINK}
            />
            <motion.span
              className="mark-lid mark-lid-right"
              animate={reduced ? undefined : BLINK_KEYFRAMES}
              transition={BLINK}
            />
          </span>
        </span>

        {/* Caramel ring that draws itself on once, in place of the old arc. */}
        <svg className="mark-ring" viewBox="0 0 100 100" fill="none">
          <motion.circle
            cx="50"
            cy="50"
            r="48"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          />
        </svg>
      </motion.span>
    </span>
  );
}
