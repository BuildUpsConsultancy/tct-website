import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { pageVariants, staggerContainer, cardItem, fadeUp, slideRight, } from '../lib/motion';

const aboutValues = [
  { iconType: 'safety',     title: 'Safety First',      desc: 'Your safety is our highest priority. Every itinerary we build is assessed for local conditions, road safety, and accommodation standards — giving you and your family complete peace of mind.' },
  { iconType: 'expertise',  title: 'Local Expertise',   desc: 'Our guides and planners are Sri Lankan-born, with deep knowledge of every region, community, and hidden gem on this island. You get the island as insiders know it.' },
  { iconType: 'support',    title: 'Dedicated Support', desc: 'From first enquiry to safe return, our team is available to handle your questions, adjust your plans, and support you through every stage of your journey.' },
  { iconType: 'quality',    title: 'Quality Promise',   desc: 'We operate to UK travel industry standards across accommodation selection, transport quality, and guide training — so every experience consistently exceeds expectations.' },
];

// Image slider data
const heroSliderImages = [
  '/images/home/bentota.jpg',
  '/images/home/jaffna.jpg',
  '/images/home/kandy.jpg',
];

const About = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);

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

  // Image slider auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroSliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroSliderImages.length) % heroSliderImages.length);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroSliderImages.length);
  };

  return (
    <motion.div
      className="min-h-screen bg-[#06142a] text-white"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden pt-24 bg-gradient-to-b from-slate-50 to-white">
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

        <div className="relative mx-auto max-w-9xl px-4 sm:px-8 lg:px-20 py-10 md:py-14 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">

            <motion.div
              className="max-w-xl"
              variants={staggerContainer(0.12, 0.1)}
              initial="hidden"
              animate="show"
            >
              <motion.p variants={fadeUp} className="section-label text-[#173036]">
                About Us
              </motion.p>
              <motion.h1 variants={fadeUp} className="max-w-xl text-5xl font-extrabold leading-[0.95] md:text-7xl">
                <span className="block text-slate-900">We Are</span>
                <span className="block text-slate-900">Coconut Tree</span>
                <span className="block text-slate-900">Trails</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
                We help people discover Sri Lanka properly — with local knowledge, thoughtful planning, and genuine Sri Lankan hospitality. We specialise in private, tailor-made tours that go beyond the obvious tourist trail.
              </motion.p>
              <motion.button
                variants={fadeUp}
                onClick={() => navigate('/contact')}
                className="mt-8 bg-[#173036] px-7 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#1a4d56] hover:shadow-md hover:scale-105"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                Start Your Story
              </motion.button>
            </motion.div>

            {/* Right — image slider */}
            <motion.div
              className="relative h-[430px] md:h-[480px] lg:h-[520px]"
              variants={slideRight}
              initial="hidden"
              animate="show"
            >
              <motion.div
                className="absolute right-0 top-2 h-[420px] w-[86%] border-2 border-slate-200 bg-slate-100 shadow-2xl shadow-black/30 overflow-hidden relative"
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ duration: 0.4 }}
              >
                {/* Image Slider */}
                {heroSliderImages.map((image, index) => (
                  <motion.img
                    key={index}
                    src={image}
                    alt="About hero"
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                
                {/* Slider Controls */}
                <button
                  onClick={goToPreviousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center bg-white/20 backdrop-blur-md transition hover:bg-white/40"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center bg-white/20 backdrop-blur-md transition hover:bg-white/40"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>
                
                {/* Slider Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                  {heroSliderImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 transition-all ${
                        index === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-24 min-h-[580px] flex items-center bg-white">
        <div className="absolute inset-0 bg-cover bg-center opacity-8" style={{ backgroundImage: 'url(/images/updated.jpeg)' }} />
        <div className="relative mx-auto max-w-9xl px-4 sm:px-8 lg:px-20">
          <motion.div
            className="text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="mb-2 section-label text-[#173036]">Why Choose Us</p>
            <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">The Coconut Tree Trails Difference</h2>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {aboutValues.map(({ iconType, title, desc }) => {
              const getIcon = () => {
                const iconProps = { className: 'h-8 w-8 mb-5', fill: 'currentColor' };
                switch (iconType) {
                  case 'safety':
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.5v5.32c0 4.75-2.85 9.02-7 10.28-4.15-1.26-7-5.53-7-10.28V6.68l7-3.5z"/></svg>;
                  case 'expertise':
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>;
                  case 'support':
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12h-8v-2h8v2zm0-3h-8V9h8v2zm0-3H4V9h14v2z"/></svg>;
                  case 'quality':
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>;
                  default:
                    return null;
                }
              };
              return (
                <motion.div
                  key={title}
                  className="border border-slate-200 bg-white p-6 transition-all duration-300 hover:border-[#a7d9d5] hover:bg-[#a7d9d5]/5 hover:shadow-lg"
                  variants={cardItem}
                  whileHover={{
                    borderTopColor: 'rgba(167, 217, 213, 0.7)',
                    backgroundColor: 'rgba(167, 217, 213, 0.05)',
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="text-[#173036]">
                    {getIcon()}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-slate-900">{title}</h3>
                  <p className="text-sm leading-7 text-slate-600">{desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── GALLERY SCROLL ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-9xl px-4 sm:px-8 lg:px-20">
          <motion.div
            className="text-center mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="mb-2 section-label text-[#173036]">Gallery</p>
            <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">Moments from Coconut Tree</h2>
          </motion.div>

          {/* Infinite Scrolling Gallery */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6 w-max"
              animate={{ x: [0, -4056] }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {/* Original set */}
              {[
                '/images/gallery/gallery_01.jpg',
                '/images/gallery/gallery_02.jpg',
                '/images/gallery/gallery_09.jpg',
                '/images/gallery/gallery_04.jpg',
                '/images/gallery/gallery_05.jpg',
                '/images/gallery/gallery_10.jpg',
                '/images/gallery/gallery_07.jpg',
                '/images/gallery/gallery_08.jpg',
              ].map((image, index) => (
                <div
                  key={`original-${index}`}
                  className="relative h-100 w-96 flex-shrink-0 overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              ))}

              {/* Duplicate set for infinite loop */}
              {[
                '/images/gallery/gallery_01.jpg',
                '/images/gallery/gallery_02.jpg',
                '/images/gallery/gallery_09.jpg',
                '/images/gallery/gallery_04.jpg',
                '/images/gallery/gallery_05.jpg',
                '/images/gallery/gallery_10.jpg',
                '/images/gallery/gallery_07.jpg',
                '/images/gallery/gallery_08.jpg',
              ].map((image, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="relative h-100 w-96 flex-shrink-0 overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-20 md:py-24">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url(/images/updated.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent" />
        <motion.div
          className="relative mx-auto max-w-3xl px-6 text-center"
          variants={staggerContainer(0.15, 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeUp} className="mb-2 section-label text-[#173036]">
            Let's Begin Your Adventure
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold text-slate-900 md:text-5xl">
            Ready to Discover Sri Lanka?
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg leading-8 text-slate-600 md:text-xl">
            Our travel experts are ready to craft your perfect itinerary. Get in touch to start planning your unforgettable Sri Lankan adventure.
          </motion.p>
          <motion.button
            variants={fadeUp}
            onClick={() => navigate('/contact')}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            className="mt-8 bg-[#173036] px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-[#1a4d56] hover:shadow-md"
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default About;
