import { motion } from 'framer-motion';
import { Shield, Car, UserCheck } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

const options = [
    {
        id: 'diaria',
        icon: <Car size={40} />,
        title: "Diária do Carro",
        price: "R$ 1.600,00",
        description: "Aluguel diário de veículo blindado com motorista executivo.",
        features: ["Motorista Bilíngue", "7 Lugares", "Blindagem III-A"]
    },
    {
        id: 'armada',
        icon: <UserCheck size={40} />,
        title: "Segurança Armada",
        price: "Sob Consulta",
        description: "Transporte executivo com escolta de segurança armada altamente treinada.",
        features: ["Profissionais Elite", "Acompanhamento Tático", "Discrição Total"]
    }
];

export function Experience() {
    const { theme } = useTheme();
    const { bookingData, setSecurityType } = useBooking();

    return (
        <section id="seguranca" className={cn(
            "py-24 px-6 transition-colors duration-500",
            theme === 'dark' ? "bg-white/5" : "bg-zinc-50"
        )}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm font-bold uppercase tracking-[0.4em] text-accent mb-6"
                    >
                        Nível de Proteção
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={cn(
                            "text-4xl md:text-5xl font-bold font-title mb-8 transition-colors duration-500",
                            theme === 'dark' ? "text-white" : "text-zinc-900"
                        )}
                    >
                        Escolha o regime de proteção ideal.
                    </motion.h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {options.map((option, index) => {
                        const isSelected = bookingData.securityType === option.id;

                        return (
                            <motion.div
                                key={option.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSecurityType(option.id as 'armada' | 'diaria')}
                                className={cn(
                                    "relative group cursor-pointer p-8 rounded-[2.5rem] border transition-all duration-500",
                                    isSelected
                                        ? "bg-accent/10 border-accent shadow-[0_0_40px_rgba(0,163,163,0.1)]"
                                        : (theme === 'dark' ? "bg-white/[0.02] border-white/10 hover:border-white/20" : "bg-white border-black/5 hover:border-black/10 shadow-sm")
                                )}
                            >
                                <div className={cn(
                                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500",
                                    isSelected
                                        ? (theme === 'dark' ? "bg-accent text-black" : "bg-accent text-white")
                                        : (theme === 'dark' ? "bg-white/5 text-accent" : "bg-accent/10 text-accent")
                                )}>
                                    {option.icon}
                                </div>

                                <div className="mb-6">
                                    <h4 className={cn(
                                        "text-2xl font-bold mb-2 tracking-tight transition-colors duration-500",
                                        theme === 'dark' ? "text-white" : "text-zinc-900"
                                    )}>{option.title}</h4>
                                    <p className={cn(
                                        "text-sm leading-relaxed transition-colors duration-500",
                                        theme === 'dark' ? "text-gray-400" : "text-zinc-500"
                                    )}>
                                        {option.description}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 mb-8">
                                    <span className="text-sm text-gray-500 tracking-wider">A partir de</span>
                                    <span className={cn(
                                        "text-2xl font-black transition-colors duration-500",
                                        theme === 'dark' ? "text-white" : "text-zinc-900"
                                    )}>{option.price}</span>
                                </div>

                                <div className="space-y-3">
                                    {option.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                            <span className={cn(
                                                "text-xs font-medium uppercase tracking-wider transition-colors duration-500",
                                                theme === 'dark' ? "text-gray-400" : "text-zinc-500"
                                            )}>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {isSelected && (
                                    <motion.div
                                        layoutId="selection-badge"
                                        className={cn(
                                            "absolute top-8 right-8 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full",
                                            theme === 'dark' ? "bg-accent text-black" : "bg-accent text-white"
                                        )}
                                    >
                                        Selecionado
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className={cn(
                        "mt-20 p-8 rounded-3xl flex flex-col md:row items-center justify-between gap-8 border transition-all duration-500",
                        theme === 'dark' ? "glass border-white/10" : "bg-white border-black/5 shadow-lg"
                    )}
                >
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                            <Shield className="text-accent" />
                        </div>
                        <div>
                            <h4 className={cn(
                                "text-xl font-bold mb-1 tracking-tight transition-colors duration-500",
                                theme === 'dark' ? "text-white" : "text-zinc-900"
                            )}>Segurança Inteligente</h4>
                            <p className={cn(
                                "text-sm transition-colors duration-500",
                                theme === 'dark' ? "text-gray-400" : "text-zinc-500"
                            )}>Nossos protocolos superam os padrões internacionais de escolta executiva.</p>
                        </div>
                    </div>
                    <a
                        href="#contato"
                        className={cn(
                            "px-8 py-3 font-bold rounded-lg transition-all whitespace-nowrap",
                            theme === 'dark' ? "bg-white text-black hover:bg-accent" : "bg-zinc-900 text-white hover:bg-accent"
                        )}
                    >
                        Prosseguir para Agendamento
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
