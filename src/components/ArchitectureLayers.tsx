"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Cpu, Cloud, Smartphone, Activity, BrainCircuit, Database } from "lucide-react";

const layersData = [
  { id: "business", name: "Business Layer", icon: "📊", desc: "Analytics & Gamification", info: "Manages user streaks, rewards, and long-term health trends stored in PostgreSQL.", color: "from-blue-500/20 to-transparent", borderColor: "border-blue-500/40", hoverColor: "from-blue-500/30 via-blue-500/10 to-transparent", textColor: "text-blue-400" },
  { id: "application", name: "Application Layer", icon: "📱", desc: "User Interface", info: "Astro & React dashboard featuring real-time 3D posture visualization and Capybara companion.", color: "from-cyan-500/20 to-transparent", borderColor: "border-cyan-500/40", hoverColor: "from-cyan-500/30 via-cyan-500/10 to-transparent", textColor: "text-cyan-400" },
  { id: "middleware", name: "Middleware Layer", icon: "⚙️", desc: "Fog Computing", info: "Local processing node running AI models for sub-100ms posture classification.", color: "from-red-500/20 to-transparent", borderColor: "border-red-500/40", hoverColor: "from-red-500/30 via-red-500/10 to-transparent", textColor: "text-red-400", dashed: true },
  { id: "network", name: "Network Layer", icon: "🌐", desc: "Data Transmission", info: "MQTT protocol over Wi-Fi ensuring lightweight and reliable message delivery between ESP32 and Fog Node.", color: "from-green-500/20 to-transparent", borderColor: "border-green-500/40", hoverColor: "from-green-500/30 via-green-500/10 to-transparent", textColor: "text-green-400" },
  { id: "perception", name: "Perception Layer", icon: "📡", desc: "Hardware & Sensors", info: "FSR sensor matrix capturing 9-point pressure data alongside MPU6050 motion tracking.", color: "from-yellow-500/20 to-transparent", borderColor: "border-yellow-500/40", hoverColor: "from-yellow-500/30 via-yellow-500/10 to-transparent", textColor: "text-yellow-400" },
];

