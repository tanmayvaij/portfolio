import { prisma } from "@/lib/prisma"
import type { AffiliateToolItem } from "@/lib/data/affiliates"

export type { AffiliateToolItem }

export async function getAllAffiliates(): Promise<AffiliateToolItem[]> {
  try {
    if (!prisma?.affiliateTool) {
      return []
    }
    const tools = await prisma.affiliateTool.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    })
    return tools
  } catch (error) {
    console.error("Failed to query affiliate tools from DB:", error)
    return []
  }
}

export async function getFeaturedAffiliates(): Promise<AffiliateToolItem[]> {
  try {
    if (!prisma?.affiliateTool) {
      return []
    }
    const tools = await prisma.affiliateTool.findMany({
      where: { featured: true },
      take: 4,
    })
    return tools
  } catch (error) {
    console.error("Failed to query featured affiliate tools from DB:", error)
    return []
  }
}

export async function getAffiliateBySlug(slug: string): Promise<AffiliateToolItem | null> {
  try {
    if (!prisma?.affiliateTool) {
      return null
    }
    const tool = await prisma.affiliateTool.findFirst({
      where: {
        OR: [{ slug }, { id: slug }],
      },
    })
    return tool ?? null
  } catch (error) {
    console.error("Failed to query affiliate tool by slug from DB:", error)
    return null
  }
}
