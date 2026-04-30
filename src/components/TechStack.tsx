"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Cpu, 
  Layers, 
  MessageSquare, 
  Database, 
  Zap, 
  Globe 
} from "lucide-react";

const techItems = [
  { icon: Cpu, name: "ESP32", color: "text-orange-500", delay: 0 },
  { icon: Zap, name: "MQTT", color: "text-yellow-500", delay: 0.2 },
  { icon: Layers, name: "AI/ML", color: "text-blue-500", delay: 0.4 },
  { icon: Globe, name: "Astro", color: "text-purple-500", delay: 0.1 },
  { icon: Database, name: "Cloud", color: "text-emerald-500", delay: 0.3 },
  { icon: MessageSquare, name: "React", color: "text-cyan-500", delay: 0.5 },
];

export const TechStack = () => {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            The <span className="text-primary">Powerhouse</span> Behind
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            A sophisticated blend of hardware engineering and cutting-edge software architecture.
          </p>
        </div>

        <div className="flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-2xl aspect-[16/10] bg-neutral-900/50 border border-neutral-800 rounded-[3rem] p-8 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Animated Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            
            {/* Floating Icons Area */}
            <div className="relative w-full h-40 flex items-center justify-center">
              {/* Central Glow */}
              <div className="absolute w-32 h-32 bg-primary/20 blur-[60px] rounded-full" />
              
              <div className="flex items-center gap-4 md:gap-8 relative z-10">
                {techItems.map((tech, index) => (
                  <motion.div
                    key={index}
                    animate={{ 
                      y: [0, -15, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      delay: tech.delay,
                      ease: "easeInOut"
                    }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className={`p-4 rounded-2xl bg-black border border-neutral-800 shadow-2xl ${tech.color}`}>
                      <tech.icon size={28} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-tighter">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Content Below */}
            <div className="mt-12 text-center relative z-10">
              <h3 className="text-2xl font-bold text-white mb-3">Enterprise Grade Stack</h3>
              <p className="text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Our architecture ensures 99.9% uptime and sub-100ms latency for real-time posture feedback.
              </p>
            </div>

            {/* Decorative Stars/Dots */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-1 h-1 bg-white/10 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
