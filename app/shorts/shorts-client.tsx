"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Play, X, Search, Sparkles, ExternalLink, ArrowUpRight, Clock, Eye, Layers } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { YouTubeIcon } from "@/components/icons"
import type { ShortItem } from "@/lib/db/shorts"

interface ShortsClientProps {
  shorts: ShortItem[]
}

export function ShortsClient({ shorts }: ShortsClientProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")
  const [searchQuery, setSearchQuery] = React.useState<string>("")
  const [activeVideo, setActiveVideo] = React.useState<ShortItem | null>(null)

  const categories = React.useMemo(() => {
    const set = new Set(shorts.map((s) => s.category))
    return ["All", ...Array.from(set)]
  }, [shorts])

  const filteredShorts = React.useMemo(() => {
    return shorts.filter((short) => {
      const matchesCategory =
        selectedCategory === "All" || short.category === selectedCategory
      const matchesQuery =
        !searchQuery.trim() ||
        short.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (short.description && short.description.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesQuery
    })
  }, [shorts, selectedCategory, searchQuery])

  // Close modal with ESC key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null)
      }
    }
    if (activeVideo) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [activeVideo])

  return (
    <div className="space-y-6">
      {/* Category Pills & Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm scale-105"
                    : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat}
                {cat === "All" && ` (${shorts.length})`}
              </button>
            )
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search shorts topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs h-9 bg-card"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredShorts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3 bg-muted/20">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
            <YouTubeIcon className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">No shorts uploaded yet in this category</h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            {searchQuery
              ? `No shorts found matching "${searchQuery}". Try a different keyword.`
              : "New daily finance and lifestyle shorts will appear here as they are published. Check out the YouTube channel directly!"}
          </p>
          <div className="pt-2">
            <Button asChild size="sm" className="gap-1.5 text-xs">
              <a
                href="https://www.youtube.com/channel/UC6y7NAEEm-U97DLfHc__l9w"
                target="_blank"
                rel="noopener noreferrer"
              >
                <YouTubeIcon className="h-4 w-4 text-white" />
                Visit YouTube Channel
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Button>
          </div>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredShorts.map((short) => {
              const thumbnail =
                short.thumbnailUrl ||
                `https://img.youtube.com/vi/${short.videoId}/hqdefault.jpg`

              return (
                <motion.div
                  layout
                  key={short.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="group flex flex-col justify-between h-full"
                >
                  {/* Vertical 9:16 Video Card */}
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black border border-border/70 shadow-xs group-hover:border-red-500/50 group-hover:shadow-xl group-hover:shadow-red-500/5 transition-all duration-300">
                    {/* Thumbnail Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={thumbnail}
                      alt={short.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

                    {/* Top Info Bar */}
                    <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10 pointer-events-none">
                      <span className="rounded-full bg-black/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-medium text-white border border-white/10 shadow-xs">
                        {short.category}
                      </span>

                      {short.duration && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/70 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono text-zinc-300 border border-white/10">
                          <Clock className="h-2.5 w-2.5 text-zinc-400" />
                          {short.duration}
                        </span>
                      )}
                    </div>

                    {/* Center Animated Play Button on Hover */}
                    <button
                      type="button"
                      onClick={() => setActiveVideo(short)}
                      aria-label={`Play ${short.title}`}
                      className="absolute inset-0 m-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-600/90 text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 focus:outline-hidden z-20 cursor-pointer"
                    >
                      <Play className="h-6 w-6 fill-white ml-0.5" />
                    </button>

                    {/* Bottom Title & Details */}
                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 space-y-2 z-10">
                      {short.views && (
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                          <Eye className="h-3 w-3" />
                          <span>{short.views}</span>
                        </div>
                      )}

                      <h3
                        onClick={() => setActiveVideo(short)}
                        className="font-bold text-xs sm:text-sm text-white line-clamp-2 leading-snug cursor-pointer hover:underline"
                      >
                        {short.title}
                      </h3>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => setActiveVideo(short)}
                          className="text-[11px] font-medium text-red-400 hover:text-red-300 inline-flex items-center gap-1 cursor-pointer"
                        >
                          Watch Short
                          <Play className="h-2.5 w-2.5 fill-current" />
                        </button>

                        <a
                          href={short.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-white transition-colors"
                          title="Watch directly on YouTube"
                        >
                          <YouTubeIcon className="h-3.5 w-3.5 hover:text-red-500" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Optional Related Resource Link */}
                  {(short.relatedToolUrl || short.relatedPostSlug) && (
                    <div className="pt-2 px-1">
                      {short.relatedToolUrl ? (
                        <Link
                          href={short.relatedToolUrl}
                          className="text-[11px] text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                        >
                          <Sparkles className="h-3 w-3 text-emerald-500" />
                          <span>Featured Tool Mentioned</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      ) : short.relatedPostSlug ? (
                        <Link
                          href={`/blog/${short.relatedPostSlug}`}
                          className="text-[11px] text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                        >
                          <Layers className="h-3 w-3 text-primary" />
                          <span>Read Full Article</span>
                          <ArrowUpRight className="h-3 w-3" />
                        </Link>
                      ) : null}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Seamless Modal Player Dialog */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-sm sm:max-w-md bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header with Close Button */}
              <div className="flex items-center justify-between p-3.5 border-b border-zinc-800/80 bg-zinc-900/60">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] text-red-500 border-red-500/30">
                    YouTube Short
                  </Badge>
                  <span className="text-xs text-zinc-400 truncate max-w-[200px]">
                    {activeVideo.category}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="rounded-full p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  aria-label="Close video player"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Vertical 9:16 Responsive Player Embed */}
              <div className="relative aspect-[9/16] w-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>

              {/* Video Info Footer & CTAs */}
              <div className="p-4 space-y-3 bg-zinc-950 border-t border-zinc-800/80">
                <h4 className="font-bold text-sm text-zinc-100 line-clamp-2">
                  {activeVideo.title}
                </h4>

                {activeVideo.description && (
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                    {activeVideo.description}
                  </p>
                )}

                <div className="flex items-center justify-between gap-2 pt-1">
                  <Button asChild size="sm" className="h-8 gap-1.5 text-xs bg-red-600 hover:bg-red-700 text-white font-semibold">
                    <a
                      href="https://www.youtube.com/channel/UC6y7NAEEm-U97DLfHc__l9w?sub_confirmation=1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <YouTubeIcon className="h-3.5 w-3.5 fill-white" />
                      Subscribe
                    </a>
                  </Button>

                  <Button asChild variant="outline" size="sm" className="h-8 gap-1 text-xs border-zinc-800 text-zinc-300 hover:text-white">
                    <a
                      href={activeVideo.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open on YouTube
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

