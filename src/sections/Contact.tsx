import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, MessageSquare, Car, Shield, DollarSign, Calendar, Clock, Mail, ChevronDown } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { vehicles } from './Fleet';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

export function Contact() {
    const { theme } = useTheme();
    const { bookingData, setCar } = useBooking();
    const [isCarDropdownOpen, setIsCarDropdownOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [calendarDate, setCalendarDate] = useState(new Date());

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

    const generateCalendarDays = () => {
        const year = calendarDate.getFullYear();
        const month = calendarDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];
        for (let i = 0; i < firstDay; i++) {
            days.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const handleDateSelect = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        handleInputChange('date', `${day}/${month}`);
        setIsDatePickerOpen(false);
    };

    const nextMonth = () => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1));
    const prevMonth = () => setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1));

    const handleCarnivalClick = () => {
        const message = `*Olá! Gostaria de consultar os preços e serviços para o Carnaval.*
*Tenho interesse na entrada liberada em todos os portões.*

_Enviado via Website BlindaTrust_`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/5521986466150?text=${encodedMessage}`, '_blank');
    };

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

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
                        className="space-y-6"
                    >
                        {/* Carnival Banner */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCarnivalClick}
                            className={cn(
                                "relative overflow-hidden p-6 rounded-3xl border cursor-pointer transition-all duration-500 group",
                                theme === 'dark'
                                    ? "bg-gradient-to-r from-accent/20 to-blue-500/10 border-accent/30 shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                                    : "bg-gradient-to-r from-accent/10 to-blue-500/5 border-accent/20 shadow-xl"
                            )}
                        >
                            <div className="relative z-10 flex items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 bg-accent text-black text-[8px] font-black uppercase tracking-widest rounded-full">
                                            Especial
                                        </span>
                                        <h4 className={cn(
                                            "text-lg font-black uppercase tracking-tighter",
                                            theme === 'dark' ? "text-white" : "text-zinc-900"
                                        )}>
                                            Carnaval <span className="text-accent">2026</span>
                                        </h4>
                                    </div>
                                    <p className={cn(
                                        "text-xs font-bold leading-tight",
                                        theme === 'dark' ? "text-gray-300" : "text-zinc-700"
                                    )}>
                                        Consulte preços exclusivos para o período.
                                    </p>
                                    <p className="text-[10px] text-accent font-medium flex items-center gap-1">
                                        <Shield size={10} /> Entrada liberada em todos os portões
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-lg",
                                        theme === 'dark' ? "bg-accent text-black group-hover:bg-white" : "bg-zinc-900 text-white group-hover:bg-accent group-hover:text-black"
                                    )}>
                                        <MessageSquare size={20} />
                                    </div>
                                    <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Consultar</span>
                                </div>
                            </div>

                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-accent/20 rounded-full blur-3xl group-hover:bg-accent/30 transition-colors" />
                            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
                        </motion.div>

                        <div className={cn(
                            "p-6 md:p-8 rounded-3xl border relative transition-all duration-500",
                            theme === 'dark' ? "glass border-white/5 bg-white/[0.02]" : "bg-white border-black/5 shadow-2xl"
                        )}>
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
                                            <button
                                                type="button"
                                                onClick={() => setIsCarDropdownOpen(!isCarDropdownOpen)}
                                                className={cn(
                                                    "w-full border rounded-xl pl-10 pr-10 py-3 outline-none transition-all duration-500 text-sm md:text-base text-left flex items-center justify-between",
                                                    theme === 'dark' ? "bg-white/5 border-white/10 text-white" : "bg-zinc-50 border-black/10 text-zinc-900"
                                                )}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="absolute left-3 text-accent"><Car size={16} /></div>
                                                    <span className={!formData.car ? "text-gray-400" : ""}>
                                                        {formData.car || "Nenhum carro selecionado"}
                                                    </span>
                                                </div>
                                                <ChevronDown size={16} className={cn("transition-transform duration-300", isCarDropdownOpen ? "rotate-180" : "")} />
                                            </button>

                                            {isCarDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className={cn(
                                                        "absolute z-50 w-full mt-2 rounded-xl border p-2 shadow-2xl transition-colors duration-500",
                                                        theme === 'dark' ? "bg-zinc-900 border-white/10" : "bg-white border-black/10"
                                                    )}
                                                >
                                                    {vehicles.map((v) => (
                                                        <button
                                                            key={v.id}
                                                            type="button"
                                                            onClick={() => {
                                                                handleInputChange('car', v.name);
                                                                setCar(v.name);
                                                                setIsCarDropdownOpen(false);
                                                            }}
                                                            className={cn(
                                                                "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left",
                                                                theme === 'dark' ? "hover:bg-white/5" : "hover:bg-black/5",
                                                                formData.car === v.name ? "bg-accent/10" : ""
                                                            )}
                                                        >
                                                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                                                                <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                                                            </div>
                                                            <div>
                                                                <p className={cn("text-xs font-bold", theme === 'dark' ? "text-white" : "text-black")}>{v.name}</p>
                                                                <p className="text-[10px] text-gray-500">{v.type}</p>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            )}
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
                                            <button
                                                type="button"
                                                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                                                className={cn(
                                                    "w-full border rounded-xl pl-10 pr-4 py-3 outline-none transition-all duration-500 text-sm md:text-base text-left",
                                                    theme === 'dark' ? "bg-white/5 border-white/10 text-white" : "bg-zinc-50 border-black/10 text-zinc-900"
                                                )}
                                            >
                                                <div className="absolute left-3 top-3.5 text-accent"><Calendar size={16} /></div>
                                                <span className={!formData.date ? "text-gray-400" : ""}>
                                                    {formData.date || "dd/mm"}
                                                </span>
                                            </button>

                                            {isDatePickerOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className={cn(
                                                        "absolute z-50 w-64 mt-2 left-0 md:left-auto md:right-0 rounded-xl border p-4 shadow-2xl transition-colors duration-500",
                                                        theme === 'dark' ? "bg-zinc-900 border-white/10 text-white" : "bg-white border-black/10 text-black"
                                                    )}
                                                >
                                                    <div className="flex justify-between items-center mb-4">
                                                        <button type="button" onClick={prevMonth} className="hover:text-accent font-bold px-2">{"<"}</button>
                                                        <span className="text-xs font-bold uppercase tracking-widest">
                                                            {monthNames[calendarDate.getMonth()]} {calendarDate.getFullYear()}
                                                        </span>
                                                        <button type="button" onClick={nextMonth} className="hover:text-accent font-bold px-2">{">"}</button>
                                                    </div>
                                                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] mb-2 font-bold text-gray-500">
                                                        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => <div key={d}>{d}</div>)}
                                                    </div>
                                                    <div className="grid grid-cols-7 gap-1">
                                                        {generateCalendarDays().map((date, i) => (
                                                            <div key={i} className="aspect-square">
                                                                {date && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleDateSelect(date)}
                                                                        className={cn(
                                                                            "w-full h-full flex items-center justify-center rounded-lg text-[10px] transition-all",
                                                                            date.toDateString() === new Date().toDateString() ? "border border-accent text-accent" : "",
                                                                            theme === 'dark' ? "hover:bg-white/5" : "hover:bg-black/5"
                                                                        )}
                                                                    >
                                                                        {date.getDate()}
                                                                    </button>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
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
                                                    "w-full border rounded-xl pl-10 pr-4 py-3 outline-none transition-all duration-500 font-bold text-sm md:text-base",
                                                    theme === 'dark' ? "bg-white/5 border-white/10 text-white" : "bg-zinc-50 border-black/10 text-zinc-900"
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
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative gradient */}
        </section>
    );
}
