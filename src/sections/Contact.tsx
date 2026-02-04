import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, MessageSquare, Car, Shield, DollarSign, Calendar, Clock, Mail } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

export function Contact() {
    const { theme } = useTheme();
    const { bookingData } = useBooking();

    const [formData, setFormData] = useState({
        name: '',
        company: '',
        origin: '',
        destination: '',
        car: '',
        service: '',
        date: '',
        time: '',
        passengers: '1 a 3',
        price: ''
    });

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            origin: bookingData.origin || prev.origin,
            destination: bookingData.destination || prev.destination,
            car: bookingData.car || prev.car,
            service: bookingData.securityType === 'armada' ? 'Segurança Armada' : bookingData.securityType === 'diaria' ? 'Diária do Carro' : prev.service,
            price: bookingData.price ? `R$ ${bookingData.price}` : prev.price
        }));
    }, [bookingData]);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSchedule = (e: React.FormEvent) => {
        e.preventDefault();

        const message = `*Olá! Gostaria de solicitar um orçamento para transporte executivo.*

*Detalhes do Agendamento:*
👤 *Nome:* ${formData.name || 'Não informado'}
🏢 *Empresa:* ${formData.company || 'Não informada'}
🚗 *Carro:* ${formData.car || 'Não selecionado'}
🛡️ *Serviço:* ${formData.service || 'Não selecionado'}
📍 *Origem:* ${formData.origin || 'Não informada'}
🏁 *Destino:* ${formData.destination || 'Não informado'}
📅 *Data:* ${formData.date || 'Não informada'}
⏰ *Horário:* ${formData.time || 'Não informado'}
👥 *Passageiros:* ${formData.passengers}
💰 *Preço Estimado:* ${formData.price || 'Sob consulta'}

_Enviado via Website BlindaTrust_`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/5521986466150?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <section id="contato" className={cn(
            "py-12 md:py-24 px-6 relative transition-colors duration-500",
            theme === 'dark' ? "bg-black" : "bg-white"
        )}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-accent mb-4">
                            Agendamento
                        </h2>
                        <h3 className={cn(
                            "text-3xl md:text-5xl font-bold font-title mb-6 md:mb-8 leading-tight transition-colors duration-500",
                            theme === 'dark' ? "text-white" : "text-zinc-900"
                        )}>
                            Solicite seu transporte <br />
                            <span className="text-gray-500">em poucos cliques.</span>
                        </h3>

                        <p className={cn(
                            "mb-8 md:mb-12 max-w-md transition-colors duration-500 text-sm md:text-base",
                            theme === 'dark' ? "text-gray-400" : "text-zinc-600"
                        )}>
                            Preencha o formulário abaixo e nossa central VIP entrará em contato em até 15 minutos para confirmar sua reserva.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-accent shrink-0">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500">Telefone 24h</p>
                                    <p className={cn(
                                        "font-bold transition-colors duration-500",
                                        theme === 'dark' ? "text-white" : "text-zinc-900"
                                    )}>+55 (21) 98646-6150</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-accent shrink-0">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500">WhatsApp VIP</p>
                                    <p className={cn(
                                        "font-bold transition-colors duration-500",
                                        theme === 'dark' ? "text-white" : "text-zinc-900"
                                    )}>+55 (21) 98646-6150</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 glass rounded-lg flex items-center justify-center text-accent shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-500">E-mail para contato</p>
                                    <p className={cn(
                                        "font-bold transition-colors duration-500",
                                        theme === 'dark' ? "text-white" : "text-zinc-900"
                                    )}>blindatrustapp@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className={cn(
                            "p-6 md:p-8 rounded-3xl border relative transition-all duration-500",
                            theme === 'dark' ? "glass border-white/5 bg-white/[0.02]" : "bg-white border-black/5 shadow-2xl"
                        )}
                    >
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSchedule}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Nome Completo</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className={cn(
                                            "w-full border rounded-xl px-4 py-3 outline-none transition-all duration-500 text-sm md:text-base",
                                            theme === 'dark' ? "bg-white/5 border-white/10 text-white focus:border-accent" : "bg-zinc-50 border-black/10 text-zinc-900 focus:border-accent"
                                        )}
                                        placeholder="Seu nome"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Empresa</label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => handleInputChange('company', e.target.value)}
                                        className={cn(
                                            "w-full border rounded-xl px-4 py-3 outline-none transition-all duration-500 text-sm md:text-base",
                                            theme === 'dark' ? "bg-white/5 border-white/10 text-white focus:border-accent" : "bg-zinc-50 border-black/10 text-zinc-900 focus:border-accent"
                                        )}
                                        placeholder="Sua empresa"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Origem</label>
                                    <input
                                        type="text"
                                        value={formData.origin}
                                        onChange={(e) => handleInputChange('origin', e.target.value)}
                                        className={cn(
                                            "w-full border rounded-xl px-4 py-3 outline-none transition-all duration-500 text-sm md:text-base",
                                            theme === 'dark' ? "bg-white/5 border-white/10 text-white focus:border-accent" : "bg-zinc-50 border-black/10 text-zinc-900 focus:border-accent"
                                        )}
                                        placeholder="Endereço ou Aeroporto"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Destino</label>
                                    <input
                                        type="text"
                                        value={formData.destination}
                                        onChange={(e) => handleInputChange('destination', e.target.value)}
                                        className={cn(
                                            "w-full border rounded-xl px-4 py-3 outline-none transition-all duration-500 text-sm md:text-base",
                                            theme === 'dark' ? "bg-white/5 border-white/10 text-white focus:border-accent" : "bg-zinc-50 border-black/10 text-zinc-900 focus:border-accent"
                                        )}
                                        placeholder="Endereço de destino"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Carro Selecionado</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3.5 text-accent"><Car size={16} /></div>
                                        <input
                                            type="text"
                                            value={formData.car}
                                            onChange={(e) => handleInputChange('car', e.target.value)}
                                            className={cn(
                                                "w-full border rounded-xl pl-10 pr-4 py-3 outline-none transition-all duration-500 text-sm md:text-base",
                                                theme === 'dark' ? "bg-white/5 border-white/10 text-white focus:border-accent" : "bg-zinc-50 border-black/10 text-zinc-900 focus:border-accent"
                                            )}
                                            placeholder="Nenhum carro selecionado"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Serviço</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3.5 text-accent"><Shield size={16} /></div>
                                        <input
                                            type="text"
                                            value={formData.service}
                                            onChange={(e) => handleInputChange('service', e.target.value)}
                                            className={cn(
                                                "w-full border rounded-xl pl-10 pr-4 py-3 outline-none transition-all duration-500 text-sm md:text-base",
                                                theme === 'dark' ? "bg-white/5 border-white/10 text-white focus:border-accent" : "bg-zinc-50 border-black/10 text-zinc-900 focus:border-accent"
                                            )}
                                            placeholder="Nenhum serviço selecionado"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Data</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3.5 text-accent"><Calendar size={16} /></div>
                                        <input
                                            type="text"
                                            value={formData.date}
                                            className={cn(
                                                "w-full border rounded-xl pl-10 pr-4 py-3 outline-none transition-all duration-500 text-sm md:text-base",
                                                theme === 'dark' ? "bg-white/5 border-white/10 text-white focus:border-accent" : "bg-zinc-50 border-black/10 text-zinc-900 focus:border-accent"
                                            )}
                                            placeholder="dd/mm"
                                            maxLength={5}
                                            onChange={(e) => {
                                                let v = e.target.value.replace(/\D/g, "");
                                                if (v.length > 2) v = v.substring(0, 2) + "/" + v.substring(2, 4);
                                                handleInputChange('date', v);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Passageiros</label>
                                    <select
                                        value={formData.passengers}
                                        onChange={(e) => handleInputChange('passengers', e.target.value)}
                                        className={cn(
                                            "w-full border rounded-xl px-4 py-3 outline-none transition-all duration-500 text-sm md:text-base",
                                            theme === 'dark' ? "bg-white/5 border-white/10 text-white focus:border-accent" : "bg-zinc-50 border-black/10 text-zinc-900 focus:border-accent"
                                        )}
                                    >
                                        <option className={theme === 'dark' ? "bg-black" : "bg-white"}>1 a 3</option>
                                        <option className={theme === 'dark' ? "bg-black" : "bg-white"}>4 a 6</option>
                                        <option className={theme === 'dark' ? "bg-black" : "bg-white"}>7+</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Horário</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3.5 text-accent"><Clock size={16} /></div>
                                        <input
                                            type="time"
                                            value={formData.time}
                                            onChange={(e) => handleInputChange('time', e.target.value)}
                                            className={cn(
                                                "w-full border rounded-xl pl-10 pr-4 py-3 outline-none transition-all duration-500 text-sm md:text-base",
                                                theme === 'dark' ? "bg-white/5 border-white/10 text-white focus:border-accent dark-inputs" : "bg-zinc-50 border-black/10 text-zinc-900 focus:border-accent"
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Preço Est.</label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3.5 text-accent"><DollarSign size={16} /></div>
                                        <input
                                            type="text"
                                            value={formData.price}
                                            readOnly
                                            className={cn(
                                                "w-full border rounded-xl pl-10 py-3 outline-none transition-all duration-500 font-bold text-sm md:text-base",
                                                theme === 'dark' ? "bg-white/5 border-white/10 text-white focus:border-accent" : "bg-zinc-50 border-black/10 text-zinc-900 focus:border-accent"
                                            )}
                                            placeholder="Calculando..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <button className={cn(
                                "w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] mt-4 shadow-lg",
                                theme === 'dark' ? "bg-white text-black hover:bg-accent" : "bg-zinc-900 text-white hover:bg-accent"
                            )}>
                                Agendar Agora <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Decorative gradient */}
        </section>
    );
}
