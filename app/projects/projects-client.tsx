"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, ArrowRight } from "lucide-react"
import { GithubIcon } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import type { Project } from "@/lib/data/portfolio"

const categories = ["All", "Web App", "AI & Systems", "DevOps & Cloud", "Open Source"] as const

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All")

  const filteredProjects = React.useMemo(() => {
    if (selectedCategory === "All") return projects
    return projects.filter((p) => p.category === selectedCategory)
  }, [projects, selectedCategory])

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-border/60 pb-4">
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
                  layoutId="active-project-category"
                  className="absolute inset-0 rounded-lg bg-primary -z-10 shadow-xs"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {cat}
            </motion.button>
          )
        })}
      </div>

      {/* Grid with AnimatePresence */}
      <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <Card className="flex flex-col justify-between h-full hover:border-primary/40 hover:shadow-md transition-shadow bg-card overflow-hidden">
                {project.featuredImage && (
                  <Link href={`/projects/${project.slug || project.id}`} className="block relative aspect-[2/1] w-full overflow-hidden bg-muted border-b border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.featuredImage}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-[11px]">
                      {project.category}
                    </Badge>
                    {project.metrics && (
                      <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        {project.metrics}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl hover:text-primary transition-colors">
                    <Link href={`/projects/${project.slug || project.id}`}>
                      {project.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed mt-2 line-clamp-3">
                    {project.longDescription}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-1.5 rounded-lg bg-muted/40 p-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Key Technical Architectural Features:
                    </div>
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-foreground/80">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {project.screenshots && project.screenshots.trim().length > 0 && (
                    <div className="pt-2">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                        Screenshots & Diagrams
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                        {project.screenshots
                          .split("\n")
                          .map((s) => s.trim())
                          .filter(Boolean)
                          .map((src, sIdx) => (
                            <a
                              key={sIdx}
                              href={src}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative block shrink-0 w-28 h-18 rounded-md overflow-hidden border border-border hover:border-primary transition-colors bg-muted"
                              title={`View Screenshot ${sIdx + 1}`}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={src}
                                alt={`${project.title} screenshot ${sIdx + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </a>
                          ))}
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="border-t border-border/50 pt-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {project.githubUrl && (
                      <Button asChild variant="outline" size="sm" className="h-8 text-xs px-2.5">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub Repository">
                          <GithubIcon className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button asChild variant="outline" size="sm" className="h-8 text-xs px-2.5">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="Live Platform">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </Button>
                    )}
                  </div>

                  <Button asChild size="sm" className="h-8 text-xs px-3 ml-auto">
                    <Link href={`/projects/${project.slug || project.id}`}>
                      Case Study
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
