import { useRef } from 'react';
import { ArrowLeft, MapPin, Check, Users, Sun, CalendarDays } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect } from 'react';

import { categorySlugToTitle, type CategoryType } from '../data/destinationMenu';

const categoryDescriptions: Record<string, string> = {
  'Wildlife tours': 'Track leopards in their natural habitat, witness elephant herds in misty national parks, and spot rare bird species with expert naturalists. Sri Lanka\'s wildlife sanctuaries offer some of Asia\'s most thrilling safari experiences.',
  'Adventure tours': 'Adrenaline-seekers unite! White-water rafting, rock climbing, zip-lining through rainforests, and mountain hiking await. Experience Sri Lanka\'s rugged landscapes with professional guides who live for adventure.',
  'Beaches tours': 'Golden sands, turquoise waters, and year-round tropical warmth. From party-filled beach clubs to secluded coves perfect for meditation, Sri Lanka\'s coastline offers every beach experience imaginable.',
  'Historical Areas tours': 'Walk through centuries of history. Ancient Buddhist temples carved into mountainsides, royal kingdoms frozen in time, and colonial-era architecture tell the epic story of Sri Lanka\'s glorious past.',
  'Culture & Heritage tours': 'Immerse yourself in authentic Sri Lanka. Learn from artisans, participate in sacred ceremonies, taste home-cooked meals with local families, and experience a way of life unchanged for generations.',
  'Hidden Trails tours': 'Escape the tourist trails and discover Sri Lanka\'s best-kept secrets. Mist-covered mountains, untouched waterfalls, hidden villages, and panoramic viewpoints known only to locals await discovery.',
};

const categoryHeroImage: Record<string, string> = {
  'Wildlife tours': '/images/home/yala.jpg',
  'Adventure tours': '/images/home/colombo.avif',
  'Beaches tours': '/images/home/colombo.avif',
  'Historical Areas tours': '/images/home/kandy.jpg',
  'Culture & Heritage tours': '/images/home/kandy.jpg',
  'Hidden Trails tours': '/images/home/The-best-things-to-do-in-Ella-Sri-Lanka.jpg',
};
// Separate background images for parallax effect
const categoryBackgroundImage: Record<string, string> = {
  'Wildlife tours': '/images/updated.jpeg',
  'Adventure tours': '/images/updated.jpeg',
  'Beaches tours': '/images/updated.jpeg',
  'Historical Areas tours': '/images/updated.jpeg',
  'Culture & Heritage tours': '/images/updated.jpeg',
  'Hidden Trails tours': '/images/updated.jpeg',
};
// const tourHighlights = {
//   'Wildlife tours': [
//     { icon: Compass, title: 'Safari Experience', description: 'Expert-guided wildlife safaris in natural reserves' },
//     { icon: Camera, title: 'Photography Moments', description: 'Capture iconic animals in their natural habitat' },
//     { icon: Clock, title: 'Early Morning Drives', description: 'Prime viewing times with experienced naturalists' },
//     { icon: MapPin, title: 'Sacred Sites', description: 'Visit protected wildlife sanctuaries and reserves' },
//   ],
//   'Adventure tours': [
//     { icon: MapPin, title: 'Hiking Trails', description: 'Explore scenic mountain paths and valleys' },
//     { icon: Compass, title: 'Water Sports', description: 'Thrilling activities like rafting and kayaking' },
//     { icon: Camera, title: 'Adventure Photography', description: 'Capture your adrenaline-pumping moments' },
//     { icon: Clock, title: 'Expert Guides', description: 'Local adventurers leading the way' },
//   ],
//   'Beaches tours': [
//     { icon: MapPin, title: 'Beach Relaxation', description: 'Paradise beaches with pristine white sand' },
//     { icon: Camera, title: 'Sunset Viewpoints', description: 'Magical golden hour beach experiences' },
//     { icon: Compass, title: 'Water Activities', description: 'Swimming, snorkeling, and diving opportunities' },
//     { icon: Clock, title: 'Beach Dining', description: 'Beachside restaurants with local cuisine' },
//   ],
//   'Historical Areas tours': [
//     { icon: MapPin, title: 'Ancient Temples', description: 'Sacred Buddhist and Hindu heritage sites' },
//     { icon: Camera, title: 'Heritage Architecture', description: 'Centuries-old colonial and ancient structures' },
//     { icon: Compass, title: 'Historical Tours', description: 'Expert insights into Sri Lanka\'s rich history' },
//     { icon: Clock, title: 'Local Markets', description: 'Vibrant bazaars and cultural centers' },
//   ],
//   'Culture & Heritage tours': [
//     { icon: MapPin, title: 'Cultural Ceremonies', description: 'Participate in authentic local rituals' },
//     { icon: Camera, title: 'Artisan Workshops', description: 'Learn traditional crafts from local masters' },
//     { icon: Compass, title: 'Cultural Immersion', description: 'Stay with local families and experience daily life' },
//     { icon: Clock, title: 'Local Cuisine', description: 'Authentic cooking classes and farm-to-table dining' },
//   ],
//   'Hidden Trails tours': [
//     { icon: MapPin, title: 'Off-Beat Paths', description: 'Discover destinations tourists rarely visit' },
//     { icon: Camera, title: 'Secret Viewpoints', description: 'Hidden panoramic views and scenic spots' },
//     { icon: Compass, title: 'Local Secrets', description: 'Access to places known only to locals' },
//     { icon: Clock, title: 'Unique Experiences', description: 'Unforgettable moments away from crowds' },
//   ],
// };

