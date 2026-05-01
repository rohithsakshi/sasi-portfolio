"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = ["About", "Skills", "Projects", "Thesis", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
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
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: "72px",
        background: "var(--wheat, #F5DEB3)",
        boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
        transition: "all 0.4s ease",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{
        width: "100%",
        maxWidth: "1400px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}>
        <span
          style={{ 
            fontFamily: "var(--font-display)", 
            fontWeight: 800, 
            fontSize: "24px", 
            color: "var(--saddle-brown, #8B4513)", 
            letterSpacing: "-0.5px" 
          }}
        >
          SK.
        </span>

        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {links.map((link) => (
            <motion.button
              key={link}
              onClick={() => scrollTo(link)}
              whileHover={{ color: "var(--copper, #C87533)" }}
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "var(--saddle-brown, #8B4513)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-main)",
                transition: "color 0.3s ease-out",
                position: "relative",
              }}
            >
              {link}
            </motion.button>
          ))}
          <motion.a
            href="mailto:Sasiharsha6602@gmail.com"
            whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(200,117,51,0.4)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "12px 24px",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: "bold",
              color: "var(--saddle-brown, #8B4513)",
              background: "var(--cream, #FFFBF0)",
              border: "2px solid var(--copper, #C87533)",
              fontFamily: "var(--font-main)",
              textDecoration: "none",
              transition: "all 0.3s ease-out",
              cursor: "pointer",
            }}
          >
            Hire Me
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}
