export interface Tour {
  id: string;
  title: string;
  destination: string;
  country: string;
  duration: string;
  durationDays: number;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: string;
  difficulty: string;
  groupSize: string;
  highlights: string[];
  description: string;
  itinerary: { day: number; title: string; description: string; activities: string[] }[];
  included: string[];
  excluded: string[];
  meetingPoint: string;
  featured?: boolean;
  badge?: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  toursCount: number;
  tagline: string;
}

export interface Experience {
  id: string;
  title: string;
  image: string;
  icon: string;
  description: string;
  toursCount: number;
}

export const destinations: Destination[] = [
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    toursCount: 48,
    tagline: 'Island of the Gods',
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    country: 'Argentina',
    image: 'https://images.unsplash.com/photo-1636311838630-f38d42915aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    toursCount: 23,
    tagline: 'End of the Earth',
  },
  {
    id: 'angkor',
    name: 'Angkor Wat',
    country: 'Cambodia',
    image: 'https://images.unsplash.com/photo-1444194563460-454833ba6005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    toursCount: 19,
    tagline: 'Ancient Wonder',
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Indian Ocean',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    toursCount: 34,
    tagline: 'Paradise on Earth',
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    toursCount: 41,
    tagline: 'Peak Perfection',
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1732808460864-b8e5eb489a52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    toursCount: 27,
    tagline: 'Aegean Dream',
  },
  {
    id: 'sri-lanka',
    name: 'Sri Lanka',
    country: 'Sri Lanka',
    image: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    toursCount: 31,
    tagline: 'Pearl of the Indian Ocean',
  },
];

export const experiences: Experience[] = [
  {
    id: 'adventure',
    title: 'Adventure & Trekking',
    image: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    icon: '🏔️',
    description: 'Push your limits with guided treks through breathtaking wilderness',
    toursCount: 89,
  },
  {
    id: 'cultural',
    title: 'Cultural & Heritage',
    image: 'https://images.unsplash.com/photo-1597133541155-8f2f9da143a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    icon: '🏛️',
    description: 'Immerse yourself in ancient traditions and living history',
    toursCount: 64,
  },
  {
    id: 'beach',
    title: 'Beach & Island',
    image: 'https://images.unsplash.com/photo-1623784373624-26fb62d3076d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    icon: '🌊',
    description: 'Discover pristine shores and crystal-clear island waters',
    toursCount: 112,
  },
  {
    id: 'wildlife',
    title: 'Wildlife & Nature',
    image: 'https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    icon: '🦁',
    description: 'Encounter extraordinary wildlife in their natural habitats',
    toursCount: 57,
  },
];

