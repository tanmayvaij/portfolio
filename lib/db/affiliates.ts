import { prisma } from "@/lib/prisma"
import type { AffiliateToolItem } from "@/lib/data/affiliates"

export type { AffiliateToolItem }

export async function getAllAffiliates(): Promise<AffiliateToolItem[]> {
  try {
    if (prisma?.affiliateTool) {
      const tools = await prisma.affiliateTool.findMany({
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      })
      return tools
    }

    const rows: any[] = await prisma.$queryRawUnsafe(
      `SELECT * FROM "AffiliateTool" ORDER BY "featured" DESC, "createdAt" DESC`
    )
    return Array.isArray(rows) ? rows : []
  } catch (error) {
    console.error("Failed to query affiliate tools from DB:", error)
    return []
  }
}

export async function getFeaturedAffiliates(): Promise<AffiliateToolItem[]> {
  try {
    if (prisma?.affiliateTool) {
      const tools = await prisma.affiliateTool.findMany({
        where: { featured: true },
        take: 4,
      })
      return tools
    }

    const rows: any[] = await prisma.$queryRawUnsafe(
      `SELECT * FROM "AffiliateTool" WHERE "featured" = true ORDER BY "createdAt" DESC LIMIT 4`
    )
    return Array.isArray(rows) ? rows : []
  } catch (error) {
    console.error("Failed to query featured affiliate tools from DB:", error)
    return []
  }
}

export async function getAffiliateBySlug(slug: string): Promise<AffiliateToolItem | null> {
  try {
    if (prisma?.affiliateTool) {
      const tool = await prisma.affiliateTool.findFirst({
        where: {
          OR: [{ slug }, { id: slug }],
        },
      })
      return tool ?? null
    }

    const rows: any[] = await prisma.$queryRawUnsafe(
      `SELECT * FROM "AffiliateTool" WHERE "slug" = $1 OR "id" = $1 LIMIT 1`,
      slug
    )
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
  } catch (error) {
    console.error("Failed to query affiliate tool by slug from DB:", error)
    return null
  }
}
