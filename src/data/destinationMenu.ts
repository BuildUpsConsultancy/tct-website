export type CategoryType = 'Wildlife tours' | 'Adventure tours' | 'Beaches tours' | 'Historical Areas tours' | 'Culture & Heritage tours' | 'Hidden Trails tours';

export type DestinationMenuCategory = {
  title: CategoryType;
  categorySlug: string;
};

export const destinationMenu: DestinationMenuCategory[] = [
  { title: 'Wildlife tours', categorySlug: 'wildlife' },
  { title: 'Adventure tours', categorySlug: 'adventure' },
  { title: 'Beaches tours', categorySlug: 'beaches' },
  { title: 'Historical Areas tours', categorySlug: 'historical-areas' },
  { title: 'Culture & Heritage tours', categorySlug: 'culture-heritage' },
  { title: 'Hidden Trails tours', categorySlug: 'hidden-trails' },
];

// Map category slugs to full category titles
export const categorySlugToTitle: Record<string, CategoryType> = {
  'wildlife': 'Wildlife tours',
  'adventure': 'Adventure tours',
  'beaches': 'Beaches tours',
  'historical-areas': 'Historical Areas tours',
  'culture-heritage': 'Culture & Heritage tours',
  'hidden-trails': 'Hidden Trails tours',
};
