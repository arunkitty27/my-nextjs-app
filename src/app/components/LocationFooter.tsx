"use client";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight, Instagram, Phone } from "lucide-react";

export default function LocationFooter() {
    return (
        <>
            <section id="location" className="section-spacing relative z-10 w-full">
                <div className="page-container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="glass-panel p-8 md:p-16 rounded-[2rem] border border-black/5 relative overflow-hidden bg-[#FFFFFF] shadow-xl"
                    >
                        {/* Background Subtle Pattern */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,#000_1px,transparent_1px)] bg-[size:30px_30px]" />

                        <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20">

                            {/* CTA Side */}
                            <div className="flex-1 flex flex-col justify-center items-start">
                                <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Visit Us</span>
                                <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-[#1F1F1F] mb-8 leading-[0.9]">
                                    PULL UP <br /> <span className="text-[#D4AF37]">TO THE SPOT</span>
                                </h2>
                                <a
                                    href="https://www.google.com/maps/search/Surapana+Teacafe+Nagarbhavi+Bangalore"
                                    target="_blank"
                                    className="inline-flex items-center gap-3 bg-gold text-[#3E0014] px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors duration-300 group"
                                >
                                    Get Directions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>

                            {/* Divider */}
                            <div className="hidden lg:block w-px bg-black/10 self-stretch" />

                            {/* Info Side */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                                {/* Address */}
                                <div className="flex flex-col gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-[#1F1F1F] mb-2 uppercase tracking-wide">Location</h4>
                                        <p className="text-[#6B5E51] leading-relaxed text-sm">
                                            National Law School of India University,<br />
                                            Opp. Union Bank, Chandra Layout,<br />
                                            Bengaluru - 560072
                                        </p>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex flex-col gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-[#1F1F1F] mb-2 uppercase tracking-wide">Hours</h4>
                                        <div className="bg-black/5 border border-black/5 rounded-lg px-4 py-3 text-sm inline-block">
                                            <span className="block text-[#D4AF37] font-bold text-[10px] tracking-wider uppercase mb-1">Open Everyday</span>
                                            <span className="text-[#1F1F1F] font-light">7:00 AM – 11:00 PM</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </section>

            <footer className="py-8 border-t border-black/5 bg-[#F9F9F9] relative z-10 w-full">
                <div className="page-container flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
                        <span className="text-xl font-heading text-[#D4AF37] tracking-widest">SURAPANA</span>
                        <p className="text-[#6B5E51] text-xs uppercase tracking-widest">
                            &copy; 2026 Surapana TeaCafe.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <a href="#" className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-[#6B5E51] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                            <Instagram size={14} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-[#6B5E51] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                            <Phone size={14} />
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
