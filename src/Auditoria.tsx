import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown, X, Loader2, CheckCircle, Search, FileText, ThumbsUp,
  Instagram, Linkedin
} from 'lucide-react';

import { Navbar, Footer } from './App';
import { LeadModal } from './components/LeadModal';
import { EtherealShadow } from './components/ui/etheral-shadow';
import { supabase } from './lib/supabase';

/* ─── Focus style helper ─────────────────────────────── */
const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

/* ─── Coral accent color ─────────────────────────────── */
const coral = '#ff956b';
const coralHover = '#ff7a47';

/* ─── useInView hook ─────────────────────────────────── */
function useInView(threshold = 0.12) {
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

/* ─── SECTION 1 — Hero ───────────────────────────────── */
const AuditoriaHero = ({ onScrollToForm }: { onScrollToForm: () => void }) => {
  return (
    <section className="relative pt-32 md:pt-44 pb-24 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50 flex items-center justify-center">
        <div className="w-[300%] h-[150%] md:w-full md:h-full flex-shrink-0">
          <EtherealShadow
            color="rgba(5, 102, 141, 0.65)"
            animation={{ scale: 100, speed: 70 }}
            noise={{ opacity: 0.5, scale: 1.5 }}
          />
        </div>
      </div>

      {/* Coral accent glow top-right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(255,149,107,0.12) 0%, transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center z-10">
        {/* Pill badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-8 animate-slide-up-fade"
          style={{
            borderColor: 'rgba(255,149,107,0.3)',
            background: 'rgba(255,149,107,0.08)',
            animationDelay: '0ms',
          }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: coral }} />
          <span className="text-sm font-medium" style={{ color: coral }}>Auditoria 100% Gratuita</span>
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-[4.5rem] font-display font-semibold tracking-tight leading-[1.05] mb-7 animate-slide-up-fade"
          style={{ animationDelay: '100ms' }}
        >
          <span className="text-white">A tua empresa está pronta</span>
          <br />
          <span className="text-white">para a IA — ou estás a</span>
          <br />
          <span style={{ color: coral }}>perder tempo sem saber?</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed animate-slide-up-fade"
          style={{ animationDelay: '280ms' }}
        >
          Fazemos uma auditoria gratuita ao teu negócio e dizemos-te exatamente onde a IA pode poupar tempo, reduzir custos e fazer a tua equipa trabalhar melhor.{' '}
          <span className="text-gray-300 font-medium">Sem compromisso.</span>
        </p>

        {/* CTA Button */}
        <div
          className="flex flex-col items-center gap-4 animate-slide-up-fade"
          style={{ animationDelay: '460ms' }}
        >
          <div className="relative group">
            <div
              className="absolute -inset-1 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"
              style={{ background: `linear-gradient(135deg, ${coral}, #ff7a47)` }}
              aria-hidden="true"
            />
            <button
              onClick={onScrollToForm}
              id="hero-cta-button"
              className={`relative px-9 py-4 text-white font-semibold rounded-xl transition-all duration-300 cursor-pointer text-lg shadow-xl ${focusRing}`}
              style={{ background: coral }}
              onMouseEnter={e => (e.currentTarget.style.background = coralHover)}
              onMouseLeave={e => (e.currentTarget.style.background = coral)}
            >
              Quero a minha auditoria gratuita ↓
            </button>
          </div>
          {/* Trust signal */}
          <p className="text-xs font-display text-gray-500 tracking-wide">
            Gratuito &nbsp;·&nbsp; Sem compromisso &nbsp;·&nbsp; Resposta em 24h
          </p>
        </div>
      </div>

      {/* Dashboard mockup decoration */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[200px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(5,102,141,0.15) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
    </section>
  );
};

/* ─── SECTION 2 — Problema ───────────────────────────── */
const pains = [
  'A tua equipa passa horas a fazer copy-paste entre ferramentas',
  'Respondes a emails e pedidos sempre de forma manual',
  'Perdes leads porque não consegues dar resposta a tempo',
  'Crias propostas e documentos do zero todas as vezes',
  'Sabes que a IA pode ajudar — mas não sabes por onde começar',
];

const Problema = () => {
  const { ref, inView } = useInView();
  return (
    <section className="py-24 px-6" style={{ background: '#0d1820' }} ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className={`mb-12 text-center ${inView ? 'reveal-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Identificação da Dor</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold leading-tight">
            Reconheces alguma destas situações?
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {pains.map((pain, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-5 rounded-2xl border transition-colors duration-200 hover:border-white/20 group ${inView ? 'reveal-up' : 'opacity-0'}`}
              style={{
                animationDelay: `${i * 90 + 150}ms`,
                background: 'rgba(255,255,255,0.03)',
                borderColor: 'rgba(255,255,255,0.07)',
              }}
            >
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5 text-sm font-bold transition-colors duration-200"
                style={{ background: 'rgba(255,68,68,0.12)', color: '#ff4444', border: '1.5px solid rgba(255,68,68,0.3)' }}
              >
                ✕
              </span>
              <p className="text-gray-300 text-base leading-relaxed group-hover:text-white transition-colors duration-200">
                {pain}
              </p>
            </div>
          ))}
        </div>

        <div className={`mt-10 text-center ${inView ? 'reveal-up' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
          <p className="text-gray-400 text-lg leading-relaxed">
            Se assinalaste pelo menos uma,{' '}
            <span className="text-white font-medium">a auditoria é para ti.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─── SECTION 3 — Solução ────────────────────────────── */
const deliverables = [
  {
    Icon: Search,
    title: 'Diagnóstico personalizado',
    desc: 'Analisamos os teus processos atuais e identificamos onde a IA tem maior impacto para o teu tipo de negócio.',
  },
  {
    Icon: FileText,
    title: 'Relatório de oportunidades',
    desc: 'Recebes um documento com as áreas de maior potencial, estimativas de poupança e sugestões concretas.',
  },
  {
    Icon: ThumbsUp,
    title: 'Resposta direta: vale a pena ou não?',
    desc: 'Dizemos-te com honestidade se a IA faz sentido para o teu negócio agora. Sem pressão de venda.',
  },
];

const Solucao = () => {
  const { ref, inView } = useInView();
  return (
    <section className="py-24 px-6 bg-surface/30" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className={`mb-6 text-center ${inView ? 'reveal-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">O que recebes</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold leading-tight mb-6">
            O que é a Auditoria Gratuita de IA?
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Em 20 a 30 minutos, analisamos o teu negócio contigo e identificamos os processos que mais beneficiariam de automação com IA. No final, tens um mapa claro do que pode ser feito, quanto tempo isso pouparia e se faz sentido avançar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {deliverables.map((item, i) => (
            <div
              key={i}
              className={`group relative flex flex-col gap-5 p-8 rounded-3xl bg-surface border border-border hover:border-white/20 transition-all duration-300 overflow-hidden ${inView ? 'reveal-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 100 + 200}ms` }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(255,149,107,0.1) 0%, transparent 65%)' }}
                aria-hidden="true"
              />
              {/* Icon */}
              <div
                className="relative z-10 w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: 'rgba(255,149,107,0.12)', border: '1.5px solid rgba(255,149,107,0.25)' }}
              >
                <item.Icon className="w-6 h-6" style={{ color: coral }} aria-hidden="true" />
              </div>
              {/* Text */}
              <div className="relative z-10">
                <h3 className="text-xl font-display font-semibold mb-3 leading-snug">{item.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── SECTION 4 — Processo ───────────────────────────── */
const steps = [
  {
    num: 1,
    title: 'Preenchas o formulário',
    desc: 'Diz-nos o teu nome, empresa e o maior desafio operacional que enfrentas. Demora menos de 1 minuto.',
  },
  {
    num: 2,
    title: 'Entramos em contacto em 24h',
    desc: 'A nossa equipa analisa o teu caso e entra em contacto para agendar a sessão de diagnóstico.',
  },
  {
    num: 3,
    title: 'Sessão de 20 a 30 minutos',
    desc: 'Uma conversa por videochamada onde mapeamos os teus processos e identificamos oportunidades.',
  },
  {
    num: 4,
    title: 'Recebes o teu relatório',
    desc: 'Num prazo de 48h após a sessão, enviamos-te um relatório com tudo o que encontrámos e o que recomendamos.',
  },
];

const Processo = () => {
  const { ref, inView } = useInView();
  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className={`mb-14 text-center ${inView ? 'reveal-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Passo a passo</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold leading-tight">
            Como funciona, passo a passo
          </h2>
        </div>

        {/* Desktop: horizontal stepper */}
        <div className="hidden md:grid grid-cols-4 gap-4 relative">
          {/* Connecting line */}
          <div
            className="absolute top-8 left-[12.5%] right-[12.5%] h-px"
            style={{ background: 'linear-gradient(90deg, rgba(5,102,141,0.4) 0%, rgba(255,149,107,0.4) 100%)' }}
            aria-hidden="true"
          />
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center gap-4 ${inView ? 'reveal-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 120 + 150}ms` }}
            >
              {/* Number circle */}
              <div
                className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-2xl font-display font-bold text-white flex-shrink-0 shadow-xl"
                style={{
                  background: i < 2
                    ? `linear-gradient(135deg, #05668d, #044e6b)`
                    : `linear-gradient(135deg, ${coral}, ${coralHover})`,
                  boxShadow: i < 2
                    ? '0 0 24px rgba(5,102,141,0.3)'
                    : `0 0 24px rgba(255,149,107,0.3)`,
                }}
                aria-label={`Passo ${step.num}`}
              >
                {step.num}
              </div>
              <div>
                <h3 className="text-base font-display font-semibold mb-2 leading-snug">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: vertical stepper */}
        <div className="md:hidden relative">
          <div
            className="absolute left-[19px] top-8 bottom-8 w-px"
            style={{ background: 'linear-gradient(180deg, rgba(5,102,141,0.4), rgba(255,149,107,0.4))' }}
            aria-hidden="true"
          />
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex items-start gap-5 mb-10 last:mb-0 ${inView ? 'reveal-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 120 + 150}ms` }}
            >
              <div
                className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-display font-bold text-white"
                style={{
                  background: i < 2
                    ? `linear-gradient(135deg, #05668d, #044e6b)`
                    : `linear-gradient(135deg, ${coral}, ${coralHover})`,
                }}
                aria-label={`Passo ${step.num}`}
              >
                {step.num}
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-display font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── SECTION 5 — Prova Social ───────────────────────── */
const metrics = [
  { value: '80%', label: 'Redução de tarefas manuais no primeiro mês' },
  { value: '+200h', label: 'Poupadas por mês em média' },
  { value: '1–4 sem.', label: 'Do diagnóstico à implementação' },
  { value: '97%', label: 'De satisfação após 60 dias' },
];

const ProvaSocial = () => {
  const { ref, inView } = useInView();
  return (
    <section className="py-24 px-6 bg-surface/30" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <div className={`mb-14 text-center ${inView ? 'reveal-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">Resultados reais</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold leading-tight">
            O que os nossos clientes conseguiram
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <div
              key={i}
              className={`group relative flex flex-col items-center text-center p-7 rounded-3xl bg-surface border border-border hover:border-white/20 transition-all duration-300 overflow-hidden ${inView ? 'reveal-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 100 + 150}ms` }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,149,107,0.1) 0%, transparent 70%)' }}
                aria-hidden="true"
              />
              <p
                className="text-4xl md:text-5xl font-display font-bold mb-3 relative z-10"
                style={{ color: coral }}
              >
                {m.value}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed relative z-10">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── SECTION 6 — FAQ ────────────────────────────────── */
const auditoriaFaqs = [
  {
    q: 'É mesmo gratuito? Qual é o compromisso?',
    a: 'Sim, completamente gratuito e sem qualquer compromisso. No final da sessão podes decidir se queres avançar connosco ou não. Não há pressão.',
  },
  {
    q: 'A minha empresa é pequena. Faz sentido mesmo assim?',
    a: 'Sim. Trabalhamos com PMEs de todos os tamanhos. Muitas vezes são as empresas mais pequenas que têm mais a ganhar com automação — porque cada hora da equipa conta mais.',
  },
  {
    q: 'Quanto tempo demora a sessão?',
    a: 'Entre 20 a 30 minutos por videochamada. Pedimos que venhas com uma ideia dos processos que mais te consomem tempo.',
  },
  {
    q: 'Precisamos de já usar ferramentas de IA?',
    a: 'Não. A maioria dos nossos clientes começa do zero. Partimos sempre do que já usas e construímos em cima disso.',
  },
  {
    q: 'O que acontece depois da auditoria?',
    a: 'Recebes um relatório. Se quiseres avançar com implementação, apresentamos uma proposta. Se não, fica com o relatório de qualquer forma — é teu.',
  },
];

const AuditoriaFAQ = () => {
  const { ref, inView } = useInView();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = useCallback((i: number) => {
    setOpenIndex(prev => prev === i ? null : i);
  }, []);

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <div className={`mb-12 text-center ${inView ? 'reveal-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">FAQs</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold leading-tight">
            Perguntas frequentes
          </h2>
        </div>

        <div className="flex flex-col gap-4" role="list">
          {auditoriaFaqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-2xl bg-surface border border-border hover:border-white/20 transition-colors duration-200 overflow-hidden ${inView ? 'reveal-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 90 + 200}ms` }}
              role="listitem"
            >
              <button
                className={`w-full p-6 flex justify-between items-center cursor-pointer text-left ${focusRing} rounded-2xl`}
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`auditoria-faq-answer-${i}`}
                id={`auditoria-faq-question-${i}`}
              >
                <span className="text-base font-medium pr-4">{faq.q}</span>
                <div
                  className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              <div
                id={`auditoria-faq-answer-${i}`}
                role="region"
                aria-labelledby={`auditoria-faq-question-${i}`}
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

/* ─── SECTION 7 — Formulário + CTA Final ────────────── */
interface AuditoriaFormData {
  nome: string;
  email: string;
  empresa: string;
  cargo: string;
  desafio: string;
}

const AuditoriaForm = React.forwardRef<HTMLElement>((_, ref) => {
  const { ref: inViewRef, inView } = useInView();
  const [formData, setFormData] = useState<AuditoriaFormData>({
    nome: '',
    email: '',
    empresa: '',
    cargo: '',
    desafio: '',
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const isValid = formData.nome.trim() && formData.email.trim() && formData.empresa.trim() && formData.cargo.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('auditoria')
        .insert([{
          nome: formData.nome,
          email: formData.email,
          empresa: formData.empresa,
          cargo: formData.cargo,
          desafio: formData.desafio
        }]);

      if (error) throw error;

      setSubmitStatus('success');
      setShowConfirm(true);
      setFormData({ nome: '', email: '', empresa: '', cargo: '', desafio: '' });
    } catch {
      setSubmitStatus('error');
      setShowConfirm(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="formulario-auditoria"
      ref={(el) => {
        inViewRef.current = el;
        if (typeof ref === 'function') ref(el);
        else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(5,102,141,0.12) 0%, rgba(8,14,20,1) 55%, rgba(255,149,107,0.07) 100%)',
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(5,102,141,0.2) 0%, transparent 60%)' }}
        aria-hidden="true"
      />

      <div className="max-w-xl mx-auto relative z-10">
        <div className={`mb-10 text-center ${inView ? 'reveal-up' : 'opacity-0'}`}>
          <p className="text-primary font-medium text-sm tracking-wide uppercase mb-3">CTA Final</p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold leading-tight mb-4">
            Pede a tua auditoria gratuita agora
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Preenche o formulário. A nossa equipa entra em contacto em menos de 24 horas.
          </p>
        </div>

        <div
          className={`bg-[#111318] p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl ${inView ? 'reveal-up' : 'opacity-0'}`}
          style={{ animationDelay: '150ms' }}
        >
          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            {/* Nome */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-display font-medium text-gray-300">
                Nome completo <span style={{ color: coral }}>*</span>
              </label>
              <input
                id="auditoria-nome"
                type="text"
                placeholder="O teu nome"
                value={formData.nome}
                onChange={e => setFormData({ ...formData, nome: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all duration-300"
                style={{ '--tw-ring-color': coral } as React.CSSProperties}
                onFocus={e => { e.currentTarget.style.borderColor = coral; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-display font-medium text-gray-300">
                Email profissional <span style={{ color: coral }}>*</span>
              </label>
              <input
                id="auditoria-email"
                type="email"
                placeholder="O teu email profissional"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all duration-300"
                onFocus={e => { e.currentTarget.style.borderColor = coral; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                required
              />
            </div>

            {/* Empresa */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-display font-medium text-gray-300">
                Nome da empresa <span style={{ color: coral }}>*</span>
              </label>
              <input
                id="auditoria-empresa"
                type="text"
                placeholder="Ex: Minha Empresa, Lda."
                value={formData.empresa}
                onChange={e => setFormData({ ...formData, empresa: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all duration-300"
                onFocus={e => { e.currentTarget.style.borderColor = coral; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                required
              />
            </div>

            {/* Cargo */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-display font-medium text-gray-300">
                Cargo <span style={{ color: coral }}>*</span>
              </label>
              <input
                id="auditoria-cargo"
                type="text"
                placeholder="Ex: CEO, Diretor Operacional, etc."
                value={formData.cargo}
                onChange={e => setFormData({ ...formData, cargo: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all duration-300"
                onFocus={e => { e.currentTarget.style.borderColor = coral; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
                required
              />
            </div>

            {/* Desafio */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-display font-medium text-gray-300">
                Qual é o maior desafio operacional da tua empresa?{' '}
                <span className="text-gray-500 font-normal">(opcional)</span>
              </label>
              <textarea
                id="auditoria-desafio"
                placeholder="Descreve brevemente o desafio que mais te consome tempo ou recursos..."
                value={formData.desafio}
                onChange={e => setFormData({ ...formData, desafio: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 min-h-[110px] resize-y focus:outline-none transition-all duration-300"
                onFocus={e => { e.currentTarget.style.borderColor = coral; }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
              />
            </div>

            {/* Submit button */}
            <div className="relative group mt-2">
              <div
                className={`absolute -inset-1 rounded-xl blur transition duration-500 ${isValid ? 'opacity-30 group-hover:opacity-60' : 'opacity-0'}`}
                style={{ background: `linear-gradient(135deg, ${coral}, ${coralHover})` }}
                aria-hidden="true"
              />
              <button
                id="auditoria-submit-button"
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`relative w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-white ${isValid && !isSubmitting
                  ? 'cursor-pointer shadow-lg'
                  : 'cursor-not-allowed opacity-40'
                  }`}
                style={isValid && !isSubmitting
                  ? { background: coral }
                  : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.05)' }
                }
                onMouseEnter={e => { if (isValid && !isSubmitting) e.currentTarget.style.background = coralHover; }}
                onMouseLeave={e => { if (isValid && !isSubmitting) e.currentTarget.style.background = coral; }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    A enviar...
                  </>
                ) : (
                  'Quero a minha auditoria gratuita →'
                )}
              </button>
            </div>

            <p className="text-xs text-gray-600 text-center mt-1">
              Os teus dados estão seguros e nunca serão partilhados com terceiros.
            </p>
          </form>
        </div>
      </div>

      {/* Confirmation / Error modal */}
      <AnimatePresence>
        {showConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm"
              onClick={() => setShowConfirm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#111318] border border-white/10 rounded-2xl p-8 md:p-10 text-center shadow-2xl flex flex-col items-center"
            >
              <button
                onClick={() => setShowConfirm(false)}
                className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>

              {submitStatus === 'success' ? (
                <>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(255,149,107,0.12)' }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                      <CheckCircle className="w-10 h-10" style={{ color: coral }} />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-3 text-white">
                    Pedido recebido!
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-3">
                    Recebemos o teu pedido! Entraremos em contacto nas próximas 24 horas para agendar a tua sessão.
                  </p>
                  <p className="text-sm text-gray-500 mb-8">
                    Verifica o teu email (incluindo a pasta de spam).
                  </p>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="w-full py-3.5 text-white rounded-xl font-medium transition-colors flex items-center justify-center cursor-pointer shadow-lg"
                    style={{ background: coral }}
                    onMouseEnter={e => { e.currentTarget.style.background = coralHover; }}
                    onMouseLeave={e => { e.currentTarget.style.background = coral; }}
                  >
                    Fechar
                  </button>
                </>
              ) : (
                <>
                  <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                      <X className="w-10 h-10 text-red-500" />
                    </motion.div>
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-3 text-white">Ocorreu um erro</h3>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    Não foi possível enviar o teu pedido. Por favor, tenta novamente ou contacta-nos diretamente em geral@myteammate.pt.
                  </p>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="w-full py-3.5 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer border border-white/10"
                  >
                    Tentar Novamente
                  </button>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
});
AuditoriaForm.displayName = 'AuditoriaForm';

/* ─── Page ───────────────────────────────────────────── */
const Auditoria = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    document.title = 'Auditoria Gratuita de IA para o teu Negócio — TeamMate';
    // Set meta description
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content =
      'Auditoria gratuita de IA para o teu negócio. Identificamos onde a IA pode poupar tempo, reduzir custos e melhorar a tua equipa — sem compromisso e com resposta em 24h.';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary/30 overflow-x-hidden">
      <Navbar onOpenModal={scrollToForm} hideNavLinks ctaText="Agendar Auditoria" />

      <main>
        <AuditoriaHero onScrollToForm={scrollToForm} />
        <Problema />
        <Solucao />
        <Processo />
        <ProvaSocial />
        <AuditoriaFAQ />
        <AuditoriaForm ref={formRef} />
      </main>

      <Footer />

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Auditoria;
