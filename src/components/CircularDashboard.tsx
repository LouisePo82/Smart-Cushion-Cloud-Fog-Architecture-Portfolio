"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { 
  Activity, 
  BarChart3, 
  MessageSquare, 
  History, 
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const dashboardViews = [
  {
    title: "Real-time Monitoring",
    description: "Experience zero-latency posture tracking with our 9-point pressure heatmap. Monitor sensor values and system status instantly.",
    icon: Activity,
    image: "/dashboard-1.png",
    color: "text-blue-500",
    glow: "rgba(59, 130, 246, 0.5)"
  },
  {
    title: "Weekly Progression",
    description: "Track your long-term alignment trends and see how your posture improves over time with detailed weekly analytics.",
    icon: BarChart3,
    image: "/dashboard-2.png",
    color: "text-emerald-500",
    glow: "rgba(16, 185, 129, 0.5)"
  },
  {
    title: "Performance Analysis",
    description: "Deep dive into your sitting habits. Identify your best and worst days to make data-driven health decisions.",
    icon: ShieldCheck,
    image: "/dashboard-3.png",
    color: "text-purple-500",
    glow: "rgba(168, 85, 247, 0.5)"
  },
  {
    title: "AI Health Advisor",
    description: "Interact with our specialized AI model to receive personalized ergonomic advice and stretching reminders.",
    icon: MessageSquare,
    image: "/dashboard-4.png",
    color: "text-cyan-500",
    glow: "rgba(6, 182, 212, 0.5)"
  },
  {
    title: "Session History",
    description: "Review every sitting session in detail. Export logs for medical consultations or personal health tracking.",
    icon: History,
    image: "/dashboard-5.png",
    color: "text-orange-500",
    glow: "rgba(249, 115, 22, 0.5)"
  },
];

