"use client";

import { useEffect, useState, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  angle: number;
  color: string;
}

export default function HeartParticles({ active = false }: { active?: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      particlesRef.current = [];
      cancelAnimationFrame(animRef.current);
      return;
    }

    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 20,
      y: 50 + (Math.random() - 0.5) * 20,
      size: Math.random() * 6 + 3,
      speed: Math.random() * 0.5 + 0.2,
      opacity: 1,
      angle: Math.random() * Math.PI * 2,
      color: ["#f8c8dc", "#ffd1dc", "#fce4ec", "#e8a0b4", "#ff69b4"][Math.floor(Math.random() * 5)],
    }));
    particlesRef.current = newParticles;
    setParticles(newParticles);

    const animate = () => {
      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          angle: p.angle + 0.02,
          x: p.x + Math.cos(p.angle) * p.speed,
          y: p.y + Math.sin(p.angle) * p.speed - p.speed * 0.3,
          opacity: Math.max(0, p.opacity - 0.005),
        }))
        .filter((p) => p.opacity > 0);

      if (particlesRef.current.length < 50) {
        const toAdd = 50 - particlesRef.current.length;
        for (let i = 0; i < toAdd; i++) {
          particlesRef.current.push({
            id: Date.now() + i,
            x: 50 + (Math.random() - 0.5) * 10,
            y: 60,
            size: Math.random() * 6 + 3,
            speed: Math.random() * 0.5 + 0.2,
            opacity: 1,
            angle: -Math.PI / 2 + (Math.random() - 0.5),
            color: ["#f8c8dc", "#ffd1dc", "#fce4ec", "#e8a0b4", "#ff69b4"][Math.floor(Math.random() * 5)],
          });
        }
      }

      setParticles([...particlesRef.current]);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  if (!active || particles.length === 0) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            fontSize: p.size + 4,
            lineHeight: 1,
            color: p.color,
            transform: "translate(-50%, -50%)",
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
}
