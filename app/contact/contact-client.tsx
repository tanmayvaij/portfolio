"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, Mail, MapPin, Calendar, AlertCircle } from "lucide-react"
import { LinkedinIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { submitContactMessage } from "@/app/actions/contact"

interface ContactClientProps {
  title?: string
  subtitle?: string
  email?: string
  linkedinUrl?: string
  location?: string
  responseTime?: string
}

export function ContactClient({
  title = "Contact Information",
  subtitle = "Reach out directly for freelance contracts, consulting, or technical inquiries.",
  email = "tanmayvaij22@gmail.com",
  linkedinUrl = "https://www.linkedin.com/in/tanmayvaij/",
  location = "Bengaluru, Karnataka, India",
  responseTime = "Typically within 24 business hours",
}: ContactClientProps = {}) {
  const [submitted, setSubmitted] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    try {
      const res = await submitContactMessage(formData)
      if (res.success) {
        setSubmitted(true)
      } else {
        setErrorMessage(res.message)
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {/* Contact Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="space-y-6"
      >
        <Card className="bg-card shadow-xs transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-xs">
              {subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <span className="font-semibold text-foreground block">Email</span>
                <a
                  href={`mailto:${email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                <LinkedinIcon className="h-4 w-4" />
              </div>
              <div>
                <span className="font-semibold text-foreground block">LinkedIn</span>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline transition-colors font-medium"
                >
                  {linkedinUrl.replace(/^https?:\/\/(www\.)?/, "")}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <span className="font-semibold text-foreground block">Location</span>
                <span className="text-muted-foreground">{location}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <span className="font-semibold text-foreground block">Response Time</span>
                <span className="text-muted-foreground">{responseTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AdSense Publisher Trust statement */}
        <div className="rounded-xl border border-border/80 bg-muted/40 p-4 text-xs text-muted-foreground space-y-2">
          <span className="font-semibold text-foreground block">Publisher Guarantee</span>
          <p className="leading-relaxed">
            Your message is securely stored in our encrypted database and never shared, sold, or used for automated marketing.
          </p>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="md:col-span-2"
      >
        <Card className="bg-card shadow-xs transition-shadow hover:shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Send a Message</CardTitle>
            <CardDescription className="text-sm">
              Messages are saved directly to our database and notified instantly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive overflow-hidden"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center space-y-3"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  >
                    <CheckCircle className="h-6 w-6" />
                  </motion.div>
                  <h3 className="font-bold text-foreground text-base">Message Saved Successfully!</h3>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto">
                    Thank you for reaching out, {formData.name || "friend"}. Your inquiry has been recorded in the database.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: "", email: "", subject: "", message: "" })
                    }}
                    className="mt-2 text-xs"
                  >
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-semibold text-foreground">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="name"
                        required
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="transition-all focus:scale-[1.005]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-foreground">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="transition-all focus:scale-[1.005]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-semibold text-foreground">
                      Subject / Project Topic <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="subject"
                      required
                      placeholder="Next.js Consulting / Architecture Review"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="transition-all focus:scale-[1.005]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-semibold text-foreground">
                      Message Details <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="Describe your project, timeline, and goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="transition-all focus:scale-[1.005]"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" disabled={loading} className="w-full sm:w-auto text-xs h-9 px-5">
                      {loading ? (
                        "Saving to database..."
                      ) : (
                        <>
                          <Send className="mr-2 h-3.5 w-3.5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
