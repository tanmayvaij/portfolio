export interface Project {
  id: string
  slug?: string
  title: string
  description: string
  longDescription: string
  featuredImage?: string | null
  screenshots?: string | null
  category: "Web App" | "AI & Systems" | "DevOps & Cloud" | "Open Source"
  tags: string[]
  featured: boolean
  githubUrl?: string
  liveUrl?: string
  metrics?: string
  highlights: string[]
}

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
  skills: string[]
}

export interface SkillCategory {
  category: string
  skills: { name: string; level: "Proficient" | "Advanced" | "Expert" }[]
}

export const portfolioData = {
  name: "Tanmay Vaij",
  title: "Senior Full Stack & Distributed Systems Engineer",
  tagline: "Architecting resilient web platforms, high-throughput APIs, and AI-powered developer tooling.",
  bio: "I am a full-stack software engineer with 6+ years of experience designing scalable microservices, high-performance web frontends with Next.js and React, and production-grade LLM workflows. Passionate about clean architecture, developer ergonomics, and rock-solid systems.",
  location: "Bengaluru, India",
  email: "tanmayvaij22@gmail.com",
  avatar: "/profile.png",
  socials: {
    github: "https://github.com/tanmayvaij",
    linkedin: "https://www.linkedin.com/in/tanmayvaij/",
    twitter: "https://twitter.com/tanmayvaij",
  },
  stats: [
    { label: "Years Experience", value: "6+" },
    { label: "Production Deployments", value: "120+" },
    { label: "Open Source Stars", value: "1.4k" },
    { label: "Technical Articles", value: "25+" },
  ],
  skills: [
    {
      category: "Frontend & UI",
      skills: [
        { name: "React 19 & Next.js (App Router)", level: "Expert" },
        { name: "TypeScript", level: "Expert" },
        { name: "Tailwind CSS v4 & shadcn/ui", level: "Expert" },
        { name: "State Machines & TanStack Query", level: "Advanced" },
        { name: "Web Vitals & Performance Tuning", level: "Expert" },
      ],
    },
    {
      category: "Backend & Systems",
      skills: [
        { name: "Node.js & Bun", level: "Expert" },
        { name: "Go & Python", level: "Advanced" },
        { name: "PostgreSQL & Prisma / Drizzle", level: "Expert" },
        { name: "Redis & Distributed Caching", level: "Advanced" },
        { name: "REST, GraphQL & gRPC", level: "Advanced" },
      ],
    },
    {
      category: "Cloud & DevOps",
      skills: [
        { name: "Docker & Kubernetes", level: "Advanced" },
        { name: "AWS (ECS, Lambda, S3, CloudFront)", level: "Advanced" },
        { name: "CI/CD (GitHub Actions)", level: "Expert" },
        { name: "Terraform & IaC", level: "Proficient" },
        { name: "Monitoring (Prometheus & OpenTelemetry)", level: "Advanced" },
      ],
    },
    {
      category: "AI & Data Engineering",
      skills: [
        { name: "LangChain & LlamaIndex", level: "Advanced" },
        { name: "Vector Databases (pgvector, Pinecone)", level: "Advanced" },
        { name: "Agentic Tool Calling & Function Execution", level: "Expert" },
        { name: "Local Models (Ollama, vLLM)", level: "Proficient" },
      ],
    },
  ] as SkillCategory[],
  experiences: [
    {
      role: "Software Developer",
      company: "IntellAxis AI",
      location: "Pune District, Maharashtra, India · Hybrid",
      period: "Jul 2025 - Present",
      description: "Building production-grade full-stack systems, Legal AI automation workflows, and cloud infrastructure across AWS and GCP.",
      achievements: [
        "Developed and deployed the company’s official website intellaxisai.com, ensuring a modern, responsive, and production-ready frontend.",
        "Contributed to a Legal AI platform, building core modules and integrating intelligent workflows for legal automation use cases.",
        "Designed and implemented an eSign & eStamping platform using Zoho APIs, enabling secure document signing and compliance processes.",
        "Built scalable mental health platform, delivering both frontend and backend components from scratch.",
        "Developed an MVP for Conference, focusing on rapid delivery, usability, and scalable architecture.",
        "Built full-stack systems using React.js frameworks on the frontend and FastAPI for backend services.",
        "Integrated and managed cloud infrastructure using services across AWS and Google Cloud Platform (GCP) for deployment, storage, and scalability.",
        "Collaborated with cross-functional teams to deliver high-impact, real-world products under tight deadlines.",
      ],
      skills: ["Next.js", "React.js", "FastAPI", "Python", "AWS", "GCP", "Zoho APIs"],
    },
    {
      role: "Full Stack Developer",
      company: "My Legacy Box (Formerly Oiconomos)",
      location: "Bhubaneshwar, Odisha, India · Remote",
      period: "Jun 2023 - May 2025",
      description: "Engineered cross-platform mobile applications with React Native and SEO-optimized web interfaces using Next.js and Firebase.",
      achievements: [
        "Led the development of a cross-platform mobile application using React Native, successfully published on the Google Play Store.",
        "Built responsive and SEO-optimized web interfaces using Next.js, improving accessibility and overall user experience.",
        "Developed backend services and application logic using Node.js, Firebase, and REST APIs to support core platform workflows.",
        "Collaborated with the team on feature planning, UI improvements, debugging, and production enhancements.",
        "Delivered multiple proof-of-concepts and scalable modules to accelerate product development in an early-stage startup environment.",
        "Gained hands-on experience working across the full software lifecycle — from development to deployment.",
      ],
      skills: ["React Native", "Next.js", "Node.js", "Firebase", "Docker", "REST APIs"],
    },
    {
      role: "Full Stack Developer",
      company: "SystemOnSilicon",
      location: "Austin, Texas, United States · Remote",
      period: "Jan 2023 - Jun 2023",
      description: "Developed cross-platform mobile and web applications with Angular/Ionic and constructed scalable REST APIs using LoopBack and Node.js.",
      achievements: [
        "Contributed to the development of cross-platform applications using Angular and Ionic, delivering responsive and user-friendly interfaces.",
        "Built backend services and REST APIs using the LoopBack framework, supporting scalable application workflows.",
        "Integrated frontend and backend components to ensure smooth data flow and reliable functionality.",
        "Assisted in debugging, optimizing performance, and improving overall application stability.",
        "Collaborated with the development team to deliver project modules within defined timelines.",
      ],
      skills: ["Angular", "Ionic", "Node.js", "Express.js", "LoopBack", "REST APIs"],
    },
  ] as Experience[],
  projects: [
    {
      id: "agentflow-orchestrator",
      title: "AgentFlow: Distributed Autonomous Agent Framework",
      description: "An open-source orchestration runtime for multi-agent workflows with sandboxed tool execution and deterministic state graphs.",
      longDescription: "AgentFlow allows engineering teams to construct resilient, self-healing LLM workflows. Built on a Directed Acyclic Graph (DAG) state engine, it supports tool calling, parallel worker execution, human-in-the-loop approval checkpoints, and memory persistence.",
      category: "AI & Systems",
      tags: ["TypeScript", "Next.js", "Node.js", "pgvector", "Docker"],
      featured: true,
      githubUrl: "https://github.com/tanmayvaij/agentflow-orchestrator",
      liveUrl: "https://agentflow.dev",
      metrics: "1,200+ Stars · 250+ Production Deployments",
      highlights: [
        "Sandboxed Python & Bash tool execution engine with memory limits",
        "Visual DAG execution debugger built with SVG and React Flow",
        "Zero-dependency lightweight client with sub-10ms serialization overhead",
      ],
    },
    {
      id: "cloudpulse-observability",
      title: "CloudPulse: Zero-Overhead Edge Telemetry",
      description: "Real-time edge performance monitoring and Distributed Tracing portal with sub-second aggregate alerting.",
      longDescription: "CloudPulse aggregates synthetic monitoring, Core Web Vitals, and serverless runtime latency across 30+ edge regions. Featuring instant drill-downs, trace waterfall visualizations, and anomaly detection.",
      category: "DevOps & Cloud",
      tags: ["Go", "Next.js", "ClickHouse", "Tailwind CSS", "eBPF"],
      featured: true,
      githubUrl: "https://github.com/tanmayvaij/cloudpulse-telemetry",
      liveUrl: "https://cloudpulse.io",
      metrics: "40M+ Spans/Day Processed · 99.99% Uptime",
      highlights: [
        "ClickHouse columnar storage engine with automated retention policies",
        "Interactive flamegraph trace analyzer with DOM correlation",
        "Multi-tenant RBAC with granular API token scopes",
      ],
    },
    {
      id: "turbostash-cache",
      title: "TurboStash: Intelligent Edge Cache Middleware",
      description: "Smart tier-2 caching proxy for Next.js App Router and serverless backends with programmatic stale-while-revalidate invalidation.",
      longDescription: "TurboStash sits between client CDN edges and origin database clusters, managing cache stampede prevention, atomic tag invalidations, and distributed lock leases.",
      category: "Web App",
      tags: ["TypeScript", "Redis", "Cloudflare Workers", "Next.js"],
      featured: true,
      githubUrl: "https://github.com/tanmayvaij/turbostash",
      liveUrl: "https://turbostash.dev",
      metrics: "450ms → 12ms p95 Latency Reduction",
      highlights: [
        "Single-flight request deduplication preventing cache stampedes",
        "Automated cryptographic signature verification on cache flushes",
        "Zero-config integration with Next.js revalidateTag API",
      ],
    },
    {
      id: "schema-forge-cli",
      title: "SchemaForge: Zero-Downtime DB Migration Engine",
      description: "Developer CLI and validation pipeline preventing locking table locks during Postgres database migrations.",
      longDescription: "SchemaForge statically analyzes raw SQL migration scripts and ORM generated migrations to detect dangerous DDL operations like non-concurrent index creation or table-rewriting default values.",
      category: "Open Source",
      tags: ["Go", "PostgreSQL", "GitHub Actions", "CLI"],
      featured: false,
      githubUrl: "https://github.com/tanmayvaij/schemaforge",
      liveUrl: "https://schemaforge.tools",
      metrics: "50k+ Docker Pulls · CI Integration",
      highlights: [
        "15+ built-in lint checks for PostgreSQL locking hazards",
        "Integrates as a native GitHub Action with PR bot reports",
        "Supports PostgreSQL 12 through 17",
      ],
    },
  ] as Project[],
}

