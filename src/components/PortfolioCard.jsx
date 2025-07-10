import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PiLoader from "./PiLoader";
import { usePrompt } from "./PromptContext";
const API_URL=import.meta.env.VITE_API_URL
export default function PortfolioCard({
  id,
  policyVolume,
  totalPremium,
  lossRatio,
  cluster_min,
  cluster_max,
  cluster_median,
  cluster_mean,
  cluster_percentile_90,
}) {
  const naviagte = useNavigate();

  const [loading, setLoading] = useState(false);
  const { setClusterData, setselectedClusterId } = usePrompt();
  const handleNext = async (id) => {
    setLoading(true);
    fetch(`${API_URL}/cluster/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // Use either data.global or data.clusters depending on your backend
        // Or data.clusters if you're using clusters
        setClusterData(data?.data);
        setselectedClusterId(id);
        setLoading(false);
        naviagte("/analysis");
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
    <div className="border rounded-lg p-4 flex flex-col gap-2 shadow-sm min-w-[240px]">
      <h4 className="font-bold mb-2">Portfolio {id}</h4>
      <p className="text-sm ">Policy Volume: {policyVolume}</p>
      <p className="text-sm">Total Premium: ${totalPremium.toLocaleString()}</p>
      <p className="text-sm">Loss Ratio: {lossRatio}%</p>
      <p className="text-sm">Cluster Min: ${cluster_min.toLocaleString()}</p>
      <p className="text-sm">Cluster Max: ${cluster_max.toLocaleString()}</p>
      <p className="text-sm">Cluster Mean: ${cluster_mean.toLocaleString()}</p>
      <p className="text-sm">
        Cluster Median: ${cluster_median.toLocaleString()}
      </p>
      <p className="text-sm">
        Cluster 90 percentile: ${cluster_percentile_90.toLocaleString()}
      </p>
      <button
        onClick={() => handleNext(id - 1)}
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