export const CircularDashboard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const sections = Array.from({ length: 7 });
  const itemsCount = sections.length; 
  const denominator = itemsCount - 1; // Correct divisor for scroll segments

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.round(latest * denominator);
    if (index !== activeSlide) setActiveSlide(index);
  });

  const angleStep = 45;

  const rotation = useTransform(
    smoothProgress, 
    [1 / denominator, 5 / denominator], 
    [0, 180]
  );

  const navigateTo = (index: number) => {
    const targetIndex = Math.max(0, Math.min(itemsCount - 1, index));
    const containerTop = containerRef.current?.offsetTop || 0;
    window.scrollTo({
      top: containerTop + (targetIndex * window.innerHeight),
      behavior: 'smooth'
    });
  };

  return (
    <div ref={containerRef} className="relative h-[700vh] bg-black">
      {/* Real Snap Points */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        {sections.map((_, i) => (
          <div key={i} className="h-screen w-full snap-start" />
        ))}
      </div>

      <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden touch-none lg:touch-auto">
        
        {/* Right Side: CIRCULAR UI */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [0.5 / denominator, 1 / denominator, 5 / denominator, 5.5 / denominator], [0, 1, 1, 0]),
          }}
          className="hidden lg:flex absolute right-[-19vw] w-[38vw] h-[38vw] items-center justify-center"
        >
          <div className="absolute inset-[-2px] rounded-full border border-primary/30 blur-[2px] opacity-50" />
          <motion.div
            style={{ rotate: rotation }}
            className="relative w-full h-full rounded-full border-2 border-primary/20 bg-primary/5 flex items-center justify-center shadow-[inset_0_0_50px_rgba(var(--primary),0.1)]"
          >
            {dashboardViews.map((view, index) => {
              const angle = index * -angleStep;
              const activePoint = (index + 1) / denominator;
              const glowRange = 0.04;

              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    transform: `rotate(${angle}deg) translate(-19vw) rotate(${-angle}deg)`,
                  }}
                >
                  <motion.div 
                    style={{
                      scale: useTransform(smoothProgress, 
                        [activePoint - glowRange, activePoint, activePoint + glowRange], 
                        [0.8, 1.25, 0.8]
                      ),
                      borderColor: useTransform(smoothProgress,
                        [activePoint - glowRange, activePoint, activePoint + glowRange],
                        ["rgba(255,255,255,0.1)", "var(--primary)", "rgba(255,255,255,0.1)"]
                      )
                    }}
                    className={`p-5 rounded-full bg-neutral-900 border-2 transition-colors z-30 ${view.color}`}
                  >
                    <view.icon size={28} />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
          <div className="absolute left-[-20px] w-20 h-[3px] bg-gradient-to-r from-primary to-transparent z-20 shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
        </motion.div>

        {/* Intro Illustration */}
        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0, 0.05 / denominator, 0.5 / denominator], [1, 1, 0]),
            scale: useTransform(smoothProgress, [0, 0.5 / denominator], [1, 0.9]),
            x: useTransform(smoothProgress, [0, 0.5 / denominator], [0, 100]),
            pointerEvents: "none"
          }}
          className="absolute right-0 lg:right-[22vw] w-full lg:w-[40vw] h-[30vh] lg:h-auto flex items-center justify-center top-20 lg:top-auto z-0 opacity-20 lg:opacity-100"
        >
          <div className="relative w-[80%] lg:w-full max-w-xl aspect-[4/3] rounded-[2.5rem] overflow-hidden border-2 border-white/10 shadow-2xl shadow-primary/20 bg-neutral-900/30 backdrop-blur-sm">
             <img 
               src="/dashboard-intro.png" 
               alt="User tracking posture" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* CONTENT AREA */}
        <div className="w-full h-full relative">
          
          {/* Main Slide Area */}
          <div className="absolute inset-0 lg:mr-[25vw] px-6 lg:pl-24">
            <div className="relative h-full flex flex-col justify-center">
              
              {/* Intro Slide */}
              <motion.div
                style={{
                  opacity: useTransform(smoothProgress, [0, 0.5 / denominator, 1 / denominator], [1, 1, 0]),
                  y: useTransform(smoothProgress, [0, 0.5 / denominator, 1 / denominator], [0, 0, -30]),
                  pointerEvents: useTransform(smoothProgress, [0, 0.5 / denominator, 1 / denominator], ["auto", "auto", "none"])
                }}
                className="absolute inset-0 flex flex-col justify-center text-center lg:text-left z-10"
              >
                <div className="flex flex-col items-center lg:items-start">
                  <span className="inline-flex items-center gap-2 text-primary text-[10px] lg:text-sm font-mono uppercase tracking-[0.3em] mb-8">
                    <Sparkles size={16} /> Control Center
                  </span>
                  <h1 className="text-4xl lg:text-9xl font-bold text-white mb-8 leading-tight tracking-tighter">
                    Your Health, <br/><span className="text-primary italic font-black">Visualized.</span>
                  </h1>
                  <p className="text-base lg:text-3xl text-neutral-400 max-w-2xl leading-relaxed font-medium text-center lg:text-left">
                    The PostureAI Dashboard provides a comprehensive suite of tools to monitor and analyze your sitting habits in real-time.
                  </p>
                </div>
              </motion.div>

              {/* View Slides */}
              {dashboardViews.map((view, index) => {
                const activePoint = (index + 1) / denominator;
                const range = 0.03;

                const opacity = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [0, 1, 0]);
                const y = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [30, 0, -30]);
                const scale = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [0.95, 1, 0.95]);

                return (
                  <motion.div
                    key={index}
                    style={{ 
                      opacity, 
                      y,
                      scale,
                      pointerEvents: useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], ["none", "auto", "none"])
                    }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-20">
                      <div className="flex-1 text-center lg:text-left">
                        <span className={`text-xs lg:text-sm font-mono mb-6 lg:mb-8 block ${view.color} uppercase tracking-widest`}>0{index + 1} / DASHBOARD VIEW</span>
                        <h2 className="text-3xl lg:text-8xl font-bold text-white mb-6 lg:mb-10 tracking-tighter">
                          {view.title}
                        </h2>
                        <p className="text-base lg:text-3xl text-neutral-400 leading-relaxed font-medium mb-10">
                          {view.description}
                        </p>
                      </div>
                      <div className="flex-1 w-full max-w-sm lg:max-w-none mx-auto">
                        <div className="rounded-2xl lg:rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-2xl shadow-primary/20 bg-neutral-900/30 backdrop-blur-sm p-2 lg:p-4">
                          <img 
                            src={view.image} 
                            alt={view.title} 
                            className="w-full h-auto object-cover rounded-xl lg:rounded-[2.5rem]"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* FINAL CTA */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [5.5 / denominator, 6 / denominator, 1], [0, 1, 1]),
              scale: useTransform(smoothProgress, [5.5 / denominator, 6 / denominator], [0.9, 1]),
              pointerEvents: useTransform(smoothProgress, [5.5 / denominator, 6 / denominator, 1], ["none", "auto", "auto"])
            }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80"
          >
             <div className="text-center px-6 w-full max-w-4xl relative z-10">
                <h2 className="text-4xl lg:text-9xl font-bold text-white mb-12 lg:mb-16 tracking-tighter">
                  Take Command of <br/><span className="text-primary italic font-black">Your Wellbeing.</span>
                </h2>
                <div className="flex flex-col items-center gap-8">
                  <a href="https://smart-cushion-app.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto relative z-20">
                    <button className="w-full sm:w-auto px-10 py-5 lg:px-16 lg:py-8 bg-white text-black rounded-full font-bold text-xl lg:text-3xl hover:bg-primary hover:text-white transition-all shadow-2xl cursor-pointer">
                       Try Demo
                    </button>
                  </a>
                  <p className="text-neutral-500 font-mono text-xs lg:text-lg tracking-widest uppercase">Experience the live data flow</p>
                </div>
             </div>
          </motion.div>
        </div>

        {/* Mobile Navigation Arrows */}
        <div className="flex lg:hidden absolute bottom-8 left-0 w-full justify-between px-6 z-[100] pointer-events-none">
          <button 
            onClick={() => navigateTo(activeSlide - 1)}
            className={`p-4 rounded-full bg-black/80 border border-white/20 text-white pointer-events-auto active:scale-90 transition-all backdrop-blur-lg ${activeSlide === 0 ? "opacity-30" : "opacity-100"}`}
            disabled={activeSlide === 0}
          >
            <ChevronLeft size={32} />
          </button>
          <button 
            onClick={() => navigateTo(activeSlide + 1)}
            className={`p-4 rounded-full bg-primary text-white pointer-events-auto active:scale-90 transition-all shadow-2xl shadow-primary/40 ${activeSlide === denominator ? "opacity-30" : "opacity-100"}`}
            disabled={activeSlide === denominator}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </div>
  );
};
