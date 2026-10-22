import type { Metadata } from "next"
import { verifyAdminAuth, getAdminData } from "@/app/actions/admin"
import { AdminLoginWrapper } from "./login-wrapper"
import { AdminDashboard } from "./admin-dashboard"

export const metadata: Metadata = {
  title: "Admin Portal | Tanmay Vaij Portfolio",
  description: "Administrative console for managing blog publications, portfolio projects, and user inquiries.",
  robots: {
    index: false,
    follow: false,
  },
}

export const instant = false

export default async function AdminPage() {
  const isAuth = await verifyAdminAuth()

  if (!isAuth) {
    return <AdminLoginWrapper />
  }

  const data = await getAdminData()

  if (!data) {
    return <AdminLoginWrapper />
  }

  return (
    <AdminDashboard
      initialPosts={data.posts}
      initialProjects={data.projects}
      initialMessages={data.messages}
      initialAffiliates={data.affiliates}
      initialAbout={data.about}
      initialExperiences={data.experiences}
      initialSkillCategories={data.skillCategories}
    />
  )
}
