"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  FileText,
  Briefcase,
  Mail,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  LogOut,
  CheckCircle,
  AlertCircle,
  Eye,
  ShieldCheck,
  TrendingUp,
  Search,
  Wrench,
  User,
  Save,
  Layers,
  X,
  Lock,
  Image as ImageIcon,
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { RichTextEditor } from "@/components/admin/rich-text-editor"
import { ImageUploader } from "@/components/ui/image-uploader"
import { ScreenshotSlots } from "@/components/admin/screenshot-slots"
import {
  logoutAdmin,
  savePostAction,
  deletePostAction,
  togglePostPublishedAction,
  saveProjectAction,
  deleteProjectAction,
  toggleProjectPublishedAction,
  deleteMessageAction,
  saveAffiliateAction,
  deleteAffiliateAction,
  saveAboutAction,
  saveExperienceAction,
  deleteExperienceAction,
  saveSkillCategoryAction,
  deleteSkillCategoryAction,
} from "@/app/actions/admin"

interface PostRecord {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  notes?: string | null
  coverImage?: string | null
  category: string
  tags: string
  readTime: string
  published: boolean
  publishedAt: Date | string
}

interface ProjectRecord {
  id: string
  slug: string
  title: string
  description: string
  longDescription: string
  notes?: string | null
  featuredImage?: string | null
  screenshots?: string | null
  category: string
  tags: string
  metrics: string | null
  highlights: string
  featured: boolean
  published?: boolean
  showGithub?: boolean
  githubUrl: string | null
  liveUrl: string | null
}

interface MessageRecord {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date | string
}

interface AffiliateRecord {
  id: string
  slug: string
  name: string
  category: string
  description: string
  notes?: string | null
  badge: string | null
  affiliateUrl: string
  discountCode: string | null
  price?: string | null
  rating?: number | null
  imageUrl?: string | null
  merchant?: string
  featured: boolean
}

interface AboutRecord {
  id?: string
  name?: string
  headline: string
  subheadline: string
  heroTitle?: string
  heroHighlight?: string
  heroSubtitle?: string
  bioIntro: string
  bioParagraph1: string
  bioParagraph2: string
  location: string
  email?: string
  websiteUrl?: string
  address?: string
  contactHeading?: string
  contactDescription?: string
  contactTitle?: string
  contactSubtitle?: string
  responseTime?: string
  specialization: string
  status: string
  experienceYears: string
  languages: string
  githubUrl: string
  linkedinUrl: string
  degreeTitle: string
  degreePeriod: string
  degreeDesc: string
  certTitle: string
  certBadge: string
  certDesc: string
  experiencesJson?: string | null
}

interface ExperienceRecord {
  id: string
  role: string
  company: string
  location: string
  period: string
  description: string
  achievements: string
  skills: string
  order: number
}

interface SkillCategoryRecord {
  id: string
  category: string
  skills: string
  order: number
}

const DEFAULT_EXPERIENCES: ExperienceRecord[] = [
  {
    id: "default-1",
    role: "Staff Engineer / Tech Lead",
    company: "Apex Cloud Systems",
    location: "Bengaluru (Hybrid)",
    period: "2023 - Present",
    description: "Leading the core platform engineering team building real-time developer observability tooling and distributed API gateways.",
    achievements: JSON.stringify([
      "Architected an event-driven telemetry ingestion engine processing 40M+ events daily with sub-50ms p99 latency.",
      "Migrated legacy monolithic Next.js applications to modern Next.js App Router with Server Components, slashing TTFB by 42%.",
      "Mentored 12 mid and senior engineers in distributed systems design, testing strategies, and clean code principles.",
    ]),
    skills: "Next.js, TypeScript, Go, PostgreSQL, Kafka, Kubernetes",
    order: 1,
  },
  {
    id: "default-2",
    role: "Senior Full Stack Engineer",
    company: "HyperScale Tech",
    location: "Remote",
    period: "2021 - 2023",
    description: "Developed customer-facing enterprise SaaS portals and automated workflow orchestration pipelines.",
    achievements: JSON.stringify([
      "Implemented end-to-end caching architecture using Redis and stale-while-revalidate headers, lowering database load by 68%.",
      "Designed accessible, theme-aware design systems using Tailwind CSS and Radix/Base UI components adopted across 4 products.",
      "Integrated SOC2 compliant audit logging and role-based access control (RBAC).",
    ]),
    skills: "React, TypeScript, Node.js, Redis, Docker, AWS",
    order: 2,
  },
  {
    id: "default-3",
    role: "Software Engineer",
    company: "Cognitive Wave Labs",
    location: "Pune, India",
    period: "2019 - 2021",
    description: "Built high-traffic web applications, RESTful microservices, and interactive analytics dashboards.",
    achievements: JSON.stringify([
      "Engineered real-time data visualization charts rendering 100k+ points at 60fps using Canvas and Web Workers.",
      "Refactored build pipelines, reducing CI build times from 18 minutes down to 3.5 minutes.",
    ]),
    skills: "JavaScript, React, Python, Flask, PostgreSQL",
    order: 3,
  },
]

const DEFAULT_SKILL_CATEGORIES: SkillCategoryRecord[] = [
  {
    id: "default-cat-1",
    category: "Frontend & UI",
    skills: JSON.stringify([
      { name: "React 19 & Next.js (App Router)", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "Tailwind CSS v4 & shadcn/ui", level: "Expert" },
      { name: "State Machines & TanStack Query", level: "Advanced" },
      { name: "Web Vitals & Performance Tuning", level: "Expert" },
    ]),
    order: 1,
  },
  {
    id: "default-cat-2",
    category: "Backend & Systems",
    skills: JSON.stringify([
      { name: "Node.js & Bun", level: "Expert" },
      { name: "Go & Python", level: "Advanced" },
      { name: "PostgreSQL & Prisma / Drizzle", level: "Expert" },
      { name: "Redis & Distributed Caching", level: "Advanced" },
      { name: "REST, GraphQL & gRPC", level: "Advanced" },
    ]),
    order: 2,
  },
  {
    id: "default-cat-3",
    category: "Cloud & DevOps",
    skills: JSON.stringify([
      { name: "Docker & Kubernetes", level: "Advanced" },
      { name: "AWS (ECS, Lambda, S3, CloudFront)", level: "Advanced" },
      { name: "CI/CD (GitHub Actions)", level: "Expert" },
      { name: "Terraform & IaC", level: "Proficient" },
      { name: "Monitoring (Prometheus & OpenTelemetry)", level: "Advanced" },
    ]),
    order: 3,
  },
  {
    id: "default-cat-4",
    category: "AI & Data Engineering",
    skills: JSON.stringify([
      { name: "LangChain & LlamaIndex", level: "Advanced" },
      { name: "Vector Databases (pgvector, Pinecone)", level: "Advanced" },
      { name: "Agentic Tool Calling & Function Execution", level: "Expert" },
      { name: "Local Models (Ollama, vLLM)", level: "Proficient" },
    ]),
    order: 4,
  },
]

interface AdminDashboardProps {
  initialPosts: PostRecord[]
  initialProjects: ProjectRecord[]
  initialMessages: MessageRecord[]
  initialAffiliates?: AffiliateRecord[]
  initialAbout?: AboutRecord | null
  initialExperiences?: ExperienceRecord[]
  initialSkillCategories?: SkillCategoryRecord[]
}

