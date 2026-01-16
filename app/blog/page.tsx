import { getAllPosts } from "@/lib/blog";
import { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles and insights on Full Stack Development, AI, GenAI, and modern web technologies by Tanmay Vaij",
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
            <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
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
            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug}`}>
                <Card className="mb-12 overflow-hidden border-0 shadow-none transition-all duration-300 group">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Left Content */}
                    <div className="p-6 md:p-6 flex flex-col justify-center">
                      <Badge className="w-fit mb-4 px-3 py-1 bg-rose-100 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-0 uppercase text-xs font-semibold tracking-wide">
                        {featuredPost.tags[0] || "Featured"}
                      </Badge>

                      <h2 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                        {featuredPost.title}
                      </h2>

                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 line-clamp-3">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(featuredPost.date).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <span className="text-neutral-400">•</span>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{featuredPost.readingTime} min read</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-medium group-hover:gap-3 transition-all">
                        <span>Read blog</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden">
                      <img
                        src={
                          featuredPost.image ||
                          "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&q=80"
                        }
                        alt={featuredPost.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </Card>
              </Link>
            )}

            {/* Blog Grid */}
            {otherPosts.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((post, index) => {
                  // Different images for different posts
                  const imageUrls = [
                    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop&q=80", // Coding
                    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop&q=80", // Code editor
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&q=80", // Computer
                  ];

                  return (
                    <Link key={post.slug} href={`/blog/${post.slug}`}>
                      <Card className="h-full overflow-hidden border-0 shadow-none transition-all duration-300 group">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={
                              post.image || imageUrls[index % imageUrls.length]
                            }
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

                          <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {new Date(post.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                            <span className="text-neutral-400">•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.readingTime} min</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
