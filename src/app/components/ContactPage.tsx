import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Check, ChevronDown, Globe, MessageCircle, HeadphonesIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

const officeLocations = [
  { city: 'San Francisco', country: 'USA 🇺🇸', address: '123 Explorer Way, SF, CA 94102', phone: '+94 77 326 8999', hours: 'Mon–Fri 9AM–6PM PST', timezone: 'Pacific Time', primary: true },
  { city: 'London', country: 'UK 🇬🇧', address: '45 Travel Lane, Covent Garden, WC2E 9RZ', phone: '+44 20 7123 4567', hours: 'Mon–Fri 9AM–6PM GMT', timezone: 'GMT', primary: false },
  { city: 'Singapore', country: 'Singapore 🇸🇬', address: '12 Raffles Quay, Singapore 048580', phone: '+65 6123 4567', hours: 'Mon–Fri 9AM–6PM SGT', timezone: 'SGT +8', primary: false },
];

const inquiryTypes = [
  'Book a Tour', 'Custom Itinerary', 'Group Travel (10+ people)', 'Corporate / Incentive Travel',
  'Press & Media', 'Partnership Enquiry', 'Feedback or Complaint', 'General Question',
];

const faqs = [
  { q: 'How far in advance should I book?', a: 'We recommend booking 3–6 months ahead for popular tours, especially during peak seasons (June–September, December–January). Some luxury and private tours can be arranged with 4 weeks notice.' },
  { q: 'Do you offer group discounts?', a: 'Yes! Groups of 8+ receive a 10% discount; 15+ receive 15%. Private group bookings (10+ people) get a fully customized experience at competitive rates. Contact our group team for a bespoke quote.' },
  { q: 'What\'s your payment policy?', a: 'A 25% deposit secures your booking, with the balance due 60 days before departure. We accept all major credit cards, bank transfer, and PayPal. Payment plans are available for bookings over $3,000.' },
  { q: 'Can you accommodate dietary requirements or disabilities?', a: 'Absolutely. We cater to all dietary requirements (vegetarian, vegan, gluten-free, halal, kosher) and work hard to ensure tours are accessible. Let us know your needs when booking and we\'ll tailor the experience.' },
  { q: 'Is travel insurance required?', a: 'We strongly recommend comprehensive travel insurance covering medical, cancellation, and adventure activities. We partner with SafeTravel Pro — ask us about group rates. Insurance is compulsory for all trekking and adventure tours.' },
  { q: 'What happens if my tour is cancelled?', a: 'If we cancel your tour for any reason, you receive a full refund or credit. We\'ve operated continuously since 2010 with a 99.7% tour delivery rate, even navigating extreme weather and global disruptions.' },
];

const supportChannels = [
  { icon: Phone, label: 'Call Us', value: '+94 77 326 8999', desc: 'Mon–Fri 9AM–6PM PST', color: '#0077B6', action: 'tel:+94773268999', external: false },
  { icon: Mail, label: 'Email Us', value: 'menopixels@gmail.com', desc: 'Response within 2 hours', color: '#2D9E6B', action: 'mailto:menopixels@gmail.com', external: false },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat on WhatsApp', desc: 'Usually replies in 5 min', color: '#25D366', action: 'https://wa.me/94773268999?text=Hi%20WanderQuest%2C%20I%27d%20like%20to%20inquire%20about%20a%20tour.', external: true },
];

