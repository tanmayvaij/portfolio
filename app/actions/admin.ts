"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { getAboutConfig } from "@/lib/db/about"

const ADMIN_COOKIE_NAME = "admin_auth_token"
const DEFAULT_PASSWORD = "admin"

function getAdminSecret() {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD
}

export async function loginAdmin(password: string): Promise<{ success: boolean; message: string }> {
  let isPasswordValid = false

  // 1. Check if a custom password was saved to database
  try {
    const config = await prisma.aboutConfig.findUnique({
      where: { id: "default" },
      select: { adminPassword: true },
    })
    if (config?.adminPassword && config.adminPassword.trim().length > 0) {
      if (password === config.adminPassword.trim()) {
        isPasswordValid = true
      }
    }
  } catch (err) {
    // Database connection or table not ready, fallback to env variable
  }

  // 2. Fall back to process.env.ADMIN_PASSWORD
  if (!isPasswordValid && password === getAdminSecret()) {
    isPasswordValid = true
  }

  if (isPasswordValid) {
    const cookieStore = await cookies()
    cookieStore.set(ADMIN_COOKIE_NAME, "authenticated_session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })
    return { success: true, message: "Authentication successful." }
  }

  return { success: false, message: "Invalid admin password." }
}

export async function logoutAdmin(): Promise<{ success: boolean }> {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
  return { success: true }
}

export async function verifyAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)
  return token?.value === "authenticated_session"
}

export async function getAdminData() {
  const isAuth = await verifyAdminAuth()
  if (!isAuth) {
    return null
  }

  const [posts, projects, messages, affiliates, about, experiences, skillCategories] = await Promise.all([
    prisma.post.findMany({
      orderBy: { publishedAt: "desc" },
    }),
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma?.affiliateTool
      ? prisma.affiliateTool.findMany({
          orderBy: { createdAt: "desc" },
        })
      : Promise.resolve([]),
    getAboutConfig(),
    prisma?.experience
      ? prisma.experience.findMany({
          orderBy: { order: "asc" },
        })
      : Promise.resolve([]),
    prisma?.skillCategory
      ? prisma.skillCategory.findMany({
          orderBy: { order: "asc" },
        })
      : Promise.resolve([]),
  ])

  let activeExperiences = experiences
  if (activeExperiences.length === 0 && prisma?.experience) {
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

    try {
      for (const exp of defaultExps) {
        await prisma.experience.create({ data: exp })
      }
      activeExperiences = await prisma.experience.findMany({ orderBy: { order: "asc" } })
    } catch (e) {
      console.error("Error auto-seeding experiences:", e)
    }
  }

  let activeSkillCategories = skillCategories
  if (activeSkillCategories.length === 0 && prisma?.skillCategory) {
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

    try {
      for (const cat of defaultCats) {
        await prisma.skillCategory.create({ data: cat })
      }
      activeSkillCategories = await prisma.skillCategory.findMany({ orderBy: { order: "asc" } })
    } catch (e) {
      console.error("Error auto-seeding skills:", e)
    }
  }

  // Ensure showGithub is correctly populated from PostgreSQL even if in-memory Prisma client is stale
  let enrichedProjects = projects
  try {
    const rawRows: any[] = await prisma.$queryRawUnsafe(
      `SELECT "id", "slug", "showGithub" FROM "Project"`
    )
    if (Array.isArray(rawRows) && rawRows.length > 0) {
      const rawMap = new Map<string, boolean>()
      for (const row of rawRows) {
        if (typeof row.showGithub === "boolean") {
          rawMap.set(row.id, row.showGithub)
          rawMap.set(row.slug, row.showGithub)
        }
      }
      enrichedProjects = projects.map((p) => {
        const rawVal = rawMap.get(p.id) ?? rawMap.get(p.slug)
        return {
          ...p,
          showGithub: rawVal !== undefined ? rawVal : (p as any).showGithub === false ? false : true,
        }
      })
    }
  } catch {
    // Ignore if raw query unavailable
  }

  return {
    posts,
    projects: enrichedProjects,
    messages,
    affiliates,
    about,
    experiences: activeExperiences,
    skillCategories: activeSkillCategories,
  }
}

