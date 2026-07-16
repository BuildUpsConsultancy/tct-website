export type DestinationCard = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
};

export const featuredDestinations: DestinationCard[] = [
  {
    slug: 'wildlife',
    title: 'Wildlife',
    subtitle: "Meet Sri Lanka's Wildlife",
    image: '/images/gallery-3/23.png',
    alt: "Wildlife in Sri Lanka's national parks",
  },
  {
    slug: 'adventure',
    title: 'Adventure',
    subtitle: 'Adventure Starts Here',
    image: '/images/home/The-best-things-to-do-in-Ella-Sri-Lanka.jpg',
    alt: 'Adventure activities in Ella, Sri Lanka',
  },
  {
    slug: 'culture-heritage',
    title: 'Culture & Heritage',
    subtitle: 'Discover Timeless Traditions',
    image: '/images/destinations/culture-perahera.webp',
    alt: 'Cultural pageant in Kandy, Sri Lanka',
  },
  {
    slug: 'beaches',
    title: 'Beaches',
    subtitle: 'Escape to Paradise',
    image: '/images/gallery-3/12.png',
    alt: 'Pristine tropical beach in Sri Lanka',
  },
  {
    slug: 'historical-areas',
    title: 'Historical',
    subtitle: 'Step Into History',
    image: '/images/gallery-3/18.png',
    alt: 'Sigiriya ancient rock fortress',
  },
  {
    slug: 'hidden-trails',
    title: 'Hidden Trails',
    subtitle: 'Discover Hidden Gems',
    image: '/images/home/colombo.avif',
    alt: 'Scenic train ride through Sri Lankan hills',
  },
];