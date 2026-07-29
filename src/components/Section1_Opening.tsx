"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TypewriterText from "./TypewriterText";
import PolaroidFrame from "./PolaroidFrame";

interface Props {
  onOpen: () => void;
}

export default function Section1_Opening({ onOpen }: Props) {
  const [showButton, setShowButton] = useState(false);

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center text-center max-w-md"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl mb-6"
        >
          💖
        </motion.div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-dancing text-romantic-foreground mb-4 leading-relaxed">
          Will You Go on Our 16th Monthsary Date?
        </h1>

        <p className="text-lg sm:text-xl text-romantic-foreground/70 mb-8 font-quicksand">
          A special invitation made just for you.
        </p>

        <div className="mb-8">
          <PolaroidFrame
            src="/herogallery/20251105_164013938.JPG"
            alt="Our memory"
            rotate={-1}
            caption="Aira Marie Descallar ❤️"
          />
        </div>

        <TypewriterText
          text="Hi Aira Marie ❤️"
          className="text-2xl sm:text-3xl font-dancing text-romantic-rose mb-4"
          speed={80}
          delay={500}
          onComplete={() => setTimeout(() => setShowButton(true), 800)}
        />

        {showButton && (
          <>
            <p className="text-romantic-foreground/60 mb-2 font-quicksand text-sm sm:text-base">
              I made something special just for you.
            </p>

            <Instruction text="Click the button to open your invitation" />

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(248,200,220,0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpen}
              className="px-8 py-4 rounded-full glass-strong text-romantic-foreground font-dancing text-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30"
            >
              Open My Invitation 💌
            </motion.button>
          </>
        )}
      </motion.div>
    </section>
  );
}

function Instruction({ text }: { text: string }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="text-xs sm:text-sm text-romantic-rose/60 mb-4 font-quicksand tracking-wide"
    >
      💡 {text}
    </motion.p>
  );
}