// Blog Post Actions
export async function savePostAction(postData: {
  id?: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage?: string | null
  category: string
  tags: string
  readTime: string
  published: boolean
}): Promise<{ success: boolean; message: string }> {
  const isAuth = await verifyAdminAuth()
  if (!isAuth) return { success: false, message: "Unauthorized" }

  try {
    if (postData.id) {
      await prisma.post.update({
        where: { id: postData.id },
        data: {
          slug: postData.slug,
          title: postData.title,
          excerpt: postData.excerpt,
          content: postData.content,
          coverImage: postData.coverImage || null,
          category: postData.category,
          tags: postData.tags,
          readTime: postData.readTime,
          published: postData.published,
        },
      })
    } else {
      await prisma.post.create({
        data: {
          slug: postData.slug,
          title: postData.title,
          excerpt: postData.excerpt,
          content: postData.content,
          coverImage: postData.coverImage || null,
          category: postData.category,
          tags: postData.tags,
          readTime: postData.readTime,
          published: postData.published,
        },
      })
    }

    revalidatePath("/blog")
    revalidatePath(`/blog/${postData.slug}`)
    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true, message: "Post saved successfully." }
  } catch (error: unknown) {
    console.error("Save post error:", error)
    return { success: false, message: "Failed to save post. Verify slug is unique." }
  }
}

export async function deletePostAction(id: string): Promise<{ success: boolean; message: string }> {
  const isAuth = await verifyAdminAuth()
  if (!isAuth) return { success: false, message: "Unauthorized" }

  try {
    await prisma.post.delete({ where: { id } })
    revalidatePath("/blog")
    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true, message: "Post deleted." }
  } catch {
    return { success: false, message: "Failed to delete post." }
  }
}

// Project Actions
export async function saveProjectAction(projectData: {
  id?: string
  slug: string
  title: string
  description: string
  longDescription: string
  featuredImage?: string | null
  screenshots?: string | null
  category: string
  tags: string
  metrics?: string
  highlights: string[]
  featured: boolean
  showGithub?: boolean
  githubUrl?: string
  liveUrl?: string
}): Promise<{ success: boolean; message: string; id?: string }> {
  const isAuth = await verifyAdminAuth()
  if (!isAuth) return { success: false, message: "Unauthorized" }

  try {
    const projectPayload: Record<string, any> = {
      slug: projectData.slug,
      title: projectData.title,
      description: projectData.description,
      longDescription: projectData.longDescription,
      featuredImage: projectData.featuredImage || null,
      screenshots: projectData.screenshots || null,
      category: projectData.category,
      tags: projectData.tags,
      metrics: projectData.metrics || null,
      highlights: JSON.stringify(projectData.highlights),
      featured: projectData.featured,
      showGithub: projectData.showGithub !== undefined ? Boolean(projectData.showGithub) : true,
      githubUrl: projectData.githubUrl || null,
      liveUrl: projectData.liveUrl || null,
    }

    let savedProject: any
    try {
      if (projectData.id) {
        savedProject = await prisma.project.update({
          where: { id: projectData.id },
          data: projectPayload,
        })
      } else {
        savedProject = await prisma.project.create({
          data: projectPayload as any,
        })
      }
    } catch (prismaErr: any) {
      if (
        prismaErr?.message?.includes("showGithub") ||
        prismaErr?.name === "PrismaClientValidationError"
      ) {
        // Fallback when active dev server memory has not reloaded generated client
        const { showGithub, ...payloadWithoutShowGithub } = projectPayload
        if (projectData.id) {
          savedProject = await prisma.project.update({
            where: { id: projectData.id },
            data: payloadWithoutShowGithub,
          })
        } else {
          savedProject = await prisma.project.create({
            data: payloadWithoutShowGithub as any,
          })
        }
      } else {
        throw prismaErr
      }
    }

    // Direct SQL update to ensure showGithub is accurately persisted in PostgreSQL
    if (projectData.showGithub !== undefined && savedProject?.id) {
      try {
        await prisma.$executeRawUnsafe(
          `UPDATE "Project" SET "showGithub" = $1 WHERE "id" = $2 OR "slug" = $3`,
          Boolean(projectData.showGithub),
          savedProject.id,
          projectData.slug
        )
      } catch (rawErr) {
        console.error("Direct SQL update of showGithub error:", rawErr)
      }
    }

    revalidatePath("/projects")
    revalidatePath(`/projects/${projectData.slug}`)
    revalidatePath("/projects", "layout")
    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true, message: "Project saved successfully.", id: savedProject.id }
  } catch (error: unknown) {
    console.error("Save project error:", error)
    return { success: false, message: "Failed to save project. Verify slug is unique." }
  }
}

