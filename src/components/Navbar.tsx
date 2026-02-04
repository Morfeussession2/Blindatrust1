import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '../utils/cn';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Frota', href: '#frota' },
    { name: 'Segurança', href: '#seguranca' },
    { name: 'Cobertura', href: '#vip' },
    { name: 'Contato', href: '#contato' },
];

export function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-5',
                isScrolled
                    ? (theme === 'dark' ? 'glass-dark py-5 border-b border-white/5' : 'bg-white/90 backdrop-blur-md py-5 border-b border-black/5 shadow-sm')
                    : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <a href="#home" className="flex items-center gap-3 group">
                    <div className="relative w-8 h-8">
                        <img src="/Logo.png" alt="Logo" className="w-24" />
                    </div>
                    <div className="flex flex-col">
                        <span className={cn(
                            "text-sm font-black tracking-[0.2em] uppercase leading-none transition-colors duration-500",
                            theme === 'dark' ? "text-white" : "text-zinc-900"
                        )}>
                            Blindatrust
                        </span>
                        <span className={cn(
                            "text-[8px] font-medium tracking-[0.3em] uppercase leading-none mt-1 transition-colors duration-500",
                            theme === 'dark' ? "text-gray-400" : "text-zinc-500"
                        )}>
                            Transportes
                        </span>
                    </div>
                </a>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-[13px] font-medium transition-colors duration-300",
                                theme === 'dark' ? "text-gray-300 hover:text-white" : "text-zinc-600 hover:text-black"
                            )}
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                <div className="hidden lg:block">
                    <button
                        onClick={toggleTheme}
                        className={cn(
                            "relative w-14 h-14 rounded-full border flex items-center justify-center transition-all group overflow-hidden",
                            theme === 'dark' ? "glass border-white/10 hover:border-accent/40" : "bg-zinc-100 border-black/10 hover:border-accent/40"
                        )}
                        aria-label="Toggle theme"
                    >
                        <AnimatePresence mode="wait">
                            {theme === 'dark' ? (
                                <motion.div
                                    key="sun"
                                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="absolute text-accent"
                                >
                                    <Sun size={20} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="moon"
                                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="absolute text-accent"
                                >
                                    <Moon size={20} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={cn(
                        "md:hidden transition-colors duration-500",
                        theme === 'dark' ? "text-white" : "text-zinc-900"
                    )}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={cn(
                            "absolute top-full left-0 right-0 border-t flex flex-col p-6 gap-6 md:hidden transition-all duration-500",
                            theme === 'dark' ? "glass-dark border-white/5" : "bg-white border-black/10 shadow-xl"
                        )}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-base font-medium transition-colors duration-500",
                                    theme === 'dark' ? "text-gray-300" : "text-zinc-600"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={() => {
                                toggleTheme();
                                setIsMobileMenuOpen(false);
                            }}
                            className={cn(
                                "w-full py-4 border text-center font-black tracking-widest text-xs uppercase rounded-sm flex items-center justify-center gap-2 transition-all duration-500",
                                theme === 'dark' ? "glass border-white/10 text-white" : "bg-zinc-100 border-black/10 text-zinc-900"
                            )}
                        >
                            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                            {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
