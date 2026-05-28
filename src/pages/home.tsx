import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import {
  motion, AnimatePresence,
  useScroll, useTransform, useMotionValue,
} from 'framer-motion';
import {
  ArrowRight, ChevronDown, ChevronLeft, ChevronRight,
  Quote,
} from 'lucide-react';

import { featuredDestinations } from '../data/destinations';
import { generalCuriosities } from '../data/generalCuriosities';
import { pageVariants, staggerContainer, cardItem, fadeUp, slideLeft, slideRight, scaleIn } from '../lib/motion';
import CardSwap, { Card } from '../components/CardSwap';
import ShinyText from '../components/ShinyText';

const services = [
  { iconType: 'flight',  title: 'Flight Booking',   desc: 'We assist with international and domestic flight arrangements to ensure your Sri Lanka journey starts smoothly from the moment you leave home.' },
  { iconType: 'hotel',   title: 'Hotel Bookings',   desc: "From boutique jungle lodges in Sigiriya to colonial tea estate bungalows and beachfront villas — we curate Sri Lanka's finest stays for every budget." },
  { iconType: 'tour',    title: 'Tour Experiences', desc: 'Every Sri Lankan experience is guided by locals who know the island intimately — revealing the hidden temples, local markets, and off-trail landscapes no tourist map ever finds.' },
  { iconType: 'safari',  title: 'Wildlife Safaris', desc: 'Track leopards in Yala, witness elephant herds at Udawalawe, and spot blue whales off Mirissa — with expert naturalist guides who read the wild like a language.' },
  { iconType: 'visa',    title: 'Visa Processing',  desc: 'Our team provides complete visa assistance for Sri Lanka ETA applications, simplifying the process so you can focus entirely on planning your adventure.' },
  { iconType: 'support', title: '24/7 Support',     desc: 'From the moment you enquire to the day you arrive home, our dedicated local team is available around the clock to handle every detail of your journey.' },
];

const testimonials = [
  { name: 'James & Sarah — UK',      quote: 'The team at The Coconut Tree Trails made our honeymoon in Sri Lanka truly unforgettable. Every detail was taken care of — from the scenic train ride through Ella to our private sunset dinner in Galle.' },
  { name: 'Priya Nair — India',       quote: 'I booked the Ramayana Tour and was deeply moved by the depth of knowledge our guide brought to every sacred site. This was not just a tour — it was a pilgrimage. Absolutely authentic and beautifully organised.' },
  { name: 'David Hartmann — Germany', quote: 'Superb local knowledge, seamless logistics, and genuinely warm hospitality at every step. Sri Lanka is spectacular — and The Coconut Tree Trails is the only way to truly experience it.' },
];

// ── GALLERY DATA ────────────────────────────────────────────────────────────
// 5 images per column × 3 columns
const galleryColumns = [
  ['kandy', 'yala', 'colombo', 'The-best-things-to-do-in-Ella-Sri-Lanka', 'kandy'],
  ['colombo', 'The-best-things-to-do-in-Ella-Sri-Lanka', 'yala', 'kandy', 'colombo'],
  ['yala', 'kandy', 'The-best-things-to-do-in-Ella-Sri-Lanka', 'colombo', 'yala'],
];

const imgSrc = (name: string) =>
  `/images/home/${name}${name === 'colombo' ? '.avif' : '.jpg'}`;

// ── CINEMATIC GALLERY ────────────────────────────────────────────────────────
/**
 * Scroll-hijack gallery:
 * - Activates when section is ≥40% in viewport
 * - Wheel/touch delta drives a 0→1 progress value
 * - Left & right columns shift upward (images appear to scroll down)
 * - Middle column shifts downward (images appear to scroll up)
 * - When progress hits 0 or 1 the hijack releases, allowing page scroll
 */
