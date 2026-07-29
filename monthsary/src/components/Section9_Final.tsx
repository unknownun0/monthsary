"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "./Confetti";
import Fireworks from "./Fireworks";
import HeartParticles from "./HeartParticles";

export default function Section9_Final() {
  const [showSurprise, setShowSurprise] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const handleClick = () => {
    setShowConfetti(true);
    setShowFireworks(true);
    setShowHearts(true);
    setShowSurprise(true);
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 py-12 overflow-hidden">
      <Confetti active={showConfetti} count={150} />
      <Fireworks active={showFireworks} />
      <HeartParticles active={showHearts} />

      <AnimatePresence mode="wait">
        {!showSurprise ? (
          <motion.div
            key="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl sm:text-4xl font-dancing text-romantic-foreground mb-4"
            >
              Ready for the grand finale? 🎁
            </motion.h2>

            <Instruction text="Tap the button for one last surprise!" />

            <motion.button
              whileHover={{ scale: 1.08, boxShadow: "0 0 50px rgba(248,200,220,0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClick}
              className="
                px-10 py-5 rounded-full text-xl sm:text-2xl font-dancing
                bg-gradient-to-r from-romantic-pink via-romantic-rose to-romantic-gold
                text-white shadow-xl hover:shadow-2xl
                transition-all duration-300 animate-pulse-glow
                border border-white/30
              "
            >
              See You on Our Date ❤️
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="surprise"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 1, bounce: 0.5 }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl sm:text-8xl mb-6"
            >
              💖
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-4xl sm:text-6xl font-dancing text-romantic-rose mb-4 text-glow"
            >
              I Love You, Pangga ko ❤️
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="text-xl font-dancing text-romantic-foreground/70"
            >
              Happy 16th Monthsary, my love!
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex gap-3 justify-center mt-8 text-2xl"
            >
              {["💕", "💗", "❤️", "💖", "💕", "💗", "❤️"].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -15, 0],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {h}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Instruction({ text }: { text: string }) {
  return (
    <p className="text-xs sm:text-sm text-romantic-rose/60 mb-6 text-center font-quicksand tracking-wide">
      💡 {text}
    </p>
  );
}
