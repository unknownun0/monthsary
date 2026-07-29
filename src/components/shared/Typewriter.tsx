'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export default function Typewriter({ text, speed = 50, className = "", onComplete }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(prev => prev + text[idx]);
        setIdx(idx + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (onComplete) {
      onComplete();
    }
  }, [idx, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {idx < text.length && (
        <span className="border-r-2 border-brown ml-0.5 inline-block w-0.5 h-4" style={{ animation: "blink 0.8s infinite" }} />
      )}
    </span>
  );
}
