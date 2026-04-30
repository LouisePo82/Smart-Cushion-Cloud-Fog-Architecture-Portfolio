import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Bot, Sparkles, Plus } from 'lucide-react';

export const AIAdvisorView = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your PostureAI Advisor. I have analyzed your sitting habits for the past week.' },
    { role: 'bot', text: 'Overall, your health score is excellent (92/100). However, I noticed you tend to slouch after 4 PM. Would you like some stretching tips for late afternoon?' },
  ]);

  return (
    <div className="flex flex-col h-full bg-neutral-900/20 border border-neutral-800 rounded-[2rem] overflow-hidden">
      {/* Chat Header */}
      <div className="p-6 border-b border-neutral-800 bg-black/40 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">PostureAI Health Advisor</h3>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Live Analysis Active</span>
            </div>
          </div>
        </div>
        <button className="text-xs font-bold text-neutral-400 hover:text-white flex items-center gap-2 bg-neutral-800/50 px-3 py-2 rounded-lg transition-colors">
          <Plus size={14} /> New Session
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === 'bot' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                msg.role === 'bot' ? 'bg-primary/20 text-primary' : 'bg-neutral-800 text-neutral-400'
              }`}>
                {msg.role === 'bot' ? <Sparkles size={16} /> : <User size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'bot' 
                ? 'bg-neutral-800/50 text-neutral-200 border border-neutral-700' 
                : 'bg-primary text-white'
              }`}>
                {msg.text}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-black/40 border-t border-neutral-800">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask anything about your posture or health..." 
            className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl py-4 pl-6 pr-16 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-primary/50 transition-colors shadow-inner"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-primary/20">
            <Send size={18} />
          </button>
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {["Show stretching tips", "My fatigue analysis", "How to adjust my chair?"].map((tip, i) => (
            <button key={i} className="whitespace-nowrap px-4 py-2 bg-neutral-800/30 border border-neutral-700 rounded-full text-[10px] font-bold text-neutral-400 hover:text-white hover:border-neutral-500 transition-all">
              {tip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
