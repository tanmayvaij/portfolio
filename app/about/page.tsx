import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Briefcase, GraduationCap, CheckCircle2, ArrowRight, Mail, ExternalLink, ArrowUpRight, Layers } from "lucide-react"
import { GithubIcon, LinkedinIcon, YouTubeIcon, InstagramIcon } from "@/components/icons"
import { portfolioData } from "@/lib/data/portfolio"
import { getAboutConfig } from "@/lib/db/about"
import { getAllProjects } from "@/lib/db/projects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AdBanner } from "@/components/adsense/AdBanner"
import { FadeIn, StaggerContainer, StaggerItem, MotionCard } from "@/components/motion"

export const metadata: Metadata = {
  title: "About Tanmay Vaij — Senior Full Stack & Systems Engineer",
  description:
    "Learn about Tanmay Vaij's background, technical skills, career journey, and philosophy on building high-performance distributed systems.",
  alternates: {
    canonical: "https://tanmayvaij.dev/about",
  },
  openGraph: {
    title: "About Tanmay Vaij — Senior Full Stack & Systems Engineer",
    description:
      "Career background, engineering stack, and architectural philosophy of Tanmay Vaij, based in Bengaluru, India.",
    url: "https://tanmayvaij.dev/about",
    siteName: "Tanmay Vaij",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "https://tanmayvaij.dev/og-image.png",
        secureUrl: "https://tanmayvaij.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "About Tanmay Vaij — Senior Full Stack & Systems Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Tanmay Vaij — Senior Full Stack & Systems Engineer",
    description:
      "Career background, engineering stack, and architectural philosophy of Tanmay Vaij.",
    creator: "@tanmayvaij",
    images: ["https://tanmayvaij.dev/og-image.png"],
  },
}

export const instant = false

