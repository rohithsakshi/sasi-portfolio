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

    // Camera: Closer, slight top-angle for product-shot feel
    const camera = new THREE.PerspectiveCamera(
      46,
      canvasContainerRef.current.clientWidth / canvasContainerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.2, 4.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvasContainerRef.current.clientWidth, canvasContainerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.sortObjects = true;

    // --- PRODUCT-STAGE LIGHTING ---
    // Ambient
    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);

    // Key Light (warm, from top-right)
    const keyLight = new THREE.DirectionalLight(0xfffbf0, 1.3);
    keyLight.position.set(5, 6, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Fill Light (soft, left)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-5, 2, 5);
    scene.add(fillLight);

    // Top Light
    const topLight = new THREE.DirectionalLight(0xffffff, 0.45);
    topLight.position.set(0, 10, 2);
    scene.add(topLight);

    // Rim Light (sexy edge glow from behind-left)
    const rimLight = new THREE.DirectionalLight(0xfff0e0, 0.35);
    rimLight.position.set(-5, 3, -5);
    scene.add(rimLight);

    // --- SHADOW GROUND PLANE ---
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(14, 14),
      new THREE.ShadowMaterial({ opacity: 0.25 })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.12;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // --- 3D EXPANDABLE EXTENSION BOX GEOMETRY ---
    const group = new THREE.Group();
    const baseY = -0.6; // Slightly lower for better centering with smaller scale
    group.position.set(-0.3, baseY, 0);

    // Orientation: tilt top face toward viewer
    group.rotation.y = -0.15;
    group.rotation.x = 0.4;

    // --- MATERIALS ---
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x8B4513,
      roughness: 0.6,
      metalness: 0.1,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    const panelMaterial = new THREE.MeshStandardMaterial({
      color: 0xF5DEB3,
      roughness: 0.4,
      metalness: 0,
    });

    const darkHoleMaterial = new THREE.MeshStandardMaterial({
      color: 0x1A1A1A,
      roughness: 0.9,
    });

    const copperMaterial = new THREE.MeshStandardMaterial({
      color: 0xC87533,
      metalness: 0.7,
      roughness: 0.3,
    });

    const switchMaterial = new THREE.MeshStandardMaterial({
      color: 0x2A2A2A,
      roughness: 0.3,
      metalness: 0.05,
    });

    const indicatorMaterial = new THREE.MeshStandardMaterial({
      color: 0xDC143C,
      emissive: 0xFF0000,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.2,
    });

    const railMaterial = new THREE.MeshStandardMaterial({
      color: 0x2A2A2A,
      roughness: 0.5,
      metalness: 0.2,
      polygonOffset: true,
      polygonOffsetFactor: 2,
      polygonOffsetUnits: 2,
    });

    const cableMaterial = new THREE.MeshStandardMaterial({
      color: 0x2A2A2A,
      roughness: 0.8,
      metalness: 0,
    });

    const plugMaterial = new THREE.MeshStandardMaterial({
      color: 0xF5DEB3,
      roughness: 0.5,
      metalness: 0,
    });

    // TOP face = white panel. Others = brown body.
    const boxMaterials = [
      bodyMaterial, bodyMaterial, panelMaterial, bodyMaterial, bodyMaterial, bodyMaterial
    ];

    const blocks: THREE.Group[] = [];
    const spines: THREE.Group[] = [];

    // ── HEAD BLOCK ──
    const headGroup = new THREE.Group();
    const headW = 0.5, headH = 1.1, headD = 0.6;
    const frontZ = headD / 2;

    const headMesh = new THREE.Mesh(new THREE.BoxGeometry(headW, headH, headD), boxMaterials);
    headMesh.position.y = headH / 2;
    headMesh.castShadow = true;
    headMesh.receiveShadow = true;
    headGroup.add(headMesh);

    // Switch panel on top face
    const switchBase = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.02, 0.22), darkHoleMaterial);
    switchBase.position.set(0.08, headH + 0.01, -0.15);
    headGroup.add(switchBase);

    const switchBtn = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.16), switchMaterial);
    switchBtn.position.set(0.08, headH + 0.02, -0.15);
    switchBtn.rotation.x = -0.15;
    headGroup.add(switchBtn);

    // Red indicator dome on top face
    const indicator = new THREE.Mesh(new THREE.SphereGeometry(0.03, 16, 16), indicatorMaterial);
    indicator.position.set(-0.1, headH, -0.15);
    indicator.scale.y = 0.5;
    headGroup.add(indicator);

    // 3-hole triangular socket geometry (cylinder points up = goes into top face)
    const hGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.04, 16);

    const createSocketHoles = (grp: THREE.Group, cx: number, cy: number, cz: number) => {
      const offsets = [[0, -0.06], [-0.05, 0.04], [0.05, 0.04]];
      offsets.forEach(([ox, oz]) => {
        const hole = new THREE.Mesh(hGeo, darkHoleMaterial);
        hole.position.set(cx + ox, cy, cz + oz);
        grp.add(hole);
      });
    };

    createSocketHoles(headGroup, 0, headH, 0.15);

    // Cable — short, tight bezier, exits left side
    const cableCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-headW / 2, headH / 2, 0),
      new THREE.Vector3(-0.6, headH / 2, 0.4),
      new THREE.Vector3(-0.4, 0.1, 0.6)
    );
    const cableGeo = new THREE.TubeGeometry(cableCurve, 20, 0.035, 8, false);
    const cable = new THREE.Mesh(cableGeo, cableMaterial);
    cable.castShadow = true;
    if (window.innerWidth < 768) {
      cable.scale.set(0.75, 0.75, 0.75); // Keep cable tight on mobile
    }
    headGroup.add(cable);

    // Plug
    const plugGroup = new THREE.Group();
    plugGroup.position.set(-0.4, 0.1, 0.6);
    plugGroup.rotation.y = -Math.PI / 6;
    plugGroup.rotation.x = Math.PI / 4;

    const plugBody = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.2, 0.25), plugMaterial);
    plugBody.castShadow = true;
    plugGroup.add(plugBody);

    const pinGeo = new THREE.CylinderGeometry(0.012, 0.012, 0.15, 8);
    pinGeo.rotateX(Math.PI / 2);
    [
      [0, 0.05, 0.15],
      [-0.03, -0.04, 0.15],
      [0.03, -0.04, 0.15],
    ].forEach(([x, y, z]) => {
      const pin = new THREE.Mesh(pinGeo, copperMaterial);
      pin.position.set(x, y, z);
      plugGroup.add(pin);
    });
    headGroup.add(plugGroup);

    blocks.push(headGroup);
    group.add(headGroup);

    // ── EXTENSION SEGMENTS (S2, S3, S4) ──
    const heights = [0.9, 0.7, 0.5];
    const segW = 0.4;

    heights.forEach((h) => {
      const bGroup = new THREE.Group();
      const bMesh = new THREE.Mesh(new THREE.BoxGeometry(segW, h, headD), boxMaterials);
      bMesh.position.y = h / 2;
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;
      bGroup.add(bMesh);
      createSocketHoles(bGroup, 0, h, 0);
      blocks.push(bGroup);
      group.add(bGroup);
    });

    // ── END CAP ──
    const endCapGroup = new THREE.Group();
    const endCapH = heights[2];
    const endCapMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, endCapH, headD),
      [bodyMaterial, bodyMaterial, bodyMaterial, bodyMaterial, bodyMaterial, bodyMaterial]
    );
    endCapMesh.position.y = endCapH / 2;
    endCapMesh.castShadow = true;
    endCapMesh.receiveShadow = true;
    endCapGroup.add(endCapMesh);
    blocks.push(endCapGroup);
    group.add(endCapGroup);

    // ── CONNECTOR RAILS (top + bottom, with copper caps) ──
    for (let i = 0; i < blocks.length - 1; i++) {
      const spineGroup = new THREE.Group();
      const topRailY = heights[Math.min(i, heights.length - 1)] - 0.15;
      const botRailY = 0.15;

      const topRail = new THREE.Mesh(new THREE.BoxGeometry(1, 0.08, 0.1), railMaterial);
      topRail.position.y = topRailY;

      const bottomRail = new THREE.Mesh(new THREE.BoxGeometry(1, 0.08, 0.1), railMaterial);
      bottomRail.position.y = botRailY;

      const capGeo = new THREE.BoxGeometry(0.04, 0.1, 0.12);
      [[-0.5, topRailY], [0.5, topRailY], [-0.5, botRailY], [0.5, botRailY]].forEach(([x, y]) => {
        const cap = new THREE.Mesh(capGeo, copperMaterial);
        cap.position.set(x as number, y as number, 0);
        spineGroup.add(cap);
      });

      spineGroup.add(topRail, bottomRail);
      spines.push(spineGroup);
      group.add(spineGroup);
    }

    scene.add(group);

    // Handle Resize
    const onResize = () => {
      if (!canvasContainerRef.current) return;
      const width = canvasContainerRef.current.clientWidth;
      const height = canvasContainerRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;

      // Scale and position based on viewport — exact center
      if (window.innerWidth < 768) {
        group.scale.set(1.1, 1.1, 1.1);
        group.position.set(0, 0, 0);
      } else if (window.innerWidth < 1024) {
        group.scale.set(1.25, 1.25, 1.25);
        group.position.set(0, 0, 0);
      } else {
        group.scale.set(1.45, 1.45, 1.45);
        group.position.set(0, 0, 0);
      }

      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", onResize);
    onResize();

    let lastTime = performance.now();
    let accumulatedTime = 0;

    let animationFrameId: number;

    const animate = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;
      accumulatedTime += delta;

      // Subtle breathing float — not flying, just alive
      group.position.y = baseY + Math.sin(accumulatedTime * 1.2) * 0.05;

      // Animation cycle
      const cycleDuration = 6;
      const t = (accumulatedTime % cycleDuration) / cycleDuration;

      let pRaw = 0;
      if (t < 0.1) {
        pRaw = 0;
      } else if (t < 0.35) {
        pRaw = (t - 0.1) / 0.25;
      } else if (t < 0.75) {
        pRaw = 1;
      } else {
        pRaw = 1 - (t - 0.75) / 0.25;
      }

      const p = pRaw * pRaw * (3 - 2 * pRaw);

      const isMobile = window.innerWidth < 768;
      const MAX_OFFSET = isMobile ? 0.5 : 1.1;
      const explodeOffset = p * MAX_OFFSET;

      // Expand asymmetrically — cable side barely moves
      const leftTarget  = -explodeOffset * 0.2;
      const rightTarget =  explodeOffset * 1.8;
      const LEFT_LIMIT  = -1.0;
      const RIGHT_LIMIT =  3.0;

      // Lerp to avoid Z-fighting collision frames
      const LERP = 0.08;
      blocks[0].position.x = THREE.MathUtils.lerp(blocks[0].position.x, Math.max(leftTarget, LEFT_LIMIT), LERP);
      blocks[blocks.length - 1].position.x = THREE.MathUtils.lerp(blocks[blocks.length - 1].position.x, Math.min(rightTarget, RIGHT_LIMIT), LERP);

      // Distribute middle blocks with enforced min gap
      const MIN_GAP = 0.04;
      const rawSpread = blocks[blocks.length - 1].position.x - blocks[0].position.x;
      const spread = Math.max(rawSpread, MIN_GAP * (blocks.length - 1));
      const step = spread / (blocks.length - 1);
      for (let i = 1; i < blocks.length - 1; i++) {
        blocks[i].position.x = blocks[0].position.x + step * i;
      }

      // Stretch rails across gaps
      for (let i = 0; i < spines.length; i++) {
        const x1 = blocks[i].position.x;
        const x2 = blocks[i + 1].position.x;
        const gapCenter = (x1 + x2) / 2;
        const gapWidth  = Math.abs(x2 - x1);

        spines[i].position.x = gapCenter;

        spines[i].children.forEach((child, idx) => {
          const mesh = child as THREE.Mesh;
          if (!(mesh.geometry instanceof THREE.BoxGeometry)) return;
          // Last two children are the rails (added after caps)
          if (idx >= 4) {
            mesh.scale.x = gapWidth;
          } else {
            // Copper caps slide to the edges
            mesh.position.x = idx % 2 === 0 ? -gapWidth / 2 : gapWidth / 2;
          }
        });
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame((t) => { lastTime = t; animate(t); });

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <section className={styles.heroSection} ref={containerRef}>
      {/* Name + role overlaid top-left — stays as-is */}
      <div className={styles.leftPane}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>SASIDHARAN</h1>
          <p className={styles.subtitle}>Product Designer</p>
        </div>
      </div>

      <div className={styles.heroBody}>
        {/* 3D Model Stage — full width */}
        <div className={styles.modelColumn}>
          <div className={styles.productWrapper}>
            <div className={styles.canvasContainer} ref={canvasContainerRef}>
              <canvas ref={canvasRef} className={styles.webglCanvas} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom center label */}
      <div className={styles.productTagline}>
        Extensible Portable Extension Box
      </div>
    </section>
  );
};

export default Hero;
