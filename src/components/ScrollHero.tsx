'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const ScrollHeroInner = dynamic(
  () => import('./3d/ScrollHeroInner'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        width: '100%',
        height: '100vh',
        background: '#F0E8D8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{ color: '#8B5C2A', fontSize: 14, opacity: 0.5 }}>Loading product...</p>
      </div>
    ),
  }
)

export default function ScrollHero() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const container = containerRef.current
      const rect = container.getBoundingClientRect()
      
      // Calculate progress across the 250vh height
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)))
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '250vh', // Extended scroll track
        background: '#F0E8D8',
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}>
        {/* Full-Screen 3D Canvas */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}>
          <ScrollHeroInner scrollProgress={scrollProgress} />
        </div>

        {/* Initial Hero Text: Fades out as you scroll down */}
        <div
          style={{
            position: 'absolute',
            left: '8vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '35%',
            zIndex: 10,
            opacity: Math.max(0, 1 - scrollProgress * 3),
            pointerEvents: scrollProgress > 0.1 ? 'none' : 'auto',
          }}
        >
          <p style={{ fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8B5C2A', opacity: 0.5, margin: '0 0 24px' }}>Personal safety</p>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 500, lineHeight: 1.1, color: '#8B5C2A', margin: '0 0 24px' }}>Always on.<br />Never obvious.</h1>
          <p style={{ fontSize: 16, color: '#8B5C2A', opacity: 0.6, lineHeight: 1.7, margin: '0 0 40px', maxWidth: 340 }}>Precision engineered. Concealed in plain sight.</p>
        </div>

        {/* Details Overlay: Appears during explosion (around 0.5 progress) */}
        <div
          style={{
            position: 'absolute',
            right: '8vw',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '30%',
            zIndex: 10,
            opacity: Math.max(0, Math.min(1, (scrollProgress - 0.2) * 5) * Math.min(1, (0.8 - scrollProgress) * 5)),
            pointerEvents: scrollProgress > 0.2 && scrollProgress < 0.8 ? 'auto' : 'none',
          }}
        >
          <h2 style={{ fontSize: 32, fontWeight: 500, marginBottom: 24, color: '#8B5C2A' }}>Engineered for precision.</h2>
          <div style={{ display: 'grid', gap: 32 }}>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#8B5C2A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Materials</h3>
              <p style={{ fontSize: 14, color: '#8B5C2A', opacity: 0.7, lineHeight: 1.6 }}>Anodized aluminum, matte graphite, and surgical-grade stainless steel.</p>
            </div>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8, color: '#8B5C2A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Design</h3>
              <p style={{ fontSize: 14, color: '#8B5C2A', opacity: 0.7, lineHeight: 1.6 }}>Inspired by minimalist industrial philosophy. Premium durability in every detail.</p>
            </div>
          </div>
        </div>

        {/* Final Transition Hint: Appears as product reassembles (near 1.0) */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '10vh',
            transform: 'translateX(-50%)',
            zIndex: 10,
            opacity: Math.max(0, (scrollProgress - 0.8) * 5),
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#8B5C2A', opacity: 0.5 }}>Moving to Projects</p>
        </div>
      </div>
    </div>
  )
}
