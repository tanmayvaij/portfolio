import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950 px-6">
      <div className="text-center max-w-lg mx-auto">
        <div className="mb-8 relative">
          <h1 className="text-9xl font-black text-neutral-200 dark:text-neutral-800 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-neutral-900 dark:text-white bg-white dark:bg-neutral-950 px-4">
              Page Not Found
            </span>
          </div>
        </div>

        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10">
          Oops! The page you are looking for seems to have wandered off into the
          digital void.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors w-full sm:w-auto justify-center"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white rounded-lg font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors w-full sm:w-auto justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Read Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
