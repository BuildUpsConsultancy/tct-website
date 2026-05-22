import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion, AnimatePresence,
  useScroll, useTransform, useMotionValue, animate,
} from 'framer-motion';
import {
  ArrowRight, ChevronDown, ChevronLeft, ChevronRight,
  Quote, Shield, Star, Users, Hotel, Plane,
} from 'lucide-react';

import { featuredDestinations } from '../data/destinations';
import { generalCuriosities } from '../data/generalCuriosities';
import { pageVariants, staggerContainer, cardItem, fadeUp, slideLeft, slideRight, scaleIn } from '../lib/motion';
import CardSwap, { Card } from '../components/CardSwap';

const stats = [
  { value: '18+', label: 'TOURS COMPLETED' },
  { value: '8+',  label: 'YEARS EXPERIENCE', icon: 'plane' },
  { value: '98%', label: 'HAPPY TRAVELLERS', icon: 'travelers' },
  { value: '69%', label: 'RETENTION RATIO', icon: 'retention' },
];

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

// ── COUNT-UP STAT ────────────────────────────────────────────────────────────
const CountUpStat = ({ stat }: { stat: { value: string; label: string; icon?: string } }) => {
  const numValue    = parseInt(stat.value);
  const suffix      = stat.value.replace(/[0-9]/g, '');
  const motionValue = useMotionValue(0);
  const displayValue = useTransform(motionValue, (latest) => `${Math.floor(latest)}${suffix}`);

  const getIcon = () => {
    switch (stat.icon) {
      case 'plane':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 text-white" width="55" height="55" viewBox="0 0 45 45" fill="currentColor">
            <path d="M35.1512 26.1785V22.8616H35.6609C37.2742 22.8616 38.5842 21.5516 38.5842 19.9449C38.5842 18.3317 37.2742 17.0216 35.6609 17.0216H30.3436V11.9947H37.0613C37.4227 11.9947 37.7066 11.7108 37.7066 11.3495C37.7069 11.2646 37.6904 11.1806 37.6581 11.1022C37.6257 11.0237 37.5782 10.9525 37.5182 10.8925C37.4583 10.8325 37.387 10.785 37.3086 10.7527C37.2302 10.7204 37.1461 10.7039 37.0613 10.7042H31.957C31.6214 5.76761 27.5108 1.85059 22.4839 1.85059C18.296 1.85059 14.6436 4.53503 13.4045 8.5359C13.0367 9.7233 13.5464 10.9945 14.6435 11.6269V17.0216H9.32619C8.94205 17.0208 8.56153 17.0958 8.20647 17.2424C7.85141 17.389 7.5288 17.6043 7.25718 17.8759C6.98555 18.1475 6.77026 18.4701 6.62367 18.8252C6.47707 19.1802 6.40206 19.5608 6.40294 19.9449C6.40294 21.5517 7.71287 22.8616 9.32619 22.8616H9.83604V26.1785C6.40303 27.8885 4.20251 31.4055 4.20251 35.2708V39.6008C4.20251 41.5561 5.79641 43.15 7.75171 43.15H37.2485C39.2038 43.15 40.7977 41.5561 40.7977 39.6008V35.2708C40.7976 31.4055 38.5907 27.8885 35.1512 26.1785ZM15.9341 11.9947H29.0531V17.2669C29.0531 19.0543 27.1688 21.5516 23.8778 24.12C23.4832 24.4304 22.9957 24.5991 22.4936 24.5991C21.9915 24.5991 21.504 24.4304 21.1094 24.12C20.335 23.5198 19.3607 22.6938 18.4572 21.7646L18.4507 21.7582C17.102 20.3643 15.9341 18.7382 15.9341 17.2669V11.9947ZM25.0393 24.8492V26.8109C25.0393 28.2177 23.897 29.3598 22.4968 29.3598C21.0577 29.3598 19.9479 28.1918 19.9479 26.8109V24.8428C21.7482 26.2882 23.3744 26.185 25.0393 24.8492ZM11.7461 41.8594H7.75163C6.50622 41.8594 5.4931 40.8463 5.4931 39.6008V35.2708C5.4931 31.5152 7.90007 27.9854 11.7461 26.798V41.8594ZM31.9505 41.8594H13.0367V26.5076C13.4691 26.4431 13.9143 26.3979 14.366 26.3979H18.6573V26.8109C18.6573 28.9017 20.3415 30.6505 22.4969 30.6505C24.6134 30.6505 26.3299 28.9275 26.3299 26.8109V26.3979H30.6276C31.0794 26.3979 31.5181 26.4431 31.9505 26.5076V41.8594ZM39.507 39.6008C39.507 40.8463 38.4938 41.8594 37.2484 41.8594H33.2411V26.798C37.0484 27.9725 39.507 31.4636 39.507 35.2708V39.6008Z"></path>
          </svg>
        );
      case 'travelers':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 text-white" width="55" height="55" viewBox="0 0 45 45" fill="currentColor">
            <g><path d="M38.0333 16.4395C38.3412 16.4394 38.6319 16.2974 38.8214 16.0547C39.0107 15.8121 39.0776 15.4959 39.003 15.1973L37.5909 9.54883C37.4796 9.10368 37.08 8.79105 36.6212 8.79102H8.37899C7.92011 8.79102 7.52055 9.10366 7.40926 9.54883L5.99715 15.1973C5.92256 15.4959 5.98936 15.812 6.17879 16.0547C6.3683 16.2974 6.65894 16.4395 6.96688 16.4395H38.0333ZM9.15926 10.791H35.8399L36.752 14.4395H8.24715L9.15926 10.791Z"></path><g><path d="M36.6209 10.791C36.9289 10.791 37.2195 10.649 37.409 10.4062C37.5984 10.1636 37.6652 9.84747 37.5907 9.54883V9.54688C37.5904 9.5458 37.5902 9.5441 37.5897 9.54199C37.5886 9.53763 37.5869 9.53098 37.5848 9.52246C37.5805 9.50533 37.5735 9.48005 37.5653 9.44727C37.5488 9.38137 37.525 9.28445 37.495 9.16406L36.6024 5.59375V5.59277C36.4298 4.90407 36.069 4.27658 35.5604 3.78125C35.0518 3.28608 34.4154 2.94228 33.7225 2.78809L23.9491 0.616211C23.5687 0.531687 23.2606 0.463331 23.0477 0.416016C22.9414 0.3924 22.8586 0.373787 22.8026 0.361328C22.7745 0.355098 22.7525 0.349873 22.7381 0.34668C22.7313 0.345176 22.7261 0.344541 22.7225 0.34375C22.721 0.343414 22.7195 0.342971 22.7186 0.342773H22.7166C22.5738 0.311048 22.4258 0.310103 22.283 0.341797V0.342773H22.2811C22.2802 0.342971 22.2787 0.343411 22.2772 0.34375C22.2736 0.34454 22.2683 0.345175 22.2616 0.34668C22.2472 0.349873 22.2251 0.355098 22.1971 0.361328C22.141 0.373787 22.0583 0.392397 21.952 0.416016C21.739 0.46333 21.431 0.531686 21.0506 0.616211L11.2772 2.78809C10.5843 2.94228 9.94787 3.28608 9.43929 3.78125C8.93063 4.27658 8.56983 4.90407 8.3973 5.59277V5.59375L7.50472 9.16406C7.47463 9.28445 7.45088 9.38137 7.43441 9.44727C7.42621 9.48005 7.41916 9.50533 7.41487 9.52246C7.41274 9.53098 7.41108 9.53763 7.40999 9.54199C7.40946 9.5441 7.40928 9.5458 7.40901 9.54688V9.54883C7.33443 9.84748 7.40123 10.1636 7.59066 10.4062C7.78016 10.649 8.07081 10.791 8.37874 10.791H36.6209ZM9.68734 8.67969C9.88241 7.89919 10.1299 6.91098 10.3377 6.0791L10.3719 5.95703C10.4633 5.67629 10.6224 5.42171 10.8348 5.21484C11.0775 4.97846 11.381 4.81382 11.7117 4.74023C13.444 4.35511 16.1954 3.74364 18.5135 3.22852C19.6725 2.97097 20.7232 2.73746 21.4842 2.56836C21.8645 2.48385 22.1726 2.41548 22.3856 2.36816C22.4272 2.35891 22.4656 2.35038 22.4998 2.34277C22.534 2.35037 22.5724 2.35891 22.6141 2.36816C22.827 2.41548 23.1352 2.48386 23.5155 2.56836C24.2765 2.73746 25.3272 2.97097 26.4862 3.22852C28.8043 3.74365 31.5557 4.35511 33.2879 4.74023L33.411 4.77246C33.6938 4.85644 33.9526 5.00811 34.1649 5.21484C34.4076 5.45122 34.5796 5.75046 34.6619 6.0791C34.8698 6.91098 35.1173 7.89919 35.3123 8.67969C35.3217 8.71716 35.3306 8.75454 35.3397 8.79102H9.65999C9.66911 8.75454 9.67797 8.71716 9.68734 8.67969Z"></path><path d="M33.0908 24.9121C35.9799 24.9121 37.4763 24.1179 38.8564 23.3818C40.124 22.7058 41.2754 22.0879 43.6816 22.0879C44.086 22.0878 44.4506 21.8443 44.6054 21.4707C44.7602 21.0971 44.6746 20.6669 44.3886 20.3809L38.7402 14.7324C38.5527 14.5449 38.2983 14.4395 38.0332 14.4395H6.96676C6.70155 14.4395 6.44726 14.5449 6.25973 14.7324L0.611293 20.3809C0.325315 20.6669 0.23972 21.097 0.394496 21.4707C0.549318 21.8443 0.913924 22.0879 1.31832 22.0879C3.72449 22.0879 4.87591 22.7058 6.14352 23.3818C7.52358 24.1179 9.02 24.9121 11.9091 24.9121C14.7983 24.9121 16.2947 24.1179 17.6748 23.3818C18.9424 22.7058 20.0938 22.0879 22.5 22.0879C24.9061 22.0879 26.0576 22.7058 27.3252 23.3818C28.7052 24.1179 30.2017 24.9121 33.0908 24.9121ZM33.0908 22.9121C30.6846 22.9121 29.5332 22.2933 28.2656 21.6172C26.8856 20.8812 25.3889 20.0879 22.5 20.0879C19.6111 20.0879 18.1143 20.8812 16.7343 21.6172C15.4667 22.2933 14.3153 22.9121 11.9091 22.9121C9.50298 22.9121 8.35156 22.2933 7.08395 21.6172C6.11129 21.0984 5.08017 20.5533 3.54489 20.2754L7.38082 16.4395H37.6191L41.4541 20.2754C39.919 20.5534 38.8876 21.0984 37.915 21.6172C36.6475 22.2932 35.4968 22.9121 33.0908 22.9121Z"></path><path d="M22.4994 44.6807C23.2757 44.6808 24.0347 44.4517 24.6801 44.0205C25.3255 43.5893 25.8285 42.976 26.1254 42.2588C26.4225 41.5417 26.5005 40.7525 26.349 39.9912C26.1976 39.2301 25.8236 38.5312 25.2748 37.9824L23.9135 36.6221L36.144 24.3916C36.5345 24.0011 36.5345 23.3671 36.144 22.9766C35.7535 22.5864 35.1204 22.5864 34.7299 22.9766L22.4994 35.208L10.2699 22.9766C9.87949 22.5864 9.24634 22.5864 8.85588 22.9766C8.46536 23.3671 8.46536 24.0011 8.85588 24.3916L21.0854 36.6221L19.725 37.9824C19.1762 38.5312 18.8023 39.2301 18.6508 39.9912C18.4994 40.7524 18.5765 41.5418 18.8735 42.2588L18.9946 42.5225C19.2986 43.1263 19.7549 43.6431 20.3197 44.0205C20.965 44.4515 21.7235 44.6807 22.4994 44.6807ZM22.4994 42.6816C22.1189 42.6817 21.7465 42.5688 21.4301 42.3574C21.1139 42.1461 20.8677 41.8455 20.7221 41.4941V41.4932C20.5765 41.1416 20.5376 40.755 20.6117 40.3818C20.686 40.0085 20.8699 39.6656 21.1391 39.3965L22.4994 38.0361L23.8608 39.3965C24.1299 39.6656 24.3129 40.0085 24.3871 40.3818C24.4613 40.755 24.4234 41.1416 24.2778 41.4932V41.4941C24.1321 41.8456 23.8851 42.146 23.5688 42.3574C23.2525 42.5687 22.8808 42.6817 22.5004 42.6816H22.4994Z"></path></g></g>
          </svg>
        );
      case 'retention':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 text-white" width="55" height="55" viewBox="0 0 45 45" fill="currentColor">
            <path d="M18.9117 14.3766C18.9382 14.3657 19.5657 14.1034 19.8841 14.4911C19.9487 14.5704 20.0284 14.6362 20.1186 14.6845C20.2088 14.7329 20.3077 14.7629 20.4096 14.7728C20.5114 14.7827 20.6142 14.7723 20.712 14.7423C20.8099 14.7122 20.9008 14.6631 20.9795 14.5977C21.139 14.4667 21.2398 14.2777 21.26 14.0723C21.2801 13.8669 21.2179 13.6619 21.0869 13.5023C20.2259 12.4536 18.8712 12.6849 18.2772 12.9542C18.0907 13.0387 17.9452 13.1936 17.8726 13.385C17.7999 13.5764 17.806 13.7887 17.8894 13.9757C18.0607 14.3681 18.5201 14.5448 18.9117 14.3766Z"/>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 text-white" width="55" height="55" viewBox="0 0 55 55" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M48.3953 19.3234C46.5928 21.0856 49.1783 24.8855 45.1628 27.3609C42.8491 28.7873 46.4538 31.6364 45.1628 34.9688C44.9762 35.4504 44.938 35.9362 45.2063 36.4593C42.0435 38.8936 38.0818 40.3413 33.7819 40.3413C32.6391 40.3413 31.5202 40.2389 30.4337 40.043L30.0167 41.4955C31.2582 41.7286 32.5188 41.8457 33.782 41.8452C44.9663 41.8452 54.0332 32.7783 54.0332 21.5941C54.0332 10.4098 44.9663 1.34277 33.7819 1.34277C29.4125 1.34277 25.1885 2.74141 21.6888 5.35111C24.3124 9.39308 24.2598 14.705 21.5556 18.6946C22.5728 20.4768 24.035 20.5296 24.6011 20.7501C26.7583 21.591 28.3803 26.5747 29.7306 28.1757C31.6603 27.0616 33.7557 26.7059 35.9213 27.385C35.5639 25.6287 33.5082 23.6465 32.8831 23.0953C30.6562 21.132 31.5914 20.176 33.345 19.6904C35.3627 19.1317 38.4639 19.1959 39.0785 19.0651C40.5177 18.7589 40.9324 17.7467 39.8315 16.7925C38.5393 15.6725 36.2766 14.4403 35.7499 13.4377C35.0217 12.0512 35.5506 11.6375 36.4901 11.347C38.3992 10.7566 42.0025 10.6734 40.2002 3.97439C46.4804 6.26248 51.1061 11.765 52.2518 18.3652C50.1517 18.3532 49.0145 18.718 48.3953 19.3234ZM7.92247 45.6491L1.71875 40.5901L3.98342 39.0886L10.0496 41.2748L30.9044 29.2343C34.3621 27.238 41.2161 29.9589 34.6547 33.7471L29.8863 36.5002L25.452 51.9436L22.4839 53.6572L22.6915 40.5937C22.6915 40.5937 10.2446 47.4544 7.92247 45.6491ZM11.5466 1.34277C17.3893 1.34277 22.1263 6.07965 22.1263 11.9225C22.1263 17.7654 17.3895 22.5023 11.5466 22.5023C5.70378 22.5023 0.966797 17.7653 0.966797 11.9225C0.966797 6.07976 5.70378 1.34277 11.5466 1.34277ZM5.09448 18.3054C5.5376 15.1383 8.25752 12.7006 11.5467 12.7006C14.8359 12.7006 17.5554 15.1382 17.9985 18.3054C19.6206 16.666 20.6223 14.4113 20.6223 11.9225C20.6223 6.90991 16.5591 2.84668 11.5465 2.84668C6.53394 2.84668 2.4707 6.90991 2.4707 11.9225C2.4707 14.4113 3.47252 16.6659 5.09448 18.3054ZM8.53531 7.95373C8.53531 9.61694 9.88356 10.9652 11.5468 10.9652C13.21 10.9652 14.5582 9.61694 14.5582 7.95373C14.5582 6.29095 13.21 4.9427 11.5468 4.9427C9.88356 4.9428 8.53531 6.29095 8.53531 7.95373ZM9.88088 31.828L12.8488 30.1144L22.298 32.4668L16.7678 35.6596L9.88088 31.828ZM16.8012 29.5485C15.9014 27.6309 15.3353 25.5737 15.1273 23.4657C14.6436 23.6154 14.1511 23.7346 13.6525 23.8224C13.8498 25.6299 14.2911 27.4023 14.9644 29.0912L16.8012 29.5485Z"></path>
          </svg>
        );
    }
  };

  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isInView) {
        setIsInView(true);
        animate(motionValue, numValue, { duration: 2.5 });
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isInView, motionValue, numValue]);

  return (
    <motion.div
      ref={ref}
      key={stat.label}
      className="rounded-xl px-2 py-8"
      variants={scaleIn}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      {getIcon()}
      <motion.h2 className="font-display text-4xl font-black text-white md:text-5xl">
        {displayValue}
      </motion.h2>
      <h2 className="section-label mt-1 text-[20px] font-bold text-white/80">{stat.label}</h2>
    </motion.div>
  );
};

