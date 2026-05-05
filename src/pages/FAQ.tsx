import { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Sparkles, FileText, CreditCard, CalendarClock } from 'lucide-react';

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

type PolicySection = {
  title: string;
  description: string;
};

const policySections: PolicySection[] = [
  {
    title: 'Booking Confirmation',
    description:
      'A booking is confirmed once it is submitted through our Book Now flow and you receive a confirmation email from our team. Full payment or a deposit may be required to secure your dates.',
  },
  {
    title: 'Date Changes',
    description:
      'Date change requests must be submitted with at least 14 days’ notice. Changes are subject to availability and may incur a date-change administration fee. Please contact us as early as possible.',
  },
  {
    title: 'Cancellation & Refunds',
    description:
      '30+ days before departure: full refund (minus admin fee). 15–29 days: 50% refund. Under 15 days: non-refundable. Refunds are processed within 7–14 business days to the original payment method.',
  },
  {
    title: 'Pricing & Payments',
    description:
      'All prices are quoted in USD per person. Package costs, optional upgrades, and any applicable taxes are clearly shown before you confirm a booking. We accept all major credit/debit cards.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06142a]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: 'url(/images/image_2.png)' }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(143,192,255,0.16),transparent_40%),radial-gradient(circle_at_85%_75%,rgba(214,199,170,0.10),transparent_38%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b2224] via-[#12373a] to-[#0d2628] opacity-78" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-28">
        <Reveal className="mb-10 rounded-3xl border border-white/10 bg-[#152438]/95 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]" animation="fade-up">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6c7aa]/40 bg-[#d6c7aa]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#d6c7aa]">
            <Sparkles className="h-3.5 w-3.5" />
            Help Center
          </div>
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">FAQ & Policy</h1>
          <p className="mt-3 max-w-3xl text-slate-200/75">
            Find quick answers and official policy details about bookings, traveler information, pricing, payments, and cancellations in one place.
          </p>
        </Reveal>

        <div className="grid gap-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.question} animation="fade-up" delay={index * 80}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#152438]/95 backdrop-blur-sm transition hover:bg-[#173049]">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="flex items-center gap-3 text-white">
                      <HelpCircle className="h-5 w-5 text-[#8fc0ff]" />
                      <span className="text-base font-semibold sm:text-lg">{item.question}</span>
                    </span>
                    <ChevronDown className={`h-5 w-5 text-[#8fc0ff] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-slate-200/75 sm:text-base">
                      {item.answer}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Reveal animation="fade-right">
            <div className="rounded-2xl border border-white/10 bg-[#152438]/95 p-6 transition hover:bg-[#173049]">
              <h2 className="mb-2 flex items-center gap-2 font-display text-2xl text-white">
                <ShieldCheck className="h-5 w-5 text-[#8fc0ff]" />
                Booking Safety
              </h2>
              <p className="text-slate-200/75">
                All booking data shown in your cart reflects your latest confirmed selections, including package type, travel date, and traveler count.
              </p>
            </div>
          </Reveal>
          <Reveal animation="fade-left" delay={100}>
            <div className="rounded-2xl border border-white/10 bg-[#152438]/95 p-6 transition hover:bg-[#173049]">
              <h2 className="mb-2 flex items-center gap-2 font-display text-2xl text-white">
                <Sparkles className="h-5 w-5 text-[#8fc0ff]" />
                Need Custom Help?
              </h2>
              <p className="text-slate-200/75">
                For private adjustments, special occasions, or custom itineraries, use the inquiry popup on any package detail page.
              </p>
            </div>
          </Reveal>
        </div>

        <section className="mt-12">
          <Reveal className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d6c7aa]/40 bg-[#d6c7aa]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#d6c7aa]" animation="fade-up">
            <FileText className="h-3.5 w-3.5" />
            Policy Highlights
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {policySections.map((section, index) => (
              <Reveal key={section.title} animation="fade-up" delay={index * 90}>
                <article className="rounded-2xl border border-white/10 bg-[#152438]/95 p-6 transition hover:bg-[#173049]">
                  <h2 className="mb-2 font-display text-2xl text-white">{section.title}</h2>
                  <p className="text-sm leading-relaxed text-slate-200/75 sm:text-base">{section.description}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Reveal animation="fade-up">
              <div className="rounded-2xl border border-white/10 bg-[#152438]/95 p-5 text-slate-200/75 transition hover:bg-[#173049]">
                <div className="mb-2 flex items-center gap-2 text-white">
                  <ShieldCheck className="h-4 w-4 text-[#8fc0ff]" />
                  <span className="font-semibold">Secure Transactions</span>
                </div>
                <p className="text-sm">All booking transactions are handled through secure channels.</p>
              </div>
            </Reveal>
            <Reveal animation="fade-up" delay={90}>
              <div className="rounded-2xl border border-white/10 bg-[#152438]/95 p-5 text-slate-200/75 transition hover:bg-[#173049]">
                <div className="mb-2 flex items-center gap-2 text-white">
                  <CreditCard className="h-4 w-4 text-[#8fc0ff]" />
                  <span className="font-semibold">Transparent Charges</span>
                </div>
                <p className="text-sm">Order summary clearly shows package cost, fees, and taxes.</p>
              </div>
            </Reveal>
            <Reveal animation="fade-up" delay={180}>
              <div className="rounded-2xl border border-white/10 bg-[#152438]/95 p-5 text-slate-200/75 transition hover:bg-[#173049]">
                <div className="mb-2 flex items-center gap-2 text-white">
                  <CalendarClock className="h-4 w-4 text-[#8fc0ff]" />
                  <span className="font-semibold">Support Window</span>
                </div>
                <p className="text-sm">Our team can assist with schedule and itinerary support requests.</p>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQ;
