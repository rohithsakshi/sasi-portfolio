'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef, useMemo } from 'react'
import { PerspectiveCamera, OrbitControls, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'
import type { Group } from 'three'

interface ScrollHeroCanvasProps {
  scrollProgress: number
}

function ProductModel({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<Group>(null)
  const upperBodyRef = useRef<Group>(null)
  const lowerBaseRef = useRef<Group>(null)
  const grilleRef = useRef<Group>(null)
  const pinRef = useRef<Group>(null)
  const feetRef = useRef<Group>(null)

  const materials = useMemo(() => ({
    beige: new THREE.MeshStandardMaterial({ 
      color: '#c8b47a', 
      roughness: 0.15, 
      metalness: 0.8,
      envMapIntensity: 1 
    }),
    graphite: new THREE.MeshStandardMaterial({ 
      color: '#1a1a1a', 
      roughness: 0.5, 
      metalness: 0.4,
      envMapIntensity: 0.8 
    }),
    white: new THREE.MeshStandardMaterial({ 
      color: '#e2e0dc', 
      roughness: 0.6 
    }),
    gloss: new THREE.MeshStandardMaterial({ 
      color: '#080808', 
      roughness: 0.05, 
      metalness: 0.9,
      envMapIntensity: 1.5 
    }),
    steel: new THREE.MeshStandardMaterial({ 
      color: '#8a8a8a', 
      roughness: 0.1, 
      metalness: 1.0 
    }),
  }), [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    
    // Automatic rotation
    groupRef.current.rotation.y += delta * 0.1

    // Explosion Factor peaks at 0.5 and returns to 0 at 1.0 (reassembly)
    const clampedProgress = Math.max(0, Math.min(scrollProgress, 1))
    const explosionFactor = Math.sin(clampedProgress * Math.PI)

    // Apply Transforms (Centered at 0,0,0)
    if (upperBodyRef.current) {
      upperBodyRef.current.position.y = 0.4 + explosionFactor * 0.7
      upperBodyRef.current.position.z = explosionFactor * 0.3
      upperBodyRef.current.rotation.z = explosionFactor * 0.2
    }

    if (lowerBaseRef.current) {
      lowerBaseRef.current.position.y = -0.4 - explosionFactor * 0.6
      lowerBaseRef.current.position.z = explosionFactor * 0.2
      lowerBaseRef.current.rotation.z = -explosionFactor * 0.15
    }

    if (grilleRef.current) {
      grilleRef.current.position.x = -explosionFactor * 0.8
      grilleRef.current.rotation.x = explosionFactor * 0.3
    }

    if (pinRef.current) {
      pinRef.current.position.y = 1.2 + explosionFactor * 0.8
      pinRef.current.rotation.x = explosionFactor * Math.PI * 0.4
    }

    if (feetRef.current) {
      feetRef.current.position.y = -0.9 - explosionFactor * 0.3
      feetRef.current.scale.setScalar(1 + explosionFactor * 0.15)
    }
  })

  return (
    <group ref={groupRef} scale={1.2}>
      {/* LOWER BASE */}
      <group ref={lowerBaseRef} position={[0, -0.4, 0]}>
        <mesh material={materials.graphite} castShadow>
          <cylinderGeometry args={[0.33, 0.33, 0.9, 32]} />
        </mesh>
        <mesh material={materials.gloss} position={[0, -0.95, 0.32]}>
          <boxGeometry args={[0.18, 0.06, 0.04]} />
        </mesh>
      </group>

      {/* UPPER BODY */}
      <group ref={upperBodyRef} position={[0, 0.4, 0]}>
        <mesh material={materials.beige} castShadow>
          <cylinderGeometry args={[0.32, 0.32, 1.8, 32]} />
        </mesh>
      </group>

      {/* GRILLE FINS */}
      <group ref={grilleRef} position={[0, 1.1, 0.31]}>
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh key={i} material={materials.graphite} position={[-0.16 + i * 0.055, 0, 0]}>
            <boxGeometry args={[0.02, 0.74, 0.04]} />
          </mesh>
        ))}
      </group>

      {/* TOP CAP */}
      <mesh material={materials.white} position={[0, 1.85, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.1, 32]} />
      </mesh>

      {/* PIN */}
      <group ref={pinRef} position={[0, 1.2, 0]}>
        <mesh material={materials.gloss}>
          <cylinderGeometry args={[0.05, 0.05, 0.54, 16]} />
        </mesh>
        <mesh material={materials.gloss} position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.05, 16, 8]} />
        </mesh>
      </group>

      {/* FEET */}
      <group ref={feetRef} position={[0, -0.9, 0]}>
        {[0, 1, 2].map((i) => {
          const angle = (i * 120 + 60) * (Math.PI / 180)
          return (
            <mesh key={i} material={materials.steel} position={[Math.cos(angle) * 0.2, 0, Math.sin(angle) * 0.2]}>
              <cylinderGeometry args={[0.03, 0.03, 0.1, 12]} />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

export default function ScrollHeroInner({ scrollProgress }: ScrollHeroCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={40} />
      
      {/* Interaction for "see full product" */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        makeDefault 
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#D6E8FF" />

      <Suspense fallback={null}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <ProductModel scrollProgress={scrollProgress} />
        </Float>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
