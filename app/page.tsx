import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, BookOpen, Cpu, Layers, Sparkles, ExternalLink, Star, ShoppingBag, Play } from "lucide-react"
import { GithubIcon, LinkedinIcon, YouTubeIcon, InstagramIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { portfolioData } from "@/lib/data/portfolio"
import { getAllPosts } from "@/lib/db/posts"
import { getFeaturedAffiliates } from "@/lib/db/affiliates"
import { getFeaturedShorts } from "@/lib/db/shorts"
import { getAboutConfig } from "@/lib/db/about"
import { AdBanner } from "@/components/adsense/AdBanner"
import { FadeIn, StaggerContainer, StaggerItem, MotionCard } from "@/components/motion"

export const metadata: Metadata = {
  title: "Tanmay Vaij — Software Engineer, Tech Creator & Desk Setup",
  description:
    "Engineering portfolio, technical field guides, and curated workspace gear, desk setup accessories, and book recommendations by Tanmay Vaij.",
  alternates: {
    canonical: "https://tanmayvaij.dev",
  },
  openGraph: {
    title: "Tanmay Vaij — Software Engineer, Tech Creator & Desk Setup",
    description:
      "Building scalable web systems, sharing architectural field guides, and curating ergonomic desk setups, audio gear, and essential books.",
    url: "https://tanmayvaij.dev",
    siteName: "Tanmay Vaij",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://tanmayvaij.dev/og-image.png",
        secureUrl: "https://tanmayvaij.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tanmay Vaij — Software Engineer, Tech Creator & Desk Setup",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanmay Vaij — Software Engineer & Tech Creator",
    description:
      "Engineering field guides, open-source software, and curated workspace setups.",
    creator: "@tanmayvaij",
    images: ["https://tanmayvaij.dev/og-image.png"],
  },
}

export const instant = false

export default async function HomePage() {
  const [allPosts, featuredGear, featuredShorts, about] = await Promise.all([
    getAllPosts(),
    getFeaturedAffiliates(),
    getFeaturedShorts(4),
    getAboutConfig(),
  ])

  const recentPosts = allPosts.slice(0, 3)

  const heroTitle = about.heroTitle || "Building scalable web systems, thoughtful products, and"
  const heroHighlight = about.heroHighlight || "curating workspace gear."
  const heroSubtitle =
    about.heroSubtitle ||
    "Hello, I'm **Tanmay Vaij** — a software engineer and tech creator based in Bengaluru. Here I document engineering field guides, share open-source platforms, and review ergonomic desk setups, audio gear, and books."

  return (
    <main className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-muted/40 via-background to-background py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-8 flex flex-col items-start gap-5">
              <FadeIn direction="up" delay={0.1}>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground leading-[1.15]">
                  {heroTitle}{" "}
                  {heroHighlight && (
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-violet-400">
                      {heroHighlight}
                    </span>
                  )}
                </h1>
              </FadeIn>

              <FadeIn direction="up" delay={0.18}>
                <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed mt-1">
                  {heroSubtitle.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return (
                        <strong key={i} className="text-foreground font-semibold">
                          {part.slice(2, -2)}
                        </strong>
                      )
                    }
                    return part
                  })}
                </p>
              </FadeIn>

              {/* CTAs */}
              <FadeIn direction="up" delay={0.25}>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="h-10 px-5 text-sm">
                    <Link href="/projects">
                      Explore Projects
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-10 px-5 text-sm">
                    <Link href="/blog">
                      <BookOpen className="mr-1.5 h-4 w-4" />
                      Read Blog
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-10 px-5 text-sm">
                    <Link href="/tools">
                      <ShoppingBag className="mr-1.5 h-4 w-4" />
                      Desk Setup & Gear
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="lg" className="h-10 px-4 text-sm">
                    <a
                      href="https://github.com/tanmayvaij"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      <GithubIcon className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="lg" className="h-10 px-4 text-sm">
                    <a
                      href="https://www.linkedin.com/in/tanmayvaij/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      <LinkedinIcon className="h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="lg" className="h-10 px-4 text-sm hover:text-red-500">
                    <a
                      href="https://www.youtube.com/channel/UC6y7NAEEm-U97DLfHc__l9w"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                      title="YouTube Shorts Channel"
                    >
                      <YouTubeIcon className="h-4 w-4 text-red-500" />
                      Shorts
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="lg" className="h-10 px-4 text-sm hover:text-pink-500">
                    <a
                      href="https://www.instagram.com/tony.man.22/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                      title="Instagram Profile"
                    >
                      <InstagramIcon className="h-4 w-4 text-pink-500" />
                      Instagram
                    </a>
                  </Button>
                </div>
              </FadeIn>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <FadeIn direction="left" delay={0.2} className="relative">
                {/* Subtle decorative glow */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-blue-500/20 via-indigo-500/10 to-violet-500/20 blur-2xl -z-10" />

                <div className="relative rounded-3xl border-2 border-border/80 bg-card p-3 shadow-xl backdrop-blur-xs transition-transform duration-300 hover:scale-[1.02]">
                  <Image
                    src="/profile.png"
                    alt="Tanmay Vaij - Senior Software Engineer"
                    width={320}
                    height={380}
                    style={{ width: "auto", height: "auto" }}
                    className="w-64 sm:w-72 lg:w-80 rounded-2xl object-cover shadow-sm"
                    priority
                  />

                  {/* Floating badge */}
                  <div className="absolute -bottom-3 -left-3 rounded-xl border border-border bg-card/95 backdrop-blur-md px-3.5 py-2 shadow-lg flex items-center gap-2.5">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-foreground">Tanmay Vaij</span>
                      <span className="text-[10px] text-muted-foreground">Senior Systems & Next.js</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Policy-Compliant Ad Banner Slot */}
      <AdBanner format="horizontal" slot="1000000001" label="Sponsored" />

      {/* Blogs Section */}
      {recentPosts.length > 0 && (
        <section className="w-full border-t border-border/60 bg-muted/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <Badge variant="outline" className="mb-2">Blogs</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Blogs
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Articles, insights, tutorials, and personal writings.
                </p>
              </div>
              <Button asChild variant="ghost" size="sm" className="self-start sm:self-auto">
                <Link href="/blog" className="gap-1">
                  Explore All Blogs ({allPosts.length})
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
            {recentPosts.map((post) => {
              const postHref = `/blog/${post.slug}`
              return (
                <StaggerItem key={post.slug} className="group flex flex-col">
                  {/* Pinterest Visual Pin Card */}
                  <div className="relative w-full overflow-hidden rounded-2xl bg-muted/60 border border-border/60 shadow-xs group-hover:shadow-xl group-hover:border-primary/40 transition-all duration-300">
                    {/* Background Clickable Link to Blog Post */}
                    <Link
                      href={postHref}
                      className="block w-full"
                      aria-label={post.title}
                    >
                      {post.coverImage ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      ) : (
                        /* Fallback aesthetic gradient pin when no image is uploaded */
                        <div className="aspect-[16/10] w-full flex flex-col justify-between p-6 bg-gradient-to-br from-card via-muted/40 to-muted/80 relative overflow-hidden">
                          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-background/80 px-2 py-0.5 rounded-md border border-border/50">
                              {post.category}
                            </span>
                            <BookOpen className="h-5 w-5 text-muted-foreground/60" />
                          </div>
                          <div>
                            <span className="text-base font-bold tracking-tight text-foreground/90 line-clamp-2">
                              {post.title}
                            </span>
                            <span className="text-[11px] text-muted-foreground font-mono mt-1 block">
                              {post.readTime}
                            </span>
                          </div>
                        </div>
                      )}
                    </Link>

                    {/* Pinterest Hover Overlay (sibling to base Link, no nested <a> tags) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10 pointer-events-none">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white shadow-xs">
                          {post.category}
                        </span>
                        <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-zinc-300 shadow-xs">
                          {post.readTime}
                        </span>
                      </div>

                      {/* Bottom Action Pill */}
                      <div className="flex items-center justify-between pointer-events-auto">
                        <span className="text-[11px] font-medium text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                          {post.publishedAt}
                        </span>

                        <Link
                          href={postHref}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:scale-105"
                        >
                          Read Blog
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Pinterest Bottom Caption */}
                  <div className="pt-2.5 pb-1 px-1 space-y-0.5">
                    <Link href={postHref} className="block">
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {post.title}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{post.category}</span>
                      <span>{post.publishedAt}</span>
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>
      )}

      {/* Daily YouTube Shorts Section */}
      {featuredShorts.length > 0 && (
        <section className="w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border/50">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <Badge variant="outline" className="mb-2 text-red-500 border-red-500/30 gap-1.5">
                  <YouTubeIcon className="h-3 w-3 text-red-500" />
                  YouTube Shorts
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Finance & Lifestyle Micro-Education
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Daily practical breakdowns on personal finance, wealth compounding, and modern lifestyle habits.
                </p>
              </div>
              <Button asChild variant="ghost" size="sm" className="self-start sm:self-auto text-xs gap-1">
                <Link href="/shorts">
                  Watch All Shorts
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
            {featuredShorts.map((short) => {
              const thumbnail =
                short.thumbnailUrl ||
                `https://img.youtube.com/vi/${short.videoId}/hqdefault.jpg`

              return (
                <StaggerItem key={short.id} className="group flex flex-col">
                  <Link
                    href={`/shorts`}
                    className="block relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black border border-border/70 shadow-xs group-hover:border-red-500/50 group-hover:shadow-xl transition-all duration-300"
                    aria-label={short.title}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbnail}
                      alt={short.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

                    <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                      <span className="rounded-full bg-black/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-medium text-white border border-white/10">
                        {short.category}
                      </span>
                    </div>

                    <div className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-600/90 text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 pointer-events-none">
                      <Play className="h-5 w-5 fill-white ml-0.5" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-3 z-10 pointer-events-none">
                      <h3 className="font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug">
                        {short.title}
                      </h3>
                      <span className="text-[11px] text-red-400 font-medium mt-1 inline-flex items-center gap-1">
                        Watch Short
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </section>
      )}

      {/* Curated Workspace & Everyday Gear Section */}
      {featuredGear.length > 0 && (
        <section className="w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 border-t border-border/50">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <Badge variant="outline" className="mb-2">Desk Setup & Hardware</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                My Workspace Setup & Curated Picks
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Ergonomic desk gear, mechanical keyboards, audio accessories, and books I use daily to build and write.
              </p>
            </div>
            <Button asChild variant="ghost" size="sm" className="self-start sm:self-auto">
              <Link href="/tools" className="gap-1">
                View All Gear & Picks
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-start">
          {featuredGear.slice(0, 4).map((item) => {
            const isAmazon = item.merchant?.toLowerCase() === "amazon"
            const productHref = `/tools/${item.slug || item.id}`

            return (
              <StaggerItem key={item.id} className="group flex flex-col">
                {/* Pinterest Visual Pin Card */}
                <div className="relative w-full overflow-hidden rounded-2xl bg-muted/60 border border-border/60 shadow-xs group-hover:shadow-xl group-hover:border-primary/40 transition-all duration-300">
                  {/* Background Clickable Link to Product Page */}
                  <Link
                    href={productHref}
                    className="block w-full"
                    aria-label={item.name}
                  >
                    {item.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      /* Fallback aesthetic gradient pin when no image is uploaded */
                      <div className="aspect-[16/10] w-full flex flex-col justify-between p-5 bg-gradient-to-br from-card via-muted/40 to-muted/80 relative overflow-hidden">
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-background/80 px-2 py-0.5 rounded-md border border-border/50">
                            {item.category}
                          </span>
                          <ShoppingBag className="h-5 w-5 text-muted-foreground/60" />
                        </div>
                        <div>
                          <span className="text-sm font-bold tracking-tight text-foreground/90 line-clamp-2">
                            {item.name}
                          </span>
                          {item.price && (
                            <span className="text-[11px] font-semibold text-emerald-500 dark:text-emerald-400 font-mono mt-1 block">
                              {item.price}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </Link>

                  {/* Pinterest Hover Overlay (sibling to base Link, no nested <a> tags) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10 pointer-events-none">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white shadow-xs">
                        {item.category}
                      </span>
                      {isAmazon ? (
                        <span className="rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 shadow-xs">
                          Amazon
                        </span>
                      ) : item.rating ? (
                        <span className="flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-0.5 text-[11px] font-semibold text-amber-400 shadow-xs">
                          <Star className="h-3 w-3 fill-amber-400" />
                          {item.rating}
                        </span>
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* Bottom Action Pill */}
                    <div className="flex items-center justify-between pointer-events-auto">
                      <span className="text-[11px] font-semibold text-emerald-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                        {item.price || item.badge || "Featured"}
                      </span>

                      <Link
                        href={productHref}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:scale-105"
                      >
                        View Product
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Pinterest Bottom Caption */}
                <div className="pt-2.5 pb-1 px-1 space-y-0.5">
                  <Link href={productHref} className="block">
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{item.category}</span>
                    <span className="font-medium text-foreground">{item.price || item.badge}</span>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </section>
      )}

      {/* Technical Philosophy / Architecture Highlights */}
      <section className="w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/40 p-8 sm:p-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col gap-2">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground text-base">Systems-First Engineering</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Prioritizing bounded latency, zero-copy serialization, and resilient failure modes over cosmetic complexity.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground text-base">Modern Web Performance</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Deep mastery of React Server Components, hydration boundaries, and sub-100ms Largest Contentful Paint.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="h-10 w-10 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-1">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground text-base">Autonomous AI Agents</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Designing deterministic state graphs, sandboxed tool execution runtimes, and low-latency vector retrieval.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  )
}
