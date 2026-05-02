"use client";

import { useEffect, useRef } from 'react';

interface ThreadsBackgroundProps {
  isHovered?: boolean;
}

export function ThreadsBackground({ isHovered = false }: ThreadsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Configuration
    const config = {
      color: [139, 69, 19], // Saddle Brown (RGB)
      amplitude: 0.6,
      distance: 0.2,
      frequency: 0.002,
      lineWidth: 0.5,
    };

    let time = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const targetOpacity = isHovered ? 0.15 : 0.05;
      ctx.strokeStyle = `rgba(${config.color[0]}, ${config.color[1]}, ${config.color[2]}, ${targetOpacity})`;
      ctx.lineWidth = config.lineWidth;

      // Draw threads
      const threadCount = 12;
      for (let i = 0; i < threadCount; i++) {
        const startX = (i / threadCount) * canvas.width;
        ctx.beginPath();
        ctx.moveTo(startX, 0);

        for (let y = 0; y < canvas.height; y += 5) {
          const distanceToMouse = Math.sqrt(
            Math.pow(startX + Math.sin((y + time) * config.frequency + i) * config.amplitude - mouseX, 2) +
            Math.pow(y - mouseY, 2)
          );

          const pull = Math.max(0, config.distance - distanceToMouse / 100);
          const x = startX + Math.sin((y + time) * config.frequency + i) * config.amplitude + pull * 20;

          ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      time += 0.5;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        transition: 'opacity 0.6s ease',
      }}
    />
  );
}
