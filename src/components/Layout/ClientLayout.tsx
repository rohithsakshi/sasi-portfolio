"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { CursorProvider } from "../Cursor/CursorProvider";
import { Cursor } from "../Cursor/Cursor";
import { PortfolioLoader } from "../Navigation/PortfolioLoader";
import { ReactNode } from "react";

export const ClientLayout = ({ children }: { children: ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <CursorProvider>
      <PortfolioLoader />
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, var(--royal), var(--sky))",
          transformOrigin: "0%",
          zIndex: 10001,
          scaleX,
        }}
      />
      <Cursor />
      {children}
    </CursorProvider>
  );
};
