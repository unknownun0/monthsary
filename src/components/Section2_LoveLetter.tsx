"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onDone: () => void;
}

export default function Section2_LoveLetter({ onDone }: Props) {
  const [showButton, setShowButton] = useState(false);

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-lg w-full"
      >
        <div className="glass-strong rounded-2xl p-8 sm:p-12 shadow-2xl border border-white/40">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-6"
          >
            <span className="text-3xl">💌</span>
          </motion.div>

          {[
            { text: "My Dearest Aira Marie ❤️", delay: 0.4, className: "text-2xl font-dancing text-romantic-rose mb-6" },
            { text: "Happy 16th Monthsary, my love.", delay: 0.6, className: "text-lg mb-4 leading-relaxed font-quicksand" },
            { text: "Every month with you has been one of the greatest blessings of my life.", delay: 0.8, className: "text-base mb-4 leading-relaxed text-romantic-foreground/80 font-quicksand" },
            { text: "Thank you for all the laughter, memories, patience, love, and everything you've shared with me.", delay: 1.0, className: "text-base mb-4 leading-relaxed text-romantic-foreground/80 font-quicksand" },
            { text: "I hope we continue making beautiful memories together.", delay: 1.2, className: "text-base mb-6 leading-relaxed text-romantic-foreground/80 font-quicksand" },
            { text: "I love you always.", delay: 1.4, className: "text-xl font-dancing text-romantic-rose text-right" },
            { text: "— Earl John ❤️", delay: 1.6, className: "text-lg font-dancing text-romantic-foreground/60 text-right mt-2" },
          ].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: line.delay, duration: 0.5 }}
              className={line.className}
            >
              {line.text}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          onAnimationComplete={() => setShowButton(true)}
          className="text-center mt-8"
        >
          {showButton && (
            <>
              <Instruction text="Finished reading? Continue to the next part" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDone}
                className="px-8 py-3 rounded-full glass-strong text-romantic-foreground font-dancing text-lg shadow-lg border border-white/30"
              >
                Continue Reading 💕
              </motion.button>
            </>
          )}
        </motion.div>
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
