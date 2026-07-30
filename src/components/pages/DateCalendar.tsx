'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const FIXED_YEAR = 2026;
const FIXED_MONTH = 7; // August (0-based)
const MIN_DAY = 2;
const MAX_DAY = 10;

interface DateCalendarProps {
  onNext: (date: string) => void;
  onPrev: () => void;
}

export default function DateCalendar({ onNext, onPrev }: DateCalendarProps) {
  const [year] = useState(FIXED_YEAR);
  const [month] = useState(FIXED_MONTH);
  const [selected, setSelected] = useState<string | null>(null);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleSelect = (day: number) => {
    const date = new Date(year, month, day);
    setSelected(date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="max-w-lg w-full scrapbook-paper rounded-lg p-6 sm:p-10">
        <h2 className="handwritten-serif text-3xl sm:text-4xl text-rose text-center mb-2" style={{ fontFamily: "var(--font-dancing)" }}>
          Pick Our Date
        </h2>
        <p className="handwritten text-brown text-center mb-6" style={{ fontFamily: "var(--font-caveat)" }}>Choose when our special date happens</p>

        <div className="flex items-center justify-between mb-4">
          <div className="w-8" />
          <span className="handwritten-serif text-xl text-dark-text" style={{ fontFamily: "var(--font-dancing)" }}>
            {MONTHS[month]} {year}
          </span>
          <div className="w-8" />
        </div>

        <p className="handwritten text-center text-sm text-brown mb-4" style={{ fontFamily: "var(--font-caveat)" }}>
          Available dates: August 2, 2026 through August 10, 2026 only
        </p>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map(d => (
            <div key={d} className="text-center handwritten text-sm text-brown py-1" style={{ fontFamily: "var(--font-caveat)" }}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const isWithinRange = day >= MIN_DAY && day <= MAX_DAY;
            const isSelected = selected && new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) === selected;
            return (
              <motion.button key={day}
                className="rounded-full w-10 h-10 flex items-center justify-center handwritten text-base"
                style={{
                  background: isSelected ? "#D96C8A" : "transparent",
                  color: isSelected ? "#FFF" : isWithinRange ? "#5C4033" : "rgba(92, 64, 51, 0.25)",
                  cursor: isWithinRange ? "pointer" : "not-allowed",
                }}
                whileHover={isWithinRange ? { scale: 1.1, background: isSelected ? "#D96C8A" : "#F8C8DC" } : undefined}
                whileTap={isWithinRange ? { scale: 0.9 } : undefined}
                onClick={() => isWithinRange && handleSelect(day)}
                disabled={!isWithinRange}
              >
                {day}
              </motion.button>
            );
          })}
        </div>

        {selected && (
          <motion.div className="mt-6 p-4 rounded-sm text-center"
            style={{ background: "rgba(248, 200, 220, 0.2)", border: "1px dashed #D96C8A" }}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          >
            <p className="handwritten text-lg text-rose" style={{ fontFamily: "var(--font-caveat)" }}>&#x2764;&#xFE0F; {selected}</p>
            <motion.button className="mt-3 px-6 py-2 rounded-full text-white handwritten text-base"
              style={{ background: "linear-gradient(135deg, #D96C8A, #B54B6A)" }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => onNext(selected)}
            >
              Confirm Date &rarr;
            </motion.button>
          </motion.div>
        )}

        <div className="flex justify-between mt-8">
          <motion.button className="px-6 py-2 rounded-full border-2 text-brown handwritten text-lg" style={{ borderColor: "#D6B36A" }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onPrev}>&larr; Back</motion.button>
        </div>
      </div>
    </motion.div>
  );
}
