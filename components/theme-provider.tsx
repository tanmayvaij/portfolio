"use client"

import * as React from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: "light" | "dark"
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "portfolio-theme",
}: {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(storageKey) as Theme | null
        if (saved) return saved
      } catch {
        // ignore storage errors
      }
    }
    return defaultTheme
  })

  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">("light")

  React.useEffect(() => {
    const root = document.documentElement
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const applyTheme = (currentTheme: Theme) => {
      const resolved = currentTheme === "system" ? (mediaQuery.matches ? "dark" : "light") : currentTheme
      setResolvedTheme(resolved)
      if (resolved === "dark") {
        root.classList.add("dark")
      } else {
        root.classList.remove("dark")
      }
    }

    applyTheme(theme)

    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme)
    } catch {
      // ignore
    }
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

