"use client"

import * as React from "react"
import { Tag, Copy, Check } from "lucide-react"

interface PromoCodeBoxProps {
  code: string
  label?: string
}

export function PromoCodeBox({ code, label = "Exclusive Discount Code:" }: PromoCodeBoxProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/5 p-4 transition-colors">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <Tag className="h-4 w-4" />
        </div>
        <div>
          <span className="text-[11px] font-medium text-muted-foreground block">{label}</span>
          <code className="text-sm font-mono font-bold tracking-wider text-foreground">
            {code}
          </code>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700 active:scale-95"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            <span>Copied to Clipboard!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>Copy Code</span>
          </>
        )}
      </button>
    </div>
  )
}

