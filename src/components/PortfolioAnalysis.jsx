import PortfolioCard from "./PortfolioCard";
import {
  // policyAnalysisKPIs,
  premiumLineChartData,
  premiumBarChartData,
  premiumPieChartLeftCOLORS,
  premiumPieChartLeftData,
  premiumPieChartRightData,
  premiumPieChartRightCOLORS,
  tableTopLeftData,
  tableTopRightData,
  tableBottomData,
} from "../data/mockData";
import KPICards, { KPICard } from "./KPICards";
import { formatNum } from "./KPICards";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import HeaderTabs from "./HeaderTabs";
import FilterPanel from "./FilterPanel";
import { usePrompt } from "./PromptContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const exportToExcel = (data, fileName = "ClusterData") => {
  // Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Policies");

  // Generate Excel file and trigger download
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${fileName}.xlsx`);
};

console.log(premiumLineChartData);

function formatDate(dateStr) {
  if (!dateStr) return "--";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function PremiumLineChart() {
  const { promptData, selectedClusterId } = usePrompt();
  const rawdata =
    promptData?.["clusters"][selectedClusterId]["yearly_breakdown"];

  const data = Object.entries(rawdata).map(([year, val]) => ({
    month: year.split(".")[0],
    Premium: val.premium,
    Plan: val.count,
  }));
  if (!Array.isArray(data) || data.length == 0) {
    return <>No Data to display</>;
  }

  return (
    <div className="h-60 w-Full  bg-white rounded-lg shadow p-4">
      {" "}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Premium"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="Plan" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PremiumBarChart() {
  const { promptData, selectedClusterId } = usePrompt();
  const data = promptData?.cluster_top_underwriters[selectedClusterId];
  const chartData = data?.map((item) => ({
    name: item.Underwriter,
    Premium: item["Gross Premium"],
  }));
  console.log("PremiumBarChart", data);
  return (
    <div className="w-Full h-60 bg-white rounded-lg shadow p-4">
      <h3 className="text-sm font-semibold text-red-600 mb-2">
        Top 5 Underwriters by Premium
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 10, right: 20, left: 30, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            tickFormatter={(value) => `$${formatNum(value)}`}
          />
          <YAxis dataKey="name" type="category" />
          <Tooltip formatter={(value) => `$${formatNum(value)}`} />
          <Bar dataKey="Premium" fill="rgba(251, 78, 11, 1)" barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
const getNewVsRenewalCount = (data) => {
  const counts = { New: 0, Renewal: 0 };

  data.forEach((item) => {
    const type = item["New Renewal"];
    if (type === "New" || type === "Renewal") {
      counts[type] += 1;
    }
  });

  return [
    { name: "New", value: counts.New },
    { name: "Renewal", value: counts.Renewal },
  ];
};

export function PremiumPieChartLeft({ COLORS }) {
  const { clusterData } = usePrompt();
  const data = getNewVsRenewalCount(clusterData);
  return (
    <div className="w-1/2 h-75 text-center bg-white rounded-lg shadow p-4">
      <h4 className="text-sm font-semibold text-red-600 mb-2">
        New vs Renewal
      </h4>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Legend layout="horizontal" wrapperStyle={{ padding: 10 }}></Legend>
          <Pie
            data={data}
            innerRadius={35}
            outerRadius={55}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const getRenewalBuckets = (data) => {
  const today = new Date();
  const buckets = {
    "Expiring in 30 days": 0,
    "Expiring in 45 days": 0,
    "Expiring in 60+ days": 0,
  };

  const renewals = data.filter((d) => d["New Renewal"] === "Renewal");

  renewals.forEach((item) => {
    const expiry = new Date(item["Expiry Date"]);
    const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    console.log("diffDays:", diffDays);

    if (diffDays >= 0) {
      if (diffDays <= 30) buckets["Expiring in 30 days"]++;
      else if (diffDays <= 45) buckets["Expiring in 45 days"]++;
      else buckets["Expiring in 60+ days"]++;
    }
  });

  const total = renewals.length;
  const percentages = Object.fromEntries(
    Object.entries(buckets).map(([key, value]) => [
      key,
      ((total != 0 ? value / total : 0) * 100).toFixed(2),
    ])
  );
  console.log("buckets", buckets);
  return Object.entries(buckets).map(([name, value]) => ({
    name,
    value: parseFloat(((total != 0 ? value / total : 0) * 100).toFixed(2)),
  }));
};

export function PremiumPieChartRight({ COLORS2 }) {
  const { clusterData } = usePrompt();
  const data = getRenewalBuckets(clusterData);
  const renewals = clusterData.filter((d) => d["New Renewal"] === "Renewal");
  return (
    <div className="w-1/2 h-75 text-center  bg-white rounded-lg shadow p-4">
      <h4 className="text-sm font-semibold text-red-600 mb-2">
        Renewal Analysis
      </h4>
      <div className="flex flex-col">
        <div className="flex items-center justify-center">
          <ResponsiveContainer width={160} height={160}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={40}
                outerRadius={55}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS2[index % COLORS2.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold mb-2">{renewals.length}</h2>
          <ul className="text-xs mt-2 text-left">
            {data.map((entry, index) => (
              <li key={entry.name} className="flex items-center space-x-1">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS2[index] }}
                />
                <span>{`${entry.value}%  ${entry.name}`}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function TableTopLeft({ data, header = "" }) {
  return (
    <div className="bg-white p-4 rounded shadow-md w-1/2">
      <h2 className="text-sm font-semibold text-red-600 mb-3">{header}</h2>
      <table className="w-full text-sm">
        <thead className="border-b">
          <tr className="text-left text-gray-600">
            <th className="py-1">Policy No</th>
            <th className="py-1">Premium</th>
            <th className="py-1">Exp. Loss Ratio</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx} className="border-b last:border-0">
              <td className="py-1">{item.policyNo}</td>
              <td className="py-1">{item.premium}</td>
              <td className="py-1">{item.ratio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TableBottom() {
  const { clusterData } = usePrompt();
  return (
    <div className="bg-white p-4 rounded shadow-md mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold mb-3 text-gray-700">
          Policy Details (Top 10 policies in this cluster based on Gross
          Premium)
        </h2>
        <button
          onClick={() => exportToExcel(clusterData, "TopPolicies")}
          style={{ fontSize: "12px", background: "green" }}
          className="bg-blue-500 text-white px-1 py-1 rounded hover:bg-blue-600"
        >
          Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm table-auto border-collapse">
          <thead className="border-b text-gray-600">
            <tr>
              <th className="text-left py-2 px-3">Policy No/Insured</th>
              <th className="text-left py-2 px-3">Premium</th>
              <th className="text-left py-2 px-3">Class</th>
              <th className="text-left py-2 px-3">Inception Date</th>
              <th className="text-left py-2 px-3">Expiry Date</th>
              <th className="text-left py-2 px-3">Industry</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {[...clusterData]
              .sort((a, b) => {
                const premiumA = parseFloat(a?.["Gross Premium"]);
                const premiumB = parseFloat(b?.["Gross Premium"]);

                return premiumB - premiumA;
              })
              .slice(0, 10)
              .map((item, idx) => (
                <tr key={idx} className="text-gray-800">
                  <td className="py-2 px-3">
                    {item.no}
                    <br />
                    <span className="text-xs text-gray-500">
                      {item?.["PolicyNo"]}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    {formatNum(item?.["Gross Premium"])}
                  </td>
                  <td className="py-2 px-3">{item?.["Class"]}</td>
                  <td className="py-2 px-3">
                    {formatDate(item?.["Inception Date"])}
                  </td>
                  <td className="py-2 px-3">
                    {formatDate(item?.["Expiry Date"])}
                  </td>
                  <td className="py-2 px-3">{item?.["Division"]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export const convertClusterToKPIs = (
  clusterData,
  cluster_stats,
  selectedClusterId
) => {
  return [
    {
      label: `Mean Premium`,
      value: Number(cluster_stats?.mean).toLocaleString(),
      unit: "$",
      trend: 0,
      text: ``,
    },
    {
      label: `Policy Volume`,
      value: Number(clusterData.policy_volume),
      unit: "",
      trend: 0,
      text: ``,
    },
    {
      label: `Total Loss`,
      value: Number(clusterData.total_loss),
      unit: "$",
      trend: 0,
      text: ``,
    },
    {
      label: `Total Premium`,
      value: Number(clusterData.total_premium),
      unit: "$",
      trend: 0,
      text: ``,
    },
  ];
};

function PortfolioAnalysis2() {
  const { promptData, selectedClusterId } = usePrompt();
  const clusters = promptData?.clusters;
  const cluster_Stats = promptData?.cluster_stats;
  console.log("selectedClusterId", clusters[selectedClusterId]);
  const policyAnalysisKPIs = convertClusterToKPIs(
    clusters[selectedClusterId],
    cluster_Stats[selectedClusterId],
    selectedClusterId
  );
  console.log("policyAnalysisKPIs", policyAnalysisKPIs);

  return (
    <>
      <div className="p-6">
        {/* Filters */}
        <div className="flex gap-4 mb-4"></div>

        {/* KPI + Chart + Table */}
        <div className="grid grid-cols-12 gap-10">
          {/* KPIs */}
          <div className="col-span-2 flex flex-col gap-4">
            {policyAnalysisKPIs.map(
              ({ label, value, unit, trend, text, sparkData }) => (
                <KPICard
                  label={label}
                  value={value}
                  unit={unit}
                  trend={trend}
                  text={text}
                  sparkData={sparkData}
                  width="230px"
                ></KPICard>
              )
            )}
          </div>

          {/* Charts */}
          <div className="col-span-4 flex flex-col gap-4">
            {/* Line + Bar + Pie charts */}
            <PremiumLineChart data={premiumLineChartData} />
            <PremiumBarChart data={premiumBarChartData}></PremiumBarChart>
            <div className="flex gap-2">
              <PremiumPieChartLeft
                data={premiumPieChartLeftData}
                COLORS={premiumPieChartLeftCOLORS}
              />
              <PremiumPieChartRight
                data={premiumPieChartRightData}
                COLORS2={premiumPieChartRightCOLORS}
              />
            </div>
          </div>

          {/* Table */}
          <div className="col-span-6">
            {/* Policy table */}
            <div className="flex gap-6">
              <TableTopLeft
                data={tableTopLeftData}
                header="Top Policies · Expired but not renewed"
              />
              <TableTopLeft
                data={tableTopRightData}
                header="Top Policies: Expiring in next 1 month"
              />
            </div>
            <TableBottom data={tableBottomData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default function PortfolioAnalysis() {
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

        <PortfolioAnalysis2 />
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
