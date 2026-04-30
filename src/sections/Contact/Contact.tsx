"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { RevealSection } from "../../components/RevealSection/RevealSection";
import { TiltCard } from "../../components/Visuals/TiltCard";
import { useCursor } from "../../components/Cursor/CursorProvider";

export default function Contact() {
  const { setCursorVariant } = useCursor();

  const links = [
    { label: "Email", value: "Sasiharsha6602@gmail.com", href: "mailto:Sasiharsha6602@gmail.com", icon: "✉" },
    { label: "LinkedIn", value: "linkedin.com/in/sasidharan", href: "https://www.linkedin.com/in/sasidharan", icon: "in" },
    { label: "Behance", value: "behance.net/sasidharan14", href: "https://www.behance.net/sasidharan14", icon: "Bē" },
    { label: "Phone", value: "+91 6382931941", href: "tel:+916382931941", icon: "☎" },
  ];

  return (
    <section id="contact" style={{ padding: "120px 24px 80px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
        <RevealSection>
          <span className="section-tag">Let's Connect</span>
          <h2 style={{ fontSize: "clamp(40px, 7vw, 64px)", fontWeight: 800, letterSpacing: -2, marginTop: 16, color: "var(--text-primary)", lineHeight: 1.1 }}>
            Ready to create<br />
            <span style={{
              background: "linear-gradient(135deg, var(--royal), var(--sky))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              together?
            </span>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--text-muted)", marginTop: 20, marginBottom: 56, maxWidth: 500, margin: "20px auto 56px" }}>
            I'm open to internships, freelance projects, and design collaborations. Let's build something meaningful.
          </p>
        </RevealSection>

        <RevealSection delay={0.2}>
          <motion.a
            href="mailto:Sasiharsha6602@gmail.com"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(26,110,245,0.5)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "18px 44px",
              borderRadius: 20,
              fontSize: 17,
              fontWeight: 700,
              color: "#fff",
              background: "linear-gradient(135deg, var(--royal), var(--sky))",
              boxShadow: "0 12px 40px rgba(26,110,245,0.45)",
              fontFamily: "var(--font-body)",
              marginBottom: 56,
              cursor: "pointer",
            }}
          >
            Send a message
            <span style={{ fontSize: 20 }}>→</span>
          </motion.a>
        </RevealSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
          {links.map((link, i) => (
            <RevealSection key={link.label} delay={0.3 + i * 0.1}>
              <TiltCard
                className="glass"
                style={{
                  borderRadius: 20,
                  padding: "24px 20px",
                  textAlign: "center",
                  display: "block",
                  textDecoration: "none",
                }}
              >
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(26,110,245,0.15)",
                    border: "1px solid rgba(26,110,245,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "var(--royal)",
                    margin: "0 auto 14px",
                  }}>
                    {link.icon}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>
                    {link.label}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500, wordBreak: "break-all" }}>
                    {link.value}
                  </div>
                </a>
              </TiltCard>
            </RevealSection>
          ))}
        </div>

        <RevealSection delay={0.8}>
          <div style={{ marginTop: 72, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.15)" }}>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
              © 2025 Sasidharan K. · Product & Industrial Designer · Virudhanagar, Tamil Nadu
            </p>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}
