import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import Reveal from '../components/Reveal';

const sections = [
  {
    num: "1",
    title: "Introduction",
    content: "These Terms & Conditions govern the use of our website and all bookings, enquiries and travel services supplied by The Coconut Tree Trails (PVT) Ltd. By using our website or making a booking, you agree to these Terms."
  },
  {
    num: "2",
    title: "Eligibility",
    content: "You must be at least 18 years old and legally able to enter into binding contracts to book a tour or use our services."
  },
  {
    num: "3",
    title: "Website Use",
    content: "You agree not to misuse the website, interfere with its proper operation, upload malicious software, or copy website content without our express prior permission."
  },
  {
    num: "4",
    title: "Booking Process",
    content: "Bookings are confirmed only after written confirmation from us and receipt of the required payment or non-refundable deposit."
  },
  {
    num: "5",
    title: "Prices & Inclusions",
    content: "Prices include only the services specifically listed in your customized itinerary. International flights, visas, travel insurance, meals, drinks, tips and personal expenses are excluded unless expressly stated otherwise."
  },
  {
    num: "6",
    title: "Deposits & Final Payments",
    content: "Deposits secure arrangements with hotels and local suppliers. Final payment is due by the date stated in your booking confirmation. Failure to pay on time may result in cancellation."
  },
  {
    num: "7",
    title: "Amendments by the Customer",
    content: "Requested changes to your bookings are subject to availability and may incur supplier charges, price differences, and admin fees."
  },
  {
    num: "8",
    title: "Cancellations",
    content: "Customer cancellations are handled in accordance with our Refund Policy. Written notice via email is required for processing."
  },
  {
    num: "9",
    title: "Changes by the Company",
    content: "We may amend itineraries where reasonably necessary due to weather, safety, supplier availability, road conditions, government requirements or unforeseen operational circumstances. Comparable alternatives will be offered whenever possible."
  },
  {
    num: "10",
    title: "Travel Documents",
    content: "Travellers are responsible for passports, visas, vaccinations, customs requirements and ensuring they satisfy all immigration and health rules before travel."
  },
  {
    num: "11",
    title: "Travel Insurance",
    content: "Comprehensive travel insurance is strongly recommended and should include cancellation, medical treatment, emergency evacuation, baggage and personal liability."
  },
  {
    num: "12",
    title: "Health & Fitness",
    content: "Travellers must ensure they are medically fit for booked activities and disclose relevant medical conditions or dietary requirements before travel."
  },
  {
    num: "13",
    title: "Adventure Activities",
    content: "Safari, hiking, whale watching, water sports and similar activities involve inherent risks. Participation is voluntary and subject to local safety instructions."
  },
  {
    num: "14",
    title: "Third-Party Suppliers",
    content: "Hotels, transport providers, airlines, guides and activity providers operate independently. Their services remain subject to their own conditions."
  },
  {
    num: "15",
    title: "Limitation of Liability",
    content: "To the maximum extent permitted by law, we are not liable for indirect losses or events outside our reasonable control including severe weather, natural disasters, strikes, pandemics, political unrest or transport disruptions."
  },
  {
    num: "16",
    title: "Intellectual Property",
    content: "All text, branding, itineraries, logos, photographs and website content remain the property of the Company unless otherwise stated."
  },
  {
    num: "17",
    title: "Complaints",
    content: "If an issue arises during travel, please notify your guide or our office immediately so we have an opportunity to resolve it. Formal complaints should be submitted within 28 days of travel."
  },
  {
    num: "18",
    title: "Privacy",
    content: "Personal information is handled in accordance with our Privacy Policy."
  },
  {
    num: "19",
    title: "Governing Law",
    content: "These Terms are governed by the laws of Sri Lanka and disputes shall be subject to the jurisdiction of the Sri Lankan courts."
  }
];

const TermsConditions = () => {
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
            Terms of Use
          </div>
          <h1 className="font-display text-4xl font-bold text-slate-900 sm:text-5xl">Terms & Conditions</h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            These terms outline the rules and conditions that apply to website usage, travel bookings, and travel operations with The Coconut Tree Trails.
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
            <Reveal key={section.title} animation="fade-up" delay={index * 40}>
              <div className="border border-slate-200 bg-white p-6 transition hover:border-[#a7d9d5] hover:shadow-md flex gap-4 items-start">
                <div>
                  <h2 className="inline-block font-display text-xl tracking-wider font-semibold text-[#173036] mb-2 bg-[#a7d9d5] px-2 py-1">
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

export default TermsConditions;
