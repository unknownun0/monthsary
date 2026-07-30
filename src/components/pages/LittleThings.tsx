'use client';

import { motion } from 'framer-motion';
import StickyNote from '../shared/StickyNote';

const notes = [
  { title: "Your Smile", message: "Ang saya makita na lagi kang nakangiti sobrang saya ko basta masaya ka.", color: "#FFF8DC", rotate: -3 },
  { title: "Your Laugh", message: " most beautiful things naririnig ko umaanting ng puso ko shesh. I could listen to it forever.", color: "#FFE4E1", rotate: 2 },
  { title: "Your Kindness", message: "You have the purest heart. The way you care for others inspires me every day.", color: "#E8F5E9", rotate: -1 },
  { title: "Your Hugs", message: "The safest place in the world. Your hugs make everything better.", color: "#E3F2FD", rotate: 4 },
  { title: "Your Mad mode", message: "Mga palagi mo pagalit sakin kasi masaway ako ikaw panay ka naman sita hahaha.", color: "#FFF8DC", rotate: -2 },
  { title: "Your Taray mode", message: "Mga araw na urat na urat kana kasi sa sobrang kulit ko pasaway ko sayo nanay yarn.", color: "#F3E5F5", rotate: 3 },
  { title: "Your Pikon mode", message: "Mga araw na sobra akong mapang asar pero ganon ko kasi i show pag mamahal ko sayo mwah.", color: "#FFE4E1", rotate: -4 },
  { title: "Your Kupal mode", message: "Kahit na uurat ako masaya ako kasi kupal kapa sakin hehe.", color: "#FFF8DC", rotate: 1 },
];

interface LittleThingsProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function LittleThings({ onNext, onPrev }: LittleThingsProps) {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-3xl w-full scrapbook-paper rounded-lg p-6 sm:p-10">
        <h2 className="handwritten-serif text-3xl sm:text-4xl text-rose text-center mb-2" style={{ fontFamily: "var(--font-dancing)" }}>
          Little Things I Love About You
        </h2>
        <p className="handwritten text-brown text-center mb-6" style={{ fontFamily: "var(--font-caveat)" }}>Tap each note to discover a sweet message</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {notes.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <StickyNote title={note.title} message={note.message} color={note.color} rotate={note.rotate} />
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
