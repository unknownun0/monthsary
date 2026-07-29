'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const dates = [
  { title: "Venice Grand Canal", emoji: "\u2764\uFE0F", description: "A romantic gondola ride through the canals" },
  { title: "Beach Date", emoji: "\uD83C\uDFD6\uFE0F", description: "Sun, sand, and the sound of waves" },
  { title: "Japanese Food", emoji: "\uD83C\uDF63", description: "Sushi, sake, and good conversation" },
  { title: "Samgyupsal", emoji: "\uD83E\uDD69", description: "Endless BBQ with my favorite person" },
  { title: "Museum", emoji: "\uD83C\uDFA8", description: "Art and culture day out" },
  { title: "Cinema", emoji: "\uD83C\uDFAC", description: "Movie date with popcorn and cuddles" },
  { title: "Caf\u00E9 Date", emoji: "\u2615", description: "Coffee and pastries in a cozy spot" },
  { title: "Sunset Walk", emoji: "\uD83C\uDF05", description: "Walking hand in hand at golden hour" },
  { title: "Seafood Dinner", emoji: "\uD83C\uDF64", description: "Fresh seafood and ocean views" },
];

interface DatePlannerProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function DatePlanner({ onNext, onPrev }: DatePlannerProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleSelect = (i: number) => {
    setSelected(i);
    setConfirmed(false);
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="max-w-3xl w-full scrapbook-paper rounded-lg p-6 sm:p-10">
        <h2 className="handwritten-serif text-3xl sm:text-4xl text-rose text-center mb-2" style={{ fontFamily: "var(--font-dancing)" }}>
          Dream Date Planner
        </h2>
        <p className="handwritten text-brown text-center mb-6" style={{ fontFamily: "var(--font-caveat)" }}>Pick our next adventure!</p>

        <div className="grid grid-cols-3 gap-2">
          {dates.map((d, i) => (
            <motion.div key={i}
              className="rounded-sm p-3 text-center cursor-pointer border-2"
              style={{
                borderColor: selected === i ? "#D96C8A" : "#E8D5A3",
                background: selected === i ? "rgba(248, 200, 220, 0.15)" : "#FFFDF9",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleSelect(i)}
            >
              <div className="text-2xl mb-1">{d.emoji}</div>
              <p className="handwritten text-sm text-dark-text" style={{ fontFamily: "var(--font-caveat)" }}>{d.title}</p>
            </motion.div>
          ))}
        </div>

        {selected !== null && !confirmed && (
          <motion.div className="mt-6 p-4 rounded-sm text-center"
            style={{ background: "rgba(248, 200, 220, 0.2)", border: "1px dashed #D96C8A" }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          >
            <p className="handwritten text-lg text-dark-text" style={{ fontFamily: "var(--font-caveat)" }}>
              {dates[selected].emoji} {dates[selected].title}
            </p>
            <p className="handwritten text-brown mt-1" style={{ fontFamily: "var(--font-caveat)" }}>{dates[selected].description}</p>
            <motion.button className="mt-3 px-6 py-2 rounded-full text-white handwritten text-base"
              style={{ background: "linear-gradient(135deg, #D96C8A, #B54B6A)" }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setConfirmed(true)}
            >
              Confirm This Date!
            </motion.button>
          </motion.div>
        )}

        {confirmed && (
          <motion.div className="mt-4 p-4 rounded-sm text-center"
            style={{ background: "rgba(214, 179, 106, 0.15)" }}
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          >
            <p className="handwritten text-xl text-rose" style={{ fontFamily: "var(--font-caveat)" }}>Date Planned!</p>
            <p className="handwritten text-brown" style={{ fontFamily: "var(--font-caveat)" }}>
              Can not wait for our {dates[selected!].title} date!
            </p>
          </motion.div>
        )}

        <div className="flex justify-between mt-8">
          <motion.button className="px-6 py-2 rounded-full border-2 text-brown handwritten text-lg" style={{ borderColor: "#D6B36A" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onPrev}>&larr; Back</motion.button>
          <motion.button className="px-6 py-2 rounded-full text-white handwritten text-lg" style={{ background: "linear-gradient(135deg, #D96C8A, #B54B6A)" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onNext}>Next Page &rarr;</motion.button>
        </div>
      </div>
    </motion.div>
  );
}
