"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onDone: () => void;
}

export default function Section8_FinalSurprise({ onDone }: Props) {
  const [showButton, setShowButton] = useState(false);

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 py-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onAnimationComplete={() => setTimeout(() => setShowButton(true), 1200)}
        className="relative z-10 text-center"
      >
        {/* Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute text-lg"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative inline-block"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative rounded-2xl p-1 animate-border-glow">
            <div className="rounded-2xl p-2 bg-gradient-to-br from-romantic-pink via-romantic-light to-romantic-cream shadow-2xl">
              <div className="rounded-xl overflow-hidden">
                <img
                  src="/herogallery/20251105_164013938.JPG"
                  alt="Our Memory"
                  className="w-full max-w-sm h-auto object-cover aspect-[4/5]"
                />
              </div>
            </div>
          </div>

          {[
            { x: -30, y: -30, delay: 0 },
            { x: 30, y: -40, delay: 0.5 },
            { x: -40, y: 20, delay: 1 },
            { x: 40, y: 30, delay: 1.5 },
            { x: 0, y: -50, delay: 2 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              style={{ left: `calc(50% + ${pos.x}px)`, top: `calc(50% + ${pos.y}px)` }}
              animate={{
                y: [-5, -15, -5],
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: pos.delay,
                ease: "easeInOut",
              }}
            >
              ❤️
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl sm:text-2xl font-dancing text-romantic-foreground/80 mt-8"
        >
          Thank you for being the best part of my life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex gap-2 justify-center mt-4 text-sm"
        >
          {["🌸", "✨", "💗", "✨", "🌸"].map((s, i) => (
            <motion.span
              key={i}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
            >
              {s}
            </motion.span>
          ))}
        </motion.div>

        {showButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-8"
          >
            <Instruction text="Tap to see our beautiful moments together" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDone}
              className="px-8 py-3 rounded-full glass-strong text-romantic-foreground font-dancing text-lg shadow-lg border border-white/30"
            >
              See Our Moments 💕
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

function Instruction({ text }: { text: string }) {
  return (
    <p className="text-xs sm:text-sm text-romantic-rose/60 mb-4 font-quicksand tracking-wide">
      💡 {text}
    </p>
  );
}
