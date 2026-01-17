"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Database,
  Cpu,
  Download,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const springConfig = { damping: 30, stiffness: 200 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      <motion.div
        style={{ y, opacity }}
        className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center relative z-10"
      >
        {/* Text Content - Order 2 on mobile, 1 on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="block"
            >
              Building
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="block bg-linear-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent"
            >
              Production AI
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="block"
            >
              Systems
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed max-w-lg"
          >
            Full-stack engineer with{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              2+ years
            </span>{" "}
            shipping GenAI products, scalable backends, and DevOps
            infrastructure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                asChild
                className="bg-linear-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all group"
              >
                <a href="#work" className="flex items-center gap-2">
                  View Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:tanmayvaij22@gmail.com">Get in Touch</a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="ghost" asChild className="gap-2">
                <a href="/resume.pdf" download>
                  <Download className="w-5 h-5" />
                  Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800"
          >
            {[
              { value: "2+", label: "Years Experience" },
              { value: "15+", label: "Technologies" },
              { value: "3", label: "Featured Projects" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              >
                <div className="text-3xl font-bold bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Visual - Profile Picture - Order 1 on mobile, 2 on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex items-center justify-center order-1 md:order-2 pt-8 md:pt-0"
        >
          <motion.div style={{ x: mouseX, y: mouseY }} className="relative">
            {/* Profile Image with Glow */}
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-linear-to-br from-rose-400 to-pink-400 rounded-full blur-3xl"
              />
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white dark:border-neutral-800 shadow-2xl">
                <Image
                  src="/pixar-profile-pic.png"
                  alt="Tanmay Vaij - Profile Picture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 320px, 384px"
                  priority
                />
              </div>
            </div>

            {/* Floating Tech Badges */}
            {[
              {
                icon: Cpu,
                label: "AI Engineer",
                position: "-top-8 -right-8",
                delay: 0,
              },
              {
                icon: Database,
                label: "Full Stack",
                position: "-bottom-8 -left-8",
                delay: 0.5,
              },
              {
                icon: Code2,
                label: "DevOps",
                position: "top-1/2 -right-12",
                delay: 1,
              },
            ].map((badge, index) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -15, 0],
                }}
                transition={{
                  opacity: { delay: 1 + index * 0.2 },
                  scale: { delay: 1 + index * 0.2 },
                  y: {
                    duration: 3 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: badge.delay,
                  },
                }}
                className={`absolute ${badge.position}`}
              >
                <Badge
                  variant="outline"
                  className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm font-mono shadow-lg hover:shadow-xl transition-shadow cursor-default"
                >
                  <badge.icon className="w-4 h-4 mr-2" />
                  {badge.label}
                </Badge>
              </motion.div>
            ))}

            {/* Decorative Circles */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 border-2 border-rose-500/20 rounded-full pointer-events-none"
            />
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-10 -left-10 w-32 h-32 md:w-40 md:h-40 border-2 border-pink-500/20 rounded-full pointer-events-none"
            />

            {/* Floating Dots */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
                className="absolute w-2 h-2 bg-linear-to-r from-rose-500 to-pink-500 rounded-full pointer-events-none"
                style={{
                  top: `${20 + i * 10}%`,
                  left: `${10 + i * 15}%`,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        onClick={scrollToWork}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
        aria-label="Scroll to work section"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </section>
  );
}
