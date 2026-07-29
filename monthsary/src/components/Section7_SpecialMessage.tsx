"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onDone: () => void;
}

export default function Section7_SpecialMessage({ onDone }: Props) {
  const [showButton, setShowButton] = useState(false);

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-lg w-full"
      >
        <div className="glass-strong rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/40 text-center">
          {[
            { text: "No matter where we go...", delay: 0.2, className: "text-xl sm:text-2xl font-dancing text-romantic-foreground/70 mb-6 leading-relaxed" },
            { text: "No matter what we eat...", delay: 0.6, className: "text-xl sm:text-2xl font-dancing text-romantic-foreground/70 mb-8 leading-relaxed" },
          ].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: line.delay, duration: 0.6 }}
              className={line.className}
            >
              {line.text}
            </motion.p>
          ))}

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-romantic-rose to-transparent mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="text-xl sm:text-2xl font-dancing text-romantic-foreground mb-6 leading-relaxed"
          >
            The most important thing is spending another beautiful day with you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            onAnimationComplete={() => setTimeout(() => setShowButton(true), 600)}
          >
            <p className="text-2xl font-dancing text-romantic-rose mt-6 mb-2">
              Happy 16th Monthsary, Aira Marie.
            </p>
            <p className="text-xl font-dancing text-romantic-foreground/70">
              I love you endlessly. ❤️
            </p>
          </motion.div>
        </div>

        {showButton && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-8"
          >
            <Instruction text="Ready for the next surprise?" />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDone}
              className="px-8 py-3 rounded-full glass-strong text-romantic-foreground font-dancing text-lg shadow-lg border border-white/30"
            >
              One More Surprise 🎁
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
