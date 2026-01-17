"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { FeaturedWorkProps } from "@/types";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "../ui/button";
import { ArrowUpRight, Github } from "lucide-react";

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="work"
      className="py-32 px-6 relative overflow-hidden bg-white dark:bg-black"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Project{" "}
            <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
            In today&apos;s crowded digital world, it&apos;s not about being loudest —
            it&apos;s about being{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              sharper
            </span>
            .
          </p>
        </motion.div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-20"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group hover:border-rose-600 dark:hover:border-rose-400"
          >
            <a
              href="https://github.com/tanmayvaij"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              View All Projects on GitHub
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
