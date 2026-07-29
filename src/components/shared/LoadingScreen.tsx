'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 15, 100));
    }, 200);
    setTimeout(() => clearInterval(interval), 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "#F9F5EF" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-6xl mb-6"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ❤️
      </motion.div>
      <h2 className="handwritten-serif text-2xl text-rose mb-4" style={{ fontFamily: "var(--font-dancing)" }}>
        Opening Our Scrapbook...
      </h2>
      <div className="w-48 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(214, 179, 106, 0.2)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #D6B36A, #D96C8A)" }}
          animate={{ width: progress + "%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="handwritten text-brown text-sm mt-3" style={{ fontFamily: "var(--font-caveat)" }}>
        {Math.round(progress)}%
      </p>
    </motion.div>
  );
}
