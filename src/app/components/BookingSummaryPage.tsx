import { useLocation, useNavigate, Link } from 'react-router';
import { MapPin, Clock, Users, Star, Calendar, Shield, Trash2, ChevronRight, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { tours } from '../data/tourData';

export function BookingSummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { tourId?: string; adults?: number; children?: number; date?: string } | null;

  const tourId = state?.tourId ?? '1';
  const adults = state?.adults ?? 2;
  const children = state?.children ?? 0;
  const date = state?.date ?? '';

  const tour = tours.find(t => t.id === tourId) ?? tours[0];
  const subtotal = tour.price * adults + (tour.price * 0.7) * children;
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;
  const savings = tour.originalPrice ? (tour.originalPrice - tour.price) * adults : 0;

  const formatDate = (d: string) => {
    if (!d) return 'Flexible dates';
    return new Date(d).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/tours" className="hover:text-[#0077B6] transition-colors">Tours</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/tours/${tour.id}`} className="hover:text-[#0077B6] transition-colors truncate max-w-32">Detail</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-800 font-medium">Booking Summary</span>
          </div>
          {/* Progress steps */}
          <div className="hidden sm:flex items-center gap-2">
            {['Summary', 'Checkout', 'Confirmation'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 text-xs ${i === 0 ? 'text-[#0077B6]' : 'text-gray-400'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-[#0077B6] text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {i + 1}
                  </div>
                  {step}
                </div>
                {i < 2 && <div className="w-8 h-px bg-gray-200" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-gray-900 mb-8" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700 }}>
          Your Booking Summary
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Tour Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-52 h-44 sm:h-auto shrink-0 relative overflow-hidden">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  {tour.badge && (
                    <span className="absolute top-2 left-2 bg-[#F4845F] text-white text-xs px-2 py-0.5 rounded-full">
                      {tour.badge}
                    </span>
                  )}
                </div>
                <div className="p-5 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
                        <MapPin className="w-3 h-3 text-[#F4845F]" />
                        {tour.destination}, {tour.country}
                      </div>
                      <h3 className="text-gray-900 mb-3" style={{ fontWeight: 600, fontSize: '1rem', lineHeight: 1.4 }}>
                        {tour.title}
                      </h3>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{tour.duration}</span>
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{adults + children} Traveler{(adults + children) > 1 ? 's' : ''}</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{tour.rating}</span>
                      </div>
                    </div>
                    <button className="text-gray-300 hover:text-red-400 transition-colors p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${
                      tour.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      tour.difficulty === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>{tour.difficulty}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-[#0077B6]">{tour.category}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Booking Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <h3 className="text-gray-800 mb-4" style={{ fontWeight: 600 }}>Booking Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-[#0077B6]" />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</span>
                  </div>
                  <div className="text-sm text-gray-800 font-medium">{formatDate(date)}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-[#0077B6]" />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Travelers</span>
                  </div>
                  <div className="text-sm text-gray-800">
                    {adults} Adult{adults > 1 ? 's' : ''}
                    {children > 0 && `, ${children} Child${children > 1 ? 'ren' : ''}`}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#0077B6]" />
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Meeting Point</span>
                  </div>
                  <div className="text-sm text-gray-800 line-clamp-2">{tour.meetingPoint.split(' — ')[0]}</div>
                </div>
              </div>
            </motion.div>

            {/* What's Included summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <h3 className="text-gray-800 mb-4" style={{ fontWeight: 600 }}>What's Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tour.included.slice(0, 6).map((item, i) => (
                  <div key={`inc-${i}`} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2D9E6B] shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Promo code */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <h3 className="text-gray-800 mb-4 flex items-center gap-2" style={{ fontWeight: 600 }}>
                <Tag className="w-4 h-4 text-[#F4845F]" /> Promo Code
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0077B6] transition-colors"
                />
                <button className="bg-[#0077B6] hover:bg-[#005f91] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
                  Apply
                </button>
              </div>
            </motion.div>

            {/* Cancellation policy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-[#2D9E6B]/5 border border-[#2D9E6B]/20 rounded-2xl p-5"
            >
              <h3 className="text-gray-800 mb-3 flex items-center gap-2" style={{ fontWeight: 600 }}>
                <Shield className="w-4 h-4 text-[#2D9E6B]" /> Cancellation Policy
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#2D9E6B]" />Full refund if cancelled 48+ hours before departure</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-400" />50% refund for cancellations 24–48 hours before</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-400" />No refund within 24 hours of departure</div>
              </div>
            </motion.div>
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
              >
                <h3 className="text-gray-800 mb-5" style={{ fontWeight: 600 }}>Price Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{adults} Adult{adults > 1 ? 's' : ''} × ${tour.price.toLocaleString()}</span>
                    <span className="text-gray-800">${(tour.price * adults).toLocaleString()}</span>
                  </div>
                  {children > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{children} Child × ${(tour.price * 0.7).toFixed(0)}</span>
                      <span className="text-gray-800">${(tour.price * 0.7 * children).toFixed(0)}</span>
                    </div>
                  )}
                  {savings > 0 && (
                    <div className="flex justify-between text-sm text-[#2D9E6B]">
                      <span>Savings applied</span>
                      <span>−${savings.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Taxes & fees (8%)</span>
                    <span>${taxes.toFixed(0)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between">
                    <span className="font-bold text-gray-900">Total</span>
                    <div className="text-right">
                      <span className="font-bold text-xl text-[#0077B6]">${total.toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                {savings > 0 && (
                  <div className="mt-3 bg-green-50 rounded-xl p-3 text-center">
                    <span className="text-[#2D9E6B] text-sm font-medium">You're saving ${savings.toLocaleString()}! 🎉</span>
                  </div>
                )}

                <button
                  onClick={() => navigate('/checkout', { state: { tourId: tour.id, adults, children, date, total: total.toFixed(0) } })}
                  className="w-full mt-5 bg-[#F4845F] hover:bg-[#e06e48] text-white py-4 rounded-xl font-medium transition-colors"
                >
                  Proceed to Payment
                </button>

                <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-500">
                  <Shield className="w-3.5 h-3.5 text-[#2D9E6B]" />
                  SSL secured · Safe checkout
                </div>
              </motion.div>

              {/* Help card */}
              <div className="bg-[#0077B6] rounded-2xl p-5 text-white text-center">
                <div className="text-lg mb-1">💬</div>
                <div className="text-sm font-medium mb-2">Need Help?</div>
                <p className="text-blue-100 text-xs mb-3">Our travel experts are available 24/7 to assist you.</p>
                <a href="tel:+94773268999" className="bg-white text-[#0077B6] text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                  Call Us Free
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
