'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const memories = [
{ title: "Rides Date", image: "/love/IMG_3337.jpg", caption: "Our rides adventure together" },
{ title: "Random Date", image: "/love/IMG_0314.jpg", caption: "Just us being us" },
{ title: "Gym Date", image: "/love/IMG_0193.jpg", caption: "Getting strong together" },
{ title: "Night Out", image: "/love/IMG_5311.jpg", caption: "Mga biglang aya mag kape" },
  { title: "Flower for you", image: "/love/KAPI_SF2603071235552299931.jpg", caption: "Sweet na may away date with flowers pa HAHAHAH" },
];

const rotations = [-2, 3, -1, 2, -3];

interface MemoryWallProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function MemoryWall({ onNext, onPrev }: MemoryWallProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-3xl w-full scrapbook-paper rounded-lg p-6 sm:p-10">
        <h2 className="handwritten-serif text-3xl sm:text-4xl text-rose text-center mb-2" style={{ fontFamily: "var(--font-dancing)" }}>
          Memory Wall
        </h2>
        <p className="handwritten text-brown text-center mb-6" style={{ fontFamily: "var(--font-caveat)" }}>A collage of our beautiful moments</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {memories.map((mem, i) => (
            <motion.div
              key={i}
              className="relative cursor-pointer overflow-hidden rounded-sm"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)", transform: "rotate(" + rotations[i] + "deg)" }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              onClick={() => setSelected(i)}
            >
              <img src={mem.image} alt={mem.title} className="w-full h-32 sm:h-40 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-2" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.6))" }}>
                <p className="handwritten text-white text-xs" style={{ fontFamily: "var(--font-caveat)" }}>{mem.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {selected !== null && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => setSelected(null)}
          >
            <motion.div className="max-w-md w-full polaroid-frame p-4"
              initial={{ scale: 0.8 }} animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={memories[selected].image} alt={memories[selected].title} className="w-full rounded-sm" />
              <p className="handwritten text-center text-brown mt-3 text-lg" style={{ fontFamily: "var(--font-caveat)" }}>{memories[selected].caption}</p>
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
