"use client";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://tanmayvaij.dev/#person",
        name: "Tanmay Vaij",
        url: "https://tanmayvaij.dev",
        jobTitle: "Full Stack & AI Engineer",
        description:
          "Full Stack & AI Engineer with 2+ years of experience building production-grade GenAI applications and scalable web solutions",
        alumniOf: {
          "@type": "Organization",
          name: "Your University", // Update with actual university
        },
        knowsAbout: [
          "Full Stack Development",
          "Artificial Intelligence",
          "GenAI",
          "React",
          "Next.js",
          "TypeScript",
          "Python",
          "Node.js",
          "Cloud Computing",
          "DevOps",
        ],
        sameAs: [
          "https://github.com/tanmayvaij",
          "https://www.linkedin.com/in/tanmayvaij",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://tanmayvaij.dev/#website",
        url: "https://tanmayvaij.dev",
        name: "Tanmay Vaij Portfolio",
        description: "Portfolio of Tanmay Vaij - Full Stack & AI Engineer",
        publisher: {
          "@id": "https://tanmayvaij.dev/#person",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": "https://tanmayvaij.dev/#webpage",
        url: "https://tanmayvaij.dev",
        name: "Tanmay Vaij | Full Stack & AI Engineer",
        isPartOf: {
          "@id": "https://tanmayvaij.dev/#website",
        },
        about: {
          "@id": "https://tanmayvaij.dev/#person",
        },
        description:
          "Full Stack & AI Engineer specializing in building production-grade GenAI applications, scalable backends, and modern web solutions",
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
