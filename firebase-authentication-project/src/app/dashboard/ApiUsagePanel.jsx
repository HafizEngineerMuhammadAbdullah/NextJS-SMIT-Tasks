"use client";

import React, { useEffect, useState } from "react";
import { apiUsageData } from "@/data/core";
import { motion } from "motion/react"; // Import motion engine

// const apiUsageData = [
//   { id: "api-1", provider: "OpenAI", current: 6240, max: 10000, color: "bg-blue-500" },
//   { id: "api-2", provider: "Anthropic", current: 8100, max: 10000, color: "bg-amber-500" },
//   { id: "api-3", provider: "Google Gemini", current: 3500, max: 10000, color: "bg-emerald-600" },
//   { id: "api-4", provider: "Mistral", current: 1200, max: 10000, color: "bg-blue-600" },
//   { id: "api-5", provider: "ElevenLabs", current: 4800, max: 10000, color: "bg-emerald-600" },
// ];


// using pure Tailwind CSS transitions (simple, no external tools) or Framer Motion (the gold standard for smooth React animation
// Option 1: Pure Tailwind CSS (No extra packages)
// We can use standard React state (useEffect) to trigger Tailwind's built-in transition classes once the component mounts onto the screen.
// Option 2: Framer Motion (Highly Recommended for Premium Feel)
// If you want a highly customized, bouncy, or spring-like look that behaves exactly like a native app dashboard, use Framer Motion.
// API usage bars — per-provider usage showing how much of each quota has been consumed — directly ties back to the connected models from the login page.
export default function ApiUsagePanel() {

  const [isMounted, setIsMounted] = useState(false);

  // Trigger animation right after the component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);


  return (
    <div className="w-full max-w-sm rounded-2xl bg-[#121212] p-5 text-gray-200 shadow-md border border-neutral-900 font-sans hover:shadow-gray-700 hover:-translate-y-1.5 transition-all cursor-pointer">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[15px] font-bold text-white tracking-wide">
          API usage
        </h3>
        <button className="text-[13px] font-semibold text-white px-4 py-1.5 rounded-xl border border-neutral-800 bg-[#1a1a1a] hover:bg-neutral-800 transition-colors">
          Details
        </button>
      </div>

      {/* Progress Bars Stack */}
      <div className="flex flex-col space-y-5">
        {apiUsageData.map((item) => {
          // Calculate percentage safely
          const percentage = Math.min((item.current / item.max) * 100, 100);

          // Format numbers to match visual string "6,240" or "10k"
          const formatCurrent = item.current.toLocaleString();
          const formatMax = item.max >= 1000 ? `${item.max / 1000}k` : item.max;

          return (
            <div key={item.id} className="w-full flex flex-col">
              {/* Labels Line */}
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[14px] font-semibold text-gray-300">
                  {item.provider}
                </span>
                <span className="text-[13px] font-medium text-neutral-400">
                  {formatCurrent} <span className="text-neutral-500">/</span> {formatMax}
                </span>
              </div>

              {/* Progress Track */}
              {/* To animate the progress bars beautifully when the component loads */}
              <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden">
                {/* 
                  1. Starts at width 0%
                  2. Changes to target width when `isMounted` turns true
                  3. `duration-1000 ease-out` makes the growing effect perfectly smooth
                */}
                {/* <div
                  className={`h-full rounded-full ${item.color} transition-all duration-1000 ease-out`}
                  // style={{ width: `${percentage}%` }}
                  style={{ width: isMounted ? `${percentage}%` : "0%" }}
                /> */}

                {/* 
                  Using motion.div allows us to define direct initial, animate states
                  and configure custom speed profiles (like spring dynamics) 
                */}
                <motion.div
                  className={`h-full rounded-full ${item.color}`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                />

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
