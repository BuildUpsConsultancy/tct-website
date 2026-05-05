import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Globe2, Mail, MapPin, Phone } from 'lucide-react';
import { pageVariants, staggerContainer, cardItem, fadeUp, slideLeft, slideRight } from '../lib/motion';

const contactItems = [
  { icon: Mail,   label: 'Email Us',        value: 'info@thecoconuttreetrails.com' },
  { icon: Phone,  label: 'Call / WhatsApp', value: '+91 345 533 865' },
  { icon: MapPin, label: 'Based In',        value: 'Sri Lanka · Operating to UK Standards' },
  { icon: Globe2, label: 'Social',          value: '@thecoconuttreetrails' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]   = useState(false);

  const update = (key: keyof typeof form, value: string) =>
    setForm(c => ({ ...c, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <motion.div
      className="min-h-screen bg-[#081b22] text-white"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d484d] via-[#16383c] to-[#0a1f24]" />
        <div className="absolute inset-0 bg-[url('/images/image_1.png')] bg-cover bg-center opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#102b30]/35 to-[#081b22]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-6 md:px-8 md:pb-24">

          {/* Heading */}
          <motion.div
            className="pt-6 text-center md:pt-10"
            variants={staggerContainer(0.12, 0.05)}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={fadeUp} className="text-[11px] font-semibold tracking-[0.3em] text-[#f5f0e8]/90">
              GET IN TOUCH
            </motion.p>
            <motion.h1 variants={fadeUp} className="mt-4 text-4xl font-extrabold leading-[0.95] text-white md:text-6xl lg:text-[4.2rem]">
              Plan Your Sri Lanka Adventure
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/70">
              Reach out to our team — we're based in Sri Lanka and respond within one business day. Whether you have a question, a custom itinerary in mind, or just want to know more, we're here.
            </motion.p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[380px_1fr] lg:items-start">

            {/* Left — contact info */}
            <motion.div
              className="space-y-4 lg:pt-8"
              variants={staggerContainer(0.1, 0.3)}
              initial="hidden"
              animate="show"
            >
              {contactItems.map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  className="rounded-xl bg-[#152339]/90 px-5 py-4 shadow-lg shadow-black/25"
                  variants={slideLeft}
                  whileHover={{ x: 4, backgroundColor: 'rgba(23,48,73,0.95)', transition: { duration: 0.25 } }}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-md bg-[#567aa1] text-[#dbeeff]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{label}</p>
                      <p className="mt-0.5 text-sm text-white/85">{value}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="flex gap-3 pl-1 pt-4">
                {[Globe2, Mail, Phone].map((Icon, i) => (
                  <motion.button
                    key={i}
                    type="button"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#8fc0ff]/55 text-[#8fc0ff]"
                    whileHover={{ scale: 1.15, backgroundColor: '#8fc0ff', color: '#081b22', y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.button>
                ))}
              </div>

              <div className="pt-8 md:pt-14">
                <img src="/logococnut.png" alt="The Coconut Tree Trails" className="h-24 w-auto opacity-90 md:h-28" />
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div
              className="rounded-2xl bg-[#132238]/90 p-6 shadow-2xl shadow-black/30 md:p-8"
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
                      <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-white/85">{label}</label>
                      <input
                        type={type}
                        value={form[key as keyof typeof form]}
                        onChange={e => update(key as keyof typeof form, e.target.value)}
                        placeholder={placeholder}
                        className="h-11 w-full rounded-md border border-black/25 bg-[#0a1322] px-4 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#8fc0ff]/55 focus:ring-1 focus:ring-[#8fc0ff]/20"
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
                  <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-white/85">SUBJECT</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => update('subject', e.target.value)}
                    placeholder="e.g. Inquiry about Ramayana Tour"
                    className="h-11 w-full rounded-md border border-black/25 bg-[#0a1322] px-4 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#8fc0ff]/55 focus:ring-1 focus:ring-[#8fc0ff]/20"
                  />
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.75 }}
                >
                  <label className="mb-2 block text-[10px] font-semibold tracking-[0.2em] text-white/85">MESSAGE</label>
                  <textarea
                    value={form.message}
                    onChange={e => update('message', e.target.value)}
                    placeholder="Tell us about your dream Sri Lanka journey — where you'd like to go, how long you're travelling, and how many people are in your group..."
                    rows={7}
                    className="w-full rounded-md border border-black/25 bg-[#0a1322] px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#8fc0ff]/55 focus:ring-1 focus:ring-[#8fc0ff]/20 resize-none"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="mt-2 w-full rounded-full bg-[#f5f0e8] py-4 text-sm font-semibold text-[#1a202d]"
                  whileHover={{ scale: 1.02, y: -2, backgroundColor: '#fff' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  animate={sent ? { backgroundColor: '#a7d9d5', color: '#06142a' } : {}}
                >
                  {sent ? '✓ Message Sent!' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
