import type { Metadata } from "next"
import { getAllPosts } from "@/lib/db/posts"
import { BlogListClient } from "./blog-list-client"
import { AdBanner } from "@/components/adsense/AdBanner"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Engineering Blog & Technical Publications",
  description:
    "In-depth articles, architectural postmortems, Next.js optimization guides, and distributed systems tutorials by Tanmay Vaij.",
  alternates: {
    canonical: "https://tanmayvaij.dev/blog",
  },
  openGraph: {
    title: "Engineering Blog & Technical Publications | Tanmay Vaij",
    description:
      "Deep technical articles covering Next.js, distributed databases, AI agents, and web performance.",
    url: "https://tanmayvaij.dev/blog",
    siteName: "Tanmay Vaij",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Blog & Technical Publications | Tanmay Vaij",
    description:
      "Deep technical articles covering Next.js, distributed databases, AI agents, and web performance.",
    creator: "@tanmayvaij",
  },
}

export const instant = false

export default async function BlogIndexPage() {
  const posts = await getAllPosts()

  const blogIndexJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Tanmay Vaij Engineering Blog",
    description:
      "In-depth articles, architectural postmortems, Next.js optimization guides, and distributed systems tutorials.",
    url: "https://tanmayvaij.dev/blog",
    author: {
      "@type": "Person",
      name: "Tanmay Vaij",
      url: "https://tanmayvaij.dev",
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `https://tanmayvaij.dev/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
    })),
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogIndexJsonLd) }}
      />
      {/* Header */}
      <div className="mb-10 space-y-3">
        <Badge variant="outline">Blogs</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Blogs
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          Articles, insights, tutorials, and personal writings.
        </p>
      </div>

      {/* Top Ad Unit */}
      <AdBanner slot="2000000001" format="horizontal" label="Advertisement" />

      {/* Interactive Blog List */}
      <div className="mt-8">
        <BlogListClient posts={posts} />
      </div>

      {/* Bottom Ad Unit */}
      <div className="mt-12">
        <AdBanner slot="2000000002" format="horizontal" label="Advertisement" />
      </div>
    </main>
  )
}
