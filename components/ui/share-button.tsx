"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Share2, Check, Copy, MoreHorizontal, ExternalLink } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { LinkedinIcon, XIcon, WhatsAppIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

export interface ShareButtonProps {
  title: string
  text?: string
  url?: string
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  label?: string | boolean
  align?: "left" | "right" | "center"
  className?: string
  showLabelOnMobile?: boolean
}

export function ShareButton({
  title,
  text,
  url: customUrl,
  variant = "outline",
  size = "sm",
  label = "Share",
  align = "right",
  className,
  showLabelOnMobile = true,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [resolvedUrl, setResolvedUrl] = React.useState(customUrl || "")
  const [hasNativeShare, setHasNativeShare] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (customUrl) {
      if (customUrl.startsWith("/")) {
        setResolvedUrl(`${window.location.origin}${customUrl}`)
      } else {
        setResolvedUrl(customUrl)
      }
    } else if (typeof window !== "undefined") {
      setResolvedUrl(window.location.href)
    }

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setHasNativeShare(true)
    }
  }, [customUrl])

  // Close dropdown when clicking outside or pressing Escape
  React.useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const effectiveUrl = resolvedUrl || (typeof window !== "undefined" ? window.location.href : "")

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(effectiveUrl)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setIsOpen(false)
      }, 1500)
    } catch {
      // Fallback
      const input = document.createElement("input")
      input.value = effectiveUrl
      document.body.appendChild(input)
      input.select()
      document.execCommand("copy")
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
        setIsOpen(false)
      }, 1500)
    }
  }

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: text || title,
          url: effectiveUrl,
        })
        setIsOpen(false)
      } catch (err) {
        // User cancelled or share failed
      }
    }
  }

  const encodedUrl = encodeURIComponent(effectiveUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedText = encodeURIComponent(text ? `${title} - ${text}` : title)

  const shareOptions = [
    {
      name: "X (Twitter)",
      icon: <XIcon className="h-3.5 w-3.5" />,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      name: "LinkedIn",
      icon: <LinkedinIcon className="h-3.5 w-3.5" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: "WhatsApp",
      icon: <WhatsAppIcon className="h-3.5 w-3.5 text-emerald-500" />,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title}: ${effectiveUrl}`)}`,
    },
  ]

  const alignmentClasses = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  }

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <Button
        type="button"
        variant={variant}
        size={size}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setIsOpen((prev) => !prev)
        }}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={cn("gap-1.5 font-medium transition-colors cursor-pointer select-none", className)}
        title={typeof label === "string" ? label : "Share this page"}
      >
        <Share2 className="h-3.5 w-3.5" />
        {label && (
          <span className={cn(!showLabelOnMobile && "hidden sm:inline")}>
            {typeof label === "string" ? label : "Share"}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute z-50 mt-2 w-56 rounded-xl border border-border bg-popover/95 p-1.5 text-popover-foreground shadow-lg backdrop-blur-md focus:outline-none",
              alignmentClasses[align]
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-2.5 py-1.5 text-[11px] font-semibold text-muted-foreground border-b border-border/50 mb-1">
              Share this {text ? "post" : "link"}
            </div>

            {/* 1-Click Copy Link */}
            <button
              type="button"
              onClick={handleCopy}
              className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <span>{copied ? "Link Copied!" : "Copy Link"}</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">URL</span>
            </button>

            {/* Social Channels */}
            {shareOptions.map((opt) => (
              <a
                key={opt.name}
                href={opt.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  {opt.icon}
                  <span>{opt.name}</span>
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground/60" />
              </a>
            ))}

            {/* Native Share fallback if device supports it */}
            {hasNativeShare && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors cursor-pointer border-t border-border/40 mt-1 pt-1.5"
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
                <span>More options...</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

