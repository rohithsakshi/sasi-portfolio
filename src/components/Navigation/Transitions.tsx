"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const PageTransition = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) {
      setIsVisible(false);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("hasVisited", "true");
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "var(--copper)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              fontSize: "4rem",
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.05em",
            }}
          >
            SK.
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const ScrollProgress = () => {
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "var(--copper)",
        transformOrigin: "0%",
        zIndex: 10001,
        scaleX: 0, // Will be controlled by useScroll in layout or here
      }}
    />
  );
};
