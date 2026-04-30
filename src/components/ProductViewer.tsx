"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Palette } from "lucide-react";

const products = [
  {
    id: "black",
    name: "Mysterious Black",
    description: "The classic choice for a professional and sleek setup.",
    color: "#050505",
    image: "/cushion-black.png",
  },
  {
    id: "blue",
    name: "Electric Blue",
    description: "A vibrant accent that brings energy to your workspace.",
    color: "#3b82f6",
    image: "/cushion-blue.png",
  },
  {
    id: "slate",
    name: "Slate Gray",
    description: "Modern, neutral, and blends perfectly with any office chair.",
    color: "#64748b",
    image: "/cushion-slate.png",
  },
];

export const ProductViewer = () => {
  const [selected, setSelected] = useState(products[0]);

  return (
    <div className="flex flex-col items-center py-20 px-4 w-full">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Product Image with Animation */}
        <div className="relative flex items-center justify-center aspect-square rounded-[3rem] bg-neutral-900/30 border border-neutral-800 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-10 w-full p-12"
            >
              {/* If no image exists, show a high-end placeholder */}
              <div className="w-full aspect-square rounded-3xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shadow-2xl relative overflow-hidden">
                <div 
                   className="absolute inset-0 opacity-40 transition-colors duration-1000"
                   style={{ backgroundColor: selected.color }}
                />
                <div className="z-10 flex flex-col items-center gap-4">
                   <Sparkles className="text-white w-16 h-16 opacity-50" />
                   <p className="text-white/30 font-mono text-sm uppercase tracking-widest">{selected.name} Edition</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Product Info & Selector */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-primary/20">
              <Sparkles size={14} /> Premium Ergonomics
            </span>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Smart <span className="text-primary">Cushion</span>
            </h2>
            <p className="text-xl text-neutral-400 leading-relaxed max-w-lg">
              {selected.description} Crafted with multi-density memory foam and integrated sensor fabric.
            </p>
          </div>

          <div className="space-y-4">
            <p className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-widest">
              <Palette size={16} className="text-primary" /> Choose Your Style
            </p>
            <div className="flex gap-4">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelected(product)}
                  className={`group relative w-12 h-12 rounded-full border-2 transition-all p-1 ${
                    selected.id === product.id ? "border-primary scale-110" : "border-neutral-800 hover:border-neutral-600"
                  }`}
                >
                  <div 
                    className="w-full h-full rounded-full shadow-inner" 
                    style={{ backgroundColor: product.color }}
                  />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500 font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {product.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-800 mt-4">
            <p className="text-sm text-neutral-500 italic">
              Designed for long-term health and focus. Every detail is engineered to support your natural posture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
