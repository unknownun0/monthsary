'use client';

import { motion } from 'framer-motion';

interface FinalScreenProps {
  onPrev: () => void;
  selectedDate: string | null;
  selectedDateType: { title: string; emoji: string; description: string } | null;
}

export default function FinalScreen({ onPrev, selectedDate, selectedDateType }: FinalScreenProps) {
  const mailBody = encodeURIComponent(
    `Our Monthsary Date Plans! 💖\n\n` +
    (selectedDate ? `📅 Date: ${selectedDate}\n` : '') +
    (selectedDateType ? `\n💕 Date Type: ${selectedDateType.emoji} ${selectedDateType.title}\n${selectedDateType.description}` : '') +
    `\n\nCan't wait for our special day! 🎉`
  );
  const mailSubject = encodeURIComponent("Our Monthsary Date Plans! 💖");

  const handleSubmit = async () => {
    await fetch("/api/date-plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: selectedDate, dateType: selectedDateType }),
    });
    window.open(`mailto:earljohngomez66@gmail.com?subject=${mailSubject}&body=${mailBody}`, "_blank");
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ background: "linear-gradient(135deg, #F9F5EF 0%, #F0E8DD 100%)" }}
    >
      <div className="max-w-lg w-full scrapbook-paper rounded-lg p-6 sm:p-10 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }}>
          <div className="polaroid-frame inline-block p-4 mb-6">
            <div className="w-48 h-48 sm:w-56 sm:h-56 bg-gradient-to-br from-rose/20 to-gold/20 rounded-sm flex items-center justify-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="#D96C8A">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <p className="handwritten text-rose text-sm mt-2" style={{ fontFamily: "var(--font-caveat)" }}>To be continued...</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <h2 className="handwritten-serif text-2xl sm:text-3xl text-rose mb-4" style={{ fontFamily: "var(--font-dancing)" }}>
            This scrapbook does not end here.
          </h2>
          <p className="handwritten text-lg text-brown mb-6" style={{ fontFamily: "var(--font-caveat)" }}>
            The next page is waiting for us to write it together.
          </p>

          {(selectedDate || selectedDateType) && (
            <motion.div className="mb-6 p-4 rounded-sm"
              style={{ background: "rgba(248, 200, 220, 0.2)", border: "1px dashed #D96C8A" }}
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }}
            >
              <h3 className="handwritten-serif text-xl text-rose mb-3" style={{ fontFamily: "var(--font-dancing)" }}>Our Date Plans</h3>
              {selectedDate && (
                <p className="handwritten text-base text-dark-text" style={{ fontFamily: "var(--font-caveat)" }}>
                  &#x1F4C5; {selectedDate}
                </p>
              )}
              {selectedDateType && (
                <p className="handwritten text-base text-dark-text mt-1" style={{ fontFamily: "var(--font-caveat)" }}>
                  {selectedDateType.emoji} {selectedDateType.title}
                </p>
              )}
            </motion.div>
          )}

          <p className="handwritten-serif text-xl text-accent mb-6" style={{ fontFamily: "var(--font-dancing)" }}>
            Happy 16th Monthsary
          </p>
          <p className="handwritten text-brown text-base mb-8" style={{ fontFamily: "var(--font-caveat)" }}>
            Love, Earl
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.button
            className="px-6 py-3 rounded-full text-white handwritten text-lg"
            style={{ background: "linear-gradient(135deg, #D96C8A, #B54B6A)" }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            onClick={handleSubmit}
          >
            See Our Date Details
          </motion.button>
          <motion.button className="px-6 py-3 rounded-full border-2 text-brown handwritten text-lg"
            style={{ borderColor: "#D6B36A" }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
            onClick={onPrev}
          >
            &larr; Back
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
