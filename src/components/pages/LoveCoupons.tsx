'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const coupons = [
  { title: "Free Hug", description: "Redeem for a warm, tight hug anytime", emoji: "\uD83E\uDD17" },
  { title: "Movie Night", description: "Netflix and chill, your pick!", emoji: "\uD83C\uDFAC" },
  { title: "Samgyupsal Date", description: "Unlimited meat, unlimited love", emoji: "\uD83E\uDD69" },
  { title: "Ice Cream", description: "Sweet treat on me!", emoji: "\uD83C\uDF66" },
  { title: "Coffee Date", description: "Coffee dates are the best dates", emoji: "\u2615" },
  { title: "Massage", description: "Stress relief, courtesy of me", emoji: "\uD83D\uDC86" },
  { title: "Late Night Call", description: "No matter the hour, I am here", emoji: "\uD83D\uDCDE" },
  { title: "Surprise Date", description: "I will plan everything!", emoji: "\uD83C\uDF89" },
];

interface LoveCouponsProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function LoveCoupons({ onNext, onPrev }: LoveCouponsProps) {
  const [redeemed, setRedeemed] = useState<number[]>([]);

  const toggleRedeem = (i: number) => {
    setRedeemed(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-3xl w-full scrapbook-paper rounded-lg p-6 sm:p-10">
        <h2 className="handwritten-serif text-3xl sm:text-4xl text-rose text-center mb-2" style={{ fontFamily: "var(--font-dancing)" }}>
          Love Coupons
        </h2>
        <p className="handwritten text-brown text-center mb-6" style={{ fontFamily: "var(--font-caveat)" }}>Redeemable anytime. Forever valid.</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {coupons.map((c, i) => (
            <motion.div key={i}
              className="relative rounded-sm p-4 cursor-pointer border-2"
              style={{
                borderColor: redeemed.includes(i) ? "#D96C8A" : "#D6B36A",
                background: redeemed.includes(i) ? "rgba(248, 200, 220, 0.15)" : "#FFFDF9",
                borderStyle: redeemed.includes(i) ? "solid" : "dashed",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => toggleRedeem(i)}
            >
              <div className="text-2xl text-center mb-2">{c.emoji}</div>
              <p className="handwritten text-base text-dark-text text-center font-semibold" style={{ fontFamily: "var(--font-caveat)" }}>{c.title}</p>
              <p className="text-xs text-brown text-center mt-1">{c.description}</p>
              {redeemed.includes(i) && (
                <motion.div className="absolute -top-2 -right-2 bg-rose text-white text-xs px-2 py-0.5 rounded-full handwritten"
                  style={{ fontFamily: "var(--font-caveat)" }}
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                >
                  APPROVED
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <motion.button className="px-6 py-2 rounded-full border-2 text-brown handwritten text-lg" style={{ borderColor: "#D6B36A" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onPrev}>&larr; Back</motion.button>
          <motion.button className="px-6 py-2 rounded-full text-white handwritten text-lg" style={{ background: "linear-gradient(135deg, #D96C8A, #B54B6A)" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onNext}>Next Page &rarr;</motion.button>
        </div>
      </div>
    </motion.div>
  );
}
