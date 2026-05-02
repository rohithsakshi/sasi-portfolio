"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./Experience.module.scss";

const milestones = [
  {
    title: "Best Intern of the Week × 2",
    org: "Mystic Couture Pvt. Ltd.",
    date: "July '22",
    description: "Awarded for exceptional graphic design and rapid prototyping iterations.",
    geometry: "trophy",
  },
  {
    title: "1st Position",
    org: "Poster Design Competition",
    date: "March '22",
    description: "Won first place among 150+ participants for visual impact.",
    geometry: "badge",
  },
  {
    title: "Poster Award",
    org: "BLOOD Organization",
    date: "July '22",
    description: "Special recognition for healthcare awareness poster design.",
    geometry: "certificate",
  },
];

// Reusable geometries
const createTrophyGeo = () => {
  const geo = new THREE.CylinderGeometry(0.8, 0.4, 1.5, 32);
  return geo;
};

const createBadgeGeo = () => {
  const geo = new THREE.OctahedronGeometry(1, 0);
  return geo;
};

const createCertGeo = () => {
  const geo = new THREE.BoxGeometry(1.4, 1.8, 0.2);
  return geo;
};

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 3D scene only for desktop
    if (window.innerWidth < 768) return;
    if (!containerRef.current || !canvasRef.current) return;
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 100);
    camera.position.z = 8;
    camera.position.x = -2.5; 

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xc87533, 1.5); 
    dirLight.position.set(2, 2, 5);
    scene.add(dirLight);

    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xc87533,
      metalness: 0.9,
      roughness: 0.2,
    });

    const meshes: THREE.Mesh[] = [];
    milestones.forEach((m) => {
      let geo;
      if (m.geometry === "trophy") geo = createTrophyGeo();
      else if (m.geometry === "badge") geo = createBadgeGeo();
      else geo = createCertGeo();

      const mesh = new THREE.Mesh(geo, copperMat);
      scene.add(mesh);
      meshes.push(mesh);
    });

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        itemsRef.current.forEach((item, i) => {
          if (!item) return;
          const itemRect = item.getBoundingClientRect();
          const centerDist = (itemRect.top + itemRect.height / 2) - window.innerHeight / 2;
          const mesh = meshes[i];
          
          if (centerDist < window.innerHeight * 0.4) {
            const targetY = -centerDist * 0.01;
            mesh.position.y += (targetY - mesh.position.y) * 0.1;
            mesh.scale.setScalar(1);
          } else {
            mesh.position.y = -5;
            mesh.scale.setScalar(0.01);
          }

          mesh.rotation.y += 0.01;
          mesh.rotation.x = Math.sin(Date.now() * 0.001 + i) * 0.2;
        });
        
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
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <section id="experience" ref={containerRef} className={styles.experienceSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Achievements</h2>
      </div>

      <div className={styles.timelineWrapper}>
        <canvas ref={canvasRef} className={styles.canvas} />

        <div className={styles.timelineLine} />

        <div className={styles.milestonesList}>
          {milestones.map((m, i) => (
            <div 
              key={i} 
              className={styles.milestoneItem}
              ref={(el) => { itemsRef.current[i] = el; }}
            >
              <div className={styles.dot} />

              <div className={styles.card}>
                <div className={styles.date}>{m.date}</div>
                <h3 className={styles.milestoneTitle}>{m.title}</h3>
                <div className={styles.org}>{m.org}</div>
                <p className={styles.description}>{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
