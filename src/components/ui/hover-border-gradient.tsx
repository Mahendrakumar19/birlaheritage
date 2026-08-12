"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 3,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full content-center items-center justify-center overflow-hidden p-[4px] w-fit",
        containerClassName
      )}
      {...props}
    >
      {/* 
        Spinning Conic Gradient 
        Starts at top-left (approx 315deg) and rotates to create a smooth moving light effect 
      */}
      <div 
        className="absolute inset-[-150%] z-0 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_315deg_at_50%_50%,rgba(249,115,22,0)_70%,#FDB515_100%)]"
        style={{ animationDuration: `${duration}s` }}
      />
      
      {/* Ambient Blurred Glow Layer (spins with the main layer) */}
      <div 
        className="absolute inset-[-150%] z-0 animate-[spin_4s_linear_infinite] opacity-100 blur-[14px] bg-[conic-gradient(from_315deg_at_50%_50%,rgba(249,115,22,0)_70%,#FDB515_100%)]"
        style={{ animationDuration: `${duration}s` }}
      />

      {/* Hover State: Solid Glow transition */}
      <div 
        className={cn(
          "absolute inset-0 z-0 bg-[#FDB515] transition-opacity duration-500",
          hovered ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Inner Content Wrapper (Masks the center) */}
      <div
        className={cn(
          "relative z-10 w-full h-full bg-black rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
