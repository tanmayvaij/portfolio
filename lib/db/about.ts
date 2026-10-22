import { prisma } from "@/lib/prisma"
import { portfolioData, type Experience, type SkillCategory } from "@/lib/data/portfolio"

export interface AboutConfigData {
  id: string
  name: string
  headline: string
  subheadline: string
  bioIntro: string
  bioParagraph1: string
  bioParagraph2: string
  location: string
  email: string
  websiteUrl: string
  address: string
  contactHeading: string
  contactDescription: string
  contactTitle: string
  contactSubtitle: string
  responseTime: string
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
  experiences?: Experience[]
  skills?: SkillCategory[]
}

export const defaultAboutConfig: AboutConfigData = {
  id: "default",
  name: "Tanmay Vaij",
  headline: "Hi, I'm Tanmay Vaij.",
  subheadline: "Senior Full Stack & Distributed Systems Engineer · Bengaluru",
  bioIntro:
    "I am a Senior Software Engineer with a passion for designing scalable web architectures, bulletproof APIs, and autonomous AI agents.",
  bioParagraph1:
    "Over the past 6+ years, I have worked across the stack from low-latency Go and Node.js microservices to modern React and Next.js frontends. I believe that engineering excellence is about crafting systems that are observable, easy to maintain, and performant by default.",
  bioParagraph2:
    "When I'm not architecting cloud infrastructure or profiling database transactions, I write deep technical field guides on my blog and contribute to open-source developer tooling.",
  location: "Bengaluru, India",
  email: "tanmayvaij22@gmail.com",
  websiteUrl: "https://tanmayvaij.dev",
  address: "Bengaluru, Karnataka, India",
  contactHeading: "Let's Discuss Your Architecture",
  contactDescription:
    "Whether you have a technical question about an article, want to collaborate on open-source, or need senior systems expertise, my inbox is open.",
  contactTitle: "Contact Information",
  contactSubtitle: "Reach out directly for freelance contracts, consulting, or technical inquiries.",
  responseTime: "Typically within 24 business hours",
  specialization: "Distributed Systems & Next.js",
  status: "Available",
  experienceYears: "6+ Years",
  languages: "TypeScript, Go, Python, SQL",
  githubUrl: "https://github.com/tanmayvaij",
  linkedinUrl: "https://www.linkedin.com/in/tanmayvaij/",
  degreeTitle: "Bachelor of Technology in Computer Science",
  degreePeriod: "2015 - 2019",
  degreeDesc: "First Class with Distinction · Systems & Algorithms Specialization",
  certTitle: "AWS Certified Solutions Architect",
  certBadge: "Certified",
  certDesc: "Amazon Web Services · Distributed Cloud Architecture & Resilience",
  experiencesJson: null,
  experiences: portfolioData.experiences,
  skills: portfolioData.skills,
}

