"use client";

import { useState } from 'react';
import styles from './About.module.scss';
import { ThreadsBackground } from './ThreadsBackground';
import DesignPrinciples from './DesignPrinciples';

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

const DesignProcess = () => (
  <div className={styles.processCard}>
    <h3 className={styles.processHeading}>How I Work</h3>
    <div className={styles.processSteps}>
      <div className={styles.step}>
        <div className={styles.stepIcon}>1</div>
        <div>
          <h4 className={styles.stepTitle}>Research</h4>
          <p className={styles.stepDesc}>
            Understanding is foundation. I dive deep into user behaviors, pain points, and contexts. Through interviews, observation, and empathy, I uncover the real problems worth solving.
          </p>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.stepIcon}>2</div>
        <div>
          <h4 className={styles.stepTitle}>Concept</h4>
          <p className={styles.stepDesc}>
            Ideas emerge from insights. Using design thinking methodologies, I explore multiple solutions, sketch rapidly, and challenge assumptions. The best idea isn't obvious—it's discovered through iteration.
          </p>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.stepIcon}>3</div>
        <div>
          <h4 className={styles.stepTitle}>Prototype</h4>
          <p className={styles.stepDesc}>
            Ideas become real. I transform concepts into tangible prototypes. This means 3D modeling, material testing, and understanding fabrication constraints. Design must work in the real world, not just on screen.
          </p>
        </div>
      </div>
      <div className={styles.step}>
        <div className={styles.stepIcon}>4</div>
        <div>
          <h4 className={styles.stepTitle}>Validate</h4>
          <p className={styles.stepDesc}>
            Testing reveals truth. Back to users with prototypes. Their feedback drives refinement. This iterative cycle—design, test, learn, improve—is where great products are born.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const ImpactStats = () => (
  <div className={styles.statsGrid}>
    <div className={styles.statCard}>
      <div className={styles.statNumber}>80+</div>
      <div className={styles.statLabel}>User Interviews Conducted</div>
      <div className={styles.statDesc}>Research forms the foundation of every design decision</div>
    </div>
    <div className={styles.statCard}>
      <div className={styles.statNumber}>5+</div>
      <div className={styles.statLabel}>Shipped Products</div>
      <div className={styles.statDesc}>From concept to prototype to real-world use</div>
    </div>
    <div className={styles.statCard}>
      <div className={styles.statNumber}>3+ Years</div>
      <div className={styles.statLabel}>Design Focus</div>
      <div className={styles.statDesc}>Deep expertise in product design methodology</div>
    </div>
  </div>
);

const CallToAction = () => {
  const handleScroll = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={styles.ctaSection}>
      <p className={styles.ctaText}>Interested in how I work? Explore my experience and projects below.</p>
      <button className={styles.ctaButton} onClick={handleScroll}>View My Work</button>
    </div>
  );
};

export default function About() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className={styles.aboutSection}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="about"
    >
      <div className={styles.threadsContainer}>
        <ThreadsBackground isHovered={isHovered} />
      </div>

      <div className={styles.contentContainer}>
        <HeroStatement />
        <ProfileIntro />
      </div>

      <DesignPrinciples />

      <div className={styles.contentContainer}>
        <DesignProcess />
        <ImpactStats />
        <CallToAction />
      </div>
    </section>
  );
}
