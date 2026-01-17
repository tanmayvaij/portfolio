import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tanmay Vaij - Full Stack & AI Engineer";
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
          <h1
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: "white",
              marginBottom: 20,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            TANMAY VAIJ
          </h1>
          <p
            style={{
              fontSize: 40,
              color: "rgba(255, 255, 255, 0.95)",
              fontWeight: 600,
              marginTop: 0,
            }}
          >
            Full Stack & AI Engineer
          </p>
          <div
            style={{
              display: "flex",
              gap: 30,
              marginTop: 40,
              fontSize: 24,
              color: "rgba(255, 255, 255, 0.9)",
            }}
          >
            <span>GenAI</span>
            <span>•</span>
            <span>React</span>
            <span>•</span>
            <span>Node.js</span>
            <span>•</span>
            <span>DevOps</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
