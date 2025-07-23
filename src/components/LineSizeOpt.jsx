import React, { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import PiLoader from "./PiLoader";
import FilterPanel from "./FilterPanel";
import HeaderTabs from "./HeaderTabs";

const LineSizeOpt2 = () => {
  const [formData, setFormData] = useState({
    targetPremium: 150000,
    minPremium: 140000,
    maxIncrease: 20,
    // maxDecrease: 20,
    maxNonRenewals: 30,
    maxPML: 80,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      target_gross_premium: formData.targetPremium,
      min_gross_premium: formData.minPremium,
      max_line_change_pct: formData.maxIncrease,
      max_non_renewal_pct: formData.maxNonRenewals,
      max_pml_pct: formData.maxPML,
    };

    console.log("Submitting:", payload);

    fetch(`${API_URL}/linesize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Optimization result:", data);
        setResult(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  };
  if (loading) {
    return <PiLoader />;
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 items-start justify-center mt-6 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 border border-gray-300 p-6 rounded-lg shadow"
        >
          <h2 className="text-lg font-semibold text-orange-600 mb-4">
            Targets and constraints
          </h2>

          <div className="space-y-3 text-sm text-gray-800">
            {[
              {
                label: "Target Gross Premium ($)",
                name: "targetPremium",
              },
              {
                label: "Minimum Gross Premium ($)",
                name: "minPremium",
              },
              {
                label: "Max % of line size allowed to be increased",
                name: "maxIncrease",
              },

              {
                label: "Maximum % of non renewals",
                name: "maxNonRenewals",
              },
              {
                label: "Max allowed PML as % of portfolio Gross Premium",
                name: "maxPML",
              },
            ].map(({ label, name }) => (
              <div className="flex justify-between items-center" key={name}>
                <label htmlFor={name} className="w-2/3">
                  {label}:
                </label>
                <input
                  type="number"
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-1/3 border rounded px-2 py-1 text-right"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="mt-6 w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded"
          >
            SUBMIT AND RUN
          </button>
        </form>
        {result && (
          <div className="w-full md:w-1/2 bg-white border border-gray-200 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2 text-orange-600">
              Loss Ratio Summary
            </h2>

            {Object.entries(result).map(([clusterId, clusterData]) => (
              <div key={clusterId} className="mb-3 border-b pb-2">
                <p className="text-sm font-semibold text-gray-700">
                  Cluster {clusterId}
                </p>
                <p className="text-sm text-gray-800">
                  🔹 Original Loss Ratio:{" "}
                  <strong>{clusterData.Original_Loss_Ratio}%</strong>
                </p>
                <p className="text-sm text-gray-800">
                  🔸 Optimized Loss Ratio:{" "}
                  <strong>{clusterData.New_Loss_Ratio}%</strong>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-6 space-y-8 w-full">
        {result &&
          Object.entries(result).map(([clusterId, clusterData]) => (
            <div
              key={clusterId}
              className="overflow-auto border p-4 rounded shadow"
            >
              <h3 className="text-md font-semibold text-orange-700 mb-4">
                Cluster {clusterId} - Policy Optimization Table
              </h3>
              <table className="min-w-full text-sm text-left border">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Policy ID</th>
                    <th className="px-4 py-2 border">Original LineSize</th>
                    <th className="px-4 py-2 border">Original Renewal</th>
                    <th className="px-4 py-2 border">Optimized LineSize</th>
                    <th className="px-4 py-2 border">Optimized Renewal</th>
                    <th className="px-4 py-2 border">Gross Premium</th>
                    <th className="px-4 py-2 border">Loss</th>
                    <th className="px-4 py-2 border">Loss Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {clusterData.policies.map((policy, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-4 py-2 border">{policy.Policy_ID}</td>
                      <td className="px-4 py-2 border">
                        {policy.Original_LineSize}
                      </td>
                      <td className="px-4 py-2 border">{policy.Renewal}</td>
                      <td className="px-4 py-2 border">
                        {policy.Optimized_LineSize}
                      </td>
                      <td className="px-4 py-2 border">
                        {policy.Optimized_Renewal}
                      </td>
                      <td className="px-4 py-2 border">
                        {policy.Gross_Premium}
                      </td>
                      <td className="px-4 py-2 border">{policy.Loss}</td>

                      <td className="px-4 py-2 border">
                        {(policy.Loss / policy.Gross_Premium) * 100}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </>
  );
};

// export defau LineSizeOpt2;

export default function LineSizeOpt() {
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

        <LineSizeOpt2 />
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
