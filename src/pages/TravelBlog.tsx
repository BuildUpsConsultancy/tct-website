import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import { pageVariants, staggerContainer, fadeUp } from '../lib/motion'; 

const travelBlogs = [
  {
    id: 1,
    title: 'THE ULTIMATE GUIDE TO ELLA: MOUNTAINS & TEA TRAILS',
    date: '09 April 2026',
    excerpt: "Ella is the backbone of Sri Lanka's hill country, offering breathtaking views, endless tea estates, and spectacular hikes like Little Adam's Peak.",
    img: '/images/gallery-2/gallery-2.1.jpg',
    link: '#'
  },
  {
    id: 2,
    title: 'THINGS TO DO IN MIRISSA (FAMILY GUIDE + LOCAL IDEAS)',
    date: '24 March 2026',
    excerpt: 'Mirissa is famous for its beaches, whale watching, and vibrant coastal life. Here is our family guide to making the most of your southern escape.',
    img: '/images/destinations/mirissa-beach.webp',
    link: '#'
  },
  {
    id: 3,
    title: 'TOP THINGS TO DO IN GALLE FORT: CULTURE, VIEWS AND GREAT SUNSETS',
    date: '11 March 2026',
    excerpt: 'Explore the historic streets of Galle Fort, from colonial architecture to chic boutiques and some of the best sunset views in the country.',
    img: '/images/gallery-2/gallery-2.6.jfif',
    link: '#'
  },
  {
    id: 4,
    title: 'YALA NATIONAL PARK - CELEBRATING THE WILDLIFE OF SRI LANKA',
    date: '04 March 2026',
    excerpt: 'The perfect guide for spotting leopards and elephants in Yala National Park. Learn about the best times to visit and what to bring.',
    img: '/images/home/yala-2.jpg',
    link: '#'
  },
  {
    id: 5,
    title: 'MONSOON ACTIVITIES IN SRI LANKA: MAKE THE MOST OF THE RAINY SEASON',
    date: '25 February 2026',
    excerpt: 'Grey skies and rainy days? Embrace the monsoon with cozy hill country stays, cooking classes, and exploring lush, green landscapes.',
    img: '/images/gallery-2/gallery-2.5.jpg',
    link: '#'
  },
  {
    id: 6,
    title: 'ROMANTIC GETAWAYS, SRI LANKAN STYLE: LOVE & SUNSETS ',
    date: '09 February 2026',
    excerpt: "A romantic trip doesn't have to be cliché. Discover hidden boutique stays, private dining on the beach, and the magic of a Sri Lankan sunset.",
    img: '/images/destinations/beach-unawatuna.jpg',
    link: '#'
  }
];

const TravelBlog = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position inside this component for background parallax
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ['start start', 'end start'] 
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);

  // Smooth scroll configuration via Lenis instance loop
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
      className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-20 relative overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Background Image with Parallax (Uncommented and tied into layout) */}
      <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/images/updated.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'bottom center',
            y: bgY,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/80" />

      {/* Watermark background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] -z-10" style={{
        backgroundImage: 'radial-gradient(circle, #173036 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Main Layout Container */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">

        {/* Title Block with Staggered Fade-Up */}
        <motion.div 
          className="text-center mb-16"
          variants={staggerContainer(0.12, 0.05)}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={fadeUp} className="section-label mb-2 text-[#173036]">
            Read our stories
          </motion.p>
          <motion.h1 
            variants={fadeUp} 
            className="font-display text-5xl md:text-6xl font-black uppercase tracking-wide"
          >
            Travel Blog
          </motion.h1>
        </motion.div>

        {/* Dynamic Split Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* Left Sidebar Profile */}
          <motion.div 
            className="lg:w-[360px] shrink-0 bg-[#173036] backdrop-blur-sm border border-slate-200 p-8 md:p-10 h-fit shadow-sm"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="overflow-hidden mb-8 shadow-sm group">
              <img
                src="/images/gallery/gallery_07.jpg"
                alt="Our Story"
                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>

            <h2 className="font-display text-3xl font-bold uppercase mb-6 text-white tracking-wide">Our Story</h2>

            <div className="text-base leading-relaxed text-white mb-10 space-y-4">
              <p>
                Take a group of Sri Lankan friends and family brought together by a vision of bringing authentic Sri Lankan travel experiences to communities across the world. With hard work and dedication, the vision became a reality.
              </p>
              <p>
                Our travellers, communities and everyone who works for TCT are extended family and 'everyone is welcome to the journey' just like back home. Our trips are made for sharing and fit perfectly with our island vibe.
              </p>
            </div>

            <h2 className="font-display text-3xl font-bold uppercase mb-6 text-white tracking-wide leading-tight">UNFORGETTABLE JOURNEYS, ENDLESS MEMORIES.</h2>

            <div className="text-base leading-relaxed text-white">
              <p>
                We're super chuffed with the level of support & love we've received from our travellers. Join us as we explore the hidden gems of our beautiful island.
              </p>
            </div>
          </motion.div>

          {/* Right Content - Grid */}
          <div className="flex-1">
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
    {travelBlogs.map((blog, idx) => {
      // Clamp the animation delay so lower rows don't feel sluggish if the list is long
      const animationDelay = `${Math.min((idx + 1) * 100, 600)}ms`;

      return (
        <div 
          key={blog.id} 
          className="flex flex-col items-center text-center group animate-fade-up" 
          style={{ animationDelay }}
        >
          {/* Card Image Wrapper */}
          <Link to={blog.link} className="w-full aspect-square mb-6 overflow-hidden block relative">
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy" // Performance optimization
            />
            {/* Subtle overlay accent on image hover to match premium brand feel */}
            <div className="absolute inset-0 bg-[#173036]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Content Wrapper - flex-grow forces uniform card distribution */}
          <div className="flex flex-col flex-grow items-center w-full">
            <Link to={blog.link} className="block group-hover:text-teal-700 transition-colors">
              <h3 className="text-lg font-bold leading-snug mb-2 text-[#173036] px-2 transition-colors duration-300 group-hover:text-[#173036]">
                {blog.title}
              </h3>
            </Link>

            <p className="text-body-xs uppercase text-[#a1a1a1a] mb-2 tracking-wide">
              {blog.date}
            </p>

            {/* line-clamp prevents broken layouts from overly long excerpts */}
            <p className="text-sm leading-relaxed text-slate-600 mb-6 px-4 line-clamp-3">
              {blog.excerpt}
            </p>
          </div>

          {/* Fixed Bottom Button Pinning */}
          <div className="mt-auto w-full px-4">
            <Link 
              to={blog.link} 
              className="inline-block w-full sm:w-auto text-sm font-semibold text-white bg-[#173036] py-4 px-8 border border-transparent transition-all duration-300 hover:bg-[#173036]/90 hover:text-white hover:border-[#173036]"
            >
              Read More
            </Link>
          </div>
        </div>
      );
    })}
  </div>
</div>

        </div>
      </div>
    </motion.div>
  );
};

export default TravelBlog;