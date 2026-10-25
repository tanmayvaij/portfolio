import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  ExternalLink,
  Layers,
  Sparkles,
  Tag,
  CheckCircle2,
  Code2,
  ArrowRight,
  TrendingUp,
  Image as ImageIcon,
} from "lucide-react"
import { getAllProjects, getProjectBySlug } from "@/lib/db/projects"
import { getFeaturedAffiliates } from "@/lib/db/affiliates"
import { verifyAdminAuth } from "@/app/actions/admin"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "@/components/icons"
import { ShareButton } from "@/components/ui/share-button"
import { AdBanner } from "@/components/adsense/AdBanner"
import { AffiliateCallout } from "@/components/affiliate/AffiliateCallout"
import { ReadingProgressBar, FadeIn, StaggerContainer, StaggerItem, MotionCard } from "@/components/motion"
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { ArticleRenderer } from "@/app/blog/[slug]/article-renderer"

interface PageProps {
  params: Promise<{ slug: string }>
}

export const instant = false

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((p) => ({
    slug: p.slug || p.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return {
      title: "Project Not Found | Tanmay Vaij",
    }
  }

  const pageUrl = `https://tanmayvaij.dev/projects/${project.slug || project.id}`

  return {
    title: `${project.title} | Engineering Case Study`,
    description: project.description,
    keywords: project.tags,
    authors: [{ name: "Tanmay Vaij", url: "https://tanmayvaij.dev" }],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${project.title} | Architecture Case Study`,
      description: project.description,
      type: "article",
      url: pageUrl,
      siteName: "Tanmay Vaij Engineering Portfolio",
      locale: "en_US",
      tags: project.tags,
      ...(project.featuredImage ? { images: [{ url: project.featuredImage, alt: project.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Architecture Case Study`,
      description: project.description,
      creator: "@tanmayvaij",
      ...(project.featuredImage ? { images: [project.featuredImage] } : {}),
    },
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  // If project is in draft mode, hide from public visitors (allow admin preview)
  const isAuth = await verifyAdminAuth()
  if (project.published === false && !isAuth) {
    notFound()
  }

  const allProjects = await getAllProjects()
  const relatedProjects = allProjects
    .filter((p) => (p.slug || p.id) !== (project.slug || project.id))
    .slice(0, 2)

  const featuredTools = await getFeaturedAffiliates()
  const matchedTool =
    featuredTools.find((t) =>
      project.tags.some(
        (tag) =>
          t.category.toLowerCase().includes(tag.toLowerCase()) ||
          t.name.toLowerCase().includes(tag.toLowerCase())
      )
    ) || featuredTools[0]

  // Parse screenshots list
  const screenshotsList = project.screenshots
    ? project.screenshots
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    : []

  const projectUrl = `https://tanmayvaij.dev/projects/${project.slug || project.id}`

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: project.category,
    operatingSystem: "Cloud / Web",
    url: projectUrl,
    author: {
      "@type": "Person",
      name: "Tanmay Vaij",
      url: "https://tanmayvaij.dev",
    },
    ...(project.featuredImage ? { image: project.featuredImage } : {}),
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <ReadingProgressBar />

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Draft Mode Preview Banner for Admin */}
      {project.published === false && (
        <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-700 dark:text-amber-400 flex items-center justify-between">
          <span className="font-semibold">⚠️ Draft Mode — This project is currently unlisted and hidden from public visitors.</span>
          <Link href="/admin" className="underline font-medium hover:text-amber-900 dark:hover:text-amber-200">
            Open Admin
          </Link>
        </div>
      )}

      {/* Back button & Breadcrumbs */}
      <FadeIn direction="up">
        <div className="mb-6 flex items-center justify-between">
          <Button asChild variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <Link href="/projects">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to All Projects
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono hidden sm:inline">
              projects/{project.slug || project.id}
            </span>
            <ShareButton
              title={project.title}
              text={project.description}
              url={`/projects/${project.slug || project.id}`}
              variant="ghost"
              size="sm"
              label={false}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>

        {/* Project Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-xs font-medium">
              {project.category}
            </Badge>

            {project.featured && (
              <Badge variant="outline" className="text-xs text-amber-600 dark:text-amber-400 border-amber-500/30 gap-1">
                <Sparkles className="h-3 w-3" />
                Featured Production Architecture
              </Badge>
            )}

            {project.metrics && (
              <Badge variant="outline" className="text-xs text-emerald-600 dark:text-emerald-400 border-emerald-500/30 gap-1 font-semibold">
                <TrendingUp className="h-3 w-3" />
                {project.metrics}
              </Badge>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.2] break-words">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2 pb-4 border-b border-border/60">
            {project.liveUrl && (
              <Button asChild size="sm" className="h-9 px-4 text-xs gap-1.5 font-medium">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Launch Live Demo
                  <ExternalLink className="h-3.5 w-3.5 ml-0.5" />
                </a>
              </Button>
            )}

            {project.showGithub !== false && project.githubUrl && (
              <Button asChild variant="outline" size="sm" className="h-9 px-4 text-xs gap-1.5 font-medium">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="h-3.5 w-3.5" />
                  GitHub Repository
                </a>
              </Button>
            )}

            <ShareButton
              title={project.title}
              text={project.description}
              url={`/projects/${project.slug || project.id}`}
              variant="outline"
              size="sm"
              className="h-9 px-4 text-xs"
            />
          </div>
        </header>

        {/* Featured Cover / Hero Image */}
        {project.featuredImage && (
          <div className="relative mt-8 w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.featuredImage}
              alt={project.title}
              className="w-full h-auto block"
            />
          </div>
        )}
      </FadeIn>

      {/* Top Ad Unit */}
      <div className="my-8">
        <AdBanner slot="4000000001" format="horizontal" label="Advertisement" />
      </div>

      {/* Key Architectural Highlights Card */}
      {project.highlights && project.highlights.length > 0 && (
        <FadeIn direction="up">
          <section className="my-8 rounded-xl border border-primary/20 bg-primary/5 p-5 sm:p-6 shadow-xs">
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-3 flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Key Architectural & Engineering Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90 bg-card/60 p-3 rounded-lg border border-border/50">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{highlight}</span>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Detailed Architectural Breakdown / Long Description */}
      <section className="my-8 space-y-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-2">
          <Code2 className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-bold text-foreground">
            System Design & Architectural Deep Dive
          </h2>
        </div>

        <article className="prose prose-neutral dark:prose-invert max-w-none py-2">
          <ArticleRenderer content={project.longDescription} />
        </article>
      </section>

      {/* Project Screenshots Gallery */}
      {screenshotsList.length > 0 && (
        <FadeIn direction="up">
          <section className="my-10 space-y-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-primary" />
                Project Screenshots & System Topologies ({screenshotsList.length})
              </h2>
              <span className="text-xs text-muted-foreground">Click to view full image</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {screenshotsList.map((src, idx) => (
                <a
                  key={idx}
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm hover:border-primary transition-all duration-300"
                  title={`View Screenshot ${idx + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium gap-1.5">
                    <ExternalLink className="h-4 w-4" />
                    Open Full Image
                  </div>
                </a>
              ))}
            </div>
          </section>
        </FadeIn>
      )}

      {/* Tech Stack Tags & Share */}
      <div className="my-8 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5 mr-1">
            <Tag className="h-3.5 w-3.5" />
            Technologies Used:
          </span>
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs py-0.5">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground">Share case study:</span>
          <ShareButton
            title={project.title}
            text={project.description}
            url={`/projects/${project.slug || project.id}`}
            variant="outline"
            size="sm"
          />
        </div>
      </div>

      {/* Middle/Bottom AdSense Banner */}
      <div className="my-8">
        <AdBanner slot="4000000002" format="auto" label="Sponsored Content" />
      </div>

      {/* Recommended Development Tools / Gear Callout */}
      {matchedTool && (
        <AffiliateCallout
          title={matchedTool.name}
          toolName={matchedTool.name}
          badge={matchedTool.badge || "Recommended Stack"}
          description={matchedTool.description}
          affiliateUrl={matchedTool.affiliateUrl}
          discountCode={matchedTool.discountCode || undefined}
          price={matchedTool.price || undefined}
          rating={matchedTool.rating || undefined}
          merchant={matchedTool.merchant}
          imageUrl={matchedTool.imageUrl}
        />
      )}

      {/* Related Projects / Next Case Studies */}
      {relatedProjects.length > 0 && (
        <section className="my-12 pt-8 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-foreground">
                More Engineering Projects
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Explore more architectures and open-source systems.
              </p>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs gap-1">
              <Link href="/projects">
                View All
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((rel) => (
              <StaggerItem key={rel.id || rel.slug}>
                <MotionCard className="flex flex-col justify-between h-full hover:border-primary/40 hover:shadow-md transition-shadow bg-card overflow-hidden">
                  {rel.featuredImage && (
                    <Link href={`/projects/${rel.slug || rel.id}`} className="block relative aspect-[2/1] w-full overflow-hidden bg-muted border-b border-border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rel.featuredImage}
                        alt={rel.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </Link>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-[10px]">
                        {rel.category}
                      </Badge>
                      {rel.metrics && (
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          {rel.metrics}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-base hover:text-primary transition-colors">
                      <Link href={`/projects/${rel.slug || rel.id}`}>{rel.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-2 mt-1">
                      {rel.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="border-t border-border/50 pt-3 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{rel.tags.slice(0, 3).join(", ")}</span>
                    <Link
                      href={`/projects/${rel.slug || rel.id}`}
                      className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Case Study
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </CardFooter>
                </MotionCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}
    </main>
  )
}

