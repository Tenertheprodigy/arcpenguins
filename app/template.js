"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Route transition. `template.js` remounts on every navigation, so this runs
 * whenever the visitor moves between `/` and `/wl`.
 */
export default function Template({ children }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
