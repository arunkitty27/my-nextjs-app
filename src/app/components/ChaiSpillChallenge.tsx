"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, AlertCircle, Trophy, Play, Hand, RefreshCw } from 'lucide-react';

// === GAME DATA ===
const GAME_CONTENT = {
    truths: [
        "What’s the longest you’ve gone without showering because you were \"working from home\"?",
        "Have you ever sent a risky text and then immediately turned on Airplane Mode so you wouldn't see the reply?",
        "What is the most \"unserious\" thing you’ve ever put on your professional resume?",
        "Have you ever faked a \"bad connection\" in a virtual meeting just because you didn't want to speak?",
        "How many times a day do you check your own Instagram story to see who viewed it?",
        "What’s a trend you secretly hate but participated in anyway to stay relevant?",
        "Have you ever \"soft-blocked\" someone just to lower your follower count for the aesthetic?",
        "What is the most embarrassing thing in your \"Frequently Used\" emojis?",
        "Have you ever gatekept a song or a brand because you didn't want it to become \"mainstream\"?",
        "What is your \"Roman Empire\" (something you think about every single day for no reason)?",
        "Have you ever bought an outfit specifically for a photo, then returned it the next day?",
        "What’s the most \"cringe\" thing you did during the 2020 lockdown that you try to forget?",
        "Have you ever ignored a text for three days and then replied with \"Omg so sorry, just saw this\"?",
        "What is your actual screen time from yesterday? (Be honest!)",
        "Have you ever looked at a menu online before going to a restaurant because you’re \"socially anxious\"?",
        "What is the weirdest \"rabbit hole\" you’ve fallen into on YouTube at 3:00 AM?",
        "Have you ever used \"I’m an introvert\" as an excuse to bail on a plan you were actually just too lazy for?",
        "What is the most \"delusional\" thing you’ve convinced yourself is true about your life?",
        "Have you ever left a \"like\" on a photo from 52 weeks ago while deep-stalking someone?",
        "What is the one slang word you use ironically that has now become part of your actual vocabulary?"
    ],
    dares: [
        "Send a \"Thinking of you\" GIF to the 5th person in your recent messages with no context.",
        "Order your next drink/snack but refer to yourself in the third person (e.g., \"He would like a latte\").",
        "Set your phone wallpaper to a photo of a random object in this cafe for the next 10 minutes.",
        "Go to your notes app, find a random sentence, and post it as your social media status.",
        "Spend the next 2 minutes ending every sentence with \"...period\" or \"...no cap.\"",
        "Do a \"silent review\" of your current snack (all facial expressions, no talking) for 15 seconds.",
        "Send a voice note to a friend just whispering \"The tea has been spilled\" and nothing else.",
        "Call a friend and tell them you’ve decided to become a \"full-time influencer,\" then hang up.",
        "Like every single post on your timeline for the next 60 seconds.",
        "Try to drink your tea/coffee using your non-dominant hand for the rest of your visit.",
        "Text your best friend: \"I’m in my main character era\" and don’t explain why.",
        "Show the person you’re with (or a friend) your most embarrassing \"Suggested for You\" on TikTok/Instagram.",
        "Give a 30-second \"TED Talk\" about why your favorite snack is superior to all others.",
        "Change your display name on WhatsApp to \"Professional Procrastinator\" for 30 minutes.",
        "Send an email to yourself with the subject \"Read this in 2030\" and one piece of advice.",
        "Walk to the counter and ask if they have any \"positive vibes\" on the menu today.",
        "Narrate your own life out loud for 30 seconds as if you’re in a Netflix documentary.",
        "Text a random contact: \"You won’t believe what just happened,\" then don’t reply for 5 minutes.",
        "React to the last 5 messages in your main group chat with only the 💀 emoji.",
        "Stand up and do a \"model walk\" to the napkin station and back."
    ]
};

