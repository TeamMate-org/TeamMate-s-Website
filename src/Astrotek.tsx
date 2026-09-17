import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Footer, CTA, TESTIMONIALS, TestimonialLogo } from './App';
import { LeadModal } from './components/LeadModal';
import { Package, Bell, Inbox, LayoutDashboard, Smartphone, Settings } from 'lucide-react';
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

const testimonial = TESTIMONIALS.astrotek;

export default function Astrotek() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref: challengeRef, inView: challengeInView } = useInView();
  const { ref: solutionRef, inView: solutionInView } = useInView();
  const { ref: resultRef, inView: resultInView } = useInView();
  const { ref: testimonialRef, inView: testimonialInView } = useInView();

  return (
    <div className="astrotek-theme min-h-screen bg-[#0a0a0a] text-white selection:bg-primary/30 font-sans">
      <div className="teammate-btn-override">
        <Navbar onOpenModal={() => setIsModalOpen(true)} />
      </div>
      
      <main>
        {/* SECÇÃO 2 — HERO */}
        <section className="relative pt-32 md:pt-40 pb-24 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[85vh]">
          {/* Ethereal Glow */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-50 flex items-center justify-center">
            <div className="w-[300%] h-[150%] md:w-full md:h-full flex-shrink-0">
              <EtherealShadow
                color="rgba(0, 187, 45, 0.75)"
                animation={{ scale: 100, speed: 90 }}
                noise={{ opacity: 0.6, scale: 1.5 }}
              />
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:items-stretch lg:min-h-[60vh] z-10">
            <div className="flex flex-col items-start justify-center animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-display font-medium tracking-tight leading-[1] mb-6">
                Como a <span className="text-primary">Astrotek</span> centralizou toda a gestão do seu negócio num único software
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
                Desenvolvemos um sistema completo de gestão de pedidos, stock e faturamento — para que a equipa se foque no serviço e deixe a burocracia para a tecnologia.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex items-center gap-3 bg-surface border border-border px-5 py-3 rounded-2xl w-max">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Setor: <br/><span className="text-gray-400">Reparação de Equipamentos</span></span>
                </div>
                <div className="flex items-center gap-3 bg-surface border border-border px-5 py-3 rounded-2xl w-max">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <LayoutDashboard className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Tipo: <br/><span className="text-gray-400">Software de Gestão Personalizado</span></span>
                </div>
              </div>
            </div>
            
            <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full animate-slide-up-fade" style={{ animationDelay: '300ms' }}>
              <img src="/images/AstrotekHeroBig.webp" alt="Software Astrotek Big" className="absolute bottom-0 right-0 w-[85%] h-auto border border-white/5 rounded-2xl shadow-2xl z-10 donabarba-float-reverse" />
              <img src="/images/AstrotekHeroSmall.webp" alt="Software Astrotek Small" className="absolute top-0 left-0 w-[50%] h-auto border border-white/5 rounded-2xl shadow-2xl z-20 donabarba-float" />
            </div>
          </div>
        </section>

        {/* SECÇÃO 3 — RESUMO RÁPIDO */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto bg-[#141414] border border-border rounded-[2.5rem] p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-border">
              <div className="flex flex-col lg:px-6 first:pl-0 last:pr-0 py-4 sm:py-0">
                <span className="text-5xl font-display font-medium text-primary mb-3">2 Semanas</span>
                <span className="text-lg font-semibold mb-1">Tempo de Implementação</span>
                <span className="text-gray-400 text-sm">Do briefing ao lançamento</span>
              </div>
              <div className="flex flex-col lg:px-6 first:pl-0 last:pr-0 py-4 sm:py-0">
                <span className="text-5xl font-display font-medium text-primary mb-3">2 em 1</span>
                <span className="text-lg font-semibold mb-1">Plataformas Desenvolvidas</span>
                <span className="text-gray-400 text-sm">Portal do cliente e dashboard do profissional</span>
              </div>
              <div className="flex flex-col lg:px-6 first:pl-0 last:pr-0 py-4 sm:py-0">
                <span className="text-5xl font-display font-medium text-primary mb-3">100%</span>
                <span className="text-lg font-semibold mb-1">Processos Centralizados</span>
                <span className="text-gray-400 text-sm">Stock, pedidos e faturamento num único lugar</span>
              </div>
              <div className="flex flex-col lg:px-6 first:pl-0 last:pr-0 py-4 sm:py-0">
                <span className="text-5xl font-display font-medium text-primary mb-3">0</span>
                <span className="text-lg font-semibold mb-1">Tarefas Repetitivas</span>
                <span className="text-gray-400 text-sm">Lembretes e gestão totalmente automatizados</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECÇÃO 4 — O DESAFIO */}
        <section className="py-24 px-6 relative" ref={challengeRef}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className={`lg:sticky lg:top-32 card-animate ${challengeInView ? 'is-visible' : ''}`}>
              <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">O DESAFIO</p>
              <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 leading-tight">
                Gerir um negócio de reparações sem ferramentas certas é caos
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                A Astrotek recebia pedidos de orçamento por mensagem, telefone e presencialmente — sem registo, sem organização e sem controlo. A gestão de stock era feita manualmente, os lembretes aos clientes eram esquecidos e o faturamento estava espalhado por várias folhas. O negócio crescia, mas a desorganização crescia mais rápido.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { icon: Inbox, title: "Pedidos Desorganizados", desc: "Orçamentos recebidos por múltiplos canais sem qualquer registo centralizado." },
                { icon: Package, title: "Stock Sem Controlo", desc: "Gestão de peças e equipamentos feita manualmente, com erros e perdas frequentes." },
                { icon: Bell, title: "Comunicação Ineficiente", desc: "Clientes sem atualizações sobre o estado das reparações, gerando contactos desnecessários e insatisfação." }
              ].map((card, i) => (
                <div key={i} className={`bg-[#0f1117] border border-border p-8 rounded-[2rem] hover:border-white/20 transition-colors card-animate ${challengeInView ? 'is-visible' : ''}`} style={{ animationDelay: `${i * 150 + 200}ms` }}>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <card.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-3">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-base">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECÇÃO 5 — A SOLUÇÃO */}
        <section className="py-24 px-6 relative bg-[#0f0f0f]" ref={solutionRef}>
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 ${solutionInView ? 'reveal-up' : 'opacity-0'}`}>
              <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">A SOLUÇÃO</p>
              <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6 leading-tight max-w-3xl mx-auto">
                Um software com dois lados — um para o cliente, outro para o profissional
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Desenvolvemos uma plataforma completa com duas experiências distintas mas integradas — pensada especificamente para o modelo de negócio da Astrotek.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Smartphone, title: "Portal do Cliente", desc: "O cliente pede orçamento online em menos de 2 minutos. Seleciona o equipamento, descreve o problema e submete — sem telefonemas, sem esperas." },
                { icon: LayoutDashboard, title: "Dashboard do Profissional", desc: "Gestão completa de pedidos, stock, faturamento e comunicação com clientes — tudo centralizado num único ecrã." },
                { icon: Bell, title: "Lembretes Automáticos", desc: "Quando a reparação fica pronta, o cliente recebe automaticamente uma notificação — sem o profissional precisar de fazer nada." }
              ].map((card, i) => (
                <div key={i} className={`bg-[#141414] border-t-2 border-t-primary border-x border-b border-white/5 p-8 rounded-b-[2rem] rounded-t-sm hover:-translate-y-2 transition-transform duration-300 ${solutionInView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 150 + 200}ms` }}>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <card.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-3">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-base">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECÇÃO 6 — O RESULTADO */}
        <section className="py-24 px-6 relative" ref={resultRef}>
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 ${resultInView ? 'reveal-up' : 'opacity-0'}`}>
              <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">O RESULTADO</p>
              <h2 className="text-4xl md:text-5xl font-display font-semibold leading-tight">
                O que mudou depois do lançamento
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {[
                { metric: "80%", title: "Menos Tempo Administrativo", desc: "A equipa deixou de gerir pedidos manualmente e passou a focar-se exclusivamente no serviço." },
                { metric: "3x", title: "Mais Organização Operacional", desc: "Stock, pedidos e faturamento geridos num único lugar, em tempo real." },
                { metric: "100%", title: "Clientes Sempre Informados", desc: "Zero chamadas para saber o estado da reparação — os lembretes automáticos tratam de tudo." }
              ].map((card, i) => (
                <div key={i} className={`flex flex-col items-center text-center p-6 ${resultInView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 150 + 200}ms` }}>
                  <span className="text-6xl md:text-7xl font-display font-bold text-primary mb-6 drop-shadow-[0_0_15px_rgba(0,187,45,0.4)]">{card.metric}</span>
                  <h3 className="text-2xl font-display font-semibold mb-3">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed max-w-sm">{card.desc}</p>
                </div>
              ))}
            </div>
            
            <p className={`text-xl md:text-2xl text-center text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed ${resultInView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
              A Astrotek passou de um negócio gerido por mensagens e notas dispersas para uma operação centralizada, organizada e escalável — sem contratar mais ninguém.
            </p>
          </div>
        </section>

        {/* SECÇÃO 7 — TESTEMUNHO */}
        <section className="py-24 px-6 bg-[#0f0f0f] border-y border-border" ref={testimonialRef}>
          <div className={`max-w-[800px] mx-auto bg-surface border border-primary/40 p-10 md:p-16 rounded-[3rem] text-center relative shadow-[0_0_50px_rgba(0,187,45,0.05)] ${testimonialInView ? 'reveal-up' : 'opacity-0'}`}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center">
              <span className="text-3xl text-primary font-serif leading-none mt-2">"</span>
            </div>
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-10 italic">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex flex-col items-center">
              <TestimonialLogo testimonial={testimonial} className="mb-4" />
              <h4 className="text-lg font-display font-semibold">{testimonial.name}</h4>
              <p className="text-gray-400 text-sm mt-1">{testimonial.role}</p>
            </div>
          </div>
        </section>

        {/* SECÇÃO 8 — LAST CTA */}
        <CTA 
          onOpenModal={() => setIsModalOpen(true)} 
          shadowColor="rgba(0, 187, 45, 0.7)"
          gradientFrom="from-green-600/50"
          gradientTo="to-green-400/50"
        />

      </main>

      {/* SECÇÃO 9 — FOOTER */}
      <Footer />

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
