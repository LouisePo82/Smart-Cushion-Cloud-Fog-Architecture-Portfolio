"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { 
  Activity, 
  BarChart3, 
  MessageSquare, 
  History, 
  ShieldCheck,
  Sparkles,
  ArrowRight
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const totalFeatures = dashboardViews.length;
  const sections = Array.from({ length: 7 });
  const itemsCount = sections.length; 
  const angleStep = 45;

  const rotation = useTransform(
    smoothProgress, 
    [1 / itemsCount, 5 / itemsCount], 
    [0, 180]
  );

  return (
    <div ref={containerRef} className="relative h-[450vh] bg-black">
      {/* Snap Points Container */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-y-auto scroll-snap-y-proximity lg:scroll-snap-y-mandatory">
        {sections.map((_, i) => (
          <div key={i} className="h-[100dvh] w-full snap-start" />
        ))}
      </div>

      <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden">
        
        {/* Right Side: CIRCULAR UI - HIDDEN ON MOBILE */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [0.14, 0.18, 0.8, 0.85], [0, 1, 1, 0]),
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
              const activePoint = (index + 1) / itemsCount;
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

        {/* 0. Intro Illustration - NOW SEPARATE AND RESPONSIVE */}
        <motion.div
          style={{
            opacity: useTransform(smoothProgress, [0, 0.05, 0.1], [1, 1, 0]),
            scale: useTransform(smoothProgress, [0, 0.1], [1, 0.9]),
            x: useTransform(smoothProgress, [0, 0.1], [0, 100]),
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
                  opacity: useTransform(smoothProgress, [0, 0.05, 0.1], [1, 1, 0]),
                  y: useTransform(smoothProgress, [0, 0.05, 0.1], [0, 0, -50]),
                  pointerEvents: useTransform(smoothProgress, [0, 0.05, 0.1], ["auto", "auto", "none"])
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
                  <p className="text-base lg:text-3xl text-neutral-400 max-w-2xl leading-relaxed font-medium">
                    The PostureAI Dashboard provides a comprehensive suite of tools to monitor and analyze your sitting habits in real-time.
                  </p>
                </div>
              </motion.div>

              {/* View Slides */}
              {dashboardViews.map((view, index) => {
                const activePoint = (index + 1) / itemsCount;
                const range = 0.07;

                const opacity = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [0, 1, 0]);
                const y = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [20, 0, -20]);

                return (
                  <motion.div
                    key={index}
                    style={{ 
                      opacity, 
                      y,
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
              opacity: useTransform(smoothProgress, [0.8, 0.88, 1], [0, 1, 1]),
              scale: useTransform(smoothProgress, [0.8, 0.88], [0.9, 1]),
              pointerEvents: useTransform(smoothProgress, [0.8, 0.88, 1], ["none", "auto", "auto"])
            }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/80"
          >
             <div className="absolute inset-0 -z-10 overflow-hidden hidden md:block">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <motion.div 
                   animate={{
                     scale: [1, 1.2, 1],
                     opacity: [0.1, 0.2, 0.1],
                   }}
                   transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 blur-[120px] rounded-full"
                />
             </div>

             <div className="text-center px-6 w-full max-w-4xl">
                <h2 className="text-4xl lg:text-9xl font-bold text-white mb-12 lg:mb-16 tracking-tighter">
                  Take Command of <br/><span className="text-primary italic font-black">Your Wellbeing.</span>
                </h2>
                <div className="flex flex-col items-center gap-8">
                  <a href="/app" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-10 py-5 lg:px-16 lg:py-8 bg-white text-black rounded-full font-bold text-xl lg:text-3xl hover:bg-primary hover:text-white transition-all shadow-2xl">
                       How can I track my health?
                    </button>
                  </a>
                  <p className="text-neutral-500 font-mono text-xs lg:text-lg tracking-widest uppercase">Start your health journey today</p>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
      
      <style jsx>{`
        .scroll-snap-y-proximity {
          scroll-snap-type: y proximity;
        }
        @media (min-width: 1024px) {
          .lg\:scroll-snap-y-mandatory {
            scroll-snap-type: y mandatory;
          }
        }
      `}</style>
    </div>
  );
};
