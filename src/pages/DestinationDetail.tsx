import { useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect } from 'react';

import { categorySlugToTitle, type CategoryType } from '../data/destinationMenu';

const categoryDescriptions: Record<string, string> = {
  'Wildlife tours': 'Track leopards in their natural habitat, witness elephant herds in misty national parks, and spot rare bird species with expert naturalists. Sri Lanka\'s wildlife sanctuaries offer some of Asia\'s most thrilling safari experiences.',
  'Adventure tours': 'For those who love adventure, Sri Lanka offers everything from white-water rafting and rock climbing to zip-lining through rainforests and hiking spectacular mountain trails.',
  'Beaches tours': 'Golden sands, turquoise waters, and year-round tropical warmth. Whether you\'re seeking quiet beaches, breathtaking sunsets, and total relaxation, or lively beach clubs and coastal nightlife, Sri Lanka has it all.',
  'Historical Areas tours': 'Explore centuries of Sri Lankan history, ancient temples, sacred cities, royal kingdoms, and colonial-era landmarks reveal the rich heritage and cultural traditions that have shaped the island for generations.',
  'Culture & Heritage tours': 'Explore Sri Lanka\'s cultural heritage through local traditions, historic sites, authentic cuisine, and meaningful experiences with the people who call the island home.',
  'Hidden Trails tours': 'Discover Sri Lanka\'s best-kept secrets. Mist-covered mountains, untouched waterfalls, hidden villages, and panoramic viewpoints known only to locals await discovery.',
};

// Separate background images for parallax effect
const categoryBackgroundImage: Record<string, string> = {
  'Wildlife tours': '/images/bg/bg-6.png',
  'Adventure tours': '/images/bg/bg-8.png',
  'Beaches tours': '/images/bg/bg-3.png',
  'Historical Areas tours': '/images/bg/bg-7.png',
  'Culture & Heritage tours': '/images/bg/bg-4.png',
  'Hidden Trails tours': '/images/bg/bg-2.png',
};

type Category =
  | 'Wildlife tours'
  | 'Adventure tours'
  | 'Beaches tours'
  | 'Historical Areas tours'
  | 'Culture & Heritage tours'
  | 'Hidden Trails tours';

const categoryContent: Record<
  Category,
  { title: string; description: string }
