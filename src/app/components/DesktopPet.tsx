"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const genZQuotes = [
    "In my tea-drinking era 🍵",
    "Manifesting snacks for you ✨",
    "No cap, this menu is a slay 💯",
    "Living my best chai life ☕",
    "This vibe is immaculate 🌟",
    "Periodt! Time for a break 💅",
    "Main character energy only 👑",
    "Sipping tea and spilling none ☕",
    "It's giving cozy vibes 🤌",
    "Chef's kiss on this one 🤌✨",
    "Lowkey obsessed with this spot 😌",
    "The vibes are unmatched fr 🔥",
    "Touch grass? Nah, touch menu 📜",
    "This hits different 💫",
    "Respectfully, you need a break ☕"
];

export default function DesktopPet() {
    const [isVisible, setIsVisible] = useState(false);
    const [showBubble, setShowBubble] = useState(false);
    const [currentQuote, setCurrentQuote] = useState("");
    const [isSquishing, setIsSquishing] = useState(false);

    // Check localStorage on mount
    useEffect(() => {
        const isPetHidden = localStorage.getItem("desktopPetHidden");
        if (!isPetHidden) {
            setIsVisible(true);
        }
    }, []);

    // Random bubble every 45 seconds
    useEffect(() => {
        if (!isVisible) return;

        const interval = setInterval(() => {
            showRandomQuote();
        }, 45000);

        return () => clearInterval(interval);
    }, [isVisible]);

    const showRandomQuote = () => {
        const randomQuote = genZQuotes[Math.floor(Math.random() * genZQuotes.length)];
        setCurrentQuote(randomQuote);
        setShowBubble(true);

        setTimeout(() => {
            setShowBubble(false);
        }, 4000);
    };

    const handlePetClick = () => {
        setIsSquishing(true);
        showRandomQuote();

        setTimeout(() => {
            setIsSquishing(false);
        }, 400);
    };

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem("desktopPetHidden", "true");
    };

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
            {/* Speech Bubble */}
            <AnimatePresence>
                {showBubble && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="relative bg-white rounded-2xl px-5 py-3 shadow-lg border border-[#D4AF37]/20 max-w-[200px] md:max-w-[250px]"
                    >
                        <p className="text-[#1F1F1F] text-sm md:text-base font-medium text-center">
                            {currentQuote}
                        </p>
                        {/* Bubble tail */}
                        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-[#D4AF37]/20 transform rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pet Container */}
            <div className="relative">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-[#D4AF37] hover:bg-[#B8941F] rounded-full flex items-center justify-center shadow-md transition-colors duration-200 z-10"
                    aria-label="Close pet"
                >
                    <X className="w-4 h-4 text-white" strokeWidth={2.5} />
                </button>

                {/* Pet Character */}
                <motion.div
                    animate={{
                        y: isSquishing ? [0, -5, 0] : [0, -10, 0],
                        scale: isSquishing ? [1, 1.1, 0.9, 1.05, 1] : 1
                    }}
                    transition={{
                        y: {
                            duration: isSquishing ? 0.4 : 2,
                            repeat: isSquishing ? 0 : Infinity,
                            ease: "easeInOut"
                        },
                        scale: {
                            duration: 0.4,
                            times: [0, 0.2, 0.5, 0.8, 1]
                        }
                    }}
                    onClick={handlePetClick}
                    className="cursor-pointer select-none w-20 h-20 md:w-24 md:h-24"
                >
                    {/* Tea Cup SVG Character */}
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full drop-shadow-lg"
                    >
                        {/* Cup body */}
                        <path
                            d="M20 40 L25 80 C25 85 30 90 35 90 L65 90 C70 90 75 85 75 80 L80 40 Z"
                            fill="#D4AF37"
                            stroke="#B8941F"
                            strokeWidth="2"
                        />

                        {/* Tea liquid */}
                        <ellipse
                            cx="50"
                            cy="42"
                            rx="28"
                            ry="8"
                            fill="#8B7355"
                            opacity="0.8"
                        />

                        {/* Steam */}
                        <motion.path
                            d="M 40 30 Q 38 20 40 15"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.6"
                            animate={{ pathLength: [0, 1, 0], opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.path
                            d="M 50 30 Q 50 20 52 12"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.6"
                            animate={{ pathLength: [0, 1, 0], opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                        />
                        <motion.path
                            d="M 60 30 Q 62 20 60 15"
                            stroke="#FFFFFF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.6"
                            animate={{ pathLength: [0, 1, 0], opacity: [0.3, 0.7, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                        />

                        {/* Cup handle */}
                        <path
                            d="M 80 45 Q 95 45 95 55 Q 95 65 80 65"
                            fill="none"
                            stroke="#B8941F"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />

                        {/* Eyes */}
                        <circle cx="42" cy="55" r="3" fill="#1F1F1F" />
                        <circle cx="58" cy="55" r="3" fill="#1F1F1F" />

                        {/* Smile */}
                        <path
                            d="M 40 65 Q 50 70 60 65"
                            stroke="#1F1F1F"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                        />

                        {/* Blush */}
                        <circle cx="32" cy="60" r="4" fill="#FF9999" opacity="0.4" />
                        <circle cx="68" cy="60" r="4" fill="#FF9999" opacity="0.4" />
                    </svg>
                </motion.div>
            </div>
        </motion.div>
    );
}
