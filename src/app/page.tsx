"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Rocket,
  ShoppingCart,
  MessageCircle,
  BarChart3,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Star,
  ArrowRight,
  Check,
  Bot,
  Smartphone,
  Globe,
  ChevronRight,
  Package,
  Headphones,
} from "lucide-react";
import { SparklesCore, SparklesText } from "@/components/inspira/sparkles";
import { TextGenerateEffect } from "@/components/inspira/text-generate-effect";
import { ContainerScrollAnimation } from "@/components/inspira/container-scroll-animation";
import { BorderBeam } from "@/components/inspira/border-beam";
import { Marquee } from "@/components/inspira/marquee";
import { FlipWords } from "@/components/inspira/flip-words";
import { NumberTicker } from "@/components/inspira/number-ticker";
import { SpotlightCard } from "@/components/inspira/card-3d";
import { TracingBeam } from "@/components/inspira/tracing-beam";
import {
  BentoGrid,
  BentoGridItem,
} from "@/components/inspira/bento-grid";
import {
  ScrollReveal,
  StaggerChildren,
  StaggerItem,
} from "@/components/inspira/scroll-reveal";
import { AnimatedTestimonials } from "@/components/inspira/animated-testimonials";
import {
  BackgroundBeams,
  GridBackground,
  RadialGradient,
} from "@/components/inspira/background-effects";
import { ShimmerButton } from "@/components/inspira/shimmer-button";
import { GradientText, GlowText } from "@/components/inspira/text-animations";

// ─── Navbar ───────────────────────────────────────────────
function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">
            Nova<span className="text-purple-400">CRM</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] font-semibold tracking-widest text-purple-400/70 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 ml-1">
            VERSAO 3.1
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-neutral-400">
          <a href="#features" className="hover:text-white transition-colors">Recursos</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">Como Funciona</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Depoimentos</a>
          <a href="#pricing" className="hover:text-white transition-colors">Preços</a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://crm-dy6.pages.dev/login"
            className="text-sm text-neutral-300 hover:text-white transition-colors px-4 py-2"
          >
            Entrar
          </a>
          <a
            href="https://crm-dy6.pages.dev/register"
            className="text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-5 py-2 rounded-full transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
          >
            Criar Conta
          </a>
        </div>
      </div>
    </motion.nav>
  );
}

