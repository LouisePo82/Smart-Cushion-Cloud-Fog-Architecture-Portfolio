import React from 'react';
import { motion } from 'framer-motion';

const team = [
  {
    name: "To Nguyen Tan Phuong",
    role: "Hardware & Edge Engineer",
    image: "/member1.png",
    bg: "bg-blue-500/20",
    description: "Hardware architecture specialist. Phuong focuses on sensor integration, PCB design, and optimizing edge computing performance for zero-latency detection."
  },
  {
    name: "Tran Viet Nam",
    role: "Fog & Hardware Integration",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3000&auto=format&fit=crop",
    bg: "bg-purple-500/20",
    description: "Architects scalable local infrastructures and bridges the gap between hardware sensors and cloud services through advanced Fog nodes."
  },
  {
    name: "Dong Boi Thi",
    role: "Cloud & Dashboard Developer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=3000&auto=format&fit=crop",
    bg: "bg-emerald-500/20",
    description: "Specializes in cloud backend frameworks and real-time data visualization systems, ensuring seamless data flow and accessible user dashboards."
  },
  {
    name: "Hoang Mai Vu",
    role: "Mobile App Developer",
    image: "/member4.png",
    bg: "bg-orange-500/20",
    description: "Designs clear, elegant mobile experiences, blending visual storytelling with empathetic user research to help users track their health goals."
  }
];

export const TeamGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-10">
      {team.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          className="flex flex-col bg-neutral-900/50 border border-neutral-800 p-6 rounded-[2rem] hover:border-primary/50 transition-colors duration-300 cursor-pointer"
        >
          {/* Image Container */}
          <div className={`relative w-full aspect-square rounded-[1.5rem] overflow-hidden mb-6 ${item.bg}`}>
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>

          {/* Info */}
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">{item.name}</h3>
            <p className="text-sm text-neutral-400 font-medium">{item.role}</p>
          </div>

          {/* Dashed Separator */}
          <div className="my-6 border-t border-dashed border-neutral-700 w-full" />

          {/* Description */}
          <p className="text-sm text-neutral-400 leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
};
