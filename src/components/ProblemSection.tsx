import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import {
  AlertTriangle,
  Clock,
  Activity,
  PenTool,
} from "lucide-react";

export const ProblemSection = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-6xl font-bold text-white mb-6">
            The <span className="text-primary">Silent Crisis</span> of Sitting
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Modern work life forces us into chairs for hours, leading to invisible damage that compounds over time.
          </p>
        </div>
        
        <BentoGrid className="max-w-6xl mx-auto">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={i === 0 || i === 3 ? "md:col-span-2" : ""}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

const Skeleton = ({ color }: { color: string }) => (
  <div className={`flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br ${color} opacity-20`}></div>
);

const items = [
  {
    title: "Chronic Back Pain",
    description: "80% of office workers experience back pain at some point, often due to poor posture.",
    header: <Skeleton color="from-red-500 to-orange-500" />,
    icon: <AlertTriangle className="h-4 w-4 text-red-500" />,
  },
  {
    title: "The 9.3 Hour Average",
    description: "We spend more time sitting than sleeping. It's the new smoking.",
    header: <Skeleton color="from-blue-500 to-cyan-500" />,
    icon: <Clock className="h-4 w-4 text-blue-500" />,
  },
  {
    title: "Posture Deterioration",
    description: "Slouching reduces oxygen flow and leads to permanent spinal misalignment.",
    header: <Skeleton color="from-purple-500 to-pink-500" />,
    icon: <Activity className="h-4 w-4 text-purple-500" />,
  },
  {
    title: "Mental Fatigue & Productivity Loss",
    description: "Discomfort from sitting leads to higher stress and significant drops in focus and output.",
    header: <Skeleton color="from-emerald-500 to-teal-500" />,
    icon: <PenTool className="h-4 w-4 text-emerald-500" />,
  },
];
