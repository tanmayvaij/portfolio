/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const initialAffiliates = [
  // Amazon Products - Desk Setup & Ergonomics
  {
    slug: "keychron-q1-pro",
    name: "Keychron Q1 Pro Wireless Mechanical Keyboard",
    category: "Desk Setup & Ergonomics",
    description: "Full CNC aluminum body, hot-swappable switches, double-gasket acoustic dampening, and Bluetooth 5.1/Type-C. My daily keyboard for long coding and writing sessions.",
    badge: "Daily Driver",
    affiliateUrl: "https://www.amazon.com/dp/B0BY2H3K57?tag=tanmayvaij-20",
    discountCode: null,
    price: "$199.00",
    rating: 4.8,
    merchant: "Amazon",
    featured: true,
  },
  {
    slug: "dell-ultrasharp-32-4k",
    name: "Dell UltraSharp 32-inch 4K USB-C Hub Monitor (U3223QE)",
    category: "Desk Setup & Ergonomics",
    description: "IPS Black technology delivering a 2000:1 contrast ratio, 90W single-cable USB-C charging, and daisy-chaining. Incredible color accuracy and minimal eye strain.",
    badge: "Amazon's Choice",
    affiliateUrl: "https://www.amazon.com/dp/B09TQZP9CL?tag=tanmayvaij-20",
    discountCode: null,
    price: "$689.99",
    rating: 4.7,
    merchant: "Amazon",
    featured: true,
  },
  {
    slug: "benq-screenbar-halo",
    name: "BenQ ScreenBar Halo LED Monitor Light",
    category: "Desk Setup & Ergonomics",
    description: "Asymmetrical optical design that illuminates the workspace without any screen reflection. Includes wireless rotary control dial and ambient backlighting.",
    badge: "Essential Gear",
    affiliateUrl: "https://www.amazon.com/dp/B08WT889V3?tag=tanmayvaij-20",
    discountCode: null,
    price: "$179.00",
    rating: 4.8,
    merchant: "Amazon",
    featured: true,
  },
  {
    slug: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S Ergonomic Mouse",
    category: "Desk Setup & Ergonomics",
    description: "Quiet-click switches, 8K DPI sensor that tracks on glass, and the electromagnetic MagSpeed wheel for hyper-fast scrolling through codebases and docs.",
    badge: "Top Rated",
    affiliateUrl: "https://www.amazon.com/dp/B09HM94VDS?tag=tanmayvaij-20",
    discountCode: null,
    price: "$99.99",
    rating: 4.8,
    merchant: "Amazon",
    featured: true,
  },

  // Amazon Products - Audio & Tech Gadgets
  {
    slug: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5 Noise Canceling Headphones",
    category: "Audio & Tech Gadgets",
    description: "Industry-leading active noise cancellation powered by two processors and eight microphones. Lightweight design with 30-hour battery life for deep work focus.",
    badge: "Best for Focus",
    affiliateUrl: "https://www.amazon.com/dp/B09XS7JWHH?tag=tanmayvaij-20",
    discountCode: null,
    price: "$398.00",
    rating: 4.7,
    merchant: "Amazon",
    featured: true,
  },
  {
    slug: "shure-mv7-plus",
    name: "Shure MV7+ Podcast & Streaming Microphone",
    category: "Audio & Tech Gadgets",
    description: "Broadcast-quality hybrid USB/XLR dynamic microphone with onboard DSP, auto-level mode, and digital pop filter. Crystal-clear voice for meetings and recordings.",
    badge: "Creator Pick",
    affiliateUrl: "https://www.amazon.com/dp/B0CW1B9Y28?tag=tanmayvaij-20",
    discountCode: null,
    price: "$279.00",
    rating: 4.9,
    merchant: "Amazon",
    featured: false,
  },
  {
    slug: "anker-prime-20000mah",
    name: "Anker Prime 20,000mAh 200W Power Bank",
    category: "Audio & Tech Gadgets",
    description: "Ultra-compact high-capacity portable battery capable of full-speed 100W laptop fast charging and powering phone and accessories simultaneously.",
    badge: "Travel EDC",
    affiliateUrl: "https://www.amazon.com/dp/B0BYP2F3SG?tag=tanmayvaij-20",
    discountCode: null,
    price: "$129.99",
    rating: 4.7,
    merchant: "Amazon",
    featured: false,
  },

  // Amazon Products - Books & Essential Reading
  {
    slug: "designing-data-intensive-applications",
    name: "Designing Data-Intensive Applications",
    category: "Books & Reading",
    description: "By Martin Kleppmann. The definitive guide to distributed architectures, storage engines, replication strategies, and fault-tolerant system design.",
    badge: "Must-Read Classic",
    affiliateUrl: "https://www.amazon.com/dp/1449373321?tag=tanmayvaij-20",
    discountCode: null,
    price: "$42.99",
    rating: 4.9,
    merchant: "Amazon",
    featured: true,
  },
  {
    slug: "deep-work-cal-newport",
    name: "Deep Work: Rules for Focused Success",
    category: "Books & Reading",
    description: "By Cal Newport. A tactical guide on cultivating extreme cognitive focus, eliminating digital noise, and generating high-value output in a distracted world.",
    badge: "Productivity Bible",
    affiliateUrl: "https://www.amazon.com/dp/1455586692?tag=tanmayvaij-20",
    discountCode: null,
    price: "$18.99",
    rating: 4.8,
    merchant: "Amazon",
    featured: false,
  },
  {
    slug: "atomic-habits-james-clear",
    name: "Atomic Habits",
    category: "Books & Reading",
    description: "By James Clear. Proven framework for compounding small daily improvements, overcoming inertia, and designing personal systems that stick.",
    badge: "Bestseller",
    affiliateUrl: "https://www.amazon.com/dp/0735211299?tag=tanmayvaij-20",
    discountCode: null,
    price: "$15.99",
    rating: 4.8,
    merchant: "Amazon",
    featured: false,
  },

  // Developer Software & Cloud
  {
    slug: "digitalocean",
    name: "DigitalOcean Cloud",
    category: "Cloud & Developer Tools",
    description: "Reliable developer cloud with simple Droplets, managed Kubernetes, and fast SSDs. Perfect for hosting backend APIs and microservices.",
    badge: "$200 60-Day Free Credit",
    affiliateUrl: "https://m.do.co/c/your-affiliate-id",
    discountCode: "WELCOME200",
    price: "Free $200 Credit",
    rating: 4.7,
    merchant: "DigitalOcean",
    featured: true,
  },
  {
    slug: "neon-postgres",
    name: "Neon Serverless Postgres",
    category: "Cloud & Developer Tools",
    description: "Serverless Postgres with instant branching, bottomless storage, and zero-scale idle. Native connection pooling built for Next.js App Router.",
    badge: "Free Tier Available",
    affiliateUrl: "https://neon.tech/?ref=your-affiliate-id",
    discountCode: null,
    price: "Free Tier",
    rating: 4.9,
    merchant: "Neon",
    featured: true,
  },
  {
    slug: "cursor-editor",
    name: "Cursor AI Code Editor",
    category: "Cloud & Developer Tools",
    description: "An AI-powered fork of VS Code with multi-file codebase indexing, intelligent edit prediction, and frontier model chat integration.",
    badge: "14-Day Free Pro Trial",
    affiliateUrl: "https://cursor.com/?ref=your-affiliate-id",
    discountCode: null,
    price: "Free / $20/mo",
    rating: 4.9,
    merchant: "Cursor",
    featured: true,
  },
]

