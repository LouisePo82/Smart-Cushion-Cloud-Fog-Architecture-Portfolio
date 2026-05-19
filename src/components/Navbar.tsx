import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Activity } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Introduction", href: "/" },
    { name: "What we solve", href: "/solutions" },
    { name: "Product", href: "/features" },
    { name: "Architecture", href: "/architecture" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Team", href: "/team" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-4 px-4 md:px-0" : "py-5"
      }`}
    >
      <div 
        className={`container mx-auto transition-all duration-500 ${
          isScrolled 
            ? "max-w-5xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-2.5 px-8 flex items-center justify-between" 
            : "max-w-7xl bg-transparent py-0 px-4 flex items-center justify-between"
        }`}
      >
        {/* Logo with pulsing glow */}
        <a href="/" className="flex items-center gap-2.5 font-bold text-xl tracking-tight group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Activity className="w-6 h-6 text-primary animate-[pulse_2s_ease-in-out_infinite] relative z-10" />
          </div>
          <span className="text-white group-hover:text-primary transition-colors duration-300">
            Smart<span className="text-primary group-hover:text-white transition-colors duration-300">Cushion</span>
          </span>
        </a>

        {/* Desktop Links with Sliding Pills */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/[0.02] border border-white/5 rounded-full p-1 relative">
            {navLinks.map((link, idx) => {
              const isActive = currentPath === link.href || (link.href !== '/' && currentPath.startsWith(link.href));
              const isHovered = hoveredIndex === idx;

              return (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`text-sm font-semibold relative py-2 px-4 rounded-full transition-colors duration-300 ${
                    isActive ? "text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {/* Active background glass pill */}
                  {isActive && (
                    <motion.span 
                      layoutId="activePill"
                      className="absolute inset-0 bg-gradient-to-r from-primary/15 to-orange-500/5 border border-primary/30 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Active Bottom Glowing Laser Line */}
                  {isActive && (
                    <motion.span 
                      layoutId="activePillLaser"
                      className="absolute bottom-1 left-4 right-4 h-[2px] bg-gradient-to-r from-primary to-orange-500 rounded-full shadow-[0_0_8px_#f97316] z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover background pill */}
                  {isHovered && !isActive && (
                    <motion.span 
                      layoutId="hoverPill"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}

                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>

          <Button size="sm" asChild className="ml-4 rounded-full px-6 bg-primary text-white shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_4px_30px_rgba(249,115,22,0.6)] hover:scale-105 active:scale-95 transition-all duration-300">
            <a href="/contact">Contact Us</a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu as elegant dropdown card */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="container mx-auto px-4 mt-3 md:hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-black/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col gap-3"
            >
              {navLinks.map((link) => {
                const isActive = currentPath === link.href || (link.href !== '/' && currentPath.startsWith(link.href));
                
                return (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className={`text-lg font-semibold py-2.5 px-4 rounded-xl flex items-center justify-between transition-all ${
                      isActive 
                        ? "bg-primary/10 border border-primary/20 text-primary" 
                        : "text-neutral-300 hover:bg-white/5 border border-transparent hover:text-white"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                    )}
                  </a>
                );
              })}
              <Button className="w-full mt-3 rounded-xl py-6 text-base bg-primary shadow-[0_0_20px_rgba(249,115,22,0.3)]" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
