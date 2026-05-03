import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import styles from "./HowIWorkCarousel.module.scss";

const steps = [
  {
    number: "01",
    label: "Research",
    title: "Understanding Users",
    desc: "I dive deep into user behaviors, pain points, and contexts. Through interviews and observation, I uncover the real problems worth solving.",
  },
  {
    number: "02",
    label: "Concept",
    title: "Ideation & Sketching",
    desc: "Ideas emerge from insights. Using design thinking, I explore multiple solutions, sketch rapidly, and challenge assumptions to find the best path.",
  },
  {
    number: "03",
    label: "Prototype",
    title: "Bringing Ideas to Life",
    desc: "I transform concepts into tangible prototypes. This involves 3D modeling and material testing to ensure the design works in the real world.",
  },
  {
    number: "04",
    label: "Validate",
    title: "Testing & Refinement",
    desc: "Back to users with prototypes. Their feedback drives refinement. This iterative cycle is where great, validated products are born.",
  },
];

export const HowIWorkCarousel = () => {
  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const paginate = useCallback((newDirection: number) => {
    setIndex((prevIndex) => (prevIndex + newDirection + steps.length) % steps.length);
  }, []);

  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      autoPlayRef.current = setInterval(() => {
        paginate(1);
      }, 3000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, isHovered, paginate]);

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      setIsAutoPlaying(false);
      paginate(1);
    } else if (info.offset.x > swipeThreshold) {
      setIsAutoPlaying(false);
      paginate(-1);
    }
  };

  // Improved position calculation to support seamless looping
  const getXPosition = (i: number) => {
    let diff = i - index;
    // Handle wrapping
    if (diff > steps.length / 2) diff -= steps.length;
    if (diff < -steps.length / 2) diff += steps.length;
    return diff * 110; // Percentage
  };

  return (
    <div className={styles.carouselSection}>
      <h3 className={styles.sectionHeading}>How I Work</h3>
      
      <div className={styles.hoverHint}>
        <span>Hover to pause & read</span>
      </div>

      <div 
        className={styles.carouselWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.mainContainer}>
          {/* Controls - Left Arrow */}
          <button 
            className={`${styles.navArrow} ${styles.leftArrow}`} 
            onClick={() => { setIsAutoPlaying(false); paginate(-1); }}
            aria-label="Previous step"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className={styles.cardsContainer}>
            {steps.map((step, i) => {
              const xPos = getXPosition(i);
              const isActive = i === index;
              const isVisible = Math.abs(xPos) <= 110;

              return (
                <motion.div
                  key={i}
                  className={`${styles.card} ${isActive ? styles.activeCard : ""}`}
                  initial={false}
                  animate={{
                    x: `${xPos}%`,
                    scale: isActive ? 1 : 0.88,
                    filter: isActive ? "blur(0px)" : "blur(2px)",
                    opacity: isVisible ? (isActive ? 1 : 0.6) : 0,
                    zIndex: isActive ? 10 : 5,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                >
                  <div className={styles.cardInner}>
                    <div className={styles.numberCircle}>
                      <span className={styles.number}>{step.number}</span>
                    </div>
                    <span className={styles.label}>{step.label}</span>
                    <h4 className={styles.title}>{step.title}</h4>
                    <p className={styles.desc}>{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Controls - Right Arrow */}
          <button 
            className={`${styles.navArrow} ${styles.rightArrow}`} 
            onClick={() => { setIsAutoPlaying(false); paginate(1); }}
            aria-label="Next step"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className={styles.dotsContainer}>
          {steps.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${index === i ? styles.activeDot : ""}`}
              onClick={() => { setIsAutoPlaying(false); setIndex(i); }}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
