import { prisma } from "@/lib/prisma"

export interface AffiliateToolItem {
  id: string
  slug: string
  name: string
  category: string
  description: string
  badge: string | null
  affiliateUrl: string
  discountCode: string | null
  price: string | null
  rating: number | null
  imageUrl: string | null
  merchant: string
  featured: boolean
  clicks: number
}

export async function getAllAffiliates(): Promise<AffiliateToolItem[]> {
  "use cache"
  try {
    if (!prisma?.affiliateTool) {
      console.warn("prisma.affiliateTool is not available.")
      return []
    }
    const tools = await prisma.affiliateTool.findMany({
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    })
    return tools
  } catch (error) {
    console.error("Failed to query affiliate tools:", error)
    return []
  }
}

export async function getFeaturedAffiliates(): Promise<AffiliateToolItem[]> {
  "use cache"
  try {
    if (!prisma?.affiliateTool) {
      console.warn("prisma.affiliateTool is not available.")
      return []
    }
    const tools = await prisma.affiliateTool.findMany({
      where: { featured: true },
      take: 4,
    })
    return tools
  } catch (error) {
    console.error("Failed to query featured affiliate tools:", error)
    return []
  }
}

