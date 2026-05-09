"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect, useMemo } from "react";
import {
  Rocket,
  ShoppingCart,
  MessageCircle,
  BarChart3,
  Zap,
  TrendingUp,
  ArrowRight,
  Check,
  Bot,
  Smartphone,
  Globe,
  ChevronRight,
  Package,
  Headphones,
  Quote,
  ChevronLeft,
  ChevronDown,
  Sparkles,
  Layers,
  Shield,
  Cpu,
  MousePointer2,
  Sun,
  Moon,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════
// FLUID CURSOR — Inspira UI signature mouse-following effect
// Light & smooth colorful trails that follow the cursor
// ═══════════════════════════════════════════════════════════
function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX = 0, mouseY = 0;
    let prevMouseX = 0, prevMouseY = 0;
    let hue = 0;
    const particles: {
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
      size: number; hue: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - prevMouseX;
      const dy = mouseY - prevMouseY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Spawn fewer, smaller particles — only on significant movement
      const count = Math.min(Math.floor(speed / 8), 3);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spread = Math.random() * 1;
        particles.push({
          x: mouseX + Math.cos(angle) * spread,
          y: mouseY + Math.sin(angle) * spread,
          vx: dx * 0.04 + (Math.random() - 0.5) * 0.8,
          vy: dy * 0.04 + (Math.random() - 0.5) * 0.8,
          life: 1,
          maxLife: 40 + Math.random() * 30,
          size: Math.random() * 18 + 8,
          hue: hue + Math.random() * 20,
        });
      }

      // Single soft glow particle that follows cursor smoothly
      if (speed > 2) {
        particles.push({
          x: mouseX,
          y: mouseY,
          vx: dx * 0.02,
          vy: dy * 0.02,
          life: 1,
          maxLife: 20 + Math.random() * 15,
          size: 18 + speed * 0.2,
          hue: hue,
        });
      }

      hue = (hue + 0.3) % 360;
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Gentle burst on click — fewer particles, softer
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 * i) / 10;
        const speed = 1.5 + Math.random() * 1.5;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 40 + Math.random() * 25,
          size: 25 + Math.random() * 15,
          hue: hue + Math.random() * 40,
        });
      }
    };

    const animate = () => {
      // Faster fade for lighter feel
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 1 / p.maxLife;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        // No gravity — floaty, ethereal feel

        // Lower alpha for subtlety
        const alpha = p.life * 0.06;
        // Gentler size growth
        const size = p.size * (1 + (1 - p.life) * 0.3);

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        gradient.addColorStop(0, `hsla(${p.hue}, 60%, 65%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${p.hue + 15}, 50%, 55%, ${alpha * 0.4})`);
        gradient.addColorStop(1, `hsla(${p.hue + 30}, 40%, 45%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Lower particle cap
      while (particles.length > 120) {
        particles.shift();
      }

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed top-0 left-0 z-50 w-full h-full fluid-canvas"
    />
  );
}

// ═══════════════════════════════════════════════════════════
// MOUSE GLOW — Subtle radial glow that follows cursor
// ═══════════════════════════════════════════════════════════
function MouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const springX = useSpring(0, { stiffness: 50, damping: 20 });
  const springY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [springX, springY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-40 w-[600px] h-[600px] rounded-full mouse-glow"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}

// ═══════════════════════════════════════════════════════════
// STARS BACKGROUND — With mouse parallax (Inspira UI)
// ═══════════════════════════════════════════════════════════
function StarsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const springX = useSpring(offsetX, { stiffness: 50, damping: 20 });
  const springY = useSpring(offsetY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      offsetX.set(-(e.clientX - centerX) * 0.02);
      offsetY.set(-(e.clientY - centerY) * 0.02);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [offsetX, offsetY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const stars: { x: number; y: number; size: number; opacity: number; twinkle: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
      stars.length = 0;
      const count = Math.min(300, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 3000));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          twinkle: Math.random() * Math.PI * 2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const dx = springX.get();
      const dy = springY.get();
      stars.forEach((star) => {
        star.twinkle += 0.02;
        const opacity = star.opacity * (0.5 + 0.5 * Math.sin(star.twinkle));
        ctx.beginPath();
        ctx.arc(star.x + dx, star.y + dy, star.size, 0, Math.PI * 2);
        // Detect theme from document
        const isDark = document.documentElement.classList.contains('dark');
        const starColor = isDark ? `oklch(0.85 0.02 286 / ${opacity})` : `oklch(0.3 0.02 286 / ${opacity * 0.5})`;
        ctx.fillStyle = starColor;
        ctx.fill();
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
  }, [springX, springY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
    />
  );
}

// ═══════════════════════════════════════════════════════════
// ANIMATED GRID — Inspira UI style
// ═══════════════════════════════════════════════════════════
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `var(--grid-line), var(--grid-line)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SPOTLIGHT CARD — Mouse-following spotlight (Inspira UI)
// Radial gradient follows cursor within card
// ═══════════════════════════════════════════════════════════
function SpotlightCard({
  children,
  className = "",
  spotlightColor = "oklch(0.5 0.15 286 / 0.12)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-border bg-card/50 p-8 transition-all dark:hover:border-white/20 hover:border-foreground/10 ${className}`}
    >
      {/* Spotlight gradient that follows mouse */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 50%)`,
        }}
      />
      {/* Secondary subtle glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity: opacity * 0.5,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, var(--spotlight-secondary), transparent 60%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// 3D TILT CARD — Mouse-driven 3D rotation (Inspira UI GlareCard)
// ═══════════════════════════════════════════════════════════
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setIsHovering(false);
  };

  return (
    <div style={{ perspective: "1000px" }}>
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden rounded-2xl transition-transform duration-200 ease-out ${className}`}
        style={{ transform, transformStyle: "preserve-3d" }}
      >
        {children}
        {/* Glare effect */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: isHovering ? 0.15 : 0,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.3), transparent 60%)`,
          }}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// FLIP WORDS — Inspira UI
// ═══════════════════════════════════════════════════════════
function FlipWords({ words, duration = 2500, className = "" }: { words: string[]; duration?: number; className?: string }) {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((p) => (p + 1) % words.length), [words.length]);
  useEffect(() => { const i = setInterval(next, duration); return () => clearInterval(i); }, [next, duration]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={words[current]}
        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(8px)", position: "absolute" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`inline-block ${className}`}
      >
        {words[current]}
      </motion.span>
    </AnimatePresence>
  );
}

// ═══════════════════════════════════════════════════════════
// NUMBER COUNTER — Inspira UI
// ═══════════════════════════════════════════════════════════
function NumberCounter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-center gap-1 px-4 py-6">
      <span ref={ref} className="font-heading text-4xl font-bold tracking-tight text-foreground">
        {display.toLocaleString()}{suffix}
      </span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MARQUEE — Inspira UI
// ═══════════════════════════════════════════════════════════
function Marquee({ children, className = "", pauseOnHover = false, reverse = false }: { children: React.ReactNode; className?: string; pauseOnHover?: boolean; reverse?: boolean }) {
  return (
    <div className={`group flex overflow-hidden [--duration:25s] [--gap:1rem] ${className}`}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={`flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""} ${reverse ? "[animation-direction:reverse]" : ""}`}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// RAINBOW BUTTON — Inspira UI style
// ═══════════════════════════════════════════════════════════
function RainbowButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`rainbow-button relative inline-flex cursor-pointer items-center justify-center rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-primary-foreground transition-all focus-visible:ring-2 focus-visible:ring-ring ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2 bg-background/90 rounded-lg px-4 py-2">
        {children}
      </span>
    </motion.button>
  );
}

