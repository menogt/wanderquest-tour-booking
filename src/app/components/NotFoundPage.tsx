import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, Compass, MapPin } from 'lucide-react';
import logoColors from '../../imports/wanderquest_horizontol_logo_with_colors.png';

const suggestions = [
  { label: 'Explore Destinations', href: '/destinations', emoji: '🌍' },
  { label: 'Browse Experiences', href: '/experiences', emoji: '🏔️' },
  { label: 'Find a Tour', href: '/tours', emoji: '🗺️' },
  { label: 'Contact Us', href: '/contact', emoji: '💬' },
];

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d2040] to-[#0077B6] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#F4845F]/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#2D9E6B]/10 blur-3xl" />
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <Link to="/">
          <img src={logoColors} alt="WanderQuest" className="h-10 w-auto" />
        </Link>
      </motion.div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Animated compass */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <motion.div
                animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
              >
                <Compass className="w-16 h-16 text-[#F4845F]" />
              </motion.div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-[#F4845F] rounded-full flex items-center justify-center"
            >
              <span className="text-white text-xs font-bold">?</span>
            </motion.div>
          </div>
        </motion.div>

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-white/20 mb-0 select-none"
          style={{ fontSize: 'clamp(6rem, 15vw, 10rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em' }}
        >
          404
        </motion.div>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="-mt-4 mb-4"
        >
          <h1 className="text-white mb-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', fontWeight: 800, lineHeight: 1.2 }}>
            Looks like this path went<br />
            <span className="text-[#F4845F]">off the map.</span>
          </h1>
          <p className="text-blue-100/70 text-lg leading-relaxed">
            Even the best explorers take a wrong turn sometimes. The page you're looking for has either moved, been removed, or never existed on our map.
          </p>
        </motion.div>

        {/* Location pin decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-white/40 text-sm mb-8"
        >
          <MapPin className="w-4 h-4" />
          <span>Lost at coordinates: 404°N, 0°W</span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
        >
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-[#F4845F] hover:bg-[#e06e48] active:bg-[#c85a38] text-white px-8 py-4 rounded-2xl font-semibold transition-all hover:shadow-xl hover:shadow-orange-900/30 hover:-translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
          <Link
            to="/tours"
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-semibold transition-all hover:-translate-y-0.5"
          >
            <Compass className="w-4 h-4" />
            Explore All Tours
          </Link>
        </motion.div>

        {/* Quick suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="text-white/40 text-sm mb-4">Or perhaps you were looking for:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {suggestions.map((s, i) => (
              <motion.div
                key={s.href}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.08 }}
              >
                <Link
                  to={s.href}
                  className="flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/10 text-white/80 hover:text-white text-sm px-4 py-2.5 rounded-full transition-all"
                >
                  <span>{s.emoji}</span>
                  {s.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-white/20 text-xs"
      >
        WanderQuest — Discover the World's Hidden Gems
      </motion.p>
    </div>
  );
}