export default async function AboutPage() {
  const [about, allProjects] = await Promise.all([
    getAboutConfig(),
    getAllProjects(),
  ])

  const projects = allProjects.length > 0 ? allProjects : portfolioData.projects
  const featuredProjects = projects.filter((p) => p.featured)

  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "About Tanmay Vaij",
    url: "https://tanmayvaij.dev/about",
    mainEntity: {
      "@type": "Person",
      name: "Tanmay Vaij",
      url: "https://tanmayvaij.dev",
      jobTitle: about.subheadline,
      address: {
        "@type": "PostalAddress",
        addressLocality: about.location,
        addressCountry: "India",
      },
      sameAs: [
        about.linkedinUrl,
        about.githubUrl,
        "https://twitter.com/tanmayvaij",
        "https://www.youtube.com/channel/UC6y7NAEEm-U97DLfHc__l9w",
        "https://www.instagram.com/tony.man.22/",
      ].filter(Boolean),
      alumniOf: "Computer Science & Engineering",
      knowsAbout: [
        "Next.js App Router",
        "React",
        "TypeScript",
        "Distributed Systems",
        "Cloud Architecture",
        "Autonomous AI Agents",
        "Prisma ORM",
        "PostgreSQL",
      ],
    },
  }

  const experiencesList = about.experiences && about.experiences.length > 0 
    ? about.experiences 
    : portfolioData.experiences

  const skillsList = about.skills && about.skills.length > 0
    ? about.skills
    : portfolioData.skills

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      {/* Bio / Intro */}
      <section className="space-y-6">
        <FadeIn direction="up">
          <Badge variant="outline">About Me</Badge>
        </FadeIn>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 items-start">
          <FadeIn direction="up" delay={0.08} className="md:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-2">
              <Image
                src="/profile.png"
                alt="Tanmay Vaij"
                width={80}
                height={80}
                style={{ width: "auto", height: "auto" }}
                className="h-20 w-20 rounded-2xl object-cover border-2 border-primary/20 shadow-md ring-4 ring-primary/5 shrink-0"
                priority
              />
              <div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                  {about.headline}
                </h1>
                <p className="text-sm text-primary font-medium mt-0.5">
                  {about.subheadline}
                </p>
              </div>
            </div>
            <p className="text-lg text-foreground/90 font-medium leading-relaxed">
              {about.bioIntro}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {about.bioParagraph1}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {about.bioParagraph2}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button asChild size="sm">
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
              {about.email && (
                <Button asChild variant="outline" size="sm">
                  <a href={`mailto:${about.email}`}>
                    <Mail className="mr-1.5 h-3.5 w-3.5" />
                    Email
                  </a>
                </Button>
              )}
              {about.githubUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={about.githubUrl} target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="mr-1.5 h-3.5 w-3.5" />
                    GitHub
                  </a>
                </Button>
              )}
              {about.linkedinUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={about.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon className="mr-1.5 h-3.5 w-3.5" />
                    Connect on LinkedIn
                  </a>
                </Button>
              )}
              <Button asChild variant="outline" size="sm" className="hover:text-red-500 hover:border-red-500/40">
                <a
                  href="https://www.youtube.com/channel/UC6y7NAEEm-U97DLfHc__l9w"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YouTubeIcon className="mr-1.5 h-3.5 w-3.5 text-red-500" />
                  YouTube Shorts
                </a>
              </Button>
              <Button asChild variant="outline" size="sm" className="hover:text-pink-500 hover:border-pink-500/40">
                <a
                  href="https://www.instagram.com/tony.man.22/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon className="mr-1.5 h-3.5 w-3.5 text-pink-500" />
                  Instagram
                </a>
              </Button>
            </div>
          </FadeIn>

          {/* Quick Stats Card */}
          <FadeIn direction="left" delay={0.16} className="w-full">
            <MotionCard hoverY={-3} className="rounded-lg border border-border bg-card p-6 shadow-xs space-y-4">
              <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">
                Quick Facts
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium text-foreground">{about.location}</span>
                </div>
                {about.email && (
                  <div className="flex justify-between border-b border-border/50 pb-2 items-center gap-2">
                    <span className="text-muted-foreground">Email</span>
                    <a
                      href={`mailto:${about.email}`}
                      className="font-medium text-primary hover:underline truncate transition-colors text-right"
                    >
                      {about.email}
                    </a>
                  </div>
                )}
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Specialization</span>
                  <span className="font-medium text-foreground">{about.specialization}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">{about.status}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium text-foreground">{about.experienceYears}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Languages</span>
                  <span className="font-medium text-foreground">{about.languages}</span>
                </div>
              </div>
            </MotionCard>
          </FadeIn>
        </div>
      </section>

      {/* Ad Unit */}
      <FadeIn delay={0.2} className="my-10">
        <AdBanner slot="5000000001" format="horizontal" label="Advertisement" />
      </FadeIn>

      {/* Work Experience Timeline */}
      <section className="mt-14 space-y-6">
        <FadeIn direction="up" className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Professional Experience
          </h2>
        </FadeIn>

        <StaggerContainer staggerDelay={0.12} className="relative border-l border-border/80 pl-6 ml-4 sm:ml-6 space-y-10">
          {experiencesList.map((exp, idx) => (
            <StaggerItem key={idx} className="relative group">
              <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-primary transition-transform group-hover:scale-125" />

              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {exp.role} <span className="text-primary font-normal">@ {exp.company}</span>
                  </h3>
                  <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground font-medium">
                  {exp.location}
                </p>

                <p className="text-sm text-foreground/80 leading-relaxed pt-1">
                  {exp.description}
                </p>

                <ul className="space-y-1.5 pt-2">
                  {exp.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-[10px]">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="mt-16 space-y-6">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <Badge variant="outline" className="mb-2">Portfolio</Badge>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Featured Engineering Work
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Production architectures, developer frameworks, and open-source contributions.
                </p>
              </div>
              <Button asChild variant="ghost" size="sm" className="self-start sm:self-auto">
                <Link href="/projects" className="gap-1">
                  View All Projects
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-start">
            {featuredProjects.map((project) => {
              const projectHref = `/projects/${project.slug || project.id}`
              return (
                <StaggerItem key={project.id} className="group flex flex-col">
                  {/* Visual Pin Card */}
                  <div className="relative w-full overflow-hidden rounded-2xl bg-muted/60 border border-border/60 shadow-xs group-hover:shadow-xl group-hover:border-primary/40 transition-all duration-300">
                    {/* Background Clickable Link to Case Study */}
                    <Link
                      href={projectHref}
                      className="block w-full"
                      aria-label={project.title}
                    >
                      {project.featuredImage ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={project.featuredImage}
                          alt={project.title}
                          className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      ) : (
                        /* Fallback aesthetic gradient pin when no image is uploaded */
                        <div className="aspect-[16/10] w-full flex flex-col justify-between p-6 bg-gradient-to-br from-card via-muted/40 to-muted/80 relative overflow-hidden">
                          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-background/80 px-2 py-0.5 rounded-md border border-border/50">
                              {project.category}
                            </span>
                            <Layers className="h-5 w-5 text-muted-foreground/60" />
                          </div>
                          <div>
                            <span className="text-base font-bold tracking-tight text-foreground/90 line-clamp-2">
                              {project.title}
                            </span>
                            <span className="text-[11px] text-muted-foreground font-mono mt-1 block">
                              Click to explore case study
                            </span>
                          </div>
                        </div>
                      )}
                    </Link>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10 pointer-events-none">
                      {/* Top Badges & External Actions */}
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white shadow-xs">
                          {project.category}
                        </span>

                        <div className="flex items-center gap-1.5 pointer-events-auto">
                          {project.showGithub !== false && project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center shadow-xs"
                              title="GitHub Repository"
                            >
                              <GithubIcon className="h-3.5 w-3.5" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-white hover:text-black transition-colors flex items-center justify-center shadow-xs"
                              title="Live Platform"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Bottom Action Pill */}
                      <div className="flex items-center justify-between pointer-events-auto">
                        {project.metrics ? (
                          <span className="text-[11px] font-semibold text-emerald-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
                            {project.metrics}
                          </span>
                        ) : (
                          <div />
                        )}

                        <Link
                          href={projectHref}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-md transition-transform duration-200 hover:scale-105"
                        >
                          Case Study
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Caption */}
                  <div className="pt-2.5 pb-1 px-1 space-y-0.5">
                    <Link href={projectHref} className="block">
                      <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{project.category}</span>
                      {project.metrics && (
                        <span className="font-medium text-emerald-600 dark:text-emerald-400">
                          {project.metrics}
                        </span>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </section>
      )}

      {/* Skills Matrix */}
      <section className="mt-16 space-y-6">
        <FadeIn direction="up">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Core Technical Skills
          </h2>
        </FadeIn>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {skillsList.map((cat, idx) => (
            <StaggerItem key={idx} className="h-full">
              <MotionCard hoverY={-3} className="h-full flex flex-col bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{cat.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 flex-1">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center justify-between text-xs">
                      <span className="text-foreground/90 font-medium">{skill.name}</span>
                      <Badge variant="outline" className="text-[10px] text-muted-foreground">
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Education & Certifications */}
      <section className="mt-16 space-y-6">
        <FadeIn direction="up" className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Education & Certifications
          </h2>
        </FadeIn>

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StaggerItem className="h-full">
            <MotionCard hoverY={-3} className="h-full flex flex-col justify-between bg-card">
              <CardHeader className="h-full flex flex-col justify-between">
                <div>
                  <Badge variant="outline" className="w-fit text-[10px] mb-1">
                    {about.degreePeriod}
                  </Badge>
                  <CardTitle className="text-base">{about.degreeTitle}</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    {about.degreeDesc}
                  </CardDescription>
                </div>
              </CardHeader>
            </MotionCard>
          </StaggerItem>

          <StaggerItem className="h-full">
            <MotionCard hoverY={-3} className="h-full flex flex-col justify-between bg-card">
              <CardHeader className="h-full flex flex-col justify-between">
                <div>
                  <Badge variant="secondary" className="w-fit text-[10px] mb-1 text-emerald-600 dark:text-emerald-400">
                    {about.certBadge}
                  </Badge>
                  <CardTitle className="text-base">{about.certTitle}</CardTitle>
                  <CardDescription className="text-xs mt-1">
                    {about.certDesc}
                  </CardDescription>
                </div>
              </CardHeader>
            </MotionCard>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Bottom Ad Unit */}
      <FadeIn delay={0.15} className="mt-12">
        <AdBanner slot="5000000002" format="horizontal" label="Advertisement" />
      </FadeIn>
    </main>
  )
}
