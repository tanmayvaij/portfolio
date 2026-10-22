"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionContextValue {
  openItems: Set<string>
  toggleItem: (value: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

export function Accordion({
  children,
  className,
  type = "single",
}: {
  children: React.ReactNode
  className?: string
  type?: "single" | "multiple"
}) {
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set())

  const toggleItem = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev)
        if (next.has(value)) {
          next.delete(value)
        } else {
          if (type === "single") {
            next.clear()
          }
          next.add(value)
        }
        return next
      })
    },
    [type]
  )

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("divide-y divide-border rounded-lg border border-border", className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div data-value={value} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  )
}

export function AccordionTrigger({
  children,
  className,
  value,
}: {
  children: React.ReactNode
  className?: string
  value: string
}) {
  const ctx = React.useContext(AccordionContext)
  const isOpen = ctx?.openItems.has(value)

  return (
    <button
      type="button"
      onClick={() => ctx?.toggleItem(value)}
      aria-expanded={isOpen}
      className={cn(
        "flex w-full items-center justify-between p-4 text-left font-medium transition-all hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-sm sm:text-base",
        className
      )}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200 text-muted-foreground",
          isOpen && "rotate-180"
        )}
      />
    </button>
  )
}

export function AccordionContent({
  children,
  className,
  value,
}: {
  children: React.ReactNode
  className?: string
  value: string
}) {
  const ctx = React.useContext(AccordionContext)
  const isOpen = ctx?.openItems.has(value)

  if (!isOpen) return null

  return (
    <div
      className={cn(
        "px-4 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed animate-in fade-in-50",
        className
      )}
    >
      {children}
    </div>
  )
}

