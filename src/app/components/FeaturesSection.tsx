"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function FeaturesSection() {
    return (
        <section id="features" className="bg-[#FFFFFF] text-[#1F1F1F] py-24 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-16">

                    {/* Left Image Composition */}
                    <div className="flex-1 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 h-[500px] w-full rounded-tr-[5rem] rounded-bl-[5rem] overflow-hidden border-4 border-black/5"
                        >
                            <Image
                                src="/assets/burger.webp"
                                alt="The Boss Burger"
                                fill
                                className="object-cover opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/80 to-transparent"></div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-black/5 shadow-lg">
                                <span className="block text-[#D4AF37] text-2xl font-bold font-heading">The Boss</span>
                                <span className="text-[#1F1F1F]/60 text-xs tracking-widest uppercase">Best Seller</span>
                            </div>
                        </motion.div>

                        {/* Outline Decoration */}
                        <div className="absolute -bottom-8 -left-8 w-full h-full border border-[#D4AF37]/30 rounded-tr-[5rem] rounded-bl-[5rem] z-0 hidden md:block" />
                    </div>

                    {/* Right Content */}
                    <div className="flex-1">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-heading font-bold mb-6"
                        >
                            Our Special <br />
                            <span className="text-[#D4AF37]">Features</span> that make <br />
                            you happy
                        </motion.h2>

                        <p className="text-[#6B5E51] leading-relaxed mb-10 max-w-md font-body">
                            More than just a cafe. It's your sanctuary for stress relief, good vibes, and flavors that hit different.
                        </p>

                        <div className="flex flex-col gap-6 mb-10">
                            {/* Feature 1 */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                                    <span className="text-xl">★</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-[#1F1F1F] mb-1">Squad Friendly</h4>
                                    <p className="text-sm text-[#6B5E51]">Big tables, unmatched vibes. The perfect spot for your entire crew.</p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37]">
                                    <span className="text-xl">✦</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-[#1F1F1F] mb-1">Top Quality</h4>
                                    <p className="text-sm text-[#6B5E51]">Fresh ingredients, hygiene first. We don't compromise on what you eat.</p>
                                </div>
                            </div>
                        </div>

                        <button className="px-8 py-3 bg-[#1F1F1F] text-white rounded-br-2xl rounded-tl-2xl hover:bg-[#D4AF37] hover:text-white transition-all font-bold text-xs uppercase tracking-widest shadow-lg shadow-black/10">
                            Explore Menu
                        </button>
                    </div>
                </div>

                {/* Floating Beans Decoration at bottom */}
                <div className="mt-20 relative h-32 w-full overflow-hidden opacity-50">
                    {/* Placeholder for beans - simpler approach using CSS circles for now if no bean assets */}
                    <div className="absolute bottom-0 right-10 w-20 h-20 bg-[#D4AF37]/20 rounded-full blur-sm"></div>
                    <div className="absolute bottom-10 right-32 w-16 h-16 bg-[#D4AF37]/30 rounded-full blur-md"></div>
                    <div className="absolute -bottom-5 right-60 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-sm"></div>
                </div>
            </div>
        </section>
    );
}
