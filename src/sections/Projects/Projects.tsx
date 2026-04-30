"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TiltCard } from "../../components/Visuals/TiltCard";
import { RevealSection } from "../../components/RevealSection/RevealSection";
import { useCursor } from "../../components/Cursor/CursorProvider";

const projects = [
  {
    id: 1,
    title: "Portable Air Conditioner",
    domain: "Domestic Sector",
    type: "Team Project",
    year: "Jul–Nov '22",
    description: "Redesigned a static air cooler into a fully portable unit. Conducted user surveys and interviews to identify pain points. Applied ergonomics and anthropometry principles in prototyping.",
    tags: ["Ergonomics", "User Research", "Prototyping", "CAD"],
    color: "var(--royal)",
    icon: "❄",
    highlights: ["80+ user surveys", "Ergonomic prototype", "Anthropometry applied"],
  },
  {
    id: 2,
    title: "Shoe & Slipper Stand",
    domain: "Domestic Sector",
    type: "Individual Project",
    year: "Sept '22",
    description: "Detailed competitive analysis of existing products. User interviews and surveys to identify pain points. Innovated a new design concept and brought it to prototype stage.",
    tags: ["Product Design", "User Interviews", "Fabrication", "Innovation"],
    color: "var(--sky)",
    icon: "👟",
    highlights: ["Competitive analysis", "Individual prototype", "User-validated"],
  },
  {
    id: 3,
    title: "Extension Box Redesign",
    domain: "Consumer Electronics",
    type: "Thesis Project",
    year: "2023",
    description: "Research-driven redesign of extension boxes. Surveyed 80 participants across diverse backgrounds. Created expandable, foldable, portable design with multiple pin configurations.",
    tags: ["Thesis", "User Research", "Smart Design", "Portability"],
    color: "#607080",
    icon: "⚡",
    highlights: ["80 participants", "Foldable design", "3-stage expandable"],
  },
];

export default function Projects() {
  const [active, setActive] = useState<number | null>(null);
  const { setCursorVariant } = useCursor();

  return (
    <section id="projects" style={{ padding: "120px 24px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span className="section-tag">Work</span>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 800, letterSpacing: -1, marginTop: 12, color: "var(--text-primary)" }}>
              Featured Projects
            </h2>
          </div>
        </RevealSection>

        <div style={{ display: "grid", gap: 24 }}>
          {projects.map((project, i) => (
            <RevealSection key={project.id} delay={i * 0.1}>
              <TiltCard
                className="glass"
                onClick={() => setActive(active === project.id ? null : project.id)}
                style={{
                  borderRadius: 28,
                  padding: "36px 40px",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  borderLeft: `3px solid ${project.color}`,
                }}
              >
                {/* Glow accent */}
                <div style={{
                  position: "absolute",
                  top: -40,
                  right: -40,
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background: project.color,
                  opacity: 0.06,
                  filter: "blur(40px)",
                  pointerEvents: "none",
                }} />

                <div style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: 18,
                    background: `${project.color}22`,
                    border: `1px solid ${project.color}44`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    flexShrink: 0,
                  }}>
                    {project.icon}
                  </div>

                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
                      <h3 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>
                        {project.title}
                      </h3>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "4px 12px",
                        borderRadius: 8,
                        background: `${project.color}20`,
                        color: project.color,
                        border: `1px solid ${project.color}40`,
                        letterSpacing: "0.05em",
                      }}>
                        {project.type}
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16, fontWeight: 500 }}>
                      {project.domain} · {project.year}
                    </p>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 20 }}>
                      {project.description}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
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
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>
                    {project.highlights.map((h) => (
                      <div
                        key={h}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          fontSize: 13,
                          color: "var(--text-muted)",
                          fontWeight: 500,
                        }}
                      >
                        <span style={{ color: project.color, fontWeight: 700 }}>✓</span>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
