import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export function getPrisma(): PrismaClient {
  const current = globalForPrisma.prisma as any
  const needsRecreation =
    !current ||
    !current.experience ||
    !current.aboutConfig ||
    !current.skillCategory ||
    !current.aboutConfig?.fields?.name

  if (needsRecreation) {
    try {
      if (typeof require !== "undefined" && require.cache) {
        Object.keys(require.cache).forEach((key) => {
          if (key.includes(".prisma") || key.includes("@prisma")) {
            delete require.cache[key]
          }
        })
      }
    } catch {}

    try {
      const FreshClient = require("@prisma/client").PrismaClient
      globalForPrisma.prisma = new FreshClient({
        log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
      })
    } catch {
      globalForPrisma.prisma = new PrismaClient({
        log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
      })
    }
  }
  return globalForPrisma.prisma!
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrisma()
    return (client as any)[prop]
  },
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = getPrisma()



