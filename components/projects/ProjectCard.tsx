"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Project Image */}
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${
            project.gradient
          } p-1 shadow-2xl order-2 ${index % 2 === 1 ? "lg:order-1" : ""}`}
        >
          <div className="relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden aspect-4/3">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
                <project.icon className="w-24 h-24 text-neutral-400 dark:text-neutral-600" />
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-linear-to-br from-rose-600/90 to-pink-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-center">
                <ArrowUpRight className="w-12 h-12 mx-auto mb-2" />
                <p className="text-lg font-semibold">View Project</p>
              </div>
            </div>
          </div>
        </motion.a>

        {/* Project Details */}
        <div
          className={`space-y-6 order-1 ${index % 2 === 1 ? "lg:order-2" : ""}`}
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
              {project.title}
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.slice(0, 3).map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-neutral-100 dark:bg-neutral-800 hover:bg-linear-to-r hover:from-rose-100 hover:to-pink-100 dark:hover:from-rose-950 dark:hover:to-pink-950 transition-all"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {project.description}
          </p>

          {/* Key Highlights */}
          {project.details.length > 0 && (
            <ul className="space-y-3">
              {project.details.slice(0, 3).map((detail, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start text-neutral-700 dark:text-neutral-300"
                >
                  <span className="mr-3 mt-1 w-1.5 h-1.5 rounded-full bg-linear-to-r from-rose-600 to-pink-600 shrink-0" />
                  <span>{detail}</span>
                </motion.li>
              ))}
            </ul>
          )}

          {/* Project Stats */}
          {project.stats && (
            <div className="flex gap-6 pt-4">
              {project.stats.stars && (
                <div>
                  <div className="text-2xl font-bold bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    {project.stats.stars}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    GitHub Stars
                  </div>
                </div>
              )}
              {project.stats.users && (
                <div>
                  <div className="text-2xl font-bold bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    {project.stats.users}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Active Users
                  </div>
                </div>
              )}
              {project.stats.performance && (
                <div>
                  <div className="text-2xl font-bold bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    {project.stats.performance}
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-400">
                    Performance
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <Button
              asChild
              className="bg-linear-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all group/btn"
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <span>View Project</span>
                <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </Button>

            {project.github && (
              <Button
                variant="outline"
                asChild
                className="border-2 hover:border-rose-500 dark:hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all group/btn"
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                  <span>Source Code</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
