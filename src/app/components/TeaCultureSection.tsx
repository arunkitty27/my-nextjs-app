"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { TeaHealing } from "./TeaHealing";

export default function TeaCultureSection() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

    return (
        <section id="vibe" ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 gap-16">
            {/* Background Parallax Image - Dark Moody Tea Pouring */}
            <div className="absolute inset-0 z-0">
                <motion.div style={{ y: y1 }} className="relative w-full h-[120%]">
                    <Image
                        src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=2121&auto=format&fit=crop"
                        alt="Tea Ritual Details"
                        fill
                        className="object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-[#12100E]/60 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#12100E] via-transparent to-[#12100E]" />
                </motion.div>
            </div>

            {/* Tea Healing Animation */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 w-full max-w-2xl mx-auto px-6"
            >
                <TeaHealing width="100%" height="400px" className="drop-shadow-2xl" />
            </motion.div>

            <motion.div
                style={{ opacity }}
                className="relative z-10 max-w-4xl mx-auto text-center px-6"
            >
                <div className="glass-card p-12 md:p-16 rounded-[2px]">
                    <span className="text-[#C4B5A5] text-xs font-bold tracking-[0.3em] uppercase mb-6 block">
                        The Ritual
                    </span>
                    <h2 className="text-4xl md:text-6xl font-heading text-[#EBE5CE] mb-8 leading-tight">
                        "Tea is the thread that weaves <br className="hidden md:block" />
                        moments of <span className="text-[#C4B5A5] italic font-serif">tranquility.</span>"
                    </h2>
                    <p className="text-[#9C9687] text-lg leading-relaxed font-serif italic max-w-2xl mx-auto">
                        In the stillness of a teacup, worries dissolve. It is not just a drink, but a gentle reminder to slow down, breathe, and find clarity in the chaos. At Surapana, every cup is brewed with the intent to heal.
                    </p>

                    <div className="mt-12 flex justify-center gap-12">
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-heading text-[#C4B5A5] mb-2">95°C</span>
                            <span className="text-[10px] uppercase tracking-widest text-[#EBE5CE]/50">Brewing Temp</span>
                        </div>
                        <div className="w-[1px] h-12 bg-white/10" />
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-heading text-[#C4B5A5] mb-2">3 Mins</span>
                            <span className="text-[10px] uppercase tracking-widest text-[#EBE5CE]/50">Steep Time</span>
                        </div>
                        <div className="w-[1px] h-12 bg-white/10" />
                        <div className="flex flex-col items-center">
                            <span className="text-2xl font-heading text-[#C4B5A5] mb-2">∞</span>
                            <span className="text-[10px] uppercase tracking-widest text-[#EBE5CE]/50">Peace Found</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
