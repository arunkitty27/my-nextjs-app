"use client";
import React, { useState, useEffect, useRef } from "react";
import { Zap, Link as LinkIcon, CheckCircle, Clock, Circle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
export interface TimelineItem {
    id: number;
    title: string;
    date: string;
    content: string;
    status: "completed" | "in-progress" | "pending";
    energy: number;
    icon: React.ElementType;
    relatedIds: number[];
}

interface RadialOrbitalTimelineProps {
    timelineData: TimelineItem[];
    title?: string;
    subtitle?: string;
}

// --- Helper Components ---
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${className}`}>
        {children}
    </span>
);

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-2xl border bg-card text-card-foreground shadow-sm ${className}`}>
        {children}
    </div>
);

// --- Main Component ---
export default function RadialOrbitalTimeline({
    timelineData,
    title = "Our Journey",
    subtitle = "Explore the nodes of creation"
}: RadialOrbitalTimelineProps) {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [rotation, setRotation] = useState<number>(0);
    const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-rotation logic
    useEffect(() => {
        let animationFrame: number;

        const animate = () => {
            if (isAutoRotating) {
                setRotation((prev) => (prev + 0.05) % 360); // Very smooth, slow rotation
            }
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isAutoRotating]);

    // Click handling
    const handleNodeClick = (id: number) => {
        if (expandedId === id) {
            // Close
            setExpandedId(null);
            setIsAutoRotating(true);
        } else {
            // Open
            setExpandedId(id);
            setIsAutoRotating(false);

            // Rotate this node to the TOP (270 degrees) so the card has space below
            const index = timelineData.findIndex(t => t.id === id);
            const total = timelineData.length;
            const anglePerNode = 360 / total;
            const nodeCurrentAngleWithoutRotation = index * anglePerNode;

            // We want: rotation + nodeCurrentAngleWithoutRotation = 270 (Top position)
            // So: rotation = 270 - nodeCurrentAngleWithoutRotation
            let targetRotation = 270 - nodeCurrentAngleWithoutRotation;

            // Normalize to 0-360 range for cleaner animation if needed, but CSS transform handles negatives fine.
            setRotation(targetRotation);
        }
    };

    const resetView = (e: React.MouseEvent) => {
        // Only reset if clicking background
        if (e.target === e.currentTarget) {
            setExpandedId(null);
            setIsAutoRotating(true);
        }
    };

    const getRelatedItems = (itemId: number): number[] => {
        const item = timelineData.find((i) => i.id === itemId);
        return item ? item.relatedIds : [];
    };

    const isRelatedToActive = (itemId: number) => {
        if (!expandedId) return false;
        return getRelatedItems(expandedId).includes(itemId);
    };

    const getStatusColor = (status: TimelineItem["status"]) => {
        switch (status) {
            case "completed": return "bg-matcha-glow/20 text-matcha-glow border-matcha-glow/50";
            case "in-progress": return "bg-gold/20 text-gold border-gold/50";
            case "pending": return "bg-white/10 text-white/50 border-white/20";
        }
    };

    // Pre-calculate positions to ensure React reconciles correctly during render
    const radius = 260; // Fixed radius for stability
    const mobileRadius = 130;

    return (
        <section className="relative w-full min-h-screen py-24 bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center border-y border-white/5 z-0">

            {/* Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,193,7,0.05)_0%,transparent_70%)] pointer-events-none" />

            {/* Header */}
            <div className="text-center px-4 mb-12 relative z-20">
                <span className="text-gold font-bold tracking-[0.2em] text-xs uppercase mb-3 block animate-pulse">{subtitle}</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 drop-shadow-xl">{title}</h2>
                <p className="text-white/40 text-sm max-w-md mx-auto">Click any node to reveal its secrets.</p>
            </div>

            {/* Main Container */}
            <div
                className="relative w-full max-w-[800px] aspect-square flex items-center justify-center"
                onClick={resetView}
            >
                {/* Central Core Sun */}
                <AnimatePresence>
                    {!expandedId && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute z-10 w-32 h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center pointer-events-none"
                        >
                            <div className="absolute inset-0 bg-gold/10 blur-[60px] rounded-full" />
                            <div className="w-full h-full rounded-full border border-gold/20 bg-black/50 backdrop-blur-md flex items-center justify-center relative">
                                <div className="absolute inset-0 border border-dashed border-gold/30 rounded-full animate-[spin_20s_linear_infinite]" />
                                <div className="w-16 h-16 bg-gradient-to-br from-gold to-orange-500 rounded-full shadow-[0_0_40px_rgba(255,193,7,0.4)]" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Orbit Rings (Visuals only) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-[60%] h-[60%] border border-white/20 rounded-full" />
                    <div className="w-[85%] h-[85%] border border-white/10 rounded-full border-dashed" />
                </div>

                {/* Rotating Container */}
                <motion.div
                    className="absolute w-full h-full"
                    animate={{ rotate: rotation }}
                    transition={{ type: "spring", stiffness: 40, damping: 20 }} // Smooth transition for click rotation
                >
                    {timelineData.map((item, index) => {
                        const total = timelineData.length;
                        const angleDeg = (index / total) * 360;

                        return (
                            <OrbitalNode
                                key={item.id}
                                item={item}
                                angleDeg={angleDeg}
                                radius={radius}
                                mobileRadius={mobileRadius}
                                isActive={expandedId === item.id}
                                isRelated={isRelatedToActive(item.id)}
                                hasActive={!!expandedId}
                                onClick={() => handleNodeClick(item.id)}
                            />
                        );
                    })}
                </motion.div>

                {/* Central Card Display (Absolute Center over the sun) */}
                <AnimatePresence mode="wait">
                    {expandedId && (
                        <CentralCard
                            item={timelineData.find(t => t.id === expandedId)!}
                            onClose={() => { setExpandedId(null); setIsAutoRotating(true); }}
                            timelineData={timelineData}
                            onNavigate={handleNodeClick}
                            getStatusColor={getStatusColor}
                        />
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}

// --- Sub-Components ---

function OrbitalNode({
    item, angleDeg, radius, mobileRadius, isActive, isRelated, hasActive, onClick
}: {
    item: TimelineItem, angleDeg: number, radius: number, mobileRadius: number, isActive: boolean, isRelated: boolean, hasActive: boolean, onClick: () => void
}) {
    const Icon = item.icon;

    return (
        <div
            className="absolute top-1/2 left-1/2 w-0 h-0"
            style={{ transform: `rotate(${angleDeg}deg)` }}
        >
            <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                style={{
                    // Push out by radius
                    // We use a CSS variable or predefined class logic for responsive radius if possible, 
                    // but inline style is cleanest for dynamic math.
                    marginLeft: `${radius}px`, // Desktop fallback
                }}
            // Responsive constraint: use media query in standard CSS or multiple elements? 
            // We'll use a responsive class wrapper or just simple state if we had access to window.
            // For SSR safety in Next.js, let's use a smart transform approach or just fix it for desktop/mobile via Tailwind classes if we could.
            // Alternative: Use `calc` for simple responsive CSS variables.
            >
                {/* We overlay a responsive logic fix here: On mobile, radius is smaller. */}
                <div className={`
                flex items-center justify-center rounded-full transition-all duration-500 relative
                w-16 h-16 md:w-20 md:h-20
                ${isActive
                        ? "bg-gold text-black scale-125 shadow-[0_0_50px_rgba(255,193,7,0.6)] border-4 border-white"
                        : isRelated
                            ? "bg-white/10 text-gold border-2 border-gold/60 scale-110 shadow-[0_0_20px_rgba(255,193,7,0.2)]"
                            : hasActive
                                ? "bg-[#0a0a0a] border border-white/5 opacity-30 blur-[2px] grayscale"
                                : "bg-[#0a0a0a] border border-white/10 hover:border-gold hover:text-white"
                    }
            `}
                    // Counter-rotate items so they stay upright visually
                    // Note: Since the parent container rotates, we need to counter-rotate ONLY by the PARENT'S rotation + THIS angle?
                    // Actually, if we want labels upright, we need a smarter system.
                    // For now, let's let them rotate with the orbit (planetary style) or they will be upside down.
                    // Simple fix: Remove text from nodes, only icons. Icons look fine rotated usually.
                    onClick={(e) => { e.stopPropagation(); onClick(); }}
                >
                    <Icon size={isActive ? 32 : 24} className={`transition-transform duration-500 ${isActive ? 'rotate-0' : ''}`} />

                    {/* Pulse Ring for Related Items */}
                    {isRelated && !isActive && (
                        <div className="absolute inset-0 rounded-full border border-gold opacity-50 animate-ping" />
                    )}
                </div>

                {/* Label - visible only when nothing active */}
                {!hasActive && (
                    <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 text-center w-32 pointer-events-none">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-gold transition-colors block bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                            {item.title}
                        </span>
                    </div>
                )}
            </motion.div>

            {/* Mobile Radius Override via CSS Style Injection just for this node */}
            <style jsx>{`
            @media (max-width: 768px) {
               div[style*="rotate(${angleDeg}deg)"] > div {
                  margin-left: ${mobileRadius}px !important;
               }
            }
         `}</style>
        </div>
    );
}

function CentralCard({
    item, onClose, timelineData, onNavigate, getStatusColor
}: {
    item: TimelineItem, onClose: () => void, timelineData: TimelineItem[], onNavigate: (id: number) => void, getStatusColor: (s: any) => string
}) {
    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="absolute z-50 w-[90%] md:w-[400px]"
            onClick={(e) => e.stopPropagation()}
        >
            <Card className="bg-[#121212]/95 backdrop-blur-2xl border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
                {/* Header Image/Gradient */}
                <div className="h-24 bg-gradient-to-r from-maroon-dark to-[#0a0a0a] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/assets/noise.svg')] opacity-20" />
                    <div className="absolute top-4 right-4">
                        <button onClick={onClose} className="p-1 rounded-full bg-black/20 text-white/50 hover:bg-white hover:text-black transition-colors">
                            <X size={16} />
                        </button>
                    </div>
                    <div className="absolute bottom-4 left-6">
                        <Badge className={`border ${getStatusColor(item.status)}`}>
                            {item.status.replace('-', ' ')}
                        </Badge>
                    </div>
                </div>

                <div className="p-6 md:p-8 pt-6">
                    <span className="text-xs font-mono text-gold mb-2 block">{item.date}</span>
                    <h3 className="text-3xl font-heading font-bold text-white mb-4">{item.title}</h3>
                    <p className="text-white/70 leading-relaxed mb-6">{item.content}</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                            <span className="text-[10px] uppercase text-white/40 block mb-1">Energy</span>
                            <div className="flex items-end gap-1">
                                <span className="text-2xl font-bold text-gold">{item.energy}%</span>
                                <Zap size={14} className="mb-1 text-gold ml-auto" />
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                            <span className="text-[10px] uppercase text-white/40 block mb-1">Status</span>
                            <div className="flex items-end gap-1">
                                <span className="text-lg font-bold text-white leading-none">
                                    {item.status === 'completed' ? 'Done' : 'Active'}
                                </span>
                                {item.status === 'completed' ? <CheckCircle size={14} className="mb-0.5 text-matcha-glow ml-auto" /> : <Clock size={14} className="mb-0.5 text-gold ml-auto" />}
                            </div>
                        </div>
                    </div>

                    {/* Related Links */}
                    {item.relatedIds.length > 0 && (
                        <div className="border-t border-white/10 pt-4">
                            <span className="text-[10px] uppercase font-bold text-white/30 mb-3 block">Connected Nodes</span>
                            <div className="flex flex-wrap gap-2">
                                {item.relatedIds.map(rid => {
                                    const rel = timelineData.find(t => t.id === rid);
                                    if (!rel) return null;
                                    return (
                                        <button
                                            key={rid}
                                            onClick={() => onNavigate(rid)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-gold hover:bg-gold/10 text-white/60 hover:text-gold transition-all text-xs font-medium"
                                        >
                                            <LinkIcon size={12} />
                                            {rel.title}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </motion.div>
    );
}
