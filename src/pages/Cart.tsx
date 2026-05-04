import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Users, ShieldCheck } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState<any[]>([]);
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => {
    const cartStorageKey = 'tctCartBookings';

    const loadStoredItems = () => {
      try {
        const saved = localStorage.getItem(cartStorageKey);
        return saved ? JSON.parse(saved) : [];
      } catch {
        return [];
      }
    };

    const storedItems = loadStoredItems();
    setItems(storedItems);

    const routeBooking = location.state?.newBooking;
    if (routeBooking) {
      const alreadyExists = storedItems.some((item: any) => item.id === routeBooking.id);
      if (!alreadyExists) {
        const updatedItems = [...storedItems, routeBooking];
        setItems(updatedItems);
        localStorage.setItem(cartStorageKey, JSON.stringify(updatedItems));
      }
    }
  }, [location.state]);

  const removeItem = (id: string | number) => {
    const updatedItems = items.filter(i => i.id !== id);
    setItems(updatedItems);
    localStorage.setItem('tctCartBookings', JSON.stringify(updatedItems));
  };

  const subtotal = items.reduce((sum, i) => sum + i.price, 0);
  const serviceFee = Math.round(subtotal * 0.0267);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + serviceFee + tax;

  const applyPromo = () => {
    if (promo.trim()) setPromoApplied(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06142a]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/home/colombo.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b2224]/86 via-[#12373a]/80 to-[#0d2628]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(143,192,255,0.16),transparent_40%),radial-gradient(circle_at_85%_75%,rgba(214,199,170,0.10),transparent_38%)]" />

      <div className="relative z-10">
      {/* Hero Section */}
      <div className="relative pt-24 pb-12 overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="%23ffffff" fill-opacity="0.1"><path d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/></g></g></svg>')`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="font-display text-5xl font-black text-[#f5f0e8] mb-2">Your Bookings</h1>
          <p className="text-slate-200/70">Review your upcoming trips before finalizing your departure.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display text-3xl text-white mb-4">Your cart is empty</p>
            <p className="text-slate-200/70 mb-8">Start planning your next adventure</p>
            <button
              onClick={() => navigate('/packages')}
              className="inline-block rounded-full bg-[#f5f0e8] px-8 py-3 font-semibold text-[#0f2030] shadow-lg hover:brightness-95 transition"
            >
              Browse Packages
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-[#152438]/95 p-5 flex gap-4 items-start transition hover:bg-[#173049] hover:border-[#8fc0ff]/40"
                >
                  <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-semibold text-white mb-2">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-200/70 mb-3">
                          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-[#a7d9d5]" /> {item.dates}</span>
                          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-[#a7d9d5]" /> {item.travelers} Traveler{item.travelers > 1 ? 's' : ''}</span>
                        </div>
                        <div className="inline-block">
                          <span className="text-xs font-semibold uppercase tracking-widest text-[#0f2030] bg-[#d6c7aa] px-3 py-1.5 rounded-full">
                            {item.tier}
                          </span>
                        </div>
                      </div>

                      <div className="flex-shrink-0" />
                    </div>
                  </div>

                  <div className="flex h-24 min-w-[130px] flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#f5f0e8]/90 hover:text-red-400 transition"
                      title="Remove from cart"
                      aria-label="Remove from cart"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M9 3H15M4 7H20M18 7L17.1111 19.4444C17.0329 20.5396 16.1228 21.3889 15.0248 21.3889H8.97524C7.87724 21.3889 6.96712 20.5396 6.88889 19.4444L6 7M10 11V17M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <p className="text-2xl font-semibold text-[#8fc0ff] leading-none">
                      ${item.price.toLocaleString()}.00
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-white/10 bg-[#152438]/95 p-6 sticky top-24">
                <h2 className="font-display text-2xl font-semibold text-[#f5f0e8] mb-6">
                  Order Summary
                </h2>

                {/* Pricing Breakdown */}
                <div className="space-y-3 text-sm mb-6 pb-6 border-b border-white/10">
                  <div className="flex justify-between">
                    <span className="text-slate-200/70">Subtotal</span>
                    <span className="text-white font-medium">
                      ${subtotal.toLocaleString()}.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-200/70">Service Fee</span>
                    <span className="text-white font-medium">
                      ${serviceFee.toLocaleString()}.00
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-200/70">Tax (Calculated)</span>
                    <span className="text-white font-medium">
                      ${tax.toLocaleString()}.00
                    </span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-400">
                      <span>Promo Discount</span>
                      <span>-$150.00</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-white font-semibold">Total</span>
                  <div className="text-right">
                    <span className="font-display text-3xl font-bold text-white">
                      ${(total - (promoApplied ? 150 : 0)).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3 mb-6">
                    <button className="w-full rounded-full bg-[#f5f0e8] px-6 py-3.5 text-sm font-semibold text-[#0f2030] shadow-lg hover:brightness-95 transition">
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => navigate('/packages')}
                    className="w-full rounded-full border border-[#d6c7aa]/60 bg-transparent px-6 py-3.5 text-sm font-semibold text-[#f5f0e8] hover:bg-[#d6c7aa]/10 transition"
                  >
                    Continue Browsing
                  </button>
                </div>

                {/* Security */}
                <div className="flex items-center justify-center gap-2 text-slate-200/60 text-xs mb-6 pb-6 border-b border-white/10">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#a7d9d5]" />
                  <span>Secure Encrypted Transaction</span>
                </div>

                {/* Promo Code */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#d6c7aa] mb-3">
                    Voyager Promo Code
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promo}
                      onChange={e => setPromo(e.target.value)}
                      placeholder="ENTER CODE"
                      className="flex-1 rounded-xl border border-white/10 bg-[#173049] px-4 py-2.5 text-sm font-mono text-white placeholder:text-slate-300/45 focus:border-[#8fc0ff]/50 focus:outline-none transition"
                    />
                    <button
                      onClick={applyPromo}
                      className="rounded-xl bg-[#8fc0ff] px-4 py-2.5 text-sm font-semibold text-[#0f2030] hover:brightness-95 transition"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-green-400 text-xs mt-2">✓ Promo code applied!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Cart;
