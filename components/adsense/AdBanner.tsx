"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

interface AdBannerProps {
  slot?: string
  format?: "auto" | "fluid" | "rectangle" | "horizontal"
  responsive?: boolean
  className?: string
  label?: string
}

export function AdBanner({
  slot = "0000000000",
  format = "auto",
  responsive = true,
  className,
  label = "Advertisement",
}: AdBannerProps) {
  const adRef = React.useRef<HTMLModElement | null>(null)
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
  const isConfigured = Boolean(clientId && clientId !== "ca-pub-0000000000000000")

  React.useEffect(() => {
    if (isConfigured && window.adsbygoogle && adRef.current) {
      try {
        window.adsbygoogle.push({})
      } catch (e) {
        console.error("AdSense push error:", e)
      }
    }
  }, [isConfigured])

  // Hide completely when no live AdSense Publisher ID is configured (clean layout for Google review approval)
  if (!isConfigured) {
    return null
  }

  return (
    <aside
      aria-label="Advertisement"
      className={cn(
        "my-8 mx-auto w-full max-w-7xl overflow-hidden rounded-lg border border-border/60 bg-muted/30 p-3 text-center transition-colors",
        className
      )}
    >
      <div className="mb-1.5 flex items-center justify-between px-1 text-[11px] font-medium tracking-wider text-muted-foreground/70 uppercase">
        <span>{label}</span>
        <span className="text-[10px]">Google AdSense</span>
      </div>

      <ins
        ref={adRef}
        className="adsbygoogle block overflow-hidden rounded bg-background/50"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </aside>
  )
}
