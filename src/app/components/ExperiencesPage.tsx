import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Star, Clock, Users, ArrowRight, ChevronRight, Play, Check, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

const categories = [
  { id: 'all', label: 'All Experiences', emoji: '🌍' },
  { id: 'adventure', label: 'Adventure', emoji: '🏔️' },
  { id: 'cultural', label: 'Cultural', emoji: '🏛️' },
  { id: 'beach', label: 'Beach & Island', emoji: '🌊' },
  { id: 'wildlife', label: 'Wildlife', emoji: '🦁' },
  { id: 'culinary', label: 'Food & Wine', emoji: '🍷' },
  { id: 'wellness', label: 'Wellness', emoji: '🧘' },
  { id: 'luxury', label: 'Luxury', emoji: '✨' },
];

const featuredExperience = {
  title: 'Sunrise Volcano Trek & Balinese Village Immersion',
  subtitle: 'A once-in-a-lifetime 14-hour experience',
  image: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1400',
  duration: '14 Hours',
  groupSize: '2–8 People',
  rating: 5.0,
  reviews: 489,
  price: 189,
  category: 'adventure',
  perks: ['Certified mountain guide', 'Traditional breakfast at summit', 'Village cooking demo', 'Hotel pickup included'],
};

const experiences = [
  {
    id: 1, category: 'adventure', title: 'Himalayan High-Altitude Trek', destination: 'Nepal', duration: '14 Days', price: 2899, rating: 4.9, reviews: 212,
    image: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    badge: 'Bucket List', color: '#0077B6',
    description: 'Trek to Everest Base Camp with expert Sherpa guides. A life-defining journey through the highest mountains on Earth.',
    tags: ['Trekking', 'High Altitude', 'Sherpa Guide'],
  },
  {
    id: 2, category: 'cultural', title: 'Ancient Kyoto Geisha Experience', destination: 'Japan', duration: '5 Days', price: 1899, rating: 4.8, reviews: 167,
    image: 'https://images.unsplash.com/photo-1559933498-c081483cc426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    badge: 'Authentic', color: '#8B5CF6',
    description: 'Dress as a maiko, attend a private tea ceremony, and dine in a centuries-old machiya with a geisha host.',
    tags: ['Geisha Culture', 'Tea Ceremony', 'Traditional Dress'],
  },
  {
    id: 3, category: 'beach', title: 'Private Maldives Seaplane Island Hop', destination: 'Maldives', duration: '7 Days', price: 4299, rating: 5.0, reviews: 143,
    image: 'https://images.unsplash.com/photo-1623784373624-26fb62d3076d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    badge: 'Exclusive', color: '#2D9E6B',
    description: 'Hop between uninhabited Maldivian atolls in a private seaplane, snorkeling with whale sharks and manta rays.',
    tags: ['Seaplane', 'Snorkeling', 'Private Islands'],
  },
  {
    id: 4, category: 'wildlife', title: 'Serengeti Migration Safari', destination: 'Tanzania', duration: '10 Days', price: 5499, rating: 4.9, reviews: 198,
    image: 'https://images.unsplash.com/photo-1623743424601-12be3807f99b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    badge: 'Epic', color: '#F4845F',
    description: "Witness two million wildebeest cross the Mara River during the Great Migration — nature's greatest spectacle.",
    tags: ['Great Migration', 'Big Five', 'Luxury Camp'],
  },
  {
    id: 5, category: 'culinary', title: 'Tuscany Wine Harvest & Cooking Retreat', destination: 'Italy', duration: '6 Days', price: 2199, rating: 4.8, reviews: 234,
    image: 'https://images.unsplash.com/photo-1526786220381-1d21eedf92bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    badge: 'Indulgent', color: '#8B5CF6',
    description: 'Stay in a Chianti vineyard, participate in the grape harvest, and master Italian cooking with a Michelin-starred chef.',
    tags: ['Wine Tasting', 'Cooking Class', 'Vineyard Stay'],
  },
  {
    id: 6, category: 'wellness', title: 'Bali Spirit & Yoga Immersion', destination: 'Bali', duration: '10 Days', price: 1799, rating: 4.7, reviews: 321,
    image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    badge: 'Transform', color: '#2D9E6B',
    description: 'Daily sunrise yoga, Balinese healing rituals, meditation in sacred jungle temples. A true soul reset in paradise.',
    tags: ['Yoga', 'Meditation', 'Healing Rituals'],
  },
  {
    id: 7, category: 'luxury', title: 'Monaco Yacht Week & French Riviera', destination: 'France', duration: '7 Days', price: 8999, rating: 5.0, reviews: 89,
    image: 'https://images.unsplash.com/photo-1594661745200-810105bcf054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    badge: 'Ultra Luxury', color: '#F59E0B',
    description: 'A private 52ft sailing yacht, Michelin dining in Cap d\'Antibes, Monaco Grand Prix enclosure access, and St-Tropez beach clubs.',
    tags: ['Private Yacht', 'Monaco', 'Michelin Dining'],
  },
  {
    id: 8, category: 'adventure', title: 'Patagonia Multi-Sport Expedition', destination: 'Argentina', duration: '12 Days', price: 3699, rating: 4.8, reviews: 156,
    image: 'https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    badge: 'Epic', color: '#0077B6',
    description: 'Ice trekking on Perito Moreno Glacier, kayaking Patagonian fjords, and camping at the foot of the Torres del Paine.',
    tags: ['Ice Trekking', 'Kayaking', 'Camping'],
  },
];

