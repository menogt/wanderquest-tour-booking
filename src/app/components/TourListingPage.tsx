import { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Search, SlidersHorizontal, MapPin, Clock, Star, Users, X, Grid2X2, List, Heart, ArrowRight, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { tours } from '../data/tourData';

const categories = ['All', 'Adventure & Trekking', 'Cultural & Heritage', 'Beach & Island', 'Wildlife & Nature'];
const difficulties = ['All', 'Easy', 'Moderate', 'Challenging'];
const durations = ['All', '1-5 Days', '6-9 Days', '10+ Days'];
const priceRanges = ['All', 'Under $1,500', '$1,500 – $3,000', '$3,000+'];

/* ── Skeleton card ──────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="h-52 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-100 rounded w-2/5" />
        <div className="h-4 bg-gray-200 rounded w-4/5" />
        <div className="h-3 bg-gray-100 rounded w-3/5" />
        <div className="flex gap-1 mt-2">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={`sk-star-${i}`} className="w-3 h-3 bg-gray-100 rounded-full" />
          ))}
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="h-5 bg-gray-200 rounded w-24" />
          <div className="h-8 bg-gray-100 rounded-lg w-20" />
        </div>
      </div>
    </div>
  );
}

function SkeletonListCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex animate-pulse">
      <div className="w-72 h-48 bg-gray-200 shrink-0" />
      <div className="p-6 flex-1 space-y-3">
        <div className="h-3 bg-gray-100 rounded w-1/4" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-100 rounded w-full" />
        <div className="h-3 bg-gray-100 rounded w-4/5" />
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
          <div className="h-4 bg-gray-100 rounded w-28" />
          <div className="h-9 bg-gray-100 rounded-xl w-24" />
        </div>
      </div>
    </div>
  );
}

/* ── Empty state ────────────────────────────────────────── */
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <Compass className="w-10 h-10 text-gray-300" />
      </div>
      <h3 className="text-gray-800 mb-2" style={{ fontWeight: 700, fontSize: '1.25rem' }}>
        No tours match your filters
      </h3>
      <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
        We couldn't find any tours matching your current search or filters. Try broadening your search or clearing some filters to discover more adventures.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onClear}
          className="flex items-center gap-2 bg-[#0077B6] hover:bg-[#005f91] active:bg-[#004d7a] text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-md"
        >
          <X className="w-4 h-4" /> Clear All Filters
        </button>
        <button
          onClick={onClear}
          className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium transition-all"
        >
          <ArrowRight className="w-4 h-4" /> Browse All Tours
        </button>
      </div>
      <div className="mt-10 pt-8 border-t border-gray-100 w-full max-w-md">
        <p className="text-xs text-gray-400 mb-3">Popular searches</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['Bali', 'Adventure', 'Beach Escapes', 'Cultural Tours', 'Luxury'].map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function TourListingPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [duration, setDuration] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const filtered = useMemo(() => {
    let result = [...tours];
    if (search) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.destination.toLowerCase().includes(search.toLowerCase()) ||
        t.country.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== 'All') result = result.filter(t => t.category === category);
    if (difficulty !== 'All') result = result.filter(t => t.difficulty === difficulty);
    if (duration !== 'All') {
      result = result.filter(t => {
        if (duration === '1-5 Days') return t.durationDays <= 5;
        if (duration === '6-9 Days') return t.durationDays >= 6 && t.durationDays <= 9;
        if (duration === '10+ Days') return t.durationDays >= 10;
        return true;
      });
    }
    if (priceRange !== 'All') {
      result = result.filter(t => {
        if (priceRange === 'Under $1,500') return t.price < 1500;
        if (priceRange === '$1,500 – $3,000') return t.price >= 1500 && t.price <= 3000;
        if (priceRange === '$3,000+') return t.price > 3000;
        return true;
      });
    }
    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'duration') result.sort((a, b) => a.durationDays - b.durationDays);
    return result;
  }, [search, category, difficulty, duration, priceRange, sortBy]);

  /* Simulate loading on filter change */
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 380);
    return () => clearTimeout(t);
  }, [search, category, difficulty, duration, priceRange, sortBy]);

  const clearAll = useCallback(() => {
    setSearch('');
    setCategory('All');
    setDifficulty('All');
    setDuration('All');
    setPriceRange('All');
  }, []);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const activeFilters = [
    category !== 'All' && category,
    difficulty !== 'All' && difficulty,
    duration !== 'All' && duration,
    priceRange !== 'All' && priceRange,
  ].filter(Boolean) as string[];

  const SKELETON_COUNT = 6;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Page Header */}
      <div className="bg-[#1A1A2E] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 text-[#F4845F] text-sm font-medium mb-2">
              <MapPin className="w-4 h-4" /> 120+ Destinations Worldwide
            </div>
            <h1 className="text-white mb-2" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800 }}>
              Find Your Perfect Tour
            </h1>
            <p className="text-gray-400 text-sm max-w-xl">
              Browse 450+ expertly curated tours across 120 destinations. Every trip is crafted by local experts who know these places like home.
            </p>
          </motion.div>
        </div>
      </div>

      {/* AI Planner planning card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-[#0a1628] to-[#0d2040] rounded-2xl px-6 py-5 border border-white/10"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#F4845F]/20 flex items-center justify-center shrink-0">
              <span className="text-lg">🗺️</span>
            </div>
            <div>
              <div className="text-white font-semibold text-sm mb-0.5">Still building your route?</div>
              <p className="text-white/50 text-xs leading-relaxed max-w-md">
                Use the AI Trip Planner to create your Sri Lanka travel route, then return to WanderQuest to book the best matching tours.
              </p>
            </div>
          </div>
          <a
            href="https://wanderroute.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 bg-[#F4845F] hover:bg-[#e06e48] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-900/30 whitespace-nowrap"
          >
            Plan My Route
          </a>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Controls bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations, tour names, or countries..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-[#0077B6] focus:ring-2 focus:ring-[#0077B6]/10 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 border rounded-xl px-4 py-3 text-sm font-medium transition-all ${
              showFilters || activeFilters.length > 0
                ? 'bg-[#0077B6] border-[#0077B6] text-white'
                : 'bg-white border-gray-200 text-gray-700 hover:border-[#0077B6] hover:text-[#0077B6]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilters.length > 0 && (
              <span className="bg-white text-[#0077B6] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {activeFilters.length}
              </span>
            )}
          </button>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#0077B6] transition-colors cursor-pointer"
          >
            <option value="featured">Sort: Featured</option>
            <option value="rating">Sort: Top Rated</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="duration">Sort: Shortest First</option>
          </select>
          <div className="flex gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl border transition-all ${viewMode === 'grid' ? 'bg-[#0077B6] border-[#0077B6] text-white shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
              aria-label="Grid view"
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl border transition-all ${viewMode === 'list' ? 'bg-[#0077B6] border-[#0077B6] text-white shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'}`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-sm font-semibold text-gray-800">Filter Tours</h3>
                  {activeFilters.length > 0 && (
                    <button onClick={clearAll} className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors flex items-center gap-1">
                      <X className="w-3 h-3" /> Clear all
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Category', options: categories, value: category, setter: setCategory },
                    { label: 'Difficulty', options: difficulties, value: difficulty, setter: setDifficulty },
                    { label: 'Duration', options: durations, value: duration, setter: setDuration },
                    { label: 'Price Range', options: priceRanges, value: priceRange, setter: setPriceRange },
                  ].map(({ label, options, value, setter }) => (
                    <div key={label}>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">{label}</label>
                      <div className="space-y-1.5">
                        {options.map(opt => (
                          <button
                            key={opt}
                            onClick={() => setter(opt)}
                            className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${
                              value === opt
                                ? 'bg-[#0077B6] text-white font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {activeFilters.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-gray-400 font-medium">Active filters:</span>
                    {activeFilters.map(f => (
                      <span key={f} className="flex items-center gap-1.5 bg-[#0077B6]/10 text-[#0077B6] text-xs px-3 py-1 rounded-full font-medium">
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category quick pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all shrink-0 ${
                category === cat
                  ? 'bg-[#0077B6] text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0077B6] hover:text-[#0077B6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-gray-500">
            {isLoading ? (
              <span className="inline-block w-32 h-4 bg-gray-200 rounded animate-pulse" />
            ) : (
              <>
                <span className="font-semibold text-gray-800">{filtered.length}</span>
                {' '}tour{filtered.length !== 1 ? 's' : ''} found
                {activeFilters.length > 0 && (
                  <button onClick={clearAll} className="ml-3 text-[#0077B6] hover:underline text-xs">
                    Clear filters
                  </button>
                )}
              </>
            )}
          </p>
          {wishlist.length > 0 && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Heart className="w-3 h-3 fill-red-400 text-red-400" /> {wishlist.length} saved
            </span>
          )}
        </div>

        {/* Tour Cards */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
              }
            >
              {Array.from({ length: SKELETON_COUNT }, (_, i) =>
                viewMode === 'grid'
                  ? <SkeletonCard key={`sk-${i}`} />
                  : <SkeletonListCard key={`sk-${i}`} />
              )}
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <EmptyState onClear={clearAll} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
              }
            >
              {filtered.map((tour, i) =>
                viewMode === 'grid' ? (
                  <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 cursor-pointer group"
                    onClick={() => navigate(`/tours/${tour.id}`)}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      {tour.badge && (
                        <span className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-semibold ${
                          tour.badge === 'Best Seller' ? 'bg-[#F4845F] text-white' :
                          tour.badge === 'Top Rated' ? 'bg-[#2D9E6B] text-white' :
                          tour.badge === 'Luxury' ? 'bg-[#1A1A2E] text-white' :
                          'bg-[#0077B6] text-white'
                        }`}>{tour.badge}</span>
                      )}
                      <button
                        onClick={e => toggleWishlist(tour.id, e)}
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-95 ${
                          wishlist.includes(tour.id) ? 'bg-red-50' : 'bg-white/90 hover:bg-white'
                        }`}
                        aria-label={wishlist.includes(tour.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart className={`w-4 h-4 transition-colors ${wishlist.includes(tour.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                      </button>
                      <div className="absolute bottom-3 left-3 flex gap-2">
                        <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {tour.duration}
                        </span>
                        <span className={`text-xs px-2.5 py-1 rounded-full text-white backdrop-blur-sm ${
                          tour.difficulty === 'Easy' ? 'bg-[#2D9E6B]/80' :
                          tour.difficulty === 'Moderate' ? 'bg-amber-500/80' :
                          'bg-red-500/80'
                        }`}>{tour.difficulty}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                        <MapPin className="w-3 h-3 shrink-0" /> {tour.destination}, {tour.country}
                      </div>
                      <h3 className="text-gray-900 mb-3 line-clamp-2" style={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.4 }}>
                        {tour.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, j) => (
                            <Star key={`${tour.id}-star-${j}`} className={`w-3 h-3 ${j < Math.floor(tour.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{tour.rating} <span className="text-gray-300">({tour.reviews.toLocaleString()})</span></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-4">
                        <Users className="w-3 h-3" /> {tour.groupSize}
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          {tour.originalPrice && (
                            <span className="text-xs text-gray-400 line-through mr-1">${tour.originalPrice.toLocaleString()}</span>
                          )}
                          <div>
                            <span className="text-[#0077B6] font-bold text-base">${tour.price.toLocaleString()}</span>
                            <span className="text-gray-400 text-xs"> /person</span>
                          </div>
                        </div>
                        <button
                          onClick={e => { e.stopPropagation(); navigate(`/tours/${tour.id}`); }}
                          className="bg-[#F4845F] hover:bg-[#e06e48] active:bg-[#c85a38] text-white text-xs px-4 py-2.5 rounded-xl font-semibold transition-all hover:shadow-md"
                        >
                          View Tour
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* List View */
                  <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 cursor-pointer flex flex-col sm:flex-row group"
                    onClick={() => navigate(`/tours/${tour.id}`)}
                  >
                    <div className="relative sm:w-64 md:w-72 h-48 sm:h-auto shrink-0 overflow-hidden">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {tour.badge && (
                        <span className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-semibold ${
                          tour.badge === 'Best Seller' ? 'bg-[#F4845F] text-white' :
                          tour.badge === 'Top Rated' ? 'bg-[#2D9E6B] text-white' :
                          'bg-[#0077B6] text-white'
                        }`}>{tour.badge}</span>
                      )}
                      <button
                        onClick={e => toggleWishlist(tour.id, e)}
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 ${
                          wishlist.includes(tour.id) ? 'bg-red-50' : 'bg-white/90'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(tour.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    <div className="p-5 md:p-6 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                          <MapPin className="w-3 h-3" /> {tour.destination}, {tour.country}
                        </div>
                        <h3 className="text-gray-900 mb-2" style={{ fontSize: '1rem', fontWeight: 700 }}>{tour.title}</h3>
                        <p className="text-gray-500 text-sm line-clamp-2 mb-3 leading-relaxed">{tour.description}</p>
                        <div className="flex flex-wrap gap-2.5 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{tour.duration}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{tour.groupSize}</span>
                          <span className={`px-2 py-0.5 rounded-full font-medium ${
                            tour.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                            tour.difficulty === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>{tour.difficulty}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, j) => (
                              <Star key={`${tour.id}-ls-${j}`} className={`w-3 h-3 ${j < Math.floor(tour.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{tour.rating} ({tour.reviews.toLocaleString()})</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            {tour.originalPrice && (
                              <div className="text-xs text-gray-400 line-through">${tour.originalPrice.toLocaleString()}</div>
                            )}
                            <div>
                              <span className="text-[#0077B6] font-bold text-lg">${tour.price.toLocaleString()}</span>
                              <span className="text-gray-400 text-xs"> /person</span>
                            </div>
                          </div>
                          <button
                            onClick={e => { e.stopPropagation(); navigate(`/tours/${tour.id}`); }}
                            className="bg-[#F4845F] hover:bg-[#e06e48] active:bg-[#c85a38] text-white text-sm px-5 py-2.5 rounded-xl font-semibold transition-all hover:shadow-md"
                          >
                            View Tour
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load more CTA */}
        {!isLoading && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-12 py-8 border-t border-gray-200"
          >
            <p className="text-gray-400 text-sm mb-4">
              Showing {filtered.length} of 450+ tours. Can't find what you're looking for?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-[#0077B6] hover:text-[#005f91] font-semibold text-sm transition-colors"
            >
              Talk to a travel expert <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}
