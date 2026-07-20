import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { pageVariants, staggerContainer, cardItem, fadeUp } from '../lib/motion';

// Add this import at the top (already in the file):
// import { useRef, useEffect } from 'react';
// import { motion, useScroll, useTransform } from 'framer-motion';

// ─── Gallery images (two rows with different sets) ───────────────────────────
const galleryRow1 = [
  '/images/destinations/adventure-climb.jpg',
  '/images/gallery-3/26.png',
  '/images/destinations/adventure-zip.jpg',
  '/images/destinations/anuradhapura-culture.webp',
  '/images/destinations/beach-arugambay.jpg',
  '/images/gallery-3/20.png',
  '/images/destinations/culture-craft.jpg',
  '/images/destinations/galle-culture.webp',
];

const galleryRow2 = [
  '/images/destinations/culture-perahera.webp',
  '/images/destinations/culture-temple.jpg',
  '/images/destinations/habarana-adventure.jpg',
  '/images/gallery-3/13.png',
  '/images/destinations/hidden-village.jpg',
  '/images/destinations/hidden-waterfall.jpg',
  '/images/destinations/hikkaduwa-culture.jpg',
  '/images/destinations/kalpitiya-beach.jpg',
];
const galleryRow3 = [
  '/images/destinations/kithulgala.jpg',
  '/images/destinations/mannar-beach.jpg',
  '/images/destinations/mirissa-beach.webp',
  '/images/destinations/negombo-culture.webp',
  '/images/gallery-3/24.png',
  '/images/destinations/sigiriya-culture.png',
  '/images/destinations/udawalawa-wildlife.jpg',
  '/images/destinations/wilpattu-wildlife.png',
];

