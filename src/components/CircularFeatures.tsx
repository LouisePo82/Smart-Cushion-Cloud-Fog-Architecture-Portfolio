"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Smartphone, Cloud, Bell, Battery, Sparkles, Palette } from "lucide-react";
import { Vortex } from "./ui/Vortex";

const products = [
  { id: "black", name: "Mysterious Black", color: "#050505" },
  { id: "blue", name: "Electric Blue", color: "#3b82f6" },
  { id: "slate", name: "Slate Gray", color: "#64748b" },
];

const features = [
  {
    title: "AI Posture Detection",
    description: "Our proprietary machine learning model analyzes 16 sensor points to provide pinpoint accuracy in real-time.",
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
    title: "Seamless App Sync",
    description: "Get real-time feedback and long-term health trends right on your mobile device via Bluetooth 5.0.",
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
  const itemsCount = totalFeatures + 2; 

  const angleStep = 40; 
  const totalRotation = angleStep * (totalFeatures - 1);

  const rotation = useTransform(
    smoothProgress, 
    [2.2 / itemsCount, (totalFeatures + 1.2) / itemsCount], 
    [0, -totalRotation]
  );

  return (
    <div ref={containerRef} className="relative h-[1000vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* Left Side: Rotating Circle */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [1.8/itemsCount, 2.2/itemsCount, 0.95, 1], [0, 1, 1, 0]),
            x: useTransform(smoothProgress, [1.8/itemsCount, 2.2/itemsCount, 0.95, 1], [-100, 0, 0, -100])
          }}
          className="absolute left-[-20vw] w-[50vw] h-[50vw] flex items-center justify-center"
        >
          <motion.div
            style={{ rotate: rotation }}
            className="relative w-full h-full rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center"
          >
            {features.map((feature, index) => {
              const angle = index * angleStep;
              const activePoint = (index + 2.5) / itemsCount; // Pushed further for better sync
              const glowRange = 0.03;

              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    transform: `rotate(${angle}deg) translate(25vw) rotate(-${angle}deg)`,
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
                    <feature.icon size={32} />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
          <div className="absolute right-[-20px] w-20 h-[2px] bg-gradient-to-l from-primary to-transparent z-20" />
        </motion.div>

        {/* Content Area - MORE SPACE ON THE LEFT */}
        <div className="relative w-full h-full">
          
          {/* 0. Vortex Intro Slide */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0, 0.08, 0.12], [1, 1, 0]),
              scale: useTransform(smoothProgress, [0, 0.08, 0.12], [1, 1, 1.1]),
            }}
            className="absolute inset-0 z-50 flex items-center justify-center text-center"
          >
            <div className="absolute inset-0 z-0">
               <Vortex 
                  backgroundColor="black"
                  className="w-full h-full"
                  containerClassName="w-full h-full"
                  particleCount={300}
                  rangeY={800}
                  client:load
               />
            </div>
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
               <motion.p
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-2xl md:text-5xl font-bold text-white leading-relaxed"
               >
                 Our technology is <span className="text-primary font-extrabold italic">more than just hardware.</span> <br/>
                 It's a comprehensive ecosystem designed to improve your health, one sit at a time.
               </motion.p>
            </div>
          </motion.div>

          {/* 1. Product Showcase Slide - TIGHTER RANGE */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.14, 0.18, 0.22], [0, 1, 0]),
              x: useTransform(smoothProgress, [0.14, 0.18, 0.22], [100, 0, -100]),
            }}
            className="absolute inset-0 flex items-center justify-center pl-[48vw] pr-10 lg:pr-32"
          >
            <div className="flex flex-col lg:flex-row items-center gap-16 w-full">
              <div className="flex-1 w-full">
                <span className="inline-flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-[0.3em] mb-6">
                  <SparklesIcon size={14} /> The Masterpiece
                </span>
                <h2 className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Design <span className="text-primary">DNA</span>
                </h2>
                <p className="text-lg text-neutral-400 mb-8 max-w-md leading-relaxed">
                  A perfect blend of aesthetic elegance and technological power. Every curve serves a purpose.
                </p>
                <div className="flex gap-4">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedProduct.id === p.id ? "border-primary scale-110" : "border-neutral-800"
                      }`}
                      style={{ backgroundColor: p.color }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1 w-full max-w-md aspect-square rounded-[3rem] bg-neutral-900/30 border border-neutral-800 p-8 flex items-center justify-center">
                 <AnimatePresence mode="wait">
                   <motion.div
                      key={selectedProduct.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="w-full h-full rounded-2xl flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: selectedProduct.color + "44" }}
                   >
                     <SparklesIcon className="text-white/20 w-32 h-32" />
                   </motion.div>
                 </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* 2-n. Features Slides - SHIFTED FURTHER RIGHT + TIGHTER RANGES */}
          <div className="absolute inset-0 pl-[52vw] pr-10 lg:pr-32">
            {features.map((feature, index) => {
              const activePoint = (index + 3) / itemsCount; // Offset more from showcase
              const range = 0.05; // Tight range to avoid overlap

              const opacity = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [0, 1, 0]);
              const y = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [60, 0, -60]);

              return (
                <motion.div
                  key={index}
                  style={{ opacity, y }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <span className={`text-sm font-mono mb-4 ${feature.color}`}>TECH / 0{index + 1}</span>
                  <h3 className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xl text-neutral-400 max-w-xl leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
