"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Building2, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Experience } from "@/types";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isInView: boolean;
}

const typeColors = {
  "Full-time":
    "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400",
  "Part-time":
    "bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400",
  Contract:
    "bg-violet-100 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400",
  Internship:
    "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
};

export function ExperienceCard({
  experience: exp,
  index,
  isInView,
}: ExperienceCardProps) {
  return (
    <motion.div
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
        className="absolute left-0 top-8 w-[54px] h-[54px] rounded-full bg-linear-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-rose-500/25 md:flex"
      >
        {exp.logo ? (
          <div className="w-10 h-10 rounded-full bg-white p-1 relative">
            <Image
              src={exp.logo}
              alt={`${exp.company} logo`}
              fill
              className="object-contain"
              sizes="40px"
            />
          </div>
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
              <div className="shrink-0 md:hidden">
                {exp.logo ? (
                  <div className="w-12 h-12 rounded-lg bg-white dark:bg-neutral-800 p-1.5 border border-neutral-200 dark:border-neutral-700 relative">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-rose-500 to-pink-500 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Achievements Section (if available) */}
            {exp.achievements && exp.achievements.length > 0 && (
              <div className="mb-5 p-4 bg-linear-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 rounded-xl border border-rose-200/50 dark:border-rose-800/30">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
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
                  <span className="mr-3 mt-2 w-1.5 h-1.5 rounded-full bg-linear-to-r from-rose-500 to-pink-500 shrink-0" />
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
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 hover:border-rose-500/50 dark:hover:border-rose-500/50 transition-all cursor-default"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
