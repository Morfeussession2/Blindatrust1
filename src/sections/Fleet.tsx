import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Wifi, Gauge, Star, Zap } from 'lucide-react';
import { cn } from '../utils/cn';
import { useBooking } from '../context/BookingContext';
import { useTheme } from '../context/ThemeContext';

interface Vehicle {
    id: string;
    name: string;
    type: string;
    image: string;
    video?: string;
    features: { icon: React.ReactNode; text: string; }[];
    specs: { label: string; value: string; }[];
}

const vehicles: Vehicle[] = [
    {
        id: 'suv-tiguan',
        name: "Tiguan R Line",
        type: "SUV Executivo Blindado",
        image: "/TR.png",
        features: [
            { icon: <Shield size={14} />, text: "Blindagem III-A" },
            { icon: <Users size={14} />, text: "7 Lugares" },
            { icon: <Wifi size={14} />, text: "Wi-Fi 5G" },
            { icon: <Gauge size={14} />, text: "Tração 4x4" }
        ],
        specs: [
            { label: "Categoria", value: "SUV" },
            { label: "Blindagem", value: "NBR 15000" },
            { label: "Ocupantes", value: "Até 7" }
        ]
    },
    {
        id: 'suv-commander',
        name: "Jeep Commander",
        type: "SUV Executivo Blindado",
        image: "/COM.png",
        features: [
            { icon: <Shield size={14} />, text: "Blindagem III-A" },
            { icon: <Star size={14} />, text: "Conforto VIP" },
            { icon: <Wifi size={14} />, text: "Wi-Fi 5G" },
            { icon: <Zap size={14} />, text: "Foco C-Level" }
        ],
        specs: [
            { label: "Categoria", value: "SUV / 4x4" },
            { label: "Blindagem", value: "NBR 15000" },
            { label: "Ocupantes", value: "7" }
        ]
    },
    {
        id: 'Outlander',
        name: "Mitsubishi Outlander",
        type: "SUV Executivo Blindado",
        image: "/outlander.png",
        features: [
            { icon: <Shield size={14} />, text: "Blindagem III-A" },
            { icon: <Users size={14} />, text: "7 Lugares" },
            { icon: <Wifi size={14} />, text: "Wi-Fi 5G" },
            { icon: <Gauge size={14} />, text: "Tração 4x4" }
        ],
        specs: [
            { label: "Categoria", value: "SUV" },
            { label: "Blindagem", value: "NBR 15000" },
            { label: "Ocupantes", value: "Até 7" }
        ]
    }
];

