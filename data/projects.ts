import { Sparkles, Boxes, Cloud } from "lucide-react";
import { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "DiaFlow",
    description: "Lightweight AI agent framework for Gemini models",
    details: [
      "Published npm package with 100% TypeScript",
      "Built-in memory, tool calling, and structured outputs",
      "Simpler alternative to LangChain for production apps",
    ],
    tech: ["TypeScript", "Gemini API", "Zod"],
    link: "https://github.com/tanmayvaij/diaflow",
    github: "https://github.com/tanmayvaij/diaflow",
    icon: Sparkles,
    gradient: "from-violet-500/20 to-purple-500/20",
    image: "/project-diaflow.png",
    featured: true,
  },
  {
    title: "MyLegacyBox",
    description: "Finance succession platform with 1K+ downloads",
    details: [
      "Led full-stack development for 2 years",
      "React Native app on Google Play Store",
      "Built secure backend with PostgreSQL and AWS",
    ],
    tech: ["React Native", "PostgreSQL", "AWS"],
    link: "https://play.google.com/store/apps/details?id=com.oiconomos.www",
    icon: Boxes,
    gradient: "from-blue-500/20 to-cyan-500/20",
    image: "/project-mylegacybox.png",
    stats: {
      users: "1K+",
    },
  },
  {
    title: "ContainRX",
    description: "Self-hosted container management for DevOps teams",
    details: [
      "Open-source modular web app",
      "Simplifies Docker workflows for developers",
      "Built with Next.js and modern DevOps practices",
    ],
    tech: ["Next.js", "Docker", "DevOps"],
    link: "https://github.com/shaasium/containrx",
    github: "https://github.com/shaasium/containrx",
    icon: Cloud,
    gradient: "from-emerald-500/20 to-teal-500/20",
    image: "/project-containrx.png",
  },
];
