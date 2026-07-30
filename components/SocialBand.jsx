"use client";

import Link from "next/link";
import Reveal, { RevealItem } from "./Reveal";

const X_URL = "https://x.com/arcpenguins";

const STATS = [
  { value: "5,555", label: "Penguins" },
  { value: "Arc", label: "Chain" },
  { value: "Soon", label: "Mint" },
];

export default function SocialBand() {
  return (
    <footer className="band" id="community">
      <Reveal className="shell band-inner" amount={0.2}>
        <RevealItem as="p" className="band-mark display">
          Arc <span className="accent">Penguins</span>
        </RevealItem>

        <RevealItem as="p" className="band-sub">
          <b>5,555 penguins</b> on Arc. Cold by nature. Chosen by few. Soon on
          Arc
        </RevealItem>

        <RevealItem className="band-actions">
          <a
            className="x-link"
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Follow on X</span>
          </a>

          <Link className="btn" href="/wl">
            <span>Apply for WL</span>
            <svg
              className="btn-arrow"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12h13M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </RevealItem>

        <RevealItem className="band-stats">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div className="stat-value display">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </RevealItem>
      </Reveal>
    </footer>
  );
}