export const tours: Tour[] = [
  {
    id: '1',
    title: 'Ultimate Bali Retreat: Temples, Rice Terraces & Beach',
    destination: 'Bali',
    country: 'Indonesia',
    duration: '10 Days',
    durationDays: 10,
    price: 2299,
    originalPrice: 2799,
    rating: 4.9,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1561501900-3701fa6a0864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1549294413-26f195200c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1526786220381-1d21eedf92bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    ],
    category: 'Beach & Island',
    difficulty: 'Easy',
    groupSize: '2-16 people',
    highlights: [
      'Private villa accommodation with infinity pool',
      'Sunrise trek to Mount Batur volcano',
      'Traditional Balinese cooking class',
      'Sacred temple ceremonies & cultural immersion',
      'Snorkeling in crystal-clear waters of Nusa Penida',
    ],
    description: 'Experience the magic of Bali on this immersive 10-day journey through the Island of the Gods. From sacred temples and terraced rice paddies to pristine beaches and vibrant nightlife, this tour captures Bali\'s extraordinary diversity. Stay in a stunning private villa, trek to a volcano at sunrise, and discover why millions fall in love with this enchanting destination.',
    itinerary: [
      { day: 1, title: 'Arrival in Ubud', description: 'Welcome to Bali! Transfer to your private villa in Ubud.', activities: ['Airport pickup', 'Villa check-in', 'Welcome dinner at traditional Balinese restaurant'] },
      { day: 2, title: 'Sacred Temples & Rice Terraces', description: 'Explore Ubud\'s most iconic spiritual and natural sites.', activities: ['Tegallalang Rice Terraces', 'Tirta Empul Holy Spring Temple', 'Traditional Balinese dance show'] },
      { day: 3, title: 'Volcano Sunrise Trek', description: 'Early morning trek to witness a spectacular sunrise from Mount Batur.', activities: ['4AM departure for Mount Batur', 'Sunrise at 1,717m summit', 'Breakfast with volcano views'] },
      { day: 4, title: 'Cooking Class & Markets', description: 'Learn the secrets of Balinese cuisine.', activities: ['Morning market visit', 'Traditional cooking class', 'Spa & wellness afternoon'] },
      { day: 5, title: 'Transfer to Seminyak', description: 'Coastal Bali awaits with beaches and beach clubs.', activities: ['Drive through scenic Tanah Lot', 'Beach afternoon in Seminyak', 'Sunset cocktails at Ku De Ta'] },
      { day: 6, title: 'Nusa Penida Day Trip', description: 'Island hopping to Bali\'s stunning neighbor.', activities: ['Speed boat to Nusa Penida', 'Snorkeling with manta rays', 'Kelingking Beach viewpoint'] },
      { day: 7, title: 'Water Activities Day', description: 'Full day of ocean adventures.', activities: ['Scuba diving or snorkeling', 'Stand-up paddleboarding', 'Free afternoon'] },
      { day: 8, title: 'Uluwatu & Culture', description: 'Clifftop temples and Kecak fire dance.', activities: ['Uluwatu Temple tour', 'Kecak sunset fire dance', 'Jimbaran seafood dinner'] },
      { day: 9, title: 'Leisure Day', description: 'Your choice of activities or relaxation.', activities: ['Optional waterfall hike', 'Beach club day', 'Shopping for handicrafts'] },
      { day: 10, title: 'Departure', description: 'Farewell to the Island of the Gods.', activities: ['Final Balinese breakfast', 'Souvenir shopping', 'Airport transfer'] },
    ],
    included: ['Private villa accommodation', 'Daily breakfast', 'All ground transfers', 'Expert local guide', 'Entrance fees to all sites', 'Cooking class & materials', 'Volcano trek with guide', 'Nusa Penida boat trip', 'Welcome & farewell dinners'],
    excluded: ['International flights', 'Travel insurance', 'Personal expenses', 'Alcoholic beverages', 'Optional activities'],
    meetingPoint: 'Ngurah Rai International Airport, Bali (DPS) — your guide will meet you at arrivals.',
    featured: true,
    badge: 'Best Seller',
  },
  {
    id: '2',
    title: 'Patagonia Trekking Expedition: Torres del Paine',
    destination: 'Patagonia',
    country: 'Argentina',
    duration: '12 Days',
    durationDays: 12,
    price: 3499,
    rating: 4.8,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1636311838630-f38d42915aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1636311838630-f38d42915aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1568454537842-d933259bb258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1578592391689-0e3d1a1b52b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    ],
    category: 'Adventure & Trekking',
    difficulty: 'Challenging',
    groupSize: '4-12 people',
    highlights: [
      'Trek the iconic W Circuit in Torres del Paine',
      'Witness the awe-inspiring Grey Glacier',
      'Spot condors, guanacos and pumas in the wild',
      'Camp under the Milky Way in Patagonia',
      'Expert mountaineering guide',
    ],
    description: 'Tackle one of the world\'s most dramatic trekking destinations. The Torres del Paine W Circuit takes you through granite towers, glacial lakes, and windswept pampas at the end of the Earth. This challenging but rewarding expedition is perfect for adventurers seeking an unforgettable wilderness experience.',
    itinerary: [
      { day: 1, title: 'Fly to Punta Arenas', description: 'Arrival and overnight in Punta Arenas.', activities: ['Flight to Punta Arenas', 'Group briefing & gear check', 'Welcome dinner'] },
      { day: 2, title: 'Transfer to Puerto Natales', description: 'Journey into the heart of Patagonia.', activities: ['Scenic drive to Puerto Natales', 'Equipment check', 'Briefing and preparation'] },
      { day: 3, title: 'Enter the Park', description: 'First steps into Torres del Paine National Park.', activities: ['Park entrance', 'Hike to Mirador Las Torres base', 'Mountain camp overnight'] },
      { day: 4, title: 'Las Torres Summit', description: 'Epic sunrise at the iconic granite towers.', activities: ['Pre-dawn hike to Las Torres', 'Sunrise photography session', 'Descent and rest'] },
      { day: 5, title: 'Valle del Francés', description: 'Trek through the spectacular French Valley.', activities: ['Full day valley hike', 'Hanging glacier views', 'Refugio overnight'] },
      { day: 6, title: 'Mirador Británico', description: 'Panoramic views from the British Lookout.', activities: ['Morning summit hike', '360° Patagonia views', 'Afternoon relaxation'] },
    ],
    included: ['Mountain hut & camp accommodation', 'All meals on trek', 'National park fees', 'Professional guide', 'Trekking permits', 'Bus & boat transfers within park'],
    excluded: ['International flights', 'Personal trekking gear', 'Travel insurance', 'Pre/post tour hotels'],
    meetingPoint: 'Puerto Natales Bus Terminal, Patagonia, Chile — Day 2 at 8:00 AM.',
    featured: true,
    badge: 'Top Rated',
  },
  {
    id: '3',
    title: 'Angkor Wat & Mekong River Cultural Journey',
    destination: 'Angkor Wat',
    country: 'Cambodia',
    duration: '8 Days',
    durationDays: 8,
    price: 1599,
    rating: 4.7,
    reviews: 267,
    image: 'https://images.unsplash.com/photo-1444194563460-454833ba6005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1444194563460-454833ba6005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1597133541155-8f2f9da143a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1507868162883-6b769c1a88c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1529733772151-bab41484710a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    ],
    category: 'Cultural & Heritage',
    difficulty: 'Easy',
    groupSize: '2-20 people',
    highlights: [
      'Sunrise at Angkor Wat, world\'s largest religious monument',
      'Explore the mysterious Bayon temple with 216 serene faces',
      'Traditional Khmer cooking class',
      'Mekong River boat cruise',
      'Visit floating villages on Tonlé Sap Lake',
    ],
    description: 'Journey through Southeast Asia\'s most magnificent ancient civilization. Marvel at the grandeur of Angkor Wat, wander through jungle-strangled Ta Prohm, and connect with Cambodian culture through local cooking, traditional arts, and riverside communities. An enriching adventure that brings history to life.',
    itinerary: [
      { day: 1, title: 'Arrival in Siem Reap', description: 'Welcome to the gateway of Angkor.', activities: ['Airport pickup', 'Hotel check-in', 'Evening Pub Street walk & dinner'] },
      { day: 2, title: 'Angkor Sunrise & Grand Circuit', description: 'The iconic sunrise experience you\'ll never forget.', activities: ['4:30AM Angkor Wat sunrise', 'Angkor Thom & Bayon Temple', 'Ta Prohm jungle temple'] },
      { day: 3, title: 'Hidden Temples', description: 'Explore lesser-known but equally stunning temples.', activities: ['Banteay Srei pink sandstone temple', 'Beng Mealea jungle temple', 'Khmer cooking class'] },
      { day: 4, title: 'Tonlé Sap Lake', description: 'Life on Southeast Asia\'s largest lake.', activities: ['Floating village boat tour', 'Fish farm visit', 'Sunset over the lake'] },
    ],
    included: ['4-star hotel accommodation', 'Daily breakfast', 'Angkor Wat 3-day pass', 'Expert guide', 'All transportation', 'Cooking class', 'Boat tour'],
    excluded: ['International flights', 'Visa fees', 'Travel insurance', 'Lunches & dinners'],
    meetingPoint: 'Siem Reap International Airport (REP) — guide meets you at arrivals.',
    badge: 'New',
  },
  {
    id: '4',
    title: 'Maldives Overwater Bungalow Paradise',
    destination: 'Maldives',
    country: 'Indian Ocean',
    duration: '7 Days',
    durationDays: 7,
    price: 4199,
    originalPrice: 4999,
    rating: 5.0,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1561501900-3701fa6a0864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1623784373624-26fb62d3076d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    ],
    category: 'Beach & Island',
    difficulty: 'Easy',
    groupSize: '2 people',
    highlights: [
      'Luxury overwater bungalow with glass floor',
      'Private plunge pool overlooking the Indian Ocean',
      'Dolphin watching cruise at sunset',
      'World-class snorkeling & diving at house reef',
      'Romantic private beach dinner',
    ],
    description: 'Escape to paradise in a luxury overwater bungalow perched above the crystal-clear waters of the Indian Ocean. With a private plunge pool, glass floor panels revealing the reef below, and butler service, this is the ultimate romantic getaway. Snorkel with tropical fish, dine under the stars, and watch dolphins play at sunset.',
    itinerary: [
      { day: 1, title: 'Arrival & Seaplane Transfer', description: 'Arrive in Malé and fly by seaplane to your private atoll.', activities: ['International arrival in Malé', 'Scenic seaplane transfer', 'Welcome champagne & villa check-in'] },
      { day: 2, title: 'House Reef Exploration', description: 'Discover the vibrant marine life right below your bungalow.', activities: ['Morning snorkeling with guide', 'Spa treatment', 'Sunset fishing trip'] },
      { day: 3, title: 'Dolphin Cruise & Sandbank', description: 'Swim with dolphins and picnic on a deserted sandbank.', activities: ['Dolphin watching cruise', 'Private sandbank picnic', 'Stargazing at night'] },
    ],
    included: ['Overwater bungalow accommodation', 'Full board (all meals)', 'Seaplane transfers', 'Snorkeling gear', 'Dolphin cruise', 'Private beach dinner', 'Butler service'],
    excluded: ['International flights', 'Spa treatments', 'Alcoholic beverages', 'Scuba diving courses'],
    meetingPoint: 'Velana International Airport, Malé, Maldives (MLE) — representative meets at arrivals.',
    featured: true,
    badge: 'Luxury',
  },
  {
    id: '5',
    title: 'Swiss Alps Adventure: Hiking & Via Ferrata',
    destination: 'Swiss Alps',
    country: 'Switzerland',
    duration: '9 Days',
    durationDays: 9,
    price: 3799,
    rating: 4.8,
    reviews: 213,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1721613911209-06877d421fa0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1568454537842-d933259bb258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1704610077766-7a5e0535638c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    ],
    category: 'Adventure & Trekking',
    difficulty: 'Moderate',
    groupSize: '4-14 people',
    highlights: [
      'Hike to the iconic Matterhorn base camp',
      'Via Ferrata climbing in Grindelwald',
      'Scenic train ride on the Glacier Express',
      'Jungfraujoch — Top of Europe at 3,454m',
      'Traditional Swiss mountain hut stay',
    ],
    description: 'Conquer the roof of Europe on this action-packed alpine adventure. From the iconic Matterhorn to the Jungfraujoch, Switzerland\'s dramatic mountain landscape provides an extraordinary backdrop for hiking, via ferrata, and breathtaking train journeys. Stay in cozy mountain huts and feast on Swiss cuisine after each exhilarating day.',
    itinerary: [
      { day: 1, title: 'Arrive in Zurich', description: 'Transfer to the alpine town of Grindelwald.', activities: ['Airport arrival', 'Train to Grindelwald', 'Mountain hut check-in & welcome fondue'] },
      { day: 2, title: 'Grindelwald Via Ferrata', description: 'Clip in and climb the famous Grindelwald via ferrata routes.', activities: ['Safety briefing & harness fitting', 'Via Ferrata Wixi route', 'Eiger North Face views'] },
      { day: 3, title: 'Jungfraujoch — Top of Europe', description: 'Take the cogwheel train to Europe\'s highest railway station.', activities: ['Cogwheel train ascent', 'Ice Palace & Snow Fun Park', 'Aletsch Glacier views'] },
    ],
    included: ['Mountain hut accommodation', 'Daily breakfast & dinner', 'Via ferrata equipment', 'Professional mountain guide', 'Swiss rail passes', 'Jungfraujoch tickets'],
    excluded: ['International flights to Zurich', 'Travel insurance', 'Lunches', 'Personal equipment'],
    meetingPoint: 'Grindelwald Train Station, Switzerland — Day 1 at 3:00 PM.',
  },
  {
    id: '6',
    title: 'Santorini Sunsets & Aegean Island Hopping',
    destination: 'Santorini',
    country: 'Greece',
    duration: '8 Days',
    durationDays: 8,
    price: 2599,
    rating: 4.9,
    reviews: 289,
    image: 'https://images.unsplash.com/photo-1732808460864-b8e5eb489a52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1732808460864-b8e5eb489a52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1656013082096-2ba1c0c0bc10?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1623784373624-26fb62d3076d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1594661745200-810105bcf054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    ],
    category: 'Beach & Island',
    difficulty: 'Easy',
    groupSize: '2-18 people',
    highlights: [
      'Iconic sunset views from Oia village',
      'Private catamaran cruise around the caldera',
      'Wine tasting at volcanic vineyards',
      'Explore Mykonos cosmopolitan nightlife',
      'Ancient ruins of Akrotiri',
    ],
    description: 'Sail through the Aegean on a dreamy island-hopping adventure between Santorini and Mykonos. Watch the world-famous Oia sunset paint the caldera gold, cruise past volcanic cliffs on a private catamaran, and sip wine from vines grown in ancient volcanic soil. This is Greece at its most magical.',
    itinerary: [
      { day: 1, title: 'Arrive in Athens', description: 'Brief Athens stopover before flying to Santorini.', activities: ['Athens arrival', 'Acropolis quick visit', 'Ferry or flight to Santorini'] },
      { day: 2, title: 'Santorini Discovery', description: 'Explore the island\'s iconic villages and sites.', activities: ['Fira town walk', 'Akrotiri archaeological site', 'Oia sunset experience'] },
      { day: 3, title: 'Catamaran Cruise', description: 'Private sailing around the Santorini caldera.', activities: ['Caldera hot springs swim', 'Red Beach snorkeling', 'Sunset BBQ on board'] },
    ],
    included: ['Boutique cave hotel in Santorini', 'Daily breakfast', 'Ferry & inter-island transfers', 'Catamaran cruise with meals', 'Wine tasting experience', 'Local guide'],
    excluded: ['International flights', 'Mykonos hotel (optional add-on)', 'Dinners', 'Travel insurance'],
    meetingPoint: 'Santorini International Airport (JTR) — guide meets at arrivals.',
    badge: 'Popular',
  },
  {
    id: '7',
    title: 'Sri Lanka Grand Tour: Ancient Kingdoms, Tea Trails & Wildlife',
    destination: 'Sri Lanka',
    country: 'Sri Lanka',
    duration: '12 Days',
    durationDays: 12,
    price: 1899,
    originalPrice: 2299,
    rating: 4.9,
    reviews: 184,
    image: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1609681980718-340e7f4b11d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1578519050142-afb511e518de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1533484482814-3fe2d922be89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    ],
    category: 'Cultural & Heritage',
    difficulty: 'Easy',
    groupSize: '2-16 people',
    highlights: [
      'Climb the iconic Sigiriya Lion Rock fortress',
      'Scenic train ride through Ella\'s misty tea hills',
      'Elephant encounters at Minneriya National Park',
      'Temple of the Tooth Relic in ancient Kandy',
      'Stroll through lush spice gardens & tea estates',
    ],
    description: 'Journey through Sri Lanka\'s extraordinary tapestry of ancient civilisations, mist-shrouded highlands, and untamed wildlife. Ascend the 5th-century rock fortress of Sigiriya, take one of the world\'s most scenic train rides across emerald tea plantations, and witness hundreds of wild elephants gathering at Minneriya. This island has it all — and WanderQuest shows you every gem.',
    itinerary: [
      { day: 1, title: 'Arrival in Colombo', description: 'Welcome to the Pearl of the Indian Ocean. Transfer to your boutique hotel.', activities: ['Airport welcome', 'City orientation walk', 'Welcome dinner with local cuisine'] },
      { day: 2, title: 'Colombo to Sigiriya', description: 'Drive to the Cultural Triangle and check in near the rock fortress.', activities: ['National Museum of Colombo', 'Drive through Sri Lanka countryside', 'Sunset at Sigiriya reservoir'] },
      { day: 3, title: 'Sigiriya Lion Rock', description: 'Climb the iconic 5th-century rock fortress rising 200m above the jungle.', activities: ['Early morning Sigiriya climb', 'Explore frescoes & mirror wall', 'Pidurangala Rock panorama hike'] },
      { day: 4, title: 'Polonnaruwa Ancient City', description: 'Explore the medieval capital of Sri Lanka by bicycle.', activities: ['Cycle through ruins of the royal palace', 'Gal Vihara rock temples', 'Parakrama Samudra reservoir'] },
      { day: 5, title: 'Kandy — City of Culture', description: 'The hill capital and home of the sacred tooth relic.', activities: ['Temple of the Tooth Relic', 'Traditional Kandyan dance show', 'Royal Botanical Gardens, Peradeniya'] },
      { day: 6, title: 'Nuwara Eliya Tea Country', description: 'Ascend into the cool highlands and visit a working tea estate.', activities: ['Tea factory tour & tasting', 'Gregory Lake walk', 'Colonial-era colonial bungalow stay'] },
      { day: 7, title: 'Ella — Nine Arches & Little Adam\'s Peak', description: 'The jewel of the hill country with iconic bridge views.', activities: ['Nine Arch Bridge walk at sunrise', 'Little Adam\'s Peak hike', 'Ella Rock optional trek'] },
      { day: 8, title: 'Scenic Train to Haputale', description: 'Board one of the world\'s most beautiful railway journeys.', activities: ['Train through tea plantations', 'Lipton\'s Seat viewpoint', 'Dambatenne Tea Factory'] },
      { day: 9, title: 'Minneriya Safari', description: 'Witness the famous elephant gathering at Minneriya National Park.', activities: ['Morning Minneriya jeep safari', 'Wild elephant herds (up to 300)', 'Birdwatching & leopard spotting'] },
      { day: 10, title: 'South Coast Beaches', description: 'Journey south to the golden beaches of Mirissa.', activities: ['Whale watching boat trip', 'Mirissa beach afternoon', 'Fresh seafood dinner'] },
      { day: 11, title: 'Galle Fort & Leisure', description: 'Explore the UNESCO-listed Dutch colonial fort town.', activities: ['Galle Fort walking tour', 'Boutique shopping & cafés', 'Sunset from the ramparts'] },
      { day: 12, title: 'Departure', description: 'Final breakfast and transfer to Colombo Bandaranaike Airport.', activities: ['Last Sri Lankan breakfast', 'Souvenir shopping in Colombo', 'Airport transfer'] },
    ],
    included: ['11 nights boutique hotel accommodation', 'Daily breakfast', 'All ground transfers & domestic train', 'Expert English-speaking guide', 'Sigiriya & national park entrance fees', 'Minneriya jeep safari', 'Tea factory visit', 'Whale watching trip', 'Welcome & farewell dinners'],
    excluded: ['International flights', 'Travel insurance', 'Personal expenses', 'Alcoholic beverages', 'Optional activities'],
    meetingPoint: 'Bandaranaike International Airport, Colombo (CMB) — your guide will meet you at arrivals.',
    featured: true,
    badge: 'Our Home',
  },
  {
    id: '8',
    title: 'Sri Lanka Beach & Wildlife Safari',
    destination: 'Sri Lanka',
    country: 'Sri Lanka',
    duration: '8 Days',
    durationDays: 8,
    price: 1299,
    rating: 4.8,
    reviews: 97,
    image: 'https://images.unsplash.com/photo-1653959699604-1eb000740b57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1653959699604-1eb000740b57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1619183318129-cd95bc882275?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1544015759-237f87d55ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1580794749460-76f97b7180d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    ],
    category: 'Wildlife & Nature',
    difficulty: 'Easy',
    groupSize: '2-14 people',
    highlights: [
      'Whale & dolphin watching off Mirissa coast',
      'Yala National Park — highest leopard density on Earth',
      'Sea turtle nesting at Rekawa beach',
      'Untouched beaches of Tangalle & Weligama',
      'Traditional stilt fishermen of Koggala',
    ],
    description: 'Sri Lanka\'s southern coast is a paradise of golden beaches, gentle whales, prowling leopards and nesting turtles. This tour perfectly balances wildlife adventure with total beach relaxation — mornings spent tracking leopards in Yala, afternoons swimming in warm Indian Ocean waters, evenings watching the sun melt into the horizon from a beach bar.',
    itinerary: [
      { day: 1, title: 'Arrive in Colombo & Head South', description: 'Fly in and drive straight to the south coast.', activities: ['Airport pickup', 'Drive to Mirissa', 'Beach walk & seafood dinner'] },
      { day: 2, title: 'Whale Watching', description: 'Sri Lanka has one of the highest blue whale sighting rates in the world.', activities: ['Early morning whale watching boat', 'Blue whales & spinner dolphins', 'Mirissa beach afternoon'] },
      { day: 3, title: 'Galle Fort', description: 'Morning in the UNESCO Dutch fort town.', activities: ['Galle Fort walking tour', 'Lighthouse & ramparts', 'Stilt fishermen of Koggala'] },
      { day: 4, title: 'Yala National Park Safari', description: 'The world\'s highest density of wild leopards.', activities: ['Full-day Yala jeep safari', 'Leopard, elephant & crocodile spotting', 'Sloth bear spotting'] },
      { day: 5, title: 'Tangalle Beaches', description: 'Some of Sri Lanka\'s most pristine and uncrowded beaches.', activities: ['Tangalle beach morning', 'Rekawa turtle sanctuary visit', 'Night turtle watch (seasonal)'] },
      { day: 6, title: 'Weligama & Surfing', description: 'Perfect beginner surf beach and local village life.', activities: ['Surfing lesson on Weligama beach', 'Local fishing village visit', 'Optional boat trip'] },
      { day: 7, title: 'Leisure & Sunset', description: 'Your final full day — relax or explore at your own pace.', activities: ['Optional cooking class', 'Beach lounging', 'Sunset cocktails'] },
      { day: 8, title: 'Departure', description: 'Transfer back to Colombo airport.', activities: ['Final breakfast', 'Colombo city stop', 'Airport transfer'] },
    ],
    included: ['7 nights beach hotel', 'Daily breakfast', 'Whale watching trip', 'Yala National Park full-day safari', 'All ground transfers', 'Local guide', 'Turtle sanctuary visit'],
    excluded: ['International flights', 'Travel insurance', 'Lunches & dinners', 'Personal expenses'],
    meetingPoint: 'Bandaranaike International Airport, Colombo (CMB) — guide meets at arrivals.',
    badge: 'New',
  },
];