const categoryWhyVisit: Record<string, string[]> = {
  'Wildlife tours': [
    'Witness endangered species in their protected natural habitats',
    'Learn about conservation efforts from expert naturalist guides',
    'Capture once-in-a-lifetime wildlife photography moments',
    'Experience thrilling safari encounters in world-class reserves',
  ],
  'Adventure tours': [
    'Push your limits with adrenaline-pumping outdoor activities',
    'Explore untamed landscapes with experienced adventure professionals',
    'Create memories through challenging and rewarding experiences',
    'Test yourself against Sri Lanka\'s diverse natural terrain',
  ],
  'Beaches tours': [
    'Relax on some of Asia\'s most beautiful and uncrowded beaches',
    'Experience world-class water sports and beach activities',
    'Enjoy fresh seafood dining with ocean-view settings',
    'Recharge with the healing power of tropical paradise',
  ],
  'Historical Areas tours': [
    'Walk through UNESCO World Heritage sites and ancient kingdoms',
    'Understand Sri Lanka\'s 2,500-year spiritual and cultural legacy',
    'Visit archaeologically significant temples and monuments',
    'Learn fascinating stories from expert historical guides',
  ],
  'Culture & Heritage tours': [
    'Connect with locals and experience authentic daily traditions',
    'Learn traditional crafts directly from master artisans',
    'Participate in genuine cultural rituals and celebrations',
    'Understand the soul and spirit of Sri Lankan heritage',
  ],
  'Hidden Trails tours': [
    'Escape crowded tourist routes and discover hidden gems',
    'Access secret viewpoints and untouched natural landscapes',
    'Experience Sri Lanka like a true local, not a tourist',
    'Create unique stories of discovery and adventure',
  ],
};

// ─── NEW: Gallery images per category ────────────────────────────────────────
// Replace the src values with your actual image paths
const categoryGallery: Record<string, { src: string; tag: string; caption: string }[]> = {
  'Wildlife': [
    { src: '/images/home/yala.jpg',   tag: 'Featured',  caption: 'Leopard at Yala National Park' },
    { src: '/images/home/udawalawe.jpg',  tag: 'Wildlife',  caption: 'Elephant herd, Udawalawe' },
    { src: '/images/home/birds.jpg',     tag: 'Birds',     caption: 'Blue-tailed bee-eater' },
  ],
  'Adventure tours': [
    { src: '/images/gallery/adventure-rafting.jpg',  tag: 'Featured',  caption: 'White-water rafting, Kitulgala' },
    { src: '/images/gallery/adventure-climb.jpg',    tag: 'Hiking',    caption: 'Summit trail, Knuckles Range' },
    { src: '/images/gallery/adventure-zip.jpg',      tag: 'Zipline',   caption: 'Rainforest canopy zipline' },
  ],
  'Beaches tours': [
    { src: '/images/gallery/beach-mirissa.jpg',      tag: 'Featured',  caption: 'Mirissa Beach at golden hour' },
    { src: '/images/gallery/beach-unawatuna.jpg',    tag: 'Snorkel',   caption: 'Coral reef, Unawatuna' },
    { src: '/images/gallery/beach-arugambay.jpg',    tag: 'Surf',      caption: 'Arugam Bay surf break' },
  ],
  'Historical Areas tours': [
    { src: '/images/gallery/history-sigiriya.jpg',   tag: 'Featured',  caption: 'Sigiriya Rock Fortress' },
    { src: '/images/gallery/history-polonnaruwa.jpg',tag: 'Ruins',     caption: 'Polonnaruwa ancient city' },
    { src: '/images/gallery/history-galle.jpg',      tag: 'Colonial',  caption: 'Galle Fort ramparts' },
  ],
  'Culture & Heritage tours': [
    { src: '/images/gallery/culture-perahera.jpg',   tag: 'Featured',  caption: 'Kandy Esala Perahera' },
    { src: '/images/gallery/culture-craft.jpg',      tag: 'Artisan',   caption: 'Traditional mask carving' },
    { src: '/images/gallery/culture-temple.jpg',     tag: 'Ceremony',  caption: 'Dambulla Cave Temple' },
  ],
  'Hidden Trails tours': [
    { src: '/images/gallery/hidden-ella.jpg',        tag: 'Featured',  caption: 'Nine Arch Bridge, Ella' },
    { src: '/images/gallery/hidden-waterfall.jpg',   tag: 'Discovery', caption: 'Bambarakanda Falls' },
    { src: '/images/gallery/hidden-village.jpg',     tag: 'Local',     caption: 'Untouched highland village' },
  ],
};

