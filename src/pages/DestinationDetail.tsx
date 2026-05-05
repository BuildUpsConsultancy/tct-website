import { useRef } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

import { destinationMenuBySlug } from '../data/destinationMenu';
import { getDestinationInfo } from '../data/destinationInfo';

const categoryDescriptions: Record<string, string> = {
  'Adventure Tours': 'Venture into the raw untamed wilderness at the edge of the world. Experience the convergence of jagged granite spires and crystalline blue glaciers under the infinite southern stars.',
  'Beach Tours': 'Relax on pristine beaches with crystal-clear waters and endless horizons. Immerse yourself in tropical paradise with world-class amenities and unforgettable ocean experiences.',
  'Cultural Tours': 'Discover the rich heritage and cultural treasures of historic cities. Walk through ancient temples, vibrant markets, and colonial architecture that tell stories of centuries past.',
  'Wildlife Tours': 'Encounter majestic wildlife in their natural habitats. Experience safari-style adventures with expert naturalists and unforgettable moments with iconic animals.',
};

const categoryHeroImage: Record<string, string> = {
  'Adventure Tours': '/images/image_7.png',
  'Beach Tours': '/images/home/colombo.avif',
  'Cultural Tours': '/images/home/kandy.jpg',
  'Wildlife Tours': '/images/home/yala.jpg',
};

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const destination = slug ? destinationMenuBySlug[slug] : undefined;
  const info = slug ? getDestinationInfo(slug) : { season: '', currency: '', language: '', mustSee: '' };

  /* Parallax + fade refs */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY    = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  if (!destination) {
    return (
      <div className="min-h-screen bg-[#0b1f25] pt-28 text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="font-display text-4xl font-black md:text-5xl">Destination Not Found</h1>
          <p className="mt-4 text-white/80">The destination you selected is not available right now.</p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1f25] to-[#0f3a42] text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden pt-32 pb-20">

        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${categoryHeroImage[destination.category]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: bgY,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f25] via-[#0b1f25]/80 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6">
          <p className="mb-4 text-sm font-semibold tracking-widest text-[#d6c7aa]">DESTINATION SPOTLIGHT</p>

          {/* Text content fades + rises as you scroll */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="grid gap-12 lg:grid-cols-2 lg:items-center"
          >
            <div>
              <h1 className="font-display text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
                {destination.city}
              </h1>
              <p className="mt-6 text-base leading-8 text-white/70 md:text-lg">
                {categoryDescriptions[destination.category]}
              </p>

              {/* Info Cards Grid */}
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-2">
                <div className="group rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-sky-400/50 hover:bg-sky-400/10 hover:shadow-lg hover:shadow-sky-400/20 hover:-translate-y-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/60 group-hover:text-sky-400 transition-colors duration-300">Best Season</p>
                  <p className="mt-2 text-sm font-semibold text-white group-hover:text-sky-200 transition-colors duration-300">{info.season}</p>
                </div>
                <div className="group rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-sky-400/50 hover:bg-sky-400/10 hover:shadow-lg hover:shadow-sky-400/20 hover:-translate-y-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/60 group-hover:text-sky-400 transition-colors duration-300">Currency</p>
                  <p className="mt-2 text-sm font-semibold text-white group-hover:text-sky-200 transition-colors duration-300">{info.currency}</p>
                </div>
                <div className="group rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-sky-400/50 hover:bg-sky-400/10 hover:shadow-lg hover:shadow-sky-400/20 hover:-translate-y-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/60 group-hover:text-sky-400 transition-colors duration-300">Language</p>
                  <p className="mt-2 text-sm font-semibold text-white group-hover:text-sky-200 transition-colors duration-300">{info.language}</p>
                </div>
                <div className="group rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-sky-400/50 hover:bg-sky-400/10 hover:shadow-lg hover:shadow-sky-400/20 hover:-translate-y-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/60 group-hover:text-sky-400 transition-colors duration-300">Must-See</p>
                  <p className="mt-2 text-sm font-semibold text-white group-hover:text-sky-200 transition-colors duration-300">{info.mustSee}</p>
                </div>
              </div>

              <Link
                to="/packages"
                className="mt-8 inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:brightness-95 hover:shadow-lg hover:shadow-white/30 hover:scale-105"
              >
                Explore Packages
              </Link>
            </div>

            {/* Right side image */}
            <div className="hidden lg:block">
              <div className="group relative aspect-square overflow-hidden rounded-3xl border-2 border-white/10 bg-gradient-to-br from-[#1a4d56] to-[#0f2c33] transition-all duration-300 hover:border-sky-400/50 hover:shadow-2xl hover:shadow-sky-400/20">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-50 transition-all duration-300 group-hover:opacity-70 group-hover:scale-110"
                  style={{ backgroundImage: `url(${categoryHeroImage[destination.category]})` }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/50 to-transparent">
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold text-white italic">
                      {destination.category.replace('Tours', '')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video/Experience Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-[#0f3a42]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(135deg, #0f3a42 0%, #1a5a66 100%), url(${categoryHeroImage[destination.category]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="flex h-16 w-16 items-center justify-center rounded-full bg-sky-400 transition hover:bg-sky-500 hover:scale-110">
                <Play className="h-6 w-6 fill-current text-slate-900" />
              </button>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="font-display text-4xl font-black text-white md:text-5xl">Experience the Journey</h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/70 md:text-lg">
              Immerse yourself in the sights and sounds of the world's most remote destinations. From the crunch of snow underfoot to the whisper of the southern wind.
            </p>
          </div>
        </div>
      </section>

      {/* Tour Highlights Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-sky-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-sky-400/10 hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-white group-hover:text-sky-200 transition-colors duration-300">Why Visit {destination.city}</h3>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-white/75">
                <li className="flex gap-3"><span className="text-sky-400">•</span><span>Authentic local experiences tailored to your interests</span></li>
                <li className="flex gap-3"><span className="text-sky-400">•</span><span>Expert guides with deep knowledge of the region</span></li>
                <li className="flex gap-3"><span className="text-sky-400">•</span><span>Flexible itineraries with optional customization</span></li>
                <li className="flex gap-3"><span className="text-sky-400">•</span><span>Premium accommodations and world-class service</span></li>
              </ul>
            </article>

            <article className="group rounded-2xl border border-white/10 bg-sky-400/10 p-8 backdrop-blur-sm transition-all duration-300 hover:border-sky-400 hover:bg-sky-400/20 hover:shadow-lg hover:shadow-sky-400/20 hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-white group-hover:text-sky-100 transition-colors duration-300">Ready to Explore?</h3>
              <p className="mt-6 text-sm leading-7 text-white/75">
                Let us create your perfect {destination.city} adventure. Our travel specialists will design a personalized itinerary based on your preferences, travel style, and dates.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:brightness-95 hover:shadow-lg hover:shadow-white/30 hover:scale-105"
              >
                Plan Your Trip
              </Link>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;
