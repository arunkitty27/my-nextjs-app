"use client";
import { motion } from "framer-motion";

const comfortImages = [
    {
        src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop",
        alt: "Friends Laughing in Cafe",
        quote: "Laughter is brightest where food is best.",
        col: "md:col-span-2",
        aspect: "aspect-[16/9]"
    },
    {
        src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop",
        alt: "Comfort Food Wings",
        quote: "Food is a warm hug.",
        col: "md:col-span-1",
        aspect: "aspect-square"
    },
    {
        src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop",
        alt: "Aesthetic Coffee Vibes",
        quote: "Good food is the foundation of genuine happiness.",
        col: "md:col-span-1",
        aspect: "aspect-square"
    },
    {
        src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&auto=format&fit=crop",
        alt: "Quiet Reading with Tea",
        quote: "One cannot think well, love well, sleep well, if one has not dined well.",
        col: "md:col-span-2",
        aspect: "aspect-[16/9]"
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
                    {comfortImages.map((item, i) => (
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
                            className={`relative group overflow-hidden rounded-[2px] ${item.col} ${item.aspect} min-h-[200px] cursor-pointer`}
                        >
                            {/* Regular img tag for better compatibility */}
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-active:scale-110 grayscale-[0.3] group-hover:grayscale-0 group-active:grayscale-0"
                                loading={i === 0 ? "eager" : "lazy"}
                            />

                            {/* Gradient Overlay - works on mobile tap and desktop hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 group-active:from-black/40 transition-all duration-500 ease-out" />

                            {/* Quote Overlay - shows on hover/tap on both mobile and desktop */}
                            <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-500 ease-out bg-white/80 backdrop-blur-sm">
                                <p className="text-[#1F1F1F] text-lg md:text-xl lg:text-2xl font-heading text-center leading-normal drop-shadow-sm transform scale-90 group-hover:scale-100 group-active:scale-100 transition-transform duration-500">
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