// ─── NEW: Quick facts per category ───────────────────────────────────────────
const categoryQuickFacts: Record<string, { icon: React.ElementType; label: string; value: string }[]> = {
  'Wildlife': [
    { icon: CalendarDays, label: 'Best Season',   value: 'Feb – Sep' },
    { icon: MapPin,       label: 'Key Regions',   value: 'Yala · Udawalawe' },
    { icon: Users,        label: 'Group Size',    value: 'Max 6 per vehicle' },
    { icon: Sun,          label: 'Safari Start',  value: '5:30 AM · 3:00 PM' },
  ],
  'Adventure tours': [
    { icon: CalendarDays, label: 'Best Season',   value: 'Nov – Apr' },
    { icon: MapPin,       label: 'Key Regions',   value: 'Kitulgala · Knuckles' },
    { icon: Users,        label: 'Group Size',    value: 'Max 8 per tour' },
    { icon: Sun,          label: 'Start Time',    value: '7:00 AM' },
  ],
  'Beaches tours': [
    { icon: CalendarDays, label: 'Best Season',   value: 'Nov – Apr (South)' },
    { icon: MapPin,       label: 'Key Regions',   value: 'South & East Coast' },
    { icon: Users,        label: 'Group Size',    value: 'Flexible' },
    { icon: Sun,          label: 'Ideal Time',    value: 'Year-round' },
  ],
  'Historical Areas tours': [
    { icon: CalendarDays, label: 'Best Season',   value: 'Jan – Apr' },
    { icon: MapPin,       label: 'Key Regions',   value: 'Cultural Triangle' },
    { icon: Users,        label: 'Group Size',    value: 'Max 10 per guide' },
    { icon: Sun,          label: 'Start Time',    value: '8:00 AM' },
  ],
  'Culture & Heritage tours': [
    { icon: CalendarDays, label: 'Best Season',   value: 'Jul – Aug (Perahera)' },
    { icon: MapPin,       label: 'Key Regions',   value: 'Kandy · Colombo' },
    { icon: Users,        label: 'Group Size',    value: 'Max 8 per guide' },
    { icon: Sun,          label: 'Start Time',    value: '9:00 AM' },
  ],
  'Hidden Trails tours': [
    { icon: CalendarDays, label: 'Best Season',   value: 'Jan – Mar' },
    { icon: MapPin,       label: 'Key Regions',   value: 'Ella · Knuckles · Nuwara Eliya' },
    { icon: Users,        label: 'Group Size',    value: 'Max 6 per guide' },
    { icon: Sun,          label: 'Start Time',    value: '6:00 AM' },
  ],
};

