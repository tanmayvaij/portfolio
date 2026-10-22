"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { AdminLogin } from "./admin-login"

export function AdminLoginWrapper() {
  const router = useRouter()

  const handleLoginSuccess = () => {
    router.refresh()
  }

  return <AdminLogin onLoginSuccess={handleLoginSuccess} />
}