// ═══════════════════════════════════════════════════════════
// FEATURE CARD — With Spotlight effect (mouse-following)
// ═══════════════════════════════════════════════════════════
function FeatureCard({ icon, title, description, index }: { icon: React.ReactNode; title: string; description: string; index: number }) {
  const colors = [
    "oklch(0.6 0.2 280 / 0.12)",  // purple
    "oklch(0.6 0.2 200 / 0.12)",  // blue
    "oklch(0.6 0.2 160 / 0.12)",  // green
    "oklch(0.6 0.2 30 / 0.12)",   // orange
    "oklch(0.6 0.2 330 / 0.12)",  // pink
    "oklch(0.6 0.2 60 / 0.12)",   // yellow
  ];

  return (
    <SpotlightCard spotlightColor={colors[index % colors.length]} className="h-full">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
        {icon}
      </div>
      <h3 className="text-base font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </SpotlightCard>
  );
}

// ═══════════════════════════════════════════════════════════
// TESTIMONIAL SLIDER — Inspira UI style
// ═══════════════════════════════════════════════════════════
function TestimonialSlider({ testimonials }: { testimonials: { name: string; role: string; content: string; initials: string }[] }) {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((p) => (p + 1) % testimonials.length), [testimonials.length]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length), [testimonials.length]);

  useEffect(() => {
    const i = setInterval(next, 5000);
    return () => clearInterval(i);
  }, [next]);

  return (
    <div className="relative max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <Quote className="w-8 h-8 text-muted-foreground/30 mx-auto mb-6" />
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-8 font-extralight">
            &ldquo;{testimonials[current].content}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-foreground">
              {testimonials[current].initials}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">{testimonials[current].name}</p>
              <p className="text-xs text-muted-foreground">{testimonials[current].role}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-center gap-3 mt-8">
        <button onClick={prev} className="p-2 rounded-lg border border-border bg-card/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-1.5">
          {testimonials.map((_, idx) => (
            <button key={idx} onClick={() => setCurrent(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? "w-6 bg-foreground" : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"}`} />
          ))}
        </div>
        <button onClick={next} className="p-2 rounded-lg border border-border bg-card/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCROLL REVEAL — Inspira UI
// ═══════════════════════════════════════════════════════════
function ScrollReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// MOUSE MOVE HINT — Animated hint showing mouse interaction
// ═══════════════════════════════════════════════════════════
function MouseHint() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="flex items-center gap-2 text-xs text-muted-foreground/40 mt-2"
    >
      <motion.div
        animate={{ x: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <MousePointer2 className="w-3.5 h-3.5" />
      </motion.div>
      Mova o mouse pela pagina
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = useCallback(() => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('novacrm-theme', newDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground">
            <Rocket className="h-4 w-4 text-background" />
          </div>
          <span className="font-heading text-lg font-bold">
            Nova<span className="text-muted-foreground">CRM</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Recursos</a>
          <a href="#how-it-works" className="hover:text-foreground transition-colors">Como Funciona</a>
          <a href="#testimonials" className="hover:text-foreground transition-colors">Depoimentos</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Precos</a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card/50 hover:bg-secondary transition-all text-muted-foreground hover:text-foreground"
            aria-label="Alternar tema"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <a href="https://crm-dy6.pages.dev/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5">
            Entrar
          </a>
          <a
            href="https://crm-dy6.pages.dev/register"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
          >
            Criar Conta
          </a>
        </div>
      </div>
    </motion.header>
  );
}

// ═══════════════════════════════════════════════════════════
// HERO SECTION — With parallax stars and mouse glow
// ═══════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section className="relative isolate flex h-full min-h-screen w-full items-center justify-center overflow-hidden px-6 py-32">
      <StarsBackground />
      <AnimatedGrid />

      {/* Radial glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 40%, var(--hero-glow), transparent 70%)",
        }}
      />

      <div className="z-1 flex size-full flex-col items-center justify-center gap-4">
        {/* Launch badge */}
        <motion.a
          href="#features"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex w-fit cursor-pointer items-center justify-between gap-1.5 rounded-lg border border-border px-3 py-1.5 font-mono text-xs font-extralight text-muted-foreground hover:border-white/20 transition-colors"
        >
          <Rocket className="w-3 h-3" />
          Nova Versao 3.1 — Mais poderoso que nunca
          <ChevronRight className="w-3 h-3" />
        </motion.a>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading max-w-[52rem] text-center text-5xl font-bold tracking-tighter leading-[1.1] max-md:text-4xl max-sm:text-3xl"
        >
          O CRM que{" "}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent">
            vende por voce
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-muted-foreground/70 flex max-w-2xl flex-col items-center justify-center gap-1 text-center font-sans text-lg tracking-tight font-extralight"
        >
          Crie sua loja online, gerencie pedidos e use Inteligencia Artificial
          para atender seus clientes no WhatsApp. Tudo em um so lugar.
        </motion.p>

        {/* Flip Words line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base text-muted-foreground/50"
        >
          Venda mais com{" "}
          <FlipWords
            words={["automacao", "inteligencia", "praticidade", "velocidade"]}
            className="font-medium text-foreground/80"
            duration={2500}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-4"
        >
          <a href="https://crm-dy6.pages.dev/register">
            <RainbowButton>
              Comecar Gratis
              <ArrowRight className="w-4 h-4" />
            </RainbowButton>
          </a>
          <a
            href="https://crm-dy6.pages.dev/marketplace"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors"
          >
            <Globe className="w-4 h-4" />
            Ver Marketplace
          </a>
        </motion.div>

        {/* Mouse hint */}
        <MouseHint />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// STATS SECTION
// ═══════════════════════════════════════════════════════════
function StatsSection() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-24 py-20">
      <ScrollReveal className="flex flex-col items-center justify-center gap-3 px-4">
        <h2 className="font-heading text-4xl font-medium text-balance lg:text-5xl text-center">
          NovaCRM em numeros
        </h2>
        <p className="text-center font-extralight lg:text-lg text-muted-foreground/70 max-w-2xl">
          Mais de 2.000 lojistas ja estao transformando seus negocios com o NovaCRM. Veja o crescimento.
        </p>
      </ScrollReveal>

      <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0 md:divide-border">
        <ScrollReveal delay={0.1}>
          <NumberCounter value={2000} suffix="+" label="Lojistas Ativos" />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <NumberCounter value={50} suffix="K+" label="Pedidos Processados" />
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <NumberCounter value={1} suffix="M+" label="Mensagens via IA" />
        </ScrollReveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// FEATURES SECTION — With Spotlight Cards (mouse-following)
// ═══════════════════════════════════════════════════════════
function FeaturesSection() {
  const features = [
    {
      icon: <ShoppingCart className="w-5 h-5 text-foreground" />,
      title: "Loja Virtual",
      description: "Crie seu catalogo online em minutos e receba pedidos direto no WhatsApp. Personalize com sua marca.",
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-foreground" />,
      title: "Automacao WhatsApp",
      description: "Integracao oficial para recuperar carrinhos abandonados e enviar promocoes automaticamente.",
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-foreground" />,
      title: "CRM Inteligente",
      description: "Gestao completa de clientes com funil de vendas e inteligencia artificial. Nunca perca uma venda.",
    },
    {
      icon: <Bot className="w-5 h-5 text-foreground" />,
      title: "IA no WhatsApp",
      description: "Atenda seus clientes 24/7 com IA integrada ao WhatsApp. Respostas automaticas e inteligentes.",
    },
    {
      icon: <Globe className="w-5 h-5 text-foreground" />,
      title: "Marketplace NovaStore",
      description: "Acesse o marketplace com categorias de restaurantes, mercados, farmacias e mais.",
    },
    {
      icon: <Smartphone className="w-5 h-5 text-foreground" />,
      title: "Aplicativo Mobile",
      description: "Gerencie seu negocio de qualquer lugar com nosso app otimizado. Facil, rapido e intuitivo.",
    },
  ];

  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal className="flex flex-col items-center justify-center gap-3 mb-16">
          <h2 className="font-heading text-4xl font-medium text-balance lg:text-5xl text-center">
            Tudo o que voce precisa
          </h2>
          <p className="text-center font-extralight lg:text-lg text-muted-foreground/70 max-w-2xl">
            Ferramentas poderosas para alavancar suas vendas sem complexidade. Um CRM completo que trabalha por voce.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <FeatureCard {...feature} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// HOW IT WORKS — With Spotlight step cards
// ═══════════════════════════════════════════════════════════
function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Crie sua conta gratis",
      description: "Cadastre-se em segundos com email ou Google. Sem cartao de credito, sem compromisso.",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      step: "02",
      title: "Monte sua loja online",
      description: "Adicione seus produtos, personalize com sua marca e publique. Sua loja fica pronta em minutos.",
      icon: <Package className="w-5 h-5" />,
    },
    {
      step: "03",
      title: "Ative a IA no WhatsApp",
      description: "Configure o bot com IA para atender clientes 24/7 e recuperar carrinhos abandonados.",
      icon: <Bot className="w-5 h-5" />,
    },
    {
      step: "04",
      title: "Escale suas vendas",
      description: "Acompanhe metricas em tempo real, gerencie o funil e veja seu negocio crescer.",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal className="flex flex-col items-center justify-center gap-3 mb-16">
          <h2 className="font-heading text-4xl font-medium text-balance lg:text-5xl text-center">
            Simples de comecar
          </h2>
          <p className="text-center font-extralight lg:text-lg text-muted-foreground/70 max-w-2xl">
            Em apenas 4 passos, transforme seu negocio com o poder da inteligencia artificial e automacao.
          </p>
        </ScrollReveal>

        <div className="relative mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <SpotlightCard
                spotlightColor={`oklch(0.6 0.15 ${280 + i * 30} / 0.1)`}
                className="text-center h-full"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background">
                    {step.icon}
                  </div>
                  <span className="font-mono text-xs text-muted-foreground/50">PASSO {step.step}</span>
                  <h3 className="text-base font-medium">{step.title}</h3>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed">{step.description}</p>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// TESTIMONIALS
// ═══════════════════════════════════════════════════════════
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ana Silva",
      role: "Silva Modas",
      initials: "AS",
      content: "O NovaCRM transformou completamente meu negocio. Antes eu anotava tudo no caderno, agora tenho controle total e a IA atende meus clientes mesmo de madrugada. Minhas vendas cresceram 40%!",
    },
    {
      name: "Carlos Oliveira",
      role: "Pet Shop Amigo",
      initials: "CO",
      content: "A automacao do WhatsApp e incrivel! A recuperacao de carrinhos abandonados me rendeu mais de R$ 5.000 no primeiro mes. Recomendo demais!",
    },
    {
      name: "Mariana Santos",
      role: "Farmacia Vida",
      initials: "MS",
      content: "O funil de vendas e a gestao de clientes sao perfeitos. Consigo ver exatamente onde cada cliente esta no processo e agir no momento certo.",
    },
    {
      name: "Roberto Lima",
      role: "Mercado Fresh",
      initials: "RL",
      content: "Ter a loja online integrada com o WhatsApp mudou o jogo. Meus clientes fazem pedidos pelo site e eu recebo tudo organizado. Suporte excelente!",
    },
  ];

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal className="flex flex-col items-center justify-center gap-3 mb-16">
          <h2 className="font-heading text-4xl font-medium text-balance lg:text-5xl text-center">
            Quem usa, aprova
          </h2>
          <p className="text-center font-extralight lg:text-lg text-muted-foreground/70 max-w-2xl">
            Mais de 2.000 lojistas ja estao transformando seus negocios com o NovaCRM.
          </p>
        </ScrollReveal>

        <TestimonialSlider testimonials={testimonials} />
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// PRICING SECTION — With 3D Tilt Cards
// ═══════════════════════════════════════════════════════════
function PricingSection() {
  const plans = [
    {
      name: "Inicio",
      price: "Gratis",
      period: "",
      description: "Perfeito para comecar e testar a plataforma",
      features: ["Loja virtual com ate 20 produtos", "WhatsApp basico", "Gestao de pedidos", "Dashboard simplificado", "Suporte por email"],
      cta: "Comecar Gratis",
      popular: false,
    },
    {
      name: "Pro",
      price: "R$ 79",
      period: "/mes",
      description: "Para negocios em crescimento que precisam de mais poder",
      features: ["Produtos ilimitados", "IA no WhatsApp 24/7", "Funil de vendas completo", "Recuperacao de carrinhos", "Analytics avancado", "Suporte prioritario", "Marketplace NovaStore"],
      cta: "Comecar Agora",
      popular: true,
    },
    {
      name: "Empresarial",
      price: "R$ 199",
      period: "/mes",
      description: "Para grandes operacoes com necessidades avancadas",
      features: ["Tudo do Pro", "Multi-lojas", "API personalizada", "Integracoes avancadas", "Gerente dedicado", "SLA de 99.9%", "Treinamento incluso"],
      cta: "Falar com Vendas",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal className="flex flex-col items-center justify-center gap-3 mb-16">
          <h2 className="font-heading text-4xl font-medium text-balance lg:text-5xl text-center">
            Planos que crescem com voce
          </h2>
          <p className="text-center font-extralight lg:text-lg text-muted-foreground/70 max-w-2xl">
            Comece gratis e escale conforme seu negocio cresce. Sem surpresas, sem taxas escondidas.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <TiltCard className="h-full">
                <div className={`relative rounded-2xl border p-8 h-full flex flex-col ${
                  plan.popular ? "border-foreground/20 bg-card" : "border-border bg-card/30"
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-medium px-3 py-1 rounded-full">
                      MAIS POPULAR
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="font-heading text-lg font-medium mb-1">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground/70">{plan.description}</p>
                  </div>
                  <div className="mb-8">
                    <span className="font-heading text-4xl font-bold tracking-tight">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-1 text-sm">{plan.period}</span>}
                  </div>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <Check className="w-3.5 h-3.5 shrink-0 text-foreground/50" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="https://crm-dy6.pages.dev/register"
                    className={`block text-center py-2.5 rounded-full text-sm font-medium transition-all ${
                      plan.popular
                        ? "bg-foreground text-background hover:opacity-90"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// CTA SECTION — With SpotlightCard
// ═══════════════════════════════════════════════════════════
function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <StarsBackground />
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <ScrollReveal>
          <SpotlightCard
            spotlightColor="oklch(0.5 0.12 286 / 0.15)"
            className="p-12 md:p-16"
          >
            <div className="flex flex-col items-center gap-4">
              <h2 className="font-heading text-4xl font-medium text-balance lg:text-5xl text-center">
                Pronto para transformar seu negocio?
              </h2>
              <p className="text-center font-extralight lg:text-lg text-muted-foreground/70 max-w-2xl">
                Junte-se a mais de 2.000 lojistas que ja estao vendendo mais com o NovaCRM. Comece gratis, sem cartao de credito.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                <a href="https://crm-dy6.pages.dev/register">
                  <RainbowButton>
                    Criar Conta Gratis
                    <ArrowRight className="w-4 h-4" />
                  </RainbowButton>
                </a>
                <a
                  href="https://crm-dy6.pages.dev/marketplace"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors"
                >
                  <Headphones className="w-4 h-4" />
                  Falar com especialista
                </a>
              </div>
            </div>
          </SpotlightCard>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// MARQUEE SECTION
// ═══════════════════════════════════════════════════════════
function MarqueeSection() {
  const items = [
    { icon: <ShoppingCart className="w-3.5 h-3.5" />, label: "Loja Virtual" },
    { icon: <BarChart3 className="w-3.5 h-3.5" />, label: "CRM Inteligente" },
    { icon: <MessageCircle className="w-3.5 h-3.5" />, label: "WhatsApp Bot" },
    { icon: <Package className="w-3.5 h-3.5" />, label: "Gestao de Pedidos" },
    { icon: <TrendingUp className="w-3.5 h-3.5" />, label: "Funil de Vendas" },
    { icon: <Globe className="w-3.5 h-3.5" />, label: "Marketplace" },
    { icon: <Bot className="w-3.5 h-3.5" />, label: "IA Automacao" },
    { icon: <Zap className="w-3.5 h-3.5" />, label: "Analytics" },
  ];

  return (
    <div className="border-y border-border py-4">
      <Marquee pauseOnHover>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
            {item.icon}
            {item.label}
          </div>
        ))}
      </Marquee>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer className="flex w-full items-center justify-between border-t border-border px-6 py-4 text-sm text-muted-foreground/50">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground">
          <Rocket className="h-3 w-3 text-background" />
        </div>
        <span>Copyright &copy; 2026 NovaCRM</span>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
        <a href="#" className="hover:text-foreground transition-colors">Termos</a>
        <a href="#" className="hover:text-foreground transition-colors">Contato</a>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN PAGE — With Fluid Cursor + Mouse Glow
// ═══════════════════════════════════════════════════════════
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Inspira UI signature mouse effects */}
      <FluidCursor />
      <MouseGlow />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <MarqueeSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
