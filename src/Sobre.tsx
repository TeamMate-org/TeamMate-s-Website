import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Footer, CTA } from './App';
import { LeadModal } from './components/LeadModal';
import { HeartHandshake, Sparkles, ShieldCheck, MapPin, ArrowUpRight } from 'lucide-react';
import { EtherealShadow } from './components/ui/etheral-shadow';

// ─── Focus style helper ───────────────────────────────
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

// ─── useInView hook ───
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

const founders = [
  {
    name: 'Diogo Sousa',
    role: 'Co-founder & CEO',
    desc: 'Engenheiro informático. Foca-se em produto, IA e go-to-market.',
    image: '/images/DiogoSousa.webp',
  },
  {
    name: 'Diogo Canito',
    role: 'Co-founder & CTO',
    desc: 'Engenheiro informático. Foca-se em engenharia, arquitetura e entrega.',
    image: '/images/DiogoCanito.webp',
  },
];

const values = [
  { icon: HeartHandshake, title: 'Próximos e presentes', desc: 'Respondemos, aparecemos, envolvemo-nos. Não somos uma agência que desaparece depois de assinar.' },
  { icon: Sparkles, title: 'IA com propósito', desc: 'Só usamos IA onde faz sentido. Se um formulário resolve, é um formulário.' },
  { icon: ShieldCheck, title: 'Feito para durar', desc: 'Construímos software que dura, não protótipos que quebram no primeiro mês.' },
  { icon: MapPin, title: 'Portugal em primeiro', desc: 'Falamos português, entendemos as PMEs portuguesas, respeitamos o RGPD.' },
];

const numbers: { value: string; label: string; link?: { label: string; href: string } }[] = [
  { value: '2025', label: 'Ano de fundação' },
  { value: '2', label: 'Empresas servidas em custom' },
  { value: '3', label: 'Projetos entregues' },
  { value: '1', label: 'Produto SaaS próprio', link: { label: 'ReportMate', href: 'https://getreportmate.com' } },
];

export default function Sobre() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref: foundersRef, inView: foundersInView } = useInView();
  const { ref: storyRef, inView: storyInView } = useInView();
  const { ref: numbersRef, inView: numbersInView } = useInView();
  const { ref: valuesRef, inView: valuesInView } = useInView();

  useEffect(() => {
    document.title = 'Sobre nós | TeamMate';
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary/30 font-sans">
      <Navbar onOpenModal={() => setIsModalOpen(true)} />

      <main>
        {/* SECÇÃO 1 — HERO */}
        <section className="relative pt-40 md:pt-48 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-50 flex items-center justify-center" aria-hidden="true">
            <div className="w-[300%] h-[150%] md:w-full md:h-full flex-shrink-0">
              <EtherealShadow
                color="rgba(30, 144, 210, 0.75)"
                animation={{ scale: 100, speed: 90 }}
                noise={{ opacity: 0.6, scale: 1.5 }}
              />
            </div>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
            <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-display font-medium tracking-tight leading-[1] mb-6">
              Somos dois Diogos com uma missão
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              Engenheiros informáticos em Barcelos, a trazer a IA para dentro das PMEs portuguesas.
            </p>
          </div>
        </section>

        {/* SECÇÃO 2 — FUNDADORES */}
        <section className="py-24 px-6 bg-surface/50" ref={foundersRef}>
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-display font-semibold leading-tight mb-12 text-center ${foundersInView ? 'reveal-up' : 'opacity-0'}`}>
              Os fundadores
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {founders.map((founder, i) => (
                <article
                  key={founder.name}
                  className={`group relative p-4 rounded-2xl bg-[#111318] border border-white/8 overflow-hidden transition-all duration-500 hover:border-white/15 ${foundersInView ? 'reveal-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${(i + 1) * 100}ms`, isolation: 'isolate' }}
                >
                  {/* Blue hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 110%, rgba(37,99,235,0.18) 0%, transparent 70%)' }}
                    aria-hidden="true"
                  />
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-white/5">
                    <img
                      src={founder.image}
                      alt={`Fotografia de ${founder.name}`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-2 pt-6 pb-2">
                    <h3 className="text-2xl font-display font-semibold">{founder.name}</h3>
                    <p className="text-primary font-medium mt-1 mb-3">{founder.role}</p>
                    <p className="text-gray-400 leading-relaxed">{founder.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECÇÃO 3 — HISTÓRIA */}
        <section className="py-24 px-6" ref={storyRef}>
          <div className={`max-w-3xl mx-auto text-center ${storyInView ? 'reveal-up' : 'opacity-0'}`}>
            <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">A NOSSA HISTÓRIA</p>
            <h2 className="text-4xl md:text-5xl font-display font-semibold leading-tight mb-8">
              Como começámos
            </h2>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              A TeamMate nasceu em 2025, quando percebemos que a revolução da IA estava a acontecer lá fora — e que Portugal precisava de quem soubesse trazê-la para dentro das PMEs sem barreiras técnicas nem promessas vazias. Somos engenheiros informáticos, sediados em Barcelos. Passámos meses a estudar a fundo a área, a testar ferramentas e a construir com IA. Hoje aplicamos esse conhecimento em projetos à medida e num produto SaaS próprio — o ReportMate, para imagiologia médica.
            </p>
          </div>
        </section>

        {/* SECÇÃO 4 — EM NÚMEROS */}
        <section className="pb-24 px-6" ref={numbersRef}>
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-display font-semibold leading-tight mb-12 text-center ${numbersInView ? 'reveal-up' : 'opacity-0'}`}>
              Em números
            </h2>
            <div
              className={`bg-[#141414] border border-border rounded-[2.5rem] p-6 md:p-12 shadow-xl ${numbersInView ? 'reveal-up' : 'opacity-0'}`}
              style={{ animationDelay: '100ms' }}
            >
              <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 lg:divide-x divide-border">
                {numbers.map((n) => (
                  <div key={n.label} className="flex flex-col items-center text-center px-3 lg:px-6">
                    <dt className="order-2 text-sm md:text-base text-gray-400 leading-snug">{n.label}</dt>
                    <dd className="order-1 text-5xl md:text-6xl font-display font-medium text-primary mb-3 leading-none">{n.value}</dd>
                    {n.link && (
                      <dd className="order-3 mt-1">
                        <a
                          href={n.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group/link inline-flex items-center gap-1 text-sm md:text-base font-medium text-white hover:text-primary transition-colors duration-200 ${focusRing} rounded`}
                        >
                          {n.link.label}
                          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" aria-hidden="true" />
                          <span className="sr-only">(abre numa nova aba)</span>
                        </a>
                      </dd>
                    )}
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* SECÇÃO 5 — VALORES */}
        <section className="py-24 px-6 bg-surface/50" ref={valuesRef}>
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-display font-semibold leading-tight mb-12 text-center ${valuesInView ? 'reveal-up' : 'opacity-0'}`}>
              Como trabalhamos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <div
                  key={value.title}
                  className={`bg-[#0f1117] border border-border p-8 rounded-[2rem] hover:border-white/20 transition-colors ${valuesInView ? 'reveal-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${(i + 1) * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-base">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECÇÃO 6 — LAST CTA */}
        <CTA onOpenModal={() => setIsModalOpen(true)} />
      </main>

      {/* SECÇÃO 7 — FOOTER */}
      <Footer />

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
