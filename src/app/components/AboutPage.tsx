import { useNavigate } from 'react-router';
import { Heart, Globe, Users, Award, Shield, Leaf, ArrowRight, Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';

const team = [
  { name: 'Sofia Moretti', role: 'Founder & CEO', location: 'Milan, Italy', image: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', bio: 'Ex-National Geographic photographer turned travel entrepreneur. Sofia has visited 97 countries and started WanderQuest after a life-changing solo journey through Patagonia in 2009.', trips: 97 },
  { name: 'James Okonkwo', role: 'Head of Experiences', location: 'Lagos, Nigeria', image: 'https://images.unsplash.com/photo-1758691736975-9f7f643d178e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', bio: 'Former safari guide turned experience designer. James personally curates every African and adventure tour on WanderQuest, ensuring authenticity at every stop.', trips: 74 },
  { name: 'Mei Lin Chen', role: 'Asia Pacific Director', location: 'Singapore', image: 'https://images.unsplash.com/photo-1758272133771-b149318883c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', bio: 'Born in Shanghai, raised across 6 countries. Mei Lin built our Asia Pacific network from scratch, with deep relationships across 200+ local operators.', trips: 88 },
  { name: 'Lucas Fernández', role: 'Chief Experience Officer', location: 'Buenos Aires, Argentina', image: 'https://images.unsplash.com/photo-1758599543116-4fdb887911a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400', bio: 'Seasoned mountaineer and ultra-runner who has guided treks in 5 continents. Lucas ensures every adventure tour meets our elite safety standards.', trips: 112 },
];

const milestones = [
  { year: '2010', title: 'WanderQuest Founded', desc: 'Sofia starts with 3 Bali tours and a vision to make meaningful travel accessible to everyone.' },
  { year: '2013', title: '10,000 Travelers Milestone', desc: 'Our first decade brought us to 10,000 happy travelers across 40 destinations.' },
  { year: '2016', title: 'Named #1 by Condé Nast', desc: "Condé Nast Traveller names WanderQuest the world's most innovative tour operator." },
  { year: '2019', title: 'Carbon Neutral Pledge', desc: 'We offset 100% of our carbon footprint and launched the WanderQuest Reforestation Fund.' },
  { year: '2022', title: 'TripAdvisor Hall of Fame', desc: 'Inducted into the TripAdvisor Hall of Fame after 10 consecutive years with a 5-star rating.' },
  { year: '2024', title: '50,000+ Travelers Worldwide', desc: 'Celebrating 50,000 travelers, 120 destinations, and 15 years of changing lives through travel.' },
];

const values = [
  { icon: Heart, title: 'Passion First', desc: 'We don\'t sell tours — we design journeys that stir the soul. Every itinerary is built by travelers, for travelers.', color: '#F4845F' },
  { icon: Shield, title: 'Safety Always', desc: 'Your wellbeing comes first. Every tour is risk-assessed, every guide certified, every vehicle inspected.', color: '#0077B6' },
  { icon: Leaf, title: 'Sustainable Travel', desc: 'Carbon-neutral operations, local economic investment, and wildlife conservation are baked into every tour we run.', color: '#2D9E6B' },
  { icon: Users, title: 'Community Impact', desc: 'We partner with 500+ local operators, employing local guides and investing 5% of revenue back into host communities.', color: '#8B5CF6' },
];

const awards = [
  { name: 'Condé Nast Traveller', years: '2016–2024' },
  { name: 'TripAdvisor Hall of Fame', years: 'Inducted 2022' },
  { name: 'Lonely Planet Recommended', years: 'Since 2014' },
  { name: 'ATTA Member', years: 'Since 2011' },
  { name: 'IATA Certified', years: 'Since 2012' },
  { name: 'B Corp Certified', years: 'Since 2020' },
];

const pressQuotes = [
  { text: 'WanderQuest has redefined what a tour operator should be — equal parts inspiring, responsible, and impeccably organized.', source: 'Condé Nast Traveller' },
  { text: 'If you want to travel with your soul, not just your body, WanderQuest is in a class of its own.', source: 'The Guardian Travel' },
];

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* ── HERO ─────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0077B6 100%)', minHeight: '520px' }}>
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #F4845F 0%, transparent 50%), radial-gradient(circle at 75% 75%, #2D9E6B 0%, transparent 50%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="text-[#F4845F] text-sm font-medium uppercase tracking-wider mb-3">Our Story</div>
              <h1 className="text-white mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1 }}>
                We Don't Sell Trips.<br />
                <span className="text-[#F4845F]">We Change Lives.</span>
              </h1>
              <p className="text-blue-100 text-lg mb-4 leading-relaxed">
                Founded in 2010 by a photographer-turned-adventurer, WanderQuest was built on a single belief: that travel, done right, is the most transformative thing a human can do.
              </p>
              <p className="text-blue-200 text-base mb-8 leading-relaxed">
                Fifteen years later, we've guided 50,000+ travelers across 120 destinations — and we're just getting started.
              </p>
              <div className="flex flex-wrap gap-6">
                {[{ v: '50k+', l: 'Happy Travelers' }, { v: '120+', l: 'Destinations' }, { v: '15', l: 'Years of Excellence' }].map(s => (
                  <div key={s.l}>
                    <div className="text-3xl font-bold text-white">{s.v}</div>
                    <div className="text-blue-200 text-sm">{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="hidden lg:grid grid-cols-2 gap-3"
            >
              {[
                'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
                'https://images.unsplash.com/photo-1758272133771-b149318883c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
                'https://images.unsplash.com/photo-1507237615867-0d4d2ad6b2d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
                'https://images.unsplash.com/photo-1578592391689-0e3d1a1b52b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
              ].map((src, i) => (
                <div key={`photo-${i}`} className={`rounded-2xl overflow-hidden ${i === 0 ? 'row-span-2' : ''}`} style={{ height: i === 0 ? '280px' : '130px' }}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── PRESS QUOTES ────────────────────────────── */}
      <div className="bg-gray-50 border-y border-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {pressQuotes.map((q, i) => (
            <motion.div
              key={q.source}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 items-start"
            >
              <Quote className="w-8 h-8 text-[#0077B6]/30 shrink-0 mt-1" />
              <div>
                <p className="text-gray-700 italic mb-2 text-sm leading-relaxed">"{q.text}"</p>
                <div className="text-[#0077B6] text-xs font-semibold">— {q.source}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── OUR VALUES ──────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[#F4845F] text-sm font-medium uppercase tracking-wider mb-2">What Drives Us</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1A1A2E' }}>Our Core Values</h2>
            <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm">These aren't just values on a wall. They're the principles behind every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ backgroundColor: val.color }} />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: val.color + '18' }}>
                  <val.icon className="w-7 h-7" style={{ color: val.color }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A2E' }} className="mb-2">{val.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[#F4845F] text-sm font-medium uppercase tracking-wider mb-2">Our Journey</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1A1A2E' }}>15 Years of Adventure</h2>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0077B6] to-[#2D9E6B]" style={{ transform: 'translateX(-50%)' }} />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex flex-col md:flex-row ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center md:items-start gap-4 md:gap-0`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-md z-10" style={{ backgroundColor: i % 2 === 0 ? '#0077B6' : '#2D9E6B' }} />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                      <div className="text-[#0077B6] font-bold text-lg mb-1">{m.year}</div>
                      <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1A1A2E' }} className="mb-2">{m.title}</h3>
                      <p className="text-gray-500 text-sm">{m.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-2/12" />
                  <div className="hidden md:block md:w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[#F4845F] text-sm font-medium uppercase tracking-wider mb-2">The People Behind the Magic</div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1A1A2E' }}>Meet Our Leadership Team</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">Global citizens, seasoned travelers, passionate storytellers — all united by a love for extraordinary journeys.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1.5 bg-[#0077B6] text-white text-xs px-2.5 py-1 rounded-full">
                      <Globe className="w-3 h-3" /> {member.trips} countries visited
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#1A1A2E' }} className="mb-0.5">{member.name}</h3>
                  <div className="text-[#0077B6] text-xs font-medium mb-1">{member.role}</div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                    <Globe className="w-3 h-3" /> {member.location}
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS ──────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-[#F4845F] text-sm font-medium uppercase tracking-wider mb-2">Recognition</div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#1A1A2E' }}>Awards & Certifications</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {awards.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-4 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <Award className="w-6 h-6 text-[#F4845F] mx-auto mb-2" />
                <div className="text-gray-800 text-xs font-semibold mb-0.5 leading-tight">{a.name}</div>
                <div className="text-gray-400 text-xs">{a.years}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#1A1A2E] relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #0077B6 0%, transparent 60%), radial-gradient(circle at 80% 50%, #F4845F 0%, transparent 60%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-4" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', fontWeight: 700 }}>
            Ready to Write Your Story?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">Join 50,000+ travelers who've trusted WanderQuest to turn their travel dreams into unforgettable realities.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/tours')}
              className="bg-[#F4845F] text-white px-8 py-4 rounded-xl font-medium transition-all inline-flex items-center gap-2 justify-center"
              style={{ minHeight: '52px' }}
            >
              Browse Our Tours <ArrowRight className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/contact')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-medium transition-all"
              style={{ minHeight: '52px' }}
            >
              Get In Touch
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
