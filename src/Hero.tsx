"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = ["Design Thinking", "Prototyping", "User Research", "3D Modeling", "Branding"];

function AnimatedWord({ word, index }: { word: string; index: number }) {
  return (
    <motion.span
      key={word}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
      transition={{
        duration: 2.5,
        delay: index * 2.5,
        repeat: Infinity,
        repeatDelay: words.length * 2.5 - 2.5,
        ease: "easeInOut",
      }}
      style={{ position: "absolute", left: 0 }}
    >
      {word}
    </motion.span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <motion.section
      ref={ref}
      id="about"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 10,
        padding: "120px 24px 60px",
      }}
    >
      <motion.div style={{ y, opacity, textAlign: "center", maxWidth: 800 }}>
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            margin: "0 auto 32px",
            background: "linear-gradient(135deg, var(--royal), var(--sky))",
            padding: 3,
            boxShadow: "0 0 60px rgba(26,110,245,0.5)",
          }}
        >
          <div style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            color: "white",
          }}>
            SK
          </div>
        </motion.div>

        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 100,
            background: "rgba(26,110,245,0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(26,110,245,0.3)",
            marginBottom: 28,
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--royal)", boxShadow: "0 0 8px var(--royal)" }} />
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", color: "var(--royal)", textTransform: "uppercase" }}>
            Product & Industrial Designer
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(56px, 10vw, 96px)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: -2,
            color: "var(--text-primary)",
            marginBottom: 16,
          }}
        >
          Sasidharan
          <span style={{
            display: "block",
            background: "linear-gradient(135deg, var(--royal) 0%, var(--sky) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            K.
          </span>
        </motion.h1>

        {/* Rotating skills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{
            fontSize: 20,
            fontWeight: 500,
            color: "var(--text-muted)",
            marginBottom: 40,
            height: 32,
            position: "relative",
            display: "inline-block",
            minWidth: 200,
          }}
        >
          {words.map((w, i) => <AnimatedWord key={w} word={w} index={i} />)}
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          style={{
            fontSize: 17,
            lineHeight: 1.75,
            color: "var(--text-secondary)",
            maxWidth: 560,
            margin: "0 auto 48px",
          }}
        >
          Passionate designer who transforms problems into elegant solutions through empathy, 
          research, and precision craft. Currently pursuing B.Des at Lovely Professional University.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 12px 40px rgba(26,110,245,0.5)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "16px 36px",
              borderRadius: 16,
              fontSize: 15,
              fontWeight: 600,
              color: "#fff",
              background: "linear-gradient(135deg, var(--royal), var(--sky))",
              boxShadow: "0 8px 32px rgba(26,110,245,0.4)",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
            }}
          >
            View Projects →
          </motion.button>
          <motion.a
            href="/Sasidharan_CV.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: "16px 36px",
              borderRadius: 16,
              fontSize: 15,
              fontWeight: 600,
              color: "var(--text-primary)",
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              display: "inline-block",
            }}
          >
            Download CV
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40 }}
        >
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/sasidharan", icon: "in" },
            { label: "Behance", href: "https://www.behance.net/sasidharan14", icon: "Bē" },
            { label: "Email", href: "mailto:Sasiharsha6602@gmail.com", icon: "@" },
          ].map((s) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.35)",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--text-primary)",
                fontFamily: "var(--font-body)",
              }}
            >
              {s.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ marginTop: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
        >
          <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--royal), transparent)", borderRadius: 1 }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
