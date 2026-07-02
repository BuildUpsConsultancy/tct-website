import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import Reveal from '../components/Reveal';

const sections = [
  {
    num: "1",
    title: "Scope",
    content: "This Privacy Policy explains how we collect, use, store and protect personal information when you visit our website or use our services."
  },
  {
    num: "2",
    title: "Information We Collect",
    content: "We may collect names, addresses, email addresses, telephone numbers, nationality, passport details where required, travel preferences, emergency contacts, payment references, browser information, cookies and correspondence."
  },
  {
    num: "3",
    title: "Lawful Basis",
    content: "We process data to perform contracts, respond to enquiries, comply with legal obligations, pursue legitimate business interests and where required, with your consent."
  },
  {
    num: "4",
    title: "How We Use Data",
    content: "To prepare quotations, arrange bookings, communicate updates, provide customer support, improve services, prevent fraud, comply with legal requirements and send marketing where consent exists."
  },
  {
    num: "5",
    title: "Sharing Data",
    content: "Information may be shared only with hotels, transport companies, guides, payment providers, IT providers and public authorities where necessary to fulfill your bookings and comply with legal mandates."
  },
  {
    num: "6",
    title: "International Transfers",
    content: "Where suppliers are located outside your country, information may be transferred only as required to fulfil your booking and ensure safe travel arrangements."
  },
  {
    num: "7",
    title: "Cookies",
    content: "Our website uses cookies for functionality, analytics and performance. You can manage cookies through your browser settings, though some features may be limited as a result."
  },
  {
    num: "8",
    title: "Data Security",
    content: "Reasonable administrative, organisational and technical safeguards are used to protect personal information from unauthorized access, loss, or disclosure."
  },
  {
    num: "9",
    title: "Data Retention",
    content: "Information is retained only as long as reasonably necessary for business, legal and accounting purposes, after which it is securely deleted or anonymized."
  },
  {
    num: "10",
    title: "Your Rights",
    content: "Where applicable you may request access, correction, deletion, restriction, portability or object to processing by contacting us at info@thecoconuttreetrails.com."
  },
  {
    num: "11",
    title: "Marketing",
    content: "You may unsubscribe from promotional emails at any time using the unsubscribe link inside the email or by contacting us directly."
  },
  {
    num: "12",
    title: "Children's Privacy",
    content: "We do not knowingly collect children's information except where necessary to arrange family travel and with parental or guardian consent."
  },
  {
    num: "13",
    title: "Updates",
    content: "This Policy may be updated periodically. The latest version will always appear on our website with the updated revision date."
  }
];

const PrivacyPolicy = () => {
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
            Legal & Privacy
          </div>
          <h1 className="font-display text-4xl font-bold text-slate-900 sm:text-5xl">Privacy Policy</h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            This Policy details our commitment to protecting your personal data, detailing how information is collected, processed, and secured in accordance with legal and operational guidelines.
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
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
