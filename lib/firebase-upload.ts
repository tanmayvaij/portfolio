import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage, isFirebaseConfigured } from "./firebase"

export type UploadFolder =
  | "blogs/featured"
  | "blogs/content"
  | "projects/featured"
  | "projects/screenshots"
  | "affiliates"
  | "general"

export interface UploadOptions {
  folder?: UploadFolder
  customFileName?: string
  onProgress?: (progress: number) => void
}

export interface UploadResult {
  url: string
  path: string
  fileName: string
}

export async function uploadToFirebaseStorage(
  file: File,
  options: UploadOptions = {}
): Promise<UploadResult> {
  if (!isFirebaseConfigured() || !storage) {
    throw new Error(
      "Firebase Storage is not configured. Please add NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_PROJECT_ID, and NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET to your .env.local file."
    )
  }

  const folder = options.folder || "general"
  const cleanBaseName = file.name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.-]/g, "")
  const timestamp = Date.now()
  const fileName = options.customFileName || `${timestamp}-${cleanBaseName}`
  const storagePath = `${folder}/${fileName}`
  const storageRef = ref(storage, storagePath)

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type || "image/jpeg",
    })

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        if (options.onProgress) {
          options.onProgress(progress)
        }
      },
      (error) => {
        console.error("Firebase Storage Upload Error:", error)
        if (error.code === "storage/unauthorized") {
          reject(
            new Error(
              "Permission denied (storage/unauthorized). Please go to Firebase Console > Storage > Rules and set 'allow read, write: if true;' so uploads are permitted."
            )
          )
        } else if (error.code === "storage/canceled") {
          reject(new Error("Image upload was canceled."))
        } else {
          reject(new Error(error.message || "Failed to upload image to Firebase Storage."))
        }
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
          resolve({
            url: downloadUrl,
            path: storagePath,
            fileName,
          })
        } catch (err: any) {
          reject(new Error(err?.message || "Failed to retrieve public download URL."))
        }
      }
    )
  })
}

