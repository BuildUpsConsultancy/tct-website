import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { pageVariants, staggerContainer, cardItem, fadeUp, slideLeft, slideRight, scaleIn } from '../lib/motion';

const aboutValues = [
  { iconType: 'safety',     title: 'Safety First',      desc: 'Your safety is our highest priority. Every itinerary we build is assessed for local conditions, road safety, and accommodation standards — giving you and your family complete peace of mind.' },
  { iconType: 'expertise',  title: 'Local Expertise',   desc: 'Our guides and planners are Sri Lankan-born, with deep knowledge of every region, community, and hidden gem on this island. You get the island as insiders know it.' },
  { iconType: 'support',    title: 'Dedicated Support', desc: 'From first enquiry to safe return, our team is available to handle your questions, adjust your plans, and support you through every stage of your journey.' },
  { iconType: 'quality',    title: 'Quality Promise',   desc: 'We operate to UK travel industry standards across accommodation selection, transport quality, and guide training — so every experience consistently exceeds expectations.' },
];

const stats = [
  { num: '8+ Years', label: 'EXPERIENCE IN SRI LANKA' },
  { num: '26+ Tours', label: 'CURATED PACKAGES' },
  { num: '98%', label: 'HAPPY TRAVELLERS' },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen bg-[#06142a] text-white"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b2224] via-[#12373a] to-[#0d2628]" />
        <div className="absolute inset-0 bg-cover bg-center opacity-18" style={{ backgroundImage: 'url(/images/image_1.png)' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(127,181,176,0.16),_transparent_45%),linear-gradient(to_bottom,rgba(11,34,36,0.45),rgba(6,20,42,0.88))]" />

        <div className="relative mx-auto max-w-7xl px-6 py-10 md:py-14 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">

            {/* Left — text stagger */}
            <motion.div
              className="max-w-xl"
              variants={staggerContainer(0.12, 0.1)}
              initial="hidden"
              animate="show"
            >
              <motion.p variants={fadeUp} className="mb-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d6c7aa]">
                About Us
              </motion.p>
              <motion.h1 variants={fadeUp} className="max-w-xl text-5xl font-extrabold leading-[0.95] md:text-7xl">
                <span className="block text-[#d8e7ff]">We Are</span>
                <span className="block text-[#f5f0e8]">Coconut Tree</span>
                <span className="block text-[#f5f0e8]">Trails</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-7 text-slate-200/60 md:text-lg">
                We help people discover Sri Lanka properly — with local knowledge, thoughtful planning, and genuine Sri Lankan hospitality. We specialise in private, tailor-made tours that go beyond the obvious tourist trail.
              </motion.p>
              <motion.button
                variants={fadeUp}
                onClick={() => navigate('/contact')}
                className="mt-8 rounded-full bg-[#f5f0e8] px-7 py-3 font-semibold text-[#0f2030]"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                Start Your Story
              </motion.button>
            </motion.div>

            {/* Right — image card */}
            <motion.div
              className="relative h-[430px] md:h-[480px] lg:h-[520px]"
              variants={slideRight}
              initial="hidden"
              animate="show"
            >
              <motion.div
                className="absolute right-0 top-2 h-[420px] w-[86%] rounded-[26px] shadow-2xl shadow-black/30 overflow-hidden"
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ duration: 0.4 }}
              >
                <img src="/images/image_3.png" alt="About hero" className="h-full w-full rounded-[26px] object-cover" />
                <div className="absolute inset-0 rounded-[26px] bg-gradient-to-t from-[#06142a]/30 via-transparent to-transparent" />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── VISION / MISSION ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-14 md:py-20 min-h-[520px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-22" style={{ backgroundImage: 'url(/images/image_2.png)' }} />
        <div className="absolute inset-0 bg-[#0b2224]/78" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            {[
              { 
                iconType: 'vision',
                title: 'Our Vision', 
                text: "To be Sri Lanka's most trusted travel partner — redefining what a Sri Lanka holiday can be by combining deep local roots with world-class service and unforgettable experiences that leave a lasting impact." 
              },
              { 
                iconType: 'mission',
                title: 'Our Mission', 
                text: "To help people discover Sri Lanka properly — with local knowledge, thoughtful planning, and genuine Sri Lankan hospitality. We build tailor-made tours that go beyond the obvious and reveal the island's true depth." 
              },
            ].map(({ iconType, title, text }) => {
              const getIcon = () => {
                const iconProps = { className: 'h-10 w-10', fill: 'currentColor' };
                switch (iconType) {
                  case 'vision':
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>;
                  case 'mission':
                    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...iconProps}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
                  default:
                    return null;
                }
              };
              return (
                <motion.div
                  key={title}
                  className="rounded-[18px] bg-[#152438]/95 p-8 shadow-2xl shadow-black/20"
                  variants={cardItem}
                  whileHover={{ y: -8, backgroundColor: 'rgba(23,48,73,0.97)', transition: { duration: 0.3 } }}
                >
                  <div className="mb-5 text-[#8fc0ff]">
                    {getIcon()}
                  </div>
                  <h2 className="mb-4 text-3xl font-semibold text-white">{title}</h2>
                  <p className="leading-7 text-slate-200/60">{text}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="bg-[#071225] py-14 md:py-16">
        <motion.div
          className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 text-center sm:grid-cols-3"
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {stats.map(({ num, label }) => (
            <motion.div key={label} variants={scaleIn}>
              <p className="text-4xl font-extrabold text-white md:text-5xl">{num}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-slate-200/55">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-24 min-h-[580px] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-18" style={{ backgroundImage: 'url(/images/image_2.png)' }} />
        <div className="absolute inset-0 bg-[#12373a]/72" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            className="text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#d6c7aa]">Why Choose Us</p>
            <h2 className="text-4xl font-bold text-white md:text-5xl">The Coconut Tree Trails Difference</h2>
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
                  className="rounded-[16px] bg-[#152438]/88 p-6 shadow-lg shadow-black/20"
                  variants={cardItem}
                  whileHover={{
                    y: -10,
                    borderTopColor: 'rgba(143,192,255,0.7)',
                    backgroundColor: 'rgba(23,48,73,0.9)',
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="text-[#8fc0ff]">
                    {getIcon()}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-7 text-slate-200/60">{desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[2fr_1fr]">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div
              className="relative overflow-hidden rounded-[18px] bg-[#152438] shadow-2xl shadow-black/25"
              whileHover={{ y: -6, transition: { duration: 0.35 } }}
            >
              <img src="/images/image_10.png" alt="Ready to explore Sri Lanka" className="h-[360px] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06142a]/78 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-extrabold text-white md:text-4xl">Ready to Explore Sri Lanka?</h3>
                <p className="mt-2 max-w-xl text-sm text-slate-200/65">Join the travellers who chose to discover Sri Lanka the right way.</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div
              className="flex h-full items-center justify-center rounded-[18px] border border-white/10 bg-[#2b3c40]/90 px-8 py-10 text-center shadow-2xl shadow-black/20"
              whileHover={{ y: -6, backgroundColor: 'rgba(49,70,75,0.95)', transition: { duration: 0.35 } }}
            >
              <div>
                <motion.div
                  className="mb-6 text-[#f5f0e8]"
                  whileHover={{ scale: 1.15, rotate: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  <ArrowRight className="mx-auto h-10 w-10 rotate-[-45deg]" />
                </motion.div>
                <h3 className="mb-4 text-3xl font-semibold text-white">Craft Your Story</h3>
                <p className="mx-auto mb-8 max-w-sm leading-7 text-slate-200/60">
                  Personalized itineraries designed specifically for your travel style.
                </p>
                <motion.button
                  onClick={() => navigate('/contact')}
                  className="rounded-full border border-[#f5f0e8]/70 px-10 py-3 text-sm font-semibold text-[#f5f0e8]"
                  whileHover={{ backgroundColor: '#f5f0e8', color: '#0f2030', y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                >
                  Inquire Now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
