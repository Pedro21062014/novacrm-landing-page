"use client";

import { useId, useMemo } from "react";
import { motion } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  color: string;
  delay: number;
  scale: number;
  lifespan: number;
}

export function SparklesCore({
  background = "transparent",
  minSize = 0.4,
  maxSize = 1.4,
  particleCount = 50,
  particleColor = "#ffffff",
  className = "",
}: {
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleCount?: number;
  particleColor?: string;
  className?: string;
}) {
  const id = useId();

  const sparkles = useMemo<Sparkle[]>(() => {
    const generated: Sparkle[] = [];
    for (let i = 0; i < particleCount; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: particleColor,
        delay: Math.random() * 2,
        scale: Math.random() * (maxSize - minSize) + minSize,
        lifespan: Math.random() * 10 + 5,
      });
    }
    return generated;
  }, [particleCount, particleColor, minSize, maxSize]);

  return (
    <div
      className={`relative h-full w-full ${className}`}
      style={{ background }}
    >
      {sparkles.map((sparkle) => (
        <motion.span
          key={`${id}-${sparkle.id}`}
          className="absolute rounded-full"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.scale}px`,
            height: `${sparkle.scale}px`,
            backgroundColor: sparkle.color,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, sparkle.scale, 0],
          }}
          transition={{
            duration: sparkle.lifespan,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function SparklesText({
  text,
  className = "",
  sparklesCount = 10,
  colors = { first: "#9333ea", second: "#6366f1" },
}: {
  text: string;
  className?: string;
  sparklesCount?: number;
  colors?: { first: string; second: string };
}) {
  const id = useId();

  const sparkles = useMemo<Sparkle[]>(() => {
    const generated: Sparkle[] = [];
    for (let i = 0; i < sparklesCount; i++) {
      generated.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: Math.random() > 0.5 ? colors.first : colors.second,
        delay: Math.random() * 2,
        scale: Math.random() * 2 + 1,
        lifespan: Math.random() * 3 + 2,
      });
    }
    return generated;
  }, [sparklesCount, colors]);

  return (
    <span className={`relative inline-block ${className}`}>
      {sparkles.map((sparkle) => (
        <motion.span
          key={`${id}-sparkle-${sparkle.id}`}
          className="absolute pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.lifespan,
            repeat: Infinity,
            delay: sparkle.delay,
            ease: "easeInOut",
          }}
        >
          <svg
            width={sparkle.scale * 4}
            height={sparkle.scale * 4}
            viewBox="0 0 24 24"
            fill={sparkle.color}
          >
            <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
          </svg>
        </motion.span>
      ))}
      {text}
    </span>
  );
}
