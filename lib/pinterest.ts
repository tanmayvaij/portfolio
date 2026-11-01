import { prisma } from "@/lib/prisma"

export interface PinterestPinItem {
  pinId: string
  pinUrl: string
  title: string
  productName: string
  description: string
  imageUrl: string
  affiliateUrl: string
  category: string
  pubDate: string
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

export function extractCleanProductName(text: string): string {
  const decoded = decodeXmlEntities(text).trim()

  // Pattern 1: Look for "with the [Product] [Projector/Jacket/Shoes/etc]"
  const specificMatch = decoded.match(
    /(?:with|Meet|Explore|Discover|style with|comfort with|experience with|gift of|elegance of|charm with) (?:the )?([A-Za-z0-9\s'&.-]{4,55}?)(?:\.|\s*—|\s*featuring|\s*designed|\s*combines|\n|,)/i
  )
  if (
    specificMatch &&
    specificMatch[1].trim().length > 4 &&
    !/smarter|everyday|tradition|flowing water|something special|confidence/i.test(
      specificMatch[1]
    )
  ) {
    return specificMatch[1].trim()
  }

  // Pattern 2: Look for lines that contain branded product words
  const lines = decoded.split("\n").map((l) => l.trim()).filter(Boolean)
  for (const line of lines) {
    const brandMatch = line.match(
      /(?:the )?([A-Z][A-Za-z0-9\s'&.-]{3,45}?(?:Projector|Jacket|Shoes|Polo|Sneakers|Walking Shoe|Diya|Shankh|Fountain|T-Shirt|Shirt|Hoodie|Speaker|Earbuds|Figurines|Clock))/i
    )
    if (brandMatch && brandMatch[1].trim().length > 5) {
      return brandMatch[1].trim()
    }
  }

  // Fallback: first non-empty line without leading emojis
  const firstLine = (lines[0] || "").replace(/^[\p{Emoji}\s•*-]+/gu, "").trim()
  return firstLine.substring(0, 60) || "Curated Affiliate Pick"
}

export function detectCategory(text: string): string {
  const lower = text.toLowerCase()
  if (
    /projector|audio|speaker|earbud|headphone|cinema|theatre|display|gadget|screen|tv/.test(
      lower
    )
  ) {
    return "Audio & Tech Gadgets"
  }
  if (
    /jacket|shirt|shoes|sneaker|casual|fashion|outfit|style|bomber|denim|wear|menswear|chinos|jeans|polo|walking shoe/.test(
      lower
    )
  ) {
    return "Fashion & Lifestyle"
  }
  if (
    /desk|monitor|keyboard|mouse|chair|ergonomic|workspace|stand|laptop/.test(
      lower
    )
  ) {
    return "Desk Setup & Ergonomics"
  }
  if (/fountain|decor|home|sacred|tradition|statue|lamp|diya|figurine/.test(lower)) {
    return "Home & Lifestyle"
  }
  return "Fashion & Lifestyle"
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim()
}

export async function fetchPinterestFeed(
  username = "tanmayvaij22"
): Promise<PinterestPinItem[]> {
  try {
    const feedUrl = `https://in.pinterest.com/${username}/feed.rss`
    const res = await fetch(feedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 300 }, // cache for 5 minutes
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch Pinterest RSS feed: ${res.statusText}`)
    }

    const xml = await res.text()
    const rawItems = xml.split("<item>").slice(1)
    const pins: PinterestPinItem[] = []

    for (const raw of rawItems) {
      const pinUrlMatch = raw.match(/<link>([\s\S]*?)<\/link>/)
      const pinUrl = pinUrlMatch ? pinUrlMatch[1].trim() : ""
      if (!pinUrl) continue

      const pinIdMatch = pinUrl.match(/\/pin\/(\d+)/)
      const pinId = pinIdMatch ? pinIdMatch[1] : `pin_${Date.now()}`

      // Extract high resolution image URL
      const imgMatch =
        raw.match(/src=&quot;([^&]+)&quot;/) || raw.match(/src="([^"]+)"/)
      const rawImg = imgMatch ? imgMatch[1] : ""
      const imageUrl = rawImg.replace("/236x/", "/736x/")

      // Extract Title & Description
      const titleMatch = raw.match(/<title>([\s\S]*?)<\/title>/)
      const rawTitle = titleMatch ? titleMatch[1].trim() : ""
      const fullDecoded = decodeXmlEntities(rawTitle)

      const productName = extractCleanProductName(fullDecoded)
      const category = detectCategory(fullDecoded)

      const pubDateMatch = raw.match(/<pubDate>([\s\S]*?)<\/pubDate>/)
      const pubDate = pubDateMatch ? pubDateMatch[1].trim() : ""

      pins.push({
        pinId,
        pinUrl,
        title: rawTitle,
        productName,
        description: fullDecoded,
        imageUrl,
        affiliateUrl: pinUrl, // will be resolved to direct Amazon link
        category,
        pubDate,
      })
    }

    return pins
  } catch (error) {
    console.error("Pinterest RSS fetch error:", error)
    return []
  }
}

export async function resolvePinAffiliateLink(pinUrl: string): Promise<string> {
  try {
    const res = await fetch(pinUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    })
    if (!res.ok) return pinUrl

    const html = await res.text()
    // 1. Look for Amazon links (amzn.to, link.amazon, amazon.in, amazon.com)
    const amazonMatch = html.match(
      /https:\/\/(link\.amazon\/[a-zA-Z0-9]+|www\.amazon\.[a-z.]+\/[^\s"'\\]+|amzn\.to\/[a-zA-Z0-9]+)/
    )
    if (amazonMatch) {
      return amazonMatch[0]
    }

    // 2. Look for general outbound destination link embedded in Pinterest JSON state
    const linkMatch = html.match(/"link":"(https:[^"]+)"/)
    if (linkMatch) {
      const decoded = linkMatch[1].replace(/\\u0026/g, "&").replace(/\\\//g, "/")
      return decoded
    }

    return pinUrl
  } catch {
    return pinUrl
  }
}

export async function syncPinterestAffiliates(
  username = "tanmayvaij22"
): Promise<{
  success: boolean
  total: number
  imported: number
  updated: number
  message: string
}> {
  try {
    const pins = await fetchPinterestFeed(username)
    if (pins.length === 0) {
      return {
        success: false,
        total: 0,
        imported: 0,
        updated: 0,
        message: "No pins found on the Pinterest feed.",
      }
    }

    let importedCount = 0
    let updatedCount = 0

    // Fetch existing affiliate tools to avoid duplicates
    let existingTools: any[] = []
    try {
      if (prisma?.affiliateTool) {
        existingTools = await prisma.affiliateTool.findMany()
      } else {
        existingTools = await prisma.$queryRawUnsafe(`SELECT * FROM "AffiliateTool"`)
      }
    } catch {
      existingTools = []
    }

    const existingSlugs = new Set(existingTools.map((t) => t.slug))
    const existingNotes = new Map<string, any>()
    for (const t of existingTools) {
      if (t.notes) {
        existingNotes.set(t.notes, t)
      }
    }

    // Process each pin
    for (let i = 0; i < pins.length; i++) {
      const pin = pins[i]
      const noteIdentifier = `Imported from Pinterest Pin: ${pin.pinUrl}`

      // Check if already imported by note or by matching pin URL
      const existing = existingNotes.get(noteIdentifier)

      // Resolve direct Amazon affiliate link
      const resolvedAffiliateUrl = await resolvePinAffiliateLink(pin.pinUrl)

      // Base slug
      let baseSlug = slugify(pin.productName)
      if (!baseSlug || baseSlug.length < 3) {
        baseSlug = `pin-${pin.pinId}`
      }

      const hasDelegate = !!(prisma as any)?.affiliateTool

      if (existing) {
        // Update existing record with refreshed image & link if missing
        if (hasDelegate) {
          await prisma.affiliateTool.update({
            where: { id: existing.id },
            data: {
              name: pin.productName,
              description: pin.description,
              imageUrl: pin.imageUrl || existing.imageUrl,
              affiliateUrl: resolvedAffiliateUrl || existing.affiliateUrl,
              category: pin.category || existing.category,
              notes: noteIdentifier,
            },
          })
        } else {
          await prisma.$executeRawUnsafe(
            `UPDATE "AffiliateTool" SET
              "name" = $1,
              "description" = $2,
              "imageUrl" = $3,
              "affiliateUrl" = $4,
              "category" = $5,
              "notes" = $6,
              "updatedAt" = CURRENT_TIMESTAMP
             WHERE "id" = $7`,
            pin.productName,
            pin.description,
            pin.imageUrl || existing.imageUrl,
            resolvedAffiliateUrl || existing.affiliateUrl,
            pin.category || existing.category,
            noteIdentifier,
            existing.id
          )
        }
        updatedCount++
      } else {
        // Create new unique slug
        let uniqueSlug = baseSlug
        let counter = 1
        while (existingSlugs.has(uniqueSlug)) {
          uniqueSlug = `${baseSlug}-${counter}`
          counter++
        }
        existingSlugs.add(uniqueSlug)

        const toolId = `tool_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
        const badge =
          pin.category === "Fashion & Lifestyle"
            ? "Trending Style"
            : pin.category === "Audio & Tech Gadgets"
            ? "Amazon's Choice"
            : "Top Pick"

        if (hasDelegate) {
          await prisma.affiliateTool.create({
            data: {
              slug: uniqueSlug,
              name: pin.productName,
              category: pin.category,
              description: pin.description,
              notes: noteIdentifier,
              badge,
              affiliateUrl: resolvedAffiliateUrl,
              imageUrl: pin.imageUrl || null,
              merchant: "Amazon",
              price: "Check Latest Price",
              rating: 4.5,
              featured: i < 4, // feature the first 4 latest pins
            },
          })
        } else {
          await prisma.$executeRawUnsafe(
            `INSERT INTO "AffiliateTool" (
              "id", "slug", "name", "category", "description", "notes",
              "badge", "affiliateUrl", "imageUrl", "merchant", "price",
              "rating", "featured", "clicks", "createdAt", "updatedAt"
             ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
             )`,
            toolId,
            uniqueSlug,
            pin.productName,
            pin.category,
            pin.description,
            noteIdentifier,
            badge,
            resolvedAffiliateUrl,
            pin.imageUrl || null,
            "Amazon",
            "Check Latest Price",
            4.5,
            i < 4
          )
        }
        importedCount++
      }
    }

    return {
      success: true,
      total: pins.length,
      imported: importedCount,
      updated: updatedCount,
      message: `Pinterest sync complete! Imported ${importedCount} new products, updated ${updatedCount}.`,
    }
  } catch (error) {
    console.error("Pinterest sync error:", error)
    return {
      success: false,
      total: 0,
      imported: 0,
      updated: 0,
      message: error instanceof Error ? error.message : "Failed to sync Pinterest pins.",
    }
  }
}

