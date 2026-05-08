import React from "react";
import AntiGravityHero from "../../components/3d/AntiGravityHero";
import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      {/* Name + role overlaid top-left */}
      <div className={styles.leftPane}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>SASIDHARAN</h1>
          <p className={styles.subtitle}>Product Designer</p>
        </div>
      </div>

      <div className={styles.heroBody}>
        {/* 3D Model Stage — full width */}
        <div className={styles.modelColumn}>
          <div className={styles.productWrapper}>
            <AntiGravityHero />
          </div>
        </div>
      </div>

      {/* Bottom center label */}
      <div className={styles.productTagline}>
        Industrial Self-Defence Product
      </div>
    </section>
  );
};

export default Hero;
