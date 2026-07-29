'use client';

import { motion } from 'framer-motion';

const envelopes = [
  { title: "Sweet Message", content: "You are the best thing that has ever happened to me. Every day with you feels like a dream I never want to wake up from. I love you more than words can ever express.", emoji: "\u2764\uFE0F" },
  { title: "Favorite Picture", content: "Our favorite memory together", emoji: "\uD83D\uDCF7" },
  { title: "Voice Message", content: "A special voice message just for you", emoji: "\uD83C\uDFA4" },
  { title: "Secret Surprise", content: "You mean the world to me. Happy 16th monthsary, my love! Here is to forever and always.", emoji: "\uD83C\uDF89" },
];

interface SecretEnvelopesProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function SecretEnvelopes({ onNext, onPrev }: SecretEnvelopesProps) {
  return (
    <motion.div className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="max-w-3xl w-full scrapbook-paper rounded-lg p-6 sm:p-10">
        <h2 className="handwritten-serif text-3xl sm:text-4xl text-rose text-center mb-2" style={{ fontFamily: "var(--font-dancing)" }}>
          Secret Messages
        </h2>
        <p className="handwritten text-brown text-center mb-6" style={{ fontFamily: "var(--font-caveat)" }}>Little messages from my heart to yours</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {envelopes.map((env, i) => (
            <motion.div key={i}
              className="rounded-sm p-4 border-2"
              style={{ borderColor: "#D6B36A", background: "#FFFDF9", borderStyle: "dashed" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-2xl mb-2 text-center">{env.emoji}</div>
              <h3 className="handwritten text-lg text-rose text-center" style={{ fontFamily: "var(--font-caveat)" }}>{env.title}</h3>
              <div className="heart-divider my-2" />
              <p className="handwritten text-brown text-center text-sm" style={{ fontFamily: "var(--font-caveat)" }}>{env.content}</p>
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
