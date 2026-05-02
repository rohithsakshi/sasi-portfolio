"use client";

import styles from './PhilosophyCard.module.scss';

export function PhilosophyCard() {
  return (
    <div className={styles.philosophyCard}>
      <h3 className={styles.philosophyTitle}>Design Philosophy</h3>

      <div className={styles.philosophyContent}>
        <p className={styles.mainStatement}>
          <span className={styles.highlight}>Designing with purpose, not just pixels.</span>
        </p>

        <p className={styles.bodyText}>
          I believe that great product design is about understanding the user's needs deeply, then 
          translating those insights into intuitive, beautiful solutions. I focus on creating meaningful 
          experiences that solve real problems, balancing aesthetics with usability and long-term impact.
        </p>

        <p className={styles.approachText}>
          <em>My approach: Research → Design → Validate → Iterate</em>
        </p>
      </div>
    </div>
  );
}
