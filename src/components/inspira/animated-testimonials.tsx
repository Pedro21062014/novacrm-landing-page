"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export function AnimatedTestimonials({
  testimonials,
  autoplayInterval = 5000,
  className = "",
}: {
  testimonials: Testimonial[];
  autoplayInterval?: number;
  className?: string;
}) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const interval = setInterval(next, autoplayInterval);
    return () => clearInterval(interval);
  }, [next, autoplayInterval]);

  return (
    <div className={cn("relative max-w-4xl mx-auto", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12"
        >
          <Quote className="w-10 h-10 text-purple-500/50 mb-6" />
          <p className="text-lg md:text-xl text-neutral-200 leading-relaxed mb-8">
            &ldquo;{testimonials[current].content}&rdquo;
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
              {testimonials[current].avatar}
            </div>
            <div>
              <p className="font-semibold text-white">{testimonials[current].name}</p>
              <p className="text-sm text-neutral-400">{testimonials[current].role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                idx === current
                  ? "bg-purple-500 w-6"
                  : "bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-white"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
