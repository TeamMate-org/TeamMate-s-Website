import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Footer, CTA, CaseStudyCard, caseStudies } from './App';
import { LeadModal } from './components/LeadModal';
import { ArrowUpRight } from 'lucide-react';
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

export default function Portfolio() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref: saasRef, inView: saasInView } = useInView();
  const { ref: customRef, inView: customInView } = useInView();

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
              Portfólio
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              O que construímos — dos nossos produtos SaaS aos projetos que fazemos à medida para empresas.
            </p>
          </div>
        </section>

        {/* SECÇÃO 2 — PRODUTOS SAAS */}
        <section className="py-24 px-6 bg-surface/50" ref={saasRef}>
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-display font-semibold leading-tight mb-12 ${saasInView ? 'reveal-up' : 'opacity-0'}`}>
              Produtos SaaS
            </h2>

            <div className={`group grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl bg-surface border border-primary/30 shadow-[0_0_60px_-15px_rgba(5,102,141,0.5)] ${saasInView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '100ms' }}>
              <div className="aspect-[4/3] lg:aspect-auto w-full overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
                <img
                  src="/images/ReportMate Interface.webp"
                  alt="Interface do ReportMate — plataforma de IA que gera relatórios médicos a partir de voz"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center items-start">
                <span className="inline-flex items-center px-3.5 py-1.5 mb-6 rounded-full bg-primary/15 border border-primary/30 text-primary-text text-sm font-medium tracking-wide uppercase">
                  Imagiologia médica
                </span>
                <h3 className="text-3xl md:text-4xl font-display font-semibold mb-4">ReportMate</h3>
                <p className="text-lg text-gray-400 leading-relaxed mb-10">
                  Plataforma SaaS de ditado por voz e IA clínica para médicos imagiologistas. Terminologia adaptada, RGPD e dados alojados na UE.
                </p>
                <a
                  href="https://getreportmate.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group/cta inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover active:scale-95 md:active:scale-100 text-white text-lg font-display font-semibold rounded-xl shadow-[0_0_30px_-5px_rgba(5,102,141,0.6)] hover:shadow-[0_0_40px_-5px_rgba(5,102,141,0.8)] transition-all duration-300 cursor-pointer ${focusRing}`}
                >
                  Visitar site
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" aria-hidden="true" />
                  <span className="sr-only">(abre numa nova aba)</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECÇÃO 3 — PROJETOS À MEDIDA */}
        <section className="py-24 px-6" ref={customRef}>
          <div className="max-w-7xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-display font-semibold leading-tight mb-12 ${customInView ? 'reveal-up' : 'opacity-0'}`}>
              Projetos à medida
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.map((study, i) => (
                <CaseStudyCard key={study.href} study={study} ctaLabel="Ver projeto" inView={customInView} delayMs={(i + 1) * 100} />
              ))}
            </div>
          </div>
        </section>

        {/* SECÇÃO 4 — LAST CTA */}
        <CTA onOpenModal={() => setIsModalOpen(true)} />
      </main>

      {/* SECÇÃO 5 — FOOTER */}
      <Footer />

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
