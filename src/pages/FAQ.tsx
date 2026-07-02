import { useState, useRef, useEffect } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import Reveal from '../components/Reveal';

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: 'How do I book a tour with The Coconut Tree Trails?',
    answer:
      'Browse our tour packages, select the one that interests you, choose your travel date and group size, then click Book Now. You can also use the Send Inquiry option if you want a tailor-made itinerary. Our team will respond within one business day.',
  },
  {
    question: 'Do I need an ETA or visa to visit Sri Lanka?',
    answer:
      'Yes, most nationalities including UK, US, and EU citizens require an Electronic Travel Authorization (ETA) to enter Sri Lanka. We provide complete visa assistance as part of our service. You can apply online at eta.gov.lk or let our team guide you through the process.',
  },
  {
    question: 'Are international flights included in your packages?',
    answer:
      'International flights are not included in our tour packages. Our packages cover in-country transport, accommodation, meals as specified, and all guided activities. We can assist with flight recommendations and booking upon request.',
  },
  {
    question: 'What is your cancellation and refund policy?',
    answer:
      'Cancellations made 30 or more days before departure are eligible for a full refund (minus a small admin fee). Cancellations made 15–29 days prior receive a 50% refund. Cancellations under 15 days before departure are non-refundable. For full terms, please see the Policy section below.',
  },
  {
    question: 'Can I add multiple packages or combine tours?',
    answer:
      'Yes. You can book multiple packages across different dates with a custom itinerary we build for you. Use the Send Inquiry option on any package page or contact us directly and we’ll design a combined Sri Lanka experience tailored to your interests.',
  },
  {
    question: 'What should I pack for a Sri Lanka holiday?',
    answer:
      'Pack lightweight cotton clothing for the heat and humidity, comfortable walking shoes for heritage sites, modest attire (shoulders and knees covered) for temple visits, high-SPF sunscreen, insect repellent, and a light rain jacket for hill country. We’ll share a detailed packing guide after your booking.',
  },
];

// type PolicySection = {
//   title: string;
//   description: string;
// };

// const policySections: PolicySection[] = [
//   {
//     title: 'Booking Confirmation',
//     description:
//       'A booking is confirmed once it is submitted through our Book Now flow and you receive a confirmation email from our team. Full payment or a deposit may be required to secure your dates.',
//   },
//   {
//     title: 'Date Changes',
//     description:
//       'Date change requests must be submitted with at least 14 days’ notice. Changes are subject to availability and may incur a date-change administration fee. Please contact us as early as possible.',
//   },
//   {
//     title: 'Cancellation & Refunds',
//     description:
//       '30+ days before departure: full refund (minus admin fee). 15–29 days: 50% refund. Under 15 days: non-refundable. Refunds are processed within 7–14 business days to the original payment method.',
//   },
//   {
//     title: 'Pricing & Payments',
//     description:
//       'All prices are quoted in USD per person. Package costs, optional upgrades, and any applicable taxes are clearly shown before you confirm a booking. We accept all major credit/debit cards.',
//   },
// ];

const FAQ = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number>(0);

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

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-28">
        <Reveal className="mb-10 border border-slate-200 bg-white p-8 shadow-lg" animation="fade-up">
          <div className="mb-4 inline-flex items-center gap-2 border border-[#a7d9d5]/40 bg-[#173036] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            Help Center
          </div>
          <h1 className="font-display text-4xl font-bold text-slate-900 sm:text-5xl">FAQ</h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            Find quick answers and official policy details about bookings, traveler information, pricing, payments, and cancellations in one place.
          </p>
        </Reveal>

        <div className="grid gap-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <Reveal key={item.question} animation="fade-up" delay={index * 80}>
                <div className="overflow-hidden border border-slate-200 transition hover:border-[#a7d9d5] hover:shadow-md">

                  {/* QUESTION HEADER */}
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 bg-[#173036] px-5 py-4 text-left"
                  >
                    <span className="flex items-center gap-3 text-white">
                      <HelpCircle className="h-5 w-5 text-[#a7d9d5]" />
                      <span className="text-base font-semibold sm:text-lg">
                        {item.question}
                      </span>
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 text-[#a7d9d5] transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* ANSWER */}
                  {isOpen && (
                    <div className="border-t border-slate-200 bg-white px-5 py-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {item.answer}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Reveal animation="fade-right">
            <div className="border border-slate-200 bg-white p-6 transition hover:border-[#a7d9d5] hover:shadow-md">
              <h2 className="mb-2 flex items-center gap-2 font-display text-2xl text-slate-900">
                Booking Safety
              </h2>
              <p className="text-slate-600">
                All booking data shown in your cart reflects your latest confirmed selections, including package type, travel date, and traveler count.
              </p>
            </div>
          </Reveal>
          <Reveal animation="fade-left" delay={100}>
            <div className="border border-slate-200 bg-white p-6 transition hover:border-[#a7d9d5] hover:shadow-md">
              <h2 className="mb-2 flex items-center gap-2 font-display text-2xl text-slate-900">
                Need Custom Help?
              </h2>
              <p className="text-slate-600">
                For private adjustments, special occasions, or custom itineraries, use the inquiry popup on any package detail page.
              </p>
            </div>
          </Reveal>
        </div> */}

        {/* <section className="mt-12">
          <Reveal className="mb-5 inline-flex items-center gap-2 border border-[#a7d9d5]/40 bg-[#173036] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white" animation="fade-up">
            Policy Highlights
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {policySections.map((section, index) => (
              <Reveal key={section.title} animation="fade-up" delay={index * 90}>
                <article className="border border-slate-200 bg-white p-6 transition hover:border-[#a7d9d5] hover:shadow-md">
                  <h2 className="mb-2 font-display text-2xl text-slate-900">{section.title}</h2>
                  <p className="text-sm leading-relaxed text-slate-600 sm:text-base">{section.description}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Reveal animation="fade-up">
              <div className="border border-slate-200 bg-white p-5 text-slate-600 transition hover:border-[#a7d9d5] hover:shadow-md">
                <div className="mb-2 flex items-center gap-2 text-slate-900">
                  <ShieldCheck className="h-4 w-4 text-[#173036]" />
                  <span className="font-semibold">Secure Transactions</span>
                </div>
                <p className="text-sm">All booking transactions are handled through secure channels.</p>
              </div>
            </Reveal>
            <Reveal animation="fade-up" delay={90}>
              <div className="border border-slate-200 bg-white p-5 text-slate-600 transition hover:border-[#a7d9d5] hover:shadow-md">
                <div className="mb-2 flex items-center gap-2 text-slate-900">
                  <CreditCard className="h-4 w-4 text-[#173036]" />
                  <span className="font-semibold">Transparent Charges</span>
                </div>
                <p className="text-sm">Order summary clearly shows package cost, fees, and taxes.</p>
              </div>
            </Reveal>
            <Reveal animation="fade-up" delay={180}>
              <div className="border border-slate-200 bg-white p-5 text-slate-600 transition hover:border-[#a7d9d5] hover:shadow-md">
                <div className="mb-2 flex items-center gap-2 text-slate-900">
                  <CalendarClock className="h-4 w-4 text-[#173036]" />
                  <span className="font-semibold">Support Window</span>
                </div>
                <p className="text-sm">Our team can assist with schedule and itinerary support requests.</p>
              </div>
            </Reveal>
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default FAQ;
