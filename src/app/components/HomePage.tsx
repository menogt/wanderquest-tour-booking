import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Search, MapPin, Calendar, Users, Star, ArrowRight,
  Shield, Award, Headphones, ChevronDown, Play, ChevronLeft, ChevronRight,
} from 'lucide-react';
import {
  motion, useScroll, useTransform, useSpring,
  useMotionValue, useInView, AnimatePresence,
} from 'motion/react';
import { destinations, experiences, tours, stats } from '../data/tourData';
import { SriLankaSpotlight } from './SriLankaSpotlight';
import { AIPlannerSection } from './AIPlannerSection';

/* ─── Sri Lanka time (UTC+5:30) ────────────────────────── */
function getSLTime() {
  const now = new Date();
  return new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 3600000);
}

const SL_MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const SL_DAYS_SHORT = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const SL_DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

function HeroCalendar({
  startDate, endDate, onChange, onClose, triggerRect,
}: {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (start: Date | null, end: Date | null) => void;
  onClose: () => void;
  triggerRect: DOMRect | null;
}) {
  const sl = getSLTime();
  const todayY = sl.getFullYear(), todayM = sl.getMonth(), todayD = sl.getDate();

  const [viewY, setViewY] = useState(todayY);
  const [viewM, setViewM] = useState(todayM);
  const [slNow, setSlNow] = useState(sl);
  const [hovered, setHovered] = useState<Date | null>(null);

  useEffect(() => {
    const id = setInterval(() => setSlNow(getSLTime()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');
  const timeStr = `${pad(slNow.getHours())}:${pad(slNow.getMinutes())}:${pad(slNow.getSeconds())}`;

  /* Build calendar cells */
  const firstDay = new Date(viewY, viewM, 1).getDay();
  const daysInMonth = new Date(viewY, viewM + 1, 0).getDate();
  const daysInPrev = new Date(viewY, viewM, 0).getDate();

  const cells: { day: number; cur: boolean; date: Date }[] = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: daysInPrev - firstDay + 1 + i, cur: false, date: new Date(viewM === 0 ? viewY - 1 : viewY, viewM === 0 ? 11 : viewM - 1, daysInPrev - firstDay + 1 + i) });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, cur: true, date: new Date(viewY, viewM, d) });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, cur: false, date: new Date(viewM === 11 ? viewY + 1 : viewY, viewM === 11 ? 0 : viewM + 1, d) });
  }

  const prevMonth = () => { if (viewM === 0) { setViewM(11); setViewY(y => y - 1); } else setViewM(m => m - 1); };
  const nextMonth = () => { if (viewM === 11) { setViewM(0); setViewY(y => y + 1); } else setViewM(m => m + 1); };

  const today = new Date(todayY, todayM, todayD);
  const isPast = (d: Date) => d < today;

  /* Range selection logic */
  const handleClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      // No selection or complete range → start fresh
      onChange(date, null);
    } else {
      // Have start, picking end
      if (date < startDate) {
        // Clicked before start → make it the new start
        onChange(date, null);
      } else if (date.toDateString() === startDate.toDateString()) {
        // Clicked same day → clear
        onChange(null, null);
      } else {
        onChange(startDate, date);
        onClose();
      }
    }
  };

  /* Determine the "preview end" for hover highlight */
  const rangeEnd = endDate ?? (startDate && hovered && hovered > startDate ? hovered : null);

  const isStart = (d: Date) => !!startDate && d.toDateString() === startDate.toDateString();
  const isEnd = (d: Date) => !!rangeEnd && d.toDateString() === rangeEnd.toDateString();
  const inRange = (d: Date) => !!startDate && !!rangeEnd && d > startDate && d < rangeEnd;
  const isToday = (cell: { day: number; cur: boolean }) =>
    cell.cur && cell.day === todayD && viewM === todayM && viewY === todayY;

  /* Position */
  const CAL_WIDTH = 320;
  const style: React.CSSProperties = {
    position: 'fixed',
    zIndex: 9999,
    width: CAL_WIDTH,
    top: 88,
    left: triggerRect
      ? Math.max(8, Math.min(triggerRect.left, window.innerWidth - CAL_WIDTH - 8))
      : Math.max(8, (window.innerWidth - CAL_WIDTH) / 2),
  };

  /* Duration label */
  const nights = startDate && endDate
    ? Math.round((endDate.getTime() - startDate.getTime()) / 86400000)
    : null;

  const fmtShort = (d: Date) => `${d.getDate()} ${SL_MONTHS[d.getMonth()].slice(0, 3)}`;

  const footerText = () => {
    if (!startDate) return 'Select your check-in date';
    if (!endDate) return `Check-in: ${fmtShort(startDate)} — pick check-out`;
    return `${fmtShort(startDate)} → ${fmtShort(endDate)} · ${nights} night${nights !== 1 ? 's' : ''}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
      style={style}
    >
      {/* Live SL time header */}
      <div className="bg-gradient-to-r from-[#0a1628] to-[#0077B6] px-5 py-3 flex items-center justify-between">
        <div>
          <div className="text-white/50 text-[10px] uppercase tracking-widest">Sri Lanka Time · SLST</div>
          <div className="text-white font-mono text-lg font-bold tabular-nums mt-0.5">{timeStr}</div>
          <div className="text-white/60 text-xs mt-0.5">
            {SL_DAYS[slNow.getDay()]}, {slNow.getDate()} {SL_MONTHS[slNow.getMonth()]} {slNow.getFullYear()}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-xl">🇱🇰</span>
          <span className="text-white/40 text-[10px]">UTC+5:30</span>
        </div>
      </div>

      {/* Range pills — check-in / check-out */}
      <div className="flex gap-2 px-3 pt-3">
        <div className={`flex-1 rounded-xl px-3 py-2 border text-center transition-colors ${startDate ? 'border-[#0077B6] bg-[#0077B6]/5' : 'border-gray-200 bg-gray-50'}`}>
          <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Check-in</div>
          <div className={`text-sm font-semibold mt-0.5 ${startDate ? 'text-[#0077B6]' : 'text-gray-300'}`}>
            {startDate ? fmtShort(startDate) : '— —'}
          </div>
        </div>
        <div className="flex items-center text-gray-300 text-lg">→</div>
        <div className={`flex-1 rounded-xl px-3 py-2 border text-center transition-colors ${endDate ? 'border-[#F4845F] bg-[#F4845F]/5' : 'border-gray-200 bg-gray-50'}`}>
          <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Check-out</div>
          <div className={`text-sm font-semibold mt-0.5 ${endDate ? 'text-[#F4845F]' : 'text-gray-300'}`}>
            {endDate ? fmtShort(endDate) : '— —'}
          </div>
        </div>
      </div>

      {/* Month nav */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <button onClick={prevMonth} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
          <ChevronLeft className="w-4 h-4 text-gray-500" />
        </button>
        <button
          onClick={() => { setViewM(todayM); setViewY(todayY); }}
          className="text-sm font-semibold text-gray-800 hover:text-[#0077B6] transition-colors"
        >
          {SL_MONTHS[viewM]} {viewY}
        </button>
        <button onClick={nextMonth} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
          <ChevronRight className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 px-2">
        {SL_DAYS_SHORT.map(d => (
          <div key={`hl-${d}`} className="text-center text-[10px] font-semibold text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 px-2 pb-3">
        {cells.map((cell, idx) => {
          const past = isPast(cell.date);
          const today = isToday(cell);
          const start = cell.cur && isStart(cell.date);
          const end = cell.cur && isEnd(cell.date);
          const between = cell.cur && inRange(cell.date);
          const selectable = cell.cur && !past;

          return (
            <div
              key={`hc-${idx}`}
              className={`relative flex items-center justify-center h-8
                ${between ? 'bg-[#0077B6]/10' : ''}
                ${start && rangeEnd ? 'rounded-l-full bg-[#0077B6]/10' : ''}
                ${end && startDate ? 'rounded-r-full bg-[#0077B6]/10' : ''}
              `}
            >
              <button
                disabled={!selectable}
                onClick={() => selectable && handleClick(cell.date)}
                onMouseEnter={() => selectable && setHovered(cell.date)}
                onMouseLeave={() => setHovered(null)}
                className={`w-8 h-8 rounded-full text-xs font-medium transition-all relative z-10
                  ${!cell.cur ? 'text-gray-200 cursor-default' : ''}
                  ${cell.cur && past && !today ? 'text-gray-300 cursor-default' : ''}
                  ${start ? 'bg-[#0077B6] text-white shadow-sm' : ''}
                  ${end && !start ? 'bg-[#F4845F] text-white shadow-sm' : ''}
                  ${today && !start && !end ? 'ring-2 ring-[#0077B6] text-[#0077B6] font-bold' : ''}
                  ${selectable && !start && !end ? 'hover:bg-[#0077B6]/20 hover:text-[#0077B6] cursor-pointer' : ''}
                  ${between && !start && !end ? 'text-[#0077B6]' : ''}
                  ${cell.cur && !past && !start && !end && !between && !today ? 'text-gray-700' : ''}
                `}
              >
                {cell.day}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between">
        <span className="text-xs text-gray-500 font-medium">{footerText()}</span>
        {(startDate || endDate) && (
          <button
            onClick={() => onChange(null, null)}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors ml-2 shrink-0"
          >
            Clear
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Marquee review data (doubled for seamless loop) ───── */

const ROW1_BASE = [
  { id: 'r1a', name: 'Sarah J.', loc: 'New York, USA', tour: 'Bali Retreat', text: 'Absolutely life-changing. The villa, the volcano trek, the guides — perfection.', stars: 5, avatar: '👩‍💼' },
  { id: 'r1b', name: 'Marcus C.', loc: 'London, UK', tour: 'Patagonia Trek', text: 'Camping under the Milky Way with Torres del Paine above me. Surreal.', stars: 5, avatar: '👨‍🦱' },
  { id: 'r1c', name: 'Emma R.', loc: 'Barcelona, Spain', tour: 'Santorini Hop', text: 'The catamaran at sunset with local wine. Still dreaming about it.', stars: 5, avatar: '👩‍🎨' },
  { id: 'r1d', name: 'James T.', loc: 'Sydney, AU', tour: 'Maldives Paradise', text: 'The overwater bungalow and snorkeling with whale sharks — bucket list done!', stars: 5, avatar: '🧑‍💻' },
  { id: 'r1e', name: 'Priya M.', loc: 'Mumbai, IN', tour: 'Kyoto Culture', text: 'Our guide was exceptional. Will book every trip through WanderQuest.', stars: 5, avatar: '👩‍🔬' },
];
const ROW1 = [
  ...ROW1_BASE.map(r => ({ ...r, uid: `row1-a-${r.id}` })),
  ...ROW1_BASE.map(r => ({ ...r, uid: `row1-b-${r.id}` })),
];

const ROW2_BASE = [
  { id: 'r2a', name: 'Lars K.', loc: 'Stockholm, SE', tour: 'Swiss Alps Trek', text: 'Via ferrata at Grindelwald was the most exhilarating day of my life.', stars: 5, avatar: '🧗‍♂️' },
  { id: 'r2b', name: 'Ana S.', loc: 'São Paulo, BR', tour: 'Angkor Sunrise', text: 'Watching the sun rise over Angkor Wat — nothing prepares you for that.', stars: 5, avatar: '👩‍🦰' },
  { id: 'r2c', name: 'Tom H.', loc: 'Toronto, CA', tour: 'Maldives Escape', text: 'Worth every penny. The seaplane arrival alone made us cry with joy.', stars: 5, avatar: '🧑‍✈️' },
  { id: 'r2d', name: 'Yuki T.', loc: 'Tokyo, JP', tour: 'Bali Wellness', text: 'The yoga retreat and temple ceremonies were exactly what my soul needed.', stars: 5, avatar: '🧘‍♀️' },
  { id: 'r2e', name: 'Fatima A.', loc: 'Dubai, UAE', tour: 'Serengeti Safari', text: 'Seeing a lion family at sunset from our Land Rover. Unreal.', stars: 5, avatar: '👩‍🌾' },
];
const ROW2 = [
  ...ROW2_BASE.map(r => ({ ...r, uid: `row2-a-${r.id}` })),
  ...ROW2_BASE.map(r => ({ ...r, uid: `row2-b-${r.id}` })),
];

/* ─── Animated counter ─────────────────────────────────── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setDisplay(target); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>;
}

/* ─── Parallax image wrapper ────────────────────────────── */
function ParallaxImage({ src, speed = 0.3, className = '' }: { src: string; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const raw = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  const y = useSpring(raw, { stiffness: 80, damping: 20 });
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img src={src} alt="" style={{ y, scale: 1.2 }} className="w-full h-full object-cover" />
    </div>
  );
}

/* ─── Tilt card ─────────────────────────────────────────── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Hero section ──────────────────────────────────────── */
const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1623784373624-26fb62d3076d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    title: 'Discover the World\'s', highlight: 'Hidden Gems',
    sub: 'Curated tours to 120+ destinations — guided by local experts.',
  },
  {
    image: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    title: 'Sri Lanka —', highlight: 'Pearl of the Indian Ocean',
    sub: 'Ancient kingdoms, misty tea hills, and wild leopards await. Our home, your adventure.',
    badge: '🇱🇰 Now Featuring',
  },
  {
    image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    title: 'Your Dream', highlight: 'Island Escape',
    sub: 'Luxury beach experiences crafted uniquely for you.',
  },
  {
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920',
    title: 'Conquer', highlight: 'Epic Summits',
    sub: 'Adventure trekking tours for every level of explorer.',
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const calTriggerRef = useRef<HTMLButtonElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [searchDest, setSearchDest] = useState('');
  const [calOpen, setCalOpen] = useState(false);
  const [calRect, setCalRect] = useState<DOMRect | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  /* Close calendar on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        calTriggerRef.current && !calTriggerRef.current.contains(target) &&
        calendarRef.current && !calendarRef.current.contains(target)
      ) setCalOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Hero parallax */
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroScroll, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.08]);

  /* Auto-advance hero */
  useEffect(() => {
    const t = setInterval(() => setSlideIndex(i => (i + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const featuredTours = tours.filter(t => t.featured);

  return (
    <div className="w-full bg-white">

      {/* ══════════════════════════════════════════════════════
          HERO — full-screen parallax
      ══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[640px] overflow-hidden">
        {/* Parallax backgrounds */}
        {heroSlides.map((slide, i) => (
          <motion.div
            key={slide.image}
            className="absolute inset-0"
            animate={{ opacity: i === slideIndex ? 1 : 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{ zIndex: i === slideIndex ? 1 : 0 }}
          >
            <motion.img
              src={slide.image}
              alt=""
              style={{ y: heroY, scale: heroScale }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        ))}

        {/* Multi-layer gradient */}
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 100%)' }} />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 h-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 max-w-3xl"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm mb-5 border border-white/25"
              >
                {heroSlides[slideIndex].badge ? (
                  <>{heroSlides[slideIndex].badge}</>
                ) : (
                  <><Star className="w-4 h-4 fill-[#F4845F] text-[#F4845F]" />
                  Rated #1 Tour Operator · 50,000+ Happy Travelers</>
                )}
              </motion.div>

              <h1 className="text-white mb-5" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.02em' }}>
                {heroSlides[slideIndex].title}{' '}
                <span className="text-[#F4845F] relative">
                  {heroSlides[slideIndex].highlight}
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <motion.path
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      d="M2 9 Q75 2 150 8 Q225 14 298 6" stroke="#F4845F" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-white/85 text-xl leading-relaxed">
                {heroSlides[slideIndex].sub}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row gap-2 max-w-4xl"
            style={{ border: '1px solid rgba(255,255,255,0.5)' }}
          >
            <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-xl">
              <MapPin className="w-5 h-5 text-[#0077B6] shrink-0" />
              <div className="flex-1">
                <div className="text-xs text-gray-400 font-medium">Where to?</div>
                <input
                  type="text"
                  placeholder="Bali, Patagonia, Maldives..."
                  value={searchDest}
                  onChange={e => setSearchDest(e.target.value)}
                  className="w-full text-sm text-gray-800 outline-none bg-transparent placeholder-gray-400"
                />
              </div>
            </div>
            <div ref={calendarRef} className="relative">
              <button
                ref={calTriggerRef}
                onClick={() => {
                  if (calTriggerRef.current) setCalRect(calTriggerRef.current.getBoundingClientRect());
                  setCalOpen(o => !o);
                }}
                className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl md:w-44 w-full transition-colors text-left"
              >
                <Calendar className="w-5 h-5 text-[#0077B6] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-400 font-medium">When?</div>
                  <div className={`text-sm truncate ${startDate ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                    {startDate && endDate
                      ? `${startDate.getDate()} ${SL_MONTHS[startDate.getMonth()].slice(0,3)} → ${endDate.getDate()} ${SL_MONTHS[endDate.getMonth()].slice(0,3)}`
                      : startDate
                        ? `${startDate.getDate()} ${SL_MONTHS[startDate.getMonth()].slice(0,3)} → ...`
                        : 'Select dates'}
                  </div>
                </div>
              </button>
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 rounded-xl md:w-36">
              <Users className="w-5 h-5 text-[#0077B6] shrink-0" />
              <div>
                <div className="text-xs text-gray-400 font-medium">Travelers</div>
                <input type="text" placeholder="2 Adults" className="w-full text-sm text-gray-600 outline-none bg-transparent placeholder-gray-400" />
              </div>
            </div>
            <button
              onClick={() => navigate('/tours')}
              className="bg-[#F4845F] hover:bg-[#e06e48] text-white px-6 py-3.5 rounded-xl flex items-center gap-2 text-sm font-semibold transition-all hover:shadow-lg shrink-0"
            >
              <Search className="w-4 h-4" /> Search Tours
            </button>
          </motion.div>

          {/* Quick category pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2 mt-5"
          >
            {['🏖️ Beach', '🏔️ Mountains', '🏛️ Culture', '🌿 Nature', '✨ Luxury', '🍷 Wine Tours'].map(tag => (
              <button
                key={tag}
                onClick={() => navigate('/tours')}
                className="bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full transition-all border border-white/20 hover:border-white/40 hover:scale-105"
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* AI Planner micro-CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-3 mt-5"
          >
            <span className="text-white/50 text-sm">Need help planning your full route?</span>
            <a
              href="https://wanderroute.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white text-sm px-4 py-1.5 rounded-full transition-all hover:scale-105 font-medium"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4845F] animate-pulse" />
              Plan with AI
            </a>
          </motion.div>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={`slide-dot-${i}`} onClick={() => setSlideIndex(i)} className={`transition-all duration-300 rounded-full bg-white ${i === slideIndex ? 'w-8 h-2' : 'w-2 h-2 opacity-50'}`} />
          ))}
        </div>

        {/* Slide arrows */}
        <button onClick={() => setSlideIndex((slideIndex - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => setSlideIndex((slideIndex + 1) % heroSlides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110">
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-white/50 text-xs tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
          <ChevronDown className="w-4 h-4 text-white/50" />
        </motion.div>

      </section>

      {/* ══════════════════════════════════════════════════════
          STATS — animated counters on dark bg
      ══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#0077B6] py-14 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 0%, transparent 50%), radial-gradient(circle at 80% 50%, #F4845F 0%, transparent 50%)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: 50000, suffix: '+', label: 'Happy Travelers', symbol: '✈️' },
              { value: 120, suffix: '+', label: 'Destinations', symbol: '🌍' },
              { value: 450, suffix: '+', label: 'Unique Tours', symbol: '🗺️' },
              { value: 4.9, suffix: '★', label: 'Average Rating', symbol: '⭐' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="text-3xl mb-1">{s.symbol}</div>
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  {s.value < 10 ? s.value : <Counter target={s.value} />}{s.suffix}
                </div>
                <div className="text-blue-100 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TRENDING DESTINATIONS — parallax depth grid
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-[#F4845F] text-sm font-semibold uppercase tracking-widest mb-2">Explore the World</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: '#1A1A2E', lineHeight: 1.15 }}>
                Trending<br />Destinations
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link to="/destinations" className="hidden md:flex items-center gap-2 text-[#0077B6] font-medium hover:gap-3 transition-all group">
                View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Asymmetric parallax grid */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-4" style={{ gridTemplateRows: 'auto' }}>
            {/* Large hero card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="col-span-2 md:col-span-7 row-span-2 relative rounded-3xl overflow-hidden cursor-pointer group"
              style={{ height: '480px' }}
              onClick={() => navigate('/destinations')}
            >
              <ParallaxImage src={destinations[0].image} speed={0.15} className="absolute inset-0 w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-[#0077B6]/0 group-hover:bg-[#0077B6]/10 transition-colors duration-500" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-8"
                initial={{ y: 10, opacity: 0.8 }}
                whileHover={{ y: 0, opacity: 1 }}
              >
                <div className="text-white/70 text-sm mb-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{destinations[0].country}</div>
                <h3 className="text-white mb-1" style={{ fontSize: '2rem', fontWeight: 800 }}>{destinations[0].name}</h3>
                <p className="text-white/70 mb-4">{destinations[0].tagline}</p>
                <div className="flex items-center gap-3">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full">{destinations[0].toursCount} tours</span>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-1.5 text-white text-sm font-medium"
                  >
                    Explore <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>

            {/* Small cards */}
            {destinations.slice(1, 5).map((dest, i) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 30 + i * 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                className="col-span-1 md:col-span-5 relative rounded-2xl overflow-hidden cursor-pointer group"
                style={{ height: '228px' }}
                onClick={() => navigate('/destinations')}
              >
                <ParallaxImage src={dest.image} speed={0.1} className="absolute inset-0 w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="text-white/60 text-xs mb-0.5">{dest.country}</div>
                  <div className="text-white font-bold text-lg">{dest.name}</div>
                  <div className="text-white/50 text-xs">{dest.toursCount} tours</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          AI PLANNER SECTION
      ══════════════════════════════════════════════════════ */}
      <AIPlannerSection />

      {/* ══════════════════════════════════════════════════════
          SCROLL-JOURNEY — snapped immersive alternating sections
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#0a1628]">
        {[
          {
            image: 'https://images.unsplash.com/photo-1501554728187-ce583db33af7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
            tag: '🏔️ Adventure & Trekking',
            title: 'Push Your Limits on Epic Expeditions',
            desc: 'Certified guides, world-class routes, and mountain vistas that will stop your breath — and restart it again.',
            cta: 'Explore Adventures',
            accent: '#0077B6',
            align: 'left',
          },
          {
            image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
            tag: '🌊 Beach & Island',
            title: 'Disappear Into Paradise',
            desc: 'Overwater bungalows, crystal lagoons, and sunsets that make time irrelevant. The ocean is calling.',
            cta: 'Find Beach Escapes',
            accent: '#2D9E6B',
            align: 'right',
          },
          {
            image: 'https://images.unsplash.com/photo-1444194563460-454833ba6005?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
            tag: '🏛️ Cultural & Heritage',
            title: 'Walk Through Living History',
            desc: 'Ancient temples, local ceremonies, Michelin-starred home kitchens. Culture isn\'t just seen — it\'s felt.',
            cta: 'Explore Culture Tours',
            accent: '#8B5CF6',
            align: 'left',
          },
        ].map((item, i) => (
          <motion.div
            key={item.tag}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className={`flex flex-col ${item.align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} min-h-[500px] md:min-h-[600px]`}
          >
            {/* Image half — parallax */}
            <div className="flex-1 relative overflow-hidden min-h-[320px] md:min-h-0">
              <ParallaxImage src={item.image} speed={0.2} className="absolute inset-0 w-full h-full" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,22,40,0.3), rgba(10,22,40,0.05))' }} />

              {/* Floating number */}
              <div className="absolute top-8 left-8 text-white/10" style={{ fontSize: '8rem', fontWeight: 900, lineHeight: 1 }}>
                0{i + 1}
              </div>
            </div>

            {/* Text half */}
            <div className="flex-1 flex items-center px-8 md:px-16 py-16 md:py-0" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #0d1f3c 100%)' }}>
              <motion.div
                initial={{ opacity: 0, x: item.align === 'right' ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-md"
              >
                <div className="inline-flex items-center gap-2 text-sm font-medium mb-5 px-3 py-1.5 rounded-full border" style={{ color: item.accent, borderColor: item.accent + '40', background: item.accent + '15' }}>
                  {item.tag}
                </div>
                <h2 className="text-white mb-5" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', fontWeight: 800, lineHeight: 1.2 }}>
                  {item.title}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">{item.desc}</p>

                {/* Mini stat row */}
                <div className="flex gap-8 mb-8 pb-8 border-b border-white/10">
                  {[['450+', 'Tours'], ['120+', 'Destinations'], ['4.9★', 'Rating']].map(([v, l]) => (
                    <div key={l}>
                      <div className="text-white font-bold text-lg">{v}</div>
                      <div className="text-gray-500 text-xs">{l}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate('/experiences')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all hover:gap-3 hover:shadow-lg group"
                  style={{ backgroundColor: item.accent }}
                >
                  {item.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ══════════════════════════════════════════════════════
          SRI LANKA SPOTLIGHT
      ══════════════════════════════════════════════════════ */}
      <SriLankaSpotlight />

      {/* ══════════════════════════════════════════════════════
          FEATURED TOURS — 3D tilt cards with stagger
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-[#F4845F] text-sm font-semibold uppercase tracking-widest mb-2">Hand-Picked</div>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: '#1A1A2E' }}>
                Featured Tours
              </h2>
              <p className="text-gray-500 mt-3 max-w-md mx-auto">Our travel experts' top picks for unforgettable journeys this season.</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTours.map((tour, i) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="h-full">
                  <div
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 cursor-pointer h-full flex flex-col border border-gray-100"
                    onClick={() => navigate(`/tours/${tour.id}`)}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <motion.img
                        src={tour.image}
                        alt={tour.title}
                        whileHover={{ scale: 1.07 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      {tour.badge && (
                        <span className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-semibold ${
                          tour.badge === 'Best Seller' ? 'bg-[#F4845F] text-white' :
                          tour.badge === 'Top Rated' ? 'bg-[#2D9E6B] text-white' :
                          'bg-[#1A1A2E] text-white'
                        }`}>{tour.badge}</span>
                      )}
                      {tour.originalPrice && (
                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                          SAVE ${(tour.originalPrice - tour.price).toLocaleString()}
                        </span>
                      )}
                      <div className="absolute bottom-3 left-3 flex gap-2">
                        <span className="bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">{tour.duration}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-full text-white backdrop-blur-sm ${
                          tour.difficulty === 'Easy' ? 'bg-green-500/70' : tour.difficulty === 'Moderate' ? 'bg-amber-500/70' : 'bg-red-500/70'
                        }`}>{tour.difficulty}</span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                        <MapPin className="w-3 h-3" /> {tour.destination}, {tour.country}
                      </div>
                      <h3 className="text-gray-900 mb-3 flex-1 line-clamp-2" style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.4 }}>
                        {tour.title}
                      </h3>
                      <div className="flex items-center gap-1.5 mb-4">
                        <div className="flex">{Array.from({ length: 5 }, (_, j) => <Star key={`${tour.id}-star-${j}`} className={`w-3.5 h-3.5 ${j < Math.floor(tour.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />)}</div>
                        <span className="text-xs text-gray-500 font-medium">{tour.rating}</span>
                        <span className="text-gray-300 text-xs">({tour.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          {tour.originalPrice && <div className="text-xs text-gray-400 line-through">${tour.originalPrice.toLocaleString()}</div>}
                          <div><span className="text-[#0077B6] font-bold text-xl">${tour.price.toLocaleString()}</span><span className="text-gray-400 text-xs">/person</span></div>
                        </div>
                        <button className="bg-[#F4845F] hover:bg-[#e06e48] text-white text-sm px-5 py-2.5 rounded-xl font-medium transition-all hover:shadow-md">
                          View Tour
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/tours"
              className="inline-flex items-center gap-2 border-2 border-[#0077B6] text-[#0077B6] hover:bg-[#0077B6] hover:text-white px-8 py-3.5 rounded-xl font-semibold transition-all group"
            >
              See All 450+ Tours <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY WANDERQUEST — icon feature strips
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="text-[#F4845F] text-sm font-semibold uppercase tracking-widest mb-2">Why WanderQuest</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: '#1A1A2E' }}>Travel With Confidence</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Secure & Flexible', desc: 'SSL-encrypted booking, free cancellation up to 48h, and a full money-back guarantee. Travel risk-free.', color: '#0077B6', bg: '#EFF8FF' },
              { icon: Award, title: 'Expert Local Guides', desc: 'Every tour is led by certified local experts who bring culture, nature, and history to life with insider passion.', color: '#2D9E6B', bg: '#F0FDF4' },
              { icon: Headphones, title: '24/7 Support', desc: 'Our dedicated team is on call before, during, and after your trip — so you\'re never alone out there.', color: '#F4845F', bg: '#FFF5F0' },
            ].map(({ icon: Icon, title, desc, color, bg }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="relative rounded-2xl p-8 text-center overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                style={{ backgroundColor: bg }}
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="mb-3" style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1A1A2E' }}>{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          REVIEWS — infinite marquee scroll
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#F8F9FA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-[#F4845F] text-sm font-semibold uppercase tracking-widest mb-2">Traveler Stories</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, color: '#1A1A2E' }}>What Our Travelers Say</h2>
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {Array.from({ length: 5 }, (_, i) => <Star key={`hero-star-${i}`} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
              <span className="text-gray-600 text-sm ml-1 font-medium">4.9 / 5 · 12,000+ reviews</span>
            </div>
          </motion.div>
        </div>

        {/* Marquee row 1 — left */}
        <div className="relative mb-4">
          <motion.div
            className="flex gap-4"
            animate={{ x: [0, '-50%'] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            style={{ width: 'max-content' }}
          >
            {ROW1.map(r => (
              <div key={r.uid} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 shrink-0" style={{ width: '300px' }}>
                <div className="flex mb-2">{Array.from({ length: r.stars }, (_, j) => <Star key={`${r.uid}-s${j}`} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-gray-700 text-sm italic mb-4 leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0077B6]/10 flex items-center justify-center text-lg">{r.avatar}</div>
                  <div>
                    <div className="text-gray-900 text-sm font-semibold">{r.name}</div>
                    <div className="text-gray-400 text-xs">{r.loc} · {r.tour}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Marquee row 2 — right (reverse) */}
        <div className="relative">
          <motion.div
            className="flex gap-4"
            animate={{ x: ['-50%', 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            style={{ width: 'max-content' }}
          >
            {ROW2.map(r => (
              <div key={r.uid} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 shrink-0" style={{ width: '300px' }}>
                <div className="flex mb-2">{Array.from({ length: r.stars }, (_, j) => <Star key={`${r.uid}-s${j}`} className="w-4 h-4 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-gray-700 text-sm italic mb-4 leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#F4845F]/10 flex items-center justify-center text-lg">{r.avatar}</div>
                  <div>
                    <div className="text-gray-900 text-sm font-semibold">{r.name}</div>
                    <div className="text-gray-400 text-xs">{r.loc} · {r.tour}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA — full-screen parallax finale
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '560px' }}>
        <ParallaxImage
          src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          speed={0.25}
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,119,182,0.92) 0%, rgba(10,22,40,0.88) 100%)' }} />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[560px] text-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 text-white text-sm px-4 py-1.5 rounded-full mb-6">
              <Play className="w-3.5 h-3.5 fill-[#F4845F] text-[#F4845F]" /> Start your journey today
            </div>
            <h2 className="text-white mb-5" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Your Next Adventure<br />
              <span className="text-[#F4845F]">Starts Right Now</span>
            </h2>
            <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              Join 50,000+ travelers who've discovered that the world is more beautiful — and more accessible — than they ever imagined.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/tours"
                  className="inline-flex items-center gap-2 bg-[#F4845F] hover:bg-[#e06e48] text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:shadow-2xl hover:shadow-orange-500/30"
                >
                  Browse All Tours <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg border border-white/30 transition-all"
                >
                  Talk to an Expert
                </Link>
              </motion.div>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/50 text-xs">
              {['✓ Free Cancellation', '✓ Best Price Guarantee', '✓ Certified Local Guides', '✓ 24/7 Support'].map(t => (
                <span key={t} className="text-white/70">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Calendar — fades with hero bar on scroll */}
      <motion.div style={{ opacity: heroOpacity }}>
        <AnimatePresence>
          {calOpen && (
            <HeroCalendar
              startDate={startDate}
              endDate={endDate}
              onChange={(s, e) => { setStartDate(s); setEndDate(e); }}
              onClose={() => setCalOpen(false)}
              triggerRect={calRect}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
