import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tanmay Vaij - Full Stack & DevOps Developer",
  description:
    "Portfolio of Tanmay Vaij, a full stack and cross-platform developer skilled in React Native, Node.js, and DevOps tools like Docker & CI/CD.",
  metadataBase: new URL("https://tanmayvaij.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tanmay Vaij - Full Stack & DevOps Developer",
    description:
      "Explore my portfolio projects, cross-platform apps, and DevOps expertise.",
    url: "https://tanmayvaij.vercel.app",
    siteName: "Tanmay Vaij - Portfolio",
    images: {
      url: "/pixar-profile-pic.png",
    },
    locale: "en_US",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}
