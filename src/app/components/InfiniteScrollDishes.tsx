"use client";
import * as React from "react";

interface DishData {
    title: string;
    image: string;
    category: string;
    price: string;
    description: string;
}

const DISH_DATA: DishData[] = [
    {
        title: "The Boss Burger",
        image: "/assets/burger.webp",
        category: "Main Course",
        price: "₹189",
        description: "Premium cheese, fresh crunch, signature patty.",
    },
    {
        title: "Kadak Chai",
        image: "/assets/tea.webp",
        category: "Beverage",
        price: "₹25",
        description: "Brewed strong with real spices. Campus bloom.",
    },
    {
        title: "Electric Mojito",
        image: "/assets/mojito.webp",
        category: "Refresher",
        price: "₹89",
        description: "Icy mint explosion. Brain resetter.",
    },
    {
        title: "Golden Fries",
        image: "/assets/french%20fries.webp",
        category: "Sides",
        price: "₹99",
        description: "Crispy outside, fluffy inside. Pure gold.",
    },
    {
        title: "Surapana Special",
        image: "/assets/special.webp",
        category: "Signature",
        price: "₹149",
        description: "The chef's secret blend. Must try.",
    },
];

const CONFIG = {
    SCROLL_SPEED: 0.75,
    LERP_FACTOR: 0.05,
    BUFFER_SIZE: 5,
    MAX_VELOCITY: 150,
    SNAP_DURATION: 500,
    MAX_SCROLL_DISTANCE: 4, // Maximum items to scroll through before allowing page scroll
};

const lerp = (start: number, end: number, factor: number) =>
    start + (end - start) * factor;

const getDishData = (index: number) => {
    const i =
        ((Math.abs(index) % DISH_DATA.length) + DISH_DATA.length) %
        DISH_DATA.length;
    return DISH_DATA[i];
};

const getDishNumber = (index: number) => {
    return (
        ((Math.abs(index) % DISH_DATA.length) + DISH_DATA.length) %
        DISH_DATA.length +
        1
    )
        .toString()
        .padStart(2, "0");
};

