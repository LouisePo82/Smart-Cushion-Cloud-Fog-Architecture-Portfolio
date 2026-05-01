"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Smartphone, Cloud, Bell, Battery, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Vortex } from "./ui/Vortex";

const products = [
  { id: "black", name: "Mysterious Black", color: "#050505", image: "/cushion-black.png" },
  { id: "blue", name: "Electric Blue", color: "#3b82f6", image: "/cushion-blue.png" },
  { id: "slate", name: "Slate Gray", color: "#64748b", image: "/cushion-slate.png" },
];

const features = [
  {
    title: "9-Posture Recognition",
    description: "Our advanced AI analyzes data from a high-precision 3x3 sensor matrix to accurately identify 9 distinct sitting postures.",
    icon: Brain,
    color: "text-blue-500",
    glow: "rgba(59, 130, 246, 0.5)"
  },
  {
    title: "Embedded Fog Computing",
    description: "Localized data processing ensures zero latency and maximum privacy for your sensitive health data.",
    icon: Cpu,
    color: "text-cyan-500",
    glow: "rgba(6, 182, 212, 0.5)"
  },
  {
    title: "Real-time App Feedback",
    description: "Receive instant posture corrections and long-term health trends directly through our dedicated mobile application.",
    icon: Smartphone,
    color: "text-indigo-500",
    glow: "rgba(99, 102, 241, 0.5)"
  },
  {
    title: "Cloud Integration",
    description: "Securely backup your health history and sync across all your ergonomic devices automatically.",
    icon: Cloud,
    color: "text-purple-500",
    glow: "rgba(168, 85, 247, 0.5)"
  },
  {
    title: "Smart Vibrations",
    description: "Subtle haptic feedback alerts you immediately when your posture needs adjustment without distraction.",
    icon: Bell,
    color: "text-orange-500",
    glow: "rgba(249, 115, 22, 0.5)"
  },
  {
    title: "30-Day Battery",
    description: "Ultra-low power design keeps your cushion running for a month on a single USB-C charge.",
    icon: Battery,
    color: "text-emerald-500",
    glow: "rgba(160, 185, 129, 0.5)"
  },
];

