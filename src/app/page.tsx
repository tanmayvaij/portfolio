"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/Header";

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="text-2xl font-bold mb-4 mt-10 border-b pb-2">{title}</h2>
  );
}

const categories = ["frontend", "backend", "fullstack", "android"];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("frontend");

  const filteredProjects =
    projects[selectedCategory as keyof typeof projects] || [];

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <Header />

      <SectionHeading title="About Me" />
      <p className="text-sm leading-relaxed text-muted-foreground">
        I am a passionate full-stack developer with a strong focus on building
        high-performance, scalable, and user-friendly applications. With
        hands-on experience in <strong>React Native</strong> for mobile apps,{" "}
        <strong>Node.js</strong> and <strong>Express</strong> for backend
        services, and containerized DevOps setups using <strong>Docker</strong>,
        I enjoy bridging the gap between clean code and great user experiences.
        <br />
        <br />I am constantly learning and experimenting with new tools — from{" "}
        <strong>Firebase</strong> to <strong>PostgreSQL</strong>, and from{" "}
        <strong>TypeScript</strong> to <strong>Terraform</strong> — to deliver
        better software, faster.
      </p>

      <SectionHeading title="Skills" />

      <div className="space-y-6 text-sm">
        <div>
          <h3 className="font-semibold mb-2">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "C",
              "C++",
              "Dart",
              "HTML5",
              "CSS3",
              "JavaScript",
              "TypeScript",
              "Python",
              "Java",
              "PHP",
              "Markdown",
              "YAML",
            ].map((skill) => (
              <span key={skill} className="bg-muted px-3 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Frontend</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "React Native",
              "Next JS",
              "Angular",
              "Angular.js",
              "Bootstrap",
              "TailwindCSS",
              "Expo",
              "Redux",
              "React Router",
              "React Hook Form",
              "React Query",
              "Vite",
              "Zod",
              "Ionic",
              "Pug",
            ].map((skill) => (
              <span key={skill} className="bg-muted px-3 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Backend</h3>
          <div className="flex flex-wrap gap-2">
            {["NodeJS", "Express.js", "Strapi", "Flask", "JWT", "Nodemon"].map(
              (skill) => (
                <span key={skill} className="bg-muted px-3 py-1 rounded">
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        {/* Databases */}
        <div>
          <h3 className="font-semibold mb-2">Databases</h3>
          <div className="flex flex-wrap gap-2">
            {["MongoDB", "MySQL", "Postgres", "SQLite", "Firebase"].map(
              (skill) => (
                <span key={skill} className="bg-muted px-3 py-1 rounded">
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">DevOps & Platforms</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Docker",
              "Git",
              "GitHub",
              "GitHub Actions",
              "Jenkins",
              "Terraform",
              "Jira",
              "AWS",
              "Firebase",
              "Heroku",
              "Netlify",
              "Vercel",
              "GithubPages",
            ].map((skill) => (
              <span key={skill} className="bg-muted px-3 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Tools & Package Managers</h3>
          <div className="flex flex-wrap gap-2">
            {["NPM", "Yarn"].map((skill) => (
              <span key={skill} className="bg-muted px-3 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <SectionHeading title="Projects" />

      <Tabs
        defaultValue="frontend"
        onValueChange={(val) => setSelectedCategory(val)}
        className="mb-6"
      >
        <TabsList className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat}>
              {cat.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((proj, idx) => (
          <ProjectCard key={idx} {...proj} />
        ))}
      </div>

      <footer className="mt-20 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Tanmay Vaij. All rights reserved.
      </footer>
    </main>
  );
}
