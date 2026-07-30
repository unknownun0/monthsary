'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Polaroid from '../shared/Polaroid';

const milestones = [
  { title: "Our first chat", image: "/love/IMG_2761.PNG", caption: "The day our story began..." },
  { title: "Sweeties date ", image: "/love/KAPI_SF2603071235552299931.jpg", caption: "for me kahit may away pero masaya" },
  { title: "Favorite Monthsary", image: "/love/IMG_7618.JPG", caption: "Celebrating another month of us" },
  { title: "Favorite Memory", image: "/love/Screenshot 2026-07-29 190633.png", caption: "Kasi sobrang akong kinikilig sa react mo hahaha" },
{ title: "16 Months Together", image: "/love/IMG_1432.jpg", caption: "And many more to come " + String.fromCharCode(0x2764) },
];

interface OurStoryProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function OurStory({ onNext, onPrev }: OurStoryProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-3xl w-full scrapbook-paper rounded-lg p-6 sm:p-10">
        <h2 className="handwritten-serif text-3xl sm:text-4xl text-rose text-center mb-6" style={{ fontFamily: "var(--font-dancing)" }}>
          Our Story
        </h2>
        <div className="heart-divider mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                {m.image ? (
                  <Polaroid src={m.image} caption={m.caption} rotate={i % 2 === 0 ? -2 : 2} width={200} height={200} onClick={() => setSelected(i)} />
                ) : (
                  <div className="polaroid-frame flex items-center justify-center" style={{ width: 200, height: 240, transform: "rotate(2deg)" }}>
                    <div className="text-center p-4">
                      <p className="handwritten text-2xl text-rose" style={{ fontFamily: "var(--font-caveat)" }}>16 Months</p>
                      <p className="handwritten text-brown mt-2" style={{ fontFamily: "var(--font-caveat)" }}>Together</p>
                    </div>
                  </div>
                )}
              </div>
              <p className="handwritten text-lg text-dark-text mt-2" style={{ fontFamily: "var(--font-caveat)" }}>{m.title}</p>
            </motion.div>
          ))}
        </div>

        {selected !== null && milestones[selected].image && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => setSelected(null)}
          >
            <motion.div className="max-w-lg w-full polaroid-frame p-4"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={milestones[selected].image} alt={milestones[selected].title} className="w-full rounded-sm" />
              <p className="handwritten text-center text-brown mt-3 text-lg" style={{ fontFamily: "var(--font-caveat)" }}>{milestones[selected].caption}</p>
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