> = {
  'Wildlife tours': {
    title: 'Unforgettable Safari Experiences',
    description:
      "Get up close with Sri Lanka's most magnificent creatures in their natural habitats. Safari adventures that create lifelong memories.",
  },
  'Adventure tours': {
    title: 'Experience the Journey',
    description:
      'Push your limits and embrace adventure with thrilling activities set amongst Sri Lanka\'s most stunning landscapes.',
  },
  'Beaches tours': {
    title: 'Experience the Journey',
    description:
      'Discover paradise on earth. Pristine coastlines, crystal waters, and endless tropical bliss await you.',
  },
  'Historical Areas tours': {
    title: 'Experience the Journey',
    description:
      'Journey back in time. Ancient temples, royal kingdoms, and archaeological treasures that shaped civilization.',
  },
  'Culture & Heritage tours': {
    title: 'Experience the Journey',
    description:
      'Experience the real Sri Lanka through authentic traditions, spiritual landmarks, and meaningful connections with local communities.',
  },
  'Hidden Trails tours': {
    title: 'Experience the Journey',
    description:
      'Explore the road less traveled. Secret gems, hidden viewpoints, and unforgettable discoveries await.',
  },
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

// const categoryWhyVisit: Record<string, string[]> = {
//   'Wildlife tours': [
//     'Witness endangered species in their protected natural habitats',
//     'Learn about conservation efforts from expert naturalist guides',
//     'Capture once-in-a-lifetime wildlife photography moments',
//     'Experience thrilling safari encounters in world-class reserves',
//   ],
//   'Adventure tours': [
//     'Push your limits with adrenaline-pumping outdoor activities',
//     'Explore untamed landscapes with experienced adventure professionals',
//     'Create memories through challenging and rewarding experiences',
//     'Test yourself against Sri Lanka\'s diverse natural terrain',
//   ],
//   'Beaches tours': [
//     'Relax on some of Asia\'s most beautiful and uncrowded beaches',
//     'Experience world-class water sports and beach activities',
//     'Enjoy fresh seafood dining with ocean-view settings',
//     'Recharge with the healing power of tropical paradise',
//   ],
//   'Historical Areas tours': [
//     'Walk through UNESCO World Heritage sites and ancient kingdoms',
//     'Understand Sri Lanka\'s 2,500-year spiritual and cultural legacy',
//     'Visit archaeologically significant temples and monuments',
//     'Learn fascinating stories from expert historical guides',
//   ],
//   'Culture & Heritage tours': [
//     'Connect with locals and experience authentic daily traditions',
//     'Learn traditional crafts directly from master artisans',
//     'Participate in genuine cultural rituals and celebrations',
//     'Understand the soul and spirit of Sri Lankan heritage',
//   ],
//   'Hidden Trails tours': [
//     'Escape crowded tourist routes and discover hidden gems',
//     'Access secret viewpoints and untouched natural landscapes',
//     'Experience Sri Lanka like a true local, not a tourist',
//     'Create unique stories of discovery and adventure',
//   ],
// };

// ─── NEW: Gallery images per category ────────────────────────────────────────
// Replace the src values with your actual image paths
const categoryGallery: Record<string, { src: string; tag: string; caption: string }[]> = {
  'Wildlife': [
    { src: '/images/home/yala.jpg', tag: 'Featured', caption: 'Leopard at Yala National Park' },
    { src: '/images/destinations/wilpattu-wildlife.png', tag: 'Wildlife', caption: 'Elephant herd, Udawalawe' },
    { src: '/images/destinations/udawalawa-wildlife.jpg', tag: 'Birds', caption: 'Blue-tailed bee-eater' },
  ],
  'Adventure tours': [
    { src: '/images/destinations/adventure-rafting.webp', tag: 'Featured', caption: 'White-water rafting, Kitulgala' },
    { src: '/images/destinations/adventure-climb.jpg', tag: 'Hiking', caption: 'Summit trail, Knuckles Range' },
    { src: '/images/destinations/adventure-zip.jpg', tag: 'Zipline', caption: 'Rainforest canopy zipline' },
  ],
  'Beaches tours': [
    { src: '/images/destinations/mirissa-beach.webp', tag: 'Featured', caption: 'Mirissa beach' },
    { src: '/images/destinations/beach-unawatuna.jpg', tag: 'Snorkel', caption: 'Coral reef, Unawatuna' },
    { src: '/images/destinations/beach-arugambay.jpg', tag: 'Surf', caption: 'Arugam Bay surf break' },
  ],
  'Historical Areas tours': [
    { src: '/images/destinations/sigiriya-culture.png', tag: 'Featured', caption: 'Sigiriya Rock Fortress' },
    { src: '/images/destinations/polonnaruwa.webp', tag: 'Ruins', caption: 'Polonnaruwa ancient city' },
    { src: '/images/destinations/galle-culture.webp', tag: 'Colonial', caption: 'Galle Fort ramparts' },
  ],
  'Culture & Heritage tours': [
    { src: '/images/destinations/culture-perahera.webp', tag: 'Featured', caption: 'Kandy Esala Perahera' },
    { src: '/images/destinations/culture-craft.jpg', tag: 'Artisan', caption: 'Traditional mask carving' },
    { src: '/images/destinations/culture-temple.jpg', tag: 'Ceremony', caption: 'Dambulla Cave Temple' },
  ],
  'Hidden Trails tours': [
    { src: '/images/destinations/hidden-ella.jpg', tag: 'Featured', caption: 'Nine Arch Bridge, Ella' },
    { src: '/images/destinations/hidden-waterfall.jpg', tag: 'Discovery', caption: 'Bambarakanda Falls' },
    { src: '/images/destinations/hidden-village.jpg', tag: 'Local', caption: 'Untouched highland village' },
  ],
};

// ─── NEW: Quick facts per category ───────────────────────────────────────────
const categoryQuickFacts: Record<string, { label: string; value: string }[]> = {
  'Wildlife': [
    { label: 'Yala National Park', value: 'Explore Sri Lanka\'s most celebrated national park, where leopards, elephants, crocodiles, sloth bears, and diverse wildlife roam freely.' },
    { label: 'Wilpattu National Park', value: 'A quieter, wilder safari park famous for natural lakes, forest tracks, leopards, sloth bears and a more peaceful safari feel.' },
    { label: 'Udawalawe National Park', value: 'One of the best places in Sri Lanka to see wild elephants, with open grasslands, scenic reservoirs, and unforgettable safari experiences.' },
    { label: 'Minneriya', value: 'A major elephant safari area in the Cultural Triangle, famous for large herds gathering around ancient reservoirs.' },
    { label: 'Mirissa', value: 'One of Sri Lanka\'s most popular coastal destinations, offering whale watching, dolphins, stunning beaches, and ocean-based adventures.' },
    { label: 'Kaudulla', value: 'A major elephant safari area in the Cultural Triangle, famous for large herds gathering around ancient reservoirs.' },
    { label: 'Trincomalee', value: 'One of Sri Lanka\'s best destinations offering seasonal whale watching, dolphins,  crystal-clear beaches, and unforgettable ocean adventures.' },
  ],

  'Adventure tours': [
    { label: 'Ella', value: 'A hill-country favourite with hikes, waterfalls, tea estates, cafés, Nine Arch Bridge and scenic mountain views.' },
    { label: 'Kitulgala', value: 'Sri Lanka\'s adventure river hub, popular for white-water rafting, jungle walks, waterfall jumps and rainforest scenery.' },
    { label: 'Knuckles Mountain Range', value: 'A breathtaking mountain range of misty peaks,  forests, waterfalls, and remote village trails, offering some of Sri Lanka\'s finest trekking and hiking experiences.' },
    { label: 'Adam\'s Peak', value: 'A sacred mountain climbed overnight by pilgrims and travellers to see sunrise from the summit.' },
    { label: 'Belihuloya', value: 'A peaceful highland adventure base with rivers, waterfalls, hiking routes and a cooler countryside atmosphere.' },
  ],

  'Beaches tours': [
    { label: 'Unawatuna / Dalawella', value: 'A popular south-coast beach area with calm bays, reef swimming, palm swings, cafés and easy access to Galle Fort.' },
    { label: 'Mirissa', value: 'A lively but scenic beach town known for whale watching, coconut-tree viewpoints, nightlife, surfing and seafood.' },
    { label: 'Weligama / Midigama', value: 'A surf-friendly coast with beginner waves, surf schools, beach cafés and a relaxed younger travel scene.' },
    { label: 'Hiriketiya / Dickwella', value: 'A stylish horseshoe bay with surf, cafés, yoga, boutique stays and a relaxed tropical village feel.' },
    { label: 'Tangalle / Goyambokka', value: 'A quieter luxury-leaning beach region with coves, villas, turtle beaches, lagoons and romantic coastal escapes.' },
    { label: 'Bentota / Beruwala', value: 'A classic west-coast resort area known for family beach hotels, water sports, river cruises and easy airport access.' },
    { label: 'Ahungalla / Balapitiya', value: 'A calmer southwest-coast region with resort beaches, river safaris, mangroves and village-style coastal experiences.' },
    { label: 'Hikkaduwa', value: 'A long-established beach town with coral reefs, turtles, surfing, nightlife and a relaxed backpacker-meets-family feel.' },
    { label: 'Kalutara / Wadduwa', value: 'A convenient west-coast beach region close to Colombo, good for short beach stays, resorts and relaxed family breaks.' },
    { label: 'Pasikuda / Kalkudah', value: 'An east-coast beach area with shallow turquoise water, long beaches and a peaceful resort atmosphere.' },
    { label: 'Nilaveli / Trincomalee', value: 'A beautiful east-coast beach base for whale watching, snorkelling, diving and visits to Pigeon Island.' },
    { label: 'Arugam Bay', value: 'Sri Lanka\'s iconic east-coast surf town with waves, beach cafés, lagoons, wildlife nearby and a laid-back atmosphere.' },
    { label: 'Negombo', value: 'A convenient first or last-night beach town close to the airport, with canals, seafood, churches and lagoon life.' },
    { label: 'Kalpitiya', value: 'A wild peninsula beach destination known for kitesurfing, dolphins, lagoons, sandbanks and off-grid coastal stays.' },
  ],

  'Historical Areas tours': [
    { label: 'Anuradhapura', value: 'An ancient sacred city filled with stupas, monasteries, lakes, ruins and some of Sri Lanka\'s most important Buddhist heritage.' },
    { label: 'Polonnaruwa', value: 'A remarkably preserved royal city featuring ancient temples, palace ruins, impressive Buddha statues, and scenic cycling routes through history.' },
    { label: 'Sigiriya', value: 'Sri Lanka\'s most iconic rock fortress, renowned for its royal gardens, ancient frescoes, mirror wall, and breathtaking views from the summit.' },
    { label: 'Dambulla', value: 'A spectacular cave temple complex adorned with Buddhist murals, centuries-old statues, and panoramic views across the Cultural Triangle.' },
    { label: 'Yapahuwa', value: 'A lesser-known medieval rock fortress with dramatic stone stairways, ruins and a strong hidden-history feel.' },
  ],

  'Culture & Heritage tours': [
    { label: 'Kandy', value: 'Sri Lanka\'s cultural capital, home to the Temple of the Tooth, lake views, traditional dance, markets and hill-country charm.' },
    { label: 'Galle Fort', value: 'A beautiful colonial fort city with Dutch architecture, boutique hotels, cafés, museums, sea walls and sunset walks.' },
    { label: 'Ambalangoda', value: 'A coastal town famous for traditional mask carving, devil-dance rituals, puppetry and folk culture.' },
    { label: 'Nuwara Eliya', value: 'A cool hill-country town known for tea estates, colonial buildings, gardens, waterfalls and misty mountain scenery.' },
  ],

  'Hidden Trails tours': [
    { label: 'Haputale', value: 'A quiet tea-country town with huge mountain views, cool weather, scenic railways and access to Lipton\'s Seat.' },
    { label: 'Kalpitiya', value: 'A remote coastal peninsula known for dolphins, kitesurfing, lagoons, beaches and marine adventure.' },
    { label: 'Jaffna', value: 'A culturally rich northern city with Tamil heritage, Hindu temples, colonial history, islands and distinctive local food.' },
    { label: 'Riverston', value: 'A misty mountain escape with viewpoints, cloud forests, waterfalls and quiet hiking routes.' },
    { label: 'Mannar Island', value: 'A remote island destination known for birdlife, baobab trees, beaches, colonial remains and wild open landscapes.' },
  ],
};

// ─── NEW: Bullet-point inclusions per category ────────────────────────────────
// const categoryInclusions: Record<string, { title: string; detail: string }[]> = {
//   'Wildlife': [
//     { title: 'Wilpattu',            detail: 'Wilpattu means "land of lakes", referring to the natural rain-fed villus scattered across the park.' },
//     { title: 'Udawalawe',           detail: 'Udawalawe was created to protect wildlife displaced by the construction of the Udawalawe Reservoir.' },
//     { title: 'Minneriya / Kaudulla',detail: 'The seasonal Elephant Gathering here is considered one of Asia\'s great wildlife spectacles.' },
//     { title: 'Blue Whales',         detail: 'Sri Lanka is one of the few places where blue whales can often be seen relatively close to shore.' },
//   ],

//   'Adventure tours': [
//     { title: 'Ella',         detail: 'A hill-country favourite with hikes, waterfalls, tea estates, cafés, Nine Arch Bridge and scenic mountain views.' },
//     { title: 'Kitulgala',    detail: 'Sri Lanka\'s adventure river hub, popular for white-water rafting, jungle walks, waterfall jumps and rainforest scenery.' },
//     { title: 'Knuckles',     detail: 'A rugged mountain range with misty peaks, forests, waterfalls, village trails and some of Sri Lanka\'s best trekking.' },
//     { title: 'Adam\'s Peak', detail: 'A sacred mountain climbed overnight by pilgrims and travellers to see sunrise from the summit.' },
//     { title: 'Belihuloya',   detail: 'A peaceful highland adventure base with rivers, waterfalls, hiking routes and a cooler countryside atmosphere.' },
//   ],

//   'Beaches tours': [
//     { title: 'Unawatuna / Dalawella',  detail: 'A popular south-coast beach area with calm bays, reef swimming, palm swings, cafés and easy access to Galle Fort.' },
//     { title: 'Mirissa',                detail: 'A lively but scenic beach town known for whale watching, coconut-tree viewpoints, nightlife, surfing and seafood.' },
//     { title: 'Weligama / Midigama',    detail: 'A surf-friendly coast with beginner waves, surf schools, beach cafés and a relaxed younger travel scene.' },
//     { title: 'Hiriketiya / Dickwella', detail: 'A stylish horseshoe bay with surf, cafés, yoga, boutique stays and a relaxed tropical village feel.' },
//     { title: 'Tangalle / Goyambokka', detail: 'A quieter luxury-leaning beach region with coves, villas, turtle beaches, lagoons and romantic coastal escapes.' },
//     { title: 'Bentota / Beruwala',     detail: 'A classic west-coast resort area known for family beach hotels, water sports, river cruises and easy airport access.' },
//     { title: 'Ahungalla / Balapitiya',detail: 'A calmer southwest-coast region with resort beaches, river safaris, mangroves and village-style coastal experiences.' },
//     // { title: 'Hikkaduwa',              detail: 'A long-established beach town with coral reefs, turtles, surfing, nightlife and a relaxed backpacker-meets-family feel.' },
//     // { title: 'Kalutara / Wadduwa',    detail: 'A convenient west-coast beach region close to Colombo, good for short beach stays, resorts and relaxed family breaks.' },
//     // { title: 'Pasikuda / Kalkudah',   detail: 'An east-coast beach area with shallow turquoise water, long beaches and a peaceful resort atmosphere.' },
//     // { title: 'Nilaveli / Trincomalee',detail: 'A beautiful east-coast beach base for whale watching, snorkelling, diving and visits to Pigeon Island.' },
//     // { title: 'Arugam Bay',            detail: 'Sri Lanka\'s iconic east-coast surf town with waves, beach cafés, lagoons, wildlife nearby and a laid-back atmosphere.' },
//     // { title: 'Negombo',               detail: 'A convenient first or last-night beach town close to the airport, with canals, seafood, churches and lagoon life.' },
//     // { title: 'Kalpitiya',             detail: 'A wild peninsula beach destination known for kitesurfing, dolphins, lagoons, sandbanks and off-grid coastal stays.' },
//   ],

//   'Historical Areas tours': [
//     { title: 'Anuradhapura', detail: 'An ancient sacred city filled with stupas, monasteries, lakes, ruins and some of Sri Lanka\'s most important Buddhist heritage.' },
//     { title: 'Polonnaruwa',  detail: 'A compact ancient royal city with stone temples, palace ruins, giant Buddha statues and excellent cycling routes.' },
//     { title: 'Sigiriya',     detail: 'Sri Lanka\'s most iconic rock fortress, with royal gardens, frescoes, mirror wall and panoramic views from the summit.' },
//     { title: 'Dambulla',     detail: 'A famous cave temple complex filled with Buddhist murals, statues and hilltop views over the Cultural Triangle.' },
//     { title: 'Yapahuwa',     detail: 'A lesser-known medieval rock fortress with dramatic stone stairways, ruins and a strong hidden-history feel.' },
//   ],

//   'Culture & Heritage tours': [
//     { title: 'Kandy',        detail: 'Sri Lanka\'s cultural capital, home to the Temple of the Tooth, lake views, traditional dance, markets and hill-country charm.' },
//     { title: 'Galle Fort',   detail: 'A beautiful colonial fort city with Dutch architecture, boutique hotels, cafés, museums, sea walls and sunset walks.' },
//     { title: 'Ambalangoda',  detail: 'A coastal town famous for traditional mask carving, devil-dance rituals, puppetry and folk culture.' },
//     { title: 'Nuwara Eliya', detail: 'A cool hill-country town known for tea estates, colonial buildings, gardens, waterfalls and misty mountain scenery.' },
//   ],

//   'Hidden Trails tours': [
//     { title: 'Haputale',      detail: 'A quiet tea-country town with huge mountain views, cool weather, scenic railways and access to Lipton\'s Seat.' },
//     { title: 'Kalpitiya',     detail: 'A remote coastal peninsula known for dolphins, kitesurfing, lagoons, beaches and marine adventure.' },
//     { title: 'Jaffna',        detail: 'A culturally rich northern city with Tamil heritage, Hindu temples, colonial history, islands and distinctive local food.' },
//     { title: 'Riverston',     detail: 'A misty mountain escape with viewpoints, cloud forests, waterfalls and quiet hiking routes.' },
//     { title: 'Mannar Island', detail: 'A remote island destination known for birdlife, baobab trees, beaches, colonial remains and wild open landscapes.' },
//   ],
// };

// ─── NEW: Testimonial per category ────────────────────────────────────────────
// const categoryTestimonial: Record<string, { quote: string; author: string }> = {
//   'Wildlife':              { quote: 'We saw five leopards in a single morning — something our guides said they\'d only witnessed twice in a decade.', author: 'Sarah M., Netherlands · Yala Safari 2024' },
//   'Adventure tours':       { quote: 'The Kitulgala rafting was the highlight of our entire trip. The guides made it thrilling and completely safe.', author: 'James T., Australia · Adventure Tour 2024' },
//   'Beaches tours':         { quote: 'Mirissa at sunrise with nobody around — our guide knew exactly when and where to go. Absolutely magical.', author: 'Priya K., Singapore · Beaches Tour 2024' },
//   'Historical Areas tours':{ quote: 'Standing at the top of Sigiriya as the mist cleared below us — a moment I\'ll carry for the rest of my life.', author: 'Marco R., Italy · Heritage Tour 2024' },
//   'Culture & Heritage tours':{ quote: 'Cooking dinner with a family in Kandy and sharing stories — this is why we travel. Completely unforgettable.', author: 'Elise D., France · Culture Tour 2024' },
//   'Hidden Trails tours':   { quote: 'Our guide took us to a viewpoint above Ella that wasn\'t on any map. We were entirely alone. Breathtaking.', author: 'Tom & Lisa B., UK · Hidden Trails 2024' },
// };
const CategoryVideos: Record<string, {
  src: string;
  poster?: string;
  tag: string;
  title: string;
  description: string;
}> = {
  'Wildlife tours': {
    src: "/uploads/tct-hero.mp4",
    poster: "/images/home/yala.jpg",
    tag: "Wildlife Safari",
    title: "Into the Wild",
    description: "Experience breathtaking encounters with Sri Lanka’s majestic wildlife in their natural habitat.",
  },
  'Adventure tours': {
    src: "/uploads/tct-hero.mp4",
    poster: "/images/destinations/kithulgala.jpg",
    tag: "Adventure",
    title: "Adrenaline Unleashed",
    description: "Feel the rush of white-water rafting, ziplining, and trekking through Sri Lanka’s rugged terrain.",
  },
  'Beaches tours': {
    src: "/uploads/tct-hero.mp4",
    poster: "/images/destinations/mirissa-beach.webp",
    tag: "Beach Life",
    title: "Tropical Paradise",
    description: "Golden beaches, turquoise waters, and unforgettable coastal moments await you.",
  },
  'Historical Areas tours': {
    src: "/uploads/tct-hero.mp4",
    poster: "/images/destinations/sigiriya-culture.png",
    tag: "Heritage",
    title: "Echoes of History",
    description: "Discover ancient kingdoms, rock fortresses, and sacred temples that tell Sri Lanka’s epic story.",
  },
  'Culture & Heritage tours': {
    src: "/uploads/tct-hero.mp4",
    poster: "/images/destinations/culture-perahera.webp",
    tag: "Living Culture",
    title: "Traditions Alive",
    description: "Immerse yourself in vibrant festivals, rituals, and the warm hospitality of Sri Lankan culture.",
  },
  'Hidden Trails tours': {
    src: "/uploads/tct-hero.mp4",
    poster: "/images/destinations/hidden-ella.jpg",
    tag: "Off the Beaten Path",
    title: "Secret Sri Lanka",
    description: "Explore hidden waterfalls, misty mountains, and untouched villages known only to locals.",
  },
};

const DestinationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const category: CategoryType | undefined = slug ? categorySlugToTitle[slug] : undefined;

  /* Parallax + fade refs */
  const heroRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const content = categoryContent[category as Category];
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
    lenisRef.current = lenis;

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

  const gallery = categoryGallery[category] || categoryGallery['Wildlife'];
  const quickFacts = categoryQuickFacts[category] || categoryQuickFacts['Wildlife'];
  const video = CategoryVideos[category] || CategoryVideos['Wildlife'];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Watermark background pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5 -z-10" style={{
        backgroundImage: 'radial-gradient(circle, #173036 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      {/* ── Hero Section ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white min-h-[640px] lg:min-h-[720px] md:aspect-[16/9]"
      >
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${categoryBackgroundImage[category]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: bgY,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/75 to-transparent" />

        <div className="relative mx-auto max-w-9xl px-4 sm:px-8 lg:px-20 h-full flex items-center">
          <motion.div className="grid gap-12 lg:grid-cols-2 lg:items-center w-full">
            <div className="max-w-2xl">
              <p className="section-label mb-2 text-[#173036]">Destination Spotlight</p>
              <h1 className="font-display text-5xl font-black leading-tight text-slate-900 md:text-6xl lg:text-7xl">
                {category}
              </h1>
              <p className="mt-6 text-base leading-8 text-slate-600 md:text-lg">
                {categoryDescriptions[category]}
              </p>

              <button
                onClick={() => {
                  const element = document.getElementById('what-to-expect');
                  if (element) {
                    if (lenisRef.current) {
                      lenisRef.current.scrollTo(element, { offset: -85 });
                    } else {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className="mt-8 inline-flex cursor-pointer bg-[#173036] px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1a4d56] hover:shadow-md hover:scale-105"
              >
                Explore Details Below
              </button>
            </div>

            {/* You can re-enable the right image if you want */}
          </motion.div>
        </div>
      </section>

      {/* ── Experience the Journey ────────────────────────────────────────────── */}
      <div className="mt-16 text-center">
        <h2 className="font-display text-4xl font-black text-slate-900 md:text-5xl">
          {content.title}
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
          {content.description}
        </p>
      </div>

      {/* ── NEW: Gallery Section ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-10 pb-10">
        <div className="w-full">   {/* Full bleed - no max-w container */}

          <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/8.5] lg:aspect-[16/7.5] xl:aspect-[16/7] group mx-auto">
            {/* Video */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={video.poster}
            >
              <source src={video.src} type="video/mp4" />
              <source src={video.src.replace('.mp4', '.webm')} type="video/webm" />
              Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12 lg:p-16">
              <div className="max-w-3xl">
                <span className="inline-block mb-3 bg-[#a7d9d5] px-4 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#0d1f24]">
                  {video.tag}
                </span>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
                  {video.title}
                </h2>

                <p className="text-base sm:text-lg text-white/90 max-w-lg md:max-w-md">
                  {video.description}
                </p>
              </div>
            </div>

            {/* Hover Controls */}
            {/* <button
        onClick={(e) => {
          const vid = e.currentTarget.parentElement?.querySelector('video') as HTMLVideoElement;
          if (vid) vid.paused ? vid.play() : vid.pause();
        }}
        className="absolute top-6 right-6 bg-black/60 hover:bg-black/80 text-white p-4 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10"
      >
        ▶️
      </button> */}
          </div>
        </div>
      </section>

      {/* ── NEW: At a Glance + Inclusions ────────────────────────────────────── */}
      <section id="what-to-expect" className="relative py-10 bg-slate-50">
        <div className="mx-auto max-w-9xl px-4 sm:px-8 lg:px-20">
          {/* Section header */}
          <div className="mb-10">
            <p className="section-label mb-2 text-[#173036]">At a Glance</p>
            <h1 className="font-display text-5xl font-black text-[#173036]">What to Expect</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">Key details before you book your {category.toLowerCase()} experience.</p>
          </div>

          {/* Quick facts responsive grid */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-4">
            {quickFacts.map((fact, idx) => {
              return (
                <div key={idx} className="bg-white p-6 border border-slate-200">
                  <p className="section-label font-bold text-white mb-3 bg-[#173036] p-2 flex justify-center items-center">
                    {fact.label}
                  </p>
                  <p className="text-sm text-[#173036]">{fact.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="relative mb-10 bg-white overflow-hidden">
        <div className="mx-auto max-w-9xl px-4 sm:px-8 lg:px-20">

          {/* Scrolling container */}
          <div className="relative">
            <div
              className="flex w-max gap-4 animate-scroll-left hover:[animation-play-state:paused]"
              style={{
                animation: 'scrollLeft 25s linear infinite',
              }}
            >
              {/* Render each gallery item multiple times for seamless loop */}
              {[...gallery, ...gallery, ...gallery].map((item, index) => (
                <div
                  key={index}
                  className="group relative flex-shrink-0 w-[280px] h-[220px] sm:w-[320px] sm:h-[260px] md:w-[480px] md:h-[380px] overflow-hidden bg-slate-200 shadow-md"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.src})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <span className="mb-2 inline-block bg-[#a7d9d5] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0d1f24]">
                      {item.tag}
                    </span>
                    <p className="text-sm font-semibold text-white leading-tight">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Optional fade edges */}
          </div>
        </div>
      </section>

    </div>
  );
};

export default DestinationDetail;