import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { getAllPosts, getPostBySlug } from "@/lib/db/posts"
import { getFeaturedAffiliates } from "@/lib/db/affiliates"
import { verifyAdminAuth } from "@/app/actions/admin"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LinkedinIcon } from "@/components/icons"
import { ShareButton } from "@/components/ui/share-button"
import { AdBanner } from "@/components/adsense/AdBanner"
import { AffiliateCallout } from "@/components/affiliate/AffiliateCallout"
import { ReadingProgressBar, FadeIn, StaggerContainer, StaggerItem, MotionCard } from "@/components/motion"
import { ArticleRenderer } from "./article-renderer"

interface PageProps {
  params: Promise<{ slug: string }>
}

export const instant = false

export async function generateStaticParams() {
  const posts = await getAllPosts()
  if (posts.length === 0) {
    return [{ slug: "__placeholder__" }]
  }
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Article Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name, url: "https://tanmayvaij.dev/about" }],
    alternates: {
      canonical: `https://tanmayvaij.dev/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://tanmayvaij.dev/blog/${post.slug}`,
      siteName: "Tanmay Vaij Engineering Blog",
      locale: "en_US",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      ...(post.coverImage ? { images: [{ url: post.coverImage, alt: post.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      creator: "@tanmayvaij",
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // If post is in draft mode, hide from public visitors (allow admin preview)
  const isAuth = await verifyAdminAuth()
  if (post.published === false && !isAuth) {
    notFound()
  }

  const allPosts = await getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 2)

  const featuredTools = await getFeaturedAffiliates()
  const matchedTool =
    featuredTools.find((t) =>
      post.tags.some(
        (tag) =>
          t.category.toLowerCase().includes(tag.toLowerCase()) ||
          t.name.toLowerCase().includes(tag.toLowerCase())
      )
    ) || featuredTools[0]

  // JSON-LD Structured Data for Google AdSense & SEO Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `https://tanmayvaij.dev/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: "https://tanmayvaij.dev/about",
      jobTitle: post.author.role,
      sameAs: [
        "https://www.linkedin.com/in/tanmayvaij/",
        "https://github.com/tanmayvaij",
        "https://twitter.com/tanmayvaij",
      ],
    },
    publisher: {
      "@type": "Person",
      name: "Tanmay Vaij",
      url: "https://tanmayvaij.dev",
      sameAs: [
        "https://www.linkedin.com/in/tanmayvaij/",
        "https://github.com/tanmayvaij",
      ],
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://tanmayvaij.dev/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <ReadingProgressBar />
      {/* Structured Data script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Draft Mode Preview Banner for Admin */}
      {post.published === false && (
        <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-700 dark:text-amber-400 flex items-center justify-between">
          <span className="font-semibold">⚠️ Draft Mode — This article is currently unlisted and hidden from public visitors.</span>
          <Link href="/admin" className="underline font-medium hover:text-amber-900 dark:hover:text-amber-200">
            Open Admin
          </Link>
        </div>
      )}

      {/* Back button & Share Bar */}
      <FadeIn direction="up">
        <div className="mb-6 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <Link href="/blog">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to All Blogs
            </Link>
          </Button>

          <ShareButton
            title={post.title}
            text={post.excerpt}
            url={`/blog/${post.slug}`}
            variant="outline"
            size="sm"
          />
        </div>

        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
            <span className="text-muted-foreground text-xs">•</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Published {post.publishedAt}
            </span>
            <span className="text-muted-foreground text-xs">•</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.2] break-words">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author information */}
          <div className="flex items-center justify-between border-y border-border/60 py-4">
            <div className="flex items-center gap-3">
              <Image
                src="/profile.png"
                alt={post.author.name}
                width={40}
                height={40}
                style={{ width: "auto", height: "auto" }}
                className="h-10 w-10 rounded-full object-cover border border-border"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">{post.author.name}</span>
                <span className="text-xs text-muted-foreground">{post.author.role}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[11px] hidden sm:inline-flex">
                Verified Technical Content
              </Badge>
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        {post.coverImage && (
          <div className="relative mt-8 w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto block"
            />
          </div>
        )}
      </FadeIn>

      {/* Top in-article AdSense Banner */}
      <div className="my-6">
        <AdBanner slot="3000000001" format="horizontal" label="Advertisement" />
      </div>

      {/* Article Body */}
      <article className="prose prose-neutral dark:prose-invert max-w-none py-6">
        <ArticleRenderer content={post.content} />
      </article>

      {/* Middle/Post AdSense Banner */}
      <div className="my-8">
        <AdBanner slot="3000000002" format="auto" label="Sponsored Content" />
      </div>

      {/* Recommended Affiliate Tool / Gear Callout */}
      {matchedTool && (
        <AffiliateCallout
          title={matchedTool.name}
          toolName={matchedTool.name}
          badge={matchedTool.badge || "Top Pick"}
          description={matchedTool.description}
          affiliateUrl={matchedTool.affiliateUrl}
          discountCode={matchedTool.discountCode || undefined}
          price={matchedTool.price || undefined}
          rating={matchedTool.rating || undefined}
          merchant={matchedTool.merchant}
          imageUrl={matchedTool.imageUrl}
        />
      )}

      {/* Tags & Bottom Share */}
      <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
            <Tag className="h-3 w-3" />
            Tags:
          </span>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground">Share article:</span>
          <ShareButton
            title={post.title}
            text={post.excerpt}
            url={`/blog/${post.slug}`}
            variant="outline"
            size="sm"
          />
        </div>
      </div>

      {/* Author Bio Card */}
      <div className="my-10 rounded-xl border border-border bg-card p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Image
            src="/profile.png"
            alt="Tanmay Vaij"
            width={56}
            height={56}
            style={{ width: "auto", height: "auto" }}
            className="h-14 w-14 rounded-full object-cover border border-border shadow-xs shrink-0"
          />
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground text-base">Written by Tanmay Vaij</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Senior Full Stack & Systems Engineer based in Bengaluru. Tanmay writes about Next.js performance, microservice reliability, distributed caching, and AI agent architectures.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <Link href="/about" className="text-primary hover:underline font-medium">
                View Full Bio & Experience →
              </Link>
              <span className="text-muted-foreground">•</span>
              <a
                href="https://www.linkedin.com/in/tanmayvaij/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground hover:underline font-medium"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
                LinkedIn Profile
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="mt-12 border-t border-border/80 pt-8">
          <FadeIn direction="up">
            <h2 className="text-xl font-bold tracking-tight text-foreground mb-4">
              Related Blogs
            </h2>
          </FadeIn>
          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {relatedPosts.map((related) => (
              <StaggerItem key={related.slug} className="h-full">
                <MotionCard hoverY={-3} className="h-full flex flex-col justify-between">
                  <div className="rounded-lg border border-border bg-card/60 p-4 hover:border-primary/40 transition-colors h-full flex flex-col justify-between">
                    <div>
                      <Badge variant="secondary" className="text-[10px] mb-2">
                        {related.category}
                      </Badge>
                      <h4 className="font-semibold text-sm leading-snug line-clamp-2">
                        <Link href={`/blog/${related.slug}`} className="hover:text-primary transition-colors">
                          {related.title}
                        </Link>
                      </h4>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-2">
                      {related.excerpt}
                    </p>
                  </div>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}
    </main>
  )
}
