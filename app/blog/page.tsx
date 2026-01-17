import { getAllPosts } from "@/lib/blog";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { FeaturedBlogPost } from "@/components/blog/FeaturedBlogPost";
import { BlogGridPost } from "@/components/blog/BlogGridPost";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on Full Stack Development, AI/ML, DevOps, and modern web technologies. Learn from real-world experiences and technical deep-dives.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | Tanmay Vaij",
    description:
      "Insights on Full Stack Development, AI/ML, DevOps, and modern web technologies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Tanmay Vaij",
    description:
      "Insights on Full Stack Development, AI/ML, DevOps, and modern web technologies.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">
            Our latest{" "}
            <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              blogs
            </span>
          </h1>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-600 dark:text-neutral-400">
              No blog posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && <FeaturedBlogPost post={featuredPost} />}

            {/* Blog Grid */}
            {otherPosts.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((post, index) => (
                  <BlogGridPost key={post.slug} post={post} index={index} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
