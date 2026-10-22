"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Code2, ArrowUpRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LinkedinIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Gear & Tools", href: "/tools" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [prevPathname, setPrevPathname] = React.useState(pathname)

  if (pathname?.startsWith("/admin")) {
    return null
  }

  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold tracking-tight text-foreground transition-opacity hover:opacity-90"
        >
          <motion.div
            whileHover={{ rotate: 10, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm"
          >
            <Code2 className="h-5 w-5" />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-base font-bold leading-tight">Tanmay Vaij</span>
            <span className="text-[11px] font-normal text-muted-foreground leading-none">
              Full Stack & Systems
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium relative">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-md px-3.5 py-1.5 transition-colors z-10",
                  isActive
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-md bg-secondary -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://www.linkedin.com/in/tanmayvaij/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Tanmay Vaij LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="h-4 w-4" />
          </motion.a>

          <ThemeToggle />

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
            <Button size="sm" asChild className="text-xs h-8">
              <Link href="/contact">
                Let&apos;s Talk
                <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 sm:hidden">
          <a
            href="https://www.linkedin.com/in/tanmayvaij/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Tanmay Vaij LinkedIn Profile"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>

          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="border-b border-border bg-background/95 backdrop-blur-md px-4 py-4 sm:hidden overflow-hidden"
          >
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-secondary text-foreground font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {link.name}
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </Link>
                )
              })}
              <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
                <Button asChild size="sm" className="w-full justify-center">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
