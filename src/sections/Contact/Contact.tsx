"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Contact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvasRef.current.clientWidth / canvasRef.current.clientHeight, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xc87533, 1.0); // Copper light
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const material = new THREE.MeshStandardMaterial({
      color: 0x8B4513, // Saddle Brown
      roughness: 0.8,
      metalness: 0.1,
      wireframe: true, // Wireframe for premium aesthetic without overpowering
      transparent: true,
      opacity: 0.2
    });

    const geometry = new THREE.IcosahedronGeometry(6, 1);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.002;
      renderer.render(scene, camera);
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

  const [hoveredLink, setHoveredLink] = useState<number | null>(null);

  const links = [
    { label: "Email", value: "Sasiharsha6602@gmail.com", href: "mailto:Sasiharsha6602@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/sasidharan", href: "https://www.linkedin.com/in/sasidharan" },
    { label: "Behance", value: "behance.net/sasidharan14", href: "https://www.behance.net/sasidharan14" },
    { label: "Phone", value: "+91 6382931941", href: "tel:+916382931941" },
  ];

  return (
    <section 
      id="contact" 
      style={{ 
        position: "relative", 
        padding: "150px 24px", 
        backgroundColor: "var(--wheat)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      {/* 3D Background */}
      <canvas 
        ref={canvasRef} 
        style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          width: "100%", 
          height: "100%", 
          pointerEvents: "none",
          zIndex: 1 
        }} 
      />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "600px", width: "100%", textAlign: "center" }}>
        <h2 style={{ 
          fontFamily: "var(--font-display)", 
          fontSize: "clamp(40px, 8vw, 80px)", 
          fontWeight: 700, 
          color: "var(--saddle-brown)",
          textTransform: "uppercase",
          marginBottom: "16px",
          letterSpacing: "-0.02em"
        }}>
          Let's Connect
        </h2>
        <p style={{
          fontFamily: "var(--font-main)",
          fontSize: "16px",
          color: "var(--saddle-brown)",
          opacity: 0.8,
          marginBottom: "60px",
          lineHeight: 1.6
        }}>
          Open to freelance projects, internships, and design collaborations.
        </p>

        {/* Minimal Form */}
        <form style={{ display: "flex", flexDirection: "column", gap: "30px", marginBottom: "60px" }} onSubmit={(e) => e.preventDefault()}>
          <div style={{ position: "relative" }}>
            <input 
              type="text" 
              placeholder="YOUR NAME" 
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--saddle-brown)",
                padding: "16px 0",
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                color: "var(--saddle-brown)",
                outline: "none",
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}
            />
          </div>
          <div style={{ position: "relative" }}>
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--saddle-brown)",
                padding: "16px 0",
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                color: "var(--saddle-brown)",
                outline: "none",
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}
            />
          </div>
          <div style={{ position: "relative" }}>
            <textarea 
              placeholder="YOUR MESSAGE" 
              rows={3}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--saddle-brown)",
                padding: "16px 0",
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                color: "var(--saddle-brown)",
                outline: "none",
                resize: "none",
                textTransform: "uppercase",
                letterSpacing: "0.1em"
              }}
            />
          </div>
          
          <button 
            style={{
              alignSelf: "center",
              marginTop: "20px",
              padding: "16px 48px",
              backgroundColor: "transparent",
              color: "var(--saddle-brown)",
              border: "1px solid var(--copper)",
              fontFamily: "var(--font-display)",
              fontSize: "14px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 0 0 rgba(200, 117, 51, 0)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(200, 117, 51, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 0 rgba(200, 117, 51, 0)";
            }}
          >
            Send Message
          </button>
        </form>

        {/* Social Links */}
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap" }}>
          {links.map((link, i) => (
            <a 
              key={i}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
                transform: hoveredLink === i ? "translateY(-4px)" : "translateY(0)",
                transition: "transform 0.3s ease"
              }}
              onMouseEnter={() => setHoveredLink(i)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: hoveredLink === i ? "var(--copper)" : "var(--saddle-brown)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                transition: "color 0.3s ease"
              }}>
                {link.label}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
