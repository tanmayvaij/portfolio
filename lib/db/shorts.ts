import { prisma } from "@/lib/prisma"

export interface ShortItem {
  id: string
  slug: string
  title: string
  youtubeUrl: string
  videoId: string
  thumbnailUrl: string | null
  category: string
  description?: string | null
  featured: boolean
  published: boolean
  views?: string | null
  duration?: string | null
  relatedToolUrl?: string | null
  relatedPostSlug?: string | null
  notes?: string | null
  createdAt: Date
  updatedAt: Date
}

export function extractYouTubeVideoId(url: string): string | null {
  if (!url) return null
  const trimmed = url.trim()

  const patterns = [
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]

  for (const pattern of patterns) {
    const match = trimmed.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

export function getYouTubeThumbnailUrl(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

export async function getAllShorts(includeUnpublished = false): Promise<ShortItem[]> {
  try {
    if (prisma?.short) {
      const whereClause = includeUnpublished ? {} : { published: true }
      const shorts = await prisma.short.findMany({
        where: whereClause,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      })
      return shorts
    }

    // Direct fallback if in-memory Prisma client is cycling
    const rows: any[] = await prisma.$queryRawUnsafe(
      includeUnpublished
        ? `SELECT * FROM "Short" ORDER BY "featured" DESC, "createdAt" DESC`
        : `SELECT * FROM "Short" WHERE "published" = true ORDER BY "featured" DESC, "createdAt" DESC`
    )
    return Array.isArray(rows) ? rows : []
  } catch (error) {
    console.error("Failed to query shorts from DB:", error)
    return []
  }
}

export async function getFeaturedShorts(limit = 4): Promise<ShortItem[]> {
  try {
    if (prisma?.short) {
      const shorts = await prisma.short.findMany({
        where: { published: true, featured: true },
        take: limit,
        orderBy: { createdAt: "desc" },
      })

      // If fewer than limit featured shorts exist, backfill with newest published shorts
      if (shorts.length < limit) {
        const remaining = limit - shorts.length
        const existingIds = shorts.map((s) => s.id)
        const additional = await prisma.short.findMany({
          where: {
            published: true,
            id: { notIn: existingIds },
          },
          take: remaining,
          orderBy: { createdAt: "desc" },
        })
        return [...shorts, ...additional]
      }

      return shorts
    }

    const rows: any[] = await prisma.$queryRawUnsafe(
      `SELECT * FROM "Short" WHERE "published" = true ORDER BY "featured" DESC, "createdAt" DESC LIMIT ${limit}`
    )
    return Array.isArray(rows) ? rows : []
  } catch (error) {
    console.error("Failed to query featured shorts from DB:", error)
    return []
  }
}

export async function getShortBySlugOrId(slugOrId: string): Promise<ShortItem | null> {
  try {
    if (prisma?.short) {
      const short = await prisma.short.findFirst({
        where: {
          OR: [{ slug: slugOrId }, { id: slugOrId }],
        },
      })
      return short ?? null
    }

    const rows: any[] = await prisma.$queryRawUnsafe(
      `SELECT * FROM "Short" WHERE "slug" = $1 OR "id" = $1 LIMIT 1`,
      slugOrId
    )
    return Array.isArray(rows) && rows.length > 0 ? rows[0] : null
  } catch (error) {
    console.error("Failed to query short by slug/id:", error)
    return null
  }
}

