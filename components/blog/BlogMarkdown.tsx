import React from "react";
import Image from "next/image";
import Markdown from "markdown-to-jsx";

interface BlogMarkdownProps {
  content: string;
}

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  return (
    <Markdown
      options={{
        overrides: {
          h1: {
            component: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
              <h1 className="text-4xl font-bold mt-16 mb-6 text-neutral-900 dark:text-white">
                {props.children}
              </h1>
            ),
          },
          h2: {
            component: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
              <h2 className="text-3xl font-bold mt-12 mb-4 text-neutral-900 dark:text-white">
                {props.children}
              </h2>
            ),
          },
          h3: {
            component: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
              <h3 className="text-2xl font-bold mt-10 mb-3 text-neutral-900 dark:text-white">
                {props.children}
              </h3>
            ),
          },
          h4: {
            component: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
              <h4 className="text-xl font-semibold mt-8 mb-3 text-neutral-900 dark:text-white">
                {props.children}
              </h4>
            ),
          },
          p: {
            component: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
              <p className="text-lg leading-relaxed mb-6 text-neutral-700 dark:text-neutral-300">
                {props.children}
              </p>
            ),
          },
          a: {
            component: (
              props: React.AnchorHTMLAttributes<HTMLAnchorElement>
            ) => (
              <a
                href={props.href}
                className="text-neutral-900 dark:text-white underline underline-offset-4 decoration-2 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-neutral-900 dark:hover:decoration-white transition-colors"
              >
                {props.children}
              </a>
            ),
          },
          code: {
            component: (props: React.HTMLAttributes<HTMLElement>) => {
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
                <code className="font-mono text-sm">{props.children}</code>
              );
            },
          },
          pre: {
            component: (props: React.HTMLAttributes<HTMLElement>) => {
              // Type guard to check if children is a React element with className prop
              const isCodeElement = (
                child: React.ReactNode
              ): child is React.ReactElement<{ className?: string }> => {
                return (
                  React.isValidElement(child) &&
                  typeof child.props === "object" &&
                  child.props !== null
                );
              };

              const children = props.children;
              const hasLanguage =
                isCodeElement(children) &&
                children.props.className?.startsWith("lang-");

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
            component: (props: React.HTMLAttributes<HTMLElement>) => (
              <ul className="my-6 space-y-2 list-none pl-0">
                {props.children}
              </ul>
            ),
          },
          ol: {
            component: (props: React.HTMLAttributes<HTMLElement>) => (
              <ol className="my-6 space-y-2 list-decimal pl-6 marker:text-neutral-400 dark:marker:text-neutral-600">
                {props.children}
              </ol>
            ),
          },
          li: {
            component: (props: React.HTMLAttributes<HTMLElement>) => (
              <li className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed pl-6 relative before:content-['–'] before:absolute before:left-0 before:text-neutral-400 dark:before:text-neutral-600">
                {props.children}
              </li>
            ),
          },
          blockquote: {
            component: (props: React.HTMLAttributes<HTMLElement>) => (
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
            component: (props: React.HTMLAttributes<HTMLElement>) => (
              <strong className="font-semibold text-neutral-900 dark:text-white">
                {props.children}
              </strong>
            ),
          },
          em: {
            component: (props: React.HTMLAttributes<HTMLElement>) => (
              <em className="italic">{props.children}</em>
            ),
          },
          table: {
            component: (props: React.HTMLAttributes<HTMLElement>) => (
              <div className="my-8 overflow-x-auto">
                <table className="w-full border-collapse border border-neutral-200 dark:border-neutral-800">
                  {props.children}
                </table>
              </div>
            ),
          },
          thead: {
            component: (props: React.HTMLAttributes<HTMLElement>) => (
              <thead className="bg-neutral-50 dark:bg-neutral-900">
                {props.children}
              </thead>
            ),
          },
          tbody: {
            component: (props: React.HTMLAttributes<HTMLElement>) => (
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {props.children}
              </tbody>
            ),
          },
          tr: {
            component: (props: React.HTMLAttributes<HTMLElement>) => (
              <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                {props.children}
              </tr>
            ),
          },
          th: {
            component: (props: React.HTMLAttributes<HTMLElement>) => (
              <th className="px-6 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800">
                {props.children}
              </th>
            ),
          },
          td: {
            component: (props: React.HTMLAttributes<HTMLElement>) => (
              <td className="px-6 py-4 text-base text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800">
                {props.children}
              </td>
            ),
          },
          img: {
            component: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
              <span className="block relative w-full h-auto my-8">
                <Image
                  src={(props.src as string) || ""}
                  alt={props.alt || ""}
                  width={1200}
                  height={675}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-800 w-full h-auto"
                />
              </span>
            ),
          },
        },
      }}
    >
      {content}
    </Markdown>
  );
}