export async function getAboutConfig(): Promise<AboutConfigData> {
  try {
    if (!prisma?.aboutConfig) {
      return defaultAboutConfig
    }

    const [config, dbExperiences, dbSkills] = await Promise.all([
      prisma.aboutConfig.findUnique({
        where: { id: "default" },
      }),
      prisma.experience ? prisma.experience.findMany({ orderBy: { order: "asc" } }) : Promise.resolve([]),
      prisma.skillCategory ? prisma.skillCategory.findMany({ orderBy: { order: "asc" } }) : Promise.resolve([]),
    ])

    let activeConfig = config

    if (!activeConfig) {
      activeConfig = await prisma.aboutConfig.create({
        data: {
          id: "default",
          name: defaultAboutConfig.name,
          headline: defaultAboutConfig.headline,
          subheadline: defaultAboutConfig.subheadline,
          bioIntro: defaultAboutConfig.bioIntro,
          bioParagraph1: defaultAboutConfig.bioParagraph1,
          bioParagraph2: defaultAboutConfig.bioParagraph2,
          location: defaultAboutConfig.location,
          email: defaultAboutConfig.email,
          websiteUrl: defaultAboutConfig.websiteUrl,
          address: defaultAboutConfig.address,
          contactHeading: defaultAboutConfig.contactHeading,
          contactDescription: defaultAboutConfig.contactDescription,
          contactTitle: defaultAboutConfig.contactTitle,
          contactSubtitle: defaultAboutConfig.contactSubtitle,
          responseTime: defaultAboutConfig.responseTime,
          specialization: defaultAboutConfig.specialization,
          status: defaultAboutConfig.status,
          experienceYears: defaultAboutConfig.experienceYears,
          languages: defaultAboutConfig.languages,
          githubUrl: defaultAboutConfig.githubUrl,
          linkedinUrl: defaultAboutConfig.linkedinUrl,
          degreeTitle: defaultAboutConfig.degreeTitle,
          degreePeriod: defaultAboutConfig.degreePeriod,
          degreeDesc: defaultAboutConfig.degreeDesc,
          certTitle: defaultAboutConfig.certTitle,
          certBadge: defaultAboutConfig.certBadge,
          certDesc: defaultAboutConfig.certDesc,
        },
      })
    }

    // Direct SQLite raw fallback to guarantee all newly added columns are loaded even if the dev server runs an older in-memory Prisma client
    try {
      const rawRows: any[] = await prisma.$queryRawUnsafe(
        `SELECT name, email, websiteUrl, address, contactHeading, contactDescription, contactTitle, contactSubtitle, responseTime FROM AboutConfig WHERE id = 'default' LIMIT 1`
      )
      if (rawRows && rawRows.length > 0) {
        const row = rawRows[0]
        activeConfig = {
          ...activeConfig,
          name: row.name ?? activeConfig.name ?? defaultAboutConfig.name,
          email: row.email ?? activeConfig.email ?? defaultAboutConfig.email,
          websiteUrl: row.websiteUrl ?? activeConfig.websiteUrl ?? defaultAboutConfig.websiteUrl,
          address: row.address ?? activeConfig.address ?? defaultAboutConfig.address,
          contactHeading: row.contactHeading ?? activeConfig.contactHeading ?? defaultAboutConfig.contactHeading,
          contactDescription:
            row.contactDescription ?? activeConfig.contactDescription ?? defaultAboutConfig.contactDescription,
          contactTitle: row.contactTitle ?? activeConfig.contactTitle ?? defaultAboutConfig.contactTitle,
          contactSubtitle: row.contactSubtitle ?? activeConfig.contactSubtitle ?? defaultAboutConfig.contactSubtitle,
          responseTime: row.responseTime ?? activeConfig.responseTime ?? defaultAboutConfig.responseTime,
        }
      }
    } catch (rawErr) {
      // In case table or query fails, activeConfig holds standard fields
    }

    let parsedExperiences = portfolioData.experiences

    if (dbExperiences && dbExperiences.length > 0) {
      parsedExperiences = dbExperiences.map((e) => {
        let achievements: string[] = []
        try {
          const parsed = JSON.parse(e.achievements)
          if (Array.isArray(parsed)) achievements = parsed
          else achievements = e.achievements.split("\n").map((s) => s.trim()).filter(Boolean)
        } catch {
          achievements = e.achievements.split("\n").map((s) => s.trim()).filter(Boolean)
        }

        const skills = e.skills.split(",").map((s) => s.trim()).filter(Boolean)

        return {
          id: e.id,
          role: e.role,
          company: e.company,
          location: e.location,
          period: e.period,
          description: e.description,
          achievements,
          skills,
        }
      })
    } else if (activeConfig.experiencesJson) {
      try {
        const parsed = JSON.parse(activeConfig.experiencesJson)
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsedExperiences = parsed
        }
      } catch (e) {
        console.error("Error parsing experiencesJson:", e)
      }
    }

    let parsedSkills = portfolioData.skills

    if (dbSkills && dbSkills.length > 0) {
      parsedSkills = dbSkills.map((cat) => {
        let skillsList: { name: string; level: "Proficient" | "Advanced" | "Expert" }[] = []
        try {
          const parsed = JSON.parse(cat.skills)
          if (Array.isArray(parsed)) skillsList = parsed
        } catch (e) {
          console.error("Error parsing skill category skills:", e)
        }
        return {
          id: cat.id,
          category: cat.category,
          skills: skillsList,
        }
      })
    }

    return {
      ...activeConfig,
      experiences: parsedExperiences,
      skills: parsedSkills,
    }
  } catch (error) {
    console.error("Error fetching about config:", error)
    return defaultAboutConfig
  }
}

