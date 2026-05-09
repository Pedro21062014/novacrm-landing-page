"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function ContainerScrollAnimation({
  titleComponent,
  children,
  className = "",
}: {
  titleComponent?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);
  const translateY = useTransform(scrollYProgress, [0, 0.5], [80, 0]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col items-center justify-start py-10 md:py-20", className)}
      style={{ perspective: "1200px" }}
    >
      {titleComponent && (
        <motion.div
          style={{ opacity, translateY }}
          className="mb-8 text-center"
        >
          {titleComponent}
        </motion.div>
      )}
      <motion.div
        style={{ scale, rotateX, opacity, translateY }}
        className="w-full max-w-6xl"
      >
        {children}
      </motion.div>
    </div>
  );
}
