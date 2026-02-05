"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: "The Vibe", href: "#vibe" },
        { name: "Top Picks", href: "#menu" },
        { name: "Chill Zone", href: "#chill-zone" },
        { name: "Game Zone", href: "#game-zone" },
        { name: "Find Us", href: "#location" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${scrolled
                    ? 'bg-[#FFFFFF]/90 backdrop-blur-xl border-black/5 py-3 shadow-sm'
                    : 'bg-transparent border-transparent py-6'
                    }`}
            >
                <div className="page-container flex justify-between items-center">
                    {/* Brand Logo & Name */}
                    <a href="#" className="flex items-center gap-4 group">
                        <div className={`relative rounded-full overflow-hidden border border-black/10 transition-all duration-300 ${scrolled ? 'w-10 h-10' : 'w-12 h-12 md:w-14 md:h-14'}`}>
                            <img
                                src="/assets/logo.jpg"
                                alt="Surapana Logo"
                                className="w-full h-full object-cover scale-110 grayscale group-hover:grayscale-0 transition-all"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className={`font-heading text-[#1F1F1F] leading-none tracking-widest transition-all duration-300 ${scrolled ? 'text-lg' : 'text-xl md:text-2xl'}`}>
                                SURAPANA
                            </span>
                            <span className={`text-[10px] uppercase tracking-[0.3em] text-[#6B5E51] hidden sm:block transition-all ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
                                Tea Cafe
                            </span>
                        </div>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    // If we're at the hero (top of page), unlock it first
                                    if (window.scrollY < 100) {
                                        e.preventDefault();
                                        // Dispatch custom event to unlock hero
                                        window.dispatchEvent(new CustomEvent('unlockHero'));
                                        // Wait a tiny bit for state to update, then navigate
                                        setTimeout(() => {
                                            const target = document.querySelector(link.href);
                                            if (target) {
                                                target.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }, 100);
                                    }
                                }}
                                className="text-sm uppercase tracking-widest text-[#1F1F1F]/70 hover:text-[#D4AF37] transition-colors duration-300 font-medium relative group py-2"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full opacity-50 group-hover:opacity-100" />
                            </a>
                        ))}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-gold p-2 hover:bg-white/5 rounded-full transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-xl flex items-center justify-center md:hidden"
                    >
                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        setIsMenuOpen(false);
                                        // If we're at the hero (top of page), unlock it first
                                        if (window.scrollY < 100) {
                                            e.preventDefault();
                                            window.dispatchEvent(new CustomEvent('unlockHero'));
                                            setTimeout(() => {
                                                const target = document.querySelector(link.href);
                                                if (target) {
                                                    target.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }, 100);
                                        }
                                    }}
                                    className="text-3xl font-heading text-[#1F1F1F] hover:text-[#D4AF37] transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="w-12 h-[2px] bg-white/10 mt-4" />
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="text-[#1F1F1F]/50 text-sm uppercase tracking-widest mt-4"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
