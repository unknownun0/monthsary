'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface StickyNoteProps {
  title: string;
  message: string;
  color?: string;
  rotate?: number;
  className?: string;
}

export default function StickyNote({ title, message, color = "#FFF8DC", rotate = 0, className = "" }: StickyNoteProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      className={"relative cursor-pointer " + className}
      style={{ perspective: 1000 }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
      >
        <div
          className="rounded-sm p-4 min-h-[100px] min-w-[120px] flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            background: color,
            transform: "rotate(" + rotate + "deg)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
            border: "1px solid #E8D5A3",
          }}
        >
          <p className="handwritten text-lg font-semibold text-dark-text text-center" style={{ fontFamily: "var(--font-caveat)" }}>
            {title}
          </p>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#D96C8A" className="mt-2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div
          className="absolute inset-0 rounded-sm p-4 flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotate(" + rotate + "deg) rotateY(180deg)",
            background: color,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
            border: "1px solid #E8D5A3",
          }}
        >
          <p className="handwritten text-base text-dark-text text-center" style={{ fontFamily: "var(--font-caveat)" }}>
            {message}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