const socialLinks = [
  {
    name: 'Instagram',
    handle: '@thecoconuttreetrails',
    cta: 'See the highlights',
    href: 'https://www.instagram.com/thecoconuttreetrails/',
    bg: '#a7d9d5',
    iconColor: '#173036',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="instaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F58529" />
            <stop offset="50%" stopColor="#DD2A7B" />
            <stop offset="100%" stopColor="#8134AF" />
          </linearGradient>
        </defs>

        <rect
          x="2"
          y="2"
          width="20"
          height="20"
          rx="5"
          ry="5"
          stroke="url(#instaGradient)"
          strokeWidth="2"
        />
        <circle cx="12" cy="12" r="4" stroke="url(#instaGradient)" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="url(#instaGradient)" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: '@thecoconuttreetrails',
    cta: 'Follow our journey',
    href: 'https://www.facebook.com/TCTTrails/',
    bg: '#a7d9d5',
    iconColor: '#0a1fa7',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="#0a1fa7" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@thecoconuttreetrails',
    cta: 'Watch short clips',
    href: 'https://www.tiktok.com/@thecoconutttreetrails?is_from_webapp=1&sender_device=pc',
    bg: '#a7d9d5',
    iconColor: '#173036',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="tiktokGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#25F4EE" />
            <stop offset="50%" stopColor="#FE2C55" />
            <stop offset="100%" stopColor="#0a0a0a" />
          </linearGradient>
        </defs>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" fill="url(#tiktokGradient)" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: '@thecoconuttreetrails',
    cta: 'Watch our stories',
    href: 'www.youtube.com/@TheCoconutTreeTrails',
    bg: '#a7d9d5',
    iconColor: '#ff0000',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" fill="#ff0000" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#ffff" />
      </svg>
    ),
  },
];
const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Perspective-tilt: row 1 tilts in from slight rotateX as it enters
  const row1X = useTransform(scrollYProgress, [0, 0.4, 1], [60, 0, -60]);
  const row2X = useTransform(scrollYProgress, [0, 0.4, 1], [-60, 0, 60]);
  const row3X = useTransform(scrollYProgress, [0, 0.4, 1], [60, 0, -60]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const doubled1 = [...galleryRow1, ...galleryRow1];
  const doubled2 = [...galleryRow2, ...galleryRow2];
  const doubled3 = [...galleryRow3, ...galleryRow3];

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-6 md:py-16">

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        {/* Heading */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label text-[#173036]">Gallery</p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            Moments from Sri Lanka
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
            Every frame, a story. Scroll through the colours, textures, and light of our island trails.
          </p>
        </motion.div>
      </div>

      {/* Row 1 — slides RIGHT, drifts in from left on scroll */}
      <motion.div
        className="overflow-hidden mb-5"
        style={{ opacity: sectionOpacity, x: row1X }}
      >
        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: [0, -3840] }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        >
          {doubled1.map((src, i) => (
            <GalleryCard key={`r1-${i}`} src={src} index={i} direction="up" />
          ))}
        </motion.div>
      </motion.div>

      {/* Row 2 — slides LEFT, drifts in from right on scroll */}
      <motion.div
        className="overflow-hidden mb-5"
        style={{ opacity: sectionOpacity, x: row2X }}
      >
        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: [-3840, 0] }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        >
          {doubled2.map((src, i) => (
            <GalleryCard key={`r2-${i}`} src={src} index={i} direction="down" />
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="overflow-hidden"
        style={{ opacity: sectionOpacity, x: row3X }}
      >
        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: [-3840, 0] }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        >
          {doubled3.map((src, i) => (
            <GalleryCard key={`r3-${i}`} src={src} index={i} direction="down" />
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom tag line */}
      <motion.p
        className="mt-10 text-center text-xs text-slate-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        Tag us{' '}
        <span className="font-semibold text-[#173036]">#thecoconuttreetrails</span> and we'll
        feature your shot.
      </motion.p>
    </section>
  );
};

// ── Individual card with hover zoom + shine sweep ─────────────────────────
const GalleryCard = ({
  src,
  index,
}: {
  src: string;
  index: number;
  direction: 'up' | 'down';
}) => {
  return (
    <motion.div
      className="relative h-72 w-80 flex-shrink-0 overflow-hidden"
      whileHover="hovered"
      initial="rest"
      animate="rest"
    >
      {/* Image with zoom */}
      <motion.img
        src={src}
        alt={`Gallery ${index + 1}`}
        className="h-full w-full object-cover"
        variants={{
          rest: { scale: 1 },
          hovered: { scale: 1.07, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
        }}
      />

      {/* Dark gradient always present */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Shine sweep on hover */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
        }}
        variants={{
          rest: { x: '-100%', opacity: 0 },
          hovered: {
            x: '160%',
            opacity: 1,
            transition: { duration: 0.55, ease: 'easeOut' },
          },
        }}
      />

      {/* Teal corner accent on hover */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-[#a7d9d5]"
        variants={{
          rest: { width: '0%' },
          hovered: { width: '100%', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
        }}
      />
    </motion.div>
  );
};

const SocialMedia = () => {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    let animationFrameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-white text-slate-900"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <section ref={heroRef} className="relative overflow-hidden pt-24 bg-gradient-to-b from-slate-50 to-white">
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/images/updated.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: bgY,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-6 md:px-8">

          {/* Heading */}
          <motion.div
            className="pt-6 text-center md:pt-10"
            variants={staggerContainer(0.12, 0.05)}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={fadeUp} className="section-label text-[#173036]">
              Stay Connected
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-4xl font-extrabold leading-[0.95] text-slate-900 md:text-6xl lg:text-[4.2rem]"
            >
              Follow Our Journey
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600"
            >
              From misty highlands to golden beaches — follow us across platforms for travel
              inspiration, behind-the-scenes moments, and real stories from Sri Lanka.
            </motion.p>
          </motion.div>

          {/* Social cards grid */}
          <motion.div
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer(0.1, 0.3)}
            initial="hidden"
            animate="show"
          >
            {socialLinks.map(({ name, handle, cta, href, bg, icon }) => (
              <motion.a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-4 border border-slate-200 bg-white px-5 py-8 shadow-md transition-all duration-300 hover:border-[#a7d9d5] hover:bg-white/40 hover:shadow-lg"
                variants={cardItem}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Icon */}
                <div
                  className="flex h-16 w-16 items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: bg }}
                >
                  {icon}
                </div>

                {/* Platform name */}
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-900">{name}</p>
                  <p className="mt-1 text-xs text-slate-500">{handle}</p>
                </div>

                {/* CTA */}
                <span className="mt-auto inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-[#173036] uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {cta}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Bottom note */}
          <motion.p
            className="mt-12 text-center text-xs text-slate-400"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.9 }}
          >
            Tag us in your Sri Lanka photos — we love sharing your moments.
          </motion.p>

        </div>
      </section>
      {/* ── Gallery Section ─────────────────────────────────────────────────── */}
      <GallerySection />
    </motion.div>
  );
};

export default SocialMedia;