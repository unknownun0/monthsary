'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface EnvelopeProps {
  title: string;
  content: string;
  type: "message" | "image" | "voice" | "surprise";
  image?: string;
  index?: number;
}

export default function Envelope({ title, content, type, image, index = 0 }: EnvelopeProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
    >
      <motion.div
        className="relative cursor-pointer"
        style={{ width: 200, height: 140, perspective: 800 }}
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.03 }}
      >
        <motion.div
          className="absolute inset-0 rounded-sm"
          style={{
            background: "#FFFDF9",
            border: "1px solid #D4C5B0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
          animate={open ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute inset-0 rounded-sm"
          style={{
            background: "linear-gradient(135deg, #FFFDF9, #F5F0E8)",
            border: "1px solid #D4C5B0",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            transformOrigin: "top",
          }}
          animate={{ rotateX: open ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: 20 }}>
          <span className="handwritten text-brown text-lg" style={{ fontFamily: "var(--font-caveat)" }}>{title}</span>
        </div>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="mt-2 p-4 rounded-sm w-full max-w-xs"
            style={{
              background: "#FFFDF9",
              border: "1px solid #D4C5B0",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.4 }}
          >
            {type === "message" && <p className="handwritten text-base text-dark-text" style={{ fontFamily: "var(--font-caveat)" }}>{content}</p>}
            {type === "image" && image && (
              <img src={image} alt={title} className="w-full rounded-sm" />
            )}
            {type === "voice" && (
              <div className="text-center">
                <p className="handwritten text-brown mb-2" style={{ fontFamily: "var(--font-caveat)" }}>{content}</p>
                <div className="flex items-center justify-center gap-2 text-rose">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
                  <span>Voice message placeholder</span>
                </div>
              </div>
            )}
            {type === "surprise" && (
              <div className="text-center">
                <p className="text-3xl mb-2">🎉</p>
                <p className="handwritten text-base text-dark-text" style={{ fontFamily: "var(--font-caveat)" }}>{content}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
