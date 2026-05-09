"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function BackgroundBeams({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let beams: { x: number; y: number; length: number; angle: number; speed: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      beams = Array.from({ length: 8 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 200 + 100,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.3 + 0.1,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      beams.forEach((beam) => {
        const gradient = ctx.createLinearGradient(
          beam.x,
          beam.y,
          beam.x + Math.cos(beam.angle) * beam.length,
          beam.y + Math.sin(beam.angle) * beam.length
        );
        gradient.addColorStop(0, `rgba(147, 51, 234, 0)`);
        gradient.addColorStop(0.5, `rgba(147, 51, 234, ${beam.opacity})`);
        gradient.addColorStop(1, `rgba(99, 102, 241, 0)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(beam.x, beam.y);
        ctx.lineTo(
          beam.x + Math.cos(beam.angle) * beam.length,
          beam.y + Math.sin(beam.angle) * beam.length
        );
        ctx.stroke();
        beam.y += beam.speed;
        beam.angle += 0.002;
        if (beam.y > canvas.height + beam.length) {
          beam.y = -beam.length;
          beam.x = Math.random() * canvas.width;
        }
      });
      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
    />
  );
}

export function GridBackground({ className = "" }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(147,51,234,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
    </div>
  );
}

export function RadialGradient({
  className = "",
  color = "rgba(147, 51, 234, 0.15)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        background: `radial-gradient(ellipse 80% 50% at 50% -20%, ${color}, transparent)`,
      }}
    />
  );
}
