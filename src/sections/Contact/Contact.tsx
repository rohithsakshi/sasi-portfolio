"use client";

import React, { useState } from "react";

const contactLinks = [
  { icon: "✉", label: "Sasiharsha6602@gmail.com", href: "mailto:Sasiharsha6602@gmail.com" },
  { icon: "☏", label: "+91 6382931941", href: "tel:+916382931941" },
  { icon: "in", label: "linkedin.com/in/sasidharan", href: "https://www.linkedin.com/in/sasidharan" },
  { icon: "Be", label: "behance.net/sasidharan14", href: "https://www.behance.net/sasidharan14" },
];

export default function Contact() {
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="contact"
      style={{
        width: "100%",
        padding: 0,
        margin: 0,
        minHeight: "auto",
        height: "auto",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "stretch",
        overflow: "hidden",
        background: "radial-gradient(ellipse at 50% 40%, #eedcbe 0%, #e2cba8 45%, #d0b48a 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto",
          height: "auto",
          minHeight: "auto",
          borderRadius: 0,
          overflow: "hidden",
          boxShadow: "none",
        }}
      >
        {/* ── LEFT PANEL ── */}
        <div
          style={{
            width: isMobile ? "100%" : "42%",
            minWidth: isMobile ? "100%" : "42%",
            height: "auto",
            minHeight: isMobile ? "340px" : "auto",
            background: "linear-gradient(160deg, #8B4513 0%, #6B3410 60%, #4A2008 100%)",
            padding: "36px 32px",
            borderRadius: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            position: "relative",
            clipPath: isMobile ? "none" : "polygon(0 0, 88% 0, 100% 100%, 0 100%)",
          }}
        >
          {/* Open to Work badge */}
          <div
            style={{
              position: "absolute",
              top: "24px",
              left: "24px",
              background: "rgba(245,222,179,0.15)",
              border: "1px solid rgba(245,222,179,0.25)",
              borderRadius: "20px",
              padding: "5px 12px",
            }}
          >
            <span
              style={{
                fontSize: "9px",
                color: "rgba(245,222,179,0.8)",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Open to Work
            </span>
          </div>

          {/* Profile photo */}
          <img
            src="/sasi1.png"
            alt="Sasidharan K"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              border: "3px solid rgba(245,222,179,0.35)",
              objectFit: "cover",
              objectPosition: "top center",
              marginBottom: "12px",
              display: "block",
              flexShrink: 0,
            }}
          />

          {/* Name + Role */}
          <div
            style={{
              fontSize: "17px",
              fontWeight: 800,
              color: "#F5DEB3",
              fontFamily: "serif",
              lineHeight: 1.1,
            }}
          >
            Sasidharan K
          </div>
          <div
            style={{
              fontSize: "10px",
              color: "rgba(245,222,179,0.6)",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginTop: "5px",
            }}
          >
            Product &amp; Industrial Designer
          </div>

          {/* Divider */}
          <div
            style={{
              width: "32px",
              height: "1px",
              background: "rgba(245,222,179,0.3)",
              margin: "12px 0",
            }}
          />

          {/* Contact links */}
          {contactLinks.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "7px",
              }}
            >
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "6px",
                  flexShrink: 0,
                  background: "rgba(245,222,179,0.12)",
                  border: "1px solid rgba(245,222,179,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  color: "#F5DEB3",
                  fontWeight: 700,
                }}
              >
                {item.icon}
              </div>
              <span
                style={{
                  fontSize: "10px",
                  color: "rgba(245,222,179,0.7)",
                  wordBreak: "break-all",
                }}
              >
                {item.label}
              </span>
            </a>
          ))}
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          style={{
            flex: 1,
            background: "#FFF8EE",
            height: "auto",
            minHeight: "auto",
            padding: isMobile ? "40px 24px" : "36px 40px",
            maxWidth: "100%",
            margin: 0,
            borderRadius: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "32px",
          }}
        >
          {/* Inner content — centered, max-width for readability */}
          <div style={{ maxWidth: "100%", width: "100%", margin: 0, display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Header */}
          <div>
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "2.5px",
                color: "rgba(139,69,19,0.45)",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}
            >
              Get in touch
            </div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "#8B4513",
                fontFamily: "serif",
                lineHeight: 1.1,
                letterSpacing: "-0.5px",
              }}
            >
              Let&apos;s build
              <br />
              something great.
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#A0522D",
                marginTop: "10px",
                opacity: 0.8,
              }}
            >
              Open to freelance projects, internships, and design collaborations.
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              marginTop: "20px",
            }}
          >
            <div style={{ borderBottom: "1.5px solid rgba(139,69,19,0.2)", paddingBottom: "8px" }}>
              <input
                type="text"
                placeholder="Your Name"
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                  color: "#8B4513",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div style={{ borderBottom: "1.5px solid rgba(139,69,19,0.2)", paddingBottom: "8px" }}>
              <input
                type="email"
                placeholder="Email Address"
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                  color: "#8B4513",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div style={{ borderBottom: "1.5px solid rgba(139,69,19,0.2)", paddingBottom: "8px" }}>
              <textarea
                placeholder="Your Message"
                rows={3}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "14px",
                  color: "#8B4513",
                  fontFamily: "inherit",
                  resize: "none",
                  lineHeight: "1.6",
                }}
              />
            </div>

            <button
              type="submit"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#6B3410";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#8B4513";
              }}
              style={{
                background: "#8B4513",
                color: "#F5DEB3",
                border: "none",
                borderRadius: "8px",
                padding: "11px 28px",
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                cursor: "pointer",
                width: "100%",
                fontFamily: "inherit",
                fontWeight: 600,
                transition: "background 0.2s ease",
              }}
            >
              Send Message →
            </button>
          </form>
          </div>{/* end inner max-width wrapper */}
        </div>
      </div>
    </section>
  );
}
