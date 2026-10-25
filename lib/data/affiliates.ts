export interface AffiliateToolItem {
  id: string
  slug: string
  name: string
  category: string
  description: string
  badge: string | null
  affiliateUrl: string
  discountCode: string | null
  price: string | null
  rating: number | null
  imageUrl: string | null
  merchant: string
  featured: boolean
  clicks: number
  detailedReview?: string
  highlights?: string[]
}

export const fallbackAffiliates: AffiliateToolItem[] = [
  // Developer Software & Cloud
  {
    id: "aff-digitalocean",
    slug: "digitalocean",
    name: "DigitalOcean Cloud",
    category: "Cloud & Developer Tools",
    description:
      "Reliable developer cloud with simple Droplets, managed Kubernetes, and fast SSDs. Perfect for hosting backend APIs and microservices.",
    badge: "$200 60-Day Free Credit",
    affiliateUrl: "https://m.do.co/c/your-affiliate-id",
    discountCode: "WELCOME200",
    price: "Free $200 Credit",
    rating: 4.7,
    imageUrl: null,
    merchant: "DigitalOcean",
    featured: true,
    clicks: 0,
    detailedReview:
      "DigitalOcean has been my go-to cloud platform for launching production Docker containers, microservices, and client side projects that demand rock-solid uptime without AWS complexity. Their predictable billing, global data centers, and 1-click Kubernetes clusters make deploying high-throughput backends effortless.",
    highlights: [
      "Simple Droplets with high-performance NVMe SSDs",
      "Managed PostgreSQL, MySQL, and Redis databases",
      "App Platform for automatic Git push deployments",
      "$200 60-day credit for new accounts to build and test",
    ],
  },
  {
    id: "aff-neon-postgres",
    slug: "neon-postgres",
    name: "Neon Serverless Postgres",
    category: "Cloud & Developer Tools",
    description:
      "Serverless Postgres with instant branching, bottomless storage, and zero-scale idle. Native connection pooling built for Next.js App Router.",
    badge: "Free Tier Available",
    affiliateUrl: "https://neon.tech/?ref=your-affiliate-id",
    discountCode: null,
    price: "Free Tier",
    rating: 4.9,
    imageUrl: null,
    merchant: "Neon",
    featured: true,
    clicks: 0,
    detailedReview:
      "Neon revolutionizes relational database workflows for modern full-stack web applications. By separating compute from storage, you get instant database branching in seconds for preview environments, zero-cost scale-to-zero when staging apps are idle, and connection pooling that prevents pool exhaustion on serverless functions.",
    highlights: [
      "Instant copy-on-write branching for preview deployments",
      "Built-in connection pooler for serverless & Next.js",
      "Automatic scaling with zero-scale idle savings",
      "Full PostgreSQL compatibility with pgvector extension",
    ],
  },
  {
    id: "aff-cursor-editor",
    slug: "cursor-editor",
    name: "Cursor AI Code Editor",
    category: "Cloud & Developer Tools",
    description:
      "An AI-powered fork of VS Code with multi-file codebase indexing, intelligent edit prediction, and frontier model chat integration.",
    badge: "14-Day Free Pro Trial",
    affiliateUrl: "https://cursor.com/?ref=your-affiliate-id",
    discountCode: null,
    price: "Free / $20/mo",
    rating: 4.9,
    imageUrl: null,
    merchant: "Cursor",
    featured: true,
    clicks: 0,
    detailedReview:
      "Cursor is easily the most impactful developer tooling upgrade in recent years. By indexing your entire git repository locally, it understands cross-file dependencies, architectural patterns, and imports with zero hallucinations, turning complex refactors and boilerplate implementation into seconds of review.",
    highlights: [
      "Full repository semantic codebase indexing",
      "Multi-line Copilot++ next-edit suggestion engine",
      "Chat with terminal output, documentation, and web docs",
      "100% native VS Code extension and keybinding compatibility",
    ],
  },
  {
    id: "aff-upstash-redis",
    slug: "upstash-redis",
    name: "Upstash Serverless Redis & Kafka",
    category: "Databases & Storage",
    description:
      "Low-latency REST/HTTP-based Redis and QStash engineered specifically for Vercel, Next.js Server Components, and edge runtimes.",
    badge: "10,000 Free Commands/Day",
    affiliateUrl: "https://upstash.com/?ref=tanmayvaij",
    discountCode: null,
    price: "10,000 Free Commands/Day",
    rating: 4.8,
    imageUrl: null,
    merchant: "Upstash",
    featured: true,
    clicks: 0,
    detailedReview:
      "Traditional TCP Redis connections break in serverless edge runtimes like Cloudflare Workers and Vercel Edge. Upstash solves this with a lightweight HTTP/REST client, enabling sub-millisecond key-value caching, rate limiting, and background queue scheduling with zero connection pool overhead.",
    highlights: [
      "HTTP/REST API designed specifically for Serverless & Edge",
      "QStash for durable serverless background message queues",
      "Pay-per-request pricing with generous daily free tier",
      "Global multi-region replication for ultra-low latency",
    ],
  },

  // Desk Setup & Ergonomics
  {
    id: "aff-keychron-q1-pro",
    slug: "keychron-q1-pro",
    name: "Keychron Q1 Pro Wireless Mechanical Keyboard",
    category: "Desk Setup & Ergonomics",
    description:
      "Full CNC aluminum body, hot-swappable switches, double-gasket acoustic dampening, and Bluetooth 5.1/Type-C. My daily keyboard for long coding and writing sessions.",
    badge: "Daily Driver",
    affiliateUrl: "https://www.amazon.com/dp/B0BY2H3K57?tag=tanmayvaij-20",
    discountCode: null,
    price: "$199.00",
    rating: 4.8,
    imageUrl: null,
    merchant: "Amazon",
    featured: true,
    clicks: 0,
    detailedReview:
      "The Keychron Q1 Pro is the gold standard for tactile productivity. The heavy aluminum chassis eliminates desk rattle, while the double-gasket acoustic isolation makes typing feel cushioned and effortless during 10-hour engineering sessions. Being able to toggle between Bluetooth for MacBook and wired for PC is seamless.",
    highlights: [
      "Precision CNC machined aluminum body",
      "Double-gasket mount design with sound absorbing foam",
      "QMK/VIA programmable key mappings and macros",
      "Seamless Mac and Windows layout toggle",
    ],
  },
  {
    id: "aff-dell-ultrasharp-32-4k",
    slug: "dell-ultrasharp-32-4k",
    name: "Dell UltraSharp 32-inch 4K USB-C Hub Monitor (U3223QE)",
    category: "Desk Setup & Ergonomics",
    description:
      "IPS Black technology delivering a 2000:1 contrast ratio, 90W single-cable USB-C charging, and daisy-chaining. Incredible color accuracy and minimal eye strain.",
    badge: "Amazon's Choice",
    affiliateUrl: "https://www.amazon.com/dp/B09TQZP9CL?tag=tanmayvaij-20",
    discountCode: null,
    price: "$689.99",
    rating: 4.7,
    imageUrl: null,
    merchant: "Amazon",
    featured: true,
    clicks: 0,
    detailedReview:
      "When reviewing code diffs, logs, and architectural diagrams all day, monitor quality directly impacts cognitive fatigue. The Dell U3223QE's IPS Black panel provides deep blacks comparable to OLED without burn-in risks, while the built-in 90W USB-C hub charges laptops and connects ethernet through a single clean cable.",
    highlights: [
      "IPS Black technology with 2000:1 contrast ratio",
      "Single-cable 90W USB-C Power Delivery and Ethernet hub",
      "ComfortView Plus low-blue-light hardware filter",
      "Factory calibrated 98% DCI-P3 color reproduction",
    ],
  },
  {
    id: "aff-benq-screenbar-halo",
    slug: "benq-screenbar-halo",
    name: "BenQ ScreenBar Halo LED Monitor Light",
    category: "Desk Setup & Ergonomics",
    description:
      "Asymmetrical optical design that illuminates the workspace without any screen reflection. Includes wireless rotary control dial and ambient backlighting.",
    badge: "Essential Gear",
    affiliateUrl: "https://www.amazon.com/dp/B08WT889V3?tag=tanmayvaij-20",
    discountCode: null,
    price: "$179.00",
    rating: 4.8,
    imageUrl: null,
    merchant: "Amazon",
    featured: true,
    clicks: 0,
    detailedReview:
      "Desk lamps often cause glare across screens and occupy valuable desk space. The BenQ ScreenBar Halo sits directly on top of the monitor, directing warm or cool light precisely onto your keyboard and notebook with zero reflection on the glass. The ambient back-light creates a soothing halo that reduces eye strain in dark rooms.",
    highlights: [
      "Patented asymmetrical optical design prevents monitor glare",
      "Wireless precision rotary dial with touch controls",
      "Integrated ambient rear backlight for eye fatigue reduction",
      "Adjustable color temperature from 2700K to 6500K",
    ],
  },
  {
    id: "aff-logitech-mx-master-3s",
    slug: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S Ergonomic Mouse",
    category: "Desk Setup & Ergonomics",
    description:
      "Quiet-click switches, 8K DPI sensor that tracks on glass, and the electromagnetic MagSpeed wheel for hyper-fast scrolling through codebases and docs.",
    badge: "Top Rated",
    affiliateUrl: "https://www.amazon.com/dp/B09HM94VDS?tag=tanmayvaij-20",
    discountCode: null,
    price: "$99.99",
    rating: 4.8,
    imageUrl: null,
    merchant: "Amazon",
    featured: true,
    clicks: 0,
    detailedReview:
      "The MX Master 3S is the standard mouse for developers for good reason. Its electromagnetic MagSpeed scroll wheel lets you zip through 1,000 lines of code per second, and the sculpted ergonomic palm rest prevents wrist strain during long debugging sessions. The 90% quieter clicks make it polite in quiet rooms and video calls.",
    highlights: [
      "MagSpeed electromagnetic scroll wheel (1,000 lines/sec)",
      "8,000 DPI Darkfield sensor tracks on any surface including glass",
      "Quiet Click switches reduce click noise by 90%",
      "Customizable thumb wheel and app-specific gesture controls",
    ],
  },

  // Audio & Tech Gadgets
  {
    id: "aff-sony-wh-1000xm5",
    slug: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5 Noise Canceling Headphones",
    category: "Audio & Tech Gadgets",
    description:
      "Industry-leading active noise cancellation powered by two processors and eight microphones. Lightweight design with 30-hour battery life for deep work focus.",
    badge: "Best for Focus",
    affiliateUrl: "https://www.amazon.com/dp/B09XS7JWHH?tag=tanmayvaij-20",
    discountCode: null,
    price: "$398.00",
    rating: 4.7,
    imageUrl: null,
    merchant: "Amazon",
    featured: true,
    clicks: 0,
    detailedReview:
      "Entering deep flow state requires blocking out ambient distraction. The Sony WH-1000XM5 creates a dome of silence in coffee shops, open offices, or noisy home environments. The memory foam ear cushions are lightweight enough to wear for 6+ hours without headache or ear fatigue.",
    highlights: [
      "Industry-leading ANC with 8 microphones & Auto NC Optimizer",
      "Crystal clear call quality with 4 beamforming microphones",
      "Up to 30 hours of continuous battery life with quick charge",
      "Multipoint connection for seamless switching between Mac and phone",
    ],
  },
  {
    id: "aff-shure-mv7-plus",
    slug: "shure-mv7-plus",
    name: "Shure MV7+ Podcast & Streaming Microphone",
    category: "Audio & Tech Gadgets",
    description:
      "Broadcast-quality hybrid USB/XLR dynamic microphone with onboard DSP, auto-level mode, and digital pop filter. Crystal-clear voice for meetings and recordings.",
    badge: "Creator Pick",
    affiliateUrl: "https://www.amazon.com/dp/B0CW1B9Y28?tag=tanmayvaij-20",
    discountCode: null,
    price: "$279.00",
    rating: 4.9,
    imageUrl: null,
    merchant: "Amazon",
    featured: false,
    clicks: 0,
    detailedReview:
      "A dedicated microphone instantly elevates team calls, podcast interviews, and video courses. The Shure MV7+ uses a dynamic capsule that isolates your voice while rejecting keyboard clatter and room echo, and the plug-and-play USB-C mode requires no external audio interface.",
    highlights: [
      "Hybrid USB-C and XLR dual outputs for home & studio use",
      "Real-time DSP with auto-level mode, de-noiser, and digital popper",
      "Touch-sensitive LED panel for instant mute and gain adjustments",
      "Voice isolation technology rejects background room reverb",
    ],
  },
  {
    id: "aff-anker-prime-20000mah",
    slug: "anker-prime-20000mah",
    name: "Anker Prime 20,000mAh 200W Power Bank",
    category: "Audio & Tech Gadgets",
    description:
      "Ultra-compact high-capacity portable battery capable of full-speed 100W laptop fast charging and powering phone and accessories simultaneously.",
    badge: "Travel EDC",
    affiliateUrl: "https://www.amazon.com/dp/B0BYP2F3SG?tag=tanmayvaij-20",
    discountCode: null,
    price: "$129.99",
    rating: 4.7,
    imageUrl: null,
    merchant: "Amazon",
    featured: false,
    clicks: 0,
    detailedReview:
      "Working remotely from cafés or airports without searching for wall outlets is liberating. The Anker Prime outputs up to 100W through a single USB-C port, charging a 16-inch MacBook Pro at peak speed, while the crisp digital display shows real-time wattage draw and remaining runtime.",
    highlights: [
      "200W total maximum output across 2 USB-C and 1 USB-A port",
      "100W single-port charging fast-charges laptops and MacBooks",
      "Smart digital display reveals real-time voltage, wattage, and temperature",
      "Airline-approved 20,000mAh capacity for international travel",
    ],
  },

  // Books & Reading
  {
    id: "aff-designing-data-intensive-applications",
    slug: "designing-data-intensive-applications",
    name: "Designing Data-Intensive Applications",
    category: "Books & Reading",
    description:
      "By Martin Kleppmann. The definitive guide to distributed architectures, storage engines, replication strategies, and fault-tolerant system design.",
    badge: "Must-Read Classic",
    affiliateUrl: "https://www.amazon.com/dp/1449373321?tag=tanmayvaij-20",
    discountCode: null,
    price: "$42.99",
    rating: 4.9,
    imageUrl: null,
    merchant: "Amazon",
    featured: true,
    clicks: 0,
    detailedReview:
      "If you only read one technical book in your engineering career, make it this one. Martin Kleppmann deconstructs the foundational trade-offs behind modern databases, message queues, consensus protocols (Raft/Paxos), and replication topologies with lucid explanations and zero fluff.",
    highlights: [
      "Comprehensive breakdown of relational vs document vs graph stores",
      "In-depth analysis of replication lag, split-brain, and partitions",
      "Batch processing (MapReduce) and stream processing (Kafka)",
      "Essential reading for system design interviews and senior roles",
    ],
  },
  {
    id: "aff-deep-work-cal-newport",
    slug: "deep-work-cal-newport",
    name: "Deep Work: Rules for Focused Success",
    category: "Books & Reading",
    description:
      "By Cal Newport. A tactical guide on cultivating extreme cognitive focus, eliminating digital noise, and generating high-value output in a distracted world.",
    badge: "Productivity Bible",
    affiliateUrl: "https://www.amazon.com/dp/1455586692?tag=tanmayvaij-20",
    discountCode: null,
    price: "$18.99",
    rating: 4.8,
    imageUrl: null,
    merchant: "Amazon",
    featured: false,
    clicks: 0,
    detailedReview:
      "Deep Work shifted how I organize my calendar as a software engineer. Cal Newport demonstrates that the ability to perform deep, uninterrupted cognitive work is becoming increasingly rare and valuable in an economy full of slack pings and shallow busywork.",
    highlights: [
      "Tactical strategies to schedule 90-120 minute deep work blocks",
      "Eliminating attentional residue caused by context switching",
      "Rules for digital minimalism and intentional communication",
      "Framework for measuring cognitive intensity vs shallow metrics",
    ],
  },
  {
    id: "aff-atomic-habits-james-clear",
    slug: "atomic-habits-james-clear",
    name: "Atomic Habits",
    category: "Books & Reading",
    description:
      "By James Clear. Proven framework for compounding small daily improvements, overcoming inertia, and designing personal systems that stick.",
    badge: "Bestseller",
    affiliateUrl: "https://www.amazon.com/dp/0735211299?tag=tanmayvaij-20",
    discountCode: null,
    price: "$15.99",
    rating: 4.8,
    imageUrl: null,
    merchant: "Amazon",
    featured: false,
    clicks: 0,
    detailedReview:
      "You do not rise to the level of your goals; you fall to the level of your systems. James Clear provides an actionable playbook for habit stacking, environment design, and friction reduction that helps engineers build sustainable reading, coding, and health routines.",
    highlights: [
      "The 1% compound rule for continuous long-term progress",
      "The Four Laws of Behavior Change (Cue, Craving, Response, Reward)",
      "Environment design to make good habits obvious and bad habits invisible",
      "Identity-based habits that shift how you view your potential",
    ],
  },
]