export async function deleteProjectAction(id: string): Promise<{ success: boolean; message: string }> {
  const isAuth = await verifyAdminAuth()
  if (!isAuth) return { success: false, message: "Unauthorized" }

  try {
    await prisma.project.delete({ where: { id } })
    revalidatePath("/projects")
    revalidatePath("/projects", "layout")
    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true, message: "Project deleted." }
  } catch {
    return { success: false, message: "Failed to delete project." }
  }
}

// Affiliate Tool Actions
export async function saveAffiliateAction(toolData: {
  id?: string
  slug: string
  name: string
  category: string
  description: string
  badge?: string
  affiliateUrl: string
  discountCode?: string
  price?: string
  rating?: number
  imageUrl?: string
  merchant?: string
  featured: boolean
}): Promise<{ success: boolean; message: string }> {
  const isAuth = await verifyAdminAuth()
  if (!isAuth) return { success: false, message: "Unauthorized" }

  try {
    if (toolData.id) {
      await prisma.affiliateTool.update({
        where: { id: toolData.id },
        data: {
          slug: toolData.slug,
          name: toolData.name,
          category: toolData.category,
          description: toolData.description,
          badge: toolData.badge || null,
          affiliateUrl: toolData.affiliateUrl,
          discountCode: toolData.discountCode || null,
          price: toolData.price || null,
          rating: toolData.rating ? Number(toolData.rating) : null,
          imageUrl: toolData.imageUrl || null,
          merchant: toolData.merchant || "Amazon",
          featured: toolData.featured,
        },
      })
    } else {
      await prisma.affiliateTool.create({
        data: {
          slug: toolData.slug,
          name: toolData.name,
          category: toolData.category,
          description: toolData.description,
          badge: toolData.badge || null,
          affiliateUrl: toolData.affiliateUrl,
          discountCode: toolData.discountCode || null,
          price: toolData.price || null,
          rating: toolData.rating ? Number(toolData.rating) : null,
          imageUrl: toolData.imageUrl || null,
          merchant: toolData.merchant || "Amazon",
          featured: toolData.featured,
        },
      })
    }

    revalidatePath("/tools")
    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true, message: "Affiliate product saved successfully." }
  } catch (error) {
    console.error("Save affiliate error:", error)
    return { success: false, message: "Failed to save affiliate product. Check slug uniqueness." }
  }
}

export async function deleteAffiliateAction(id: string): Promise<{ success: boolean; message: string }> {
  const isAuth = await verifyAdminAuth()
  if (!isAuth) return { success: false, message: "Unauthorized" }

  try {
    await prisma.affiliateTool.delete({ where: { id } })
    revalidatePath("/tools")
    revalidatePath("/admin")
    return { success: true, message: "Affiliate tool deleted." }
  } catch {
    return { success: false, message: "Failed to delete affiliate tool." }
  }
}

