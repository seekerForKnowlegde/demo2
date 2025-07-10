import React from "react";
import PiLogo from "../assets/logo.svg";
import { usePrompt } from "./PromptContext";

const PiLoader = () => {
  // Constants for SVG circle
  const { progress } = usePrompt();
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50 space-y-4">
      <div className="relative w-28 h-28">
        {/* SVG Progress Circle */}
        <svg height="100%" width="100%" className="transform -rotate-90">
          <circle
            stroke="#e0e7ff"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx="50%"
            cy="50%"
          />
          <circle
            stroke="#4f46e5" // indigo-600
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            r={normalizedRadius}
            cx="50%"
            cy="50%"
            className="transition-all duration-300"
          />
        </svg>

        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={PiLogo}
            alt="Pi Logo"
            className="w-10 h-10 animate-breathe"
          />
        </div>
      </div>

      {/* Progress Text */}
      <div className="text-sm font-medium text-gray-700">
        {Math.floor(progress)}% loaded
      </div>
    </div>
  );
};

export default PiLoader;
