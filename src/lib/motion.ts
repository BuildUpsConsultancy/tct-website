import type { Variants } from 'framer-motion';

/* ── Shared easing ─────────────────────────────────────────── */
export const ease = [0.22, 1, 0.36, 1] as const;

/* ── Fade up ───────────────────────────────────────────────── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

/* ── Fade in ───────────────────────────────────────────────── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.6, ease } },
};

/* ── Slide from left ───────────────────────────────────────── */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -48 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
};

/* ── Slide from right ──────────────────────────────────────── */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.75, ease } },
};

/* ── Scale in ──────────────────────────────────────────────── */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.65, ease } },
};

/* ── Stagger container ─────────────────────────────────────── */
export const staggerContainer = (stagger = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  show:   {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/* ── Card item (used inside stagger container) ─────────────── */
export const cardItem: Variants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/* ── Page transition wrapper ───────────────────────────────── */
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.3, ease } },
};
