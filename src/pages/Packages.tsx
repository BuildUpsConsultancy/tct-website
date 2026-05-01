import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock3, Filter, MapPin, SlidersHorizontal, Users } from 'lucide-react';

const packageItems = [
  { id: 'nordic', title: 'Nordic Celestial Cruise', location: 'Lofoten Islands, Norway', days: 8, maxPeople: 12, price: 4250, category: 'Adventure', type: 'ARCTIC', img: '/images/image_1.png' },
  { id: 'sahara', title: 'Sahara Sands & Silhouettes', location: 'Merzouga, Morocco', days: 6, maxPeople: 8, price: 2800, category: 'Beach', type: 'DESERT', img: '/images/image_10.png' },
  { id: 'reef', title: 'Neon Reef Expedition', location: 'Baa Atoll, Maldives', days: 10, maxPeople: 4, price: 6900, category: 'Beach', type: 'RETREAT', img: '/images/image_2.png' },
  { id: 'andean', title: 'Andean Astral Trek', location: 'Patagonia, Argentina', days: 12, maxPeople: 6, price: 3500, category: 'Adventure', type: 'ADVENTURE', img: '/images/image_7.png' },
  { id: 'tokyo', title: 'Tokyo Twilight Odyssey', location: 'Tokyo, Japan', days: 7, maxPeople: 10, price: 5100, category: 'City', type: 'URBAN', img: '/images/image_8.png' },
  { id: 'kyoto', title: 'Ancient Echoes After Dark', location: 'Kyoto, Japan', days: 9, maxPeople: 5, price: 4700, category: 'Cultural', type: 'CULTURE', img: '/images/image_9.png' },
];

const categories = ['Adventure', 'Beach', 'City', 'Cultural'];
const destinationOptions = ['Nordic Fjords', 'Aegean Islands', 'Atacama Desert'];

