import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import projectMylegacybox from "@/assets/project-mylegacybox.png";
import projectDiaflow from "@/assets/project-diaflow.png";
import projectContainrx from "@/assets/project-containrx.png";

const projects = [
  {
    number: "01",
    label: "FEATURED",
    title: "MyLegacyBox",
    description:
      "MyLegacyBox website designed and developed to showcase the business idea and the services offered by the startup. A personal finance succession management platform.",
    tags: ["Next.js", "Tailwind", "shadcn/ui"],
    link: "https://mylegacybox.in/",
    image: projectMylegacybox,
  },
  {
    number: "02",
    label: "FEATURED",
    title: "DiaFlow",
    description:
      "A lightweight AI agent framework built on Google GenAI enabling tool-using agents with memory and structured JSON outputs. Published as an npm package.",
    tags: ["TypeScript", "GenAI", "npm"],
    link: "https://diaflow.netlify.app",
    image: projectDiaflow,
  },
  {
    number: "03",
    label: "OPEN SOURCE",
    title: "ContainRX",
    description:
      "An open-source, modular, and self-hosted web application for managing containerized environments for developers and DevOps teams.",
    tags: ["Docker", "React", "DevOps"],
    link: "https://github.com/shaasium/containrx",
    image: projectContainrx,
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
        isEven ? "" : "lg:grid-flow-dense"
      }`}
    >
      {/* Text Content */}
      <div className={isEven ? "lg:order-1" : "lg:order-2"}>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-heading text-sm font-semibold text-accent">
            {project.number}
          </span>
          <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
            / {project.label}
          </span>
        </div>

        <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          {project.title}
        </h3>

        <p className="text-muted-foreground font-body leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm font-medium bg-secondary text-secondary-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <Button variant="heroOutline" size="lg" asChild>
          <a href={project.link} target="_blank" rel="noopener noreferrer">
            View Project
            <ArrowUpRight size={18} />
          </a>
        </Button>
      </div>

      {/* Image */}
      <motion.div
        className={`relative group ${isEven ? "lg:order-2" : "lg:order-1"}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-elevated">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-video object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="work" ref={sectionRef} className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-16"
        >
          <div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              Selected Work
            </h2>
            <p className="mt-4 text-lg text-muted-foreground font-body">
              A showcase of projects I'm proud of.
            </p>
          </div>

          <Button variant="ghost" size="lg" asChild className="w-fit">
            <a
              href="https://github.com/tanmayvaij"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
              View All on GitHub
            </a>
          </Button>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-20 lg:space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
