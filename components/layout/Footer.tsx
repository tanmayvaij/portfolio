"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  MapPin,
  Clock,
  ExternalLink,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

export function Footer() {
  const [currentTime, setCurrentTime] = useState("");
  const footerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      href: "https://github.com/tanmayvaij",
      icon: Github,
      label: "GitHub",
      username: "@tanmayvaij",
      hoverColor: "hover:bg-[#333] hover:border-[#333]",
      textColor: "hover:text-white",
    },
    {
      href: "https://www.linkedin.com/in/tanmayvaij",
      icon: Linkedin,
      label: "LinkedIn",
      username: "tanmay-vaij",
      hoverColor: "hover:bg-[#0A66C2] hover:border-[#0A66C2]",
      textColor: "hover:text-white",
    },
    {
      href: "mailto:tanmayvaij22@gmail.com",
      icon: Mail,
      label: "Email",
      username: "tanmayvaij22@gmail.com",
      hoverColor: "hover:bg-rose-600 hover:border-rose-600",
      textColor: "hover:text-white",
    },
  ];

  const quickLinks = [
    { label: "Work", href: "#work" },
    { label: "Experience", href: "#experience" },
    { label: "Tech Stack", href: "#tech" },
    { label: "About", href: "#about" },
  ];

  const projectLinks = [
    { label: "DiaFlow", href: "https://github.com/tanmayvaij/diaflow" },
    {
      label: "MyLegacyBox",
      href: "https://play.google.com/store/apps/details?id=com.oiconomos.www",
    },
    { label: "ContainRX", href: "https://github.com/shaasium/containrx" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-20 px-6 bg-linear-to-b from-white via-neutral-50 to-neutral-100 dark:from-black dark:via-neutral-950 dark:to-neutral-900 border-t-2 border-neutral-200 dark:border-neutral-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12"
        >
          {/* Brand Section - Larger */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-5 space-y-6"
          >
            <div>
              <motion.div
                className="font-mono text-3xl font-bold mb-2"
                whileHover={{ scale: 1.02 }}
              >
                <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  TANMAY VAIJ
                </span>
              </motion.div>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-4">
                Full Stack & AI Engineer
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                Crafting production-grade applications at the intersection of
                elegant design, scalable architecture, and intelligent systems.
                Let&apos;s build something extraordinary.
              </p>
            </div>

            {/* Location & Time */}
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <MapPin className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Pune, India</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
                <Clock className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>{currentTime} IST</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 space-y-4"
          >
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
              Navigate
            </h3>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group text-sm text-neutral-600 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors w-fit flex items-center gap-2"
                >
                  <span className="w-0 group-hover:w-4 h-[2px] bg-rose-600 dark:bg-rose-400 transition-all duration-300"></span>
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Projects Links */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 space-y-4"
          >
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
              Projects
            </h3>
            <nav className="flex flex-col gap-3">
              {projectLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-sm text-neutral-600 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors w-fit flex items-center gap-2"
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 space-y-4"
          >
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">
              Let&apos;s Connect
            </h3>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 ${link.hoverColor} ${link.textColor} transition-all group`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <link.icon className="w-5 h-5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium">{link.label}</div>
                    <div className="text-xs opacity-70 truncate">
                      {link.username}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <Separator className="mb-8 bg-neutral-200 dark:bg-neutral-800" />

        {/* Bottom Section */}
        <motion.div
          style={{ opacity, y }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
            <p className="font-mono">
              © {new Date().getFullYear()} Tanmay Vaij
            </p>
            <span className="hidden md:inline text-neutral-400">•</span>
            <div className="flex items-center gap-2">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-rose-600 fill-rose-600 animate-pulse" />
              <span>using Next.js, Tailwind & Framer Motion</span>
            </div>
          </div>

          {/* Quick Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-neutral-600 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Scroll to Top Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring" }}
          className="fixed bottom-8 right-8 z-50"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              onClick={scrollToTop}
              size="icon"
              className="h-14 w-14 rounded-2xl shadow-2xl bg-linear-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white border-0 group"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
