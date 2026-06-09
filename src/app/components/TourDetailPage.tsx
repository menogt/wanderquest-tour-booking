import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import {
  MapPin, Clock, Users, Star, ChevronLeft, ChevronRight, Check, X,
  Calendar, Minus, Plus, Share2, Heart, ChevronDown, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { tours } from '../data/tourData';

export function TourDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tour = tours.find(t => t.id === id) ?? tours[0];

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'inclusions' | 'reviews'>('overview');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [wishlisted, setWishlisted] = useState(false);

  const totalTravelers = adults + children;
  const totalPrice = tour.price * adults + (tour.price * 0.7) * children;
  const taxes = totalPrice * 0.08;
  const grandTotal = totalPrice + taxes;

  const faqs = [
    { q: 'What is the cancellation policy?', a: 'Full refund for cancellations 48+ hours before departure. 50% refund within 24–48 hours. No refund within 24 hours.' },
    { q: 'Is travel insurance included?', a: 'Travel insurance is not included but strongly recommended. We partner with SafeTravel Pro — ask your guide for a discounted group rate.' },
    { q: 'What fitness level is required?', a: `This tour is rated ${tour.difficulty}. ${tour.difficulty === 'Easy' ? 'Suitable for all fitness levels with minimal physical demands.' : tour.difficulty === 'Moderate' ? 'Requires reasonable fitness. Expect 3–5 hours of walking per day.' : 'Requires good fitness. Involves long trekking days and altitude gain.'}` },
    { q: 'Are meals included?', a: 'Daily breakfast is included. Select tours include additional meals as specified in the inclusions list. Your guide can recommend great local restaurants for other meals.' },
    { q: 'How big are the tour groups?', a: `Our groups are capped at ${tour.groupSize} to ensure a quality experience. Private tours are also available on request.` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#0077B6] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/tours" className="hover:text-[#0077B6] transition-colors">Tours</Link>
          <span>/</span>
          <span className="text-gray-800 truncate max-w-xs">{tour.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT CONTENT ─────────────────────────────── */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="relative rounded-2xl overflow-hidden mb-6" style={{ height: '460px' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={galleryIndex}
                  src={tour.images[galleryIndex]}
                  alt={tour.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

              {/* Gallery nav */}
              <button
                onClick={() => setGalleryIndex((galleryIndex - 1 + tour.images.length) % tour.images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={() => setGalleryIndex((galleryIndex + 1) % tour.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>

              {/* Badges */}
              {tour.badge && (
                <span className="absolute top-4 left-4 bg-[#F4845F] text-white text-sm px-4 py-1.5 rounded-full font-medium">
                  {tour.badge}
                </span>
              )}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                {galleryIndex + 1} / {tour.images.length}
              </div>

              {/* Thumbnails */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {tour.images.map((img, i) => (
                  <button
                    key={`thumb-${i}`}
                    onClick={() => setGalleryIndex(i)}
                    className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === galleryIndex ? 'border-white' : 'border-white/40 opacity-70'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tour Header */}
            <div className="bg-white rounded-2xl p-6 mb-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 text-[#F4845F]" />
                    {tour.destination}, {tour.country}
                    <span className="text-gray-300 mx-1">·</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{tour.category}</span>
                  </div>
                  <h1 className="text-gray-900 mb-3" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 700, lineHeight: 1.3 }}>
                    {tour.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={`header-star-${i}`} className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                        ))}
                      </div>
                      <span className="font-medium text-gray-800">{tour.rating}</span>
                      <span className="text-gray-400">({tour.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-[#0077B6]" />{tour.duration}</div>
                    <div className="flex items-center gap-1"><Users className="w-4 h-4 text-[#0077B6]" />{tour.groupSize}</div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      tour.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      tour.difficulty === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>{tour.difficulty}</span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                </div>
              </div>

              {/* Highlights */}
              <div className="border-t border-gray-100 pt-4">
                <div className="text-sm font-medium text-gray-700 mb-3">Tour Highlights</div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tour.highlights.map((h, i) => (
                    <li key={`highlight-${i}`} className="flex items-start gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-[#2D9E6B] mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl overflow-hidden mb-6">
              <div className="flex border-b border-gray-100 overflow-x-auto">
                {(['overview', 'itinerary', 'inclusions', 'reviews'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 text-sm font-medium whitespace-nowrap capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-[#0077B6] border-b-2 border-[#0077B6]'
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {/* Overview */}
                {activeTab === 'overview' && (
                  <div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{tour.description}</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: 'Duration', value: tour.duration, icon: Clock },
                        { label: 'Group Size', value: tour.groupSize, icon: Users },
                        { label: 'Difficulty', value: tour.difficulty, icon: Star },
                        { label: 'Category', value: tour.category.split(' ')[0], icon: MapPin },
                      ].map(({ label, value, icon: Icon }) => (
                        <div key={label} className="bg-gray-50 rounded-xl p-4 text-center">
                          <Icon className="w-5 h-5 text-[#0077B6] mx-auto mb-2" />
                          <div className="text-xs text-gray-500 mb-1">{label}</div>
                          <div className="text-sm font-medium text-gray-800">{value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-[#0077B6]/5 rounded-xl border border-[#0077B6]/10">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-[#0077B6] mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-gray-800 mb-1">Meeting Point</div>
                          <p className="text-sm text-gray-600">{tour.meetingPoint}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Itinerary */}
                {activeTab === 'itinerary' && (
                  <div className="space-y-4">
                    {tour.itinerary.map((item, i) => (
                      <div key={`day-${item.day}`} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-[#0077B6] text-white text-xs flex items-center justify-center font-bold shrink-0">
                            {item.day}
                          </div>
                          {i < tour.itinerary.length - 1 && <div className="w-0.5 bg-gray-200 flex-1 mt-1" />}
                        </div>
                        <div className={`pb-4 flex-1 ${i < tour.itinerary.length - 1 ? 'border-b border-gray-100' : ''}`}>
                          <div className="text-xs text-[#F4845F] font-medium mb-1">Day {item.day}</div>
                          <h4 className="text-gray-900 mb-1.5" style={{ fontWeight: 600 }}>{item.title}</h4>
                          <p className="text-gray-500 text-sm mb-3">{item.description}</p>
                          <ul className="space-y-1">
                            {item.activities.map((act, j) => (
                              <li key={`day-${item.day}-act-${j}`} className="flex items-center gap-2 text-xs text-gray-500">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#0077B6]" />
                                {act}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inclusions */}
                {activeTab === 'inclusions' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="flex items-center gap-2 text-gray-800 mb-4" style={{ fontWeight: 600 }}>
                        <Check className="w-5 h-5 text-[#2D9E6B]" /> What's Included
                      </h4>
                      <ul className="space-y-2">
                        {tour.included.map((item, i) => (
                          <li key={`inc-${i}`} className="flex items-start gap-2 text-sm text-gray-600">
                            <Check className="w-4 h-4 text-[#2D9E6B] mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 text-gray-800 mb-4" style={{ fontWeight: 600 }}>
                        <X className="w-5 h-5 text-red-400" /> Not Included
                      </h4>
                      <ul className="space-y-2">
                        {tour.excluded.map((item, i) => (
                          <li key={`exc-${i}`} className="flex items-start gap-2 text-sm text-gray-500">
                            <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Reviews tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl mb-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-[#0077B6]">{tour.rating}</div>
                        <div className="flex justify-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={`rating-sum-star-${i}`} className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                          ))}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{tour.reviews} reviews</div>
                      </div>
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map(star => (
                          <div key={star} className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 w-2">{star}</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="h-full bg-amber-400 rounded-full"
                                style={{ width: `${star === 5 ? 75 : star === 4 ? 18 : star === 3 ? 5 : 2}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[
                        { name: 'James T.', location: 'Sydney, AU', text: 'Absolutely incredible tour. Every detail was perfectly organized.', date: '2 weeks ago' },
                        { name: 'Priya M.', location: 'Mumbai, IN', text: 'Our guide was exceptional — so knowledgeable and friendly. Will definitely book again!', date: '1 month ago' },
                        { name: 'Lars K.', location: 'Stockholm, SE', text: 'Best travel experience of my life. The itinerary was perfectly paced.', date: '6 weeks ago' },
                      ].map((r, i) => (
                        <div key={r.name} className="border-b border-gray-100 pb-4 last:border-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-[#0077B6] text-white text-xs flex items-center justify-center font-bold">
                                {r.name[0]}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-800">{r.name}</div>
                                <div className="text-xs text-gray-400">{r.location}</div>
                              </div>
                            </div>
                            <span className="text-xs text-gray-400">{r.date}</span>
                          </div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, j) => <Star key={`review-${r.name}-star-${j}`} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                          </div>
                          <p className="text-sm text-gray-600">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Fit this tour into your journey */}
            <div className="rounded-2xl overflow-hidden relative"
              style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 100%)' }}
            >
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }}
              />
              <div className="relative z-10 p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-[#F4845F]/20 flex items-center justify-center shrink-0">
                    <span className="text-base">🗺️</span>
                  </div>
                  <div>
                    <h4 className="text-white mb-1" style={{ fontWeight: 700 }}>Fit this tour into your full journey</h4>
                    <p className="text-white/55 text-sm leading-relaxed">
                      Not sure how this experience fits into your Sri Lanka trip? Open the AI Trip Planner and build a complete route around your travel goals.
                    </p>
                  </div>
                </div>
                <a
                  href="https://wanderroute.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#F4845F] hover:bg-[#e06e48] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-900/30"
                >
                  Plan Around This Tour
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-gray-900 mb-4" style={{ fontWeight: 600 }}>Frequently Asked Questions</h3>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={faq.q} className="border border-gray-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                    >
                      <span className="text-sm font-medium text-gray-800">{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${openFaqIndex === i ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaqIndex === i && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── STICKY BOOKING SIDEBAR ─────────────────────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                {/* Price header */}
                <div className="bg-gradient-to-br from-[#0077B6] to-[#005f91] p-6 text-white">
                  <div className="flex items-end gap-2 mb-1">
                    {tour.originalPrice && (
                      <span className="text-blue-200 line-through text-sm">${tour.originalPrice.toLocaleString()}</span>
                    )}
                    <span className="text-3xl font-bold">${tour.price.toLocaleString()}</span>
                    <span className="text-blue-200 text-sm pb-0.5">/ person</span>
                  </div>
                  {tour.originalPrice && (
                    <div className="text-sm text-[#F4845F] font-medium">
                      Save ${(tour.originalPrice - tour.price).toLocaleString()} — Limited offer!
                    </div>
                  )}
                  <div className="flex items-center gap-1 mt-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={`sidebar-star-${i}`} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                    </div>
                    <span className="text-blue-100 text-sm">{tour.rating} ({tour.reviews} reviews)</span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Date picker */}
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">Departure Date</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#0077B6] transition-colors">
                      <Calendar className="w-4 h-4 text-[#0077B6]" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="flex-1 text-sm text-gray-800 outline-none bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Travelers */}
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5 block">Travelers</label>
                    <div className="space-y-2">
                      {[
                        { label: 'Adults', value: adults, set: setAdults, min: 1, price: tour.price },
                        { label: 'Children (under 12)', value: children, set: setChildren, min: 0, price: tour.price * 0.7 },
                      ].map(({ label, value, set, min, price }) => (
                        <div key={label} className="flex items-center justify-between border border-gray-100 rounded-xl px-3 py-2">
                          <div>
                            <div className="text-sm text-gray-700">{label}</div>
                            <div className="text-xs text-gray-400">${price.toFixed(0)}/person</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => set(Math.max(min, value - 1))}
                              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{value}</span>
                            <button
                              onClick={() => set(value + 1)}
                              className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>{adults} Adult{adults > 1 ? 's' : ''} × ${tour.price.toLocaleString()}</span>
                      <span>${(tour.price * adults).toLocaleString()}</span>
                    </div>
                    {children > 0 && (
                      <div className="flex justify-between text-gray-600">
                        <span>{children} Child × ${(tour.price * 0.7).toFixed(0)}</span>
                        <span>${(tour.price * 0.7 * children).toFixed(0)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-500 text-xs">
                      <span>Taxes & fees (8%)</span>
                      <span>${taxes.toFixed(0)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-[#0077B6]">${grandTotal.toFixed(0)}</span>
                    </div>
                  </div>

                  {/* Book button */}
                  <button
                    onClick={() => navigate('/booking', { state: { tourId: tour.id, adults, children, date: selectedDate } })}
                    className="w-full bg-[#F4845F] hover:bg-[#e06e48] text-white py-4 rounded-xl font-medium transition-colors"
                  >
                    Book Now — ${grandTotal.toFixed(0)}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                    <Shield className="w-3.5 h-3.5 text-[#2D9E6B]" />
                    Free cancellation · Secure payment
                  </div>

                  {/* Availability nudge */}
                  <div className="text-center text-xs text-amber-600 bg-amber-50 rounded-lg py-2">
                    🔥 Only 4 spots remaining for top dates!
                  </div>
                </div>
              </div>

              {/* Contact card */}
              <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-4 text-center">
                <p className="text-xs text-gray-500 mb-2">Have questions? Chat with an expert</p>
                <a href="tel:+94773268999" className="text-[#0077B6] text-sm font-medium hover:underline">
                  +94 77 326 8999
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
