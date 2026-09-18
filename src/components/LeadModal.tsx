import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ChevronDown, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

interface LeadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LeadModal({ isOpen, onClose }: LeadModalProps) {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [leadId, setLeadId] = useState<string | null>(null);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        acceptTerms: false,
        company: '',
        revenue: '',
        challenge: ''
    });

    // reset state when modal opens or closes
    React.useEffect(() => {
        if (isOpen) {
            setStep(1);
            setDirection(1);
            setFormData({
                name: '',
                email: '',
                phone: '',
                acceptTerms: false,
                company: '',
                revenue: '',
                challenge: ''
            });
            setLeadId(null);
            setSubmitStatus('idle');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleNext = async () => {
        if (!step1Valid) return;

        try {
            const newLeadId = crypto.randomUUID();

            const { error } = await supabase
                .from('leads')
                .insert([
                    {
                        id: newLeadId,
                        nome: formData.name,
                        email: formData.email,
                        telefone: formData.phone,
                        aceitou_termos: formData.acceptTerms,
                        passo_concluido: 1
                    }
                ]);

            if (error) {
                console.error('Error saving lead (step 1):', error);
                alert('Ocorreu um erro. Por favor, tenta novamente.');
                return;
            }

            setLeadId(newLeadId);
            setDirection(1);
            setStep(2);
        } catch (err) {
            console.error('Unexpected error:', err);
        }
    };

    const handlePrev = () => {
        setDirection(-1);
        setStep(1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!step2Valid || !leadId) return;

        setDirection(1);
        setStep(3);
        setSubmitStatus('loading');

        try {
            const supabaseRequest = supabase.rpc('update_lead_step_2', {
                lead_id: leadId,
                p_empresa: formData.company,
                p_faturacao: formData.revenue,
                p_desafio: formData.challenge
            });

            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error("Timeout de envio: O pedido demorou mais de 6 segundos.")), 6000);
            });

            const { error } = await Promise.race([supabaseRequest, timeoutPromise]) as any;

            if (error) {
                console.error('Error updating lead (step 2):', error);
                setSubmitStatus('error');
                return;
            }

            setSubmitStatus('success');
        } catch (err) {
            console.error('Unexpected error or timeout:', err);
            setSubmitStatus('error');
        }
    };

    const handleClose = () => {
        if (step === 3) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        onClose();
    };

    const step1Valid = formData.name.trim() !== '' && formData.email.trim() !== '' && formData.phone.trim() !== '' && formData.acceptTerms;
    const step2Valid = formData.company.trim() !== '' && formData.revenue !== '' && formData.challenge !== '';

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" aria-modal="true" role="dialog">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={handleClose}
            />

            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: 'spring', mdamping: 30, stiffness: 300 }}
                className="relative w-full max-w-lg bg-surface border border-border rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[95vh] sm:max-h-[90vh]"
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className={`absolute top-4 right-4 z-10 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ${focusRing}`}
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Progress Bar (Only for Step 1 and 2) */}
                {step < 3 && (
                    <div className="w-full bg-white/5 h-1">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: step === 1 ? '50%' : '100%' }}
                            animate={{ width: step === 1 ? '50%' : '100%' }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                )}

                {/* Content area */}
                <div className="p-6 sm:p-10 overflow-y-auto overflow-x-hidden relative flex-1 min-h-[450px]">
                    <AnimatePresence mode="wait" custom={direction}>
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="flex flex-col h-full"
                            >
                                <div className="mb-2 text-sm text-primary-text font-medium tracking-wide uppercase">Passo 1 de 2</div>
                                <h3 className="text-3xl font-display font-semibold mb-3">Vamos conhecer-nos</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">Preenche os teus dados e a nossa equipa entra em contacto contigo brevemente — sem compromisso.</p>

                                <div className="space-y-4 mb-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="name">Nome completo</label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="O teu nome"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className={`w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 hover:border-white/20 focus:border-primary transition-colors ${focusRing}`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="O teu email profissional"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className={`w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 hover:border-white/20 focus:border-primary transition-colors ${focusRing}`}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="phone">Telefone</label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            placeholder="O teu número de telefone"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className={`w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 hover:border-white/20 focus:border-primary transition-colors ${focusRing}`}
                                        />
                                    </div>
                                    <label className="flex items-start gap-3 mt-6 cursor-pointer group">
                                        <div className="relative flex items-center justify-center mt-0.5">
                                            <input
                                                type="checkbox"
                                                checked={formData.acceptTerms}
                                                onChange={e => setFormData({ ...formData, acceptTerms: e.target.checked })}
                                                className={`peer appearance-none w-5 h-5 border border-white/20 rounded bg-black/50 checked:bg-primary checked:border-primary transition-colors cursor-pointer ${focusRing}`}
                                            />
                                            <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                            Aceito ser contactado/a pela TeamMate
                                        </span>
                                    </label>
                                </div>

                                <div className="mt-auto">
                                    <button
                                        onClick={handleNext}
                                        disabled={!step1Valid}
                                        className={`w-full py-4 rounded-xl font-medium transition-all duration-300 text-center ${step1Valid ? 'bg-primary hover:bg-primary-hover text-white shadow-[0_0_20px_rgba(5,102,141,0.3)]' : 'bg-white/5 text-gray-500 cursor-not-allowed'} cursor-pointer ${focusRing}`}
                                    >
                                        Continuar &rarr;
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="flex flex-col h-full"
                            >
                                <div className="mb-2 text-sm text-primary-text font-medium tracking-wide uppercase">Passo 2 de 2</div>
                                <h3 className="text-3xl font-display font-semibold mb-3">Fala-nos do teu negócio</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed">Estas informações ajudam-nos a preparar a conversa para que seja o mais útil possível para ti.</p>

                                <form onSubmit={handleSubmit} className="flex flex-col flex-1">
                                    <div className="space-y-5 mb-8">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="company">Empresa</label>
                                            <input
                                                id="company"
                                                type="text"
                                                placeholder="Nome da tua empresa"
                                                value={formData.company}
                                                onChange={e => setFormData({ ...formData, company: e.target.value })}
                                                className={`w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 hover:border-white/20 focus:border-primary transition-colors ${focusRing}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="revenue">Faturação Anual</label>
                                            <div className="relative">
                                                <select
                                                    id="revenue"
                                                    value={formData.revenue}
                                                    onChange={e => setFormData({ ...formData, revenue: e.target.value })}
                                                    className={`w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white hover:border-white/20 focus:border-primary transition-colors appearance-none ${formData.revenue === '' ? 'text-gray-500' : ''} ${focusRing} cursor-pointer`}
                                                >
                                                    <option value="" disabled className="text-gray-500 bg-gray-900">Seleciona uma opção</option>
                                                    <option value="&lt;100k" className="bg-gray-900 text-white">Menos de 100k€</option>
                                                    <option value="100k-500k" className="bg-gray-900 text-white">100k€ — 500k€</option>
                                                    <option value="500k-1M" className="bg-gray-900 text-white">500k€ — 1M€</option>
                                                    <option value="&gt;1M" className="bg-gray-900 text-white">Mais de 1M€</option>
                                                    <option value="pnd" className="bg-gray-900 text-white">Prefiro não dizer</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1.5" htmlFor="challenge">Principal Desafio</label>
                                            <div className="relative">
                                                <select
                                                    id="challenge"
                                                    value={formData.challenge}
                                                    onChange={e => setFormData({ ...formData, challenge: e.target.value })}
                                                    className={`w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white hover:border-white/20 focus:border-primary transition-colors appearance-none ${formData.challenge === '' ? 'text-gray-500' : ''} ${focusRing} cursor-pointer`}
                                                >
                                                    <option value="" disabled className="text-gray-500 bg-gray-900">Seleciona uma opção</option>
                                                    <option value="email_comm" className="bg-gray-900 text-white">Gestão de emails e comunicação</option>
                                                    <option value="leads" className="bg-gray-900 text-white">Qualificação de leads</option>
                                                    <option value="docs" className="bg-gray-900 text-white">Geração de documentos</option>
                                                    <option value="marketing" className="bg-gray-900 text-white">Automação de marketing</option>
                                                    <option value="ops" className="bg-gray-900 text-white">Operações internas</option>
                                                    <option value="other" className="bg-gray-900 text-white">Outro</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto flex gap-4">
                                        <button
                                            type="button"
                                            onClick={handlePrev}
                                            className={`flex-1 py-4 rounded-xl font-medium text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer ${focusRing}`}
                                        >
                                            &larr; Voltar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={!step2Valid}
                                            className={`flex-1 py-4 rounded-xl font-medium transition-all duration-300 text-center cursor-pointer ${step2Valid ? 'bg-primary hover:bg-primary-hover text-white shadow-[0_0_20px_rgba(5,102,141,0.3)]' : 'bg-white/5 text-gray-500 cursor-not-allowed'} ${focusRing}`}
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                className="flex flex-col items-center justify-center text-center h-full sm:pt-4"
                            >
                                {submitStatus === 'loading' && (
                                    <div className="flex flex-col items-center justify-center py-6">
                                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                            <Loader2 className="w-10 h-10 text-primary animate-spin" />
                                        </div>
                                        <h3 className="text-3xl font-display font-semibold mb-4 text-white">A enviar as tuas informações...</h3>
                                        <p className="text-gray-400 mb-8 leading-relaxed max-w-sm">
                                            Aguarde enquanto preparamos os teus dados.
                                        </p>
                                    </div>
                                )}

                                {submitStatus === 'success' && (
                                    <>
                                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
                                            >
                                                <CheckCircle className="w-10 h-10 text-primary" />
                                            </motion.div>
                                        </div>

                                        <h3 className="text-3xl font-display font-semibold mb-4 text-white">Mensagem recebida!</h3>
                                        <p className="text-gray-300 mb-4 leading-relaxed max-w-sm">
                                            Obrigado pelo teu interesse, <strong className="text-white">{formData.name}</strong>. A nossa equipa vai analisar as tuas respostas e entrar em contacto contigo em breve para marcar a tua conversa gratuita.
                                        </p>
                                        <p className="text-sm text-gray-500 mb-10">
                                            Entraremos em contacto pelo email ou telefone que indicaste.
                                        </p>

                                        <button
                                            onClick={handleClose}
                                            className={`w-full py-4 rounded-xl font-medium text-white bg-primary hover:bg-primary-hover transition-colors shadow-lg cursor-pointer ${focusRing}`}
                                        >
                                            Voltar à Página Inicial
                                        </button>
                                    </>
                                )}

                                {submitStatus === 'error' && (
                                    <>
                                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
                                            >
                                                <X className="w-10 h-10 text-red-500" />
                                            </motion.div>
                                        </div>

                                        <h3 className="text-3xl font-display font-semibold mb-4 text-white">Ocorreu um erro</h3>
                                        <p className="text-gray-400 leading-relaxed mb-4 max-w-sm">
                                            Houve uma falha de comunicação com o servidor e as tuas informações não puderam ser guardadas na totalidade.
                                        </p>
                                        <p className="text-sm text-gray-500 mb-10">
                                            Por favor, tenta de novo mais tarde.
                                        </p>

                                        <div className="flex w-full gap-4">
                                            <button
                                                onClick={() => { setSubmitStatus('idle'); setStep(2); setDirection(-1); }}
                                                className={`flex-1 py-4 rounded-xl font-medium text-white bg-white/10 hover:bg-white/20 transition-colors border border-white/10 cursor-pointer ${focusRing}`}
                                            >
                                                Tentar Novamente
                                            </button>
                                            <button
                                                onClick={handleClose}
                                                className={`flex-1 py-4 rounded-xl font-medium text-white bg-primary hover:bg-primary-hover transition-colors shadow-lg cursor-pointer ${focusRing}`}
                                            >
                                                Fechar
                                            </button>
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
