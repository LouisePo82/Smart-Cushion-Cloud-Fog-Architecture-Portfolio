"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { AlertCircle, Zap, Shield, Heart } from "lucide-react";

const solutions = [
  {
    title: "The Silent Crisis",
    problem: "Poor sitting habits cost the global economy $120B in healthcare every year.",
    solution: "Smart-Cushion detects micro-posture shifts before they become chronic pain.",
    icon: AlertCircle,
    color: "text-red-500",
    image: "/problem-1.png"
  },
  {
    title: "Concentration Drain",
    problem: "Discomfort reduces cognitive performance by 25% within just 2 hours.",
    solution: "Stay in the flow zone with gentle ergonomic reminders that keep you focused.",
    icon: Zap,
    color: "text-yellow-500",
    image: "/problem-2.png"
  },
  {
    title: "Spinal Integrity",
    problem: "Long-term slouching leads to permanent vertebral misalignment.",
    solution: "Our medical-grade sensors ensure your spine maintains its natural S-curve.",
    icon: Shield,
    color: "text-blue-500",
    image: "/problem-3.png"
  },
  {
    title: "Health Ecosystem",
    problem: "Most health tracking stops the moment you sit down at your desk.",
    solution: "Integrate your sitting data into your complete wellness profile automatically.",
    icon: Heart,
    color: "text-emerald-500",
    image: "/problem-4.png"
  },
];

export const SolutionsScroll = () => {
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

  // Hyper-accelerated height
  const sections = Array.from({ length: 6 });
  const itemsCount = sections.length;

  return (
    <div ref={containerRef} className="relative h-[350vh] bg-neutral-950 scroll-snap-container">
      {/* Invisible Snap Points (Hyper-fast) */}
      <div className="absolute inset-0 pointer-events-none">
        {sections.map((_, i) => (
          <div key={i} className="h-[calc(350vh/6)] w-full" style={{ scrollSnapAlign: "start" }} />
        ))}
      </div>

      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        {/* Atmospheric Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#3b82f633,transparent_70%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="relative h-[80vh]">
            
            {/* Intro Slide */}
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0, 0.06, 0.12], [1, 1, 0]),
                y: useTransform(smoothProgress, [0, 0.06, 0.12], [0, 0, -50]),
              }}
              className="absolute inset-0 flex flex-col justify-center items-center text-center"
            >
              <h2 className="text-5xl lg:text-8xl font-bold text-white mb-8 tracking-tighter">
                A Journey through <br/>
                <span className="text-primary italic text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
                  the Problem.
                </span>
              </h2>
              <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
                Understanding the silent impact of sedentary lifestyles is the first step toward a revolutionary recovery.
              </p>
            </motion.div>

            {/* Solution Slides */}
            {solutions.map((item, index) => {
              const activePoint = (index + 1.2) / itemsCount;
              const range = 0.08;

              const opacity = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [0, 1, 0]);
              const x = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [100, 0, -100]);
              const scale = useTransform(smoothProgress, [activePoint - range, activePoint, activePoint + range], [0.9, 1, 0.9]);

              return (
                <motion.div
                  key={index}
                  style={{ opacity, x, scale }}
                  className="absolute inset-0 flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
                >
                  {/* Left Side: Cinematic Illustration */}
                  <div className="flex-1 w-full h-[40vh] lg:h-[60vh] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative group">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8">
                       <div className={`p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 ${item.color}`}>
                         <item.icon size={32} />
                       </div>
                    </div>
                  </div>

                  {/* Right Side: Text Content */}
                  <div className="flex-1 text-left">
                    <span className={`text-sm font-mono uppercase tracking-widest mb-4 block ${item.color}`}>
                      Challenge {index + 1}
                    </span>
                    <h3 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                      {item.title}
                    </h3>
                    
                    <div className="space-y-8">
                      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <p className="text-red-400/80 text-sm font-bold uppercase mb-2">The Crisis</p>
                        <p className="text-lg text-neutral-300">{item.problem}</p>
                      </div>
                      
                      <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 backdrop-blur-sm">
                        <p className="text-primary text-sm font-bold uppercase mb-2">The Solution</p>
                        <p className="text-lg text-white font-medium">{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Closing Slide */}
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0.85, 0.95], [0, 1]),
                y: useTransform(smoothProgress, [0.85, 0.95], [50, 0]),
              }}
              className="absolute inset-0 flex flex-col justify-center items-center text-center"
            >
              <h2 className="text-4xl lg:text-7xl font-bold text-white mb-6">
                Check our <br/><span className="text-primary italic">solution.</span>
              </h2>
              <p className="text-xl text-neutral-400 max-w-xl mb-10">
                Join thousands of office professionals who have already reclaimed their spinal health.
              </p>
              <a href="/features" className="px-12 py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-primary hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                View Our Product
              </a>
            </motion.div>

          </div>
        </div>
      </div>
      
      <style jsx>{`
        .scroll-snap-container {
          scroll-snap-type: y mandatory;
        }
      `}</style>
    </div>
  );
};
