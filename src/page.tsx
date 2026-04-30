"use client";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Thesis from "./components/Thesis";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

const Scene3D = dynamic(() => import("./components/Scene3D"), { ssr: false });
const ParticleBackground = dynamic(() => import("./components/ParticleBackground"), { ssr: false });

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Scene3D />
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Projects />
          <Thesis />
          <Experience />
          <Contact />
        </main>
      </div>
    </>
  );
}
