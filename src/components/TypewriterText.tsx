"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function TypewriterText({
  text,
  className = "",
  speed = 50,
  delay = 0,
  onComplete,
  as: Tag = "p",
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setShowCursor(false);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, started, onComplete]);

  if (!started) return <Tag className={className}>&nbsp;</Tag>;

  return (
    <Tag className={className}>
      {displayedText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block ml-0.5 text-romantic-rose"
        >
          |
        </motion.span>
      )}
    </Tag>
  );
}
