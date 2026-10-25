import { prisma } from "@/lib/prisma"
import { portfolioData, type Project } from "@/lib/data/portfolio"

export async function getAllProjects(): Promise<Project[]> {
  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    })

    if (dbProjects.length === 0) {
      return []
    }

    // Direct fallback map to guarantee showGithub and published reflect PostgreSQL state even if client cache is stale
    const rawMap = new Map<string, boolean>()
    const rawPubMap = new Map<string, boolean>()
    try {
      const rawRows: any[] = await prisma.$queryRawUnsafe(
        `SELECT "id", "slug", "showGithub", "published" FROM "Project"`
      )
      if (Array.isArray(rawRows)) {
        for (const row of rawRows) {
          if (typeof row.showGithub === "boolean") {
            rawMap.set(row.id, row.showGithub)
            rawMap.set(row.slug, row.showGithub)
          }
          if (typeof row.published === "boolean") {
            rawPubMap.set(row.id, row.published)
            rawPubMap.set(row.slug, row.published)
          }
        }
      }
    } catch {
      // Ignore if table/column does not exist
    }

    return dbProjects
      .map((p) => {
        let parsedHighlights: string[] = []
        try {
          parsedHighlights = JSON.parse(p.highlights) as string[]
        } catch {
          parsedHighlights = p.highlights.split("\n").map((h) => h.trim()).filter(Boolean)
        }

        const rawVal = rawMap.get(p.id) ?? rawMap.get(p.slug)
        const isShowGithub = rawVal !== undefined ? rawVal : (p as any).showGithub === false ? false : true

        const rawPub = rawPubMap.get(p.id) ?? rawPubMap.get(p.slug)
        const isPublished = rawPub !== undefined ? rawPub : (p as any).published === false ? false : true

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
          published: isPublished,
          showGithub: isShowGithub,
          githubUrl: isShowGithub ? (p.githubUrl ?? undefined) : undefined,
          liveUrl: p.liveUrl ?? undefined,
          metrics: p.metrics ?? undefined,
          highlights: parsedHighlights,
        }
      })
      .filter((p) => p.published !== false)
  } catch (error) {
    console.error("Database query failed for projects:", error)
    return []
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
      return null
    }

    let parsedHighlights: string[] = []
    try {
      parsedHighlights = JSON.parse(p.highlights) as string[]
    } catch {
      parsedHighlights = p.highlights.split("\n").map((h) => h.trim()).filter(Boolean)
    }

    // Direct fallback to PostgreSQL to guarantee accurate showGithub and published
    let isShowGithub: boolean = (p as any).showGithub === false ? false : true
    let isPublished: boolean = (p as any).published === false ? false : true
    try {
      const rawRows: any[] = await prisma.$queryRawUnsafe(
        `SELECT "showGithub", "published" FROM "Project" WHERE "slug" = $1 OR "id" = $1 LIMIT 1`,
        slug
      )
      if (Array.isArray(rawRows) && rawRows.length > 0) {
        if (typeof rawRows[0].showGithub === "boolean") {
          isShowGithub = rawRows[0].showGithub
        }
        if (typeof rawRows[0].published === "boolean") {
          isPublished = rawRows[0].published
        }
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
      published: isPublished,
      showGithub: isShowGithub,
      githubUrl: isShowGithub ? (p.githubUrl ?? undefined) : undefined,
      liveUrl: p.liveUrl ?? undefined,
      metrics: p.metrics ?? undefined,
      highlights: parsedHighlights,
    }
  } catch (error) {
    console.error("Database query failed for project:", error)
    return null
  }
}

