"use client"

import * as React from "react"
import { motion, useScroll, useSpring, HTMLMotionProps } from "framer-motion"

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
  fullWidth?: boolean
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.45,
  direction = "up",
  className = "",
  fullWidth = false,
  ...props
}: FadeInProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 24, opacity: 0 }
      case "down":
        return { y: -24, opacity: 0 }
      case "left":
        return { x: 24, opacity: 0 }
      case "right":
        return { x: -24, opacity: 0 }
      case "none":
        return { opacity: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ y: 0, x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      style={{ width: fullWidth ? "100%" : undefined }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  staggerDelay?: number
  delayChildren?: number
  className?: string
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  delayChildren = 0.1,
  className = "",
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = "",
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            ease: [0.21, 0.47, 0.32, 0.98],
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

import { cn } from "@/lib/utils"

export function MotionCard({
  children,
  className = "",
  hoverY = -4,
  ...props
}: HTMLMotionProps<"div"> & { hoverY?: number }) {
  return (
    <motion.div
      whileHover={{ y: hoverY }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground shadow-xs transition-all overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50 pointer-events-none"
    />
  )
}

