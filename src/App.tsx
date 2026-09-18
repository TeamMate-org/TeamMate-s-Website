import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown, Menu, Star, ArrowRight, ArrowLeft, ArrowUpRight,
  BarChart3, Settings, TrendingDown, Shield, Box,
  Twitter, Instagram, Linkedin, X, Loader2, CheckCircle,
  Fingerprint, Sparkles, Clock, Blocks, Link, Users,
  Mic, Brain, Mail, UserCheck, FileText, Megaphone, Cpu, HeadphonesIcon
} from 'lucide-react';

import { EtherealShadow } from './components/ui/etheral-shadow';
import { LeadModal } from './components/LeadModal';
import { QuizModal } from './components/QuizModal';

/* ─── Focus style helper ─────────────────────────────── */
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/* ─── useCountUp hook ────────────────────────────────── */
function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const linear = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - linear, 3); // ease-out cubic
      setCount(Math.floor(eased * target));
      if (linear < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ─── useInView hook ─────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Navbar ─────────────────────────────────────────── */
export const Navbar = ({ onOpenModal, hideNavLinks, ctaText = 'Agendar Conversa' }: { onOpenModal: () => void, hideNavLinks?: boolean, ctaText?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const navLinks = [
    { label: 'Serviços', href: '/#cases' },
    { label: 'Processo', href: '/#process' },
    { label: 'Portfólio', href: '/portfolio' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Testemunhos', href: '/#testimonials' },
    { label: 'Contacto', href: '/contactos' },
  ];

  const isLinkActive = (href: string) =>
    href.startsWith('/#')
      ? activeSection === href.substring(2)
      : href === window.location.pathname;

  useEffect(() => {
    if (window.location.pathname !== '/') return;

    const navSectionIds = ['cases', 'process', 'testimonials'];

    const handleScroll = () => {
      let current = '';
      const scrollY = window.scrollY;

      for (const section of navSectionIds) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollY >= top - 250 && scrollY < top + height - 250) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetId = href.startsWith('/#') ? href.substring(1) : href;
    if (targetId.startsWith('#') && targetId !== '#') {
      if (window.location.pathname === '/') {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Full-width fixed wrapper, navbar centered at max-w-7xl */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
        <nav
          className="w-full max-w-7xl bg-[#0a0a0a]/90 backdrop-blur-md rounded-2xl pointer-events-auto"
          role="navigation"
          aria-label="Navegação principal"
        >
          <div className="px-6 h-[72px] flex items-center justify-between">
            {/* TeamMate Logo */}
            <a href="/" aria-label="TeamMate — página inicial" className={`flex items-center ${focusRing} rounded`}>
              <img
                src="/images/Logo TeamMate.svg"
                alt="TeamMate"
                className="h-14 md:h-16 w-auto"
                draggable={false}
              />
            </a>

            {/* Desktop nav links — centred */}
            {!hideNavLinks && (
              <ul className="hidden lg:flex items-center gap-6 xl:gap-8" role="list">
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link.href);

                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNav(e, link.href)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`text-base font-display font-medium transition-colors duration-200 cursor-pointer ${focusRing} rounded ${isActive ? 'text-primary' : 'text-gray-400 hover:text-white'}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center md:ml-auto md:mr-3 lg:ml-0 lg:mr-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/50 to-blue-400/50 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-500" aria-hidden="true"></div>
                <button
                  onClick={onOpenModal}
                  className={`relative px-5 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-xl transition-all duration-300 cursor-pointer ${focusRing}`}
                >
                  {ctaText}
                </button>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              className={`flex items-center justify-center w-10 h-10 lg:hidden text-white cursor-pointer ${focusRing} rounded`}
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-0 z-[49] bg-[#0a0a0a] pt-[84px] px-6 pb-6 flex flex-col gap-4 mobile-menu-enter"
          role="menu"
        >
          {/* Mobile nav links */}
          {!hideNavLinks && navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              role="menuitem"
              onClick={(e) => handleNav(e, link.href)}
              aria-current={isLinkActive(link.href) ? 'page' : undefined}
              className={`text-lg font-display font-medium ${isLinkActive(link.href) ? 'text-primary' : 'text-gray-300 hover:text-white'} py-3 border-b border-white/5 transition-colors duration-200 cursor-pointer ${focusRing} rounded`}
            >
              {link.label}
            </a>
          ))}

          <div className="relative group mt-2 w-full">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/50 to-blue-400/50 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-500" aria-hidden="true"></div>
            <button
              className={`relative w-full px-5 py-3.5 text-sm font-medium text-white bg-primary hover:bg-primary-hover rounded-xl transition-all duration-300 cursor-pointer ${focusRing}`}
              onClick={() => { setIsOpen(false); onOpenModal(); }}
            >
              {ctaText}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

/* ─── Hero ───────────────────────────────────────────── */
const Hero = ({ onOpenModal, onOpenQuizModal }: { onOpenModal: () => void, onOpenQuizModal: () => void }) => {
  return (
    <section className="relative pt-32 md:pt-40 pb-24 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[85vh]">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 flex items-center justify-center">
        <div className="w-[300%] h-[150%] md:w-full md:h-full flex-shrink-0">
          <EtherealShadow
            color="rgba(30, 144, 210, 0.75)"
            animation={{ scale: 100, speed: 90 }}
            noise={{ opacity: 0.6, scale: 1.5 }}
          />
        </div>
      </div>
      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center z-10">

        {/* Main Text */}
        <h1
          className="text-5xl sm:text-6xl md:text-[5.5rem] font-display font-medium tracking-tight leading-[0.95] mb-8 animate-slide-up-fade"
          style={{ animationDelay: '100ms' }}
        >
          <span className="text-gray-500 block">O futuro</span>
          <span className="text-gray-500 block">das empresas</span>
          <span className="text-white flex items-center justify-center flex-wrap mt-1">
            é
            <span className="inline-flex items-center justify-center mx-4 text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]">
              <img src="/images/finger_print.svg" alt="Impressão digital" className="w-[0.8em] h-[0.8em] object-contain" />
            </span>
            humano +
            <span className="inline-flex items-center justify-center mx-4 text-primary drop-shadow-[0_0_15px_rgba(5,102,141,0.5)]">
              <img src="/images/blue_star.webp" alt="Estrela" className="w-[0.8em] h-[0.8em] object-contain" />
            </span>
            IA
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed animate-slide-up-fade"
          style={{ animationDelay: '300ms' }}
        >
          Automatizamos os processos repetitivos da tua empresa para que a tua equipa foque no que realmente importa — crescer.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 animate-slide-up-fade"
          style={{ animationDelay: '500ms' }}
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/50 to-blue-400/50 rounded-xl blur opacity-25 group-hover:opacity-60 group-active:opacity-60 transition duration-500" aria-hidden="true"></div>
            <button
              onClick={onOpenModal}
              className={`relative px-8 py-4 bg-primary hover:bg-primary-hover active:scale-95 md:active:scale-100 text-white font-medium rounded-xl transition-all duration-300 cursor-pointer border border-transparent ${focusRing}`}
            >
              Agendar Conversa Gratuita
            </button>
          </div>

          <button
            onClick={onOpenQuizModal}
            className={`px-8 py-4 border border-white/15 hover:bg-white/5 active:bg-white/5 active:scale-95 md:active:scale-100 text-white font-medium rounded-xl transition-all duration-300 cursor-pointer ${focusRing}`}
          >
            A IA é para mim?
          </button>
        </div>

      </div>
    </section>
  );
};

/* ─── Brand Ticker ───────────────────────────────────── */
const brands = [
  { name: 'Salesforce', logo: '/images/salesforce_logo.svg' },
  { name: 'HubSpot', logo: '/images/hubspot_icon.svg' },
  { name: 'Slack', logo: '/images/slack_logo.svg' },
  { name: 'Google Drive', logo: '/images/drive_logo.svg' },
  { name: 'Notion', logo: '/images/notion_icon.svg' },
  { name: 'Zapier', logo: '/images/zapier_logo.svg' },
  { name: 'Gmail', logo: '/images/gmail_logo.svg' },
  { name: 'Stripe', logo: '/images/stripe_logo.svg' },
  { name: 'Google Calendar', logo: '/images/calendar_logo.svg' },
  { name: 'Figma', logo: '/images/figma_logo.svg' },
];

const BrandTicker = () => (
  <section className="py-10 border-y border-white/5 bg-white/[0.02] overflow-hidden" aria-label="Empresas parceiras">
    <div className="marquee-wrapper">
      <div className="animate-marquee flex gap-14 items-center whitespace-nowrap" aria-hidden="true">
        {[...brands, ...brands, ...brands].map((brand, i) => (
          <div key={i} className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity duration-300">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-5 w-auto object-contain"
              draggable={false}
            />
            <span className="font-display font-semibold text-base text-white tracking-wide">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Animated Clock Card ────────────────────────────── */
const ClockCard = () => {
  const [hovered, setHovered] = useState(false);
  const [minuteAngle, setMinuteAngle] = useState(60);
  const [hourAngle, setHourAngle] = useState(-60);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!hovered) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
      return;
    }
    const loop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const elapsed = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;
      setMinuteAngle(prev => prev + (360 / 4000) * elapsed);
      setHourAngle(prev => prev + (360 / 24000) * elapsed);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [hovered]);

  return (
    <div
      className="relative col-span-1 sm:col-span-6 lg:col-span-2 flex flex-col items-center justify-between overflow-hidden p-8 rounded-3xl bg-surface border border-border hover:border-white/20 transition-colors duration-300 text-center cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="mb-8 flex items-center justify-center">
        <svg viewBox="0 0 80 80" className="w-24 h-24" aria-hidden="true">
          <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <circle
            cx="40" cy="40" r="36"
            fill="none"
            stroke="var(--color-primary, #3b82f6)"
            strokeWidth="4"
            strokeDasharray="226"
            strokeDashoffset="56"
            strokeLinecap="round"
            style={{ opacity: hovered ? 0.3 : 0, transition: 'opacity 0.5s' }}
          />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="40"
              y1={deg % 90 === 0 ? "10" : "12"}
              x2="40"
              y2={deg % 90 === 0 ? "15" : "14"}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={deg % 90 === 0 ? "2.5" : "1.5"}
              strokeLinecap="round"
              transform={`rotate(${deg} 40 40)`}
            />
          ))}
          <line
            x1="40" y1="40" x2="40" y2="22"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ transformOrigin: '40px 40px', transform: `rotate(${hourAngle}deg)` }}
          />
          <line
            x1="40" y1="40" x2="40" y2="16"
            stroke="var(--color-primary, #3b82f6)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ transformOrigin: '40px 40px', transform: `rotate(${minuteAngle}deg)` }}
          />
          <circle cx="40" cy="40" r="3" fill="white" />
          <circle cx="40" cy="40" r="1.5" fill="var(--color-primary, #3b82f6)" />
        </svg>
      </div>
      <div className="relative z-10">
        <h3 className="text-2xl font-display font-semibold mb-3">Tempo devolvido à tua equipa</h3>
        <p className="text-gray-400 leading-relaxed text-base">
          As tuas equipas deixam de fazer trabalho repetitivo e passam a focar no que realmente importa.
        </p>
      </div>
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl transition-colors duration-500"
        style={{ backgroundColor: hovered ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.1)' }}
      />
    </div>
  );
};

/* ─── Hundred Percent Card ──────────────────────────── */
const HundredPercentCard = () => {
  const [drawKey, setDrawKey] = useState(0);

  return (
    <div
      className="relative col-span-1 sm:col-span-3 lg:col-span-2 flex flex-col items-center justify-between overflow-hidden p-8 rounded-3xl bg-surface border border-border hover:border-white/20 transition-colors duration-300 text-center cursor-default"
      onMouseEnter={() => setDrawKey(k => k + 1)}
    >
      <div className="mb-8 flex items-center justify-center">
        {/* Organic ellipse + 100% text */}
        <div className="relative flex items-center justify-center h-24">
          <svg
            key={drawKey}
            viewBox="0 0 254 104"
            className="absolute w-[220px]"
            aria-hidden="true"
            fill="none"
          >
            <style>{`
              @keyframes draw-ellipse {
                from { stroke-dashoffset: 950; }
                to   { stroke-dashoffset: 0; }
              }
              .ellipse-path {
                stroke-dasharray: 950;
                stroke-dashoffset: 0;
                animation: draw-ellipse 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              }
            `}</style>
            <path
              className="ellipse-path"
              d="M112.891 97.7022C140.366 97.0802 171.004 94.6715 201.087 87.5116C210.43 85.2881 219.615 82.6412 228.284 78.2473C232.198 76.3179 235.905 73.9942 239.348 71.3124C241.85 69.2557 243.954 66.7571 245.555 63.9408C249.34 57.3235 248.281 50.5341 242.498 45.6109C239.033 42.7237 235.228 40.2703 231.169 38.3054C219.443 32.7209 207.141 28.4382 194.482 25.534C184.013 23.1927 173.358 21.7755 162.64 21.2989C161.376 21.3512 160.113 21.181 158.908 20.796C158.034 20.399 156.857 19.1682 156.962 18.4535C157.115 17.8927 157.381 17.3689 157.743 16.9139C158.104 16.4588 158.555 16.0821 159.067 15.8066C160.14 15.4683 161.274 15.3733 162.389 15.5286C179.805 15.3566 196.626 18.8373 212.998 24.462C220.978 27.2494 228.798 30.4747 236.423 34.1232C240.476 36.1159 244.202 38.7131 247.474 41.8258C254.342 48.2578 255.745 56.9397 251.841 65.4892C249.793 69.8582 246.736 73.6777 242.921 76.6327C236.224 82.0192 228.522 85.4602 220.502 88.2924C205.017 93.7847 188.964 96.9081 172.738 99.2109C153.442 101.949 133.993 103.478 114.506 103.79C91.1468 104.161 67.9334 102.97 45.1169 97.5831C36.0094 95.5616 27.2626 92.1655 19.1771 87.5116C13.839 84.5746 9.1557 80.5802 5.41318 75.7725C-0.54238 67.7259 -1.13794 59.1763 3.25594 50.2827C5.82447 45.3918 9.29572 41.0315 13.4863 37.4319C24.2989 27.5721 37.0438 20.9681 50.5431 15.7272C68.1451 8.8849 86.4883 5.1395 105.175 2.83669C129.045 0.0992292 153.151 0.134761 177.013 2.94256C197.672 5.23215 218.04 9.01724 237.588 16.3889C240.089 17.3418 242.498 18.5197 244.933 19.6446C246.627 20.4387 247.725 21.6695 246.997 23.615C246.455 25.1105 244.814 25.5605 242.63 24.5811C230.322 18.9961 217.233 16.1904 204.117 13.4376C188.761 10.3438 173.2 8.36665 157.558 7.52174C129.914 5.70776 102.154 8.06792 75.2124 14.5228C60.6177 17.8788 46.5758 23.2977 33.5102 30.6161C26.6595 34.3329 20.4123 39.0673 14.9818 44.658C12.9433 46.8071 11.1336 49.1622 9.58207 51.6855C4.87056 59.5336 5.61172 67.2494 11.9246 73.7608C15.2064 77.0494 18.8775 79.925 22.8564 82.3236C31.6176 87.7101 41.3848 90.5291 51.3902 92.5804C70.6068 96.5773 90.0219 97.7419 112.891 97.7022Z"
              stroke="var(--color-primary, #3b82f6)"
              strokeWidth="2"
            />
          </svg>
          <span className="relative z-10 text-5xl font-display font-semibold text-white">
            100%
          </span>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-display font-semibold mb-3">100% personalizado ao teu negócio</h3>
        <p className="text-gray-400 leading-relaxed text-base">
          Não adaptamos o teu negócio à ferramenta. Construímos a ferramenta à medida do teu negócio.
        </p>
      </div>
    </div>
  );
};

/* ─── Line Chart Card ──────────────────────────────────── */
const LINE_PATH = "M4,72 C18,72 22,40 36,38 C50,36 54,58 68,54 C82,50 86,20 100,16 C114,12 118,44 132,40 C146,36 150,24 164,18 C178,12 182,30 196,28 C210,26 214,10 228,6";

const LineChartCard = () => {
  const [hovered, setHovered] = useState(false);
  const [dotPos, setDotPos] = useState<{ x: number; y: number } | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    if (!hovered) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      progressRef.current = 0;
      setDotPos(null);
      return;
    }

    if (!pathRef.current) return;
    const totalLength = pathRef.current.getTotalLength();
    const duration = 2000; // ms for full traversal
    let startTime: number | null = null;

    const loop = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const pt = pathRef.current!.getPointAtLength(progress * totalLength);
      setDotPos({ x: pt.x, y: pt.y });
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(loop);
      } else {
        setDotPos(null);
      }
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [hovered]);

  return (
    <div
      className="relative col-span-1 sm:col-span-3 lg:col-span-2 flex flex-col items-center justify-between overflow-hidden p-8 rounded-3xl bg-surface border border-border hover:border-white/20 transition-colors duration-300 text-center cursor-default"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="mb-8 flex items-center justify-center">
        <svg
          viewBox="0 -8 232 96"
          className="w-full h-24"
          aria-hidden="true"
          fill="none"
        >

          {/* Area fill under the line */}
          <path
            d={LINE_PATH + " L228,88 L4,88 Z"}
            fill="url(#chartGradient)"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary, #3b82f6)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--color-primary, #3b82f6)" stopOpacity="0" />
            </linearGradient>
            <filter id="dotGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Main line */}
          <path
            ref={pathRef}
            d={LINE_PATH}
            stroke="var(--color-primary, #3b82f6)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Travelling dot */}
          {dotPos && (
            <>
              {/* Outer glow ring */}
              <circle
                cx={dotPos.x}
                cy={dotPos.y}
                r="7"
                fill="var(--color-primary, #3b82f6)"
                opacity="0.25"
                filter="url(#dotGlow)"
              />
              {/* Inner bright dot */}
              <circle
                cx={dotPos.x}
                cy={dotPos.y}
                r="4"
                fill="var(--color-primary, #3b82f6)"
                filter="url(#dotGlow)"
              />
              <circle
                cx={dotPos.x}
                cy={dotPos.y}
                r="2"
                fill="white"
              />
            </>
          )}
        </svg>
      </div>
      <div>
        <h3 className="text-2xl font-display font-semibold mb-3">Resultados em semanas, não meses</h3>
        <p className="text-gray-400 leading-relaxed text-base">
          Do briefing à automação pronta a utilizar, o nosso processo é simples, rápido e sem fricção.
        </p>
      </div>
    </div>
  );
};

/* ─── Features ───────────────────────────────────────────────────────────── */
const Features = () => {
  const { ref, inView } = useInView();
  return (
    <section className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 ${inView ? 'reveal-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">PRINCIPAIS BENEFÍCIOS</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold max-w-2xl leading-tight">
            Menos esforço. Mais resultado. Sempre
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-6">
          {/* Card 1 — Animated Clock */}
          <div className={`col-span-1 sm:col-span-2 ${inView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
            <ClockCard />
          </div>
          <div className={`col-span-1 sm:col-span-2 ${inView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '180ms' }}>
            <HundredPercentCard />
          </div>
          <div className={`col-span-1 sm:col-span-2 ${inView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '260ms' }}>
            <LineChartCard />
          </div>

          {/* Card 4 — Orbital integrations */}
          <div className={`col-span-1 sm:col-span-3 ${inView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '340ms' }}>
            <div className="relative flex flex-col md:flex-row items-center gap-8 overflow-hidden p-8 rounded-3xl bg-surface border border-border hover:border-white/20 transition-colors duration-300 group h-full">
              <style>{`
              @keyframes orbit {
                from { transform: rotate(0deg) translateX(110px) rotate(0deg); }
                to   { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
              }
              @media (min-width: 768px) {
                @keyframes orbit {
                  from { transform: rotate(0deg) translateX(90px) rotate(0deg); }
                  to   { transform: rotate(360deg) translateX(90px) rotate(-360deg); }
                }
              }
              .orbit-icon-1 { animation: orbit 9s linear infinite; }
              .orbit-icon-2 { animation: orbit 9s linear infinite; animation-delay: -2.25s; }
              .orbit-icon-3 { animation: orbit 9s linear infinite; animation-delay: -4.5s; }
              .orbit-icon-4 { animation: orbit 9s linear infinite; animation-delay: -6.75s; }
            `}</style>

              <div className="flex-1 z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                  <Blocks className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-3">Integra com o que já usas</h3>
                <p className="text-gray-400 leading-relaxed">
                  Gmail, Notion, HubSpot, Slack — as nossas automações encaixam no teu stack atual.
                </p>
              </div>

              <div className="md:w-1/2 w-full flex justify-center py-4 z-10 md:ml-6">
                <div className="relative w-80 h-80 md:w-60 md:h-60 flex items-center justify-center">
                  {/* Glow — only on hover */}
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Central TeaMate favicon */}
                  <div className="w-20 h-20 md:w-16 md:h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center z-10 shadow-xl backdrop-blur-sm group-hover:border-primary/50 transition-colors duration-500 overflow-hidden">
                    <img src="/images/teammate_favicon_oficial.svg" alt="TeaMate" className="w-full h-full object-cover" />
                  </div>

                  {/* Orbiting logos */}
                  <div className="orbit-icon-1 absolute w-16 h-16 md:w-13 md:h-13 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg p-2">
                    <img src="/images/gmail_logo.svg" alt="Gmail" className="w-full h-full object-contain" />
                  </div>
                  <div className="orbit-icon-2 absolute w-16 h-16 md:w-13 md:h-13 rounded-xl bg-[#FF7A59]/10 border border-[#FF7A59]/30 flex items-center justify-center shadow-lg p-2">
                    <img src="/images/hubspot_icon.svg" alt="HubSpot" className="w-full h-full object-contain" />
                  </div>
                  <div className="orbit-icon-3 absolute w-16 h-16 md:w-13 md:h-13 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center shadow-lg p-2">
                    <img src="/images/notion_icon.svg" alt="Notion" className="w-full h-full object-contain" />
                  </div>
                  <div className="orbit-icon-4 absolute w-16 h-16 md:w-13 md:h-13 rounded-xl bg-[#E01E5A]/10 border border-[#E01E5A]/20 flex items-center justify-center shadow-lg p-2">
                    <img src="/images/slack_logo.svg" alt="Slack" className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5 — Animated bar chart */}
          <div className={`col-span-1 sm:col-span-3 ${inView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '420ms' }}>
            <div className="relative flex flex-col md:flex-row items-center gap-8 overflow-hidden p-8 rounded-3xl bg-surface border border-border hover:border-white/20 transition-colors duration-300 group h-full">
              <style>{`
              @keyframes bar-grow {
                from { transform: scaleY(0.15); }
                to   { transform: scaleY(1); }
              }
              .bar-1 { animation: bar-grow 1.6s ease-in-out infinite alternate; animation-delay: 0s; }
              .bar-2 { animation: bar-grow 1.6s ease-in-out infinite alternate; animation-delay: 0.2s; }
              .bar-3 { animation: bar-grow 1.6s ease-in-out infinite alternate; animation-delay: 0.4s; }
              .bar-4 { animation: bar-grow 1.6s ease-in-out infinite alternate; animation-delay: 0.6s; }
            `}</style>

              <div className="flex-1 z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-semibold mb-3">Escala sem contratar</h3>
                <p className="text-gray-400 leading-relaxed">
                  Faz o trabalho de 3 ou mais pessoas sem adicionar headcount. Cresce o volume, não os custos.
                </p>
              </div>

              <div className="md:w-1/2 w-full flex justify-center py-4 z-10">
                <div className="relative flex items-end justify-center gap-3 h-40 w-48">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-24 bg-primary/0 group-hover:bg-primary/20 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />
                  <div className="bar-1 w-8 rounded-t-lg origin-bottom" style={{ height: '30%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }} />
                  <div className="bar-2 w-8 rounded-t-lg origin-bottom" style={{ height: '55%', background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.25)' }} />
                  <div className="bar-3 w-8 rounded-t-lg origin-bottom" style={{ height: '75%', background: 'rgba(59,130,246,0.38)', border: '1px solid rgba(59,130,246,0.45)' }} />
                  <div className="bar-4 w-8 rounded-t-lg origin-bottom" style={{ height: '100%', background: 'rgba(59,130,246,0.65)', border: '1px solid rgba(59,130,246,0.8)', boxShadow: '0 0 24px rgba(59,130,246,0.35)' }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─── Before vs After ───────────────────────────────── */
const beforeAfterRows = [
  {
    before: 'A tua equipa perde horas por dia a responder emails, agendar reuniões e filtrar mensagens irrelevantes',
    after: 'A tua inbox trabalha sozinha — responde, filtra, prioriza e agenda sem intervenção humana',
  },
  {
    before: 'Os teus comerciais passam metade do dia a qualificar leads que nunca vão comprar',
    after: 'O teu CRM qualifica, pontua e encaminha automaticamente só as leads com real potencial de compra',
  },
  {
    before: 'Contratos e propostas são criados manualmente, um a um, com risco de erro e atrasos',
    after: 'Contratos e propostas são gerados automaticamente com os dados certos, prontos a assinar em minutos',
  },
  {
    before: 'O teu marketing depende de alguém para publicar, enviar campanhas e fazer follow-up',
    after: 'Os teus fluxos de marketing correm sozinhos — do primeiro contacto ao follow-up final, sem tocar em nada',
  },
  {
    before: 'Os teus relatórios e métricas são compilados à mão, sempre com dados desatualizados',
    after: 'Os teus dashboards atualizam em tempo real, com os dados certos à frente de quem decide',
  },
  {
    before: 'Quando o volume de trabalho aumenta, a solução é sempre contratar mais pessoas',
    after: 'Quando o negócio cresce, as tuas automações escalam com ele — sem adicionar headcount',
  },
];

const BeforeAfter = () => {
  const { ref, inView } = useInView();
  return (
    <section className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`mb-16 ${inView ? 'reveal-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">ANTES vs. DEPOIS</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold max-w-2xl leading-tight">
            A mesma empresa. Sem o trabalho desnecessário
          </h2>
        </div>

        {/* Comparison Table */}
        <div className={`relative rounded-3xl overflow-hidden border border-white/8 bg-[#0f1117] ${inView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '150ms' }}>

          {/* Column headers */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2px_1fr]">
            <div className="px-4 md:px-8 py-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#ff4444]/15 border border-[#ff4444]/30 text-[#ff4444] font-bold text-sm">✕</span>
              <span className="text-sm font-semibold text-[#ff4444] uppercase tracking-wider">Sem a TeamMate</span>
            </div>

            {/* Separator — hidden on mobile, visible on md+ */}
            <div className="hidden md:block" aria-hidden="true" />

            <div className="hidden md:flex px-8 py-6 items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 border border-primary/30 text-primary font-bold text-sm">✓</span>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Com a TeamMate</span>
            </div>
          </div>

          {/* Desktop: rows side-by-side | Mobile: all "before" rows */}
          {beforeAfterRows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[1fr_2px_1fr] border-t border-white/5 group hover:bg-white/[0.02] transition-colors duration-300"
            >
              {/* Left — before */}
              <div className="px-4 md:px-8 py-6 flex items-start gap-4">
                <span className="mt-0.5 flex-shrink-0 text-[#ff4444] text-base">✕</span>
                <p className="text-gray-500 text-base leading-relaxed">{row.before}</p>
              </div>

              {/* Vertical separator — desktop only */}
              <div className="hidden md:block w-px self-stretch bg-white/5" aria-hidden="true" />

              {/* Right — after, desktop only */}
              <div className="hidden md:flex px-8 py-6 items-start gap-4">
                <span className="mt-0.5 flex-shrink-0 text-primary text-base">✓</span>
                <p className="text-white text-base font-medium leading-relaxed">{row.after}</p>
              </div>
            </div>
          ))}

          {/* Mobile only: "Com a TeamMate" block */}
          <div className="md:hidden border-t border-white/10">
            <div className="px-4 md:px-8 py-6 flex items-center gap-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/15 border border-primary/30 text-primary font-bold text-sm">✓</span>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Com a TeamMate</span>
            </div>
            {beforeAfterRows.map((row, i) => (
              <div key={i} className="border-t border-white/5 px-4 md:px-8 py-6 flex items-start gap-4 hover:bg-white/[0.02] transition-colors duration-300">
                <span className="mt-0.5 flex-shrink-0 text-primary text-base">✓</span>
                <p className="text-white text-base font-medium leading-relaxed">{row.after}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─── About ──────────────────────────────────────────── */
const About = () => {
  const { ref, inView } = useInView();
  return (
    <section id="about" className="py-24 px-6 bg-surface/50" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className={`relative aspect-square rounded-3xl overflow-hidden border border-primary/30 bg-surface shadow-[0_0_60px_-15px_rgba(5,102,141,0.5)] ${inView ? 'reveal-up' : 'opacity-0'}`}>
          <img
            src="/images/ReportMate Interface.webp"
            alt="Interface do ReportMate — plataforma de IA que gera relatórios médicos a partir de voz"
            className="object-cover w-full h-full"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/60 to-transparent" aria-hidden="true"></div>
        </div>

        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-primary/15 border border-primary/30 text-primary text-sm font-medium tracking-wide uppercase">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            O nosso produto principal
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 leading-tight">
            ReportMate — IA para transcrição médica em imagiologia
          </h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Ditado por voz e IA clínica para médicos imagiologistas em Portugal. O médico dita em linguagem natural, a IA estrutura o relatório e sinaliza inconsistências antes da assinatura. Vocabulário clínico dedicado, mais de 20 especialidades cobertas, RGPD-compliant e dados alojados na União Europeia.
          </p>

          <ul className="flex flex-col gap-4 mb-10" role="list">
            {[
              { label: 'Ditado natural em português europeu, com vocabulário clínico dedicado', Icon: Mic },
              { label: 'IA estrutura o relatório e sinaliza inconsistências antes de assinares', Icon: Sparkles },
              { label: 'Alojado na UE, RGPD-compliant, sem instalação nem hardware', Icon: Shield },
            ].map((item) => (
              <li key={item.label} className="flex items-center gap-4">
                <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20" aria-hidden="true">
                  <item.Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="font-medium">{item.label}</p>
              </li>
            ))}
          </ul>

          <div className="relative group inline-flex">
            <a
              href="https://getreportmate.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`relative flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover active:scale-95 md:active:scale-100 text-white text-lg font-display font-semibold rounded-xl shadow-[0_0_30px_-5px_rgba(5,102,141,0.6)] hover:shadow-[0_0_40px_-5px_rgba(5,102,141,0.8)] transition-all duration-300 cursor-pointer ${focusRing}`}
            >
              Conhecer o ReportMate
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              <span className="sr-only">(abre numa nova aba)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Case Study Card (shared: homepage + /portfolio) ─── */
export type CaseStudy = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  brandColor: string;
  invertLogo?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    title: 'DonaBarba',
    description: 'Sistema completo de marcações online, gestão de barbeiros, stock e faturamento — para que a equipa se foque nos clientes.',
    image: '/images/DonaBarba-logo.png',
    imageAlt: 'Logo DonaBarba',
    href: '/donabarba',
    brandColor: '#7B5329',
    invertLogo: true,
  },
  {
    title: 'Software Gestão Astrotek',
    description: 'Sistema centralizado para gestão de pedidos de reparação, stock e faturamento, eliminando processos manuais.',
    image: '/images/Astrotek-logo.png',
    imageAlt: 'Logo Astrotek',
    href: '/astrotek',
    brandColor: '#1F8442',
  },
];

interface CaseStudyCardProps {
  study: CaseStudy;
  ctaLabel: string;
  inView: boolean;
  delayMs?: number;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ study, ctaLabel, inView, delayMs = 0 }) => (
  <div className={`group relative flex flex-col overflow-hidden rounded-3xl bg-surface border border-border hover:border-white/20 transition-all duration-300 ${inView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: `${delayMs}ms` }}>
    <div className="aspect-[16/10] w-full overflow-hidden border-b border-white/5 flex items-center justify-center" style={{ backgroundColor: study.brandColor }}>
      <img
        src={study.image}
        alt={study.imageAlt}
        className={`max-h-[50%] max-w-[60%] object-contain group-hover:scale-105 transition-transform duration-700 ${study.invertLogo ? 'brightness-0 invert' : ''}`}
        loading="lazy"
      />
    </div>
    <div className="p-8 flex flex-col flex-1">
      <h3 className="text-2xl font-display font-semibold mb-3">{study.title}</h3>
      <p className="text-gray-400 leading-relaxed mb-6 flex-1">
        {study.description}
      </p>
      <a href={study.href} className={`inline-flex items-center justify-center px-6 py-3 w-max border border-white/15 hover:bg-white/5 active:bg-white/5 active:scale-95 text-white font-medium rounded-xl transition-all duration-300 ${focusRing}`}>
        {ctaLabel}
      </a>
    </div>
  </div>
);

/* ─── Portfolio ────────────────────────────────────────── */
const Portfolio = () => {
  const { ref, inView } = useInView();
  return (
    <section id="portfolio" className="py-24 px-6 relative" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className={`mb-16 ${inView ? 'reveal-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">PORTFOLIO</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold max-w-2xl leading-tight">
            Casos de Estudo
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.href} study={study} ctaLabel="Ver Caso de Estudo" inView={inView} delayMs={(i + 1) * 100} />
          ))}
        </div>
        <div className={`mt-12 flex justify-center ${inView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '300ms' }}>
          <a
            href="/portfolio"
            className={`group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover active:scale-95 md:active:scale-100 text-white text-lg font-display font-semibold rounded-xl shadow-[0_0_30px_-5px_rgba(5,102,141,0.6)] hover:shadow-[0_0_40px_-5px_rgba(5,102,141,0.8)] transition-all duration-300 cursor-pointer ${focusRing}`}
          >
            Ver portfólio completo
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};

/* ─── Products ───────────────────────────────────────── */
const solutionCards = [
  {
    Icon: Mail,
    title: 'Automação de Comunicação',
    desc: 'A tua inbox deixa de ser um caos. Emails respondidos, reuniões agendadas e follow-ups enviados — tudo sem intervenção humana.',
    cta: null,
  },
  {
    Icon: UserCheck,
    title: 'Qualificação e Gestão de Leads',
    desc: 'O teu CRM trabalha sozinho. Leads qualificadas, pontuadas e encaminhadas automaticamente para a pessoa certa, no momento certo.',
    cta: null,
  },
  {
    Icon: FileText,
    title: 'Geração de Documentos',
    desc: 'Contratos, propostas e relatórios gerados em segundos. Com os dados certos, sem erros e prontos a enviar ou assinar.',
    cta: null,
  },
  {
    Icon: Megaphone,
    title: 'Automação de Marketing',
    desc: 'As tuas campanhas correm sozinhas — da segmentação ao follow-up final. O teu marketing nunca para, mesmo quando a tua equipa descansa.',
    cta: null,
  },
  {
    Icon: Cpu,
    title: 'Operações Internas',
    desc: 'Relatórios, aprovações e dashboards atualizados em tempo real. As decisões certas, com os dados certos, sempre disponíveis.',
    cta: null,
  },
  {
    Icon: HeadphonesIcon,
    title: 'Atendimento ao Cliente',
    desc: 'O teu suporte disponível 24 horas por dia, 7 dias por semana. Chatbots que respondem, triagem automática e clientes satisfeitos — sem aumentar a equipa.',
    cta: null,
  },
];

const Products = () => {
  const { ref: prodRef, inView: prodInView } = useInView();
  return (
    <section id="cases" className="py-24 px-6" ref={prodRef}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className={`mb-16 ${prodInView ? 'reveal-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">AS NOSSAS SOLUÇÕES</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold max-w-3xl leading-tight mb-6">
            Automatizamos onde a tua empresa mais precisa
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
            Cada empresa tem as suas próprias dores. Por isso não vendemos pacotes — identificamos os teus processos, entendemos o teu negócio e construímos a solução certa para ti.
          </p>
        </div>

        {/* 2×3 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutionCards.map((card, i) => (
            <div
              key={i}
              className={`group relative flex flex-col gap-5 p-8 rounded-3xl bg-surface border border-border hover:border-white/20 transition-all duration-300 overflow-hidden ${prodInView ? 'reveal-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Subtle hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(37,99,235,0.12) 0%, transparent 65%)' }}
                aria-hidden="true"
              />
              {/* Icon */}
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-primary/15 group-hover:border-primary/30 transition-all duration-300">
                <card.Icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              {/* Text */}
              <div className="relative z-10 flex flex-col flex-1 gap-3">
                <h3 className="text-xl font-display font-semibold leading-snug">{card.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed flex-1">{card.desc}</p>
              </div>
              {/* Optional CTA */}
              {card.cta && (
                <div className="relative z-10 mt-2">
                  <div className="relative group/btn inline-flex">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/50 to-blue-400/50 rounded-xl blur opacity-20 group-hover/btn:opacity-50 transition duration-500" aria-hidden="true" />
                    <button className={`relative px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${focusRing}`}>
                      {card.cta}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



/* ─── Testimonials ───────────────────────────────────── */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  logo: string;
  logoAlt: string;
  invertLogo?: boolean;
};

export const TESTIMONIALS = {
  donabarba: {
    quote: "Antes passávamos mais tempo a gerir marcações do que a cortar cabelo. Havia sobreposições no WhatsApp, no telefone, ao balcão — e ninguém sabia bem o que estava marcado. Com o sistema da TeamMate, os clientes marcam sozinhos 24/7, cada barbeiro gere a sua agenda sem conflitos, e temos uma visão clara da faturação em tempo real. Já não imagino trabalhar sem isto.",
    name: "Pedro Miranda",
    role: "CEO / Barbeiro, DonaBarba",
    logo: "/images/DonaBarba-logo.png",
    logoAlt: "Logo DonaBarba",
    invertLogo: true,
  },
  astrotek: {
    quote: "Recebíamos pedidos de reparação por todos os canais possíveis e perdíamos horas por semana a organizar tudo à mão. A TeamMate construiu-nos uma plataforma que centralizou tudo — pedidos, stock, faturação e comunicação com o cliente — em duas semanas. Hoje os clientes sabem sempre em que ponto está a reparação sem precisar de ligar, e nós focamo-nos no que sabemos fazer.",
    name: "Luís Veloso",
    role: "CEO / Técnico, Astrotek",
    logo: "/images/Astrotek-logo.png",
    logoAlt: "Logo Astrotek",
  },
} satisfies Record<string, Testimonial>;

export const TestimonialLogo = ({ testimonial, className = '' }: { testimonial: Testimonial; className?: string }) => (
  <div className={`h-16 min-w-16 px-5 flex items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 flex-shrink-0 ${className}`}>
    <img
      src={testimonial.logo}
      alt={testimonial.logoAlt}
      className={`max-h-10 w-auto object-contain ${testimonial.invertLogo ? 'brightness-0 invert' : ''}`}
      loading="lazy"
    />
  </div>
);

export const Testimonials = () => {
  const { ref, inView } = useInView();

  return (
    <section id="testimonials" className="py-24 px-6 bg-surface/50" aria-label="Testemunhos" ref={ref}>
      <div className="max-w-6xl mx-auto">

        <div className={`text-center mb-16 ${inView ? 'reveal-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-display font-semibold leading-tight mb-4">
            Empresas que pararam de perder tempo
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Não pedimos que confies em nós. Pedimos que ouças quem já confiou.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[TESTIMONIALS.donabarba, TESTIMONIALS.astrotek].map((t, i) => (
            <figure
              key={t.name}
              className={`flex flex-col items-center text-center gap-6 bg-[#111318] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl ${inView ? 'reveal-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 150 + 200}ms` }}
            >
              <TestimonialLogo testimonial={t} />
              <figcaption className="space-y-2">
                <h3 className="text-lg font-display font-semibold text-white">{t.name}</h3>
                <p className="text-primary text-xs font-medium uppercase tracking-wider">{t.role}</p>
              </figcaption>
              <blockquote className="text-gray-300 text-base leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </figure>
          ))}
        </div>

      </div>
    </section>
  );
};


/* ─── Statistics (with count-up) ────────────────────── */
interface StatCardProps { num: number; prefix?: string; suffix: string; title: string; desc: string; start: boolean; }
const StatCard: React.FC<StatCardProps> = ({ num, prefix = '', suffix, title, desc, start }) => {
  const count = useCountUp(num, 1800, start);
  return (
    <div
      className="group relative p-8 rounded-2xl bg-[#111318] border border-white/8 flex flex-col gap-0 overflow-hidden transition-all duration-500 hover:border-white/15 h-full w-full"
      style={{ isolation: 'isolate' }}
    >
      {/* Blue hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 110%, rgba(37,99,235,0.18) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Number — large, top-left flush */}
      <p
        className="text-5xl font-display font-semibold text-primary leading-none mb-12 tracking-tight"
        aria-label={`${prefix}${num}${suffix}`}
      >
        {prefix}{count}{suffix}
      </p>

      {/* Title */}
      <h3 className="text-xl font-display font-bold text-white leading-snug mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-400 text-base leading-relaxed flex-1">{desc}</p>
    </div>
  );
};

const Statistics = () => {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { num: 80, prefix: '', suffix: '%', title: 'Redução de Tarefas Manuais', desc: '"Em média, as equipas dos nossos clientes eliminam 80% das tarefas repetitivas no primeiro mês."' },
    { num: 3, prefix: '', suffix: 'x', title: 'Mais Velocidade Operacional', desc: '"Os processos que demoravam dias passam a ser concluídos em horas — sem erros e sem intervenção humana."' },
    { num: 200, prefix: '+', suffix: 'h', title: 'Poupadas por Mês', desc: '"São mais de 200 horas mensais devolvidas às equipas para focar no que realmente faz crescer o negócio."' },
    { num: 97, prefix: '', suffix: '%', title: 'Taxa de Satisfação', desc: '"97% dos nossos clientes recomendam a TeamMate após os primeiros 60 dias de automação."' },
  ];

  return (
    <section className="py-24 px-6 bg-surface/30">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 ${started ? 'reveal-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Estatísticas</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold max-w-2xl mx-auto leading-tight">
            Resultados que falam por si
          </h2>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className={`flex ${started ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 100 + 150}ms` }}>
              <div className="w-full h-full">
                <StatCard num={s.num} prefix={s.prefix} suffix={s.suffix} title={s.title} desc={s.desc} start={started} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Process ────────────────────────────────────────── */
const processSteps = [
  { step: 1, title: 'Diagnóstico', desc: 'Começamos por ouvir. Analisamos o teu negócio, mapeamos os processos que consomem mais tempo e identificamos exatamente onde a automação vai ter maior impacto.', align: 'left', img: '/images/diagnostico_processo.webp', alt: 'Diagrama da fase de diagnóstico e mapeamento de processos' },
  { step: 2, title: 'Estratégia', desc: 'Com base no diagnóstico, desenhamos um plano personalizado. Nada genérico — cada solução é pensada especificamente para o teu negócio, a tua equipa e as tuas ferramentas.', align: 'right', img: '/images/estrategia_processo.webp', alt: 'Interface de planeamento estratégico personalizado' },
  { step: 3, title: 'Desenvolvimento', desc: 'Construímos as automações e agentes de IA do zero, com acompanhamento total. Tu tens visibilidade sobre tudo o que está a ser criado, em tempo real.', align: 'left', img: '/images/desenvolvimento_processo.webp', alt: 'Ambiente de desenvolvimento de automações e agentes de IA' },
  { step: 4, title: 'Lançamento', desc: 'Lançamos as soluções, garantimos que tudo funciona como esperado e ficamos contigo. O teu crescimento é o nosso trabalho, não só na entrega — mas depois dela.', align: 'right', img: '/images/lancamanento_processo.webp', alt: 'Dashboard de lançamento e monitorização de soluções' },
];

const Process = () => {
  const { ref: viewRef, inView } = useInView();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const firstCircleRef = useRef<HTMLDivElement>(null);
  const lastCircleRef = useRef<HTMLDivElement>(null);
  const [lineStyle, setLineStyle] = useState<{ top: string; height: string }>({ top: '0px', height: '100%' });

  useEffect(() => {
    const measure = () => {
      const wrapper = wrapperRef.current;
      const first = firstCircleRef.current;
      const last = lastCircleRef.current;
      if (!wrapper || !first || !last) return;
      const wRect = wrapper.getBoundingClientRect();
      const fRect = first.getBoundingClientRect();
      const lRect = last.getBoundingClientRect();
      const top = fRect.top + fRect.height / 2 - wRect.top;
      const bottom = lRect.top + lRect.height / 2 - wRect.top;
      setLineStyle({ top: `${top}px`, height: `${bottom - top}px` });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <section id="process" className="py-24 px-6 overflow-hidden" ref={viewRef}>
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-20 ${inView ? 'reveal-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">O NOSSO PROCESSO</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold max-w-2xl mx-auto leading-tight">
            Do problema à solução, em 4 passos
          </h2>
        </div>

        {/* ── Desktop layout ── */}
        <div ref={wrapperRef} className="relative max-w-5xl mx-auto hidden md:block">
          {/* Connecting line clamped between centre of circle 1 and centre of circle 4 */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-px bg-border"
            style={lineStyle}
            aria-hidden="true"
          />
          {processSteps.map((p, i) => (
            <div
              key={i}
              className={`flex flex-row items-center gap-12 mb-24 last:mb-0 ${p.align === 'right' ? 'flex-row-reverse' : ''} ${inView ? 'reveal-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 150 + 200}ms` }}
            >
              {/* Text side */}
              <div className={`flex-1 ${p.align === 'right' ? 'text-left' : 'text-right'}`}>
                <h3 className="text-3xl md:text-4xl font-display font-semibold mb-4">{p.title}</h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-md ml-auto mr-auto md:mx-0">{p.desc}</p>
              </div>
              {/* Circle */}
              <div
                ref={i === 0 ? firstCircleRef : i === processSteps.length - 1 ? lastCircleRef : undefined}
                className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-background border-2 border-border flex items-center justify-center text-2xl font-display font-bold"
                aria-label={`Passo ${p.step}`}
              >
                {p.step}
              </div>
              {/* Image side */}
              <div className="flex-1 w-full">
                <div className="aspect-[4/3] rounded-3xl bg-surface border border-border overflow-hidden relative">
                  <img
                    src={p.img}
                    alt={p.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile layout ── */}
        <div className="md:hidden relative">
          {/* Vertical line on the left, aligned with circle centres */}
          <div
            className="absolute left-6 top-6 bottom-6 w-px bg-border"
            aria-hidden="true"
          />
          {processSteps.map((p, i) => (
            <div key={i} className={`flex items-start gap-5 mb-12 last:mb-0 ${inView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 150 + 200}ms` }}>
              {/* Circle on the left */}
              <div
                className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center text-lg font-display font-bold"
                aria-label={`Passo ${p.step}`}
              >
                {p.step}
              </div>
              {/* Content on the right */}
              <div className="flex-1 pt-1">
                <h3 className="text-2xl font-display font-semibold mb-3">{p.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed mb-5">{p.desc}</p>
                <div className="aspect-[4/3] rounded-2xl bg-surface border border-border overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


/* ─── FAQ ────────────────────────────────────────────── */
const faqs = [
  { q: 'Quanto tempo demora a implementação?', a: 'Entre 1 a 4 semanas, dependendo da complexidade. Automações simples ficam prontas em poucos dias.' },
  { q: 'A TeamMate integra-se às nossas ferramentas existentes?', a: 'Sim. Trabalhamos com CRMs, ERPs, e-mail marketing, redes sociais e muito mais. Adaptamo-nos ao teu stack, não o contrário.' },
  { q: 'A TeamMate consegue acompanhar o crescimento da empresa?', a: 'Sempre. As nossas soluções são construídas para escalar — mais volume, mais processos, sem precisar de contratar mais ninguém.' },
  { q: 'Que tipo de suporte está disponível após o lançamento?', a: 'Suporte contínuo com monitorização, ajustes e formação para a tua equipa tirar o máximo das automações.' },
  { q: 'A TeamMate é segura e competente?', a: 'Sim. Seguimos as normas RGPD, usamos integrações testadas e entregamos resultados reais — não promessas.' },
];

const FAQ = () => {
  const { ref, inView } = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = useCallback((i: number) => {
    setOpenIndex(prev => prev === i ? null : i);
  }, []);

  return (
    <section id="faq" className="py-24 px-6 bg-surface/30" ref={ref}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className={`lg:col-span-5 ${inView ? 'reveal-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">FAQs</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 leading-tight">Perguntas Frequentes</h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Tens dúvidas sobre como a IA pode transformar o teu negócio? Encontre as respostas abaixo ou contacta-nos diretamente.
          </p>
          <a href="/contactos" className={`inline-block px-6 py-2.5 border border-white/15 hover:bg-white/5 text-white rounded-xl transition-all duration-300 cursor-pointer ${focusRing}`}>
            Faz a tua Pergunta
          </a>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4" role="list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl bg-surface border border-border hover:border-white/20 transition-colors duration-200 overflow-hidden ${inView ? 'reveal-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 100 + 200}ms` }}
              role="listitem"
            >
              <button
                className={`w-full p-6 flex justify-between items-center cursor-pointer text-left ${focusRing} rounded-2xl`}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="text-lg font-medium pr-4">{faq.q}</span>
                <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`} aria-hidden="true">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              <div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                className={`faq-answer ${openIndex === i ? 'open' : ''}`}
              >
                <div>
                  <p className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── CTA ────────────────────────────────────────────── */
export const CTA = ({ 
  onOpenModal,
  shadowColor = 'rgba(5, 102, 141, 0.7)',
  gradientFrom = 'from-blue-600/50',
  gradientTo = 'to-blue-400/50',
  title = 'A tua equipa merece trabalhar menos no que não importa',
  description = 'Marca uma call gratuita e mostramos-te exatamente onde a automação pode transformar o teu negócio — sem compromisso, sem complicações.'
}: { 
  onOpenModal: () => void;
  shadowColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  title?: string;
  description?: string;
}) => {
  const { ref, inView } = useInView();
  return (
    <section className="py-24 px-6 bg-surface/30" ref={ref}>
      <div className="max-w-5xl mx-auto relative rounded-[3rem] overflow-hidden border border-border bg-[#0a0a0a]">
        {/* Animated EtherealShadow background — same as Hero */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60 flex items-center justify-center" aria-hidden="true">
          <div className="w-[300%] h-[200%] md:w-full md:h-full flex-shrink-0">
            <EtherealShadow
              color={shadowColor}
              animation={{ scale: 100, speed: 60 }}
              noise={{ opacity: 0.6, scale: 1.5 }}
            />
          </div>
        </div>
        <div className={`relative z-10 px-6 py-16 md:p-24 text-center ${inView ? 'reveal-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 leading-tight max-w-2xl mx-auto">
            {title}
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="relative group inline-flex justify-center mt-4">
            <div className={`absolute -inset-1 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-500`} aria-hidden="true"></div>
            <button
              onClick={onOpenModal}
              className={`relative px-8 py-4 bg-primary hover:bg-primary-hover text-white font-medium rounded-xl transition-all duration-300 text-lg cursor-pointer border border-transparent ${focusRing}`}
            >
              Quero a minha Call Gratuita
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Footer ─────────────────────────────────────────── */
export const Footer = () => {
  const scrollTo = (href: string) => {
    const targetId = href.startsWith('/#') ? href.substring(1) : href;
    if (!targetId.startsWith('#') || targetId === '#') return false;
    if (window.location.pathname === '/') {
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return true;
      }
    }
    return false;
  };

  const footerCols: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
    {
      title: 'Navegação',
      links: [
        { label: 'Serviços', href: '/#cases' },
        { label: 'Processo', href: '/#process' },
        { label: 'Portfólio', href: '/portfolio' },
        { label: 'Sobre', href: '/sobre' },
        { label: 'Testemunhos', href: '/#testimonials' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'FAQs', href: '/#faq' },
        { label: 'Contacto', href: '/contactos' },
        { label: 'ReportMate', href: 'https://getreportmate.com', external: true },
      ],
    },
    {
      title: 'Recursos',
      links: [
        { label: 'Termos', href: '#' },
        { label: 'Privacidade', href: '#' },
        { label: 'Licença', href: '#' },
      ],
    },
  ];

  return (
    <footer className="pt-20 pb-10 px-6 bg-surface/50 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
          <div className="lg:col-span-4">
            <div className="mb-6">
              <img
                src="/images/Logo TeamMate.svg"
                alt="TeamMate"
                className="h-14 w-auto"
                draggable={false}
              />
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Menos trabalho repetitivo. Mais tempo para crescer.
            </p>
          </div>

          <nav className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8" aria-label="Links de navegação do rodapé">
            {footerCols.map((col) => (
              <div key={col.title}>
                <h3 className="font-display font-semibold mb-6">{col.title}</h3>
                <div className="flex flex-col gap-4 text-gray-400">
                  {col.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      {...(link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {
                            onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
                              const handled = scrollTo(link.href);
                              if (handled) e.preventDefault();
                            },
                          })}
                      className={`hover:text-white transition-colors duration-200 cursor-pointer ${focusRing} rounded`}
                    >
                      {link.label}
                      {link.external && <span className="sr-only"> (abre numa nova aba)</span>}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-4">
            {/* TikTok */}
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors duration-200 cursor-pointer ${focusRing}`} aria-label="Seguir TeamMate no TikTok">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.02-.06Z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors duration-200 cursor-pointer ${focusRing}`} aria-label="Seguir TeamMate no Instagram">
              <Instagram className="w-4 h-4" aria-hidden="true" />
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors duration-200 cursor-pointer ${focusRing}`} aria-label="Seguir TeamMate no LinkedIn">
              <Linkedin className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
          <p className="text-sm text-gray-500 font-display">
            © TeamMate {new Date().getFullYear()} — Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

/* ─── App ────────────────────────────────────────────── */
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary/30">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <main>
        <Hero
          onOpenModal={() => setIsModalOpen(true)}
          onOpenQuizModal={() => setIsQuizModalOpen(true)}
        />
        <BrandTicker />
        <Features />
        <BeforeAfter />
        <Testimonials />
        <About />
        <Portfolio />
        <Products />
        <Process />
        <Statistics />

        <FAQ />
        <CTA onOpenModal={() => setIsModalOpen(true)} />
      </main>
      <Footer />
      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <QuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onOpenLeadModal={() => setIsModalOpen(true)}
      />
    </div>
  );
}
