'use client';

import {
    useEffect,
    useRef,
    useState,
    ReactNode,
    TouchEvent,
    WheelEvent,
} from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { SparklesCore } from './SparklesCore';

interface ScrollExpandMediaProps {
    mediaType?: 'video' | 'image';
    mediaSrc?: string;
    posterSrc?: string;
    bgImageSrc?: string; // Re-added for the hero background
    title?: string;
    date?: string;
    scrollToExpand?: string;
    textBlend?: boolean;
    children?: ReactNode;
    heroContent?: ReactNode;
    backgroundComponent?: ReactNode;
}

const ScrollExpandMedia = ({
    mediaType = 'video',
    mediaSrc,
    posterSrc,
    bgImageSrc,
    title = "SURAPANA",
    scrollToExpand,
    children,
    heroContent,
    backgroundComponent
}: ScrollExpandMediaProps) => {
    const [scrollProgress, setScrollProgress] = useState<number>(0);
    const [showContent, setShowContent] = useState<boolean>(false);
    const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
    const [touchStartY, setTouchStartY] = useState<number>(0);
    const [isMobileState, setIsMobileState] = useState<boolean>(false);

    useEffect(() => {
        setScrollProgress(0);
        setShowContent(false);
        setMediaFullyExpanded(false);
    }, []);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
                setMediaFullyExpanded(false);
                e.preventDefault();
            }
            else if (!mediaFullyExpanded) {
                e.preventDefault();

                // FORCE INSTANT UNLOCK on any downward scroll to satisfy "direct one scroll" request
                if (e.deltaY > 0) {
                    setScrollProgress(1);
                    setMediaFullyExpanded(true);
                    setShowContent(true);

                    setTimeout(() => {
                        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                    }, 10);
                    return;
                }

                // Keep reverse logic or tiny jitter handling if needed, but the above covers the main user request.
                // If scrolling up (negative), we might want to stay at 0
                const scrollDelta = e.deltaY * 0.005;
                const newProgress = Math.min(
                    Math.max(scrollProgress + scrollDelta, 0),
                    1
                );
                setScrollProgress(newProgress);
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            setTouchStartY(e.touches[0].clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!touchStartY) return;

            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;

            if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
                setMediaFullyExpanded(false);
                e.preventDefault();
            } else if (!mediaFullyExpanded) {
                e.preventDefault();

                // FORCE INSTANT UNLOCK on any downward swipe
                if (deltaY > 0) {
                    setScrollProgress(1);
                    setMediaFullyExpanded(true);
                    setShowContent(true);

                    setTimeout(() => {
                        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                    }, 10);
                    return;
                }

                // Standard logic for up-scroll or tiny movements
                const scrollFactor = deltaY < 0 ? 0.02 : 0.015;
                const scrollDelta = deltaY * scrollFactor;
                const newProgress = Math.min(
                    Math.max(scrollProgress + scrollDelta, 0),
                    1
                );
                setScrollProgress(newProgress);
            }
        };

        const handleTouchEnd = (): void => {
            setTouchStartY(0);
        };

        const handleScroll = (): void => {
            if (!mediaFullyExpanded) {
                window.scrollTo(0, 0);
            }
        };

        window.addEventListener('wheel', handleWheel as unknown as EventListener, { passive: false });
        window.addEventListener('scroll', handleScroll as EventListener);
        window.addEventListener('touchstart', handleTouchStart as unknown as EventListener, { passive: false });
        window.addEventListener('touchmove', handleTouchMove as unknown as EventListener, { passive: false });
        window.addEventListener('touchend', handleTouchEnd as EventListener);

        return () => {
            window.removeEventListener('wheel', handleWheel as unknown as EventListener);
            window.removeEventListener('scroll', handleScroll as EventListener);
            window.removeEventListener('touchstart', handleTouchStart as unknown as EventListener);
            window.removeEventListener('touchmove', handleTouchMove as unknown as EventListener);
            window.removeEventListener('touchend', handleTouchEnd as EventListener);
        };
    }, [scrollProgress, mediaFullyExpanded, touchStartY]);

    // Listen for custom "unlockHero" event from nav clicks
    useEffect(() => {
        const handleUnlock = () => {
            setScrollProgress(1);
            setMediaFullyExpanded(true);
            setShowContent(true);
        };

        window.addEventListener('unlockHero', handleUnlock);
        return () => window.removeEventListener('unlockHero', handleUnlock);
    }, []);

    useEffect(() => {
        const checkIfMobile = (): void => {
            setIsMobileState(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const mediaWidth = 400 + scrollProgress * (isMobileState ? 600 : 1600);
    const mediaHeight = 300 + scrollProgress * (isMobileState ? 400 : 800);

    const titleChars = title.split('');

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 },
        },
    };

    const childVariants: Variants = {
        hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { type: 'spring', damping: 20, stiffness: 90 } /* Softer spring */
        },
    };

    return (
        <div className='relative bg-[#FFFFFF] text-[#1F1F1F] overflow-x-hidden'>
            <section className='relative flex flex-col items-center justify-start min-h-[100vh]'>

                {/* === AESTHETIC HERO BACKGROUND === */}
                <div className='fixed inset-0 z-0 pointer-events-none'>



                    {/* The Image Itself - (Keeping this just in case, but AnimatedTeaBackground takes precedence visually) */}
                    {bgImageSrc && !backgroundComponent && (
                        <div className="absolute inset-0">
                            <Image
                                src={bgImageSrc}
                                alt="Background"
                                fill
                                className="object-cover opacity-60 mix-blend-overlay scale-110"
                                priority
                            />
                            {/* Light gradient to ensure text readability */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF]/80 via-[#FFFFFF]/40 to-[#FFFFFF]" />
                        </div>
                    )}

                    {backgroundComponent}

                    {/* Very Subtle Grain */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'1\'/%3E%3C/svg%3E")' }}></div>
                </div>

                {/* Content Wrapper */}
                <div className='relative w-full flex flex-col items-center min-h-[100vh]'>

                    <div className='container mx-auto flex flex-col items-center justify-center relative z-10 w-full h-[100vh] pointer-events-none'>

                        {/* Expanding Media Window */}
                        {mediaSrc && (
                            <div
                                className='absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-none rounded-lg overflow-hidden pointer-events-auto'
                                style={{
                                    width: `${mediaWidth}px`,
                                    height: `${mediaHeight}px`,
                                    maxWidth: '100vw',
                                    maxHeight: '100vh',
                                }}
                            >
                                {mediaType === 'video' ? (
                                    <video
                                        src={mediaSrc}
                                        poster={posterSrc}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        className='w-full h-full object-cover opacity-90'
                                    />
                                ) : (
                                    <Image
                                        src={mediaSrc}
                                        alt={title || 'Media'}
                                        fill
                                        className='object-cover opacity-90'
                                    />
                                )}
                            </div>
                        )}

                        {/* Minimal Title */}
                        <div className={`flex items-center justify-center text-center w-full relative z-20 pointer-events-none transition-none flex-col`}>
                            <h1
                                className='relative text-6xl md:text-8xl lg:text-9xl font-heading text-[#1F1F1F] mb-4 tracking-widest leading-none drop-shadow-sm'
                            >
                                {titleChars.map((char, index) => (
                                    <span key={index} className="inline-block relative z-10">
                                        {char === ' ' ? '\u00A0' : char}
                                    </span>
                                ))}

                                {/* "Acme" Style Sparkles Underline */}
                                {/* "Acme" Style Sparkles Underline - Improved */}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[120%] h-32 z-0 pointer-events-none mt-4">
                                    {/* Gradients */}
                                    <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent h-[2px] w-full blur-sm" />
                                    <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent h-px w-full" />
                                    <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-[#F2DAC4] to-transparent h-[5px] w-1/2 mx-auto blur-sm" />
                                    <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-[#F2DAC4] to-transparent h-px w-1/2 mx-auto" />

                                    {/* Core Component - clipped by mask to avoid box look */}
                                    <div className="w-full h-full [mask-image:radial-gradient(300px_100px_at_top,white,transparent)]">
                                        <SparklesCore
                                            background="transparent"
                                            minSize={0.4}
                                            maxSize={1.2}
                                            particleDensity={1200}
                                            className="w-full h-full"
                                            particleColor="#D4AF37"
                                        />
                                    </div>
                                </div>
                            </h1>
                        </div>

                        <motion.div
                            className="absolute bottom-20 z-20 pointer-events-auto"
                            style={{ opacity: 1 - scrollProgress * 3 }}
                        >
                            {heroContent}
                        </motion.div>

                    </div>

                    <motion.div
                        className='w-full relative z-30 bg-[#FFFFFF]'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showContent ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>

                </div>
            </section>
        </div>
    );
};

export default ScrollExpandMedia;
