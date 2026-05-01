"use client";

import React, { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rotation = 0;

    const handleScroll = () => {
      if (!containerRef.current || !orbitRef.current) return;

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      
      // Calculate how far down the section is
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        // Orbit speed tied to scroll depth
        rotation += scrollDelta * 0.1;
        orbitRef.current.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        
        // Counter-rotate the skill nodes so text stays upright
        const nodes = orbitRef.current.querySelectorAll('.skillNode');
        nodes.forEach((node) => {
          (node as HTMLElement).style.transform = `translate(-50%, -50%) rotate(${-rotation}deg)`;
        });

        // Sequential fade for summary text based on scroll position within section
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
    handleScroll(); // Init

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section 
      id="skills" 
      ref={containerRef}
      style={{ 
        position: "relative", 
        padding: "150px 24px", 
        backgroundColor: "var(--wheat)",
        minHeight: "120vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden"
      }}
    >
      {/* ORBITAL REVEAL LAYOUT */}
      <div 
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          margin: "0 auto 100px auto",
        }}
      >
        {/* Center Badge */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "120px",
            height: "120px",
            backgroundColor: "var(--wheat)",
            border: "2px solid var(--saddle-brown)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            boxShadow: "0 10px 30px rgba(139, 69, 19, 0.15)"
          }}
        >
          <span style={{ 
            fontFamily: "var(--font-display)", 
            fontSize: "42px", 
            fontWeight: 700, 
            color: "var(--saddle-brown)",
            letterSpacing: "-0.05em"
          }}>
            SK
          </span>
        </div>

        {/* Orbiting Ring */}
        <div
          ref={orbitRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "1px dashed rgba(139, 69, 19, 0.3)",
          }}
        >
          {skillsList.map((skill, index) => {
            const angle = (index / skillsList.length) * 360;
            const radius = 150; // Half of width/height
            // Calculate initial positions
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
                  padding: "10px 16px",
                  borderRadius: "100px",
                  whiteSpace: "nowrap",
                  fontFamily: "var(--font-main)",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--saddle-brown)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  boxShadow: "0 4px 12px rgba(139, 69, 19, 0.1)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                  cursor: "default"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--copper)";
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(200, 117, 51, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--saddle-brown)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(139, 69, 19, 0.1)";
                }}
              >
                {skill}
              </div>
            );
          })}
        </div>
      </div>

      {/* SEQUENTIAL TEXT SUMMARY */}
      <div style={{ maxWidth: "800px", textAlign: "center", marginTop: "40px" }}>
        {summaryText.map((text, i) => (
          <p
            key={i}
            ref={(el) => { textRefs.current[i] = el; }}
            style={{
              fontFamily: "var(--font-main)",
              fontSize: "clamp(18px, 3vw, 28px)",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "var(--saddle-brown)",
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
              marginBottom: "10px",
            }}
          >
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
