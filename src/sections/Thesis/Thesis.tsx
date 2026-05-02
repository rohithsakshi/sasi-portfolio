"use client";
import React from "react";
import { AnimatedNumber } from "../../components/Visuals/AnimatedNumber";
import { RevealSection } from "../../components/RevealSection/RevealSection";
import { TiltCard } from "../../components/Visuals/TiltCard";
import styles from "./Thesis.module.scss";

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
    <section id="thesis" className={styles.thesisSection}>
      <div className={styles.thesisContainer}>
        <RevealSection>
          <div className={styles.header}>
            <span className="section-tag">Research</span>
            <h2 className={styles.title}>Thesis Work</h2>
            <p className={styles.subtitle}>
              Enhancing Extension Boxes Through Customer Wisdom — B.Des Thesis, LPU 2023
            </p>
          </div>
        </RevealSection>

        {/* Hero card */}
        <RevealSection>
          <TiltCard className={`${styles.heroCard} glass-strong`}>
            {/* Decorative blurs */}
            <div style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "var(--copper)",
              opacity: 0.05,
              filter: "blur(60px)",
              pointerEvents: "none"
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
              pointerEvents: "none"
            }} />

            <div className={styles.heroContent}>
              <div className={styles.mainInfo}>
                <span className={styles.tagline}>PID 431 · Lovely Professional University</span>
                <h3 className={styles.thesisTitle}>
                  Enhancing Extension Boxes Through Customer Wisdom
                </h3>
                <p className={styles.thesisDesc}>
                  A comprehensive research project addressing the design limitations of conventional extension boxes. 
                  Through user-centric methodology, the study proposes a foldable, expandable design that prioritizes portability and safety.
                </p>
                <div className={styles.badgeContainer}>
                  <span style={{
                    padding: "8px 18px",
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: 600,
                    background: "rgba(200, 117, 51, 0.08)",
                    border: "1px solid rgba(200, 117, 51, 0.2)",
                    color: "var(--copper)",
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
                    color: "var(--saddle-brown)",
                  }}>
                    2023 · Approved
                  </span>
                </div>
              </div>

              <div className={styles.findingsGrid}>
                {findings.map((f) => (
                  <TiltCard
                    key={f.label}
                    className={`${styles.findingCard} glass`}
                  >
                    <div className={styles.findingValue}>
                      <AnimatedNumber value={f.value} suffix={f.suffix} />
                    </div>
                    <div className={styles.findingLabel}>{f.label}</div>
                    <div className={styles.findingDesc}>{f.desc}</div>
                  </TiltCard>
                ))}
              </div>
            </div>
          </TiltCard>
        </RevealSection>

        {/* Process stages */}
        <div className={styles.stagesGrid}>
          {stages.map((stage, i) => (
            <RevealSection key={stage.title} delay={0.6 + i * 0.1}>
              <TiltCard
                className={`${styles.stageCard} glass`}
              >
                <div className={styles.stageNumber}>
                  {i + 1}
                </div>
                <h4 className={styles.stageTitle}>
                  {stage.title}
                </h4>
                <p className={styles.stageDesc}>{stage.desc}</p>
              </TiltCard>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}