export function AdminDashboard({
  initialPosts,
  initialProjects,
  initialMessages,
  initialAffiliates = [],
  initialAbout,
  initialExperiences = [],
  initialSkillCategories = [],
}: AdminDashboardProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState("posts")
  const [statusMessage, setStatusMessage] = React.useState<{ text: string; type: "success" | "error" } | null>(null)

  // Experiences State
  const [experiences, setExperiences] = React.useState<ExperienceRecord[]>(() => {
    if (initialExperiences && initialExperiences.length > 0) return initialExperiences
    return DEFAULT_EXPERIENCES
  })
  const [isEditingExp, setIsEditingExp] = React.useState(false)
  const [editingExpId, setEditingExpId] = React.useState<string | null>(null)
  const [expForm, setExpForm] = React.useState({
    id: "",
    role: "",
    company: "",
    location: "Bengaluru (Hybrid)",
    period: "2024 - Present",
    description: "",
    achievements: "Architected high-throughput services\nReduced latency and operational costs",
    skills: "Next.js, TypeScript, Go",
    order: 0,
  })
  const [isSavingExp, setIsSavingExp] = React.useState(false)

  // Sync state if props update from server
  React.useEffect(() => {
    if (initialExperiences && initialExperiences.length > 0) {
      setExperiences(initialExperiences)
    }
  }, [initialExperiences])

  React.useEffect(() => {
    if (initialSkillCategories && initialSkillCategories.length > 0) {
      setSkillCategories(initialSkillCategories)
    }
  }, [initialSkillCategories])

  React.useEffect(() => {
    if (initialAbout) {
      setAboutForm((prev) => ({
        ...prev,
        ...initialAbout,
        name: initialAbout.name || prev.name || "Tanmay Vaij",
        email: initialAbout.email || prev.email || "tanmayvaij22@gmail.com",
        websiteUrl: initialAbout.websiteUrl || prev.websiteUrl || "https://www.tanmayvaij.dev/",
        address: initialAbout.address || prev.address || "Katraj, Pune",
        contactHeading: initialAbout.contactHeading || prev.contactHeading || "Let's Discuss Your Architecture",
        contactDescription:
          initialAbout.contactDescription ||
          prev.contactDescription ||
          "Whether you have a technical question about an article, want to collaborate on open-source, or need senior systems expertise, my inbox is open.",
        contactTitle: initialAbout.contactTitle || prev.contactTitle || "Contact Information",
        contactSubtitle:
          initialAbout.contactSubtitle ||
          prev.contactSubtitle ||
          "Reach out directly for freelance contracts, consulting, or technical inquiries.",
        responseTime: initialAbout.responseTime || prev.responseTime || "Typically within 24 business hours",
      }))
    }
  }, [initialAbout])

  const handleSeedDefaultExperiences = async () => {
    const defaultExps = [
      {
        role: "Software Developer",
        company: "IntellAxis AI",
        location: "Pune District, Maharashtra, India · Hybrid",
        period: "Jul 2025 - Present",
        description: "Building production-grade full-stack systems, Legal AI automation workflows, and cloud infrastructure across AWS and GCP.",
        achievements: JSON.stringify([
          "Developed and deployed the company’s official website intellaxisai.com, ensuring a modern, responsive, and production-ready frontend.",
          "Contributed to a Legal AI platform, building core modules and integrating intelligent workflows for legal automation use cases.",
          "Designed and implemented an eSign & eStamping platform using Zoho APIs, enabling secure document signing and compliance processes.",
          "Built scalable mental health platform, delivering both frontend and backend components from scratch.",
          "Developed an MVP for Conference, focusing on rapid delivery, usability, and scalable architecture.",
          "Built full-stack systems using React.js frameworks on the frontend and FastAPI for backend services.",
          "Integrated and managed cloud infrastructure using services across AWS and Google Cloud Platform (GCP) for deployment, storage, and scalability.",
          "Collaborated with cross-functional teams to deliver high-impact, real-world products under tight deadlines.",
        ]),
        skills: "Next.js, React.js, FastAPI, Python, AWS, GCP, Zoho APIs",
        order: 1,
      },
      {
        role: "Full Stack Developer",
        company: "My Legacy Box (Formerly Oiconomos)",
        location: "Bhubaneshwar, Odisha, India · Remote",
        period: "Jun 2023 - May 2025",
        description: "Engineered cross-platform mobile applications with React Native and SEO-optimized web interfaces using Next.js and Firebase.",
        achievements: JSON.stringify([
          "Led the development of a cross-platform mobile application using React Native, successfully published on the Google Play Store.",
          "Built responsive and SEO-optimized web interfaces using Next.js, improving accessibility and overall user experience.",
          "Developed backend services and application logic using Node.js, Firebase, and REST APIs to support core platform workflows.",
          "Collaborated with the team on feature planning, UI improvements, debugging, and production enhancements.",
          "Delivered multiple proof-of-concepts and scalable modules to accelerate product development in an early-stage startup environment.",
          "Gained hands-on experience working across the full software lifecycle — from development to deployment.",
        ]),
        skills: "React Native, Next.js, Node.js, Firebase, Docker, REST APIs",
        order: 2,
      },
      {
        role: "Full Stack Developer",
        company: "SystemOnSilicon",
        location: "Austin, Texas, United States · Remote",
        period: "Jan 2023 - Jun 2023",
        description: "Developed cross-platform mobile and web applications with Angular/Ionic and constructed scalable REST APIs using LoopBack and Node.js.",
        achievements: JSON.stringify([
          "Contributed to the development of cross-platform applications using Angular and Ionic, delivering responsive and user-friendly interfaces.",
          "Built backend services and REST APIs using the LoopBack framework, supporting scalable application workflows.",
          "Integrated frontend and backend components to ensure smooth data flow and reliable functionality.",
          "Assisted in debugging, optimizing performance, and improving overall application stability.",
          "Collaborated with the development team to deliver project modules within defined timelines.",
        ]),
        skills: "Angular, Ionic, Node.js, Express.js, LoopBack, REST APIs",
        order: 3,
      },
    ]

    for (const exp of defaultExps) {
      await saveExperienceAction(exp)
    }
    showStatus("Default experiences seeded successfully!", "success")
    router.refresh()
  }

  const handleSeedDefaultSkills = async () => {
    const defaultCats = [
      {
        category: "Frontend & UI",
        skills: JSON.stringify([
          { name: "React 19 & Next.js (App Router)", level: "Expert" },
          { name: "TypeScript", level: "Expert" },
          { name: "Tailwind CSS v4 & shadcn/ui", level: "Expert" },
          { name: "State Machines & TanStack Query", level: "Advanced" },
          { name: "Web Vitals & Performance Tuning", level: "Expert" },
        ]),
        order: 1,
      },
      {
        category: "Backend & Systems",
        skills: JSON.stringify([
          { name: "Node.js & Bun", level: "Expert" },
          { name: "Go & Python", level: "Advanced" },
          { name: "PostgreSQL & Prisma / Drizzle", level: "Expert" },
          { name: "Redis & Distributed Caching", level: "Advanced" },
          { name: "REST, GraphQL & gRPC", level: "Advanced" },
        ]),
        order: 2,
      },
      {
        category: "Cloud & DevOps",
        skills: JSON.stringify([
          { name: "Docker & Kubernetes", level: "Advanced" },
          { name: "AWS (ECS, Lambda, S3, CloudFront)", level: "Advanced" },
          { name: "CI/CD (GitHub Actions)", level: "Expert" },
          { name: "Terraform & IaC", level: "Proficient" },
          { name: "Monitoring (Prometheus & OpenTelemetry)", level: "Advanced" },
        ]),
        order: 3,
      },
      {
        category: "AI & Data Engineering",
        skills: JSON.stringify([
          { name: "LangChain & LlamaIndex", level: "Advanced" },
          { name: "Vector Databases (pgvector, Pinecone)", level: "Advanced" },
          { name: "Agentic Tool Calling & Function Execution", level: "Expert" },
          { name: "Local Models (Ollama, vLLM)", level: "Proficient" },
        ]),
        order: 4,
      },
    ]

    for (const cat of defaultCats) {
      await saveSkillCategoryAction(cat)
    }
    showStatus("Default skills seeded successfully!", "success")
    router.refresh()
  }

  const handleStartCreateExp = () => {
    setEditingExpId(null)
    setExpForm({
      id: "",
      role: "",
      company: "",
      location: "Bengaluru (Hybrid)",
      period: "2024 - Present",
      description: "",
      achievements: "Architected high-throughput services\nReduced latency and operational costs",
      skills: "Next.js, TypeScript, Go",
      order: experiences.length + 1,
    })
    setIsEditingExp(true)
  }

  const handleStartEditExp = (exp: ExperienceRecord) => {
    setEditingExpId(exp.id)
    let formattedAchievements = exp.achievements
    try {
      const parsed = JSON.parse(exp.achievements)
      if (Array.isArray(parsed)) {
        formattedAchievements = parsed.join("\n")
      }
    } catch {
      // already text
    }

    setExpForm({
      id: exp.id,
      role: exp.role,
      company: exp.company,
      location: exp.location,
      period: exp.period,
      description: exp.description,
      achievements: formattedAchievements,
      skills: exp.skills,
      order: exp.order,
    })
    setIsEditingExp(true)
  }

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingExp(true)
    const res = await saveExperienceAction(expForm)
    setIsSavingExp(false)
    if (res.success) {
      showStatus(res.message, "success")
      setIsEditingExp(false)
      setEditingExpId(null)
      router.refresh()
    } else {
      showStatus(res.message, "error")
    }
  }

  const handleDeleteExp = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience record?")) return
    const res = await deleteExperienceAction(id)
    if (res.success) {
      setExperiences(experiences.filter((e) => e.id !== id))
      showStatus("Experience deleted.", "success")
      router.refresh()
    } else {
      showStatus(res.message, "error")
    }
  }

  // Skill Categories State
  const [skillCategories, setSkillCategories] = React.useState<SkillCategoryRecord[]>(() => {
    if (initialSkillCategories && initialSkillCategories.length > 0) return initialSkillCategories
    return DEFAULT_SKILL_CATEGORIES
  })
  const [isEditingSkillCat, setIsEditingSkillCat] = React.useState(false)
  const [editingSkillCatId, setEditingSkillCatId] = React.useState<string | null>(null)
  const [skillCatForm, setSkillCatForm] = React.useState({
    id: "",
    category: "",
    skills: "",
    order: 0,
  })
  const [isSavingSkillCat, setIsSavingSkillCat] = React.useState(false)

  const handleStartCreateSkillCat = () => {
    setEditingSkillCatId(null)
    setSkillCatForm({
      id: "",
      category: "",
      skills: "React 19 & Next.js: Expert\nTypeScript: Expert\nTailwind CSS: Advanced",
      order: skillCategories.length + 1,
    })
    setIsEditingSkillCat(true)
  }

  const handleStartEditSkillCat = (cat: SkillCategoryRecord) => {
    setEditingSkillCatId(cat.id)
    let formattedSkills = cat.skills
    try {
      const parsed = JSON.parse(cat.skills)
      if (Array.isArray(parsed)) {
        formattedSkills = parsed
          .map((s: { name: string; level: string }) => `${s.name}: ${s.level}`)
          .join("\n")
      }
    } catch {
      // already text
    }

    setSkillCatForm({
      id: cat.id,
      category: cat.category,
      skills: formattedSkills,
      order: cat.order,
    })
    setIsEditingSkillCat(true)
  }

  const handleSaveSkillCat = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingSkillCat(true)
    const res = await saveSkillCategoryAction(skillCatForm)
    setIsSavingSkillCat(false)
    if (res.success) {
      showStatus(res.message, "success")
      setIsEditingSkillCat(false)
      setEditingSkillCatId(null)
      router.refresh()
    } else {
      showStatus(res.message, "error")
    }
  }

  const handleDeleteSkillCat = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill category?")) return
    const res = await deleteSkillCategoryAction(id)
    if (res.success) {
      setSkillCategories(skillCategories.filter((c) => c.id !== id))
      showStatus("Skill category deleted.", "success")
      router.refresh()
    } else {
      showStatus(res.message, "error")
    }
  }

  // About Page State
  const [aboutForm, setAboutForm] = React.useState<AboutRecord>(() => {
    const base: AboutRecord = {
      name: "Tanmay Vaij",
      headline: "Hi, I'm Tanmay Vaij.",
      subheadline: "Full Stack AI Engineer · Pune",
      heroTitle: "Building scalable web systems, thoughtful products, and",
      heroHighlight: "curating workspace gear.",
      heroSubtitle:
        "Hello, I'm **Tanmay Vaij** — a software engineer and tech creator based in Bengaluru. Here I document engineering field guides, share open-source platforms, and review ergonomic desk setups, audio gear, and books.",
      bioIntro: "I am a Senior Stack AI Engineer with a passion for designing scalable web architectures, bulletproof APIs, and autonomous AI agents.",
      bioParagraph1: "I’m a Software Engineer at IntellAxis AI, focused on building scalable backend systems and AI-driven applications. I enjoy working across the full development lifecycle — from designing clean architectures and APIs to deploying reliable cloud-based solutions.",
      bioParagraph2: "My core expertise includes: Cross-platform development, Backend engineering: FastAPI, Cloud & infrastructure.I’m passionate about developing efficient, maintainable software and contributing to products that create real-world impact.",
      location: "Pune, India",
      email: "tanmayvaij22@gmail.com",
      websiteUrl: "https://www.tanmayvaij.dev/",
      address: "Katraj, Pune",
      contactHeading: "Let's Discuss Your Architecture",
      contactDescription:
        "Whether you have a technical question about an article, want to collaborate on open-source, or need senior systems expertise, my inbox is open.",
      contactTitle: "Contact Information",
      contactSubtitle: "Reach out directly for freelance contracts, consulting, or technical inquiries.",
      responseTime: "Typically within 24 business hours",
      specialization: "Cross Platform Development & Cloud",
      status: "Available",
      experienceYears: "5+ Years",
      languages: "TypeScript, Python, SQL",
      githubUrl: "https://github.com/tanmayvaij",
      linkedinUrl: "https://www.linkedin.com/in/tanmayvaij/",
      degreeTitle: "Master of Computer Applications",
      degreePeriod: "2024 - 2026",
      degreeDesc: "First Class with Distinction · Cloud Computing",
      certTitle: "Meta certified React Native Developer",
      certBadge: "Certified",
      certDesc: "Meta",
      experiencesJson: "",
    }
    if (!initialAbout) return base
    return {
      ...base,
      ...initialAbout,
      name: initialAbout.name || base.name,
      email: initialAbout.email || base.email,
      websiteUrl: initialAbout.websiteUrl || base.websiteUrl,
      address: initialAbout.address || base.address,
      contactHeading: initialAbout.contactHeading || base.contactHeading,
      contactDescription: initialAbout.contactDescription || base.contactDescription,
      contactTitle: initialAbout.contactTitle || base.contactTitle,
      contactSubtitle: initialAbout.contactSubtitle || base.contactSubtitle,
      responseTime: initialAbout.responseTime || base.responseTime,
      heroTitle: initialAbout.heroTitle || base.heroTitle,
      heroHighlight: initialAbout.heroHighlight || base.heroHighlight,
      heroSubtitle: initialAbout.heroSubtitle || base.heroSubtitle,
    }
  })
  const [isSavingAbout, setIsSavingAbout] = React.useState(false)

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingAbout(true)
    const res = await saveAboutAction(aboutForm)
    setIsSavingAbout(false)
    if (res.success) {
      showStatus(res.message, "success")
      router.refresh()
    } else {
      showStatus(res.message, "error")
    }
  }

  // Posts State
  const [posts, setPosts] = React.useState<PostRecord[]>(initialPosts)
  const [postSearch, setPostSearch] = React.useState("")
  const [editingPost, setEditingPost] = React.useState<PostRecord | null>(null)
  const [isCreatingPost, setIsCreatingPost] = React.useState(false)
  const [postForm, setPostForm] = React.useState({
    id: "",
    title: "",
    slug: "",
    category: "Architecture",
    tags: "Next.js, TypeScript",
    excerpt: "",
    content: "",
    notes: "",
    coverImage: "",
    readTime: "8 min read",
    published: true,
  })

  // Projects State
  const [projects, setProjects] = React.useState<ProjectRecord[]>(initialProjects)
  const [editingProject, setEditingProject] = React.useState<ProjectRecord | null>(null)
  const [isCreatingProject, setIsCreatingProject] = React.useState(false)

  React.useEffect(() => {
    setProjects(initialProjects)
  }, [initialProjects])
  const [projectForm, setProjectForm] = React.useState({
    id: "",
    title: "",
    slug: "",
    category: "AI & Systems",
    tags: "TypeScript, Next.js",
    description: "",
    longDescription: "",
    notes: "",
    featuredImage: "",
    screenshots: "",
    metrics: "1,000+ Stars",
    highlights: "Sandboxed tool execution\nDeterministic DAG state engine",
    featured: true,
    published: true,
    showGithub: true,
    githubUrl: "",
    liveUrl: "https://tanmayvaij.dev",
  })

  // Affiliates State
  const [affiliates, setAffiliates] = React.useState<AffiliateRecord[]>(initialAffiliates)
  const [editingAffiliate, setEditingAffiliate] = React.useState<AffiliateRecord | null>(null)
  const [isCreatingAffiliate, setIsCreatingAffiliate] = React.useState(false)
  const [affiliateForm, setAffiliateForm] = React.useState({
    id: "",
    name: "",
    slug: "",
    category: "Desk Setup & Ergonomics",
    description: "",
    notes: "",
    badge: "Amazon's Choice",
    affiliateUrl: "https://www.amazon.com/dp/...?tag=tanmayvaij-20",
    discountCode: "",
    price: "$99.00",
    rating: "4.8",
    imageUrl: "",
    merchant: "Amazon",
    featured: true,
  })

  // Messages State
  const [messages, setMessages] = React.useState<MessageRecord[]>(initialMessages)
  const [loading, setLoading] = React.useState(false)

  const showStatus = (text: string, type: "success" | "error" = "success") => {
    setStatusMessage({ text, type })
    setTimeout(() => setStatusMessage(null), 3500)
  }

  const handleLogout = async () => {
    await logoutAdmin()
    router.refresh()
  }

  // Post Handlers
  const handleStartCreatePost = () => {
    setEditingPost(null)
    setPostForm({
      id: "",
      title: "",
      slug: "",
      category: "Architecture",
      tags: "Next.js, React, Performance",
      excerpt: "",
      content: "## Overview\n\nWrite your technical article here...",
      notes: "",
      coverImage: "",
      readTime: "7 min read",
      published: true,
    })
    setIsCreatingPost(true)
  }

  const handleStartEditPost = (post: PostRecord) => {
    setIsCreatingPost(false)
    setEditingPost(post)
    setPostForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      category: post.category,
      tags: post.tags,
      excerpt: post.excerpt,
      content: post.content,
      notes: post.notes || "",
      coverImage: post.coverImage || "",
      readTime: post.readTime,
      published: post.published,
    })
  }

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await savePostAction({
      id: postForm.id || undefined,
      title: postForm.title,
      slug: postForm.slug || postForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: postForm.category,
      tags: postForm.tags,
      excerpt: postForm.excerpt,
      content: postForm.content,
      notes: postForm.notes || undefined,
      coverImage: postForm.coverImage || undefined,
      readTime: postForm.readTime,
      published: postForm.published,
    })

    setLoading(false)
    if (res.success) {
      showStatus(res.message, "success")
      setIsCreatingPost(false)
      setEditingPost(null)
      router.refresh()
    } else {
      showStatus(res.message, "error")
    }
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return
    const res = await deletePostAction(id)
    if (res.success) {
      setPosts(posts.filter((p) => p.id !== id))
      showStatus("Article deleted.")
    } else {
      showStatus(res.message, "error")
    }
  }

  const handleTogglePostPublished = async (post: PostRecord) => {
    const nextPublished = !post.published
    // Optimistic UI update
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, published: nextPublished } : p))
    )
    if (editingPost && editingPost.id === post.id) {
      setEditingPost({ ...editingPost, published: nextPublished })
      setPostForm((prev) => ({ ...prev, published: nextPublished }))
    }

    const res = await togglePostPublishedAction(post.id, nextPublished)
    if (res.success) {
      showStatus(res.message, "success")
    } else {
      // Revert optimistic update
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, published: post.published } : p))
      )
      showStatus(res.message, "error")
    }
  }

  // Project Handlers
  const handleStartCreateProject = () => {
    setEditingProject(null)
    setProjectForm({
      id: "",
      title: "",
      slug: "",
      category: "AI & Systems",
      tags: "TypeScript, Go",
      description: "",
      longDescription: "",
      notes: "",
      featuredImage: "",
      screenshots: "",
      metrics: "",
      highlights: "High throughput architecture\nFault tolerant",
      featured: true,
      published: true,
      showGithub: true,
      githubUrl: "",
      liveUrl: "",
    })
    setIsCreatingProject(true)
  }

  const handleStartEditProject = (project: ProjectRecord) => {
    setIsCreatingProject(false)
    setEditingProject(project)
    let parsedHighlights = ""
    try {
      parsedHighlights = (JSON.parse(project.highlights) as string[]).join("\n")
    } catch {
      parsedHighlights = project.highlights
    }

    setProjectForm({
      id: project.id,
      title: project.title,
      slug: project.slug,
      category: project.category,
      tags: project.tags,
      description: project.description,
      longDescription: project.longDescription,
      notes: project.notes || "",
      featuredImage: project.featuredImage || "",
      screenshots: project.screenshots || "",
      metrics: project.metrics || "",
      highlights: parsedHighlights,
      featured: project.featured,
      published: project.published !== false,
      showGithub: project.showGithub === false ? false : true,
      githubUrl: project.githubUrl || "",
      liveUrl: project.liveUrl || "",
    })
  }

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const highlightsArr = projectForm.highlights
      .split("\n")
      .map((h) => h.trim())
      .filter(Boolean)

    const res = await saveProjectAction({
      id: projectForm.id || undefined,
      title: projectForm.title,
      slug: projectForm.slug || projectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: projectForm.category,
      tags: projectForm.tags,
      description: projectForm.description,
      longDescription: projectForm.longDescription,
      notes: projectForm.notes || undefined,
      featuredImage: projectForm.featuredImage || undefined,
      screenshots: projectForm.screenshots || undefined,
      metrics: projectForm.metrics || undefined,
      highlights: highlightsArr,
      featured: projectForm.featured,
      published: projectForm.published,
      showGithub: projectForm.showGithub,
      githubUrl: projectForm.githubUrl || undefined,
      liveUrl: projectForm.liveUrl || undefined,
    })

    setLoading(false)
    if (res.success) {
      showStatus(res.message, "success")
      setIsCreatingProject(false)
      setEditingProject(null)

      const savedSlug = projectForm.slug || projectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      const updatedItem: ProjectRecord = {
        id: projectForm.id || res.id || `proj-${Date.now()}`,
        title: projectForm.title,
        slug: savedSlug,
        category: projectForm.category,
        tags: projectForm.tags,
        description: projectForm.description,
        longDescription: projectForm.longDescription,
        featuredImage: projectForm.featuredImage || null,
        screenshots: projectForm.screenshots || null,
        metrics: projectForm.metrics || null,
        highlights: JSON.stringify(highlightsArr),
        featured: projectForm.featured,
        published: projectForm.published,
        showGithub: projectForm.showGithub,
        githubUrl: projectForm.githubUrl || null,
        liveUrl: projectForm.liveUrl || null,
      }

      setProjects((prev) => {
        const idx = prev.findIndex((p) => (projectForm.id && p.id === projectForm.id) || p.slug === savedSlug)
        if (idx >= 0) {
          const next = [...prev]
          next[idx] = updatedItem
          return next
        }
        return [updatedItem, ...prev]
      })

      router.refresh()
    } else {
      showStatus(res.message, "error")
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    const res = await deleteProjectAction(id)
    if (res.success) {
      setProjects(projects.filter((p) => p.id !== id))
      showStatus("Project deleted.")
    } else {
      showStatus(res.message, "error")
    }
  }

  const handleToggleProjectPublished = async (project: ProjectRecord) => {
    const nextPublished = project.published === false ? true : false
    // Optimistic UI update
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, published: nextPublished } : p))
    )
    if (editingProject && editingProject.id === project.id) {
      setEditingProject({ ...editingProject, published: nextPublished })
      setProjectForm((prev) => ({ ...prev, published: nextPublished }))
    }

    const res = await toggleProjectPublishedAction(project.id, nextPublished)
    if (res.success) {
      showStatus(res.message, "success")
    } else {
      // Revert optimistic update
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? { ...p, published: project.published } : p))
      )
      showStatus(res.message, "error")
    }
  }

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Delete this contact message?")) return
    const res = await deleteMessageAction(id)
    if (res.success) {
      setMessages(messages.filter((m) => m.id !== id))
      showStatus("Message deleted.")
    } else {
      showStatus(res.message, "error")
    }
  }

  // Affiliate Handlers
  const handleStartCreateAffiliate = () => {
    setEditingAffiliate(null)
    setAffiliateForm({
      id: "",
      name: "",
      slug: "",
      category: "Desk Setup & Ergonomics",
      description: "",
      notes: "",
      badge: "Amazon's Choice",
      affiliateUrl: "https://www.amazon.com/dp/...?tag=tanmayvaij-20",
      discountCode: "",
      price: "$99.00",
      rating: "4.8",
      imageUrl: "",
      merchant: "Amazon",
      featured: true,
    })
    setIsCreatingAffiliate(true)
  }

  const handleStartEditAffiliate = (tool: AffiliateRecord) => {
    setIsCreatingAffiliate(false)
    setEditingAffiliate(tool)
    setAffiliateForm({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      category: tool.category,
      description: tool.description,
      notes: tool.notes || "",
      badge: tool.badge || "",
      affiliateUrl: tool.affiliateUrl,
      discountCode: tool.discountCode || "",
      price: tool.price || "",
      rating: tool.rating ? String(tool.rating) : "4.8",
      imageUrl: tool.imageUrl || "",
      merchant: tool.merchant || "Amazon",
      featured: tool.featured,
    })
  }

  const handleSaveAffiliate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await saveAffiliateAction({
      id: affiliateForm.id || undefined,
      name: affiliateForm.name,
      slug: affiliateForm.slug || affiliateForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: affiliateForm.category,
      description: affiliateForm.description,
      notes: affiliateForm.notes || undefined,
      badge: affiliateForm.badge || undefined,
      affiliateUrl: affiliateForm.affiliateUrl,
      discountCode: affiliateForm.discountCode || undefined,
      price: affiliateForm.price || undefined,
      rating: affiliateForm.rating ? parseFloat(affiliateForm.rating) : undefined,
      imageUrl: affiliateForm.imageUrl || undefined,
      merchant: affiliateForm.merchant || "Amazon",
      featured: affiliateForm.featured,
    })

    setLoading(false)
    if (res.success) {
      showStatus(res.message, "success")
      setIsCreatingAffiliate(false)
      setEditingAffiliate(null)
      router.refresh()
    } else {
      showStatus(res.message, "error")
    }
  }

  const handleDeleteAffiliate = async (id: string) => {
    if (!confirm("Delete this affiliate tool?")) return
    const res = await deleteAffiliateAction(id)
    if (res.success) {
      setAffiliates(affiliates.filter((a) => a.id !== id))
      showStatus("Affiliate tool deleted.")
    } else {
      showStatus(res.message, "error")
    }
  }

  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.slug.toLowerCase().includes(postSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(postSearch.toLowerCase())
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
              Portfolio & Blog Admin Portal
            </h1>
            <Badge variant="success" className="text-[10px]">
              SQLite Live
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage your content, database records, and reader inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="text-xs h-8">
            <Link href="/" target="_blank">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              View Live Site
            </Link>
          </Button>

          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-xs h-8 text-destructive hover:bg-destructive/10">
            <LogOut className="mr-1.5 h-3.5 w-3.5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Status Alert Toast */}
      {statusMessage && (
        <div
          className={`flex items-center justify-between rounded-lg p-3 text-xs border ${
            statusMessage.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
              : "bg-destructive/10 border-destructive/20 text-destructive"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? (
              <CheckCircle className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-[10px] underline ml-2">
            Dismiss
          </button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <Card className="bg-card">
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-xs flex items-center justify-between">
              <span>Articles</span>
              <FileText className="h-3.5 w-3.5 text-primary" />
            </CardDescription>
            <CardTitle className="text-2xl">{posts.length}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-[11px] text-muted-foreground">
            {posts.filter((p) => p.published).length} published · {posts.filter((p) => !p.published).length} drafts
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-xs flex items-center justify-between">
              <span>Projects</span>
              <Briefcase className="h-3.5 w-3.5 text-primary" />
            </CardDescription>
            <CardTitle className="text-2xl">{projects.length}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-[11px] text-muted-foreground">
            {projects.filter((p) => p.featured).length} featured case studies
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-xs flex items-center justify-between">
              <span>Affiliates</span>
              <Wrench className="h-3.5 w-3.5 text-primary" />
            </CardDescription>
            <CardTitle className="text-2xl">{affiliates.length}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-[11px] text-muted-foreground">
            {affiliates.filter((a) => a.featured).length} featured partners
          </CardContent>
        </Card>

        <Card className="bg-card">
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-xs flex items-center justify-between">
              <span>Inquiries</span>
              <Mail className="h-3.5 w-3.5 text-primary" />
            </CardDescription>
            <CardTitle className="text-2xl">{messages.length}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-[11px] text-muted-foreground">
            From contact form submissions
          </CardContent>
        </Card>

        <Card className="bg-card col-span-2 sm:col-span-1">
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-xs flex items-center justify-between">
              <span>AdSense Readiness</span>
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            </CardDescription>
            <CardTitle className="text-base text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              Compliant
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 text-[11px] text-muted-foreground">
            Privacy policy & ads.txt verified
          </CardContent>
        </Card>
      </div>

      {/* Tabs Layout */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted p-1">
          <TabsTrigger value="posts" className="text-xs gap-1.5">
            <FileText className="h-3.5 w-3.5" />
            Articles ({posts.length})
          </TabsTrigger>
          <TabsTrigger value="projects" className="text-xs gap-1.5">
            <Briefcase className="h-3.5 w-3.5" />
            Projects ({projects.length})
          </TabsTrigger>
          <TabsTrigger value="affiliates" className="text-xs gap-1.5">
            <Wrench className="h-3.5 w-3.5" />
            Affiliates ({affiliates.length})
          </TabsTrigger>
          <TabsTrigger value="messages" className="text-xs gap-1.5">
            <Mail className="h-3.5 w-3.5" />
            Inquiries ({messages.length})
          </TabsTrigger>
          <TabsTrigger value="about" className="text-xs gap-1.5">
            <User className="h-3.5 w-3.5" />
            Homepage & Profile
          </TabsTrigger>
          <TabsTrigger value="adsense" className="text-xs gap-1.5">
            <TrendingUp className="h-3.5 w-3.5" />
            AdSense & SEO
          </TabsTrigger>
        </TabsList>

        {/* POSTS TAB */}
        <TabsContent value="posts" className="space-y-6">
          {/* Create / Edit Post Editor Form */}
          {(isCreatingPost || editingPost) ? (
            <Card className="bg-card border-primary/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {isCreatingPost ? "Create New Technical Article" : `Edit Article: ${postForm.title}`}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsCreatingPost(false)
                      setEditingPost(null)
                    }}
                    className="text-xs h-7"
                  >
                    Cancel
                  </Button>
                </div>
                <CardDescription className="text-xs">
                  Articles are automatically parsed and formatted into responsive markdown elements.
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSavePost}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Title</label>
                      <Input
                        required
                        placeholder="Article title..."
                        value={postForm.title}
                        onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">URL Slug</label>
                      <Input
                        placeholder="article-url-slug (auto-generated if empty)"
                        value={postForm.slug}
                        onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Category</label>
                      <select
                        value={postForm.category}
                        onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="Architecture">Architecture</option>
                        <option value="Next.js">Next.js</option>
                        <option value="AI & Systems">AI & Systems</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Performance">Performance</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Tags (comma-separated)</label>
                      <Input
                        placeholder="Next.js, TypeScript, Caching"
                        value={postForm.tags}
                        onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Read Time</label>
                      <Input
                        placeholder="8 min read"
                        value={postForm.readTime}
                        onChange={(e) => setPostForm({ ...postForm, readTime: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Excerpt / Summary</label>
                    <Textarea
                      required
                      rows={2}
                      placeholder="Brief excerpt displayed on blog list and OpenGraph cards..."
                      value={postForm.excerpt}
                      onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Featured / Cover Image</label>
                    <ImageUploader
                      label="Post Cover Image"
                      value={postForm.coverImage}
                      onChange={(url) => setPostForm({ ...postForm, coverImage: url })}
                      folder="blogs/featured"
                      description="Drag & drop or click to upload cover image for the article header."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <RichTextEditor
                      label="Article Content & Product Ad Builder"
                      value={postForm.content}
                      onChange={(val) => setPostForm({ ...postForm, content: val })}
                      placeholder="Write your article markdown here... Use the toolbar above to style headings, insert code blocks, tables, and product ad cards."
                      availableAffiliates={affiliates}
                      minHeight="440px"
                    />
                  </div>

                  {/* Private Admin Notes */}
                  <div className="space-y-2 p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5 text-amber-500" />
                        <label className="text-xs font-semibold text-foreground">Private Admin Notes</label>
                        <Badge variant="outline" className="text-[10px] py-0 border-amber-500/40 text-amber-600 dark:text-amber-400 font-medium">
                          Admin Only • Never Public
                        </Badge>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      These notes are strictly private to you. Use this for SEO targets, revision reminders, upcoming edits, or private tracking. Never displayed on the public site or API.
                    </p>
                    <Textarea
                      rows={3}
                      placeholder="e.g. Target keywords: Next.js 16, Distributed Caching. Needs diagram update in v2. Follow-up review scheduled for..."
                      value={postForm.notes}
                      onChange={(e) => setPostForm({ ...postForm, notes: e.target.value })}
                      className="bg-card text-xs font-mono leading-relaxed"
                    />
                  </div>

                  {/* Post Visibility Toggle */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-card/60 shadow-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground">Make Post Public</span>
                        <Badge
                          variant={postForm.published ? "success" : "outline"}
                          className={`text-[10px] py-0 ${!postForm.published ? "text-muted-foreground" : ""}`}
                        >
                          {postForm.published ? "Public (Live)" : "Draft (Hidden)"}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {postForm.published
                          ? "This article is live and visible to all visitors on the blog and homepage."
                          : "This article is kept private as a draft and hidden from public visitors."}
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={postForm.published}
                      onClick={() => setPostForm({ ...postForm, published: !postForm.published })}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                        postForm.published ? "bg-emerald-500" : "bg-muted-foreground/30"
                      }`}
                      title={postForm.published ? "Click to switch to Draft" : "Click to make Public"}
                    >
                      <span className="sr-only">Make post public</span>
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          postForm.published ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t border-border/60 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsCreatingPost(false)
                      setEditingPost(null)
                    }}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} size="sm" className="text-xs">
                    {loading ? "Saving article..." : "Save Article"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={postSearch}
                    onChange={(e) => setPostSearch(e.target.value)}
                    className="pl-8 h-8 text-xs"
                  />
                </div>

                <Button size="sm" onClick={handleStartCreatePost} className="text-xs h-8 gap-1.5 self-start sm:self-auto">
                  <Plus className="h-3.5 w-3.5" />
                  Write New Article
                </Button>
              </div>

              <div className="divide-y divide-border rounded-xl border border-border bg-card">
                {filteredPosts.length === 0 ? (
                  <div className="p-8 text-center text-xs text-muted-foreground">
                    No articles found matching your search.
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <div key={post.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {post.coverImage ? (
                          <div className="w-24 sm:w-32 aspect-video rounded-lg overflow-hidden border border-border bg-muted/40 shrink-0 flex items-center justify-center">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-24 sm:w-32 aspect-video rounded-lg border border-dashed border-border/80 bg-muted/30 shrink-0 flex items-center justify-center text-muted-foreground/40" title="No cover image uploaded">
                            <ImageIcon className="h-4 w-4" />
                          </div>
                        )}
                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm text-foreground">{post.title}</span>
                            {post.published ? (
                              <Badge variant="success" className="text-[10px] py-0">Published</Badge>
                            ) : (
                              <Badge variant="outline" className="text-[10px] py-0 text-muted-foreground">Draft</Badge>
                            )}
                            <Badge variant="secondary" className="text-[10px] py-0">{post.category}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">{post.excerpt}</p>
                          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                            <code>/blog/{post.slug}</code>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                          {post.notes && (
                            <div className="flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md max-w-fit mt-1">
                              <Lock className="h-3 w-3 shrink-0" />
                              <span className="font-semibold">Private Note:</span>
                              <span className="truncate max-w-xs sm:max-w-md">{post.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        {/* Instant 1-Click Public / Draft Toggle */}
                        <button
                          type="button"
                          role="switch"
                          aria-checked={post.published}
                          onClick={() => handleTogglePostPublished(post)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border cursor-pointer select-none ${
                            post.published
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                              : "bg-muted text-muted-foreground border-border hover:bg-muted/80 hover:text-foreground"
                          }`}
                          title={post.published ? "Public (Live) - Click to unpublish to Draft" : "Draft (Hidden) - Click to make Public"}
                        >
                          <span
                            className={`h-2 w-2 rounded-full transition-colors ${
                              post.published ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/50"
                            }`}
                          />
                          <span>{post.published ? "Public" : "Draft"}</span>
                        </button>

                        <Button asChild variant="ghost" size="icon-sm" title="Preview Live Post">
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleStartEditPost(post)}
                          title="Edit Article"
                        >
                          <Edit3 className="h-3.5 w-3.5 text-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => handleDeletePost(post.id)}
                          className="hover:text-destructive hover:bg-destructive/10"
                          title="Delete Article"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </TabsContent>

        {/* PROJECTS TAB */}
        <TabsContent value="projects" className="space-y-6">
          {(isCreatingProject || editingProject) ? (
            <Card className="bg-card border-primary/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {isCreatingProject ? "Create New Engineering Project" : `Edit Project: ${projectForm.title}`}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsCreatingProject(false)
                      setEditingProject(null)
                    }}
                    className="text-xs h-7"
                  >
                    Cancel
                  </Button>
                </div>
              </CardHeader>

              <form onSubmit={handleSaveProject}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Project Title</label>
                      <Input
                        required
                        placeholder="AgentFlow Framework..."
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Project ID / Slug</label>
                      <Input
                        placeholder="project-slug"
                        value={projectForm.slug}
                        onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Category</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="AI & Systems">AI & Systems</option>
                        <option value="Web App">Web App</option>
                        <option value="DevOps & Cloud">DevOps & Cloud</option>
                        <option value="Open Source">Open Source</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Tags (comma-separated)</label>
                      <Input
                        placeholder="TypeScript, Next.js, Docker"
                        value={projectForm.tags}
                        onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Metrics / Badge</label>
                      <Input
                        placeholder="1.2k Stars · 40M Events/Day"
                        value={projectForm.metrics}
                        onChange={(e) => setProjectForm({ ...projectForm, metrics: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Short Description</label>
                    <Input
                      required
                      placeholder="One line summary for portfolio cards..."
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Featured / Cover Image</label>
                    <ImageUploader
                      label=""
                      value={projectForm.featuredImage}
                      onChange={(url) => setProjectForm({ ...projectForm, featuredImage: url })}
                      folder="projects/featured"
                      description="Drag & drop or click to upload your project cover image."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <RichTextEditor
                      label="Architectural Breakdown & System Design"
                      value={projectForm.longDescription}
                      onChange={(val) => setProjectForm({ ...projectForm, longDescription: val })}
                      placeholder="Detailed architectural breakdown, system topologies, benchmarks..."
                      minHeight="220px"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Key Architecture Highlights (1 per line)</label>
                    <Textarea
                      rows={4}
                      placeholder="Sandboxed Python tool execution\nClickHouse columnar engine\nSub-50ms p99 latency"
                      value={projectForm.highlights}
                      onChange={(e) => setProjectForm({ ...projectForm, highlights: e.target.value })}
                    />
                  </div>

                  <ScreenshotSlots
                    value={projectForm.screenshots || ""}
                    onChange={(val) => setProjectForm({ ...projectForm, screenshots: val })}
                    maxSlots={4}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-semibold text-foreground">GitHub Repo URL</label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-muted-foreground hover:text-foreground select-none">
                          <input
                            type="checkbox"
                            checked={projectForm.showGithub}
                            onChange={(e) => setProjectForm({ ...projectForm, showGithub: e.target.checked })}
                            className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-primary"
                          />
                          <span>Show GitHub link</span>
                        </label>
                      </div>
                      <Input
                        placeholder="https://github.com/tanmayvaij/project"
                        value={projectForm.githubUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                        disabled={!projectForm.showGithub}
                        className={!projectForm.showGithub ? "opacity-60 bg-muted/30" : ""}
                      />
                      {!projectForm.showGithub && (
                        <p className="text-[10px] text-amber-600 dark:text-amber-400">
                          GitHub link will be hidden on portfolio cards and case study page.
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Live URL</label>
                      <Input
                        placeholder="https://project.dev"
                        value={projectForm.liveUrl}
                        onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Private Admin Notes */}
                  <div className="space-y-2 p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5 text-amber-500" />
                        <label className="text-xs font-semibold text-foreground">Private Admin Notes</label>
                        <Badge variant="outline" className="text-[10px] py-0 border-amber-500/40 text-amber-600 dark:text-amber-400 font-medium">
                          Admin Only • Never Public
                        </Badge>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Internal project roadmap notes, private repository URLs, architecture debt, or sprint milestones. Never displayed on the public portfolio.
                    </p>
                    <Textarea
                      rows={2}
                      placeholder="e.g. Next milestones: migrate auth layer to WebAuthn, profile Redis latency under 10k connections..."
                      value={projectForm.notes}
                      onChange={(e) => setProjectForm({ ...projectForm, notes: e.target.value })}
                      className="bg-card text-xs font-mono leading-relaxed"
                    />
                  </div>

                  {/* Project Visibility Toggle */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-border bg-card/60 shadow-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-foreground">Make Project Public</span>
                        <Badge
                          variant={projectForm.published ? "success" : "outline"}
                          className={`text-[10px] py-0 ${!projectForm.published ? "text-muted-foreground" : ""}`}
                        >
                          {projectForm.published ? "Public (Live)" : "Draft (Hidden)"}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        {projectForm.published
                          ? "This project is live and visible to all visitors on the projects page and portfolio."
                          : "This project is kept private as a draft and hidden from public visitors."}
                      </p>
                    </div>

                    <button
                      type="button"
                      role="switch"
                      aria-checked={projectForm.published}
                      onClick={() => setProjectForm({ ...projectForm, published: !projectForm.published })}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                        projectForm.published ? "bg-emerald-500" : "bg-muted-foreground/30"
                      }`}
                      title={projectForm.published ? "Click to switch to Draft" : "Click to make Public"}
                    >
                      <span className="sr-only">Make project public</span>
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          projectForm.published ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 pt-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="project-featured"
                        checked={projectForm.featured}
                        onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <label htmlFor="project-featured" className="text-xs font-medium text-foreground cursor-pointer select-none">
                        Featured on Homepage
                      </label>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t border-border/60 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsCreatingProject(false)
                      setEditingProject(null)
                    }}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} size="sm" className="text-xs">
                    {loading ? "Saving project..." : "Save Project"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button size="sm" onClick={handleStartCreateProject} className="text-xs h-8 gap-1.5">
                  <Plus className="h-3.5 w-3.5" />
                  Add New Project
                </Button>
              </div>

              <div className="divide-y divide-border rounded-xl border border-border bg-card">
                {projects.map((proj) => (
                  <div key={proj.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {proj.featuredImage ? (
                        <div className="w-24 sm:w-32 aspect-video rounded-lg overflow-hidden border border-border bg-muted/40 shrink-0 flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={proj.featuredImage}
                            alt={proj.title}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-24 sm:w-32 aspect-video rounded-lg border border-dashed border-border/80 bg-muted/30 shrink-0 flex items-center justify-center text-muted-foreground/40" title="No featured image uploaded">
                          <ImageIcon className="h-4 w-4" />
                        </div>
                      )}
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm text-foreground truncate">{proj.title}</span>
                          <Badge variant="secondary" className="text-[10px] py-0">{proj.category}</Badge>
                          {proj.featured && (
                            <Badge variant="outline" className="text-[10px] py-0 text-amber-600 dark:text-amber-400">Featured</Badge>
                          )}
                          {proj.metrics && (
                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                              {proj.metrics}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{proj.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {/* Instant 1-Click Public / Draft Toggle */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={proj.published !== false}
                        onClick={() => handleToggleProjectPublished(proj)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border cursor-pointer select-none ${
                          proj.published !== false
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                            : "bg-muted text-muted-foreground border-border hover:bg-muted/80 hover:text-foreground"
                        }`}
                        title={proj.published !== false ? "Public (Live) - Click to unpublish to Draft" : "Draft (Hidden) - Click to make Public"}
                      >
                        <span
                          className={`h-2 w-2 rounded-full transition-colors ${
                            proj.published !== false ? "bg-emerald-500 animate-pulse" : "bg-muted-foreground/50"
                          }`}
                        />
                        <span>{proj.published !== false ? "Public" : "Draft"}</span>
                      </button>

                      <Button asChild variant="ghost" size="icon-sm" title="Preview Live Project Case Study">
                        <Link href={`/projects/${proj.slug || proj.id}`} target="_blank">
                          <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                        </Link>
                      </Button>
                      {proj.liveUrl && (
                        <Button asChild variant="ghost" size="icon-sm" title="Open Live Demo">
                          <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleStartEditProject(proj)}
                        title="Edit Project"
                      >
                        <Edit3 className="h-3.5 w-3.5 text-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDeleteProject(proj.id)}
                        className="hover:text-destructive hover:bg-destructive/10"
                        title="Delete Project"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* AFFILIATES TAB */}
        <TabsContent value="affiliates" className="space-y-6">
          {/* Create / Edit Affiliate Form */}
          {(isCreatingAffiliate || editingAffiliate) ? (
            <Card className="bg-card border-primary/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {isCreatingAffiliate ? "Add New Affiliate Tool" : `Edit Tool: ${affiliateForm.name}`}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsCreatingAffiliate(false)
                      setEditingAffiliate(null)
                    }}
                    className="text-xs h-7"
                  >
                    Cancel
                  </Button>
                </div>
                <CardDescription className="text-xs">
                  Tools are rendered on the dedicated <Link href="/tools" target="_blank" className="underline text-primary">/tools</Link> page and embedded via callouts inside blog articles. Outbound links automatically carry AdSense/FTC-compliant <code className="bg-muted px-1 py-0.5 rounded font-mono">rel=&quot;sponsored nofollow&quot;</code>.
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSaveAffiliate}>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Tool Name</label>
                      <Input
                        required
                        placeholder="e.g. DigitalOcean, Cursor, Neon"
                        value={affiliateForm.name}
                        onChange={(e) => setAffiliateForm({ ...affiliateForm, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">URL Slug</label>
                      <Input
                        placeholder="e.g. digitalocean (auto-generated if empty)"
                        value={affiliateForm.slug}
                        onChange={(e) => setAffiliateForm({ ...affiliateForm, slug: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Category</label>
                      <select
                        value={affiliateForm.category}
                        onChange={(e) => setAffiliateForm({ ...affiliateForm, category: e.target.value })}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="Desk Setup & Ergonomics">Desk Setup & Ergonomics</option>
                        <option value="Audio & Tech Gadgets">Audio & Tech Gadgets</option>
                        <option value="Books & Reading">Books & Reading</option>
                        <option value="Cloud & Developer Tools">Cloud & Developer Tools</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Merchant / Store</label>
                      <select
                        value={affiliateForm.merchant}
                        onChange={(e) => setAffiliateForm({ ...affiliateForm, merchant: e.target.value })}
                        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                      >
                        <option value="Amazon">Amazon</option>
                        <option value="DigitalOcean">DigitalOcean</option>
                        <option value="Neon">Neon</option>
                        <option value="Cursor">Cursor</option>
                        <option value="Official Store">Official Store</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Price (Display)</label>
                      <Input
                        placeholder="e.g. $199.00 or Free Tier"
                        value={affiliateForm.price}
                        onChange={(e) => setAffiliateForm({ ...affiliateForm, price: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Rating (out of 5)</label>
                      <Input
                        placeholder="e.g. 4.8"
                        value={affiliateForm.rating}
                        onChange={(e) => setAffiliateForm({ ...affiliateForm, rating: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Badge / Perk</label>
                      <Input
                        placeholder="e.g. Amazon's Choice, 20% Off"
                        value={affiliateForm.badge}
                        onChange={(e) => setAffiliateForm({ ...affiliateForm, badge: e.target.value })}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Promo / Discount Code</label>
                      <Input
                        placeholder="Optional code e.g. TANMAY20"
                        value={affiliateForm.discountCode}
                        onChange={(e) => setAffiliateForm({ ...affiliateForm, discountCode: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Product Image</label>
                    <ImageUploader
                      label="Product Photo"
                      value={affiliateForm.imageUrl}
                      onChange={(url) => setAffiliateForm({ ...affiliateForm, imageUrl: url })}
                      folder="affiliates"
                      description="Drag & drop or click to upload product photo."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-foreground">Affiliate Tracking URL</label>
                    <Input
                      required
                      type="url"
                      placeholder="https://partner.example.com/?ref=your_affiliate_id"
                      value={affiliateForm.affiliateUrl}
                      onChange={(e) => setAffiliateForm({ ...affiliateForm, affiliateUrl: e.target.value })}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <RichTextEditor
                      label="Product Ad Copy / Review Description"
                      value={affiliateForm.description}
                      onChange={(val) => setAffiliateForm({ ...affiliateForm, description: val })}
                      placeholder="Explain key features, ergonomic benefits, why readers should buy this..."
                      minHeight="220px"
                      isAffiliateEditor={true}
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="affiliate-featured"
                      checked={affiliateForm.featured}
                      onChange={(e) => setAffiliateForm({ ...affiliateForm, featured: e.target.checked })}
                      className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                    />
                    <label htmlFor="affiliate-featured" className="text-xs font-medium cursor-pointer">
                      Featured Partner (displayed prominently in hero/top sections)
                    </label>
                  </div>

                  {/* Private Admin Notes */}
                  <div className="space-y-2 p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 mt-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Lock className="h-3.5 w-3.5 text-amber-500" />
                        <label className="text-xs font-semibold text-foreground">Private Admin Notes</label>
                        <Badge variant="outline" className="text-[10px] py-0 border-amber-500/40 text-amber-600 dark:text-amber-400 font-medium">
                          Admin Only • Never Public
                        </Badge>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Internal affiliate tracking notes, commission percentage, expiration dates, contact details, or partner terms. Never displayed on public tool pages.
                    </p>
                    <Textarea
                      rows={2}
                      placeholder="e.g. Affiliate payout: 8% on hardware sales. Contract renews on 2026-11-15. Contact: affiliate@partner.com..."
                      value={affiliateForm.notes}
                      onChange={(e) => setAffiliateForm({ ...affiliateForm, notes: e.target.value })}
                      className="bg-card text-xs font-mono leading-relaxed"
                    />
                  </div>
                </CardContent>

                <CardFooter className="flex justify-end gap-2 border-t border-border/40 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsCreatingAffiliate(false)
                      setEditingAffiliate(null)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" disabled={loading}>
                    {loading ? "Saving..." : isCreatingAffiliate ? "Create Affiliate Tool" : "Update Tool"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    Affiliate Stack & Partner Directory ({affiliates.length})
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Curated development tools with sponsored partner tracking links and FTC disclosures.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild variant="outline" size="sm" className="text-xs h-8">
                    <Link href="/tools" target="_blank">
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                      View /tools Page
                    </Link>
                  </Button>
                  <Button onClick={handleStartCreateAffiliate} size="sm" className="text-xs h-8">
                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                    New Affiliate Tool
                  </Button>
                </div>
              </div>

              {affiliates.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border p-12 text-center text-xs text-muted-foreground">
                  No affiliate tools added yet. Click &quot;New Affiliate Tool&quot; to add your first monetization partner.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {affiliates.map((tool) => (
                    <Card key={tool.id} className="bg-card flex flex-col justify-between">
                      <CardHeader className="p-4 pb-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-3 min-w-0">
                            {tool.imageUrl && (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={tool.imageUrl}
                                alt={tool.name}
                                className="w-12 h-12 rounded-md object-cover border border-border shrink-0 bg-muted"
                              />
                            )}
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold text-sm text-foreground">{tool.name}</span>
                                {tool.merchant && (
                                  <Badge variant="secondary" className="text-[9px] uppercase tracking-wider font-bold">
                                    {tool.merchant}
                                  </Badge>
                                )}
                                {tool.badge && (
                                  <Badge variant="outline" className="text-[10px]">
                                    {tool.badge}
                                  </Badge>
                                )}
                                {tool.featured && (
                                  <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                                <span>{tool.category}</span>
                                {tool.price && <span className="font-bold text-foreground">• {tool.price}</span>}
                                {tool.rating && <span className="text-amber-500 font-semibold">• ★ {tool.rating}</span>}
                              </div>
                              {tool.notes && (
                                <div className="flex items-center gap-1.5 text-[11px] text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md max-w-fit mt-1.5">
                                  <Lock className="h-3 w-3 shrink-0" />
                                  <span className="font-semibold">Note:</span>
                                  <span className="truncate max-w-xs">{tool.notes}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => handleStartEditAffiliate(tool)}
                              title="Edit Tool"
                            >
                              <Edit3 className="h-3.5 w-3.5 text-foreground" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => handleDeleteAffiliate(tool.id)}
                              className="hover:text-destructive hover:bg-destructive/10"
                              title="Delete Tool"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-4 pt-0 text-xs text-muted-foreground space-y-2 flex-1">
                        <p className="line-clamp-2">
                          {tool.description.replace(/\*\*(.*?)\*\*/g, "$1").replace(/^[-*]\s+/gm, "").replace(/\n+/g, " ")}
                        </p>
                        {tool.discountCode && (
                          <div className="flex items-center gap-1.5 text-[11px]">
                            <span className="font-medium text-foreground">Code:</span>
                            <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-primary font-bold">
                              {tool.discountCode}
                            </code>
                          </div>
                        )}
                      </CardContent>

                      <CardFooter className="p-3 pt-2 border-t border-border/40 bg-muted/20 flex items-center justify-between text-[11px]">
                        <span className="truncate max-w-[200px] text-muted-foreground font-mono" title={tool.affiliateUrl}>
                          {tool.affiliateUrl}
                        </span>
                        <a
                          href={tool.affiliateUrl}
                          target="_blank"
                          rel="sponsored nofollow noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                        >
                          Test Link
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </TabsContent>

        {/* MESSAGES TAB */}
        <TabsContent value="messages" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Contact Form Inquiries ({messages.length})
            </h3>
            <span className="text-xs text-muted-foreground">Stored directly in SQLite `ContactMessage` table</span>
          </div>

          {messages.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center text-xs text-muted-foreground">
              No inquiries yet. Submissions from the contact form at <Link href="/contact" className="underline text-primary">/contact</Link> will appear here.
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <Card key={msg.id} className="bg-card">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-sm text-foreground">{msg.name}</span>
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="text-xs text-primary hover:underline font-mono"
                        >
                          &lt;{msg.email}&gt;
                        </a>
                      </div>
                      <span className="text-[11px] text-muted-foreground">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="text-sm font-medium text-foreground pt-1">
                      {msg.subject}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-1 text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center border-t border-border/40 mt-2">
                    <Button asChild size="xs" variant="outline">
                      <a href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}>
                        <Mail className="h-3 w-3 mr-1" />
                        Reply by Email
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete Message
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ADSENSE & SEO SETTINGS TAB */}
        <TabsContent value="adsense" className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Google AdSense & SEO Configuration
              </CardTitle>
              <CardDescription className="text-xs">
                Essential publisher details required for AdSense approval and ad delivery.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 text-xs">
              <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Publisher Client ID</span>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "Not configured (Demo Mode)"}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-[11px] leading-relaxed">
                  Once your Google AdSense account is approved, add your ID to <code className="bg-card px-1 py-0.5 rounded font-mono">.env.local</code>:
                  <br />
                  <code className="text-primary font-mono block mt-1">NEXT_PUBLIC_ADSENSE_CLIENT_ID=&quot;ca-pub-XXXXXXXXXXXXXXXX&quot;</code>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-border p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">ads.txt</span>
                    <Badge variant="success" className="text-[10px]">Active</Badge>
                  </div>
                  <p className="text-muted-foreground text-[11px]">
                    Accessible at <a href="/ads.txt" target="_blank" className="text-primary underline">/ads.txt</a>
                  </p>
                </div>

                <div className="rounded-lg border border-border p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">robots.txt</span>
                    <Badge variant="success" className="text-[10px]">Active</Badge>
                  </div>
                  <p className="text-muted-foreground text-[11px]">
                    Mediapartners-Google crawler permitted at <a href="/robots.txt" target="_blank" className="text-primary underline">/robots.txt</a>
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-border p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">XML Sitemap</span>
                  <Badge variant="success" className="text-[10px]">Dynamic</Badge>
                </div>
                <p className="text-muted-foreground text-[11px]">
                  All blog posts and static pages indexed at <a href="/sitemap.xml" target="_blank" className="text-primary underline">/sitemap.xml</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABOUT PAGE TAB */}
        <TabsContent value="about" className="space-y-6">
          <Card className="bg-card">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    Homepage & Profile Content
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">
                    Manage your homepage hero banner, bio, quick facts, experience narrative, and educational background shown on{" "}
                    <Link href="/" target="_blank" className="text-primary underline inline-flex items-center gap-1">
                      / (Homepage) <ExternalLink className="h-3 w-3" />
                    </Link>{" "}
                    and{" "}
                    <Link href="/about" target="_blank" className="text-primary underline inline-flex items-center gap-1">
                      /about <ExternalLink className="h-3 w-3" />
                    </Link>
                  </CardDescription>
                </div>
                <Button
                  onClick={handleSaveAbout}
                  disabled={isSavingAbout}
                  size="sm"
                  className="gap-1.5 shrink-0"
                >
                  <Save className="h-3.5 w-3.5" />
                  {isSavingAbout ? "Saving..." : "Save All Changes"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAbout} className="space-y-8">
                {/* 0. Homepage Hero Banner Configuration */}
                <div className="space-y-4 rounded-xl border border-primary/25 bg-primary/5 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-2">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                        <span>Homepage Hero Banner</span>
                        <Badge variant="secondary" className="text-[10px]">Shown on /</Badge>
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Customize the main headline, gradient accent text, and introduction paragraph on your homepage hero.
                      </p>
                    </div>
                    <Button asChild variant="outline" size="xs" className="h-7 text-[11px] self-start sm:self-auto gap-1">
                      <Link href="/" target="_blank">
                        View Homepage <ExternalLink className="h-3 w-3 ml-0.5" />
                      </Link>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Main Hero Heading</label>
                      <Input
                        value={aboutForm.heroTitle || ""}
                        onChange={(e) => setAboutForm({ ...aboutForm, heroTitle: e.target.value })}
                        placeholder="e.g. Building scalable web systems, thoughtful products, and"
                        required
                      />
                      <p className="text-[10px] text-muted-foreground">The primary headline text.</p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Gradient Highlight Text</label>
                      <Input
                        value={aboutForm.heroHighlight || ""}
                        onChange={(e) => setAboutForm({ ...aboutForm, heroHighlight: e.target.value })}
                        placeholder="e.g. curating workspace gear."
                      />
                      <p className="text-[10px] text-muted-foreground">Renders with blue-to-violet gradient styling at the end of the heading.</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Introduction Paragraph / Subtitle</label>
                    <Textarea
                      rows={3}
                      value={aboutForm.heroSubtitle || ""}
                      onChange={(e) => setAboutForm({ ...aboutForm, heroSubtitle: e.target.value })}
                      placeholder="e.g. Hello, I'm **Tanmay Vaij** — a software engineer and tech creator based in Bengaluru..."
                      required
                    />
                    <p className="text-[10px] text-muted-foreground">
                      Wrap words in <code>**double asterisks**</code> (e.g. <code>**Tanmay Vaij**</code>) to bold them with high-contrast text.
                    </p>
                  </div>

                  {/* Live Visual Preview */}
                  <div className="rounded-lg border border-border bg-background p-4 space-y-2 mt-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                      Live Hero Preview
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-foreground leading-snug">
                      {aboutForm.heroTitle || "Building scalable web systems, thoughtful products, and"}{" "}
                      {aboutForm.heroHighlight && (
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-violet-400">
                          {aboutForm.heroHighlight}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {(aboutForm.heroSubtitle || "").split(/(\*\*.*?\*\*)/g).map((part, i) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return (
                            <strong key={i} className="text-foreground font-semibold">
                              {part.slice(2, -2)}
                            </strong>
                          )
                        }
                        return part
                      })}
                    </p>
                  </div>
                </div>

                {/* 1. Header & Hero Section */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
                    1. Hero Section & Main Bio
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Headline Title</label>
                      <Input
                        value={aboutForm.headline}
                        onChange={(e) => setAboutForm({ ...aboutForm, headline: e.target.value })}
                        placeholder="e.g. Hi, I'm Tanmay Vaij."
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Subheadline / Tagline</label>
                      <Input
                        value={aboutForm.subheadline}
                        onChange={(e) => setAboutForm({ ...aboutForm, subheadline: e.target.value })}
                        placeholder="e.g. Senior Full Stack & Distributed Systems Engineer · Bengaluru"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">Lead Bio Sentence (Highlight)</label>
                    <Textarea
                      rows={2}
                      value={aboutForm.bioIntro}
                      onChange={(e) => setAboutForm({ ...aboutForm, bioIntro: e.target.value })}
                      placeholder="Prominent introductory sentence..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Bio Paragraph 1 (Career / Focus)</label>
                      <Textarea
                        rows={4}
                        value={aboutForm.bioParagraph1}
                        onChange={(e) => setAboutForm({ ...aboutForm, bioParagraph1: e.target.value })}
                        placeholder="Describe your background and expertise..."
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Bio Paragraph 2 (Passion / Blog)</label>
                      <Textarea
                        rows={4}
                        value={aboutForm.bioParagraph2}
                        onChange={(e) => setAboutForm({ ...aboutForm, bioParagraph2: e.target.value })}
                        placeholder="Describe what you do outside work or on your blog..."
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Quick Facts & Meta */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
                    2. Quick Facts & Sidebar Stats
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Location</label>
                      <Input
                        value={aboutForm.location}
                        onChange={(e) => setAboutForm({ ...aboutForm, location: e.target.value })}
                        placeholder="e.g. Bengaluru, India"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Specialization</label>
                      <Input
                        value={aboutForm.specialization}
                        onChange={(e) => setAboutForm({ ...aboutForm, specialization: e.target.value })}
                        placeholder="e.g. Distributed Systems & Next.js"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Status / Availability</label>
                      <Input
                        value={aboutForm.status}
                        onChange={(e) => setAboutForm({ ...aboutForm, status: e.target.value })}
                        placeholder="e.g. Available"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Years of Experience</label>
                      <Input
                        value={aboutForm.experienceYears}
                        onChange={(e) => setAboutForm({ ...aboutForm, experienceYears: e.target.value })}
                        placeholder="e.g. 6+ Years"
                        required
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-medium text-foreground">Core Languages / Technologies</label>
                      <Input
                        value={aboutForm.languages}
                        onChange={(e) => setAboutForm({ ...aboutForm, languages: e.target.value })}
                        placeholder="e.g. TypeScript, Go, Python, SQL"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Social, Contact & Legal Information */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
                    3. Social, Contact & Legal Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Full Legal / Display Name</label>
                      <Input
                        value={aboutForm.name || ""}
                        onChange={(e) => setAboutForm({ ...aboutForm, name: e.target.value })}
                        placeholder="e.g. Tanmay Vaij"
                      />
                      <p className="text-[11px] text-muted-foreground">Used in Privacy Policy, Terms, and Copyright notices.</p>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Canonical Website URL</label>
                      <Input
                        value={aboutForm.websiteUrl || ""}
                        onChange={(e) => setAboutForm({ ...aboutForm, websiteUrl: e.target.value })}
                        placeholder="https://tanmayvaij.dev"
                      />
                      <p className="text-[11px] text-muted-foreground">Used in Privacy Policy and Terms of Service.</p>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Contact Email Address</label>
                      <Input
                        type="email"
                        value={aboutForm.email || ""}
                        onChange={(e) => setAboutForm({ ...aboutForm, email: e.target.value })}
                        placeholder="e.g. tanmayvaij22@gmail.com"
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Displayed on About page, Contact page, Privacy Policy, and Terms.
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Official / Legal Address</label>
                      <Input
                        value={aboutForm.address || ""}
                        onChange={(e) => setAboutForm({ ...aboutForm, address: e.target.value })}
                        placeholder="e.g. Bengaluru, Karnataka, India"
                      />
                      <p className="text-[11px] text-muted-foreground">
                        Displayed in Section 10 of Privacy Policy (GDPR/CCPA compliance).
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">GitHub Profile URL</label>
                      <Input
                        value={aboutForm.githubUrl}
                        onChange={(e) => setAboutForm({ ...aboutForm, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">LinkedIn Profile URL</label>
                      <Input
                        value={aboutForm.linkedinUrl}
                        onChange={(e) => setAboutForm({ ...aboutForm, linkedinUrl: e.target.value })}
                        placeholder="https://www.linkedin.com/in/..."
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Contact Page & Information Card */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
                    4. Contact Page & Information Card
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Contact Card Title</label>
                      <Input
                        value={aboutForm.contactTitle || ""}
                        onChange={(e) => setAboutForm({ ...aboutForm, contactTitle: e.target.value })}
                        placeholder="e.g. Contact Information"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">Expected Response Time</label>
                      <Input
                        value={aboutForm.responseTime || ""}
                        onChange={(e) => setAboutForm({ ...aboutForm, responseTime: e.target.value })}
                        placeholder="e.g. Typically within 24 business hours"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-medium text-foreground">Contact Card Description / Subtitle</label>
                      <Input
                        value={aboutForm.contactSubtitle || ""}
                        onChange={(e) => setAboutForm({ ...aboutForm, contactSubtitle: e.target.value })}
                        placeholder="e.g. Reach out directly for freelance contracts, consulting, or technical inquiries."
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-medium text-foreground">Contact Page Main Heading</label>
                      <Input
                        value={aboutForm.contactHeading || ""}
                        onChange={(e) => setAboutForm({ ...aboutForm, contactHeading: e.target.value })}
                        placeholder="e.g. Let's Discuss Your Architecture"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-medium text-foreground">Contact Page Description</label>
                      <Textarea
                        rows={2}
                        value={aboutForm.contactDescription || ""}
                        onChange={(e) => setAboutForm({ ...aboutForm, contactDescription: e.target.value })}
                        placeholder="Whether you have a technical question..."
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Education & Certifications */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
                    5. Education & Certification Cards
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Education */}
                    <div className="p-4 rounded-lg border border-border/70 bg-muted/20 space-y-3">
                      <span className="text-xs font-semibold text-primary">Academic Degree</span>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground">Degree Title</label>
                        <Input
                          value={aboutForm.degreeTitle}
                          onChange={(e) => setAboutForm({ ...aboutForm, degreeTitle: e.target.value })}
                          placeholder="e.g. Bachelor of Technology in Computer Science"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground">Time Period</label>
                        <Input
                          value={aboutForm.degreePeriod}
                          onChange={(e) => setAboutForm({ ...aboutForm, degreePeriod: e.target.value })}
                          placeholder="e.g. 2015 - 2019"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground">Details / Distinction</label>
                        <Input
                          value={aboutForm.degreeDesc}
                          onChange={(e) => setAboutForm({ ...aboutForm, degreeDesc: e.target.value })}
                          placeholder="e.g. First Class with Distinction · Systems Specialization"
                          required
                        />
                      </div>
                    </div>

                    {/* Certification */}
                    <div className="p-4 rounded-lg border border-border/70 bg-muted/20 space-y-3">
                      <span className="text-xs font-semibold text-primary">Professional Certification</span>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground">Certification Name</label>
                        <Input
                          value={aboutForm.certTitle}
                          onChange={(e) => setAboutForm({ ...aboutForm, certTitle: e.target.value })}
                          placeholder="e.g. AWS Certified Solutions Architect"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground">Badge Label</label>
                        <Input
                          value={aboutForm.certBadge}
                          onChange={(e) => setAboutForm({ ...aboutForm, certBadge: e.target.value })}
                          placeholder="e.g. Certified"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground">Issuer / Description</label>
                        <Input
                          value={aboutForm.certDesc}
                          onChange={(e) => setAboutForm({ ...aboutForm, certDesc: e.target.value })}
                          placeholder="e.g. Amazon Web Services · Cloud Architecture"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Professional Experience Timeline Manager */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-2">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        6. Professional Experience Timeline ({experiences.length})
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Manage roles, companies, dates, bullet achievements, and tech badges shown on /about
                      </p>
                    </div>
                    {!isEditingExp && (
                      <Button
                        type="button"
                        size="xs"
                        onClick={handleStartCreateExp}
                        className="gap-1.5 self-start sm:self-auto"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add Experience
                      </Button>
                    )}
                  </div>

                  {/* Inline Experience Form for Create / Edit */}
                  {isEditingExp && (
                    <div className="p-5 rounded-lg border-2 border-primary/40 bg-muted/30 space-y-4">
                      <div className="flex items-center justify-between border-b border-border/60 pb-2">
                        <span className="text-xs font-bold text-foreground">
                          {editingExpId ? "Edit Experience Entry" : "New Experience Entry"}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="xs"
                          onClick={() => {
                            setIsEditingExp(false)
                            setEditingExpId(null)
                          }}
                        >
                          Cancel
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground">Role / Job Title</label>
                          <Input
                            value={expForm.role}
                            onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                            placeholder="e.g. Staff Engineer / Tech Lead"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground">Company Name</label>
                          <Input
                            value={expForm.company}
                            onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                            placeholder="e.g. Apex Cloud Systems"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground">Time Period</label>
                          <Input
                            value={expForm.period}
                            onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                            placeholder="e.g. 2023 - Present"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground">Location</label>
                          <Input
                            value={expForm.location}
                            onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                            placeholder="e.g. Bengaluru (Hybrid) or Remote"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground">Overview Description</label>
                        <Textarea
                          rows={2}
                          value={expForm.description}
                          onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                          placeholder="Brief summary of your mission and leadership scope..."
                          required
                        />
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-medium text-foreground">Key Achievements (One per line)</label>
                          <span className="text-[10px] text-muted-foreground">Each line becomes a bullet point</span>
                        </div>
                        <Textarea
                          rows={4}
                          value={expForm.achievements}
                          onChange={(e) => setExpForm({ ...expForm, achievements: e.target.value })}
                          placeholder="Architected an event-driven telemetry engine processing 40M+ events daily...&#10;Slashing TTFB by 42%..."
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="text-xs font-medium text-foreground">Skills & Technologies (Comma-separated)</label>
                          <Input
                            value={expForm.skills}
                            onChange={(e) => setExpForm({ ...expForm, skills: e.target.value })}
                            placeholder="Next.js, TypeScript, Go, PostgreSQL, Kafka"
                            required
                          />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setIsEditingExp(false)
                              setEditingExpId(null)
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            disabled={isSavingExp}
                            onClick={handleSaveExp}
                            className="gap-1.5"
                          >
                            <Save className="h-3.5 w-3.5" />
                            {isSavingExp ? "Saving..." : "Save Role"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* List of Experiences */}
                  <div className="space-y-3">
                    {experiences.length === 0 ? (
                      <div className="p-8 text-center rounded-lg border-2 border-dashed border-border bg-muted/20 space-y-3">
                        <Briefcase className="h-8 w-8 text-muted-foreground mx-auto" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">No Experience Records in Database</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Click below to immediately seed the 3 default career milestones (Apex Cloud, HyperScale, Cognitive Wave).
                          </p>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleSeedDefaultExperiences}
                          className="gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Seed Default Career Milestones
                        </Button>
                      </div>
                    ) : (
                      experiences.map((exp) => {
                        let parsedAchievements: string[] = []
                        try {
                          const parsed = JSON.parse(exp.achievements)
                          if (Array.isArray(parsed)) parsedAchievements = parsed
                          else parsedAchievements = exp.achievements.split("\n").filter(Boolean)
                        } catch {
                          parsedAchievements = exp.achievements.split("\n").filter(Boolean)
                        }

                        return (
                          <div
                            key={exp.id}
                            className="p-4 rounded-lg border border-border bg-card shadow-xs flex flex-col gap-2 hover:border-primary/40 transition-colors"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <div>
                                <h5 className="text-sm font-bold text-foreground">
                                  {exp.role} <span className="text-primary font-normal">@ {exp.company}</span>
                                </h5>
                                <p className="text-[11px] text-muted-foreground font-medium">
                                  {exp.location} · {exp.period}
                                </p>
                              </div>
                              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="xs"
                                  onClick={() => handleStartEditExp(exp)}
                                  className="h-7 text-[11px] gap-1"
                                >
                                  <Edit3 className="h-3 w-3" />
                                  Edit
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="xs"
                                  onClick={() => handleDeleteExp(exp.id)}
                                  className="h-7 text-[11px] text-destructive hover:bg-destructive/10"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            <p className="text-xs text-foreground/80 leading-relaxed pt-1">
                              {exp.description}
                            </p>

                            <ul className="space-y-1 text-xs text-muted-foreground pt-1">
                              {parsedAchievements.slice(0, 3).map((ach, aIdx) => (
                                <li key={aIdx} className="flex items-start gap-1.5">
                                  <span className="text-emerald-500 font-bold">✓</span>
                                  <span className="line-clamp-1">{ach}</span>
                                </li>
                              ))}
                            </ul>

                            <div className="flex flex-wrap gap-1 pt-1.5">
                              {exp.skills.split(",").map((s) => s.trim()).filter(Boolean).map((s) => (
                                <Badge key={s} variant="secondary" className="text-[9px] px-1.5 py-0">
                                  {s}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>

                {/* 6. Core Technical Skills Matrix Manager */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/50 pb-2">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <Layers className="h-4 w-4 text-primary" />
                        7. Core Technical Skills Matrix ({skillCategories.length})
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        Manage technical clusters and proficiency badges shown on /about
                      </p>
                    </div>
                    {!isEditingSkillCat && (
                      <Button
                        type="button"
                        size="xs"
                        onClick={handleStartCreateSkillCat}
                        className="gap-1.5 self-start sm:self-auto"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Add Skill Category
                      </Button>
                    )}
                  </div>

                  {/* Inline Form to Create / Edit Skill Category */}
                  {isEditingSkillCat && (
                    <div className="p-5 rounded-lg border-2 border-primary/40 bg-muted/30 space-y-4">
                      <div className="flex items-center justify-between border-b border-border/60 pb-2">
                        <span className="text-xs font-bold text-foreground">
                          {editingSkillCatId ? "Edit Skill Category" : "New Skill Category"}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="xs"
                          onClick={() => {
                            setIsEditingSkillCat(false)
                            setEditingSkillCatId(null)
                          }}
                        >
                          Cancel
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="text-xs font-medium text-foreground">Category Name</label>
                          <Input
                            value={skillCatForm.category}
                            onChange={(e) => setSkillCatForm({ ...skillCatForm, category: e.target.value })}
                            placeholder="e.g. Frontend & UI, Backend & Systems"
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground">Display Order</label>
                          <Input
                            type="number"
                            value={skillCatForm.order}
                            onChange={(e) => setSkillCatForm({ ...skillCatForm, order: parseInt(e.target.value) || 0 })}
                            placeholder="1"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-medium text-foreground">
                            Skills & Proficiency Levels (Format: Skill: Level)
                          </label>
                          <span className="text-[10px] text-muted-foreground">Level can be: Expert, Advanced, or Proficient</span>
                        </div>
                        <Textarea
                          rows={6}
                          value={skillCatForm.skills}
                          onChange={(e) => setSkillCatForm({ ...skillCatForm, skills: e.target.value })}
                          placeholder="React 19 & Next.js (App Router): Expert&#10;TypeScript: Expert&#10;Tailwind CSS v4 & shadcn/ui: Expert&#10;State Machines & TanStack Query: Advanced"
                          required
                          className="font-mono text-xs"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setIsEditingSkillCat(false)
                            setEditingSkillCatId(null)
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          disabled={isSavingSkillCat}
                          onClick={handleSaveSkillCat}
                          className="gap-1.5"
                        >
                          <Save className="h-3.5 w-3.5" />
                          {isSavingSkillCat ? "Saving..." : "Save Category"}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Visual Grid of Skill Categories */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {skillCategories.length === 0 ? (
                      <div className="col-span-full p-8 text-center rounded-lg border-2 border-dashed border-border bg-muted/20 space-y-3">
                        <Layers className="h-8 w-8 text-muted-foreground mx-auto" />
                        <div>
                          <p className="text-sm font-semibold text-foreground">No Skill Categories in Database</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Click below to immediately seed the 4 default skill clusters (Frontend, Backend, Cloud, AI).
                          </p>
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          onClick={handleSeedDefaultSkills}
                          className="gap-2"
                        >
                          <Plus className="h-4 w-4" />
                          Seed Default Skill Clusters
                        </Button>
                      </div>
                    ) : (
                      skillCategories.map((cat) => {
                        let skillsList: { name: string; level: string }[] = []
                        try {
                          const parsed = JSON.parse(cat.skills)
                          if (Array.isArray(parsed)) skillsList = parsed
                        } catch {
                          skillsList = cat.skills
                            .split("\n")
                            .map((l) => {
                              const [name, level] = l.split(":")
                              return { name: name?.trim() || "", level: level?.trim() || "Advanced" }
                            })
                            .filter((s) => Boolean(s.name))
                        }

                        return (
                          <div
                            key={cat.id}
                            className="p-4 rounded-lg border border-border bg-card shadow-xs flex flex-col justify-between hover:border-primary/40 transition-colors"
                          >
                            <div>
                              <div className="flex items-center justify-between border-b border-border/50 pb-2 mb-3">
                                <h5 className="text-sm font-bold text-foreground">
                                  {cat.category}
                                </h5>
                                <div className="flex items-center gap-1">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="xs"
                                    onClick={() => handleStartEditSkillCat(cat)}
                                    className="h-6 w-6 p-0"
                                    title="Edit Category"
                                  >
                                    <Edit3 className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="xs"
                                    onClick={() => handleDeleteSkillCat(cat.id)}
                                    className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
                                    title="Delete Category"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>

                              <div className="space-y-2">
                                {skillsList.map((skill, sIdx) => (
                                  <div key={sIdx} className="flex items-center justify-between text-xs">
                                    <span className="text-foreground/90 font-medium">{skill.name}</span>
                                    <Badge variant="outline" className="text-[10px] text-muted-foreground">
                                      {skill.level}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                  <Button
                    type="submit"
                    disabled={isSavingAbout}
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" />
                    {isSavingAbout ? "Saving Changes..." : "Save About Page"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
