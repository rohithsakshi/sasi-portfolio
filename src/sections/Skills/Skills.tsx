"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Skills.module.scss";

const skillsList = [
  "CAD Design",
  "Prototyping",
  "Design Thinking",
  "Fabrication",
  "User Research",
  "Branding",
];

const summaryText = [
  "I am an industrial designer who believes that form follows function.",
  "With a deep focus on manufacturing constraints, ergonomics, and aesthetic purity,",
  "I engineer solutions that elevate everyday interactions.",
  "My process is grounded in physical prototyping and critical analysis."
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    let lastScrollY = window.scrollY;
    let rotation = 0;

    const handleScroll = () => {
      if (!containerRef.current || !orbitRef.current) return;

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        rotation += scrollDelta * 0.1;
        orbitRef.current.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        
        const nodes = orbitRef.current.querySelectorAll('.skillNode');
        nodes.forEach((node) => {
          (node as HTMLElement).style.transform = `translate(-50%, -50%) rotate(${-rotation}deg)`;
        });

        const sectionProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / rect.height));
        
        textRefs.current.forEach((el, index) => {
          if (!el) return;
          const triggerPoint = 0.3 + (index * 0.1);
          if (sectionProgress > triggerPoint) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          } else {
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
          }
        });
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <section id="skills" ref={containerRef} className={styles.skillsSection}>
      <div className={styles.orbitRevealLayout}>
        {/* Center Badge */}
        <div className={styles.centerBadge}>
          <span className={styles.centerBadgeText}>SK</span>
        </div>

        {/* Orbiting Ring */}
        <div ref={orbitRef} className={styles.orbitingRing}>
          {skillsList.map((skill, index) => {
            const angle = (index / skillsList.length) * 360;
            const radius = isMobile ? 100 : 150; 
            const rad = (angle * Math.PI) / 180;
            const x = Math.round(Math.cos(rad) * radius + radius);
            const y = Math.round(Math.sin(rad) * radius + radius);

            return (
              <div
                key={skill}
                className="skillNode"
                style={{
                  position: "absolute",
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "var(--cream)",
                  border: "1px solid var(--saddle-brown)",
                  padding: isMobile ? "8px 12px" : "10px 16px",
                  borderRadius: "100px",
                  whiteSpace: "nowrap",
                  fontFamily: "var(--font-main)",
                  fontSize: isMobile ? "10px" : "12px",
                  fontWeight: 600,
                  color: "var(--saddle-brown)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  boxShadow: "0 4px 12px rgba(139, 69, 19, 0.1)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  cursor: "default"
                }}
              >
                {skill}
              </div>
            );
          })}
        </div>
      </div>

      {/* SEQUENTIAL TEXT SUMMARY */}
      <div className={styles.summaryTextContainer}>
        {summaryText.map((text, i) => (
          <p
            key={i}
            ref={(el) => { textRefs.current[i] = el; }}
            className={styles.summaryPara}
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
