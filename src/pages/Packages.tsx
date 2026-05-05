import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock3, Filter, MapPin, SlidersHorizontal, Users } from 'lucide-react';

import { destinationMenu } from '../data/destinationMenu';
import { packageItems } from '../data/packages';
import { pageVariants, staggerContainer, cardItem, fadeUp, slideLeft } from '../lib/motion';

const destinationGroups = destinationMenu.map(group => group.title);

const inferTourCategory = (title: string) => {
  const normalized = title.toLowerCase();

  if (normalized.includes('beach') || normalized.includes('coastal') || normalized.includes('romance')) return 'Beach Tours';
  if (normalized.includes('wildlife')) return 'Wildlife Tours';
  if (normalized.includes('ramayana') || normalized.includes('heritage') || normalized.includes('culture') || normalized.includes('magical') || normalized.includes('sri lanka')) return 'Cultural Tours';
  return 'Adventure Tours';
};

const Packages = () => {
  const navigate = useNavigate();
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [budget, setBudget] = useState({ min: '', max: '' });
  const [duration, setDuration] = useState(1);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const toggleSelection = (value: string, setter: Dispatch<SetStateAction<string[]>>) => {
    setter(prev => (prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]));
  };

  const filtered = useMemo(() => {
    return packageItems.filter(pkg => {
      if (selectedPackageId && pkg.id !== selectedPackageId) return false;
      const pkgCategory = inferTourCategory(pkg.title);
      const pkgPrice = pkg.price ?? 0;
      const pkgDays = pkg.days ?? 0;
      if (selectedDestinations.length > 0 && !selectedDestinations.includes(pkgCategory)) return false;
      if (selectedGroups.length > 0 && !selectedGroups.includes(pkgCategory)) return false;
      if (budget.min && pkgPrice < Number(budget.min)) return false;
      if (budget.max && pkgPrice > Number(budget.max)) return false;
      if (pkgDays < duration) return false;
      return true;
    });
  }, [budget.max, budget.min, duration, selectedDestinations, selectedGroups, selectedPackageId]);

  // Reset to first page whenever filters change
  useEffect(() => {
    setPage(1);
  }, [selectedDestinations, selectedGroups, selectedPackageId, budget.min, budget.max, duration]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  return (
    <motion.div
      className="min-h-screen bg-[#06142a] text-white"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <section className="relative overflow-hidden pt-24 pb-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b2224] via-[#12373a] to-[#0d2628]" />
        <div className="absolute inset-0 bg-cover bg-center opacity-18" style={{ backgroundImage: 'url(/images/image_3.png)' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(127,181,176,0.18),_transparent_45%),linear-gradient(to_bottom,rgba(11,34,36,0.5),rgba(6,20,42,0.88))]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            className="mb-8 flex items-end justify-between gap-4"
            variants={fadeUp} initial="hidden" animate="show"
          >
            <div>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#d6c7aa]">Find Your Perfect Tour</p>
              <h1 className="text-4xl font-extrabold leading-none md:text-6xl">
                Sri Lanka
                <br />
                <span className="text-[#8fc0ff]">Tour Packages</span>
              </h1>
            </div>
            <p className="hidden text-sm text-slate-300/65 md:block">26+ Curated Sri Lanka Experiences</p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[265px_1fr]">
            <motion.aside
              className="rounded-[24px] border border-white/10 bg-[#16263a]/70 p-5 shadow-2xl shadow-black/25 backdrop-blur-md lg:sticky lg:top-28 h-fit"
              variants={slideLeft} initial="hidden" animate="show"
            >
            <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-white">
                    <Filter className="h-4 w-4 text-[#8fc0ff]" />
                    Filter Packages
                  </h2>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">Refine your journey</p>
                </div>
                <button
                  onClick={() => { setSelectedDestinations([]); setSelectedGroups([]); setSelectedPackageId(null); setBudget({ min: '', max: '' }); setDuration(1); }}
                  className="text-xs text-slate-300/75 transition-colors hover:text-[#8fc0ff] hover:underline"
                >
                  Reset All
                </button>
              </div>

              <div className="mb-6">
                <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-[#8fc0ff]" />
                  Destinations
                </p>
                <div className="space-y-2">
                  {destinationGroups.map(category => {
                    const isSelected = selectedDestinations.includes(category);

                    return (
                      <label key={category} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/8 bg-[#0f1f32]/60 px-4 py-3 transition hover:bg-[#0f1f32]/80">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelection(category, setSelectedDestinations)}
                          className="h-4 w-4 rounded border-white/20 bg-white/5 accent-[#8fc0ff]"
                        />
                        <span className="text-sm font-semibold text-slate-100/90">{category}</span>
                      </label>
                    );
                  })}
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
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">Tour Type</p>
                <div className="flex flex-wrap gap-2">
                  {destinationGroups.map(category => {
                    const active = selectedGroups.includes(category);
                    return (
                      <button
                        key={category}
                        onClick={() => toggleSelection(category, setSelectedGroups)}
                        className={`rounded-full border px-3 py-1.5 text-xs transition-all ${active ? 'border-[#f5f0e8] bg-[#f5f0e8] text-[#0f2030]' : 'border-[#7fb5b0]/55 bg-transparent text-slate-100/85 hover:border-[#8fc0ff] hover:text-[#8fc0ff]'}`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button className="w-full rounded-full bg-[#f5f0e8] py-3 text-sm font-semibold text-[#0f2030] transition hover:brightness-95">
                Apply Filter
              </button>
              </motion.aside>

            <main>
              <div className="mb-6 flex items-center justify-end md:hidden">
                <p className="text-sm text-slate-300/65">{filtered.length} Sri Lanka Tour{filtered.length !== 1 ? 's' : ''} Found</p>
              </div>

              <motion.div
                className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
                variants={staggerContainer(0.08)}
                initial="hidden"
                animate="show"
                key={String(page)}
              >
                {pageItems.map((pkg) => (
                  <motion.article
                    key={pkg.id}
                    onClick={() => navigate(`/packages/${pkg.id}`)}
                    className="group cursor-pointer overflow-hidden rounded-[14px] border border-[#8fc0ff]/12 bg-[#132338] shadow-2xl shadow-black/35 ring-1 ring-[#8fc0ff]/5"
                    variants={cardItem}
                    whileHover={{ y: -8, borderColor: 'rgba(143,192,255,0.25)', boxShadow: '0 24px 48px rgba(10,20,40,0.65)', transition: { duration: 0.3 } }}
                  >
                    <div className="relative h-[270px] overflow-hidden bg-[#0f1f32]">
                      <motion.img
                        src={pkg.img} alt={pkg.title}
                        className="h-full w-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f1f32]/55" />
                      <div className="absolute left-3 top-3 rounded-full border border-[#8fc0ff]/30 bg-[#0f1f32]/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b7d5ff] backdrop-blur-md">
                        ✧ {inferTourCategory(pkg.title)}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2 text-lg font-bold leading-tight text-white group-hover:text-[#f5f0e8] transition-colors duration-300">{pkg.title}</h3>
                      <p className="mb-2 flex items-center gap-1.5 text-xs text-[#8fc0ff]"><MapPin className="h-3.5 w-3.5" />{pkg.location}</p>
                      <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-slate-300/55">{inferTourCategory(pkg.title)}</p>
                      <div className="mb-5 flex items-center justify-between text-xs text-slate-200/55">
                        <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {pkg.days} Days</span>
                        <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> Up to {pkg.maxPeople}</span>
                      </div>
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <p className="text-2xl font-bold text-white">${(pkg.price ?? 0).toLocaleString()}</p>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-slate-300/45">Per Traveler</p>
                        </div>
                        <motion.button
                          className="rounded-md bg-[#f5f0e8] px-5 py-2.5 text-sm font-semibold text-[#0f2030]"
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                        >
                          Book Now
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>

              {selectedPackageId && (
                <motion.div
                  className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-[#0f1f32]/80 px-4 py-3 text-sm text-slate-200/80"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                >
                  <span>Showing one selected package</span>
                  <button type="button" onClick={() => setSelectedPackageId(null)} className="font-semibold text-[#8fc0ff] hover:underline">Clear selection</button>
                </motion.div>
              )}

              <motion.div
                className="mt-10 flex items-center justify-center gap-4 text-slate-200/75"
                variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
              >
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1} className="transition hover:text-[#8fc0ff] disabled:opacity-50">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <motion.button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        aria-label={`Page ${pageNum}`}
                        className={`h-2.5 w-2.5 rounded-full ${pageNum === page ? 'bg-[#f5f0e8]' : 'bg-slate-300/30'}`}
                        whileHover={{ scale: 1.4 }}
                      />
                    );
                  })}
                </div>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="transition hover:text-[#8fc0ff] disabled:opacity-50">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            </main>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-[#f5f0e8]/20 to-transparent" />
    </motion.div>
  );
};

export default Packages;
