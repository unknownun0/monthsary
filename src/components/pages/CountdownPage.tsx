'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CountdownPageProps {
  onNext: () => void;
  onPrev: () => void;
}

export default function CountdownPage({ onNext, onPrev }: CountdownPageProps) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const startDate = new Date("2025-03-29T00:00:00");
    const update = () => {
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTime({ days, hours, minutes, seconds });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="max-w-lg w-full scrapbook-paper rounded-lg p-6 sm:p-10 text-center">
        <p className="handwritten text-brown mb-8" style={{ fontFamily: "var(--font-caveat)" }}>Every second with you has been worth it.</p>

        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { label: "Days", value: time.days },
            { label: "Hours", value: time.hours },
            { label: "Minutes", value: time.minutes },
            { label: "Seconds", value: time.seconds },
          ].map((item) => (
            <motion.div key={item.label}
              className="rounded-lg p-3"
              style={{ background: "rgba(214, 179, 106, 0.1)", border: "1px solid #E8D5A3" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            >
              <motion.p className="text-2xl sm:text-3xl font-bold text-rose"
                key={item.value}
                initial={{ scale: 1.2 }} animate={{ scale: 1 }}
              >
                {String(item.value).padStart(2, "0")}
              </motion.p>
              <p className="handwritten text-brown text-xs mt-1" style={{ fontFamily: "var(--font-caveat)" }}>{item.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="p-4 rounded-sm" style={{ background: "rgba(248, 200, 220, 0.15)", border: "1px dashed #D96C8A" }}>
          <p className="handwritten text-lg text-dark-text" style={{ fontFamily: "var(--font-caveat)" }}>
            {time.days} days, {time.hours} hours, {time.minutes} minutes, and {time.seconds} seconds
          </p>
          <p className="handwritten text-base text-rose mt-2" style={{ fontFamily: "var(--font-caveat)" }}>
            ...and I have loved every single one of them.
          </p>
        </div>

        <div className="flex justify-between mt-8">
          <motion.button className="px-6 py-2 rounded-full border-2 text-brown handwritten text-lg" style={{ borderColor: "#D6B36A" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onPrev}>&larr; Back</motion.button>
          <motion.button className="px-6 py-2 rounded-full text-white handwritten text-lg" style={{ background: "linear-gradient(135deg, #D96C8A, #B54B6A)" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onNext}>Next Page &rarr;</motion.button>
        </div>
      </div>
    </motion.div>
  );
}
