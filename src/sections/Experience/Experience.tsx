"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

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
    if (!containerRef.current || !canvasRef.current) return;
    
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(45, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 100);
    camera.position.z = 8;
    // Move camera to left side to align with the timeline dots
    camera.position.x = -2.5; 

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xc87533, 1.5); // Copper shine
    dirLight.position.set(2, 2, 5);
    scene.add(dirLight);

    // Copper Material
    const copperMat = new THREE.MeshStandardMaterial({
      color: 0xc87533,
      metalness: 0.9,
      roughness: 0.2,
    });

    // Create meshes
    const meshes: THREE.Mesh[] = [];
    milestones.forEach((m, index) => {
      let geo;
      if (m.geometry === "trophy") geo = createTrophyGeo();
      else if (m.geometry === "badge") geo = createBadgeGeo();
      else geo = createCertGeo();

      const mesh = new THREE.Mesh(geo, copperMat);
      // Position them vertically spaced
      // Base positions will be updated dynamically in scroll loop based on DOM elements
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
          
          // Normalized position relative to center of screen (0 is center, >0 is below, <0 is above)
          const centerDist = (itemRect.top + itemRect.height / 2) - window.innerHeight / 2;
          
          const mesh = meshes[i];
          
          // Trigger rise effect when approaching center
          if (centerDist < window.innerHeight * 0.4) {
            // Rising
            const targetY = -centerDist * 0.01;
            mesh.position.y += (targetY - mesh.position.y) * 0.1;
            mesh.scale.setScalar(1);
          } else {
            // Hidden below
            mesh.position.y = -5;
            mesh.scale.setScalar(0.01); // Shrink to hide
          }

          // Constant rotation
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
    <section 
      id="experience" 
      ref={containerRef}
      style={{ 
        position: "relative",
        padding: "150px 24px", 
        backgroundColor: "var(--wheat)",
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
          Achievements
        </h2>
      </div>

      <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto", display: "flex" }}>
        
        {/* Full-height canvas for 3D objects */}
        <canvas 
          ref={canvasRef} 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            width: "100%", 
            height: "100%", 
            pointerEvents: "none",
            zIndex: 5 
          }} 
        />

        {/* Vertical Line */}
        <div style={{
          position: "absolute",
          left: "20px",
          top: 0,
          bottom: 0,
          width: "2px",
          backgroundColor: "var(--saddle-brown)",
          zIndex: 1
        }} />

        <div style={{ width: "100%", paddingLeft: "60px", display: "flex", flexDirection: "column", gap: "100px" }}>
          {milestones.map((m, i) => (
            <div 
              key={i} 
              ref={(el) => { itemsRef.current[i] = el; }}
              style={{ position: "relative", zIndex: 10 }}
            >
              {/* Timeline Dot */}
              <div style={{
                position: "absolute",
                left: "-49px",
                top: "24px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: "var(--wheat)",
                border: "4px solid var(--saddle-brown)",
                zIndex: 2
              }} />

              {/* Text Block */}
              <div style={{
                backgroundColor: "var(--cream)",
                border: "1px solid rgba(139, 69, 19, 0.2)",
                borderRadius: "16px",
                padding: "32px",
                boxShadow: "0 10px 30px rgba(42, 24, 16, 0.05)"
              }}>
                <div style={{ 
                  fontFamily: "var(--font-mono)", 
                  fontSize: "12px", 
                  color: "var(--copper)",
                  marginBottom: "8px",
                  textTransform: "uppercase",
                  fontWeight: 600
                }}>
                  {m.date}
                </div>
                <h3 style={{ 
                  fontFamily: "var(--font-display)", 
                  fontSize: "24px", 
                  fontWeight: 700,
                  color: "var(--saddle-brown)",
                  marginBottom: "8px"
                }}>
                  {m.title}
                </h3>
                <div style={{ 
                  fontFamily: "var(--font-main)", 
                  fontSize: "14px", 
                  color: "var(--saddle-brown)",
                  opacity: 0.7,
                  marginBottom: "16px",
                  fontWeight: 600
                }}>
                  {m.org}
                </div>
                <p style={{
                  fontFamily: "var(--font-main)",
                  fontSize: "15px",
                  color: "var(--saddle-brown)",
                  opacity: 0.9,
                  lineHeight: 1.6
                }}>
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
