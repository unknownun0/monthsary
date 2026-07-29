'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

interface ScrapbookCoverProps {
  onOpen: () => void;
}

export default function ScrapbookCover({ onOpen }: ScrapbookCoverProps) {
  const [opening, setOpening] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpen = () => {
    setOpening(true);
    setTimeout(() => onOpen(), 1500);
  };

  return (
    <motion.div
      className="relative min-h-screen flex items-center justify-center p-4 sm:p-8"
      style={{ background: "linear-gradient(135deg, #F9F5EF 0%, #F0E8DD 100%)", perspective: 2000 }}
      animate={opening ? { rotateY: -180, opacity: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.645, 0.045, 0.355, 1] }}
    >
      <div className="max-w-lg w-full scrapbook-paper rounded-lg p-6 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-2" style={{ background: "linear-gradient(90deg, #D6B36A, #D96C8A, #D6B36A)" }} />

        <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>
          <video
            ref={videoRef}
            src="/love/can_you_make_this_an_cartoon_a.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <div className="coffee-stain" style={{ top: "30%", left: "10%", width: 50, height: 50 }} />
        <div className="coffee-stain" style={{ bottom: "20%", right: "15%", width: 35, height: 35 }} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-center handwritten-serif text-rose mb-2" style={{ fontFamily: "var(--font-dancing)" }}>
            Our Story
          </h1>
          <p className="text-base sm:text-lg text-center handwritten text-brown mb-4" style={{ fontFamily: "var(--font-caveat)" }}>
            16 Wonderful Months Together
          </p>
        </motion.div>

        <div className="heart-divider my-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#D96C8A">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        <motion.div
          className="text-center my-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="handwritten text-2xl text-dark-text" style={{ fontFamily: "var(--font-caveat)" }}>Earl John Gomez</p>
          <p className="text-rose text-2xl my-1">&#x2764;&#xFE0F;</p>
          <p className="handwritten text-2xl text-dark-text" style={{ fontFamily: "var(--font-caveat)" }}>Aira Marie Descallar</p>
        </motion.div>

        <motion.div
          className="text-center my-6 p-3 rounded-sm" style={{ background: "rgba(248, 200, 220, 0.2)", border: "1px dashed #D6B36A" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="handwritten text-base text-brown italic" style={{ fontFamily: "var(--font-caveat)" }}>
            For the love of my life. for my Pangga kung mahal.
          </p>
        </motion.div>

        <motion.button
          className="w-full py-3 rounded-lg text-lg handwritten text-white font-semibold" style={{ background: "linear-gradient(135deg, #D96C8A, #B54B6A)" }}
          whileHover={{ scale: 1.03, boxShadow: "0 4px 20px rgba(185, 75, 106, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpen}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          Open Scrapbook
        </motion.button>
      </div>
    </motion.div>
  );
}
