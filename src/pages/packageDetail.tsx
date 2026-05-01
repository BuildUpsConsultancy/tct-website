import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const packageData: Record<string, any> = {
  aurora: {
    title: 'The Aurora Expedition',
    category: 'Aurora Expedition',
    description:
      'Witness the celestial dance of the Northern Lights in its most majestic form. This curated voyage takes you deep into the heart of the Arctic Circle, combining high-end luxury with the raw, untamed beauty of the polar wilderness. From glass-igloo retreats to private husky sledding adventures, every moment is designed to be cinematic.',
    price: 5299,
    duration: '7 Days / 6 Nights',
    category2: 'Luxury Expedition',
    transport: 'Private Jet',
    features: 'All Inclusive',
    img: '/images/image_1.png',
    itinerary: [
      {
        day: '01',
        title: 'Arrival in the Frozen Realm',
        desc:
          'Private transfer to the Starry Sky Lodge. Evening welcome cocktails under the early twilight and a briefing on the week\'s celestial forecast.',
      },
      {
        day: '02',
        title: 'The Husky Trails',
        desc:
          'Drive your own team of eager huskies through snow-dusted forests. Afternoon fireside lunch in a traditional Sami tent.',
      },
      {
        day: '03',
        title: 'Midnight Aurora Hunt',
        desc:
          'Venture deep into the wilderness by snowmobile to find the optimal viewing spot for the lights, guided by expert astronomers.',
      },
    ],
    similar: [
      { id: 'svalbard1', title: 'Svalbard Star-Gaze', type: 'Arctic Expeditions', days: 10, price: 6450, img: '/images/image_2.png' },
      { id: 'svalbard2', title: 'Svalbard Star-Gaze', type: 'Arctic Expeditions', days: 10, price: 6450, img: '/images/image_3.png' },
      { id: 'iceland1', title: 'Icelandic Isolation', type: 'Starlit Retreats', days: 5, price: 4800, img: '' },
      { id: 'svalbard3', title: 'Svalbard Star-Gaze', type: 'Arctic Expeditions', days: 10, price: 6450, img: '/images/image_4.png' },
      { id: 'iceland2', title: 'Icelandic Isolation', type: 'Starlit Retreats', days: 5, price: 4800, img: '' },
      { id: 'iceland3', title: 'Icelandic Isolation', type: 'Starlit Retreats', days: 5, price: 4800, img: '' },
    ],
  },
};

const defaultPackage = {
  title: 'The Aurora Expedition',
  category: 'Aurora Expedition',
  description: 'Witness the celestial dance of the Northern Lights in its most majestic form.',
  price: 5299,
  duration: '7 Days / 6 Nights',
  transport: 'Private Jet',
  features: 'All Inclusive',
  img: '/images/image_1.png',
  itinerary: [
    { day: '01', title: 'Arrival in the Frozen Realm', desc: 'Private transfer to the Starry Sky Lodge. Evening welcome cocktails.' },
    { day: '02', title: 'The Husky Trails', desc: 'Drive your own team of eager huskies through snow-dusted forests.' },
    { day: '03', title: 'Midnight Aurora Hunt', desc: 'Venture deep into the wilderness by snowmobile.' },
  ],
  similar: [],
};