// ─── NEW: Bullet-point inclusions per category ────────────────────────────────
const categoryInclusions: Record<string, { title: string; detail: string }[]> = {
  'Wildlife': [
    { title: 'Exclusive jeep access',      detail: 'Dedicated 4×4 safari vehicle per group — no shared tours, no crowded viewing.' },
    { title: 'Expert naturalist guide',    detail: 'DWNC-certified guides with 10+ years tracking experience in Sri Lankan reserves.' },
    { title: 'All park fees included',     detail: 'National park entrance, conservation levy, and jeep permits bundled in your tour price.' },
    { title: 'Flexible cancellation',      detail: 'Weather-dependent safaris may be rescheduled at no charge within 24 hours.' },
  ],
  'Adventure tours': [
    { title: 'Safety-certified equipment', detail: 'International-standard gear inspected before every activity.' },
    { title: 'Experienced instructors',    detail: 'Guides certified in first aid and white-water rescue techniques.' },
    { title: 'Transport included',         detail: 'Hotel pickups and drop-offs arranged throughout your adventure day.' },
    { title: 'Meals on full-day tours',    detail: 'Packed lunches and refreshments included for all-day excursions.' },
  ],
  'Beaches tours': [
    { title: 'Curated beach selection',    detail: 'Hand-picked beaches matched to your preferred vibe — lively or secluded.' },
    { title: 'Water sports arranged',      detail: 'Snorkeling, surfing lessons, and diving trips bookable on-site.' },
    { title: 'Seafood dining included',    detail: 'Recommended beachside restaurants with pre-arranged reservations.' },
    { title: 'Flexible itinerary',         detail: 'Adjust your beach stops on the go — no rigid schedules.' },
  ],
  'Historical Areas tours': [
    { title: 'UNESCO site entry fees',     detail: 'All entrance tickets to World Heritage sites included in the price.' },
    { title: 'Expert archaeologist guide', detail: 'Guides trained in Sri Lankan history and classical architecture.' },
    { title: 'Air-conditioned transport',  detail: 'Comfortable vehicle transfers between all historical sites.' },
    { title: 'Cultural briefing pack',     detail: 'Pre-tour reading material and site maps provided digitally.' },
  ],
  'Culture & Heritage tours': [
    { title: 'Homestay experiences',       detail: 'Stay with vetted local families for an authentic cultural exchange.' },
    { title: 'Cooking class included',     detail: 'Learn to prepare traditional Sri Lankan dishes with local cooks.' },
    { title: 'Artisan workshop visits',    detail: 'Hands-on sessions with batik, mask carving, and pottery masters.' },
    { title: 'Ceremony access',            detail: 'Priority entry to local rituals and cultural events where permitted.' },
  ],
  'Hidden Trails tours': [
    { title: 'Local insider guides',       detail: 'Guides from the region who know trails no guidebook lists.' },
    { title: 'Small groups only',          detail: 'Maximum 6 travelers to keep the experience exclusive and low-impact.' },
    { title: 'Camping gear available',     detail: 'Tents and sleeping bags provided for overnight trail options.' },
    { title: 'Photography assistance',     detail: 'Guides help identify the best vantage points and lighting times.' },
  ],
};

