"use client"

import { useAppValues } from "@/context";
import { ChevronDown, Download } from "lucide-react";
import Image from "next/image";

export const HeroSection = () => {

  const { scrollToSection, isVisible } = useAppValues();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gray-950"></div>
      <div
        className={`text-center z-10 px-4 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-8">
          <div className="w-40 h-40 relative rounded-full border-gray-300 mx-auto mb-6 flex items-center justify-center">
            <Image
              className="rounded-full"
              src="/pixar-profile-pic.png"
              fill
              alt="pixar-profile-image"
            />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Hi, I'm{" "}
          <span className="text-white underline decoration-4 underline-offset-8">
            Tanmay Vaij
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Full Stack Developer & UI/UX Enthusiast
        </p>
        <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
          I create beautiful, functional web applications that provide
          exceptional user experiences
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollToSection("projects")}
            className="px-8 py-3 bg-white text-gray-950 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 font-medium"
          >
            View My Work
          </button>
          <button className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-950 transition-all duration-300 flex items-center justify-center gap-2 font-medium">
            <Download size={20} />
            Download CV
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-white" />
      </div>
    </section>
  );
};
