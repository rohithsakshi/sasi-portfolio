import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useSpring } from '@react-spring/three'
import * as THREE from 'three'

interface AntiGravityOptions {
  floatSpeed?: number
  floatAmplitude?: number
  rotationSpeed?: number
  parallaxStrength?: number
  entranceDuration?: number
}

export function useAntiGravity({
  floatSpeed = 1,
  floatAmplitude = 0.018, // Adjusted for '18px' visual feel
  rotationSpeed = 0.08,
  parallaxStrength = 1,
  entranceDuration = 1200,
}: AntiGravityOptions = {}) {
  const { mouse } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const shadowRef = useRef<any>(null)

  // Entrance Animation: Y starts at -0.3, opacity 0
  const [spring, api] = useSpring(() => ({
    position: [0, -0.3, 0] as [number, number, number],
    opacity: 0,
    config: { duration: entranceDuration },
  }))

  useEffect(() => {
    api.start({
      position: [0, 0, 0],
      opacity: 1,
      config: { 
        duration: entranceDuration,
        easing: (t: number) => 1 - Math.pow(1 - t, 3) // easeOutCubic
      },
    })
  }, [api, entranceDuration])

  const smoothMouse = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    // 1. Float Animation (Sine wave)
    // Period ~3 seconds => frequency = 1/3 Hz => 2*PI/3 rad/sec
    const floatY = Math.sin(t * (Math.PI * 2 / 3) * floatSpeed) * floatAmplitude
    
    // 2. Continuous Y-axis auto-rotation
    const autoRotation = t * rotationSpeed

    // 3. Parallax Logic (±12° extra tilt)
    // 12 degrees ≈ 0.21 radians
    smoothMouse.current.x += (mouse.x - smoothMouse.current.x) * 0.035
    smoothMouse.current.y += (mouse.y - smoothMouse.current.y) * 0.035

    const tiltX = smoothMouse.current.y * -0.21 * parallaxStrength
    const tiltY = smoothMouse.current.x * 0.21 * parallaxStrength

    // Apply to group
    groupRef.current.position.y = floatY
    groupRef.current.rotation.y = autoRotation + tiltY
    groupRef.current.rotation.x = tiltX

    // 4. Shadow Opacity Pulse
    if (shadowRef.current) {
      // Darkens as product descends (floatY is negative), lightens as it rises
      // Range: floatY from -amplitude to +amplitude
      // Inverse mapping: -amplitude -> higher opacity, +amplitude -> lower opacity
      const norm = (floatY + floatAmplitude) / (2 * floatAmplitude)
      shadowRef.current.opacity = 0.4 - (norm * 0.15) // Pulsing between 0.25 and 0.4
    }
  })

  return { groupRef, spring, shadowRef }
}
