export default function manifest() {
  return {
    name: "Tanmay Vaij - Full Stack & AI Engineer",
    short_name: "Tanmay Vaij",
    description:
      "Portfolio of Tanmay Vaij - Full Stack & AI Engineer specializing in GenAI, scalable backends, and modern web development",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#e11d48",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  };
}
