import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion, AnimatePresence,
  useScroll, useTransform,
} from 'framer-motion';
import {
  ArrowRight, ChevronDown, ChevronUp,
  Headphones, Hotel, Leaf, Map, PawPrint, Plane,
  Quote, Shield, Star, Users,
} from 'lucide-react';

import { featuredDestinations } from '../data/destinations';
import { generalCuriosities } from '../data/generalCuriosities';
import { pageVariants, staggerContainer, cardItem, fadeUp, slideLeft, slideRight, scaleIn } from '../lib/motion';

const stats = [
  { value: '18+', label: 'TOURS COMPLETED' },
  { value: '8+',  label: 'YEARS EXPERIENCE' },
  { value: '98%', label: 'HAPPY TRAVELLERS' },
  { value: '69%', label: 'RETENTION RATIO' },
];

const services = [
  { icon: Plane,      title: 'Flight Booking',  desc: 'We assist with international and domestic flight arrangements to ensure your Sri Lanka journey starts smoothly from the moment you leave home.' },
  { icon: Hotel,      title: 'Hotel Bookings',  desc: 'From boutique jungle lodges in Sigiriya to colonial tea estate bungalows and beachfront villas — we curate Sri Lanka\'s finest stays for every budget.' },
  { icon: Map,        title: 'Tour Experiences',desc: 'Every Sri Lankan experience is guided by locals who know the island intimately — revealing the hidden temples, local markets, and off-trail landscapes no tourist map ever finds.' },
  { icon: PawPrint,   title: 'Wildlife Safaris', desc: 'Track leopards in Yala, witness elephant herds at Udawalawe, and spot blue whales off Mirissa — with expert naturalist guides who read the wild like a language.' },
  { icon: Leaf,       title: 'Visa Processing', desc: 'Our team provides complete visa assistance for Sri Lanka ETA applications, simplifying the process so you can focus entirely on planning your adventure.' },
  { icon: Headphones, title: '24/7 Support',    desc: 'From the moment you enquire to the day you arrive home, our dedicated local team is available around the clock to handle every detail of your journey.' },
];

const testimonials = [
  { name: 'James & Sarah — UK',          quote: 'The team at The Coconut Tree Trails made our honeymoon in Sri Lanka truly unforgettable. Every detail was taken care of — from the scenic train ride through Ella to our private sunset dinner in Galle.' },
  { name: 'Priya Nair — India',           quote: 'I booked the Ramayana Tour and was deeply moved by the depth of knowledge our guide brought to every sacred site. This was not just a tour — it was a pilgrimage. Absolutely authentic and beautifully organised.' },
  { name: 'David Hartmann — Germany',     quote: 'Superb local knowledge, seamless logistics, and genuinely warm hospitality at every step. Sri Lanka is spectacular — and The Coconut Tree Trails is the only way to truly experience it.' },
];

