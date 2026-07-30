"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

/** Parent: hands its children a 0.1s-apart cascade as it enters the viewport. */
export const cascade = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

/** Child: fade + rise. Pair with `cascade` on an ancestor. */
export const riseIn = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/**
 * Scroll-triggered wrapper. Fires once, a little before the element is fully
 * on screen, so the motion reads as anticipation rather than catch-up.
 */
export default function Reveal({
  children,
  as = "div",
  stagger = true,
  amount = 0.25,
  className,
  ...rest
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      variants={stagger ? cascade : riseIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -10% 0px" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** A single cascading item. */
export function RevealItem({ children, as = "div", className, ...rest }) {
  const reduced = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag className={className} variants={riseIn} {...rest}>
      {children}
    </Tag>
  );
}
