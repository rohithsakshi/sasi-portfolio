"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "../Cursor/CursorProvider";

const links = ["About", "Skills", "Projects", "Thesis", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { setCursorVariant } = useCursor();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const target = document.getElementById(id.toLowerCase());
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else if (id === "About") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 20,
        left: "50%",
        translateX: "-50%",
        zIndex: 1000,
        width: "calc(100% - 48px)",
        maxWidth: 900,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 28px",
        borderRadius: 20,
        background: scrolled ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.1)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: scrolled ? "0 8px 40px rgba(26,110,245,0.15)" : "0 4px 20px rgba(0,0,0,0.08)",
        transition: "all 0.4s ease",
      }}
    >
      <motion.span
        style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--white)", letterSpacing: -0.5, cursor: "pointer" }}
        whileHover={{ scale: 1.05 }}
        onClick={() => scrollTo("About")}
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        SK<span style={{ color: "var(--royal)" }}>.</span>
      </motion.span>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {links.map((link) => (
          <motion.button
            key={link}
            onClick={() => scrollTo(link)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            style={{
              padding: "8px 16px",
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 500,
              color: "var(--light-blue)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-main)",
              transition: "all 0.2s",
            }}
          >
            {link}
          </motion.button>
        ))}
        <motion.a
          href="mailto:Sasiharsha6602@gmail.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
          style={{
            padding: "9px 20px",
            borderRadius: 12,
            fontSize: 13,
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg, var(--royal), var(--sky))",
            boxShadow: "0 4px 16px rgba(26,110,245,0.4)",
            fontFamily: "var(--font-main)",
          }}
        >
          Hire Me
        </motion.a>
      </div>
    </motion.nav>
  );
}
