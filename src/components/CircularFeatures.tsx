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
    [0.25, 0.85], 
    [0, -totalRotation]
  );

  return (
    <div ref={containerRef} className="relative h-[450vh] bg-black scroll-snap-container">
      <div className="absolute inset-0 pointer-events-none">
        {sections.map((_, i) => (
          <div key={i} className="h-[calc(450vh/9)] w-full" style={{ scrollSnapAlign: "start" }} />
        ))}
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [0.15, 0.22, 0.9, 0.95], [0, 1, 1, 0]),
            x: useTransform(smoothProgress, [0.15, 0.22, 0.9, 0.95], [-100, 0, 0, -100]),
            pointerEvents: "none"
          }}
          className="absolute left-[-19vw] w-[38vw] h-[38vw] flex items-center justify-center z-10"
        >
          <div className="absolute inset-[-2px] rounded-full border border-primary/30 blur-[2px] opacity-50" />
          <motion.div
            style={{ rotate: rotation }}
            className="relative w-full h-full rounded-full border-2 border-primary/20 bg-primary/5 flex items-center justify-center shadow-[inset_0_0_50px_rgba(var(--primary),0.1)]"
          >
            {features.map((feature, index) => {
              const angle = index * angleStep;
              const activePoint = 0.25 + (index * (0.6 / (totalFeatures - 1)));
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
          
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0, 0.04, 0.08], [1, 1, 0]),
              pointerEvents: useTransform(smoothProgress, [0, 0.08], ["auto", "none"])
            }}
            className="absolute inset-0 z-50 flex items-center justify-center text-center px-4"
          >
            <div className="absolute inset-0 z-0">
               <Vortex 
                  backgroundColor="black"
                  className="w-full h-full"
                  containerClassName="w-full h-full"
                  particleCount={300}
                  rangeY={800}
               />
            </div>
            <div className="relative z-10 max-w-4xl">
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

          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.14, 0.18, 0.22], [0, 1, 0]),
              pointerEvents: useTransform(smoothProgress, [0.14, 0.18, 0.22], ["none", "auto", "none"])
            }}
            className="absolute inset-0 flex items-center justify-center pl-[30vw] pr-10 lg:pr-32 z-20"
          >
            <div className="flex flex-col lg:flex-row items-center gap-16 w-full">
              <div className="flex-1 w-full">
                <span className="inline-flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-[0.3em] mb-6">
                  <Sparkles size={14} /> The Masterpiece
                </span>
                <h2 className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  Design <span className="text-primary">DNA</span>
                </h2>
                <p className="text-lg text-neutral-400 mb-8 max-w-md leading-relaxed">
                  A perfect blend of aesthetic elegance and technological power. Every curve serves a purpose.
                </p>
                <div className="flex gap-4 relative z-50">
                  {products.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className={`w-10 h-10 rounded-full border-2 transition-all cursor-pointer hover:scale-125 border-white/20 ${
                        selectedProduct.id === p.id ? "border-primary scale-110" : "border-neutral-800"
                      }`}
                      style={{ backgroundColor: p.color }}
                      title={p.name}
                    />
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full max-w-md aspect-square rounded-[3rem] bg-neutral-900/30 border border-neutral-800 p-4 flex items-center justify-center">
                 <AnimatePresence mode="wait">
                   <motion.div
                      key={selectedProduct.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="w-full h-full rounded-2xl flex items-center justify-center relative overflow-hidden"
                   >
                     <img 
                       src={selectedProduct.image} 
                       alt={selectedProduct.name} 
                       className="w-full h-full object-contain"
                     />
                   </motion.div>
                 </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {features.map((feature, index) => {
            const activePoint = 0.25 + (index * (0.6 / (totalFeatures - 1)));
            const range = 0.05; 

            const opacity = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [0, 1, 0]);
            const y = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [40, 0, -40]);

            return (
              <motion.div
                key={index}
                style={{ 
                  opacity, 
                  y,
                  pointerEvents: "none" 
                }}
                className="absolute inset-0 flex flex-col justify-center pl-[30vw] pr-10 lg:pr-32"
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

          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.9, 0.95], [0, 1]),
              scale: useTransform(smoothProgress, [0.9, 0.95], [0.9, 1]),
              y: useTransform(smoothProgress, [0.9, 0.95], [50, 0]),
              pointerEvents: useTransform(smoothProgress, [0.9, 0.95], ["none", "auto"])
            }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
          >
            <h2 className="text-5xl lg:text-8xl font-bold text-white mb-12 tracking-tighter">
              See what our <br/> 
              <span className="text-primary italic">dashboard have.</span>
            </h2>
            <div className="flex gap-6">
              <a href="/dashboard" className="px-12 py-6 bg-primary text-white rounded-full font-bold text-2xl hover:scale-105 transition-transform flex items-center gap-3">
                Try Live Demo <ArrowRight size={24} />
              </a>
            </div>
          </motion.div>

        </div>
      </div>
      
      <style jsx>{`
        .scroll-snap-container {
          scroll-snap-type: y mandatory;
        }
      `}</style>
    </div>
  );
};
