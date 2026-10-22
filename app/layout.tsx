import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { ThemeProvider } from "@/components/theme-provider"
import { AdSenseScript } from "@/components/adsense/AdSenseScript"
import { cn } from "@/lib/utils"

const didactGothic = localFont({
  src: "./fonts/DidactGothic-Regular.ttf",
  variable: "--font-didact",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://tanmayvaij.dev"),
  alternates: {
    canonical: "https://tanmayvaij.dev",
  },
  title: {
    default: "Tanmay Vaij — Senior Full Stack & Systems Engineer",
    template: "%s | Tanmay Vaij",
  },
  description:
    "Engineering portfolio and technical blog covering Next.js, distributed backend systems, AI agents, cloud architecture, and high-performance web optimization.",
  keywords: [
    "Tanmay Vaij",
    "Full Stack Engineer",
    "Systems Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Cloud Architecture",
    "AI Agents",
    "Software Engineering Blog",
  ],
  authors: [{ name: "Tanmay Vaij", url: "https://tanmayvaij.dev" }],
  creator: "Tanmay Vaij",
  publisher: "Tanmay Vaij",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tanmayvaij.dev",
    title: "Tanmay Vaij — Senior Full Stack & Systems Engineer",
    description:
      "Engineering portfolio and technical blog covering Next.js, distributed backend systems, AI agents, and web architecture.",
    siteName: "Tanmay Vaij Portfolio & Tech Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanmay Vaij — Senior Full Stack & Systems Engineer",
    description:
      "Engineering portfolio and technical blog covering Next.js, distributed backend systems, AI agents, and web architecture.",
    creator: "@tanmayvaij",
  },
  other: {
    "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-0000000000000000",
  },
}

const rootJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://tanmayvaij.dev/#website",
      url: "https://tanmayvaij.dev",
      name: "Tanmay Vaij — Senior Full Stack & Systems Engineer",
      description:
        "Engineering portfolio and technical blog covering Next.js, distributed backend systems, AI agents, cloud architecture, and web performance optimization.",
      publisher: {
        "@id": "https://tanmayvaij.dev/#person",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "Person",
      "@id": "https://tanmayvaij.dev/#person",
      name: "Tanmay Vaij",
      url: "https://tanmayvaij.dev",
      jobTitle: "Senior Full Stack & Systems Engineer",
      description:
        "Senior software engineer specializing in Next.js, distributed backend microservices, high-throughput architectures, and autonomous AI agents.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "India",
      },
      sameAs: [
        "https://www.linkedin.com/in/tanmayvaij/",
        "https://github.com/tanmayvaij",
        "https://twitter.com/tanmayvaij",
      ],
      knowsAbout: [
        "Next.js App Router",
        "React",
        "TypeScript",
        "Node.js",
        "Go",
        "Distributed Systems",
        "PostgreSQL",
        "SQLite",
        "Prisma ORM",
        "Microservices Architecture",
        "Autonomous AI Agents",
        "Web Performance Optimization",
        "Google AdSense Optimization",
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full antialiased", didactGothic.variable)}
    >
      <head>
        <AdSenseScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLd) }}
        />
      </head>
      <body
        className={cn(
          "min-h-full flex flex-col bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans",
          didactGothic.className
        )}
      >
        <ThemeProvider defaultTheme="system">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}
