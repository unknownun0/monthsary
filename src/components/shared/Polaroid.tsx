'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface PolaroidProps {
  src: string;
  caption?: string;
  rotate?: number;
  className?: string;
  onClick?: () => void;
  width?: number;
  height?: number;
}

export default function Polaroid({ src, caption, rotate = 0, className = "", onClick, width = 300, height = 300 }: PolaroidProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      className={"polaroid-frame relative cursor-pointer " + className}
      style={{ transform: "rotate(" + rotate + "deg)" }}
      whileHover={{ scale: 1.03, rotate: 0, transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden" style={{ width, height }}>
        {!loaded && (
          <div className="absolute inset-0 bg-[#f0e8dd] animate-pulse" />
        )}
        <Image
          src={src}
          alt={caption || "Photo"}
          width={width}
          height={height}
          className={"object-cover transition-opacity duration-500 " + (loaded ? "opacity-100" : "opacity-0")}
          onLoad={() => setLoaded(true)}
          unoptimized
        />
      </div>
      {caption && (
        <p className="handwritten text-center text-sm mt-2 text-brown" style={{ fontFamily: "var(--font-caveat)" }}>
          {caption}
        </p>
      )}
    </motion.div>
  );
}
