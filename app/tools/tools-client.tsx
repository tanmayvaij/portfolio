"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Tag, Sparkles, Check, Copy, Star, ShoppingBag, Search, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { ShareButton } from "@/components/ui/share-button"
import type { AffiliateToolItem } from "@/lib/db/affiliates"

export function ToolsClient({ tools }: { tools: AffiliateToolItem[] }) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)

  const categories = React.useMemo(() => {
    const set = new Set(tools.map((t) => t.category))
    return ["All", ...Array.from(set)]
  }, [tools])

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const filteredTools = React.useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        selectedCategory === "All" || tool.category === selectedCategory
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tool.badge && tool.badge.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
  }, [tools, selectedCategory, searchQuery])

  return (
    <div className="space-y-6">
      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`relative rounded-lg px-3.5 py-1.5 text-xs font-medium transition-colors z-10 ${
                  isActive
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-tool-category"
                    className="absolute inset-0 rounded-lg bg-primary -z-10 shadow-xs"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {cat}
              </motion.button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Search gear, tools, books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-8 text-xs bg-card"
          />
        </div>
      </div>

      {/* Grid of Products & Tools with AnimatePresence */}
      {filteredTools.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-dashed border-border p-12 text-center text-xs text-muted-foreground"
        >
          No gear or tools match your search. Try adjusting filters.
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => {
              const isAmazon = tool.merchant?.toLowerCase() === "amazon"
              const productHref = `/tools/${tool.slug || tool.id}`

              return (
                <motion.div
                  layout
                  key={tool.id}
                  id={tool.slug || tool.id}
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group flex flex-col scroll-mt-24"
                >
                  {/* Pinterest Visual Pin Card */}
                  <div className="relative w-full overflow-hidden rounded-2xl bg-muted/60 border border-border/60 shadow-xs group-hover:shadow-xl group-hover:border-primary/40 transition-all duration-300">
                    {/* Background Clickable Link to Product Page */}
                    <Link
                      href={productHref}
                      className="block w-full"
                      aria-label={tool.name}
                    >
                      {tool.imageUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={tool.imageUrl}
                          alt={tool.name}
                          className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      ) : (
                        /* Fallback aesthetic gradient pin when no image is uploaded */
                        <div className="aspect-[16/10] w-full flex flex-col justify-between p-6 bg-gradient-to-br from-card via-muted/40 to-muted/80 relative overflow-hidden">
                          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-background/80 px-2 py-0.5 rounded-md border border-border/50">
                              {tool.category}
                            </span>
                            <ShoppingBag className="h-5 w-5 text-muted-foreground/60" />
                          </div>
                          <div>
                            <span className="text-base font-bold tracking-tight text-foreground/90 line-clamp-2">
                              {tool.name}
                            </span>
                            {tool.price && (
                              <span className="text-xs font-semibold text-emerald-500 dark:text-emerald-400 font-mono mt-1 block">
                                {tool.price}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </Link>

                    {/* Pinterest Hover Overlay (sibling to base Link, no nested <a> tags) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10 pointer-events-none">
                      {/* Top Badges & Share Button */}
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white shadow-xs">
                            {tool.category}
                          </span>
                          {isAmazon && (
                            <span className="rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 shadow-xs">
                              Amazon
                            </span>
                          )}
                          {tool.badge && (
                            <span className="rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 px-2 py-0.5 text-[10px] font-medium text-emerald-300 shadow-xs flex items-center gap-1">
                              <Sparkles className="h-2.5 w-2.5" />
                              {tool.badge}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 pointer-events-auto">
                          <a
                            href={tool.affiliateUrl}
                            target="_blank"
                            rel="sponsored nofollow noopener noreferrer"
                            className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors p-0 shadow-xs flex items-center justify-center"
                            title={isAmazon ? "View on Amazon" : "Visit Platform"}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>

                          <ShareButton
                            title={`${tool.name} | Recommended by Tanmay Vaij`}
                            text={tool.description}
                            url={`/tools/${tool.slug || tool.id}`}
                            variant="ghost"
                            size="sm"
                            label=""
                            showLabelOnMobile={false}
                            className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors p-0 shadow-xs flex items-center justify-center"
                            align="right"
                          />
                        </div>
                      </div>

                      {/* Bottom Action Pill */}
                      <div className="flex items-center justify-between pointer-events-auto">
                        <div className="flex items-center gap-2">
                          {tool.rating && (
                            <span className="flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-amber-400 shadow-xs">
                              <Star className="h-3 w-3 fill-amber-400" />
                              {tool.rating.toFixed(1)}
                            </span>
                          )}
                          {tool.price && (
                            <span className="text-[11px] font-semibold text-emerald-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                              {tool.price}
                            </span>
                          )}
                        </div>

                        <Link
                          href={productHref}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:scale-105"
                        >
                          View Gear
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Pinterest Bottom Caption */}
                  <div className="pt-2.5 pb-1 px-1 space-y-1">
                    <Link
                      href={productHref}
                      className="block"
                    >
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {tool.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>

                    {/* Promo Code Row (if available) */}
                    {tool.discountCode && (
                      <div className="mt-2 flex items-center justify-between rounded-lg border border-dashed border-border bg-muted/40 px-2.5 py-1 text-xs">
                        <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                          <Tag className="h-3 w-3" />
                          <span>Promo:</span>
                          <code className="font-mono font-bold text-foreground">{tool.discountCode}</code>
                        </div>
                        <button
                          onClick={() => handleCopyCode(tool.discountCode!)}
                          className="text-[11px] text-primary hover:underline flex items-center gap-1 font-medium"
                        >
                          {copiedCode === tool.discountCode ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-500" />
                              <span className="text-emerald-500">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {/* Meta Footer */}
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
                      <span>{isAmazon ? "Amazon Associate" : tool.merchant || "Partner"}</span>
                      {tool.price && (
                        <span className="font-semibold text-foreground">{tool.price}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
