"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  shape: "circle" | "square" | "heart";
}

const COLORS = [
  "#f8c8dc",
  "#ffd1dc",
  "#fce4ec",
  "#d4a574",
  "#e8a0b4",
  "#ffb7c5",
  "#f5d5d9",
  "#ffc0cb",
];

export default function Confetti({ active = false, count = 80 }: { active?: boolean; count?: number }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(false);

  const generate = useCallback(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      rotation: Math.random() * 720 - 360,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 10 + 5,
      shape: (["circle", "square", "heart"] as const)[Math.floor(Math.random() * 3)],
    }));
  }, [count]);

  useEffect(() => {
    if (active) {
      setPieces(generate());
      setIsActive(true);
      const timeout = setTimeout(() => setIsActive(false), 5000);
      return () => clearTimeout(timeout);
    } else {
      setIsActive(false);
      setPieces([]);
    }
  }, [active, generate]);

  return (
    <AnimatePresence>
      {isActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute"
              style={{ left: `${piece.x}%` }}
              initial={{ y: `${piece.y}vh`, rotate: 0, opacity: 1 }}
              animate={{
                y: "110vh",
                rotate: piece.rotation,
                opacity: [1, 1, 0.8, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2.5 + Math.random() * 2,
                ease: "easeIn",
                delay: Math.random() * 0.5,
              }}
            >
              {piece.shape === "circle" ? (
                <div
                  style={{
                    width: piece.size,
                    height: piece.size,
                    borderRadius: "50%",
                    background: piece.color,
                  }}
                />
              ) : piece.shape === "square" ? (
                <div
                  style={{
                    width: piece.size,
                    height: piece.size,
                    background: piece.color,
                    transform: `rotate(${piece.rotation}deg)`,
                  }}
                />
              ) : (
                <span style={{ fontSize: piece.size + 4, color: piece.color }}>
                  ♥
                </span>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
