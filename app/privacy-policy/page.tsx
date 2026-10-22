import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FadeIn } from "@/components/motion"
import { getAboutConfig } from "@/lib/db/about"

export const metadata: Metadata = {
  title: "Privacy Policy & Cookie Disclosure",
  description:
    "Comprehensive privacy policy including Google AdSense disclosures, cookie management, GDPR & CCPA compliance for Tanmay Vaij's portfolio and blog.",
  alternates: {
    canonical: "https://tanmayvaij.dev/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy & Cookie Disclosure | Tanmay Vaij",
    description:
      "Privacy policy, AdSense disclosures, cookie management, and user data rights for Tanmay Vaij's engineering website.",
    url: "https://tanmayvaij.dev/privacy-policy",
    siteName: "Tanmay Vaij",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy & Cookie Disclosure | Tanmay Vaij",
    description:
      "Privacy policy, AdSense disclosures, and cookie policy for Tanmay Vaij's website.",
  },
}

export const instant = false

export default async function PrivacyPolicyPage() {
  const about = await getAboutConfig()
  const name = about.name || "Tanmay Vaij"
  const websiteUrl = about.websiteUrl || "https://www.tanmayvaij.dev/"
  const email = about.email || "tanmayvaij22@gmail.com"
  const address = about.address || "Katraj, Pune"

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <FadeIn direction="up">
        {/* Header */}
        <div className="space-y-3 mb-8">
          <Badge variant="outline" className="gap-1">
            <ShieldCheck className="h-3 w-3 text-emerald-500" />
            AdSense & GDPR Compliant
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Privacy Policy
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
          <h2 className="text-xl font-bold text-foreground">1. Introduction</h2>
          <p>
            Welcome to the personal portfolio and technical blog of <strong>{name}</strong> (accessible at{" "}
            <Link href="/" className="text-primary hover:underline font-medium">
              {websiteUrl}
            </Link>
            ). We respect your personal privacy and are committed to protecting it through transparent information practices.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, read our technical articles, or communicate with us through our contact forms.
          </p>
        </section>

        {/* Google AdSense Specific Disclosure */}
        <section id="advertising" className="rounded-xl border border-primary/20 bg-primary/5 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground m-0">
              2. Google AdSense & Third-Party Advertising Disclosure
            </h2>
          </div>
          <p className="font-medium text-foreground">
            This website participates in the <strong>Google AdSense</strong> advertising program operated by Google LLC. Please read the following mandatory disclosures carefully:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>Use of Cookies:</strong> Third-party vendors, including Google, use cookies to serve advertisements based on a user&apos;s prior visits to this website or other websites across the Internet.
            </li>
            <li>
              <strong>Google&apos;s Advertising Cookies:</strong> Google&apos;s use of advertising cookies (such as the DoubleClick DART cookie) enables Google and its partner network to serve personalized ads to our users based on their navigation history across the web.
            </li>
            <li>
              <strong>Opting Out of Personalized Advertising:</strong> You have the absolute right to opt out of personalized Google advertising by visiting the official Google Ads Settings page at{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline font-medium"
              >
                https://www.google.com/settings/ads
              </a>
              .
            </li>
            <li>
              Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting the Network Advertising Initiative (NAI) opt-out page at{" "}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline font-medium"
              >
                www.aboutads.info/choices
              </a>{" "}
              or Your Online Choices at{" "}
              <a
                href="https://www.youronlinechoices.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline font-medium"
              >
                www.youronlinechoices.com
              </a>
              .
            </li>
          </ul>
        </section>

        {/* Cookies Section */}
        <section id="cookies" className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">3. Cookie Policy & Web Beacons</h2>
          <p>
            Like most modern websites, this site uses standard &ldquo;cookies&rdquo; — small data files stored on your computer or mobile device. We use cookies for:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted-foreground">
            <li><strong>Essential Technical Cookies:</strong> Remembering your theme preference (Dark or Light mode) and cookie consent selection.</li>
            <li><strong>Performance & Analytics Cookies:</strong> Understanding which articles are most popular to help us author better technical guides.</li>
            <li><strong>Advertising & Targeting Cookies:</strong> Delivered by Google AdSense to prevent ad fraud, limit repetitive ad exposure, and measure ad performance.</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some parts of this website may function with limited convenience if cookies are disabled.
          </p>
        </section>

        {/* Log Files */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">4. Log Files</h2>
          <p>
            This website follows a standard procedure of using server log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of this information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic data for security and performance audits.
          </p>
        </section>

        {/* Affiliate Marketing Disclosure */}
        <section id="affiliate" className="space-y-3 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <h2 className="text-xl font-bold text-foreground">
            5. Affiliate Marketing, Amazon Associates & Sponsored Endorsement Disclosure
          </h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            In compliance with the Federal Trade Commission (FTC) guidelines, the Amazon Associates Operating Agreement, and Google Search Quality Guidelines, please note that certain links on this website — particularly on our{" "}
            <Link href="/tools" className="text-primary underline font-medium">
              Workspace Gear & Picks
            </Link>{" "}
            page and within selected technical articles — are <strong>affiliate links</strong>.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>
              <strong>Amazon Associates Program:</strong> Tanmay Vaij is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com and affiliated global Amazon storefronts. <strong>&ldquo;As an Amazon Associate I earn from qualifying purchases.&rdquo;</strong>
            </li>
            <li>
              <strong>Commissions at No Extra Cost:</strong> If you click through an affiliate link and make a purchase or subscribe to a service, we may receive a referral commission or platform credits at absolutely no additional cost to you. In fact, many partner links offer exclusive discounts or promotional trial credits.
            </li>
            <li>
              <strong>Search Engine Compliance:</strong> All outbound affiliate and sponsored hyperlinks are strictly formatted with <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">rel=&quot;sponsored nofollow noopener noreferrer&quot;</code> in strict adherence to Google Search Central link qualification standards.
            </li>
            <li>
              <strong>Editorial Integrity:</strong> Tanmay Vaij maintains complete editorial independence. We only feature hardware, desk accessories, books, and software tools that we have personally bought, evaluated, or used. Sponsorships or affiliate programs never dictate our architectural opinions, reviews, or technical tutorials.
            </li>
          </ul>
        </section>

        {/* Contact Form & Personal Data */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">6. Information You Voluntarily Provide</h2>
          <p>
            When you use our contact form, we collect the name, email address, subject, and message you submit. This information is strictly used to reply to your inquiry. We do not sell, rent, or trade your email address or personal details to any marketing list or third party.
          </p>
        </section>

        {/* GDPR */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">7. General Data Protection Regulation (GDPR) Rights</h2>
          <p>
            If you are a resident of the European Economic Area (EEA), you have data protection rights under the GDPR:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>The right to access, update, or delete the information we have on you.</li>
            <li>The right of rectification if your data is inaccurate.</li>
            <li>The right to object to our processing of your personal data.</li>
            <li>The right to data portability.</li>
            <li>The right to withdraw consent at any time.</li>
          </ul>
        </section>

        {/* CCPA */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">8. California Consumer Privacy Act (CCPA)</h2>
          <p>
            Under the CCPA, California consumers have the right to request disclosure of categories and specific pieces of personal data collected, request deletion of personal data, and request that a business that sells personal data not sell that data. We affirm that we do not sell consumer personal information.
          </p>
        </section>

        {/* Children's Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">9. Children&apos;s Information (COPPA)</h2>
          <p>
            Another part of our priority is adding protection for children while using the internet. We do not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe your child provided this information on our website, we strongly encourage you to contact us immediately so we can promptly remove it.
          </p>
        </section>

        {/* Contact */}
        <section className="space-y-3 pt-4 border-t border-border">
          <h2 className="text-xl font-bold text-foreground">10. Contact Us Regarding Privacy</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy, please contact:
          </p>
          <div className="rounded-lg bg-card border border-border p-4 text-sm space-y-1">
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-muted-foreground">
              Website:{" "}
              <Link href="/" className="text-primary hover:underline">
                {websiteUrl}
              </Link>
            </p>
            <p className="text-muted-foreground">
              Email:{" "}
              <a href={`mailto:${email}`} className="text-primary hover:underline">
                {email}
              </a>
            </p>
            <p className="text-muted-foreground">Address: {address}</p>
          </div>
        </section>
      </div>
    </FadeIn>
  </main>
)
}
