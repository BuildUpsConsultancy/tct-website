import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const packageData: Record<string, any> = {
  aurora: {
    title: 'The Aurora Expedition',
    category: 'Aurora Expedition',
    description: 'Witness the celestial dance of the Northern Lights in its most majestic form. This curated voyage takes you deep into the heart of the Arctic Circle, combining high-end luxury with the raw, untamed beauty of the polar wilderness. From glass-igloo retreats to private husky sledding adventures, every moment is designed to be cinematic.',
    price: 5299,
    duration: '7 Days / 6 Nights',
    category2: 'Luxury Expedition',
    transport: 'Private Jet',
    features: 'All Inclusive',
    img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600&q=80',
    itinerary: [
      { day: '01', title: 'Arrival in the Frozen Realm', desc: 'Private transfer to the Starry Sky Lodge. Evening welcome cocktails under the early twilight and a briefing on the week\'s celestial forecast.' },
      { day: '02', title: 'The Husky Trails', desc: 'Drive your own team of eager huskies through snow-dusted forests. Afternoon fireside lunch in a traditional Sami tent.' },
      { day: '03', title: 'Midnight Aurora Hunt', desc: 'Venture deep into the wilderness by snowmobile to find the optimal viewing spot for the lights, guided by expert astronomers.' },
    ],
    similar: [
      { id: 'svalbard1', title: 'Svalbard Star-Gaze', type: 'Arctic Expeditions', days: 10, price: 6450, img: 'https://images.unsplash.com/photo-1484318571209-661cf29a69f5?w=400&q=80' },
      { id: 'svalbard2', title: 'Svalbard Star-Gaze', type: 'Arctic Expeditions', days: 10, price: 6450, img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80' },
      { id: 'iceland1', title: 'Icelandic Isolation', type: 'Starlit Retreats', days: 5, price: 4800, img: '' },
      { id: 'svalbard3', title: 'Svalbard Star-Gaze', type: 'Arctic Expeditions', days: 10, price: 6450, img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400&q=80' },
      { id: 'iceland2', title: 'Icelandic Isolation', type: 'Starlit Retreats', days: 5, price: 4800, img: '' },
      { id: 'iceland3', title: 'Icelandic Isolation', type: 'Starlit Retreats', days: 5, price: 4800, img: '' },
    ],
  },
};

// Default fallback package data
const defaultPackage = {
  title: 'The Aurora Expedition',
  category: 'Aurora Expedition',
  description: 'Witness the celestial dance of the Northern Lights in its most majestic form.',
  price: 5299,
  duration: '7 Days / 6 Nights',
  transport: 'Private Jet',
  features: 'All Inclusive',
  img: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1600&q=80',
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

      {/* Order Summary Box */}
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
            <p className="font-display text-4xl text-tct-white font-bold">
              ${(pkg.price + 124).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="btn-primary w-full py-4 text-sm mb-3"
      >
        Confirm Booking
      </button>
      <button
        onClick={onClose}
        className="btn-dark w-full py-4 text-sm"
      >
        Cancel
      </button>
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
      {/* Hero Image */}
      <div className="relative h-[60vh] mt-0 overflow-hidden">
        <img src={pkg.img} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-tct-dark/30 to-tct-dark" />
        <div className="absolute bottom-8 left-8">
          <p className="section-label mb-2">{pkg.category}</p>
          <h1 className="font-display text-6xl font-black text-tct-white">{pkg.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <div>
              <h2 className="font-display text-3xl text-tct-white mb-5">Package Overview</h2>
              <p className="text-tct-muted leading-relaxed mb-8">{pkg.description}</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: '🍽', label: pkg.features },
                  { icon: '🏔', label: 'Luxury Expedition' },
                  { icon: '✈️', label: pkg.transport },
                  { icon: '🕐', label: pkg.duration },
                ].map(item => (
                  <div key={item.label} className="tct-card rounded-xl px-4 py-3 flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="text-tct-text text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <h2 className="font-display text-3xl text-tct-white mb-6">Day by Day Itinerary</h2>
              <div className="space-y-4">
                {pkg.itinerary.map((item: any) => (
                  <div key={item.day} className="flex gap-4">
                    <div className="tct-badge self-start whitespace-nowrap">Day {item.day}</div>
                    <div>
                      <h3 className="font-display text-xl text-tct-white mb-2">{item.title}</h3>
                      <p className="text-tct-muted text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="tct-card rounded-2xl overflow-hidden h-48 relative">
              <div className="absolute inset-0 bg-tct-mid/50 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-tct-accent2 text-4xl mb-2">📍</p>
                  <p className="text-tct-white font-display text-lg">Base Camp: Arctic Circle</p>
                  <div className="tct-badge mt-2">Interactive Route</div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="tct-card rounded-2xl p-6 sticky top-28">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-tct-muted text-xs mb-1">Starting From</p>
                  <p className="font-display text-4xl text-tct-white font-bold">${pkg.price.toLocaleString()}</p>
                  <p className="text-tct-muted text-xs">Price per person, twin share</p>
                </div>
              </div>

              {/* Date */}
              <div className="mb-4">
                <label className="section-label text-[10px] mb-2 block">Select Departure Date</label>
                <div className="tct-input flex items-center justify-between cursor-pointer">
                  <span className="text-sm">{date}</span>
                  <span className="text-tct-accent2">📅</span>
                </div>
              </div>

              {/* Travelers */}
              <div className="mb-6">
                <label className="section-label text-[10px] mb-2 block">Travelers</label>
                <div className="tct-input flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setTravelers(t => Math.max(1, t - 1))} className="w-6 h-6 rounded-full border border-tct-accent2 text-tct-accent2 flex items-center justify-center hover:bg-tct-accent2 hover:text-tct-darker transition-colors">-</button>
                    <span className="text-sm">{travelers} Adults</span>
                    <button onClick={() => setTravelers(t => t + 1)} className="w-6 h-6 rounded-full border border-tct-accent2 text-tct-accent2 flex items-center justify-center hover:bg-tct-accent2 hover:text-tct-darker transition-colors">+</button>
                  </div>
                  <span className="text-tct-accent2">👥</span>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 text-sm mb-6 pb-6 border-b border-tct-mid">
                <div className="flex justify-between text-tct-muted">
                  <span>Base Package (x{travelers})</span>
                  <span>${(pkg.price * travelers).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-tct-muted">
                  <span>Equipment Rental</span>
                  <span>$450</span>
                </div>
              </div>
              <div className="flex justify-between mb-6">
                <span className="text-tct-white font-semibold">Total Amount</span>
                <span className="text-tct-white font-bold">${(pkg.price * travelers + 450).toLocaleString()}</span>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="btn-primary w-full py-3.5 text-sm mb-3"
              >
                {booked ? '✓ Booking Confirmed!' : 'Book Now'}
              </button>
              <button className="btn-outline w-full py-3.5 text-sm mb-3">Send Inquiry</button>
              <p className="text-center text-tct-muted text-xs flex items-center justify-center gap-1">
                🔒 Secure Booking Guaranteed
              </p>
            </div>
          </div>
        </div>

        {/* Similar Journeys */}
        {pkg.similar?.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-4xl text-tct-white mb-8">Similar Journeys</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {pkg.similar.map((s: any) => (
                <div
                  key={s.id}
                  onClick={() => navigate(`/packages/${s.id}`)}
                  className="tct-card rounded-2xl overflow-hidden cursor-pointer group"
                >
                  <div className="img-overlay h-44">
                    {s.img ? (
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-tct-mid flex items-center justify-center">
                        <div className="text-center px-4">
                          <p className="section-label text-xs mb-1">Starlit Retreats</p>
                          <p className="font-display text-lg text-tct-white">Safe Work</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="section-label text-[10px] mb-1">{s.type}</p>
                    <h3 className="font-display text-lg text-tct-white mb-1">{s.title}</h3>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-tct-muted">{s.days} Days</span>
                      <span className="text-tct-accent font-semibold">${s.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <BookingModal pkg={pkg} onClose={() => setShowModal(false)} onConfirm={handleConfirm} />
      )}
    </div>
  );
};

export default PackageDetail;
