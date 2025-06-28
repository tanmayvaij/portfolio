"use client";

import { projectCategories, projects } from "@/data";
import { Code } from "lucide-react";
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";

export const ProjectSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-4 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Featured Projects
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {projectCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === category.id
                  ? "bg-white text-gray-950 border-white"
                  : "bg-transparent text-gray-400 border-gray-600 hover:border-gray-400 hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <Code size={48} className="mx-auto mb-4 opacity-50" />
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};
