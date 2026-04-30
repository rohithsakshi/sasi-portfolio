"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import styles from "./Hero.module.scss";
import { useCursor } from "../../components/Cursor/CursorProvider";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const charVariants: Variants = {
    hidden: { y: 60, opacity: 0, rotateX: 90 },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as any }
    }
  };

  const portraitVariants: Variants = {
    initial: { opacity: 0, x: 100 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] as any }
    }
  };

  const nameString = "Sasidharan";
  const { setCursorVariant } = useCursor();

  return (
    <section className={styles.hero} ref={containerRef} id="about">
      {/* LAYER 1: BACKGROUND */}
      <div className={styles.bgLayers}>
        <div className={styles.noiseOverlay} />
      </div>

      {/* LAYER 2: BACKGROUND TYPOGRAPHY */}
      <motion.div 
        className={styles.bgTypography}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        SASI
      </motion.div>

      {/* LAYER 3: FOREGROUND CONTENT */}
      <div className={styles.foreground}>
        <div className={styles.leftColumn}>
          {/* Role Badge */}
          <motion.div 
            className={styles.roleBadge}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <span className={styles.badgeLine} />
            <span className={styles.badgeText}>INDUSTRIAL & PRODUCT DESIGNER</span>
          </motion.div>

          {/* Giant Name Split Characters */}
          <motion.h1 
            className={styles.giantName}
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.04, delayChildren: 0.8 } }
            }}
            style={{ perspective: 1000 }}
          >
            <div className={styles.nameLine} style={{ display: "flex", flexWrap: "wrap" }}>
              {nameString.split("").map((char, i) => (
                <motion.span 
                  key={i} 
                  variants={charVariants}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <div className={styles.nameLine} style={{ display: "flex" }}>
              {"K.".split("").map((char, i) => (
                <motion.span 
                  key={i} 
                  variants={charVariants}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            className={styles.tagline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
          >
            <span className={styles.highlightText}>I transform ideas into functional and visually strong design experiences.</span><br />
            My goal is to create products that are both <span className={styles.serif}>beautiful and purposeful.</span>
          </motion.p>

          {/* CTA Row */}
          <motion.div 
            className={styles.ctaRow}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <button 
              className={styles.primaryBtn}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              View Work &rarr;
            </button>
            <button 
              className={styles.ghostBtn}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              Download CV
            </button>
          </motion.div>

          {/* Stat Pills */}
          <motion.div 
            className={styles.statPills}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div className={styles.pill}><span>5+</span> Projects</div>
            <div className={styles.pill}><span>01</span> Patent</div>
            <div className={styles.pill}><span>B.Des</span> LPU</div>
          </motion.div>
        </div>

        {/* Right Side - Portrait */}
        <motion.div 
          className={styles.portraitContainer}
          variants={portraitVariants}
          initial="initial"
          animate="animate"
        >
          <div className={styles.imageWrapper}>
            <Image 
              src="/sasi.png" 
              alt="Sasidharan K." 
              fill 
              priority 
              className={styles.portrait}
            />
            <div className={styles.gradientMaskLeft} />
            <div className={styles.gradientMaskBottom} />
          </div>
        </motion.div>
      </div>

      {/* FLOATING GLASS CARDS */}
      <motion.div 
        className={`${styles.glassCard} ${styles.patentCard}`}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 1.8 }}
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <div className={styles.cardEyebrow}>PATENT HOLDER</div>
        <div className={styles.cardTitle}>FlexiBox</div>
        <div className={styles.cardSubtitle}>Expandable Extension Box System</div>
        <div className={styles.dotGrid}>
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`${styles.dot} ${i < 5 ? styles.active : ""}`} />
          ))}
        </div>
      </motion.div>

      <motion.div 
        className={`${styles.glassCard} ${styles.educationCard}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.9 }}
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <div className={styles.cardEyebrow}>EDUCATION</div>
        <div className={styles.cardTitle}>Bachelor of Design — Product & Industrial</div>
        <div className={styles.cardSubtitle}>Lovely Professional University</div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} />
        </div>
      </motion.div>

      {/* SIDEBARS */}
      <motion.div 
        className={styles.leftSidebar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
      >
        <div className={styles.verticalLine} />
        <div className={styles.socialLinks}>
          <a href="#">LinkedIn</a>
          <a href="#">Behance</a>
          <a href="#">Dribbble</a>
        </div>
      </motion.div>

      <motion.div 
        className={styles.rightSidebar}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollDot} />
          <div className={styles.scrollLine} />
        </div>
        <div className={styles.scrollText}>SCROLL</div>
      </motion.div>

      {/* EXPERIENCE BADGE */}
      <motion.div 
        className={styles.expBadge}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
      >
        <div className={styles.badgeCircle}>
          <div className={styles.badgeInner}>
            <span className={styles.num}>01</span>
            <span className={styles.label}>Patent</span>
          </div>
        </div>
        <div className={styles.badgeLabel}>Researcher & Innovator</div>
      </motion.div>
    </section>
  );
};

export default Hero;
