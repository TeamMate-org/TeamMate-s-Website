import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Footer, CTA } from './App';
import { LeadModal } from './components/LeadModal';
import { Settings, LayoutDashboard, CalendarRange, Package, BarChart3, Smartphone, Users } from 'lucide-react';
import { EtherealShadow } from './components/ui/etheral-shadow';

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

export default function DonaBarba() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref: challengeRef, inView: challengeInView } = useInView();
  const { ref: solutionRef, inView: solutionInView } = useInView();
  const { ref: resultRef, inView: resultInView } = useInView();
  const { ref: testimonialRef, inView: testimonialInView } = useInView();

  return (
    <div className="donabarba-theme min-h-screen bg-[#0a0a0a] text-white selection:bg-primary/30 font-sans">
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
                color="rgba(153, 105, 53, 0.75)"
                animation={{ scale: 100, speed: 90 }}
                noise={{ opacity: 0.6, scale: 1.5 }}
              />
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:items-stretch lg:min-h-[60vh] z-10">
            <div className="flex flex-col items-start justify-center animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
              <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-display font-medium tracking-tight leading-[1] mb-6">
                Como a <span className="text-primary">DonaBarba</span> passou a gerir toda a barbearia a partir de um único sistema
              </h1>
              <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
                Desenvolvemos um sistema completo de marcações online, gestão de barbeiros, stock e faturamento — para que a equipa se foque nos clientes e deixe a burocracia para a tecnologia.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex items-center gap-3 bg-surface border border-border px-5 py-3 rounded-2xl w-max">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">Setor: <br/><span className="text-gray-400">Barbearia e Beleza</span></span>
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
              <img src="/images/DonaBarbaHeroBig.webp" alt="Software DonaBarba Big" className="absolute bottom-0 right-0 w-[85%] h-auto border border-white/5 rounded-2xl shadow-2xl z-10 donabarba-float-reverse" />
              <img src="/images/DonaBarbaHeroSmall.webp" alt="Software DonaBarba Small" className="absolute top-0 left-0 w-[50%] h-auto border border-white/5 rounded-2xl shadow-2xl z-20 donabarba-float" />
            </div>
          </div>
        </section>

        {/* SECÇÃO 3 — RESUMO RÁPIDO */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto bg-[#141414] border border-border rounded-[2.5rem] p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-border">
              <div className="flex flex-col lg:px-6 first:pl-0 last:pr-0 py-4 sm:py-0">
                <span className="text-5xl font-display font-medium text-primary mb-3">3 em 1</span>
                <span className="text-lg font-semibold mb-1">Perfis de Acesso</span>
                <span className="text-gray-400 text-sm">Cliente, barbeiro individual e super admin</span>
              </div>
              <div className="flex flex-col lg:px-6 first:pl-0 last:pr-0 py-4 sm:py-0">
                <span className="text-5xl font-display font-medium text-primary mb-3">24/7</span>
                <span className="text-lg font-semibold mb-1">Marcações Online</span>
                <span className="text-gray-400 text-sm">Clientes marcam a qualquer hora sem telefonar</span>
              </div>
              <div className="flex flex-col lg:px-6 first:pl-0 last:pr-0 py-4 sm:py-0">
                <span className="text-5xl font-display font-medium text-primary mb-3">100%</span>
                <span className="text-lg font-semibold mb-1">Gestão Centralizada</span>
                <span className="text-gray-400 text-sm">Agenda, stock e faturamento num único lugar</span>
              </div>
              <div className="flex flex-col lg:px-6 first:pl-0 last:pr-0 py-4 sm:py-0">
                <span className="text-5xl font-display font-medium text-primary mb-3">0</span>
                <span className="text-lg font-semibold mb-1">Conflitos de Agenda</span>
                <span className="text-gray-400 text-sm">Slots inteligentes que eliminam sobreposições</span>
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
                Gerir uma barbearia com vários barbeiros sem um sistema é insustentável
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                A DonaBarba recebia marcações por WhatsApp, telefone e presencialmente — sem registo centralizado e com conflitos de agenda constantes. Cada barbeiro geria o seu horário de forma independente, o stock era controlado manualmente e não havia visibilidade sobre a faturação real do negócio. Com o crescimento da equipa, o caos crescia na mesma proporção.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { icon: CalendarRange, title: "Conflitos de Agenda", desc: "Marcações duplicadas e sobreposições frequentes por falta de um sistema centralizado." },
                { icon: BarChart3, title: "Sem Visibilidade do Negócio", desc: "Impossível saber a faturação real, taxa de ocupação ou desempenho individual de cada barbeiro." },
                { icon: Package, title: "Stock Descontrolado", desc: "Produtos em falta sem aviso prévio, sem controlo de inventário e sem alertas de reposição." }
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
                Um sistema com três níveis — cliente, barbeiro e administrador
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Desenvolvemos uma plataforma completa com três experiências distintas mas totalmente integradas — cada utilizador vê exatamente o que precisa, sem complexidade desnecessária.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Smartphone, title: "Portal do Cliente", desc: "Marcação online passo-a-passo — escolhe o barbeiro, o serviço, a data e a hora. Também pode consultar, reagendar ou cancelar a sua marcação a qualquer momento." },
                { icon: Users, title: "Painel do Barbeiro", desc: "Vista diária, semanal e mensal das marcações, criação de marcações manuais, gestão de horário, bloqueio de agenda e estatísticas individuais com faturação detalhada." },
                { icon: LayoutDashboard, title: "Super Admin", desc: "Visão completa de todos os barbeiros em simultâneo, gestão de serviços e preços, controlo de stock com alertas e dashboard analítico centralizado." }
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
                { metric: "100%", title: "Marcações Sem Conflitos", desc: "Os slots inteligentes calculam automaticamente os intervalos reais e eliminam completamente as sobreposições de agenda." },
                { metric: "3x", title: "Mais Controlo Operacional", desc: "Agenda, stock e faturamento de toda a equipa visíveis em tempo real num único dashboard." },
                { metric: "24/7", title: "Disponibilidade para Marcações", desc: "Os clientes marcam online a qualquer hora, sem depender de chamadas ou mensagens." }
              ].map((card, i) => (
                <div key={i} className={`flex flex-col items-center text-center p-6 ${resultInView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: `${i * 150 + 200}ms` }}>
                  <span className="text-6xl md:text-7xl font-display font-bold text-primary mb-6 drop-shadow-[0_0_15px_rgba(153,105,53,0.4)]">{card.metric}</span>
                  <h3 className="text-2xl font-display font-semibold mb-3">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed max-w-sm">{card.desc}</p>
                </div>
              ))}
            </div>
            
            <p className={`text-xl md:text-2xl text-center text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed ${resultInView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
              "A DonaBarba passou de uma gestão caótica por WhatsApp e telefone para um sistema profissional, organizado e escalável — com total visibilidade sobre o negócio em tempo real."
            </p>
          </div>
        </section>

        {/* SECÇÃO 7 — TESTEMUNHO */}
        <section className="py-24 px-6 bg-[#0f0f0f] border-y border-border" ref={testimonialRef}>
          <div className={`max-w-[800px] mx-auto bg-surface border border-primary/40 p-10 md:p-16 rounded-[3rem] text-center relative shadow-[0_0_50px_rgba(153,105,53,0.05)] ${testimonialInView ? 'reveal-up' : 'opacity-0'}`}>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center">
              <span className="text-3xl text-primary font-serif leading-none mt-2">"</span>
            </div>
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-10 italic">
              "Antes passávamos mais tempo a gerir marcações do que a cortar cabelo. Agora o sistema trata de tudo — os clientes marcam sozinhos, recebemos as confirmações automaticamente e temos sempre uma visão clara do que se passa no negócio. Não imagino trabalhar sem isto."
            </p>
            <div className="flex flex-col items-center">
              <img src="https://via.placeholder.com/150x150/111111/444444?text=Ricardo" alt="Ricardo Miranda" className="w-16 h-16 rounded-full mb-4 object-cover border-2 border-primary/30" />
              <h4 className="text-lg font-display font-semibold">Ricardo Miranda</h4>
              <p className="text-gray-400 text-sm mt-1">Fundador, DonaBarba</p>
            </div>
          </div>
        </section>

        {/* SECÇÃO 8 — LAST CTA */}
        <CTA 
          onOpenModal={() => setIsModalOpen(true)} 
          shadowColor="rgba(153, 105, 53, 0.7)"
          gradientFrom="from-[#996935]/50"
          gradientTo="to-[#7b5329]/50"
          title="O teu negócio tem desafios semelhantes?"
          description="Marca uma call gratuita e mostramos-te como podemos construir a solução certa para ti — sem compromisso, sem complicações."
        />

      </main>

      {/* SECÇÃO 9 — FOOTER */}
      <Footer />

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
