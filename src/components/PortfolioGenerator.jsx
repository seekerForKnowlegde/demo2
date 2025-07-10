// import { portfolios } from "../data/mockData";
import KPICards from "./KPICards";
import PolicyVolumeChart from "./PolicyVolumeChart";
import GranularitySlider from "./GranularitySlider";
import PortfolioCard from "./PortfolioCard";
import HeaderTabs from "./HeaderTabs";
import FilterPanel from "./FilterPanel";
import { usePrompt } from "./PromptContext";

function PortfolioGenerator2() {
  const { promptData } = usePrompt();
  const clusters = promptData?.clusters;
  const cluster_Stats = promptData?.cluster_stats;

  const portfolios = Object.keys(clusters).map((key, index) => {
    const cluster = clusters[key];
    return {
      id: index + 1,
      policyVolume: Math.round(cluster.policy_volume),
      totalPremium: Math.round(cluster.total_premium),
      lossRatio: +cluster.loss_ratio.toFixed(2),
      cluster_min: cluster_Stats[index].min,
      cluster_max: cluster_Stats[index].max,
      cluster_mean: cluster_Stats[index].mean,
      cluster_median: cluster_Stats[index].median,
      cluster_percentile_90: cluster_Stats[index].percentile_90,
    };
  });
  return (
    <>
      <div className="flex  gap-4">
        <div className="w-full lg:w-3/5">
          <KPICards />
        </div>

        <div className="w-full lg:w-2/5">
          <PolicyVolumeChart />
        </div>
      </div>

      <GranularitySlider />

      <section className="mt-8 flex gap-4 overflow-x-auto pb-4">
        {portfolios.map((p) => (
          <PortfolioCard key={p.id} {...p} />
        ))}
      </section>
    </>
  );
}

export default function PortfolioGenerator() {
  const { prompt } = usePrompt();
  return (
    <main className=" mx-auto font-sans">
      <main className="min-h-screen  w-screen bg-gray-100 px-6 py-8 font-sans">
        <HeaderTabs />
        <div className="flex items-center gap-2 mb-6 mt-6">
          <input
            type="text"
            placeholder={prompt}
            // value={prompt}
            className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {/* <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
            Submit
          </button> */}
        </div>

        <div className="text-lg font-medium">
          Portfolio generated on below parameters
        </div>
        <FilterPanel />
        <PortfolioGenerator2 />
        {/* <PortfolioAnalysis /> */}
        {/* <div className="flex  gap-4">
        <div className="w-full lg:w-3/5">
          <KPICards />
        </div>

        <div className="w-full lg:w-2/5">
          <PolicyVolumeChart />
        </div>
      </div>

      <GranularitySlider />

      <section className="mt-8 flex gap-4 overflow-x-auto pb-4">
        {portfolios.map((p) => (
          <PortfolioCard key={p.id} {...p} />
        ))}
      </section> */}
        <></>
      </main>
    </main>
  );
}
