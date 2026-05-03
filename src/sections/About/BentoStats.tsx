import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import styles from "./BentoStats.module.scss";

const CountUp = ({ value, suffix, duration = 1.6, delay = 0 }: { value: number; suffix: string; duration?: number; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeProgress * value));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      const delayTimeout = setTimeout(() => {
        animationFrame = requestAnimationFrame(animate);
      }, delay * 1000);

      return () => {
        clearTimeout(delayTimeout);
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [isInView, value, duration, delay]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const BentoStats = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCtaActive, setIsCtaActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const arcOffset = useTransform(scrollYProgress, [0, 1], [300, 0]);
  const springArc = useSpring(arcOffset, { stiffness: 40, damping: 20 });

  return (
    <div className={styles.statsWrapper}>
      <div className={styles.bentoGrid} ref={containerRef}>

        {/* Card 1: Research (Tall Left) */}
        <motion.div
          className={`${styles.card} ${styles.cardResearch}`}
          whileHover={{ translateY: -4 }}
        >
          <div className={styles.noiseOverlay} />
          <div className={styles.badge}>Research</div>
          <div className={styles.cardContent}>
            <h2 className={styles.numberLarge}>
              <CountUp value={80} suffix="+" />
            </h2>
            <div className={styles.label}>User Interviews Conducted</div>
            <p className={styles.desc}>Forming the architectural foundation of every project through deep human insight.</p>
          </div>
          <div className={styles.arcContainer}>
            <img src="/1111.png" alt="Research" className={styles.floatingImage} />
          </div>
        </motion.div>

        {/* Card 2: Impact (Middle Top) */}
        <motion.div
          className={`${styles.card} ${styles.cardImpact}`}
          whileHover={{ translateY: -4 }}
        >
          <div className={styles.noiseOverlay} />
          <div className={styles.badge}>Impact</div>
          <div className={styles.cardContent}>
            <h2 className={styles.numberMedium}>
              <CountUp value={5} suffix="+" delay={0.2} />
            </h2>
            <div className={styles.label}>Shipped Products</div>
            <p className={styles.desc} style={{ fontSize: '12px' }}>From concept to prototype to real-world use.</p>
          </div>
          <div className={styles.arcContainer} style={{ top: 20, right: 20, width: 100, height: 100 }}>
            <img src="/2222.png" alt="Impact" className={styles.floatingImage} />
          </div>
        </motion.div>

        {/* Card 3: Experience (Tall Right) */}
        <motion.div
          className={`${styles.card} ${styles.cardExperience}`}
          whileHover={{ translateY: -4 }}
        >
          <div className={styles.noiseOverlay} />
          <div className={styles.badge}>Experience</div>
          <div className={styles.cardContent}>
            <h2 className={styles.numberXLarge}>
              <CountUp value={3} suffix="+ Yrs" delay={0.4} />
            </h2>
            <div className={styles.labelLight}>Design Focus</div>
          </div>
        </motion.div>

        {/* Card 4: CTA (Middle Bottom) */}
        <motion.div
          className={`${styles.card} ${styles.cardCta} ${isCtaActive ? styles.ctaActive : ""}`}
          whileHover={{ translateY: -4 }}
          onClick={() => setIsCtaActive(!isCtaActive)}
        >
          <div className={styles.ctaContent}>
            <p className={styles.ctaText}>Interested in how I work? Explore my experience and projects below.</p>
            <div className={styles.ctaBtn}>View My Work</div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
