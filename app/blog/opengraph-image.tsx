import { ImageResponse } from "next/og";

// Force Node.js runtime
export const runtime = "nodejs";

export const alt = "Blog - Tanmay Vaij";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #e11d48 0%, #ec4899 50%, #e11d48 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.9)",
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Blog
          </div>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "white",
              marginBottom: 30,
              letterSpacing: "-0.02em",
            }}
          >
            TANMAY VAIJ
          </h1>
          <p
            style={{
              fontSize: 32,
              color: "rgba(255, 255, 255, 0.95)",
              fontWeight: 500,
              marginTop: 0,
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Insights on Full Stack Development, AI/ML, and Modern Web
            Technologies
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
