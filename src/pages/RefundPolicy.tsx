import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import Reveal from '../components/Reveal';

const sections = [
  {
    num: "1",
    title: "Overview",
    content: "This policy explains refunds for tours, accommodation, transport, transfers and travel services booked through The Coconut Tree Trails."
  },
  {
    num: "2",
    title: "Deposits",
    content: "Deposits are generally non-refundable because they secure services with third-party suppliers unless otherwise agreed in writing by us."
  },
  {
    num: "3",
    title: "Customer Cancellation Charges",
    content: "Our standard cancellation fees are as follows:\n• More than 30 days before departure: Full refund less non-refundable deposits and supplier fees.\n• 15–30 days before departure: 50% refund after supplier charges.\n• Less than 15 days before departure: Normally no refund can be offered."
  },
  {
    num: "4",
    title: "Tailor-Made Tours",
    content: "Custom itineraries often include non-refundable hotel block bookings, activities, or flight bookings. Actual supplier charges will apply in all circumstances."
  },
  {
    num: "5",
    title: "Flights",
    content: "Flights booked through third parties remain subject to airline-specific fare rules and cancellation policies."
  },
  {
    num: "6",
    title: "Company Cancellation",
    content: "If we cancel a tour due to reasons within our control, customers will have the choice between a full refund or an alternative tour of equal value."
  },
  {
    num: "7",
    title: "Force Majeure",
    content: "Natural disasters, epidemics, government restrictions, terrorism, industrial action and severe weather are outside our control. We will seek refunds or credits from suppliers but cannot guarantee full reimbursement."
  },
  {
    num: "8",
    title: "Unused Services",
    content: "No refunds are given for missed meals, accommodation, transport, or activities after travel has commenced."
  },
  {
    num: "9",
    title: "Refund Method & Timing",
    content: "Approved refunds are returned via the original payment method within approximately 14–28 business days, subject to standard banking times."
  },
  {
    num: "10",
    title: "Contact",
    content: "Please email your refund requests and supporting documentation directly to info@thecoconuttreetrails.com."
  }
];

const RefundPolicy = () => {
  const heroRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white">
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

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-28">
        {/* Header Block */}
        <Reveal className="mb-10 border border-slate-200 bg-white p-8 shadow-lg" animation="fade-up">
          <div className="mb-4 inline-flex items-center gap-2 border border-[#a7d9d5]/40 bg-[#173036] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            Refund Center
          </div>
          <h1 className="font-display text-4xl font-bold text-slate-900 sm:text-5xl">Refund Policy</h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            This Policy details our cancellation terms, supplier charge rules, and how we handle refunds for tour and travel booking cancellations.
          </p>

          {/* Metadata Grid */}
          <div className="mt-8 grid gap-4 border-t border-[#a7d9d5] pt-6 sm:grid-cols-2 md:grid-cols-4">
            <div className="flex items-center gap-2.5 text-slate-700">
              <div className="text-xs">
                <span className="block text-[#173036] font-bold uppercase tracking-wider mb-4">Company</span>
                <span className="font-semibold text-white bg-[#173036] p-3">The Coconut Tree Trails (PVT) Ltd</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <div className="text-xs">
                <span className="block text-[#173036] font-bold uppercase tracking-wider mb-4">Website</span>
                <a href="https://www.thecoconuttreetrails.com" className="font-semibold text-[#173036] bg-[#a7d9d5] p-3">www.thecoconuttreetrails.com</a>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <div className="text-xs">
                <span className="block text-[#173036] font-bold uppercase tracking-wider mb-4">Email Support</span>
                <a href="mailto:info@thecoconuttreetrails.com" className="font-semibold text-white bg-[#173036] p-3">info@thecoconuttreetrails.com</a>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700">
              <div className="text-xs">
                <span className="block text-[#173036] font-bold uppercase tracking-wider mb-4">Last Updated</span>
                <span className="font-semibold text-[#173036] bg-[#a7d9d5] p-3">July 2026</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Content list */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Reveal key={section.title} animation="fade-up" delay={index * 50}>
              <div className="border border-slate-200 bg-white p-6 transition hover:border-[#a7d9d5] hover:shadow-md flex gap-4 items-start">
                <div>
                  <h2 className="inline-block font-display text-xl tracking-wider font-semibold text-white mb-2 bg-[#173036] px-2 py-1">
                    {section.title}
                  </h2>
                  <div className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
