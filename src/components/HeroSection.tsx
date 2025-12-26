"use client";

import { useAppValues } from "@/context";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export const HeroSection = () => {
  const { scrollToSection } = useAppValues();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-background px-6 pt-20"
    >
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 order-2 md:order-1">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground leading-[0.9]">
              FULL STACK
              <br />
              ENGINEER.
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl font-light leading-relaxed">
              Passionate Full Stack Developer skilled in building scalable web
              and mobile applications. Strong foundation in frontend, backend,
              cloud deployment, and DevOps automation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <a
              href="/Tanmay_Vaij_Resume.pdf"
              download
              className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background text-sm font-bold tracking-widest uppercase hover:bg-foreground/90 transition-colors"
            >
              Download Resume
            </a>
            <button
              onClick={() => scrollToSection("about")}
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-border text-foreground text-sm font-bold tracking-widest uppercase hover:bg-secondary transition-colors"
            >
              See Experience <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <Image
              src="/pixar-profile-pic.png"
              fill
              alt="Tanmay Vaij Avatar"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
