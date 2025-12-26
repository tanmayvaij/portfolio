export const JsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tanmay Vaij",
    url: "https://tanmayvaij.vercel.app",
    jobTitle: "Full Stack Engineer",
    image: "https://tanmayvaij.vercel.app/pixar-profile-pic.png",
    sameAs: [
      "https://github.com/tanmayvaij",
      "https://www.linkedin.com/in/tanmayvaij/",
      "https://twitter.com/tanmayvaij",
    ],
    worksFor: {
      "@type": "Organization",
      name: "IntellAxis AI",
    },
    description:
      "Passionate Full Stack Developer skilled in building scalable web and mobile applications. Strong foundation in frontend, backend, cloud deployment, and DevOps automation.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
