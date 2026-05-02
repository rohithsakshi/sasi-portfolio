"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./Contact.module.scss";

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
    
    const dirLight = new THREE.DirectionalLight(0xc87533, 1.0);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const material = new THREE.MeshStandardMaterial({
      color: 0x8B4513,
      roughness: 0.8,
      metalness: 0.1,
      wireframe: true,
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
    <section id="contact" className={styles.contactSection}>
      <canvas ref={canvasRef} className={styles.canvasBg} />

      <div className={styles.content}>
        <h2 className={styles.heading}>Let's Connect</h2>
        <p className={styles.subtext}>
          Open to freelance projects, internships, and design collaborations.
        </p>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.inputGroup}>
            <input type="text" placeholder="YOUR NAME" className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="EMAIL ADDRESS" className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <textarea placeholder="YOUR MESSAGE" rows={3} className={styles.textarea} />
          </div>
          
          <button 
            className={styles.submitBtn}
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

        <div className={styles.socialGrid}>
          {links.map((link, i) => (
            <a 
              key={i}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={styles.socialLink}
              style={{ transform: hoveredLink === i ? "translateY(-4px)" : "translateY(0)" }}
              onMouseEnter={() => setHoveredLink(i)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <div 
                className={styles.socialLabel}
                style={{ color: hoveredLink === i ? "var(--copper)" : "var(--saddle-brown)" }}
              >
                {link.label}
              </div>
            </a>
          ))}
        </div>

        <div className={styles.footerLogo}>
          <img src="/sasi1.png" alt="SK Logo" className={styles.logoImg} />
        </div>
      </div>
    </section>
  );
}
