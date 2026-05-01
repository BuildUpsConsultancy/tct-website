import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialItems = [
  {
    id: 1,
    title: 'Neo-Tokyo After Dark',
    dates: 'Oct 12 — Oct 18, 2024',
    travelers: 2,
    tier: 'PREMIUM TIER',
    price: 3450,
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=200&q=80',
  },
  {
    id: 2,
    title: 'Celestial Alpine Retreat',
    dates: 'Dec 22 — Dec 29, 2024',
    travelers: 1,
    tier: 'SOLO VOYAGER',
    price: 1890,
    img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=200&q=80',
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialItems);
  const [promo, setPromo] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const removeItem = (id: number) => setItems(items.filter(i => i.id !== id));

  const subtotal = items.reduce((sum, i) => sum + i.price, 0);
  const serviceFee = Math.round(subtotal * 0.0267);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + serviceFee + tax;

  const applyPromo = () => {
    if (promo.trim()) setPromoApplied(true);
  };

  return (
    <div className="min-h-screen bg-tct-dark">
      {/* Hero */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-bottom opacity-20"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-tct-dark/80 to-tct-dark" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="font-display text-6xl font-black text-tct-white mb-3">Your Bookings</h1>
          <p className="text-tct-muted">Review your upcoming cinematic voyages before finalizing your departure.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-5">
            {items.length === 0 ? (
              <div className="tct-card rounded-2xl p-16 text-center">
                <p className="font-display text-3xl text-tct-white mb-4">Your cart is empty</p>
                <p className="text-tct-muted mb-8">Start your cinematic journey</p>
                <button onClick={() => navigate('/packages')} className="btn-primary px-8 py-3">Browse Packages</button>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="tct-card rounded-2xl p-5 flex gap-5 items-start">
                  <div className="w-28 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-display text-xl text-tct-white">{item.title}</h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-tct-muted hover:text-red-400 transition-colors text-lg ml-4"
                      >
                        🗑
                      </button>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-tct-muted text-sm">
                      <span>📅 {item.dates}</span>
                      <span>👥 {item.travelers} Traveler{item.travelers > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="tct-badge text-xs">{item.tier}</span>
                      <span className="text-tct-accent font-bold text-xl">${item.price.toLocaleString()}.00</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="tct-card rounded-2xl p-6 sticky top-28">
              <h2 className="font-display text-2xl text-tct-white mb-6">Order Summary</h2>

              <div className="space-y-3 text-sm mb-6 pb-6 border-b border-tct-mid">
                <div className="flex justify-between text-tct-muted">
                  <span>Subtotal</span>
                  <span className="text-tct-text">${subtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between text-tct-muted">
                  <span>Service Fee</span>
                  <span className="text-tct-text">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-tct-muted">
                  <span>Tax (Calculated)</span>
                  <span className="text-tct-text">${tax.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-green-400">
                    <span>Promo Discount</span>
                    <span>-$150.00</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-tct-white font-semibold text-lg">Total</span>
                <span className="font-display text-3xl text-tct-white font-bold">
                  ${(total - (promoApplied ? 150 : 0)).toLocaleString()}
                </span>
              </div>

              <button className="btn-primary w-full py-4 mb-3 text-sm">
                Proceed to Checkout
              </button>
              <button
                onClick={() => navigate('/packages')}
                className="btn-dark w-full py-4 mb-4 text-sm"
              >
                Continue Browsing
              </button>

              <div className="flex items-center justify-center gap-2 text-tct-muted text-xs mb-6">
                <span>🔒</span> Secure Encrypted Transaction
              </div>

              {/* Promo Code */}
              <div>
                <p className="section-label text-[10px] mb-3">Voyager Promo Code</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promo}
                    onChange={e => setPromo(e.target.value)}
                    placeholder="ENTER CODE"
                    className="tct-input flex-1 text-sm font-mono-custom tracking-widest"
                  />
                  <button
                    onClick={applyPromo}
                    className="bg-tct-accent2 text-tct-darker px-4 py-2 rounded-lg text-sm font-semibold hover:bg-tct-accent transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-green-400 text-xs mt-2">✓ Promo code applied successfully!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
