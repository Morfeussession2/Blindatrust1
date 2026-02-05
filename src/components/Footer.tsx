import { Phone, Mail, Instagram, Linkedin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

export function Footer() {
    const { theme } = useTheme();
    return (
        <footer className={cn("pt-12 md:pt-20 pb-10 border-t border-white/5 px-6", theme === 'dark' ? "bg-black" : "bg-white")}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-12 h-12 text-black flex items-center justify-center font-bold text-2xl rounded-sm">
                                <img src={theme === 'dark' ? "Logo.png" : "LogoPreta-01.png"} alt="" />
                            </div>
                            <div>
                                <h2 className={cn("text-xl font-bold tracking-[0.2em] uppercase", theme === 'dark' ? "text-white" : "text-zinc-900")}>
                                    Blindatrust
                                </h2>
                                <p className={cn("text-xs tracking-[0.1em] text-gray-400 uppercase", theme === 'dark' ? "text-white" : "text-zinc-900")}>
                                    Transportes
                                </p>
                            </div>
                        </div>
                        <p className={cn("text-gray-400 max-w-sm leading-relaxed mb-6 text-sm md:text-base", theme === 'dark' ? "text-white" : "text-zinc-900")}>
                            Líder em transporte executivo blindado. Oferecemos o mais alto padrão de segurança,
                            conforto e discrição para clientes VIP e corporativos.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className={cn("w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white hover:text-black transition-all", theme === 'dark' ? "text-white" : "text-zinc-900")}>
                                <Instagram size={18} />
                            </a>
                            <a href="#" className={cn("w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white hover:text-black transition-all", theme === 'dark' ? "text-white" : "text-zinc-900")}>
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className={cn("text-sm font-bold uppercase tracking-widest mb-6", theme === 'dark' ? "text-white" : "text-zinc-900")}>Serviços</h3>
                        <ul className={cn("space-y-4 text-gray-400 text-sm md:text-base", theme === 'dark' ? "text-white" : "text-zinc-900")}>
                            <li><a href="#" className={cn("hover:text-white transition-colors", theme === 'dark' ? "text-white" : "text-zinc-900")}>Transfer Aeroporto</a></li>
                            <li><a href="#" className={cn("hover:text-white transition-colors", theme === 'dark' ? "text-white" : "text-zinc-900")}>Eventos Corporativos</a></li>
                            <li><a href="#" className={cn("hover:text-white transition-colors", theme === 'dark' ? "text-white" : "text-zinc-900")}>City Tour Privativo</a></li>
                            <li><a href="#" className={cn("hover:text-white transition-colors", theme === 'dark' ? "text-white" : "text-zinc-900")}>Segurança Armada</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className={cn("text-sm font-bold uppercase tracking-widest mb-6", theme === 'dark' ? "text-white" : "text-zinc-900")}>Contato</h3>
                        <ul className={cn("space-y-4 text-gray-400 text-sm md:text-base", theme === 'dark' ? "text-white" : "text-zinc-900")}>
                            <li className={cn("flex items-center gap-3", theme === 'dark' ? "text-white" : "text-zinc-900")}>
                                <Phone size={16} className="text-accent" />
                                <span>+55 (21) 98646-6150</span>
                            </li>
                            <li className={cn("flex items-center gap-3", theme === 'dark' ? "text-white" : "text-zinc-900")}>
                                <Mail size={16} className="text-accent" />
                                <span>blindatrustapp@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 uppercase tracking-widest text-center md:text-left">
                    <p>© 2024 Blindatrust Transportes. Todos os direitos reservados.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                        <a href="#" className="hover:text-white transition-colors">Termos</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
