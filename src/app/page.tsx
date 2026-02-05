"use client";
import Navbar from "./components/Navbar";
import MenuSection from "./components/MenuSection";
import InfiniteScrollDishes from "./components/InfiniteScrollDishes";
import KarmaPillars from "./components/KarmaPillars";
import LocationFooter from "./components/LocationFooter";
import ScrollExpandMedia from "./components/ScrollExpandMedia";
import TeaCultureSection from "./components/TeaCultureSection";
import StressReliefSection from "./components/StressReliefSection";
import TeaCoffeePuzzle from "./components/TeaCoffeePuzzle";
import ChaiSpillChallenge from "./components/ChaiSpillChallenge";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="relative bg-[#FFFFFF] text-[#1F1F1F] selection:bg-[#D4AF37] selection:text-white">
      <Navbar />

      <ScrollExpandMedia
        mediaType="image"
        title="SURAPANA"
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
              className="group flex items-center gap-4 text-[#1F1F1F] hover:text-[#D4AF37] transition-colors font-heading text-xl cursor-pointer"
            >
              <span className="border-b border-[#1F1F1F] group-hover:border-[#D4AF37] transition-all duration-500">Dive Into The Vibe</span>
              <div className="w-12 h-12 rounded-full border border-[#1F1F1F]/30 flex items-center justify-center group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-500">
                <ArrowRight size={20} className="group-hover:-rotate-45 transition-transform" />
              </div>
            </a>
          </div>
        }
      >
        <div className="relative z-10 space-y-0 bg-[#FFFFFF] min-h-screen">
          <MenuSection />
          <TeaCultureSection />
          <InfiniteScrollDishes />
          <StressReliefSection />
          <TeaCoffeePuzzle />
          <ChaiSpillChallenge />
          <KarmaPillars />

          <LocationFooter />
        </div>
      </ScrollExpandMedia>
    </main>
  );
}
