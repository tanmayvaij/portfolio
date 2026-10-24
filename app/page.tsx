import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight, BookOpen, Cpu, Layers, Sparkles, ExternalLink, Star, ShoppingBag } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { portfolioData } from "@/lib/data/portfolio"
import { getAllPosts } from "@/lib/db/posts"
import { getAllProjects } from "@/lib/db/projects"
import { getFeaturedAffiliates } from "@/lib/db/affiliates"
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanmay Vaij — Software Engineer & Tech Creator",
    description:
      "Engineering field guides, open-source software, and curated workspace setups.",
    creator: "@tanmayvaij",
  },
}

export const instant = false

export default async function HomePage() {
  const allProjects = await getAllProjects()
  const featuredProjects = allProjects.filter((p) => p.featured)
  const allPosts = await getAllPosts()
  const recentPosts = allPosts.slice(0, 3)
  const featuredGear = await getFeaturedAffiliates()

  return (
    <main className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="relative w-full border-b border-border/50 bg-gradient-to-b from-muted/40 via-background to-background py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-8 flex flex-col items-start gap-5">
              <FadeIn direction="up" delay={0.1}>
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground leading-[1.15]">
                  Building scalable web systems, thoughtful products, and{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-300 dark:to-violet-400">
                    curating workspace gear.
                  </span>
                </h1>
              </FadeIn>

              <FadeIn direction="up" delay={0.18}>
                <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed mt-1">
                  Hello, I&apos;m <strong className="text-foreground font-semibold">Tanmay Vaij</strong> — a software engineer and tech creator based in Bengaluru. Here I document engineering field guides, share open-source platforms, and review ergonomic desk setups, audio gear, and books.
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
                </div>
              </FadeIn>

              {/* Stats row */}
              <FadeIn direction="up" delay={0.32} fullWidth>
                <div className="mt-6 flex flex-wrap items-center gap-8 sm:gap-14 border-t border-border/60 pt-6">
                  {portfolioData.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                        {stat.value}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium mt-0.5">
                        {stat.label}
                      </span>
                    </div>
                  ))}
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
                    style={{ height: "auto" }}
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
      <section className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 my-2">
        <AdBanner format="horizontal" slot="1000000001" label="Sponsored" />
      </section>

      {/* Featured Projects Section */}
      <section className="w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <Badge variant="outline" className="mb-2">Portfolio</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Featured Engineering Work
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Production architectures, developer frameworks, and open-source contributions.
              </p>
            </div>
            <Button asChild variant="ghost" size="sm" className="self-start sm:self-auto">
              <Link href="/projects" className="gap-1">
                View All Projects
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
          {featuredProjects.map((project) => {
            const projectHref = `/projects/${project.slug || project.id}`
            return (
              <StaggerItem key={project.id} className="group flex flex-col">
                {/* Pinterest Visual Pin Card */}
                <div className="relative w-full overflow-hidden rounded-2xl bg-muted/60 border border-border/60 shadow-xs group-hover:shadow-xl group-hover:border-primary/40 transition-all duration-300">
                  {/* Background Clickable Link to Case Study */}
                  <Link
                    href={projectHref}
                    className="block w-full"
                    aria-label={project.title}
                  >
                    {project.featuredImage ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={project.featuredImage}
                        alt={project.title}
                        className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      /* Fallback aesthetic gradient pin when no image is uploaded */
                      <div className="aspect-[16/10] w-full flex flex-col justify-between p-6 bg-gradient-to-br from-card via-muted/40 to-muted/80 relative overflow-hidden">
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-background/80 px-2 py-0.5 rounded-md border border-border/50">
                            {project.category}
                          </span>
                          <Layers className="h-5 w-5 text-muted-foreground/60" />
                        </div>
                        <div>
                          <span className="text-base font-bold tracking-tight text-foreground/90 line-clamp-2">
                            {project.title}
                          </span>
                          <span className="text-[11px] text-muted-foreground font-mono mt-1 block">
                            Click to explore case study
                          </span>
                        </div>
                      </div>
                    )}
                  </Link>

                  {/* Pinterest Hover Overlay (sibling to base Link, no nested <a> tags) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10 pointer-events-none">
                    {/* Top Badges & External Actions */}
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white shadow-xs">
                        {project.category}
                      </span>

                      <div className="flex items-center gap-1.5 pointer-events-auto">
                        {project.showGithub !== false && project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center shadow-xs"
                            title="GitHub Repository"
                          >
                            <GithubIcon className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center shadow-xs"
                            title="Live Platform"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Pill */}
                    <div className="flex items-center justify-between pointer-events-auto">
                      {project.metrics ? (
                        <span className="text-[11px] font-semibold text-emerald-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                          {project.metrics}
                        </span>
                      ) : (
                        <div />
                      )}

                      <Link
                        href={projectHref}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:scale-105"
                      >
                        Case Study
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Pinterest Bottom Caption */}
                <div className="pt-2.5 pb-1 px-1 space-y-0.5">
                  <Link href={projectHref} className="block">
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{project.category}</span>
                    {project.metrics && (
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        {project.metrics}
                      </span>
                    )}
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </section>

      {/* Technical Blog / Publications Section */}
      <section className="w-full border-t border-border/60 bg-muted/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <Badge variant="outline" className="mb-2">Technical Journal</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  In-Depth Technical Articles
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Field guides on system design, web performance, Next.js internals, and distributed databases.
                </p>
              </div>
              <Button asChild variant="ghost" size="sm" className="self-start sm:self-auto">
                <Link href="/blog" className="gap-1">
                  Explore All Articles ({allPosts.length})
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {recentPosts.map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <MotionCard className="flex flex-col justify-between h-full hover:border-primary/40 hover:shadow-md transition-shadow bg-card">
                  <CardHeader>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <Badge variant="secondary" className="text-[10px]">
                        {post.category}
                      </Badge>
                      <span>{post.readTime}</span>
                    </div>
                    <CardTitle className="text-base line-clamp-2 leading-snug hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-3 mt-1 leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardFooter className="border-t border-border/40 pt-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.publishedAt}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-medium text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Read article
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </CardFooter>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Curated Workspace & Everyday Gear Section */}
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

        <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredGear.slice(0, 4).map((item) => {
            const isAmazon = item.merchant?.toLowerCase() === "amazon"

            return (
              <StaggerItem key={item.id} className="h-full">
                <MotionCard className="flex flex-col justify-between h-full hover:border-primary/40 hover:shadow-md transition-shadow bg-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <Badge variant="secondary" className="text-[10px]">
                        {item.category}
                      </Badge>
                      {isAmazon && (
                        <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
                          Amazon
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-sm font-bold line-clamp-2 leading-snug">
                      {item.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 pt-1 text-xs">
                      {item.rating && (
                        <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                          <Star className="h-3 w-3 fill-amber-500" />
                          {item.rating}
                        </span>
                      )}
                      {item.rating && item.price && (
                        <span className="text-muted-foreground text-xs">•</span>
                      )}
                      {item.price && (
                        <span className="font-bold text-foreground">{item.price}</span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 text-xs text-muted-foreground line-clamp-2">
                    {item.description}
                  </CardContent>

                  <CardFooter className="border-t border-border/40 pt-3 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-muted-foreground/70">{item.badge || "Top Pick"}</span>
                    <Button asChild size="xs" variant="outline" className="h-7 text-xs">
                      <a
                        href={item.affiliateUrl}
                        target="_blank"
                        rel="sponsored nofollow noopener noreferrer"
                        className="inline-flex items-center gap-1"
                      >
                        {isAmazon ? "View on Amazon" : "View"}
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    </Button>
                  </CardFooter>
                </MotionCard>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </section>

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
