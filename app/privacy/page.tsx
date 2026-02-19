"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Lock, Eye, FileText, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Information We Collect",
      icon: Eye,
      content: (
        <p>
          We only ask for personal information when we truly need it to provide
          a service to you. We collect it by fair and lawful means, with your
          knowledge and consent. We also let you know why we&apos;re collecting
          it and how it will be used.
        </p>
      ),
    },
    {
      title: "2. Third-Party Services and Ads",
      icon: Shield,
      content: (
        <>
          <p className="mb-4">
            We use third-party services to improve your experience and monetize
            our website. These services may collect information about your
            visit.
          </p>
          <h4 className="font-semibold text-neutral-900 dark:text-white mb-2">
            Google AdSense
          </h4>
          <p className="mb-4">
            We use Google AdSense to serve advertisements. Google, as a
            third-party vendor, uses cookies to serve ads on our site.
            Google&apos;s use of the DART cookie enables it to serve ads to our
            users based on their visit to our site and other sites on the
            Internet.
          </p>
          <p>
            Users may opt-out of the use of the DART cookie by visiting the
            Google Ad and Content Network privacy policy at{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 hover:text-rose-500 hover:underline"
            >
              https://policies.google.com/technologies/ads
            </a>
            .
          </p>
        </>
      ),
    },
    {
      title: "3. Cookies",
      icon: Lock,
      content: (
        <>
          <p className="mb-4">
            We use cookies to help you navigate efficiently and perform certain
            functions. You will find detailed information about all cookies
            under each consent category below.
          </p>
          <p>
            The cookies that are categorized as &quot;Necessary&quot; are stored
            on your browser as they are essential for enabling the basic
            functionalities of the site.
          </p>
        </>
      ),
    },
    {
      title: "4. Changes to This Policy",
      icon: FileText,
      content: (
        <p>
          We may update our Privacy Policy from time to time. Thus, we advise
          you to review this page periodically for any changes. We will notify
          you of any changes by posting the new Privacy Policy on this page.
          These changes are effective immediately, after they are posted on this
          page.
        </p>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-32 pb-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12 text-center">
          <Link href="/">
            <Button
              variant="ghost"
              className="mb-8 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Privacy{" "}
            <span className="bg-linear-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Your privacy is important to us. We are committed to protecting your
            personal data and being transparent about how we use it.
          </p>
        </div>

        {/* Last Updated Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center gap-2 text-sm text-neutral-500"
        >
          <span>Last updated:</span>
          <span className="font-semibold text-neutral-900 dark:text-white">
            {new Date().toLocaleDateString()}
          </span>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 hover:border-rose-200 dark:hover:border-rose-900/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white dark:bg-neutral-800 shadow-xs border border-neutral-100 dark:border-neutral-700">
                  <section.icon className="w-6 h-6 text-rose-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">
                    {section.title}
                  </h2>
                  <div className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {section.content}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-3xl bg-linear-to-br from-rose-500/10 to-pink-500/10 border border-rose-200/50 dark:border-rose-900/20 text-center"
        >
          <div className="inline-flex p-3 rounded-full bg-rose-100 dark:bg-rose-900/30 mb-4">
            <Mail className="w-6 h-6 text-rose-600 dark:text-rose-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">
            Still have questions?
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us.
          </p>
          <a
            href="mailto:tanmayvaij22@gmail.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-medium transition-colors"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
}
