import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                gold: "#D4AF37",
                "gold-dim": "#8A7E68",
                maroon: "#5D001E", // Keeping for legacy, but maybe unused
                "maroon-dark": "#3E0014",
                "dark-bg": "#12100E", // Deep Charcoal
                "text-main": "#EBE5CE", // Cream
                "text-muted": "#9C9687", // Warm Grey
            },
            fontFamily: {
                heading: ['"Cinzel Decorative"', 'cursive'],
                body: ['"Quicksand"', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
