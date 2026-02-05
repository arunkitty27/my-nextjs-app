"use client";
import { motion } from "framer-motion";

export default function MarqueeGallery() {
    const contentCards = [
        { type: "quote", text: "Where Every Sip Tells a Story", author: "— Surapana Cafe" },
        { type: "menu", title: "Kadak Chai", price: "₹25", desc: "Strong & Spicy" },
        { type: "vibe", text: "Good Coffee, Good Vibes, Great Company" },
        { type: "menu", title: "Electric Mojito", price: "₹89", desc: "Fresh & Zesty" },
        { type: "quote", text: "Life Happens, Coffee Helps", author: "— Anonymous" },
        { type: "menu", title: "Surapana Special", price: "₹149", desc: "Chef's Secret" },
        { type: "vibe", text: "Brewed with Love, Served with Smile" },
        { type: "menu", title: "Cold Coffee", price: "₹79", desc: "Chilled Perfection" },
        { type: "quote", text: "But First, Chai", author: "— Tea Lovers" },
        { type: "vibe", text: "Your Happy Place Awaits" },
    ];

    return (
        <section id="chill-zone" className="section-spacing relative w-full overflow-hidden bg-[#FAFAFA] border-y border-[#D4AF37]/20">
            <div className="page-container mb-12 text-center">
                <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-xs uppercase mb-3 block">Gallery</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1F1F1F] mb-2">THE HANGOUT SPOT</h2>
                <div className="h-1 w-20 bg-[#D4AF37] mx-auto rounded-full mt-6" />
            </div>

            <div className="relative w-full">
                <div className="flex w-full overflow-hidden">
                    <motion.div
                        className="flex gap-8 px-4"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        style={{ width: "fit-content" }}
                    >
                        {contentCards.map((card, i) => (
                            <div
                                key={i}
                                className={`relative w-[300px] h-[220px] md:w-[400px] md:h-[300px] flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-500 group ${card.type === 'quote'
                                        ? 'bg-gradient-to-br from-[#D4AF37] to-[#B8941F] border-2 border-[#D4AF37]'
                                        : card.type === 'menu'
                                            ? 'bg-white border-2 border-[#D4AF37] shadow-lg'
                                            : 'bg-gradient-to-br from-[#1F1F1F] to-[#3A3A3A] border-2 border-[#D4AF37]/30'
                                    }`}
                            >
                                {card.type === 'quote' && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                        <svg className="w-12 h-12 text-white/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                                        </svg>
                                        <p className="text-white text-xl md:text-2xl font-serif italic leading-relaxed mb-4">
                                            {card.text}
                                        </p>
                                        <p className="text-white/80 text-sm tracking-wider">
                                            {card.author}
                                        </p>
                                    </div>
                                )}

                                {card.type === 'menu' && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                        <div className="w-16 h-1 bg-[#D4AF37] mb-6" />
                                        <h3 className="text-2xl md:text-3xl font-bold text-[#1F1F1F] mb-3 tracking-wide">
                                            {card.title}
                                        </h3>
                                        <p className="text-[#6B5E51] italic text-sm mb-4">
                                            {card.desc}
                                        </p>
                                        <p className="text-[#D4AF37] text-3xl font-bold tracking-wider">
                                            {card.price}
                                        </p>
                                        <div className="w-16 h-1 bg-[#D4AF37] mt-6" />
                                    </div>
                                )}

                                {card.type === 'vibe' && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                                        <div className="w-20 h-20 border-4 border-[#D4AF37] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                            <span className="text-[#D4AF37] text-3xl">☕</span>
                                        </div>
                                        <p className="text-white text-lg md:text-xl font-bold tracking-wide leading-relaxed">
                                            {card.text}
                                        </p>
                                    </div>
                                )}

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
