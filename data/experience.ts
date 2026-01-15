export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  highlights: string[];
  tech: string[];
  color: string;
}

export const experience: Experience[] = [
  {
    company: "IntellAxis AI",
    role: "Software Developer",
    duration: "July 2025 – Present",
    location: "Remote",
    highlights: [
      "Led development of landing website and GenAI products across UI/UX, backend, and DevOps",
      "Integrated GenAI capabilities and optimized CI/CD pipelines for deployment automation",
    ],
    tech: ["GenAI", "CI/CD", "DevOps"],
    color: "violet",
  },
  {
    company: "MyLegacyBox",
    role: "Full Stack Developer",
    duration: "June 2023 – May 2025",
    location: "Remote",
    highlights: [
      "Led end-to-end development for personal finance succession management platform",
      "Conducted technical research for stack optimization and improved app architecture",
    ],
    tech: ["React Native", "Node.js", "AWS"],
    color: "blue",
  },
  {
    company: "SystemOnSilicon",
    role: "Full Stack Developer",
    duration: "Jan 2023 – June 2023",
    location: "Remote",
    highlights: [
      "Developed UI/UX designs and full-stack features for AgriTech and HealthTech applications",
      "Enhanced user experience and system performance across cross-functional teams",
    ],
    tech: ["React", "Node.js", "UI/UX"],
    color: "emerald",
  },
];
