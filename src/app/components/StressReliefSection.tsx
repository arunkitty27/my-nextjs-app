"use client";
import { motion } from "framer-motion";
import { Smile, Heart, Sparkles, Coffee } from "lucide-react";

const comfortQuotes = [
    {
        quote: "Laughter is brightest where food is best.",
        icon: Smile,
        col: "md:col-span-2",
    },
    {
        quote: "Food is a warm hug.",
        icon: Heart,
        col: "md:col-span-1",
    },
    {
        quote: "Good food is the foundation of genuine happiness.",
        icon: Sparkles,
        col: "md:col-span-1",
    },
    {
        quote: "One cannot think well, love well, sleep well, if one has not dined well.",
        icon: Coffee,
        col: "md:col-span-2",
    }
];

export default function StressReliefSection() {
    return (
        <section id="chill-zone" className="py-16 md:py-24 relative z-10 w-full bg-[#FFFFFF]">
            <div className="page-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-20 text-center max-w-3xl mx-auto px-4"
                >
                    <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                        Stress Relief
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading text-[#1F1F1F] mb-4 md:mb-6">
                        Good Food, <span className="text-[#D4AF37] italic">Better Mood.</span>
                    </h2>
                    <p className="text-[#6B5E51] text-sm md:text-base leading-relaxed">
                        Exams, deadlines, life... leave them at the door. Our space is designed to be your sanctuary.
                        Let the aroma of fresh brew and the comfort of our cheesiest burgers reset your dopamine levels.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4">
                    {comfortQuotes.map((item, i) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.7,
                                    delay: i * 0.1,
                                    ease: [0.25, 0.1, 0.25, 1]
                                }}
                                viewport={{ once: true, margin: "-50px" }}
                                className={`relative group overflow-hidden rounded-2xl ${item.col} min-h-[280px] cursor-pointer bg-gradient-to-br from-[#D4AF37] to-[#B8941F] border-2 border-[#D4AF37] hover:scale-[1.02] transition-transform duration-500`}
                            >
                                {/* Quote Content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-10 text-center">
                                    {/* Icon decoration */}
                                    <div className="mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        <IconComponent className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />
                                    </div>

                                    <p className="text-white text-xl md:text-2xl lg:text-3xl font-serif italic leading-relaxed transform group-hover:scale-105 transition-transform duration-500">
                                        "{item.quote}"
                                    </p>
                                </div>

                                {/* Hover glow effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
