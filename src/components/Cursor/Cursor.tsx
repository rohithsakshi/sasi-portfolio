"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useCursor } from "./CursorProvider";

export const Cursor = () => {
  const { cursorVariant } = useCursor();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  const variants = {
    default: {
      height: 24,
      width: 24,
      backgroundColor: "var(--copper)",
      mixBlendMode: "normal" as const,
      filter: "blur(4px)",
      opacity: 0.8,
    },
    hover: {
      height: 80,
      width: 80,
      backgroundColor: "var(--copper)",
      opacity: 0.2,
      filter: "blur(0px)",
      mixBlendMode: "difference" as const,
    }
  };

  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none",
        zIndex: 9999,
        borderRadius: "50%",
      }}
      variants={variants}
      animate={cursorVariant === "hover" ? "hover" : "default"}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    />
  );
};
