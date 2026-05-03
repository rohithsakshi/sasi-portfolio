"use client";

import React from "react";
import styles from "./Skills.module.scss";

const primarySkills = [
  "CAD Design",
  "Prototyping",
  "User Research",
  "Fabrication",
  "Design Thinking",
  "Branding",
  "3D Modeling"
];

const secondarySkills = [
  "Materials Science",
  "UI/UX Design",
  "CMF Design",
  "Rendering",
  "Finite Element Analysis",
  "Product Strategy",
  "Design for Manufacturing"
];

const bioLines = [
  "I am an industrial designer who believes that form follows function.",
  "With a deep focus on manufacturing constraints, ergonomics, and aesthetic purity,",
  "I engineer solutions that elevate everyday interactions.",
  "My process is grounded in physical prototyping and critical analysis."
];

const TickerRow = ({ skills, direction }: { skills: string[], direction: "left-to-right" | "right-to-left" }) => {
  const animationClass = direction === "left-to-right" ? styles.scrollLeftToRight : styles.scrollRightToLeft;
  
  return (
    <div className={styles.tickerStrip}>
      <div className={`${styles.tickerTrack} ${animationClass}`}>
        {/* Original Content */}
        <div className={styles.tickerContent}>
          {skills.map((skill, idx) => (
            <div key={idx} className={styles.skillItem}>
              {skill}
            </div>
          ))}
        </div>
        {/* Duplicated Content for Seamless Loop */}
        <div className={styles.tickerContent}>
          {skills.map((skill, idx) => (
            <div key={`dup-${idx}`} className={styles.skillItem}>
              {skill}
            </div>
          ))}
        </div>
        {/* Third set for safety in large screens */}
        <div className={styles.tickerContent}>
          {skills.map((skill, idx) => (
            <div key={`dup2-${idx}`} className={styles.skillItem}>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Skills() {
  return (
    <section id="skills" className={styles.skillsSection}>
      <h2 className={styles.heading}>Skills</h2>
      
      <div className={styles.bioPara}>
        {bioLines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            {idx !== bioLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>

      <div className={styles.tickerContainer}>
        <TickerRow skills={primarySkills} direction="left-to-right" />
        <TickerRow skills={secondarySkills} direction="right-to-left" />
      </div>
    </section>
  );
}
