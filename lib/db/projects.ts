import { prisma } from "@/lib/prisma"
import { portfolioData, type Project } from "@/lib/data/portfolio"

export async function getAllProjects(): Promise<Project[]> {
  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    })

    if (dbProjects.length === 0) {
      return portfolioData.projects
    }

    // Direct fallback map to guarantee showGithub reflects PostgreSQL state even if client cache is stale
    const rawMap = new Map<string, boolean>()
    try {
      const rawRows: any[] = await prisma.$queryRawUnsafe(
        `SELECT "id", "slug", "showGithub" FROM "Project"`
      )
      if (Array.isArray(rawRows)) {
        for (const row of rawRows) {
          if (typeof row.showGithub === "boolean") {
            rawMap.set(row.id, row.showGithub)
            rawMap.set(row.slug, row.showGithub)
          }
        }
      }
    } catch {
      // Ignore if table/column does not exist
    }

    return dbProjects.map((p) => {
      let parsedHighlights: string[] = []
      try {
        parsedHighlights = JSON.parse(p.highlights) as string[]
      } catch {
        parsedHighlights = p.highlights.split("\n").map((h) => h.trim()).filter(Boolean)
      }

      const rawVal = rawMap.get(p.id) ?? rawMap.get(p.slug)
      const isShowGithub = rawVal !== undefined ? rawVal : (p as any).showGithub === false ? false : true

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
        showGithub: isShowGithub,
        githubUrl: isShowGithub ? (p.githubUrl ?? undefined) : undefined,
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

    // Direct fallback to PostgreSQL to guarantee accurate showGithub
    let isShowGithub: boolean = (p as any).showGithub === false ? false : true
    try {
      const rawRows: any[] = await prisma.$queryRawUnsafe(
        `SELECT "showGithub" FROM "Project" WHERE "slug" = $1 OR "id" = $1 LIMIT 1`,
        slug
      )
      if (Array.isArray(rawRows) && rawRows.length > 0 && typeof rawRows[0].showGithub === "boolean") {
        isShowGithub = rawRows[0].showGithub
      }
    } catch {
      // Ignore if query fails
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
      showGithub: isShowGithub,
      githubUrl: isShowGithub ? (p.githubUrl ?? undefined) : undefined,
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

