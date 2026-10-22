import type { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/db/posts"
import { getAllProjects } from "@/lib/db/projects"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://tanmayvaij.dev"
  const buildDate = new Date("2026-10-22T00:00:00Z")

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: buildDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ]

  const [posts, projects] = await Promise.all([getAllPosts(), getAllProjects()])
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug || project.id}`,
    lastModified: buildDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }))

  return [...staticRoutes, ...blogRoutes, ...projectRoutes]
}
