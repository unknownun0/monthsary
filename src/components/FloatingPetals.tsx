"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
}

const PETAL_COLORS = [
  "#f8c8dc",
  "#fce4ec",
  "#fdf6f0",
  "#f5d5d9",
  "#ffe0ec",
  "#ffd1dc",
];

export default function FloatingPetals({ count = 15 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPetals(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 12 + 8,
        duration: Math.random() * 15 + 20,
        delay: Math.random() * 15,
        rotation: Math.random() * 360,
      }))
    );
    setMounted(true);
  }, [count]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute"
            style={{
              left: `${petal.x}%`,
              top: "-5%",
              width: `${petal.size}px`,
              height: `${petal.size}px`,
            }}
            initial={{ y: "-10vh", x: 0, rotate: 0, opacity: 0.8 }}
            animate={{
              y: "110vh",
              x: [0, -30, 30, -20, 20, 0],
              rotate: [0, 90, 180, 270, 360],
              opacity: [0.8, 0.6, 0.4, 0.2, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: "easeInOut",
            }}
          >
            <svg viewBox="0 0 24 24" fill={PETAL_COLORS[petal.id % PETAL_COLORS.length]}>
              <path d="M12 2C12 2 6 8 6 14c0 3.3 2.7 6 6 6s6-2.7 6-6c0-6-6-12-6-12z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
