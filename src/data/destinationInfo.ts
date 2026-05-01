export type DestinationTravelInfo = {
  season: string;
  currency: string;
  language: string;
  mustSee: string;
};

export const destinationInfo: Record<string, DestinationTravelInfo> = {
  'habarana-city-adventure-tour': {
    season: 'Oct – May',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Dambulla Cave Temple',
  },
  'kalpitiya-adventure-tour': {
    season: 'Nov – April',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Kalpitiya Lagoon',
  },
  'bentota-adventure-tour': {
    season: 'Dec – March',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Bentota River',
  },
  'colombo-adventure-tour': {
    season: 'Nov – March',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Galle Face Green',
  },
  'hikkaduwa-adventure-tour': {
    season: 'Nov – March',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Hikkaduwa Reef',
  },
  'galle-adventure-tour': {
    season: 'Nov – March',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Galle Fort',
  },
  'jaffna-beach-tours': {
    season: 'May – September',
    currency: 'LKR',
    language: 'Tamil, English',
    mustSee: 'Jaffna Peninsula',
  },
  'mannar-beach-tours': {
    season: 'Nov – April',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: "Adam's Bridge",
  },
  'colombo-beach-tours': {
    season: 'Dec – March',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Mount Lavinia Beach',
  },
  'yala-beach-tours': {
    season: 'Dec – April',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Kirinda Beach',
  },
  'kalpitiya-beach-tours': {
    season: 'Nov – April',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Kalpitiya Beach',
  },
  'bentota-beach-tours': {
    season: 'Dec – March',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Bentota Beach',
  },
  'hikkaduwa-beach-tours': {
    season: 'Nov – March',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Hikkaduwa Beach',
  },
  'anuradhapura-cultural-tour': {
    season: 'Oct – May',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Sri Maha Bodhi',
  },
  'polonnaruwa-cultural-tour': {
    season: 'Oct – May',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Polonnaruwa Kingdom',
  },
  'ella-cultural-tour': {
    season: 'Jan – April',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Nine Arch Bridge',
  },
  'kandy-cultural-tour': {
    season: 'Dec – April',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Temple of the Tooth',
  },
  'colombo-cultural-tour': {
    season: 'Nov – March',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'National Museum',
  },
  'hikkaduwa-cultural-tour': {
    season: 'Nov – March',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Hikkaduwa Town',
  },
  'galle-cultural-tour': {
    season: 'Nov – March',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Galle Fort',
  },
  'mirissa-cultural-tour': {
    season: 'Nov – March',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Mirissa Village',
  },
  'negombo-wildlife-tour': {
    season: 'Nov – March',
    currency: 'LKR',
    language: 'Sinhala, English',
    mustSee: 'Negombo Lagoon',
  },
};

export const getDestinationInfo = (slug: string): DestinationTravelInfo => {
  return (
    destinationInfo[slug] || {
      season: 'Nov – March',
      currency: 'LKR',
      language: 'Sinhala, English',
      mustSee: 'Sri Lanka',
    }
  );
};
