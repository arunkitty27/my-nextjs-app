"use client";
import React, { useEffect, useRef } from 'react';

// Vibrant, dynamic colors for the "Google Antigravity" feel but adapted to the site's palette + some pop
// The user showed a colorful image.
const PARTICLE_COLORS = [
    '#1F1F1F', // Dark Ink
    '#D4AF37', // Gold
    '#6B5E51', // Bronze/Muted
    '#F2DAC4', // Light Beige
    '#B87333', // Copper (pop)
    '#2C3E50', // Dark Blue-Grey (contrast)
    '#E6D291', // Pale Gold
];

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    sizeX: number;
    sizeY: number; // For dash shape
    color: string;
    angle: number;
    drag: number;
    rotation: number;
    rotationSpeed: number;
}

export default function AntigravityBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -1000, y: -1000 });
    const particles = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        // Center mouse initially so the swarm isn't lost
        mouse.current = { x: width / 2, y: height / 2 };

        const initParticles = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            particles.current = [];
            const particleCount = 250; // Dense enough for "bundle"

            for (let i = 0; i < particleCount; i++) {
                particles.current.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    sizeX: Math.random() * 8 + 4, // Rectangle length (dash)
                    sizeY: Math.random() * 2 + 1, // Rectangle width (thin)
                    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
                    angle: Math.random() * Math.PI * 2,
                    drag: Math.random() * 0.05 + 0.9, // Friction
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: (Math.random() - 0.5) * 0.1,
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            const mx = mouse.current.x;
            const my = mouse.current.y;

            particles.current.forEach((p) => {
                // Physics: "Swarm" attraction to mouse
                const dx = mx - p.x;
                const dy = my - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Attraction force (spring-like)
                // Stronger when far, weaker when close to avoid collapsing to a single point
                const force = Math.min(dist * 0.0002, 0.05);

                if (dist > 100) {
                    p.vx += dx * force;
                    p.vy += dy * force;
                } else {
                    // Repulsion if too close (to maintain volume)
                    const repel = (100 - dist) * 0.002;
                    p.vx -= dx * repel;
                    p.vy -= dy * repel;
                }

                // Add some noise/randomness for "Antigravity" jitter
                p.vx += (Math.random() - 0.5) * 0.2;
                p.vy += (Math.random() - 0.5) * 0.2;

                p.vx *= p.drag;
                p.vy *= p.drag;

                p.x += p.vx;
                p.y += p.vy;

                p.rotation += p.rotationSpeed;

                // Align particles to velocity for "dash" effect (like speed lines)
                // OR rotate them independently for "confetti" effect. 
                // User image showed aligned dashes.
                const velocityAngle = Math.atan2(p.vy, p.vx);

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(velocityAngle); // Align with movement

                // Gradient for each particle
                // To make it look "changing gradient", we can use a per-particle gradient or just dynamic colors
                ctx.fillStyle = p.color;

                // Draw Dash
                // ctx.fillRect(-p.sizeX / 2, -p.sizeY / 2, p.sizeX, p.sizeY);
                // Rounded caps for nicer look
                ctx.beginPath();
                ctx.roundRect(-p.sizeX / 2, -p.sizeY / 2, p.sizeX, p.sizeY, 2);
                ctx.fill();

                ctx.restore();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        initParticles();
        animate();

        const handleResize = () => {
            initParticles();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationRef.current);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed inset-0 z-0 w-full h-full pointer-events-none" style={{ background: 'transparent' }} />;
}
