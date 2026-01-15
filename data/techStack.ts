import { LucideIcon, Code2, Database, Terminal, Cpu } from "lucide-react";

export interface TechCategory {
  items: string[];
  icon: LucideIcon;
}

export interface TechStack {
  [category: string]: TechCategory;
}

export const techStack: TechStack = {
  Frontend: {
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Shadcn UI",
      "Angular",
    ],
    icon: Code2,
  },
  Backend: {
    items: ["Node.js", "Express", "NestJS", "FastAPI", "PostgreSQL", "MongoDB"],
    icon: Database,
  },
  DevOps: {
    items: ["Docker", "AWS", "GitHub Actions", "Jenkins", "Git"],
    icon: Terminal,
  },
  AI: {
    items: ["Gemini API", "Agent Frameworks", "LangChain", "OpenAI"],
    icon: Cpu,
  },
};
