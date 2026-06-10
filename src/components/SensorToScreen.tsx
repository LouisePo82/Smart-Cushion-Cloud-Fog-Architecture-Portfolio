"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Cpu, Cloud, Smartphone, Activity, BrainCircuit } from "lucide-react";

interface SensorToScreenProps {
  mode?: "standard" | "future-work";
}

const dataNodes = [
  { id: "edge", title: "Smart Cushion", desc: "FSR Sensor Matrix", details: "9 high-precision FSR pressure sensors + temperature sensor with 50Hz polling rate.", image: "/cushion-slate.png", icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { id: "esp", title: "Edge MCU", desc: "ESP32 Pre-processing", details: "ADC noise filtering, local calibration, WiFi connection, and MQTT JSON packaging.", image: "/esp32-node.png", icon: Cpu, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", scaledInfo: { title: "Cost-Effective Edge Scaling", desc: ["• Independent MCU per user", "• Handles local sensor sampling & haptic feedback", "• Extremely cheap hardware cost", "• Infinitely scalable deployment"] } },
  { id: "fog", title: "Fog Node", desc: "AI Inference Model", details: "Local AI model, posture inference under 100ms, and MQTT feedback trigger.", image: "/fog-node-pc.png", icon: BrainCircuit, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", glow: true, scaledInfo: { title: "Horizontal Fog Scaling", desc: ["• 1 Gateway orchestrates 10-50 cushions", "• Eliminates cloud bandwidth waste", "• Ultra-low latency local processing", "• Easily add gateways per room"] } },
  { id: "cloud", title: "AWS Cloud", desc: "IoT Core & Lambda", details: "AWS IoT Core broker, database logging in DynamoDB Tables, and serverless logic.", image: "/aws-logo-neon.png", icon: Cloud, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", scaledInfo: { title: "Serverless Auto-Scaling", desc: ["• AWS IoT Core handles millions of devices", "• Serverless Lambda on-demand compute", "• DynamoDB auto-scaling for Big Data", "• Pay-as-you-go (No idle costs)"] } },
  { id: "dashboard", title: "Live Dashboard", desc: "Analytics & Gamification", details: "React WebApp, real-time posture detection, and health analytics.", image: "/app.png", icon: Smartphone, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
];

export const SensorToScreen = ({ mode = "standard" }: SensorToScreenProps) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isScaled, setIsScaled] = useState(false);
  const [selectedScaleNode, setSelectedScaleNode] = useState<string | null>(null);

  const itemVariants = {
    initial: { y: 15, opacity: 0, scale: 0.98 },
    animate: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25 } }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.node-clickable') || (e.target as HTMLElement).closest('.popup-card')) return;
    setSelectedScaleNode(null);
  };

  return (
    <div 
      className="w-full h-full flex flex-col bg-white/5 border border-white/10 rounded-[3rem] pt-8 pb-8 px-8 md:pt-10 md:pb-10 md:px-12 backdrop-blur-md justify-center overflow-visible relative"
      onClick={handleContainerClick}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(var(--primary),0.1)_0%,transparent_70%)] pointer-events-none rounded-[3rem]" />
      
      <div className="text-center mb-6 relative z-10 flex flex-col items-center">
        <motion.div initial="initial" animate="animate" variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono tracking-widest mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" /> 
          {mode === "future-work" ? "SCALABLE ARCHITECTURE" : "PRACTICAL IMPLEMENTATION"}
        </motion.div>
        <motion.h2 initial="initial" animate="animate" variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_15px_rgba(255,255,255,0.05)]">
          {isScaled ? (
            <>
              Scale <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400 drop-shadow-[0_2px_8px_rgba(249,115,22,0.3)] italic">Edge Clusters</span> to <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300 drop-shadow-[0_2px_8px_rgba(6,182,212,0.3)] italic">Dashboards</span>
            </>
          ) : (
            <>
              From <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400 drop-shadow-[0_2px_8px_rgba(249,115,22,0.3)] italic">Sensor</span> to <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300 drop-shadow-[0_2px_8px_rgba(6,182,212,0.3)] italic">Screen</span>
            </>
          )}
        </motion.h2>

        {mode === "future-work" && (
          <motion.button
            onClick={() => {
              setIsScaled(!isScaled);
              setSelectedScaleNode(null);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-orange-500 text-white font-mono text-xs font-black uppercase tracking-widest shadow-[0_8px_25px_rgba(249,115,22,0.3)] hover:shadow-[0_8px_35px_rgba(249,115,22,0.55)] border border-white/10 cursor-pointer transition-all duration-300 relative z-50"
          >
            {isScaled ? "↵ Reset to Standard View" : "⤢ Scale System Architecture ➔"}
          </motion.button>
        )}
        
        <AnimatePresence>
          {isScaled && (
            <motion.p initial={{opacity: 0, y: -10, height: 0}} animate={{opacity: 1, y: 0, height: "auto"}} exit={{opacity: 0, y: -10, height: 0}} className="mt-4 text-neutral-400 text-sm font-medium tracking-wide">
              Click the highlighted layers to view scaling strategies.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="relative w-full max-w-6xl mx-auto mt-12 lg:mt-24">
        {/* SVG Flow Connections (Desktop Only) */}
        <svg className={`hidden lg:block absolute ${isScaled ? "top-[176px]" : "top-[56px]"} left-0 w-full pointer-events-none z-0 -translate-y-1/2 overflow-visible`} viewBox="0 -200 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <linearGradient id="grad-cushion-mcu" x1="100" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="grad-mcu-fog" x1="300" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="grad-fog-mcu" x1="500" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="grad-fog-cloud" x1="500" y1="0" x2="700" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="grad-cloud-dash" x1="700" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="grad-fog-dash" x1="500" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {!isScaled ? (
            /* Standard View Connections */
            <g>
              {/* 1. Cushion to MCU */}
              <path id="path-cushion-mcu" d="M 100,0 L 300,0" stroke="url(#grad-cushion-mcu)" strokeWidth="3.5" strokeDasharray="6 4" />
              
              {/* 2. MCU to Fog */}
              <path id="path-mcu-fog" d="M 300,0 L 500,0" stroke="url(#grad-mcu-fog)" strokeWidth="3.5" strokeDasharray="6 4" />
              
              {/* 3. Fog to MCU (Reverse Alert) - Orthogonal Circuit Shape */}
              <path id="path-fog-mcu" d="M 500,0 L 500,71 Q 500,76 495,76 L 305,76 Q 300,76 300,71 L 300,0" stroke="url(#grad-fog-mcu)" strokeWidth="3.5" strokeDasharray="4 4" />
              
              {/* 4. Fog to Cloud */}
              <path id="path-fog-cloud" d="M 500,0 L 700,0" stroke="url(#grad-fog-cloud)" strokeWidth="3.5" strokeDasharray="6 4" />
              
              {/* 5. Cloud to Dashboard */}
              <path id="path-cloud-dash" d="M 700,0 L 900,0" stroke="url(#grad-cloud-dash)" strokeWidth="3.5" strokeDasharray="6 4" />
              
              {/* 6. Fog to Dashboard Direct (Local WebSockets) - Orthogonal Circuit Shape */}
              <path id="path-fog-dash" d="M 500,0 L 500,-80 Q 500,-85 505,-85 L 895,-85 Q 900,-85 900,-80 L 900,0" stroke="url(#grad-fog-dash)" strokeWidth="3.5" strokeDasharray="4 4" />

              {/* Animated light pulses */}
              <circle r="4.5" fill="#60a5fa" filter="url(#glow-cyan)">
                <animateMotion dur="2.5s" repeatCount="indefinite">
                  <mpath href="#path-cushion-mcu" />
                </animateMotion>
              </circle>
              
              <circle r="4.5" fill="#22d3ee" filter="url(#glow-cyan)">
                <animateMotion dur="2s" repeatCount="indefinite">
                  <mpath href="#path-mcu-fog" />
                </animateMotion>
              </circle>
              
              <circle r="5.5" fill="#ef4444" filter="url(#glow-orange)">
                <animateMotion dur="2.2s" repeatCount="indefinite">
                  <mpath href="#path-fog-mcu" />
                </animateMotion>
              </circle>
              
              <circle r="4.5" fill="#f97316" filter="url(#glow-orange)">
                <animateMotion dur="3s" repeatCount="indefinite">
                  <mpath href="#path-fog-cloud" />
                </animateMotion>
              </circle>
              
              <circle r="4.5" fill="#c084fc" filter="url(#glow-purple)">
                <animateMotion dur="2.5s" repeatCount="indefinite">
                  <mpath href="#path-cloud-dash" />
                </animateMotion>
              </circle>
              
              <circle r="5.5" fill="#34d399" filter="url(#glow-emerald)">
                <animateMotion dur="1.8s" repeatCount="indefinite">
                  <mpath href="#path-fog-dash" />
                </animateMotion>
              </circle>

              {/* Text Labels with drop-shadow effects */}
              <g className="text-[10px] font-mono font-bold">
                {/* Cushion to MCU */}
                <text x="200" y="-12" fill="#93c5fd" textAnchor="middle">Analog Signals</text>
                <text x="200" y="12" fill="#a3a3a3" className="font-normal text-[8.5px]" textAnchor="middle">ADC Sampling</text>
                
                {/* MCU to Fog */}
                <text x="400" y="-12" fill="#67e8f9" textAnchor="middle">MQTT (Local)</text>
                <text x="400" y="12" fill="#a3a3a3" className="font-normal text-[8.5px]" textAnchor="middle">Pressure JSON</text>
                
                {/* Fog to MCU (Reverse) */}
                <text x="400" y="58" fill="#fca5a5" className="font-bold text-[8.5px] tracking-tight" textAnchor="middle">Haptic Alert Trigger</text>
                <text x="400" y="69" fill="#a3a3a3" className="font-normal text-[7.5px] tracking-tight" textAnchor="middle">Vibration Command</text>
                
                {/* Fog to Cloud */}
                <text x="600" y="-12" fill="#fdba74" textAnchor="middle">AWS IoT Core</text>
                <text x="600" y="12" fill="#a3a3a3" className="font-normal text-[8.5px]" textAnchor="middle">Secure MQTT (TLS)</text>
                
                {/* Cloud to Dashboard */}
                <text x="800" y="-12" fill="#d8b4fe" textAnchor="middle">API Gateway</text>
                <text x="800" y="12" fill="#a3a3a3" className="font-normal text-[8.5px]" textAnchor="middle">WebSockets / REST</text>
                
                {/* Fog to Dashboard Direct */}
                <text x="700" y="-98" fill="#6ee7b7" textAnchor="middle">Local WebSockets</text>
                <text x="700" y="-89" fill="#a3a3a3" className="font-normal text-[8.5px]" textAnchor="middle">Live Telemetry (&lt;100ms)</text>
              </g>
            </g>
          ) : (
            /* Scaled Future Work View Connections (Fanned for 5 Cushions & 5 Dashboards) */
            <g>
              {/* Cushions to ESP32s (5 horizontal lines at Y = -144, -72, 0, 72, 144) */}
              <path id="path-cushion-mcu-0" d="M 100,-144 L 300,-144" stroke="url(#grad-cushion-mcu)" strokeWidth="3" strokeDasharray="5 3" />
              <path id="path-cushion-mcu-1" d="M 100,-72 L 300,-72" stroke="url(#grad-cushion-mcu)" strokeWidth="3" strokeDasharray="5 3" />
              <path id="path-cushion-mcu-2" d="M 100,0 L 300,0" stroke="url(#grad-cushion-mcu)" strokeWidth="3" strokeDasharray="5 3" />
              <path id="path-cushion-mcu-3" d="M 100,72 L 300,72" stroke="url(#grad-cushion-mcu)" strokeWidth="3" strokeDasharray="5 3" />
              <path id="path-cushion-mcu-4" d="M 100,144 L 300,144" stroke="url(#grad-cushion-mcu)" strokeWidth="3" strokeDasharray="5 3" />

              {/* ESP32s to Fog Node (5 fanning lines fanning into X=500, Y=0) */}
              <path id="path-mcu-fog-0" d="M 300,-144 L 500,0" stroke="url(#grad-mcu-fog)" strokeWidth="3" strokeDasharray="5 3" />
              <path id="path-mcu-fog-1" d="M 300,-72 L 500,0" stroke="url(#grad-mcu-fog)" strokeWidth="3" strokeDasharray="5 3" />
              <path id="path-mcu-fog-2" d="M 300,0 L 500,0" stroke="url(#grad-mcu-fog)" strokeWidth="3" strokeDasharray="5 3" />
              <path id="path-mcu-fog-3" d="M 300,72 L 500,0" stroke="url(#grad-mcu-fog)" strokeWidth="3" strokeDasharray="5 3" />
              <path id="path-mcu-fog-4" d="M 300,144 L 500,0" stroke="url(#grad-mcu-fog)" strokeWidth="3" strokeDasharray="5 3" />

              {/* Fog Node to ESP32 Haptic Alert warning reverse paths (5 lines) */}
              <path id="path-fog-mcu-0" d="M 500,0 L 300,-144" stroke="url(#grad-fog-mcu)" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
              <path id="path-fog-mcu-1" d="M 500,0 L 300,-72" stroke="url(#grad-fog-mcu)" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
              <path id="path-fog-mcu-2" d="M 500,0 L 300,0" stroke="url(#grad-fog-mcu)" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
              <path id="path-fog-mcu-3" d="M 500,0 L 300,72" stroke="url(#grad-fog-mcu)" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
              <path id="path-fog-mcu-4" d="M 500,0 L 300,144" stroke="url(#grad-fog-mcu)" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />

              {/* Fog Node to AWS Cloud (1 line) */}
              <path id="path-fog-cloud" d="M 500,0 L 700,0" stroke="url(#grad-fog-cloud)" strokeWidth="3.5" strokeDasharray="6 4" />

              {/* Cloud to Dashboards (5 fanning lines fanning out to X=900) */}
              <path id="path-cloud-dash-0" d="M 700,0 L 900,-144" stroke="url(#grad-cloud-dash)" strokeWidth="3" strokeDasharray="5 3" />
              <path id="path-cloud-dash-1" d="M 700,0 L 900,-72" stroke="url(#grad-cloud-dash)" strokeWidth="3" strokeDasharray="5 3" />
              <path id="path-cloud-dash-2" d="M 700,0 L 900,0" stroke="url(#grad-cloud-dash)" strokeWidth="3" strokeDasharray="5 3" />
              <path id="path-cloud-dash-3" d="M 700,0 L 900,72" stroke="url(#grad-cloud-dash)" strokeWidth="3" strokeDasharray="5 3" />
              <path id="path-cloud-dash-4" d="M 700,0 L 900,144" stroke="url(#grad-cloud-dash)" strokeWidth="3" strokeDasharray="5 3" />

              {/* Fog Node to Dashboards Direct Local WS (5 fanning trunk bypass lines at Y = -185) */}
              <path id="path-fog-dash-0" d="M 500,0 L 500,-185 L 950,-185 L 950,-144 L 900,-144" stroke="url(#grad-fog-dash)" strokeWidth="2" strokeDasharray="3 3" />
              <path id="path-fog-dash-1" d="M 500,0 L 500,-185 L 950,-185 L 950,-72 L 900,-72" stroke="url(#grad-fog-dash)" strokeWidth="2" strokeDasharray="3 3" />
              <path id="path-fog-dash-2" d="M 500,0 L 500,-185 L 950,-185 L 950,0 L 900,0" stroke="url(#grad-fog-dash)" strokeWidth="2" strokeDasharray="3 3" />
              <path id="path-fog-dash-3" d="M 500,0 L 500,-185 L 950,-185 L 950,72 L 900,72" stroke="url(#grad-fog-dash)" strokeWidth="2" strokeDasharray="3 3" />
              <path id="path-fog-dash-4" d="M 500,0 L 500,-185 L 950,-185 L 950,144 L 900,144" stroke="url(#grad-fog-dash)" strokeWidth="2" strokeDasharray="3 3" />

              {/* Light Pulses */}
              <circle r="3.5" fill="#60a5fa" filter="url(#glow-cyan)"><animateMotion dur="2.2s" repeatCount="indefinite"><mpath href="#path-cushion-mcu-0" /></animateMotion></circle>
              <circle r="3.5" fill="#60a5fa" filter="url(#glow-cyan)"><animateMotion dur="2.6s" repeatCount="indefinite"><mpath href="#path-cushion-mcu-1" /></animateMotion></circle>
              <circle r="3.5" fill="#60a5fa" filter="url(#glow-cyan)"><animateMotion dur="1.8s" repeatCount="indefinite"><mpath href="#path-cushion-mcu-2" /></animateMotion></circle>
              <circle r="3.5" fill="#60a5fa" filter="url(#glow-cyan)"><animateMotion dur="2.4s" repeatCount="indefinite"><mpath href="#path-cushion-mcu-3" /></animateMotion></circle>
              <circle r="3.5" fill="#60a5fa" filter="url(#glow-cyan)"><animateMotion dur="2s" repeatCount="indefinite"><mpath href="#path-cushion-mcu-4" /></animateMotion></circle>

              <circle r="3.5" fill="#22d3ee" filter="url(#glow-cyan)"><animateMotion dur="1.8s" repeatCount="indefinite"><mpath href="#path-mcu-fog-0" /></animateMotion></circle>
              <circle r="3.5" fill="#22d3ee" filter="url(#glow-cyan)"><animateMotion dur="2.4s" repeatCount="indefinite"><mpath href="#path-mcu-fog-1" /></animateMotion></circle>
              <circle r="3.5" fill="#22d3ee" filter="url(#glow-cyan)"><animateMotion dur="2.1s" repeatCount="indefinite"><mpath href="#path-mcu-fog-2" /></animateMotion></circle>
              <circle r="3.5" fill="#22d3ee" filter="url(#glow-cyan)"><animateMotion dur="2.5s" repeatCount="indefinite"><mpath href="#path-mcu-fog-3" /></animateMotion></circle>
              <circle r="3.5" fill="#22d3ee" filter="url(#glow-cyan)"><animateMotion dur="2s" repeatCount="indefinite"><mpath href="#path-mcu-fog-4" /></animateMotion></circle>

              <circle r="4.5" fill="#ef4444" filter="url(#glow-orange)"><animateMotion dur="2.1s" repeatCount="indefinite"><mpath href="#path-fog-mcu-0" /></animateMotion></circle>
              <circle r="4.5" fill="#ef4444" filter="url(#glow-orange)"><animateMotion dur="2.5s" repeatCount="indefinite"><mpath href="#path-fog-mcu-1" /></animateMotion></circle>
              <circle r="4.5" fill="#ef4444" filter="url(#glow-orange)"><animateMotion dur="1.9s" repeatCount="indefinite"><mpath href="#path-fog-mcu-2" /></animateMotion></circle>
              <circle r="4.5" fill="#ef4444" filter="url(#glow-orange)"><animateMotion dur="2.3s" repeatCount="indefinite"><mpath href="#path-fog-mcu-3" /></animateMotion></circle>
              <circle r="4.5" fill="#ef4444" filter="url(#glow-orange)"><animateMotion dur="2.7s" repeatCount="indefinite"><mpath href="#path-fog-mcu-4" /></animateMotion></circle>

              <circle r="4.5" fill="#f97316" filter="url(#glow-orange)"><animateMotion dur="3s" repeatCount="indefinite"><mpath href="#path-fog-cloud" /></animateMotion></circle>

              <circle r="3.5" fill="#c084fc" filter="url(#glow-purple)"><animateMotion dur="2.3s" repeatCount="indefinite"><mpath href="#path-cloud-dash-0" /></animateMotion></circle>
              <circle r="3.5" fill="#c084fc" filter="url(#glow-purple)"><animateMotion dur="1.9s" repeatCount="indefinite"><mpath href="#path-cloud-dash-1" /></animateMotion></circle>
              <circle r="3.5" fill="#c084fc" filter="url(#glow-purple)"><animateMotion dur="2.6s" repeatCount="indefinite"><mpath href="#path-cloud-dash-2" /></animateMotion></circle>
              <circle r="3.5" fill="#c084fc" filter="url(#glow-purple)"><animateMotion dur="2.2s" repeatCount="indefinite"><mpath href="#path-cloud-dash-3" /></animateMotion></circle>
              <circle r="3.5" fill="#c084fc" filter="url(#glow-purple)"><animateMotion dur="2.8s" repeatCount="indefinite"><mpath href="#path-cloud-dash-4" /></animateMotion></circle>

              <circle r="4.5" fill="#34d399" filter="url(#glow-emerald)"><animateMotion dur="1.9s" repeatCount="indefinite"><mpath href="#path-fog-dash-0" /></animateMotion></circle>
              <circle r="4.5" fill="#34d399" filter="url(#glow-emerald)"><animateMotion dur="2.3s" repeatCount="indefinite"><mpath href="#path-fog-dash-1" /></animateMotion></circle>
              <circle r="4.5" fill="#34d399" filter="url(#glow-emerald)"><animateMotion dur="1.6s" repeatCount="indefinite"><mpath href="#path-fog-dash-2" /></animateMotion></circle>
              <circle r="4.5" fill="#34d399" filter="url(#glow-emerald)"><animateMotion dur="2.1s" repeatCount="indefinite"><mpath href="#path-fog-dash-3" /></animateMotion></circle>
              <circle r="4.5" fill="#34d399" filter="url(#glow-emerald)"><animateMotion dur="2.5s" repeatCount="indefinite"><mpath href="#path-fog-dash-4" /></animateMotion></circle>
            </g>
          )}
        </svg>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0 relative min-h-[400px]">
          {dataNodes.map((node, i) => {
            const isMultiplied = isScaled && (node.id === "edge" || node.id === "esp" || node.id === "dashboard");
            const items = isMultiplied ? [0, 1, 2, 3, 4] : [0];
            const isSelected = selectedScaleNode === node.id;
            const isDimmed = selectedScaleNode && !isSelected && isScaled;

            return (
              <div key={node.id} className={`flex flex-col items-center w-full lg:w-52 relative ${isSelected ? 'z-50' : 'z-10'}`}>
                <div className={`flex flex-col gap-2 items-center justify-center ${isScaled ? "h-[352px]" : "h-[112px]"} transition-all duration-500`}>
                  {items.map((idx) => {
                    const itemId = `${node.id}-${idx}`;
                    const itemTitle = isMultiplied 
                      ? node.id === "edge" 
                        ? `Cushion ${idx + 1}` 
                        : node.id === "esp" 
                          ? `ESP32-${idx + 1}` 
                          : `User ${idx + 1}`
                      : node.title;

                    const isClickable = isScaled && (node as any).scaledInfo;

                    return (
                      <motion.div
                        key={itemId}
                        layoutId={`box-${node.id}-${idx}`}
                        whileHover={isClickable ? { scale: 1.08, y: -2, boxShadow: "0 0 30px rgba(255,255,255,0.2)" } : { scale: 1.08, y: -2 }}
                        whileTap={isClickable ? { scale: 0.95 } : undefined}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => {
                          if (isClickable) setSelectedScaleNode(isSelected ? null : node.id);
                        }}
                        className={`node-clickable ${isScaled ? "w-16 h-16 rounded-2xl" : "w-24 h-24 md:w-28 md:h-28 rounded-[1.5rem]"} flex items-center justify-center border-2 backdrop-blur-md bg-black/60 ${node.bg} ${node.border} ${node.glow && !isScaled ? 'shadow-[0_0_40px_rgba(var(--primary),0.3)] border-primary/50' : 'border-white/10'} relative transition-all duration-500 ${isClickable ? 'cursor-pointer hover:border-white/30' : 'cursor-default'} ${isSelected ? 'ring-2 ring-white/50 border-white/80 scale-105 z-50' : ''} ${isDimmed ? 'opacity-30 grayscale blur-[1px]' : ''} overflow-hidden`}
                      >
                        {node.image ? (
                          <img 
                            src={node.image} 
                            alt={itemTitle} 
                            className={`${isScaled ? "w-8 h-8 -translate-y-1.5" : "w-11 h-11 md:w-14 md:h-14 -translate-y-2"} object-contain relative z-10 transition-transform duration-500 group-hover:scale-105`} 
                          />
                        ) : (
                          <node.icon className={`${isScaled ? "w-7 h-7 -translate-y-1.5" : "w-9 h-9 md:w-11 md:h-11 -translate-y-2"} ${node.color} relative z-10`} />
                        )}
                        
                        <motion.div 
                          className={`absolute inset-0 ${isScaled ? "rounded-2xl" : "rounded-[1.5rem]"} ${node.bg} opacity-20`}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity, delay: (i + idx) * 0.4 }}
                        />

                        {node.glow && !isScaled && (
                          <div className="absolute top-2 right-2 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                          </div>
                        )}

                        {/* Glassy Title Banner inside the Box */}
                        <div className={`absolute bottom-0 left-0 right-0 bg-neutral-900/90 border-t border-white/5 ${isScaled ? "min-h-[22px] py-0.5" : "min-h-[30px] py-1"} px-1 flex items-center justify-center z-20`}>
                          <span className={`text-white font-bold ${isScaled ? "text-[7.5px]" : "text-[9px] md:text-[10px]"} leading-tight tracking-wide uppercase text-center block max-w-full truncate`}>
                            {itemTitle}
                          </span>
                        </div>

                        {/* Interactive Ping Indicator */}
                        {isClickable && !isSelected && !isDimmed && idx === 2 && (
                           <span className="absolute -top-1 -right-1 flex h-3 w-3 z-50">
                             <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${node.id === 'esp' ? 'bg-cyan-400' : node.id === 'fog' ? 'bg-primary' : 'bg-purple-400'}`}></span>
                             <span className={`relative inline-flex rounded-full h-3 w-3 ${node.id === 'esp' ? 'bg-cyan-500' : node.id === 'fog' ? 'bg-orange-500' : 'bg-purple-500'}`}></span>
                           </span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Floating Popup Card next to the column */}
                <AnimatePresence>
                  {isSelected && (node as any).scaledInfo && (
                    <motion.div
                      initial={{ opacity: 0, x: node.id === 'esp' ? 20 : node.id === 'cloud' ? -20 : 0, y: node.id === 'fog' ? 20 : 0, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      className={`popup-card absolute z-[100] w-80 p-5 rounded-2xl bg-neutral-900/95 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-left cursor-default ${
                        node.id === 'esp' ? 'left-[130%] top-1/2 -translate-y-1/2' 
                        : node.id === 'fog' ? 'bottom-[110%] mb-4 left-1/2 -translate-x-1/2' 
                        : node.id === 'cloud' ? 'right-[130%] top-1/2 -translate-y-1/2'
                        : ''
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className={`font-black text-base flex items-center gap-2 ${node.id === 'esp' ? 'text-cyan-400' : node.id === 'fog' ? 'text-primary' : 'text-purple-400'}`}>
                          <node.icon size={18} />
                          {(node as any).scaledInfo.title}
                        </h4>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedScaleNode(null);
                          }}
                          className="text-neutral-400 hover:text-white transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>
                      <ul className="text-neutral-300 text-xs leading-relaxed space-y-1.5 font-medium">
                        {((node as any).scaledInfo.desc as string[]).map((point, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{point.replace('• ', '')}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Bottom labels (Only visible in standard view / when NOT scaled) */}
                <AnimatePresence>
                  {!isScaled && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-12 text-center flex flex-col items-center relative w-full px-2 justify-start min-h-[100px] overflow-hidden"
                    >
                      <span className="text-white font-bold text-xs md:text-sm leading-relaxed block w-full mb-1">
                        {node.desc}
                      </span>
                      <span className="text-neutral-400 text-[11px] md:text-xs leading-normal block w-full px-1">
                        {node.details}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Floating CTA connected by line (Only in standard mode) */}
      {!isScaled && (
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
      )}

      {/* Mobile Fallback CTA below the nodes */}
      {!isScaled && (
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
      )}
    </div>
  );
};
