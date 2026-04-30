"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
  const itemsCount = totalFeatures + 2; 
  const angleStep = 45;
  const totalRotation = angleStep * (totalFeatures - 1);

  const rotation = useTransform(
    smoothProgress, 
    [1.2 / itemsCount, (totalFeatures + 0.2) / itemsCount], 
    [0, 180]
  );

  return (
    <div ref={containerRef} className="relative h-[600vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        
        {/* Right Side: Rotating Circle */}
        <motion.div 
          style={{ 
            opacity: useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]),
          }}
          className="absolute right-[-20vw] w-[45vw] h-[45vw] flex items-center justify-center"
        >
          <motion.div
            style={{ rotate: rotation }}
            className="relative w-full h-full rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center"
          >
            {dashboardViews.map((view, index) => {
              const angle = index * -angleStep;
              // Precise active point calculation
              const activePoint = (index + 1.2) / itemsCount;
              const glowRange = 0.04; // Narrower range for sharper effect

              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    transform: `rotate(${angle}deg) translate(-22.5vw) rotate(${-angle}deg)`,
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
                      ),
                      boxShadow: useTransform(smoothProgress,
                        [activePoint - glowRange, activePoint, activePoint + glowRange],
                        ["0px 0px 0px rgba(0,0,0,0)", `0px 0px 25px ${view.glow}`, "0px 0px 0px rgba(0,0,0,0)"]
                      ),
                      backgroundColor: useTransform(smoothProgress,
                        [activePoint - glowRange, activePoint, activePoint + glowRange],
                        ["rgba(10,10,10,0.8)", "rgba(20,20,20,1)", "rgba(10,10,10,0.8)"]
                      )
                    }}
                    className={`p-5 rounded-full border-2 transition-colors z-30 ${view.color}`}
                  >
                    <view.icon size={32} />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
          <div className="absolute left-[-20px] w-20 h-[2px] bg-gradient-to-r from-primary to-transparent z-20" />
        </motion.div>

        {/* Left Side: Description + Dashboard Screenshot */}
        <div className="mr-[30vw] flex-1 pl-10 lg:pl-20">
          <div className="relative h-[80vh] flex flex-col justify-center">
            
            {/* 0. Intro */}
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0, 0.08, 0.12], [1, 1, 0]),
                y: useTransform(smoothProgress, [0, 0.08, 0.12], [0, 0, -50]),
              }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <span className="inline-flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-[0.3em] mb-6">
                <Sparkles size={14} /> Control Center
              </span>
              <h1 className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Your Health, <br/><span className="text-primary">Visualized.</span>
              </h1>
              <p className="text-xl text-neutral-400 max-w-xl">
                The PostureAI Dashboard provides a comprehensive suite of tools to monitor and analyze your sitting habits.
              </p>
            </motion.div>

            {/* Views */}
            {dashboardViews.map((view, index) => {
              const activePoint = (index + 1.2) / itemsCount;
              const range = 0.07;

              const opacity = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [0, 1, 0]);
              const y = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [40, 0, -40]);

              return (
                <motion.div
                  key={index}
                  style={{ opacity, y }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <div className="flex flex-col lg:flex-row-reverse items-center gap-10">
                    <div className="flex-1">
                      <span className={`text-sm font-mono mb-4 block ${view.color}`}>0{index + 1} / DASHBOARD VIEW</span>
                      <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                        {view.title}
                      </h2>
                      <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                        {view.description}
                      </p>
                    </div>
                    <div className="flex-1 w-full">
                      <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl shadow-primary/10">
                        <img 
                          src={view.image} 
                          alt={view.title} 
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Final CTA */}
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0.9, 0.95], [0, 1]),
                y: useTransform(smoothProgress, [0.9, 0.95], [50, 0]),
              }}
              className="absolute inset-0 flex flex-col justify-center items-center text-center"
            >
              <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
                Take Command of <br/><span className="text-primary">Your Wellbeing.</span>
              </h2>
              <div className="flex gap-4">
                <button className="px-10 py-5 bg-primary text-white rounded-full font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                  Launch Live Demo
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
