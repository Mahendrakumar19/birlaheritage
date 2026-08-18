"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);

  const backgroundColors = [
    "#fffdf5", // very light yellow/white
    "#fffcf0", 
    "#fffbeb", // slightly more yellow
  ];

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex flex-col lg:flex-row justify-between w-full max-w-5xl mx-auto p-6 md:p-8 shadow-xl border border-black/5 rounded-none"
    >
      {/* Left side: List of items */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 pr-0 lg:pr-10 gap-6">
        {content.map((item, index) => (
          <div 
            key={item.title + index} 
            className="cursor-pointer group py-2"
            onClick={() => setActiveCard(index)}
          >
            <motion.h2
              animate={{
                opacity: activeCard === index ? 1 : 0.3,
              }}
              className="text-xl md:text-2xl font-bold text-[#111111] mb-2 transition-opacity duration-300 group-hover:opacity-80"
            >
              {item.title}
            </motion.h2>
            
            {/* Show description only if active to keep it compact */}
            <motion.div
              initial={false}
              animate={{ 
                height: activeCard === index ? "auto" : 0,
                opacity: activeCard === index ? 1 : 0,
                marginTop: activeCard === index ? 12 : 0
              }}
              className="overflow-hidden"
            >
              <p className="text-sm md:text-base text-gray-700 leading-relaxed font-medium pb-1">
                {item.description}
              </p>
            </motion.div>
          </div>
        ))}
      </div>
      
      {/* Right side: Image/Content */}
      <div
        className={cn(
          "w-full lg:w-1/2 h-[250px] md:h-[350px] overflow-hidden rounded-none shadow-md flex items-center justify-center mt-6 lg:mt-0 relative bg-white",
          contentClassName,
        )}
      >
        {content.map((item, index) => (
          <div 
            key={"content" + index}
            className={`absolute inset-0 transition-opacity duration-500 ${activeCard === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </motion.div>
  );
};
