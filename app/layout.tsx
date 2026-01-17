import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://tanmayvaij.dev"
  ),
  title: {
    default: "Tanmay Vaij | Full Stack & AI Engineer",
    template: "%s | Tanmay Vaij",
  },
  description:
    "Portfolio of Tanmay Vaij - Full Stack & AI Engineer specializing in GenAI, scalable backends, and modern web development. Building innovative solutions with React, Node.js, and AI technologies.",
  applicationName: "Tanmay Vaij Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Tanmay Vaij",
    "Full Stack Developer",
    "AI Engineer",
    "GenAI",
    "React",
    "Node.js",
    "Next.js",
    "TypeScript",
    "Software Engineer",
    "Web Development",
  ],
  authors: [{ name: "Tanmay Vaij", url: "https://tanmayvaij.dev" }],
  creator: "Tanmay Vaij",
  publisher: "Tanmay Vaij",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tanmayvaij.dev",
    title: "Tanmay Vaij | Full Stack & AI Engineer",
    description:
      "Portfolio of Tanmay Vaij - Full Stack & AI Engineer specializing in GenAI, scalable backends, and modern web development.",
    siteName: "Tanmay Vaij Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tanmay Vaij - Full Stack & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanmay Vaij | Full Stack & AI Engineer",
    description:
      "Portfolio of Tanmay Vaij - Full Stack & AI Engineer specializing in GenAI, scalable backends, and modern web development.",
    images: ["/og-image.png"],
    creator: "@tanmayvaij",
  },
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
  category: "technology",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics
            measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          />
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