// ── HOME PAGE ────────────────────────────────────────────────────────────────
const Home = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY    = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpac = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 2) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
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
            <motion.h1 variants={fadeUp} className="font-display text-5xl font-black leading-[0.92] text-tct-white md:text-6xl">
              The Coconut Tree Trails
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-7 text-white/85 md:text-lg">
              Travel Sri Lanka with people who know it. Tailor-made tours rooted in local expertise, genuine hospitality, and a deep love for this island paradise.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-4 flex items-center gap-3 text-sm text-white/60">
              <Shield className="h-4 w-4 text-[#a7d9d5]" />
              <span>UK-standard service · Local Sri Lankan expertise · 8+ years experience</span>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <motion.button onClick={() => navigate('/packages')} className="rounded-full bg-[#fbf6e8] px-10 py-4 text-base font-semibold text-[#06142a] shadow-xl shadow-black/20" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                Explore Packages
              </motion.button>
              <motion.button onClick={() => navigate('/contact')} className="rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white" whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.1)' }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                Plan My Trip
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div className="relative hidden h-[680px] lg:block" variants={staggerContainer(0.15, 0.4)} initial="hidden" animate="show">
            <motion.div variants={slideRight} className="absolute right-16 top-10 w-[350px] rotate-6 rounded-2xl border-4 border-[#a7d9d5]/60 bg-[#13212d] shadow-2xl shadow-black/50" whileHover={{ rotate: 3, y: -8, scale: 1.04, transition: { duration: 0.3 } }}>
              <div className="overflow-hidden rounded-[14px]">
                <img src="/images/home/kandy.jpg" alt="Kandy, Sri Lanka" className="h-[340px] w-full object-cover" />
              </div>
              <div className="px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#a7d9d5]/70">Featured</p>
                <p className="text-base font-semibold text-white">Sigiriya, Sri Lanka</p>
              </div>
            </motion.div>
            <motion.div variants={scaleIn} className="absolute right-36 top-34 w-[290px] -rotate-12 rounded-2xl bg-[#0f1f2e] shadow-2xl shadow-black/50" whileHover={{ rotate: -9, y: -8, scale: 1.04, transition: { duration: 0.3 } }}>
              <div className="overflow-hidden rounded-2xl border-4 border-[#1f3b52]">
                <img src="/images/home/The-best-things-to-do-in-Ella-Sri-Lanka.jpg" alt="Ella, Sri Lanka" className="h-[340px] w-full object-cover" />
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="absolute right-10 top-48 w-[260px] -rotate-2 overflow-hidden rounded-2xl bg-[#121d28] shadow-2xl shadow-black/50" whileHover={{ rotate: 0, y: -8, scale: 1.04, transition: { duration: 0.3 } }}>
              <img src="/images/home/yala.jpg" alt="Yala, Sri Lanka" className="h-[340px] w-full object-cover" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── DESTINATIONS ─────────────────────────────────────── */}
      <section 
        className="relative overflow-hidden py-20 bg-[#173036]"
      >
        {/* Background overlay for text readability - Top (Mirrored) */}
        {/* <div className="absolute inset-0" style={{
          backgroundImage: 'url(/images/image-4-new.png)',
          backgroundPosition: 'center 423px',
          backgroundRepeat: 'repeat-x',
          filter: 'brightness(0.5)',
          transform: 'scaleY(-1)',
        }} /> */}
        {/* Background overlay for text readability - Bottom (Normal) */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'url(/images/image-4-new.png)',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'repeat-x',
          filter: 'brightness(0.5)',
        }} />
        <div className="relative mx-auto max-w-9xl px-20 z-10">
          <motion.div className="mb-8 flex items-end justify-between" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <div>
              <p className="section-label mb-2 text-white/85">Top Destinations</p>
              <h2 className="font-display text-4xl text-tct-white md:text-5xl">Explore Sri Lanka</h2>
            </div>
            <motion.button onClick={() => navigate('/destinations')} className="text-sm text-white/90" whileHover={{ x: 4, textDecoration: 'underline' }} transition={{ duration: 0.2 }}>
              Explore All
            </motion.button>
          </motion.div>

          <motion.div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" variants={staggerContainer(0.1)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {featuredDestinations.map((destination) => (
              <motion.button key={destination.slug} type="button" onClick={() => navigate(`/destinations/${destination.slug}`)} className="group relative w-full overflow-hidden h-[450px] shadow-lg shadow-black/25" variants={cardItem} whileHover={{ y: -8, transition: { duration: 0.3 } }}>
                <motion.img src={destination.image} alt={destination.alt} className="absolute inset-0 h-full w-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-5 pb-6 pt-12 text-center">
                  <h3 className="text-2xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#f7f2e9]">{destination.title}</h3>
                  <p className="mt-2 text-base font-medium text-white/90">{destination.subtitle}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-4 bg-black/30">
        <motion.div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 text-center md:grid-cols-4" variants={staggerContainer(0.12)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
          {stats.map((stat) => <CountUpStat key={stat.label} stat={stat} />)}
        </motion.div>
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
        
        <div className="relative mx-auto grid max-w-9xl grid-cols-1 items-center gap-10 px-20 lg:grid-cols-2 pr-40">
          <motion.div variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <p className="section-label mb-3 text-white/85">Tailor-Made for You</p>
            <h2 className="font-display text-5xl font-bold leading-tight text-tct-white md:text-6xl">Sri Lanka<br />Your Way</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/85 md:text-base">
              From ancient temples and wildlife safaris to misty tea estates and sun-soaked beaches — our curated packages give you the real Sri Lanka, guided by people who live and breathe this island every day.
            </p>
            <motion.button onClick={() => navigate('/packages')} className="btn-primary mt-8 px-7 py-4 text-sm" whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
              Browse All Packages
            </motion.button>
          </motion.div>

          <div className="relative w-full h-[600px] -mt-20 mr-40">
            <CardSwap
              width={520}
              height={600}
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
      <section className="relative overflow-hidden py-24 bg-black/30">
        <div className="relative mx-auto max-w-9xl px-20">
          <motion.div className="text-center" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <p className="section-label mb-2 text-white/85">Your Trusted Partner</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">Authentic Sri Lanka</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/75">
              Every service we offer is rooted in genuine local knowledge and a commitment to making your Sri Lanka experience as real, safe, and memorable as possible.
            </p>
          </motion.div>

          <motion.div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" variants={staggerContainer(0.09, 0.15)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {services.map((service) => {
              const getServiceIcon = () => {
                const iconProps = { className: 'h-8 w-8', fill: 'currentColor' };
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
                <motion.div key={service.title} className="group rounded-2xl border border-white/10 bg-[#173036] p-6 shadow-lg shadow-black/20 backdrop-blur-sm" variants={cardItem} whileHover={{ y: -8, borderColor: 'rgba(127, 181, 176, 0.4)', backgroundColor: 'rgba(24, 50, 70, 0.9)', transition: { duration: 0.3 } }}>
                  <div className="mb-6 text-[#a7d9d5]">{getServiceIcon()}</div>
                  <h3 className="mb-3 text-xl font-bold text-white group-hover:text-[#f5f0e8] transition-colors duration-300">{service.title}</h3>
                  <p className="text-sm leading-7 text-white/80">{service.desc}</p>
                </motion.div>
              );
            })}
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
                          <div className="flex gap-0.5 text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                          </div>
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
      <section className="relative overflow-hidden py-24 bg-black/30">
        <div className="relative mx-auto grid max-w-9xl grid-cols-1 gap-10 px-20 lg:grid-cols-2">
          <motion.div variants={slideLeft} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}>
            <p className="section-label mb-3 text-white/85">You Asked, We Answer</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">Quick Answers for Smart Travellers</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/85 md:text-base">
              Planning a trip to Sri Lanka? Here are the questions we get asked most often — answered honestly by our team.
            </p>
            <motion.button onClick={() => navigate('/faq-policy')} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white" whileHover={{ x: 4, textDecoration: 'underline' }}>
              View full FAQ &amp; Policy <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>

          <motion.div className="space-y-3" variants={staggerContainer(0.08, 0.2)} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
            {generalCuriosities.map((faq, index) => (
              <motion.div key={faq.q} className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1b2a]/90 shadow-lg shadow-black/20" variants={cardItem} whileHover={{ borderColor: 'rgba(255,255,255,0.2)', y: -2, transition: { duration: 0.2 } }}>
                <button className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors duration-200" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                  <span className="text-sm font-semibold text-white">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                    <ChevronDown className="h-4 w-4 text-white/70 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div key="answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <div className="px-5 pb-5 text-sm leading-7 text-white/80 border-t border-white/5 pt-3">{faq.a}</div>
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
