import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tanmay Vaij | Full Stack Engineer",
    template: "%s | Tanmay Vaij",
  },
  description:
    "Passionate Full Stack Developer skilled in building scalable web and mobile applications. Strong foundation in frontend, backend, cloud deployment, and DevOps automation.",
  keywords: [
    "Tanmay Vaij",
    "Full Stack Engineer",
    "React Native",
    "Next.js",
    "System Architecture",
    "DevOps",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Tanmay Vaij", url: "https://tanmayvaij.vercel.app" }],
  creator: "Tanmay Vaij",
  metadataBase: new URL("https://tanmayvaij.vercel.app"),
  alternates: {
    canonical: "/",
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
  openGraph: {
    title: "Tanmay Vaij | Full Stack Engineer",
    description:
      "Passionate Full Stack Developer skilled in building scalable web and mobile applications. Strong foundation in frontend, backend, cloud deployment, and DevOps automation.",
    url: "https://tanmayvaij.vercel.app",
    siteName: "Tanmay Vaij",
    images: [
      {
        url: "/pixar-profile-pic.png",
        width: 1200,
        height: 630,
        alt: "Tanmay Vaij - Full Stack Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanmay Vaij | Full Stack Engineer",
    description:
      "Passionate Full Stack Developer skilled in building scalable web and mobile applications. Strong foundation in frontend, backend, cloud deployment, and DevOps automation.",
    images: ["/pixar-profile-pic.png"],
    creator: "@tanmayvaij",
  },
  icons: {
    icon: "/pixar-profile-pic.png",
    shortcut: "/pixar-profile-pic.png",
    apple: "/pixar-profile-pic.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
