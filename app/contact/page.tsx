import type { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { AdBanner } from "@/components/adsense/AdBanner"
import { ContactClient } from "./contact-client"
import { getAboutConfig } from "@/lib/db/about"

export const metadata: Metadata = {
  title: "Contact Tanmay Vaij — Engineering Inquiries & Consulting",
  description:
    "Get in touch with Tanmay Vaij for systems architecture consulting, web engineering contracts, or speaking engagements.",
  alternates: {
    canonical: "https://tanmayvaij.dev/contact",
  },
  openGraph: {
    title: "Contact Tanmay Vaij | Systems & Web Engineering Consulting",
    description:
      "Get in touch for Next.js performance audits, distributed cache design, or technical speaking inquiries.",
    url: "https://tanmayvaij.dev/contact",
    siteName: "Tanmay Vaij",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Tanmay Vaij | Engineering Consulting",
    description:
      "Get in touch for architecture consulting, contracts, or engineering inquiries.",
    creator: "@tanmayvaij",
  },
}

export const instant = false

const faqs = [
  {
    q: "What types of consulting engagements do you take on?",
    a: "I work with tech startups and scale-ups on Next.js performance audits, Core Web Vitals optimization, distributed cache architectures (Redis/Postgres), and autonomous LLM agent execution frameworks.",
  },
  {
    q: "Are you available for full-time or advisory roles?",
    a: "I am open to discussing Staff/Principal engineering roles, technical advisory positions, and high-impact contract opportunities.",
  },
  {
    q: "Can I sponsor an article or collaborate on technical writing?",
    a: "Yes! High-quality developer tooling and infrastructure products can sponsor dedicated in-depth technical case studies and tutorials, provided they deliver genuine educational value to our engineering readership.",
  },
  {
    q: "How does advertising work on this website?",
    a: "This site runs non-intrusive Google AdSense advertising adhering to strict IAB standards and Google Publisher Policies. Ads are clearly labeled and placed to preserve reader experience.",
  },
]

export default async function ContactPage() {
  const about = await getAboutConfig()
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        name: `Contact ${about.name || "Tanmay Vaij"}`,
        url: `${about.websiteUrl || "https://tanmayvaij.dev"}/contact`,
        description:
          "Contact form and direct channels for software engineering consultations, advisory, and reader inquiries.",
        mainEntity: {
          "@type": "Person",
          name: about.name || "Tanmay Vaij",
          url: about.websiteUrl || "https://tanmayvaij.dev",
          email: about.email || "tanmayvaij22@gmail.com",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {/* Header */}
      <div className="mb-10 space-y-3">
        <Badge variant="outline">Get in Touch</Badge>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          {about.contactHeading || "Let's Discuss Your Architecture"}
        </h1>
        <p className="max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          {about.contactDescription || "Whether you have a technical question about an article, want to collaborate on open-source, or need senior systems expertise, my inbox is open."}
        </p>
      </div>

      {/* Ad Unit */}
      <AdBanner slot="6000000001" format="horizontal" label="Advertisement" />

      {/* Interactive Form */}
      <div className="mt-8">
        <ContactClient
          title={about.contactTitle}
          subtitle={about.contactSubtitle}
          email={about.email}
          linkedinUrl={about.linkedinUrl}
          location={about.address || about.location}
          responseTime={about.responseTime}
        />
      </div>

      {/* FAQ Section */}
      <section className="mt-16 space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Common questions regarding consulting, collaboration, and website policies.
          </p>
        </div>

        <Accordion type="single" className="bg-card">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger value={`item-${idx}`}>
                {faq.q}
              </AccordionTrigger>
              <AccordionContent value={`item-${idx}`}>
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Bottom Ad Unit */}
      <div className="mt-12">
        <AdBanner slot="6000000002" format="horizontal" label="Advertisement" />
      </div>
    </main>
  )
}

