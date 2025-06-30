import { portfolios } from "../data/mockData";
import KPICards from "./KPICards";
import PolicyVolumeChart from "./PolicyVolumeChart";
import GranularitySlider from "./GranularitySlider";
import PortfolioCard from "./PortfolioCard";
import HeaderTabs from "./HeaderTabs";
import FilterPanel from "./FilterPanel";

function PortfolioGenerator2() {
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
  return (
    <main className=" mx-auto font-sans">
      <main className="min-h-screen  w-screen bg-gray-100 px-6 py-8 font-sans">
        <HeaderTabs />
        <div className="flex items-center gap-2 mb-6 mt-6">
          <input
            type="text"
            placeholder="Search like: Create Portfolio for Aviation and Marine classes for current year"
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
