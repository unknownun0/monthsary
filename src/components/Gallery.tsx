"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const IMAGES = [
  { src: "/herogallery/20251105_164013938.JPG", caption: "Our beautiful journey together" },
  { src: "/herogallery/IMG_7616.JPG", caption: "Precious moments" },
  { src: "/herogallery/IMG_7618.JPG", caption: "Making memories" },
  { src: "/herogallery/IMG_6162.JPG", caption: "Happiness captured" },
  { src: "/herogallery/KAPI_SF2601111046230595276.jpg", caption: "Special times" },
  { src: "/herogallery/KAPI_SF2603071229435663263.jpg", caption: "Our story" },
  { src: "/herogallery/KAPI_SF2603071235552299931.jpg", caption: "Together always" },
  { src: "/herogallery/KAPI_SF2603281620307159185.jpg", caption: "Love in every moment" },
];

interface Props {
  onDone: () => void;
}

export default function Gallery({ onDone }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section className="min-h-screen w-full px-4 py-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-dancing text-romantic-foreground text-center mb-2"
        >
          Our Beautiful Journey 📸
        </motion.h2>
        <Instruction text="Tap any photo to view it full size" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-8">
          {IMAGES.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              whileHover={{ scale: 1.03, y: -4 }}
              onClick={() => setSelectedIndex(index)}
              className="cursor-pointer rounded-xl overflow-hidden glass hover:glass-strong transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <Instruction text="Seen them all? Let's go to the grand finale" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDone}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-romantic-pink to-romantic-rose text-white font-dancing text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            One Last Thing 🎉
          </motion.button>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full"
            >
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="glass-strong rounded-2xl p-4">
                <img
                  src={IMAGES[selectedIndex].src}
                  alt={IMAGES[selectedIndex].caption}
                  className="w-full h-auto rounded-lg max-h-[70vh] object-contain"
                />
                <p className="text-center mt-3 text-white/80 font-dancing text-lg">
                  {IMAGES[selectedIndex].caption}
                </p>
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  disabled={selectedIndex === 0}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedIndex(Math.min(IMAGES.length - 1, selectedIndex + 1))}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  disabled={selectedIndex === IMAGES.length - 1}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Instruction({ text }: { text: string }) {
  return (
    <p className="text-xs sm:text-sm text-romantic-rose/60 mb-6 text-center font-quicksand tracking-wide">
      💡 {text}
    </p>
  );
}
