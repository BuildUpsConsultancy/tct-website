import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const destinationCategories = [
  {
    id: 1,
    title: 'Wildlife tours',
    slug: 'wildlife',
    excerpt: 'Experience the thrilling wildlife of Sri Lanka. From majestic elephants to elusive leopards, embark on an unforgettable journey through our national parks.',
    img: '/images/destinations/udawalawa-wildlife.jpg',
  },
  {
    id: 2,
    title: 'Adventure tours',
    slug: 'adventure',
    excerpt: 'Get your adrenaline pumping with our adventure tours. Hike through lush mountains, raft down roaring rivers, and explore the wild side of Sri Lanka.',
    img: '/images/destinations/adventure-rafting.webp',
  },
  {
    id: 3,
    title: 'Beaches tours',
    slug: 'beaches',
    excerpt: 'Relax on the golden sands and swim in the crystal-clear waters of Sri Lanka\'s coastline. Perfect for surfers, sunbathers, and sunset lovers alike.',
    img: '/images/destinations/beach-unawatuna.jpg',
  },
  {
    id: 4,
    title: 'Historical Areas tours',
    slug: 'historical-areas',
    excerpt: 'Step back in time and explore ancient ruins, majestic forts, and historical marvels that tell the story of a civilization thousands of years old.',
    img: '/images/destinations/sigiriya-culture.png',
  },
  {
    id: 5,
    title: 'Culture & Heritage tours',
    slug: 'culture-heritage',
    excerpt: 'Immerse yourself in the rich traditions, vibrant festivals, and deep-rooted heritage of Sri Lanka for a truly authentic cultural experience.',
    img: '/images/destinations/culture-perahera.webp',
  },
  {
    id: 6,
    title: 'Hidden Trails tours',
    slug: 'hidden-trails',
    excerpt: 'Discover the unseen beauty of Sri Lanka. Trek through hidden waterfalls, remote villages, and untouched landscapes away from the tourist crowds.',
    img: '/images/destinations/hidden-ella.jpg',
  }
];

const Destinations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-20 relative overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(/images/bg/bg-1.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: bgY,
        }}
      />
      {/* Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/85 to-white pointer-events-none" />
      
      {/* Watermark background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] -z-10" style={{
        backgroundImage: 'radial-gradient(circle, #173036 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-up">
          <p className="section-label mb-2 text-[#173036]">Explore Sri Lanka</p>
          <h1 className="font-display text-5xl md:text-6xl font-black uppercase tracking-wide text-[#173036]">All Destinations</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          {/* Left Sidebar */}
          <div className="lg:w-[360px] shrink-0 bg-slate-100/90 backdrop-blur-sm border border-slate-200 p-8 md:p-10 h-fit shadow-sm animate-fade-up delay-100">
            <div className="overflow-hidden mb-8 shadow-sm group">
              <img
                src="/images/destinations/galle-culture.webp"
                alt="Destinations"
                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>
            <h2 className="font-display text-3xl font-bold uppercase mb-6 text-slate-900 tracking-wide">Find Your Vibe</h2>
            <div className="text-base leading-relaxed text-slate-600 mb-10 space-y-4">
              <p>
                Sri Lanka offers a spectacular variety of landscapes and experiences, from golden sandy beaches to misty mountain peaks, and ancient cultural heritage to untamed wildlife.
              </p>
              <p>
                Choose a category that speaks to your travel style and discover the best spots across our beautiful island. Everyone is welcome to the journey.
              </p>
            </div>
          </div>

          {/* Right Content - Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
              {destinationCategories.map((category, idx) => (
                <div key={category.id} className={`flex flex-col items-center text-center group animate-fade-up`} style={{ animationDelay: `${(idx + 2) * 100}ms` }}>
                  <Link to={`/destinations/${category.slug}`} className="w-full aspect-square mb-6 overflow-hidden block">
                    <img
                      src={category.img}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                  </Link>
                  <Link to={`/destinations/${category.slug}`}>
                    <h3 className="font-display text-2xl font-bold uppercase leading-tight mb-4 text-slate-900 px-2">
                      {category.title}
                    </h3>
                  </Link>
                  <p className="text-sm leading-relaxed text-slate-600 mb-6 px-4">
                    {category.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Link to={`/destinations/${category.slug}`} className="inline-block text-sm font-semibold text-[#8a2b3b] hover:text-[#5a1b26] underline underline-offset-4 transition-colors">
                      Explore Destinations
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
