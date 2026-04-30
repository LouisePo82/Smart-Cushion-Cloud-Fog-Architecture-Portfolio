import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle, CheckCircle2, Info } from 'lucide-react';

export const MonitorView = () => {
  // Simulated pressure data (0 to 100)
  const pressurePoints = [
    { id: 'FL', val: 85 }, { id: 'FM', val: 90 }, { id: 'FR', val: 82 },
    { id: 'ML', val: 45 }, { id: 'MM', val: 20 }, { id: 'MR', val: 38 },
    { id: 'BL', val: 12 }, { id: 'BM', val: 5 },  { id: 'BR', val: 8 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Left: Pressure Map */}
      <div className="lg:col-span-2 bg-neutral-900/40 border border-neutral-800 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-6 left-8">
          <h3 className="text-white font-bold mb-1">Pressure Map</h3>
          <p className="text-xs text-neutral-500 uppercase tracking-widest">Top-down View</p>
        </div>

        <div className="grid grid-cols-3 gap-6 relative z-10">
          {pressurePoints.map((point) => (
            <motion.div
              key={point.id}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: 1,
                backgroundColor: point.val > 70 ? 'rgba(59, 130, 246, 0.8)' : 
                                 point.val > 30 ? 'rgba(59, 130, 246, 0.3)' : 
                                 'rgba(255, 255, 255, 0.05)'
              }}
              className="w-24 h-24 rounded-2xl border border-white/5 flex flex-col items-center justify-center transition-colors duration-500 shadow-2xl"
            >
              <span className="text-[10px] font-bold text-white/40 mb-1">{point.id}</span>
              <span className="text-xl font-bold text-white">{point.val}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-4 bg-white/5 border border-white/10 rounded-2xl w-full max-w-md">
          <div className="flex items-center gap-3 text-emerald-400">
            <CheckCircle2 size={18} />
            <span className="text-sm font-bold">Optimal Sitting Position Detected</span>
          </div>
          <p className="text-xs text-neutral-400 mt-1 ml-7 italic">
            "Your spinal alignment is currently 94% correct. Keep it up!"
          </p>
        </div>
      </div>

      {/* Right: Status Info */}
      <div className="space-y-6">
        {/* Session Timer Card */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-neutral-400 text-sm font-medium">Session Time</span>
            <Clock size={16} className="text-primary" />
          </div>
          <div className="text-4xl font-bold text-white mb-2 font-mono tracking-tight">01:24:52</div>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            Started at 02:30 PM
          </div>
        </div>

        {/* Alert Stats Card */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-3xl p-6">
          <h4 className="text-neutral-400 text-sm font-medium mb-6">Alert Summary</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
              <p className="text-[10px] text-red-500 font-bold uppercase mb-1">Poor Posture</p>
              <p className="text-2xl font-bold text-white">12m</p>
            </div>
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
              <p className="text-[10px] text-orange-500 font-bold uppercase mb-1">Total Alerts</p>
              <p className="text-2xl font-bold text-white">4</p>
            </div>
          </div>
        </div>

        {/* Live Correction Card */}
        <div className="bg-primary/10 border border-primary/20 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Info size={48} />
          </div>
          <h4 className="text-primary text-sm font-bold mb-4 flex items-center gap-2">
            <AlertCircle size={16} />
            Live Guidance
          </h4>
          <p className="text-sm text-neutral-300 leading-relaxed">
            We noticed a slight right-leaning tendency. Try adjusting your position 5cm to the left for better balance.
          </p>
          <button className="mt-6 w-full py-3 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            Start Calibration
          </button>
        </div>
      </div>
    </div>
  );
};
