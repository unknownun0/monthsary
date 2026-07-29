"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  life: number;
}

interface Explosion {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
}

const COLORS = [
  "#f8c8dc",
  "#ffd1dc",
  "#fce4ec",
  "#d4a574",
  "#e8a0b4",
  "#ffb7c5",
  "#f5d5d9",
  "#ff69b4",
  "#ff1493",
  "#ffc0cb",
];

export default function Fireworks({ active = false }: { active?: boolean }) {
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [isActive, setIsActive] = useState(false);

  const createExplosion = useCallback((id: number) => {
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 40 + 10;
    const count = 30 + Math.floor(Math.random() * 30);
    const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12 - 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 4 + 2,
      life: 1,
    }));
    return { id, x, y, particles };
  }, []);

  useEffect(() => {
    if (!active) {
      setExplosions([]);
      setIsActive(false);
      return;
    }

    setIsActive(true);
    let explosionId = 0;
    const interval = setInterval(() => {
      setExplosions((prev) => [
        ...prev.slice(-3),
        createExplosion(explosionId++),
      ]);
    }, 800);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setTimeout(() => setIsActive(false), 2000);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [active, createExplosion]);

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {explosions.map((exp) => (
            <motion.div
              key={exp.id}
              className="absolute"
              style={{ left: `${exp.x}%`, top: `${exp.y}%` }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              {exp.particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute rounded-full"
                  style={{
                    width: p.size,
                    height: p.size,
                    background: p.color,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: p.vx * 20,
                    y: p.vy * 20,
                    opacity: [1, 0.8, 0],
                    scale: [1, 0.5, 0],
                  }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
