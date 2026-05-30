import { useEffect, useRef, useState, type FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import Lenis from 'lenis';
import { CheckCircle2, ChevronDown, MapPinned } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { pageVariants, staggerContainer, fadeUp, cardItem } from '../lib/motion';

const titleOptions = ['Mr.', 'Mrs.'] as const;
const travelTypes = ['Solo', 'Couple', 'Family'] as const;
const preferenceOptions = ['Wildlife', 'Adventure', 'Beaches', 'Historical Areas', 'Culture & Heritage', 'Hidden Trails'];
const budgetOptions = ['USD 1000–2000', 'USD 2000–3500', 'USD 3500–5000', 'USD 5000+'];
const hearingOptions = ['Google', 'Instagram', 'Facebook', 'YouTube', 'TikTok', 'Coconut Tree Restaurant', 'Other'];
const durationOptions = ['2-3 days', '4-5 days', '6-7 days', '8-10 days', '11+ days', 'Flexible'];
const adultsOptions = ['1', '2', '3', '4', '5+'];
const childrenOptions = ['0', '1', '2', '3', '4', '5+'];

const initialState = {
  title: 'Mr.' as '' | (typeof titleOptions)[number],
  name: '',
  email: '',
  contactNumber: '',
  travelType: 'Solo' as '' | (typeof travelTypes)[number],
  guests: '2',
  children: '0',
  tourDuration: '',
  preferences: [] as string[],
  budgetPerPerson: '',
  additionalInformation: '',
  hearAboutUs: '',
  hearAboutUsOther: '',
};

const Inquiry = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const preferencesRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start start', 'end start'] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const formCardY = useTransform(scrollYProgress, [0, 0.42], ['56px', '0px']);

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const inquiryTemplateId = import.meta.env.VITE_EMAILJS_INQUIRY_TEMPLATE_ID;
  const confirmationTemplateId = import.meta.env.VITE_EMAILJS_CONFIRMATION_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const adminEmail = import.meta.env.VITE_INQUIRY_ADMIN_EMAIL ?? 'info@thecoconuttreetrails.com';

  const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const updatePreferences = (values: string[]) => {
    setForm((current) => ({ ...current, preferences: values }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (preferencesRef.current && !preferencesRef.current.contains(event.target as Node)) {
        setPreferencesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if ((success || error) && feedbackRef.current) {
      feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [success, error]);

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

  const summaryLines = [
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Contact Number: ${form.contactNumber}`,
    `Title: ${form.title}`,
    `Travel Type: ${form.travelType}`,
    `Number of Guests: ${form.guests}`,
    `Children: ${form.children}`,
    `Tour Duration: ${form.tourDuration}`,
    `Preferences: ${form.preferences.length ? form.preferences.join(', ') : 'None selected'}`,
    `Budget Per Person: ${form.budgetPerPerson}`,
    `How did you hear about us?: ${form.hearAboutUs}${form.hearAboutUs === 'Other' && form.hearAboutUsOther ? ` - ${form.hearAboutUsOther}` : ''}`,
    `Additional Information: ${form.additionalInformation || 'None provided'}`,
  ];

  const submitInquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    if (!serviceId || !inquiryTemplateId || !confirmationTemplateId || !publicKey) {
      setError('Email delivery is not configured yet. Add the EmailJS environment variables first.');
      return;
    }

    setLoading(true);

    const sharedParams = {
      customer_title: form.title,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.contactNumber,
      travel_type: form.travelType,
      guests: String(form.guests),
      children: String((form as any).children ?? ''),
      tour_duration: form.tourDuration,
      preferences: form.preferences.join(', '),
      budget_per_person: form.budgetPerPerson,
      additional_information: form.additionalInformation,
      hear_about_us: form.hearAboutUs,
      hear_about_us_other: form.hearAboutUsOther,
      inquiry_summary: summaryLines.join('\n'),
      admin_email: adminEmail,
      reply_to: form.email,
      to_email: adminEmail,
      subject: `New inquiry from ${form.name}`,
    };

    try {
      const emailForFeedback = form.email;

      await Promise.all([
        emailjs.send(serviceId, inquiryTemplateId, sharedParams, { publicKey }),
        emailjs.send(
          serviceId,
          confirmationTemplateId,
          {
            ...sharedParams,
            to_email: form.email,
            subject: 'We received your inquiry',
          },
          { publicKey },
        ),
      ]);

      setSubmittedEmail(emailForFeedback);
      setSuccess(true);
      setForm(initialState);
    } catch (submitError) {
      console.error('Failed to send inquiry', submitError);
      setError('We could not send your inquiry right now. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <motion.div
      ref={pageRef}
      className="min-h-screen bg-white text-[#173036]"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <section className="relative overflow-hidden pt-16 sm:pt-20">
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url(/images/home/bentota.jpg)', y: heroImageY }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.04)_36%,rgba(255,255,255,0.22)_78%,rgba(255,255,255,0.52)_100%)]" />
          <motion.div
            className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-white/6 blur-3xl"
            animate={{ y: [0, 20, 0], opacity: [0.12, 0.24, 0.12] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-[10%] top-[18%] h-56 w-56 rounded-full bg-[#173036]/6 blur-3xl"
            animate={{ y: [0, -12, 0], x: [0, 8, 0], opacity: [0.08, 0.16, 0.08] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent via-white/20 to-white/80"
        />

      </section>

      <section className="relative overflow-hidden bg-white pt-0">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-34"
            style={{ backgroundImage: 'url(/images/bg/bg-5.png)' }}
          />
          <div className="absolute inset-0 bg-[rgba(255,255,255,0.64)]" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-4 pb-16 sm:px-6 md:pb-20 lg:px-8 lg:pb-24 mt-20">
          <motion.div
            className="mx-auto -mt-14 border border-slate-200 bg-white px-4 pb-10 pt-8 shadow-lg shadow-black/10 sm:px-8 sm:pb-12 lg:-mt-24 lg:px-12 lg:pb-14 lg:pt-10"
            style={{ y: formCardY }}
            variants={staggerContainer(0.08, 0.03)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          >
            <motion.div variants={fadeUp} className="mx-auto max-w-6xl mt-5">
              <div className="mt-2">
                <div>
                  <p className="section-label text-[#173036]">Tailor-Made Travel</p>
                  <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-slate-900">Your Trip</h2>
                  <p className="mt-4 max-w-3xl text-sm md:text-base font-normal leading-6 md:leading-7 text-slate-600">
                    Share your requirements and we’ll craft a Sri Lanka itinerary around your travel style, budget, and interests.
                  </p>
                </div>

              </div>

              {success && (
                <motion.div ref={feedbackRef} variants={fadeUp} className="mt-8 border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-900">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    <div>
                      <p className="font-semibold">Your inquiry has been sent.</p>
                      <p className="text-sm font-normal text-emerald-800">We have sent a confirmation to {submittedEmail || 'your email address'}.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div ref={feedbackRef} variants={fadeUp} className="mt-8 border border-rose-200 bg-rose-50 px-5 py-4 text-rose-900">
                  <p className="text-sm font-semibold">{error}</p>
                </motion.div>
              )}

              <form onSubmit={submitInquiry} className="mt-10 space-y-10">
                <motion.div variants={fadeUp} className="space-y-8">
                  {/* Personal Details */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Personal Details</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <label>
                        <span className="block mb-2 text-sm text-slate-700">Title</span>
                        <select value={form.title} onChange={(e) => updateField('title', e.target.value as (typeof form)['title'])} className="h-12 w-full border-b border-[#bfb7ad] bg-transparent px-0 text-sm text-slate-900 outline-none" required>
                          <option value="" disabled>Select title</option>
                          {titleOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </label>

                      <label>
                        <span className="block mb-2 text-sm text-slate-700">Name</span>
                        <input type="text" value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Your full name" className="h-12 w-full border-b border-[#bfb7ad] bg-transparent px-0 text-sm text-slate-900 outline-none" required />
                      </label>

                      <label>
                        <span className="block mb-2 text-sm text-slate-700">Email</span>
                        <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} placeholder="you@example.com" className="h-12 w-full border-b border-[#bfb7ad] bg-transparent px-0 text-sm text-slate-900 outline-none" required />
                      </label>

                      <label>
                        <span className="block mb-2 text-sm text-slate-700">Contact Number</span>
                        <input type="tel" value={form.contactNumber} onChange={(e) => updateField('contactNumber', e.target.value)} placeholder="+94 ..." className="h-12 w-full border-b border-[#bfb7ad] bg-transparent px-0 text-sm text-slate-900 outline-none" required />
                      </label>
                    </div>
                  </section>

                  {/* Travel Type */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Travel Type</h2>
                    <div className="mt-4">
                      <select value={form.travelType} onChange={(e) => updateField('travelType', e.target.value as (typeof form)['travelType'])} className="h-12 w-full border-b border-[#bfb7ad] bg-transparent px-0 text-sm text-slate-900 outline-none" required>
                        <option value="" disabled>Select travel type</option>
                        {travelTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </section>

                  {/* Group Information */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Group Information</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <label>
                        <span className="block mb-2 text-sm text-slate-700">Adults</span>
                        <select value={String(form.guests)} onChange={(e) => updateField('guests', e.target.value)} className="h-12 w-full border-b border-[#bfb7ad] bg-transparent px-0 text-sm text-slate-900 outline-none">
                          {adultsOptions.map((a) => <option key={a} value={a}>{a}</option>)}
                        </select>
                      </label>

                      <label>
                        <span className="block mb-2 text-sm text-slate-700">Children</span>
                        <select value={String((form as any).children ?? '0')} onChange={(e) => updateField('children' as any, e.target.value)} className="h-12 w-full border-b border-[#bfb7ad] bg-transparent px-0 text-sm text-slate-900 outline-none">
                          {childrenOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </label>
                    </div>
                  </section>

                  {/* Tour Duration */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Tour Duration</h2>
                    <div className="mt-4">
                      <select value={form.tourDuration} onChange={(e) => updateField('tourDuration', e.target.value)} className="h-12 w-full border-b border-[#bfb7ad] bg-transparent px-0 text-sm text-slate-900 outline-none" required>
                        <option value="" disabled>How long is your tour?</option>
                        {durationOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </section>

                  {/* Preferences */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Preferences</h2>
                    <div className="relative mt-4" ref={preferencesRef}>
                      <button
                        type="button"
                        onClick={() => setPreferencesOpen((current) => !current)}
                        className="flex h-12 w-full items-center justify-between border-b border-[#bfb7ad] bg-transparent px-0 text-left text-sm text-slate-900 outline-none"
                        aria-haspopup="listbox"
                        aria-expanded={preferencesOpen}
                      >
                        <span className={form.preferences.length ? 'text-slate-900' : 'text-slate-500'}>
                          {form.preferences.length ? form.preferences.join(', ') : 'Select preferences'}
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${preferencesOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {preferencesOpen && (
                        <div className="absolute z-20 mt-2 w-full border border-[#bfb7ad] bg-white shadow-[0_18px_40px_rgba(23,48,54,0.12)]">
                          <div className="max-h-64 overflow-auto py-2" role="listbox" aria-multiselectable="true">
                            {preferenceOptions.map((option) => {
                              const checked = form.preferences.includes(option);

                              return (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() =>
                                    updatePreferences(
                                      checked
                                        ? form.preferences.filter((item) => item !== option)
                                        : [...form.preferences, option],
                                    )
                                  }
                                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-slate-700 hover:bg-[#faf7f1]"
                                  role="option"
                                  aria-selected={checked}
                                >
                                  <span>{option}</span>
                                  <span className={`text-[#173036] ${checked ? 'opacity-100' : 'opacity-0'}`}>✓</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Budget Per Person */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Budget Per Person</h2>
                    <div className="mt-4">
                      <select value={form.budgetPerPerson} onChange={(e) => updateField('budgetPerPerson', e.target.value)} className="h-12 w-full border-b border-[#bfb7ad] bg-transparent px-0 text-sm text-slate-900 outline-none" required>
                        <option value="" disabled>Select budget</option>
                        {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </section>

                  {/* Additional Information */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Additional Information</h2>
                    <div className="mt-4">
                      <textarea value={form.additionalInformation} onChange={(e) => updateField('additionalInformation', e.target.value)} rows={5} placeholder="Any other requests" className="w-full border-b border-[#bfb7ad] bg-transparent px-0 py-2 text-sm text-slate-900 outline-none" />
                    </div>
                  </section>

                  {/* How did you hear about us */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">How did you hear about us?</h2>
                    <div className="mt-4">
                      <select value={form.hearAboutUs} onChange={(e) => updateField('hearAboutUs', e.target.value)} className="h-12 w-full border-b border-[#bfb7ad] bg-transparent px-0 text-sm text-slate-900 outline-none" required>
                        <option value="" disabled>Select one</option>
                        {hearingOptions.map((h) => <option key={h} value={h}>{h}</option>)}
                      </select>
                    </div>
                    {form.hearAboutUs === 'Other' && (
                      <div className="mt-4">
                        <input type="text" value={form.hearAboutUsOther} onChange={(e) => updateField('hearAboutUsOther', e.target.value)} placeholder="Please specify" className="h-12 w-full border-b border-[#bfb7ad] bg-transparent px-0 text-sm text-slate-900 outline-none" required />
                      </div>
                    )}
                  </section>
                </motion.div>

                <div className="flex justify-end gap-4 pt-6">
                  <button type="submit" disabled={loading} className="bg-[#173036] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-black/30 hover:bg-[#1a4d56] transition-all duration-300 hover:scale-102 disabled:cursor-not-allowed disabled:opacity-70">{loading ? 'Sending...' : 'Submit Inquiry'}</button>
                </div>
              </form>

              <motion.div variants={cardItem} className="mt-10 flex items-center justify-center gap-3 border-t border-[#ece4d6] pt-6 text-sm text-slate-600">
                <MapPinned className="h-4 w-4 text-slate-400" />
                <span>We’ll email you once the inquiry is received.</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Inquiry;