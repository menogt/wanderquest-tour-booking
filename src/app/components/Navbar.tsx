import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Phone, ChevronDown, MapPin, Compass, Users, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoColors from '../../imports/wanderquest_horizontol_logo_with_colors.png';
import logoDark from '../../imports/wanderuest_dark_theme_logo.png';

const navItems = [
  {
    label: 'Destinations',
    href: '/destinations',
    icon: MapPin,
    mega: [
      { label: 'Asia Pacific', desc: 'Bali, Japan, Thailand, Cambodia', href: '/destinations', color: '#0077B6' },
      { label: 'Europe', desc: 'Santorini, Venice, Swiss Alps, Prague', href: '/destinations', color: '#8B5CF6' },
      { label: 'Americas', desc: 'Patagonia, Machu Picchu, Yucatan', href: '/destinations', color: '#2D9E6B' },
      { label: 'Africa & Indian Ocean', desc: 'Serengeti, Maldives, Marrakech', href: '/destinations', color: '#F4845F' },
    ],
  },
  {
    label: 'Experiences',
    href: '/experiences',
    icon: Compass,
    mega: [
      { label: '🏔️ Adventure & Trekking', desc: 'High-altitude hikes & expeditions', href: '/experiences', color: '#0077B6' },
      { label: '🏛️ Cultural & Heritage', desc: 'Ancient wonders & local life', href: '/experiences', color: '#8B5CF6' },
      { label: '🌊 Beach & Island', desc: 'Tropical paradise escapes', href: '/experiences', color: '#2D9E6B' },
      { label: '✨ Luxury & Private', desc: 'Bespoke journeys, your way', href: '/experiences', color: '#F59E0B' },
    ],
  },
  { label: 'About Us', href: '/about', icon: Users, mega: null },
  { label: 'Contact', href: '/contact', icon: Mail, mega: null },
];

const WANDERROUTE_URL = 'https://wanderroute.netlify.app/';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isTransparent = isHome && !scrolled;

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent ? 'bg-transparent' : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={isTransparent ? logoDark : logoColors}
              alt="WanderQuest"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.mega && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isTransparent
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : location.pathname === item.href
                        ? 'text-[#0077B6] bg-[#0077B6]/5'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  style={{ minHeight: '40px' }}
                >
                  {item.label}
                  {item.mega && (
                    <motion.span animate={{ rotate: activeDropdown === item.label ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    </motion.span>
                  )}
                </Link>

                {/* Mega dropdown */}
                <AnimatePresence>
                  {item.mega && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      onMouseEnter={() => handleMouseEnter(item.label)}
                      onMouseLeave={handleMouseLeave}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                      style={{ zIndex: 100 }}
                    >
                      <div className="p-2">
                        {item.mega.map(sub => (
                          <Link
                            key={sub.label}
                            to={sub.href}
                            className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors group"
                          >
                            <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: sub.color }} />
                            <div>
                              <div className="text-sm font-medium text-gray-800 group-hover:text-[#0077B6] transition-colors">{sub.label}</div>
                              <div className="text-xs text-gray-400 mt-0.5">{sub.desc}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-gray-50 px-4 py-3 bg-gray-50/50">
                        <Link to={item.href} className="text-xs text-[#0077B6] font-medium hover:underline flex items-center gap-1">
                          View all {item.label} →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* AI Planner link */}
          <a
            href={WANDERROUTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              isTransparent
                ? 'text-white/90 hover:text-white hover:bg-white/10'
                : 'text-[#0077B6] hover:bg-[#0077B6]/5'
            }`}
            style={{ minHeight: '40px' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4845F]" />
            AI Planner
          </a>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+94773268999"
              className={`flex items-center gap-1.5 text-sm transition-colors ${isTransparent ? 'text-white/80 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}
              style={{ minHeight: '40px' }}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:block">+94 77 326 8999</span>
            </a>
            <Link
              to="/tours"
              className="bg-[#F4845F] hover:bg-[#e06e48] active:bg-[#c85a38] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-orange-200/50 hover:-translate-y-0.5"
              style={{ minHeight: '44px', display: 'flex', alignItems: 'center' }}
            >
              Explore Tours
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-gray-700 hover:bg-gray-100'}`}
            style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <div className="flex justify-center pb-3 mb-2 border-b border-gray-100">
                <img src={logoColors} alt="WanderQuest" className="h-8 w-auto" />
              </div>
              {navItems.map(item => (
                <div key={item.label}>
                  <Link
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      location.pathname === item.href
                        ? 'bg-[#0077B6]/5 text-[#0077B6]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    style={{ minHeight: '48px' }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                  {item.mega && (
                    <div className="pl-11 pb-1 space-y-0.5">
                      {item.mega.slice(0, 2).map(sub => (
                        <Link
                          key={sub.label}
                          to={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-xs text-gray-400 hover:text-[#0077B6] py-1 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 border-t border-gray-100 space-y-2">
                <a href="tel:+94773268999" className="flex items-center gap-3 px-4 py-3 text-gray-700" style={{ minHeight: '48px' }}>
                  <Phone className="w-4 h-4 text-[#0077B6]" />
                  <span className="text-sm">+94 77 326 8999</span>
                </a>
                <a
                  href="https://wa.me/94773268999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700"
                  style={{ minHeight: '48px' }}
                >
                  <span className="text-lg">💬</span>
                  <span className="text-sm">WhatsApp Us</span>
                </a>
                <a
                  href={WANDERROUTE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full text-center bg-white border border-[#0077B6] text-[#0077B6] px-5 py-3.5 rounded-xl font-semibold transition-colors hover:bg-[#0077B6]/5"
                  style={{ minHeight: '48px' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4845F]" />
                  AI Planner
                </a>
                <Link
                  to="/tours"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-[#F4845F] hover:bg-[#e06e48] text-white px-5 py-3.5 rounded-xl font-semibold transition-colors"
                  style={{ minHeight: '48px' }}
                >
                  Explore Tours
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
