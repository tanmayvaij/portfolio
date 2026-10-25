"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Calendar, Clock, ArrowRight, Tag, BookOpen, ArrowUpRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import type { BlogPost } from "@/lib/data/blog"

const categories = ["All", "Architecture", "Next.js", "AI & Systems", "DevOps", "Performance"] as const

export function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")
  const [searchQuery, setSearchQuery] = React.useState<string>("")

  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [posts, selectedCategory, searchQuery])

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search blogs, tags, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 text-sm"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(cat)}
                className={`relative rounded-full px-3 py-1 text-xs font-medium transition-colors z-10 ${
                  isActive
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-blog-category"
                    className="absolute inset-0 rounded-full bg-primary -z-10 shadow-xs"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {cat}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Posts Count */}
      <div className="text-xs text-muted-foreground">
        Showing {filteredPosts.length} {filteredPosts.length === 1 ? "blog" : "blogs"}
        {selectedCategory !== "All" && ` in "${selectedCategory}"`}
      </div>

      {/* Grid of blogs with AnimatePresence */}
      {filteredPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-dashed border-border p-12 text-center"
        >
          <p className="text-sm font-medium text-foreground">No blogs match your criteria.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try searching for other terms like Next.js, Architecture, or Systems.
          </p>
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                layout
                key={post.slug}
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group flex flex-col"
              >
                {/* Pinterest Visual Pin Card */}
                <div className="relative w-full overflow-hidden rounded-2xl bg-muted/60 border border-border/60 shadow-xs group-hover:shadow-xl group-hover:border-primary/40 transition-all duration-300">
                  {/* Background Clickable Link to Blog Post */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block w-full"
                    aria-label={post.title}
                  >
                    {post.coverImage ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                    ) : (
                      /* Fallback aesthetic gradient pin when no image is uploaded */
                      <div className="aspect-[16/10] w-full flex flex-col justify-between p-6 bg-gradient-to-br from-card via-muted/40 to-muted/80 relative overflow-hidden">
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-background/80 px-2 py-0.5 rounded-md border border-border/50">
                            {post.category}
                          </span>
                          <BookOpen className="h-5 w-5 text-muted-foreground/60" />
                        </div>
                        <div>
                          <span className="text-base font-bold tracking-tight text-foreground/90 line-clamp-2">
                            {post.title}
                          </span>
                          <span className="text-[11px] text-muted-foreground font-mono mt-1 block">
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    )}
                  </Link>

                  {/* Pinterest Hover Overlay (sibling to base Link, no nested <a> tags) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10 pointer-events-none">
                    {/* Top Badges */}
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white shadow-xs">
                        {post.category}
                      </span>
                      <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-zinc-300 shadow-xs">
                        {post.readTime}
                      </span>
                    </div>

                    {/* Bottom Action Pill */}
                    <div className="flex items-center justify-between pointer-events-auto">
                      <span className="text-[11px] font-medium text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                        {post.publishedAt}
                      </span>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:scale-105"
                      >
                        Read Blog
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Pinterest Bottom Caption */}
                <div className="pt-2.5 pb-1 px-1 space-y-1">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md border border-border/40"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
                    <span>{post.category}</span>
                    <span>{post.publishedAt}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
