import { prisma } from "@/lib/prisma"

export interface YouTubeShortItem {
  videoId: string
  title: string
  description: string
  youtubeUrl: string
  thumbnailUrl: string
  views: string
  publishedAt: string
  category: string
}

function decodeXmlEntities(str: string): string {
  return str
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
}

export function detectShortCategory(text: string): string {
  const lower = text.toLowerCase()
  if (
    /gold|stocks|stock market|trading|trader|invest|mutual fund|crypto|portfolio/.test(
      lower
    )
  ) {
    return "Investing"
  }
  if (
    /salary|budget|emi|no-cost|money|broke|financial freedom|savings|emergency money|bill/.test(
      lower
    )
  ) {
    return "Finance"
  }
  if (
    /business|entrepreneur|startup|ecommerce|deal|cart|founder|profit|sales|company/.test(
      lower
    )
  ) {
    return "Business"
  }
  if (/robot|ai|tech|software|developer|coding|hardware/.test(lower)) {
    return "Tech"
  }
  return "Finance"
}

export function slugifyShort(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim()
}

export function formatViews(viewCountStr: string): string {
  const num = parseInt(viewCountStr, 10)
  if (isNaN(num)) return "Featured"
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K views`
  return `${num} views`
}

export async function fetchYouTubeShorts(
  channelId = "UC6y7NAEEm-U97DLfHc__l9w"
): Promise<YouTubeShortItem[]> {
  try {
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
    const res = await fetch(feedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 300 }, // cache for 5 minutes
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch YouTube RSS feed: ${res.statusText}`)
    }

    const xml = await res.text()
    const rawEntries = xml.split("<entry>").slice(1)
    const shorts: YouTubeShortItem[] = []

    for (const raw of rawEntries) {
      const videoIdMatch = raw.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)
      const videoId = videoIdMatch ? videoIdMatch[1].trim() : ""
      if (!videoId) continue

      const titleMatch = raw.match(/<title>([\s\S]*?)<\/title>/)
      const rawTitle = titleMatch ? titleMatch[1].trim() : ""
      const title = decodeXmlEntities(rawTitle)

      const descMatch = raw.match(/<media:description>([\s\S]*?)<\/media:description>/)
      const rawDesc = descMatch ? descMatch[1].trim() : ""
      const description = decodeXmlEntities(rawDesc)

      const viewsMatch = raw.match(/<media:statistics views="(\d+)"\/>/)
      const views = viewsMatch ? formatViews(viewsMatch[1]) : "Featured"

      const pubDateMatch = raw.match(/<published>([^<]+)<\/published>/)
      const publishedAt = pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString()

      const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      const youtubeUrl = `https://www.youtube.com/shorts/${videoId}`
      const category = detectShortCategory(`${title} ${description}`)

      shorts.push({
        videoId,
        title,
        description,
        youtubeUrl,
        thumbnailUrl,
        views,
        publishedAt,
        category,
      })
    }

    return shorts
  } catch (error) {
    console.error("YouTube RSS fetch error:", error)
    return []
  }
}

export async function syncYouTubeShorts(
  channelId = "UC6y7NAEEm-U97DLfHc__l9w"
): Promise<{
  success: boolean
  total: number
  imported: number
  updated: number
  message: string
}> {
  try {
    const shorts = await fetchYouTubeShorts(channelId)
    if (shorts.length === 0) {
      return {
        success: false,
        total: 0,
        imported: 0,
        updated: 0,
        message: "No videos found in YouTube channel feed.",
      }
    }

    let importedCount = 0
    let updatedCount = 0

    let existingShorts: any[] = []
    try {
      if (prisma?.short) {
        existingShorts = await prisma.short.findMany()
      } else {
        existingShorts = (await prisma.$queryRawUnsafe(`SELECT * FROM "Short"`)) as any[]
      }
    } catch {
      existingShorts = (await prisma.$queryRawUnsafe(`SELECT * FROM "Short"`).catch(() => [])) as any[]
    }

    const existingByVideoId = new Map<string, any>()
    const existingSlugs = new Set<string>()

    for (const s of existingShorts) {
      if (s.videoId) existingByVideoId.set(s.videoId, s)
      if (s.slug) existingSlugs.add(s.slug)
    }

    const hasDelegate = !!(prisma as any)?.short

    for (let i = 0; i < shorts.length; i++) {
      const item = shorts[i]
      const existing = existingByVideoId.get(item.videoId)

      if (existing) {
        if (hasDelegate) {
          await prisma.short.update({
            where: { id: existing.id },
            data: {
              title: item.title,
              description: item.description,
              thumbnailUrl: item.thumbnailUrl,
              youtubeUrl: item.youtubeUrl,
              views: item.views,
              category: item.category,
            },
          })
        } else {
          await prisma.$executeRawUnsafe(
            `UPDATE "Short" SET
              "title" = $1,
              "description" = $2,
              "thumbnailUrl" = $3,
              "youtubeUrl" = $4,
              "views" = $5,
              "category" = $6,
              "updatedAt" = CURRENT_TIMESTAMP
             WHERE "id" = $7`,
            item.title,
            item.description,
            item.thumbnailUrl,
            item.youtubeUrl,
            item.views,
            item.category,
            existing.id
          )
        }
        updatedCount++
      } else {
        let baseSlug = slugifyShort(item.title)
        if (!baseSlug || baseSlug.length < 3) baseSlug = `short-${item.videoId}`

        let uniqueSlug = baseSlug
        let counter = 1
        while (existingSlugs.has(uniqueSlug)) {
          uniqueSlug = `${baseSlug}-${counter}`
          counter++
        }
        existingSlugs.add(uniqueSlug)

        const shortId = `short_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
        const isFeatured = i < 3 // Feature the top 3 latest shorts

        if (hasDelegate) {
          await prisma.short.create({
            data: {
              slug: uniqueSlug,
              title: item.title,
              youtubeUrl: item.youtubeUrl,
              videoId: item.videoId,
              thumbnailUrl: item.thumbnailUrl,
              category: item.category,
              description: item.description,
              featured: isFeatured,
              published: true,
              views: item.views,
              duration: "0:59",
              notes: "Imported from YouTube Channel @TonyMan",
            },
          })
        } else {
          await prisma.$executeRawUnsafe(
            `INSERT INTO "Short" (
              "id", "slug", "title", "youtubeUrl", "videoId", "thumbnailUrl",
              "category", "description", "featured", "published", "views",
              "duration", "notes", "createdAt", "updatedAt"
             ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
             )`,
            shortId,
            uniqueSlug,
            item.title,
            item.youtubeUrl,
            item.videoId,
            item.thumbnailUrl,
            item.category,
            item.description,
            isFeatured,
            true,
            item.views,
            "0:59",
            "Imported from YouTube Channel @TonyMan"
          )
        }
        importedCount++
      }
    }

    return {
      success: true,
      total: shorts.length,
      imported: importedCount,
      updated: updatedCount,
      message: `YouTube Shorts sync complete! Imported ${importedCount} new shorts, updated ${updatedCount}.`,
    }
  } catch (error) {
    console.error("YouTube sync error:", error)
    return {
      success: false,
      total: 0,
      imported: 0,
      updated: 0,
      message:
        error instanceof Error ? error.message : "Failed to sync YouTube shorts.",
    }
  }
}
