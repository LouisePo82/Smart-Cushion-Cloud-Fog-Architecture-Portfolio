"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Cpu, Cloud, Smartphone, Activity, BrainCircuit } from "lucide-react";

const dataNodes = [
  { id: "edge", title: "Smart Cushion", desc: "FSR Sensor Matrix", details: "9 high-precision FSR pressure sensors + MPU6050 gyroscope with 50Hz polling rate.", image: "/cushion-slate.png", icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { id: "esp", title: "Edge MCU", desc: "ESP32 Pre-processing", details: "ADC noise filtering, local calibration, WiFi connection, and MQTT JSON packaging.", image: "/esp32-node.png", icon: Cpu, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { id: "fog", title: "Fog Node", desc: "AI Inference Model", details: "Local AI model, posture inference under 100ms, and MQTT feedback trigger.", image: "/fog-node-pc.png", icon: BrainCircuit, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", glow: true },
  { id: "cloud", title: "AWS Cloud", desc: "IoT Core & Lambda", details: "AWS IoT Core broker, database logging in DynamoDB Tables, and serverless logic.", image: "/aws-logo-neon.png", icon: Cloud, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { id: "dashboard", title: "Live Dashboard", desc: "Analytics & Gamification", details: "Astro & React WebApp, real-time 3D posture visualizer, and gamified Capybara passport.", image: "/app.png", icon: Smartphone, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
];

export const SensorToScreen = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const itemVariants = {
    initial: { y: 15, opacity: 0, scale: 0.98 },
    animate: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25 } }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-md justify-center overflow-visible relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(var(--primary),0.1)_0%,transparent_70%)] pointer-events-none rounded-[3rem]" />
      
      <div className="text-center mb-10 relative z-10">
        <motion.div initial="initial" animate="animate" variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono tracking-widest mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" /> PRACTICAL IMPLEMENTATION
        </motion.div>
        <motion.h2 initial="initial" animate="animate" variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight drop-shadow-[0_4px_15px_rgba(255,255,255,0.05)]">
          From <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400 drop-shadow-[0_2px_8px_rgba(249,115,22,0.3)] italic">Sensor</span> to <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300 drop-shadow-[0_2px_8px_rgba(6,182,212,0.3)] italic">Screen</span>
        </motion.h2>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        {/* SVG Flow Connections (Desktop Only) */}
        <svg className="hidden lg:block absolute top-0 left-0 w-full h-[250px] pointer-events-none z-0" viewBox="0 -60 1000 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Glow filters */}
            <filter id="glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-orange" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-emerald" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-purple" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Gradients */}
            <linearGradient id="grad-cushion-mcu" x1="100" y1="56" x2="300" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="grad-mcu-fog" x1="300" y1="56" x2="500" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="grad-fog-mcu" x1="500" y1="56" x2="300" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="grad-fog-cloud" x1="500" y1="56" x2="700" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="grad-cloud-dash" x1="700" y1="56" x2="900" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="grad-fog-dash" x1="500" y1="56" x2="900" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* 1. Cushion to MCU */}
          <path id="path-cushion-mcu" d="M 100,56 L 300,56" stroke="url(#grad-cushion-mcu)" strokeWidth="3" strokeDasharray="6 4" />
          
          {/* 2. MCU to Fog */}
          <path id="path-mcu-fog" d="M 300,56 L 500,56" stroke="url(#grad-mcu-fog)" strokeWidth="3" strokeDasharray="6 4" />
          
          {/* 3. Fog to MCU (Reverse Alert) */}
          <path id="path-fog-mcu" d="M 500,56 Q 400,120 300,56" stroke="url(#grad-fog-mcu)" strokeWidth="2" strokeDasharray="4 4" />
          
          {/* 4. Fog to Cloud */}
          <path id="path-fog-cloud" d="M 500,56 L 700,56" stroke="url(#grad-fog-cloud)" strokeWidth="3" strokeDasharray="6 4" />
          
          {/* 5. Cloud to Dashboard */}
          <path id="path-cloud-dash" d="M 700,56 L 900,56" stroke="url(#grad-cloud-dash)" strokeWidth="3" strokeDasharray="6 4" />
          
          {/* 6. Fog to Dashboard Direct (Local WebSockets) */}
          <path id="path-fog-dash" d="M 500,56 Q 700,-35 900,56" stroke="url(#grad-fog-dash)" strokeWidth="2" strokeDasharray="4 4" />

          {/* 7. Dashboard to CTA (Dashed line going out) */}
          <path id="path-dash-cta" d="M 900,56 L 1000,56" stroke="rgba(249, 115, 22, 0.4)" strokeWidth="2" strokeDasharray="4 4" />

          {/* Animated light pulses */}
          <circle r="4" fill="#60a5fa" filter="url(#glow-cyan)">
            <animateMotion dur="2.5s" repeatCount="indefinite">
              <mpath href="#path-cushion-mcu" />
            </animateMotion>
          </circle>
          
          <circle r="4" fill="#22d3ee" filter="url(#glow-cyan)">
            <animateMotion dur="2s" repeatCount="indefinite">
              <mpath href="#path-mcu-fog" />
            </animateMotion>
          </circle>
          
          <circle r="4" fill="#ef4444" filter="url(#glow-orange)">
            <animateMotion dur="2.2s" repeatCount="indefinite">
              <mpath href="#path-fog-mcu" />
            </animateMotion>
          </circle>
          
          <circle r="4" fill="#f97316" filter="url(#glow-orange)">
            <animateMotion dur="3s" repeatCount="indefinite">
              <mpath href="#path-fog-cloud" />
            </animateMotion>
          </circle>
          
          <circle r="4" fill="#c084fc" filter="url(#glow-purple)">
            <animateMotion dur="2.5s" repeatCount="indefinite">
              <mpath href="#path-cloud-dash" />
            </animateMotion>
          </circle>
          
          <circle r="4" fill="#34d399" filter="url(#glow-emerald)">
            <animateMotion dur="1.8s" repeatCount="indefinite">
              <mpath href="#path-fog-dash" />
            </animateMotion>
          </circle>

          <circle r="3" fill="#f97316" filter="url(#glow-orange)">
            <animateMotion dur="2s" repeatCount="indefinite">
              <mpath href="#path-dash-cta" />
            </animateMotion>
          </circle>

          {/* Text Labels with drop-shadow effects */}
          <g className="text-[10px] font-mono font-bold">
            {/* Cushion to MCU */}
            <text x="200" y="32" fill="#93c5fd" textAnchor="middle">Analog Signals</text>
            <text x="200" y="44" fill="#a3a3a3" className="font-normal text-[8.5px]" textAnchor="middle">ADC Sampling</text>
            
            {/* MCU to Fog */}
            <text x="400" y="32" fill="#67e8f9" textAnchor="middle">MQTT (Local)</text>
            <text x="400" y="44" fill="#a3a3a3" className="font-normal text-[8.5px]" textAnchor="middle">Pressure JSON</text>
            
            {/* Fog to MCU (Reverse) */}
            <text x="400" y="105" fill="#fca5a5" textAnchor="middle">Haptic Alert Trigger</text>
            <text x="400" y="117" fill="#a3a3a3" className="font-normal text-[8.5px]" textAnchor="middle">Vibration Command</text>
            
            {/* Fog to Cloud */}
            <text x="600" y="32" fill="#fdba74" textAnchor="middle">AWS IoT Core</text>
            <text x="600" y="44" fill="#a3a3a3" className="font-normal text-[8.5px]" textAnchor="middle">Secure MQTT (TLS)</text>
            
            {/* Cloud to Dashboard */}
            <text x="800" y="32" fill="#d8b4fe" textAnchor="middle">API Gateway</text>
            <text x="800" y="44" fill="#a3a3a3" className="font-normal text-[8.5px]" textAnchor="middle">WebSockets / REST</text>
            
            {/* Fog to Dashboard Direct */}
            <text x="700" y="-22" fill="#6ee7b7" textAnchor="middle">Local WebSockets</text>
            <text x="700" y="-10" fill="#a3a3a3" className="font-normal text-[8.5px]" textAnchor="middle">Live Telemetry (&lt;100ms)</text>
          </g>
        </svg>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0 relative">
          {dataNodes.map((node, i) => (
            <motion.div 
              key={node.id} 
              initial="initial"
              animate="animate"
              variants={itemVariants}
              whileHover={{ scale: 1.1, y: -5 }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="flex flex-col items-center w-full lg:w-52 group relative z-10 cursor-pointer"
            >
              <div className={`w-24 h-24 md:w-28 md:h-28 rounded-[1.5rem] flex items-center justify-center border-2 backdrop-blur-md bg-black/60 ${node.bg} ${node.border} ${node.glow ? 'shadow-[0_0_40px_rgba(var(--primary),0.3)] border-primary/50' : 'border-white/10'} relative transition-all duration-500 group-hover:border-white/30 overflow-hidden`}>
                {node.image ? (
                  <img 
                    src={node.image} 
                    alt={node.title} 
                    className="w-16 h-16 md:w-20 md:h-20 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" 
                  />
                ) : (
                  <node.icon className={`w-12 h-12 md:w-14 md:h-14 ${node.color} relative z-10`} />
                )}
                
                <motion.div 
                  className={`absolute inset-0 rounded-[1.5rem] ${node.bg} opacity-20`}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                />

                {node.glow && (
                  <div className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-primary"></span>
                  </div>
                )}
              </div>
              <div className="mt-6 text-center h-28 flex flex-col items-center relative w-full px-2">
                <h4 className="text-white font-bold text-lg md:text-xl tracking-wide mb-1 transition-colors group-hover:text-primary">{node.title}</h4>
                
                <div className="relative w-full h-16 flex justify-center items-start overflow-hidden">
                  <span className={`text-neutral-500 text-xs md:text-sm font-medium leading-tight transition-all duration-300 block w-full ${hoveredNode === node.id ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100'}`}>
                    {node.desc}
                  </span>
                  
                  <span className={`${node.color} text-[11px] md:text-xs font-semibold leading-snug transition-all duration-300 block w-full px-1 ${hoveredNode === node.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute'}`}>
                    {node.details}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Floating CTA connected by line */}
        <div className="absolute top-[56px] -translate-y-1/2 z-50 hidden lg:flex lg:right-[-140px] xl:right-[-240px] 2xl:right-[-350px]">
          <motion.a
            href="/cloud"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group flex flex-col items-center gap-1 cursor-pointer relative"
          >
            <span className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <span className="relative flex items-center gap-4 pl-6 pr-5 py-4 rounded-2xl bg-neutral-950/80 backdrop-blur-xl border border-white/10 group-hover:border-primary/50 group-hover:bg-neutral-900/90 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <span className="text-white font-extrabold text-base tracking-wide group-hover:text-primary transition-colors">Explore Cloud Engine</span>
              <span className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                <ChevronRight size={18} className="text-white group-hover:text-black stroke-[3px] group-hover:translate-x-0.5 transition-all" />
              </span>
            </span>
          </motion.a>
        </div>
      </div>

      {/* Mobile Fallback CTA below the nodes */}
      <div className="mt-4 flex justify-center lg:hidden">
        <motion.a
          href="/cloud"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center gap-4 pl-6 pr-5 py-3.5 rounded-2xl bg-neutral-950/80 border border-white/10 active:border-primary/50 active:bg-neutral-900 transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
        >
          <span className="text-white font-bold text-sm">Explore Cloud Engine</span>
          <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <ChevronRight size={16} className="text-white stroke-[3px]" />
          </span>
        </motion.a>
      </div>
    </div>
  );
};
