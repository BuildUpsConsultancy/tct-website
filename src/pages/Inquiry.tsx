import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Lenis from 'lenis';
import { ChevronDown, MapPinned, Phone, Mail } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { pageVariants, staggerContainer, fadeUp, cardItem } from '../lib/motion';
import { countryCodesList } from '../data/countries';

const titleOptions = ['Mr.', 'Mrs.', 'Ms.'] as const;
const preferenceOptions = ['Wildlife', 'Adventure', 'Beaches', 'Historical Areas', 'Culture & Heritage', 'Hidden Trails'];
const budgetOptions = ['GBP 1000–2000', 'GBP 2000–3500', 'GBP 3500–5000', 'GBP 5000+'];
const hearingOptions = ['The Coconut Tree Restaurant', 'Instagram', 'Facebook', 'Google', 'TikTok', 'YouTube', 'Other'];
const adultsOptions = ['1', '2', '3', '4', '5+'];
const childrenOptions = ['0', '1', '2', '3', '4', '5+'];

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder,
  isOpen,
  setIsOpen
}: {
  options: readonly string[] | string[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen, isOpen]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-full items-center justify-between border-b border-[#bfb7ad] bg-transparent px-0 text-left text-sm text-slate-900 outline-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={value ? 'text-slate-900' : 'text-slate-500'}>
          {value || placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-full border border-[#bfb7ad] bg-white shadow-[0_18px_40px_rgba(23,48,54,0.12)]">
          <div className="max-h-64 overflow-auto py-2" role="listbox" data-lenis-prevent="true">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-slate-700 hover:bg-[#faf7f1]"
                role="option"
                aria-selected={value === option}
              >
                <span>{option}</span>
                <span className={`text-[#173036] ${value === option ? 'opacity-100' : 'opacity-0'}`}>✓</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CountrySelect = ({
  value,
  onChange,
  isOpen,
  setIsOpen
}: {
  value: string;
  onChange: (val: string) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        setSearchTerm(prev => prev + e.key.toLowerCase());
      } else if (e.key === 'Backspace') {
        setSearchTerm(prev => prev.slice(0, -1));
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (searchTerm && isOpen) {
      const matchIndex = countryCodesList.findIndex(c => c.name.toLowerCase().startsWith(searchTerm));
      if (matchIndex !== -1) {
        const listbox = dropdownRef.current?.querySelector('[role="listbox"]');
        if (listbox && listbox.children[matchIndex]) {
          const option = listbox.children[matchIndex] as HTMLElement;
          option.scrollIntoView({ block: 'nearest' });
        }
      }
      const timeout = setTimeout(() => setSearchTerm(''), 1500);
      return () => clearTimeout(timeout);
    }
  }, [searchTerm, isOpen]);

  const selectedCountry = countryCodesList.find((c) => c.code === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-full items-center justify-between border-b border-[#bfb7ad] bg-transparent px-0 text-left text-sm text-slate-900 outline-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          {selectedCountry ? (
            <>
              <img src={`https://flagcdn.com/w20/${selectedCountry.iso}.png`} srcSet={`https://flagcdn.com/w40/${selectedCountry.iso}.png 2x`} width="20" alt={selectedCountry.name} className="inline-block shrink-0" />
              <span className={value ? 'text-slate-900' : 'text-slate-500'}>{selectedCountry.code}</span>
            </>
          ) : (
            <>
              <img src="https://flagcdn.com/w20/gb.png" srcSet="https://flagcdn.com/w40/gb.png 2x" width="20" alt="United Kingdom" className="inline-block shrink-0" />
              <span className="text-slate-500">+44</span>
            </>
          )}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-[280px] border border-[#bfb7ad] bg-white shadow-[0_18px_40px_rgba(23,48,54,0.12)]">
          <div className="max-h-64 overflow-auto py-2" role="listbox" data-lenis-prevent="true">
            {countryCodesList.map((country) => (
              <button
                key={country.name}
                type="button"
                onClick={() => {
                  onChange(country.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm text-slate-700 hover:bg-[#faf7f1] ${value === country.code ? 'bg-[#faf7f1]' : ''}`}
                role="option"
                aria-selected={value === country.code}
              >
                <span className="flex items-center gap-2">
                  <img src={`https://flagcdn.com/w20/${country.iso}.png`} srcSet={`https://flagcdn.com/w40/${country.iso}.png 2x`} width="20" alt={country.name} className="inline-block shrink-0" />
                  <span>{country.name} ({country.code})</span>
                </span>
                <span className={`text-[#173036] ${value === country.code ? 'opacity-100' : 'opacity-0'}`}>✓</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const initialState = {
  title: 'Mr.' as '' | (typeof titleOptions)[number],
  name: '',
  email: '',
  countryCode: '+44',
  contactNumber: '',
  guests: '2',
  children: '0',
  tourDuration: '7',
  preferences: [] as string[],
  budgetPerPerson: '',
  additionalInformation: '',
  hearAboutUs: '',
  hearAboutUsOther: '',
};

const Inquiry = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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
      if (preferencesRef.current && !preferencesRef.current.contains(event.target as Node) && openDropdown === 'preferences') {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  useEffect(() => {
    if (error && feedbackRef.current) {
      feedbackRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [error]);

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
    `Contact Number: ${form.countryCode} ${form.contactNumber}`,
    `Title: ${form.title}`,
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

    if (!serviceId || !inquiryTemplateId || !confirmationTemplateId || !publicKey) {
      setError('Email delivery is not configured yet. Add the EmailJS environment variables first.');
      return;
    }

    setLoading(true);

    const sharedParams = {
      customer_title: form.title,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: `${form.countryCode} ${form.contactNumber}`,
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

      setForm(initialState);
      navigate('/thank-you', { state: { email: emailForFeedback } });
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
      <section className="relative overflow-hidden pt-12 sm:pt-16">
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
            className="absolute inset-0 bg-[length:100%_100%] bg-no-repeat opacity-34"
            style={{ backgroundImage: 'url(/images/bg/bg-5.png)' }}
          />
          <div className="absolute inset-0 bg-[rgba(255,255,255,0.64)]" />
        </div>

        <div className="relative mx-auto max-w-[1280px] px-4 pb-16 sm:px-6 md:pb-20 lg:px-8 lg:pb-24 mt-20">
          <div className="mx-auto max-w-7xl flex flex-col lg:flex-row gap-8 xl:gap-12 lg:items-start">
            <motion.div
              className="flex-1 -mt-14 border border-slate-200 bg-white px-4 pb-10 pt-8 shadow-lg shadow-black/10 sm:px-8 sm:pb-12 lg:-mt-24 lg:px-12 lg:pb-14 lg:pt-10"
              style={{ y: formCardY }}
              variants={staggerContainer(0.08, 0.03)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            >
              <div className="mt-2">
                <div>
                  <p className="section-label text-[#173036]">Tailor-Made Travel</p>
                  <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-[-0.03em] text-slate-900 tracking-wide">Your Trip</h2>
                  <p className="mt-4 max-w-3xl text-sm md:text-base font-normal leading-6 md:leading-7 text-slate-600">
                    Share your requirements and we’ll craft a Sri Lanka itinerary around your travel style, budget, and interests.
                  </p>
                </div>

              </div>



              {error && (
                <motion.div ref={feedbackRef} variants={fadeUp} className="mt-8 border border-rose-200 bg-rose-50 px-5 py-4 text-rose-900">
                  <p className="text-sm font-semibold">{error}</p>
                </motion.div>
              )}

              <form onSubmit={submitInquiry} className="mt-8 space-y-6">
                <motion.div variants={fadeUp} className="space-y-6">
                  {/* Personal Details */}
                  <section className="relative z-40">
                    <h2 className="text-xl sm:text-2xl text-[#173036] tracking-wide">Personal Details</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="relative z-50">
                        <span className="block mb-2 text-sm text-slate-700">Title</span>
                        <CustomSelect
                          options={titleOptions}
                          value={form.title}
                          onChange={(val) => updateField('title', val as any)}
                          placeholder="Select title"
                          isOpen={openDropdown === 'title'}
                          setIsOpen={(val) => setOpenDropdown(val ? 'title' : null)}
                        />
                      </div>

                      <label>
                        <span className="block mb-2 text-sm text-slate-700">Name</span>
                        <input type="text" value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Your full name" className="h-12 w-full border-b border-[#bfb7ad] bg-transparent px-0 text-sm text-slate-900 outline-none" required />
                      </label>

                      <label>
                        <span className="block mb-2 text-sm text-slate-700">Email</span>
                        <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} placeholder="you@example.com" className="h-12 w-full border-b border-[#bfb7ad] bg-transparent px-0 text-sm text-slate-900 outline-none" required />
                      </label>

                      <div className="relative z-40">
                        <span className="block mb-2 text-sm text-slate-700">Contact Number</span>
                        <div className="flex items-center gap-4">
                          <div className="w-[100px] shrink-0">
                            <CountrySelect
                              value={form.countryCode}
                              onChange={(val) => updateField('countryCode', val)}
                              isOpen={openDropdown === 'countryCode'}
                              setIsOpen={(val) => setOpenDropdown(val ? 'countryCode' : null)}
                            />
                          </div>
                          <div className="flex-1">
                            <input type="tel" value={form.contactNumber} onChange={(e) => updateField('contactNumber', e.target.value)} placeholder="Phone number" className="h-12 w-full border-b border-[#bfb7ad] bg-transparent px-0 text-sm text-slate-900 outline-none" required />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Group Information */}
                  <section className="relative z-20">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#173036] tracking-wide">Group Information</h2>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <div className="relative z-20">
                        <span className="block mb-2 text-sm text-slate-700">Adults</span>
                        <CustomSelect
                          options={adultsOptions}
                          value={String(form.guests)}
                          onChange={(val) => updateField('guests', val)}
                          placeholder="Select adults"
                          isOpen={openDropdown === 'guests'}
                          setIsOpen={(val) => setOpenDropdown(val ? 'guests' : null)}
                        />
                      </div>

                      <div className="relative z-10">
                        <span className="block mb-2 text-sm text-slate-700">Children</span>
                        <CustomSelect
                          options={childrenOptions}
                          value={String((form as any).children ?? '0')}
                          onChange={(val) => updateField('children' as any, val)}
                          placeholder="Select children"
                          isOpen={openDropdown === 'children'}
                          setIsOpen={(val) => setOpenDropdown(val ? 'children' : null)}
                        />
                      </div>
                    </div>
                  </section>

                  {/* Tour Duration */}
                  <section className="relative z-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#173036] tracking-wide">Tour Duration</h2>
                    <div className="mt-6">
                      <div className="flex items-center justify-center text-sm font-medium text-slate-700 mb-4">
                        <span className="text-[#173036] font-bold text-lg">{form.tourDuration} {form.tourDuration === '1' ? 'Day' : 'Days'}</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="21"
                        value={form.tourDuration || '7'}
                        onChange={(e) => updateField('tourDuration', e.target.value)}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#173036]"
                      />
                    </div>
                  </section>

                  {/* Preferences */}
                  <section className="relative" style={{ zIndex: 9 }}>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#173036] tracking-wide">Preferences</h2>
                    <div className="relative mt-4" ref={preferencesRef}>
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(openDropdown === 'preferences' ? null : 'preferences')}
                        className="flex h-12 w-full items-center justify-between border-b border-[#bfb7ad] bg-transparent px-0 text-left text-sm text-slate-900 outline-none"
                        aria-haspopup="listbox"
                        aria-expanded={openDropdown === 'preferences'}
                      >
                        <span className={form.preferences.length ? 'text-slate-900' : 'text-slate-500'}>
                          {form.preferences.length ? form.preferences.join(', ') : 'Select preferences'}
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === 'preferences' ? 'rotate-180' : ''}`} />
                      </button>

                      {openDropdown === 'preferences' && (
                        <div className="absolute z-20 mt-2 w-full border border-[#bfb7ad] bg-white shadow-[0_18px_40px_rgba(23,48,54,0.12)]">
                          <div className="max-h-64 overflow-auto py-2" role="listbox" aria-multiselectable="true" data-lenis-prevent="true">
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
                  <section className="relative" style={{ zIndex: 8 }}>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#173036] tracking-wide">Budget Per Person</h2>
                    <div className="mt-4">
                      <CustomSelect
                        options={budgetOptions}
                        value={form.budgetPerPerson}
                        onChange={(val) => updateField('budgetPerPerson', val)}
                        placeholder="Select budget"
                        isOpen={openDropdown === 'budget'}
                        setIsOpen={(val) => setOpenDropdown(val ? 'budget' : null)}
                      />
                    </div>
                  </section>

                  {/* Additional Information */}
                  <section>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#173036] tracking-wide">Additional Information</h2>
                    <div className="mt-4">
                      <textarea value={form.additionalInformation} onChange={(e) => updateField('additionalInformation', e.target.value)} rows={5} placeholder="Any other requests" className="w-full border-b border-[#bfb7ad] bg-transparent px-0 py-2 text-sm text-slate-900 outline-none" />
                    </div>
                  </section>

                  {/* How did you hear about us */}
                  <section className="relative" style={{ zIndex: 7 }}>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#173036] tracking-wide">How did you hear about us?</h2>
                    <div className="mt-4">
                      <CustomSelect
                        options={hearingOptions}
                        value={form.hearAboutUs}
                        onChange={(val) => updateField('hearAboutUs', val)}
                        placeholder="Select one"
                        isOpen={openDropdown === 'hearAboutUs'}
                        setIsOpen={(val) => setOpenDropdown(val ? 'hearAboutUs' : null)}
                      />
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

            {/* Sidebar */}
            <motion.div
              className="w-full lg:w-[380px] xl:w-[420px] shrink-0 space-y-8 mt-10 lg:mt-[-6rem]"
              style={{ y: formCardY }}
            >
              <div className="bg-[#173036] p-8 sm:p-10 text-white shadow-xl shadow-[#173036]/10">
                <h4 className="text-2xl sm:text-3xl text-[#ece4d6] leading-tight">
                  Your life story doesn't write itself so let us <span className="italic">help you</span>
                </h4>
                <p className="mt-4 text-sm text-white/80 font-light leading-relaxed">
                  Please get in touch on the below to start planning your personalised journey
                </p>

                <div className="mt-10 space-y-5">
                  <div className="flex items-center gap-4">
                    <Phone className="h-4 w-4 text-white/60 shrink-0" />
                    <a href="tel:+441937228844" className="text-sm font-medium hover:text-[#a7d9d5] transition-colors">(+44) 1937 228 844 (UK)</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="h-4 w-4 text-white/60 shrink-0" />
                    <a href="tel:+91345533865" className="text-sm font-medium hover:text-[#a7d9d5] transition-colors">(+91) 345 533 865 (Global)</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="h-4 w-4 text-white/60 shrink-0" />
                    <a href="mailto:info@thecoconuttreetrails.com" className="text-sm font-medium hover:text-[#a7d9d5] transition-colors">info@thecoconuttreetrails.com</a>
                  </div>
                </div>
              </div>

              {/* Reviews Box */}
              <div className="bg-white border border-slate-200 p-8 shadow-sm text-center">
                <div className="flex justify-center items-center gap-1 mb-2">
                  <div className="flex items-center gap-2 text-[#00aa6c]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-4c1.38 0 2.5-1.12 2.5-2.5S10.88 11 9.5 11 7 12.12 7 13.5s1.12 2.5 2.5 2.5zm5 0c1.38 0 2.5-1.12 2.5-2.5S15.88 11 14.5 11 12 12.12 12 13.5s1.12 2.5 2.5 2.5z" /></svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><circle cx="12" cy="12" r="10" /></svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><circle cx="12" cy="12" r="10" /></svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><circle cx="12" cy="12" r="10" /></svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><circle cx="12" cy="12" r="10" /></svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /><path d="M12 4v16c4.41 0 8-3.59 8-8s-3.59-8-8-8z" /></svg>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium">Rated 5.0 on TripAdvisor</p>

                <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center">
                  <span className="font-bold text-xl mb-2 text-slate-900 tracking-tight">feefo<span className="text-yellow-400 ml-1 font-serif">❝</span></span>
                  <div className="flex gap-1 text-yellow-400 mb-2">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Rated 4.9 on feefo</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Inquiry;