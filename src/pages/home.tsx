import { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import ShinyText from '../components/ShinyText';


// Landmark hotspots mapped precisely to your image coordinates
const mapPoints = [
  { id: 'jaffna', name: 'Jaffna', x: 26, y: 10, img: '/images/home/jaffna.jpg', desc: 'Cultural northern escape.', path: 'culture-heritage' },
  { id: 'anuradhapura', name: 'Anuradhapura', x: 41, y: 33, img: '/images/destinations/anuradhapura-culture.webp', desc: 'Ancient sacred ruins and stupas.', path: 'historical-areas' },
  { id: 'trincomalee', name: 'Trincomalee', x: 65, y: 31, img: '/images/destinations/beach-arugambay.jpg', desc: 'Deep harbors and whale watching.', path: 'beaches' },
  { id: 'wilpattu', name: 'Wilpattu', x: 27, y: 41, img: '/images/destinations/wilpattu-wildlife.png', desc: 'Untamed leopard and lake safaris.', path: 'wildlife' },
  { id: 'sigiriya', name: 'Sigiriya', x: 51, y: 45, img: '/images/destinations/sigiriya-culture.png', desc: 'The majestic ancient rock fortress.', path: 'historical-areas' },
  { id: 'kandy', name: 'Kandy', x: 49, y: 55, img: '/images/destinations/culture-perahera.webp', desc: 'The historic sacred temple of the tooth.', path: 'culture-heritage' },
  { id: 'negombo', name: 'Negombo', x: 19, y: 62, img: '/images/destinations/negombo-culture.webp', desc: 'Vibrant coastal lagoons and canals.', path: 'beaches' },
  { id: 'colombo', name: 'Colombo', x: 24, y: 69, img: '/images/home/colombo.avif', desc: 'Bustling colonial & modern capital vibe.', path: 'culture-heritage' },
  { id: 'ella', name: 'Ella', x: 55, y: 67, img: '/images/destinations/hidden-ella.jpg', desc: 'Misty hills and iconic railway bridges.', path: 'adventure' },
  { id: 'arugambay', name: 'Arugam Bay', x: 85, y: 64, img: '/images/destinations/beach-arugambay.jpg', desc: 'World-renowned coastal surf breaks.', path: 'beaches' },
  { id: 'yala', name: 'Yala', x: 71, y: 71, img: '/images/home/yala.jpg', desc: 'Deep wildlife safaris and elephant tracks.', path: 'wildlife' },
  { id: 'udawalawe', name: 'Udawalawe', x: 59, y: 83, img: '/images/destinations/udawalawa-wildlife.jpg', desc: 'Sanctuary homes of majestic wild elephants.', path: 'wildlife' },
  { id: 'galle', name: 'Galle', x: 28, y: 89, img: '/images/destinations/galle-culture.webp', desc: 'Historic dutch fortress and coastal views.', path: 'culture-heritage' },
  { id: 'mirissa', name: 'Mirissa', x: 40, y: 93, img: '/images/destinations/mirissa-beach.webp', desc: 'Secret beaches and sunset whale tours.', path: 'beaches' },
];
// const services = [
//   { iconType: 'flight',  title: 'Flight Booking',   desc: 'We assist with international and domestic flight arrangements to ensure your Sri Lanka journey starts smoothly from the moment you leave home.' },
//   { iconType: 'hotel',   title: 'Hotel Bookings',   desc: "From boutique jungle lodges in Sigiriya to colonial tea estate bungalows and beachfront villas — we curate Sri Lanka's finest stays for every budget." },
//   { iconType: 'tour',    title: 'Tour Experiences', desc: 'Every Sri Lankan experience is guided by locals who know the island intimately — revealing the hidden temples, local markets, and off-trail landscapes no tourist map ever finds.' },
//   { iconType: 'safari',  title: 'Wildlife Safaris', desc: 'Track leopards in Yala, witness elephant herds at Udawalawe, and spot blue whales off Mirissa — with expert naturalist guides who read the wild like a language.' },
//   { iconType: 'visa',    title: 'Visa Processing',  desc: 'Our team provides complete visa assistance for Sri Lanka ETA applications, simplifying the process so you can focus entirely on planning your adventure.' },
//   { iconType: 'support', title: '24/7 Support',     desc: 'From the moment you enquire to the day you arrive home, our dedicated local team is available around the clock to handle every detail of your journey.' },
// ];

const testimonials = [
  { name: 'James & Sarah — UK',      quote: 'The team at The Coconut Tree Trails made our honeymoon in Sri Lanka truly unforgettable. Every detail was taken care of — from the scenic train ride through Ella to our private sunset dinner in Galle.' },
  { name: 'Priya Nair — India',       quote: 'I booked the Ramayana Tour and was deeply moved by the depth of knowledge our guide brought to every sacred site. This was not just a tour — it was a pilgrimage. Absolutely authentic and beautifully organised.' },
  { name: 'David Hartmann — Germany', quote: 'Superb local knowledge, seamless logistics, and genuinely warm hospitality at every step. Sri Lanka is spectacular — and The Coconut Tree Trails is the only way to truly experience it.' },
];

// ── GALLERY DATA ────────────────────────────────────────────────────────────
// 5 images per column × 3 columns
const galleryColumns = [
  ['kandy', 'yala-2', 'colombo', 'gallery-2.11', 'gallery-2.5'],
  ['colombo', 'The-best-things-to-do-in-Ella-Sri-Lanka', 'yala-4', 'kandy', 'colombo'],
  ['yala', 'kandy', 'The-best-things-to-do-in-Ella-Sri-Lanka', 'colombo', 'gallery-2.11'],
];

const imgSrc = (name: string) =>
  `/images/home/${name}${name === 'colombo' ? '.avif' : '.jpg'}`;

const featureSliderImages = [
  '/images/home/yala-2.jpg',  
  '/images/gallery-2/gallery-2.2.jfif',
  '/images/home/yala-3.jpg',
  '/images/home/kandy.jpg',      // added one more for variety
];

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
  const TRAVEL = 2560;

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
      { threshold: 0.3 }
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
      style={{ height: '200vh', userSelect: 'none' }}
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

const InteractiveMap = () => {
  const [activePoint, setActivePoint] = useState<typeof mapPoints[0] | null>(null);

  return (
    <div className="relative max-w-[450px] md:max-w-[500px] mx-auto select-none">
      <motion.div
        variants={slideLeft}
        className="relative overflow-hidden"
      >
        <motion.img
          src="/TCT-trails-map.png"
          alt="Sri Lanka Experience"
          className="w-full h-auto object-contain block relative z-0"
          transition={{ duration: 0.6 }}
          style={{
            transform: "perspective(1200px) rotateX(15deg) rotateY(-12deg) rotateZ(3deg)",
            transformStyle: "preserve-3d",
            filter: `
              drop-shadow(-8px 12px 6px rgba(39, 192, 223, 0.3)) 
              drop-shadow(-8px 12px 6px rgba(39, 192, 223, 0.3)) 
            `,
          }}
        />

        {/* Dynamic Mapping Pin Hotspots */}
        {mapPoints.map((point) => {
          const isSelected = activePoint?.id === point.id;
          return (
            <div
              key={point.id}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer p-3"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              onMouseEnter={() => setActivePoint(point)}
              onMouseLeave={() => setActivePoint(null)}
            >
              <div className="relative flex items-center justify-center">
                <motion.div 
                  className="absolute w-6 h-6 rounded-full bg-[#a7d9d5]/40"
                  animate={{ scale: [1, 1.8, 1] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
                <div className={`w-2.5 h-2.5 rounded-full border border-white transition-all duration-300 ${isSelected ? 'bg-white scale-125 shadow-md' : 'bg-teal-400'}`} />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Floating Popup - Positioned near the hovered point */}
      <AnimatePresence>
  {activePoint && (
    <Link
      to={`/destinations/${activePoint.path}`}
      onMouseEnter={() => setActivePoint(activePoint)}
      onMouseLeave={() => setActivePoint(null)}
      className="absolute z-30 w-56 bg-white border border-slate-200 p-2.5 cursor-pointer text-slate-900 block group/card hover:border-[#a7d9d5] transition-colors duration-300 pointer-events-auto shadow-xl"
      component={motion.a}
      style={{
        left: `calc(${activePoint.x}% + 20px)`,
        top: `calc(${activePoint.y}% - 140px)`,
      }}
      {...({
        initial: { opacity: 0, y: 20, scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 10, scale: 0.9 },
        transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
      } as any)}
    >
      <div className="w-full aspect-[16/9] overflow-hidden mb-2 bg-slate-100 rounded">
        <img 
          src={activePoint.img} 
          alt={activePoint.name} 
          className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 ease-out" 
        />
      </div>
      
      <div className="px-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold uppercase tracking-wide text-[#173036] mb-0.5 group-hover/card:text-[#173036]/80 transition-colors duration-200">
            {activePoint.name}
          </h2>
          <ArrowRight className="h-4 w-4 text-slate-400 opacity-0 -translate-x-1 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-300" />
        </div>
        <p className="text-body-xs text-slate-500 line-clamp-2">{activePoint.desc}</p>
      </div>
    </Link>
  )}
</AnimatePresence>
    </div>
  );
};

// ── HOME PAGE ────────────────────────────────────────────────────────────────
const DestinationCard = ({ destination, idx, navigate }: { destination: any; idx: number; navigate: any }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.button
      key={`${destination.slug}-${idx}`}
      onClick={() => navigate(`/destinations/${destination.slug}`)}
      className="group relative w-[80%] sm:w-[45%] lg:w-[33.333%] flex-shrink-0 overflow-hidden h-[280px] sm:h-[400px] md:h-[500px] lg:h-[600px] shadow-lg shadow-black/20 border border-gray-200"
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
      <div className="absolute inset-x-0 bottom-0 px-4 sm:px-6 pb-4 sm:pb-8 pt-8 sm:pt-16 text-center">
        <h3 className="text-base sm:text-xl lg:text-2xl font-bold tracking-tight text-white">{destination.title}</h3>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-white/85">{destination.subtitle}</p>
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
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // New: Feature Section Slider State
  const [currentFeatureImage, setCurrentFeatureImage] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const destinationSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpac = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Feature Slider Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureImage((prev) => (prev + 1) % featureSliderImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const goToPreviousFeature = () => {
    setCurrentFeatureImage((prev) => (prev - 1 + featureSliderImages.length) % featureSliderImages.length);
  };

  const goToNextFeature = () => {
    setCurrentFeatureImage((prev) => (prev + 1) % featureSliderImages.length);
  };

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
        <video
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  poster="/uploads/hero-poster.jpg"
  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
>
  <source src="/uploads/slider-video.mp4" type="video/mp4" />
</video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden pt-24 sm:pt-28 md:pt-4">
        <video
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  poster="/uploads/hero-poster.jpg"
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/uploads/slider-video.mp4" type="video/mp4" />
</video>
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          className="relative z-10 mx-auto grid max-w-7xl px-4 sm:px-6 md:px-8 lg:px-20 grid-cols-1 items-center gap-8 py-8 md:gap-10 md:py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16"
          style={{ y: heroY, opacity: heroOpac }}
        >
          <motion.div className="max-w-3xl lg:-ml-16" variants={staggerContainer(0.12, 0.1)} initial="hidden" animate="show">
            <motion.h1 variants={fadeUp} className="font-display text-4xl font-black leading-[0.92] sm:text-5xl md:text-6xl lg:text-8xl text-shadow-2xl">
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
            <motion.p variants={fadeUp} className="mt-4 md:mt-6 max-w-xl text-sm sm:text-base leading-6 sm:leading-7 text-white/85 md:text-lg text-shadow-lg shadow-black/30">
              Discover Sri Lanka with the people who know it best. Tailor-made journeys designed by local experts, combining authentic experiences, genuine hospitality, and a deep passion for this extraordinary island.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-3 md:mt-4 flex items-center gap-3 text-sm text-white/60">
            </motion.div>
            <motion.div variants={fadeUp} className="mt-6 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.button onClick={() => navigate('/destinations')} className="bg-[#173036] px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-black/30 whitespace-nowrap" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                Explore Destinations
              </motion.button>
              <motion.button onClick={() => navigate('/enquiry')} className="border-2 border-white/40 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white hover:border-white transition-colors duration-200 whitespace-nowrap" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                Plan My Trip
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div className="relative hidden h-[400px] sm:h-[500px] md:h-[600px] lg:h-[680px] lg:block" variants={staggerContainer(0.15, 0.4)} initial="hidden" animate="show">
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
              <div className="overflow-hidden border-4 border-[#173036]">
                <img src="/images/home/The-best-things-to-do-in-Ella-Sri-Lanka.jpg" alt="Ella, Sri Lanka" className="h-[340px] w-full object-cover" />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="absolute right-10 top-48 w-[260px] -rotate-2 overflow-hidden bg-[#121d28] shadow-2xl shadow-black/50" whileHover={{ rotate: 0, y: -8, scale: 1.04, transition: { duration: 0.3 } }}>
              <div className="overflow-hidden border-4 border-[#a7d9d5]/60">
                <img src="/images/home/yala.jpg" alt="Yala, Sri Lanka" className="h-[340px] w-full object-cover" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── DESTINATIONS ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
  {/* Flipped background image */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: "url('/images/bg/bg-1.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',// 👈 flips horizontally
      opacity: 0.9,
    }}
  />
  <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/95 to-white/50" />
        <div className="relative mx-auto max-w-9xl px-4 sm:px-6 md:px-8 lg:px-20 z-10">
          <motion.div className="mb-8 md:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <div>
              <p className="section-label mb-2 text-[#173036]">Top Destinations</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900">Explore Sri Lanka</h2>
            </div>
            <motion.button onClick={() => navigate('/destinations')} className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#173036] transition-colors duration-200 whitespace-nowrap" whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 lg:p-4 text-[#173036] sm:-translate-x-12 lg:-translate-x-20"
              whileHover={{ scale: 1.1, x: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
                <line x1="25" y1="12" x2="9" y2="12" />
              </svg>
            </motion.button>

            {/* Right Arrow */}
            <motion.button
              onClick={handleDestinationNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 lg:p-4 text-[#173036] sm:translate-x-12 lg:translate-x-20"
              whileHover={{ scale: 1.1, x: 4 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
                <line x1="14" y1="12" x2="0" y2="12" />
              </svg>
            </motion.button>

            {/* Slider */}
            <div className="overflow-hidden">
              <motion.div
                ref={destinationSliderRef}
                className="flex"
                style={{ gap: windowWidth < 640 ? '4%' : windowWidth < 1024 ? '3%' : '2.667%' }}
                animate={{ x: -(destinationSlide * (windowWidth < 640 ? 84 : windowWidth < 1024 ? 48 : 36)) + '%' }}
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
      <section className="relative overflow-hidden pb-16 pt-8 md:pb-20 lg:pb-24 bg-[#173036]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(/images/expirence-new-removebg-preview.png)',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'repeat-x',
          filter: 'brightness(0.5)',
        }} />

        <div className="relative mx-auto grid max-w-9xl px-4 sm:px-6 md:px-8 lg:px-20 grid-cols-1 items-center gap-8 md:gap-10 lg:gap-12 lg:grid-cols-2">
          
          {/* Left Text */}
          <motion.div variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <p className="section-label mb-2 md:mb-3 text-white/85">Tailor-Made for You</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-tct-white">Sri Lanka Your Way</h2>
            <p className="mt-4 md:mt-6 max-w-xl text-xs sm:text-sm md:text-base leading-6 md:leading-7 text-white/85">
              From golden beaches and wildlife safaris to ancient temples, local culture and authentic Sri Lankan cuisine, our tailored tours give you the real Sri Lankan experience - thoughtfully designed by people who know the island inside out.
            </p>
            <motion.button 
              onClick={() => navigate('/destinations')} 
              className="mt-6 md:mt-8 bg-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-semibold text-[#173036] shadow-md shadow-black/30"
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
            >
              Browse All Destinations
            </motion.button>
          </motion.div>

          {/* RIGHT SIDE — IMAGE SLIDER (replaces CardSwap) */}
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center overflow-hidden">
            <motion.div
  className="relative w-full max-w-[380px] md:max-w-[420px] aspect-[4/3] mx-auto border-4 border-white bg-slate-900 overflow-hidden"
  whileHover={{ scale: 1.015 }}
  transition={{ duration: 0.4 }}
>
  {/* Images */}
  {featureSliderImages.map((image, index) => (
    <motion.img
      key={index}
      src={image}
      alt="Sri Lanka Experience"
      className="absolute inset-0 h-full w-full object-cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: index === currentFeatureImage ? 1 : 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    />
  ))}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Controls */}
              <button
                onClick={goToPreviousFeature}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center bg-white/20 backdrop-blur-md hover:bg-white/40 transition"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>

              <button
                onClick={goToNextFeature}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center bg-white/20 backdrop-blur-md hover:bg-white/40 transition"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {featureSliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeatureImage(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentFeatureImage ? 'w-10 bg-white' : 'w-2 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ── Tailor-Made Experience Section ─────────────────────────────────────── */}
<section
  className="relative overflow-hidden py-16 md:py-20 lg:py-24"
>
  <div className="absolute inset-0 bg-white" />

  <div className="relative mx-auto max-w-9xl px-4 sm:px-6 md:px-8 lg:px-20">
  <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.2fr] gap-6 lg:gap-8 items-center items-center">
{/* Right Side - Text Content */}
      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        className="lg:pt-8 bg-gradient-to-br from-[#f5f4dc] to-[#27c0df4d] border border-white p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl shadow-black/20"
      >
        <p className="section-label mb-2 md:mb-3 text-[#173036]">Tailor-Made for You</p>
        
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#173036]">
          Sri Lanka Your Way
        </h2>
        
        <p className="mt-4 md:mt-6 max-w-xl text-xs sm:text-sm md:text-base leading-6 md:leading-7 text-[#173036]">
          From ancient temples and wildlife safaris to misty tea estates and sun-soaked beaches — our curated packages give you the real Sri Lanka, guided by people who live and breathe this island every day.
        </p>
        <p className="mt-4 md:mt-6 max-w-xl text-xs sm:text-sm md:text-base leading-6 md:leading-7 text-[#173036]">
          From ancient temples and wildlife safaris to misty tea estates and sun-soaked beaches — our curated packages give you the real Sri Lanka, guided by people who live and breathe this island every day.
        </p>
      </motion.div>
    {/* Left Side - Smaller Image */}
    <motion.div
      variants={slideLeft}
      className="relative max-w-[370px] mx-auto"
    >
      <InteractiveMap />
    </motion.div>
      
    </div>
  </div>
</section>

      {/* ── EXPERIENCE SECTION ───────────────────────────────── */}
      {/* ── EXPERIENCE SECTION ───────────────────────────────── */}
<section className="relative overflow-hidden py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#173036] via-[#1a3a3a] to-[#173036]">
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-0 left-0 w-96 h-96 bg-[#a7d9d5] blur-3xl" />
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0d5a53] blur-3xl" />
  </div>
  
  <div className="relative mx-auto max-w-9xl px-4 sm:px-6 md:px-8 lg:px-20">
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 items-stretch" 
      initial="hidden" 
      whileInView="show" 
      viewport={{ once: true, margin: '-80px' }}
    >
      {/* Left Column - Collage Layout (Stretches to match Text Box) */}
      {/* Note: Added lg:p-12 to give more breathing room for spilling items */}
      <div className="relative w-full p-12 sm:p-16 bg-transparent overflow-visible font-sans h-full min-h-[550px] lg:min-h-0">
        <div 
          className="relative w-full h-full shadow-2xl bg-cover bg-center hover:scale-101 transition-transform duration-500 ease-out" 
          style={{ backgroundImage: "url('/images/gallery/gallery_07.jpg')" }}
        >
          {/* Soft color tint overlay */}
          <div className="absolute inset-0 bg-sky-400/10 rounded-xl pointer-events-none" />

          {/* 1. Top Left Polaroid (Elephant Close-up) - Bigger & Pushed higher/left out of frame */}
          <div className="absolute -top-16 -left-10 w-44 sm:w-56 md:w-64 bg-white p-2.5 pb-6 sm:p-3 sm:pb-8 shadow-2xl border border-gray-200 transform -rotate-12 transition-transform hover:rotate-0 hover:z-50 duration-300">
            <img 
              src="/images/gallery/gallery_02.jpg" 
              alt="Elephant" 
              className="w-full h-28 sm:h-40 md:h-44 object-cover object-center grayscale-[20%]" 
            />
            {/* White Magnet Pin */}
            <div className="absolute -top-2.5 right-25 w-5 h-5 sm:w-7 sm:h-7 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center z-10" />
          </div>

          {/* Top Right Polaroid - Bigger & Pushed higher/right out of frame */}
          <div className="absolute -top-16 -right-10 w-44 sm:w-56 md:w-64 bg-white p-2.5 pb-6 sm:p-3 sm:pb-8 shadow-2xl border border-gray-200 transform rotate-12 z-20 transition-transform hover:rotate-0 hover:z-50 duration-300">
            <img 
              src="/images/gallery/gallery_10.jpg" 
              alt="Top Right Experience" 
              className="w-full h-28 sm:h-40 md:h-44 object-cover object-center" 
            />
            {/* White Magnet Pin */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-7 sm:h-7 bg-white rounded-full shadow-md border border-gray-200" />
          </div>

          {/* 2. Middle Polaroid (City Skyline) - Slightly shifted left to clear space */}
          <div className="absolute top-1/4 -left-6 sm:-left-10 w-48 sm:w-60 md:w-68 bg-white p-2.5 pb-8 sm:p-3 sm:pb-10 shadow-2xl border border-gray-100 transform -rotate-3 z-10 transition-transform hover:rotate-0 hover:z-50 duration-300">
            <img 
              src="/images/gallery/gallery_03.jpg" 
              alt="City Skyline" 
              className="w-full h-32 sm:h-40 md:h-48 object-cover" 
            />
            {/* White Magnet Pin */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-7 sm:h-7 bg-slate-50 rounded-full shadow-md border border-gray-200" />
          </div>

          {/* 3. Bottom Left Polaroid (Safari Jeep) - Bigger & Pushed lower/left out of frame */}
          <div className="absolute -bottom-16 -left-10 w-48 sm:w-60 md:w-68 bg-white p-2.5 pb-6 sm:p-3 sm:pb-8 shadow-2xl border border-gray-200 transform -rotate-6 z-20 transition-transform hover:rotate-0 hover:z-50 duration-300">
            <img 
              src="/images/gallery/gallery_01.jpg" 
              alt="Safari Jeep" 
              className="w-full h-32 sm:h-40 md:h-52 object-cover" 
            />
            {/* White Magnet Pin */}
            <div className="absolute -top-2.5 left-16 sm:left-24 w-5 h-5 sm:w-7 sm:h-7 bg-white rounded-full shadow-md border border-gray-200" />
          </div>

          {/* Bottom Right Polaroid - Bigger & Pushed lower/right out of frame */}
          <div className="absolute -bottom-16 -right-10 w-48 sm:w-60 md:w-68 bg-white p-2.5 pb-6 sm:p-3 sm:pb-8 shadow-2xl border border-gray-200 transform rotate-6 z-20 transition-transform duration-300 ease-out hover:rotate-0 hover:z-50">
            <img 
              src="/images/gallery/gallery_08.jpg" 
              alt="Bottom Right Experience" 
              className="w-full h-32 sm:h-40 md:h-52 object-cover object-center" 
            />
            {/* White Magnet Pin */}
            <div className="absolute -top-2.5 right-16 sm:right-24 w-5 h-5 sm:w-7 sm:h-7 bg-white rounded-full shadow-md border border-gray-200" />
          </div>
        </div>
      </div>

      {/* Right Column - Text in Rectangle */}
      <motion.div variants={slideRight} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl shadow-black/20 h-full flex flex-col justify-center">
        <motion.div variants={fadeUp}>
          <p className="text-white/85 font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 md:mb-4">Why Choose Us</p>
          <p className="text-white/80 text-xs sm:text-sm md:text-base leading-6 md:leading-8 mb-6 md:mb-8">
            We're not just travel operators— we're passionate about helping people experience Sri Lanka the best way. Through authentic experiences, personalised itineraries, and local knowledge, we create journeys that go beyond the typical tourist trail.
            For years, The Coconut Tree has been bringing the flavours, culture, and hospitality of Sri Lanka to guests across the UK. Now, we're helping people discover the island for themselves through carefully tailored holidays designed by people with deep roots in Sri Lanka.
          </p>
          
          <div className="space-y-4 md:space-y-5 mb-6 md:mb-8">
            <div className="flex items-start gap-3 md:gap-4">
              <div className="mt-0.5 md:mt-1 h-5 md:h-6 w-5 md:w-6 rounded-full bg-[#a7d9d5] flex items-center justify-center flex-shrink-0">
                <svg className="h-3 md:h-4 w-3 md:w-4 text-[#173036]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm md:text-base mb-0.5 md:mb-1">Local Knowledge</h4>
                <p className="text-white/70 text-xs md:text-sm">Expert insight, trusted recommendations, and experiences shaped by people who know the island inside out.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 md:gap-4">
              <div className="mt-0.5 md:mt-1 h-5 md:h-6 w-5 md:w-6 rounded-full bg-[#a7d9d5] flex items-center justify-center flex-shrink-0">
                <svg className="h-3 md:h-4 w-3 md:w-4 text-[#173036]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm md:text-base mb-0.5 md:mb-1">Tailor-Made Itineraries</h4>
                <p className="text-white/70 text-xs md:text-sm">Every journey created specifically for your interests and travel style.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 md:gap-4">
              <div className="mt-0.5 md:mt-1 h-5 md:h-6 w-5 md:w-6 rounded-full bg-[#a7d9d5] flex items-center justify-center flex-shrink-0">
                <svg className="h-3 md:h-4 w-3 md:w-4 text-[#173036]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm md:text-base mb-0.5 md:mb-1">Authentic Experiences</h4>
                <p className="text-white/70 text-xs md:text-sm">Discover Sri Lanka through its culture, wildlife, landscapes, and cuisine with experiences designed to go beyond the usual tourist trail.</p>
              </div>
            </div>
          </div>

          <motion.button 
            onClick={() => navigate('/about')}
            className="w-full px-6 md:px-8 py-3 md:py-4 bg-white text-[#173036] font-bold text-sm md:text-base hover:bg-[#a7d9d5] transition-colors duration-300 shadow-lg shadow-black/20"
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
      <section className="relative overflow-hidden py-16 md:py-20 lg:py-24 bg-black/30">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-20">
          <motion.div className="text-center mb-8 md:mb-12" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <p className="section-label mb-2 text-white/85">Why Travellers Choose Us</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white">Real experiences & Unforgettable journeys.</h2>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div key={currentTestimonial} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {[0, 1].map((offset) => {
                  const index = (currentTestimonial + offset) % testimonials.length;
                  const t = testimonials[index];
                  return (
                    <motion.div key={`testimonial-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-6 md:p-8 shadow-lg shadow-black/20 backdrop-blur-sm" variants={cardItem}>
                      <motion.div whileHover={{ scale: 1.12, color: 'rgba(127, 181, 176, 0.5)' }}>
                        <Quote className="mb-4 md:mb-5 h-10 md:h-12 w-10 md:w-12 text-white/20" />
                      </motion.div>
                      <p className="text-sm md:text-base leading-6 md:leading-7 text-white/85 mb-6 md:mb-8">"{t.quote}"</p>
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="grid h-10 md:h-12 w-10 md:w-12 place-items-center rounded-full border border-white/10 bg-[#112738] text-xs md:text-base font-bold text-[#a7d9d5]">{t.name[0]}</div>
                        <div>
                          <p className="text-sm md:text-base font-semibold text-white">{t.name}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 md:mt-8 flex items-center justify-between">
              <motion.button onClick={() => setCurrentTestimonial((prev) => (prev - 2 + testimonials.length) % testimonials.length)} className="group rounded-full border border-white/20 bg-white/5 p-2 md:p-3 text-white hover:bg-white/10 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ChevronLeft className="h-4 md:h-5 w-4 md:w-5" />
              </motion.button>
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
                  <motion.button key={index} onClick={() => setCurrentTestimonial(index * 2)} className={`h-2 rounded-full transition-all ${index * 2 === currentTestimonial ? 'w-8 bg-[#a7d9d5]' : 'w-2 bg-white/20'}`} whileHover={{ scale: 1.2 }} />
                ))}
              </div>
              <motion.button onClick={() => setCurrentTestimonial((prev) => (prev + 2) % testimonials.length)} className="group rounded-full border border-white/20 bg-white/5 p-2 md:p-3 text-white hover:bg-white/10 transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <ChevronRight className="h-4 md:h-5 w-4 md:w-5" />
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
        <div className="md:hidden px-6 py-32">
          <div className="text-center mb-12">
            <p className="section-label mb-2 text-white/85 tracking-[0.3em] uppercase text-xs">Visual Journey</p>
            <h2 className="font-display text-4xl text-white">Sri Lanka in Focus</h2>
          </div>
          <MobileGallery />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-20 lg:py-24">
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
        <div className="relative mx-auto grid max-w-9xl grid-cols-1 gap-10 md:gap-12 lg:gap-16 px-4 sm:px-6 md:px-8 lg:px-20 lg:grid-cols-2">
          <motion.div variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <p className="section-label mb-2 md:mb-3 text-[#173036] font-semibold">You Asked, We Answer</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 md:mb-4">Everything You Need to Know About Travelling in Sri Lanka.</h2>
            <p className="mt-3 md:mt-4 max-w-lg text-sm md:text-base leading-6 md:leading-8 text-gray-600 mb-6 md:mb-8">
              Planning a trip to Sri Lanka? Here are the questions we get asked most often.
            </p>
            <motion.button onClick={() => navigate('/faq-policy')} className="inline-flex items-center gap-3 bg-[#173036] px-6 md:px-8 py-2.5 md:py-3 font-semibold text-white text-sm md:text-base shadow-md shadow-black/20" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              View Full FAQ
            </motion.button>
          </motion.div>

          <motion.div className="space-y-3 md:space-y-4 opacity-80" variants={staggerContainer(0.08, 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {generalCuriosities.map((faq, index) => (
              <motion.div key={faq.q} className="overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200" variants={cardItem} whileHover={{ y: -2 }}>
                <button className="flex w-full items-center justify-between px-4 md:px-6 py-3 md:py-4 text-left hover:bg-gray-50 transition-colors duration-200" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <span className="text-sm md:text-base font-semibold text-gray-900 pr-3 md:pr-4">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="flex-shrink-0">
                    <ChevronDown className="h-4 md:h-5 w-4 md:w-5 text-gray-700" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <div className="px-4 md:px-6 pb-3 md:pb-4 text-sm md:text-base leading-6 md:leading-7 text-gray-700 border-t border-gray-200 pt-3 md:pt-4">{faq.a}</div>
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
