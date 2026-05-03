"use client";

import styles from './About.module.scss';
import DesignPrinciples from './DesignPrinciples';
import { HowIWorkCarousel } from './HowIWorkCarousel';
import { BentoStats } from './BentoStats';

// Embedded Components for simplicity and speed

const HeroStatement = () => (
  <div className={styles.heroStatement}>
    <h2 className={styles.quote}>
      "I design products that solve real problems,<br />not problems that need design."
    </h2>
    <div className={styles.subtext}>A user-centered approach to product design and innovation</div>
  </div>
);

const ProfileIntro = () => (
  <div className={styles.profileIntro}>
    <div className={styles.imageContainer}>
      <img src="/sasi1.png" alt="SASIDHARAN" />
    </div>
    <div className={styles.bioContent}>
      <h3 className={styles.bioHeading}>About Me</h3>
      <div className={styles.bioText}>
        <p>
          I'm a Product & Industrial Designer with a passion for creating
          intuitive, beautiful solutions to real-world problems. My design approach
          is rooted in <span className={styles.highlight}>deep user research</span>, empathetic problem-solving, and a
          commitment to craftsmanship.
        </p>
        <p>
          Driven by curiosity and guided by user insights, I design products that
          don't just look good—they work better, feel better, and <span className={styles.highlight}>improve people's
            daily lives</span>.
        </p>
        <p>
          When I'm not designing, I'm prototyping, conducting user interviews, or
          exploring how materials and form can come together in unexpected ways.
        </p>
      </div>
    </div>
  </div>
);

// DesignPrinciples is now a separate component imported above.



export default function About() {
  return (
    <section
      className={styles.aboutSection}
      id="about"
    >
      <div className={styles.contentContainer}>
        <HeroStatement />
        <ProfileIntro />
      </div>

      <DesignPrinciples />

      <HowIWorkCarousel />

      <BentoStats />
    </section>
  );
}
