# ARC PENGUINS

Marketing site for **ARC PENGUINS** — 5,555 penguins on the Arc chain.
Two pages, all brown, Lenis-smooth.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Pages

| Route | What it is |
| ----- | ---------- |
| `/`   | Wordmark, art slideshow, bottom social / CTA band |
| `/wl` | "WL application isn't live yet" |

There are no other pages.

## Adding or changing artwork

Everything the carousel needs lives in [data/slides.js](data/slides.js):

```js
export const SLIDES = [
  { src: "/art/arc-penguin-cowboy.jpg", alt: "…" },
  ...
];
export const SLIDE_INTERVAL = 4000; // ms per slide
```

Drop your files into [public/art/](public/art/), point `src` at them, and add or
remove entries freely — the dots and arrows read from the array. Nothing is
drawn over the artwork: no titles, no slide count. `alt` is for screen readers
only and never renders.

The stage is **square (1:1)** to match the collection's PFP artwork, so nothing
gets cropped. Sources of ~1200px or larger are ideal; `next/image` resizes and
serves WebP. If you ever switch to landscape art, change `aspect-ratio` on
`.slideshow` in [app/globals.css](app/globals.css) and the `sizes` prop in
[components/Slideshow.jsx](components/Slideshow.jsx) to match.

### Replacing the text wordmark with logo art

[components/Header.jsx](components/Header.jsx) renders `<PenguinMark />` plus a
`.wordmark-text` span. Swap that span for an `<Image>` and keep the `.wordmark`
wrapper — the hover lift and the tilt live on the wrapper.

## Design tokens

All in `:root` at the top of [app/globals.css](app/globals.css):

| Token | Value | Use |
| ----- | ----- | --- |
| `--bg` | `#1E140E` | page background |
| `--surface` | `#2E1F14` | sections, the bottom band |
| `--card` | `#4A2F1B` | raised surfaces, text shadows |
| `--accent` | `#C8894B` | buttons, arcs, active dot |
| `--highlight` | `#E0A96D` | hover states, emphasis |
| `--text` | `#F3E4D0` | cream body + display text |

Display type is **Londrina Solid**, body is **Inter**, both via `next/font`
(self-hosted at build time — no render-blocking Google request). Anything with
class `display` picks up Londrina.

## Motion

| Technique | Where |
| --------- | ----- |
| CSS transitions / keyframes | Button lift, `x-wiggle` on the Follow-on-X pill, dot grow, `kenburns` on the active slide, `breathe` on the WL message, `cue-drop` scroll hint |
| Scroll reveal (staggered) | [components/Reveal.jsx](components/Reveal.jsx) — `whileInView` cascade, children 0.1s apart; drives the whole bottom band |
| Scroll-linked parallax | [components/Hero.jsx](components/Hero.jsx) — `useScroll` + `useSpring`; artwork drifts −16% and fades while the copy leaves at −42% |
| Framer Motion | Header/hero/WL entrances (spring), slideshow crossfade via `AnimatePresence`, route transitions in [app/template.js](app/template.js) |
| SVG animation | Caramel ring around the logo mark line-draws on load ([components/PenguinMark.jsx](components/PenguinMark.jsx)); WL backdrop arcs draw in ([components/WLMessage.jsx](components/WLMessage.jsx)) |
| Logo blink | The mark is the hooded-penguin artwork, not an SVG. Two dark `.mark-lid-*` boxes sit over the eyes (positioned as percentages of the artwork) and `scaleY` from 0 → 1 → 0 to blink. Swapping the image means re-measuring those four numbers per eye. |
| Lenis smooth scroll | [components/SmoothScroll.jsx](components/SmoothScroll.jsx) — `lerp: 0.09`, drives the real window scroll so `useScroll` and `whileInView` keep working |
| Micro-interactions | 0.22–0.6s durations, one shared `cubic-bezier(0.22, 1, 0.36, 1)` ease-out, `translate3d`/`scale3d` only |

GSAP and Lottie were left out: the hero parallax is already scroll-linked
through Framer Motion's `useScroll`, so GSAP would have been a second animation
runtime for the same effect, and there's no penguin Lottie asset yet. Both are
drop-in later if you want them.

### Reduced motion

`prefers-reduced-motion: reduce` disables Lenis entirely, collapses every CSS
transition and keyframe, and swaps the Framer components for static markup — the
slideshow still advances and stays fully operable by arrows, dots and ←/→ keys.

## Notes

- The carousel pauses on hover **and** on focus, and stops entirely while the
  tab is backgrounded.
- The X link (`https://x.com/arcpenguins`) opens in a new tab with
  `rel="noopener noreferrer"`.
- Both routes are statically prerendered.
