"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TiltCard } from "../../components/Visuals/TiltCard";
import { RevealSection } from "../../components/RevealSection/RevealSection";

const skills = [
  { category: "Graphic Design", items: ["Logo Design", "Poster Design", "Packaging", "Branding"], icon: "✦", color: "var(--royal)" },
  { category: "CAD & Modeling", items: ["Analytical Drawing", "3D Modeling", "Technical Sketching", "Orthographic Views"], icon: "⬡", color: "var(--sky)" },
  { category: "Prototyping", items: ["Material Selection", "Fabrication", "Machining Tools", "Physical Prototyping"], icon: "◈", color: "var(--slate)" },
  { category: "Design Process", items: ["Design Thinking", "User Research", "Ergonomics", "Anthropometry"], icon: "◎", color: "var(--royal)" },
];

const tools = [
  { name: "Adobe Illustrator", level: 85 },
  { name: "Photoshop", level: 80 },
  { name: "Fusion 360", level: 70 },
  { name: "Figma", level: 75 },
  { name: "Sketching", level: 90 },
  { name: "User Research", level: 88 },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-secondary)" }}>{name}</span>
        <span style={{ fontSize: 12, color: "var(--royal)", fontWeight: 600 }}>{level}%</span>
      </div>
      <div style={{
        height: 6,
        borderRadius: 3,
        background: "rgba(255,255,255,0.2)",
        overflow: "hidden",
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "100%",
            borderRadius: 3,
            background: "linear-gradient(90deg, var(--royal), var(--sky))",
            boxShadow: "0 0 12px rgba(26,110,245,0.4)",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "120px 24px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span className="section-tag">Expertise</span>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 800, letterSpacing: -1, marginTop: 12, color: "var(--text-primary)" }}>
              Skills & Capabilities
            </h2>
          </div>
        </RevealSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 60 }}>
          {skills.map((skill, i) => (
            <RevealSection key={skill.category} delay={i * 0.05}>
              <TiltCard
                className="glass"
                style={{ borderRadius: 24, padding: "32px 28px", height: "100%" }}
              >
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: `rgba(26,110,245,0.12)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  color: skill.color,
                  marginBottom: 20,
                  border: `1px solid rgba(26,110,245,0.2)`,
                }}>
                  {skill.icon}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16, fontFamily: "var(--font-display)" }}>
                  {skill.category}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        padding: "5px 12px",
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.2)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </RevealSection>
          ))}
        </div>

        {/* Proficiency bars */}
        <RevealSection>
          <TiltCard
            className="glass-strong"
            style={{ borderRadius: 28, padding: "48px 48px" }}
          >
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)", marginBottom: 32, fontFamily: "var(--font-display)" }}>
              Proficiency Levels
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0 60px" }}>
              {tools.map((tool, i) => (
                <SkillBar key={tool.name} name={tool.name} level={tool.level} delay={0.1 * i} />
              ))}
            </div>
          </TiltCard>
        </RevealSection>
      </div>
    </section>
  );
}
