"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BlogGridPostProps } from "@/types";

export function BlogGridPost({ post, index }: BlogGridPostProps) {
  return (
    <Link key={post.slug} href={`/blog/${post.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Card className="h-full overflow-hidden border-0 shadow-none transition-all duration-300 group hover:shadow-lg">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <Badge className="mb-3 px-3 py-1 bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-0 uppercase text-xs font-semibold tracking-wide">
              {post.tags[0] || "Article"}
            </Badge>

            <h3 className="text-xl font-bold mb-3 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
              {post.title}
            </h3>

            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-500 mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readingTime} min</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm font-medium group-hover:gap-3 transition-all">
              <span>Read more</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