export const CircularFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [activeSlide, setActiveSlide] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const totalFeatures = features.length;
  const sections = Array.from({ length: 12 });
  const itemsCount = sections.length; 

  const angleStep = 40; 
  const totalRotation = angleStep * (totalFeatures - 1);

  const rotation = useTransform(
    smoothProgress, 
    [3 / itemsCount, 9 / itemsCount], 
    [0, -totalRotation]
  );

  const vortexOpacity = useTransform(
    smoothProgress,
    [0, 0.08, 0.14, 0.22, 0.82, 0.95],
    [1, 1, 0, 0.25, 0.25, 1]
  );

  // Programmatic Navigation Logic
  const navigateTo = (index: number) => {
    const targetIndex = Math.max(0, Math.min(itemsCount - 1, index));
    setActiveSlide(targetIndex);
    const container = containerRef.current;
    if (container) {
      // Calculate scroll position based on index
      const scrollTarget = targetIndex * window.innerHeight;
      container.scrollTo({ top: scrollTarget, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-black overflow-y-hidden lg:overflow-y-auto">
      {/* Snap Points Container - Hidden on Mobile to prevent manual scroll issues */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-y-auto hidden lg:block scroll-snap-y-mandatory">
        {sections.map((_, i) => (
          <div key={i} className="h-[100dvh] w-full snap-start" />
        ))}
      </div>

      <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden">
        
        {/* Background Vortex */}
        <motion.div 
          style={{ opacity: vortexOpacity }}
          className="absolute inset-0 z-0 pointer-events-none hidden md:block"
        >
           <Vortex 
              backgroundColor="black"
              className="w-full h-full"
              containerClassName="w-full h-full"
              particleCount={300}
              rangeY={800}
           />
        </motion.div>

        {/* Left Side: Circular UI */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [0.25, 0.32, 0.88, 0.95], [0, 1, 1, 0]),
            x: useTransform(smoothProgress, [0.25, 0.32, 0.88, 0.95], [-100, 0, 0, -100]),
            pointerEvents: "none"
          }}
          className="hidden lg:flex absolute left-[-19vw] w-[38vw] h-[38vw] items-center justify-center z-10"
        >
          <div className="absolute inset-[-2px] rounded-full border border-primary/30 blur-[2px] opacity-50" />
          <motion.div
            style={{ rotate: rotation }}
            className="relative w-full h-full rounded-full border-2 border-primary/20 bg-primary/5 flex items-center justify-center shadow-[inset_0_0_50px_rgba(var(--primary),0.1)]"
          >
            {features.map((feature, index) => {
              const angle = index * angleStep;
              const activePoint = (index + 4) / itemsCount; 
              const glowRange = 0.04;

              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    transform: `rotate(${angle}deg) translate(19vw) rotate(-${angle}deg)`,
                  }}
                >
                  <motion.div 
                    style={{
                      scale: useTransform(smoothProgress, 
                        [activePoint - glowRange, activePoint, activePoint + glowRange], 
                        [0.8, 1.3, 0.8]
                      ),
                      borderColor: useTransform(smoothProgress,
                        [activePoint - glowRange, activePoint, activePoint + glowRange],
                        ["rgba(255,255,255,0.1)", "var(--primary)", "rgba(255,255,255,0.1)"]
                      ),
                      boxShadow: useTransform(smoothProgress,
                        [activePoint - glowRange, activePoint, activePoint + glowRange],
                        ["0px 0px 0px rgba(0,0,0,0)", `0px 0px 30px ${feature.glow}`, "0px 0px 0px rgba(0,0,0,0)"]
                      )
                    }}
                    className={`p-5 rounded-full bg-neutral-900 border-2 transition-colors ${feature.color}`}
                  >
                    <feature.icon size={28} />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
          <div className="absolute right-[-20px] w-20 h-[3px] bg-gradient-to-l from-primary to-transparent z-20 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
        </motion.div>

        <div className="relative w-full h-full">
          
          {/* 0. Intro Slide */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0, 0.08, 0.14], [1, 1, 0]),
              pointerEvents: useTransform(smoothProgress, [0, 0.08, 0.14], ["auto", "auto", "none"])
            }}
            className="absolute inset-0 z-50 flex items-center justify-center text-center px-6"
          >
            <div className="relative z-10 max-w-4xl">
               <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-2xl md:text-5xl font-bold text-white leading-relaxed"
               >
                 Our technology is <span className="text-primary font-extrabold italic">more than just hardware.</span> <br className="hidden md:block"/>
                 It's a comprehensive ecosystem designed to improve your health.
               </motion.p>
            </div>
          </motion.div>

          {/* 1-3. Design DNA Slide */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [1 / itemsCount - 0.05, 1.5 / itemsCount, 3.5 / itemsCount, 4 / itemsCount], [0, 1, 1, 0]),
              pointerEvents: useTransform(smoothProgress, [1 / itemsCount - 0.05, 1.5 / itemsCount, 3.5 / itemsCount, 4 / itemsCount], ["none", "auto", "auto", "none"])
            }}
            className="absolute inset-0 z-20 flex items-center justify-center px-6 lg:px-32"
          >
            <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
              <div className="flex flex-col items-center gap-6 lg:gap-10">
                <div className="w-[45vh] h-[45vh] lg:w-[60vh] lg:h-[60vh] rounded-[2.5rem] lg:rounded-[4rem] bg-neutral-900/30 border-2 border-white/10 p-6 lg:p-10 flex items-center justify-center backdrop-blur-sm shadow-[0_0_50px_rgba(255,255,255,0.05)] relative group">
                  <div className="absolute inset-0 rounded-[2.5rem] lg:rounded-[4rem] border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedProduct.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="w-full h-full flex items-center justify-center relative overflow-hidden"
                    >
                      <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-full h-full object-contain drop-shadow-2xl"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                <div className="flex gap-4 lg:gap-6 p-4 lg:p-5 rounded-2xl lg:rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className={`w-8 h-8 lg:w-12 lg:h-12 rounded-full border-2 transition-all cursor-pointer ${
                        selectedProduct.id === p.id ? "border-primary scale-110 shadow-[0_0_15px_rgba(var(--primary),0.6)]" : "border-white/20"
                      }`}
                      style={{ backgroundColor: p.color }}
                    />
                  ))}
                </div>
              </div>

              <div className="lg:absolute lg:right-0 text-center lg:text-right max-w-lg">
                <span className="inline-flex items-center gap-2 text-primary text-[10px] lg:text-sm font-mono uppercase tracking-[0.3em] mb-4">
                  <Sparkles size={14} /> The Masterpiece
                </span>
                <h2 className="text-4xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                  Design <br/><span className="text-primary italic font-black">DNA</span>
                </h2>
                <p className="text-sm lg:text-2xl text-neutral-400 leading-relaxed font-medium">
                  A perfect blend of aesthetic elegance and technological power.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 4-9. Features Slides */}
          {features.map((feature, index) => {
            const activePoint = (index + 4) / itemsCount; 
            const opacity = useTransform(smoothProgress, [activePoint - 0.1, activePoint, activePoint + 0.1], [0, 1, 0]);
            const y = useTransform(smoothProgress, [activePoint - 0.1, activePoint, activePoint + 0.1], [20, 0, -20]);

            return (
              <motion.div
                key={index}
                style={{ 
                  opacity, 
                  y,
                  pointerEvents: useTransform(smoothProgress, [activePoint - 0.1, activePoint, activePoint + 0.1], ["none", "auto", "none"])
                }}
                className="absolute inset-0 flex flex-col justify-center px-6 lg:pl-[30vw] lg:pr-32 text-center lg:text-left pointer-events-none md:pointer-events-auto"
              >
                <div className="flex flex-col items-center lg:items-start">
                   <div className={`p-5 rounded-2xl bg-white/5 border border-white/10 mb-8 lg:hidden ${feature.color}`}>
                      <feature.icon size={40} />
                   </div>
                   <span className={`text-xs lg:text-sm font-mono mb-6 ${feature.color} uppercase tracking-widest`}>TECH / 0{index + 1}</span>
                   <h3 className="text-4xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tighter">
                     {feature.title}
                   </h3>
                   <p className="text-lg lg:text-3xl text-neutral-400 max-w-2xl leading-relaxed">
                     {feature.description}
                   </p>
                </div>
              </motion.div>
            );
          })}

          {/* 10-12. Final CTA Slide */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.88, 0.94, 1], [0, 1, 1]),
              scale: useTransform(smoothProgress, [0.88, 0.94], [0.9, 1]),
              pointerEvents: useTransform(smoothProgress, [0.88, 0.94, 1], ["none", "auto", "auto"])
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 overflow-hidden"
          >
            <div className="absolute inset-0 -z-10">
               <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" 
                    style={{ transform: 'perspective(1000px) rotateX(60deg) translateY(100px) scale(2)' }}
               />
               <motion.div 
                 animate={{
                   scale: [1, 1.2, 1],
                   opacity: [0.1, 0.3, 0.1],
                   x: [-50, 50, -50],
                 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[150px] rounded-full"
               />
            </div>

            <h2 className="text-5xl lg:text-9xl font-bold text-white mb-10 lg:mb-16 tracking-tighter relative z-10">
              Explore your <br/> 
              <span className="text-primary italic font-black">Live Dashboard.</span>
            </h2>
            <a href="/dashboard" className="px-10 py-5 lg:px-16 lg:py-8 bg-primary text-white rounded-full font-bold text-xl lg:text-3xl hover:scale-105 transition-transform flex items-center gap-4 shadow-2xl shadow-primary/40">
              Analyze My Data <ArrowRight size={28} />
            </a>
          </motion.div>
        </div>

        {/* Mobile Navigation Arrows - Updated Logic */}
        <div className="flex lg:hidden absolute bottom-8 left-0 w-full justify-between px-6 z-[100] pointer-events-none">
          <button 
            onClick={() => navigateTo(activeSlide - 1)}
            className={`p-4 rounded-full bg-black/80 border border-white/20 text-white pointer-events-auto active:scale-90 transition-all backdrop-blur-lg ${activeSlide === 0 ? "opacity-30" : "opacity-100"}`}
            disabled={activeSlide === 0}
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={() => navigateTo(activeSlide + 1)}
            className={`p-4 rounded-full bg-primary text-white pointer-events-auto active:scale-90 transition-all shadow-2xl shadow-primary/40 ${activeSlide === itemsCount - 1 ? "opacity-30" : "opacity-100"}`}
            disabled={activeSlide === itemsCount - 1}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};