export function Fleet() {
    const { theme } = useTheme();
    const { bookingData, setCar } = useBooking();
    const [selectedId, setSelectedId] = useState(bookingData.car || vehicles[0].id);

    const handleSelect = (id: string) => {
        setSelectedId(id);
        const car = vehicles.find(v => v.id === id);
        if (car) setCar(car.name);
    };

    return (
        <section id="frota" className={cn(
            "py-12 md:py-24 px-6 transition-colors duration-500",
            theme === 'dark' ? "bg-black" : "bg-white"
        )}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-accent text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-4 block"
                    >
                        Nossa Frota
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={cn(
                            "text-3xl md:text-6xl font-black font-title mb-6 uppercase tracking-tighter transition-colors duration-500",
                            theme === 'dark' ? "text-white" : "text-zinc-900"
                        )}
                    >
                        Veículos de <span className="text-accent">elite</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className={cn(
                            "text-sm max-w-2xl mx-auto leading-relaxed transition-colors duration-500 px-4 md:px-0",
                            theme === 'dark' ? "text-gray-500" : "text-zinc-500"
                        )}
                    >
                        Seleção rigorosa de veículos premium com blindagem certificada, luxo e discrição absoluta.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-accent text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mt-2 hidden md:block"
                    >
                        Selecione o veículo que deseja alugar.
                    </motion.p>
                </div>

                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start max-w-5xl w-full">
                        {vehicles.map((car) => {
                            const isSelected = selectedId === car.id;

                            return (
                                <motion.div
                                    key={car.id}
                                    layout
                                    onClick={() => handleSelect(car.id)}
                                    className={cn(
                                        "relative cursor-pointer rounded-[1.5rem] overflow-hidden transition-all duration-500 border",
                                        isSelected
                                            ? (theme === 'dark' ? "border-accent/40 bg-[#081818]" : "border-accent/40 bg-accent/5")
                                            : (theme === 'dark' ? "border-white/5 bg-[#0a0a0a] hover:border-white/20" : "border-black/5 bg-zinc-50 hover:border-black/10")
                                    )}
                                >
                                    {/* Media Section */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        {car.video ? (
                                            <video
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className={cn(
                                                    "w-full h-full object-cover transition-transform duration-1000",
                                                    isSelected ? "scale-110" : "scale-100 grayscale-[0.3]"
                                                )}
                                                poster={car.image}
                                            >
                                                <source src={car.video} type="video/mp4" />
                                            </video>
                                        ) : (
                                            <img
                                                src={car.image}
                                                alt={car.name}
                                                className={cn(
                                                    "w-full h-full object-cover transition-transform duration-1000",
                                                    isSelected ? "scale-110" : "scale-100 grayscale-[0.3]"
                                                )}
                                            />
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

                                        {/* Badges */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-2.5 py-1 bg-accent/20 backdrop-blur-md border border-accent/30 text-accent text-[8px] font-bold uppercase tracking-widest rounded-full">
                                                {car.id === 'van' ? 'Exclusive' : 'Blindado'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6">
                                        <h3 className={cn(
                                            "text-lg md:text-xl font-bold mb-1 tracking-tight transition-colors duration-500",
                                            theme === 'dark' ? "text-white" : "text-zinc-900"
                                        )}>{car.name}</h3>
                                        <p className={cn(
                                            "text-[10px] font-medium uppercase tracking-wider mb-6 transition-colors duration-500",
                                            theme === 'dark' ? "text-gray-500" : "text-zinc-500"
                                        )}>
                                            {car.type}
                                        </p>

                                        {/* Features Grid */}
                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            {car.features.map((feature, i) => (
                                                <div
                                                    key={i}
                                                    className={cn(
                                                        "flex items-center gap-2 border p-2 rounded-lg transition-all duration-500",
                                                        theme === 'dark' ? "bg-white/[0.02] border-white/5" : "bg-black/[0.02] border-black/5"
                                                    )}
                                                >
                                                    <div className="text-accent">{feature.icon}</div>
                                                    <span className={cn(
                                                        "text-[9px] font-semibold transition-colors duration-500",
                                                        theme === 'dark' ? "text-gray-400" : "text-zinc-600"
                                                    )}>
                                                        {feature.text}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Specs Table */}
                                        <motion.div
                                            initial={false}
                                            animate={{ height: isSelected ? 'auto' : 0, opacity: isSelected ? 1 : 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className={cn(
                                                "pt-4 border-t flex flex-col gap-2 transition-colors duration-500",
                                                theme === 'dark' ? "border-white/10" : "border-black/10"
                                            )}>
                                                {car.specs.map((spec) => (
                                                    <div key={spec.label} className="flex justify-between items-center text-[10px]">
                                                        <span className="text-gray-500 font-medium uppercase tracking-widest">{spec.label}</span>
                                                        <span className={cn(
                                                            "font-bold transition-colors duration-500",
                                                            theme === 'dark' ? "text-gray-300" : "text-zinc-700"
                                                        )}>{spec.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </div>

                                    {isSelected && (
                                        <div className="absolute inset-0 pointer-events-none border-2 border-accent/20 rounded-[1.5rem] shadow-[inset_0_0_20px_rgba(0,255,255,0.02)]" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
