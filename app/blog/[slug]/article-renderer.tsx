"use client"

import * as React from "react"
import { Check, Copy, Info, Lightbulb, AlertTriangle, AlertCircle, ExternalLink } from "lucide-react"
import { AffiliateCallout } from "@/components/affiliate/AffiliateCallout"
import { AdBanner } from "@/components/adsense/AdBanner"

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-6 overflow-hidden rounded-lg border border-border bg-zinc-950 text-zinc-100 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-zinc-400">
        <span className="text-[11px] font-sans uppercase tracking-wider">{language || "code"}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-2 py-0.5 text-[11px] hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  )
}

interface ProductAdParams {
  name?: string
  title?: string
  price?: string
  rating?: string
  badge?: string
  merchant?: string
  url?: string
  description?: string
  discountCode?: string
}

export function ArticleRenderer({ content }: { content: string }) {
  const lines = content.trim().split("\n")
  const elements: React.ReactNode[] = []

  let inCodeBlock = false
  let codeBlockLanguage = ""
  let codeBlockLines: string[] = []

  let inProductAdBlock = false
  let productAdLines: string[] = []

  let inTable = false
  let tableHeader: string[] = []
  let tableRows: string[][] = []

  const flushTable = (index: number) => {
    if (tableHeader.length > 0) {
      elements.push(
        <div key={`table-${index}`} className="my-6 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted text-muted-foreground border-b border-border">
              <tr>
                {tableHeader.map((h, i) => (
                  <th key={i} className="px-4 py-2 font-semibold">
                    {h.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-muted/40 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-2.5 text-foreground">
                      {renderInlineMarkdown(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
    inTable = false
    tableHeader = []
    tableRows = []
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Code block check
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <CodeBlock
            key={`code-${i}`}
            code={codeBlockLines.join("\n")}
            language={codeBlockLanguage}
          />
        )
        inCodeBlock = false
        codeBlockLines = []
        codeBlockLanguage = ""
      } else {
        inCodeBlock = true
        codeBlockLanguage = line.replace("```", "").trim()
        codeBlockLines = []
      }
      continue
    }

    if (inCodeBlock) {
      codeBlockLines.push(line)
      continue
    }

    // Product Ad block check: :::product-ad ... :::
    if (line.trim().startsWith(":::product-ad")) {
      inProductAdBlock = true
      productAdLines = []
      continue
    }

    if (inProductAdBlock) {
      if (line.trim() === ":::") {
        inProductAdBlock = false
        // Parse key-value parameters
        const params: ProductAdParams = {}
        for (const adLine of productAdLines) {
          const colonIdx = adLine.indexOf(":")
          if (colonIdx > 0) {
            const key = adLine.substring(0, colonIdx).trim().toLowerCase()
            const val = adLine.substring(colonIdx + 1).trim()
            if (key === "name" || key === "toolname") params.name = val
            else if (key === "title") params.title = val
            else if (key === "price") params.price = val
            else if (key === "rating") params.rating = val
            else if (key === "badge") params.badge = val
            else if (key === "merchant") params.merchant = val
            else if (key === "url" || key === "affiliateurl") params.url = val
            else if (key === "description") params.description = val
            else if (key === "discountcode") params.discountCode = val
          }
        }

        elements.push(
          <div key={`prod-ad-${i}`} className="my-6">
            <AffiliateCallout
              toolName={params.name || params.title || "Featured Product"}
              title={params.title || params.name || "Recommended Gear / Pick"}
              description={params.description || "Top recommended gear tested for high performance and reliability."}
              badge={params.badge || "Amazon's Choice"}
              affiliateUrl={params.url || "https://amazon.com"}
              price={params.price}
              rating={params.rating ? parseFloat(params.rating) : undefined}
              merchant={params.merchant || "Amazon"}
              discountCode={params.discountCode}
            />
          </div>
        )
      } else {
        productAdLines.push(line)
      }
      continue
    }

    // In-article AdSense banner check: :::ad-banner ... :::
    if (line.trim().startsWith(":::ad-banner")) {
      const slotMatch = line.match(/slot=["']?(\d+)["']?/)
      const slot = slotMatch ? slotMatch[1] : "5000000003"
      elements.push(
        <div key={`ad-${i}`} className="my-8">
          <AdBanner slot={slot} format="horizontal" label="Advertisement" />
        </div>
      )
      continue
    }

    // Horizontal Rule
    if (line.trim() === "---" || line.trim() === "***") {
      elements.push(<hr key={`hr-${i}`} className="my-8 border-border/80" />)
      continue
    }

    // Markdown Table check
    if (line.includes("|") && line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const cells = line
        .split("|")
        .slice(1, -1)
        .map((c) => c.trim())

      if (cells.every((c) => /^:?-+:?$/.test(c))) {
        continue
      }

      if (!inTable) {
        inTable = true
        tableHeader = cells
      } else {
        tableRows.push(cells)
      }
      continue
    } else if (inTable) {
      flushTable(i)
    }

    // Empty line
    if (!line.trim()) {
      continue
    }

    // Image: ![alt](url)
    const imgMatch = line.trim().match(/^!\[(.*?)\]\((.*?)\)$/)
    if (imgMatch) {
      elements.push(
        <figure key={`img-${i}`} className="my-6 space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgMatch[2]}
            alt={imgMatch[1]}
            className="w-full rounded-xl border border-border object-cover max-h-[480px] shadow-sm"
            loading="lazy"
          />
          {imgMatch[1] && (
            <figcaption className="text-center text-xs text-muted-foreground italic">
              {imgMatch[1]}
            </figcaption>
          )}
        </figure>
      )
      continue
    }

    // Headings
    if (line.startsWith("# ")) {
      elements.push(
        <h1
          key={`h1-${i}`}
          className="mt-10 mb-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground border-b border-border/50 pb-2"
        >
          {line.replace("# ", "")}
        </h1>
      )
      continue
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="mt-8 mb-4 text-xl sm:text-2xl font-bold tracking-tight text-foreground border-b border-border/50 pb-2"
        >
          {line.replace("## ", "")}
        </h2>
      )
      continue
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="mt-6 mb-3 text-lg sm:text-xl font-semibold tracking-tight text-foreground"
        >
          {line.replace("### ", "")}
        </h3>
      )
      continue
    }

    if (line.startsWith("#### ")) {
      elements.push(
        <h4 key={`h4-${i}`} className="mt-4 mb-2 text-base font-semibold text-foreground">
          {line.replace("#### ", "")}
        </h4>
      )
      continue
    }

    // Alert Callouts: > [!NOTE], > [!TIP], > [!WARNING], > [!IMPORTANT]
    if (line.startsWith("> [!TIP]") || line.startsWith("> [!NOTE]") || line.startsWith("> [!WARNING]") || line.startsWith("> [!IMPORTANT]")) {
      const isTip = line.includes("[!TIP]")
      const isWarning = line.includes("[!WARNING]")
      const isImportant = line.includes("[!IMPORTANT]")

      let icon = <Info className="h-4 w-4 text-blue-500 shrink-0" />
      let borderColor = "border-blue-500/30 bg-blue-500/5 text-blue-900 dark:text-blue-100"
      let label = "Note"

      if (isTip) {
        icon = <Lightbulb className="h-4 w-4 text-emerald-500 shrink-0" />
        borderColor = "border-emerald-500/30 bg-emerald-500/5 text-emerald-900 dark:text-emerald-100"
        label = "Tip"
      } else if (isWarning) {
        icon = <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
        borderColor = "border-amber-500/30 bg-amber-500/5 text-amber-900 dark:text-amber-100"
        label = "Warning"
      } else if (isImportant) {
        icon = <AlertCircle className="h-4 w-4 text-purple-500 shrink-0" />
        borderColor = "border-purple-500/30 bg-purple-500/5 text-purple-900 dark:text-purple-100"
        label = "Important"
      }

      const restText = line.replace(/^> \[[!A-Z]+\]\s*/, "")

      elements.push(
        <div key={`alert-${i}`} className={`my-5 rounded-lg border p-4 text-xs sm:text-sm ${borderColor}`}>
          <div className="flex items-center gap-2 font-bold mb-1">
            {icon}
            <span>{label}</span>
          </div>
          <p className="leading-relaxed pl-6">{renderInlineMarkdown(restText)}</p>
        </div>
      )
      continue
    }

    // Standard Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-4 border-l-4 border-primary pl-4 py-1 italic text-muted-foreground bg-muted/30 rounded-r text-sm sm:text-base"
        >
          {renderInlineMarkdown(line.replace("> ", ""))}
        </blockquote>
      )
      continue
    }

    // List item (Checklist: - [ ] or - [x])
    const checklistMatch = line.match(/^[-*]\s+\[([ xX])\]\s+(.*)$/)
    if (checklistMatch) {
      const isChecked = checklistMatch[1].toLowerCase() === "x"
      elements.push(
        <div key={`cli-${i}`} className="my-1.5 flex items-center gap-2.5 text-sm sm:text-base text-foreground/90 pl-2">
          <input
            type="checkbox"
            checked={isChecked}
            readOnly
            className="h-4 w-4 rounded border-border text-primary pointer-events-none"
          />
          <span className={isChecked ? "line-through text-muted-foreground" : ""}>
            {renderInlineMarkdown(checklistMatch[2])}
          </span>
        </div>
      )
      continue
    }

    // Standard Bullet list
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const rawText = line.substring(2)
      elements.push(
        <div key={`li-${i}`} className="my-1.5 flex items-start gap-2 text-sm sm:text-base text-foreground/90 pl-2">
          <span className="text-primary font-bold mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
          <span>{renderInlineMarkdown(rawText)}</span>
        </div>
      )
      continue
    }

    // Numbered list item
    const matchNumbered = line.match(/^(\d+)\.\s+(.*)$/)
    if (matchNumbered) {
      elements.push(
        <div key={`nli-${i}`} className="my-1.5 flex items-start gap-2.5 text-sm sm:text-base text-foreground/90 pl-2">
          <span className="font-semibold text-primary text-xs shrink-0 mt-0.5">{matchNumbered[1]}.</span>
          <span>{renderInlineMarkdown(matchNumbered[2])}</span>
        </div>
      )
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={`p-${i}`} className="my-3 text-sm sm:text-base leading-relaxed text-foreground/90 break-words">
        {renderInlineMarkdown(line)}
      </p>
    )
  }

  if (inTable) {
    flushTable(lines.length)
  }

  return <div className="space-y-1">{elements}</div>
}

function renderInlineMarkdown(text: string): React.ReactNode {
  // Regex to match markdown links [text](url), bold **bold**, italic *italic*, code `code`, strikethrough ~~strikethrough~~
  const parts: React.ReactNode[] = []
  const remaining = text

  const regex = /(\[.*?\]\(.*?\)|\*\*[^*]+\*\*|`[^`]+`|~~[^~]+~~|\*[^*]+\*)/g
  const matches = [...text.matchAll(regex)]

  if (matches.length === 0) {
    return text
  }

  let lastIndex = 0
  matches.forEach((match, idx) => {
    const matchIndex = match.index ?? 0
    if (matchIndex > lastIndex) {
      parts.push(remaining.substring(lastIndex, matchIndex))
    }

    const matchedStr = match[0]

    // Link: [text](url)
    const linkMatch = matchedStr.match(/^\[(.*?)\]\((.*?)\)$/)
    if (linkMatch) {
      const isExternal = linkMatch[2].startsWith("http")
      parts.push(
        <a
          key={`l-${idx}`}
          href={linkMatch[2]}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-primary hover:underline font-medium inline-flex items-center gap-0.5"
        >
          {linkMatch[1]}
          {isExternal && <ExternalLink className="h-3 w-3 inline ml-0.5 opacity-70" />}
        </a>
      )
    }
    // Bold: **text**
    else if (matchedStr.startsWith("**") && matchedStr.endsWith("**")) {
      parts.push(
        <strong key={`b-${idx}`} className="font-semibold text-foreground">
          {matchedStr.slice(2, -2)}
        </strong>
      )
    }
    // Strikethrough: ~~text~~
    else if (matchedStr.startsWith("~~") && matchedStr.endsWith("~~")) {
      parts.push(
        <del key={`del-${idx}`} className="line-through text-muted-foreground">
          {matchedStr.slice(2, -2)}
        </del>
      )
    }
    // Inline code: `code`
    else if (matchedStr.startsWith("`") && matchedStr.endsWith("`")) {
      parts.push(
        <code
          key={`c-${idx}`}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground break-all"
        >
          {matchedStr.slice(1, -1)}
        </code>
      )
    }
    // Italic: *text*
    else if (matchedStr.startsWith("*") && matchedStr.endsWith("*")) {
      parts.push(
        <em key={`em-${idx}`} className="italic">
          {matchedStr.slice(1, -1)}
        </em>
      )
    }

    lastIndex = matchIndex + matchedStr.length
  })

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex))
  }

  return parts
}
