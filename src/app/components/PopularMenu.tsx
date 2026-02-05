"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const POPULAR_ITEMS = [
    {
        name: "Electric Mojito",
        desc: "Icy mint explosion. Reset your brain after that long study session.",
        price: "₹89",
        img: "/assets/mojito.webp",
        className: "col-span-1 row-span-1"
    },
    {
        name: "Golden Fries",
        desc: "Crispy outside, fluffy inside. Warning: You won't want to share.",
        price: "₹99",
        img: "/assets/french fries.webp",
        className: "col-span-1 row-span-2 h-full"
    },
    {
        name: "Surapana Special",
        desc: "The chef's secret blend. Essential fuel for 8AM lectures.",
        price: "₹149",
        img: "/assets/special.webp",
        className: "col-span-1 row-span-1"
    }
];

export default function PopularMenu() {
    return (
        <section id="menu" className="py-24 bg-coffee-dark text-coffee-cream">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-16">
                    <div className="relative">
                        <div className="absolute -top-8 -left-8 text-coffee-highlight text-5xl">✦</div>
                        <h2 className="text-4xl md:text-6xl font-heading font-bold leading-tight text-white">
                            Most popular <br />
                            <span className="text-coffee-accent">Menu</span>
                        </h2>
                    </div>
                    <p className="max-w-xs text-sm text-coffee-cream/60 hidden md:block font-body border-l-2 border-coffee-highlight pl-4">
                        Curated specifically for the discerning taste buds of the future legal minds.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[300px]">
                    {POPULAR_ITEMS.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className={`relative group rounded-[2rem] overflow-hidden ${item.className}`}
                        >
                            <Image
                                src={item.img}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <h3 className="text-white text-2xl font-bold">{item.name}</h3>
                                <p className="text-white/80 text-sm mb-2">{item.desc}</p>
                                <span className="text-coffee-highlight font-bold text-xl">{item.price}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
