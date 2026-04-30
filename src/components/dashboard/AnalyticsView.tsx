import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Calendar, Download } from 'lucide-react';

export const AnalyticsView = () => {
  const weeklyData = [
    { day: 'M', val: 65 }, { day: 'T', val: 72 }, { day: 'W', val: 85 },
    { day: 'T', val: 78 }, { day: 'F', val: 92 }, { day: 'S', val: 45 },
    { day: 'S', val: 30 },
  ];

  return (
    <div className="space-y-6 h-full">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Sitting", val: "32.4h", trend: "+12%", color: "text-blue-500" },
          { label: "Avg Good Posture", val: "84%", trend: "+5%", color: "text-emerald-500" },
          { label: "Poor Posture Time", val: "2.5h", trend: "-18%", color: "text-red-500" },
          { label: "Health Score", val: "A+", trend: "Stable", color: "text-purple-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-neutral-900/40 border border-neutral-800 rounded-3xl p-6">
            <p className="text-xs text-neutral-500 font-medium uppercase tracking-widest mb-2">{stat.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold text-white">{stat.val}</span>
              <span className={`text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progression */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-[2rem] p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-white font-bold text-xl">Weekly Progression</h3>
              <p className="text-xs text-neutral-500 mt-1">Good posture percentage vs. previous week</p>
            </div>
            <button className="p-2 bg-neutral-800 rounded-lg text-neutral-400 hover:text-white transition-colors">
              <Calendar size={18} />
            </button>
          </div>

          <div className="flex items-end justify-between h-48 gap-4 px-4">
            {weeklyData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full flex items-end justify-center h-full">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${data.val}%` }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="w-full max-w-[40px] bg-primary/40 rounded-t-lg group-hover:bg-primary/60 transition-colors relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {data.val}%
                    </div>
                  </motion.div>
                </div>
                <span className="text-xs text-neutral-500 mt-4 font-bold">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Posture Breakdown */}
        <div className="bg-neutral-900/40 border border-neutral-800 rounded-[2rem] p-8">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-white font-bold text-xl">Posture Breakdown</h3>
            <button className="flex items-center gap-2 text-xs font-bold text-primary hover:underline">
              <Download size={14} /> Export PDF
            </button>
          </div>

          <div className="flex items-center gap-12">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-neutral-800" />
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="440" strokeDashoffset="44" className="text-primary" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">92%</span>
                <span className="text-[10px] text-neutral-500 uppercase font-bold">Upright</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              {[
                { label: "Upright", val: "92%", color: "bg-primary" },
                { label: "Lean Left", val: "4%", color: "bg-blue-400" },
                { label: "Lean Right", val: "3%", color: "bg-indigo-400" },
                { label: "Slouched", val: "1%", color: "bg-red-400" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-xs text-neutral-400">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold text-white">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendation Card */}
      <div className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-[2rem] p-8 flex items-center gap-8">
        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
          <Award size={32} />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-bold text-lg mb-1">New Milestone Achieved!</h4>
          <p className="text-sm text-neutral-400">You maintained perfect posture for 4 consecutive hours yesterday. This puts you in the top 5% of users worldwide.</p>
        </div>
        <button className="px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-neutral-200 transition-colors">
          View Badges
        </button>
      </div>
    </div>
  );
};
