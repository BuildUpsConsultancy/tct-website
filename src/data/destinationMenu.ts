export type CategoryType = 'Wildlife' | 'Adventure' | 'Beaches' | 'Historical Areas' | 'Culture & Heritage' | 'Hidden Trails';

export type DestinationMenuCategory = {
  title: CategoryType;
  categorySlug: string;
};

export const destinationMenu: DestinationMenuCategory[] = [
  { title: 'Wildlife', categorySlug: 'wildlife' },
  { title: 'Adventure', categorySlug: 'adventure' },
  { title: 'Beaches', categorySlug: 'beaches' },
  { title: 'Historical Areas', categorySlug: 'historical-areas' },
  { title: 'Culture & Heritage', categorySlug: 'culture-heritage' },
  { title: 'Hidden Trails', categorySlug: 'hidden-trails' },
];

// Map category slugs to full category titles
export const categorySlugToTitle: Record<string, CategoryType> = {
  'wildlife': 'Wildlife',
  'adventure': 'Adventure',
  'beaches': 'Beaches',
  'historical-areas': 'Historical Areas',
  'culture-heritage': 'Culture & Heritage',
  'hidden-trails': 'Hidden Trails',
};
