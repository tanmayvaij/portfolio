import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const runtime = "edge";
export const alt = "Blog Post";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#000",
            color: "#fff",
          }}
        >
          Post not found
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Header with gradient */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "40px 60px",
            background: "linear-gradient(135deg, #e11d48 0%, #ec4899 100%)",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.02em",
            }}
          >
            TANMAY VAIJ
          </div>
          <div
            style={{
              fontSize: 20,
              color: "rgba(255, 255, 255, 0.9)",
              fontWeight: 600,
            }}
          >
            Blog
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "60px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {/* Tag */}
          {post.tags && post.tags.length > 0 && (
            <div
              style={{
                display: "flex",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  background: "rgba(225, 29, 72, 0.1)",
                  color: "#e11d48",
                  padding: "8px 20px",
                  borderRadius: 20,
                  fontSize: 18,
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                {post.tags[0]}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "#171717",
              marginBottom: 20,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.title}
          </h1>

          {/* Meta info */}
          <div
            style={{
              display: "flex",
              gap: 20,
              fontSize: 20,
              color: "#737373",
              marginTop: 20,
            }}
          >
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            padding: "40px 60px",
            borderTop: "2px solid #e5e5e5",
            fontSize: 18,
            color: "#737373",
          }}
        >
          tanmayvaij.dev/blog/{slug}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