// ─── NEW: Testimonial per category ────────────────────────────────────────────
const categoryTestimonial: Record<string, { quote: string; author: string }> = {
  'Wildlife':              { quote: 'We saw five leopards in a single morning — something our guides said they\'d only witnessed twice in a decade.', author: 'Sarah M., Netherlands · Yala Safari 2024' },
  'Adventure tours':       { quote: 'The Kitulgala rafting was the highlight of our entire trip. The guides made it thrilling and completely safe.', author: 'James T., Australia · Adventure Tour 2024' },
  'Beaches tours':         { quote: 'Mirissa at sunrise with nobody around — our guide knew exactly when and where to go. Absolutely magical.', author: 'Priya K., Singapore · Beaches Tour 2024' },
  'Historical Areas tours':{ quote: 'Standing at the top of Sigiriya as the mist cleared below us — a moment I\'ll carry for the rest of my life.', author: 'Marco R., Italy · Heritage Tour 2024' },
  'Culture & Heritage tours':{ quote: 'Cooking dinner with a family in Kandy and sharing stories — this is why we travel. Completely unforgettable.', author: 'Elise D., France · Culture Tour 2024' },
  'Hidden Trails tours':   { quote: 'Our guide took us to a viewpoint above Ella that wasn\'t on any map. We were entirely alone. Breathtaking.', author: 'Tom & Lisa B., UK · Hidden Trails 2024' },
};

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const category: CategoryType | undefined = slug ? categorySlugToTitle[slug] : undefined;

  /* Parallax + fade refs */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY         = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);

  // Initialize Lenis for smooth scrolling
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
      syncTouchLerp: 0.075
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

  if (!category) {
    return (
      <div className="min-h-screen bg-white pt-28 text-slate-900">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h1 className="font-display text-4xl font-black md:text-5xl">Tour Category Not Found</h1>
          <p className="mt-4 text-slate-600">The tour category you selected is not available right now.</p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back home
          </Link>
        </div>
      </div>
    );
  }

  const whyVisitReasons = categoryWhyVisit[category] || categoryWhyVisit['Wildlife'];
  const gallery       = categoryGallery[category]    || categoryGallery['Wildlife'];
  const quickFacts    = categoryQuickFacts[category] || categoryQuickFacts['Wildlife'];
  const inclusions    = categoryInclusions[category] || categoryInclusions['Wildlife'];
  const testimonial   = categoryTestimonial[category]|| categoryTestimonial['Wildlife'];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Watermark background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5 -z-10" style={{
        backgroundImage: 'radial-gradient(circle, #173036 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${categoryBackgroundImage[category]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: bgY,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/95 to-transparent" />

        <div className="relative mx-auto max-w-9xl px-30">

          <motion.div            
            className="grid gap-12 lg:grid-cols-2 lg:items-center"
          >
            <div className="max-w-2xl">
              <p className="section-label mb-2 text-[#173036]">Destination Spotlight</p>
              <h1 className="font-display text-5xl font-black leading-tight text-slate-900 md:text-6xl lg:text-7xl">
                {category}
              </h1>
              <p className="mt-6 text-base leading-8 text-slate-600 md:text-lg">
                {categoryDescriptions[category]}
              </p>

              <div className="mt-10 hidden">
                {/* Info cards removed for category-based pages */}
              </div>

              <Link
                to="/packages"
                className="mt-8 inline-flex bg-[#173036] px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1a4d56] hover:shadow-md hover:scale-105"
              >
                Explore Packages
              </Link>
            </div>

            {/* Right side image */}
            <div className="hidden lg:block">
              <div className="group relative aspect-square overflow-hidden border-2 border-slate-200 bg-slate-100 transition-all duration-300 hover:border-[#a7d9d5] hover:shadow-lg">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-60 transition-all duration-300 group-hover:opacity-80 group-hover:scale-110"
                  style={{ backgroundImage: `url(${categoryHeroImage[category]})` }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Experience the Journey ────────────────────────────────────────────── */}
      <div className="mt-16 text-center">
        <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl">Experience the Journey</h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
          {category === 'Wildlife tours'               && 'Get up close with Sri Lanka\'s most magnificent creatures in their natural habitats. Safari adventures that create lifelong memories.'}
          {category === 'Adventure tours'        && 'Push your boundaries and challenge yourself. Adrenaline-pumping activities through Sri Lanka\'s most stunning landscapes.'}
          {category === 'Beaches tours'          && 'Discover paradise on earth. Pristine coastlines, crystal waters, and endless tropical bliss await you.'}
          {category === 'Historical Areas tours' && 'Journey back in time. Ancient temples, royal kingdoms, and archaeological treasures that shaped civilization.'}
          {category === 'Culture & Heritage tours' && 'Connect deeply with Sri Lanka. Authentic traditions, spiritual practices, and the warmth of local communities.'}
          {category === 'Hidden Trails tours'    && 'Explore the road less traveled. Secret gems, hidden viewpoints, and unforgettable discoveries await.'}
        </p>
      </div>

      {/* ── NEW: Gallery Section ─────────────────────────────────────────────── */}
      <section className="relative py-20 bg-white">
        <div className="mx-auto max-w-9xl px-30">

          {/* Masonry-style 3-photo grid */}
          <div className="grid grid-cols-2 grid-rows-[240px_180px] gap-1 lg:grid-cols-[2fr_1fr] lg:grid-rows-[300px_220px]">
            {/* Featured tall image — spans 2 rows */}
            <div className="group relative row-span-2 overflow-hidden bg-slate-200">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${gallery[0].src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="mb-2 inline-block bg-[#a7d9d5] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#0d1f24]">
                  {gallery[0].tag}
                </span>
                <p className="text-sm font-semibold text-white">{gallery[0].caption}</p>
              </div>
            </div>

            {/* Top-right image */}
            <div className="group relative overflow-hidden bg-slate-200">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${gallery[1].src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="mb-1.5 inline-block bg-[#173036]/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#a7d9d5]">
                  {gallery[1].tag}
                </span>
                <p className="text-xs font-semibold text-white">{gallery[1].caption}</p>
              </div>
            </div>

            {/* Bottom-right image */}
            <div className="group relative overflow-hidden bg-slate-200">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${gallery[2].src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="mb-1.5 inline-block bg-[#173036]/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#a7d9d5]">
                  {gallery[2].tag}
                </span>
                <p className="text-xs font-semibold text-white">{gallery[2].caption}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── NEW: At a Glance + Inclusions ────────────────────────────────────── */}
      <section className="relative py-20 bg-slate-50">
        <div className="mx-auto max-w-9xl px-30">
          {/* Section header */}
          <div className="mb-10">
            <p className="section-label mb-2 text-[#173036]">At a Glance</p>
            <h1 className="font-display text-5xl font-black text-[#173036]">What to Expect</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">Key details before you book your {category.toLowerCase()} experience.</p>
          </div>

          {/* Quick facts 4-cell grid */}
          <div className="mb-12 grid grid-cols-2 gap-px bg-slate-200 border border-slate-200 lg:grid-cols-4">
            {quickFacts.map((fact, idx) => {
              const IconComponent = fact.icon;
              return (
                <div key={idx} className="bg-white p-6">
                  <IconComponent className="mb-3 h-5 w-5 text-[#173036]" />
                  <p className="section-label mb-2 text-[#173036]">{fact.label}</p>
                  <p className="text-sm font-bold text-[#173036]">{fact.value}</p>
                </div>
              );
            })}
          </div>

          {/* Inclusions bullet list */}
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div>
              <h3 className="mb-6 text-lg font-black text-slate-900">What's Included</h3>
              <ul className="space-y-5">
                {inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center">
                      <Check className="h-5 w-5 text-[#173036]" />
                    </div>
                    <div>
                      <p className="text-md font-bold tracking-wide text-[#173036]">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial pull-quote */}
            <div className="flex flex-col justify-between">
              <div className="border-l-[3px] border-[#a7d9d5] bg-white p-8">
                <p className="text-base font-medium italic leading-8 text-slate-700">
                  "{testimonial.quote}"
                </p>
                <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  — {testimonial.author}
                </p>
              </div>

              <Link
                to="/contact"
                className="mt-6 inline-flex items-center justify-center bg-[#173036] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1a4d56] hover:shadow-md"
              >
                Book This Experience
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Visit Section (unchanged) ────────────────────────────────────── */}
      <section className="relative py-20 bg-white">
        <div className="mx-auto max-w-9xl px-30">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="group border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:border-[#a7d9d5] hover:bg-[#a7d9d5]/5 hover:shadow-lg hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#173036] transition-colors duration-300">Why Visit {category}</h3>
              <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
                {whyVisitReasons.map((reason, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-[#a7d9d5] font-bold">•</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="group border border-[#a7d9d5]/30 bg-[#a7d9d5]/10 p-8 transition-all duration-300 hover:border-[#a7d9d5] hover:bg-[#a7d9d5]/20 hover:shadow-lg hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#173036] transition-colors duration-300">Ready to Explore?</h3>
              <p className="mt-6 text-sm leading-7 text-slate-600">
                {category === 'Wildlife tours'               && 'Let us organize your perfect safari adventure. Expert naturalist guides, prime viewing times, and unforgettable wildlife encounters await. Book your wildlife expedition today.'}
                {category === 'Adventure tours'        && 'Ready to test your limits? Our experienced adventure specialists will craft the perfect itinerary for your skill level. From beginner-friendly to extreme adrenaline rushes.'}
                {category === 'Beaches tours'          && 'Plan your beach paradise escape. Our specialists will curate the perfect blend of relaxation, water sports, and coastal dining tailored to your preferences.'}
                {category === 'Historical Areas tours' && 'Explore history with expert guides. We\'ll design a journey through time, unlocking the mysteries and stories of these ancient sites.'}
                {category === 'Culture & Heritage tours' && 'Immerse yourself in authentic Sri Lankan culture. We\'ll connect you with local families, artisans, and traditions for a truly transformative experience.'}
                {category === 'Hidden Trails tours'    && 'Discover Sri Lanka like never before. Our local guides know the secret spots tourists never find. Let us reveal the island\'s best-kept secrets.'}
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex bg-[#173036] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1a4d56] hover:shadow-md hover:scale-105"
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