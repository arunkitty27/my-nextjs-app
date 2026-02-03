"use client";
import { motion } from "framer-motion";
import { Star, Flame, Snowflake, Bean, ArrowRight, CornerDownRight } from "lucide-react";
import Image from "next/image";

interface MenuItemProps {
    title: string;
    img: string;
    desc: string;
    rating: number;
    iconType: "fire" | "ice" | "grain" | "burger";
    badge?: string;
    index: number;
    className?: string; // For Bento grid sizing
}

function MenuItem({ title, img, desc, rating, className, badge, index }: MenuItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className={`relative group overflow-hidden rounded-[2rem] bg-[#1a1816] border border-white/5 hover:border-[#C4B5A5]/20 transition-all duration-500 ${className}`}
        >
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src={img}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-50 group-hover:opacity-30 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12100E] via-[#12100E]/40 to-transparent" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-end p-8">
                {badge && (
                    <div className="absolute top-6 right-6 bg-[#C4B5A5] text-[#12100E] text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-sm">
                        {badge}
                    </div>
                )}

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={12}
                                className={`${i < rating ? "text-[#C4B5A5] fill-[#C4B5A5]" : "text-white/10 fill-white/10"}`}
                            />
                        ))}
                    </div>

                    <h3 className="text-3xl font-heading text-[#EBE5CE] mb-2 leading-tight tracking-wide">{title}</h3>

                    <p className="text-[#9C9687] text-sm max-w-[90%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-4 line-clamp-2 font-serif italic">
                        {desc}
                    </p>


                </div>
            </div>
        </motion.div>
    );
}

export default function MenuSection() {
    const items = [
        {
            title: "The Boss Burger",
            img: "/assets/burger.webp",
            desc: "Stacked high with premium cheese, fresh crunch, and a patty that hits different.",
            rating: 5,
            iconType: "burger" as const,
            badge: "FEATURED",
            className: "md:col-span-2 md:row-span-2 min-h-[400px]" // Big Bento Item
        },
        {
            title: "Kadak Chai",
            img: "/assets/tea.webp",
            desc: "Brewed strong with real spices. The official fuel for 8AM lectures.",
            rating: 5,
            iconType: "fire" as const,
            className: "md:col-span-1 min-h-[250px]"
        },
        {
            title: "Electric Mojito",
            img: "/assets/mojito.webp",
            desc: "Icy mint explosion. Reset your brain after that long study session.",
            rating: 5,
            iconType: "ice" as const,
            className: "md:col-span-1 min-h-[250px]"
        },
        {
            title: "Golden Fries",
            img: "/assets/french%20fries.webp",
            desc: "Crispy outside, fluffy inside. Warning: You won't want to share.",
            rating: 4,
            iconType: "grain" as const,
            className: "md:col-span-2 min-h-[250px]" // Wide Item
        }
    ];

    return (
        <section id="menu" className="py-32 relative z-10 w-full bg-[#12100E]">
            <div className="page-container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-[#C4B5A5] font-bold tracking-[0.2em] text-xs uppercase mb-4 block flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-[#C4B5A5]"></span> Top Picks
                        </span>
                        <h2 className="text-5xl md:text-7xl font-heading font-bold text-white leading-none">
                            FLAVOR <br /> <span className="text-[#9C9687] italic font-serif">DROPS.</span>
                        </h2>
                    </div>
                    <div className="max-w-xs text-right">
                        <p className="text-white/50 text-sm leading-relaxed mb-4">
                            Curated specifically for the discerning taste buds of the future legal minds.
                        </p>
                        <CornerDownRight className="ml-auto text-gold mb-2" size={32} />
                    </div>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(100px, auto)]">
                    {items.map((item, i) => (
                        <MenuItem key={i} index={i} {...item} />
                    ))}

                    {/* Call to Action Block */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="md:col-span-1 flex items-center justify-center p-8 border border-dashed border-white/20 rounded-[2rem]"
                    >
                        <a href="/assets/menu.webp" target="_blank" className="group text-center cursor-pointer">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold group-hover:text-black transition-colors duration-300">
                                <ArrowRight size={24} className="group-hover:-rotate-45 transition-transform duration-300" />
                            </div>
                            <span className="text-white font-bold text-lg block group-hover:underline decoration-gold underline-offset-4">View Full Menu</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
