import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Users, User, Utensils, Mountain, Plane, Clock, ShieldCheck } from 'lucide-react';

import { defaultPackageItinerary, packageItineraries } from '../data/packageItineraries';
import { packageById, defaultPackage, packageItems } from '../data/packages';

const getTodayLocalDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const InquiryModal = ({
  pkg,
  inquiryDate,
  inquiryPeople,
  minInquiryDate,
  onClose,
  onSubmit,
  name,
  email,
  details,
  saveInfo,
  setInquiryDate,
  setInquiryPeople,
  setName,
  setEmail,
  setDetails,
  setSaveInfo,
}: {
  pkg: any;
  inquiryDate: string;
  inquiryPeople: number;
  minInquiryDate: string;
  onClose: () => void;
  onSubmit: () => void;
  name: string;
  email: string;
  details: string;
  saveInfo: boolean;
  setInquiryDate: (value: string) => void;
  setInquiryPeople: (value: number) => void;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setDetails: (value: string) => void;
  setSaveInfo: (value: boolean) => void;
}) => {
  const formattedDate = inquiryDate
    ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(inquiryDate))
    : 'Select a date';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#102445] shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#132339] text-lg font-semibold text-sky-100/80 transition hover:bg-[#1a3351] hover:text-white">
          ×
        </button>

        <div className="px-5 pb-5 pt-8 text-center sm:px-8 sm:pb-6 sm:pt-9">
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">We’d Love to Hear From You!</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-sky-100/75">
            Tell us what you need and our team will respond with a tailored travel enquiry for {pkg.title}.
          </p>
        </div>

        <form
          className="px-5 pb-6 sm:px-8 sm:pb-8"
          onSubmit={e => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="rounded-2xl border border-white/10 bg-[#13243a] p-5 sm:p-6">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Full Name</span>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full rounded-2xl border border-white/5 bg-white/95 px-5 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-300"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Email Address</span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full rounded-2xl border border-white/5 bg-white/95 px-5 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-300"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Number of People</span>
                <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/95 px-5 py-4">
                  <button
                    type="button"
                    onClick={() => setInquiryPeople(Math.max(1, inquiryPeople - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-900 transition hover:bg-slate-100"
                  >
                    −
                  </button>
                  <span className="text-lg font-semibold text-slate-900">{inquiryPeople}</span>
                  <button
                    type="button"
                    onClick={() => setInquiryPeople(inquiryPeople + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-900 transition hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-white">Travel Date</span>
                <div>
                  <input
                    type="date"
                    value={inquiryDate}
                    min={minInquiryDate}
                    onChange={e => setInquiryDate(e.target.value)}
                    className="w-full rounded-2xl border border-white/5 bg-white/95 px-5 py-4 text-slate-900 outline-none [color-scheme:light]"
                  />
                  <p className="mt-1 text-sm text-sky-100/65">{formattedDate}</p>
                </div>
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-semibold text-white">Tour Details</span>
              <textarea
                value={details}
                onChange={e => setDetails(e.target.value)}
                placeholder="Write about tour info"
                rows={7}
                className="w-full rounded-2xl border border-white/5 bg-white/95 px-5 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-300"
              />
            </label>

            <label className="mt-4 flex items-center gap-3 text-sm text-sky-100/80">
              <input
                type="checkbox"
                checked={saveInfo}
                onChange={e => setSaveInfo(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-[#102445] text-sky-400 accent-sky-400"
              />
              Save my email address & name when I comment further time.
            </label>
          </div>

          <div className="mt-6 flex justify-start">
            <button type="submit" className="rounded-full bg-[#fbf6e8] px-7 py-3.5 text-sm font-semibold text-[#1f3346] shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition hover:bg-[#f8f1dc]">
              Submit For Enquiry ↗
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BookingModal = ({
  pkg,
  adults,
  children,
  travelDate,
  minTravelDate,
  onClose,
  onConfirm,
  setAdults,
  setChildren,
  setTravelDate,
}: {
  pkg: any;
  adults: number;
  children: number;
  travelDate: string;
  minTravelDate: string;
  onClose: () => void;
  onConfirm: (selectedOption: string) => void;
  setAdults: (value: number) => void;
  setChildren: (value: number) => void;
  setTravelDate: (value: string) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState('private');

  const availabilityOptions = [
    {
      id: 'private',
      label: 'Private Tour',
      title: pkg.title,
      note: 'Best for couples, families, and travelers who want a flexible pace.',
      price: pkg.price ?? 0,
    },
    {
      id: 'family',
      label: 'Family Tour',
      title: `${pkg.title} with family-friendly pacing`,
      note: 'Ideal for shared rooms, easier transfers, and slower sightseeing.',
      price: Math.round((pkg.price ?? 0) * 0.92),
    },
    {
      id: 'group',
      label: 'Group Tour',
      title: `${pkg.title} shared departure`,
      note: 'Great if you want a social trip with the best value per person.',
      price: Math.round((pkg.price ?? 0) * 0.84),
    },
  ];

  const formattedDate = travelDate
    ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(travelDate))
    : 'Select a date';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#102445] shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#132339] text-lg font-semibold text-sky-100/80 transition hover:bg-[#1a3351] hover:text-white">
          ×
        </button>

        <div className="px-5 pb-5 pt-8 text-center sm:px-8 sm:pb-6 sm:pt-9">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-sky-200/70">Check Availability</p>
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">Dates & Availability</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-sky-100/75">
            Select your travel date and traveler count to check the best available options for {pkg.title}.
          </p>
        </div>

        <div className="grid gap-3 px-5 pb-5 sm:grid-cols-2 sm:px-8 sm:pb-6">
          <label className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left">
            <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200/65">
              <Calendar className="h-3.5 w-3.5" />
              Booking Date
            </span>
            <input
              type="date"
              value={travelDate}
              min={minTravelDate}
              onChange={e => setTravelDate(e.target.value)}
              className="w-full bg-transparent text-lg text-white outline-none [color-scheme:dark]"
            />
            <p className="mt-1 text-sm text-sky-100/65">{formattedDate}</p>
          </label>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left">
            <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-200/65">
              <User className="h-3.5 w-3.5" />
              Select Travelers
            </span>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#10223c] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.22em] text-sky-100/60">Adults</p>
                <div className="mt-2 flex items-center justify-between">
                  <button onClick={() => setAdults(Math.max(1, adults - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-200/40 text-sky-100 transition hover:bg-sky-200/10">-</button>
                  <span className="text-lg font-semibold text-white">{adults}</span>
                  <button onClick={() => setAdults(adults + 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-200/40 text-sky-100 transition hover:bg-sky-200/10">+</button>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#10223c] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.22em] text-sky-100/60">Children</p>
                <div className="mt-2 flex items-center justify-between">
                  <button onClick={() => setChildren(Math.max(0, children - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-200/40 text-sky-100 transition hover:bg-sky-200/10">-</button>
                  <span className="text-lg font-semibold text-white">{children}</span>
                  <button onClick={() => setChildren(children + 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-200/40 text-sky-100 transition hover:bg-sky-200/10">+</button>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-sky-100/65">Minimum traveler count depends on the selected tour option.</p>
          </div>
        </div>

        <div className="space-y-3 px-5 pb-5 sm:px-8 sm:pb-6">
          {availabilityOptions.map(option => {
            const isSelected = selectedOption === option.id;

            return (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-4 text-left transition ${isSelected ? 'border-sky-300/50 bg-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.22)]' : 'border-white/10 bg-white/5 hover:border-sky-200/30 hover:bg-white/8'}`}
              >
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${isSelected ? 'border-white' : 'border-white/50'}`}>
                  <span className={`h-2.5 w-2.5 rounded-full ${isSelected ? 'bg-sky-200' : 'bg-transparent'}`} />
                </span>

                <div className="min-w-0 flex-1">
                  <div className={`mb-2 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${isSelected ? 'bg-sky-500 text-white' : 'bg-sky-500/90 text-white'}`}>
                    {option.label}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-sky-100/68">{option.note}</p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-xs uppercase tracking-[0.22em] text-sky-100/55">From</p>
                  <p className="mt-1 text-xl font-semibold text-white">${option.price.toLocaleString()}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-sky-100/55">Travel Summary</p>
            <p className="mt-1 text-sm text-sky-100/80">
              {formattedDate} · {adults} Adult{adults === 1 ? '' : 's'}{children > 0 ? `, ${children} Child${children === 1 ? '' : 'ren'}` : ''}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:min-w-[220px]">
            <button onClick={() => onConfirm(selectedOption)} className="w-full rounded-full bg-[#fbf6e8] py-3.5 text-sm font-semibold text-[#1f3346] shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition hover:bg-[#f8f1dc]">
              Book Now
            </button>
            <button onClick={onClose} className="w-full rounded-full border border-[#2e4b74] bg-transparent py-3.5 text-sm font-semibold text-[#8fb8ff] transition hover:bg-[#132339]">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PackageDetail = () => {
  const { id = 'default' } = useParams();
  const navigate = useNavigate();
  const pkg = packageById[id] || defaultPackage;
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(1);
  const [travelDate, setTravelDate] = useState(() => getTodayLocalDateString());
  const [showModal, setShowModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [booked, setBooked] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryDetails, setInquiryDetails] = useState('');
  const [saveInquiryInfo, setSaveInquiryInfo] = useState(false);
  const [inquiryDate, setInquiryDate] = useState(() => getTodayLocalDateString());
  const [inquiryPeople, setInquiryPeople] = useState(1);
  const minTravelDate = getTodayLocalDateString();

  const mapQuery = (() => {
    const primaryDestination = pkg.destinations?.[0];
    if (primaryDestination) return `${primaryDestination}, Sri Lanka`;
    if (pkg.location) return `${pkg.location}, Sri Lanka`;
    return 'Sri Lanka';
  })();

  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  const mapExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const itinerary = packageItineraries[id] ?? pkg.itinerary ?? defaultPackageItinerary;
  const totalTravelers = adults + children;
  const travelSummary = `${adults} Adult${adults === 1 ? '' : 's'}${children > 0 ? `, ${children} Child${children === 1 ? '' : 'ren'}` : ''}`;

  const similarPackages = (() => {
    const desiredCount = 6;
    const selected = new Map<string, any>();

    (pkg.similar ?? []).forEach((item: any) => {
      if (item?.id && item.id !== pkg.id && !selected.has(item.id) && selected.size < desiredCount) {
        selected.set(item.id, item);
      }
    });

    packageItems.forEach((item) => {
      if (selected.size >= desiredCount) return;
      const isRelated = item.id !== pkg.id && (item.category === pkg.category || item.type === pkg.type);
      if (isRelated && !selected.has(item.id)) {
        selected.set(item.id, item);
      }
    });

    packageItems.forEach((item) => {
      if (selected.size >= desiredCount) return;
      if (item.id !== pkg.id && !selected.has(item.id)) {
        selected.set(item.id, item);
      }
    });

    return Array.from(selected.values());
  })();

  const handleConfirm = (selectedOption: string) => {
    setShowModal(false);
    setBooked(true);

    const tourOptions: Record<string, { label: string; title: string; priceMultiplier: number }> = {
      private: { label: 'Private Tour', title: pkg.title, priceMultiplier: 1 },
      family: { label: 'Family Tour', title: `${pkg.title} with family-friendly pacing`, priceMultiplier: 0.92 },
      group: { label: 'Group Tour', title: `${pkg.title} shared departure`, priceMultiplier: 0.84 },
    };

    const tourOption = tourOptions[selectedOption];
    const finalPrice = Math.round((pkg.price ?? 0) * tourOption.priceMultiplier);
    const formattedDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(travelDate));
    const totalTravelers = adults + children;
    const dateRange = `${formattedDate}` + (pkg.days ? ` (${pkg.days} days)` : '');

    const bookingData = {
      id: `${pkg.id}-${Date.now()}`,
      title: tourOption.title,
      dates: dateRange,
      travelers: totalTravelers,
      tier: tourOption.label,
      price: finalPrice,
      img: pkg.img,
      packageId: pkg.id,
      tourType: selectedOption,
      travelDate,
      adults,
      children,
    };

    const cartStorageKey = 'tctCartBookings';
    const existingCartItems = (() => {
      try {
        const saved = localStorage.getItem(cartStorageKey);
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    })();

    localStorage.setItem(cartStorageKey, JSON.stringify([...existingCartItems, bookingData]));

    setTimeout(() => navigate('/cart', { state: { newBooking: bookingData } }), 1500);
  };

  return (
    <div className="min-h-screen bg-tct-dark">
      <div className="relative h-[72vh] overflow-hidden">
        <img src={pkg.img} alt={pkg.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tct-dark/30 to-tct-dark" />
        <div className="absolute bottom-8 left-8">
          <p className="section-label mb-2">{pkg.category}</p>
          <h1 className="font-display text-6xl font-black text-white">{pkg.title}</h1>
        </div>
      </div>

      <div className="bg-[#163b41]">
        <div className="mx-auto max-w-7xl px-6 py-16 text-white">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="space-y-12 lg:col-span-2">
              <div>
                <h2 className="mb-5 font-display text-3xl text-white">Package Overview</h2>
                <p className="mb-8 max-w-3xl leading-relaxed text-sky-100">{pkg.description}</p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: Utensils, label: pkg.features },
                    { icon: Mountain, label: 'Luxury Expedition' },
                    { icon: Plane, label: pkg.transport },
                    { icon: Clock, label: pkg.duration },
                  ].map(item => {
                    const BadgeIcon = item.icon;
                    return (
                    <div key={item.label} className="flex min-w-[150px] items-center gap-2 rounded-xl border border-white/5 bg-[#132e34] px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
                      <BadgeIcon className="h-4 w-4 text-[#a7d9d5] shrink-0" />
                      <span className="text-sm text-white">{item.label}</span>
                    </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="mb-6 font-display text-3xl text-white">Day by Day Itinerary</h2>
                <div className="space-y-4">
                  {itinerary.map((item: any) => (
                    <div key={item.day} className="flex gap-4">
                      <div className="tct-badge self-start whitespace-nowrap">Day {item.day}</div>
                      <div>
                        <h3 className="mb-2 font-display text-xl text-white">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-sky-100">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 rounded-2xl bg-[#102445] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
                <div className="mb-6 flex items-start justify-between">
                    <div>
                      <p className="mb-1 text-xs text-sky-200/60">Starting From</p>
                      <p className="font-display text-4xl font-bold text-white">${(pkg.price ?? 0).toLocaleString()}</p>
                      <p className="text-xs text-sky-100/60">Price per person, twin share</p>
                    </div>
                  </div>

                <div className="mb-4">
                  <label className="section-label mb-2 block text-[10px]">Select Departure Date</label>
                  <div className="flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-[#132339] px-4 py-3 text-sky-100">
                    <span className="text-sm">{new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(travelDate))}</span>
                    <Calendar className="h-4 w-4 text-[#a7d9d5]" />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="section-label mb-2 block text-[10px]">Travelers</label>
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#132339] px-4 py-3">
                    <span className="text-sm text-white">{travelSummary}</span>
                    <Users className="h-4 w-4 text-[#a7d9d5]" />
                  </div>
                </div>

                <div className="mb-6 space-y-2 border-b border-white/10 pb-6 text-sm">
                  <div className="flex justify-between text-sky-100/75">
                    <span>Base Package (x{totalTravelers})</span>
                    <span>${(((pkg.price ?? 0) * totalTravelers)).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sky-100/75">
                    <span>Equipment Rental</span>
                    <span>$450</span>
                  </div>
                </div>

                <div className="mb-6 flex justify-between">
                  <span className="font-semibold text-white">Total Amount</span>
                  <span className="font-bold text-white">${(((pkg.price ?? 0) * totalTravelers + 450)).toLocaleString()}</span>
                </div>

                <button onClick={() => setShowModal(true)} className="mb-3 w-full rounded-full bg-[#fbf6e8] py-3.5 text-sm font-semibold text-[#1f3346] shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition hover:bg-[#f8f1dc]">
                  {booked ? '✓ Booking Confirmed!' : 'Book Now'}
                </button>
                <button onClick={() => setShowInquiryModal(true)} className="mb-3 w-full rounded-full border border-[#2e4b74] bg-transparent py-3.5 text-sm font-semibold text-[#8fb8ff] transition hover:bg-[#132339]">Send Inquiry</button>
                <p className="flex items-center justify-center gap-1 text-center text-xs text-sky-100/60"><ShieldCheck className="h-3.5 w-3.5" /> Secure Booking Guaranteed</p>
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-[#10243a] shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
              <h2 className="font-display text-2xl text-white">Destination Map</h2>
              <a
                href={mapExternalUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-sky-100 transition hover:border-sky-300 hover:text-sky-300"
              >
                Open in Maps
              </a>
            </div>

            <div className="h-[440px] w-full">
              <iframe
                title="Interactive destination map"
                src={mapEmbedUrl}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {similarPackages.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-8 font-display text-4xl text-white">Similar Journeys</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {similarPackages.map((s: any) => (
                  <div
                    key={s.id}
                    onClick={() => navigate(`/packages/${s.id}`)}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-[#16263d] shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="h-44 overflow-hidden bg-[#0d1722]">
                      {s.img ? (
                        <img src={s.img} alt={s.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_rgba(10,16,26,0.96)_72%)] px-4 text-center">
                          <div>
                            <p className="mb-2 text-[10px] uppercase tracking-[0.35em] text-[#8ea7ba]">Starlit Retreats</p>
                            <p className="font-display text-xl text-[#f2f2ea]">Safe Work</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="bg-[#13243a] p-4">
                      <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-sky-300/80">{s.type}</p>
                      <h3 className="mb-1 font-display text-lg text-white">{s.title}</h3>
                      <div className="flex items-end justify-between gap-3 text-sm">
                        <span className="text-sky-100">{s.days ?? 0} Days</span>
                        <span className="font-semibold text-sky-300">${(s.price ?? 0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <BookingModal
          pkg={pkg}
          adults={adults}
          children={children}
          travelDate={travelDate}
          minTravelDate={minTravelDate}
          onClose={() => setShowModal(false)}
          onConfirm={(selectedOption) => handleConfirm(selectedOption)}
          setAdults={setAdults}
          setChildren={setChildren}
          setTravelDate={setTravelDate}
        />
      )}

      {showInquiryModal && (
        <InquiryModal
          pkg={pkg}
          inquiryDate={inquiryDate}
          inquiryPeople={inquiryPeople}
          minInquiryDate={minTravelDate}
          name={inquiryName}
          email={inquiryEmail}
          details={inquiryDetails}
          saveInfo={saveInquiryInfo}
          onClose={() => setShowInquiryModal(false)}
          onSubmit={() => {
            setShowInquiryModal(false);
          }}
          setInquiryDate={setInquiryDate}
          setInquiryPeople={setInquiryPeople}
          setName={setInquiryName}
          setEmail={setInquiryEmail}
          setDetails={setInquiryDetails}
          setSaveInfo={setSaveInquiryInfo}
        />
      )}
    </div>
  );
};

export default PackageDetail;
