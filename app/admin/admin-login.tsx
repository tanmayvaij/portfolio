"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, ShieldCheck, ArrowRight, AlertCircle, KeyRound } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { loginAdmin } from "@/app/actions/admin"

export function AdminLogin({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await loginAdmin(password)
      if (res.success) {
        onLoginSuccess()
      } else {
        setError(res.message)
      }
    } catch {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full max-w-md"
      >
        <Card className="w-full border-border/80 bg-card/95 shadow-xl backdrop-blur-md">
          <CardHeader className="space-y-2 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 220 }}
              className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
            >
              <Lock className="h-6 w-6" />
            </motion.div>
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              Admin Portal Access
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Enter your administrative password to manage blog posts, projects, and incoming contact inquiries.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive overflow-hidden"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-1.5">
                <label htmlFor="admin-pass" className="text-xs font-semibold text-foreground block">
                  Master Password
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-pass"
                    type="password"
                    required
                    placeholder="Enter admin password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 h-10 text-sm"
                    autoFocus
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pt-2">
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full">
                <Button type="submit" disabled={loading} className="w-full text-xs h-9">
                  {loading ? (
                    "Authenticating..."
                  ) : (
                    <>
                      Enter Admin Dashboard
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </>
                  )}
                </Button>
              </motion.div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Encrypted local session authentication</span>
              </div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}

