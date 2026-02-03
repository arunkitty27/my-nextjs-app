"use client";
import { motion, useScroll, useTransform } from "framer-motion"; // Turbo
import { Heart, ShieldCheck, Zap } from "lucide-react";
import { useRef } from "react";

export default function KarmaPillars() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Removed the large 'y' translation that was pushing content off-screen.
    // Instead, we use a subtle parallax effect for the maruqee text.

    const pillars = [
        {
            icon: <Heart size={40} className="text-maroon-dark" />,
            title: "Squad Friendly",
            desc: "Big tables, unmatched vibes. The perfect spot for your entire crew.",
        },
        {
            icon: <ShieldCheck size={40} className="text-maroon-dark" />,
            title: "Top Quality",
            desc: "Fresh ingredients, hygiene first. We don't compromise on what you eat.",
        },
        {
            icon: <Zap size={40} className="text-maroon-dark" />,
            title: "Fast Service",
            desc: "Running late for class? We get your fix ready before the bell rings.",
        }
    ];

    return (
        <section ref={containerRef} className="py-24 relative z-10 w-full overflow-hidden bg-[#0a0a0a]">

            {/* Background Marquee Text - slower, subtle */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none">
                <motion.div
                    style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
                    className="whitespace-nowrap text-[15vw] font-black font-heading text-white leading-none"
                >
                    KARMA • KARMA • KARMA •
                </motion.div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            viewport={{ margin: "-50px" }}
                            className="group h-full bg-[#111] p-10 rounded-[2rem] border border-white/5 hover:border-gold/30 hover:bg-[#151515] transition-all duration-500 relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-gold rounded-2xl rotate-3 group-hover:rotate-12 transition-transform duration-500 flex items-center justify-center mb-8 shadow-lg">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-2xl font-heading font-bold text-white mb-4">{pillar.title}</h3>
                                <p className="text-white/60 leading-relaxed font-body">
                                    {pillar.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
