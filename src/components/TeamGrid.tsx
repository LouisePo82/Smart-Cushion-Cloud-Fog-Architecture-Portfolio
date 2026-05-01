import React from 'react';
import { motion } from 'framer-motion';

const team = [
  {
    name: "To Nguyen Tan Phuong",
    role: "Hardware & Edge Engineer",
    image: "/Phuong.jpg",
    bg: "bg-blue-500/20",
    description: "Hardware architecture specialist. Phuong focuses on sensor integration and optimizing edge computing performance."
  },
  {
    name: "Tran Viet Nam",
    role: "Fog & Hardware Integration",
    image: "/Nam.png",
    bg: "bg-purple-500/20",
    description: "Architects scalable local infrastructures and bridges the gap between hardware sensors and cloud services."
  },
  {
    name: "Nguyen Thao Huong",
    role: "AI Consultant & Model Designer",
    image: "/Huong.png",
    bg: "bg-cyan-500/20",
    description: "AI expert specializing in specialized model design and optimizing neural network architectures for health diagnostics."
  },
  {
    name: "Dong Boi Thi",
    role: "Cloud & Dashboard Developer",
    image: "/Thi.jpg",
    bg: "bg-emerald-500/20",
    description: "Specializes in cloud backend frameworks and real-time data visualization systems, ensuring seamless data flow."
  },
  {
    name: "Hoang Mai Vu",
    role: "Real-time Dashboard Architect",
    image: "/Vu.jpg",
    bg: "bg-orange-500/20",
    description: "Architects high-performance real-time dashboards, specializing in seamless data visualization and sub-100ms MQTT telemetry."
  }
];

export const TeamGrid = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 py-8">
        {team.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -15, scale: 1.05 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: index * 0.1
            }}
            className="group relative flex flex-col bg-neutral-900/60 border border-white/10 p-6 rounded-[2.5rem] hover:border-primary/50 transition-all duration-500 cursor-pointer backdrop-blur-md shadow-2xl"
          >
            {/* Ambient Background Glow on Hover */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl -z-10" />

            {/* Image Container */}
            <div className={`relative w-full aspect-square rounded-[1.8rem] overflow-hidden mb-8 ${item.bg} border border-white/5`}>
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Info */}
            <div className="space-y-3 text-center">
              <h3 className="text-xl lg:text-2xl font-black text-white leading-tight">{item.name}</h3>
              <p className="text-xs lg:text-sm text-primary font-mono uppercase tracking-[0.2em] font-bold">{item.role}</p>
            </div>

            {/* Separator */}
            <div className="my-6 border-t border-white/10 w-full group-hover:border-primary/30 transition-colors" />

            {/* Description */}
            <p className="text-sm lg:text-base text-neutral-400 leading-relaxed text-center font-medium line-clamp-4 group-hover:text-neutral-200 transition-colors">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </>
  );
};