const dataNodes = [
  { id: "edge", title: "Smart Cushion", desc: "FSR Sensor Matrix", details: "9 high-precision FSR pressure sensors + MPU6050 gyroscope with 50Hz polling rate.", image: "/cushion-slate.png", icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { id: "esp", title: "Edge MCU", desc: "ESP32 Pre-processing", details: "ADC noise filtering, local calibration, WiFi connection, and MQTT JSON packaging.", image: "/esp32-node.png", icon: Cpu, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { id: "fog", title: "Fog Node", desc: "AI Inference Model", details: "Local AI model, posture inference under 100ms, and MQTT feedback trigger.", image: "/fog-node-pc.png", icon: BrainCircuit, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", glow: true },
  { id: "cloud", title: "AWS Cloud", desc: "IoT Core & Lambda", details: "AWS IoT Core broker, database logging in PostgreSQL, and historic data warehousing.", image: "/aws-logo-neon.png", icon: Cloud, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { id: "dashboard", title: "Live Dashboard", desc: "Analytics & Gamification", details: "Astro & React WebApp, real-time 3D posture visualizer, and gamified Capybara passport.", image: "/app.png", icon: Smartphone, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
];

export const ArchitectureLayers = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const totalSlides = 5;

  const paginate = (newDirection: number) => {
    setHoveredLayer(null);
    setDirection(newDirection);
    let newIndex = activeIndex + newDirection;
    // Going back from first slide: no-op
    if (newIndex < 0) return;
    // Going forward past last slide: navigate to Dashboard page
    if (newIndex >= totalSlides) {
      window.location.href = '/dashboard';
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
    <section className="pt-8 pb-16 bg-black relative h-full border-t border-white/5 flex flex-col justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="relative w-full max-w-6xl mx-auto h-[600px] flex items-center justify-center">
          
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
                    
                    <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-black text-white tracking-tighter mb-6 leading-tight drop-shadow-[0_4px_15px_rgba(255,255,255,0.05)]">
                      System <br className="hidden sm:inline" /><span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400 drop-shadow-[0_2px_10px_rgba(249,115,22,0.25)] italic pr-2">Architecture</span><br/>Models
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-neutral-400 max-w-xl text-lg md:text-xl font-medium leading-relaxed">
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

            {/* 3 LAYER - Cloud Computing */}
            {activeIndex === 1 && (
              <motion.div 
                key="3layer" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 400, damping: 30, staggerChildren: 0.08 }}
                className="absolute inset-0 flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[3rem] p-8 md:p-16 backdrop-blur-xl shadow-2xl"
              >
                <div className="w-full md:w-5/12 text-center md:text-left mb-10 md:mb-0 relative z-10">
                  <motion.div variants={itemVariants} className="text-[12rem] md:text-[16rem] font-black leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/0 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)] -ml-4">3</motion.div>
                  <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-cyan-300 drop-shadow-[0_2px_10px_rgba(103,232,249,0.2)] mb-2">Cloud Computing</motion.h2>
                  <motion.p variants={itemVariants} className="text-primary font-mono tracking-widest uppercase text-sm">Service Models</motion.p>
                </div>

                <div className="w-full md:w-7/12 flex flex-col gap-6 relative z-10 group/list">
                  <motion.div variants={itemVariants} className="flex items-stretch rounded-3xl overflow-hidden border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all duration-500 cursor-default group">
                    <div className="w-1/3 bg-emerald-500/20 p-6 flex flex-col items-center justify-center text-center"><span className="text-emerald-400 font-bold text-lg mb-1">End User</span><span className="text-emerald-500/70 text-xs">No Install Needed</span></div>
                    <div className="w-2/3 p-6 flex items-center justify-between">
                      <div><strong className="text-white text-xl block mb-1">Smart Cushion Dashboard</strong><span className="text-neutral-400 text-sm">Astro + React web app, accessed via browser URL</span></div>
                      <div className="text-emerald-400 font-black text-3xl ml-4 opacity-50 group-hover:opacity-100 transition-opacity">SaaS</div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-stretch rounded-3xl overflow-hidden border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all duration-500 cursor-default group">
                    <div className="w-1/3 bg-orange-500/20 p-6 flex flex-col items-center justify-center text-center"><span className="text-orange-400 font-bold text-lg mb-1">Our Team</span><span className="text-orange-500/70 text-xs">App Builder</span></div>
                    <div className="w-2/3 p-6 flex items-center justify-between">
                      <div><strong className="text-white text-xl block mb-1">AWS IoT Core & Lambda</strong><span className="text-neutral-400 text-sm">Managed MQTT broker, serverless AI triggers & DB writes</span></div>
                      <div className="text-orange-400 font-black text-3xl ml-4 opacity-50 group-hover:opacity-100 transition-opacity">PaaS</div>
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="flex items-stretch rounded-3xl overflow-hidden border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 hover:scale-105 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] transition-all duration-500 cursor-default group">
                    <div className="w-1/3 bg-purple-500/20 p-6 flex flex-col items-center justify-center text-center"><span className="text-purple-400 font-bold text-lg mb-1">AWS Infra</span><span className="text-purple-500/70 text-xs">Raw Resources</span></div>
                    <div className="w-2/3 p-6 flex items-center justify-between">
                      <div><strong className="text-white text-xl block mb-1">EC2 & RDS PostgreSQL</strong><span className="text-neutral-400 text-sm">Virtual compute, storage & database for session history</span></div>
                      <div className="text-purple-400 font-black text-3xl ml-4 opacity-50 group-hover:opacity-100 transition-opacity">IaaS</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}



            {activeIndex === 2 && (
              <motion.div 
                key="5layer" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 400, damping: 30, staggerChildren: 0.06 }}
                className="absolute inset-0 flex flex-col bg-gradient-to-tr from-white/5 to-transparent border border-white/10 rounded-[3rem] p-4 md:p-6 pb-8 backdrop-blur-xl shadow-2xl items-center"
              >
                <div className="absolute top-0 right-0 p-12 opacity-30 pointer-events-none">
                  <div className="text-[20rem] font-black leading-none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/0">5</div>
                </div>

                <div className="text-center mb-3 md:mb-4 relative z-10">
                  <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary drop-shadow-[0_2px_10px_rgba(249,115,22,0.2)] mb-1.5">IoT Architecture</motion.h2>
                  <motion.p variants={itemVariants} className="text-primary font-mono tracking-widest uppercase text-xs">Standard 5-Layer Stack</motion.p>
                </div>

                <div className="flex flex-col flex-1 justify-center w-full max-w-2xl relative z-10 min-h-[360px]">
                  {layersData.map((layer, idx) => {
                    const isHovered = hoveredLayer === layer.id;
                    const isAnyHovered = hoveredLayer !== null;
                    const isVisible = !isAnyHovered || isHovered;

                    return (
                      <React.Fragment key={layer.id}>
                        {/* Connection Line */}
                        {idx > 0 && (
                          <div className="flex justify-center my-1.5 md:my-2">
                            <div className="w-0.5 h-3 md:h-4 bg-gradient-to-b from-white/30 to-white/10 rounded-full" />
                          </div>
                        )}

                        {/* Layer Box */}
                        <motion.div
                          animate={{ 
                            opacity: isVisible ? 1 : 0.25, 
                            scale: isHovered ? 1.04 : 1,
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          onMouseEnter={() => setHoveredLayer(layer.id)}
                          onMouseLeave={() => setHoveredLayer(null)}
                          className={`overflow-hidden rounded-xl border bg-gradient-to-r cursor-pointer transition-all duration-300 w-full relative z-10 ${
                            isHovered 
                              ? `${layer.hoverColor} ${layer.borderColor} shadow-[0_0_40px_rgba(255,255,255,0.05)]` 
                              : `${layer.color} ${layer.dashed ? 'border-dashed border-red-500/40' : layer.borderColor || 'border-blue-500/30'}`
                          }`}
                        >
                          <div className={`flex items-center gap-5 p-3 md:p-3.5 px-6`}>
                            {/* Icon block */}
                            <div className={`text-2xl md:text-3xl w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
                              {layer.icon}
                            </div>
                            
                            <div className="flex flex-col flex-1">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                                <span className="text-white font-bold text-base md:text-lg tracking-wide">{layer.name}</span>
                              </div>
                              
                              <div className="relative w-full mt-0.5 overflow-hidden min-h-[16px] md:min-h-[20px]">
                                {/* General desc (visible when not hovered) */}
                                <span className={`text-neutral-400 text-xs md:text-sm font-medium transition-all duration-300 block ${isHovered ? 'opacity-0 -translate-y-2 pointer-events-none absolute' : 'opacity-100 translate-y-0'}`}>
                                  {layer.desc}
                                </span>
                                
                                {/* Detailed info (visible when hovered) */}
                                <span className={`text-neutral-200 text-xs md:text-sm font-medium transition-all duration-300 block leading-relaxed ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none absolute'}`}>
                                  {layer.info}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* 7 LAYER - OSI Model */}
            {activeIndex === 3 && (
              <motion.div 
                key="7layer" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 400, damping: 30, staggerChildren: 0.04 }}
                className="absolute inset-0 flex flex-col md:flex-row bg-gradient-to-bl from-white/5 to-transparent border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl"
              >
                <div className="w-full md:w-1/3 text-center md:text-left flex flex-col justify-center pr-8 relative z-10">
                  <motion.div variants={itemVariants} className="text-[12rem] font-black leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/0 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)] -ml-2 mb-4">7</motion.div>
                  <motion.h2 variants={itemVariants} className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-indigo-400 drop-shadow-[0_2px_10px_rgba(129,140,248,0.2)] mb-2">OSI Model</motion.h2>
                  <motion.p variants={itemVariants} className="text-neutral-400 text-sm">Open Systems Interconnection</motion.p>
                </div>

                <div className="w-full md:w-2/3 flex gap-4 flex-1 items-end relative z-10">
                  <div className="w-1/3 flex flex-col gap-2 justify-end">
                    <motion.div variants={itemVariants}><DataUnitBox text="Data" height="h-[184px]" color="bg-white/5 text-white/50 border-white/10" /></motion.div>
                    <motion.div variants={itemVariants}><DataUnitBox text="Segments / Datagrams" height="h-14" color="bg-cyan-500/10 text-cyan-400 border-cyan-500/30" /></motion.div>
                    <motion.div variants={itemVariants}><DataUnitBox text="Packets" height="h-14" color="bg-green-500/10 text-green-400 border-green-500/30" /></motion.div>
                    <motion.div variants={itemVariants}><DataUnitBox text="Frames" height="h-14" color="bg-lime-500/10 text-lime-400 border-lime-500/30" /></motion.div>
                    <motion.div variants={itemVariants}><DataUnitBox text="Bits" height="h-14" color="bg-yellow-500/10 text-yellow-400 border-yellow-500/30" /></motion.div>
                  </div>
                  
                  <div className="w-2/3 flex flex-col gap-2">
                    <motion.div variants={itemVariants}><OsiLayerBox num={7} name="Application" desc="MQTT Pub/Sub & JSON Payloads" info="Smart Cushion Web App interaction layer." color="bg-indigo-500/20 border-indigo-500/40 text-indigo-300" /></motion.div>
                    <motion.div variants={itemVariants}><OsiLayerBox num={6} name="Presentation" desc="Data Formatting" info="Conversion of raw sensor arrays into JSON for transmission." color="bg-indigo-500/20 border-indigo-500/40 text-indigo-300" /></motion.div>
                    <motion.div variants={itemVariants}><OsiLayerBox num={5} name="Session" desc="MQTT Connection" info="Establishing and maintaining the link between ESP32 and Broker." color="bg-indigo-500/20 border-indigo-500/40 text-indigo-300" /></motion.div>
                    <motion.div variants={itemVariants}><OsiLayerBox num={4} name="Transport" desc="TCP/IP Guarantee" info="Ensuring sensor packets arrive in order via TCP Port 1883." color="bg-cyan-500/20 border-cyan-500/40 text-cyan-300" /></motion.div>
                    <motion.div variants={itemVariants}><OsiLayerBox num={3} name="Network" desc="IP Routing" info="Assigning local IP addresses to Cushion and Fog Nodes." color="bg-green-500/20 border-green-500/40 text-green-300" /></motion.div>
                    <motion.div variants={itemVariants}><OsiLayerBox num={2} name="Data Link" desc="Wi-Fi MAC Addressing" info="Managing physical addresses for wireless data frames." color="bg-lime-500/20 border-lime-500/40 text-lime-300" /></motion.div>
                    <motion.div variants={itemVariants}><OsiLayerBox num={1} name="Physical" desc="RF Signal & FSR Wiring" info="The physical pressure sensors and ESP32 radio waves." color="bg-yellow-500/20 border-yellow-500/40 text-yellow-300" /></motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SMART CUSHION ARCHITECTURE - Data Flow */}
            {activeIndex === 4 && (
              <motion.div 
                key="data-flow" custom={direction} variants={variants} initial="enter" animate="center" exit="exit" transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute inset-0 flex flex-col bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-md justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(var(--primary),0.1)_0%,transparent_70%)] pointer-events-none" />
                
                <div className="text-center mb-16 relative z-10">
                  <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-widest mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> PRACTICAL IMPLEMENTATION
                  </motion.div>
                  <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_15px_rgba(255,255,255,0.05)]">
                    From <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-400 drop-shadow-[0_2px_8px_rgba(249,115,22,0.3)] italic">Sensor</span> to <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300 drop-shadow-[0_2px_8px_rgba(6,182,212,0.3)] italic">Screen</span>
                  </motion.h2>
                </div>

                <div className="relative w-full max-w-6xl mx-auto">
                  {/* Connecting Line (Desktop) */}
                  <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-[3px] bg-white/5 -translate-y-1/2 rounded-full overflow-hidden">
                     <motion.div className="absolute top-0 bottom-0 w-64 bg-gradient-to-r from-transparent via-primary/50 to-transparent" animate={{ left: ["-20%", "120%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
                     <motion.div className="absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" animate={{ left: ["-20%", "120%"] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.8 }} />
                  </div>

                  <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-0 relative">
                    {dataNodes.map((node, i) => (
                      <motion.div 
                        key={node.id} 
                        variants={itemVariants}
                        whileHover={{ scale: 1.1, y: -5 }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="flex flex-col items-center w-full lg:w-44 group relative z-10 cursor-pointer"
                      >
                        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] flex items-center justify-center border-2 backdrop-blur-md bg-black/60 ${node.bg} ${node.border} ${node.glow ? 'shadow-[0_0_40px_rgba(var(--primary),0.3)] border-primary/50' : 'border-white/10'} relative transition-all duration-500 group-hover:border-white/30 overflow-hidden`}>
                          {node.image ? (
                            <img 
                              src={node.image} 
                              alt={node.title} 
                              className="w-14 h-14 md:w-16 md:h-16 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110" 
                            />
                          ) : (
                            <node.icon className={`w-10 h-10 md:w-12 md:h-12 ${node.color} relative z-10`} />
                          )}
                          
                          {/* Inner pulsing glow */}
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
                          <h4 className="text-white font-bold text-base md:text-lg tracking-wide mb-1 transition-colors group-hover:text-primary">{node.title}</h4>
                          
                          <div className="relative w-full h-16 flex justify-center items-start overflow-hidden">
                            {/* Default Description */}
                            <span className={`text-neutral-500 text-xs md:text-sm font-medium leading-tight transition-all duration-300 block w-full ${hoveredNode === node.id ? 'opacity-0 scale-95 pointer-events-none absolute' : 'opacity-100 scale-100'}`}>
                              {node.desc}
                            </span>
                            
                            {/* Hover Details */}
                            <span className={`${node.color} text-[11px] md:text-xs font-semibold leading-snug transition-all duration-300 block w-full px-1 ${hoveredNode === node.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute'}`}>
                              {node.details}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}
            
          </AnimatePresence>

          {/* Left Navigation Arrow — hidden on first slide */}
          {activeIndex > 0 && (
            <button 
              onClick={() => paginate(-1)} 
              className="absolute left-2 md:-left-8 lg:-left-16 xl:-left-20 top-1/2 -translate-y-1/2 p-3 md:p-3.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary),0.3)] transition-all backdrop-blur-md z-50 group hidden sm:flex"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Right Navigation Arrow — hidden on last slide */}
          {activeIndex < totalSlides - 1 && (
            <button 
              onClick={() => paginate(1)} 
              className="absolute right-2 md:-right-8 lg:-right-16 xl:-right-20 top-1/2 -translate-y-1/2 p-3 md:p-3.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary),0.3)] transition-all backdrop-blur-md z-50 group hidden sm:flex"
            >
              <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Premium Dashboard CTA — floats at bottom-right only on last slide */}
          <AnimatePresence>
            {activeIndex === totalSlides - 1 && (
              <motion.a
                href="/dashboard"
                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.92 }}
                transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.1 }}
                className="absolute -bottom-20 right-0 z-50 group hidden sm:flex flex-col items-center gap-1 cursor-pointer"
              >
                {/* Glow backdrop */}
                <span className="absolute inset-0 rounded-2xl bg-primary/15 blur-2xl scale-125 group-hover:bg-primary/30 transition-all duration-500 pointer-events-none" />
                {/* Card */}
                <span className="relative flex items-center gap-3 pl-5 pr-4 py-3.5 rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-white/10 group-hover:border-primary/50 group-hover:bg-neutral-900/90 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-neutral-500 group-hover:text-primary/70 transition-colors">Up next</span>
                    <span className="text-white font-bold text-sm tracking-wide group-hover:text-primary transition-colors">Dashboard</span>
                  </span>
                  <span className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(var(--primary),0.5)] transition-all duration-300">
                    <ChevronRight size={16} className="text-primary group-hover:text-neutral-950 group-hover:translate-x-0.5 transition-all" />
                  </span>
                </span>
              </motion.a>
            )}
          </AnimatePresence>


          {/* Dots Indicator */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50">
            {[0, 1, 2, 3, 4].map((idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  setHoveredLayer(null); // Reset layer hover states
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
  <div ref={ref} className={`${height} ${color} border rounded-xl p-3 flex items-center justify-center text-center text-xs font-bold leading-tight shadow-inner`}>
    {text}
  </div>
)));

export const OsiLayerBox = motion.create(React.forwardRef<HTMLDivElement, any>(({ num, name, desc, info, color }, ref) => (
  <div ref={ref} className={`h-14 ${color} border rounded-xl flex items-stretch overflow-hidden group/osi hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all cursor-default relative`}>
    <div className="flex-1 px-4 flex flex-col justify-center leading-tight">
      <span className="font-bold text-white text-[15px] md:text-base">{name}</span>
      <span className="text-[10px] md:text-[11px] opacity-80 group-hover/osi:hidden">{desc}</span>
      <span className="text-[10px] text-white/90 hidden group-hover/osi:block font-medium italic">{info}</span>
    </div>
    <div className="w-10 md:w-12 flex items-center justify-center font-black text-lg md:text-xl bg-black/20 border-l border-inherit group-hover/osi:bg-white/10 transition-colors">
      {num}
    </div>
  </div>
)));
