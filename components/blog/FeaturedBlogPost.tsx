"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FeaturedBlogPostProps } from "@/types";

export function FeaturedBlogPost({ post }: FeaturedBlogPostProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-12 overflow-hidden border-0 shadow-none transition-all duration-300 group hover:shadow-lg">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Content */}
            <div className="p-6 md:p-6 flex flex-col justify-center">
              <Badge className="w-fit mb-4 px-3 py-1 bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-0 uppercase text-xs font-semibold tracking-wide">
                {post.tags[0] || "Featured"}
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                {post.title}
              </h2>

              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <span className="text-neutral-400">•</span>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-medium group-hover:gap-3 transition-all">
                <span>Read blog</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
              <Image
                src={
                  post.image ||
                  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&q=80"
                }
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
