import React from 'react';
import { motion } from "framer-motion";
import { Brain, Cpu, Smartphone, Cloud, Bell, Battery } from "lucide-react";

const features = [
  {
    title: "AI Posture Detection",
    description: "Our proprietary machine learning model analyzes 16 sensor points to provide pinpoint accuracy.",
    icon: Brain,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Embedded Fog Computing",
    description: "Localized data processing ensures zero latency and maximum privacy for your health data.",
    icon: Cpu,
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    title: "Seamless App Sync",
    description: "Get real-time feedback and long-term health trends right on your mobile device.",
    icon: Smartphone,
    color: "bg-indigo-500/10 text-indigo-500",
  },
  {
    title: "Cloud Integration",
    description: "Securely backup your health history and sync across all your ergonomic devices.",
    icon: Cloud,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Smart Vibrations",
    description: "Subtle haptic feedback alerts you immediately when your posture needs adjustment.",
    icon: Bell,
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    title: "30-Day Battery",
    description: "Ultra-low power design keeps your cushion running for a month on a single charge.",
    icon: Battery,
    color: "bg-emerald-500/10 text-emerald-500",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6 italic-not-really">
            Advanced Technology for Your Well-being
          </h2>
          <p className="text-lg text-muted-foreground">
            We've combined hardware engineering with state-of-the-art AI to create more than just a cushion. 
            It's your personal ergonomic coach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-background border hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
