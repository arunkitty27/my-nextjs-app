"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function HorizontalScrollGallery() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // 1:1 Direct mapping - Removed spring to fix "lag" feeling
    // -60% ensures we see the start of the first slide and the end of the last slide comfortably
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    const images = [
        { src: "/assets/ambience.webp", title: "Study Vibes", subtitle: "Focus Mode On" },
        { src: "/assets/ambience2.webp", title: "Night Chill", subtitle: "Decompress" },
        { src: "/assets/special.webp", title: "Specials", subtitle: "Chef's Kiss" },
        { src: "/assets/types_of_tea.webp", title: "Brews", subtitle: "Aromatic Bliss" },
        { src: "/assets/shop.webp", title: "The Spot", subtitle: "Where It Happens" },
        { src: "/assets/burger.webp", title: "Cravings", subtitle: "Midnight Fuel" },
    ];

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-[#0a0a0a]">

            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div
                    style={{ x }}
                    className="flex items-center gap-10 pl-[5vw] will-change-transform" // Hardware acceleration hint
                >
                    <div className="flex flex-col justify-center min-w-[40vw] pl-10 shrink-0">
                        <h2 className="text-6xl md:text-8xl font-heading font-black text-white mb-6 leading-[0.8] tracking-tighter">
                            VIBE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-orange-500">SHIFT</span>
                        </h2>
                        <p className="text-lg text-white/50 tracking-widest uppercase border-l-2 border-gold pl-6">
                            Scroll to explore
                        </p>
                    </div>

                    {images.map((item, i) => {
                        return (
                            <ParallaxImage key={i} src={item.src} title={item.title} subtitle={item.subtitle} index={i} />
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}

function ParallaxImage({ src, title, subtitle, index }: { src: string, title: string, subtitle: string, index: number }) {
    return (
        <div
            className="group relative h-[60vh] w-[80vw] md:w-[40vw] flex-shrink-0 rounded-[2rem] overflow-hidden bg-[#111] border border-white/5 mx-4"
        >
            <Image
                src={src}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 p-8 w-full z-10">
                <h3 className="text-3xl md:text-5xl font-heading text-white font-bold mb-2">{title}</h3>
                <p className="text-gold text-sm font-bold tracking-widest uppercase">{subtitle}</p>
            </div>

            <div className="absolute top-6 right-6 text-white/10 text-6xl font-black z-0 pointer-events-none select-none">
                0{index + 1}
            </div>
        </div>
    );
}
