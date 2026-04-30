"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const PARTS = [
  // Phillips head screw (top-left)
  { id: "screw", path: "M10,10 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0 M7,10 L13,10 M10,7 L10,13", start: { x: -150, y: -150, r: -90 }, target: { x: -35, y: -45, r: 0, s: 0.35 } },
  // Hinge plate (left)
  { id: "hinge", path: "M0,0 L12,0 L12,30 L0,30 Z M6,6 L6,6.1 M6,15 L6,15.1 M6,24 L6,24.1", start: { x: -200, y: 0, r: 45 }, target: { x: -55, y: 0, r: 0, s: 0.5 } },
  // Circular door knob (right)
  { id: "knob", path: "M20,20 m-12,0 a12,12 0 1,0 24,0 a12,12 0 1,0 -24,0 M20,20 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0", start: { x: 200, y: 50, r: 180 }, target: { x: 38, y: 15, r: 0, s: 0.4 } },
  // Thin frame rail (top)
  { id: "rail", path: "M0,0 L80,0 L80,4 L0,4 Z", start: { x: 0, y: -200, r: -10 }, target: { x: 0, y: -78, r: 0, s: 1 } },
  // Corner bracket (bottom-right)
  { id: "bracket", path: "M0,0 L20,0 L20,6 L6,6 L6,20 L0,20 Z", start: { x: 180, y: 180, r: 120 }, target: { x: 45, y: -72, r: 0, s: 0.6 } },
];

export const PortfolioLoader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisitedPortfolio_v2");
    if (hasVisited) {
      setIsVisible(false);
      return;
    }

    // Phase Timings
    const t1 = setTimeout(() => setPhase(1), 800);   // Snap into place & render frame
    const t2 = setTimeout(() => setPhase(2), 1600);  // Assembly complete pause
    const t3 = setTimeout(() => setPhase(3), 2000);  // Text reveal
    const t4 = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("hasVisitedPortfolio_v2", "true");
    }, 4500); // Wait longer to see the idle state

    return () => {
      [t1, t2, t3, t4].forEach(clearTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* ASSEMBLY CONTAINER */}
          <motion.div
            animate={phase >= 2 ? {
              y: [0, -4, 0],
              transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            } : {}}
            style={{ 
              position: "relative", 
              width: "200px", 
              height: "260px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              marginTop: "-10vh" // Upper third placement
            }}
          >
            
            {/* DOOR FRAME OUTLINE */}
            <motion.svg
              viewBox="0 0 100 160"
              style={{
                position: "absolute",
                width: "100px",
                height: "160px",
                overflow: "visible",
              }}
            >
              {/* Main Frame */}
              <motion.rect
                x="0" y="0" width="100" height="160"
                fill="none"
                stroke="#666"
                strokeWidth="0.75"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={phase >= 1 ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              
              {/* Vertical Panels */}
              <motion.path
                d="M10,10 L10,150 M50,10 L50,150 M90,10 L90,150"
                fill="none"
                stroke="#444"
                strokeWidth="0.5"
                initial={{ pathLength: 0 }}
                animate={phase >= 1 ? { pathLength: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              />

              {/* Horizontal Divider */}
              <motion.line
                x1="10" y1="80" x2="90" y2="80"
                stroke="#444"
                strokeWidth="0.5"
                initial={{ scaleX: 0 }}
                animate={phase >= 1 ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              />

              {/* Corner Marks (Small Squares) */}
              {[
                { x: -2, y: -2 }, { x: 98, y: -2 },
                { x: -2, y: 158 }, { x: 98, y: 158 }
              ].map((pos, i) => (
                <motion.rect
                  key={i}
                  x={pos.x} y={pos.y} width="4" height="4"
                  fill="none"
                  stroke="#555"
                  strokeWidth="0.5"
                  initial={{ opacity: 0 }}
                  animate={phase >= 1 ? { opacity: 1 } : {}}
                  transition={{ delay: 0.8 + i * 0.05 }}
                />
              ))}
            </motion.svg>

            {/* HARDWARE PARTS */}
            {PARTS.map((part, i) => (
              <motion.div
                key={part.id}
                style={{ position: "absolute" }}
                initial={{ 
                  x: part.start.x, 
                  y: part.start.y, 
                  rotate: part.start.r, 
                  opacity: 0 
                }}
                animate={phase === 0 ? {
                  x: [part.start.x, part.start.x + 5, part.start.x],
                  y: [part.start.y, part.start.y - 8, part.start.y],
                  rotate: [part.start.r, part.start.r + 3, part.start.r],
                  opacity: 1,
                  transition: {
                    x: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.6, delay: i * 0.12 }
                  }
                } : {
                  x: part.target.x,
                  y: part.target.y,
                  rotate: part.target.r,
                  scale: part.target.s,
                  opacity: 1,
                  transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } // Snappy ease
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" style={{ overflow: "visible" }}>
                  <path
                    d={part.path}
                    fill="none"
                    stroke="#888"
                    strokeWidth="1.5"
                  />
                </svg>
              </motion.div>
            ))}
          </motion.div>

          {/* TEXT REVEAL SECTION */}
          <div style={{ height: "80px", marginTop: "10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ textAlign: "center" }}
            >
              <h1 style={{ 
                fontSize: "1.4rem", 
                letterSpacing: "0.5em", 
                fontWeight: 300, 
                color: "#e0e0e0",
                margin: 0,
                textTransform: "uppercase"
              }}>
                Sasidharan K.
              </h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={phase >= 3 ? { opacity: 1 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ 
                  fontSize: "0.65rem", 
                  letterSpacing: "0.4em", 
                  color: "#777", 
                  marginTop: "12px",
                  textTransform: "uppercase",
                  fontWeight: 400
                }}
              >
                Product Designer
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
