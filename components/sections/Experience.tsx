"use client";

import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Briefcase, TrendingUp } from "lucide-react";
import { useRef } from "react";
import { ExperienceProps } from "@/types";
import { ExperienceCard } from "@/components/experience/ExperienceCard";

export function Experience({ experience }: ExperienceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Calculate total years of experience
  const totalYears = experience.reduce((acc, exp) => {
    const duration = exp.duration.toLowerCase();
    if (duration.includes("present")) {
      const startYear = parseInt(duration.match(/\d{4}/)?.[0] || "0");
      const currentYear = new Date().getFullYear();
      return acc + (currentYear - startYear);
    }
    const years = duration.match(/\d{4}/g);
    if (years && years.length >= 2) {
      return acc + (parseInt(years[1]) - parseInt(years[0]));
    }
    return acc;
  }, 0);

  return (
    <section className="py-32 px-6 bg-linear-to-b from-white via-neutral-50/50 to-white dark:from-black dark:via-neutral-950/50 dark:to-black relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative" ref={sectionRef}>
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-full mb-6"
          >
            <TrendingUp className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
              {totalYears}+ Years of Experience
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Professional{" "}
            <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Building impactful products across AI, FinTech, and HealthTech
            startups
          </p>
        </motion.div>

        {/* Timeline Connector */}
        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-[26px] top-0 bottom-0 w-[2px] bg-linear-to-b from-rose-500/20 via-pink-500/20 to-rose-500/20 origin-top hidden md:block"
          />

          {/* Experience Cards */}
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <ExperienceCard
                key={`${exp.company}-${index}`}
                experience={exp}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-rose-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-rose-500/30 transition-all group"
          >
            <Briefcase className="w-5 h-5" />
            <span>Download Full Resume</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
