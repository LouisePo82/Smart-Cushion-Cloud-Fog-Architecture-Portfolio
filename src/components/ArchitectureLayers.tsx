"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Cpu, Cloud, Smartphone, Activity, BrainCircuit, Database } from "lucide-react";

const dataNodes = [
  { id: "edge", title: "Smart Cushion", desc: "FSR Sensor Matrix", icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { id: "esp", title: "Edge MCU", desc: "ESP32 Pre-processing", icon: Cpu, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { id: "fog", title: "Fog Node", desc: "CNN Inference Model", icon: BrainCircuit, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", glow: true },
  { id: "cloud", title: "AWS Cloud", desc: "IoT Core & Lambda", icon: Cloud, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { id: "dashboard", title: "Live Dashboard", desc: "Analytics & Gamification", icon: Smartphone, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
];

export const ArchitectureLayers = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const totalSlides = 4;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    let newIndex = activeIndex + newDirection;
    if (newIndex < 0) newIndex = totalSlides - 1;
    if (newIndex >= totalSlides) newIndex = 0;
    setActiveIndex(newIndex);
  };

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 500 : -500, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 500 : -500, opacity: 0 })
  };

  return (
    <section className="py-24 bg-black relative min-h-screen border-t border-white/5 flex flex-col justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            System <span className="text-primary italic">Architecture</span> Models
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
            A comparative view of standard architectural models applied to the Smart Cushion ecosystem.
          </p>
        </div>

        <div className="relative w-full max-w-6xl mx-auto h-[600px] flex items-center justify-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            
            {/* 3 LAYER - Cloud Computing */}
            {activeIndex === 0 && (
              <motion.div 
                key="3layer" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 flex flex-col bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md max-w-3xl mx-auto"
              >
                <div className="text-center mb-10">
                  <div className="text-8xl md:text-9xl font-black text-white mb-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">3</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Cloud Computing service models</h2>
                  <p className="text-neutral-500 font-medium">(3 Layer)</p>
                </div>
                <div className="flex flex-col gap-6 flex-1 justify-end">
                  <div className="flex items-stretch rounded-2xl overflow-hidden border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <div className="w-1/3 bg-emerald-500/20 p-4 flex items-center justify-center text-center"><span className="text-emerald-400 font-bold">IoT end user</span></div>
                    <div className="w-2/3 bg-emerald-500/10 p-5 flex items-center justify-between">
                      <div className="text-sm text-neutral-300"><strong className="text-white text-base block mb-1">Application</strong>(e.g., Smart home, smart factory, smart metering)</div>
                      <div className="text-emerald-400 font-black text-xl ml-4">SaaS</div>
                    </div>
                  </div>
                  <div className="flex items-stretch rounded-2xl overflow-hidden border border-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                    <div className="w-1/3 bg-orange-500/20 p-4 flex items-center justify-center text-center"><span className="text-orange-400 font-bold">IoT app developer</span></div>
                    <div className="w-2/3 bg-orange-500/10 p-5 flex items-center justify-between">
                      <div className="text-sm text-neutral-300"><strong className="text-white text-base block mb-1">Platform</strong>(e.g., Software frameworks for sensor data processing)</div>
                      <div className="text-orange-400 font-black text-xl ml-4">PaaS</div>
                    </div>
                  </div>
                  <div className="flex items-stretch rounded-2xl overflow-hidden border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                    <div className="w-1/3 bg-purple-500/20 p-4 flex items-center justify-center text-center"><span className="text-purple-400 font-bold">IoT app developer</span></div>
                    <div className="w-2/3 bg-purple-500/10 p-5 flex items-center justify-between">
                      <div className="text-sm text-neutral-300"><strong className="text-white text-base block mb-1">Infrastructure</strong>(e.g., Network, storage, computation)</div>
                      <div className="text-purple-400 font-black text-xl ml-4">IaaS</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 5 LAYER - IoT Architecture */}
            {activeIndex === 1 && (
              <motion.div 
                key="5layer" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 flex flex-col bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md max-w-3xl mx-auto"
              >
                <div className="text-center mb-8">
                  <div className="text-8xl md:text-9xl font-black text-white mb-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">5</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">IoT Architecture</h2>
                  <p className="text-neutral-500 font-medium">(5 Layer - Typical, not a standard)</p>
                </div>
                <div className="flex flex-col gap-2 flex-1 justify-end max-w-lg mx-auto w-full">
                  <Layer5Box name="Business Layer" icon="📊" />
                  <div className="flex justify-center"><div className="w-0.5 h-6 bg-white/20" /></div>
                  <Layer5Box name="Application Layer" icon="📱" />
                  <div className="flex justify-center"><div className="w-0.5 h-6 bg-white/20" /></div>
                  <Layer5Box name="Middleware Layer" icon="⚙️" dashed />
                  <div className="flex justify-center"><div className="w-0.5 h-6 bg-white/20" /></div>
                  <Layer5Box name="Network Layer" icon="🌐" />
                  <div className="flex justify-center"><div className="w-0.5 h-6 bg-white/20" /></div>
                  <Layer5Box name="Physical Layer" icon="📡" />
                </div>
              </motion.div>
            )}

            {/* 7 LAYER - OSI Model */}
            {activeIndex === 2 && (
              <motion.div 
                key="7layer" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 flex flex-col bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md max-w-3xl mx-auto"
              >
                <div className="text-center mb-8">
                  <div className="text-8xl md:text-9xl font-black text-white mb-2 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">7</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">OSI model</h2>
                  <p className="text-neutral-500 font-medium">(7 layer - Open Systems Interconnection)</p>
                </div>
                <div className="flex gap-4 flex-1 items-end w-full">
                  <div className="w-1/3 flex flex-col gap-3 justify-end">
                    <DataUnitBox text="Data" height="h-[170px]" />
                    <DataUnitBox text="Segments (TCP) / Datagrams (UDP)" height="h-14" color="bg-cyan-500/20 text-cyan-400 border-cyan-500/30" />
                    <DataUnitBox text="Packets" height="h-14" color="bg-green-500/20 text-green-400 border-green-500/30" />
                    <DataUnitBox text="Frames" height="h-14" color="bg-lime-500/20 text-lime-400 border-lime-500/30" />
                    <DataUnitBox text="Bits" height="h-14" color="bg-yellow-500/20 text-yellow-400 border-yellow-500/30" />
                  </div>
                  <div className="w-2/3 flex flex-col gap-3">
                    <OsiLayerBox num={7} name="Application" desc="Network services to Application" color="bg-indigo-500/20 border-indigo-500/30 text-indigo-300" />
                    <OsiLayerBox num={6} name="Presentation" desc="Data Formatting and Encryption" color="bg-indigo-500/20 border-indigo-500/30 text-indigo-300" />
                    <OsiLayerBox num={5} name="Session" desc="Interhost Communication" color="bg-indigo-500/20 border-indigo-500/30 text-indigo-300" />
                    <OsiLayerBox num={4} name="Transport" desc="End-to-End Connections and Reliability" color="bg-cyan-500/20 border-cyan-500/30 text-cyan-300" />
                    <OsiLayerBox num={3} name="Network" desc="Routing and IP (Logical Addressing)" color="bg-green-500/20 border-green-500/30 text-green-300" />
                    <OsiLayerBox num={2} name="Data Link" desc="MAC and LLC (Physical Addressing)" color="bg-lime-500/20 border-lime-500/30 text-lime-300" />
                    <OsiLayerBox num={1} name="Physical" desc="Media, Signal and Binary Transmission" color="bg-yellow-500/20 border-yellow-500/30 text-yellow-300" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* SMART CUSHION ARCHITECTURE - Data Flow */}
            {activeIndex === 3 && (
              <motion.div 
                key="data-flow" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 flex flex-col bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md justify-center"
              >
                <div className="text-center mb-16">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-widest mb-4">
                    PRACTICAL IMPLEMENTATION
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                    From Sensor to Screen
                  </h2>
                </div>

                <div className="relative w-full max-w-6xl mx-auto">
                  {/* Connecting Line (Desktop) */}
                  <div className="hidden lg:block absolute top-[44px] left-[8%] right-[8%] h-[2px] bg-white/10 -translate-y-1/2 rounded-full overflow-hidden">
                     <motion.div className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-primary to-transparent" animate={{ left: ["-10%", "110%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
                     <motion.div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" animate={{ left: ["-10%", "110%"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.2 }} />
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0 relative">
                    {dataNodes.map((node, i) => (
                      <div key={node.id} className="flex flex-col items-center w-full lg:w-48 group relative z-10">
                        <div className={`w-20 h-20 md:w-[88px] md:h-[88px] rounded-2xl flex items-center justify-center border backdrop-blur-md bg-black/50 ${node.bg} ${node.border} ${node.glow ? 'shadow-[0_0_30px_rgba(var(--primary),0.2)] border-primary/40' : ''} relative`}>
                          <node.icon className={`w-10 h-10 md:w-12 md:h-12 ${node.color}`} />
                          {node.glow && <span className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping opacity-50" />}
                        </div>
                        <div className="mt-6 text-center">
                          <h4 className="text-white font-bold text-lg tracking-wide mb-1.5">{node.title}</h4>
                          <p className="text-neutral-500 text-sm font-medium">{node.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
            
          </AnimatePresence>

          {/* Left Navigation Arrow */}
          <button 
            onClick={() => paginate(-1)} 
            className="absolute left-4 md:-left-12 xl:-left-24 top-1/2 -translate-y-1/2 p-4 md:p-5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary),0.3)] transition-all backdrop-blur-md z-50 group hidden sm:flex"
          >
            <ChevronLeft size={36} className="group-hover:-translate-x-1 transition-transform" />
          </button>

          {/* Right Navigation Arrow */}
          <button 
            onClick={() => paginate(1)} 
            className="absolute right-4 md:-right-12 xl:-right-24 top-1/2 -translate-y-1/2 p-4 md:p-5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary),0.3)] transition-all backdrop-blur-md z-50 group hidden sm:flex"
          >
            <ChevronRight size={36} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
            {[0, 1, 2, 3].map((idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  setDirection(idx > activeIndex ? 1 : -1);
                  setActiveIndex(idx);
                }}
                className={`rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 h-2.5 bg-primary shadow-[0_0_15px_rgba(var(--primary),0.8)]' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/50 hover:scale-125'}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

// Helper Components
const Layer5Box = ({ name, icon, dashed = false }: { name: string, icon: string, dashed?: boolean }) => (
  <div className={`flex items-center justify-center gap-4 p-5 rounded-xl border bg-white/5 ${dashed ? 'border-red-500/50 border-dashed' : 'border-blue-500/30'} hover:bg-white/10 transition-colors cursor-default`}>
    <span className="text-3xl">{icon}</span>
    <span className="text-white font-bold text-lg">{name}</span>
  </div>
);

const DataUnitBox = ({ text, height, color = "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" }: { text: string, height: string, color?: string }) => (
  <div className={`${height} ${color} border rounded-xl p-3 flex items-center justify-center text-center text-xs font-bold leading-tight`}>
    {text}
  </div>
);

const OsiLayerBox = ({ num, name, desc, color }: { num: number, name: string, desc: string, color: string }) => (
  <div className={`h-14 ${color} border rounded-xl flex items-stretch overflow-hidden group hover:scale-[1.02] transition-transform`}>
    <div className="flex-1 px-4 flex flex-col justify-center leading-tight">
      <span className="font-bold text-white text-base">{name}</span>
      <span className="text-[11px] opacity-80">{desc}</span>
    </div>
    <div className="w-12 flex items-center justify-center font-black text-xl bg-black/20 border-l border-inherit">
      {num}
    </div>
  </div>
);
