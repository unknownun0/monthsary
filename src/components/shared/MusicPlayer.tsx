'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        className="w-12 h-12 rounded-full flex items-center justify-center text-brown shadow-lg"
        style={{ background: "#FFFDF9", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
        onClick={() => setShow(!show)}
        whileTap={{ scale: 0.95 }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      </motion.button>
      <AnimatePresence>
        {show && (
          <motion.div
            className="absolute bottom-14 right-0 p-4 rounded-lg shadow-xl min-w-[200px]"
            style={{ background: "#FFFDF9", border: "1px solid #E8D5A3" }}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
          >
            <p className="handwritten text-lg text-dark-text mb-3 text-center" style={{ fontFamily: "var(--font-caveat)" }}>Background Music</p>
            <div className="flex items-center justify-center gap-3">
              <motion.button
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "#D96C8A" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPlaying(!playing)}
              >
                {playing ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                )}
              </motion.button>
            </div>
            <p className="text-xs text-brown text-center mt-2 handwritten" style={{ fontFamily: "var(--font-caveat)" }}>
              {playing ? "Now Playing" : "Tap to play"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
