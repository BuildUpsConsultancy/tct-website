import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe2, Mail, MapPin, Phone } from 'lucide-react';
import Lenis from 'lenis';
import { pageVariants, staggerContainer, cardItem, fadeUp, slideLeft, slideRight } from '../lib/motion';

const contactItems = [
  { icon: Mail,   label: 'Email Us',        value: 'info@thecoconuttreetrails.com' },
  { icon: Phone,  label: 'Call / WhatsApp', value: '+91 345 533 865' },
  { icon: MapPin, label: 'Based In',        value: 'Sri Lanka · Operating to UK Standards' },
  { icon: Globe2, label: 'Social',          value: '@thecoconuttreetrails' },
];

const Contact = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]   = useState(false);

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

  const update = (key: keyof typeof form, value: string) =>
    setForm(c => ({ ...c, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <motion.div
      className="min-h-screen bg-white text-slate-900"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
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

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-6 md:px-8 md:pb-24">

          {/* Heading */}
          <motion.div
            className="pt-6 text-center md:pt-10"
            variants={staggerContainer(0.12, 0.05)}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={fadeUp} className="section-label text-[#173036]">
              Get in Touch 
            </motion.p>
            <motion.h1 variants={fadeUp} className="mt-4 text-4xl font-extrabold leading-[0.95] text-slate-900 md:text-6xl lg:text-[4.2rem]">
              Plan Your Sri Lanka Adventure
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600">
              Reach out to our team — we're based in Sri Lanka and respond within one business day. Whether you have a question, a custom itinerary in mind, or just want to know more, we're here.
            </motion.p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[380px_1fr] lg:items-start">

            {/* Left — contact info */}
            <motion.div
              className="order-2 space-y-3 lg:order-1 lg:pt-8"
              variants={staggerContainer(0.1, 0.3)}
              initial="hidden"
              animate="show"
            >
              {contactItems.map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  className="border border-slate-200 bg-[#173036] px-3 py-3 shadow-md transition-all duration-300 hover:border-[#a7d9d5] hover:bg-[#1f4048] hover:shadow-lg sm:px-5 sm:py-4"
                  variants={slideLeft}
                  whileHover={{ x: 4, transition: { duration: 0.25 } }}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-[#a7d9d5] text-[#173036] sm:h-9 sm:w-9">
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold leading-tight text-slate-900 sm:text-sm text-white">{label}</p>
                      <p className="mt-0.5 text-[10px] leading-tight text-slate-600 sm:text-sm text-white/85">{value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="flex gap-2 pl-1 pt-2 sm:gap-3 sm:pt-4">
                {[Globe2, Mail, Phone].map((Icon, i) => (
                  <motion.button
                    key={i}
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#a7d9d5]/55 text-[#173036] sm:h-9 sm:w-9"
                    whileHover={{ scale: 1.15, backgroundColor: '#a7d9d5', y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  >
                    <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              className="order-1 border border-slate-200 bg-white p-6 shadow-lg md:p-8 lg:order-2"
              variants={slideRight}
              initial="hidden"
              animate="show"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div
                  className="grid gap-4 md:grid-cols-2"
                  variants={staggerContainer(0.08, 0.5)}
                  initial="hidden"
                  animate="show"
                >
                  {[
                    { key: 'name',    label: 'FULL NAME',      type: 'text',  placeholder: 'Your full name' },
                    { key: 'email',   label: 'EMAIL ADDRESS',  type: 'email', placeholder: 'your@email.com' },
                  ].map(({ key, label, type, placeholder }) => (
                    <motion.div key={key} variants={cardItem}>
                      <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-slate-700">{label}</label>
                      <input
                        type={type}
                        value={form[key as keyof typeof form]}
                        onChange={e => update(key as keyof typeof form, e.target.value)}
                        placeholder={placeholder}
                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#a7d9d5] focus:ring-1 focus:ring-[#a7d9d5]/20"
                      />
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.65 }}
                >
                  <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-slate-700">SUBJECT</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => update('subject', e.target.value)}
                    placeholder="e.g. Inquiry about Wildlife Tour"
                    className="h-11 w-full rounded-md border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#a7d9d5] focus:ring-1 focus:ring-[#a7d9d5]/20"
                  />
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.75 }}
                >
                  <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-slate-700">MESSAGE</label>
                  <textarea
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    placeholder="Tell us about your dream Sri Lanka journey — where you'd like to go, how long you're travelling, and how many people are in your group..."
                    rows={7}
                    className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#a7d9d5] focus:ring-1 focus:ring-[#a7d9d5]/20 resize-none"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="mt-2 w-full bg-[#173036] py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1a4d56] hover:shadow-md"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  animate={sent ? { backgroundColor: '#a7d9d5', color: '#173036' } : {}}
                >
                  {sent ? '✓ Message Sent!' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
      {/* Gallery Section */}
<section className="bg-white py-10">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    
    {/* Section Header */}
    <div className="mb-12 text-center">
      {/* <span className="text-sm font-semibold uppercase tracking-wider text-[#a7d9d5]">
        Our Gallery
      </span>
      <h2 className="mt-2 text-3xl font-bold text-[#173036] md:text-4xl">
        Moments & Highlights
      </h2> */}
      <p className="mx-auto max-w-2xl text-slate-600">
        Explore some of our memorable projects, events, and achievements.
      </p>
    </div>

    {/* Gallery Grid */}
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {[
        '/images/destinations/culture-perahera.webp',
  '/images/destinations/culture-temple.jpg',
  '/images/destinations/habarana-adventure.jpg',
  '/images/destinations/hidden-ella.jpg',
  '/images/destinations/hidden-village.jpg',
  '/images/destinations/hidden-waterfall.jpg',
  '/images/destinations/hikkaduwa-culture.jpg',
  '/images/destinations/kalpitiya-beach.jpg',
      ].map((image, index) => (
        <motion.div
          key={index}
          className="group overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <img
            src={image}
            alt={`Gallery ${index + 1}`}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </motion.div>
      ))}
    </div>
  </div>
</section>
    </motion.div>
  );
};

export default Contact;
