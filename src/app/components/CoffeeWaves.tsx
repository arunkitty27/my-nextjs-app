"use client";
import { motion } from "framer-motion";

export const CoffeeWaves = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
            {/* Wave 1 - Furthest back, lightest */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 0.4 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute bottom-0 left-0 w-full h-[60%] md:h-[70%]"
            >
                <svg
                    viewBox="0 0 1440 320"
                    className="absolute bottom-0 w-full h-full transform scale-[1.5] origin-bottom"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#F5F5F4" // Was Cream, now Warm Grey
                        fillOpacity="1"
                        d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </motion.div>

            {/* Wave 2 - Mid layer, Gold tint */}
            <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 0.3 }}
                transition={{ duration: 2.2, ease: "easeOut", delay: 0.2 }}
                className="absolute bottom-0 left-0 w-full h-[50%] md:h-[60%]"
            >
                <svg
                    viewBox="0 0 1440 320"
                    className="absolute bottom-0 w-full h-full transform scale-[1.3] origin-bottom-right"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#E7E5E4" // Was Latte foam, now Stone Grey
                        fillOpacity="0.6"
                        d="M0,96L48,128C96,160,192,224,288,240C384,256,480,224,576,192C672,160,768,128,864,122.7C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    ></path>
                </svg>
            </motion.div>

            {/* Wave 3 - Closest, nice Golden/Coffee accent curve */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 0.2 }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.4 }}
                className="absolute bottom-0 right-0 w-[120%] h-[50%] md:h-[100%]"
            >
                <svg
                    viewBox="0 0 1440 320"
                    className="absolute bottom-0 w-full h-full transform scale-[1.5] origin-bottom-left"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#A8A29E" // Was Gold, now Warm Taupe
                        fillOpacity="0.15"
                        d="M0,192L60,186.7C120,181,240,171,360,149.3C480,128,600,96,720,106.7C840,117,960,171,1080,197.3C1200,224,1320,224,1380,224L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    ></path>
                </svg>
            </motion.div>

            {/* Top Left Subtle Curve to balance */}
            <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 0.2 }}
                transition={{ duration: 3, delay: 0.5 }}
                className="absolute top-0 left-0 w-[50%] h-[50%] -z-10"
            >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full transform -scale-y-100">
                    <path fill="#C4B5A5" d="M37.5,-51.7C48.8,-43.3,58.3,-33.6,63.1,-22.1C67.9,-10.6,68,2.7,63.5,13.8C59,24.9,49.9,33.8,40.1,41.9C30.3,50,19.9,57.3,8.7,59.3C-2.5,61.3,-14.5,58,-26.8,53C-39.1,48,-51.7,41.3,-58.5,31.2C-65.3,21.1,-66.3,7.6,-62.7,-4.3C-59.1,-16.2,-50.9,-26.5,-41.6,-35.1C-32.3,-43.7,-21.9,-50.6,-10.8,-52.1C0.3,-53.6,11.4,-49.7,37.5,-51.7Z" transform="translate(100 100) scale(1.8)" opacity="0.15" />
                </svg>
            </motion.div>
        </div>
    );
};
