"use client";

import React from "react";
import styles from "./Experience.module.scss";

const achievements = [
  {
    ghostWord: 'INTERN',
    date: "July '22",
    organization: 'Mystic Couture Pvt. Ltd.',
    title: 'Best Intern of the Week × 2',
    description: 'Awarded for exceptional graphic design and rapid prototyping iterations.',
  },
  {
    ghostWord: 'FIRST',
    date: "March '22",
    organization: 'Poster Design Competition',
    title: '1st Position — 150+ Participants',
    description: 'Won first place among 150+ participants for visual impact.',
  },
  {
    ghostWord: 'AWARD',
    date: "July '22",
    organization: 'BLOOD Organization',
    title: 'Special Recognition — Poster Design',
    description: 'Special recognition for healthcare awareness poster design.',
  },
];

export default function Experience() {
  return (
    <section id="experience" className={styles.experienceSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Achievements</h2>
      </div>

      <div className={styles.achievementsList}>
        {achievements.map((item, i) => (
          <div key={i} className={styles.achievementItem}>
            {/* Ghost watermark word — large background text */}
            <div className={styles.ghostWord}>
              {item.ghostWord}
            </div>

            {/* Foreground content */}
            <div className={styles.foregroundContent}>
              <div className={styles.meta}>
                {item.date} · {item.organization}
              </div>
              <div className={styles.achievementTitle}>
                {item.title}
              </div>
              <div className={styles.description}>
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
