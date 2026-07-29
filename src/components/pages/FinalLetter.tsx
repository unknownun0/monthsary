'use client';

import { motion } from 'framer-motion';

interface FinalLetterProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function FinalLetter({ onNext, onPrev }: FinalLetterProps) {
  return (
    <motion.div className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="max-w-lg w-full scrapbook-paper rounded-lg p-6 sm:p-10 relative">
        <div className="coffee-stain" style={{ top: "20%", left: "80%" }} />
        <div className="coffee-stain" style={{ top: "60%", left: "10%", width: 30, height: 30 }} />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h2 className="handwritten-serif text-3xl sm:text-4xl text-rose mb-6 text-center" style={{ fontFamily: "var(--font-dancing)" }}>
            Happy 16th Monthsary, Love
          </h2>

          <div className="space-y-4 handwritten text-lg leading-relaxed" style={{ fontFamily: "var(--font-caveat)" }}>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              Thank you for making every ordinary day feel extraordinary.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              These sixteen months have been filled with laughter, adventures, lessons, and countless beautiful memories.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
              And if I could choose again...
            </motion.p>
            <motion.p className="text-rose text-2xl text-center font-semibold"
              style={{ fontFamily: "var(--font-dancing)" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              I would still choose you.
            </motion.p>
            <motion.p className="text-right text-xl" style={{ fontFamily: "var(--font-dancing)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
            >
              Every single time.
            </motion.p>
          </div>
        </motion.div>

        <div className="flex justify-between mt-8">
          <motion.button className="px-6 py-2 rounded-full border-2 text-brown handwritten text-lg" style={{ borderColor: "#D6B36A" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onPrev}>&larr; Back</motion.button>
          <motion.button className="px-6 py-2 rounded-full text-white handwritten text-lg" style={{ background: "linear-gradient(135deg, #D96C8A, #B54B6A)" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onNext}>Next Page &rarr;</motion.button>
        </div>
      </div>
    </motion.div>
  );
}
