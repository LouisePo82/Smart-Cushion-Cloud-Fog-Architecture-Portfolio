"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Smartphone, Cloud, Bell, Battery, Sparkles, ArrowRight } from "lucide-react";
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
  const sections = Array.from({ length: 9 });
  const itemsCount = sections.length; 

  const angleStep = 40; 
  const totalRotation = angleStep * (totalFeatures - 1);

  const rotation = useTransform(
    smoothProgress, 
    [2 / itemsCount, 7 / itemsCount], 
    [0, -totalRotation]
  );

  const vortexOpacity = useTransform(
    smoothProgress,
    [0, 0.08, 0.14, 0.22, 0.82, 0.9],
    [1, 1, 0, 0.25, 0.25, 1]
  );

  return (
    <div ref={containerRef} className="relative h-[450vh] bg-black">
      {/* Snap Points Container */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-y-auto scroll-snap-y-proximity lg:scroll-snap-y-mandatory">
        {sections.map((_, i) => (
          <div key={i} className="h-[100dvh] w-full snap-start" />
        ))}
      </div>

      <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden">
        
        {/* Background Vortex - Hidden on small mobile to save perf/visibility */}
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

        {/* Left Side: Circular UI - HIDDEN ON MOBILE */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [0.1, 0.15, 0.85, 0.9], [0, 1, 1, 0]),
            x: useTransform(smoothProgress, [0.1, 0.15, 0.85, 0.9], [-100, 0, 0, -100]),
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
              const activePoint = (index + 2) / itemsCount;
              const glowRange = 0.03;

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
              opacity: useTransform(smoothProgress, [0, 0.05, 0.1], [1, 1, 0]),
              pointerEvents: useTransform(smoothProgress, [0, 0.1], ["auto", "none"])
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

          {/* 1. Product Showcase Slide */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [1 / itemsCount - 0.05, 1 / itemsCount, 1 / itemsCount + 0.05], [0, 1, 0]),
              pointerEvents: useTransform(smoothProgress, [1 / itemsCount - 0.05, 1 / itemsCount + 0.05], ["none", "auto", "none"])
            }}
            className="absolute inset-0 z-20 flex items-center justify-center px-6 lg:px-32"
          >
            <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center gap-10">
              {/* CENTERED IMAGE AND COLOR PICKER */}
              <div className="flex flex-col items-center gap-6 lg:gap-10">
                <div className="w-[35vh] h-[35vh] lg:w-[45vh] lg:h-[45vh] rounded-[2rem] lg:rounded-[3rem] bg-neutral-900/30 border border-neutral-800/50 p-4 lg:p-6 flex items-center justify-center backdrop-blur-sm shadow-2xl">
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
                        className="w-full h-full object-contain"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                
                {/* COLOR PICKER */}
                <div className="flex gap-4 lg:gap-6 p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 transition-all cursor-pointer ${
                        selectedProduct.id === p.id ? "border-primary scale-110 shadow-[0_0_10px_rgba(var(--primary),0.5)]" : "border-white/20"
                      }`}
                      style={{ backgroundColor: p.color }}
                    />
                  ))}
                </div>
              </div>

              {/* TEXT AREA */}
              <div className="lg:absolute lg:right-0 text-center lg:text-right max-w-md">
                <span className="inline-flex items-center gap-2 text-primary text-[10px] lg:text-xs font-mono uppercase tracking-[0.3em] mb-4">
                  <Sparkles size={12} /> The Masterpiece
                </span>
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  Design <span className="text-primary italic">DNA</span>
                </h2>
                <p className="text-sm lg:text-xl text-neutral-400 leading-relaxed">
                  A perfect blend of aesthetic elegance and technological power.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 2-7. Features Slides */}
          {features.map((feature, index) => {
            const activePoint = (index + 2) / itemsCount;
            const range = 0.05; 

            const opacity = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [0, 1, 0]);
            const y = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [20, 0, -20]);

            return (
              <motion.div
                key={index}
                style={{ opacity, y }}
                className="absolute inset-0 flex flex-col justify-center px-6 lg:pl-[30vw] lg:pr-32 text-center lg:text-left pointer-events-none"
              >
                <div className="flex flex-col items-center lg:items-start">
                   <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 lg:hidden ${feature.color}`}>
                      <feature.icon size={32} />
                   </div>
                   <span className={`text-xs font-mono mb-4 ${feature.color}`}>TECH / 0{index + 1}</span>
                   <h3 className="text-3xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                     {feature.title}
                   </h3>
                   <p className="text-base lg:text-xl text-neutral-400 max-w-xl leading-relaxed">
                     {feature.description}
                   </p>
                </div>
              </motion.div>
            );
          })}

          {/* 8. Final CTA Slide */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.82, 0.88], [0, 1]),
              scale: useTransform(smoothProgress, [0.82, 0.88], [0.9, 1]),
              pointerEvents: useTransform(smoothProgress, [0.82, 1], ["none", "auto"])
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <h2 className="text-4xl lg:text-8xl font-bold text-white mb-8 lg:mb-12 tracking-tighter">
              Explore your <br/> 
              <span className="text-primary italic">Live Dashboard.</span>
            </h2>
            <a href="/dashboard" className="px-8 py-4 lg:px-12 lg:py-6 bg-primary text-white rounded-full font-bold text-lg lg:text-2xl hover:scale-105 transition-transform flex items-center gap-3">
              Analyze My Data <ArrowRight size={20} />
            </a>
          </motion.div>

        </div>
      </div>
      
      <style jsx>{`
        .scroll-snap-y-proximity {
          scroll-snap-type: y proximity;
        }
        @media (min-width: 1024px) {
          .lg\:scroll-snap-y-mandatory {
            scroll-snap-type: y mandatory;
          }
        }
      `}</style>
    </div>
  );
};
