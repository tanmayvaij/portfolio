import { Github, Code, ExternalLink } from "lucide-react";
import Image from "next/image";

export const ProjectCard: React.FC<ProjectCard> = (project) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-500 transition-all duration-300 group">
      <div className="h-32 relative bg-gray-800 border-b border-gray-700 flex items-center justify-center">
        <Code size={24} className="text-white" />
        <Image src={project.image} fill alt="project image" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tech.slice(0, 3).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs border border-gray-600"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs border border-gray-600">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
        <div className="flex gap-3">
          <a
            href={project.github}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <Github size={14} />
            Code
          </a>
          <a
            href={project.demo}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ExternalLink size={14} />
            Demo
          </a>
        </div>
      </div>
    </div>
  );
};
