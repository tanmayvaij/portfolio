"use client"

import * as React from "react"
import { UploadCloud, X, Loader2 } from "lucide-react"
import { uploadToFirebaseStorage } from "@/lib/firebase-upload"

interface ScreenshotSlotsProps {
  value: string
  onChange: (value: string) => void
  maxSlots?: number
}

export function ScreenshotSlots({
  value,
  onChange,
  maxSlots = 4,
}: ScreenshotSlotsProps) {
  const screenshots = React.useMemo(() => {
    return (value || "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, maxSlots)
  }, [value, maxSlots])

  // Track uploading state per slot index: { [index: number]: number | null }
  const [uploadingState, setUploadingState] = React.useState<Record<number, number | null>>({})
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null)
  const fileInputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const handleUploadFile = async (slotIdx: number, file: File) => {
    if (!file || !file.type.startsWith("image/")) return

    try {
      setUploadingState((prev) => ({ ...prev, [slotIdx]: 5 }))

      const res = await uploadToFirebaseStorage(file, {
        folder: "projects/screenshots",
        onProgress: (p) => setUploadingState((prev) => ({ ...prev, [slotIdx]: p })),
      })

      const updated = [...screenshots]
      updated[slotIdx] = res.url
      onChange(updated.filter(Boolean).join("\n"))
    } catch (err) {
      console.error("Screenshot upload failed:", err)
      alert("Failed to upload screenshot. Please try again.")
    } finally {
      setUploadingState((prev) => {
        const next = { ...prev }
        delete next[slotIdx]
        return next
      })
    }
  }

  const handleRemove = (slotIdx: number) => {
    const updated = [...screenshots]
    updated.splice(slotIdx, 1)
    onChange(updated.filter(Boolean).join("\n"))
  }

  const slots = Array.from({ length: maxSlots }, (_, i) => i)

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs font-semibold text-foreground">
            Project Screenshots (Max {maxSlots})
          </label>
          <p className="text-[11px] text-muted-foreground">
            Drag & drop or click any slot below to upload screenshots (capped to {maxSlots}).
          </p>
        </div>
        <span className="text-[11px] font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/60">
          {screenshots.length} / {maxSlots}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {slots.map((idx) => {
          const url = screenshots[idx]
          const isUploading = uploadingState[idx] !== undefined && uploadingState[idx] !== null
          const progress = uploadingState[idx] ?? 0
          const isDragging = dragOverIndex === idx

          return (
            <div key={idx} className="flex flex-col space-y-1">
              <span className="text-[10px] font-mono uppercase text-muted-foreground px-0.5">
                Screenshot {idx + 1}
              </span>

              {url ? (
                /* Filled Slot: uncropped preview card with remove button */
                <div className="relative rounded-xl border border-border bg-card overflow-hidden aspect-[16/10] sm:aspect-video flex items-center justify-center p-1.5 group shadow-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={url}
                    alt={`Screenshot ${idx + 1}`}
                    className="w-full h-full object-contain block rounded"
                  />

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-black/80 hover:bg-destructive text-white flex items-center justify-center transition-colors shadow-sm"
                    title="Remove screenshot"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>

                  {/* Replace Button on hover */}
                  <button
                    type="button"
                    onClick={() => fileInputRefs.current[idx]?.click()}
                    className="absolute bottom-1.5 right-1.5 text-[10px] bg-black/75 hover:bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Replace
                  </button>
                </div>
              ) : (
                /* Empty Slot: Drop Box */
                <div
                  onClick={() => !isUploading && fileInputRefs.current[idx]?.click()}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setDragOverIndex(idx)
                  }}
                  onDragLeave={() => setDragOverIndex(null)}
                  onDrop={(e) => {
                    e.preventDefault()
                    setDragOverIndex(null)
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleUploadFile(idx, e.dataTransfer.files[0])
                    }
                  }}
                  className={`relative rounded-xl border-2 border-dashed transition-all cursor-pointer aspect-[16/10] sm:aspect-video flex flex-col items-center justify-center p-3 text-center ${
                    isDragging
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/60 hover:bg-muted/30 bg-muted/10"
                  }`}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-1.5">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      <span className="text-[11px] font-medium text-foreground">
                        {progress}%
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="p-2 rounded-full bg-primary/10 text-primary mb-1">
                        <UploadCloud className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-semibold text-foreground">Drop image</span>
                      <span className="text-[10px] text-muted-foreground mt-0.5">or click to upload</span>
                    </>
                  )}
                </div>
              )}

              {/* Hidden file input for this slot */}
              <input
                ref={(el) => {
                  fileInputRefs.current[idx] = el
                }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleUploadFile(idx, e.target.files[0])
                  }
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

