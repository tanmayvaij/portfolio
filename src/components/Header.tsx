"use client";

import { useAppValues } from "@/context";
import { useEffect, useState } from "react";

export const Header = () => {
  const { scrollToSection } = useAppValues();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-sm border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button
          onClick={() => scrollToSection("home")}
          className="text-xl font-bold tracking-tighter text-foreground z-50"
        >
          TANMAY VAIJ
        </button>

        <div className="flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Overview
          </button>
          <button
            onClick={() => scrollToSection("projects")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};
