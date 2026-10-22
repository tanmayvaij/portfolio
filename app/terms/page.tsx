import type { Metadata } from "next"
import { FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FadeIn } from "@/components/motion"
import { getAboutConfig } from "@/lib/db/about"

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service, disclaimers, and intellectual property guidelines for Tanmay Vaij's engineering portfolio and blog.",
  alternates: {
    canonical: "https://tanmayvaij.dev/terms",
  },
  openGraph: {
    title: "Terms of Service | Tanmay Vaij",
    description:
      "Terms of service, disclaimers, and user agreements for Tanmay Vaij's engineering website.",
    url: "https://tanmayvaij.dev/terms",
    siteName: "Tanmay Vaij",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | Tanmay Vaij",
    description: "Terms of service and legal conditions for Tanmay Vaij's website.",
  },
}

export const instant = false

export default async function TermsPage() {
  const about = await getAboutConfig()
  const name = about.name || "Tanmay Vaij"
  const websiteUrl = about.websiteUrl || "https://tanmayvaij.dev"
  const email = about.email || "tanmayvaij22@gmail.com"

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn direction="up">
        {/* Header */}
        <div className="space-y-3 mb-8">
          <Badge variant="outline" className="gap-1">
            <FileText className="h-3 w-3" />
            Legal Terms
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Last Updated: October 2026 · Effective Date: January 1, 2024
          </p>
        </div>

        <Separator className="my-6" />
      </FadeIn>

      {/* Content */}
      <FadeIn delay={0.1}>
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-sm sm:text-base leading-relaxed text-foreground/90">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. Agreement to Terms</h2>
            <p>
              By accessing or using the website located at <strong>{websiteUrl}</strong>, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you disagree with any part of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, all original written tutorials, architecture diagrams, code samples, and technical articles on this website are the intellectual property of <strong>{name}</strong> and are protected by applicable copyright and trademark laws.
            </p>
            <p>
              You may read, bookmark, share quotes with attribution, and link to articles on this site. Code snippets provided in technical tutorials are made available under the permissive MIT License for use in your personal or commercial software projects.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. Disclaimers & Technical Advice</h2>
            <p>
              The technical articles, code benchmarks, and architectural opinions published on this blog are provided for educational and informational purposes only. While every effort is made to ensure technical accuracy:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
              <li>We do not warrant that all code snippets will execute flawlessly across every environment or version without modification.</li>
              <li>You are solely responsible for testing and validating any code or architectural pattern before deploying to production systems.</li>
              <li>In no event shall the author be liable for any data loss, service interruption, or consequential damages resulting from the use of code or advice from this site.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">4. Advertising and Third-Party Links</h2>
            <p>
              This website displays advertisements provided by third parties, including Google AdSense. We do not endorse or assume responsibility for any third-party products, services, or websites advertised. Clicking on an advertisement or external link is done at your own discretion and risk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">5. Modifications to Terms</h2>
            <p>
              We reserve the right to revise or modify these Terms of Service at any time without prior notice. By continuing to use this website after any revisions become effective, you agree to be bound by the updated terms.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border">
            <h2 className="text-xl font-bold text-foreground">6. Contact Information</h2>
            <p>
              If you have questions regarding these Terms of Service, please reach out via email at:{" "}
              <a href={`mailto:${email}`} className="text-primary hover:underline font-medium">
                {email}
              </a>.
            </p>
          </section>
        </div>
      </FadeIn>
    </main>
  )
}
