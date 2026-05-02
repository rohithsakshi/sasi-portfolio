"use client";

import React from "react";
import styles from "./DesignPrinciples.module.scss";

// Image Paths
const sketchImg = "/image1.png";
const stickyImg = "/image2.png";
const handHoldImg = "/image4.png";
const adapterFloatImg = "/image3.png";
const pluggedInImg = "/image5.png";

export default function DesignPrinciples() {
  return (
    <section className={styles.dpSection}>
      {/* Background Typography */}
      <span className={styles.dpBgTop} aria-hidden="true">DESIGN</span>
      <span className={styles.dpBgBottom} aria-hidden="true">PRINCIPLES</span>

      <div className={styles.dpCanvas}>

        {/* --- IMAGE SYSTEM (STRICT PLACEMENT & SCALE) --- */}

        {/* Sketch (Top Left) */}
        <div className={`${styles.dpImg} ${styles.img1} ${styles.smallImg}`}>
          <img src={sketchImg} alt="Sketching product designs" />
        </div>

        {/* MAIN (Hand holding cube - dominant) */}
        <div className={`${styles.dpImg} ${styles.img2} ${styles.largeImg}`}>
          <img src={handHoldImg} alt="Main product hand-held focal point" />
        </div>

        {/* Sticky Notes (Top Center) */}
        <div className={`${styles.dpImg} ${styles.img3} ${styles.mediumImg}`}>
          <img src={stickyImg} alt="Ideation process" />
        </div>

        {/* Floating Cube (Top Right) */}
        <div className={`${styles.dpImg} ${styles.img4} ${styles.mediumImg}`}>
          <img src={adapterFloatImg} alt="Floating product render" />
        </div>

        {/* Plug (Bottom Right) */}
        <div className={`${styles.dpImg} ${styles.img5} ${styles.smallImg}`}>
          <img src={pluggedInImg} alt="Product in use" />
        </div>

        {/* --- CONTENT (EDITORIAL TEXT) --- */}

        <div className={`${styles.dpCard} ${styles.cardUc}`}>
          <div className={styles.iconContainer}><IconSearch /></div>
          <h3 className={styles.title}>USER-CENTERED</h3>
          <p className={styles.desc}>
            Every decision is guided by research. 80+ user interviews have
            shaped my understanding of real needs, ensuring every product
            serves a genuine purpose.
          </p>
        </div>

        <div className={`${styles.dpCard} ${styles.cardCf}`}>
          <div className={styles.iconContainer}><IconGear /></div>
          <h3 className={styles.title}>CRAFT-FOCUSED</h3>
          <p className={styles.desc}>
            I don't just design on screen. I prototype, test materials, and
            understand how things are made and used in the real world to ensure
            uncompromising quality.
          </p>
        </div>

        <div className={`${styles.dpCard} ${styles.cardId}`}>
          <div className={styles.iconContainer}><IconTarget /></div>
          <h3 className={styles.title}>IMPACT-DRIVEN</h3>
          <p className={styles.desc}>
            Beautiful design that doesn't solve a problem is just decoration.
            I create solutions that improve lives and stand the test of time
            through functional excellence.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
function IconSearch() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a1c08" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconGear() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a1c08" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function IconTarget() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3a1c08" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
