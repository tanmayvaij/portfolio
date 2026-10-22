import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getAllProjects } from "@/lib/db/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AdBanner } from "@/components/adsense/AdBanner"
import { ProjectsClient } from "./projects-client"

export const metadata: Metadata = {
  title: "Featured Engineering Projects & Architecture Case Studies",
  description:
    "Explore open source tools, distributed systems architectures, and production platforms built by Tanmay Vaij.",
  alternates: {
    canonical: "https://tanmayvaij.dev/projects",
  },
  openGraph: {
    title: "Engineering Projects & Architecture Case Studies | Tanmay Vaij",
    description:
      "Production platforms, distributed engines, and open source developer tooling built with Next.js, Go, TypeScript, and microservices.",
    url: "https://tanmayvaij.dev/projects",
    siteName: "Tanmay Vaij",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Projects & Case Studies | Tanmay Vaij",
    description:
      "Explore distributed architectures, AI agent platforms, and open-source tooling built by Tanmay Vaij.",
    creator: "@tanmayvaij",
  },
}

export const instant = false

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  const projectsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Engineering Projects & Case Studies",
    description:
      "A curated showcase of distributed orchestration engines, edge telemetry collectors, caching proxies, and open-source tooling built by Tanmay Vaij.",
    url: "https://tanmayvaij.dev/projects",
    author: {
      "@type": "Person",
      name: "Tanmay Vaij",
      url: "https://tanmayvaij.dev",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, idx) => ({
        "@type": "SoftwareApplication",
        position: idx + 1,
        name: p.title,
        description: p.description,
        applicationCategory: p.category,
        operatingSystem: "Cloud / Web",
        author: {
          "@type": "Person",
          name: "Tanmay Vaij",
        },
      })),
    },
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
      />
      {/* Header */}
      <div className="mb-10 space-y-3">
        <Badge variant="outline">Software Portfolio</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Engineering Case Studies & Systems
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          A showcase of distributed orchestration engines, edge telemetry collectors, caching proxies, and open-source tooling built with high performance and reliability.
        </p>
      </div>

      {/* Top Ad Unit */}
      <AdBanner slot="4000000001" format="horizontal" label="Advertisement" />

      {/* Client Filterable Grid */}
      <div className="mt-8">
        <ProjectsClient projects={projects} />
      </div>

      {/* Architecture Philosophy Callout */}
      <div className="mt-16 rounded-xl border border-border bg-muted/30 p-8 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-foreground">Have a complex systems problem to solve?</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
            I consult on Next.js performance tuning, distributed database caching, and AI agent execution runtimes.
          </p>
        </div>
        <Button asChild className="mt-4 sm:mt-0 shrink-0">
          <Link href="/contact">
            Get in touch
            <ArrowUpRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Bottom Ad Unit */}
      <div className="mt-12">
        <AdBanner slot="4000000002" format="horizontal" label="Advertisement" />
      </div>
    </main>
  )
}