export default function ChaiSpillChallenge() {
    const [fillLevel, setFillLevel] = useState(0);
    const [status, setStatus] = useState<'idle' | 'filling' | 'won' | 'spilled' | 'failed'>('idle');
    const [modalOpen, setModalOpen] = useState(false);
    const [challengeType, setChallengeType] = useState<'truth' | 'dare' | null>(null);
    const [currentCard, setCurrentCard] = useState<string>("");

    // Game Loop
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (status === 'filling') {
            interval = setInterval(() => {
                setFillLevel((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        handleSpill();
                        return 100;
                    }
                    // Fill up in approx 10 seconds (10000ms / 50ms = 200 steps -> 0.5 per step)
                    // Let's vary speed slightly for tension
                    const speed = 0.3 + Math.random() * 0.4;
                    return prev + speed;
                });
            }, 30);
        }
        return () => clearInterval(interval);
    }, [status]);

    const handleStart = () => {
        setFillLevel(0);
        setStatus('filling');
        setModalOpen(false);
        setChallengeType(null);
    };

    const handleStop = () => {
        if (status !== 'filling') return;

        if (fillLevel >= 96 && fillLevel < 100) {
            // Win
            setStatus('won');
        } else {
            // Stopped too early (Penalty)
            setStatus('failed');
            setModalOpen(true);
        }
    };

    const handleSpill = () => {
        setStatus('spilled');
        setModalOpen(true);
    };

    const pickCard = (type: 'truth' | 'dare') => {
        setChallengeType(type);
        const list = type === 'truth' ? GAME_CONTENT.truths : GAME_CONTENT.dares;
        const randomItem = list[Math.floor(Math.random() * list.length)];
        setCurrentCard(randomItem);
    };

    const closeModal = () => {
        setModalOpen(false);
        setStatus('idle');
        setFillLevel(0);
    };

    return (
        <section className="py-20 w-full bg-[#FFFFFF] text-[#1F1F1F] font-sans relative overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#F2DAC4]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center max-w-2xl">

                {/* Header */}
                <div className="text-center mb-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-3">
                        Fun Zone
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#1F1F1F] mb-3">
                        The <span className="text-[#D4AF37]">Chai Spill</span> Challenge
                    </h2>
                    <p className="text-[#6B5E51] text-lg">
                        Fill the cup above 96% without spilling to win!
                    </p>
                </div>

                {/* Game Container */}
                <div className="relative w-full max-w-sm aspect-[4/5] bg-white rounded-[2.5rem] shadow-2xl border-4 border-[#D4AF37]/20 flex flex-col items-center justify-center p-8 overflow-hidden">

                    {/* Shake Animation Wrapper */}
                    <motion.div
                        animate={status === 'spilled' ? { x: [-5, 5, -5, 5, 0], rotate: [-2, 2, -2, 2, 0] } : {}}
                        transition={{ duration: 0.5 }}
                        className="relative w-48 h-64 mb-10"
                    >
                        {/* SVG Cup */}
                        {/* SVG Cup */}
                        <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-xl">
                            {/* Cup Handle */}
                            <path d="M 160 60 C 190 60 190 120 160 120" fill="none" stroke="#D4AF37" strokeWidth="12" strokeLinecap="round" />

                            {/* Cup Body (Mask for Liquid) */}
                            <defs>
                                <mask id="cupMask">
                                    <path d="M 20 20 L 40 200 C 45 220 155 220 160 200 L 180 20 Z" fill="white" />
                                </mask>
                                <filter id="shake-filter">
                                    <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
                                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
                                </filter>
                            </defs>

                            {/* Glass/Cup Outline */}
                            <path d="M 20 20 L 40 200 C 45 220 155 220 160 200 L 180 20" fill="rgba(255,255,255,0.9)" stroke="#D4AF37" strokeWidth="4" />

                            {/* The Tea Liquid */}
                            <g mask="url(#cupMask)">
                                {/* Empty Space */}
                                <rect x="0" y="0" width="200" height="240" fill="#FFF7ED" opacity="0.3" />

                                {/* Liquid Group Moving Up */}
                                <motion.g
                                    animate={{ y: -(240 * (fillLevel / 100)) }}
                                    transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
                                >
                                    {/* Wave Surface - More Dynamic */}
                                    <motion.path
                                        d="M 0 240 Q 25 225, 50 240 T 100 240 T 150 240 T 200 240 V 480 H 0 Z"
                                        fill="#D4AF37"
                                        animate={{ x: [-50, 0] }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        transform="translate(0, -10)"
                                    />
                                    {/* Main Body (Seamlessly connected to wave) */}
                                    <rect x="0" y="239" width="300" height="240" fill="#D4AF37" />
                                </motion.g>

                                {/* Pouring Stream (Thicker & Faster) */}
                                <AnimatePresence>
                                    {status === 'filling' && (
                                        <motion.rect
                                            initial={{ height: 0 }}
                                            animate={{ height: 240 + (240 * (fillLevel / 100)) }} // Extends down into liquid
                                            exit={{ height: 0, opacity: 0 }}
                                            x="92" y="0" width="16" fill="#D4AF37"
                                            className="blur-[1px]" // Slight blur for liquid motion feel
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Splash / Impact Particles at Surface */}
                                {status === 'filling' && (
                                    <motion.g
                                        animate={{ y: 240 - (240 * (fillLevel / 100)) }} // Tracks surface
                                        className="pointer-events-none"
                                    >
                                        <motion.circle cx="100" cy="0" r="3" fill="#D4AF37"
                                            animate={{ y: [-5, -15], x: [0, -10], opacity: [1, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.4 }}
                                        />
                                        <motion.circle cx="100" cy="0" r="2" fill="#D4AF37"
                                            animate={{ y: [-5, -12], x: [0, 10], opacity: [1, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.3, delay: 0.1 }}
                                        />
                                        <motion.circle cx="100" cy="0" r="3" fill="#FFF" opacity="0.4"
                                            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                                            transition={{ repeat: Infinity, duration: 0.2 }}
                                        />
                                    </motion.g>
                                )}

                                {/* Bubbles / Foam Rising */}
                                {fillLevel > 10 && status === 'filling' && (
                                    <>
                                        <motion.circle cx="100" cy="240" r="3" fill="white" opacity="0.6" animate={{ y: -240, opacity: 0 }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} />
                                        <motion.circle cx="120" cy="240" r="2" fill="white" opacity="0.5" animate={{ y: -200, opacity: 0 }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} />
                                        <motion.circle cx="80" cy="240" r="4" fill="white" opacity="0.4" animate={{ y: -220, opacity: 0 }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.2 }} />
                                    </>
                                )}
                            </g>

                            {/* Rim Highlight */}
                            <ellipse cx="100" cy="20" rx="80" ry="10" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.3" />
                        </svg>

                        {/* Percentage Text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-4xl font-black text-[#1F1F1F] drop-shadow-sm opacity-90">
                                {Math.round(fillLevel)}%
                            </span>
                        </div>

                        {/* Spill Effect (Overflow) */}
                        <AnimatePresence>
                            {status === 'spilled' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 0 }}
                                    animate={{ opacity: 1, y: 20 }}
                                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-40 h-10 bg-[#D4AF37] rounded-full blur-md z-[-1]"
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Controls */}
                    <div className="w-full flex gap-4">
                        {status === 'idle' || status === 'won' || status === 'spilled' || status === 'failed' ? (
                            <button
                                onClick={handleStart}
                                className="flex-1 bg-[#D4AF37] hover:bg-[#B8941F] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                            >
                                {status === 'idle' ? <Play className="fill-white" /> : <RefreshCw />}
                                {status === 'idle' ? "Start Brewing!" : "Try Again"}
                            </button>
                        ) : (
                            <button
                                onClick={handleStop}
                                className="flex-1 bg-[#1F1F1F] hover:bg-[#000000] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Hand /> Stop!
                            </button>
                        )}
                    </div>

                    {/* Status Message */}
                    <div className="mt-4 h-6 text-center text-sm font-medium text-[#6B5E51]">
                        {status === 'idle' && "Press Start to pour the chai."}
                        {status === 'filling' && "Stop between 96% and 100%!"}
                        {status === 'won' && "Perfect Pour! You Won!"}
                        {status === 'failed' && "Too weak! You stopped too early."}
                        {status === 'spilled' && "Overflow! You made a mess."}
                    </div>

                </div>
            </div>

            {/* MODAL: Truth or Dare */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-md rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
                        >
                            {/* Spill Header */}
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle className="text-[#D4AF37] w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black text-[#1F1F1F] mb-2">
                                    {status === 'spilled' ? "Oops! Spilled the Tea!" : "Too Weak!"}
                                </h3>
                                <p className="text-[#6B5E51]">
                                    {status === 'spilled' ? "You overflowed the cup." : "You didn't reach 96%."} Now face the consequences:
                                </p>
                            </div>

                            {!challengeType ? (
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => pickCard('truth')}
                                        className="aspect-square rounded-2xl bg-[#F2DAC4]/30 border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#F2DAC4]/50 transition-all flex flex-col items-center justify-center gap-3 group"
                                    >
                                        <span className="text-4xl group-hover:scale-110 transition-transform">😇</span>
                                        <span className="font-bold text-[#D4AF37] text-xl">Spill Truth</span>
                                    </button>
                                    <button
                                        onClick={() => pickCard('dare')}
                                        className="aspect-square rounded-2xl bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all flex flex-col items-center justify-center gap-3 group"
                                    >
                                        <span className="text-4xl group-hover:scale-110 transition-transform">😈</span>
                                        <span className="font-bold text-[#D4AF37] text-xl">Accept Dare</span>
                                    </button>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-gray-50 rounded-2xl p-6 border border-gray-100 text-center"
                                >
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                                        {challengeType === 'truth' ? 'THE TRUTH' : 'THE DARE'}
                                    </span>
                                    <p className="text-xl font-bold text-gray-800 leading-relaxed mb-6">
                                        "{currentCard}"
                                    </p>
                                    <button
                                        onClick={closeModal}
                                        className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors"
                                    >
                                        Done! (I regret nothing)
                                    </button>
                                </motion.div>
                            )}

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
