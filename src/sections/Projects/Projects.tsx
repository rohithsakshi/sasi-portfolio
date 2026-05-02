"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./Projects.module.scss";

const projects = [
  {
    id: 1,
    title: "Portable Air Conditioner",
    domain: "Domestic Sector",
    type: "Team Project",
    year: "Jul–Nov '22",
    description: "Redesigned a static air cooler into a fully portable unit with ergonomic features.",
    tags: ["Ergonomics", "User Research", "Prototyping"],
    modelType: "box",
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
    
    const dirLight = new THREE.DirectionalLight(0xc87533, 1.5);
    dirLight.position.set(2, 2, 2);
    scene.add(dirLight);

    let geometry;
    if (type === "box") geometry = new THREE.BoxGeometry(2, 2, 2);
    else if (type === "cylinder") geometry = new THREE.CylinderGeometry(1.2, 1.2, 2, 32);
    else geometry = new THREE.IcosahedronGeometry(1.5, 0);

    const material = new THREE.MeshStandardMaterial({ 
      color: 0x8b4513, 
      roughness: 0.4, 
      metalness: 0.3,
      flatShading: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    const animate = () => {
      mesh.rotation.y += 0.01;
      mesh.rotation.x += 0.005;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      scene.clear();
    };
  }, [type]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const windowCenter = window.innerHeight / 2;
        const distanceFromCenter = cardCenter - windowCenter;
        
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
    <section id="projects" ref={containerRef} className={styles.projectsSection}>
      <div className={styles.headingContainer}>
        <h2 className={styles.heading}>Featured Work</h2>
      </div>

      <div className={styles.cardsContainer}>
        {projects.map((project, i) => (
          <div 
            key={project.id}
            className={styles.card}
            ref={(el) => { cardsRef.current[i] = el; }}
          >
            {/* FRONT FACE */}
            <div className={styles.frontFace}>
              <h3 className={styles.frontTitle}>{project.title}</h3>
            </div>

            {/* BACK FACE */}
            <div className={styles.backFace}>
              <div className={styles.canvasSide}>
                <ProjectCanvas type={project.modelType} />
              </div>

              <div className={styles.infoSide}>
                <div className={styles.meta}>
                  {project.domain} // {project.year}
                </div>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.tags}>
                  {project.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
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
