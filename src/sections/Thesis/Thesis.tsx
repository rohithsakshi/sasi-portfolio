"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedNumber } from "../../components/Visuals/AnimatedNumber";
import { RevealSection } from "../../components/RevealSection/RevealSection";
import { TiltCard } from "../../components/Visuals/TiltCard";

const findings = [
  { value: "80", suffix: "+", label: "Survey Participants", desc: "Diverse age groups, occupations, locations" },
  { value: "85", suffix: "%", label: "Portability Issues", desc: "Users cited non-portability as major problem" },
  { value: "57", suffix: "%", label: "Size Concerns", desc: "Reported existing products as too large" },
  { value: "70", suffix: "%", label: "Prefer Compact", desc: "Users wanted a compact foldable version" },
];

const stages = [
  { title: "Research", desc: "Literature review + user surveys and interviews" },
  { title: "Ideation", desc: "Sketching, image analysis of existing products" },
  { title: "3D Modeling", desc: "Multi-view CAD model with expandable mechanism" },
  { title: "Validation", desc: "Plagiarism check, peer feedback, iteration" },
];

export default function Thesis() {
  return (
    <section id="thesis" style={{ padding: "120px 24px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span className="section-tag">Research</span>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 800, letterSpacing: -1, marginTop: 12, color: "var(--text-primary)" }}>
              Thesis Work
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-muted)", marginTop: 16, maxWidth: 600, margin: "16px auto 0" }}>
              Enhancing Extension Boxes Through Customer Wisdom — B.Des Thesis, LPU 2023
            </p>
          </div>
        </RevealSection>

        {/* Hero card */}
        <RevealSection>
          <TiltCard
            className="glass-strong"
            style={{
              borderRadius: 32,
              padding: "56px 56px",
              marginBottom: 32,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "var(--royal)",
              opacity: 0.05,
              filter: "blur(60px)",
            }} />
            <div style={{
              position: "absolute",
              bottom: -60,
              left: -60,
              width: 240,
              height: 240,
              borderRadius: "50%",
              background: "var(--sky)",
              opacity: 0.05,
              filter: "blur(50px)",
            }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
              <div>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--royal)",
                  display: "block",
                  marginBottom: 16,
                }}>PID 431 · Lovely Professional University</span>
                <h3 style={{ fontSize: 28, fontWeight: 800, color: "var(--text-primary)", fontFamily: "var(--font-display)", lineHeight: 1.2, marginBottom: 20 }}>
                  Enhancing Extension Boxes Through Customer Wisdom
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: 28 }}>
                  A comprehensive research project addressing the design limitations of conventional extension boxes. 
                  Through user-centric methodology, the study proposes a foldable, expandable design that prioritizes portability and safety.
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{
                    padding: "8px 18px",
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: 600,
                    background: "rgba(26,110,245,0.15)",
                    border: "1px solid rgba(26,110,245,0.3)",
                    color: "var(--royal)",
                  }}>
                    Supervisor: Prof. Raghuraman M.
                  </span>
                  <span style={{
                    padding: "8px 18px",
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: 600,
                    background: "rgba(255,255,255,0.2)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "var(--text-muted)",
                  }}>
                    2023 · Approved
                  </span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {findings.map((f, i) => (
                  <TiltCard
                    key={f.label}
                    className="glass"
                    style={{ borderRadius: 20, padding: "24px 20px", textAlign: "center" }}
                  >
                    <div style={{
                      fontSize: 32,
                      fontWeight: 800,
                      fontFamily: "var(--font-display)",
                      background: "linear-gradient(135deg, var(--royal), var(--sky))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      marginBottom: 8,
                    }}>
                      <AnimatedNumber value={f.value} suffix={f.suffix} />
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>{f.label}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5 }}>{f.desc}</div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </TiltCard>
        </RevealSection>

        {/* Process stages */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          {stages.map((stage, i) => (
            <RevealSection key={stage.title} delay={0.6 + i * 0.1}>
              <TiltCard
                className="glass"
                style={{ borderRadius: 20, padding: "28px 24px", height: "100%" }}
              >
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, var(--royal), var(--sky))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 800,
                  color: "white",
                  marginBottom: 16,
                  fontFamily: "var(--font-display)",
                }}>
                  {i + 1}
                </div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, fontFamily: "var(--font-display)" }}>
                  {stage.title}
                </h4>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--text-muted)" }}>{stage.desc}</p>
              </TiltCard>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
