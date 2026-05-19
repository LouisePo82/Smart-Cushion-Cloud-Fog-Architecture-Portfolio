import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Activity } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Set current path on mount
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/85 backdrop-blur-md border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Activity className="w-6 h-6 text-primary animate-pulse" />
          <span className="text-white hover:text-primary transition-colors">SmartCushion</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            // Check active match
            const isActive = currentPath === link.href || (link.href !== '/' && currentPath.startsWith(link.href));
            
            return (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium relative py-1.5 transition-colors ${
                  isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span 
                    layoutId="activeNavbarTab"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <Button size="sm" asChild className="shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] transition-all">
            <a href="/contact">Contact Us</a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-muted-foreground hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-white/5"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = currentPath === link.href || (link.href !== '/' && currentPath.startsWith(link.href));
                
                return (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className={`text-lg font-medium py-2 border-b border-white/5 last:border-0 flex items-center justify-between transition-colors ${
                      isActive ? "text-primary font-bold" : "text-foreground/80 hover:text-white"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                    )}
                  </a>
                );
              })}
              <Button className="w-full mt-4 shadow-[0_0_15px_rgba(249,115,22,0.3)]" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
