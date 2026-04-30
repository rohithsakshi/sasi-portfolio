"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Torus, Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import { useScroll, useTransform } from "framer-motion";

function FloatingOrb({ position, color, scale, speed, distort, parallaxMultiplier }: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
  distort: number;
  parallaxMultiplier: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useScroll();
  const { mouse, viewport } = useThree();
  
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Scroll Parallax (drift upward at 0.3x scroll speed)
    const scrollOffset = scrollYProgress.get() * 10; // scale scroll
    meshRef.current.position.y = initialY + scrollOffset * 0.3;

    // Mouse Parallax
    const targetX = (mouse.x * viewport.width) / 2;
    const targetY = (mouse.y * viewport.height) / 2;
    
    meshRef.current.position.x += (targetX * parallaxMultiplier - (meshRef.current.position.x - position[0])) * 0.05;
    meshRef.current.position.y += (targetY * parallaxMultiplier - (meshRef.current.position.y - (initialY + scrollOffset * 0.3))) * 0.05;

    // Rotation linked to cursor X
    meshRef.current.rotation.y = mouse.x * Math.PI * 0.5;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * speed * 0.3;
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={scale} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0}
          metalness={0.1}
          transparent
          opacity={0.35}
        />
      </Sphere>
    </Float>
  );
}

function FloatingRing({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.4;
    ref.current.rotation.z = state.clock.getElapsedTime() * 0.2;
  });
  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1}>
      <Torus ref={ref} args={[1.2, 0.04, 16, 100]} position={position}>
        <meshStandardMaterial color={color} transparent opacity={0.4} metalness={0.8} roughness={0.1} />
      </Torus>
    </Float>
  );
}

function GeoShape({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.3;
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
  });
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <Icosahedron ref={ref} args={[0.7, 0]} position={position}>
        <meshStandardMaterial color="#1a9ef5" transparent opacity={0.25} wireframe />
      </Icosahedron>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#1a6ef5" />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#1a9ef5" />

        <FloatingOrb position={[-4, 2, -2]} color="#1a6ef5" scale={1.8} speed={1.2} distort={0.4} parallaxMultiplier={0.02} />
        <FloatingOrb position={[4, -2, -3]} color="#1a9ef5" scale={1.4} speed={0.8} distort={0.5} parallaxMultiplier={0.04} />
        <FloatingOrb position={[0, 3, -4]} color="#c8d8e8" scale={2.2} speed={0.6} distort={0.3} parallaxMultiplier={0.06} />
        <FloatingOrb position={[5, 1, -1]} color="#1a6ef5" scale={0.9} speed={1.5} distort={0.6} parallaxMultiplier={0.03} />

        <FloatingRing position={[-3, -2, -2]} color="#1a6ef5" />
        <FloatingRing position={[3, 2, -3]} color="#1a9ef5" />

        <GeoShape position={[2, -3, -1]} />
        <GeoShape position={[-2, 1, -2]} />
      </Canvas>
    </div>
  );
}
