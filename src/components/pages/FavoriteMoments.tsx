'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Polaroid from '../shared/Polaroid';

const moments = [
  { src: "/love/IMG_0193.HEIC", date: "2024", location: "Our Special Place", story: "A beautiful day spent together.", caption: "Every moment with you is magical" },
  { src: "/love/IMG_0867.HEIC", date: "2024", location: "Date Night", story: "Another wonderful memory.", caption: "You make everything better" },
  { src: "/love/IMG_1432.HEIC", date: "2024", location: "Our Adventure", story: "Exploring life together.", caption: "With you, every day is an adventure" },
  { src: "/love/IMG_1903.HEIC", date: "2024", location: "Quality Time", story: "Just us, and that is all we need.", caption: "My favorite place is wherever you are" },
  { src: "/love/IMG_3337.HEIC", date: "2024", location: "Our Getaway", story: "Making memories that last a lifetime.", caption: "Can not believe you are mine" },
  { src: "/love/IMG_3979.HEIC", date: "2024", location: "Special Day", story: "One for the books.", caption: "My heart is so full of love for you" },
];

const rotations = [-2, 3, -1, 2, -3, 1];

interface FavoriteMomentsProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function FavoriteMoments({ onNext, onPrev }: FavoriteMomentsProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-4xl w-full scrapbook-paper rounded-lg p-6 sm:p-10">
        <h2 className="handwritten-serif text-3xl sm:text-4xl text-rose text-center mb-2" style={{ fontFamily: "var(--font-dancing)" }}>
          Our Favorite Moments
        </h2>
        <p className="handwritten text-brown text-center mb-6" style={{ fontFamily: "var(--font-caveat)" }}>Hover over each memory</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {moments.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Polaroid src={m.src} caption={m.caption} rotate={rotations[i]} width={200} height={200} onClick={() => setSelected(i)} />
            </motion.div>
          ))}
        </div>

        {selected !== null && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => setSelected(null)}
          >
            <motion.div className="max-w-md w-full polaroid-frame p-6" style={{ background: "#FFFDF9" }}
              initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={moments[selected].src} alt={moments[selected].caption} className="w-full rounded-sm" />
              <p className="handwritten text-rose text-lg mt-2" style={{ fontFamily: "var(--font-caveat)" }}>{moments[selected].date} &middot; {moments[selected].location}</p>
              <p className="handwritten text-dark-text mt-1" style={{ fontFamily: "var(--font-caveat)" }}>{moments[selected].story}</p>
              <p className="handwritten text-brown mt-2 italic" style={{ fontFamily: "var(--font-caveat)" }}>{moments[selected].caption}</p>
            </motion.div>
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