export const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1507237615867-0d4d2ad6b2d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
    rating: 5,
    tour: 'Ultimate Bali Retreat',
    date: 'March 2024',
    text: 'Absolutely life-changing experience! The guide was knowledgeable and passionate, the villa was stunning, and the itinerary was perfectly paced. The sunrise volcano trek was the highlight of my year. Already planning my next trip with WanderQuest!',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
    rating: 5,
    tour: 'Patagonia Trekking Expedition',
    date: 'January 2024',
    text: 'Patagonia exceeded every expectation. The guides were safety-focused and expert mountaineers. Camping under the Milky Way with the Torres peaks above us was surreal. This is the kind of adventure that changes your perspective on the world.',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    location: 'Barcelona, Spain',
    avatar: 'https://images.unsplash.com/photo-1758599668723-8980171e4330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
    rating: 5,
    tour: 'Santorini Island Hopping',
    date: 'May 2024',
    text: 'The catamaran cruise was magical. Watching the Oia sunset with a glass of local wine after a day of swimming in crystal waters — I\'m still dreaming about it. WanderQuest handled every detail flawlessly. Booking my third tour now!',
  },
];

export const stats = [
  { value: '50,000+', label: 'Happy Travelers' },
  { value: '120+', label: 'Destinations' },
  { value: '450+', label: 'Unique Tours' },
  { value: '4.9★', label: 'Average Rating' },
];
