import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Markdown from "markdown-to-jsx";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { ShareButton } from "@/components/blog/ShareButton";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 pt-24">
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
          <Markdown
            options={{
              overrides: {
                h1: {
                  component: (props: any) => (
                    <h1 className="text-4xl font-bold mt-16 mb-6 text-neutral-900 dark:text-white">
                      {props.children}
                    </h1>
                  ),
                },
                h2: {
                  component: (props: any) => (
                    <h2 className="text-3xl font-bold mt-12 mb-4 text-neutral-900 dark:text-white">
                      {props.children}
                    </h2>
                  ),
                },
                h3: {
                  component: (props: any) => (
                    <h3 className="text-2xl font-bold mt-10 mb-3 text-neutral-900 dark:text-white">
                      {props.children}
                    </h3>
                  ),
                },
                h4: {
                  component: (props: any) => (
                    <h4 className="text-xl font-semibold mt-8 mb-3 text-neutral-900 dark:text-white">
                      {props.children}
                    </h4>
                  ),
                },
                p: {
                  component: (props: any) => (
                    <p className="text-lg leading-relaxed mb-6 text-neutral-700 dark:text-neutral-300">
                      {props.children}
                    </p>
                  ),
                },
                a: {
                  component: (props: any) => (
                    <a
                      href={props.href}
                      className="text-neutral-900 dark:text-white underline underline-offset-4 decoration-2 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-white transition-colors"
                    >
                      {props.children}
                    </a>
                  ),
                },
                code: {
                  component: (props: any) => {
                    if (props.className?.startsWith("lang-")) {
                      const language = props.className.replace("lang-", "");
                      const isShell = ["bash", "sh", "shell", "zsh"].includes(
                        language
                      );

                      return (
                        <div className="relative my-6">
                          <pre
                            className={`overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 pt-6 p-4 dark:border-zinc-700 dark:bg-black ${
                              isShell
                                ? '[&>code]:before:content-["$"] [&>code]:before:text-zinc-500 [&>code]:before:mr-2 [&>code]:before:select-none'
                                : ""
                            }`}
                          >
                            {props.children}
                          </pre>
                        </div>
                      );
                    }
                    return (
                      <code className="font-mono text-sm">
                        {props.children}
                      </code>
                    );
                  },
                },
                pre: {
                  component: (props: any) => {
                    const hasLanguage =
                      props.children?.props?.className?.startsWith("lang-");
                    if (hasLanguage) {
                      return <>{props.children}</>;
                    }
                    // Fallback for pre without language - just render as plain pre
                    return (
                      <pre className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-950 p-4 dark:border-zinc-700 dark:bg-black my-6 font-mono text-sm text-zinc-50 dark:text-zinc-100">
                        {props.children}
                      </pre>
                    );
                  },
                },
                ul: {
                  component: (props: any) => (
                    <ul className="my-6 space-y-2 list-none pl-0">
                      {props.children}
                    </ul>
                  ),
                },
                ol: {
                  component: (props: any) => (
                    <ol className="my-6 space-y-2 list-decimal pl-6 marker:text-neutral-400 dark:marker:text-neutral-600">
                      {props.children}
                    </ol>
                  ),
                },
                li: {
                  component: (props: any) => (
                    <li className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed pl-6 relative before:content-['–'] before:absolute before:left-0 before:text-neutral-400 dark:before:text-neutral-600">
                      {props.children}
                    </li>
                  ),
                },
                blockquote: {
                  component: (props: any) => (
                    <blockquote className="my-8 pl-6 border-l-2 border-neutral-900 dark:border-white italic text-neutral-600 dark:text-neutral-400 text-lg">
                      {props.children}
                    </blockquote>
                  ),
                },
                hr: {
                  component: () => (
                    <hr className="my-12 border-neutral-200 dark:border-neutral-800" />
                  ),
                },
                strong: {
                  component: (props: any) => (
                    <strong className="font-semibold text-neutral-900 dark:text-white">
                      {props.children}
                    </strong>
                  ),
                },
                em: {
                  component: (props: any) => (
                    <em className="italic">{props.children}</em>
                  ),
                },
                table: {
                  component: (props: any) => (
                    <div className="my-8 overflow-x-auto">
                      <table className="w-full border-collapse border border-neutral-200 dark:border-neutral-800">
                        {props.children}
                      </table>
                    </div>
                  ),
                },
                thead: {
                  component: (props: any) => (
                    <thead className="bg-neutral-50 dark:bg-neutral-900">
                      {props.children}
                    </thead>
                  ),
                },
                tbody: {
                  component: (props: any) => (
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                      {props.children}
                    </tbody>
                  ),
                },
                tr: {
                  component: (props: any) => (
                    <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                      {props.children}
                    </tr>
                  ),
                },
                th: {
                  component: (props: any) => (
                    <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800">
                      {props.children}
                    </th>
                  ),
                },
                td: {
                  component: (props: any) => (
                    <td className="px-6 py-4 text-base text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800">
                      {props.children}
                    </td>
                  ),
                },
                img: {
                  component: (props: any) => (
                    <div className="relative w-full h-auto my-8">
                      <Image
                        src={props.src}
                        alt={props.alt || ""}
                        width={1200}
                        height={675}
                        className="rounded-lg border border-neutral-200 dark:border-neutral-800 w-full h-auto"
                      />
                    </div>
                  ),
                },
              },
            }}
          >
            {post.content}
          </Markdown>
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
