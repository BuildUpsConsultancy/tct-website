import { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Sparkles, FileText, CreditCard, CalendarClock } from 'lucide-react';

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: 'How do I confirm a booking?',
    answer:
      'Open any package, select your travel date and traveler count, then click Book Now in the availability popup. The package will be added to your cart for checkout.',
  },
  {
    question: 'Can I add multiple packages to one cart?',
    answer:
      'Yes. You can book multiple packages from different pages, and all confirmed bookings will appear in your cart together.',
  },
  {
    question: 'Can I change my travel date after adding to cart?',
    answer:
      'You can remove the current cart item and rebook the same package with a new date and traveler selection from the package detail page.',
  },
  {
    question: 'Do children count as travelers?',
    answer:
      'Yes. The total traveler count includes adults and children and is reflected in your booking summary and final cart details.',
  },
  {
    question: 'How do cancellations and refunds work?',
    answer:
      'Refund eligibility depends on notice period and package type. See the policy section below on this same page for full cancellation terms.',
  },
  {
    question: 'Is payment secure?',
    answer:
      'Yes. We use secure checkout practices and encrypted transaction flows to protect customer data and payment information.',
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
      'A booking is confirmed once it is added through the Book Now flow and checkout is completed successfully.',
  },
  {
    title: 'Date Changes',
    description:
      'Date changes should be requested early. Approvals depend on package availability and supplier conditions.',
  },
  {
    title: 'Cancellation & Refunds',
    description:
      'Refund values vary by notice period and package type. Administrative deductions may apply.',
  },
  {
    title: 'Pricing & Taxes',
    description:
      'Package price, service fees, and calculated taxes are shown in the order summary before payment.',
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
        <div className="mb-10 rounded-3xl border border-white/10 bg-[#152438]/95 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d6c7aa]/40 bg-[#d6c7aa]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#d6c7aa]">
            <Sparkles className="h-3.5 w-3.5" />
            Help Center
          </div>
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">FAQ & Policy</h1>
          <p className="mt-3 max-w-3xl text-slate-200/75">
            Find quick answers and official policy details about bookings, traveler information, pricing, payments, and cancellations in one place.
          </p>
        </div>

        <div className="grid gap-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#152438]/95 backdrop-blur-sm transition hover:bg-[#173049]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="flex items-center gap-3 text-white">
                    <HelpCircle className="h-5 w-5 text-[#8fc0ff]" />
                    <span className="text-base font-semibold sm:text-lg">{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#8fc0ff] transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-slate-200/75 sm:text-base">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#152438]/95 p-6 transition hover:bg-[#173049]">
            <h2 className="mb-2 flex items-center gap-2 font-display text-2xl text-white">
              <ShieldCheck className="h-5 w-5 text-[#8fc0ff]" />
              Booking Safety
            </h2>
            <p className="text-slate-200/75">
              All booking data shown in your cart reflects your latest confirmed selections, including package type, travel date, and traveler count.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#152438]/95 p-6 transition hover:bg-[#173049]">
            <h2 className="mb-2 flex items-center gap-2 font-display text-2xl text-white">
              <Sparkles className="h-5 w-5 text-[#8fc0ff]" />
              Need Custom Help?
            </h2>
            <p className="text-slate-200/75">
              For private adjustments, special occasions, or custom itineraries, use the inquiry popup on any package detail page.
            </p>
          </div>
        </div>

        <section className="mt-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d6c7aa]/40 bg-[#d6c7aa]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#d6c7aa]">
            <FileText className="h-3.5 w-3.5" />
            Policy Highlights
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {policySections.map((section) => (
              <article key={section.title} className="rounded-2xl border border-white/10 bg-[#152438]/95 p-6 transition hover:bg-[#173049]">
                <h2 className="mb-2 font-display text-2xl text-white">{section.title}</h2>
                <p className="text-sm leading-relaxed text-slate-200/75 sm:text-base">{section.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[#152438]/95 p-5 text-slate-200/75 transition hover:bg-[#173049]">
              <div className="mb-2 flex items-center gap-2 text-white">
                <ShieldCheck className="h-4 w-4 text-[#8fc0ff]" />
                <span className="font-semibold">Secure Transactions</span>
              </div>
              <p className="text-sm">All booking transactions are handled through secure channels.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#152438]/95 p-5 text-slate-200/75 transition hover:bg-[#173049]">
              <div className="mb-2 flex items-center gap-2 text-white">
                <CreditCard className="h-4 w-4 text-[#8fc0ff]" />
                <span className="font-semibold">Transparent Charges</span>
              </div>
              <p className="text-sm">Order summary clearly shows package cost, fees, and taxes.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#152438]/95 p-5 text-slate-200/75 transition hover:bg-[#173049]">
              <div className="mb-2 flex items-center gap-2 text-white">
                <CalendarClock className="h-4 w-4 text-[#8fc0ff]" />
                <span className="font-semibold">Support Window</span>
              </div>
              <p className="text-sm">Our team can assist with schedule and itinerary support requests.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQ;