export function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeOffice, setActiveOffice] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', inquiryType: '', message: '', newsletter: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1400));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success('Message sent! We\'ll be in touch within 2 hours.', { duration: 5000 });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-16">
      {/* ── HERO ─────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0077B6 100%)', minHeight: '340px' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 40%, #F4845F 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm mb-4 border border-white/20">
              <HeadphonesIcon className="w-4 h-4" /> 24/7 Travel Support
            </div>
            <h1 className="text-white mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800 }}>
              Let's Plan Your
              <span className="text-[#F4845F]"> Perfect Adventure</span>
            </h1>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
              Whether you have a dream destination in mind or just a craving to explore — our travel experts are here to make it happen.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── SUPPORT CHANNELS ────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 mb-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {supportChannels.map((ch, i) => (
            <motion.a
              key={ch.label}
              href={ch.action}
              target={ch.external ? '_blank' : undefined}
              rel={ch.external ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-md hover:shadow-xl transition-all border border-gray-100 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: ch.color + '15' }}>
                <ch.icon className="w-6 h-6" style={{ color: ch.color }} />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">{ch.label}</div>
                <div className="text-sm font-medium" style={{ color: ch.color }}>{ch.value}</div>
                <div className="text-gray-400 text-xs">{ch.desc}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── CONTACT FORM ──────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50" style={{ background: 'linear-gradient(135deg, #f8faff 0%, #ffffff 100%)' }}>
                <h2 style={{ fontWeight: 700, fontSize: '1.4rem', color: '#1A1A2E' }} className="mb-1">Send Us a Message</h2>
                <p className="text-gray-500 text-sm">We respond within 2 hours during business hours.</p>
              </div>

              <div className="p-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <div className="w-16 h-16 bg-[#2D9E6B] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-gray-900 mb-2" style={{ fontWeight: 700, fontSize: '1.2rem' }}>Message Sent!</h3>
                      <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                        Thank you, <strong>{form.name}</strong>! A WanderQuest travel expert will reply to <strong>{form.email}</strong> within 2 hours.
                      </p>
                      <button
                        onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', inquiryType: '', message: '', newsletter: false }); }}
                        className="text-[#0077B6] text-sm font-medium hover:underline"
                      >
                        Send another message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Full Name *</label>
                          <input
                            required
                            type="text"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="Sarah Johnson"
                            className="w-full border-2 border-gray-100 focus:border-[#0077B6] rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                            style={{ minHeight: '48px' }}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Email Address *</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                            <input
                              required
                              type="email"
                              value={form.email}
                              onChange={e => setForm({ ...form, email: e.target.value })}
                              placeholder="sarah@example.com"
                              className="w-full border-2 border-gray-100 focus:border-[#0077B6] rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-colors"
                              style={{ minHeight: '48px' }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone (Optional)</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                            <input
                              type="tel"
                              value={form.phone}
                              onChange={e => setForm({ ...form, phone: e.target.value })}
                              placeholder="+1 555 0100"
                              className="w-full border-2 border-gray-100 focus:border-[#0077B6] rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-colors"
                              style={{ minHeight: '48px' }}
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Enquiry Type *</label>
                          <div className="relative">
                            <select
                              required
                              value={form.inquiryType}
                              onChange={e => setForm({ ...form, inquiryType: e.target.value })}
                              className="w-full border-2 border-gray-100 focus:border-[#0077B6] rounded-xl px-4 py-3 text-sm outline-none transition-colors appearance-none"
                              style={{ minHeight: '48px' }}
                            >
                              <option value="">Select a topic...</option>
                              {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Your Message *</label>
                        <textarea
                          required
                          rows={5}
                          value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us about your dream trip — destination, travel dates, group size, budget, any special requirements..."
                          className="w-full border-2 border-gray-100 focus:border-[#0077B6] rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                        />
                        <div className="text-right text-xs text-gray-400">{form.message.length}/1000</div>
                      </div>

                      {/* Newsletter checkbox */}
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, newsletter: !form.newsletter })}
                          className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${form.newsletter ? 'bg-[#0077B6] border-[#0077B6]' : 'border-gray-300 hover:border-[#0077B6]'}`}
                          style={{ minWidth: '20px', minHeight: '20px' }}
                        >
                          {form.newsletter && <Check className="w-3 h-3 text-white" />}
                        </button>
                        <span className="text-xs text-gray-500 leading-relaxed">
                          Subscribe to our newsletter for exclusive deals, travel guides, and destination inspiration. Unsubscribe anytime.
                        </span>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-[#F4845F] hover:bg-[#e06e48] disabled:opacity-70 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                        style={{ minHeight: '52px' }}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <><Send className="w-4 h-4" /> Send Message</>
                        )}
                      </motion.button>

                      <p className="text-center text-xs text-gray-400">
                        By submitting, you agree to our Privacy Policy. We'll never spam you.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* ── SIDEBAR ───────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Office Locations */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-50">
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A2E' }}>Our Global Offices</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {officeLocations.map((office, i) => (
                  <motion.button
                    key={office.city}
                    onClick={() => setActiveOffice(i)}
                    className={`w-full text-left p-5 transition-all ${activeOffice === i ? 'bg-[#0077B6]/5' : 'hover:bg-gray-50'}`}
                    style={{ minHeight: '80px' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${activeOffice === i ? 'bg-[#2D9E6B]' : 'bg-gray-300'}`} />
                        <span className="font-semibold text-sm text-gray-800">{office.city}</span>
                        <span className="text-xs text-gray-400">{office.country}</span>
                      </div>
                      {office.primary && (
                        <span className="text-xs bg-[#0077B6]/10 text-[#0077B6] px-2 py-0.5 rounded-full">HQ</span>
                      )}
                    </div>
                    <AnimatePresence>
                      {activeOffice === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-2 pt-2">
                            <div className="flex items-start gap-2 text-xs text-gray-500">
                              <MapPin className="w-3 h-3 text-[#F4845F] mt-0.5 shrink-0" />
                              {office.address}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Phone className="w-3 h-3 text-[#0077B6] shrink-0" />
                              <a href={`tel:${office.phone}`} className="text-[#0077B6] hover:underline">{office.phone}</a>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3 text-[#2D9E6B] shrink-0" />
                              {office.hours} ({office.timezone})
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Emergency line */}
            <div className="bg-[#0077B6] rounded-3xl p-5 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">24/7 Emergency Line</div>
                  <div className="text-blue-200 text-xs">For travelers currently on tour</div>
                </div>
              </div>
              <a href="tel:+94773268999" className="block text-xl font-bold hover:text-blue-200 transition-colors mb-1">
                +94 77 326 8999
              </a>
              <p className="text-blue-100 text-xs">Our emergency team is available around the clock. Never hesitate to call.</p>
            </div>

            {/* Response time card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">
              <div className="text-sm font-semibold text-gray-800 mb-4">Expected Response Times</div>
              <div className="space-y-3">
                {[
                  { type: 'General Enquiries', time: '< 2 hours', color: '#2D9E6B' },
                  { type: 'Custom Itineraries', time: '< 24 hours', color: '#0077B6' },
                  { type: 'Group Bookings', time: '< 48 hours', color: '#F4845F' },
                  { type: 'Emergency Line', time: 'Immediate', color: '#DC2626' },
                ].map(item => (
                  <div key={item.type} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{item.type}</span>
                    <span className="font-semibold text-xs px-2 py-1 rounded-full" style={{ backgroundColor: item.color + '15', color: item.color }}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ ───────────────────────────────────── */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <div className="text-[#F4845F] text-sm font-medium uppercase tracking-wider mb-2">Got Questions?</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1A1A2E' }}>Frequently Asked Questions</h2>
            <p className="text-gray-500 mt-3 text-sm">Quick answers to the questions we hear most.</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                  style={{ minHeight: '60px' }}
                >
                  <span className="font-medium text-gray-800 pr-4 text-sm">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-gray-500 leading-relaxed border-t border-gray-50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">Still have questions? <a href="mailto:menopixels@gmail.com" className="text-[#0077B6] hover:underline font-medium">Email our team</a> or call <a href="tel:+94773268999" className="text-[#0077B6] hover:underline font-medium">+94 77 326 8999</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
