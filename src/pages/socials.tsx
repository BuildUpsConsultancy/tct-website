import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { pageVariants, staggerContainer, cardItem, fadeUp } from '../lib/motion';

const socialLinks = [
  {
    name: 'YouTube',
    handle: '@thecoconuttreetrails',
    cta: 'Watch our stories',
    href: 'https://youtube.com/@thecoconuttreetrails',
    bg: '#FAECE7',
    iconColor: '#D85A30',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" fill="#D85A30"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FAECE7"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    handle: '@thecoconuttreetrails',
    cta: 'Follow our journey',
    href: 'https://facebook.com/thecoconuttreetrails',
    bg: '#E6F1FB',
    iconColor: '#185FA5',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="#185FA5"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@thecoconuttreetrails',
    cta: 'See the highlights',
    href: 'https://instagram.com/thecoconuttreetrails',
    bg: '#FBEAF0',
    iconColor: '#D4537E',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#D4537E" strokeWidth="2"/>
        <circle cx="12" cy="12" r="4" stroke="#D4537E" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="#D4537E"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@thecoconuttreetrails',
    cta: 'Watch short clips',
    href: 'https://tiktok.com/@thecoconuttreetrails',
    bg: '#F1EFE8',
    iconColor: '#2C2C2A',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" fill="#2C2C2A"/>
      </svg>
    ),
  },
  {
    name: 'Google Business',
    handle: 'thecoconuttreetrails',
    cta: 'Leave us a review',
    href: 'https://g.page/thecoconuttreetrails',
    bg: '#EAF3DE',
    iconColor: '#3B6D11',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M21.35 11.1H12v2.8h5.35C16.8 16.1 14.6 17.5 12 17.5A6.5 6.5 0 0 1 12 4.5c1.6 0 3.05.58 4.15 1.53L18.3 3.8A9.5 9.5 0 0 0 12 1.5a10.5 10.5 0 1 0 9.35 9.6z" fill="#639922"/>
        <path d="M3.15 7.35l2.3 1.7A6.5 6.5 0 0 1 12 5.5c1.6 0 3.05.58 4.15 1.53L18.3 4.8A9.5 9.5 0 0 0 12 2.5a10.47 10.47 0 0 0-8.85 4.85z" fill="#BA7517"/>
        <path d="M12 22.5a10.47 10.47 0 0 0 7.07-2.75l-2.4-1.76A6.5 6.5 0 0 1 5.5 14.7l-2.3 1.75A10.47 10.47 0 0 0 12 22.5z" fill="#185FA5"/>
        <path d="M21.35 11.1H12v2.8h5.35a6.52 6.52 0 0 1-2.68 3.59l2.4 1.76A9.5 9.5 0 0 0 21.5 12c0-.3-.02-.6-.05-.9h-.1z" fill="#D85A30"/>
      </svg>
    ),
  },
];

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
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
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
                className="group flex flex-col items-center gap-4 border border-slate-200 bg-white px-5 py-8 shadow-md transition-all duration-300 hover:border-[#a7d9d5] hover:bg-[#a7d9d5]/5 hover:shadow-lg"
                variants={cardItem}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Icon */}
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
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
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
    </motion.div>
  );
};

export default SocialMedia;