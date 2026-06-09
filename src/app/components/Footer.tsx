import { Link } from 'react-router';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import logoDark from '../../imports/wanderuest_dark_theme_logo.png';

const WHATSAPP_URL = 'https://wa.me/94773268999?text=Hi%20WanderQuest%2C%20I%27d%20like%20to%20inquire%20about%20a%20tour.';

export function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-gray-300">
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-[#0077B6] to-[#005f91] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-2xl mb-2" role="img" aria-label="globe">🌍</div>
          <h3 className="text-white mb-2" style={{ fontWeight: 700 }}>Get Inspired. Get Traveling.</h3>
          <p className="text-blue-100 mb-6 text-sm max-w-md mx-auto">
            Exclusive deals, hidden-gem destination guides, and expert travel tips — delivered monthly to adventurers like you.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full text-gray-800 text-sm outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="submit"
              className="bg-[#F4845F] hover:bg-[#e06e48] active:bg-[#c85a38] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all hover:shadow-lg whitespace-nowrap"
            >
              Subscribe Free
            </button>
          </form>
          <p className="text-blue-200/60 text-xs mt-3">No spam. Unsubscribe anytime. 50,000+ travelers already subscribed.</p>
        </div>
      </div>

      {/* WhatsApp CTA bar */}
      <div className="bg-[#25D366]/10 border-b border-[#25D366]/20 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💬</span>
            <div>
              <div className="text-white text-sm font-semibold">Quick travel inquiry? Chat with our experts</div>
              <div className="text-gray-400 text-xs">Usually responds in under 5 minutes during business hours</div>
            </div>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5c] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-green-900/30 whitespace-nowrap shrink-0"
          >
            <span className="text-base">💬</span> Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <img src={logoDark} alt="WanderQuest" className="h-9 w-auto object-contain" />
            </Link>
            <p className="text-sm leading-relaxed mb-3 text-gray-400">
              Crafting extraordinary travel experiences since 2010. Every journey should broaden horizons, deepen connections, and leave you transformed.
            </p>
            <p className="text-xs text-gray-500 mb-5">🏆 Condé Nast Traveller's #1 Tour Operator 2024</p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: 'Facebook', href: '#' },
                { Icon: Instagram, label: 'Instagram', href: '#' },
                { Icon: Twitter, label: 'Twitter', href: '#' },
                { Icon: Youtube, label: 'YouTube', href: '#' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0077B6] flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-white mb-4 text-xs uppercase tracking-widest font-semibold">Top Destinations</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                'Bali, Indonesia',
                'Patagonia, Argentina',
                'Santorini, Greece',
                'Maldives',
                'Swiss Alps',
                'Angkor Wat, Cambodia',
                'Serengeti, Tanzania',
              ].map(label => (
                <li key={label}>
                  <Link to="/destinations" className="hover:text-[#F4845F] transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#F4845F] transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="text-white mb-4 text-xs uppercase tracking-widest font-semibold">Experiences</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                'Adventure & Trekking',
                'Cultural & Heritage',
                'Beach & Island',
                'Wildlife & Safari',
                'Luxury & Private',
                'Food & Wine',
                'Wellness & Retreat',
              ].map(label => (
                <li key={label}>
                  <Link to="/experiences" className="hover:text-[#F4845F] transition-colors flex items-center gap-1.5 group">
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#F4845F] transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Tools */}
          <div>
            <h4 className="text-white mb-4 text-xs uppercase tracking-widest font-semibold">Travel Tools</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://wanderroute.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F4845F] transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#F4845F] shrink-0" />
                  AI Trip Planner
                </a>
              </li>
            </ul>
            <div className="mt-5 p-3.5 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-white/80 text-xs font-semibold mb-1">🗺️ WanderRoute</div>
              <p className="text-gray-500 text-xs leading-relaxed">
                WanderQuest connects discovery and booking with WanderRoute, an AI-powered route planning experience for Sri Lanka travelers.
              </p>
              <a
                href="https://wanderroute.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs text-[#F4845F] hover:text-[#f5a880] font-medium transition-colors"
              >
                Plan your route →
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4 text-xs uppercase tracking-widest font-semibold">Get In Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#F4845F] shrink-0" />
                <span className="text-gray-400">123 Explorer Way, San Francisco, CA 94102</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F4845F] shrink-0" />
                <a href="tel:+94773268999" className="hover:text-white transition-colors">+94 77 326 8999</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F4845F] shrink-0" />
                <a href="mailto:menopixels@gmail.com" className="hover:text-white transition-colors">menopixels@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lg shrink-0">💬</span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors"
                >
                  WhatsApp: +94 77 326 8999
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-white text-sm font-semibold mb-1">🕐 24/7 Travel Support</div>
              <div className="text-xs text-gray-400">Our expert travel consultants are always ready to help plan your perfect adventure.</div>
              <Link to="/contact" className="mt-3 inline-flex items-center gap-1 text-xs text-[#F4845F] hover:text-[#f5a880] font-medium transition-colors">
                Contact our team →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <span>© 2026 WanderQuest Travel Co. All rights reserved.</span>
          <div className="flex flex-wrap justify-center gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Sitemap'].map(item => (
              <a key={item} href="#" className="hover:text-gray-300 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
