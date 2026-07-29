"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotation: number;
}

export default function FloatingHearts({ count = 10 }: { count?: number }) {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [mounted, setMounted] = useState(false);

  const generateHearts = useCallback(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.4 + 0.2,
      rotation: Math.random() * 360,
    }));
  }, [count]);

  useEffect(() => {
    setHearts(generateHearts());
    setMounted(true);
    const interval = setInterval(() => {
      setHearts(generateHearts());
    }, 15000);
    return () => clearInterval(interval);
  }, [generateHearts]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{
              left: `${heart.x}%`,
              bottom: "-5%",
              fontSize: `${heart.size}px`,
              opacity: heart.opacity,
            }}
            initial={{ y: "100vh", rotate: heart.rotation, scale: 0 }}
            animate={{
              y: "-110vh",
              rotate: heart.rotation + 360,
              scale: [0, 1.2, 1],
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "linear",
            }}
          >
            <span className="heart-glow">❤️</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
