'use client';

import { motion } from 'framer-motion';
import Envelope from '../shared/Envelope';

const envelopes = [
  { title: "Sweet Message", content: "You are the best thing that has ever happened to me. Every day with you feels like a dream I never want to wake up from. I love you more than words can ever express.", type: "message" as const },
  { title: "Favorite Picture", content: "Our favorite memory together", type: "message" as const },
  { title: "Voice Message", content: "A special voice message just for you", type: "voice" as const },
  { title: "Secret Surprise", content: "You mean the world to me. Happy 16th monthsary, my love! Here is to forever and always.", type: "surprise" as const },
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
          Secret Envelopes
        </h2>
        <p className="handwritten text-brown text-center mb-6" style={{ fontFamily: "var(--font-caveat)" }}>Tap each envelope to reveal a surprise</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
          {envelopes.map((env, i) => (
            <Envelope key={i} title={env.title} content={env.content} type={env.type} index={i} />
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
