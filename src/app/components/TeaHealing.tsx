"use client";
import React from "react";

export interface TeaHealingProps {
    className?: string;
    width?: string;
    height?: string;
}

const TeaHealing = ({
    className = "",
    width = "100%",
    height = "100%",
}: TeaHealingProps) => {
    const radius = 160;
    const centerX = 200;
    const centerY = 200;

    const negativeWords = [
        { text: "STRESS", angle: 0 },
        { text: "ANXIETY", angle: 60 },
        { text: "SADNESS", angle: 120 },
        { text: "ILLNESS", angle: 180 },
        { text: "DEPRESSION", angle: 240 },
        { text: "FATIGUE", angle: 300 },
    ].map(word => {
        const angleRad = (word.angle * Math.PI) / 180;
        return {
            ...word,
            x: Math.round((centerX + radius * Math.cos(angleRad)) * 100) / 100,
            y: Math.round((centerY + radius * Math.sin(angleRad)) * 100) / 100,
        };
    });

    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 400 420"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <radialGradient id="ray-glow-1">
                    <stop offset="0%" stopColor="#C4B5A5" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#C4B5A5" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="ray-glow-2">
                    <stop offset="0%" stopColor="#9C9687" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#9C9687" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="ray-glow-3">
                    <stop offset="0%" stopColor="#8A7E68" stopOpacity="0.7" />
                    <stop offset="100%" stopColor="#8A7E68" stopOpacity="0" />
                </radialGradient>

                <filter id="tea-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood floodColor="#C4B5A5" floodOpacity="0.4" />
                    <feComposite in2="blur" operator="in" />
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Drop shadow for tea image */}
                <filter id="tea-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                    <feOffset dx="0" dy="6" result="offsetblur" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.4" />
                    </feComponentTransfer>
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Steam gradient */}
                <linearGradient id="steam-gradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#EBE5CE" stopOpacity="0" />
                    <stop offset="50%" stopColor="#EBE5CE" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#EBE5CE" stopOpacity="0" />
                </linearGradient>
            </defs>

            <circle cx="200" cy="200" r="180" fill="#12100E" opacity="0.3" />

            {negativeWords.map((word, index) => {
                const cupCenterX = 200;
                const cupCenterY = 210;
                const startX = word.x;
                const startY = word.y;

                return (
                    <g key={index}>
                        <line
                            x1={startX}
                            y1={startY}
                            x2={cupCenterX}
                            y2={cupCenterY}
                            stroke={`url(#ray-glow-${(index % 3) + 1})`}
                            strokeWidth="1.5"
                            strokeDasharray="300"
                            strokeDashoffset="300"
                            opacity="0.6"
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                from="300"
                                to="0"
                                dur="3s"
                                repeatCount="indefinite"
                                begin={`${index * 0.3}s`}
                            />
                        </line>

                        <circle r="3" fill="#C4B5A5" opacity="0.8" filter="url(#tea-glow)">
                            <animateMotion
                                dur="3s"
                                repeatCount="indefinite"
                                begin={`${index * 0.3}s`}
                                path={`M ${startX} ${startY} L ${cupCenterX} ${cupCenterY}`}
                            />
                            <animate
                                attributeName="opacity"
                                values="0;0.8;0"
                                dur="3s"
                                repeatCount="indefinite"
                                begin={`${index * 0.3}s`}
                            />
                        </circle>
                    </g>
                );
            })}

            {negativeWords.map((word, index) => (
                <text
                    key={`word-${index}`}
                    x={word.x}
                    y={word.y}
                    fontSize="14"
                    fill="#9C9687"
                    fontFamily="'Quicksand', sans-serif"
                    fontWeight="600"
                    letterSpacing="0.15em"
                    textAnchor="middle"
                    opacity="0.7"
                >
                    {word.text}
                    <animate
                        attributeName="opacity"
                        values="0.4;0.7;0.4"
                        dur="4s"
                        repeatCount="indefinite"
                        begin={`${index * 0.5}s`}
                    />
                </text>
            ))}

            {/* Central tea image with steam */}
            <g transform="translate(200, 200)">
                {/* Steam wisps rising from tea */}
                <path
                    d="M -15 -60 Q -20 -75 -15 -90"
                    stroke="url(#steam-gradient)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0"
                >
                    <animate
                        attributeName="opacity"
                        values="0;0.5;0"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 0,-15"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                </path>
                <path
                    d="M 0 -60 Q -5 -78 0 -95"
                    stroke="url(#steam-gradient)"
                    strokeWidth="2.5"
                    fill="none"
                    opacity="0"
                >
                    <animate
                        attributeName="opacity"
                        values="0;0.6;0"
                        dur="3s"
                        repeatCount="indefinite"
                        begin="0.7s"
                    />
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 0,-18"
                        dur="3s"
                        repeatCount="indefinite"
                        begin="0.7s"
                    />
                </path>
                <path
                    d="M 15 -60 Q 20 -75 15 -90"
                    stroke="url(#steam-gradient)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0"
                >
                    <animate
                        attributeName="opacity"
                        values="0;0.5;0"
                        dur="3s"
                        repeatCount="indefinite"
                        begin="1.4s"
                    />
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0,0; 0,-15"
                        dur="3s"
                        repeatCount="indefinite"
                        begin="1.4s"
                    />
                </path>

                {/* Tea image with shadow */}
                <image
                    href="/assets/pngtree-fresh-milk-tea-or-indian-kadak-chai-png-image_14166653.png"
                    x="-60"
                    y="-60"
                    width="120"
                    height="120"
                    opacity="0.95"
                    filter="url(#tea-shadow)"
                />
            </g>

            <text
                x="200"
                y="390"
                fontSize="9"
                fill="#C4B5A5"
                fontFamily="'Cinzel Decorative', serif"
                textAnchor="middle"
                letterSpacing="0.3em"
                opacity="0.8"
            >
                SIPPING SERENITY
            </text>
        </svg>
    );
};

export { TeaHealing };
