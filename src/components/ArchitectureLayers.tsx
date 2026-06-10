"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Cpu, Cloud, Smartphone, Activity, BrainCircuit, Database } from "lucide-react";
import { SensorToScreen } from "./SensorToScreen";

const layersData = [
  { id: "business", name: "Business Layer", icon: "📊", desc: "Analytics & Gamification", info: "Manages user streaks, rewards, and long-term health trends stored in Amazon DynamoDB.", color: "from-blue-500/20 to-transparent", borderColor: "border-blue-500/40", hoverColor: "from-blue-500/30 via-blue-500/10 to-transparent", textColor: "text-blue-400" },
  { id: "application", name: "Application Layer", icon: "📱", desc: "User Interface", info: "React WebApp featuring real-time posture detection, 3D posture visualization, health analytics, and Capybara companion.", color: "from-cyan-500/20 to-transparent", borderColor: "border-cyan-500/40", hoverColor: "from-cyan-500/30 via-cyan-500/10 to-transparent", textColor: "text-cyan-400" },
  { id: "middleware", name: "Middleware Layer", icon: "⚙️", desc: "Fog Computing", info: "Local processing node running AI models for sub-100ms posture classification.", color: "from-red-500/20 to-transparent", borderColor: "border-red-500/40", hoverColor: "from-red-500/30 via-red-500/10 to-transparent", textColor: "text-red-400", dashed: true },
  { id: "network", name: "Network Layer", icon: "🌐", desc: "Data Transmission", info: "MQTT protocol over Wi-Fi ensuring lightweight and reliable message delivery between ESP32 and Fog Node.", color: "from-green-500/20 to-transparent", borderColor: "border-green-500/40", hoverColor: "from-green-500/30 via-green-500/10 to-transparent", textColor: "text-green-400" },
  { id: "perception", name: "Perception Layer", icon: "📡", desc: "Hardware & Sensors", info: "FSR sensor matrix capturing 9-point pressure data alongside temperature monitoring.", color: "from-yellow-500/20 to-transparent", borderColor: "border-yellow-500/40", hoverColor: "from-yellow-500/30 via-yellow-500/10 to-transparent", textColor: "text-yellow-400" },
];

