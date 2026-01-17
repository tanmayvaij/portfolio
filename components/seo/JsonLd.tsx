export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tanmayvaij.dev";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tanmay Vaij",
    url: baseUrl,
    image: `${baseUrl}/pixar-profile-pic.png`,
    sameAs: [
      "https://github.com/tanmayvaij",
      "https://www.linkedin.com/in/tanmayvaij",
      "https://twitter.com/tanmayvaij",
    ],
    jobTitle: "Full Stack & AI Engineer",
    worksFor: {
      "@type": "Organization",
      name: "IntellAxis AI",
    },
    description:
      "Full Stack & AI Engineer specializing in GenAI, scalable backends, and modern web development",
    knowsAbout: [
      "Full Stack Development",
      "Artificial Intelligence",
      "GenAI",
      "React",
      "Node.js",
      "Next.js",
      "TypeScript",
      "DevOps",
      "Cloud Computing",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tanmay Vaij Portfolio",
    url: baseUrl,
    description:
      "Portfolio of Tanmay Vaij - Full Stack & AI Engineer specializing in GenAI, scalable backends, and modern web development",
    author: {
      "@type": "Person",
      name: "Tanmay Vaij",
    },
    inLanguage: "en-US",
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01T00:00:00+00:00",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: "Tanmay Vaij",
      alternateName: "Tanmay",
      description:
        "Full Stack & AI Engineer specializing in GenAI, scalable backends, and modern web development",
      image: `${baseUrl}/pixar-profile-pic.png`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
