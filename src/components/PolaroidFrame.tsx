"use client";

import { motion } from "framer-motion";

interface PolaroidFrameProps {
  src: string;
  alt?: string;
  className?: string;
  rotate?: number;
  caption?: string;
}

export default function PolaroidFrame({
  src,
  alt = "Photo",
  className = "",
  rotate = -2,
  caption,
}: PolaroidFrameProps) {
  return (
    <motion.div
      className={`inline-block bg-white p-3 pb-10 rounded-sm shadow-xl ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
      whileHover={{ scale: 1.02, rotate: 0, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden rounded-sm">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover aspect-[4/5]"
          style={{ maxWidth: 300 }}
        />
      </div>
      {caption && (
        <p className="text-center mt-2 text-sm text-romantic-foreground/70 font-caveat">
          {caption}
        </p>
      )}
    </motion.div>
  );
}
