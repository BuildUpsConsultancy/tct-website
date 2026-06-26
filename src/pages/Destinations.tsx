import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import { pageVariants, staggerContainer, fadeUp } from '../lib/motion';

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
    excerpt: "Relax on the golden sands and swim in the crystal-clear waters of Sri Lanka's coastline. Perfect for surfers, sunbathers, and sunset lovers alike.",
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

  // Global window scroll tracking for background parallax values
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  // Smooth scroll initialization loop
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
      syncTouchLerp: 0.075,
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

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-24 relative overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Background Image Parallax layer */}
      <motion.div
        className="absolute inset-0 opacity-15 pointer-events-none -z-10"
        style={{
          backgroundImage: `url(/images/bg/bg-1.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: bgY || '0%',
        }}
      />
      
      {/* Readability structural overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/90 to-slate-50 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] -z-10" style={{
        backgroundImage: 'radial-gradient(circle, #173036 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Animated Main Title Block */}
        <motion.div 
          className="text-center mb-20"
          variants={staggerContainer(0.12, 0.05)}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={fadeUp} className="section-label text-[#173036]">
            Explore Sri Lanka
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-6xl lg:text-7xl font-black uppercase">
            All Destinations
          </motion.h1>
        </motion.div>

        {/* Enhanced 6-Card Layout Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {destinationCategories.slice(0, 6).map((category) => (
            <motion.div 
              key={category.id} 
              className="group relative flex flex-col justify-between bg-white border border-slate-200/80 p-5 pb-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-slate-300"
              variants={fadeUp}
            >
              <div>
                {/* Img Container with Aspect Ratio and Zoom */}
                <Link 
                  to={`/destinations/${category.slug}`} 
                  className="w-full aspect-[4/3] mb-6 overflow-hidden block relative shadow-inner"
                >
                  <img
                    src={category.img}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle contextual overlay matching dark teal brand accent */}
                  <div className="absolute inset-0 bg-[#173036]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                {/* Typography Block */}
                <div className="px-2">
                  <Link to={`/destinations/${category.slug}`}>
                    <h2 className="font-display text-4xl font-bold uppercase leading-relaxed mb-3 text-[#173036] transition-colors duration-300">
                      {category.title}
                    </h2>
                  </Link>
                  <p className="text-body-md text-slate-500 line-clamp-2">
                    {category.excerpt}
                  </p>
                </div>
              </div>

              {/* Enhanced Action CTA Button Footer */}
              <div className="mt-8 px-2 w-full">
                <Link 
                  to={`/destinations/${category.slug}`} 
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white group/btn transition-colors duration-200 hover:text-white/90 hover:bg-[#173036]/95 bg-[#173036] px-4 py-3"
                >
                  Explore Destinations
                </Link>
              </div>

              {/* Bottom Animated Border Highlight on Hover */}
              <div className="absolute bottom-0 left-0 h-[3px] bg-[#173036] w-0 transition-all duration-400 ease-out group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Destinations;