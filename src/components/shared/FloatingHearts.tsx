'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  delay: number;
  size: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [height, setHeight] = useState(1000);

  useEffect(() => {
    setHeight(window.innerHeight + 30);
    const h: Heart[] = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 15,
      size: 10 + Math.random() * 16,
    }));
    setHearts(h);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{ left: heart.x + "%", top: -30 }}
          animate={{
            y: [0, height],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg width={heart.size} height={heart.size} viewBox="0 0 24 24" fill="#D96C8A" opacity="0.3">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
