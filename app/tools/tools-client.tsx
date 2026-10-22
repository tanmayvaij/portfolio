"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Tag, Sparkles, Check, Copy, Star, ShoppingBag, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
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
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => {
              const isAmazon = tool.merchant?.toLowerCase() === "amazon"

              return (
                <motion.div
                  layout
                  key={tool.id}
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                  className="h-full"
                >
                  <Card className="flex flex-col justify-between h-full hover:border-primary/40 hover:shadow-md transition-shadow bg-card overflow-hidden">
                    {tool.imageUrl && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted/60 border-b border-border flex items-center justify-center p-4">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={tool.imageUrl}
                          alt={tool.name}
                          className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {tool.category}
                        </Badge>
                        <div className="flex items-center gap-1.5">
                          {isAmazon && (
                            <span className="rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold px-1.5 py-0.5 text-[9px] uppercase tracking-wider">
                              Amazon
                            </span>
                          )}
                          {tool.badge && (
                            <Badge variant="success" className="text-[10px] gap-1">
                              <Sparkles className="h-2.5 w-2.5" />
                              {tool.badge}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <CardTitle className="text-base font-bold leading-snug">
                        {tool.name}
                      </CardTitle>

                      {/* Rating & Price row */}
                      {(tool.rating || tool.price) && (
                        <div className="flex items-center gap-2 pt-1">
                          {tool.rating && (
                            <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                              <span>{tool.rating.toFixed(1)}</span>
                            </div>
                          )}
                          {tool.rating && tool.price && (
                            <span className="text-muted-foreground text-xs">•</span>
                          )}
                          {tool.price && (
                            <span className="text-xs font-bold text-foreground">
                              {tool.price}
                            </span>
                          )}
                        </div>
                      )}

                      <CardDescription className="text-xs leading-relaxed mt-2 text-muted-foreground">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3 pt-0">
                      {tool.discountCode && (
                        <div className="flex items-center justify-between rounded-md border border-dashed border-border bg-muted/40 px-2.5 py-1.5 text-xs">
                          <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                            <Tag className="h-3 w-3" />
                            <span>Promo:</span>
                            <code className="font-mono font-bold text-foreground">{tool.discountCode}</code>
                          </div>
                          <button
                            onClick={() => handleCopyCode(tool.discountCode!)}
                            className="text-[11px] text-primary hover:underline flex items-center gap-1"
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
                    </CardContent>

                    <CardFooter className="border-t border-border/50 pt-3 flex items-center justify-between text-xs">
                      <span className="text-[10px] text-muted-foreground/70">
                        {isAmazon ? "Amazon Associate Link" : "Partner Deal"}
                      </span>
                      <Button asChild size="sm" className="h-8 text-xs px-3">
                        <a
                          href={tool.affiliateUrl}
                          target="_blank"
                          rel="sponsored nofollow noopener noreferrer"
                          className="inline-flex items-center gap-1.5"
                        >
                          {isAmazon ? (
                            <>
                              <ShoppingBag className="h-3 w-3" />
                              View on Amazon
                            </>
                          ) : (
                            <>
                              Claim Deal
                              <ExternalLink className="h-3 w-3 ml-0.5" />
                            </>
                          )}
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
