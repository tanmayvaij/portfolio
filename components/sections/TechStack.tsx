"use client";

import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TechStackProps } from "@/types";
import { Sparkles, Zap, Star } from "lucide-react";
import { useRef, useState } from "react";

export function TechStack({ techStack }: TechStackProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Calculate total number of technologies
  const totalTechs = Object.values(techStack).reduce(
    (acc, { items }) => acc + items.length,
    0
  );

  // Category gradient colors
  const categoryColors = {
    0: "from-rose-500/10 via-pink-500/10 to-red-500/10",
    1: "from-pink-500/10 via-rose-500/10 to-red-500/10",
    2: "from-red-500/10 via-rose-500/10 to-pink-500/10",
    3: "from-rose-500/10 via-red-500/10 to-pink-500/10",
  };

  const categoryBorderColors = {
    0: "group-hover:border-rose-500/50 dark:group-hover:border-rose-500/50",
    1: "group-hover:border-pink-500/50 dark:group-hover:border-pink-500/50",
    2: "group-hover:border-red-500/50 dark:group-hover:border-red-500/50",
    3: "group-hover:border-rose-500/50 dark:group-hover:border-rose-500/50",
  };

  const categoryIconColors = {
    0: "text-rose-600 dark:text-rose-400",
    1: "text-pink-600 dark:text-pink-400",
    2: "text-red-600 dark:text-red-400",
    3: "text-rose-600 dark:text-rose-400",
  };

  return (
    <section className="py-32 px-6 bg-linear-to-b from-white via-neutral-50/30 to-white dark:from-black dark:via-neutral-950/30 dark:to-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative" ref={sectionRef}>
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-full mb-6"
          >
            <Zap className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
              {totalTechs}+ Technologies Mastered
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Tech{" "}
            <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Arsenal
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </motion.div>

        {/* Tech Stack Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {Object.entries(techStack).map(
            ([category, { items, icon: Icon }], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                {/* Hover Glow Effect */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${
                    categoryColors[index as keyof typeof categoryColors]
                  } rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <Card
                  className={`relative border-2 border-neutral-200 dark:border-neutral-800 ${
                    categoryBorderColors[
                      index as keyof typeof categoryBorderColors
                    ]
                  } transition-all duration-300 hover:shadow-2xl h-full`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className={`p-3 bg-linear-to-br ${
                            categoryColors[index as keyof typeof categoryColors]
                          } rounded-2xl border border-neutral-200 dark:border-neutral-800`}
                        >
                          <Icon
                            className={`w-8 h-8 ${
                              categoryIconColors[
                                index as keyof typeof categoryIconColors
                              ]
                            }`}
                          />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold">{category}</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                            {items.length} technologies
                          </p>
                        </div>
                      </div>

                      {/* Proficiency Indicator */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.3 + index * 0.15 }}
                        className="flex items-center gap-1"
                      >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Tech Items as Interactive Badges */}
                    <div className="flex flex-wrap gap-2">
                      {items.map((tech, techIndex) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            duration: 0.3,
                            delay: 0.5 + index * 0.15 + techIndex * 0.05,
                          }}
                          onHoverStart={() => setHoveredTech(tech)}
                          onHoverEnd={() => setHoveredTech(null)}
                        >
                          <Badge
                            variant="secondary"
                            className={`px-4 py-2 text-sm font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-default hover:shadow-md ${
                              hoveredTech === tech
                                ? "scale-110 shadow-lg"
                                : "scale-100"
                            }`}
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    {/* Category Description or Stats */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      whileHover={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 overflow-hidden"
                    >
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {category === "Frontend" &&
                          "Building responsive, accessible, and performant user interfaces"}
                        {category === "Backend" &&
                          "Architecting scalable APIs and database systems"}
                        {category === "DevOps" &&
                          "Automating deployments and managing cloud infrastructure"}
                        {category === "AI" &&
                          "Integrating intelligent features with modern AI models"}
                      </p>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          )}
        </div>

        {/* Tech Philosophy Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto p-8 bg-linear-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 rounded-3xl border-2 border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-rose-600 dark:text-rose-400" />
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              I believe in using the right tool for the job. My focus is on
              building scalable, maintainable solutions while staying current
              with emerging technologies and best practices.
            </p>
          </div>
        </motion.div>

        {/* Optional: Tech Certifications or Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-600 dark:text-neutral-400"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>Production Experience</span>
          </div>
          <span className="text-neutral-400">•</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span>Open Source Contributor</span>
          </div>
          <span className="text-neutral-400">•</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>Continuous Learner</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
