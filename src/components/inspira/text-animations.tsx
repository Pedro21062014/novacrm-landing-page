"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GlowText({
  text,
  className = "",
  color = "text-purple-400",
}: {
  text: string;
  className?: string;
  color?: string;
}) {
  return (
    <motion.span
      className={cn(
        "relative inline-block",
        color,
        className
      )}
      animate={{
        textShadow: [
          "0 0 20px rgba(147,51,234,0.3)",
          "0 0 40px rgba(147,51,234,0.6)",
          "0 0 20px rgba(147,51,234,0.3)",
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      {text}
    </motion.span>
  );
}

export function TypingAnimation({
  text,
  className = "",
  duration = 0.05,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  return (
    <motion.span className={cn("inline-block", className)}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: i * duration }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function GradientText({
  text,
  className = "",
  fromColor = "#9333ea",
  toColor = "#6366f1",
}: {
  text: string;
  className?: string;
  fromColor?: string;
  toColor?: string;
}) {
  return (
    <span
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(135deg, ${fromColor}, ${toColor})`,
      }}
    >
      {text}
    </span>
  );
}