const Home = () => {
  const navigate   = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  /* Parallax hero */
  const heroRef  = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const bgOpacity= useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const heroY    = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroOpac = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      className="min-h-screen bg-tct-dark text-white"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden pt-20">
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#1a4a52] via-[#0f3a42] to-[#0a2630]"
          style={{ y: bgY }}
        />
        <motion.div
          className="absolute inset-0 opacity-80"
          style={{
            backgroundImage: 'url(/images/image_1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            y: bgY,
            opacity: bgOpacity,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f3a42]/40 to-[#0a2630]" />

        <motion.div
          className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24"
          style={{ y: heroY, opacity: heroOpac }}
        >
          {/* Left — text */}
          <motion.div
            className="max-w-3xl"
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={fadeUp} className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d6c7aa]">
              Sri Lanka — The Right Way
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-4xl font-black leading-[0.92] text-tct-white md:text-6xl">
              The Coconut Tree Trails
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-7 text-white/85 md:text-lg">
              Travel Sri Lanka with people who know it. Tailor-made tours rooted in local expertise, genuine hospitality, and a deep love for this island paradise.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-4 flex items-center gap-3 text-sm text-white/60">
              <Shield className="h-4 w-4 text-[#a7d9d5]" />
              <span>UK-standard service · Local Sri Lankan expertise · 8+ years experience</span>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <motion.button
                onClick={() => navigate('/packages')}
                className="rounded-full bg-[#fbf6e8] px-10 py-4 text-base font-semibold text-[#06142a] shadow-xl shadow-black/20"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                Explore Packages
              </motion.button>
              <motion.button
                onClick={() => navigate('/contact')}
                className="rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white"
                whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                Plan My Trip
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right — stacked photo cards */}
          <motion.div
            className="relative hidden h-[540px] lg:block"
            variants={staggerContainer(0.15, 0.4)}
            initial="hidden"
            animate="show"
          >
            <motion.div
              variants={slideRight}
              className="absolute right-16 top-10 w-[255px] rotate-6 rounded-2xl border-4 border-[#a7d9d5]/60 bg-[#13212d] shadow-2xl shadow-black/50"
              whileHover={{ rotate: 3, y: -8, scale: 1.04, transition: { duration: 0.3 } }}
            >
              <div className="overflow-hidden rounded-[14px]">
                <img src="/images/image_10.png" alt="Sigiriya Rock Fortress, Sri Lanka" className="h-[250px] w-full object-cover" />
              </div>
              <div className="px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#a7d9d5]/70">Featured</p>
                <p className="text-base font-semibold text-white">Sigiriya, Sri Lanka</p>
              </div>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="absolute right-36 top-34 w-[210px] -rotate-12 rounded-2xl bg-[#0f1f2e] shadow-2xl shadow-black/50"
              whileHover={{ rotate: -9, y: -8, scale: 1.04, transition: { duration: 0.3 } }}
            >
              <div className="overflow-hidden rounded-2xl border-4 border-[#1f3b52]">
                <img src="/images/image_8.png" alt="Nine Arch Bridge, Ella" className="h-[245px] w-full object-cover" />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="absolute right-10 top-48 w-[190px] -rotate-2 overflow-hidden rounded-2xl bg-[#121d28] shadow-2xl shadow-black/50"
              whileHover={{ rotate: 0, y: -8, scale: 1.04, transition: { duration: 0.3 } }}
            >
              <img src="/images/image_7.png" alt="Tea Estates, Nuwara Eliya" className="h-[245px] w-full object-cover" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── DESTINATIONS ─────────────────────────────────────── */}
      <section className="py-20 bg-[#0f3a42]">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-8 flex items-end justify-between"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div>
              <p className="section-label mb-2 text-white/85">Top Destinations</p>
              <h2 className="font-display text-4xl text-tct-white md:text-5xl">Explore Sri Lanka</h2>
            </div>
            <motion.button
              onClick={() => navigate('/destinations')}
              className="text-sm text-white/90"
              whileHover={{ x: 4, textDecoration: 'underline' }}
              transition={{ duration: 0.2 }}
            >
              Explore All
            </motion.button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {featuredDestinations.map((destination) => (
              <motion.button
                key={destination.slug}
                type="button"
                onClick={() => navigate(`/destinations/${destination.slug}`)}
                className="group w-full overflow-hidden rounded-[28px] bg-[#133940] text-left shadow-lg shadow-black/25"
                variants={cardItem}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="overflow-hidden rounded-[28px] border border-white/8 bg-[#102b31] p-2">
                  <div className="overflow-hidden rounded-[22px]">
                    <motion.img
                      src={destination.image}
                      alt={destination.alt}
                      className="h-[290px] w-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </div>
                <div className="px-5 pb-6 pt-4 text-center">
                  <h3 className="text-2xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-[#f7f2e9]">
                    {destination.title}
                  </h3>
                  <p className="mt-2 text-base font-medium text-white/85">{destination.subtitle}</p>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: 'url(/images/image_2.png)' }} />
        <div className="absolute inset-0 bg-[#0f3540]/70" />
        <motion.div
          className="relative mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 text-center md:grid-cols-4"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="rounded-xl bg-black/20 px-2 py-8 backdrop-blur-sm"
              variants={scaleIn}
              whileHover={{ y: -4, backgroundColor: 'rgba(0,0,0,0.35)', transition: { duration: 0.25 } }}
            >
              <p className="font-display text-4xl font-black text-white md:text-5xl">{stat.value}</p>
              <p className="section-label mt-1 text-[10px] text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FEATURE — Package highlight ───────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/images/image_5.png)' }} />
        <div className="absolute inset-0 bg-[#0f4450]/75" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="section-label mb-3 text-white/85">Tailor-Made for You</p>
            <h2 className="font-display text-5xl font-bold leading-tight text-tct-white md:text-6xl">
              Sri Lanka<br />Your Way
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/85 md:text-base">
              From ancient temples and wildlife safaris to misty tea estates and sun-soaked beaches — our curated packages give you the real Sri Lanka, guided by people who live and breathe this island every day.
            </p>
            <motion.button
              onClick={() => navigate('/packages')}
              className="btn-primary mt-8 px-7 py-4 text-sm"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            >
              Browse All Packages
            </motion.button>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-[420px]"
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div
              className="overflow-hidden rounded-[26px] shadow-2xl shadow-black/40"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img src="/images/image_10.png" alt="Sigiriya Rock Fortress, Sri Lanka" className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105" />
            </motion.div>
            <motion.div
              className="absolute inset-x-6 bottom-6 rounded-2xl bg-[#0f2030]/85 p-5 text-white shadow-xl backdrop-blur-sm"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Magical Sri Lanka</h3>
                  <p className="text-xs text-white/80">Kandy · Ella · Galle · Mirissa • 9 Days</p>
                </div>
                <span className="rounded bg-white px-3 py-1 text-xs font-bold text-[#0f2030]">$2,199</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.18em] text-white/80">
                <span className="inline-flex items-center gap-1"><Hotel className="h-3.5 w-3.5" /> Boutique Stay</span>
                <span className="inline-flex items-center gap-1"><Plane className="h-3.5 w-3.5" /> Private Transfer</span>
                <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> Expert Guide</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/image_3.png)' }} />
        <div className="absolute inset-0 bg-[#0f3c42]/80" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            className="text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="section-label mb-2 text-white/85">Your Trusted Partner</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">Authentic Sri Lanka</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/75">
              Every service we offer is rooted in genuine local knowledge and a commitment to making your Sri Lanka experience as real, safe, and memorable as possible.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer(0.09, 0.15)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  className="group rounded-2xl border border-white/10 bg-[#14273a]/85 p-6 shadow-lg shadow-black/20 backdrop-blur-sm"
                  variants={cardItem}
                  whileHover={{
                    y: -8,
                    borderColor: 'rgba(127, 181, 176, 0.4)',
                    backgroundColor: 'rgba(24, 50, 70, 0.9)',
                    transition: { duration: 0.3 },
                  }}
                >
                  <motion.div
                    className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#7fb5b0]/10 text-[#a7d9d5]"
                    whileHover={{ scale: 1.15, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <h3 className="mb-3 text-xl font-bold text-white group-hover:text-[#f5f0e8] transition-colors duration-300">{service.title}</h3>
                  <p className="text-sm leading-7 text-white/80">{service.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/images/image_4.png)' }} />
        <div className="absolute inset-0 bg-[#0d3a41]/70" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            className="text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="section-label mb-2 text-white/85">Hear it from Travellers</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">Real Stories. Real Sri Lanka.</h2>
          </motion.div>

          <motion.div
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                className="group rounded-2xl border border-white/10 bg-black/20 p-8 shadow-lg shadow-black/20 backdrop-blur-sm"
                variants={cardItem}
                whileHover={{
                  y: -8,
                  borderColor: 'rgba(255,255,255,0.2)',
                  backgroundColor: 'rgba(0,0,0,0.35)',
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div whileHover={{ scale: 1.12, color: 'rgba(127, 181, 176, 0.5)' }}>
                  <Quote className="mb-5 h-10 w-10 text-white/15" />
                </motion.div>
                <p className="text-sm leading-7 text-white/85">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[#112738] text-sm font-bold text-[#a7d9d5]">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <div className="flex gap-0.5 text-yellow-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(/images/image_5.png)' }} />
        <div className="absolute inset-0 bg-[#0f4450]/75" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-2">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <p className="section-label mb-3 text-white/85">You Asked, We Answer</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">Quick Answers for Smart Travellers</h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/85 md:text-base">
              Planning a trip to Sri Lanka? Here are the questions we get asked most often — answered honestly by our team.
            </p>
            <motion.button
              onClick={() => navigate('/faq-policy')}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white"
              whileHover={{ x: 4, textDecoration: 'underline' }}
            >
              View full FAQ &amp; Policy <ArrowRight className="h-4 w-4" />
            </motion.button>
          </motion.div>

          <motion.div
            className="space-y-3"
            variants={staggerContainer(0.08, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            {generalCuriosities.map((faq, index) => (
              <motion.div
                key={faq.q}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1b2a]/90 shadow-lg shadow-black/20"
                variants={cardItem}
                whileHover={{ borderColor: 'rgba(255,255,255,0.2)', y: -2, transition: { duration: 0.2 } }}
              >
                <button
                  className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors duration-200"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span className="text-sm font-semibold text-white">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ChevronDown className="h-4 w-4 text-white/70 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm leading-7 text-white/80 border-t border-white/5 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
