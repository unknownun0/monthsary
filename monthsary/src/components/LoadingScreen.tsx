"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onComplete, 500);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-romantic-cream via-romantic-light to-romantic-pink"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-6"
          >
            💗
          </motion.div>

          <p className="text-2xl font-dancing text-romantic-foreground mb-8">
            Loading something special...
          </p>

          <div className="w-48 h-1.5 rounded-full bg-white/50 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-romantic-pink to-romantic-rose"
              style={{ width: `${Math.min(100, progress)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <p className="text-sm text-romantic-foreground/40 mt-3 font-quicksand">
            {Math.min(100, Math.floor(progress))}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
