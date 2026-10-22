"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Calendar, Clock, ArrowRight, Tag } from "lucide-react"
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
            placeholder="Search articles, tags, concepts..."
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
        Showing {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
        {selectedCategory !== "All" && ` in "${selectedCategory}"`}
      </div>

      {/* Grid of articles with AnimatePresence */}
      {filteredPosts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-dashed border-border p-12 text-center"
        >
          <p className="text-sm font-medium text-foreground">No articles match your criteria.</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try searching for other terms like Next.js, Redis, or Systems.
          </p>
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                layout
                key={post.slug}
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                whileHover={{ y: -4 }}
                className="h-full"
              >
                <Card className="flex flex-col justify-between h-full hover:border-primary/40 hover:shadow-md transition-shadow bg-card overflow-hidden">
                  {post.coverImage && (
                    <Link href={`/blog/${post.slug}`} className="block relative aspect-[2/1] w-full overflow-hidden bg-muted border-b border-border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </Link>
                  )}
                  <CardHeader>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground mb-2">
                      <Badge variant="secondary" className="text-[11px] font-medium">
                        {post.category}
                      </Badge>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.publishedAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-snug hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-3 mt-2 leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Tag className="h-3 w-3 text-muted-foreground" />
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="border-t border-border/50 pt-3 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Author: Tanmay Vaij</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Read Guide
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}
