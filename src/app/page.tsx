"use client";
import Navbar from "./components/Navbar";
import MenuSection from "./components/MenuSection";
import InfiniteScrollDishes from "./components/InfiniteScrollDishes";
import KarmaPillars from "./components/KarmaPillars";
import LocationFooter from "./components/LocationFooter";
import ScrollExpandMedia from "./components/ScrollExpandMedia";
import TeaCultureSection from "./components/TeaCultureSection";
import StressReliefSection from "./components/StressReliefSection";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative bg-[#12100E] text-[#EBE5CE] selection:bg-[#C4B5A5] selection:text-black">
      <Navbar />

      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="/assets/hero-video.mp4"
        bgImageSrc="/assets/hero_background.jpg"
        title="SURA PANA"
        scrollToExpand="SCROLL TO EXPLORE"
        heroContent={
          <div className="flex gap-6 items-center">
            <a
              href="#chill-zone"
              onClick={(e) => {
                // If we're at the hero (top of page), unlock it first
                if (window.scrollY < 100) {
                  e.preventDefault();
                  // Dispatch custom event to unlock hero
                  window.dispatchEvent(new CustomEvent('unlockHero'));
                  // Wait a tiny bit for state to update, then navigate
                  setTimeout(() => {
                    const target = document.querySelector('#chill-zone');
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }
              }}
              className="group flex items-center gap-4 text-white hover:text-[#C4B5A5] transition-colors font-heading text-xl cursor-pointer"
            >
              <span className="border-b border-white group-hover:border-[#C4B5A5] transition-all duration-500">Dive Into The Vibe</span>
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#C4B5A5] group-hover:bg-[#C4B5A5] group-hover:text-black transition-all duration-500">
                <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform" />
              </div>
            </a>
          </div>
        }
      >
        <div className="relative z-10 space-y-0 bg-[#12100E] min-h-screen">
          <MenuSection />
          <TeaCultureSection />
          <InfiniteScrollDishes />
          <StressReliefSection />
          <KarmaPillars />
          <LocationFooter />
        </div>
      </ScrollExpandMedia>
    </main>
  );
}
