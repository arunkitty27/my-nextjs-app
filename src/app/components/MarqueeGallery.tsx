"use client";
import { motion } from "framer-motion";

export default function MarqueeGallery() {
    const images = [
        "/assets/ambience.webp",
        "/assets/ambience2.webp",
        "/assets/special.webp",
        "/assets/types_of_tea.webp",
        "/assets/shop.webp",
        "/assets/ambience.webp",
        "/assets/ambience2.webp",
        "/assets/special.webp",
        "/assets/types_of_tea.webp",
        "/assets/shop.webp"
    ];

    return (
        <section id="chill-zone" className="section-spacing relative w-full overflow-hidden bg-[#0a0a0a] border-y border-white/5">
            <div className="page-container mb-12 text-center">
                <span className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Gallery</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">THE HANGOUT SPOT</h2>
                <div className="h-1 w-20 bg-gold mx-auto rounded-full mt-6" />
            </div>

            <div className="relative w-full">
                <div className="flex w-full overflow-hidden">
                    <motion.div
                        className="flex gap-8 px-4"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        style={{ width: "fit-content" }}
                    >
                        {images.map((src, i) => (
                            <div
                                key={i}
                                className="relative w-[300px] h-[220px] md:w-[400px] md:h-[300px] flex-shrink-0 rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-grayscale duration-500 border border-white/10 group"
                            >
                                <img
                                    src={src}
                                    alt="Gallery"
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white font-bold tracking-widest uppercase text-sm border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">Vibes</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
