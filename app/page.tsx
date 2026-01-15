"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Experience } from "@/components/sections/Experience";
import { TechStack } from "@/components/sections/TechStack";
import { About } from "@/components/sections/About";
import { StructuredData } from "@/components/structured-data";
import { projects } from "@/data/projects";
import { experience } from "@/data/experience";
import { techStack } from "@/data/techStack";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-white overflow-hidden">
      <StructuredData />
      <Navbar />
      <Hero />
      <About />
      <FeaturedWork projects={projects} />
      <Experience experience={experience} />
      <TechStack techStack={techStack} />
      <Footer />
    </div>
  );
}
