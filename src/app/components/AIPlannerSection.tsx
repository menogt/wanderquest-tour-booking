import { ExternalLink, Route, MapPin, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

const WANDERROUTE_URL = 'https://wanderroute.netlify.app/';

const featureCards = [
  {
    icon: Route,
    title: 'Personalized Routes',
    text: 'Create travel routes based on your interests, trip duration, and preferred travel style.',
    color: '#0077B6',
    bg: '#EFF8FF',
  },
  {
    icon: MapPin,
    title: 'Sri Lanka Focused',
    text: 'Plan around beaches, mountains, culture, wildlife, cities, and hidden local experiences.',
    color: '#2D9E6B',
    bg: '#EFFAF4',
  },
  {
    icon: BookOpen,
    title: 'Plan First, Book Better',
    text: 'Use your AI-generated route to choose the right tours and experiences on WanderQuest.',
    color: '#F4845F',
    bg: '#FFF4F0',
  },
];

export function AIPlannerSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl overflow-hidden relative"
          style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d2040 50%, #0a1f3a 100%)' }}
        >
          {/* Dot grid texture */}
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />
          {/* Ambient glows */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#0077B6]/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#F4845F]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 p-8 sm:p-12 lg:p-16">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-xl"
              >
                {/* Ecosystem label */}
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4845F] animate-pulse" />
                  Part of the WanderQuest travel ecosystem
                </div>

                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#fff', lineHeight: 1.15 }}>
                  Plan Your Journey<br />
                  <span className="text-[#F4845F]">with AI</span>
                </h2>

                <p className="text-white/60 mt-4 text-base leading-relaxed">
                  Before booking your experiences, create a personalized Sri Lanka travel route with WanderRoute.
                </p>

                <p className="text-white/45 mt-3 text-sm leading-relaxed max-w-md">
                  WanderRoute helps travelers turn rough trip ideas into clear travel plans. Choose your interests, travel style, and destination preferences, then explore a smarter route before booking tours on WanderQuest.
                </p>

                {/* Journey flow */}
                <div className="flex items-center gap-2 mt-6 flex-wrap">
                  {['Discover', 'Plan', 'Compare', 'Book'].map((step, i) => (
                    <div key={`flow-${step}`} className="flex items-center gap-2">
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${i === 1 ? 'bg-[#F4845F] text-white' : 'bg-white/10 text-white/70'}`}>
                        {step}
                      </span>
                      {i < 3 && <span className="text-white/30 text-xs">→</span>}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="shrink-0"
              >
                <a
                  href={WANDERROUTE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 bg-[#F4845F] hover:bg-[#e06e48] text-white px-8 py-4 rounded-2xl font-semibold transition-all hover:shadow-2xl hover:shadow-orange-900/30 hover:-translate-y-0.5 text-base"
                >
                  Open AI Trip Planner
                  <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                </a>
                <p className="text-white/30 text-xs mt-3 text-center">
                  Powered by WanderRoute — a connected AI planning experience
                </p>
              </motion.div>
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featureCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={`ai-card-${i}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-white/8 hover:bg-white/12 border border-white/10 rounded-2xl p-6 transition-colors"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${card.color}25` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: card.color }} />
                    </div>
                    <h4 className="text-white mb-2" style={{ fontWeight: 700 }}>{card.title}</h4>
                    <p className="text-white/55 text-sm leading-relaxed">{card.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
