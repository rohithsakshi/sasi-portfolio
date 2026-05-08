'use client'

import React, { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { animated } from '@react-spring/three'
import * as THREE from 'three'
import { useAntiGravity } from './useAntiGravity'

interface AntiGravityProps {
  floatSpeed?: number
  floatAmplitude?: number
  rotationSpeed?: number
  parallaxStrength?: number
  entranceDuration?: number
}

function ProductModel(props: AntiGravityProps) {
  const { groupRef, spring, shadowRef } = useAntiGravity(props)

  const mats = useMemo(() => ({
    beige: new THREE.MeshPhysicalMaterial({
      color: '#C8B090',
      roughness: 0.20,
      metalness: 0.88,
      reflectivity: 0.9,
      envMapIntensity: 1.6,
    }),
    graphite: new THREE.MeshPhysicalMaterial({
      color: '#141414',
      roughness: 0.52,
      metalness: 0.42,
      envMapIntensity: 1.1,
    }),
    white: new THREE.MeshPhysicalMaterial({
      color: '#E4E2DE',
      roughness: 0.62,
      metalness: 0.0,
    }),
    glossBlack: new THREE.MeshPhysicalMaterial({
      color: '#050505',
      roughness: 0.02,
      metalness: 0.96,
      envMapIntensity: 2.2,
    }),
    steel: new THREE.MeshPhysicalMaterial({
      color: '#909090',
      roughness: 0.16,
      metalness: 1.0,
    }),
  }), [])

  return (
    <group>
      <animated.group position={spring.position}>
        <animated.group ref={groupRef}>
          {/* Lower base */}
          <mesh castShadow position={[0, -0.045, 0]}>
            <cylinderGeometry args={[0.033, 0.033, 0.090, 64]} />
            <animated.meshPhysicalMaterial 
              {...(mats.graphite as any)} 
              transparent 
              opacity={spring.opacity} 
            />
          </mesh>

          {/* Port slot inset (Lower base) */}
          <mesh position={[0, -0.045, 0.032]}>
            <boxGeometry args={[0.018, 0.006, 0.004]} />
            <animated.meshPhysicalMaterial 
              {...(mats.glossBlack as any)} 
              transparent 
              opacity={spring.opacity} 
            />
          </mesh>

          {/* Upper body */}
          <mesh castShadow position={[0, 0.09, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 0.180, 64]} />
            <animated.meshPhysicalMaterial 
              {...(mats.beige as any)} 
              transparent 
              opacity={spring.opacity} 
            />
          </mesh>

          {/* Grille backing (Recess) */}
          <mesh position={[0, 0.11, 0.029]}>
            <boxGeometry args={[0.046, 0.076, 0.002]} />
            <animated.meshPhysicalMaterial 
              {...(mats.graphite as any)} 
              transparent 
              opacity={spring.opacity} 
            />
          </mesh>

          {/* Grille fins (Centred on front face) */}
          <group position={[0, 0.11, 0.031]}>
             {Array.from({ length: 7 }).map((_, i) => (
               <mesh key={i} castShadow position={[(i - 3) * 0.0055, 0, 0]}>
                 <boxGeometry args={[0.002, 0.074, 0.004]} />
                 <animated.meshPhysicalMaterial 
                   {...(mats.graphite as any)} 
                   transparent 
                   opacity={spring.opacity} 
                 />
               </mesh>
             ))}
          </group>

          {/* Top cap */}
          <mesh position={[0, 0.185, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 0.010, 64]} />
            <animated.meshPhysicalMaterial 
              {...(mats.white as any)} 
              transparent 
              opacity={spring.opacity} 
            />
          </mesh>

          {/* Latch tab (Top edge) */}
          <mesh position={[0.024, 0.183, -0.010]}>
            <boxGeometry args={[0.008, 0.014, 0.012]} />
            <animated.meshPhysicalMaterial 
              {...(mats.graphite as any)} 
              transparent 
              opacity={spring.opacity} 
            />
          </mesh>

          {/* Pin rod + cap */}
          <mesh castShadow position={[0, 0.217, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.054, 32]} />
            <animated.meshPhysicalMaterial 
              {...(mats.glossBlack as any)} 
              transparent 
              opacity={spring.opacity} 
            />
          </mesh>
          <mesh position={[0, 0.244, 0]}>
            <sphereGeometry args={[0.005, 16]} />
            <animated.meshPhysicalMaterial 
              {...(mats.glossBlack as any)} 
              transparent 
              opacity={spring.opacity} 
            />
          </mesh>

          {/* Feet */}
          {[0, 1, 2].map((i) => {
            const angle = (i * 120 + 60) * (Math.PI / 180)
            const r = 0.020
            return (
              <group key={i} position={[Math.cos(angle) * r, -0.090, Math.sin(angle) * r]}>
                <mesh position={[0, -0.005, 0]}>
                  <cylinderGeometry args={[0.003, 0.003, 0.010, 16]} />
                  <animated.meshPhysicalMaterial 
                    {...(mats.steel as any)} 
                    transparent 
                    opacity={spring.opacity} 
                  />
                </mesh>
                <mesh position={[0, -0.014, 0]}>
                  <coneGeometry args={[0.003, 0.008, 16]} />
                  <animated.meshPhysicalMaterial 
                    {...(mats.steel as any)} 
                    transparent 
                    opacity={spring.opacity} 
                  />
                </mesh>
              </group>
            )
          })}
        </animated.group>
      </animated.group>

      <ContactShadows
        ref={shadowRef}
        position={[0, -0.16, 0]}
        opacity={0.3}
        scale={0.5}
        blur={2.5}
        far={0.3}
      />
    </group>
  )
}

export default function AntiGravityScene(props: AntiGravityProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        position: [0.14, 0.04, 0.44],
        fov: 26,
        near: 0.01,
        far: 10,
      }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Environment preset="warehouse" />
        
        {/* Key light: warm */}
        <directionalLight
          intensity={2.4}
          color="#FFF0D0"
          position={[2, 3.5, -1.5]}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        
        {/* Fill light: cool */}
        <directionalLight
          intensity={0.55}
          color="#D0E4FF"
          position={[-2.5, 1, 2]}
        />

        {/* Rim light */}
        <pointLight
          intensity={1.0}
          color="#FFF5E8"
          position={[0.2, 2, -2]}
        />

        <ProductModel {...props} />
      </Suspense>
    </Canvas>
  )
}
