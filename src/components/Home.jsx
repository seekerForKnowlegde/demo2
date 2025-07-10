import React, { useState, useEffect } from "react";
import { SendHorizonal } from "lucide-react"; // Optional icon lib
import { useNavigate } from "react-router-dom";
import PiLoader from "./PiLoader";
import { usePrompt } from "./PromptContext";
const API_URL=import.meta.env.VITE_API_URL

const ChatBot = () => {
  const { setpromptData, setProgress, setPrompt, prompt } = usePrompt();
  const [loading, setLoading] = useState(false);
  const suggestions = [
    "Create portfolio for Marine and Aviation for Current year",
    "Draft portfolio for last 3 Underwriter years",
    "Generate multi-region portfolios for Marine Segment",
  ];

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        fetch(`${API_URL}/progress`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setProgress(data.progress);
            if (data.progress === 100) clearInterval(interval);
          });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [loading]);

  const naviagte = useNavigate();

  const handleNext = async () => {
    setLoading(true);
    setProgress(0);
    fetch(`${API_URL}/run-kmeans`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Use either data.global or data.clusters depending on your backend
        setpromptData(data); // Or data.clusters if you're using clusters
        setLoading(false);
        naviagte("/generator");
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
        fetch(`${API_URL}/reset-progress`, {
          method: "POST",
        }).then((res) => res.json());
      });
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
            onChange={(e) => setPrompt(e.target.value)}
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
