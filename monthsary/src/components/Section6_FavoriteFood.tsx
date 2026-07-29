"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const FOOD_OPTIONS = [
  "Samgyupsal", "Seafood", "Japanese", "Steak",
  "Chicken", "Pasta", "Pizza", "Ramen",
  "Sushi", "Milk Tea", "Coffee", "Desserts", "Ice Cream",
];

const FOOD_EMOJIS: Record<string, string> = {
  Samgyupsal: "🥩",
  Seafood: "🦐",
  Japanese: "🍱",
  Steak: "🥩",
  Chicken: "🍗",
  Pasta: "🍝",
  Pizza: "🍕",
  Ramen: "🍜",
  Sushi: "🍣",
  "Milk Tea": "🧋",
  Coffee: "☕",
  Desserts: "🍰",
  "Ice Cream": "🍦",
};

interface Props {
  onDone: () => void;
}

export default function Section6_FavoriteFood({ onDone }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleFood = (food: string) => {
    setSelected((prev) =>
      prev.includes(food) ? prev.filter((f) => f !== food) : [...prev, food]
    );
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-4xl mb-6"
        >
          🍽️
        </motion.div>

        <h2 className="text-3xl sm:text-4xl font-dancing text-romantic-foreground mb-2">
          What would you like to eat?
        </h2>
        <Instruction text="Tap all the food you're craving right now" />

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {FOOD_OPTIONS.map((food, i) => {
            const isSelected = selected.includes(food);
            return (
              <motion.button
                key={food}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleFood(food)}
                className={`
                  px-4 py-2 rounded-full text-sm sm:text-base font-quicksand transition-all duration-300
                  ${isSelected
                    ? "bg-gradient-to-r from-romantic-pink to-romantic-rose text-white shadow-md"
                    : "glass hover:glass-strong text-romantic-foreground border border-white/30"
                  }
                `}
              >
                <span className="mr-1">{FOOD_EMOJIS[food]}</span>
                {food}
              </motion.button>
            );
          })}
        </div>

        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onDone}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-romantic-pink to-romantic-rose text-white font-dancing text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Let's Eat! 💕
            </motion.button>
          </motion.div>
        )}
      </motion.div>
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
