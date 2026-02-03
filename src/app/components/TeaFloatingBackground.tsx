"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Leaf, Wind, Cloud } from "lucide-react";

type FloatingElement = {
    id: number;
    randomLeft: string;
    randomDelay: number;
    randomDuration: number;
    size: number;
    Icon: React.ElementType;
};

export default function TeaFloatingBackground() {
    const [elements, setElements] = useState<FloatingElement[]>([]);

    useEffect(() => {
        // Generate elements primarily on component mount to avoid hydration mismatch
        // This runs only on the client
        const starCount = 15;
        const newElements = Array.from({ length: starCount }).map((_, i) => ({
            id: i,
            randomLeft: Math.floor(Math.random() * 100) + "%",
            randomDelay: Math.random() * 20,
            randomDuration: 15 + Math.random() * 20,
            size: Math.random() > 0.5 ? 20 : 30,
            Icon: i % 3 === 0 ? Leaf : (i % 3 === 1 ? Wind : Cloud),
        }));
        setElements(newElements);
    }, []);

    if (elements.length === 0) return null; // Or return a static placeholder to avoid layout shift

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {elements.map((el) => {
                const { id, randomLeft, randomDelay, randomDuration, size, Icon } = el;
                return (
                    <motion.div
                        key={id}
                        initial={{ y: "110vh", x: randomLeft, opacity: 0, rotate: 0 }}
                        animate={{
                            y: "-20vh",
                            opacity: [0, 0.4, 0],
                            rotate: [0, 360],
                            x: ["-20px", "20px", "-20px"] // Swaying motion
                        }}
                        transition={{
                            duration: randomDuration,
                            repeat: Infinity,
                            delay: randomDelay,
                            ease: "linear",
                            x: {
                                duration: 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }
                        }}
                        className="absolute text-[var(--gold)]/10"
                    >
                        <Icon size={size} />
                    </motion.div>
                );
            })}
        </div>
    );
}
