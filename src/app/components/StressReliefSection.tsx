"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const comfortImages = [
    {
        src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
        alt: "Friends Laughing in Cafe",
        quote: "Laughter is brightest where food is best.",
        col: "md:col-span-2",
        aspect: "aspect-[16/9]"
    },
    {
        src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop",
        alt: "Comfort Food Wings",
        quote: "Food is a warm hug.",
        col: "md:col-span-1",
        aspect: "aspect-square"
    },
    {
        src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
        alt: "Aesthetic Coffee Vibes",
        quote: "Good food is the foundation of genuine happiness.",
        col: "md:col-span-1",
        aspect: "aspect-square"
    },
    {
        src: "https://images.unsplash.com/photo-1520263659976-9214713c7746?q=80&w=1978&auto=format&fit=crop",
        alt: "Quiet Reading with Tea",
        quote: "One cannot think well, love well, sleep well, if one has not dined well.",
        col: "md:col-span-2",
        aspect: "aspect-[16/9]"
    }
];

export default function StressReliefSection() {
    return (
        <section id="chill-zone" className="py-24 relative z-10 w-full bg-[#12100E]">
            <div className="page-container">
                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <span className="text-[#C4B5A5] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                        Stress Relief
                    </span>
                    <h2 className="text-4xl md:text-5xl font-heading text-[#EBE5CE] mb-6">
                        Good Food, <span className="text-[#C4B5A5] italic">Better Mood.</span>
                    </h2>
                    <p className="text-[#9C9687] leading-relaxed">
                        Exams, deadlines, life... leave them at the door. Our space is designed to be your sanctuary.
                        Let the aroma of fresh brew and the comfort of our cheesiest burgers reset your dopamine levels.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {comfortImages.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative group overflow-hidden rounded-[2px] ${item.col} ${item.aspect}`}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[0.2] group-hover:grayscale-0"
                                priority={i === 0}
                            />
                            {/* Gradient Overlay - lighter to show image */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent group-hover:from-black/30 transition-colors duration-500" />

                            {/* Quote Overlay - shows on hover */}
                            <div className="absolute inset-0 flex items-center justify-center p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/60">
                                <p className="text-white text-xl md:text-2xl font-heading text-center leading-normal drop-shadow-lg">
                                    "{item.quote}"
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
