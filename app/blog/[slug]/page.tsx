import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { ShareButton } from "@/components/blog/ShareButton";
import { BlogPageProps } from "@/types";
import { Metadata } from "next";
import { BlogPostJsonLd } from "@/components/seo/BlogPostJsonLd";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import Image from "next/image";

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tanmayvaij.dev";

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: "Tanmay Vaij" }],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Tanmay Vaij"],
      tags: post.tags,
      images: [
        {
          url: `${baseUrl}/blog/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${baseUrl}/blog/${slug}/opengraph-image`],
      creator: "@tanmayvaij",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-24">
      <BlogPostJsonLd post={post} slug={slug} />
      {/* Navigation */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back</span>
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-16">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-500 mb-8">
            <time className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>·</span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-neutral-900 dark:text-white tracking-tight">
            {post.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="px-3 py-1 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
              >
                {tag}
              </Badge>
            ))}

            {/* Share Button */}
            <div className="ml-auto">
              <ShareButton
                title={post.title}
                url={`https://www.tanmayvaij.dev/blog/${post.slug}`}
                text={post.excerpt}
              />
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-16 relative w-full h-[400px] md:h-[500px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover rounded-lg border border-neutral-200 dark:border-neutral-800"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert prose-neutral max-w-none">
          <BlogMarkdown content={post.content} />
        </div>

        {/* Footer */}
        <div className="mt-20 pt-12 border-t border-neutral-200 dark:border-neutral-800" />
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
