"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  LayoutDashboard, 
  History, 
  MessageSquare, 
  Settings, 
  Bell, 
  User,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { MonitorView } from './dashboard/MonitorView';
import { AnalyticsView } from './dashboard/AnalyticsView';

const tabs = [
  { id: 'monitor', name: 'Live Monitor', icon: Activity },
  { id: 'analytics', name: 'Performance', icon: LayoutDashboard },
  { id: 'history', name: 'Session History', icon: History },
];

export const DashboardApp = () => {
  const [activeTab, setActiveTab] = useState('monitor');

  return (
    <div className="flex h-[800px] w-full bg-neutral-950 border border-neutral-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
      {/* Sidebar */}
      <div className="w-64 border-r border-neutral-800 bg-black p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Activity className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-white">PostureAI</span>
        </div>

        <nav className="flex-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id 
                ? "bg-primary text-white shadow-[0_0_15px_rgba(var(--primary),0.3)]" 
                : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-neutral-800 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-neutral-400 hover:bg-neutral-900 hover:text-white transition-all">
            <Settings className="w-4 h-4" />
            Settings
          </button>
          <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl mt-4">
            <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-1">Current Device</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white font-medium">SmartCushion-01</span>
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-neutral-950">
        {/* Top Header */}
        <header className="h-20 border-b border-neutral-800 flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl">
          <div className="flex flex-col">
            <h2 className="text-white font-bold text-lg leading-none mb-1">
              {tabs.find(t => t.id === activeTab)?.name}
            </h2>
            <p className="text-xs text-neutral-500">Thursday, April 30, 2026</p>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-neutral-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-black" />
            </button>
            <div className="h-8 w-[1px] bg-neutral-800 mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white leading-none">Peter Chen</p>
                <p className="text-[10px] text-neutral-500">Pro Member</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop" alt="User" />
              </div>
            </div>
          </div>
        </header>

        {/* View Port */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === 'monitor' && <MonitorView />}
              {activeTab === 'analytics' && <AnalyticsView />}
              {activeTab === 'history' && (
                <div className="flex flex-col items-center justify-center h-full text-neutral-500 italic">
                  History view implementation coming soon...
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
