import { ImageResponse } from "next/og";
import { SEO_DEFAULTS } from "./constants";

export const runtime = "edge";

export const alt = "Ha Duy Hung - Front-end Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
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
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "15%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(59, 130, 246, 0.15)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "15%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(139, 92, 246, 0.15)",
            filter: "blur(80px)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <p
            style={{
              fontSize: 24,
              color: "#94a3b8",
              margin: 0,
            }}
          >
            Portfolio
          </p>
          <h1
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              backgroundClip: "text",
              color: "transparent",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Ha Duy Hung
          </h1>
          <p
            style={{
              fontSize: 32,
              color: "#e2e8f0",
              margin: 0,
              fontWeight: 600,
            }}
          >
            Front-end Developer
          </p>
          <p
            style={{
              fontSize: 18,
              color: "#64748b",
              margin: 0,
              maxWidth: 600,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            {SEO_DEFAULTS.description.slice(0, 120)}...
          </p>

          {/* Tech badges */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 16,
            }}
          >
            {["React", "Next.js", "TypeScript", "React Native"].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  color: "#60a5fa",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
