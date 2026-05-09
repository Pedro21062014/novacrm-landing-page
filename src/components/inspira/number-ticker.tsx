"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className = "",
  decimalPlaces = 0,
}: {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
  decimalPlaces?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const springValue = useSpring(direction === "down" ? value : 0, {
    bounce: 0,
    duration: 2000,
  });
  const [displayValue, setDisplayValue] = useState(
    direction === "down" ? value : 0
  );

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        springValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
    }
  }, [inView, springValue, value, direction, delay]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
  }, [springValue]);

  return (
    <motion.span
      ref={ref}
      className={cn(
        "inline-block tabular-nums tracking-wider",
        className
      )}
    >
      {displayValue.toFixed(decimalPlaces)}
    </motion.span>
  );
}
