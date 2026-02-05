"use client";
import React from 'react';
import { MapPin, Phone, Instagram, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact" className="bg-[#FFFFFF] border-t border-black/5 pt-20 pb-10 text-[#1F1F1F]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-20">

                    {/* Brand */}
                    <div className="max-w-sm">
                        <h2 className="text-4xl font-heading font-bold mb-6 text-white tracking-widest">
                            SURAPANA
                        </h2>
                        <p className="text-coffee-cream/60 leading-relaxed mb-8">
                            Surapana is more than a cafe; it's a feeling.
                            A place to unwind, connect, and enjoy the simple pleasures of great tea and food.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all">
                                <Phone size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition-all">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="flex gap-16">
                        <div>
                            <h4 className="font-bold text-[#1F1F1F] mb-6 uppercase tracking-widest text-sm">Explore</h4>
                            <ul className="space-y-4 text-[#6B5E51]">
                                <li><a href="#home" className="hover:text-[#D4AF37] transition-colors">Home</a></li>
                                <li><a href="#menu" className="hover:text-[#D4AF37] transition-colors">Menu</a></li>
                                <li><a href="#features" className="hover:text-[#D4AF37] transition-colors">Vibe</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-6 uppercase tracking-widest text-sm">Visit</h4>
                            <ul className="space-y-4 text-coffee-cream/70">
                                <li className="flex gap-3 items-start">
                                    <MapPin size={18} className="mt-1 shrink-0 text-coffee-accent" />
                                    <span>
                                        123, Student Lane, <br />
                                        Near Law College, <br />
                                        Pune, Maharashtra
                                    </span>
                                </li>
                                <li className="flex gap-3 items-center">
                                    <Phone size={18} className="shrink-0 text-[#D4AF37]" />
                                    <span>+91 98765 43210</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#6B5E51]/60">
                    <p>&copy; 2024 Surapana. All rights reserved.</p>
                    <p>Designed with 🖤 and ☕</p>
                </div>
            </div>
        </footer>
    );
}
