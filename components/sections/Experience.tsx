"use client";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Calendar,
  Briefcase,
  ArrowUpRight,
  ExternalLink,
  TrendingUp,
} from "lucide-react";
import { useRef } from "react";

interface ExperienceType {
  company: string;
  role: string;
  location: string;
  duration: string;
  highlights: string[];
  tech: string[];
  logo?: string;
  type?: "Full-time" | "Part-time" | "Contract" | "Internship";
  companyUrl?: string;
  achievements?: {
    metric: string;
    description: string;
  }[];
}

interface ExperienceProps {
  experience: ExperienceType[];
}

export function Experience({ experience }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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

  const typeColors = {
    "Full-time":
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    "Part-time":
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Contract:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Internship:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  };

  return (
    <section
      className="py-32 px-6 bg-gradient-to-b from-white via-neutral-50/50 to-white dark:from-black dark:via-neutral-950/50 dark:to-black relative overflow-hidden"
      ref={containerRef}
    >
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-full mb-6"
          >
            <TrendingUp className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
              {totalYears}+ Years of Experience
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Professional{" "}
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
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
            className="absolute left-[26px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-rose-500/20 via-pink-500/20 to-rose-500/20 origin-top hidden md:block"
          />

          {/* Experience Cards */}
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <motion.div
                key={`${exp.company}-${index}`}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.15 }}
                  className="absolute left-0 top-8 w-[54px] h-[54px] rounded-full bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/25 hidden md:flex"
                >
                  {exp.logo ? (
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="w-10 h-10 rounded-full object-contain bg-white p-1"
                    />
                  ) : (
                    <Building2 className="w-6 h-6 text-white" />
                  )}
                </motion.div>

                {/* Experience Card */}
                <Card className="md:ml-20 border-2 border-neutral-200 dark:border-neutral-800 hover:border-rose-500/50 dark:hover:border-rose-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-rose-500/10">
                  <CardContent className="p-0">
                    <div className="p-6 md:p-8">
                      {/* Header Section */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                              {exp.role}
                            </h3>
                            {exp.type && (
                              <Badge
                                className={`${
                                  typeColors[exp.type]
                                } border-0 font-medium text-xs`}
                              >
                                {exp.type}
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mb-3">
                            {exp.companyUrl ? (
                              <a
                                href={exp.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 flex items-center gap-1 group/link transition-colors"
                              >
                                {exp.company}
                                <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                              </a>
                            ) : (
                              <span className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
                                {exp.company}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 flex-wrap">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              <span>{exp.duration}</span>
                            </div>
                            <span className="text-neutral-400">•</span>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4" />
                              <span>{exp.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Mobile Logo */}
                        <div className="flex-shrink-0 md:hidden">
                          {exp.logo ? (
                            <img
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              className="w-12 h-12 rounded-lg object-contain bg-white dark:bg-neutral-800 p-1.5 border border-neutral-200 dark:border-neutral-700"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                              <Building2 className="w-6 h-6 text-white" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Achievements Section (if available) */}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mb-5 p-4 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 rounded-xl border border-rose-200/50 dark:border-rose-800/30">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {exp.achievements.map((achievement, i) => (
                              <div key={i} className="text-center">
                                <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                                  {achievement.metric}
                                </div>
                                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                                  {achievement.description}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Highlights */}
                      <ul className="space-y-3 mb-5">
                        {exp.highlights.map((highlight, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                              duration: 0.4,
                              delay: 0.6 + index * 0.15 + i * 0.1,
                            }}
                            className="flex items-start text-neutral-700 dark:text-neutral-300 leading-relaxed"
                          >
                            <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 flex-shrink-0" />
                            <span>{highlight}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Tech Stack with hover effects */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((tech, i) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                              duration: 0.3,
                              delay: 0.7 + index * 0.15 + i * 0.05,
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-rose-500/50 dark:hover:border-rose-500/50 hover:shadow-md hover:shadow-rose-500/10 transition-all cursor-default"
                          >
                            {tech}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
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
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-rose-500/30 transition-all group"
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
