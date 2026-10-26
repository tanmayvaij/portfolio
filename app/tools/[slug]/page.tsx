import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Star,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Info,
} from "lucide-react"
import { getAffiliateBySlug, getAllAffiliates } from "@/lib/db/affiliates"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShareButton } from "@/components/ui/share-button"
import { PromoCodeBox } from "@/components/affiliate/PromoCodeBox"
import { AdBanner } from "@/components/adsense/AdBanner"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion"
import { ArticleRenderer } from "@/app/blog/[slug]/article-renderer"

interface PageProps {
  params: Promise<{ slug: string }>
}

export const instant = false

export async function generateStaticParams() {
  const tools = await getAllAffiliates()
  if (tools.length === 0) {
    return [{ slug: "__placeholder__" }]
  }
  return tools.map((tool) => ({
    slug: tool.slug || tool.id,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = await getAffiliateBySlug(slug)

  if (!tool) {
    return {
      title: "Product Not Found",
    }
  }

  const isAmazon = tool.merchant?.toLowerCase() === "amazon"
  const title = `${tool.name} — Review & Recommendations | Tanmay Vaij`
  const rawDescription =
    tool.description ||
    `Curated review and recommendations for ${tool.name}. Explore specs, deals, and daily workflow insights by Tanmay Vaij.`
  const cleanDescription = rawDescription
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim()
  const pageUrl = `https://tanmayvaij.dev/tools/${tool.slug || tool.id}`
  const ogImageUrl =
    tool.imageUrl && (tool.imageUrl.startsWith("http://") || tool.imageUrl.startsWith("https://"))
      ? tool.imageUrl
      : tool.imageUrl
      ? `https://tanmayvaij.dev${tool.imageUrl.startsWith("/") ? tool.imageUrl : `/${tool.imageUrl}`}`
      : "https://tanmayvaij.dev/og-image.png"

  return {
    title,
    description: cleanDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description: cleanDescription,
      url: pageUrl,
      siteName: "Tanmay Vaij",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 1200,
          height: 630,
          alt: tool.name,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cleanDescription,
      creator: "@tanmayvaij",
      site: "@tanmayvaij",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
    },
  }
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params
  const tool = await getAffiliateBySlug(slug)

  if (!tool) {
    notFound()
  }

  const allTools = await getAllAffiliates()
  const relatedTools = allTools
    .filter(
      (t) =>
        t.id !== tool.id &&
        (t.category === tool.category || t.merchant === tool.merchant)
    )
    .slice(0, 3)

  const isAmazon = tool.merchant?.toLowerCase() === "amazon"

  // Schema.org Product Rich Snippet
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: tool.name,
    description: tool.description,
    ...(tool.imageUrl ? { image: tool.imageUrl } : {}),
    brand: {
      "@type": "Brand",
      name: tool.merchant || "Recommended Gear",
    },
    category: tool.category,
    ...(tool.price
      ? {
          offers: {
            "@type": "Offer",
            price: tool.price.replace(/[^0-9.]/g, "") || "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url: tool.affiliateUrl,
          },
        }
      : {}),
    ...(tool.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: tool.rating,
            reviewCount: 38,
          },
        }
      : {}),
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Navigation & Share Bar */}
      <FadeIn direction="up">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Button asChild variant="ghost" size="sm" className="gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <Link href="/tools">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to All Gear & Picks
            </Link>
          </Button>

          <ShareButton
            title={`${tool.name} | Recommended by Tanmay Vaij`}
            text={tool.description}
            url={`/tools/${tool.slug || tool.id}`}
            variant="outline"
            size="sm"
            label="Share Product"
          />
        </div>
      </FadeIn>

      {/* Hero 2-Column Product Showcase */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
        {/* Left Column: Visual Showcase */}
        <div className="lg:col-span-6 space-y-4">
          <FadeIn direction="up">
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
              {tool.imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={tool.imageUrl}
                  alt={tool.name}
                  className="w-full h-auto block"
                />
              ) : (
                <div className="aspect-[4/3] w-full flex flex-col justify-between p-8 bg-gradient-to-br from-card via-muted/50 to-muted/80 relative overflow-hidden">
                  <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground bg-background/90 px-2.5 py-1 rounded-md border border-border/60">
                      {tool.category}
                    </span>
                    <ShoppingBag className="h-6 w-6 text-muted-foreground/60" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground line-clamp-2">
                      {tool.name}
                    </h2>
                    {tool.price && (
                      <span className="text-sm font-semibold text-emerald-500 dark:text-emerald-400 font-mono mt-2 block">
                        {tool.price}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </FadeIn>

          {/* Quick Spec Pills */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-border bg-card/60 p-3">
              <span className="text-[11px] text-muted-foreground block">Category</span>
              <span className="font-semibold text-foreground mt-0.5 block truncate">{tool.category}</span>
            </div>
            <div className="rounded-xl border border-border bg-card/60 p-3">
              <span className="text-[11px] text-muted-foreground block">Merchant / Platform</span>
              <span className="font-semibold text-foreground mt-0.5 block truncate">{tool.merchant}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details & Primary CTA */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <FadeIn direction="up" delay={0.1}>
            <div className="space-y-3">
              {/* Badges Row */}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  {tool.category}
                </Badge>
                {isAmazon && (
                  <span className="rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold px-2.5 py-0.5 text-[10px] uppercase tracking-wider">
                    Amazon Associate
                  </span>
                )}
                {tool.badge && (
                  <Badge variant="success" className="text-xs gap-1">
                    <Sparkles className="h-3 w-3" />
                    {tool.badge}
                  </Badge>
                )}
                {tool.rating && (
                  <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                    {tool.rating.toFixed(1)} / 5.0
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                {tool.name}
              </h1>

              {/* Pricing Callout */}
              {tool.price && (
                <div className="pt-1">
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {tool.price}
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    (Standard or verified promotional pricing)
                  </span>
                </div>
              )}

              {/* Description */}
              <div className="pt-2 text-sm sm:text-base leading-relaxed text-muted-foreground [&>div>p:first-child]:mt-0 [&>div>*:last-child]:mb-0">
                <ArticleRenderer content={tool.description} />
              </div>
            </div>
          </FadeIn>

          {/* Promo Code Box */}
          {tool.discountCode && (
            <FadeIn direction="up" delay={0.15}>
              <PromoCodeBox
                code={tool.discountCode}
                label={`Special Promo Code for ${tool.name}:`}
              />
            </FadeIn>
          )}

          {/* CTA Actions */}
          <FadeIn direction="up" delay={0.2}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Button asChild size="lg" className="h-12 text-sm font-bold gap-2 shadow-md">
                <a
                  href={tool.affiliateUrl}
                  target="_blank"
                  rel="sponsored nofollow noopener noreferrer"
                >
                  {isAmazon ? (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      View on Amazon
                    </>
                  ) : (
                    <>
                      Claim Deal on {tool.merchant}
                      <ArrowUpRight className="h-4 w-4 ml-0.5" />
                    </>
                  )}
                </a>
              </Button>

              <ShareButton
                title={`${tool.name} | Recommended by Tanmay Vaij`}
                text={tool.description.replace(/\*\*(.*?)\*\*/g, "$1").replace(/^[-*]\s+/gm, "").trim()}
                url={`/tools/${tool.slug || tool.id}`}
                variant="outline"
                size="lg"
                label="Share Deal"
                className="h-12 text-sm font-semibold"
              />
            </div>
          </FadeIn>

          {/* Trust Indicators */}
          <div className="rounded-xl border border-border/60 bg-muted/30 p-4 space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 font-medium text-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Personally verified and recommended by Tanmay Vaij</span>
            </div>
            <div className="flex items-center gap-2 font-medium text-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Zero extra cost to you — purchases support engineering field guides</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ad Unit (automatically hides when no AdSense client ID configured) */}
      <AdBanner slot="7000000003" format="horizontal" label="Advertisement" />

      {/* In-Depth Overview & Key Highlights */}
      <section className="mt-12 space-y-8 border-t border-border/80 pt-10">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Why I Recommend This
          </h2>
          <div className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed [&>div>p:first-child]:mt-0 [&>div>*:last-child]:mb-0">
            {tool.detailedReview ? (
              <ArticleRenderer content={tool.detailedReview} />
            ) : (
              <p>
                {tool.name} has been vetted as part of my everyday engineering workflow and desk setup. I strictly recommend gear, books, and software tools that provide durable reliability, reduce friction in development, or significantly improve daily ergonomic comfort.
              </p>
            )}
          </div>
        </div>

        {/* Highlight Bullets */}
        {tool.highlights && tool.highlights.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-foreground">
              Key Highlights & Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tool.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-card p-3.5 text-xs text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FTC / Amazon Associates Disclosure */}
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5 text-xs text-muted-foreground space-y-2">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <Info className="h-4 w-4 text-primary" />
            <span>Affiliate & Partner Disclosure</span>
          </div>
          <p className="leading-relaxed">
            {isAmazon ? (
              <>
                <strong>As an Amazon Associate I earn from qualifying purchases.</strong> Links on this page are affiliate links through the Amazon Services LLC Associates Program. When you purchase through these links, I may receive a small commission at <strong>absolutely zero additional cost to you</strong>.
              </>
            ) : (
              <>
                Links on this page are partner affiliate links. When you sign up or purchase through these links, I may receive referral credit or commission at <strong>no extra cost to you</strong>. I only recommend tools, platforms, and gear that I personally use and rely on.
              </>
            )}
          </p>
        </div>
      </section>

      {/* Related Workspace Gear & Tools */}
      {relatedTools.length > 0 && (
        <section className="mt-16 border-t border-border/80 pt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                More Curated Gear & Tools
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Other hardware, books, and software recommended for productive workspaces.
              </p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/tools" className="gap-1 text-xs">
                View All ({allTools.length})
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
            {relatedTools.map((rel) => {
              const relHref = `/tools/${rel.slug || rel.id}`
              const isRelAmazon = rel.merchant?.toLowerCase() === "amazon"

              return (
                <StaggerItem key={rel.id} className="group flex flex-col">
                  {/* Pinterest Visual Pin Card */}
                  <div className="relative w-full overflow-hidden rounded-2xl bg-muted/60 border border-border/60 shadow-xs group-hover:shadow-xl group-hover:border-primary/40 transition-all duration-300">
                    <Link
                      href={relHref}
                      className="block w-full"
                      aria-label={rel.name}
                    >
                      {rel.imageUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={rel.imageUrl}
                          alt={rel.name}
                          className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      ) : (
                        <div className="aspect-[16/10] w-full flex flex-col justify-between p-5 bg-gradient-to-br from-card via-muted/40 to-muted/80 relative overflow-hidden">
                          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-background/80 px-2 py-0.5 rounded-md border border-border/50">
                              {rel.category}
                            </span>
                            <ShoppingBag className="h-5 w-5 text-muted-foreground/60" />
                          </div>
                          <div>
                            <span className="text-sm font-bold tracking-tight text-foreground/90 line-clamp-2">
                              {rel.name}
                            </span>
                            {rel.price && (
                              <span className="text-[11px] font-semibold text-emerald-500 dark:text-emerald-400 font-mono mt-1 block">
                                {rel.price}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </Link>

                    {/* Pinterest Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10 pointer-events-none">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white shadow-xs">
                          {rel.category}
                        </span>
                        {isRelAmazon ? (
                          <span className="rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-300 shadow-xs">
                            Amazon
                          </span>
                        ) : rel.rating ? (
                          <span className="flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2 py-0.5 text-[11px] font-semibold text-amber-400 shadow-xs">
                            <Star className="h-3 w-3 fill-amber-400" />
                            {rel.rating}
                          </span>
                        ) : (
                          <div />
                        )}
                      </div>

                      <div className="flex items-center justify-between pointer-events-auto">
                        <span className="text-[11px] font-semibold text-emerald-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                          {rel.price || rel.badge || "Featured"}
                        </span>

                        <Link
                          href={relHref}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:scale-105"
                        >
                          View Gear
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Pinterest Bottom Caption */}
                  <div className="pt-2.5 pb-1 px-1 space-y-0.5">
                    <Link href={relHref} className="block">
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {rel.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{rel.category}</span>
                      <span className="font-medium text-foreground">{rel.price || rel.badge}</span>
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </section>
      )}
    </main>
  )
}

