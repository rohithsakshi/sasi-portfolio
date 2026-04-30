"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const PARTS = [
  // Phillips Screw
  { id: "screw", path: "M5,10 L15,10 M10,5 L10,15 M10,10 m-7,0 a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0", initial: { x: -80, y: -90, r: -120 }, target: { x: 35, y: 45, r: 0, s: 0.4 } },
  // Hinge Plate
  { id: "hinge", path: "M0,0 L12,0 L12,25 L0,25 Z M6,5 L6,5.1 M6,12.5 L6,12.6 M6,20 L6,20.1", initial: { x: 130, y: -60, r: 45 }, target: { x: -48, y: 15, r: 0, s: 0.6 } },
  // Door Handle Silhouette
  { id: "handle", path: "M0,10 L15,10 L15,0 M15,10 L15,40 M15,10 L5,10", initial: { x: -140, y: 120, r: 200 }, target: { x: 42, y: 40, r: 0, s: 0.5 } },
  // Frame Rail
  { id: "rail", path: "M0,0 L4,0 L4,80 L0,80 Z", initial: { x: 160, y: 140, r: -30 }, target: { x: -45, y: 0, r: 0, s: 0.8 } },
  // Corner Bracket
  { id: "bracket", path: "M0,0 L15,0 L15,4 L4,4 L4,15 L0,15 Z", initial: { x: -40, y: 160, r: -90 }, target: { x: 40, y: -65, r: 0, s: 0.7 } },
];

export const PortfolioLoader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [stage, setStage] = useState<"float" | "assemble" | "exit">("float");

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedPortfolio");
    if (hasVisited) {
      setIsVisible(false);
      return;
    }

    const assembleTimer = setTimeout(() => setStage("assemble"), 1200);
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("hasVisitedPortfolio", "true");
    }, 3500);

    return () => {
      clearTimeout(assembleTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "var(--background)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative", width: "300px", height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            
            {/* STAGE 2: DOOR OUTLINE (Blueprint) */}
            <motion.svg
              viewBox="0 0 100 160"
              style={{
                position: "absolute",
                width: "100px",
                height: "160px",
                overflow: "visible",
              }}
            >
              <motion.rect
                x="0" y="0" width="100" height="160"
                fill="none"
                stroke="var(--white)"
                strokeWidth="0.75"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={stage !== "float" ? { pathLength: 1, opacity: 0.4 } : {}}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.path
                d="M10,10 L90,10 L90,150 L10,150 Z"
                fill="none"
                stroke="var(--white)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={stage !== "float" ? { pathLength: 1, opacity: 0.2 } : {}}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
            </motion.svg>

            {/* STAGE 1: FLOATING HARDWARE */}
            {PARTS.map((part, i) => (
              <motion.div
                key={part.id}
                style={{ position: "absolute" }}
                initial={{ 
                  x: part.initial.x, 
                  y: part.initial.y, 
                  rotate: part.initial.r, 
                  opacity: 0 
                }}
                animate={stage === "float" ? {
                  x: [part.initial.x, part.initial.x + 10, part.initial.x],
                  y: [part.initial.y, part.initial.y - 15, part.initial.y],
                  rotate: [part.initial.r, part.initial.r + 5, part.initial.r],
                  opacity: 1,
                  transition: {
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.8, delay: i * 0.2 }
                  }
                } : {
                  x: part.target.x,
                  y: part.target.y,
                  rotate: part.target.r,
                  scale: part.target.s,
                  opacity: 1,
                  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" style={{ overflow: "visible" }}>
                  <motion.path
                    d={part.path}
                    fill="none"
                    stroke="var(--white)"
                    strokeWidth="1.2"
                  />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* STAGE 3: TEXT REVEAL */}
          <div style={{ marginTop: "20px", height: "60px", overflow: "hidden" }}>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={stage !== "float" ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "center" }}
            >
              <h2 style={{ 
                fontSize: "1rem", 
                letterSpacing: "0.6em", 
                fontWeight: 400, 
                color: "var(--white)",
                margin: 0,
                textTransform: "uppercase",
                fontFamily: "var(--font-display)"
              }}>
                Sasidharan K.
              </h2>
              <p style={{ 
                fontSize: "0.6rem", 
                letterSpacing: "0.3em", 
                color: "var(--slate)", 
                marginTop: "10px",
                textTransform: "uppercase",
                fontWeight: 300
              }}>
                Product Designer
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
