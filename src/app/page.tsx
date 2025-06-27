"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code,
  User,
  MessageSquare,
  Menu,
  X,
  ExternalLink,
  Download,
} from "lucide-react";
import Image from "next/image";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      github: "#",
      demo: "#",
      category: "fullstack",
    },
    {
      title: "Task Management App",
      description: "Collaborative task management with real-time updates",
      tech: ["Next.js", "PostgreSQL", "Socket.io"],
      github: "#",
      demo: "#",
      category: "fullstack",
    },
    {
      title: "Weather Dashboard",
      description: "Beautiful weather app with location-based forecasts",
      tech: ["React", "Weather API", "Chart.js"],
      github: "#",
      demo: "#",
      category: "frontend",
    },
    {
      title: "Portfolio Website",
      description: "Modern responsive portfolio with animations",
      tech: ["React", "Tailwind", "Framer Motion"],
      github: "#",
      demo: "#",
      category: "frontend",
    },
    {
      title: "REST API Server",
      description: "Scalable REST API with authentication and caching",
      tech: ["Node.js", "Express", "Redis", "JWT"],
      github: "#",
      demo: "#",
      category: "backend",
    },
    {
      title: "Chat Application",
      description: "Real-time chat app with file sharing",
      tech: ["Socket.io", "MongoDB", "Express"],
      github: "#",
      demo: "#",
      category: "backend",
    },
    {
      title: "Fitness Tracker",
      description: "Mobile app to track workouts and nutrition",
      tech: ["React Native", "Firebase", "Redux"],
      github: "#",
      demo: "#",
      category: "mobile",
    },
    {
      title: "Expense Manager",
      description: "Cross-platform app for expense tracking",
      tech: ["Flutter", "Dart", "SQLite"],
      github: "#",
      demo: "#",
      category: "mobile",
    },
  ];

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "fullstack", name: "Full Stack" },
    { id: "mobile", name: "Mobile Apps" },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-white">Portfolio</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "skills", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize transition-all duration-300 hover:text-gray-300 ${
                      activeSection === item
                        ? "text-white border-b-2 border-white pb-1"
                        : "text-gray-400"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-950/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["home", "about", "projects", "skills", "contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block px-3 py-2 text-gray-400 hover:text-white capitalize w-full text-left"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gray-950"></div>
        <div
          className={`text-center z-10 px-4 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-8">
            <div className="w-40 h-40 relative rounded-full border-gray-300 mx-auto mb-6 flex items-center justify-center">
              <Image
                className="rounded-full"
                src="/pixar-profile-pic.png"
                fill
                alt="pixar-profile-image"
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Hi, I'm{" "}
            <span className="text-white underline decoration-4 underline-offset-8">
              Tanmay Vaij
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Full Stack Developer & UI/UX Enthusiast
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            I create beautiful, functional web applications that provide
            exceptional user experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 bg-white text-gray-950 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 font-medium"
            >
              View My Work
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-950 transition-all duration-300 flex items-center justify-center gap-2 font-medium">
              <Download size={20} />
              Download CV
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-white" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-full overflow-hidden h-96 relative rounded-2xl border-2 border-gray-700 flex items-center justify-center">
                {/* <User size={120} className="text-white" /> */}
                <Image fill src="/happy-coder.png" alt="happy-coder" />
              </div>
            </div>
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a dedicated cross-platform app developer with a strong
                foundation in React Native and backend engineering. I specialize
                in building scalable mobile and web applications that focus on
                performance, usability, and maintainability.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                With hands-on experience in DevOps tools like Docker, CI/CD
                pipelines, and cloud platforms, I enjoy bridging the gap between
                development and deployment. I thrive on solving real-world
                problems by combining clean architecture with practical
                engineering.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-950 border border-gray-700 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">20+</div>
                  <div className="text-gray-400">Projects Completed</div>
                </div>
                <div className="bg-gray-950 border border-gray-700 rounded-lg p-4">
                  <div className="text-2xl font-bold text-white">5+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Featured Projects
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeCategory === category.id
                    ? "bg-white text-gray-950 border-white"
                    : "bg-transparent text-gray-400 border-gray-600 hover:border-gray-400 hover:text-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-500 transition-all duration-300 group"
              >
                <div className="h-32 bg-gray-800 border-b border-gray-700 flex items-center justify-center">
                  <Code size={24} className="text-white" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs border border-gray-600"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs border border-gray-600">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      <Github size={14} />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      <ExternalLink size={14} />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <Code size={48} className="mx-auto mb-4 opacity-50" />
              <p>No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>
      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Skills & Technologies
          </h2>

          <div className="space-y-4 text-sm text-white">
            {/* Languages */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Languages</h3>
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
                  <span
                    key={skill}
                    className="bg-gray-950 border border-gray-700 px-3 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Frontend */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Frontend</h3>
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
                  <span
                    key={skill}
                    className="bg-gray-950 border border-gray-700 px-3 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "NodeJS",
                  "Express.js",
                  "Strapi",
                  "Flask",
                  "JWT",
                  "Nodemon",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-950 border border-gray-700 px-3 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Databases</h3>
              <div className="flex flex-wrap gap-2">
                {["MongoDB", "MySQL", "Postgres", "SQLite", "Firebase"].map(
                  (skill) => (
                    <span
                      key={skill}
                      className="bg-gray-950 border border-gray-700 px-3 py-1 rounded"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* DevOps & Platforms */}
            <div>
              <h3 className="text-lg font-semibold mb-2">DevOps & Platforms</h3>
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
                  <span
                    key={skill}
                    className="bg-gray-950 border border-gray-700 px-3 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Package Managers */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Tools & Package Managers
              </h3>
              <div className="flex flex-wrap gap-2">
                {["NPM", "Yarn"].map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-950 border border-gray-700 px-3 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Let's Work Together
                </h3>
                <p className="text-gray-300 text-lg">
                  I'm always open to discussing new opportunities and
                  interesting projects. Let's create something amazing together!
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300">
                  <Mail className="text-white" size={20} />
                  <span>tanmay@email.com</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <Phone className="text-white" size={20} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <MapPin className="text-white" size={20} />
                  <span>San Francisco, CA</span>
                </div>
              </div>
              <div className="flex gap-4">
                <a
                  href="https://github.com/tanmayvaij"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 border border-gray-600 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-950 transition-all"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/tanmayvaij/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 border border-gray-600 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-950 transition-all"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:tanmay@email.com"
                  className="w-12 h-12 bg-gray-800 border border-gray-600 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-950 transition-all"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-8">
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <textarea
                    rows="5"
                    placeholder="Your Message"
                    className="w-full px-4 py-3 bg-gray-950 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white resize-none"
                  ></textarea>
                </div>
                <button
                  onClick={() => {
                    // Handle form submission here
                    alert("Message sent! (This is a demo)");
                  }}
                  className="w-full px-8 py-3 bg-white text-gray-950 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2 font-medium"
                >
                  <MessageSquare size={20} />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Tanmay Vaij. Built with Next.js, Tailwind CSS, and shadcn/ui
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
