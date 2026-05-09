"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ShimmerButton({
  children,
  className = "",
  shimmerColor = "#9333ea",
  shimmerSize = "0.1em",
  shimmerDuration = "2s",
  borderRadius = "100px",
  background = "rgba(147, 51, 234, 0.9)",
}: {
  children: React.ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  borderRadius?: string;
  background?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "group relative overflow-hidden whitespace-nowrap px-8 py-4 text-white font-semibold cursor-pointer",
        className
      )}
      style={{
        borderRadius,
        background,
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius }}
      >
        <div
          className="absolute inset-[-100%] animate-[shimmer_2s_infinite]"
          style={{
            background: `linear-gradient(90deg, transparent, ${shimmerColor}40, transparent)`,
            animationDuration: shimmerDuration,
          }}
        />
      </div>
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
