import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { pageVariants, staggerContainer, fadeUp } from '../lib/motion';



// ── Main ThankYou page ────────────────────────────────────────────────────────
const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start start', 'end start'] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const cardY = useTransform(scrollYProgress, [0, 0.4], ['80px', '0px']);

  // If the user lands here without submitting (no state), redirect to inquiry
  const submittedEmail: string = location.state?.email ?? '';

  useEffect(() => {
    if (!submittedEmail) {
      navigate('/enquiry', { replace: true });
    }
  }, [submittedEmail, navigate]);

  // Lenis smooth scroll
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

  if (!submittedEmail) return null;

  return (
    <motion.div
      ref={pageRef}
      className="min-h-screen bg-white text-[#173036]"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* ── Hero banner ── */}
      <section className="relative overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/home/bentota.jpg)', y: heroImageY }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.04)_36%,rgba(255,255,255,0.22)_78%,rgba(255,255,255,0.52)_100%)]" />
          <motion.div
            className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-white/6 blur-3xl"
            animate={{ y: [0, 20, 0], opacity: [0.12, 0.24, 0.12] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <motion.div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-b from-transparent via-white/40 to-white" />
        {/* Spacer to give the hero some height */}
        <div className="relative h-64 sm:h-80 md:h-96" />
      </section>

      {/* ── Main content ── */}
      <section className="relative overflow-hidden bg-white -mt-20 sm:-mt-28 lg:-mt-40 z-20">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-[length:100%_100%] bg-no-repeat opacity-34"
            style={{ backgroundImage: 'url(/images/bg/bg-5.png)' }}
          />
          <div className="absolute inset-0 bg-[rgba(255,255,255,0.64)]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
            {/* ── Thank-you card ── */}
            <motion.div
              className="relative z-10 border border-slate-200 bg-white/95 backdrop-blur-sm px-6 pb-12 pt-10 shadow-2xl shadow-black/10 sm:px-12 sm:pb-16 lg:px-16 lg:pb-20 lg:pt-14 flex flex-col items-center text-center"
              style={{ y: cardY }}
              variants={staggerContainer(0.08, 0.03)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            >
              {/* Top success badge */}
              <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 mb-8">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.2 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200"
                >
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </motion.div>
                <p className="section-label text-[#173036] tracking-widest">Inquiry Submitted</p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-slate-900 leading-tight font-serif">
                  Thank You
                </h1>
                <p className="mt-4 text-xl sm:text-2xl font-light text-[#173036]/70 leading-snug">
                  Your journey to Sri Lanka starts here.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 space-y-5 text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
                <p>
                  We've received every detail of your trip request and our expert travel designers
                  are already thinking about your perfect Sri Lanka itinerary — crafted around your
                  style, budget, and interests.
                </p>
                <p>
                  A confirmation has been sent to <span className="font-semibold text-slate-900">{submittedEmail}</span>. Our team will be in touch within 24–48 hours.
                </p>
              </motion.div>

              {/* Elegant Image Grid */}
              <motion.div variants={fadeUp} className="mt-10 mb-2 w-full max-w-2xl mx-auto grid grid-cols-3 gap-3 sm:gap-5">
                <div className="h-32 sm:h-48 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
                  <img src="/images/destinations/galle-culture.webp" alt="Galle Culture" className="h-full w-full object-cover hover:scale-110 transition-transform duration-700 ease-out" />
                </div>
                <div className="h-40 sm:h-60 -mt-4 sm:-mt-6 relative z-10 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 border-4 border-white/80">
                  <img src="/images/destinations/beach-unawatuna.jpg" alt="Beaches" className="h-full w-full object-cover hover:scale-110 transition-transform duration-700 ease-out" />
                </div>
                <div className="h-32 sm:h-48 overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500">
                  <img src="/images/destinations/hidden-ella.jpg" alt="Hidden Ella" className="h-full w-full object-cover hover:scale-110 transition-transform duration-700 ease-out" />
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div variants={fadeUp} className="mt-12 flex flex-wrap justify-center gap-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-[#173036] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#173036]/20 hover:bg-[#1a4d56] transition-all duration-300 hover:scale-[1.02]"
                >
                  Back to Home
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
        </div>
      </section>


    </motion.div>
  );
};

export default ThankYou;
