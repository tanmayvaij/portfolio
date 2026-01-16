"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef } from "react";

interface Project {
  title: string;
  description: string;
  details: string[];
  tech: string[];
  link: string;
  github?: string;
  icon: any;
  gradient: string;
  featured?: boolean;
  image?: string;
  stats?: {
    stars?: number;
    users?: string;
    performance?: string;
  };
}

interface FeaturedWorkProps {
  projects: Project[];
}

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

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
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
            In today's crowded digital world, it's not about being loudest —
            it's about being{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              sharper
            </span>
            .
          </p>
        </motion.div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
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
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${
                    project.gradient
                  } p-1 shadow-2xl order-2 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <div className="relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden aspect-[4/3]">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
                        <project.icon className="w-24 h-24 text-neutral-400 dark:text-neutral-600" />
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-600/90 to-pink-600/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <ArrowUpRight className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-lg font-semibold">View Project</p>
                      </div>
                    </div>
                  </div>
                </motion.a>

                {/* Project Details */}
                <div
                  className={`space-y-6 order-1 ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
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
                          className="bg-neutral-100 dark:bg-neutral-800 hover:bg-gradient-to-r hover:from-rose-100 hover:to-pink-100 dark:hover:from-rose-950 dark:hover:to-pink-950 transition-all"
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
                          <span className="mr-3 mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 flex-shrink-0" />
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
                          <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                            {project.stats.stars}
                          </div>
                          <div className="text-sm text-neutral-600 dark:text-neutral-400">
                            GitHub Stars
                          </div>
                        </div>
                      )}
                      {project.stats.users && (
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                            {project.stats.users}
                          </div>
                          <div className="text-sm text-neutral-600 dark:text-neutral-400">
                            Active Users
                          </div>
                        </div>
                      )}
                      {project.stats.performance && (
                        <div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
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
                      className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-lg group/btn"
                    >
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        View Project
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </a>
                    </Button>

                    {project.github && (
                      <Button asChild variant="outline" className="group/btn">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Github className="w-4 h-4" />
                          Source Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
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