const stats = [
  { value: '450+', label: 'Unique Experiences', icon: Zap },
  { value: '120+', label: 'Destinations', icon: Star },
  { value: '50k+', label: 'Happy Travelers', icon: Users },
  { value: '4.9★', label: 'Avg. Rating', icon: Star },
];

export function ExperiencesPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = activeCategory === 'all' ? experiences : experiences.filter(e => e.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-16">
      {/* ── HERO ─────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-[#1A1A2E]" style={{ minHeight: '520px' }}>
        <img
          src={featuredExperience.image}
          alt="Featured Experience"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.97) 0%, rgba(10,22,40,0.6) 60%, rgba(0,119,182,0.3) 100%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-[#F4845F]/20 border border-[#F4845F]/30 text-[#F4845F] px-3 py-1.5 rounded-full text-sm mb-4">
                <Play className="w-3 h-3 fill-[#F4845F]" /> Featured Experience
              </div>
              <h1 className="text-white mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, lineHeight: 1.15 }}>
                Extraordinary Experiences<br />
                <span className="text-[#F4845F]">That Change You</span>
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-md">
                Go beyond sightseeing. Our curated experiences immerse you in local life, wild nature, and authentic culture.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/tours')}
                  className="bg-[#F4845F] hover:bg-[#e06e48] text-white px-6 py-3.5 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-orange-300/30 inline-flex items-center gap-2"
                  style={{ minHeight: '48px' }}
                >
                  Browse All <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setActiveCategory('adventure'); toast('Showing adventure experiences!'); }}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-xl font-medium transition-all"
                  style={{ minHeight: '48px' }}
                >
                  Adventure Tours
                </button>
              </div>
            </motion.div>

            {/* Featured card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src={featuredExperience.image} alt="" className="w-full h-48 object-cover" />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-[#F4845F] text-white px-2.5 py-1 rounded-full">Adventure</span>
                    <div className="flex items-center gap-1 text-amber-400 text-xs">
                      <Star className="w-3 h-3 fill-current" /> {featuredExperience.rating} ({featuredExperience.reviews} reviews)
                    </div>
                  </div>
                  <h3 className="text-white mb-3" style={{ fontWeight: 600, fontSize: '0.95rem' }}>{featuredExperience.title}</h3>
                  <div className="space-y-1.5 mb-4">
                    {featuredExperience.perks.slice(0, 3).map(p => (
                      <div key={p} className="flex items-center gap-2 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-[#2D9E6B]" /> {p}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-white">
                      from <span className="font-bold text-[#F4845F] text-xl">${featuredExperience.price}</span>
                      <span className="text-gray-400 text-xs">/person</span>
                    </div>
                    <button
                      onClick={() => navigate('/tours')}
                      className="bg-[#F4845F] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#e06e48] transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── STATS ─────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-[#0077B6] mb-0.5">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-hide">
          {categories.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap shrink-0 transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#0077B6] text-white shadow-md shadow-blue-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0077B6] hover:text-[#0077B6]'
              }`}
              style={{ minHeight: '44px' }}
            >
              <span>{cat.emoji}</span> {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[#F4845F] text-sm font-medium uppercase tracking-wider mb-1">
              {categories.find(c => c.id === activeCategory)?.emoji} {categories.find(c => c.id === activeCategory)?.label}
            </div>
            <h2 className="text-gray-900" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700 }}>
              {filtered.length} Experiences Found
            </h2>
          </div>
          <button onClick={() => navigate('/tours')} className="hidden md:flex items-center gap-1 text-[#0077B6] text-sm font-medium hover:underline">
            View all tours <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Experience Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                onHoverStart={() => setHoveredId(exp.id)}
                onHoverEnd={() => setHoveredId(null)}
                onClick={() => navigate('/tours')}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <motion.img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover"
                    animate={{ scale: hoveredId === exp.id ? 1.07 : 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs text-white font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: exp.color }}>
                      {exp.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
                    {exp.tags.map(tag => (
                      <span key={tag} className="text-xs bg-black/40 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                    <Clock className="w-3 h-3" /> {exp.duration}
                    <span className="mx-1">·</span>
                    {exp.destination}
                  </div>
                  <h3 className="text-gray-900 mb-2 line-clamp-2" style={{ fontWeight: 600, fontSize: '0.95rem', lineHeight: 1.4 }}>
                    {exp.title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{exp.description}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <div className="flex items-center gap-1 mb-0.5">
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <Star key={`exp-${exp.id}-star-${j}`} className={`w-3 h-3 ${j < Math.floor(exp.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({exp.reviews})</span>
                      </div>
                      <div>
                        <span className="text-[#0077B6] font-bold">${exp.price.toLocaleString()}</span>
                        <span className="text-gray-400 text-xs">/person</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={e => { e.stopPropagation(); navigate('/tours'); }}
                      className="flex items-center gap-1.5 text-sm font-medium text-white px-4 py-2 rounded-xl transition-colors"
                      style={{ backgroundColor: exp.color, minHeight: '40px' }}
                    >
                      Explore <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Immersive split section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="relative" style={{ minHeight: '380px' }}>
            <img src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#0077B6]/80" />
            <div className="relative z-10 p-10 h-full flex flex-col justify-end">
              <div className="text-blue-200 text-sm mb-2">👥 Group Experiences</div>
              <h3 className="text-white mb-3" style={{ fontSize: '1.6rem', fontWeight: 700 }}>Made for Shared Moments</h3>
              <p className="text-blue-100 text-sm mb-5">Small groups, big connections. Bond with like-minded travelers on experiences designed to create lifelong friendships.</p>
              <button onClick={() => navigate('/tours')} className="self-start bg-white text-[#0077B6] px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-50 transition-colors">
                View Group Tours
              </button>
            </div>
          </div>
          <div className="relative" style={{ minHeight: '380px' }}>
            <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800" alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#1A1A2E]/80" />
            <div className="relative z-10 p-10 h-full flex flex-col justify-end">
              <div className="text-orange-200 text-sm mb-2">💎 Private Experiences</div>
              <h3 className="text-white mb-3" style={{ fontSize: '1.6rem', fontWeight: 700 }}>Exclusively Yours</h3>
              <p className="text-gray-300 text-sm mb-5">Private guides, exclusive access, bespoke itineraries. When only the best will do, we deliver extraordinary.</p>
              <button onClick={() => navigate('/contact')} className="self-start bg-[#F4845F] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#e06e48] transition-colors">
                Request Private Tour
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