// ─── Hero Section ─────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 overflow-hidden">
      {/* Background Effects */}
      <RadialGradient />
      <GridBackground />
      <SparklesCore
        particleCount={80}
        particleColor="rgba(147, 51, 234, 0.6)"
        minSize={0.2}
        maxSize={1}
        className="absolute inset-0"
      />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="text-sm text-purple-300 font-medium">
            Nova Versao 3.1 — Mais poderoso que nunca
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] mb-6"
        >
          <span className="text-white">O CRM que </span>
          <SparklesText
            text="vende por você."
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold"
            sparklesCount={15}
            colors={{ first: "#a855f7", second: "#6366f1" }}
          />
        </motion.h1>

        {/* Subtitle with FlipWords */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-4 leading-relaxed"
        >
          Crie sua loja online, gerencie pedidos e use Inteligência Artificial
          para atender seus clientes no WhatsApp.{" "}
          <span className="text-white font-medium">Tudo em um so lugar.</span>
        </motion.div>

        {/* Flip Words */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-neutral-300 mb-10"
        >
          <span className="text-neutral-500">Venda mais com </span>
          <FlipWords
            words={["automacao", "inteligencia", "praticidade", "velocidade"]}
            className="text-purple-400 font-bold"
            duration={2500}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a href="https://crm-dy6.pages.dev/register">
            <ShimmerButton className="text-lg px-8 py-4">
              Comecar Gratis <ArrowRight className="inline w-5 h-5 ml-2" />
            </ShimmerButton>
          </a>
          <a
            href="https://crm-dy6.pages.dev/marketplace"
            className="flex items-center gap-2 text-neutral-300 hover:text-white bg-white/5 border border-white/10 hover:border-purple-500/30 px-8 py-4 rounded-full transition-all hover:shadow-[0_0_30px_rgba(147,51,234,0.15)]"
          >
            <Globe className="w-5 h-5" />
            Ver Marketplace
          </a>
        </motion.div>

        {/* Dashboard Preview with Scroll Animation */}
        <div className="relative w-full max-w-5xl mx-auto">
          <ContainerScrollAnimation>
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-2xl shadow-purple-500/10">
              <BorderBeam
                size={300}
                duration={10}
                colorFrom="#9333ea"
                colorTo="#6366f1"
              />
              {/* Browser Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white/5 rounded-md px-4 py-1 text-xs text-neutral-500 border border-white/5">
                    app.novacrm.com.br/dashboard
                  </div>
                </div>
              </div>
              {/* Dashboard Content */}
              <div className="p-6 space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: "Vendas Hoje", value: "R$ 4.280", change: "+12%", icon: TrendingUp },
                    { label: "Pedidos", value: "47", change: "+8%", icon: ShoppingCart },
                    { label: "Clientes Ativos", value: "312", change: "+5%", icon: Users },
                    { label: "Conversao", value: "68%", change: "+3%", icon: BarChart3 },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="bg-white/5 rounded-xl p-4 border border-white/5"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-green-400">{stat.change}</span>
                      </div>
                      <p className="text-lg font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-neutral-500">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
                {/* Chart Placeholder */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/5 h-48 flex items-center justify-center">
                  <div className="flex items-end gap-1 h-32">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                        className="w-4 md:w-6 bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t-sm"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ContainerScrollAnimation>
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof Marquee ────────────────────────────────
function SocialProofSection() {
  const stats = [
    { icon: Users, value: "2.000+", label: "Lojistas Ativos" },
    { icon: ShoppingCart, value: "50K+", label: "Pedidos Processados" },
    { icon: MessageCircle, value: "1M+", label: "Mensagens via IA" },
    { icon: Star, value: "4.9", label: "Avaliacao Media" },
  ];

  return (
    <section className="relative py-20 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="text-center">
                <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-extrabold text-white">
                  <NumberTicker value={parseFloat(stat.value)} decimalPlaces={stat.value.includes(".") ? 1 : 0} />
                  {stat.value.includes("+") ? "+" : stat.value.includes("K") ? "K" : stat.value.includes("M") ? "M" : ""}
                </div>
                <p className="text-sm text-neutral-400 mt-1">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <Marquee pauseOnHover className="[--duration:25s]">
        {["Loja Virtual", "CRM Inteligente", "WhatsApp Bot", "Gestao de Pedidos", "Funil de Vendas", "Marketplace", "IA Automacao", "Analytics"].map(
          (item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-sm text-neutral-300"
            >
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              {item}
            </div>
          )
        )}
      </Marquee>
    </section>
  );
}

// ─── Features Bento Grid ─────────────────────────────────
function FeaturesSection() {
  const features = [
    {
      title: "Loja Virtual",
      description:
        "Crie seu catalogo online em minutos e receba pedidos direto no WhatsApp. Personalize com sua marca e comece a vender imediatamente.",
      icon: <ShoppingCart className="w-6 h-6 text-blue-400" />,
      className: "md:col-span-2",
      header: (
        <div className="relative w-full h-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl p-4 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30"
          >
            <ShoppingCart className="w-10 h-10 text-white" />
          </motion.div>
        </div>
      ),
    },
    {
      title: "Automacao WhatsApp",
      description:
        "Integracao oficial para recuperar carrinhos abandonados e enviar promocoes automaticamente para seus clientes.",
      icon: <MessageCircle className="w-6 h-6 text-emerald-400" />,
      header: (
        <div className="relative w-full h-full bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-xl p-4 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30"
          >
            <MessageCircle className="w-10 h-10 text-white" />
          </motion.div>
        </div>
      ),
    },
    {
      title: "CRM Inteligente",
      description:
        "Gestao completa de clientes com funil de vendas e inteligencia artificial. Nunca mais perca uma oportunidade de venda.",
      icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
      className: "md:col-span-2",
      header: (
        <div className="relative w-full h-full bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-xl p-4 flex items-center justify-center">
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/30"
            style={{ perspective: 400 }}
          >
            <BarChart3 className="w-10 h-10 text-white" />
          </motion.div>
        </div>
      ),
    },
    {
      title: "IA no WhatsApp",
      description:
        "Atenda seus clientes 24/7 com inteligencia artificial integrada ao WhatsApp. Respostas automaticas e inteligentes.",
      icon: <Bot className="w-6 h-6 text-amber-400" />,
      header: (
        <div className="relative w-full h-full bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-xl p-4 flex items-center justify-center">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-xl shadow-amber-500/30"
          >
            <Bot className="w-10 h-10 text-white" />
          </motion.div>
        </div>
      ),
    },
    {
      title: "Marketplace NovaStore",
      description:
        "Acesse o marketplace com categorias de restaurantes, mercados, farmacias e mais. Alcance milhares de novos clientes.",
      icon: <Globe className="w-6 h-6 text-cyan-400" />,
      className: "md:col-span-2",
      header: (
        <div className="relative w-full h-full bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-xl p-4 flex items-center justify-center">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-500/30"
          >
            <Globe className="w-10 h-10 text-white" />
          </motion.div>
        </div>
      ),
    },
    {
      title: "Aplicativo Mobile",
      description:
        "Gerencie seu negocio de qualquer lugar com nosso app otimizado para celular. Facil, rapido e intuitivo.",
      icon: <Smartphone className="w-6 h-6 text-pink-400" />,
      header: (
        <div className="relative w-full h-full bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-xl p-4 flex items-center justify-center">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-xl shadow-pink-500/30"
          >
            <Smartphone className="w-10 h-10 text-white" />
          </motion.div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="relative py-24 overflow-hidden">
      <RadialGradient color="rgba(99, 102, 241, 0.1)" />
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-medium text-purple-400 tracking-widest uppercase mb-4 block">
            Recursos
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Tudo o que voce{" "}
            <GradientText text="precisa" fromColor="#a855f7" toColor="#6366f1" />
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Ferramentas poderosas para alavancar suas vendas sem complexidade.
            Um CRM completo que trabalha por voce.
          </p>
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, i) => (
            <StaggerItem key={i} className={feature.className}>
              <SpotlightCard
                className="h-full"
                spotlightColor="rgba(147, 51, 234, 0.12)"
              >
                {feature.header && (
                  <div className="flex flex-1 w-full h-40 min-h-[6rem] rounded-xl overflow-hidden mb-4">
                    {feature.header}
                  </div>
                )}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <h3 className="font-bold text-lg text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Crie sua conta gratis",
      description:
        "Cadastre-se em segundos com email ou Google. Sem cartao de credito, sem compromisso. Comece a usar imediatamente e explore todas as funcionalidades.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      step: "02",
      title: "Monte sua loja online",
      description:
        "Adicione seus produtos, personalize com sua marca e publique. Sua loja fica pronta em minutos, totalmente integrada com WhatsApp para receber pedidos.",
      icon: <Package className="w-6 h-6" />,
    },
    {
      step: "03",
      title: "Ative a IA no WhatsApp",
      description:
        "Configure o bot com inteligencia artificial para atender clientes 24/7, recuperar carrinhos abandonados e enviar promocoes automaticamente.",
      icon: <Bot className="w-6 h-6" />,
    },
    {
      step: "04",
      title: "Escale suas vendas",
      description:
        "Acompanhe metricas em tempo real, gerencie o funil de vendas e veja seu negocio crescer com decisoes baseadas em dados e inteligencia.",
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-medium text-purple-400 tracking-widest uppercase mb-4 block">
            Como Funciona
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Simples de{" "}
            <GradientText text="comecar" fromColor="#a855f7" toColor="#6366f1" />
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Em apenas 4 passos, transforme seu negocio com o poder da
            inteligencia artificial e automacao.
          </p>
        </ScrollReveal>

        <TracingBeam>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 text-white">
                    {step.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-purple-400 tracking-widest">
                      PASSO {step.step}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ana Silva",
      role: "Dono da Silva Modas",
      avatar: "AS",
      content:
        "O NovaCRM transformou completamente meu negocio. Antes eu anotava tudo no caderno, agora tenho controle total das vendas e a IA atende meus clientes mesmo de madrugada. Minhas vendas cresceram 40% em 3 meses!",
    },
    {
      name: "Carlos Oliveira",
      role: "Fundador do Pet Shop Amigo",
      avatar: "CO",
      content:
        "A automacao do WhatsApp e incrivel! Os clientes recebem respostas instantaneas e a recuperacao de carrinhos abandonados me rendeu mais de R$ 5.000 no primeiro mes. Recomendo demais!",
    },
    {
      name: "Mariana Santos",
      role: "Gestora da Farmacia Vida",
      avatar: "MS",
      content:
        "O funil de vendas e a gestao de clientes sao perfeitos. Consigo ver exatamente onde cada cliente esta no processo de compra e agir no momento certo. A plataforma e intuitiva e muito bonita.",
    },
    {
      name: "Roberto Lima",
      role: "Proprietario do Mercado Fresh",
      avatar: "RL",
      content:
        "Ter a loja online integrada com o WhatsApp mudou o jogo. Meus clientes fazem pedidos pelo site e eu recebo tudo organizado. O suporte tambem e excelente, sempre me ajudam rapidinho.",
    },
  ];

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <RadialGradient color="rgba(147, 51, 234, 0.08)" />
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-medium text-purple-400 tracking-widest uppercase mb-4 block">
            Depoimentos
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Quem usa,{" "}
            <GradientText text="aprova" fromColor="#a855f7" toColor="#6366f1" />
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Mais de 2.000 lojistas ja estao transformando seus negocios com o
            NovaCRM. Veja o que dizem.
          </p>
        </ScrollReveal>

        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
}

// ─── Pricing Section ─────────────────────────────────────
function PricingSection() {
  const plans = [
    {
      name: "Inicio",
      price: "Gratis",
      period: "",
      description: "Perfeito para comecar e testar a plataforma",
      features: [
        "Loja virtual com ate 20 produtos",
        "WhatsApp basico",
        "Gestao de pedidos",
        "Dashboard simplificado",
        "Suporte por email",
      ],
      cta: "Comecar Gratis",
      popular: false,
      gradient: "from-neutral-600 to-neutral-700",
    },
    {
      name: "Pro",
      price: "R$ 79",
      period: "/mes",
      description: "Para negocios em crescimento que precisam de mais poder",
      features: [
        "Produtos ilimitados",
        "IA no WhatsApp 24/7",
        "Funil de vendas completo",
        "Recuperacao de carrinhos",
        "Analytics avancado",
        "Suporte prioritario",
        "Marketplace NovaStore",
      ],
      cta: "Comecar Agora",
      popular: true,
      gradient: "from-purple-600 to-indigo-600",
    },
    {
      name: "Empresarial",
      price: "R$ 199",
      period: "/mes",
      description: "Para grandes operacoes com necessidades avancadas",
      features: [
        "Tudo do Pro",
        "Multi-lojas",
        "API personalizada",
        "Integracoes avancadas",
        "Gerente dedicado",
        "SLA de 99.9%",
        "Treinamento incluso",
      ],
      cta: "Falar com Vendas",
      popular: false,
      gradient: "from-indigo-600 to-violet-600",
    },
  ];

  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-medium text-purple-400 tracking-widest uppercase mb-4 block">
            Precos
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Planos que{" "}
            <GradientText text="crescem com voce" fromColor="#a855f7" toColor="#6366f1" />
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Comece gratis e escale conforme seu negocio cresce. Sem surpresas,
            sem taxas escondidas.
          </p>
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ y: -8 }}
                className={`relative rounded-3xl border p-8 h-full flex flex-col ${
                  plan.popular
                    ? "border-purple-500/50 bg-purple-500/5 shadow-[0_0_40px_rgba(147,51,234,0.15)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                    MAIS POPULAR
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-neutral-400">{plan.description}</p>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-neutral-400 ml-1">{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-neutral-300">
                      <Check className="w-4 h-4 text-purple-400 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://crm-dy6.pages.dev/register"
                  className={`block text-center py-3 rounded-full font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/30"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-purple-500/30"
                  }`}
                >
                  {plan.cta}
                </a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────
function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <BackgroundBeams />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <ScrollReveal>
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-3xl p-12 md:p-16">
            <SparklesCore
              particleCount={30}
              particleColor="rgba(147, 51, 234, 0.5)"
              minSize={0.3}
              maxSize={1.2}
              className="absolute inset-0 rounded-3xl"
            />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Pronto para{" "}
                <GlowText text="transformar" className="text-4xl md:text-5xl font-extrabold text-purple-400" />
                <br />seu negocio?
              </h2>
              <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-10">
                Junte-se a mais de 2.000 lojistas que ja estao vendendo mais
                com o NovaCRM. Comece gratis, sem cartao de credito.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="https://crm-dy6.pages.dev/register">
                  <ShimmerButton className="text-lg px-10 py-5">
                    Criar Conta Gratis{" "}
                    <ArrowRight className="inline w-5 h-5 ml-2" />
                  </ShimmerButton>
                </a>
                <a
                  href="https://crm-dy6.pages.dev/marketplace"
                  className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                >
                  <Headphones className="w-5 h-5" />
                  Falar com um especialista
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Nova<span className="text-purple-400">CRM</span>
              </span>
            </div>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              O CRM que vende por voce. Crie sua loja online, gerencie pedidos e
              use IA para atender seus clientes no WhatsApp. Tudo em um so lugar.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Produto</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="#features" className="hover:text-white transition-colors">Recursos</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Precos</a></li>
              <li><a href="https://crm-dy6.pages.dev/marketplace" className="hover:text-white transition-colors">Marketplace</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Como Funciona</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><a href="https://crm-dy6.pages.dev/register" className="hover:text-white transition-colors">Criar Conta</a></li>
              <li><a href="https://crm-dy6.pages.dev/login" className="hover:text-white transition-colors">Entrar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Suporte</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">
            &copy; 2026 NovaCRM. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SocialProofSection />
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
