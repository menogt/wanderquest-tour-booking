import { useRef } from 'react';
import { Link } from 'react-router';
import { MapPin, Star, ArrowRight, Leaf, Train, Telescope, Waves } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

const highlights = [
  {
    icon: Telescope,
    label: 'Sigiriya Rock',
    desc: '5th-century lion fortress rising from the jungle',
    color: '#F4845F',
  },
  {
    icon: Train,
    label: 'Ella Train Ride',
    desc: 'World\'s most scenic railway through tea highlands',
    color: '#0077B6',
  },
  {
    icon: Leaf,
    label: 'Tea Country',
    desc: 'Emerald-green plantations & colonial bungalows',
    color: '#2D9E6B',
  },
  {
    icon: Waves,
    label: 'Whale Watching',
    desc: 'Blue whales off Mirissa — a world-class spectacle',
    color: '#8B5CF6',
  },
];

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    label: 'Tea Train, Ella',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1609681980718-340e7f4b11d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    label: 'Sigiriya Rock',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1533484482814-3fe2d922be89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    label: 'Wild Elephants',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1653959699604-1eb000740b57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    label: 'South Coast Beach',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1544015759-237f87d55ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    label: 'Tea Estates',
    span: 'col-span-1 row-span-1',
  },
];

export function SriLankaSpotlight() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={sectionRef} className="relative py-28 overflow-hidden bg-[#0a1628]">
      {/* Subtle animated map-dot background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Ambient glow blobs */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#F4845F]/10 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: bgY }}
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#2D9E6B]/10 blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Country badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🇱🇰</span>
              <span className="text-[#F4845F] text-sm font-semibold uppercase tracking-widest">Featured Destination</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, color: '#fff' }}>
              Discover <span className="text-[#F4845F]">Sri Lanka</span>
              <br />
              <span className="text-white/60" style={{ fontWeight: 700, fontSize: '0.7em' }}>Pearl of the Indian Ocean</span>
            </h2>
            <div className="flex items-center gap-3 mt-5">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={`sl-star-${i}`} className="w-4 h-4 fill-[#F4845F] text-[#F4845F]" />
                ))}
              </div>
              <span className="text-white/60 text-sm">4.9 · 31 tours available</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="shrink-0"
          >
            <p className="text-white/60 max-w-sm text-base leading-relaxed mb-6">
              Ancient rock fortresses, misty tea highlands, leopard safaris and golden beaches — Sri Lanka packs an extraordinary variety into one small island.
            </p>
            <div className="flex gap-3">
              <Link
                to="/tours"
                className="flex items-center gap-2 bg-[#F4845F] hover:bg-[#e06e48] text-white px-6 py-3 rounded-xl font-semibold transition-all hover:shadow-xl hover:shadow-orange-900/30 hover:-translate-y-0.5"
              >
                View Sri Lanka Tours <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/destinations"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5"
              >
                <MapPin className="w-4 h-4" /> Explore
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Photo gallery grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-3 mb-14"
          style={{ height: 'clamp(340px, 50vw, 480px)' }}
        >
          {gallery.map((item, i) => (
            <motion.div
              key={`sl-gallery-${i}`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-white text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <MapPin className="w-2.5 h-2.5" /> {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Highlight pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={`sl-highlight-${i}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-colors group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${h.color}22` }}
                >
                  <Icon className="w-5 h-5" style={{ color: h.color }} />
                </div>
                <div className="text-white font-semibold mb-1">{h.label}</div>
                <div className="text-white/50 text-sm leading-snug">{h.desc}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
