import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PiLoader from "./PiLoader";

export default function PortfolioCard({
  id,
  policyVolume,
  totalPremium,
  lossRatio,
}) {
  const naviagte = useNavigate();

  const [loading, setLoading] = useState(false);
  const handleNext = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    naviagte("/analysis");
  };
  if (loading) {
    return <PiLoader />;
  }

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-2 shadow-sm min-w-[240px]">
      <h4 className="font-bold mb-2">Portfolio {id}</h4>
      <p className="text-sm ">Policy Volume: {policyVolume}</p>
      <p className="text-sm">Total Premium: ${totalPremium.toLocaleString()}</p>
      <p className="text-sm">Loss Ratio: {lossRatio}%</p>
      <button
        onClick={() => handleNext()}
        className="mt-auto w-full py-1 rounded text-sm 
             bg-orange-600 text-white 
             hover:bg-white hover:text-[rgba(251,78,11)] 
             transition-colors duration-200"
      >
        VIEW MORE
      </button>
    </div>
  );
}