const BookingModal = ({ pkg, onClose, onConfirm }: { pkg: any; onClose: () => void; onConfirm: () => void }) => (
  <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="bg-tct-navy rounded-3xl p-8 w-full max-w-md mx-4 animate-fade-up relative">
      <button onClick={onClose} className="absolute top-5 right-5 text-tct-muted hover:text-tct-white text-xl">✕</button>
      <h2 className="font-display text-3xl text-tct-white mb-2">Complete Your Booking</h2>
      <p className="text-tct-muted text-sm mb-8">
        Secure your spot for the <span className="text-tct-accent2">Arctic Silence</span> expedition.
      </p>

      <div className="bg-tct-navy-light/70 border border-tct-accent2/20 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-tct-accent2">🎫</span>
          <span className="section-label">Order Summary</span>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-tct-muted">
            <span>Base Package</span>
            <span className="text-tct-white font-semibold">${pkg.price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-tct-muted">
            <span>Travelers (x2)</span>
            <span className="text-tct-white font-semibold">Included</span>
          </div>
          <div className="flex justify-between text-tct-muted">
            <span>Service Fee</span>
            <span className="text-tct-white font-semibold">$124</span>
          </div>
          <div className="tct-divider my-3" />
          <div>
            <p className="section-label text-[10px] mb-1">Total Amount</p>
            <p className="font-display text-4xl text-tct-white font-bold">${(pkg.price + 124).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <button onClick={onConfirm} className="btn-primary w-full py-4 text-sm mb-3">Confirm Booking</button>
      <button onClick={onClose} className="btn-dark w-full py-4 text-sm">Cancel</button>
    </div>
  </div>
);

const PackageDetail = () => {
  const { id = 'aurora' } = useParams();
  const navigate = useNavigate();
  const pkg = packageData[id] || defaultPackage;
  const [travelers, setTravelers] = useState(2);
  const [date] = useState('Jan 12 - Jan 18, 2025');
  const [showModal, setShowModal] = useState(false);
  const [booked, setBooked] = useState(false);

  const handleConfirm = () => {
    setShowModal(false);
    setBooked(true);
    setTimeout(() => navigate('/cart'), 1500);
  };

  return (
    <div className="min-h-screen bg-tct-dark">
      <div className="relative h-[60vh] overflow-hidden">
        <img src={pkg.img} alt={pkg.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tct-dark/30 to-tct-dark" />
        <div className="absolute bottom-8 left-8">
          <p className="section-label mb-2">{pkg.category}</p>
          <h1 className="font-display text-6xl font-black text-tct-white">{pkg.title}</h1>
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
                    { icon: '🍽', label: pkg.features },
                    { icon: '🏔', label: 'Luxury Expedition' },
                    { icon: '✈️', label: pkg.transport },
                    { icon: '🕐', label: pkg.duration },
                  ].map(item => (
                    <div key={item.label} className="flex min-w-[150px] items-center gap-2 rounded-xl border border-white/5 bg-[#132e34] px-4 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.22)]">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm text-white">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-6 font-display text-3xl text-white">Day by Day Itinerary</h2>
                <div className="space-y-4">
                  {pkg.itinerary.map((item: any) => (
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

              <div className="relative h-48 overflow-hidden rounded-2xl tct-card">
                <div className="absolute inset-0 flex items-center justify-center bg-tct-mid/50">
                  <div className="text-center">
                    <p className="mb-2 text-4xl text-tct-accent2">📍</p>
                    <p className="font-display text-lg text-white">Base Camp: Arctic Circle</p>
                    <div className="tct-badge mt-2">Interactive Route</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 rounded-2xl bg-[#102445] p-6 shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <p className="mb-1 text-xs text-sky-200/60">Starting From</p>
                    <p className="font-display text-4xl font-bold text-white">${pkg.price.toLocaleString()}</p>
                    <p className="text-xs text-sky-100/60">Price per person, twin share</p>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="section-label mb-2 block text-[10px]">Select Departure Date</label>
                  <div className="flex cursor-pointer items-center justify-between rounded-xl border border-white/5 bg-[#132339] px-4 py-3 text-sky-100">
                    <span className="text-sm">{date}</span>
                    <span className="text-tct-accent2">📅</span>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="section-label mb-2 block text-[10px]">Travelers</label>
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#132339] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setTravelers(t => Math.max(1, t - 1))} className="flex h-6 w-6 items-center justify-center rounded-full border border-tct-accent2 text-tct-accent2 transition-colors hover:bg-tct-accent2 hover:text-tct-darker">-</button>
                      <span className="text-sm text-white">{travelers} Adults</span>
                      <button onClick={() => setTravelers(t => t + 1)} className="flex h-6 w-6 items-center justify-center rounded-full border border-tct-accent2 text-tct-accent2 transition-colors hover:bg-tct-accent2 hover:text-tct-darker">+</button>
                    </div>
                    <span className="text-tct-accent2">👥</span>
                  </div>
                </div>

                <div className="mb-6 space-y-2 border-b border-white/10 pb-6 text-sm">
                  <div className="flex justify-between text-sky-100/75">
                    <span>Base Package (x{travelers})</span>
                    <span>${(pkg.price * travelers).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sky-100/75">
                    <span>Equipment Rental</span>
                    <span>$450</span>
                  </div>
                </div>

                <div className="mb-6 flex justify-between">
                  <span className="font-semibold text-white">Total Amount</span>
                  <span className="font-bold text-white">${(pkg.price * travelers + 450).toLocaleString()}</span>
                </div>

                <button onClick={() => setShowModal(true)} className="btn-primary mb-3 w-full py-3.5 text-sm">
                  {booked ? '✓ Booking Confirmed!' : 'Book Now'}
                </button>
                <button className="btn-outline mb-3 w-full py-3.5 text-sm">Send Inquiry</button>
                <p className="flex items-center justify-center gap-1 text-center text-xs text-sky-100/60">🔒 Secure Booking Guaranteed</p>
              </div>
            </div>
          </div>

          {pkg.similar?.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-8 font-display text-4xl text-white">Similar Journeys</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {pkg.similar.map((s: any) => (
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
                        <span className="text-sky-100">{s.days} Days</span>
                        <span className="font-semibold text-sky-300">${s.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && <BookingModal pkg={pkg} onClose={() => setShowModal(false)} onConfirm={handleConfirm} />}
    </div>
  );
};

export default PackageDetail;
