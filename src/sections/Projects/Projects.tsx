"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const projects = [
  {
    id: 1,
    title: "Portable Air Conditioner",
    domain: "Domestic Sector",
    type: "Team Project",
    year: "Jul–Nov '22",
    description: "Redesigned a static air cooler into a fully portable unit with ergonomic features.",
    tags: ["Ergonomics", "User Research", "Prototyping"],
    modelType: "box", // Mockup type for Three.js
  },
  {
    id: 2,
    title: "Shoe & Slipper Stand",
    domain: "Domestic Sector",
    type: "Individual Project",
    year: "Sept '22",
    description: "Innovated a new design concept for domestic shoe storage with physical prototyping.",
    tags: ["Product Design", "Fabrication", "Innovation"],
    modelType: "cylinder",
  },
  {
    id: 3,
    title: "Extension Box Redesign",
    domain: "Consumer Electronics",
    type: "Thesis Project",
    year: "2023",
    description: "Expandable, foldable, portable extension box design with multiple pin configurations.",
    tags: ["Thesis", "Smart Design", "Portability"],
    modelType: "prism",
  },
];

// Helper component for individual 3D scenes
const ProjectCanvas = ({ type }: { type: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xc87533, 1.5); // Copper light
    dirLight.position.set(2, 2, 2);
    scene.add(dirLight);

    const material = new THREE.MeshStandardMaterial({
      color: 0xc87533, // Copper base
      roughness: 0.3,
      metalness: 0.8,
    });

    let geometry;
    if (type === "box") geometry = new THREE.BoxGeometry(1.5, 2, 1);
    else if (type === "cylinder") geometry = new THREE.CylinderGeometry(0.8, 0.8, 2, 32);
    else geometry = new THREE.OctahedronGeometry(1.2);

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    let isVisible = false;

    // Intersection observer to only render when in view
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(canvas);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (isVisible) {
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
    };
    animate();

    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, [type]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
};

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const windowCenter = window.innerHeight / 2;
        
        // Calculate distance from center of screen
        const distanceFromCenter = cardCenter - windowCenter;
        
        // Trigger flip when close to center
        if (Math.abs(distanceFromCenter) < window.innerHeight * 0.3) {
          card.style.transform = "rotateX(180deg)";
        } else {
          card.style.transform = "rotateX(0deg)";
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      style={{ 
        padding: "150px 24px", 
        backgroundColor: "var(--wheat)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <h2 style={{ 
          fontFamily: "var(--font-display)", 
          fontSize: "clamp(36px, 6vw, 56px)", 
          fontWeight: 700, 
          color: "var(--saddle-brown)",
          textTransform: "uppercase"
        }}>
          Featured Work
        </h2>
      </div>

      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "100px",
        width: "100%",
        maxWidth: "900px",
        perspective: "1500px" // Perspective applied to parent for 3D flip
      }}>
        {projects.map((project, i) => (
          <div 
            key={project.id}
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
              transformStyle: "preserve-3d",
              transition: "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
            ref={(el) => { cardsRef.current[i] = el; }}
          >
            {/* FRONT FACE */}
            <div style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              backgroundColor: "var(--saddle-brown)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 40px rgba(42, 24, 16, 0.2)",
              border: "1px solid var(--copper)"
            }}>
              <h3 style={{ 
                fontFamily: "var(--font-display)", 
                fontSize: "32px", 
                color: "var(--wheat)",
                textAlign: "center",
                padding: "20px"
              }}>
                {project.title}
              </h3>
            </div>

            {/* BACK FACE */}
            <div style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              backgroundColor: "var(--cream)",
              borderRadius: "16px",
              transform: "rotateX(180deg)",
              boxShadow: "0 20px 40px rgba(42, 24, 16, 0.1)",
              border: "1px solid var(--saddle-brown)",
              display: "flex",
              overflow: "hidden"
            }}>
              {/* 3D Canvas Side */}
              <div style={{ flex: 1, position: "relative", borderRight: "1px solid rgba(139, 69, 19, 0.1)" }}>
                <ProjectCanvas type={project.modelType} />
              </div>

              {/* Info Side */}
              <div style={{ flex: 1, padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ 
                  fontFamily: "var(--font-mono)", 
                  fontSize: "12px", 
                  color: "var(--copper)",
                  marginBottom: "8px",
                  textTransform: "uppercase"
                }}>
                  {project.domain} // {project.year}
                </div>
                <h3 style={{ 
                  fontFamily: "var(--font-display)", 
                  fontSize: "24px", 
                  fontWeight: 700,
                  color: "var(--saddle-brown)",
                  marginBottom: "16px"
                }}>
                  {project.title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-main)",
                  fontSize: "15px",
                  color: "var(--saddle-brown)",
                  opacity: 0.9,
                  lineHeight: 1.6,
                  marginBottom: "24px"
                }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {project.tags.map(tag => (
                    <span key={tag} style={{
                      fontSize: "11px",
                      padding: "6px 12px",
                      borderRadius: "100px",
                      border: "1px solid var(--copper)",
                      color: "var(--copper)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em"
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
