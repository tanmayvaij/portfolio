"use client";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Coffee,
  BookOpen,
  Heart,
  Zap,
  TrendingUp,
} from "lucide-react";
import { useRef } from "react";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Sparkles,
      title: "Innovation First",
      description:
        "Always exploring cutting-edge technologies and pushing boundaries",
    },
    {
      icon: Heart,
      title: "User-Centric",
      description:
        "Building experiences that users genuinely love and find valuable",
    },
    {
      icon: Zap,
      title: "Speed & Quality",
      description:
        "Shipping fast without compromising on code quality or performance",
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Staying current with industry trends and best practices",
    },
  ];

  const currentFocus = [
    "Agentic AI Systems",
    "Developer Tooling",
    "Cloud Architecture",
    "Open Source",
  ];

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 bg-linear-to-b from-white via-neutral-50/50 to-white dark:from-black dark:via-neutral-950/50 dark:to-black relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative" ref={sectionRef}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-full mb-6"
          >
            <Coffee className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
              About Me
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Engineer. Builder.{" "}
            <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Problem Solver.
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Passionate about crafting elegant solutions to complex problems
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:col-span-2"
          >
            <Card className="p-8 border-2 border-neutral-200 dark:border-neutral-800 h-full">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-linear-to-b from-rose-600 to-pink-600 rounded-full"></span>
                My Journey
              </h3>
              <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                  I specialize in the{" "}
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    full lifecycle
                  </span>
                  —from UI design to backend architecture, cloud deployment, and
                  GenAI integration. I've shipped products used by{" "}
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    thousands
                  </span>
                  , built open-source tools, and worked with teams across
                  AgriTech, HealthTech, and FinTech.
                </p>
                <p>
                  My approach combines{" "}
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    technical expertise
                  </span>{" "}
                  with product thinking. I don't just write code—I solve
                  problems, optimize experiences, and deliver solutions that
                  create real value.
                </p>
                <p>
                  Currently focused on{" "}
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    agentic AI systems
                  </span>{" "}
                  and developer tooling. I believe in building tools that
                  empower developers and creating experiences that users
                  genuinely love.
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Current Focus */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="p-8 border-2 border-neutral-200 dark:border-neutral-800 h-full">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                Current Focus
              </h3>
              <div className="space-y-3">
                {currentFocus.map((focus, index) => (
                  <motion.div
                    key={focus}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-2 h-2 rounded-full bg-linear-to-r from-rose-500 to-pink-500 group-hover:scale-150 transition-transform"></div>
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      {focus}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Location Info */}
              <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  📍 Based in Pune, India
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-3xl font-bold text-center mb-8">
            What Drives{" "}
            <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              My Work
            </span>
          </h3>
          <div className="grid md:grid-cols-4 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 border-2 border-neutral-200 dark:border-neutral-800 hover:border-rose-500/50 dark:hover:border-rose-500/50 transition-all text-center group h-full flex flex-col items-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-linear-to-br from-rose-500/10 to-pink-500/10 mb-4 group-hover:scale-110 transition-transform">
                    <value.icon className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                  </div>
                  <h4 className="font-bold mb-2">{value.title}</h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <Card className="p-8 border-2 border-neutral-200 dark:border-neutral-800 bg-linear-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
              Let's collaborate on building something exceptional
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Badge className="px-4 py-2 bg-linear-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors">
                Full Stack Development
              </Badge>
              <Badge className="px-4 py-2 bg-linear-to-r from-pink-500/10 to-red-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 hover:bg-pink-500/20 transition-colors">
                AI Integration
              </Badge>
              <Badge className="px-4 py-2 bg-linear-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors">
                DevOps & Cloud
              </Badge>
              <Badge className="px-4 py-2 bg-linear-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors">
                Technical Consulting
              </Badge>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
