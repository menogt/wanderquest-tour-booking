import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { ChevronRight, CreditCard, Lock, Check, User, Mail, Phone, MapPin, Calendar, Users, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { tours } from '../data/tourData';

type Step = 'details' | 'payment' | 'confirmed';

export function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { tourId?: string; adults?: number; children?: number; date?: string; total?: string } | null;

  const tourId = state?.tourId ?? '1';
  const adults = state?.adults ?? 2;
  const children = state?.children ?? 0;
  const date = state?.date ?? '';
  const total = state?.total ?? '4982';
  const tour = tours.find(t => t.id === tourId) ?? tours[0];

  const [step, setStep] = useState<Step>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'apple'>('card');

  const [details, setDetails] = useState({
    firstName: '', lastName: '', email: '', phone: '', nationality: '', dietaryRequirements: '', specialRequests: '',
  });
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [agreed, setAgreed] = useState(false);

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (d: string) => {
    if (!d) return 'Flexible dates';
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const steps = ['details', 'payment', 'confirmed'];
  const stepIndex = steps.indexOf(step);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/booking" className="hover:text-[#0077B6] transition-colors">Summary</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-800 font-medium">Checkout</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {['Summary', 'Details', 'Payment', 'Confirmed'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 text-xs ${i <= stepIndex + 1 ? 'text-[#0077B6]' : 'text-gray-400'}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    i < stepIndex + 1 ? 'bg-[#2D9E6B] text-white' :
                    i === stepIndex + 1 ? 'bg-[#0077B6] text-white' :
                    'bg-gray-200 text-gray-500'
                  }`}>
                    {i < stepIndex + 1 ? <Check className="w-3 h-3" /> : i + 1}
                  </div>
                  {s}
                </div>
                {i < 3 && <div className="w-8 h-px bg-gray-200" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation screen */}
      <AnimatePresence>
        {step === 'confirmed' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto px-4 py-16 text-center"
          >
            <div className="w-20 h-20 bg-[#2D9E6B] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-gray-900 mb-3" style={{ fontSize: '2rem', fontWeight: 700 }}>Booking Confirmed!</h1>
            <p className="text-gray-500 mb-2">
              Thank you, <strong>{details.firstName || 'Traveler'}</strong>! Your adventure is booked.
            </p>
            <p className="text-gray-400 text-sm mb-8">A confirmation email has been sent to <strong>{details.email || 'your email'}</strong>.</p>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 text-left mb-8 shadow-sm">
              <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-4">Booking Reference</div>
              <div className="text-2xl font-bold text-[#0077B6] mb-4">WQ-{Math.random().toString(36).substring(2, 8).toUpperCase()}</div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#F4845F]" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Tour</div>
                    <div className="text-gray-800 font-medium">{tour.title}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-[#0077B6]" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Departure</div>
                    <div className="text-gray-800">{formatDate(date)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-[#2D9E6B]" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Travelers</div>
                    <div className="text-gray-800">{adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}</div>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Total Paid</span>
                  <span className="text-[#0077B6] font-bold text-lg">${total}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-[#F4845F] hover:bg-[#e06e48] text-white px-8 py-3 rounded-xl font-medium transition-colors">
                Download Itinerary
              </button>
              <button onClick={() => navigate('/')} className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                Back to Home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {step !== 'confirmed' && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Step 1: Traveler Details */}
              {step === 'details' && (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleDetailsSubmit}
                  className="space-y-5"
                >
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <h2 className="text-gray-900 mb-5 flex items-center gap-2" style={{ fontWeight: 700, fontSize: '1.15rem' }}>
                      <User className="w-5 h-5 text-[#0077B6]" />
                      Lead Traveler Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">First Name *</label>
                        <input
                          required
                          type="text"
                          value={details.firstName}
                          onChange={e => setDetails({ ...details, firstName: e.target.value })}
                          placeholder="John"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0077B6] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">Last Name *</label>
                        <input
                          required
                          type="text"
                          value={details.lastName}
                          onChange={e => setDetails({ ...details, lastName: e.target.value })}
                          placeholder="Smith"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0077B6] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">Email Address *</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            required
                            type="email"
                            value={details.email}
                            onChange={e => setDetails({ ...details, email: e.target.value })}
                            placeholder="john@example.com"
                            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#0077B6] transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">Phone Number *</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            required
                            type="tel"
                            value={details.phone}
                            onChange={e => setDetails({ ...details, phone: e.target.value })}
                            placeholder="+1 555 0100"
                            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#0077B6] transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">Nationality *</label>
                        <select
                          required
                          value={details.nationality}
                          onChange={e => setDetails({ ...details, nationality: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0077B6] transition-colors text-gray-700"
                        >
                          <option value="">Select nationality</option>
                          {['American', 'British', 'Australian', 'Canadian', 'German', 'French', 'Japanese', 'Other'].map(n => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600 mb-1.5 block">Dietary Requirements</label>
                        <select
                          value={details.dietaryRequirements}
                          onChange={e => setDetails({ ...details, dietaryRequirements: e.target.value })}
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0077B6] transition-colors text-gray-700"
                        >
                          <option value="">None</option>
                          {['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'Nut Allergy'].map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="text-xs font-medium text-gray-600 mb-1.5 block">Special Requests</label>
                      <textarea
                        rows={3}
                        value={details.specialRequests}
                        onChange={e => setDetails({ ...details, specialRequests: e.target.value })}
                        placeholder="Any special needs, accessibility requirements, or requests..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0077B6] transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <div className="bg-[#0077B6]/5 border border-[#0077B6]/10 rounded-2xl p-4 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#0077B6] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-gray-800 mb-1">Your data is safe with us</div>
                      <p className="text-xs text-gray-500">We use bank-level encryption to protect your personal information. We never share your data with third parties.</p>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-[#F4845F] hover:bg-[#e06e48] text-white py-4 rounded-xl font-medium transition-colors">
                    Continue to Payment →
                  </button>
                </motion.form>
              )}

              {/* Step 2: Payment */}
              {step === 'payment' && (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handlePaymentSubmit}
                  className="space-y-5"
                >
                  {/* Payment method selector */}
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                    <h2 className="text-gray-900 mb-5 flex items-center gap-2" style={{ fontWeight: 700, fontSize: '1.15rem' }}>
                      <CreditCard className="w-5 h-5 text-[#0077B6]" />
                      Payment Method
                    </h2>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { id: 'card', label: 'Credit Card', icon: '💳' },
                        { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                        { id: 'apple', label: 'Apple Pay', icon: '🍎' },
                      ].map(method => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id as typeof paymentMethod)}
                          className={`border-2 rounded-xl py-3 px-2 text-center transition-all ${
                            paymentMethod === method.id ? 'border-[#0077B6] bg-[#0077B6]/5' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-xl mb-1">{method.icon}</div>
                          <div className="text-xs font-medium text-gray-700">{method.label}</div>
                        </button>
                      ))}
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Card Number *</label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              required
                              type="text"
                              value={card.number}
                              onChange={e => setCard({ ...card, number: e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19) })}
                              placeholder="1234 5678 9012 3456"
                              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#0077B6] transition-colors"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1.5 block">Cardholder Name *</label>
                          <input
                            required
                            type="text"
                            value={card.name}
                            onChange={e => setCard({ ...card, name: e.target.value })}
                            placeholder="John Smith"
                            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0077B6] transition-colors"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Expiry Date *</label>
                            <input
                              required
                              type="text"
                              value={card.expiry}
                              onChange={e => setCard({ ...card, expiry: e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5) })}
                              placeholder="MM/YY"
                              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0077B6] transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-600 mb-1.5 block">CVV *</label>
                            <div className="relative">
                              <input
                                required
                                type="text"
                                value={card.cvv}
                                onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                                placeholder="123"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#0077B6] transition-colors"
                              />
                              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'paypal' && (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-3">🅿️</div>
                        <p className="text-gray-500 text-sm mb-4">You'll be redirected to PayPal to complete your payment securely.</p>
                        <div className="bg-[#003087] text-white rounded-xl py-3 px-6 inline-block text-sm font-medium">Pay with PayPal</div>
                      </div>
                    )}

                    {paymentMethod === 'apple' && (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-3">🍎</div>
                        <p className="text-gray-500 text-sm mb-4">Use Apple Pay for a fast, secure one-tap payment.</p>
                        <div className="bg-black text-white rounded-xl py-3 px-6 inline-block text-sm font-medium">Pay with Apple Pay</div>
                      </div>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => setAgreed(!agreed)}
                      className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${agreed ? 'bg-[#0077B6] border-[#0077B6]' : 'border-gray-300'}`}
                    >
                      {agreed && <Check className="w-3 h-3 text-white" />}
                    </button>
                    <p className="text-xs text-gray-500">
                      I agree to WanderQuest's <a href="#" className="text-[#0077B6] hover:underline">Terms & Conditions</a> and <a href="#" className="text-[#0077B6] hover:underline">Privacy Policy</a>. I confirm the information provided is accurate.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep('details')}
                      className="flex-1 bg-white border border-gray-200 text-gray-700 py-4 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={!agreed}
                      className="flex-[2] bg-[#F4845F] hover:bg-[#e06e48] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      Confirm & Pay ${total}
                    </button>
                  </div>

                  {/* Security badges */}
                  <div className="flex items-center justify-center gap-6 pt-2">
                    {['SSL Secured', 'PCI Compliant', '256-bit Encryption'].map(b => (
                      <div key={b} className="flex items-center gap-1 text-xs text-gray-400">
                        <Shield className="w-3 h-3 text-[#2D9E6B]" />
                        {b}
                      </div>
                    ))}
                  </div>
                </motion.form>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="relative h-32">
                    <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-white text-xs font-medium line-clamp-2">{tour.title}</div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin className="w-3 h-3 text-[#F4845F]" />
                      {tour.destination}, {tour.country}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3 text-[#0077B6]" />
                      {formatDate(date)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Users className="w-3 h-3 text-[#2D9E6B]" />
                      {adults} Adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} Child` : ''}
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-900">Total</span>
                      <span className="text-[#0077B6] font-bold text-xl">${total}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#2D9E6B]/5 border border-[#2D9E6B]/20 rounded-2xl p-4 space-y-2">
                  <div className="text-xs font-medium text-[#2D9E6B] uppercase tracking-wider mb-3">Booking Guarantee</div>
                  {['Free cancellation 48h+', 'Secure SSL payment', '24/7 customer support', 'Certified local guides'].map(g => (
                    <div key={g} className="flex items-center gap-2 text-xs text-gray-600">
                      <Check className="w-3.5 h-3.5 text-[#2D9E6B]" />
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
