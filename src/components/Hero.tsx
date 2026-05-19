"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Sparkles, Home, School, Briefcase } from "lucide-react";

const capyQuotes = [
  "Sit tall, stand proud! 🧘‍♂️",
  "Don't forget to stretch! 🤸‍♂️",
  "Spinal check! Back straight! 📐",
  "You're doing great, sit well! 🌟",
  "Take a deep breath... 💨",
  "Keep your feet flat on the floor! 👣",
  "Let's win some Gacha skins today! 🎁",
  "Spine health is key to productivity! 💎",
];

const CapyCompanion = () => {
  const [quote, setQuote] = useState(capyQuotes[0]);
  
  const triggerRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * capyQuotes.length);
    setQuote(capyQuotes[randomIndex]);
  };

  return (
    <div 
      className="absolute -bottom-12 -left-12 w-28 h-28 md:w-36 md:h-36 z-[60] cursor-pointer group"
      onMouseEnter={triggerRandomQuote}
      onClick={triggerRandomQuote}
    >
      {/* Speech Bubble */}
      <div
        className="absolute bottom-[115%] left-1/2 -translate-x-1/2 w-48 md:w-56 bg-neutral-900/95 border border-primary/30 backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] pointer-events-none text-center opacity-0 scale-90 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 z-50 origin-bottom"
      >
        <p className="text-white text-xs font-semibold leading-relaxed tracking-wide font-sans">{quote}</p>
        {/* Arrow pointing down */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-neutral-900/95" />
      </div>

      {/* Floating Aura */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-tr from-primary/30 via-cyan-500/20 to-purple-500/30 blur-[20px] opacity-50"
      />

      {/* Floating Sparkles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 20, x: i * 30 - 30, opacity: 0, scale: 0.5 }}
          animate={{ 
            y: [-25, -70],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            rotate: [0, 180]
          }}
          transition={{ 
            duration: 3 + i, 
            repeat: Infinity, 
            delay: i * 1.5,
            ease: "easeOut"
          }}
          className="absolute top-1/4 left-1/2 text-primary pointer-events-none"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </motion.div>
      ))}

      {/* High-Tech Glowing Pulse Ring */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary to-cyan-500 opacity-40 blur-[8px] group-hover:opacity-75 transition-opacity duration-300" />
      
      {/* Outer Scanner Border */}
      <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-primary via-cyan-500/50 to-purple-600/30 opacity-75 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Rounded Squircle Glassmorphic Frame */}
      <div className="absolute inset-1 rounded-3xl bg-neutral-950/85 border border-white/10 backdrop-blur-md overflow-hidden flex items-center justify-center shadow-2xl">
        <motion.div
          animate={{ 
            y: [0, -4, 0],
            scaleY: [1, 1.02, 1],
            scaleX: [1, 1.01, 1]
          }}
          transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            scaleY: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            scaleX: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-full h-full flex items-center justify-center relative"
        >
          <img 
            src="/capypara.gif" 
            alt="Capybara Mascot" 
            className="w-full h-full object-cover scale-[1.0] translate-y-[3px] filter group-hover:brightness-110 transition-all duration-300" 
          />
        </motion.div>

        {/* Cyber Grid Overlay */}
        <div className="absolute inset-0 rounded-3xl bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:8px_8px] pointer-events-none" />
      </div>

      {/* AI Assistant Pulse Indicator */}
      <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-neutral-900 border border-white/20 flex items-center justify-center z-10 shadow-lg">
        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
      </div>
    </div>
  );
};

const environments = [
  { id: "office", label: "Modern Office", icon: Briefcase, image: "/hero-office.png", color: "from-blue-500/20" },
  { id: "classroom", label: "Smart Classroom", icon: School, image: "/hero-classroom.png", color: "from-primary/20" },
  { id: "home", label: "Home & Living", icon: Home, image: "/hero.png", color: "from-purple-500/20" },
];

export default function Hero() {
  const [activeEnv, setActiveEnv] = useState(environments[0]);

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-neutral-300 tracking-wide uppercase">AI-Powered Ergonomic Excellence</span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                Improve your sitting with <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_auto] animate-gradient-x italic">
                  Capybara Companion.
                </span>
              </h1>
              
              <p className="text-lg md:text-2xl text-neutral-400 mb-10 max-w-2xl leading-relaxed font-medium">
                Transform your sitting habits with our IoT smart cushion. 
                Meet your AI health companion, detect posture in real-time, and embark on a gamified journey to spinal wellness.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <a href="/solutions">
                  <Button size="lg" variant="outline" className="border-cyan-500/40 hover:border-cyan-400 bg-cyan-950/20 hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 rounded-full px-8 h-14 text-lg font-bold backdrop-blur-md transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]">
                    What We Solve
                  </Button>
                </a>
                <a href="/features">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-neutral-950 rounded-full px-8 h-14 text-lg font-bold group shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all duration-300">
                    Explore the Solution
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </div>


            </motion.div>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col items-center gap-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-square max-w-2xl mx-auto"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${activeEnv.color} blur-[150px] rounded-full transition-all duration-700`} />
              
              <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                <motion.div
                  key={activeEnv.id}
                  initial={{ opacity: 0.5, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full"
                >
                  <img 
                    src={activeEnv.image} 
                    alt={activeEnv.label} 
                    className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] rounded-[2rem]"
                  />
                  
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">System Online</span>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Mascot */}
                <CapyCompanion />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl relative z-50"
            >
               {environments.map((env) => (
                 <button
                   key={env.id}
                   onClick={() => setActiveEnv(env)}
                   className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                     activeEnv.id === env.id 
                       ? "bg-white text-black shadow-xl scale-105" 
                       : "text-neutral-400 hover:text-white hover:bg-white/5"
                   }`}
                 >
                   <env.icon size={16} />
                   <span>{env.label}</span>
                 </button>
               ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
