"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "./Confetti";

interface Props {
  onYes: () => void;
  onNeedToCheck: () => void;
}

export default function Section3_BigQuestion({ onYes, onNeedToCheck }: Props) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [choiceMade, setChoiceMade] = useState(false);

  const handleYes = () => {
    setShowConfetti(true);
    setChoiceMade(true);
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => onYes(), 2000);
    }, 500);
  };

  const handleNeedToCheck = () => {
    setChoiceMade(true);
    setTimeout(() => onNeedToCheck(), 500);
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 py-12 overflow-hidden">
      <Confetti active={showConfetti} count={100} />

      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-lg"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl mb-6"
            >
              💗
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-dancing text-romantic-foreground mb-4 leading-relaxed">
              Are you available for our 16th Monthsary Date?
            </h2>

            <Instruction text="Tap your answer below" />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
                disabled={choiceMade}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-romantic-pink to-romantic-rose text-white font-dancing text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                💗 Yes, of course!
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNeedToCheck}
                disabled={choiceMade}
                className="px-8 py-4 rounded-full glass-strong text-romantic-foreground font-dancing text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 border border-white/30"
              >
                🤍 I need to check.
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-7xl mb-6"
            >
              🎉
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-dancing text-romantic-rose mb-4">
              Yay!! I can't wait ❤️
            </h2>
            <div className="flex gap-2 justify-center text-2xl mt-4">
              {["❤️", "💗", "💖", "💕", "❤️"].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                >
                  {h}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Instruction({ text }: { text: string }) {
  return (
    <p className="text-xs sm:text-sm text-romantic-rose/60 mb-6 font-quicksand tracking-wide">
      💡 {text}
    </p>
  );
}
