"use client";

import { Share2, Check, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { ShareButtonProps } from "@/types";

export function ShareButton({ title, url, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);

    // Try Web Share API first (works on mobile and some desktop browsers)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text || `Check out this article: ${title}`,
          url: url,
        });
        setIsSharing(false);
        return;
      } catch {
        // User cancelled or share failed, fall through to clipboard
        console.log("Share cancelled or failed, copying to clipboard");
      }
    }

    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setIsSharing(false);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      setIsSharing(false);
      // You could show a toast notification here instead of alert
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className="group inline-flex items-center gap-2 px-4 py-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all duration-200 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 cursor-pointer"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="font-medium text-green-600 dark:text-green-400">
            Copied!
          </span>
        </>
      ) : (
        <>
          {isSharing ? (
            <LinkIcon className="w-4 h-4 animate-pulse" />
          ) : (
            <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          )}
          <span className="font-medium">Share</span>
        </>
      )}
    </button>
  );
}
