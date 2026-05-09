"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function BorderBeam({
  size = 200,
  duration = 8,
  delay = 0,
  colorFrom = "#9333ea",
  colorTo = "#6366f1",
  borderWidth = 1.5,
  className = "",
}: {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 rounded-[inherit] overflow-hidden pointer-events-none",
        className
      )}
    >
      <motion.div
        className="absolute"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo})`,
          borderRadius: "50%",
          filter: "blur(8px)",
        }}
        animate={{
          x: ["-100%", "calc(100vw + 100%)"],
          y: ["-50%", "-50%"],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute"
        style={{
          width: size,
          height: size,
          background: `linear-gradient(to bottom, ${colorTo}, ${colorFrom})`,
          borderRadius: "50%",
          filter: "blur(8px)",
        }}
        animate={{
          y: ["-100%", "calc(100vh + 100%)"],
          x: ["-50%", "-50%"],
        }}
        transition={{
          duration: duration * 1.2,
          delay: delay + 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
