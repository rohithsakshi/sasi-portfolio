"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Hero from "../src/sections/Hero/Hero";
import Navbar from "../src/components/Navigation/Navbar";
import Skills from "../src/sections/Skills/Skills";
import Projects from "../src/sections/Projects/Projects";
import Thesis from "../src/sections/Thesis/Thesis";
import Experience from "../src/sections/Experience/Experience";
import Contact from "../src/sections/Contact/Contact";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Thesis />
      <Experience />
      <Contact />
    </main>
  );
}
