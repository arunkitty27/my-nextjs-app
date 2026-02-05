"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function NewHero() {
    return (
        <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-coffee-dark overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 text-center md:text-left z-10"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold font-heading text-coffee-cream mb-6 leading-tight">
                            Sip into <br />
                            <span className="relative text-coffee-accent">The Vibe</span> <br />
                            at <span className="relative inline-block text-white">
                                Surapana
                                <span className="absolute -bottom-2 left-0 w-full h-3 bg-coffee-highlight/20 -z-10 rounded-full"></span>
                            </span>
                        </h1>
                        <p className="text-coffee-cream/60 text-lg mb-8 max-w-lg mx-auto md:mx-0 font-body">
                            Where flavor meets feeling. Experience the perfect blend of chill vibes, spicy chai, and the cheesiest burgers in town.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            <a href="#menu" className="px-8 py-4 bg-coffee-highlight text-white rounded-br-3xl rounded-tl-3xl shadow-lg hover:shadow-xl hover:bg-coffee-accent transition-all flex items-center gap-2 font-bold tracking-wide">
                                Check Menu
                                <ArrowUpRight size={18} />
                            </a>
                            <a href="#location" className="px-8 py-4 bg-transparent text-coffee-cream border-2 border-coffee-cream/10 rounded-br-3xl rounded-tl-3xl shadow-lg hover:shadow-xl hover:bg-white/5 transition-all font-bold tracking-wide">
                                Find Us
                            </a>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 flex items-center gap-12 justify-center md:justify-start border-l-4 border-coffee-accent pl-6">
                            <div>
                                <span className="block text-3xl font-bold text-coffee-cream">50+</span>
                                <span className="text-xs uppercase tracking-widest text-coffee-cream/40">Flavors</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-bold text-coffee-cream">∞</span>
                                <span className="text-xs uppercase tracking-widest text-coffee-cream/40">Good Vibes</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex-1 relative w-full max-w-lg mx-auto md:max-w-none"
                    >
                        <div className="relative aspect-square">
                            {/* Decorative Geometric Frames */}
                            <div className="absolute top-0 right-0 w-[90%] h-[90%] border-2 border-white/5 rounded-[3rem] rotate-6 z-0"></div>
                            <div className="absolute bottom-0 left-0 w-[80%] h-[80%] border-2 border-coffee-accent/20 rounded-[3rem] -rotate-3 z-0"></div>

                            {/* Main Image */}
                            <div className="absolute inset-4 rounded-[3rem] overflow-hidden shadow-2xl z-10 bg-coffee-brown ring-1 ring-white/10">
                                <Image
                                    src="/assets/tea.webp"
                                    alt="Surapana Tea"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700 opacity-90"
                                    priority
                                />
                            </div>

                            {/* Floating Stars/Decorations */}
                            <div className="absolute -top-8 -right-8 text-coffee-highlight animate-pulse text-6xl">✨</div>
                            <div className="absolute top-1/2 -left-12 text-coffee-accent text-4xl">✦</div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-coffee-cream/30">
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-[1px] h-12 bg-coffee-cream/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-coffee-cream animate-slide-down"></div>
                </div>
            </div>
        </section>
    );
}
