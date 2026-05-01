export type DestinationMenuItem = {
  slug: string;
  city: string;
  category: 'Adventure Tours' | 'Beach Tours' | 'Clutural Tours' | 'Wildlife Tours';
};

export type DestinationMenuCategory = {
  title: DestinationMenuItem['category'];
  items: DestinationMenuItem[];
};

export const destinationMenu: DestinationMenuCategory[] = [
  {
    title: 'Adventure Tours',
    items: [
      { slug: 'habarana-city-adventure-tour', city: 'Habarana City', category: 'Adventure Tours' },
      { slug: 'kalpitiya-adventure-tour', city: 'Kalpitiya', category: 'Adventure Tours' },
      { slug: 'bentota-adventure-tour', city: 'Bentota', category: 'Adventure Tours' },
      { slug: 'colombo-adventure-tour', city: 'Colombo', category: 'Adventure Tours' },
      { slug: 'hikkaduwa-adventure-tour', city: 'Hikkaduwa', category: 'Adventure Tours' },
      { slug: 'galle-adventure-tour', city: 'Galle', category: 'Adventure Tours' },
    ],
  },
  {
    title: 'Beach Tours',
    items: [
      { slug: 'jaffna-beach-tours', city: 'Jaffna', category: 'Beach Tours' },
      { slug: 'mannar-beach-tours', city: 'Mannar', category: 'Beach Tours' },
      { slug: 'colombo-beach-tours', city: 'Colombo', category: 'Beach Tours' },
      { slug: 'yala-beach-tours', city: 'Yala', category: 'Beach Tours' },
      { slug: 'kalpitiya-beach-tours', city: 'Kalpitiya', category: 'Beach Tours' },
      { slug: 'bentota-beach-tours', city: 'Bentota', category: 'Beach Tours' },
      { slug: 'hikkaduwa-beach-tours', city: 'Hikkaduwa', category: 'Beach Tours' },
    ],
  },
  {
    title: 'Clutural Tours',
    items: [
      { slug: 'anuradhapura-cultural-tour', city: 'Anuradhapura', category: 'Clutural Tours' },
      { slug: 'polonnaruwa-cultural-tour', city: 'Polonnaruwa', category: 'Clutural Tours' },
      { slug: 'ella-cultural-tour', city: 'Ella', category: 'Clutural Tours' },
      { slug: 'kandy-cultural-tour', city: 'Kandy', category: 'Clutural Tours' },
      { slug: 'colombo-cultural-tour', city: 'Colombo', category: 'Clutural Tours' },
      { slug: 'hikkaduwa-cultural-tour', city: 'Hikkaduwa', category: 'Clutural Tours' },
      { slug: 'galle-cultural-tour', city: 'Galle', category: 'Clutural Tours' },
      { slug: 'mirissa-cultural-tour', city: 'Mirissa', category: 'Clutural Tours' },
    ],
  },
  {
    title: 'Wildlife Tours',
    items: [
      { slug: 'negombo-wildlife-tour', city: 'Negombo', category: 'Wildlife Tours' },
    ],
  },
];

export const destinationMenuBySlug = destinationMenu
  .flatMap((group) => group.items)
  .reduce<Record<string, DestinationMenuItem>>((acc, item) => {
    acc[item.slug] = item;
    return acc;
  }, {});

export const getDestinationLabel = (item: DestinationMenuItem) => {
  const suffix = item.category.replace('Tours', 'Tour').trim();
  return `${item.city} - ${suffix}`;
};
