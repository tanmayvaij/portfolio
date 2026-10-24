"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, ArrowUpRight, Layers } from "lucide-react"
import { GithubIcon } from "@/components/icons"
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
      <div className="flex flex-wrap items-center gap-2 border-b border-border/60 pb-4">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat
          return (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(cat)}
              className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors z-10 ${
                isActive
                  ? "text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="active-project-category"
                  className="absolute inset-0 rounded-full bg-primary -z-10 shadow-xs"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {cat}
            </motion.button>
          )
        })}
      </div>

      {/* Pinterest-Style Visual Grid */}
      {filteredProjects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-dashed border-border p-12 text-center text-xs text-muted-foreground"
        >
          No projects found in this category.
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const projectHref = `/projects/${project.slug || project.id}`

              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="group flex flex-col"
                >
                  {/* Pinterest Visual Pin Card */}
                  <div className="relative w-full overflow-hidden rounded-2xl bg-muted/60 border border-border/60 shadow-xs group-hover:shadow-xl group-hover:border-primary/40 transition-all duration-300">
                    {/* Background Clickable Link to Case Study */}
                    <Link
                      href={projectHref}
                      className="block w-full"
                      aria-label={project.title}
                    >
                      {project.featuredImage ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={project.featuredImage}
                          alt={project.title}
                          className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      ) : (
                        /* Fallback aesthetic gradient pin when no image is uploaded */
                        <div className="aspect-[16/10] w-full flex flex-col justify-between p-6 bg-gradient-to-br from-card via-muted/40 to-muted/80 relative overflow-hidden">
                          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-background/80 px-2 py-0.5 rounded-md border border-border/50">
                              {project.category}
                            </span>
                            <Layers className="h-5 w-5 text-muted-foreground/60" />
                          </div>
                          <div>
                            <span className="text-base font-bold tracking-tight text-foreground/90 line-clamp-2">
                              {project.title}
                            </span>
                            <span className="text-[11px] text-muted-foreground font-mono mt-1 block">
                              Click to explore case study
                            </span>
                          </div>
                        </div>
                      )}
                    </Link>

                    {/* Pinterest Hover Overlay (sibling to base Link, not nested inside <a>) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10 pointer-events-none">
                      {/* Top Badges & External Actions */}
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white shadow-xs">
                          {project.category}
                        </span>

                        <div className="flex items-center gap-1.5 pointer-events-auto">
                          {project.showGithub !== false && project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center shadow-xs"
                              title="GitHub Repository"
                            >
                              <GithubIcon className="h-3.5 w-3.5" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center shadow-xs"
                              title="Live Platform"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Bottom Action Pill */}
                      <div className="flex items-center justify-between pointer-events-auto">
                        {project.metrics ? (
                          <span className="text-[11px] font-semibold text-emerald-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                            {project.metrics}
                          </span>
                        ) : (
                          <div />
                        )}

                        <Link
                          href={projectHref}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:scale-105"
                        >
                          Case Study
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Pinterest Bottom Caption */}
                  <div className="pt-2.5 pb-1 px-1 space-y-0.5">
                    <Link href={projectHref} className="block">
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{project.category}</span>
                      {project.metrics && (
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">
                          {project.metrics}
                        </span>
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

