import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, UserCheck, Clock, MapPin } from 'lucide-react';
import { cn } from '../utils/cn';
import { useTheme } from '../context/ThemeContext';

const features = [
    {
        icon: <Shield className="text-accent" size={24} />,
        title: "Segurança de Elite",
        description: "Veículos com blindagem Nível III-A e protocolos rigorosos de segurança em cada trajeto."
    },
    {
        icon: <UserCheck className="text-accent" size={24} />,
        title: "Motoristas Profissionais",
        description: "Equipe altamente treinada em direção defensiva, evasiva e atendimento de alto padrão."
    },
    {
        icon: <Clock className="text-accent" size={24} />,
        title: "Pontualidade Britânica",
        description: "Planejamento minucioso de rotas para garantir que você chegue ao seu destino sem atrasos."
    },
    {
        icon: <MapPin className="text-accent" size={24} />,
        title: "Rastreamento 24h",
        description: "Monitoramento em tempo real de toda a nossa frota por nossa central de operações."
    }
];

const media = [
    {
        type: 'image',
        url: '/blindagem_detail_1768848791930.png',
        title: 'Blindagem Nível III-A',
        desc: 'Proteção certificada contra alto calibre.'
    },
    {
        type: 'image',
        url: '/armored_suv_night_1768848815519.png',
        title: 'Frota de Elite',
        desc: 'Veículos modernos e discretos.'
    }
];

export function About() {
    const { theme } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % media.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="sobre" className={cn(
            "py-24 px-6 relative overflow-hidden transition-colors duration-500",
            theme === 'dark' ? "bg-black" : "bg-white"
        )}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">
                            Excelência em Transporte
                        </h2>
                        <h3 className={cn(
                            "text-4xl md:text-5xl font-bold font-title mb-8 leading-tight transition-colors duration-500",
                            theme === 'dark' ? "text-white" : "text-zinc-900"
                        )}>
                            Mais que um trajeto, <br />
                            <span className="text-gray-500">uma experiência de confiança.</span>
                        </h3>
                        <p className={cn(
                            "text-lg mb-10 leading-relaxed transition-colors duration-500",
                            theme === 'dark' ? "text-gray-400" : "text-zinc-600"
                        )}>
                            A Blindatrust Transportes nasceu para redefinir o conceito de mobilidade executiva.
                            Combinamos tecnologia de ponta, segurança máxima e um atendimento personalizado
                            para garantir que sua única preocupação seja o seu próximo compromisso.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="flex flex-col gap-3">
                                    <div className="w-12 h-12 glass rounded-lg flex items-center justify-center">
                                        {feature.icon}
                                    </div>
                                    <h4 className={cn(
                                        "font-bold uppercase tracking-wider text-sm transition-colors duration-500",
                                        theme === 'dark' ? "text-white" : "text-zinc-900"
                                    )}>
                                        {feature.title}
                                    </h4>
                                    <p className={cn(
                                        "text-sm leading-relaxed transition-colors duration-500",
                                        theme === 'dark' ? "text-gray-500" : "text-zinc-500"
                                    )}>
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-3xl overflow-hidden flex items-center justify-center relative group">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 1 }}
                                    className="absolute inset-0"
                                >
                                    <img
                                        src={media[currentIndex].url}
                                        alt={media[currentIndex].title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                                    <div className="absolute bottom-10 left-10 right-10">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className={cn(
                                                "p-6 rounded-2xl border transition-colors duration-500",
                                                theme === 'dark' ? "glass-dark border-white/10" : "bg-white/90 backdrop-blur-md border-black/5 shadow-xl"
                                            )}
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                                                <span className="text-[10px] uppercase tracking-widest text-accent font-black">Certificação Militar</span>
                                            </div>
                                            <h4 className={cn(
                                                "text-xl font-bold mb-1 transition-colors duration-500",
                                                theme === 'dark' ? "text-white" : "text-zinc-900"
                                            )}>{media[currentIndex].title}</h4>
                                            <p className={cn(
                                                "text-xs leading-relaxed font-medium transition-colors duration-500",
                                                theme === 'dark' ? "text-white/60" : "text-zinc-600"
                                            )}>
                                                {media[currentIndex].desc}
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Indicators */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                {media.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentIndex(i)}
                                        className={cn(
                                            "w-8 h-1 rounded-full transition-all duration-500",
                                            currentIndex === i ? "bg-accent" : "bg-white/20 hover:bg-white/40"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
