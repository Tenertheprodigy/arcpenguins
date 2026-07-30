/**
 * SLIDESHOW ARTWORK
 * -----------------
 * Add or remove entries freely — the carousel, the dots and the arrows all
 * read from this array. Drop new files into `public/art/` and point `src` at
 * them. Square (1:1) sources look best; the stage is square so nothing crops.
 *
 * `alt` is the accessible description — it is never drawn on the image, it is
 * only read out by screen readers.
 */
export const SLIDES = [
  {
    src: "/art/arc-penguin-cowboy.jpg",
    alt: "Arc Penguin in a brown cowboy hat and red bandana",
  },
  {
    src: "/art/arc-penguin-ninja.jpg",
    alt: "Arc Penguin in a red headband with a bandolier",
  },
  {
    src: "/art/arc-penguin-angler.jpg",
    alt: "Arc Penguin wearing a golden fish hat and a monocle",
  },
];

/** Milliseconds each slide stays on screen before auto-advancing. */
export const SLIDE_INTERVAL = 4000;
