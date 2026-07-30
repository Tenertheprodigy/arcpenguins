"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import PenguinMark from "./PenguinMark";

const spring = { type: "spring", stiffness: 190, damping: 20, mass: 0.9 };

export default function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  return (
    <header className="header">
      <motion.div
        initial={{ opacity: 0, y: -22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.05 }}
      >
        <Link href="/" className="wordmark" aria-label="Arc Penguins — home">
          <PenguinMark />
          <span className="wordmark-text display">
            Arc <span className="accent">Penguins</span>
          </span>
        </Link>
      </motion.div>

      {onHome && (
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.18 }}
        >
          <Link href="/wl" className="header-link">
            Apply for WL
          </Link>
        </motion.div>
      )}
    </header>
  );
}