export default function InfiniteScrollDishes() {
    const [visibleRange, setVisibleRange] = React.useState({
        min: -CONFIG.BUFFER_SIZE,
        max: CONFIG.BUFFER_SIZE,
    });

    const state = React.useRef({
        currentY: 0,
        targetY: 0,
        isDragging: false,
        isSnapping: false,
        snapStart: { time: 0, y: 0, target: 0 },
        lastScrollTime: Date.now(),
        dragStart: { y: 0, scrollY: 0 },
        projectHeight: 0,
        minimapHeight: 400,
        scrollCount: 0, // Track how many items we've scrolled
    });

    const projectsRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
    const minimapRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
    const infoRef = React.useRef<Map<number, HTMLDivElement>>(new Map());
    const requestRef = React.useRef<number | null>(null);

    const updateParallax = (
        img: HTMLImageElement | null,
        scroll: number,
        index: number,
        height: number
    ) => {
        if (!img) return;

        if (!img.dataset.parallaxCurrent) {
            img.dataset.parallaxCurrent = "0";
        }

        let current = parseFloat(img.dataset.parallaxCurrent);
        const target = (-scroll - index * height) * 0.2;
        current = lerp(current, target, 0.1);

        if (Math.abs(current - target) > 0.01) {
            img.style.transform = `translateY(${current}px) scale(1.1)`;
            img.dataset.parallaxCurrent = current.toString();
        }
    };

    const updateSnap = () => {
        const s = state.current;
        const progress = Math.min(
            (Date.now() - s.snapStart.time) / CONFIG.SNAP_DURATION,
            1
        );
        const eased = 1 - Math.pow(1 - progress, 3);
        s.targetY =
            s.snapStart.y + (s.snapStart.target - s.snapStart.y) * eased;
        if (progress >= 1) s.isSnapping = false;
    };

    const snapToProject = () => {
        const s = state.current;
        const current = Math.round(-s.targetY / s.projectHeight);
        const target = -current * s.projectHeight;
        s.isSnapping = true;
        s.snapStart = {
            time: Date.now(),
            y: s.targetY,
            target: target,
        };
    };

    const updatePositions = () => {
        const s = state.current;
        if (s.projectHeight === 0) return;
        const minimapY = (s.currentY * s.minimapHeight) / s.projectHeight;

        projectsRef.current.forEach((el, index) => {
            const y = index * s.projectHeight + s.currentY;
            el.style.transform = `translateY(${y}px)`;
            const img = el.querySelector("img");
            updateParallax(img, s.currentY, index, s.projectHeight);
        });

        minimapRef.current.forEach((el, index) => {
            const y = index * s.minimapHeight + minimapY;
            el.style.transform = `translateY(${y}px)`;
            const img = el.querySelector("img");
            if (img) {
                updateParallax(img, minimapY, index, s.minimapHeight);
            }
        });

        infoRef.current.forEach((el, index) => {
            const y = index * s.minimapHeight + minimapY;
            el.style.transform = `translateY(${y}px)`;
        });
    };

    const animate = () => {
        const s = state.current;
        const now = Date.now();

        if (!s.isSnapping && !s.isDragging && now - s.lastScrollTime > 100) {
            if (s.projectHeight > 0) {
                const snapPoint =
                    -Math.round(-s.targetY / s.projectHeight) * s.projectHeight;
                if (Math.abs(s.targetY - snapPoint) > 1) snapToProject();
            }
        }

        if (s.isSnapping) updateSnap();
        if (!s.isDragging) {
            s.currentY += (s.targetY - s.currentY) * CONFIG.LERP_FACTOR;
        }

        updatePositions();
    };

    const renderedRange = React.useRef({ min: -CONFIG.BUFFER_SIZE, max: CONFIG.BUFFER_SIZE });

    const animationLoop = () => {
        animate();

        const s = state.current;
        if (s.projectHeight > 0) {
            const currentIndex = Math.round(-s.targetY / s.projectHeight);
            const min = currentIndex - CONFIG.BUFFER_SIZE;
            const max = currentIndex + CONFIG.BUFFER_SIZE;

            if (min !== renderedRange.current.min || max !== renderedRange.current.max) {
                renderedRange.current = { min, max };
                setVisibleRange({ min, max });
            }
        }

        requestRef.current = requestAnimationFrame(animationLoop);
    };

    React.useEffect(() => {
        state.current.projectHeight = window.innerHeight;

        const onWheel = (e: WheelEvent) => {
            const s = state.current;
            const currentIndex = Math.round(-s.targetY / s.projectHeight);

            // Only prevent default if we're within the scroll range
            if (Math.abs(currentIndex) < CONFIG.MAX_SCROLL_DISTANCE) {
                e.preventDefault();
                s.isSnapping = false;
                s.lastScrollTime = Date.now();
                const delta = Math.max(
                    Math.min(e.deltaY * CONFIG.SCROLL_SPEED, CONFIG.MAX_VELOCITY),
                    -CONFIG.MAX_VELOCITY
                );
                s.targetY -= delta;
            }
            // Otherwise, let the default scroll happen to move to next section
        };

        const onTouchStart = (e: TouchEvent) => {
            const s = state.current;
            s.isDragging = true;
            s.isSnapping = false;
            s.dragStart = { y: e.touches[0].clientY, scrollY: s.targetY };
            s.lastScrollTime = Date.now();
        }

        const onTouchMove = (e: TouchEvent) => {
            const s = state.current;
            if (!s.isDragging) return;

            const currentIndex = Math.round(-s.targetY / s.projectHeight);
            if (Math.abs(currentIndex) < CONFIG.MAX_SCROLL_DISTANCE) {
                if (e.cancelable) e.preventDefault();
                s.targetY =
                    s.dragStart.scrollY +
                    (e.touches[0].clientY - s.dragStart.y) * 1.5;
                s.lastScrollTime = Date.now();
            }
        }

        const onTouchEnd = () => {
            state.current.isDragging = false;
            state.current.lastScrollTime = Date.now();
        }

        const onResize = () => {
            state.current.projectHeight = window.innerHeight;
            const container = document.querySelector('.parallax-container') as HTMLElement;
            if (container) {
                container.style.height = `${window.innerHeight}px`;
            }
        }

        const container = document.getElementById("infinite-dishes-container");
        if (container) {
            container.addEventListener("wheel", onWheel, { passive: false });
            container.addEventListener("touchstart", onTouchStart, { passive: false });
            container.addEventListener("touchmove", onTouchMove, { passive: false });
            container.addEventListener("touchend", onTouchEnd);
        }

        window.addEventListener("resize", onResize);
        onResize();

        requestRef.current = requestAnimationFrame(animationLoop);

        return () => {
            if (container) {
                container.removeEventListener("wheel", onWheel);
                container.removeEventListener("touchstart", onTouchStart);
                container.removeEventListener("touchmove", onTouchMove);
                container.removeEventListener("touchend", onTouchEnd);
            }
            window.removeEventListener("resize", onResize);
            if (requestRef.current !== null) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const indices = [];
    for (let i = visibleRange.min; i <= visibleRange.max; i++) {
        indices.push(i);
    }

    if (!indices.length) return null;

    return (
        <div id="infinite-dishes-container" className="parallax-container relative w-full h-screen z-20">

            <ul className="project-list z-0">
                {indices.map((i) => {
                    const data = getDishData(i);
                    return (
                        <div
                            key={i}
                            className="project"
                            ref={(el) => {
                                if (el) projectsRef.current.set(i, el);
                                else projectsRef.current.delete(i);
                            }}
                        >
                            <img src={data.image} alt={data.title} />
                        </div>
                    );
                })}
            </ul>

            <div className="minimap z-40">
                <div className="minimap-wrapper">
                    <div className="minimap-img-preview">
                        {indices.map((i) => {
                            const data = getDishData(i);
                            return (
                                <div
                                    key={i}
                                    className="minimap-img-item"
                                    ref={(el) => {
                                        if (el) minimapRef.current.set(i, el);
                                        else minimapRef.current.delete(i);
                                    }}
                                >
                                    <img src={data.image} alt={data.title} />
                                </div>
                            );
                        })}
                    </div>

                    <div className="minimap-info-list">
                        {indices.map((i) => {
                            const data = getDishData(i);
                            const num = getDishNumber(i);
                            return (
                                <div
                                    key={i}
                                    className="minimap-item-info"
                                    ref={(el) => {
                                        if (el) infoRef.current.set(i, el);
                                        else infoRef.current.delete(i);
                                    }}
                                >
                                    <div className="info-row-top">
                                        <span>{num}</span>
                                        <span className="title">{data.title}</span>
                                    </div>

                                    <div className="info-row-mid">
                                        <span>{data.category}</span>
                                        <span>{data.price}</span>
                                    </div>

                                    <div className="info-row-bot">
                                        <span className="desc">{data.description}</span>
                                        <span className="next-hint">SURAPANA 2026</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
