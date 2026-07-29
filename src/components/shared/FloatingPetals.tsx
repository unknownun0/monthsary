'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [height, setHeight] = useState(1000);

  useEffect(() => {
    setHeight(window.innerHeight + 20);
    const newPetals: Petal[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 12 + Math.random() * 16,
      rotation: Math.random() * 360,
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{ left: petal.x + "%", top: -20 }}
          animate={{
            y: [0, height],
            rotate: [petal.rotation, petal.rotation + 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg width={petal.size} height={petal.size} viewBox="0 0 24 24" fill="#F8C8DC" opacity="0.6">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" />
            <path d="M12 7C14.21 7 16 5.21 16 3C16 2.79 15.97 2.59 15.92 2.39C17.23 3.26 18 4.79 18 6.5C18 9.54 15.54 12 12.5 12H11.5C8.46 12 6 9.54 6 6.5C6 4.79 6.77 3.26 8.08 2.39C8.03 2.59 8 2.79 8 3C8 5.21 9.79 7 12 7Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
