import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const travelBlogs = [
  {
    id: 1,
    title: 'THE ULTIMATE GUIDE TO ELLA: MOUNTAINS & TEA TRAILS',
    date: '09 April 2026',
    excerpt: 'Ella is the backbone of Sri Lanka\'s hill country, offering breathtaking views, endless tea estates, and spectacular hikes like Little Adam\'s Peak.',
    img: '/images/destinations/hidden-ella.jpg',
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
    img: '/images/destinations/galle-culture.webp',
    link: '#'
  },
  {
    id: 4,
    title: 'YALA NATIONAL PARK - CELEBRATING THE WILDLIFE OF SRI LANKA',
    date: '04 March 2026',
    excerpt: 'The perfect guide for spotting leopards and elephants in Yala National Park. Learn about the best times to visit and what to bring.',
    img: '/images/home/yala.jpg',
    link: '#'
  },
  {
    id: 5,
    title: 'MONSOON ACTIVITIES IN SRI LANKA: MAKE THE MOST OF THE RAINY SEASON',
    date: '25 February 2026',
    excerpt: 'Grey skies and rainy days? Embrace the monsoon with cozy hill country stays, cooking classes, and exploring lush, green landscapes.',
    img: '/images/destinations/hidden-waterfall.jpg',
    link: '#'
  },
  {
    id: 6,
    title: 'ROMANTIC GETAWAYS, SRI LANKAN STYLE: LOVE & SUNSETS ',
    date: '09 February 2026',
    excerpt: 'A romantic trip doesn\'t have to be cliché. Discover hidden boutique stays, private dining on the beach, and the magic of a Sri Lankan sunset.',
    img: '/images/destinations/beach-unawatuna.jpg',
    link: '#'
  }
];

const TravelBlog = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 text-slate-900 pt-32 pb-20 relative overflow-hidden">

      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(/images/bg/bg-6.png)`,
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

      {/* Container */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">

        {/* Title */}
        <div className="text-center mb-16 animate-fade-up">
          <p className="section-label mb-2 text-[#173036]">Read our stories</p>
          <h1 className="font-display text-5xl md:text-6xl font-black uppercase tracking-wide text-[#173036]">Travel Blog</h1>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* Left Sidebar */}
          <div className="lg:w-[360px] shrink-0 bg-slate-100/90 backdrop-blur-sm border border-slate-200 p-8 md:p-10 h-fit shadow-sm animate-fade-up delay-100">
            <div className="overflow-hidden mb-8 shadow-sm group">
              <img
                src="/images/destinations/culture-perahera.webp"
                alt="Our Story"
                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
            </div>

            <h2 className="font-display text-3xl font-bold uppercase mb-6 text-slate-900 tracking-wide">Our Story</h2>

            <div className="text-base leading-relaxed text-slate-600 mb-10 space-y-4">
              <p>
                Take a group of Sri Lankan friends and family brought together by a vision of bringing authentic Sri Lankan travel experiences to communities across the world. With hard work and dedication, the vision became a reality.
              </p>
              <p>
                Our travellers, communities and everyone who works for TCT are extended family and 'everyone is welcome to the journey' just like back home. Our trips are made for sharing and fit perfectly with our island vibe.
              </p>
            </div>

            <h2 className="font-display text-3xl font-bold uppercase mb-6 text-slate-900 tracking-wide leading-tight">UNFORGETTABLE JOURNEYS, ENDLESS MEMORIES.</h2>

            <div className="text-base leading-relaxed text-slate-600">
              <p>
                We're super chuffed with the level of support & love we've received from our travellers. Join us as we explore the hidden gems of our beautiful island.
              </p>
            </div>
          </div>

          {/* Right Content - Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
              {travelBlogs.map((blog, idx) => (
                <div key={blog.id} className={`flex flex-col items-center text-center group animate-fade-up`} style={{ animationDelay: `${(idx + 2) * 100}ms` }}>
                  <Link to={blog.link} className="w-full aspect-square mb-6 overflow-hidden block">
                    <img
                      src={blog.img}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                  </Link>

                  <Link to={blog.link}>
                    <h3 className="font-display text-2xl font-bold uppercase leading-tight mb-4 text-slate-900 px-2">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-[8px] text-slate-500 mb-5 font-mono">
                    {blog.date}
                  </p>

                  <p className="text-sm leading-relaxed text-slate-600 mb-6 px-4">
                    {blog.excerpt}
                  </p>

                  <div className="mt-auto">
                    <Link to={blog.link} className="inline-block text-sm font-semibold text-[#8a2b3b] hover:text-[#5a1b26] underline underline-offset-4 transition-colors">
                      Read More
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

export default TravelBlog;
