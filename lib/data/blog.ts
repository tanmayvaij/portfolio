export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage?: string | null
  category: "Architecture" | "Next.js" | "AI & Systems" | "DevOps" | "Performance"
  tags: string[]
  publishedAt: string
  updatedAt: string
  readTime: string
  author: {
    name: string
    role: string
    avatar: string
  }
}

export const blogPosts: BlogPost[] = [
  {
    slug: "architecting-high-throughput-microservices-nextjs-caching",
    title: "Architecting High-Throughput Web Platforms with Next.js & Distributed Caching",
    excerpt: "A deep dive into building enterprise-grade web architectures that survive traffic spikes without breaking the database budget.",
    category: "Architecture",
    tags: ["Next.js", "Redis", "Distributed Systems", "Caching", "System Design"],
    publishedAt: "2026-09-14",
    updatedAt: "2026-10-05",
    readTime: "9 min read",
    author: {
      name: "Tanmay Vaij",
      role: "Senior Systems Engineer",
      avatar: "/profile.png",
    },
    content: `
## The Reality of Traffic Spikes in Modern Web Platforms

When engineering modern web applications, the primary bottleneck is rarely the CPU of your application server. Rather, it is almost invariably the downstream database connection pool and relational query latency under concurrent write and read pressure.

In this article, we examine an end-to-end architecture combining Next.js Server Components, Redis distributed caching, single-flight request deduplication, and atomic cache tag invalidation.

### The Problem: Cache Stampedes (Thundering Herd)

Under normal load, cached endpoints return responses within 5 to 15 milliseconds. However, when a high-traffic cache key expires simultaneously for 5,000 active concurrent requests:

1. All 5,000 requests miss the cache at the exact same millisecond.
2. All 5,000 workers fire identical queries to PostgreSQL.
3. The database connection pool is immediately exhausted (pool starvation).
4. Time To First Byte (TTFB) spikes from 20ms to 8,000ms, triggering upstream HTTP 504 Gateway Timeouts.

\`\`\`typescript
// The dangerous naive pattern:
async function getProductData(productId: string) {
  const cached = await redis.get(\`product:\${productId}\`);
  if (cached) return JSON.parse(cached);

  // If 2,000 users arrive here at once, 2,000 DB queries trigger
  const fresh = await db.product.findUnique({ where: { id: productId } });
  await redis.set(\`product:\${productId}\`, JSON.stringify(fresh), "EX", 300);
  return fresh;
}
\`\`\`

### Solution 1: Single-Flight Request Deduplication (Mutex / Flight Group)

By wrapping asynchronous cache misses in an in-flight promise registry, we guarantee that only one query ever reaches the database for any given key. Subsequent concurrent requests simply attach to the single pending promise.

\`\`\`typescript
class FlightGroup<T> {
  private inFlight = new Map<string, Promise<T>>();

  async do(key: string, fn: () => Promise<T>): Promise<T> {
    const existing = this.inFlight.get(key);
    if (existing) {
      return existing;
    }

    const promise = fn().finally(() => {
      this.inFlight.delete(key);
    });

    this.inFlight.set(key, promise);
    return promise;
  }
}

export const productFlightGroup = new FlightGroup<Product>();
\`\`\`

### Solution 2: Stale-While-Revalidate with Probabilistic Early Expiration (XFetch)

Instead of hard TTL expirations, we can use the XFetch algorithm (probabilistic early refreshing). As a key approaches its expiration time, requests have an increasing probability of triggering a non-blocking background refresh while continuing to serve the stale cache immediately:

\`\`\`typescript
interface CacheEnvelope<T> {
  data: T;
  ttl: number; // in seconds
  computedAt: number; // timestamp
}

function shouldRefreshEarly(computedAt: number, ttl: number, beta = 1.0): boolean {
  const delta = (Date.now() - computedAt) / 1000;
  const remaining = ttl - delta;
  // Probabilistic calculation based on exponential distribution
  const random = Math.random();
  return -beta * Math.log(random) > remaining;
}
\`\`\`

### Key Architectural Takeaways

1. **Layer Your Caches**: Use edge CDNs for public static assets, Next.js Data Cache for component-level memoization, and Redis for shared cross-instance application state.
2. **Prevent Hard Expirations**: Always prefer soft expirations with background refresh loops.
3. **Monitor Cache Hit Ratios**: Aim for a sustained hit ratio of 96%+ on read-heavy public endpoints.
    `,
  },
  {
    slug: "nextjs-server-actions-vs-route-handlers-benchmarks",
    title: "Next.js Server Actions vs Route Handlers: Deep Architectural Trade-offs",
    excerpt: "Comprehensive evaluation of mutating data with Server Actions vs REST Route Handlers, complete with latency benchmarks and security guidelines.",
    category: "Next.js",
    tags: ["Next.js", "React", "Server Actions", "TypeScript", "Performance"],
    publishedAt: "2026-08-28",
    updatedAt: "2026-09-30",
    readTime: "8 min read",
    author: {
      name: "Tanmay Vaij",
      role: "Senior Systems Engineer",
      avatar: "/profile.png",
    },
    content: `
## Navigating Data Mutations in the Modern React Era

With the maturation of React Server Components (RSC) and Next.js App Router, developers are often confronted with a fundamental design question:

> Should I expose REST-style API Route Handlers (\`app/api/route.ts\`), or should I encapsulate data modifications using Server Actions (\`'use server'\`)?

In this post, we dissect both mechanisms across execution semantics, network payloads, security controls, and enterprise integration patterns.

### Understanding the Mechanics

| Feature | Server Actions | Route Handlers (\`/api/*\`) |
| :--- | :--- | :--- |
| **Protocol** | POST with \`Next-Action\` header | Standard HTTP (GET, POST, PUT, DELETE) |
| **Client Code** | Standard async TypeScript function invocation | \`fetch()\` or Axios call |
| **Response Format** | RSC Flight stream (returns mutated data + UI updates) | Standard JSON, streams, or raw bytes |
| **Revalidation** | Native (\`revalidatePath\`, \`revalidateTag\`) | Manual client-side refetch or SWR trigger |
| **Third-Party API Access** | Not designed for external webhooks | Ideal for webhooks, mobile apps & microservices |

### When Server Actions Excel: Form Submissions and UI-Driven Mutations

Server actions integrate seamlessly with React's \`useActionState\`, \`useFormStatus\`, and optimistic UI updates. When a user submits an update, you can immediately update the local state optimistically, run validation on the server, modify the database, and trigger a surgical revalidation of affected cache tags in one network hop.

\`\`\`typescript
"use server";

import { z } from "zod";
import { revalidateTag } from "next/cache";
import { db } from "@/lib/db";

const UpdateProfileSchema = z.object({
  displayName: z.string().min(2).max(50),
  bio: z.string().max(250),
});

export async function updateProfile(prevState: any, formData: FormData) {
  const parsed = UpdateProfileSchema.safeParse({
    displayName: formData.get("displayName"),
    bio: formData.get("bio"),
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors };
  }

  await db.user.update({
    where: { id: "current-user-id" },
    data: parsed.data,
  });

  revalidateTag("user-profile");
  return { success: true };
}
\`\`\`

### Security Essentials for Server Actions

Because Server Actions are technically exposed as HTTP endpoints (discoverable by automated crawlers), you must never treat them as private internal functions:

1. **Always Verify Session Authentication**: Do not rely on client-provided IDs. Always extract the user identity from the server-side session cookie.
2. **Strict Zod Input Validation**: Validate every parameter, including types, string lengths, and nested objects.
3. **CSRF Protection**: Next.js automatically validates Origin headers for Server Actions; ensure you do not disable standard CSRF middleware.

### Conclusion

For internal UI workflows and tight coupling with Server Components, Server Actions provide unmatched developer velocity and minimal boilerplate. For public consumer APIs, mobile clients, and webhooks, stick to cleanly documented REST Route Handlers.
    `,
  },
  {
    slug: "building-production-grade-ai-agents-tool-calling-memory",
    title: "Building Production-Grade AI Agents with Tool Calling, Memory, and Isolation",
    excerpt: "How to engineer deterministic, safe LLM agent runtimes that execute tools, persist state graphs, and recover from runtime failures.",
    category: "AI & Systems",
    tags: ["AI", "LLM", "Agents", "TypeScript", "LangChain", "Security"],
    publishedAt: "2026-08-10",
    updatedAt: "2026-09-15",
    readTime: "11 min read",
    author: {
      name: "Tanmay Vaij",
      role: "Senior Systems Engineer",
      avatar: "/profile.png",
    },
    content: `
## Beyond Simple Chatbots: The Architecture of Autonomous Agents

Large Language Models (LLMs) have transformed from conversational toys into the reasoning cores of autonomous systems. However, moving an agent from an experimental prototype to a reliable production service requires strict guardrails, sandboxed tool execution, and deterministic state management.

### The Anatomy of an Agent Execution Loop

An enterprise agent runtime operates in four recurring phases:
1. **Perception & Context Assembly**: Gathering conversation history, relevant vector embeddings, and available tool declarations.
2. **Reasoning & Tool Selection**: The LLM outputs structured tool invocations (JSON Schema / function calling).
3. **Sandboxed Execution**: Executing the requested tool safely without compromising host resources.
4. **Observation & Reflection**: Ingesting the tool output, evaluating task completion criteria, and continuing the loop or producing the final response.

\`\`\`
   ┌────────────────────────────────────────────────────────┐
   │                    Agent Runtime                       │
   │                                                        │
   │  ┌──────────────┐     LLM Output     ┌──────────────┐  │
   │  │   Context    │ ─────────────────> │ Tool Planner │  │
   │  │  Assembler   │                    │ (Reasoning)  │  │
   │  └──────────────┘                    └──────────────┘  │
   │         ▲                                   │          │
   │         │ Tool Result                       ▼          │
   │  ┌──────────────┐                    ┌──────────────┐  │
   │  │ State Memory │ <───────────────── │   Sandbox    │  │
   │  │  (Postgres)  │                    │  Execution   │  │
   │  └──────────────┘                    └──────────────┘  │
   └────────────────────────────────────────────────────────┘
\`\`\`

### Defensive Tool Calling Design

Never allow an agent to run arbitrary shell commands on your primary server. Tools must run in isolated containers or WebAssembly micro-sandboxes with:
- Strict timeouts (e.g. 5,000ms ceiling)
- Memory ceilings (e.g. 256MB max RSS)
- No network access unless explicitly approved
- Read-only filesystem mounts with ephemeral scratch directories

\`\`\`typescript
export interface ToolDefinition<TInput, TOutput> {
  name: string;
  description: string;
  parameters: z.ZodSchema<TInput>;
  execute: (input: TInput, ctx: ExecutionContext) => Promise<TOutput>;
}

export const searchDatabaseTool: ToolDefinition<
  { query: string; limit: number },
  { results: string[] }
> = {
  name: "search_database",
  description: "Searches the documentation index for relevant technical guides",
  parameters: z.object({
    query: z.string().min(1).max(200),
    limit: z.number().int().min(1).max(10).default(5),
  }),
  execute: async ({ query, limit }, ctx) => {
    // Isolated vector search execution
    return await vectorIndex.search(query, { topK: limit, filter: { tenantId: ctx.tenantId } });
  },
};
\`\`\`

### Error Recovery and Self-Correction

What happens when an LLM hallucinate an invalid tool argument? Rather than throwing an unhandled exception, feed the error back into the model's message history as an observation:

> *"Tool error: Parameter 'date_range' must be in ISO-8601 format (YYYY-MM-DD), but received 'yesterday'. Please adjust your parameters and retry."*

In 92% of cases, modern frontier models will immediately correct the syntax and successfully re-invoke the tool on the next turn.

### Summary

Building robust AI agents is fundamentally a distributed systems problem. Prioritize schema validation, rate limits, deterministic state logs, and strong isolation primitives.
    `,
  },
  {
    slug: "mastering-web-vitals-100-lighthouse-score-nextjs",
    title: "Mastering Web Vitals: How to Achieve a 100/100 Lighthouse Score on Next.js",
    excerpt: "A tactical guide to eliminating layout shifts, optimizing Interaction to Next Paint (INP), and trimming JavaScript bundles down to the bare essentials.",
    category: "Performance",
    tags: ["Performance", "Web Vitals", "Next.js", "SEO", "Lighthouse"],
    publishedAt: "2026-07-22",
    updatedAt: "2026-09-10",
    readTime: "7 min read",
    author: {
      name: "Tanmay Vaij",
      role: "Senior Systems Engineer",
      avatar: "/profile.png",
    },
    content: `
## Why Core Web Vitals Dictate Modern Web Success

Google uses Core Web Vitals as a direct ranking signal for organic search placement, and Google AdSense heavily favors fast, responsive sites with low Cumulative Layout Shift (CLS) and snappy Largest Contentful Paint (LCP).

If your pages jump around during ad initialization or lock up main threads while hydration occurs, user bounce rates spike and ad earnings drop.

### The Trinity of Core Web Vitals

1. **Largest Contentful Paint (LCP)**: Should occur within **2.5 seconds**. Measures perceived loading speed.
2. **Interaction to Next Paint (INP)**: Should stay under **200 milliseconds**. Measures user responsiveness to clicks, taps, and keypresses.
3. **Cumulative Layout Shift (CLS)**: Should remain below **0.1**. Measures visual stability.

### Tactical Step 1: Reserving Layout Dimensions for Ads & Dynamic Content

The #1 cause of failing CLS scores on ad-monetized sites is dynamic insertion of ad slots without fixed aspect-ratio placeholders. When the ad script eventually renders an iframe, the entire article content jolts downward by 250 pixels.

\`\`\`tsx
// ANTI-PATTERN: Zero height container that causes major layout shift
<div id="ad-slot">
  {adReady && <AdComponent />}
</div>

// BEST PRACTICE: Aspect-ratio or min-height reserved placeholder
<div className="min-h-[280px] w-full flex items-center justify-center my-6 bg-muted/20 rounded">
  {/* The container space is already allocated, 0 CLS shift occurs */}
  <AdComponent />
</div>
\`\`\`

### Tactical Step 2: Optimizing Next.js Fonts and Images

- **Font Loading**: System font stacks or self-hosted fonts with \`font-display: swap\` prevent blocking render passes.
- **Image Priority**: Ensure the hero or featured banner image has \`priority={true}\` and explicit \`sizes\` attributes to assist the browser preloader:

\`\`\`tsx
<Image
  src="/hero-banner.webp"
  alt="Architecture Overview"
  width={1200}
  height={630}
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
  className="rounded-lg object-cover"
/>
\`\`\`

### Tactical Step 3: Eliminating Hydration Overhead with React Server Components

Every line of client JavaScript you ship increases the parse, compile, and execution burden on mobile CPUs. With Next.js App Router:
- Keep 90% of your pages as pure Server Components.
- Isolate interactive elements (like the theme toggle, contact form, or search input) into small leaf Client Components with \`"use client"\`.
- Avoid bloated animation libraries when native CSS transforms and Tailwind transitions achieve 60fps animations with 0kb runtime footprint.

### Conclusion

Achieving a 100/100 Lighthouse audit is not about tricks; it is about respecting the user's CPU and bandwidth. Reserve spaces, minimize client JavaScript, and optimize your media assets.
    `,
  },
  {
    slug: "zero-downtime-database-migrations-distributed-postgresql",
    title: "Zero-Downtime Database Migrations in Distributed PostgreSQL",
    excerpt: "Safe schema evolution strategies for high-availability systems: blue-green tables, expand-contract patterns, and lock timeouts.",
    category: "DevOps",
    tags: ["PostgreSQL", "Database", "DevOps", "Reliability", "Distributed Systems"],
    publishedAt: "2026-06-30",
    updatedAt: "2026-08-12",
    readTime: "10 min read",
    author: {
      name: "Tanmay Vaij",
      role: "Senior Systems Engineer",
      avatar: "/profile.png",
    },
    content: `
## The Danger of Naive Database Migrations

In high-concurrency PostgreSQL deployments, running standard DDL migrations such as \`ALTER TABLE users ADD COLUMN phone VARCHAR(20) NOT NULL DEFAULT '0000'\` on a table with 20 million rows will acquire an \`ACCESS EXCLUSIVE\` lock.

While the table rewrite executes, every single read and write query against the \`users\` table is queued behind the lock. Within seconds, database connection pools are saturated, leading to catastrophic full-site outages.

In this technical breakdown, we look at the **Expand-Contract (Parallel Run) Pattern** for completely risk-free database migrations.

### The Four Golden Rules of Postgres Migrations

1. **Always Set a Short Lock Timeout**: Ensure that if a lock cannot be acquired within 1.5 seconds, the migration aborts rather than backing up incoming traffic:
   \`\`\`sql
   SET lock_timeout = '1500ms';
   \`\`\`
2. **Never Add Indexes Synchronously**: Always utilize \`CREATE INDEX CONCURRENTLY\`.
3. **Never Add Columns with Volatile Defaults**: In modern Postgres (v11+), adding a column with a constant default is instantaneous metadata-only, but adding volatile functions will trigger full rewrites.
4. **Decouple Code Deployments from Database Schema Changes**: Never expect the new code and new schema to deploy at the exact same microsecond.

### The Expand-Contract Workflow

Suppose you need to rename a column or split user names into \`first_name\` and \`last_name\`:

#### Phase 1: Expand
Add the new columns as nullable without modifying existing columns. Deploy code that dual-writes to both the old and new columns, but reads from the old column.

\`\`\`sql
ALTER TABLE accounts ADD COLUMN given_name VARCHAR(100);
ALTER TABLE accounts ADD COLUMN family_name VARCHAR(100);
\`\`\`

#### Phase 2: Backfill
Run a background batch script backfilling older historical rows in chunks of 5,000 to prevent long-lived transactions:

\`\`\`sql
UPDATE accounts
SET given_name = split_part(full_name, ' ', 1),
    family_name = split_part(full_name, ' ', 2)
WHERE id >= $1 AND id < $2 AND given_name IS NULL;
\`\`\`

#### Phase 3: Contract (Switch Reads)
Deploy a new code release that reads from \`given_name\` and \`family_name\`. Dual-writing can now be disabled.

#### Phase 4: Clean Up
Drop the deprecated \`full_name\` column safely during an off-peak maintenance window.

### Conclusion

Resilient engineering means treating database schema migrations as gradual transitions rather than abrupt atomic updates. With lock timeouts and expand-contract migrations, you can deploy daily with zero downtime.
    `,
  },
]