const Packages = () => {
  const navigate = useNavigate();
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [budget, setBudget] = useState({ min: '', max: '' });
  const [duration, setDuration] = useState(1);

  const toggleCat = (cat: string) => {
    setSelectedCats(prev => (prev.includes(cat) ? prev.filter(item => item !== cat) : [...prev, cat]));
  };

  const toggleDestination = (destination: string) => {
    setSelectedDestinations(prev => (prev.includes(destination) ? prev.filter(item => item !== destination) : [...prev, destination]));
  };

  const filtered = useMemo(() => {
    return packageItems.filter(pkg => {
      if (selectedCats.length > 0 && !selectedCats.includes(pkg.category)) return false;
      if (budget.min && pkg.price < Number(budget.min)) return false;
      if (budget.max && pkg.price > Number(budget.max)) return false;
      if (pkg.days < duration) return false;
      return true;
    });
  }, [budget.max, budget.min, duration, selectedCats]);

  return (
    <div className="min-h-screen bg-[#06142a] text-white">
      <section className="relative overflow-hidden pt-24 pb-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b2224] via-[#12373a] to-[#0d2628]" />
        <div className="absolute inset-0 bg-cover bg-center opacity-18" style={{ backgroundImage: 'url(/images/image_3.png)' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(127,181,176,0.18),_transparent_45%),linear-gradient(to_bottom,rgba(11,34,36,0.5),rgba(6,20,42,0.88))]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d6c7aa]">Refine Journey</p>
              <h1 className="text-4xl font-extrabold leading-none md:text-6xl">
                Starlit
                <br />
                <span className="text-[#8fc0ff]">Expeditions</span>
              </h1>
            </div>
            <p className="hidden text-sm text-slate-300/65 md:block">128 Experiences Found</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[265px_1fr]">
            <aside className="rounded-[24px] border border-white/10 bg-[#16263a]/70 p-5 shadow-2xl shadow-black/25 backdrop-blur-md lg:sticky lg:top-28 h-fit">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                    <Filter className="h-4 w-4 text-[#8fc0ff]" />
                    Filter Packages
                  </h2>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">Refine your journey</p>
                </div>
                <button
                  onClick={() => { setSelectedCats([]); setSelectedDestinations([]); setBudget({ min: '', max: '' }); setDuration(1); }}
                  className="text-xs text-slate-300/75 transition-colors hover:text-[#8fc0ff] hover:underline"
                >
                  Reset All
                </button>
              </div>

              <div className="mb-6">
                <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-[#8fc0ff]" />
                  Destination
                </p>
                <div className="space-y-3">
                  {destinationOptions.map(dest => (
                    <label key={dest} className="flex cursor-pointer items-center gap-3 text-sm text-slate-200/80">
                      <input
                        type="checkbox"
                        checked={selectedDestinations.includes(dest)}
                        onChange={() => toggleDestination(dest)}
                        className="h-4 w-4 rounded border-white/20 bg-white/5 accent-[#8fc0ff]"
                      />
                      <span>{dest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">Duration</p>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={duration}
                  onChange={e => setDuration(Number(e.target.value))}
                  className="w-full accent-[#8fc0ff]"
                />
                <div className="mt-1 flex justify-between text-xs text-slate-300/55">
                  <span>1 Day</span>
                  <span>30 Days</span>
                </div>
              </div>

              <div className="mb-6">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">Budget</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-300/45">$</span>
                    <input
                      type="number"
                      value={budget.min}
                      onChange={e => setBudget(prev => ({ ...prev, min: e.target.value }))}
                      placeholder="Min"
                      className="w-full rounded-xl border border-white/8 bg-[#0f1f32] py-3 pl-7 pr-3 text-sm text-white placeholder:text-slate-300/35 outline-none transition focus:border-[#8fc0ff]/50"
                    />
                  </div>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-300/45">$</span>
                    <input
                      type="number"
                      value={budget.max}
                      onChange={e => setBudget(prev => ({ ...prev, max: e.target.value }))}
                      placeholder="Max"
                      className="w-full rounded-xl border border-white/8 bg-[#0f1f32] py-3 pl-7 pr-3 text-sm text-white placeholder:text-slate-300/35 outline-none transition focus:border-[#8fc0ff]/50"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => {
                    const active = selectedCats.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleCat(cat)}
                        className={`rounded-full border px-3 py-1.5 text-xs transition-all ${active ? 'border-[#f5f0e8] bg-[#f5f0e8] text-[#0f2030]' : 'border-[#7fb5b0]/55 bg-transparent text-slate-100/85 hover:border-[#8fc0ff] hover:text-[#8fc0ff]'}`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button className="w-full rounded-full bg-[#f5f0e8] py-3 text-sm font-semibold text-[#0f2030] transition hover:brightness-95">
                Apply Filter
              </button>
            </aside>

            <main>
              <div className="mb-6 flex items-center justify-end md:hidden">
                <p className="text-sm text-slate-300/65">128 Experiences Found</p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((pkg) => (
                  <article
                    key={pkg.id}
                    onClick={() => navigate(`/packages/${pkg.id}`)}
                    className="group overflow-hidden rounded-[14px] border border-[#8fc0ff]/12 bg-[#132338] shadow-2xl shadow-black/35 ring-1 ring-[#8fc0ff]/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#8fc0ff]/22 hover:shadow-[0_18px_40px_rgba(17,34,64,0.55)] hover:ring-[#8fc0ff]/15 cursor-pointer"
                  >
                    <div className="relative h-[270px] overflow-hidden bg-[#0f1f32]">
                      <img src={pkg.img} alt={pkg.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f1f32]/55" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#8fc0ff]/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="absolute left-3 top-3 rounded-full border border-[#8fc0ff]/30 bg-[#0f1f32]/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b7d5ff] backdrop-blur-md">
                        ✧ {pkg.type}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="mb-2 text-lg font-bold leading-tight text-white transition-colors group-hover:text-[#f5f0e8]">{pkg.title}</h3>
                      <p className="mb-3 flex items-center gap-1.5 text-xs text-[#8fc0ff]">
                        <MapPin className="h-3.5 w-3.5" />
                        {pkg.location}
                      </p>

                      <div className="mb-5 flex items-center justify-between text-xs text-slate-200/55">
                        <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {pkg.days} Days</span>
                        <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> Up to {pkg.maxPeople}</span>
                      </div>

                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <p className="text-2xl font-bold text-white">${pkg.price.toLocaleString()}</p>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-slate-300/45">Per Traveler</p>
                        </div>
                        <button className="rounded-md bg-[#f5f0e8] px-5 py-2.5 text-sm font-semibold text-[#0f2030] transition hover:brightness-95">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 flex items-center justify-center gap-4 text-slate-200/75">
                <button className="transition hover:text-[#8fc0ff]"><ChevronLeft className="h-4 w-4" /></button>
                <div className="flex items-center gap-2">
                  {[0, 1, 2, 3].map(index => (
                    <span key={index} className={`h-2.5 w-2.5 rounded-full ${index === 1 ? 'bg-[#f5f0e8]' : 'bg-slate-300/30'}`} />
                  ))}
                </div>
                <button className="transition hover:text-[#8fc0ff]"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </main>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#f5f0e8]/20 to-transparent" />
    </div>
  );
};

export default Packages;
