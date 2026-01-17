import { LucideIcon } from "lucide-react";

// ============================================
// Blog Types
// ============================================

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  image: string;
  content: string;
  readingTime: number;
}

// ============================================
// Project Types
// ============================================

export interface Project {
  title: string;
  description: string;
  details: string[];
  tech: string[];
  link: string;
  icon: LucideIcon;
  gradient: string;
  image?: string;
  github?: string;
  featured?: boolean;
  stats?: {
    stars?: number;
    users?: string;
    performance?: string;
  };
}

// ============================================
// Experience Types
// ============================================

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  highlights: string[];
  tech: string[];
  color: string;
  logo?: string;
  type?: "Full-time" | "Part-time" | "Contract" | "Internship";
  companyUrl?: string;
  achievements?: {
    metric: string;
    description: string;
  }[];
}

// ============================================
// Tech Stack Types
// ============================================

export interface TechCategory {
  items: string[];
  icon: LucideIcon;
}

export interface TechStack {
  [category: string]: TechCategory;
}

// ============================================
// Component Props Types
// ============================================

export interface FeaturedBlogPostProps {
  post: BlogPost;
}

export interface BlogGridPostProps {
  post: BlogPost;
  index: number;
}

export interface ShareButtonProps {
  title: string;
  url: string;
  text?: string;
}

export interface FeaturedWorkProps {
  projects: Project[];
}

export interface ExperienceProps {
  experience: Experience[];
}

export interface TechStackProps {
  techStack: TechStack;
}

// ============================================
// Page Props Types
// ============================================

export interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}
