'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Dynamic import with SSR disabled is mandatory for Three.js in Next.js
const AntiGravityScene = dynamic(
  () => import('./AntiGravityScene'),
  {
    ssr: false,
    loading: () => (
      <div 
        className="w-full h-full bg-transparent flex items-center justify-center"
        style={{ height: '100vh' }}
      >
        {/* Optional: Add a simple loader or placeholder */}
      </div>
    ),
  }
)

interface AntiGravityHeroProps {
  floatSpeed?: number
  floatAmplitude?: number
  rotationSpeed?: number
  parallaxStrength?: number
  entranceDuration?: number
}

/**
 * AntiGravityHero
 * A premium 3D hero section component featuring a floating industrial product.
 * Built with React Three Fiber, Drei, and React Spring.
 */
export default function AntiGravityHero(props: AntiGravityHeroProps) {
  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden">
      <AntiGravityScene {...props} />
    </div>
  )
}
