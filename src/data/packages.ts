export type PackageItem = {
  id: string;
  title: string;
  location?: string;
  days?: number;
  maxPeople?: number;
  price?: number;
  category?: string;
  type?: string;
  img?: string;
  description?: string;
  destinations?: string[];
  transport?: string;
  features?: string;
  duration?: string;
  itinerary?: Array<{ day: string; title: string; desc: string }>;
  similar?: any[];
};

export const packageItems: PackageItem[] = [
  { id: 'ramayana-tour-03', title: 'Ramayana Tour 03', location: 'Sri Lanka', days: 7, maxPeople: 12, price: 1299, category: 'Cultural', type: 'CULTURE', img: '/images/image_7.png', description: 'Placeholder description for Ramayana Tour 03.', destinations: ['Kandy', 'Dambulla', 'Sigiriya'] },
  { id: 'ramayana-tour-02', title: 'Ramayana Tour 02', location: 'Sri Lanka', days: 6, maxPeople: 12, price: 1199, category: 'Cultural', type: 'CULTURE', img: '/images/image_8.png', description: 'Placeholder description for Ramayana Tour 02.', destinations: ['Nuwara Eliya', 'Kandy', 'Dambulla'] },
  { id: 'ramayana-tour-01', title: 'Ramayana Tour 01', location: 'Sri Lanka', days: 5, maxPeople: 10, price: 999, category: 'Cultural', type: 'CULTURE', img: '/images/image_9.png', description: 'Placeholder description for Ramayana Tour 01.', destinations: ['Colombo', 'Kandy', 'Anuradhapura'] },
  { id: 'the-hill-country-swing', title: 'The Hill Country Swing', location: 'Hill Country', days: 6, maxPeople: 10, price: 1099, category: 'Nature', type: 'SCENIC', img: '/images/image_1.png', description: 'Placeholder description for The Hill Country Swing.', destinations: ['Ella', 'Nuwara Eliya', 'Haputale'] },
  { id: 'the-ultimate-golf-escape', title: 'The Ultimate Golf Escape', location: 'Coastal Greens', days: 5, maxPeople: 8, price: 1599, category: 'Golf', type: 'SPORTS', img: '/images/image_2.png', description: 'Placeholder description for The Ultimate Golf Escape.', destinations: ['Colombo', 'Digana', 'Nuwara Eliya'] },
  { id: 'magical-sri-lanka', title: 'Magical Sri Lanka', location: 'Sri Lanka', days: 9, maxPeople: 14, price: 2199, category: 'Signature', type: 'LUXURY', img: '/images/image_3.png', description: 'Placeholder description for Magical Sri Lanka.', destinations: ['Kandy', 'Galle', 'Mirissa'] },
  { id: 'family-escapade-in-paradise', title: 'Family Escapade in Paradise', location: 'Coast & Hills', days: 7, maxPeople: 6, price: 1499, category: 'Family', type: 'FAMILY', img: '/images/image_4.png', description: 'Placeholder description for Family Escapade in Paradise.', destinations: ['Bentota', 'Kandy', 'Ella'] },
  { id: 'coastal-romance', title: 'Coastal Romance', location: 'Beaches', days: 5, maxPeople: 2, price: 1399, category: 'Romance', type: 'BEACH', img: '/images/image_10.png', description: 'Placeholder description for Coastal Romance.', destinations: ['Galle', 'Mirissa', 'Bentota'] },
  { id: 'culture-nature-adventure', title: 'Culture, Nature & Adventure', location: 'Mixed', days: 10, maxPeople: 12, price: 2599, category: 'Mixed', type: 'ADVENTURE', img: '/images/image_5.png', description: 'Placeholder description for Culture, Nature & Adventure.', destinations: ['Anuradhapura', 'Sigiriya', 'Yala'] },
  { id: 'adventure-culture-love', title: 'Adventure,Culture & Love', location: 'Various', days: 8, maxPeople: 10, price: 1899, category: 'Adventure', type: 'ADVENTURE', img: '/images/image_6.png', description: 'Placeholder description for Adventure,Culture & Love.', destinations: ['Ella', 'Kandy', 'Galle'] },
  { id: 'quick-escape-to-the-hills', title: 'A Quick Escape to the Hills', location: 'Hill Country', days: 3, maxPeople: 6, price: 499, category: 'Short Break', type: 'RETREAT', img: '/images/image_7.png', description: 'Placeholder description for A Quick Escape to the Hills.', destinations: ['Ella', 'Haputale'] },
  { id: 'hillcountry-retreat', title: 'Hillcountry Retreat', location: 'Hill Country', days: 6, maxPeople: 8, price: 999, category: 'Wellness', type: 'RETREAT', img: '/images/image_8.png', description: 'Placeholder description for Hillcountry Retreat.', destinations: ['Nuwara Eliya', 'Ella', 'Kandy'] },
  { id: 'wander-awaken', title: 'Wander & Awaken', location: 'Various', days: 7, maxPeople: 10, price: 1299, category: 'Wellness', type: 'WELLNESS', img: '/images/image_9.png', description: 'Placeholder description for Wander & Awaken.', destinations: ['Kandy', 'Ella', 'Mirissa'] },
  { id: 'the-wellness-retreat', title: 'The Wellness Retreat', location: 'Resort', days: 6, maxPeople: 12, price: 1499, category: 'Wellness', type: 'WELLNESS', img: '/images/image_1.png', description: 'Placeholder description for The Wellness Retreat.', destinations: ['Bentota', 'Ahangama', 'Galle'] },
  { id: 'heritage-trails-of-sri-lanka', title: 'Heritage Trails of Sri Lanka', location: 'Historic Sites', days: 8, maxPeople: 12, price: 1799, category: 'Cultural', type: 'HISTORY', img: '/images/image_2.png', description: 'Placeholder description for Heritage Trails of Sri Lanka.', destinations: ['Anuradhapura', 'Polonnaruwa', 'Dambulla'] },
  { id: 'wildlife-culture-beach-adventure', title: 'Wildlife, Culture, and Beach Adventure', location: 'Mixed', days: 9, maxPeople: 12, price: 2099, category: 'Adventure', type: 'WILDLIFE', img: '/images/image_3.png', description: 'Placeholder description for Wildlife, Culture, and Beach Adventure.', destinations: ['Yala', 'Galle', 'Bentota'] },
  { id: 'signature-escape-16', title: 'Signature Escape 16', location: '', days: 5, maxPeople: 10, price: 999, category: 'Signature', type: 'SIGNATURE', img: '/images/image_4.png', description: 'Placeholder signature package.', destinations: ['Colombo', 'Bentota'] },
  { id: 'signature-escape-17', title: 'Signature Escape 17', location: '', days: 5, maxPeople: 10, price: 999, category: 'Signature', type: 'SIGNATURE', img: '/images/image_5.png', description: 'Placeholder signature package.', destinations: ['Kandy', 'Ella'] },
  { id: 'signature-escape-18', title: 'Signature Escape 18', location: '', days: 5, maxPeople: 10, price: 999, category: 'Signature', type: 'SIGNATURE', img: '/images/image_6.png', description: 'Placeholder signature package.', destinations: ['Galle', 'Mirissa'] },
  { id: 'signature-escape-19', title: 'Signature Escape 19', location: '', days: 5, maxPeople: 10, price: 999, category: 'Signature', type: 'SIGNATURE', img: '/images/image_7.png', description: 'Placeholder signature package.', destinations: ['Nuwara Eliya', 'Haputale'] },
  { id: 'signature-escape-20', title: 'Signature Escape 20', location: '', days: 5, maxPeople: 10, price: 999, category: 'Signature', type: 'SIGNATURE', img: '/images/image_8.png', description: 'Placeholder signature package.', destinations: ['Anuradhapura', 'Polonnaruwa'] },
  { id: 'signature-escape-21', title: 'Signature Escape 21', location: '', days: 5, maxPeople: 10, price: 999, category: 'Signature', type: 'SIGNATURE', img: '/images/image_9.png', description: 'Placeholder signature package.', destinations: ['Dambulla', 'Sigiriya'] },
  { id: 'signature-escape-22', title: 'Signature Escape 22', location: '', days: 5, maxPeople: 10, price: 999, category: 'Signature', type: 'SIGNATURE', img: '/images/image_1.png', description: 'Placeholder signature package.', destinations: ['Wilpattu', 'Yala'] },
  { id: 'signature-escape-23', title: 'Signature Escape 23', location: '', days: 5, maxPeople: 10, price: 999, category: 'Signature', type: 'SIGNATURE', img: '/images/image_2.png', description: 'Placeholder signature package.', destinations: ['Bentota', 'Hikkaduwa'] },
  { id: 'signature-escape-24', title: 'Signature Escape 24', location: '', days: 5, maxPeople: 10, price: 999, category: 'Signature', type: 'SIGNATURE', img: '/images/image_3.png', description: 'Placeholder signature package.', destinations: ['Kalpitiya', 'Mannar'] },
  { id: 'signature-escape-25', title: 'Signature Escape 25', location: '', days: 5, maxPeople: 10, price: 999, category: 'Signature', type: 'SIGNATURE', img: '/images/image_4.png', description: 'Placeholder signature package.', destinations: ['Colombo', 'Galle'] },
  { id: 'signature-escape-26', title: 'Signature Escape 26', location: '', days: 5, maxPeople: 10, price: 999, category: 'Signature', type: 'SIGNATURE', img: '/images/image_5.png', description: 'Placeholder signature package.', destinations: ['Kandy', 'Nuwara Eliya'] },
];

export const packageById: Record<string, PackageItem> = packageItems.reduce((acc, p) => {
  acc[p.id] = p;
  return acc;
}, {} as Record<string, PackageItem>);

export const defaultPackage: PackageItem = {
  id: 'default',
  title: 'Default Package',
  location: 'Unknown',
  days: 5,
  maxPeople: 10,
  price: 999,
  category: 'Signature',
  type: 'SIGNATURE',
  img: '/images/image_1.png',
  description: 'Default package placeholder.',
  itinerary: [
    { day: '01', title: 'Arrival', desc: 'Welcome and orientation.' },
  ],
};

export const tourTypes: string[] = [
  'Adventure',
  'Beach',
  'Cultural',
  'Wellness',
  'Family',
  'Golf',
  'Wildlife',
  'Signature',
  'Short Break',
  'City',
];

export default packageItems;