const CinematicGallery = () => {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const progressRef  = useRef(0);       // 0 = gallery start, 1 = gallery end
  const isActiveRef  = useRef(false);
  const rafRef       = useRef<number | null>(null);
  const touchStartY  = useRef<number | null>(null);
  const animatingRef = useRef(false);
  const wheelTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const targetProgressRef = useRef(0);   // Target progress for smooth animation

  // Motion values for each column's Y offset (px)
  const col0Y = useMotionValue(0);
  const col1Y = useMotionValue(0);
  const col2Y = useMotionValue(0);

  // Total vertical travel in px across full progress 0→1
  const TRAVEL = 1280;

  const applyProgress = useCallback((p: number) => {
    col0Y.set(-p * TRAVEL);   // cols 0 & 2 move up → images appear to scroll down
    col1Y.set(p * TRAVEL);    // col 1 moves down → images appear to scroll up
    col2Y.set(-p * TRAVEL);
  }, [col0Y, col1Y, col2Y]);

  // Smooth snap to a target progress value
  const smoothTo = useCallback((target: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const from    = progressRef.current;
    const start   = performance.now();
    const DURATION = 400;
    animatingRef.current = true;

    const tick = (now: number) => {
      const t      = Math.min((now - start) / DURATION, 1);
      const eased  = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const val    = from + (target - from) * eased;
      progressRef.current = Math.max(0, Math.min(1, val));
      applyProgress(progressRef.current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        animatingRef.current = false;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [applyProgress]);

  // Smoothly animate to a target with interpolation
  const animateToProgress = useCallback((target: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    targetProgressRef.current = target;
    const SMOOTHNESS = 0.06; // Easing factor (0-1, lower = smoother)
    animatingRef.current = true;

    const tick = () => {
      const current = progressRef.current;
      const diff = targetProgressRef.current - current;
      
      // Exponential decay smoothing
      const next = current + diff * SMOOTHNESS;
      progressRef.current = Math.max(0, Math.min(1, next));
      applyProgress(progressRef.current);

      // Stop when close enough
      if (Math.abs(diff) > 0.001) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        progressRef.current = targetProgressRef.current;
        applyProgress(progressRef.current);
        animatingRef.current = false;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [applyProgress]);

  // Direct nudge progress with smooth animation (positive = scroll down)
  const nudgeProgress = useCallback((delta: number) => {
    const SENSITIVITY = 0.0009;
    const next = Math.max(0, Math.min(1, progressRef.current + delta * SENSITIVITY));
    animateToProgress(next);
  }, [animateToProgress]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Intersection Observer — activate/deactivate hijack
    const io = new IntersectionObserver(
      ([entry]) => {
        isActiveRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          progressRef.current = 0;
          applyProgress(0);
          if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(section);

    // Wheel
    const onWheel = (e: WheelEvent) => {
      if (!isActiveRef.current) return;

      const p           = progressRef.current;
      const goingDown   = e.deltaY > 0;
      const atBottom    = p >= 0.999;
      const atTop       = p <= 0.001;

      // Release hijack when gallery is fully traversed
      if ((goingDown && atBottom) || (!goingDown && atTop)) return;

      e.preventDefault();
      
      // Cancel any pending timeout
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
      
      nudgeProgress(e.deltaY);
    };

    // Touch
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      animatingRef.current = false;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isActiveRef.current || touchStartY.current === null) return;

      const dy        = touchStartY.current - e.touches[0].clientY;
      const p         = progressRef.current;
      const atBottom  = p >= 0.999;
      const atTop     = p <= 0.001;

      if ((dy > 0 && atBottom) || (dy < 0 && atTop)) return;

      e.preventDefault();
      nudgeProgress(dy * 1.6);
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      const p = progressRef.current;
      if (p < 0.05) smoothTo(0);
      else if (p > 0.95) smoothTo(1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      io.disconnect();
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [applyProgress, nudgeProgress, smoothTo]);

  const colMotionValues = [col0Y, col1Y, col2Y];

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', userSelect: 'none' }}
    >
      {/* Three columns */}
      <div className="absolute inset-0 grid grid-cols-3">
        {galleryColumns.map((colImgs, colIdx) => (
          <motion.div
            key={colIdx}
            style={{ y: colMotionValues[colIdx] }}
            className="flex flex-col will-change-transform"
          >
            {/* Duplicate images for visual density across full travel */}
            {[...colImgs, ...colImgs].map((name, imgIdx) => (
              <div
                key={`${colIdx}-${imgIdx}`}
                className="relative flex-shrink-0 overflow-hidden"
                style={{ height: '54vh' }}
              >
                <img
                  src={imgSrc(name)}
                  alt={`Sri Lanka — ${name}`}
                  className="absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
                {/* Thin border between images */}
                <div className="absolute inset-0 border-b border-black/30 pointer-events-none" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Top & bottom fade overlays for smooth blending with page */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 to-transparent z-10" />

      {/* Centred label overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-center"
        >
          <p className="mb-2 text-white/60 tracking-[0.35em] uppercase text-[10px] font-semibold">
            Visual Journey
          </p>
          <h2 className="font-display text-4xl text-white md:text-5xl drop-shadow-2xl">
            Sri Lanka in Focus
          </h2>
          {/* Animated scroll cue */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <p className="text-[10px] text-white/40 tracking-widest uppercase">Scroll to explore</p>
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent"
              animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ── MOBILE GALLERY ───────────────────────────────────────────────────────────
const MobileGallery = () => (
  <motion.div
    className="grid grid-cols-1 gap-4"
    variants={staggerContainer(0.08, 0.1)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-60px' }}
  >
    {galleryColumns[0].map((name, i) => (
      <motion.div
        key={i}
        className="group relative overflow-hidden h-64 rounded-xl"
        variants={cardItem}
        whileHover={{ scale: 1.02 }}
      >
        <img
          src={imgSrc(name)}
          alt={`Sri Lanka — ${name}`}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
    ))}
  </motion.div>
);

// ── HOME PAGE ────────────────────────────────────────────────────────────────
const DestinationCard = ({ destination, idx, navigate }: { destination: any; idx: number; navigate: any }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.button
      key={`${destination.slug}-${idx}`}
      type="button"
      onClick={() => navigate(`/destinations/${destination.slug}`)}
      className="group relative w-1/3 flex-shrink-0 overflow-hidden h-[600px] shadow-lg shadow-black/20 border border-gray-200"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 origin-top-left"
        animate={isHovering ? { scale: 1.15 } : { scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={destination.image}
          alt={destination.alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-8 pt-16 text-center">
        <h3 className="text-2xl font-bold tracking-tight text-white">{destination.title}</h3>
        <p className="mt-2 text-sm font-medium text-white/85">{destination.subtitle}</p>
      </div>
    </motion.button>
  );
};

// ── HOME PAGE ────────────────────────────────────────────────────────────────
const Home = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [destinationSlide, setDestinationSlide] = useState(0);
  const [isSliderHovering, setIsSliderHovering] = useState(false);
  const destinationSliderRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY    = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpac = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleDestinationPrev = () => {
    setDestinationSlide((prev) => prev - 1);
  };

  const handleDestinationNext = () => {
    setDestinationSlide((prev) => prev + 1);
  };

  // Seamless infinite loop - reset when reaching the end of first set
  useEffect(() => {
    if (destinationSlide >= featuredDestinations.length) {
      const timer = setTimeout(() => {
        if (destinationSliderRef.current) {
          destinationSliderRef.current.style.transition = 'none';
        }
        setDestinationSlide(destinationSlide % featuredDestinations.length);
        setTimeout(() => {
          if (destinationSliderRef.current) {
            destinationSliderRef.current.style.transition = '';
          }
        }, 0);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [destinationSlide]);

  // Autoplay for destination slider
  useEffect(() => {
    if (isSliderHovering) return;

    const autoplayInterval = setInterval(() => {
      setDestinationSlide((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(autoplayInterval);
  }, [isSliderHovering]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 2) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Lenis for smooth scrolling
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
      syncTouchLerp: 0.075
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
      className="relative min-h-screen bg-tct-dark text-white"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Full-page video background */}
      <div className="fixed inset-0 -z-50 overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.7 }}>
          <source src="/uploads/slider-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden pt-4">
        <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover brightness-75 -z-10">
          <source src="/uploads/slider-video.mp4" type="video/mp4" />
        </video>

        <motion.div
          className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16"
          style={{ y: heroY, opacity: heroOpac }}
        >
          <motion.div className="max-w-3xl -ml-16" variants={staggerContainer(0.12, 0.1)} initial="hidden" animate="show">
            <motion.h1 variants={fadeUp} className="font-display text-5xl font-black leading-[0.92] md:text-8xl text-shadow-2xl">
              <ShinyText
                text="The Coconut Tree Trails"
                speed={3}
                delay={1}
                color="#ffffff"
                shineColor="#a7d9d5"
                spread={120}
                direction="left"
                pauseOnHover={true}
                className="font-display"
              />
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-7 text-white/85 md:text-lg text-shadow-lg shadow-black/30 px-4 py-2">
              Travel Sri Lanka with people who know it. Tailor-made tours rooted in local expertise, genuine hospitality, and a deep love for this island paradise.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-4 flex items-center gap-3 text-sm text-white/60">
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <motion.button onClick={() => navigate('/packages')} className="bg-[#173036] px-10 py-4 text-base font-semibold text-white shadow-lg shadow-black/30" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                Explore Packages
              </motion.button>
              <motion.button onClick={() => navigate('/contact')} className="border-2 border-white/40 px-8 py-4 text-base font-semibold text-white hover:border-white transition-colors duration-200" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                Plan My Trip
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div className="relative hidden h-[680px] lg:block" variants={staggerContainer(0.15, 0.4)} initial="hidden" animate="show">
            <motion.div variants={slideRight} className="absolute right-16 top-10 w-[350px] rotate-6 border-4 border-[#a7d9d5]/60 bg-[#13212d] shadow-2xl shadow-black/50" whileHover={{ rotate: 3, y: -8, scale: 1.04, transition: { duration: 0.3 } }}>
              <div className="overflow-hidden">
                <img src="/images/home/kandy.jpg" alt="Kandy, Sri Lanka" className="h-[340px] w-full object-cover" />
              </div>
              <div className="px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#a7d9d5]/70">Featured</p>
                <p className="text-base font-semibold text-white">Sigiriya, Sri Lanka</p>
              </div>
            </motion.div>
            <motion.div variants={scaleIn} className="absolute right-36 top-34 w-[290px] -rotate-12 bg-[#0f1f2e] shadow-2xl shadow-black/50" whileHover={{ rotate: -9, y: -8, scale: 1.04, transition: { duration: 0.3 } }}>
              <div className="overflow-hidden border-4 border-[#1f3b52]">
                <img src="/images/home/The-best-things-to-do-in-Ella-Sri-Lanka.jpg" alt="Ella, Sri Lanka" className="h-[340px] w-full object-cover" />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="absolute right-10 top-48 w-[260px] -rotate-2 overflow-hidden bg-[#121d28] shadow-2xl shadow-black/50" whileHover={{ rotate: 0, y: -8, scale: 1.04, transition: { duration: 0.3 } }}>
              <img src="/images/home/yala.jpg" alt="Yala, Sri Lanka" className="h-[340px] w-full object-cover" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── DESTINATIONS ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
  {/* Flipped background image */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: "url('/images/updated.jpeg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',// 👈 flips horizontally
      opacity: 0.9,
    }}
  />
  <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/95 to-white/50" />
        <div className="relative mx-auto max-w-9xl px-20 z-10">
          <motion.div className="mb-12 flex items-end justify-between" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <div>
              <p className="section-label mb-2 text-[#173036]">Top Destinations</p>
              <h2 className="font-display text-5xl font-bold text-gray-900 md:text-6xl">Explore Sri Lanka</h2>
            </div>
            <motion.button onClick={() => navigate('/destinations')} className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#173036] transition-colors duration-200" whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
              Explore All <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>

          {/* Slider Container */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsSliderHovering(true)}
            onMouseLeave={() => setIsSliderHovering(false)}
          >
            {/* Left Arrow */}
            <motion.button
              onClick={handleDestinationPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-20 z-20 p-4 text-[#173036]"
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
                <line x1="25" y1="12" x2="9" y2="12" />
              </svg>
            </motion.button>

            {/* Right Arrow */}
            <motion.button
              onClick={handleDestinationNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-20 z-20 p-4 text-[#173036]"
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
                <line x1="14" y1="12" x2="0" y2="12" />
              </svg>
            </motion.button>

            {/* Slider */}
            <div className="overflow-hidden">
              <motion.div
                ref={destinationSliderRef}
                className="flex gap-8"
                animate={{ x: -(destinationSlide * (33.333 + 2.667)) + '%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
              >
                {/* Render cards twice for infinite loop */}
                {[...featuredDestinations, ...featuredDestinations].map((destination, idx) => (
                  <DestinationCard key={`${destination.slug}-${idx}`} destination={destination} idx={idx} navigate={navigate} />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE ──────────────────────────────────────────── */}
      <section 
        className="relative overflow-hidden py-20 bg-[#173036]"
      >
        {/* Background overlay for text readability */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(/images/image-4-new.png)',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'repeat-x',
          filter: 'brightness(0.5)',
        }} />
        
        <div className="relative mx-auto grid max-w-9xl grid-cols-1 items-center gap-10 px-20 lg:grid-cols-2 pr-40 pb-20">
          <motion.div variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <p className="section-label mb-3 text-white/85">Tailor-Made for You</p>
            <h2 className="font-display text-5xl font-bold leading-tight text-tct-white md:text-6xl">Sri Lanka<br />Your Way</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/85 md:text-base">
              From ancient temples and wildlife safaris to misty tea estates and sun-soaked beaches — our curated packages give you the real Sri Lanka, guided by people who live and breathe this island every day.
            </p>
            <motion.button onClick={() => navigate('/packages')} className="mt-8 bg-white px-8 py-4 text-base font-semibold text-[#173036] shadow-md shadow-black/30" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
              Browse All Packages
            </motion.button>
          </motion.div>

          <div className="relative w-full h-[600px] -mt-20 mr-40">
            <CardSwap
              width={500}
              height={500}
              cardDistance={60}
              verticalDistance={70}
              delay={3000}
              pauseOnHover={true}
              skewAmount={6}
              easing="elastic"
            >
              <Card customClass="bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
                <img src="/images/home/colombo.avif" alt="Colombo" className="w-full h-full object-cover" />
              </Card>
              <Card customClass="bg-gradient-to-br from-slate-800 to-slate-700 overflow-hidden">
                <img src="/images/home/yala.jpg" alt="Yala" className="w-full h-full object-cover" />
              </Card>
              <Card customClass="bg-gradient-to-br from-slate-700 to-slate-600 overflow-hidden">
                <img src="/images/home/kandy.jpg" alt="Kandy" className="w-full h-full object-cover" />
              </Card>
            </CardSwap>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section
  className="relative overflow-hidden py-24 "
  style={{
    backgroundImage: "url('/images/updated.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/95 to-transparent" />

  <div className="relative mx-auto max-w-9xl px-20">
          <motion.div className="text-center mb-16" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <p className="section-label mb-2 text-[#173036] font-semibold">Your Trusted Partner</p>
            <h2 className="font-display text-5xl font-bold text-gray-900 md:text-6xl mb-4">Authentic Sri Lanka</h2>
            <p className="mx-auto max-w-2xl text-base leading-8 text-gray-600">
              Every service we offer is rooted in genuine local knowledge and a commitment to making your Sri Lanka experience as real, safe, and memorable as possible.
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" variants={staggerContainer(0.09, 0.15)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {services.map((service) => {
              const getServiceIcon = () => {
                const iconProps = { className: 'h-10 w-10', fill: 'currentColor' };
                switch (service.iconType) {
                  case 'flight':  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9L2 14v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>;
                  case 'hotel':   return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}><path d="M7 13c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm13-5h-8V4h8m0 14H4c-1.1 0-2-.9-2-2v-4h20v4c0 1.1-.9 2-2 2zm-7-7H7v2h6v-2z"/></svg>;
                  case 'tour':    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>;
                  case 'safari':  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-13c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>;
                  case 'visa':    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}><path d="M20 8H4V4h16m0 14H4c-1.1 0-2-.9-2-2v-4h20v4c0 1.1-.9 2-2 2zm-7-7H7v2h6v-2z"/></svg>;
                  case 'support': return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12h-8v-2h8v2zm0-3h-8V9h8v2zm0-3H4V9h14v2z"/></svg>;
                  default: return null;
                }
              };
              return (
                <motion.div key={service.title} className="group relative border border-gray-200 bg-white p-8 shadow-lg shadow-black/10" variants={cardItem} whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
                  <div className="relative mb-6 inline-flex rounded-xl bg-[#173036] p-3 text-white">{getServiceIcon()}</div>
                  <h3 className="mb-3 text-xl font-bold text-gray-900">{service.title}</h3>
                  <p className="text-base leading-7 text-gray-700">{service.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCE SECTION ───────────────────────────────── */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-[#173036] via-[#1a3a3a] to-[#173036]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#a7d9d5] blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0d5a53] blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-9xl px-6 md:px-20">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            {/* Left Column - Big Picture */}
            <motion.div variants={slideLeft} className="relative overflow-hidden shadow-2xl shadow-black/40">
              <motion.img 
                src="/images/home/yala.jpg" 
                alt="Sri Lanka Experience" 
                className="w-300 h-188 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>

            {/* Right Column - Text in Rectangle */}
            <motion.div variants={slideRight} className=" bg-white/10 backdrop-blur-md border border-white/20 p-10 md:p-12 shadow-xl shadow-black/20">
              <motion.div variants={fadeUp}>
                <p className="text-white/85 font-semibold text-sm tracking-widest uppercase mb-4">Why Choose Us</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Experience Sri Lanka<br />Like Never Before
                </h2>
                <p className="text-white/80 text-base leading-8 mb-8">
                  We're not just tour operators — we're storytellers who bring Sri Lanka to life through authentic local experiences, personalized itineraries, and genuine connections with the people and places that make this island extraordinary.
                </p>
                
                <div className="space-y-5 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-6 w-6 rounded-full bg-[#a7d9d5] flex items-center justify-center flex-shrink-0">
                      <svg className="h-4 w-4 text-[#173036]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Local Expert Guides</h4>
                      <p className="text-white/70 text-sm">People who know every hidden gem and local secret</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-6 w-6 rounded-full bg-[#a7d9d5] flex items-center justify-center flex-shrink-0">
                      <svg className="h-4 w-4 text-[#173036]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Tailor-Made Itineraries</h4>
                      <p className="text-white/70 text-sm">Every journey crafted specifically for your interests and pace</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-6 w-6 rounded-full bg-[#a7d9d5] flex items-center justify-center flex-shrink-0">
                      <svg className="h-4 w-4 text-[#173036]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">Authentic Experiences</h4>
                      <p className="text-white/70 text-sm">Real connections with local culture, wildlife, and traditions</p>
                    </div>
                  </div>
                </div>

                <motion.button 
                  onClick={() => navigate('/about')}
                  className="w-full px-8 py-4 bg-white text-[#173036] font-bold text-base hover:bg-[#a7d9d5] transition-colors duration-300 shadow-lg shadow-black/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore Us
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 bg-black/30">
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <p className="section-label mb-2 text-white/85">Hear it from Travellers</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">Real Stories. Real Sri Lanka.</h2>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div key={currentTestimonial} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[0, 1].map((offset) => {
                  const index = (currentTestimonial + offset) % testimonials.length;
                  const t = testimonials[index];
                  return (
                    <motion.div key={`testimonial-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-8 shadow-lg shadow-black/20 backdrop-blur-sm" variants={cardItem}>
                      <motion.div whileHover={{ scale: 1.12, color: 'rgba(127, 181, 176, 0.5)' }}>
                        <Quote className="mb-5 h-12 w-12 text-white/20" />
                      </motion.div>
                      <p className="text-base leading-7 text-white/85 mb-8">"{t.quote}"</p>
                      <div className="flex items-center gap-4">
                        <div className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-[#112738] text-base font-bold text-[#a7d9d5]">{t.name[0]}</div>
                        <div>
                          <p className="text-base font-semibold text-white">{t.name}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <motion.button onClick={() => setCurrentTestimonial((prev) => (prev - 2 + testimonials.length) % testimonials.length)} className="group rounded-full border border-white/20 bg-white/5 p-3 text-white hover:bg-white/10 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
                  <motion.button key={index} onClick={() => setCurrentTestimonial(index * 2)} className={`h-2 rounded-full transition-all ${index * 2 === currentTestimonial ? 'w-8 bg-[#a7d9d5]' : 'w-2 bg-white/20'}`} whileHover={{ scale: 1.2 }} />
                ))}
              </div>
              <motion.button onClick={() => setCurrentTestimonial((prev) => (prev + 2) % testimonials.length)} className="group rounded-full border border-white/20 bg-white/5 p-3 text-white hover:bg-white/10 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CINEMATIC GALLERY ─────────────────────────────────── */}
      <section id="gallery-section" className="relative bg-black/30">
        {/* Desktop: full-viewport scroll-hijacked cinematic gallery */}
        <div className="hidden md:block">
          <CinematicGallery />
        </div>

        {/* Mobile: simple stacked gallery */}
        <div className="md:hidden px-6 py-24">
          <div className="text-center mb-12">
            <p className="section-label mb-2 text-white/85 tracking-[0.3em] uppercase text-xs">Visual Journey</p>
            <h2 className="font-display text-4xl text-white">Sri Lanka in Focus</h2>
          </div>
          <MobileGallery />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
  {/* Flipped background image */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: "url('/images/updated-4.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',// 👈 flips horizontally
      opacity: 0.9,
    }}
  />
  <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/95 to-white/50" />
        <div className="relative mx-auto grid max-w-9xl grid-cols-1 gap-16 px-20 lg:grid-cols-2">
          <motion.div variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <p className="section-label mb-3 text-[#173036] font-semibold">You Asked, We Answer</p>
            <h2 className="font-display text-5xl font-bold text-gray-900 md:text-6xl mb-4">Quick Answers for Smart Travellers</h2>
            <p className="mt-4 max-w-lg text-base leading-8 text-gray-600 mb-8">
              Planning a trip to Sri Lanka? Here are the questions we get asked most often — answered honestly by our team.
            </p>
            <motion.button onClick={() => navigate('/faq-policy')} className="inline-flex items-center gap-3 bg-[#173036] px-8 py-3 font-semibold text-white shadow-md shadow-black/20" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              View Full FAQ
            </motion.button>
          </motion.div>

          <motion.div className="space-y-4 opacity-80" variants={staggerContainer(0.08, 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {generalCuriosities.map((faq, index) => (
              <motion.div key={faq.q} className="overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200" variants={cardItem} whileHover={{ y: -2 }}>
                <button className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <span className="text-base font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="flex-shrink-0">
                    <ChevronDown className="h-5 w-5 text-gray-700" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <div className="px-6 pb-4 text-base leading-7 text-gray-700 border-t border-gray-200 pt-4">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