const dataNodes = [
  { id: "edge", title: "Smart Cushion", desc: "FSR Sensor Matrix", details: "9 high-precision FSR pressure sensors + temperature sensor with 50Hz polling rate.", image: "/cushion-slate.png", icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { id: "esp", title: "Edge MCU", desc: "ESP32 Pre-processing", details: "ADC noise filtering, local calibration, WiFi connection, and MQTT JSON packaging.", image: "/esp32-node.png", icon: Cpu, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { id: "fog", title: "Fog Node", desc: "AI Inference Model", details: "Local AI model, posture inference under 100ms, and MQTT feedback trigger.", image: "/fog-node-pc.png", icon: BrainCircuit, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", glow: true },
  { id: "cloud", title: "AWS Cloud", desc: "IoT Core & Lambda", details: "AWS IoT Core broker, database logging in DynamoDB Tables, and serverless logic.", image: "/aws-logo-neon.png", icon: Cloud, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { id: "dashboard", title: "Live Dashboard", desc: "Analytics & Gamification", details: "React WebApp, real-time posture detection, and health analytics.", image: "/app.png", icon: Smartphone, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
];

export const ArchitectureLayers = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const totalSlides = 2;

  const sectionRef = useRef<HTMLElement>(null);
  const lastScrollTime = useRef<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleNativeWheel = (e: WheelEvent) => {
      const deltaY = e.deltaY;
      if (Math.abs(deltaY) < 15) return; // Ignore micro-scrolls

      const now = Date.now();
      
      // Smart boundary interception:
      // 1. Scrolling down -> only intercept if we can still advance to next slides
      const isScrollingDownBetweenSlides = deltaY > 0 && activeIndex < totalSlides - 1;
      // 2. Scrolling up -> only intercept if we can still go back to previous slides
      const isScrollingUpBetweenSlides = deltaY < 0 && activeIndex > 0;

      if (isScrollingDownBetweenSlides || isScrollingUpBetweenSlides) {
        // Intercept mouse wheel/trackpad event: prevent default page-level scrolling
        if (e.cancelable) e.preventDefault();

        // Throttle to once every 800ms to let slide transition animations finish
        if (now - lastScrollTime.current > 800) {
          lastScrollTime.current = now;
          paginate(deltaY > 0 ? 1 : -1);
        }
      }
    };

    // passive: false allows e.preventDefault() to execute cleanly without console warnings
    section.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => {
      section.removeEventListener('wheel', handleNativeWheel);
    };
  }, [activeIndex, totalSlides]);

  const paginate = (newDirection: number) => {
    setHoveredLayer(null);
    setDirection(newDirection);
    let newIndex = activeIndex + newDirection;
    // Going back from first slide: no-op
    if (newIndex < 0) return;
    // Going forward past last slide: navigate to Cloud Integration page
    if (newIndex >= totalSlides) {
      window.location.href = '/cloud';
      return;
    }
    setActiveIndex(newIndex);
  };

  const variants = {
    enter: (direction: number) => ({ x: direction > 0 ? 200 : -200, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 200 : -200, opacity: 0 })
  };

  const itemVariants = {
    enter: { y: 15, opacity: 0, scale: 0.98 },
    center: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 400, damping: 25 } },
    exit: { y: -15, opacity: 0, scale: 0.98 }
  };

  return (
    <section 
      ref={sectionRef} 
      id="architecture" 
      className="pt-4 pb-10 bg-black relative h-full border-t border-white/5 flex flex-col justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="relative w-full max-w-7xl mx-auto h-[78vh] min-h-[640px] flex items-center justify-center">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            
            {/* 0 LAYER - Title Slide */}
            {activeIndex === 0 && (
              <motion.div 
                key="title" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 400, damping: 30, staggerChildren: 0.1 }}
                className="absolute inset-0 flex items-center justify-center bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-md shadow-2xl overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 w-full h-full px-20 py-8 md:px-28 md:py-12 lg:px-32 xl:px-36 xl:py-16 relative z-10">
                  {/* Text Container */}
                  <div className="flex-[1.2] flex flex-col items-center lg:items-start text-center lg:text-left">
                    <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-mono tracking-widest text-sm">
                       <Activity size={16} /> Technical Documentation
                    </motion.div>
                    
                    <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-white tracking-tighter mb-6 leading-tight drop-shadow-[0_4px_15px_rgba(255,255,255,0.05)]">
                       System <br className="hidden sm:inline" /><span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400 drop-shadow-[0_2px_10px_rgba(249,115,22,0.25)] italic pr-2">Architecture</span><br/>Models
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-neutral-400 max-w-xl text-xl md:text-2xl font-medium leading-relaxed">
                      A comparative view of standard architectural models applied to the Smart Cushion ecosystem.
                    </motion.p>
                  </div>

                  {/* Image Container */}
                  <div className="flex-[0.8] w-full flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
                    <motion.div variants={itemVariants} className="relative w-full max-w-lg aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden border-2 border-white/10 shadow-2xl shadow-primary/20 bg-neutral-900/30 backdrop-blur-sm">
                       <img 
                         src="/architecture_premium_3d.png" 
                         alt="Abstract IoT and Cloud Architecture" 
                         className="w-full h-full object-cover object-center"
                       />
                       <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeIndex === 1 && (
              <motion.div 
                key="data-flow" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <SensorToScreen />
              </motion.div>
            )}
            
          </AnimatePresence>
          {/* Slide Navigation is handled natively by Mouse Wheel / Trackpad Scrolling */}

        </div>
      </div>

      {/* Dots Indicator — Positioned relative to section, using a premium Vercel-style Liquid Spring Capsule */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
        {[0, 1].map((idx) => {
          const isActive = activeIndex === idx;
          return (
            <button 
              key={idx} 
              onClick={() => {
                setHoveredLayer(null); // Reset layer hover states
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              className="relative w-8 h-8 flex items-center justify-center focus:outline-none cursor-pointer group"
            >
              {/* Inactive Dot (fades out when active, responds to hover) */}
              <motion.div 
                className={`rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'w-0 h-0 bg-transparent' 
                    : 'w-2.5 h-2.5 bg-white/20 group-hover:bg-white/50 group-hover:scale-125'
                }`}
              />

              {/* Liquid Active Indicator Capsule (slides smoothly with spring physics) */}
              {isActive && (
                <motion.div
                  layoutId="activeSlideIndicator"
                  className="absolute w-8 h-2.5 bg-gradient-to-r from-primary to-orange-500 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.7),inset_0_1px_1px_rgba(255,255,255,0.2)] z-10"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

    </section>
  );
};

// Helper Components
export const Layer5Box = motion.create(React.forwardRef<HTMLDivElement, any>(({ name, icon, desc, info, color, borderColor, dashed = false }, ref) => (
  <div ref={ref} className={`flex items-center gap-4 p-2.5 px-5 rounded-xl border bg-gradient-to-r ${color} ${dashed ? 'border-red-500/50 border-dashed' : borderColor || 'border-blue-500/30'} hover:bg-white/10 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all cursor-default relative group/box`}>
    <div className="text-2xl w-10 h-10 md:w-11 md:h-11 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">{icon}</div>
    <div className="flex flex-col">
      <span className="text-white font-bold text-[15px] md:text-base">{name}</span>
      <span className="text-neutral-400 text-[11px] md:text-xs group-hover/box:hidden">{desc}</span>
      <span className="text-primary text-[11px] hidden group-hover/box:block font-medium max-w-sm italic">{info}</span>
    </div>
  </div>
)));

export const ConnectionLine = motion.create(React.forwardRef<HTMLDivElement, any>((props, ref) => (
  <div ref={ref} className="flex justify-center my-0.5 md:my-1">
    <div className="w-0.5 h-2.5 md:h-3.5 bg-gradient-to-b from-white/30 to-white/10 rounded-full" />
  </div>
)));

export const DataUnitBox = motion.create(React.forwardRef<HTMLDivElement, any>(({ text, height, color = "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" }, ref) => (
  <div ref={ref} className={`${height} ${color} border rounded-[1rem] p-3 flex items-center justify-center text-center text-sm font-bold leading-tight shadow-inner transition-transform hover:scale-105 duration-300`}>
    {text}
  </div>
)));

export const OsiLayerBox = motion.create(React.forwardRef<HTMLDivElement, any>(({ num, name, desc, info, color, visual }, ref) => (
  <div ref={ref} className={`h-16 md:h-20 w-[90%] md:w-[70%] hover:w-full ${color} border rounded-[1rem] flex items-stretch overflow-hidden group/osi hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:z-20 transition-all duration-500 cursor-default relative`}>
    
    {/* Hidden visual component that reveals horizontally on hover */}
    <div className="w-0 opacity-0 group-hover/osi:w-[40%] group-hover/osi:opacity-100 transition-all duration-500 flex items-center overflow-hidden border-r border-white/5 pl-2">
      <div className="min-w-[200px] flex items-center px-4 w-full">
        {visual}
      </div>
    </div>

    {/* Info content */}
    <div className="flex-1 px-5 md:px-6 flex flex-col justify-center relative min-w-[220px]">
      <span className="font-bold text-white text-lg md:text-xl mb-0.5 whitespace-nowrap">{name}</span>
      <span className="text-xs md:text-sm text-neutral-300 opacity-80 group-hover/osi:hidden transition-opacity duration-300 whitespace-nowrap">{desc}</span>
      <span className="text-xs md:text-sm text-white/90 hidden group-hover/osi:block font-medium italic transition-opacity duration-300 whitespace-nowrap">{info}</span>
    </div>
    
    {/* Right Number Badge */}
    <div className="w-16 md:w-20 shrink-0 flex flex-col items-center justify-center bg-black/20 border-l border-inherit group-hover/osi:bg-white/10 transition-colors duration-500">
      <span className="font-black text-3xl md:text-4xl text-white opacity-50 group-hover/osi:opacity-100 transition-opacity duration-500 group-hover/osi:scale-110">{num}</span>
    </div>
  </div>
)));
