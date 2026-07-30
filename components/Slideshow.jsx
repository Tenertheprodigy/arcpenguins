"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SLIDES, SLIDE_INTERVAL } from "@/data/slides";

const wrap = (index, length) => ((index % length) + length) % length;

export default function Slideshow({ slides = SLIDES, interval = SLIDE_INTERVAL }) {
  const reduced = useReducedMotion();
  const [[index, direction], setState] = useState([0, 1]);
  const [paused, setPaused] = useState(false);

  const count = slides.length;
  const active = slides[wrap(index, count)];

  const go = useCallback(
    (next, dir) => setState([wrap(next, count), dir]),
    [count]
  );

  const next = useCallback(() => setState(([i]) => [wrap(i + 1, count), 1]), [count]);
  const prev = useCallback(() => setState(([i]) => [wrap(i - 1, count), -1]), [count]);

  // Auto-advance. Pauses on hover/focus, and whenever the tab is backgrounded.
  useEffect(() => {
    if (paused || count < 2) return;

    let timer = window.setTimeout(next, interval);
    const onVisibility = () => {
      if (document.hidden) {
        window.clearTimeout(timer);
      } else {
        timer = window.setTimeout(next, interval);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [index, paused, count, interval, next]);

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  };

  // Crossfade, with a whisper of horizontal travel in the swipe direction.
  const shift = reduced ? 0 : 34;

  return (
    <div
      className="slideshow"
      role="group"
      aria-roledescription="carousel"
      aria-label="Arc Penguins artwork"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          className="slide is-active"
          custom={direction}
          initial={{ opacity: 0, x: direction * shift, scale: reduced ? 1 : 1.03 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: direction * -shift, scale: reduced ? 1 : 0.99 }}
          transition={{
            opacity: { duration: reduced ? 0.001 : 0.85, ease: [0.22, 1, 0.36, 1] },
            x: { duration: reduced ? 0.001 : 0.9, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: reduced ? 0.001 : 0.9, ease: [0.22, 1, 0.36, 1] },
          }}
          aria-roledescription="slide"
          aria-label={`${wrap(index, count) + 1} of ${count}`}
        >
          <Image
            className="slide-img"
            src={active.src}
            alt={active.alt}
            fill
            sizes="(max-width: 700px) 92vw, 580px"
            priority={wrap(index, count) === 0}
            draggable={false}
          />
          <div className="slide-scrim" />
        </motion.div>
      </AnimatePresence>

      {/* Warms the next artwork so the crossfade never waits on the network.
          Only ever one image ahead, so the deck can grow without cost. */}
      {count > 1 ? (
        <div className="slide-preload" aria-hidden="true">
          <Image
            src={slides[wrap(index + 1, count)].src}
            alt=""
            fill
            sizes="(max-width: 700px) 92vw, 580px"
          />
        </div>
      ) : null}

      <button className="slide-arrow prev" onClick={prev} aria-label="Previous artwork">
        <Chevron dir="left" />
      </button>
      <button className="slide-arrow next" onClick={next} aria-label="Next artwork">
        <Chevron dir="right" />
      </button>

      <div className="slide-dots" role="tablist" aria-label="Choose artwork">
        {slides.map((slide, i) => {
          const current = wrap(index, count);
          return (
            <button
              key={slide.src}
              role="tab"
              aria-selected={i === current}
              aria-label={slide.alt}
              className={`slide-dot${i === current ? " is-active" : ""}`}
              onClick={() => go(i, i > current ? 1 : -1)}
            />
          );
        })}
      </div>
    </div>
  );
}

function Chevron({ dir }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
