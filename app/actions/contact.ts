"use server"

import { prisma } from "@/lib/prisma"

export interface ContactActionResult {
  success: boolean
  message: string
}

export async function submitContactMessage(formData: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<ContactActionResult> {
  const { name, email, subject, message } = formData

  if (!name || !email || !subject || !message) {
    return { success: false, message: "Please fill out all required fields." }
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      },
    })

    return {
      success: true,
      message: "Thank you! Your message has been saved and forwarded to Tanmay.",
    }
  } catch (error) {
    console.error("Failed to save contact message to database:", error)
    return {
      success: false,
      message: "Failed to send message. Please try again or email directly.",
    }
  }
}

