"use client";
import React from "react";
import { StickyScroll } from "./ui/StickyScrollReveal";

const content = [
  {
    title: "Postural Fatigue",
    description: "After hours of continuous sitting, the muscles supporting your spine begin to tire. This is when 'slumping' starts, leading to long-term structural issues that you might not feel until it's too late.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white p-6 text-center font-bold">
        Slumping occurs after just 45 minutes of static sitting.
      </div>
    ),
  },
  {
    title: "The Silent Compounding",
    description: "Micro-stresses on your vertebrae add up. What feels like a minor ache today becomes chronic pain tomorrow. Smart Cushion detects these micro-shifts before they become permanent habits.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white overflow-hidden">
        <img 
          src="/dashboard-3.png" 
          className="h-full w-full object-cover" 
          alt="Performance analysis" 
        />
      </div>
    ),
  },
  {
    title: "Productivity & Oxygen",
    description: "Poor posture compresses your chest cavity, reducing lung capacity and oxygen flow to the brain. This results in the 'afternoon slump' and decreased cognitive performance.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white p-6 text-center font-bold">
        Proper alignment can increase focus by up to 20%.
      </div>
    ),
  },
];

export const SolutionsContent = () => {
  return (
    <div className="w-full">
      <StickyScroll content={content} />
    </div>
  );
};
