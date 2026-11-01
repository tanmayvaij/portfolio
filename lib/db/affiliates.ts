import { prisma } from "@/lib/prisma"
import type { AffiliateToolItem } from "@/lib/data/affiliates"

export type { AffiliateToolItem }

export async function getAffiliateCategorySettings(): Promise<Record<string, boolean>> {
  try {
    let rows: any[] = []
    if ((prisma as any)?.affiliateCategorySetting) {
      rows = await (prisma as any).affiliateCategorySetting.findMany()
    } else {
      rows = await prisma.$queryRawUnsafe(
        `SELECT "category", "isPublic" FROM "AffiliateCategorySetting"`
      )
    }
    const map: Record<string, boolean> = {}
    if (Array.isArray(rows)) {
      for (const row of rows) {
        map[row.category] = row.isPublic !== false
      }
    }
    return map
  } catch (error) {
    console.error("Failed to query category settings:", error)
    return {}
  }
}

export async function setAffiliateCategoryVisibility(
  category: string,
  isPublic: boolean
): Promise<boolean> {
  try {
    if ((prisma as any)?.affiliateCategorySetting) {
      await (prisma as any).affiliateCategorySetting.upsert({
        where: { category },
        update: { isPublic },
        create: { category, isPublic },
      })
      return true
    }

    await prisma.$executeRawUnsafe(
      `INSERT INTO "AffiliateCategorySetting" ("category", "isPublic", "updatedAt")
       VALUES ($1, $2, CURRENT_TIMESTAMP)
       ON CONFLICT ("category") DO UPDATE SET "isPublic" = $2, "updatedAt" = CURRENT_TIMESTAMP`,
      category,
      isPublic
    )
    return true
  } catch (error) {
    console.error("Failed to update affiliate category visibility:", error)
    return false
  }
}

export async function getAllAffiliates(options?: {
  includePrivate?: boolean
}): Promise<AffiliateToolItem[]> {
  try {
    let tools: AffiliateToolItem[] = []
    if (prisma?.affiliateTool) {
      tools = await prisma.affiliateTool.findMany({
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      })
    } else {
      const rows: any[] = await prisma.$queryRawUnsafe(
        `SELECT * FROM "AffiliateTool" ORDER BY "featured" DESC, "createdAt" DESC`
      )
      tools = Array.isArray(rows) ? rows : []
    }

    if (options?.includePrivate) {
      return tools
    }

    const settings = await getAffiliateCategorySettings()
    return tools.filter((tool) => settings[tool.category] !== false)
  } catch (error) {
    console.error("Failed to query affiliate tools from DB:", error)
    return []
  }
}

export async function getFeaturedAffiliates(): Promise<AffiliateToolItem[]> {
  try {
    let tools: AffiliateToolItem[] = []
    if (prisma?.affiliateTool) {
      tools = await prisma.affiliateTool.findMany({
        where: { featured: true },
        orderBy: { createdAt: "desc" },
      })
    } else {
      const rows: any[] = await prisma.$queryRawUnsafe(
        `SELECT * FROM "AffiliateTool" WHERE "featured" = true ORDER BY "createdAt" DESC`
      )
      tools = Array.isArray(rows) ? rows : []
    }

    const settings = await getAffiliateCategorySettings()
    return tools.filter((tool) => settings[tool.category] !== false).slice(0, 4)
  } catch (error) {
    console.error("Failed to query featured affiliate tools from DB:", error)
    return []
  }
}

export async function getAffiliateBySlug(
  slug: string,
  options?: { includePrivate?: boolean }
): Promise<AffiliateToolItem | null> {
  try {
    let tool: AffiliateToolItem | null = null
    if (prisma?.affiliateTool) {
      tool = await prisma.affiliateTool.findFirst({
        where: {
          OR: [{ slug }, { id: slug }],
        },
      })
    } else {
      const rows: any[] = await prisma.$queryRawUnsafe(
        `SELECT * FROM "AffiliateTool" WHERE "slug" = $1 OR "id" = $1 LIMIT 1`,
        slug
      )
      tool = Array.isArray(rows) && rows.length > 0 ? rows[0] : null
    }

    if (!tool) return null
    if (options?.includePrivate) return tool

    const settings = await getAffiliateCategorySettings()
    if (settings[tool.category] === false) {
      return null
    }
    return tool
  } catch (error) {
    console.error("Failed to query affiliate tool by slug from DB:", error)
    return null
  }
}
