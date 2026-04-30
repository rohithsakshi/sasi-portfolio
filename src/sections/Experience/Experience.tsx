"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { RevealSection } from "../../components/RevealSection/RevealSection";
import { TiltCard } from "../../components/Visuals/TiltCard";
import { useCursor } from "../../components/Cursor/CursorProvider";

const timeline = [
  {
    type: "internship",
    title: "Graphic Design Intern",
    org: "Mystic Couture Pvt. Ltd.",
    location: "Coimbatore, IN",
    period: "May '22 – July '22",
    points: [
      "Designed posters for advertisement, invitations, and branding campaigns",
      "Collaborated with technical and event management teams on design briefs",
      "Achieved Best Intern of the Week for two consecutive weeks",
    ],
    award: "Best Intern × 2",
    color: "var(--royal)",
  },
  {
    type: "education",
    title: "B.Des in Product & Industrial Design",
    org: "Lovely Professional University",
    location: "Phagwara, IN",
    period: "Aug '20 – Present",
    points: [
      "Specialization in Product & Industrial Design",
      "Coursework in ergonomics, anthropometry, material science, and CAD",
      "Active participation in International Product Design Conference",
    ],
    award: "CGPA 5.35",
    color: "var(--sky)",
  },
  {
    type: "education",
    title: "Higher Secondary Education",
    org: "SFS Metric Higher Secondary School",
    location: "Virudhanagar, Tamil Nadu",
    period: "Jun '19 – Mar '20",
    points: ["Completed higher secondary with 82% aggregate"],
    award: "82%",
    color: "var(--slate)",
  },
];

const achievements = [
  { title: "1st Position", event: "Poster Design Competition", org: "Mystic Couture", year: "Mar '22" },
  { title: "Poster Award", event: "Poster Design for BLOOD Organization", org: "BLOOD Org", year: "Jul '22" },
  { title: "Volunteer", event: "International Conference on Product Design", org: "LPU", year: "Nov '22" },
];

export default function Experience() {
  const { setCursorVariant } = useCursor();

  return (
    <section id="experience" style={{ padding: "120px 24px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <RevealSection>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <span className="section-tag">Journey</span>
            <h2 style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 800, letterSpacing: -1, marginTop: 12, color: "var(--text-primary)" }}>
              Experience & Education
            </h2>
          </div>
        </RevealSection>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }}>
          {/* Timeline */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute",
              left: 20,
              top: 0,
              bottom: 0,
              width: 1,
              background: "rgba(255,255,255,0.2)",
            }} />
            {timeline.map((item, i) => (
              <RevealSection key={item.title} delay={i * 0.1}>
                <div style={{ display: "flex", gap: 28, marginBottom: 32, position: "relative" }}>
                  {/* Dot */}
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: item.color,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                    boxShadow: `0 0 20px ${item.color}60`,
                    fontSize: 14,
                  }}>
                    {item.type === "internship" ? "💼" : "🎓"}
                  </div>

                  <TiltCard
                    className="glass"
                    style={{ borderRadius: 24, padding: "28px 32px", flex: 1 }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>{item.title}</h3>
                        <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 4 }}>{item.org} · {item.location}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{
                          fontSize: 12,
                          fontWeight: 600,
                          padding: "4px 12px",
                          borderRadius: 8,
                          background: `${item.color}22`,
                          color: item.color,
                          border: `1px solid ${item.color}44`,
                          display: "block",
                          marginBottom: 4,
                        }}>
                          {item.award}
                        </span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.period}</span>
                      </div>
                    </div>
                    <ul style={{ paddingLeft: 16 }}>
                      {item.points.map((p) => (
                        <li key={p} style={{ fontSize: 14, lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 4 }}>{p}</li>
                      ))}
                    </ul>
                  </TiltCard>
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Achievements */}
          <div>
            <RevealSection>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-display)", marginBottom: 20 }}>
                Achievements
              </h3>
            </RevealSection>
            {achievements.map((a, i) => (
              <RevealSection key={a.title} delay={0.4 + i * 0.1}>
                <TiltCard
                  className="glass"
                  style={{ borderRadius: 20, padding: "24px", marginBottom: 16 }}
                >
                  <div style={{
                    fontSize: 20,
                    fontWeight: 800,
                    fontFamily: "var(--font-display)",
                    background: "linear-gradient(135deg, var(--royal), var(--sky))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: 8,
                  }}>
                    {a.title}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 4 }}>{a.event}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{a.org} · {a.year}</div>
                </TiltCard>
              </RevealSection>
            ))}

            {/* Certifications */}
            <RevealSection delay={0.8}>
              <TiltCard
                className="glass"
                style={{ borderRadius: 20, padding: "24px", marginTop: 8 }}
              >
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", fontFamily: "var(--font-display)", marginBottom: 16 }}>
                  Certifications
                </h4>
                {[
                  { name: "Poster Design", org: "Udemy", year: "Jul '21" },
                  { name: "Healthcare Academics", org: "BLOOD Camp", year: "Dec '21" },
                ].map((cert) => (
                  <div key={cert.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>{cert.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{cert.org}</div>
                    </div>
                    <span style={{
                      fontSize: 11,
                      padding: "3px 10px",
                      borderRadius: 6,
                      background: "rgba(255,255,255,0.2)",
                      color: "var(--text-muted)",
                    }}>{cert.year}</span>
                  </div>
                ))}
              </TiltCard>
            </RevealSection>
          </div>
        </div>
      </div>
    </section>
  );
}
