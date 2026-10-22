import { prisma } from "@/lib/prisma"
import { portfolioData, type Project } from "@/lib/data/portfolio"

export async function getAllProjects(): Promise<Project[]> {
  "use cache"
  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    })

    if (dbProjects.length === 0) {
      return portfolioData.projects
    }

    return dbProjects.map((p) => {
      let parsedHighlights: string[] = []
      try {
        parsedHighlights = JSON.parse(p.highlights) as string[]
      } catch {
        parsedHighlights = p.highlights.split("\n").map((h) => h.trim()).filter(Boolean)
      }

      return {
        id: p.slug,
        slug: p.slug,
        title: p.title,
        description: p.description,
        longDescription: p.longDescription,
        featuredImage: p.featuredImage,
        screenshots: p.screenshots,
        category: p.category as Project["category"],
        tags: p.tags.split(",").map((t) => t.trim()),
        featured: p.featured,
        githubUrl: p.githubUrl ?? undefined,
        liveUrl: p.liveUrl ?? undefined,
        metrics: p.metrics ?? undefined,
        highlights: parsedHighlights,
      }
    })
  } catch (error) {
    console.error("Database query failed, using static fallback:", error)
    return portfolioData.projects
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  "use cache"
  try {
    const p = await prisma.project.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
    })

    if (!p) {
      return (
        portfolioData.projects.find(
          (proj) => proj.id === slug || proj.slug === slug
        ) ?? null
      )
    }

    let parsedHighlights: string[] = []
    try {
      parsedHighlights = JSON.parse(p.highlights) as string[]
    } catch {
      parsedHighlights = p.highlights.split("\n").map((h) => h.trim()).filter(Boolean)
    }

    return {
      id: p.slug,
      slug: p.slug,
      title: p.title,
      description: p.description,
      longDescription: p.longDescription,
      featuredImage: p.featuredImage,
      screenshots: p.screenshots,
      category: p.category as Project["category"],
      tags: p.tags.split(",").map((t) => t.trim()),
      featured: p.featured,
      githubUrl: p.githubUrl ?? undefined,
      liveUrl: p.liveUrl ?? undefined,
      metrics: p.metrics ?? undefined,
      highlights: parsedHighlights,
    }
  } catch (error) {
    console.error("Database query failed for project:", error)
    return (
      portfolioData.projects.find(
        (proj) => proj.id === slug || proj.slug === slug
      ) ?? null
    )
  }
}

