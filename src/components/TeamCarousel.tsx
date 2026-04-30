"use client";
import React from 'react';
import { Carousel, Card } from './ui/AppleCardsCarousel';
import { PhuongContent, NamContent, ThiContent, VuContent } from './TeamMemberContent';

const teamData = [
  {
    category: "Hardware & Edge",
    title: "To Nguyen Tan Phuong",
    src: "/member1.png",
    content: <PhuongContent />,
  },
  {
    category: "Fog & Hardware",
    title: "Tran Viet Nam",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3000&auto=format&fit=crop",
    content: <NamContent />,
  },
  {
    category: "Cloud & Dashboard",
    title: "Dong Boi Thi",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=3000&auto=format&fit=crop",
    content: <ThiContent />,
  },
  {
    category: "Mobile App",
    title: "Hoang Mai Vu",
    src: "/member4.png",
    content: <VuContent />,
  },
];

export const TeamCarousel = () => {
  const cards = teamData.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <Carousel items={cards} />
    </div>
  );
};
