import { prisma } from "@/lib/prisma"
import type { BlogPost } from "@/lib/data/blog"

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const dbPosts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    })

    return dbPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      coverImage: p.coverImage,
      category: p.category as BlogPost["category"],
      tags: p.tags.split(",").map((t) => t.trim()),
      published: p.published,
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
    console.error("Database query failed for posts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const p = await prisma.post.findUnique({
      where: { slug },
    })

    if (!p) {
      return null
    }

    return {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      coverImage: p.coverImage,
      category: p.category as BlogPost["category"],
      tags: p.tags.split(",").map((t) => t.trim()),
      published: p.published,
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
    console.error("Database query failed for post slug:", error)
    return null
  }
}
