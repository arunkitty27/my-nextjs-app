"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, CupSoda, Croissant, Utensils, Zap, Heart, Star, Award, RefreshCcw } from "lucide-react";

// Game Data
const ICONS = [
    { id: 1, icon: <Coffee size={28} />, name: "Espresso" },
    { id: 2, icon: <CupSoda size={28} />, name: "Iced Tea" },
    { id: 3, icon: <Croissant size={28} />, name: "Croissant" },
    { id: 4, icon: <Utensils size={28} />, name: "Snack" },
    { id: 5, icon: <Zap size={28} />, name: "Energy" },
    { id: 6, icon: <Heart size={28} />, name: "Love" },
];

export default function TeaCoffeePuzzle() {
    const [cards, setCards] = useState<{ id: number; iconId: number; icon: React.ReactNode; isFlipped: boolean; isMatched: boolean }[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [isChecking, setIsChecking] = useState(false);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        // Create matching pairs
        const shuffled = [...ICONS, ...ICONS]
            .sort(() => Math.random() - 0.5)
            .map((item, index) => ({
                id: index,
                iconId: item.id,
                icon: item.icon,
                isFlipped: false,
                isMatched: false,
            }));

        setCards(shuffled);
        setFlippedCards([]);
        setMoves(0);
        setGameWon(false);
        setIsChecking(false);
    };

    const handleCardClick = (id: number) => {
        if (isChecking || gameWon) return; // Block clicks during check or win

        const clickedCard = cards.find(c => c.id === id);
        if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

        // Flip the card
        const newCards = cards.map(c =>
            c.id === id ? { ...c, isFlipped: true } : c
        );
        setCards(newCards);

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setIsChecking(true);
            setMoves(prev => prev + 1);
            checkForMatch(newFlipped, newCards);
        }
    };

    const checkForMatch = (currentFlipped: number[], currentCards: any[]) => {
        const [firstId, secondId] = currentFlipped;
        const firstCard = currentCards.find(c => c.id === firstId);
        const secondCard = currentCards.find(c => c.id === secondId);

        if (firstCard.iconId === secondCard.iconId) {
            // Match found
            setTimeout(() => {
                const matchedCards = currentCards.map(c =>
                    c.id === firstId || c.id === secondId
                        ? { ...c, isMatched: true, isFlipped: true }
                        : c
                );
                setCards(matchedCards);
                setFlippedCards([]);
                setIsChecking(false);

                // Check win condition
                if (matchedCards.every(c => c.isMatched)) {
                    setGameWon(true);
                }
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                const resetCards = currentCards.map(c =>
                    c.id === firstId || c.id === secondId
                        ? { ...c, isFlipped: false }
                        : c
                );
                setCards(resetCards);
                setFlippedCards([]);
                setIsChecking(false);
            }, 1000);
        }
    };

    return (
        <section className="py-24 w-full bg-[#FAFAFA] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">

                    {/* Text Side */}
                    <div className="flex-1 text-center md:text-left">
                        <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                            Mind & Brew
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-heading text-[#1F1F1F] mb-6">
                            Find Your <br /><span className="text-[#D4AF37] italic">Perfect Match.</span>
                        </h2>
                        <p className="text-[#6B5E51] text-lg mb-8 leading-relaxed">
                            Take a momentary break while you scroll. Can you match all our favorite brew essentials?
                        </p>

                        <div className="flex items-center justify-center md:justify-start gap-8 mb-8 md:mb-0">
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-[#1F1F1F]">{moves}</span>
                                <span className="text-xs uppercase tracking-wider text-[#6B5E51]">Moves</span>
                            </div>
                            <div className="w-px h-12 bg-black/10" />
                            <div className="text-center">
                                <span className="block text-2xl font-bold text-[#D4AF37]">
                                    {cards.filter(c => c.isMatched).length / 2} / {ICONS.length}
                                </span>
                                <span className="text-xs uppercase tracking-wider text-[#6B5E51]">Pairs</span>
                            </div>
                        </div>

                        <button
                            onClick={initializeGame}
                            className="mt-4 px-8 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 font-bold tracking-wider inline-flex items-center gap-2 group"
                        >
                            <RefreshCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                            RESET GAME
                        </button>
                    </div>

                    {/* Game Grid Side */}
                    <div className="flex-1 w-full max-w-md">
                        <div className="grid grid-cols-3 gap-3 md:gap-4 p-4 md:p-6 bg-white rounded-[2rem] shadow-xl border border-black/5 relative">
                            <AnimatePresence>
                                {gameWon && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm rounded-[2rem] flex flex-col items-center justify-center text-center p-6"
                                    >
                                        <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-white mb-4 shadow-lg animate-bounce">
                                            <Award size={32} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#1F1F1F] mb-2">Brew-tiful!</h3>
                                        <p className="text-[#6B5E51] mb-6">You matched them all in {moves} moves.</p>
                                        <button
                                            onClick={initializeGame}
                                            className="px-6 py-2 bg-[#1F1F1F] text-white rounded-full text-sm font-bold tracking-wide hover:bg-[#D4AF37] transition-colors"
                                        >
                                            PLAY AGAIN
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {cards.map((card) => (
                                <motion.div
                                    key={card.id}
                                    layout
                                    className="relative aspect-square cursor-pointer preserve-3d"
                                    onClick={() => handleCardClick(card.id)}
                                >
                                    <motion.div
                                        className="w-full h-full rounded-xl absolute inset-0 backface-hidden flex items-center justify-center shadow-sm border border-black/5 bg-[#F5F5F5] hover:bg-[#EBEBEB] transition-colors"
                                        initial={false}
                                        animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                                        transition={{ duration: 0.4 }}
                                        style={{ backfaceVisibility: 'hidden' }}
                                    >
                                        <div className="text-[#D4AF37]/40">
                                            <Star size={20} fill="currentColor" />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className={`w-full h-full rounded-xl absolute inset-0 backface-hidden flex items-center justify-center shadow-md border ${card.isMatched ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-black/5 bg-white"}`}
                                        initial={false}
                                        animate={{ rotateY: card.isFlipped ? 0 : -180 }}
                                        transition={{ duration: 0.4 }}
                                        style={{ backfaceVisibility: 'hidden', transform: "rotateY(180deg)" }}
                                    >
                                        <div className={`${card.isMatched ? "text-[#D4AF37]" : "text-[#1F1F1F]"}`}>
                                            {card.icon}
                                        </div>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
