"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedBeam({
  className = "",
  fromX = 0,
  fromY = 0,
  toX = 100,
  toY = 100,
  curvature = 0,
  pathWidth = 2,
  pathColor = "rgb(147 51 234)",
  gradientStartColor = "#9333ea",
  gradientStopColor = "#6366f1",
  delay = 0,
  duration = 3,
  reverse = false,
}: {
  className?: string;
  fromX?: number;
  fromY?: number;
  toX?: number;
  toY?: number;
  curvature?: number;
  pathWidth?: number;
  pathColor?: string;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  reverse?: boolean;
}) {
  const controlX = (fromX + toX) / 2;
  const controlY = (fromY + toY) / 2 + curvature;
  const pathD = `M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`;

  return (
    <svg className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}>
      <defs>
        <linearGradient id="beam-gradient" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="50%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={pathD} stroke={pathColor} strokeWidth={pathWidth} fill="none" opacity={0.2} />
      <path d={pathD} stroke="url(#beam-gradient)" strokeWidth={pathWidth} fill="none">
        <animate
          attributeName="stroke-dasharray"
          from="0 1000"
          to="200 1000"
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          from={reverse ? "-200" : "0"}
          to={reverse ? "0" : "-200"}
          dur={`${duration}s`}
          begin={`${delay}s`}
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}
