'use client';

import { motion } from 'framer-motion';
import Typewriter from '../shared/Typewriter';

interface WelcomeLetterProps {
  onNext: () => void;
}

export default function WelcomeLetter({ onNext }: WelcomeLetterProps) {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-lg w-full scrapbook-paper rounded-lg p-6 sm:p-10 relative">
        <div className="absolute -top-3 -left-3 w-16 h-16 opacity-30" style={{ background: "radial-gradient(circle, #8B7765, transparent 70%)" }} />
        <div className="absolute -bottom-2 -right-2 w-24 h-24 opacity-20" style={{ background: "radial-gradient(circle, #8B7765, transparent 70%)" }} />

        <div className="relative" style={{ zIndex: 1 }}>
          <h2 className="handwritten-serif text-3xl sm:text-4xl text-rose mb-4" style={{ fontFamily: "var(--font-dancing)" }}>
            Dear Pangga,
          </h2>

          <div className="my-6 leading-relaxed text-base sm:text-lg" style={{ fontFamily: "var(--font-inter)" }}>
            <Typewriter
              text={"Hi Pangga,\n\nI wanted to make something special for our 16th monthsary.\n\nInstead of simply asking you on a date...\n\nI wanted to look back at the beautiful memories we have created together.\n\nEvery page holds a little piece of us.\n\nClick Next Page."}
              speed={40}
            />
          </div>

          <motion.button
            className="mt-6 px-8 py-2 rounded-full text-white handwritten text-lg"
            style={{ background: "linear-gradient(135deg, #D96C8A, #B54B6A)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
          >
            Next Page &rarr;
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
