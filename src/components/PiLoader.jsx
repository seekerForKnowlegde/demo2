import React from "react";
import PiLogo from "../assets/logo.svg"; // your logo path

const PiLoader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="relative w-24 h-24">
        {/* Spinner Ring */}
        <div className="absolute inset-0 border-4 border-indigo-200 rounded-full border-t-indigo-600 animate-spin"></div>

        {/* Pi Logo with breathing animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={PiLogo}
            alt="Pi Logo"
            className="w-10 h-10 animate-breathe"
          />
        </div>
      </div>
    </div>
  );
};

export default PiLoader;
