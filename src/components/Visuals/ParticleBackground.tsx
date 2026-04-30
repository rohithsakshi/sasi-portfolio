"use client";
import { useCallback } from "react";
import Particles from "@tsparticles/react";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      options={{
        background: { color: { value: "transparent" } },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "grab" },
            resize: { enable: true },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.3 } },
          },
        },
        particles: {
          color: { value: ["#ffffff", "#1a6ef5", "#1a9ef5"] },
          links: {
            color: "#ffffff",
            distance: 160,
            enable: true,
            opacity: 0.08,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: { default: "bounce" },
            random: true,
            speed: 0.5,
            straight: false,
          },
          number: { density: { enable: true }, value: 60 },
          opacity: { value: { min: 0.05, max: 0.35 }, animation: { enable: true, speed: 0.5 } },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  );
}
