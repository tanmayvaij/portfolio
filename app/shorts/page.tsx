import type { Metadata } from "next"
import { Sparkles, ExternalLink } from "lucide-react"
import { getAllShorts } from "@/lib/db/shorts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { YouTubeIcon, InstagramIcon } from "@/components/icons"
import { AdBanner } from "@/components/adsense/AdBanner"
import { ShortsClient } from "./shorts-client"

export const metadata: Metadata = {
  title: "Finance & Lifestyle YouTube Shorts | Tanmay Vaij",
  description:
    "Daily finance, smart investing, wealth habits, and modern lifestyle education shorts by Tanmay Vaij. Watch quick daily insights on YouTube and Instagram.",
  alternates: {
    canonical: "https://tanmayvaij.dev/shorts",
  },
  openGraph: {
    title: "Finance & Lifestyle YouTube Shorts | Tanmay Vaij",
    description:
      "Daily bite-sized education on personal finance, wealth building, productivity, and lifestyle discipline by Tanmay Vaij.",
    url: "https://tanmayvaij.dev/shorts",
    siteName: "Tanmay Vaij",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://tanmayvaij.dev/og-image.png",
        secureUrl: "https://tanmayvaij.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tanmay Vaij Finance & Lifestyle Shorts",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance & Lifestyle YouTube Shorts | Tanmay Vaij",
    description:
      "Daily bite-sized education on personal finance, wealth building, and lifestyle habits.",
    creator: "@tanmayvaij",
    images: ["https://tanmayvaij.dev/og-image.png"],
  },
}

export const instant = false

export default async function ShortsPage() {
  const shorts = await getAllShorts()

  const shortsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Finance & Lifestyle YouTube Shorts",
    description:
      "Daily bite-sized education on personal finance, investing, wealth architecture, and lifestyle discipline by Tanmay Vaij.",
    url: "https://tanmayvaij.dev/shorts",
    author: {
      "@type": "Person",
      name: "Tanmay Vaij",
      url: "https://tanmayvaij.dev",
      sameAs: [
        "https://www.youtube.com/channel/UC6y7NAEEm-U97DLfHc__l9w",
        "https://www.instagram.com/tony.man.22/",
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: shorts.map((short, idx) => ({
        "@type": "VideoObject",
        position: idx + 1,
        name: short.title,
        description: short.description || short.title,
        thumbnailUrl: short.thumbnailUrl || `https://img.youtube.com/vi/${short.videoId}/hqdefault.jpg`,
        uploadDate: short.createdAt.toISOString(),
        contentUrl: short.youtubeUrl,
        embedUrl: `https://www.youtube-nocookie.com/embed/${short.videoId}`,
      })),
    },
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shortsJsonLd) }}
      />

      {/* Hero Header */}
      <div className="space-y-4 pb-8 border-b border-border/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Badge variant="outline" className="gap-1.5 text-xs text-red-500 border-red-500/30 bg-red-500/5">
            <YouTubeIcon className="h-3.5 w-3.5 text-red-500" />
            Daily Shorts & Micro-Education
          </Badge>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="outline" className="h-8 gap-1.5 text-xs hover:text-red-500 hover:border-red-500/40">
              <a
                href="https://www.youtube.com/channel/UC6y7NAEEm-U97DLfHc__l9w"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YouTubeIcon className="h-3.5 w-3.5 text-red-500" />
                Subscribe on YouTube
                <ExternalLink className="h-3 w-3 opacity-60 ml-0.5" />
              </a>
            </Button>
            <Button asChild size="sm" variant="outline" className="h-8 gap-1.5 text-xs hover:text-pink-500 hover:border-pink-500/40">
              <a
                href="https://www.instagram.com/tony.man.22/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="h-3.5 w-3.5 text-pink-500" />
                @tony.man.22
                <ExternalLink className="h-3 w-3 opacity-60 ml-0.5" />
              </a>
            </Button>
          </div>
        </div>

        <div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Finance & Lifestyle Shorts
          </h1>
          <p className="mt-2 max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Daily bite-sized lessons on money management, smart investment principles, compounding habits, and modern lifestyle discipline. Watch on-site or follow on YouTube Shorts.
          </p>
        </div>
      </div>

      {/* Main Interactive Shorts Grid */}
      <div className="py-8">
        <ShortsClient shorts={shorts} />
      </div>

      {/* Bottom Ad Unit */}
      <div className="mt-8 border-t border-border/80 pt-8">
        <AdBanner slot="7000000004" format="horizontal" label="Advertisement" />
      </div>
    </main>
  )
}