export async function deleteMessageAction(id: string): Promise<{ success: boolean; message: string }> {
  const isAuth = await verifyAdminAuth()
  if (!isAuth) return { success: false, message: "Unauthorized" }

  try {
    await prisma.contactMessage.delete({ where: { id } })
    revalidatePath("/admin")
    return { success: true, message: "Message deleted." }
  } catch {
    return { success: false, message: "Failed to delete message." }
  }
}

// About Page Configuration Action
export async function saveAboutAction(formData: {
  name?: string
  headline: string
  subheadline: string
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
}): Promise<{ success: boolean; message: string }> {
  const isAuth = await verifyAdminAuth()
  if (!isAuth) return { success: false, message: "Unauthorized" }

  try {
    const baseFields = {
      headline: formData.headline,
      subheadline: formData.subheadline,
      bioIntro: formData.bioIntro,
      bioParagraph1: formData.bioParagraph1,
      bioParagraph2: formData.bioParagraph2,
      location: formData.location,
      specialization: formData.specialization,
      status: formData.status,
      experienceYears: formData.experienceYears,
      languages: formData.languages,
      githubUrl: formData.githubUrl,
      linkedinUrl: formData.linkedinUrl,
      degreeTitle: formData.degreeTitle,
      degreePeriod: formData.degreePeriod,
      degreeDesc: formData.degreeDesc,
      certTitle: formData.certTitle,
      certBadge: formData.certBadge,
      certDesc: formData.certDesc,
      experiencesJson: formData.experiencesJson,
    }

    const newFields = {
      name: formData.name || "Tanmay Vaij",
      email: formData.email || "tanmayvaij22@gmail.com",
      websiteUrl: formData.websiteUrl || "https://tanmayvaij.dev",
      address: formData.address || "Bengaluru, Karnataka, India",
      contactHeading: formData.contactHeading || "Let's Discuss Your Architecture",
      contactDescription:
        formData.contactDescription ||
        "Whether you have a technical question about an article, want to collaborate on open-source, or need senior systems expertise, my inbox is open.",
      contactTitle: formData.contactTitle || "Contact Information",
      contactSubtitle:
        formData.contactSubtitle || "Reach out directly for freelance contracts, consulting, or technical inquiries.",
      responseTime: formData.responseTime || "Typically within 24 business hours",
    }

    try {
      await prisma.aboutConfig.upsert({
        where: { id: "default" },
        update: { ...baseFields, ...newFields },
        create: { id: "default", ...baseFields, ...newFields },
      })
    } catch (upsertErr: any) {
      console.warn("Retrying with baseFields + raw update due to in-memory client mismatch:", upsertErr?.message)
      await prisma.aboutConfig.upsert({
        where: { id: "default" },
        update: baseFields,
        create: { id: "default", ...baseFields },
      })
      await prisma.$executeRawUnsafe(
        `UPDATE AboutConfig SET name = ?, email = ?, websiteUrl = ?, address = ?, contactHeading = ?, contactDescription = ?, contactTitle = ?, contactSubtitle = ?, responseTime = ? WHERE id = 'default'`,
        newFields.name,
        newFields.email,
        newFields.websiteUrl,
        newFields.address,
        newFields.contactHeading,
        newFields.contactDescription,
        newFields.contactTitle,
        newFields.contactSubtitle,
        newFields.responseTime
      )
    }

    revalidatePath("/about")
    revalidatePath("/admin")
    revalidatePath("/privacy-policy")
    revalidatePath("/terms")
    revalidatePath("/contact")
    return { success: true, message: "About page configuration saved successfully." }
  } catch (error) {
    console.error("Failed to save about config:", error)
    return { success: false, message: "Failed to save about page configuration." }
  }
}

