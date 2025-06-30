import React, { useState } from "react";
import { SendHorizonal } from "lucide-react"; // Optional icon lib
import { useNavigate } from "react-router-dom";
import PiLoader from "./PiLoader";

const ChatBot = () => {
  const suggestions = [
    "Create portfolio for Marine and Aviation for Current year",
    "Draft portfolio for last 3 Underwriter years",
    "Generate multi-region portfolios for Marine Segment",
  ];

  const naviagte = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleNext = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    naviagte("/generator");
  };
  if (loading) {
    return <PiLoader />;
  }

  return (
    <div className="h-screen max-w-20xl flex flex-col bg-gradient-to-br from-indigo-100 to-white p-6">
      {/* Header */}
      <div className="mb-12 mt-20">
        <h1 className="text-3xl font-bold text-indigo-700 text-center">
          Chat with Portfolio.AI
        </h1>
        <p className="text-sm text-gray-600 mt-2  text-center">
          Your content transformation assistant
        </p>
      </div>

      {/* Chatbot Icon */}
      <div className="flex justify-center mb-8">
        <div className="bg-indigo-100 p-6 rounded-full shadow-md">🤖</div>
      </div>

      {/* Prompt Suggestions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
        {suggestions.map((text, idx) => (
          <button
            key={idx}
            className="px-4 py-2 bg-white text-gray-700 rounded-full shadow hover:bg-indigo-50 text-sm transition"
          >
            ✨ {text}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="left-0 w-full  p-4 ">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <input
            type="text"
            placeholder="Ask our chatbot for the content form you require"
            className="flex-grow border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700"
            onClick={() => handleNext()}
          >
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
