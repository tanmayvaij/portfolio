"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Cookie, ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    if (pathname?.startsWith("/admin")) return
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Delay slightly for smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 1200)
      return () => clearTimeout(timer)
    }
  }, [pathname])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined-non-essential")
    setIsVisible(false)
  }

  if (pathname?.startsWith("/admin")) return null
  if (!isVisible) return null

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl animate-in fade-in slide-in-from-bottom-5 duration-300 sm:bottom-6 sm:right-6"
    >
      <div className="rounded-xl border border-border bg-card/95 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2 text-primary">
            <Cookie className="h-5 w-5" />
          </div>
          <div className="flex-1 text-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground flex items-center gap-1.5 text-sm">
                Privacy & Cookie Consent
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
              </h3>
              <button
                onClick={handleDecline}
                className="text-muted-foreground hover:text-foreground p-1 transition-colors"
                aria-label="Dismiss cookie notice"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
              We use cookies and third-party advertising partners (including Google AdSense) to deliver relevant content, analyze site traffic, and support our technical articles. You can accept or manage your preferences at any time.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button size="sm" onClick={handleAccept} className="text-xs h-8 px-3">
                Accept All Cookies
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDecline}
                className="text-xs h-8 px-3"
              >
                Essential Only
              </Button>
              <Link
                href="/privacy-policy"
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 ml-1"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

