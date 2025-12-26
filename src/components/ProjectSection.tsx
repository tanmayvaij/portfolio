"use client";

import { projects } from "@/data";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export const ProjectSection = () => {
  // Select top 3 "Featured" projects for the brand showcase
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="projects" className="py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
            Selected Work
          </h2>
          <a
            href="https://github.com/tanmayvaij"
            target="_blank"
            className="hidden md:inline-flex items-center text-sm font-bold uppercase tracking-widest hover:text-muted-foreground transition-colors"
          >
            View All on GitHub <ArrowUpRight size={16} className="ml-1" />
          </a>
        </div>

        <div className="space-y-24">
          {featuredProjects.map((project, index) => (
            <div
              key={index}
              className="group grid md:grid-cols-2 gap-8 items-center border-b border-border pb-24 last:border-0 last:pb-0"
            >
              {/* Number & Info */}
              <div className="order-2 md:order-1 space-y-6">
                <span className="text-xs font-mono text-muted-foreground">
                  0{index + 1} / FEATURED
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground group-hover:text-foreground/70 transition-colors">
                  {project.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs border border-border rounded-full text-muted-foreground uppercase tracking-wide"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="pt-6">
                  <a
                    href={project.demo || project.github}
                    target="_blank"
                    className="inline-flex items-center text-sm font-bold text-foreground border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
                  >
                    View Project <ArrowUpRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>

              {/* Image */}
              <div className="order-1 md:order-2 relative aspect-[4/3] bg-secondary rounded-sm overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                {project.image && (
                  <Image
                    src={project.image}
                    fill
                    alt={project.title}
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
