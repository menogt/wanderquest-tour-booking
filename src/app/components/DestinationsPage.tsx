import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { Search, MapPin, Globe, ChevronRight, TrendingUp, Star, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

const regions = ['All Regions', 'Asia Pacific', 'Europe', 'Americas', 'Africa', 'Middle East & Indian Ocean'];

const allDestinations = [
  // Asia Pacific
  { id: 'bali', name: 'Bali', country: 'Indonesia', region: 'Asia Pacific', image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', toursCount: 48, rating: 4.9, tagline: 'Island of the Gods', trending: true, priceFrom: 1299, highlights: ['Temples', 'Beaches', 'Rice Terraces', 'Volcano Trekking'] },
  { id: 'angkor', name: 'Angkor Wat', country: 'Cambodia', region: 'Asia Pacific', image: 'https://images.unsplash.com/photo-1444194563460-454833ba6005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', toursCount: 19, rating: 4.7, tagline: 'Ancient Wonder of the World', trending: false, priceFrom: 899, highlights: ['Ancient Ruins', 'Khmer Culture', 'Jungle Temples'] },
  { id: 'thailand', name: 'Phuket', country: 'Thailand', region: 'Asia Pacific', image: 'https://images.unsplash.com/photo-1536146180203-c3b97ff07a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', toursCount: 37, rating: 4.6, tagline: 'Pearl of the Andaman Sea', trending: true, priceFrom: 799, highlights: ['Beaches', 'Snorkeling', 'Nightlife', 'Islands'] },
  { id: 'japan', name: 'Kyoto', country: 'Japan', region: 'Asia Pacific', image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', toursCount: 29, rating: 4.9, tagline: 'Ancient Capital of Tradition', trending: true, priceFrom: 1899, highlights: ['Temples', 'Cherry Blossoms', 'Geisha Culture', 'Zen Gardens'] },
  { id: 'sri-lanka', name: 'Sri Lanka', country: 'Sri Lanka', region: 'Asia Pacific', image: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', toursCount: 31, rating: 4.9, tagline: 'Pearl of the Indian Ocean', trending: true, priceFrom: 1299, highlights: ['Sigiriya Rock', 'Tea Country', 'Leopard Safaris', 'Whale Watching'] },
  // Europe
  { id: 'santorini', name: 'Santorini', country: 'Greece', region: 'Europe', image: 'https://images.unsplash.com/photo-1732808460864-b8e5eb489a52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', toursCount: 27, rating: 4.9, tagline: 'Aegean Dream', trending: true, priceFrom: 1599, highlights: ['Sunsets', 'Caldera Views', 'Wine Tasting', 'Sailing'] },
  { id: 'venice', name: 'Venice', country: 'Italy', region: 'Europe', image: 'https://images.unsplash.com/photo-1515784638688-3f7e90ebb446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', toursCount: 33, rating: 4.8, tagline: 'City of Canals', trending: false, priceFrom: 1299, highlights: ['Gondola Rides', 'Art & Museums', 'Architecture', 'Cuisine'] },
  { id: 'prague', name: 'Prague', country: 'Czech Republic', region: 'Europe', image: 'https://images.unsplash.com/photo-1461838239441-4475121c0b7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', toursCount: 21, rating: 4.7, tagline: 'City of a Hundred Spires', trending: false, priceFrom: 999, highlights: ['Medieval Architecture', 'Craft Beer', 'Castle', 'Bohemian Culture'] },
  { id: 'swiss-alps', name: 'Swiss Alps', country: 'Switzerland', region: 'Europe', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', toursCount: 41, rating: 4.8, tagline: 'Peak Perfection', trending: true, priceFrom: 2499, highlights: ['Skiing', 'Hiking', 'Glacier Views', 'Mountain Huts'] },
  // Americas
  { id: 'patagonia', name: 'Patagonia', country: 'Argentina', region: 'Americas', image: 'https://images.unsplash.com/photo-1636311838630-f38d42915aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', toursCount: 23, rating: 4.8, tagline: 'End of the Earth', trending: false, priceFrom: 2299, highlights: ['Trekking', 'Glaciers', 'Wildlife', 'Camping'] },
  { id: 'machu-picchu', name: 'Machu Picchu', country: 'Peru', region: 'Americas', image: 'https://images.unsplash.com/photo-1529733772151-bab41484710a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', toursCount: 18, rating: 4.9, tagline: 'Lost City of the Incas', trending: true, priceFrom: 1699, highlights: ['Inca Trail', 'Ancient Ruins', 'Mountain Views', 'History'] },
  // Africa
  { id: 'serengeti', name: 'Serengeti', country: 'Tanzania', region: 'Africa', image: 'https://images.unsplash.com/photo-1623951578056-5082d34a9859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', toursCount: 14, rating: 4.9, tagline: 'Greatest Wildlife Show on Earth', trending: true, priceFrom: 3299, highlights: ['Safari', 'Big Five', 'Migration', 'Masai Culture'] },
  { id: 'morocco', name: 'Marrakech', country: 'Morocco', region: 'Africa', image: 'https://images.unsplash.com/photo-1568592391689-0e3d1a1b52b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', toursCount: 22, rating: 4.6, tagline: 'Gateway to the Sahara', trending: false, priceFrom: 899, highlights: ['Medina', 'Sahara Desert', 'Souks', 'Riads'] },
  // Middle East & Indian Ocean
  { id: 'maldives', name: 'Maldives', country: 'Indian Ocean', region: 'Middle East & Indian Ocean', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', toursCount: 34, rating: 5.0, tagline: 'Paradise on Earth', trending: true, priceFrom: 3499, highlights: ['Overwater Villas', 'Coral Reefs', 'Marine Life', 'Luxury'] },
  { id: 'dubai', name: 'Dubai', country: 'UAE', region: 'Middle East & Indian Ocean', image: 'https://images.unsplash.com/photo-1608788524926-41b5181b89a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800', toursCount: 26, rating: 4.7, tagline: 'City of the Future', trending: false, priceFrom: 1299, highlights: ['Burj Khalifa', 'Desert Safari', 'Shopping', 'Luxury'] },
];

const regionColors: Record<string, string> = {
  'Asia Pacific': '#0077B6',
  'Europe': '#8B5CF6',
  'Americas': '#2D9E6B',
  'Africa': '#F4845F',
  'Middle East & Indian Ocean': '#F59E0B',
};

export function DestinationsPage() {
  const navigate = useNavigate();
  const [activeRegion, setActiveRegion] = useState('All Regions');
  const [search, setSearch] = useState('');
  const [showOnlyTrending, setShowOnlyTrending] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...allDestinations];
    if (activeRegion !== 'All Regions') list = list.filter(d => d.region === activeRegion);
    if (search) list = list.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase()));
    if (showOnlyTrending) list = list.filter(d => d.trending);
    return list;
  }, [activeRegion, search, showOnlyTrending]);

  const regionCounts = useMemo(() =>
    Object.fromEntries(regions.slice(1).map(r => [r, allDestinations.filter(d => d.region === r).length])),
    []
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-16">
      {/* ── HERO ─────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0077B6 50%, #005f91 100%)' }}>
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #F4845F 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #2D9E6B 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 text-blue-300 text-sm mb-3">
              <Globe className="w-4 h-4" /> <span>120+ Destinations Worldwide</span>
            </div>
            <h1 className="text-white mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1 }}>
              Explore the World's{' '}
              <span className="text-[#F4845F]">Most Beautiful</span> Destinations
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-xl">
              Every corner of our planet holds a story. Find yours among 14 curated regions, 120+ handpicked destinations.
            </p>

            {/* Search */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destination or country..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 text-sm outline-none shadow-lg"
                  style={{ minHeight: '52px' }}
                />
              </div>
              <button
                onClick={() => setShowOnlyTrending(!showOnlyTrending)}
                className={`flex items-center gap-2 px-5 py-4 rounded-2xl text-sm font-medium transition-all ${showOnlyTrending ? 'bg-[#F4845F] text-white' : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'}`}
                style={{ minHeight: '52px' }}
              >
                <TrendingUp className="w-4 h-4" />
                Trending Now
              </button>
            </div>
          </motion.div>
        </div>

        {/* Region stats bar */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 overflow-x-auto">
            <div className="flex gap-6 min-w-max">
              {regions.slice(1).map((region, i) => (
                <motion.button
                  key={region}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setActiveRegion(region === activeRegion ? 'All Regions' : region)}
                  className={`flex items-center gap-2 text-sm transition-all px-3 py-1.5 rounded-lg ${activeRegion === region ? 'bg-white/20 text-white' : 'text-blue-200 hover:text-white'}`}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: regionColors[region] }} />
                  {region}
                  <span className="text-xs opacity-60">({regionCounts[region]})</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Region pills — mobile-friendly */}
        <div className="flex flex-wrap gap-2 mb-8">
          {regions.map(r => (
            <button
              key={r}
              onClick={() => setActiveRegion(r)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeRegion === r ? 'bg-[#0077B6] text-white shadow-md shadow-blue-200' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0077B6] hover:text-[#0077B6]'}`}
              style={{ minHeight: '40px' }}
            >
              {r}
              {r !== 'All Regions' && (
                <span className={`ml-1.5 text-xs ${activeRegion === r ? 'text-blue-200' : 'text-gray-400'}`}>
                  ({regionCounts[r] ?? 0})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-800">{filtered.length}</span> destinations
            {showOnlyTrending && <span className="ml-2 text-[#F4845F] font-medium">· Trending Only</span>}
          </div>
          {(search || showOnlyTrending || activeRegion !== 'All Regions') && (
            <button
              onClick={() => { setSearch(''); setShowOnlyTrending(false); setActiveRegion('All Regions'); }}
              className="text-sm text-gray-400 hover:text-gray-700 transition-colors underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Destinations Grid */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-gray-700 mb-2">No destinations found</h3>
              <p className="text-gray-400 text-sm">Try a different region or search term.</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeRegion + search + showOnlyTrending}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.06, 0.4), duration: 0.4 }}
                  onHoverStart={() => setHoveredId(dest.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  onClick={() => navigate('/tours')}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300"
                  style={{ height: '340px' }}
                >
                  {/* Image */}
                  <motion.img
                    src={dest.image}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{ scale: hoveredId === dest.id ? 1.08 : 1 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Gradient overlay — intensifies on hover */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ background: hoveredId === dest.id ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)' : 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Top badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium text-white" style={{ backgroundColor: regionColors[dest.region] + 'cc', backdropFilter: 'blur(8px)' }}>
                      {dest.region}
                    </span>
                    {dest.trending && (
                      <span className="flex items-center gap-1 text-xs bg-[#F4845F]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-full font-medium">
                        <TrendingUp className="w-3 h-3" /> Hot
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-1 text-white/70 text-xs mb-1.5">
                      <MapPin className="w-3 h-3" /> {dest.country}
                    </div>
                    <h3 className="text-white mb-0.5" style={{ fontSize: '1.25rem', fontWeight: 700 }}>{dest.name}</h3>
                    <p className="text-white/70 text-xs mb-3">{dest.tagline}</p>

                    {/* Highlights — appear on hover */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: hoveredId === dest.id ? 1 : 0, height: hoveredId === dest.id ? 'auto' : 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {dest.highlights.map(h => (
                          <span key={h} className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">{h}</span>
                        ))}
                      </div>
                    </motion.div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1 text-xs text-white/70 mb-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{dest.rating}</span>
                          <span className="mx-1">·</span>
                          <span>{dest.toursCount} tours</span>
                        </div>
                        <div className="text-white text-sm">
                          from <span className="font-bold text-[#F4845F]">${dest.priceFrom.toLocaleString()}</span>
                        </div>
                      </div>
                      <motion.button
                        onClick={e => { e.stopPropagation(); navigate('/tours'); }}
                        className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#0077B6] hover:bg-[#F4845F] hover:text-white transition-colors"
                        animate={{ scale: hoveredId === dest.id ? 1 : 0.85, opacity: hoveredId === dest.id ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ minWidth: '36px', minHeight: '36px' }}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #0077B6 0%, #005f91 100%)' }}
        >
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #F4845F, transparent 70%)', transform: 'translate(20%, -40%)' }} />
          <div className="relative z-10 p-10 text-center">
            <h2 className="text-white mb-3" style={{ fontSize: '1.8rem', fontWeight: 700 }}>
              Can't Find Your Dream Destination?
            </h2>
            <p className="text-blue-100 mb-6 max-w-md mx-auto text-sm">
              Our expert travel consultants can build a bespoke itinerary to anywhere in the world — even off-the-beaten-path gems we keep for special clients.
            </p>
            <button
              onClick={() => { navigate('/contact'); toast.success('Redirecting to contact page!'); }}
              className="bg-[#F4845F] hover:bg-[#e06e48] text-white px-8 py-4 rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-orange-200/50 inline-flex items-center gap-2"
            >
              Talk to a Travel Expert <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
