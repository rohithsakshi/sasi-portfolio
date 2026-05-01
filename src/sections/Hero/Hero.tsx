"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./Hero.module.scss";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasContainerRef.current || !canvasRef.current) return;

    // --- THREE.JS SETUP ---
    const scene = new THREE.Scene();
    
    // Camera setup - Increased FOV and depth
    const camera = new THREE.PerspectiveCamera(
      50,
      canvasContainerRef.current.clientWidth / canvasContainerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.2, 7.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasContainerRef.current.clientWidth, canvasContainerRef.current.clientHeight);
    
    // Shadows
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xfffbf0, 1.5); 
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.bias = -0.0001;
    scene.add(directionalLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(-5, 2, -5);
    scene.add(rimLight);

    // --- GROUND PLANE (FOR SHADOWS) ---
    const planeGeo = new THREE.PlaneGeometry(100, 100);
    const planeMat = new THREE.ShadowMaterial({ opacity: 0.1 });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2.7; // Just below the model
    plane.receiveShadow = true;
    scene.add(plane);

    // --- 3D EXPANDABLE EXTENSION BOX GEOMETRY ---
    const group = new THREE.Group();
    group.scale.set(1.8, 1.8, 1.8);
    // Position elegantly under the text, spanning towards the center
    group.position.set(-0.8, -1.6, 0);

    // Materials
    const saddleBrownMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b4513, // Saddle Brown
      roughness: 0.8,
      metalness: 0.2,
    });

    const copperMaterial = new THREE.MeshStandardMaterial({
      color: 0xc87533, // Copper
      metalness: 0.4,
      roughness: 0.5,
    });

    const holeMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a1810, // Dark Brown for holes
      roughness: 0.9,
    });

    const parts = {
      leftShell: new THREE.Group(),
      rightShell: new THREE.Group(),
      core: new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.9, 0.9), saddleBrownMaterial),
      accordions: [] as THREE.Mesh[],
    };
    parts.core.castShadow = true;
    parts.core.receiveShadow = true;

    // Build Left Shell
    const leftShellMesh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.0, 1.0), saddleBrownMaterial);
    leftShellMesh.castShadow = true;
    leftShellMesh.receiveShadow = true;
    parts.leftShell.add(leftShellMesh);

    // Build Right Shell
    const rightShellMesh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.0, 1.0), saddleBrownMaterial);
    rightShellMesh.castShadow = true;
    rightShellMesh.receiveShadow = true;
    parts.rightShell.add(rightShellMesh);

    // Accordion segments (5 segments)
    const numSegments = 5;
    for (let i = 0; i < numSegments; i++) {
      const segment = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.85, 0.85), saddleBrownMaterial);
      segment.castShadow = true;
      segment.receiveShadow = true;
      parts.accordions.push(segment);
      group.add(segment);
      
      // Add a socket face (copper) to every segment
      const socket = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16), copperMaterial);
      socket.rotation.x = Math.PI / 2;
      socket.position.set(0, 0, 0.45); // Front face
      socket.castShadow = true;
      socket.receiveShadow = true;
      
      // Add 3 socket holes (dark cylinders) inside the socket
      const holeGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.06, 8);
      
      const hole1 = new THREE.Mesh(holeGeo, holeMaterial);
      hole1.position.set(0, 0, 0.05);
      
      const hole2 = new THREE.Mesh(holeGeo, holeMaterial);
      hole2.position.set(-0.06, 0, -0.05);
      
      const hole3 = new THREE.Mesh(holeGeo, holeMaterial);
      hole3.position.set(0.06, 0, -0.05);

      socket.add(hole1);
      socket.add(hole2);
      socket.add(hole3);
      
      segment.add(socket);
    }

    group.add(parts.leftShell);
    group.add(parts.rightShell);
    group.add(parts.core);

    // Tilt slightly to see isometric view
    group.rotation.set(0, 0, 0);

    scene.add(group);

    // Handle Resize
    const onResize = () => {
      if (!canvasContainerRef.current) return;
      const width = canvasContainerRef.current.clientWidth;
      const height = canvasContainerRef.current.clientHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      
      if (window.innerWidth < 768) {
        group.scale.set(1.3, 1.3, 1.3);
        group.position.set(0, -0.2, -0.3);
      } else if (window.innerWidth < 1024) {
        group.scale.set(1.7, 1.7, 1.7);
        group.position.set(-0.8, -0.3, -0.3);
      } else {
        group.scale.set(2.2, 2.2, 2.2);
        
        // Define soft boundary so it never enters text zone
        const TEXT_SAFE_ZONE = -2.2;
        let targetX = -1.4;
        if (targetX < TEXT_SAFE_ZONE) targetX = TEXT_SAFE_ZONE;
        
        group.position.set(targetX, -0.8, -0.3);
      }

      camera.updateProjectionMatrix();
    };
    
    window.addEventListener("resize", onResize);
    onResize();

    let lastTime = performance.now();
    let accumulatedTime = 0;

    // Render loop
    const animate = (timestamp: number) => {
      requestAnimationFrame(animate);

      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;
      accumulatedTime += delta;

      // Animation timing with longer hold
      const cycleDuration = 6; // seconds
      const t = (accumulatedTime % cycleDuration) / cycleDuration;
      
      let pRaw = 0;
      if (t < 0.1) {
        pRaw = 0; // Hold closed
      } else if (t < 0.35) {
        pRaw = (t - 0.1) / 0.25; // Opening
      } else if (t < 0.75) {
        pRaw = 1; // Hold open (much longer now)
      } else {
        pRaw = 1 - (t - 0.75) / 0.25; // Closing
      }

      // Mechanical smoothstep easing
      const p = pRaw * pRaw * (3 - 2 * pRaw);

      const isMobile = window.innerWidth < 768;
      const MAX_OFFSET = isMobile ? 0.5 : 1.0;
      const explodeOffset = p * MAX_OFFSET;

      // Asymmetric Expansion
      const leftTarget = -explodeOffset * 0.8;
      const rightTarget = explodeOffset * 1.4;

      // Clamping limits
      const LEFT_LIMIT = -3.2;
      const RIGHT_LIMIT = 1.8;

      parts.leftShell.position.x = Math.max(leftTarget, LEFT_LIMIT);
      parts.rightShell.position.x = Math.min(rightTarget, RIGHT_LIMIT);
      
      // Core sits centrally between the two shells
      const leftBound = parts.leftShell.position.x;
      const rightBound = parts.rightShell.position.x;
      const spread = rightBound - leftBound;

      parts.core.position.x = leftBound + spread * 0.5;

      // Evenly distribute accordions
      parts.accordions.forEach((seg, i) => {
        seg.position.x = leftBound + (spread / (numSegments + 1)) * (i + 1);
      });

      renderer.render(scene, camera);
    };

    requestAnimationFrame((t) => {
      lastTime = t;
      animate(t);
    });

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <section className={styles.heroSection} ref={containerRef}>
      {/* 3D Layer is now full width/height and acts as the background */}
      <div className={styles.productWrapper}>
        <div className={styles.canvasContainer} ref={canvasContainerRef}>
          <canvas ref={canvasRef} className={styles.webglCanvas} />
        </div>
        <div className={styles.productTagline}>
          Extensible Portable Extension Box
        </div>
      </div>

      {/* Z-indexed content layers */}
      <div className={styles.leftPane}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>SASIDHARAN K.</h1>
          <p className={styles.subtitle}>Product Designer</p>
        </div>
      </div>

      <div className={styles.rightPane}>
        <div className={styles.imageContainer}>
          <img 
            src="/sasi.png" 
            alt="Sasidharan K." 
            className={styles.heroImage} 
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

