"use client";

import { Menu, X } from "lucide-react";
import { useAppValues } from "@/context";

export const Header = () => {
  const { scrollToSection, activeSection, isMenuOpen, setIsMenuOpen } =
    useAppValues();

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-white">Portfolio</div>

          <div className="hidden md:flex space-x-8">
            {["home", "about", "projects", "skills", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`capitalize transition-all duration-300 hover:text-gray-300 ${
                  activeSection === item
                    ? "text-white border-b-2 border-white pb-1"
                    : "text-gray-400"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {["home", "about", "projects", "skills", "contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block px-3 py-2 text-gray-400 hover:text-white capitalize w-full text-left"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
