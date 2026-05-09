"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function TracingBeam({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const y1 = useTransform(scrollYProgress, [0, 0.8], [0, svgHeight]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, svgHeight]);

  return (
    <div ref={ref} className={cn("relative w-full", className)}>
      <div className="absolute left-4 md:left-8 top-0">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="block"
          aria-hidden="true"
        >
          <motion.line
            x1="10"
            x2="10"
            y1={0}
            y2={svgHeight}
            stroke="url(#gradient)"
            strokeWidth="2"
            className="opacity-20"
          />
          <defs>
            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#9333ea" stopOpacity="0" />
              <stop offset="30%" stopColor="#9333ea" />
              <stop offset="70%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.line
            x1="10"
            x2="10"
            y1={y1}
            y2={y2}
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <motion.div
          style={{ y: y1 }}
          className="absolute left-0 top-0 w-5 h-5 rounded-full border-2 border-purple-500 bg-white shadow-[0_0_20px_rgba(147,51,234,0.5)]"
        />
      </div>
      <div ref={contentRef} className="pl-12 md:pl-20">
        {children}
      </div>
    </div>
  );
}
