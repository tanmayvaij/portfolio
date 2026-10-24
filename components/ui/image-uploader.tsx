"use client"

import * as React from "react"
import Image from "next/image"
import { UploadCloud, CheckCircle2, AlertCircle, Copy, Check, X, Image as ImageIcon, Loader2 } from "lucide-react"
import { uploadToFirebaseStorage, type UploadFolder } from "@/lib/firebase-upload"
import { isFirebaseConfigured } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ImageUploaderProps {
  label?: string
  description?: string
  value?: string
  onChange: (url: string) => void
  folder?: UploadFolder
  placeholder?: string
  showMarkdownHelper?: boolean
  altTextPlaceholder?: string
  className?: string
}

export function ImageUploader({
  label = "Upload Image",
  description,
  value,
  onChange,
  folder = "general",
  placeholder = "https://firebasestorage.googleapis.com/... or paste image URL",
  showMarkdownHelper = false,
  altTextPlaceholder = "Image description",
  className = "",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const [progress, setProgress] = React.useState<number>(0)
  const [error, setError] = React.useState<string | null>(null)
  const [copied, setCopied] = React.useState(false)
  const [altText, setAltText] = React.useState("")
  const [isDragging, setIsDragging] = React.useState(false)
  const [configured, setConfigured] = React.useState(true)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    setConfigured(isFirebaseConfigured())
  }, [])

  const handleFile = async (file: File) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file (PNG, JPG, WebP, SVG, GIF).")
      return
    }

    // Limit size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      setError("File is too large. Maximum supported image size is 10MB.")
      return
    }

    try {
      setError(null)
      setIsUploading(true)
      setProgress(5)

      const result = await uploadToFirebaseStorage(file, {
        folder,
        onProgress: (p) => setProgress(p),
      })

      onChange(result.url)
      setProgress(100)
    } catch (err: any) {
      setError(err?.message || "Failed to upload image to Firebase Storage.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleCopyMarkdown = () => {
    if (!value) return
    const alt = altText.trim() || altTextPlaceholder
    const markdown = `![${alt}](${value})`
    navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`space-y-2 text-left ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-foreground">{label}</label>
          {!configured && (
            <span className="text-[10px] text-amber-500 font-medium flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Firebase credentials missing
            </span>
          )}
        </div>
      )}

      {description && <p className="text-[11px] text-muted-foreground">{description}</p>}

      {/* Upload Box / Preview */}
      {value ? (
        <div className="relative rounded-xl border border-border bg-card/60 p-3 space-y-3 overflow-hidden">
          {/* Full Image Preview - natural aspect ratio, completely uncropped */}
          <div className="relative w-full overflow-hidden rounded-lg border border-border bg-muted/30 max-h-[440px] flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Uploaded preview"
              className="w-full h-auto max-h-[440px] object-contain block rounded-lg"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/50">
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span>Image stored successfully</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-8 text-xs gap-1.5"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                Replace Image
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-destructive hover:bg-destructive/10 gap-1"
                onClick={() => onChange("")}
              >
                <X className="h-3.5 w-3.5" />
                Remove
              </Button>
            </div>
          </div>

          {/* In-Article Markdown Snippet Generator */}
          {showMarkdownHelper && (
            <div className="pt-2 border-t border-border/60 flex flex-col sm:flex-row gap-2 items-center">
              <Input
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder={altTextPlaceholder}
                className="h-7 text-xs flex-1"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="h-7 text-xs gap-1 shrink-0 w-full sm:w-auto"
                onClick={handleCopyMarkdown}
              >
                {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied Markdown!" : "Copy ![alt](url)"}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`relative rounded-lg border-2 border-dashed transition-all p-5 flex flex-col items-center justify-center text-center cursor-pointer ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/20"
          }`}
        >
          {isUploading ? (
            <div className="space-y-2 w-full max-w-xs flex flex-col items-center py-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[11px] text-muted-foreground">Uploading to Firebase... {progress}%</p>
            </div>
          ) : (
            <>
              <div className="p-2.5 rounded-full bg-primary/10 text-primary mb-2">
                <UploadCloud className="h-5 w-5" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                Click to upload or drag & drop image
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                PNG, JPG, WebP, GIF, or SVG (Up to 10MB)
              </p>
              <p className="text-[10px] text-primary/80 font-mono mt-1">
                Target: {folder}/
              </p>
            </>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0])
          }
        }}
      />

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-destructive bg-destructive/10 p-2 rounded-md">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

