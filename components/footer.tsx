"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Mail, ShieldCheck } from "lucide-react"
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons"

export function Footer() {
  const pathname = usePathname()
  const currentYear = 2026

  if (pathname?.startsWith("/admin")) {
    return null
  }

  return (
    <footer className="mt-auto border-t border-border/80 bg-card text-card-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-foreground">
                Tanmay Vaij
              </span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                Engineering Blog & Portfolio
              </span>
            </div>
            <p className="max-w-md text-sm text-muted-foreground leading-relaxed">
              Personal portfolio, architectural research, and practical engineering tutorials on modern web development, distributed backend systems, Next.js, and autonomous AI agents.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/tanmayvaij"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/tanmayvaij/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/tanmayvaij"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Twitter Profile"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:tanmayvaij22@gmail.com"
                className="rounded-lg border border-border p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Send Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Technical Blog
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-muted-foreground hover:text-foreground transition-colors">
                  Workspace Gear & Picks
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About & Experience
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & AdSense Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              Legal & Transparency
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy#cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy & Consent
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy#advertising" className="text-muted-foreground hover:text-foreground transition-colors">
                  AdSense & Ad Disclosures
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Amazon Associates Legal Disclosure */}
        <div className="mt-8 pt-6 border-t border-border/40 text-[11px] text-muted-foreground/80 leading-relaxed">
          <p>
            <strong>Amazon Associates Disclosure:</strong> As an Amazon Associate I earn from qualifying purchases. Product prices, ratings, and availability are accurate as of the date/time indicated and are subject to change. Any price and availability information displayed on Amazon at the time of purchase will apply to the purchase of the product.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-10 border-t border-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>
            &copy; {currentYear} Tanmay Vaij. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span>Built with Next.js, Tailwind CSS & shadcn/ui.</span>
            <span>•</span>
            <Link href="/admin" className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
