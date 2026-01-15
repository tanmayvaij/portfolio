"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0.7, 0.95]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialLinks = [
    {
      href: "https://github.com/tanmayvaij",
      icon: Github,
      label: "GitHub",
      hoverColor: "hover:text-rose-600",
    },
    {
      href: "https://www.linkedin.com/in/tanmay-vaij",
      icon: Linkedin,
      label: "LinkedIn",
      hoverColor: "hover:text-pink-600",
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={{ opacity }}
      className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-xl transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-black/90 shadow-lg"
          : "bg-white/70 dark:bg-black/70"
      } border-b border-neutral-200/50 dark:border-neutral-800/50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.a
            href="#"
            className="font-mono text-sm sm:text-base tracking-wider font-bold relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              TANMAY VAIJ
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link.hoverColor} transition-all duration-300 relative group`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-neutral-900 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {link.label}
                </span>
              </motion.a>
            ))}

            {/* Theme Toggle */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <ThemeToggle />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                asChild
                className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <a
                  href="mailto:tanmayvaij22@gmail.com"
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 transition-transform group-hover:rotate-12" />
                  <span className="hidden sm:inline">Contact</span>
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[320px] sm:w-[380px] p-0 border-l border-neutral-200/50 dark:border-neutral-800/50"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="p-8 pb-6 border-b border-neutral-200/50 dark:border-neutral-800/50">
                  <motion.h2
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-bold bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 bg-clip-text text-transparent"
                  >
                    Menu
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm text-neutral-500 dark:text-neutral-400 mt-2"
                  >
                    Let's connect
                  </motion.p>
                </div>

                {/* Social Links */}
                <div className="flex-1 p-8 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-4">
                      Social
                    </p>
                    <div className="space-y-3">
                      {socialLinks.map((link, index) => (
                        <motion.div
                          key={link.label}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <Button
                            variant="ghost"
                            asChild
                            className={`w-full justify-start h-14 ${link.hoverColor} hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all group`}
                          >
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-4"
                            >
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <link.icon className="w-5 h-5" />
                              </div>
                              <span className="font-medium">{link.label}</span>
                            </a>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Theme Toggle */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="mt-6 pt-6 border-t border-neutral-200/50 dark:border-neutral-800/50"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                        Theme
                      </p>
                      <ThemeToggle />
                    </div>
                  </motion.div>
                </div>

                {/* Contact Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="p-8 pt-6 border-t border-neutral-200/50 dark:border-neutral-800/50"
                >
                  <Button
                    asChild
                    className="w-full h-14 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all group"
                  >
                    <a
                      href="mailto:tanmayvaij22@gmail.com"
                      className="flex items-center justify-center gap-3"
                    >
                      <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      <span className="font-semibold">Get in Touch</span>
                    </a>
                  </Button>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
