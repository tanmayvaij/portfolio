import { prisma } from "@/lib/prisma"
import { blogPosts as fallbackPosts, type BlogPost } from "@/lib/data/blog"

export async function getAllPosts(): Promise<BlogPost[]> {
  "use cache"
  try {
    const dbPosts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    })

    if (dbPosts.length === 0) {
      return fallbackPosts
    }

    return dbPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      coverImage: p.coverImage,
      category: p.category as BlogPost["category"],
      tags: p.tags.split(",").map((t) => t.trim()),
      publishedAt: p.publishedAt.toISOString().split("T")[0],
      updatedAt: p.updatedAt.toISOString().split("T")[0],
      readTime: p.readTime,
      author: {
        name: p.authorName,
        role: p.authorRole,
        avatar: p.authorAvatar,
      },
    }))
  } catch (error) {
    console.error("Database query failed, using static fallback:", error)
    return fallbackPosts
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  "use cache"
  try {
    const p = await prisma.post.findUnique({
      where: { slug },
    })

    if (!p) {
      return fallbackPosts.find((post) => post.slug === slug) ?? null
    }

    return {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      coverImage: p.coverImage,
      category: p.category as BlogPost["category"],
      tags: p.tags.split(",").map((t) => t.trim()),
      publishedAt: p.publishedAt.toISOString().split("T")[0],
      updatedAt: p.updatedAt.toISOString().split("T")[0],
      readTime: p.readTime,
      author: {
        name: p.authorName,
        role: p.authorRole,
        avatar: p.authorAvatar,
      },
    }
  } catch (error) {
    console.error("Database query failed, using static fallback:", error)
    return fallbackPosts.find((post) => post.slug === slug) ?? null
  }
}

