"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TextGenerateEffect({
  words,
  className = "",
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) {
  const wordArray = useMemo(
    () => words.split(" ").map((word) => ({ text: word })),
    [words]
  );

  return (
    <div className={cn("font-bold", className)}>
      {wordArray.map((word, idx) => (
        <motion.span
          key={`word-${word.text}-${idx}`}
          initial={{ opacity: 0, filter: filter ? "blur(10px)" : "none" }}
          animate={{ opacity: 1, filter: filter ? "blur(0px)" : "none" }}
          transition={{
            duration: duration,
            delay: idx * 0.08,
            ease: "easeOut",
          }}
          className="inline-block mr-[0.3em]"
        >
          {word.text}
        </motion.span>
      ))}
    </div>
  );
}
