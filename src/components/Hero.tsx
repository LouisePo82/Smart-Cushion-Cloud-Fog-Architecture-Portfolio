import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Activity, Cpu, Layers, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

const heroImages = [
  {
    url: "/hero.png",
    context: "Premium Workspace",
    label: "Professional Office"
  },
  {
    url: "/hero-office.png",
    context: "Corporate Environment",
    label: "Modern Office"
  },
  {
    url: "/hero-classroom.png",
    context: "Academic Focus",
    label: "University Classroom"
  }
];

const Hero = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const { scrollYProgress } = useScroll();

  const nextImg = () => setCurrentImg((prev) => (prev + 1) % heroImages.length);
  const prevImg = () => setCurrentImg((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <section className="relative pt-32 pb-40 overflow-hidden min-h-[120vh]">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Side: Content */}
          <div className="flex-1 text-center lg:text-left z-20 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-6">
                <Zap className="w-3 h-3" />
                Next-Gen Ergonomics
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                Transform Your Sitting <span className="text-primary">Experience</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0">
                The world's first AI-powered smart cushion that detects posture in real-time, 
                prevents back pain, and integrates seamlessly with your digital health ecosystem.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a href="/solutions">
                  <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold group">
                    What we solve
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-semibold">
                  Watch Demo
                </Button>
              </div>

              {/* Integrated Tech Stack Card */}
              <div className="mt-12 flex flex-col items-center lg:items-start w-full">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-6">From Your Office to the Cloud</p>
                
                <div className="relative w-full bg-neutral-900/40 border border-neutral-800 rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center justify-center overflow-hidden">
                  {/* Central Glow */}
                  <div className="absolute w-48 h-48 bg-primary/10 blur-[80px] rounded-full" />
                  
                  <div className="flex items-center gap-6 md:gap-10 relative z-10">
                    {[
                      { icon: Cpu, name: "ESP32", color: "text-orange-500", delay: 0 },
                      { icon: Zap, name: "MQTT", color: "text-yellow-500", delay: 0.2 },
                      { icon: Layers, name: "AI/ML", color: "text-blue-500", delay: 0.4 },
                      { icon: Activity, name: "Health", color: "text-emerald-500", delay: 0.1 },
                    ].map((tech, index) => (
                      <motion.div
                        key={index}
                        animate={{ 
                          y: [0, -12, 0],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity, 
                          delay: tech.delay,
                          ease: "easeInOut"
                        }}
                        className="flex flex-col items-center gap-3"
                      >
                        <div className={`p-4 rounded-2xl bg-black border border-neutral-800 shadow-2xl ${tech.color}`}>
                          <tech.icon size={28} />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                          {tech.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 text-center relative z-10">
                    <h3 className="text-lg font-bold text-white mb-2">Enterprise Grade Stack</h3>
                    <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
                      Our architecture ensures 99.9% uptime and sub-100ms latency for real-time posture feedback and cloud synchronization.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Image Slider */}
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 group"
            >
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border bg-neutral-900 aspect-[4/5] lg:aspect-square flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImg}
                    src={heroImages[currentImg].url}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full h-full object-cover"
                    alt={heroImages[currentImg].label}
                  />
                </AnimatePresence>
                
                {/* Overlay with Context Label */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex items-end justify-between">
                  <div className="text-white">
                    <h4 className="text-xl font-bold">{heroImages[currentImg].label}</h4>
                  </div>
                  <div className="flex gap-2">
                    {heroImages.map((_, i) => (
                      <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImg ? 'bg-primary w-4' : 'bg-white/30'}`} />
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button 
                  onClick={prevImg}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImg}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
