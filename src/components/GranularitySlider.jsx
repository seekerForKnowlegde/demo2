import { useState } from "react";

export default function GranularitySlider() {
  const [granularity, setGranularity] = useState(50);
  return (
    <>
      <label className="text-lg mb-2  text-gray-700">
        Group the risks based on granularity selected
      </label>
      <div className="mt-2 flex align-center ">
        <label className="text-lg mb-2 text-gray-700 mr-2">Granularity</label>
        <div
          className="relative h-5 w-full bg-gray-300 w rounded-full"
          style={{ width: "60%" }}
        >
          {/* Filled portion */}
          <div
            className="absolute h-full bg-blue-600 rounded-full"
            style={{ width: `${granularity}%` }}
          ></div>

          {/* Actual input (transparent but functional) */}
          <input
            type="range"
            min="0"
            max="100"
            value={granularity}
            onChange={(e) => setGranularity(e.target.value)}
            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
          />
        </div>

        {/* <input
        type="range"
        min="0"
        max="100"
        value={granularity}
        style={{
          height: "1.5rem",
        }}
        onChange={(e) => setGranularity(e.target.value)}
        // className="w-full h-5 bg-gray-300 rounded-full appearance-none cursor-pointer accent-blue-600"
        className=" slider w-full accent-blue-600 opacity-0 rounded-full appearance-none bg-gray-500 "
      /> */}
      </div>
    </>
  );
}
