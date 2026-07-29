"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  onDateSelected: () => void;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Section4_Calendar({ onDateSelected }: Props) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const isDateSelectable = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff >= 0 && diff <= 60;
  };

  const getDaysInMonth = (month: number, year: number) =>
    new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (month: number, year: number) =>
    new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (day: number) => {
    if (!isDateSelectable(day)) return;
    setSelectedDate(new Date(currentYear, currentMonth, day));
    setShowSuccess(true);
    setTimeout(() => onDateSelected(), 1500);
  };

  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-4 py-12">
      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="max-w-sm w-full"
          >
            <div className="glass-strong rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/40">
              <h2 className="text-2xl sm:text-3xl font-dancing text-romantic-foreground text-center mb-2">
                Choose Your Available Date 📅
              </h2>
              <Instruction text="Tap a date to confirm when you're free" />

              <div className="flex items-center justify-between mb-6">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrevMonth}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-romantic-foreground/70" />
                </motion.button>
                <span className="font-quicksand text-lg font-medium text-romantic-foreground">
                  {MONTHS[currentMonth]} {currentYear}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNextMonth}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-romantic-foreground/70" />
                </motion.button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-romantic-foreground/50 py-1">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }, (_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {days.map((day) => {
                  const selectable = isDateSelectable(day);
                  const isSelected = selectedDate?.getDate() === day &&
                    selectedDate?.getMonth() === currentMonth &&
                    selectedDate?.getFullYear() === currentYear;
                  return (
                    <motion.button
                      key={day}
                      whileHover={selectable ? { scale: 1.2 } : {}}
                      whileTap={selectable ? { scale: 0.9 } : {}}
                      onClick={() => handleDateClick(day)}
                      disabled={!selectable}
                      className={`
                        aspect-square rounded-full text-sm font-medium transition-all duration-200
                        ${isSelected ? "bg-romantic-rose text-white shadow-lg" : ""}
                        ${selectable && !isSelected ? "hover:bg-white/30 text-romantic-foreground" : ""}
                        ${!selectable ? "text-romantic-foreground/20 cursor-not-allowed" : "cursor-pointer"}
                      `}
                    >
                      {day}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              💕
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-dancing text-romantic-rose mb-4">
              Perfect! I'll save that date.
            </h2>
            <p className="text-romantic-foreground/60 font-quicksand">
              {selectedDate?.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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
