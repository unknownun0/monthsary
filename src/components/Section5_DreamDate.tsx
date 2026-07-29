"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const DATE_OPTIONS = [
  { emoji: "🚤", label: "Venice Grand Canal Date", image: "/herogallery/KAPI_SF2601111046230595276.jpg" },
  { emoji: "🏖", label: "Beach Date", image: "/herogallery/IMG_7616.JPG" },
  { emoji: "🍣", label: "Japanese Date", image: "/herogallery/IMG_7618.JPG" },
  { emoji: "🦀", label: "Seafood Date", image: "/herogallery/IMG_6162.JPG" },
  { emoji: "🍖", label: "Samgyupsal Date", image: "/herogallery/KAPI_SF2603071229435663263.jpg" },
  { emoji: "🍝", label: "Italian Dinner Date", image: "/herogallery/KAPI_SF2603071235552299931.jpg" },
  { emoji: "☕", label: "Coffee Date", image: "/herogallery/KAPI_SF2603281620307159185.jpg" },
  { emoji: "🎬", label: "Movie Date", image: "/herogallery/20251105_164013938.JPG" },
  { emoji: "🛍", label: "Ayala Mall Date", image: "/herogallery/IMG_6162.JPG" },
  { emoji: "🌅", label: "Sunset Picnic", image: "/herogallery/IMG_7618.JPG" },
  { emoji: "🎡", label: "Amusement Park", image: "/herogallery/KAPI_SF2603071229435663263.jpg" },
  { emoji: "🍰", label: "Dessert Cafe", image: "/herogallery/IMG_7616.JPG" },
  { emoji: "🌸", label: "Garden Date", image: "/herogallery/KAPI_SF2601111046230595276.jpg" },
  { emoji: "🌊", label: "Ocean View Dinner", image: "/herogallery/20251105_164013938.JPG" },
  { emoji: "🌃", label: "Night City Lights", image: "/herogallery/KAPI_SF2603281620307159185.jpg" },
];

interface Props {
  onDone: () => void;
}

export default function Section5_DreamDate({ onDone }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <section className="min-h-screen w-full px-4 py-12 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-dancing text-romantic-foreground text-center mb-2"
        >
          Choose Your Dream Date 💫
        </motion.h2>
        <Instruction text="Tap one or more date ideas you'd love to do together" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
          {DATE_OPTIONS.map((option, i) => {
            const isSelected = selected.includes(option.label);
            return (
              <motion.button
                key={option.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleOption(option.label)}
                className={`
                  relative rounded-2xl p-3 sm:p-4 transition-all duration-300 text-center group
                  ${isSelected
                    ? "glass-strong shadow-lg border-romantic-rose"
                    : "glass hover:glass-strong border-white/20"
                  }
                  border-2 overflow-hidden
                `}
              >
                <div className="relative z-10">
                  <div className="text-2xl sm:text-3xl mb-2">{option.emoji}</div>
                  <p className="text-xs sm:text-sm font-quicksand text-romantic-foreground/80 leading-tight">
                    {option.label}
                  </p>
                </div>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 text-xs"
                  >
                    💗
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDone}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-romantic-pink to-romantic-rose text-white font-dancing text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Sounds Perfect! 💕 ({selected.length} selected)
            </motion.button>
          </motion.div>
        )}
      </div>
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