async function main() {
  console.log("Seeding affiliate tools and Amazon gear...")
  for (const tool of initialAffiliates) {
    await prisma.affiliateTool.upsert({
      where: { slug: tool.slug },
      update: {
        name: tool.name,
        category: tool.category,
        description: tool.description,
        badge: tool.badge,
        affiliateUrl: tool.affiliateUrl,
        discountCode: tool.discountCode,
        price: tool.price,
        rating: tool.rating,
        merchant: tool.merchant,
        featured: tool.featured,
      },
      create: {
        slug: tool.slug,
        name: tool.name,
        category: tool.category,
        description: tool.description,
        badge: tool.badge,
        affiliateUrl: tool.affiliateUrl,
        discountCode: tool.discountCode,
        price: tool.price,
        rating: tool.rating,
        merchant: tool.merchant,
        featured: tool.featured,
      },
    })
  }
  console.log(`Successfully seeded ${initialAffiliates.length} affiliate items!`)

  // Seed Professional Experiences
  const initialExperiences = [
    {
      role: "Software Developer",
      company: "IntellAxis AI",
      location: "Pune District, Maharashtra, India · Hybrid",
      period: "Jul 2025 - Present",
      description: "Building production-grade full-stack systems, Legal AI automation workflows, and cloud infrastructure across AWS and GCP.",
      achievements: JSON.stringify([
        "Developed and deployed the company’s official website intellaxisai.com, ensuring a modern, responsive, and production-ready frontend.",
        "Contributed to a Legal AI platform, building core modules and integrating intelligent workflows for legal automation use cases.",
        "Designed and implemented an eSign & eStamping platform using Zoho APIs, enabling secure document signing and compliance processes.",
        "Built scalable mental health platform, delivering both frontend and backend components from scratch.",
        "Developed an MVP for Conference, focusing on rapid delivery, usability, and scalable architecture.",
        "Built full-stack systems using React.js frameworks on the frontend and FastAPI for backend services.",
        "Integrated and managed cloud infrastructure using services across AWS and Google Cloud Platform (GCP) for deployment, storage, and scalability.",
        "Collaborated with cross-functional teams to deliver high-impact, real-world products under tight deadlines.",
      ]),
      skills: "Next.js, React.js, FastAPI, Python, AWS, GCP, Zoho APIs",
      order: 1,
    },
    {
      role: "Full Stack Developer",
      company: "My Legacy Box (Formerly Oiconomos)",
      location: "Bhubaneshwar, Odisha, India · Remote",
      period: "Jun 2023 - May 2025",
      description: "Engineered cross-platform mobile applications with React Native and SEO-optimized web interfaces using Next.js and Firebase.",
      achievements: JSON.stringify([
        "Led the development of a cross-platform mobile application using React Native, successfully published on the Google Play Store.",
        "Built responsive and SEO-optimized web interfaces using Next.js, improving accessibility and overall user experience.",
        "Developed backend services and application logic using Node.js, Firebase, and REST APIs to support core platform workflows.",
        "Collaborated with the team on feature planning, UI improvements, debugging, and production enhancements.",
        "Delivered multiple proof-of-concepts and scalable modules to accelerate product development in an early-stage startup environment.",
        "Gained hands-on experience working across the full software lifecycle — from development to deployment.",
      ]),
      skills: "React Native, Next.js, Node.js, Firebase, Docker, REST APIs",
      order: 2,
    },
    {
      role: "Full Stack Developer",
      company: "SystemOnSilicon",
      location: "Austin, Texas, United States · Remote",
      period: "Jan 2023 - Jun 2023",
      description: "Developed cross-platform mobile and web applications with Angular/Ionic and constructed scalable REST APIs using LoopBack and Node.js.",
      achievements: JSON.stringify([
        "Contributed to the development of cross-platform applications using Angular and Ionic, delivering responsive and user-friendly interfaces.",
        "Built backend services and REST APIs using the LoopBack framework, supporting scalable application workflows.",
        "Integrated frontend and backend components to ensure smooth data flow and reliable functionality.",
        "Assisted in debugging, optimizing performance, and improving overall application stability.",
        "Collaborated with the development team to deliver project modules within defined timelines.",
      ]),
      skills: "Angular, Ionic, Node.js, Express.js, LoopBack, REST APIs",
      order: 3,
    },
  ]

  // Seed About Page Configuration
  await prisma.aboutConfig.upsert({
    where: { id: "default" },
    update: {
      name: "Tanmay Vaij",
      headline: "Hi, I'm Tanmay Vaij.",
      subheadline: "Senior Full Stack & Distributed Systems Engineer · Bengaluru",
      bioIntro: "I am a Senior Software Engineer with a passion for designing scalable web architectures, bulletproof APIs, and autonomous AI agents.",
      bioParagraph1: "Over the past 6+ years, I have worked across the stack from low-latency Go and Node.js microservices to modern React and Next.js frontends. I believe that engineering excellence is about crafting systems that are observable, easy to maintain, and performant by default.",
      bioParagraph2: "When I'm not architecting cloud infrastructure or profiling database transactions, I write deep technical field guides on my blog and contribute to open-source developer tooling.",
      location: "Bengaluru, India",
      email: "tanmayvaij22@gmail.com",
      websiteUrl: "https://tanmayvaij.dev",
      address: "Bengaluru, Karnataka, India",
      contactHeading: "Let's Discuss Your Architecture",
      contactDescription:
        "Whether you have a technical question about an article, want to collaborate on open-source, or need senior systems expertise, my inbox is open.",
      contactTitle: "Contact Information",
      contactSubtitle: "Reach out directly for freelance contracts, consulting, or technical inquiries.",
      responseTime: "Typically within 24 business hours",
      specialization: "Distributed Systems & Next.js",
      status: "Available",
      experienceYears: "6+ Years",
      languages: "TypeScript, Go, Python, SQL",
      githubUrl: "https://github.com/tanmayvaij",
      linkedinUrl: "https://www.linkedin.com/in/tanmayvaij/",
      degreeTitle: "Bachelor of Technology in Computer Science",
      degreePeriod: "2015 - 2019",
      degreeDesc: "First Class with Distinction · Systems & Algorithms Specialization",
      certTitle: "AWS Certified Solutions Architect",
      certBadge: "Certified",
      certDesc: "Amazon Web Services · Distributed Cloud Architecture & Resilience",
      experiencesJson: JSON.stringify(initialExperiences, null, 2),
    },
    create: {
      id: "default",
      name: "Tanmay Vaij",
      headline: "Hi, I'm Tanmay Vaij.",
      subheadline: "Senior Full Stack & Distributed Systems Engineer · Bengaluru",
      bioIntro: "I am a Senior Software Engineer with a passion for designing scalable web architectures, bulletproof APIs, and autonomous AI agents.",
      bioParagraph1: "Over the past 6+ years, I have worked across the stack from low-latency Go and Node.js microservices to modern React and Next.js frontends. I believe that engineering excellence is about crafting systems that are observable, easy to maintain, and performant by default.",
      bioParagraph2: "When I'm not architecting cloud infrastructure or profiling database transactions, I write deep technical field guides on my blog and contribute to open-source developer tooling.",
      location: "Bengaluru, India",
      email: "tanmayvaij22@gmail.com",
      websiteUrl: "https://tanmayvaij.dev",
      address: "Bengaluru, Karnataka, India",
      contactHeading: "Let's Discuss Your Architecture",
      contactDescription:
        "Whether you have a technical question about an article, want to collaborate on open-source, or need senior systems expertise, my inbox is open.",
      contactTitle: "Contact Information",
      contactSubtitle: "Reach out directly for freelance contracts, consulting, or technical inquiries.",
      responseTime: "Typically within 24 business hours",
      specialization: "Distributed Systems & Next.js",
      status: "Available",
      experienceYears: "6+ Years",
      languages: "TypeScript, Go, Python, SQL",
      githubUrl: "https://github.com/tanmayvaij",
      linkedinUrl: "https://www.linkedin.com/in/tanmayvaij/",
      degreeTitle: "Bachelor of Technology in Computer Science",
      degreePeriod: "2015 - 2019",
      degreeDesc: "First Class with Distinction · Systems & Algorithms Specialization",
      certTitle: "AWS Certified Solutions Architect",
      certBadge: "Certified",
      certDesc: "Amazon Web Services · Distributed Cloud Architecture & Resilience",
      experiencesJson: JSON.stringify(initialExperiences, null, 2),
    },
  })
  console.log("Successfully seeded About Page configuration with experiencesJson!")

  // Clear existing experiences and seed fresh
  await prisma.experience.deleteMany()
  for (const exp of initialExperiences) {
    await prisma.experience.create({
      data: exp,
    })
  }
  console.log(`Successfully seeded ${initialExperiences.length} professional experience timeline records!`)

  // Seed Core Technical Skills Matrix
  const initialSkillCategories = [
    {
      category: "Frontend & UI",
      skills: JSON.stringify([
        { name: "React 19 & Next.js (App Router)", level: "Expert" },
        { name: "TypeScript", level: "Expert" },
        { name: "Tailwind CSS v4 & shadcn/ui", level: "Expert" },
        { name: "State Machines & TanStack Query", level: "Advanced" },
        { name: "Web Vitals & Performance Tuning", level: "Expert" },
      ]),
      order: 1,
    },
    {
      category: "Backend & Systems",
      skills: JSON.stringify([
        { name: "Node.js & Bun", level: "Expert" },
        { name: "Go & Python", level: "Advanced" },
        { name: "PostgreSQL & Prisma / Drizzle", level: "Expert" },
        { name: "Redis & Distributed Caching", level: "Advanced" },
        { name: "REST, GraphQL & gRPC", level: "Advanced" },
      ]),
      order: 2,
    },
    {
      category: "Cloud & DevOps",
      skills: JSON.stringify([
        { name: "Docker & Kubernetes", level: "Advanced" },
        { name: "AWS (ECS, Lambda, S3, CloudFront)", level: "Advanced" },
        { name: "CI/CD (GitHub Actions)", level: "Expert" },
        { name: "Terraform & IaC", level: "Proficient" },
        { name: "Monitoring (Prometheus & OpenTelemetry)", level: "Advanced" },
      ]),
      order: 3,
    },
    {
      category: "AI & Data Engineering",
      skills: JSON.stringify([
        { name: "LangChain & LlamaIndex", level: "Advanced" },
        { name: "Vector Databases (pgvector, Pinecone)", level: "Advanced" },
        { name: "Agentic Tool Calling & Function Execution", level: "Expert" },
        { name: "Local Models (Ollama, vLLM)", level: "Proficient" },
      ]),
      order: 4,
    },
  ]

  await prisma.skillCategory.deleteMany()
  for (const cat of initialSkillCategories) {
    await prisma.skillCategory.create({
      data: cat,
    })
  }
  console.log(`Successfully seeded ${initialSkillCategories.length} core technical skill categories!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
