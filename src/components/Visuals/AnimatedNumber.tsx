"use client";

import { motion, useSpring, useTransform, useMotionValue, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export const AnimatedNumber = ({ value, suffix = "" }: { value: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  // Extract number from string (e.g. "80+" -> 80)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: 2000,
    bounce: 0,
  });

  const displayValue = useTransform(springValue, (latest) => 
    Math.round(latest).toLocaleString() + (latest >= numericValue ? suffix : "")
  );

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, motionValue, numericValue]);

  return <motion.span ref={ref}>{displayValue}</motion.span>;
};
