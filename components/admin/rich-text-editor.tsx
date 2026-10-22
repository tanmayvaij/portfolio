"use client"

import * as React from "react"
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading2,
  Heading3,
  Heading4,
  Quote,
  List,
  ListOrdered,
  ListTodo,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Minus,
  Sparkles,
  ShoppingBag,
  Eye,
  Edit3,
  Columns,
  Maximize2,
  Minimize2,
  HelpCircle,
  Undo,
  Redo,
  Lightbulb,
  AlertTriangle,
  Megaphone,
  X,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ImageUploader } from "@/components/ui/image-uploader"
import { ArticleRenderer } from "@/app/blog/[slug]/article-renderer"

export interface AffiliateToolItem {
  id: string
  name: string
  category: string
  description: string
  badge?: string | null
  affiliateUrl: string
  discountCode?: string | null
  price?: string | null
  rating?: number | null
  merchant?: string
}

interface RichTextEditorProps {
  value: string
  onChange: (val: string) => void
  label?: string
  placeholder?: string
  minHeight?: string
  availableAffiliates?: AffiliateToolItem[]
  isAffiliateEditor?: boolean
}

export function RichTextEditor({
  value,
  onChange,
  label = "Content Editor",
  placeholder = "Write your content using rich markdown...",
  minHeight = "360px",
  availableAffiliates = [],
  isAffiliateEditor = false,
}: RichTextEditorProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const [mode, setMode] = React.useState<"write" | "preview" | "split">("write")
  const [isFullscreen, setIsFullscreen] = React.useState(false)

  // Dialog states
  const [showProductModal, setShowProductModal] = React.useState(false)
  const [showLinkModal, setShowLinkModal] = React.useState(false)
  const [showImageModal, setShowImageModal] = React.useState(false)
  const [showHelpModal, setShowHelpModal] = React.useState(false)

  // Link dialog form
  const [linkText, setLinkText] = React.useState("")
  const [linkUrl, setLinkUrl] = React.useState("")

  // Image dialog form
  const [imageAlt, setImageAlt] = React.useState("")
  const [imageUrl, setImageUrl] = React.useState("")

  // Product Ad dialog form
  const [selectedAffiliateId, setSelectedAffiliateId] = React.useState<string>("")
  const [customProduct, setCustomProduct] = React.useState({
    name: "",
    title: "",
    price: "$99.00",
    rating: "4.8",
    badge: "Amazon's Choice",
    merchant: "Amazon",
    url: "https://www.amazon.com/dp/...?tag=tanmayvaij-20",
    discountCode: "",
    description: "",
  })

  // History for undo/redo
  const [history, setHistory] = React.useState<string[]>([value])
  const [historyIndex, setHistoryIndex] = React.useState<number>(0)

  const pushHistory = React.useCallback(
    (newVal: string) => {
      setHistory((prev) => {
        const next = prev.slice(0, historyIndex + 1)
        next.push(newVal)
        if (next.length > 50) next.shift()
        return next
      })
      setHistoryIndex((prev) => Math.min(prev + 1, 49))
      onChange(newVal)
    },
    [historyIndex, onChange]
  )

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevVal = history[historyIndex - 1]
      setHistoryIndex(historyIndex - 1)
      onChange(prevVal)
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextVal = history[historyIndex + 1]
      setHistoryIndex(historyIndex + 1)
      onChange(nextVal)
    }
  }

  // Selection insertion helper
  const insertText = (before: string, after: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end) || defaultText

    const replacement = `${before}${selectedText}${after}`
    const newValue = value.substring(0, start) + replacement + value.substring(end)

    pushHistory(newValue)

    setTimeout(() => {
      textarea.focus()
      const newCursorPos = start + before.length + selectedText.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 10)
  }

  const insertBlock = (blockText: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const prefix = start > 0 && !value.endsWith("\n", start) ? "\n\n" : "\n"
    const suffix = "\n"

    const replacement = `${prefix}${blockText}${suffix}`
    const newValue = value.substring(0, start) + replacement + value.substring(end)

    pushHistory(newValue)

    setTimeout(() => {
      textarea.focus()
      const newPos = start + replacement.length
      textarea.setSelectionRange(newPos, newPos)
    }, 10)
  }

  // Keyboard shortcuts handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab key
    if (e.key === "Tab") {
      e.preventDefault()
      insertText("  ", "")
      return
    }

    // Ctrl/Cmd shortcuts
    if (e.ctrlKey || e.metaKey) {
      if (e.key.toLowerCase() === "b") {
        e.preventDefault()
        insertText("**", "**", "bold text")
      } else if (e.key.toLowerCase() === "i") {
        e.preventDefault()
        insertText("*", "*", "italic text")
      } else if (e.key.toLowerCase() === "k") {
        e.preventDefault()
        const textarea = textareaRef.current
        if (textarea) {
          const sel = value.substring(textarea.selectionStart, textarea.selectionEnd)
          setLinkText(sel)
        }
        setShowLinkModal(true)
      } else if (e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault()
        handleUndo()
      } else if ((e.key.toLowerCase() === "z" && e.shiftKey) || e.key.toLowerCase() === "y") {
        e.preventDefault()
        handleRedo()
      }
    }
  }

  // Handle Product Ad Insertion
  const handleInsertProductAd = () => {
    let adData = { ...customProduct }

    if (selectedAffiliateId) {
      const selected = availableAffiliates.find((a) => a.id === selectedAffiliateId)
      if (selected) {
        adData = {
          name: selected.name,
          title: selected.name,
          price: selected.price || "$99.00",
          rating: selected.rating ? selected.rating.toString() : "4.8",
          badge: selected.badge || "Recommended",
          merchant: selected.merchant || "Amazon",
          url: selected.affiliateUrl,
          discountCode: selected.discountCode || "",
          description: selected.description,
        }
      }
    }

    const snippet = `:::product-ad
name: ${adData.name || adData.title || "Featured Product"}
title: ${adData.title || adData.name || "Recommended Product"}
price: ${adData.price || ""}
rating: ${adData.rating || "4.8"}
badge: ${adData.badge || "Amazon's Choice"}
merchant: ${adData.merchant || "Amazon"}
url: ${adData.url || "https://amazon.com"}
discountCode: ${adData.discountCode || ""}
description: ${adData.description || "Top recommended gear tested for high performance and durability."}
:::`

    insertBlock(snippet)
    setShowProductModal(false)
  }

  // Handle Link Insertion
  const handleInsertLink = () => {
    if (!linkUrl) return
    const text = linkText || "link"
    insertText(`[${text}](${linkUrl})`, "")
    setLinkText("")
    setLinkUrl("")
    setShowLinkModal(false)
  }

  // Handle Image Insertion
  const handleInsertImage = () => {
    if (!imageUrl) return
    const alt = imageAlt || "Image description"
    insertBlock(`![${alt}](${imageUrl})`)
    setImageAlt("")
    setImageUrl("")
    setShowImageModal(false)
  }

  // Stats
  const wordCount = React.useMemo(() => {
    const trimmed = value.trim()
    if (!trimmed) return 0
    return trimmed.split(/\s+/).length
  }, [value])

  const charCount = value.length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div
      className={`flex flex-col rounded-xl border border-border bg-card transition-all ${
        isFullscreen
          ? "fixed inset-0 z-50 rounded-none border-none p-4 sm:p-6 bg-background overflow-hidden"
          : "shadow-xs"
      }`}
    >
      {/* Top Header & Modes */}
      <div className="flex flex-wrap items-center justify-between border-b border-border/80 bg-muted/40 px-3 py-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground flex items-center gap-1.5">
            <Edit3 className="h-3.5 w-3.5 text-primary" />
            {label}
          </span>
          {isAffiliateEditor && (
            <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary py-0">
              Affiliate / Product Copy
            </Badge>
          )}
        </div>

        {/* View Switcher & Action buttons */}
        <div className="flex items-center gap-1">
          <div className="flex rounded-md border border-border bg-background p-0.5 shadow-xs">
            <button
              type="button"
              onClick={() => setMode("write")}
              className={`flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                mode === "write"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Focus on writing markdown"
            >
              <Edit3 className="h-3 w-3" />
              Write
            </button>
            <button
              type="button"
              onClick={() => setMode("split")}
              className={`hidden sm:flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                mode === "split"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Side-by-side editing and live preview"
            >
              <Columns className="h-3 w-3" />
              Split
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={`flex items-center gap-1 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                mode === "preview"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              title="Full rendered live preview"
            >
              <Eye className="h-3 w-3" />
              Preview
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="rounded-md border border-border bg-background p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors ml-1"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Editor"}
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Formatting Toolbar (Visible in Write or Split Mode) */}
      {mode !== "preview" && (
        <div className="flex flex-wrap items-center gap-1 border-b border-border/60 bg-muted/20 p-2 overflow-x-auto text-xs">
          {/* History */}
          <div className="flex items-center border-r border-border/60 pr-1.5 mr-1 gap-0.5">
            <button
              type="button"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Undo (Ctrl+Z)"
            >
              <Undo className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title="Redo (Ctrl+Y)"
            >
              <Redo className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Text Styling */}
          <div className="flex items-center border-r border-border/60 pr-1.5 mr-1 gap-0.5">
            <button
              type="button"
              onClick={() => insertText("**", "**", "bold text")}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors font-bold"
              title="Bold (Ctrl+B)"
            >
              <Bold className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertText("*", "*", "italic text")}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors italic"
              title="Italic (Ctrl+I)"
            >
              <Italic className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertText("~~", "~~", "strikethrough text")}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Strikethrough"
            >
              <Strikethrough className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertText("`", "`", "inline_code")}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Inline Code"
            >
              <Code className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Headings */}
          <div className="flex items-center border-r border-border/60 pr-1.5 mr-1 gap-0.5">
            <button
              type="button"
              onClick={() => insertBlock("## Section Heading")}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Heading 2 (##)"
            >
              <Heading2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertBlock("### Subsection Heading")}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Heading 3 (###)"
            >
              <Heading3 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertBlock("#### Sub-topic Heading")}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Heading 4 (####)"
            >
              <Heading4 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Lists & Quotes */}
          <div className="flex items-center border-r border-border/60 pr-1.5 mr-1 gap-0.5">
            <button
              type="button"
              onClick={() => insertBlock("- First item\n- Second item\n- Third item")}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Bullet List (- )"
            >
              <List className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertBlock("1. Step one\n2. Step two\n3. Step three")}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Numbered List (1. )"
            >
              <ListOrdered className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertBlock("- [ ] Checklist item 1\n- [ ] Checklist item 2\n- [x] Completed item")}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Task Checklist (- [ ])"
            >
              <ListTodo className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertBlock("> Key engineering quote or note")}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Blockquote (> )"
            >
              <Quote className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Code Blocks & Tables */}
          <div className="flex items-center border-r border-border/60 pr-1.5 mr-1 gap-0.5">
            <button
              type="button"
              onClick={() =>
                insertBlock("```typescript\n// Example implementation\nexport async function handleRequest() {\n  return { success: true }\n}\n```")
              }
              className="rounded px-1.5 py-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center gap-1 font-mono text-[11px]"
              title="Code Block (```typescript)"
            >
              <Code className="h-3.5 w-3.5 text-primary" />
              <span>Block</span>
            </button>
            <button
              type="button"
              onClick={() =>
                insertBlock("| Feature | Before | After |\n| :--- | :--- | :--- |\n| Latency | 340ms | 45ms |\n| Throughput | 1.2k req/s | 14.8k req/s |")
              }
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Markdown Table"
            >
              <TableIcon className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => insertBlock("---")}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Horizontal Divider (---)"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Media & Links */}
          <div className="flex items-center border-r border-border/60 pr-1.5 mr-1 gap-0.5">
            <button
              type="button"
              onClick={() => {
                const textarea = textareaRef.current
                if (textarea) {
                  const sel = value.substring(textarea.selectionStart, textarea.selectionEnd)
                  setLinkText(sel)
                }
                setShowLinkModal(true)
              }}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Insert Link (Ctrl+K)"
            >
              <LinkIcon className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setShowImageModal(true)}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Insert Image"
            >
              <ImageIcon className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Callouts */}
          <div className="flex items-center border-r border-border/60 pr-1.5 mr-1 gap-0.5">
            <button
              type="button"
              onClick={() => insertBlock("> [!TIP] Pro Tip: Leverage Next.js Partial Prerendering to shave 80% off TTFB.")}
              className="rounded px-1.5 py-1 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors flex items-center gap-1 font-medium text-[11px]"
              title="Insert Tip Callout"
            >
              <Lightbulb className="h-3.5 w-3.5" />
              <span>Tip</span>
            </button>
            <button
              type="button"
              onClick={() => insertBlock("> [!WARNING] Production Notice: Always validate JWT payload before invoking downstream database mutations.")}
              className="rounded px-1.5 py-1 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors flex items-center gap-1 font-medium text-[11px]"
              title="Insert Warning Callout"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>Warning</span>
            </button>
          </div>

          {/* High-Value Monetization: Product Ads & Banners */}
          <div className="flex items-center gap-1 pl-1">
            <button
              type="button"
              onClick={() => setShowProductModal(true)}
              className="rounded-md bg-primary/10 text-primary border border-primary/30 px-2 py-1 font-semibold hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-1.5 text-[11px] shadow-2xs"
              title="Insert high-converting Amazon or Tool Product Ad Card"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>+ Product Ad Card</span>
            </button>

            <button
              type="button"
              onClick={() => insertBlock(":::ad-banner slot=\"5000000003\" :::")}
              className="rounded-md border border-border bg-background px-2 py-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors flex items-center gap-1 text-[11px]"
              title="Insert in-article Google AdSense Slot"
            >
              <Megaphone className="h-3.5 w-3.5" />
              <span>+ AdSense Slot</span>
            </button>
          </div>

          {/* Help Button */}
          <div className="ml-auto">
            <button
              type="button"
              onClick={() => setShowHelpModal(true)}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              title="Markdown & Shortcode Guide"
            >
              <HelpCircle className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Editor Body Area */}
      <div
        className={`flex-1 grid overflow-hidden ${
          mode === "split" ? "grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border" : "grid-cols-1"
        }`}
        style={{ minHeight: isFullscreen ? "calc(100vh - 120px)" : minHeight }}
      >
        {/* Write View */}
        {mode !== "preview" && (
          <div className="relative flex flex-col h-full bg-background/50">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => pushHistory(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="w-full h-full p-4 font-mono text-xs sm:text-sm leading-relaxed text-foreground bg-transparent resize-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground"
              style={{ minHeight: isFullscreen ? "100%" : minHeight }}
            />
          </div>
        )}

        {/* Live Preview View */}
        {mode !== "write" && (
          <div
            className="h-full overflow-y-auto p-5 sm:p-6 bg-card/60"
            style={{ maxHeight: isFullscreen ? "calc(100vh - 120px)" : "600px" }}
          >
            <div className="mb-4 pb-2 border-b border-border/60 flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-semibold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-primary" />
                Live Article Preview
              </span>
              <span className="text-[11px]">Exact rendering for readers</span>
            </div>
            {value.trim() ? (
              <ArticleRenderer content={value} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                <Edit3 className="h-8 w-8 mb-2 opacity-30" />
                <p className="text-xs">Start writing or use toolbar shortcuts to see real-time preview.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Status / Stats Bar */}
      <div className="flex flex-wrap items-center justify-between border-t border-border/80 bg-muted/40 px-3 py-1.5 text-[11px] text-muted-foreground">
        <div className="flex items-center gap-3">
          <span>
            <strong className="text-foreground">{wordCount}</strong> words
          </span>
          <span>•</span>
          <span>
            <strong className="text-foreground">{charCount}</strong> characters
          </span>
          <span>•</span>
          <span>
            Estimated read time: <strong className="text-foreground">{readingTime} min</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-muted-foreground/80">
            Supports GitHub Flavored Markdown + Custom Product Ads
          </span>
        </div>
      </div>

      {/* ================= MODALS & DIALOGS ================= */}

      {/* 1. PRODUCT AD CARD MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground">Insert Product Ad / Affiliate Card</h3>
                  <p className="text-[11px] text-muted-foreground">
                    Embed a high-converting Amazon or tool card directly into the article.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Pick from registered affiliates */}
            {availableAffiliates.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center justify-between">
                  <span>Quick Select from Saved Gear & Tools</span>
                  <Badge variant="outline" className="text-[10px] py-0">
                    {availableAffiliates.length} Available
                  </Badge>
                </label>
                <select
                  value={selectedAffiliateId}
                  onChange={(e) => {
                    const id = e.target.value
                    setSelectedAffiliateId(id)
                    const found = availableAffiliates.find((a) => a.id === id)
                    if (found) {
                      setCustomProduct({
                        name: found.name,
                        title: found.name,
                        price: found.price || "$99.00",
                        rating: found.rating ? found.rating.toString() : "4.8",
                        badge: found.badge || "Recommended",
                        merchant: found.merchant || "Amazon",
                        url: found.affiliateUrl,
                        discountCode: found.discountCode || "",
                        description: found.description,
                      })
                    }
                  }}
                  className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs focus:ring-1 focus:ring-primary"
                >
                  <option value="">-- Choose registered product --</option>
                  {availableAffiliates.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.merchant === "Amazon" ? "📦 [Amazon] " : "⚙️ [Tool] "}
                      {item.name} ({item.price || "Sponsored"})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-border/60"></div>
              <span className="flex-shrink mx-2 text-[10px] text-muted-foreground uppercase font-semibold">
                Or Customize Ad Fields
              </span>
              <div className="flex-grow border-t border-border/60"></div>
            </div>

            {/* Product Fields */}
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold">Tool / Product Name</label>
                  <Input
                    placeholder="Logitech MX Master 3S"
                    value={customProduct.name}
                    onChange={(e) => setCustomProduct({ ...customProduct, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold">Display Title</label>
                  <Input
                    placeholder="Logitech MX Master 3S Wireless Mouse"
                    value={customProduct.title}
                    onChange={(e) => setCustomProduct({ ...customProduct, title: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold">Merchant</label>
                  <select
                    value={customProduct.merchant}
                    onChange={(e) => setCustomProduct({ ...customProduct, merchant: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs"
                  >
                    <option value="Amazon">Amazon</option>
                    <option value="DigitalOcean">DigitalOcean</option>
                    <option value="Cursor">Cursor</option>
                    <option value="Neon">Neon</option>
                    <option value="Official Store">Official Store</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">Price</label>
                  <Input
                    placeholder="$99.99"
                    value={customProduct.price}
                    onChange={(e) => setCustomProduct({ ...customProduct, price: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">Rating</label>
                  <Input
                    placeholder="4.8"
                    value={customProduct.rating}
                    onChange={(e) => setCustomProduct({ ...customProduct, rating: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold">Badge / Perk</label>
                  <Input
                    placeholder="Amazon's Choice or 20% Off"
                    value={customProduct.badge}
                    onChange={(e) => setCustomProduct({ ...customProduct, badge: e.target.value })}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold">Promo Code</label>
                  <Input
                    placeholder="Optional promo code"
                    value={customProduct.discountCode}
                    onChange={(e) => setCustomProduct({ ...customProduct, discountCode: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold">Affiliate Tracking URL</label>
                <Input
                  placeholder="https://www.amazon.com/dp/B09HM94VDS?tag=tanmayvaij-20"
                  value={customProduct.url}
                  onChange={(e) => setCustomProduct({ ...customProduct, url: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold">Recommendation Copy</label>
                <textarea
                  rows={2}
                  placeholder="Highlight key specs, ergonomic benefits, or why developers will love this..."
                  value={customProduct.description}
                  onChange={(e) => setCustomProduct({ ...customProduct, description: e.target.value })}
                  className="w-full rounded-md border border-input bg-background p-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Ad Preview Card */}
            <div className="rounded-lg border border-border/80 bg-muted/30 p-3 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                Card Preview In Article:
              </span>
              <div className="rounded-lg border border-primary/20 bg-card p-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Badge variant="outline" className="text-[9px] py-0">
                      {customProduct.merchant || "Amazon"}
                    </Badge>
                    <span className="font-bold text-xs">{customProduct.title || "Product Title"}</span>
                  </div>
                  {customProduct.price && (
                    <span className="text-xs font-bold text-foreground bg-muted px-2 py-0.5 rounded">
                      {customProduct.price}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                  {customProduct.description || "Product description..."}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border/60">
              <Button variant="ghost" size="sm" onClick={() => setShowProductModal(false)} className="text-xs h-8">
                Cancel
              </Button>
              <Button size="sm" onClick={handleInsertProductAd} className="text-xs h-8 gap-1">
                <Plus className="h-3.5 w-3.5" />
                Insert Ad Card into Content
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. INSERT LINK MODAL */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-xl border border-border bg-card p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <LinkIcon className="h-4 w-4 text-primary" />
                Insert Link
              </h3>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="space-y-1">
                <label className="font-semibold">Link Text</label>
                <Input
                  placeholder="e.g. Next.js Documentation"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold">URL</label>
                <Input
                  placeholder="https://nextjs.org"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border/60">
              <Button variant="ghost" size="sm" onClick={() => setShowLinkModal(false)} className="text-xs h-8">
                Cancel
              </Button>
              <Button size="sm" onClick={handleInsertLink} disabled={!linkUrl} className="text-xs h-8">
                Insert Link
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 3. INSERT IMAGE MODAL */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-border/60 pb-2">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <ImageIcon className="h-4 w-4 text-primary" />
                Insert Image into Article
              </h3>
              <button
                type="button"
                onClick={() => setShowImageModal(false)}
                className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <ImageUploader
                value={imageUrl}
                onChange={(url) => setImageUrl(url)}
                folder="blogs/content"
                label="Article Image"
                description="Upload an image to Firebase Storage or paste a direct image URL."
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-foreground">Caption / Alt Text</label>
                <Input
                  placeholder="Architecture diagram of distributed cache..."
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border/60">
              <Button variant="ghost" size="sm" onClick={() => setShowImageModal(false)} className="text-xs h-8">
                Cancel
              </Button>
              <Button size="sm" onClick={handleInsertImage} disabled={!imageUrl} className="text-xs h-8">
                Insert into Article
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 4. MARKDOWN CHEATSHEET HELP MODAL */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <HelpCircle className="h-4 w-4 text-primary" />
                Markdown & Rich Tags Guide
              </h3>
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 leading-relaxed">
              <div>
                <h4 className="font-bold text-foreground">Keyboard Shortcuts</h4>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div><code className="bg-muted px-1.5 py-0.5 rounded font-mono">Ctrl/Cmd + B</code> Bold</div>
                  <div><code className="bg-muted px-1.5 py-0.5 rounded font-mono">Ctrl/Cmd + I</code> Italic</div>
                  <div><code className="bg-muted px-1.5 py-0.5 rounded font-mono">Ctrl/Cmd + K</code> Insert Link</div>
                  <div><code className="bg-muted px-1.5 py-0.5 rounded font-mono">Tab</code> 2-space indent</div>
                </div>
              </div>

              <div className="border-t border-border/60 pt-3">
                <h4 className="font-bold text-foreground">Custom Monetization Shortcodes</h4>
                <p className="text-muted-foreground mt-1">
                  Use the <strong>+ Product Ad Card</strong> button in the toolbar to automatically generate product ad blocks:
                </p>
                <pre className="mt-1.5 p-2.5 rounded bg-muted font-mono text-[11px] overflow-x-auto text-foreground">
{`:::product-ad
name: Logitech MX Master 3S
title: Logitech MX Master 3S Wireless Mouse
price: $99.99
rating: 4.8
badge: Amazon's Choice
merchant: Amazon
url: https://www.amazon.com/dp/...
description: Precision scrolling with 8K DPI sensor.
:::`}
                </pre>
              </div>

              <div className="border-t border-border/60 pt-3">
                <h4 className="font-bold text-foreground">In-Article AdSense Banner</h4>
                <pre className="mt-1 p-2 rounded bg-muted font-mono text-[11px]">
{`:::ad-banner slot="5000000003" :::`}
                </pre>
              </div>

              <div className="border-t border-border/60 pt-3">
                <h4 className="font-bold text-foreground">Callout Alerts</h4>
                <div className="space-y-1 mt-1 text-muted-foreground">
                  <p><code className="bg-muted px-1 rounded">&gt; [!TIP] ...</code> Emerald tip box</p>
                  <p><code className="bg-muted px-1 rounded">&gt; [!WARNING] ...</code> Amber warning box</p>
                  <p><code className="bg-muted px-1 rounded">&gt; [!NOTE] ...</code> Blue informational note</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-border/60">
              <Button size="sm" onClick={() => setShowHelpModal(false)} className="text-xs h-8">
                Got it
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