// Professional Experience Timeline Actions
export async function saveExperienceAction(data: {
  id?: string
  role: string
  company: string
  location: string
  period: string
  description: string
  achievements: string // newline-separated or JSON
  skills: string // comma-separated
  order?: number
}): Promise<{ success: boolean; message: string }> {
  const isAuth = await verifyAdminAuth()
  if (!isAuth) return { success: false, message: "Unauthorized" }

  try {
    // Format achievements into JSON array if plain lines
    let formattedAchievements = data.achievements
    try {
      JSON.parse(data.achievements)
    } catch {
      formattedAchievements = JSON.stringify(
        data.achievements.split("\n").map((s) => s.trim()).filter(Boolean)
      )
    }

    if (data.id) {
      await prisma.experience.update({
        where: { id: data.id },
        data: {
          role: data.role,
          company: data.company,
          location: data.location,
          period: data.period,
          description: data.description,
          achievements: formattedAchievements,
          skills: data.skills,
          order: data.order ?? 0,
        },
      })
    } else {
      await prisma.experience.create({
        data: {
          role: data.role,
          company: data.company,
          location: data.location,
          period: data.period,
          description: data.description,
          achievements: formattedAchievements,
          skills: data.skills,
          order: data.order ?? 0,
        },
      })
    }

    revalidatePath("/about")
    revalidatePath("/admin")
    return { success: true, message: "Experience record saved successfully." }
  } catch (error) {
    console.error("Failed to save experience:", error)
    return { success: false, message: "Failed to save experience record." }
  }
}

export async function deleteExperienceAction(id: string): Promise<{ success: boolean; message: string }> {
  const isAuth = await verifyAdminAuth()
  if (!isAuth) return { success: false, message: "Unauthorized" }

  try {
    await prisma.experience.delete({ where: { id } })
    revalidatePath("/about")
    revalidatePath("/admin")
    return { success: true, message: "Experience record deleted." }
  } catch (error) {
    console.error("Failed to delete experience:", error)
    return { success: false, message: "Failed to delete experience record." }
  }
}

// Core Technical Skills Actions
export async function saveSkillCategoryAction(data: {
  id?: string
  category: string
  skills: string // JSON or newline "Skill: Level"
  order?: number
}): Promise<{ success: boolean; message: string }> {
  const isAuth = await verifyAdminAuth()
  if (!isAuth) return { success: false, message: "Unauthorized" }

  try {
    let formattedSkills = data.skills
    try {
      JSON.parse(data.skills)
    } catch {
      // parse lines into [{ name, level }]
      const lines = data.skills.split("\n").map((s) => s.trim()).filter(Boolean)
      const list = lines.map((l) => {
        const parts = l.split(":")
        if (parts.length > 1) {
          const name = parts[0].trim()
          const levelRaw = parts[1].trim()
          const level = ["Expert", "Advanced", "Proficient"].includes(levelRaw)
            ? levelRaw
            : "Advanced"
          return { name, level }
        }
        return { name: l, level: "Advanced" }
      })
      formattedSkills = JSON.stringify(list)
    }

    if (data.id) {
      await prisma.skillCategory.update({
        where: { id: data.id },
        data: {
          category: data.category,
          skills: formattedSkills,
          order: data.order ?? 0,
        },
      })
    } else {
      await prisma.skillCategory.create({
        data: {
          category: data.category,
          skills: formattedSkills,
          order: data.order ?? 0,
        },
      })
    }

    revalidatePath("/about")
    revalidatePath("/admin")
    return { success: true, message: "Skill category saved successfully." }
  } catch (error) {
    console.error("Failed to save skill category:", error)
    return { success: false, message: "Failed to save skill category." }
  }
}

export async function deleteSkillCategoryAction(id: string): Promise<{ success: boolean; message: string }> {
  const isAuth = await verifyAdminAuth()
  if (!isAuth) return { success: false, message: "Unauthorized" }

  try {
    await prisma.skillCategory.delete({ where: { id } })
    revalidatePath("/about")
    revalidatePath("/admin")
    return { success: true, message: "Skill category deleted." }
  } catch (error) {
    console.error("Failed to delete skill category:", error)
    return { success: false, message: "Failed to delete skill category." }
  }
}





