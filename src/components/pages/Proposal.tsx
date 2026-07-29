'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ProposalProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function Proposal({ onNext, onPrev }: ProposalProps) {
  const [answered, setAnswered] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number; x: number; delay: number; rotation: number }[]>([]);

  const handleYes = () => {
    setAnswered(true);
    const c = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      rotation: Math.random() * 720 - 360,
    }));
    setConfetti(c);
  };

  const colors = ["#D96C8A", "#F8C8DC", "#D6B36A", "#B54B6A"];

  return (
    <motion.div className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative overflow-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ background: "linear-gradient(135deg, #F9F5EF 0%, #F0E8DD 50%, #F9F5EF 100%)" }}
    >
      <AnimatePresence>
        {!answered ? (
          <motion.div className="max-w-lg w-full scrapbook-paper rounded-lg p-8 sm:p-12 text-center relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <motion.div className="text-5xl mb-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              &#x2764;&#xFE0F;
            </motion.div>
            <h2 className="handwritten-serif text-3xl sm:text-4xl text-rose mb-6" style={{ fontFamily: "var(--font-dancing)" }}>
              Will You Go On Our 16th Monthsary Date With Me?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-3 rounded-full text-white handwritten text-xl"
                style={{ background: "linear-gradient(135deg, #D96C8A, #B54B6A)" }}
                whileHover={{ scale: 1.08, boxShadow: "0 4px 24px rgba(185, 75, 106, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
              >
                YES!
              </motion.button>
              <motion.button
                className="px-8 py-3 rounded-full text-white handwritten text-xl"
                style={{ background: "linear-gradient(135deg, #D6B36A, #C49A4A)" }}
                whileHover={{ scale: 1.08, boxShadow: "0 4px 24px rgba(214, 179, 106, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleYes}
              >
                ABSOLUTELY!
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div className="text-center relative"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            {confetti.map((c) => (
              <motion.div key={c.id}
                className="absolute top-0" style={{ left: c.x + "%" }}
                initial={{ y: -20, rotate: 0, opacity: 1 }}
                animate={{ y: "100vh", rotate: c.rotation, opacity: 0 }}
                transition={{ duration: 3 + Math.random() * 2, delay: c.delay, ease: "easeIn" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={colors[c.id % 4]}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.div>
            ))}

            <motion.div className="max-w-lg w-full scrapbook-paper rounded-lg p-8 sm:p-12"
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
            >
              <motion.div className="text-6xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                &#x1F389;
              </motion.div>
              <h2 className="handwritten-serif text-3xl sm:text-4xl text-rose mb-4" style={{ fontFamily: "var(--font-dancing)" }}>
                Our Next Adventure Begins...
              </h2>
              <p className="handwritten text-lg text-brown" style={{ fontFamily: "var(--font-caveat)" }}>
                I cannot wait to spend this special day with you, Pangga!
              </p>
              <motion.button className="mt-6 px-8 py-3 rounded-full text-white handwritten text-lg"
                style={{ background: "linear-gradient(135deg, #D96C8A, #B54B6A)" }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={onNext}
              >
                See The Final Page &rarr;
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
