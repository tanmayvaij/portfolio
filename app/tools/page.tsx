import type { Metadata } from "next"
import { ShieldCheck, Wrench } from "lucide-react"
import { getAllAffiliates } from "@/lib/db/affiliates"
import { Badge } from "@/components/ui/badge"
import { ShareButton } from "@/components/ui/share-button"
import { AdBanner } from "@/components/adsense/AdBanner"
import { ToolsClient } from "./tools-client"

export const metadata: Metadata = {
  title: "Workspace Gear, Desk Setup & Recommended Tools",
  description:
    "Curated desk setup gear, mechanical keyboards, ergonomic monitors, audio, books, and software infrastructure recommended by Tanmay Vaij, with Amazon and partner links.",
  alternates: {
    canonical: "https://tanmayvaij.dev/tools",
  },
  openGraph: {
    title: "Workspace Gear, Desk Setup & Tech Picks | Tanmay Vaij",
    description:
      "A curated catalog of ergonomic desk setups, audio gadgets, engineering books, and cloud software recommended by Tanmay Vaij.",
    url: "https://tanmayvaij.dev/tools",
    siteName: "Tanmay Vaij",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workspace Gear, Desk Setup & Tech Picks | Tanmay Vaij",
    description:
      "Curated mechanical keyboards, 4K monitors, audio equipment, books, and developer tools.",
    creator: "@tanmayvaij",
  },
}

export const instant = false

export default async function ToolsPage() {
  const tools = await getAllAffiliates()

  const toolsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Workspace Gear, Desk Setup & Curated Tech Picks",
    description:
      "A personal catalog of physical desk gear, ergonomics, audio equipment, essential reading, and software tools recommended by Tanmay Vaij.",
    url: "https://tanmayvaij.dev/tools",
    author: {
      "@type": "Person",
      name: "Tanmay Vaij",
      url: "https://tanmayvaij.dev",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tools.map((tool, idx) => ({
        "@type": "Product",
        position: idx + 1,
        name: tool.name,
        description: tool.description,
        category: tool.category,
        url: tool.affiliateUrl,
      })),
    },
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsJsonLd) }}
      />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-3">
          <Badge variant="outline" className="gap-1.5">
            <Wrench className="h-3 w-3" />
            Workspace Gear, Setup & Picks
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Curated Desk Setup, Gear & Everyday Tools
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            The physical hardware, ergonomic desk accessories, audio equipment, and books I use daily to stay focused and productive, alongside vetted software and cloud platforms.
          </p>
        </div>
        <div className="shrink-0">
          <ShareButton
            title="Curated Workspace Gear, Desk Setup & Tech Picks | Tanmay Vaij"
            text="Explore curated ergonomic desk setups, audio gear, engineering books, and developer software recommended by Tanmay Vaij."
            url="/tools"
            label="Share Catalog"
            variant="outline"
            size="default"
          />
        </div>
      </div>

      {/* FTC & Amazon Associates Compliant Affiliate Disclosure Banner */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 sm:p-5 text-xs text-muted-foreground space-y-2">
        <div className="flex items-center gap-2 font-semibold text-foreground text-xs">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Amazon Associates & Affiliate Transparency Disclosure</span>
        </div>
        <p className="leading-relaxed">
          <strong>As an Amazon Associate I earn from qualifying purchases.</strong> Some of the products and gear linked on this page are affiliate links through Amazon Services LLC Associates Program and partner networks. When you purchase through these links, I may receive a small commission at <strong>absolutely zero additional cost to you</strong>. I strictly recommend gear, books, and software that I have personally bought, tested, or relied on.
        </p>
      </div>

      {/* Ad Unit */}
      <AdBanner slot="7000000001" format="horizontal" label="Advertisement" />

      {/* Filterable Tools Client */}
      <ToolsClient tools={tools} />

      {/* Bottom Ad Unit */}
      <div className="pt-8">
        <AdBanner slot="7000000002" format="horizontal" label="Advertisement" />
      </div>
    </main>
  )
}
