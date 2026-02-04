import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

export function Hero() {
    const { theme } = useTheme();
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <>
            <section
                id="home"
                className={cn(
                    "relative min-h-screen w-full flex flex-col md:flex-row items-center md:justify-center overflow-hidden transition-colors duration-500",
                    theme === 'dark' ? "bg-black" : "bg-white"
                )}
                style={theme === 'light' ? { background: 'linear-gradient(to bottom, #EDEDED, #FDFDFD)' } : {}}
            >
                {/* Dynamic Background */}
                <div className="absolute inset-0 z-0">
                    <div className={cn(
                        "absolute inset-0 z-10",
                        theme === 'dark' ? "bg-gradient-to-r from-black via-black/60 to-transparent" : "hero-gradient-left"
                    )} />
                    <div className={cn(
                        "absolute inset-0 z-10",
                        theme === 'dark' ? "bg-gradient-to-t from-black via-transparent to-black/60" : "hero-gradient-top"
                    )} />

                    {/* Spotlight Top-Left */}
                    <div className={cn(
                        "absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10",
                        theme === 'dark' ? "bg-white/10" : "bg-accent/10"
                    )} />

                </div>

                {/* Video Layer - Moved here to allow independent layering */}
                <div
                    style={
                        {
                            '--tw-translate-y': 'calc(calc(1 / 2 * 74%) * -1)',
                        } as React.CSSProperties
                    }
                    className={cn(
                        "hidden md:flex absolute right-0 md:right-20 w-full lg:w-[45%] pointer-events-none transition-all duration-500",
                        // Mobile: centered in top half. Desktop: centered vertically.
                        "top-1/2 -translate-y-[20%] md:-translate-y-1/2 h-[35%] md:h-[80%]",
                        "pr-0 md:pr-6",
                        theme === 'dark' ? "z-0 opacity-40 lg:opacity-80" : "z-10 opacity-100" // Reduced z-index to be below content
                    )}
                >
                    <div
                        className="relative w-full h-full overflow-hidden"
                        style={theme === 'light' ? {
                            maskImage: 'radial-gradient(circle, black 50%, transparent 100%)',
                            WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 100%)'
                        } : {}}
                    >
                        <video
                            key={theme}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={cn(
                                "w-full h-full object-cover md:object-contain transition-transform duration-500",
                                theme === 'light' ? "scale-110 md:scale-140" : "scale-100" // Reduced scale on mobile
                            )}
                        >
                            <source
                                src={theme === 'dark' ? "/Tiguan1.mp4" : "/Tiguan3_transparent.webm"}
                                type={theme === 'dark' ? "video/mp4" : "video/webm"}
                            />
                        </video>
                    </div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-40 max-w-7xl mx-auto px-6 w-full pt-32 md:pt-0">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            <h1 className={cn(
                                "text-4xl sm:text-5xl md:text-7xl font-black font-title mb-6 md:mb-8 leading-[0.9] md:leading-[0.85] tracking-tight uppercase transition-colors duration-500",
                                theme === 'dark' ? "text-white" : "text-zinc-900"
                            )}>
                                Elite em <br />
                                <span className={cn(
                                    "text-transparent bg-clip-text bg-gradient-to-r",
                                    theme === 'dark' ? "from-white via-white to-gray-600" : "from-zinc-900 via-zinc-800 to-zinc-500"
                                )}>
                                    Transporte <br /> Executivo
                                </span>
                            </h1>
                            <p className={cn(
                                "text-sm sm:text-lg md:text-xl mb-8 md:mb-12 leading-relaxed max-w-lg font-medium transition-colors duration-500",
                                theme === 'dark' ? "text-gray-400" : "text-zinc-600"
                            )}>
                                Segurança nível III-A, discrição absoluta e a frota mais moderna
                                do país para sua total tranquilidade.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-12 md:mb-16 relative z-30"> {/* Added z-30 to ensure buttons are clickable */}
                                <button className={cn(
                                    "px-10 py-4 font-black tracking-widest text-xs uppercase rounded-sm transition-all hover:scale-105 active:scale-95 group w-full sm:w-auto flex items-center justify-center",
                                    theme === 'dark' ? "bg-white text-black hover:bg-accent" : "bg-zinc-900 text-white hover:bg-accent"
                                )}>
                                    Reservar Agora
                                    <ChevronRight
                                        size={18}
                                        className="inline ml-2 group-hover:translate-x-1 transition-transform"
                                    />
                                </button>

                                <button
                                    className={cn(
                                        "px-10 py-4 font-black tracking-widest text-xs uppercase rounded-sm transition-all hover:scale-105 active:scale-95 border transition-all duration-500 w-full sm:w-auto",
                                        theme === 'dark'
                                            ? "glass border-white/10 text-white hover:bg-white/10"
                                            : "bg-zinc-100 border-black/10 text-zinc-900 hover:bg-black/5"
                                    )}
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Sobre a Blindagem
                                </button>
                            </div>

                            <div className="flex items-center gap-6 md:gap-10">
                                <div className="flex flex-col gap-1">
                                    <span className={cn(
                                        "text-4xl font-black italic tracking-tighter transition-colors duration-500",
                                        theme === 'dark' ? "text-white" : "text-zinc-900"
                                    )}>
                                        NI-3A
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                        Certificada
                                    </span>
                                </div>
                                <div className={cn(
                                    "w-[1px] h-14 transition-colors duration-500",
                                    theme === 'dark' ? "bg-white/10" : "bg-black/10"
                                )} />
                                <div className="flex flex-col gap-1">
                                    <span className={cn(
                                        "text-4xl font-black italic tracking-tighter transition-colors duration-500",
                                        theme === 'dark' ? "text-white" : "text-zinc-900"
                                    )}>
                                        24/7
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                                        Pronta Resposta
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Hero Bottom Bar */}
                <div className={cn(
                    "absolute bottom-0 left-0 w-full h-[1px] transition-colors duration-500",
                    theme === 'dark' ? "bg-gradient-to-r from-transparent via-white/10 to-transparent" : "bg-gradient-to-r from-transparent via-black/10 to-transparent"
                )} />
            </section>

            {/* Modal Sobre a Blindagem */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={cn(
                                "relative w-full max-w-lg mx-4 rounded-xl border p-6 shadow-2xl transition-colors duration-500",
                                theme === 'dark' ? "bg-zinc-950 border-white/10" : "bg-white border-black/10"
                            )}
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 40, scale: 0.95 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                            <button
                                className={cn(
                                    "absolute top-3 right-3 transition-colors duration-500",
                                    theme === 'dark' ? "text-gray-400 hover:text-white" : "text-zinc-400 hover:text-black"
                                )}
                                onClick={() => setIsModalOpen(false)}
                                aria-label="Fechar"
                            >
                                <X size={18} />
                            </button>

                            <h2 className={cn(
                                "text-xl font-black uppercase tracking-[0.25em] mb-4 transition-colors duration-500",
                                theme === 'dark' ? "text-white" : "text-zinc-900"
                            )}>
                                Blindagem Nível III-A
                            </h2>

                            <p className={cn(
                                "text-sm leading-relaxed mb-3 transition-colors duration-500",
                                theme === 'dark' ? "text-gray-300" : "text-zinc-600"
                            )}>
                                A blindagem nível III-A é um tipo de proteção balística projetada
                                para segurar disparos das principais armas de mão usadas em
                                cenários urbanos, como pistolas e revólveres de alto calibre.
                            </p>
                            <p className={cn(
                                "text-sm leading-relaxed mb-3 transition-colors duration-500",
                                theme === 'dark' ? "text-gray-300" : "text-zinc-600"
                            )}>
                                Ela oferece proteção contra munições como 9 mm, .357 Magnum e
                                .44 Magnum, mantendo um ótimo equilíbrio entre segurança,
                                conforto e dirigibilidade do veículo.
                            </p>
                            <p className={cn(
                                "text-sm leading-relaxed mb-3 transition-colors duration-500",
                                theme === 'dark' ? "text-gray-300" : "text-zinc-600"
                            )}>
                                Para isso, são utilizados vidros balísticos mais espessos e
                                materiais especiais nas portas, colunas e demais áreas
                                estruturais, que absorvem e dissipam a energia do projétil antes
                                que ele alcance o interior do carro.
                            </p>
                            <p className={cn(
                                "text-sm leading-relaxed transition-colors duration-500",
                                theme === 'dark' ? "text-gray-300" : "text-zinc-600"
                            )}>
                                É hoje o padrão mais utilizado em veículos civis no Brasil, ideal
                                para proteção em situações de risco urbano, como tentativas de
                                assalto ou sequestro, sem comprometer significativamente o
                                desempenho e o conforto durante o uso diário.
                            </p>

                            <div className="mt-6 flex justify-end">
                                <button
                                    className={cn(
                                        "px-6 py-2 text-xs font-black tracking-[0.25em] uppercase rounded-sm border transition-all duration-500",
                                        theme === 'dark' ? "border-white/20 text-white hover:bg-white hover:text-black" : "border-black/20 text-zinc-900 hover:bg-black hover:text-white"
                                    )}
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Fechar
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
