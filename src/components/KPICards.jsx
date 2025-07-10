import { Line, LineChart, ResponsiveContainer } from "recharts";
// import { summaryKPIs } from "../data/mockData";
import { usePrompt } from "./PromptContext";

export function formatNum(n, unit = "") {
  if (n === undefined || n === null) return "-";

  const absNum = Math.abs(n);
  let formatted = "";

  if (absNum >= 1e9) {
    formatted = (n / 1e9).toFixed(2) + "B";
  } else if (absNum >= 1e6) {
    formatted = (n / 1e6).toFixed(2) + "M";
  } else if (absNum >= 1e3) {
    formatted = (n / 1e3).toFixed(2) + "K";
  } else {
    formatted = n.toLocaleString();
  }

  return unit === "$" ? `${unit}${formatted}` : `${formatted}`;
}
function transformToKPIs(globalData) {
  return [
    {
      label: "Policy Volume",
      value: globalData.total_policy_volume,
      unit: "",
      trend: 0,
      text: "Current",
      sparkData: [
        { value: 10 },
        { value: 500 },
        { value: 300 },
        { value: 2 },
        { value: 10 },
        { value: 400 },
        { value: 50 },
        { value: 520 },
        { value: 700 },
        { value: 20 },
        { value: 400 },
        { value: 50 },
        { value: 520 },
        { value: 700 },
      ],
    },
    {
      label: "Total Premium",
      value: globalData.total_premium,
      unit: "$",
      trend: 0,
      text: "Current",
      sparkData: [
        { value: 900 },
        { value: 300 },
        { value: 300 },
        { value: 400 },
        { value: 10 },
        { value: 400 },
        { value: 50 },
        { value: 520 },
        { value: 700 },
        { value: 20 },
        { value: 400 },
        { value: 800 },
        { value: 520 },
        { value: 700 },
      ],
    },
    {
      label: "Total Loss",
      value: globalData.total_loss,
      unit: "$",
      trend: 0,
      text: "Current",
      sparkData: [
        { value: 80 },
        { value: 500 },
        { value: 300 },
        { value: 200 },
        { value: 10 },
        { value: 40 },
        { value: 50 },
        { value: 520 },
        { value: 700 },
        { value: 200 },
        { value: 400 },
        { value: 10 },
        { value: 520 },
        { value: 400 },
      ],
    },
  ];
}

export const KPICard = ({
  label,
  value,
  unit,
  trend,
  text,
  sparkData,
  width = null,
}) => {
  return (
    <div
      key={label}
      style={{ width: width ? width : "280px" }}
      className="border rounded-lg p-4 lg:w-[280px] h-[150px] flex flex-col gap-3 shadow-sm"
    >
      <div>
        <span className="text-xs text-gray-500">{label}</span>
        <div className="text-3xl font-bold">
          {formatNum(value, unit)}{" "}
          <span
            className={`text-sm ${
              trend >= 0 ? " text-green-600" : "text-red-500"
            }`}
          >
            {trend >= 0 ? "▲" : "▼"} {trend}%
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <span className="text-s text-gray-500 font-semibold flex-[2]">
          {text}
        </span>
        <div className="w-full h-[20px] flex-[1.5]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkData}>
              <Line
                type="linear"
                dataKey="value"
                stroke="#22c55e"
                strokeWidth={2}
                dot={false}
              ></Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default function KPICards() {
  const { promptData } = usePrompt();
  const summaryKPIs = transformToKPIs(promptData?.global);
  return (
    <div className="grid gap-4 mt-8 md:grid-cols-3">
      {summaryKPIs.map(({ label, value, unit, trend, text, sparkData }) => (
        // <div
        //   key={label}
        //   className="border rounded-lg p-4 lg:w-[280px] h-[150px] flex flex-col gap-3 shadow-sm"
        // >
        //   <div>
        //     <span className="text-xs text-gray-500">{label}</span>
        //     <div className="text-3xl font-bold">
        //       {formatNum(value, unit)}{" "}
        //       <span
        //         className={`text-sm ${
        //           trend >= 0 ? " text-green-600" : "text-red-500"
        //         }`}
        //       >
        //         {trend >= 0 ? "▲" : "▼"} {trend}%
        //       </span>
        //     </div>
        //   </div>

        //   <div className="flex items-center justify-between w-full">
        //     <span className="text-s text-gray-500 font-semibold flex-[2]">
        //       {text}
        //     </span>
        //     <div className="w-full h-[20px] flex-[1.5]">
        //       <ResponsiveContainer width="100%" height="100%">
        //         <LineChart data={sparkData}>
        //           <Line
        //             type="linear"
        //             dataKey="value"
        //             stroke="#22c55e"
        //             strokeWidth={2}
        //             dot={false}
        //           ></Line>
        //         </LineChart>
        //       </ResponsiveContainer>
        //     </div>
        //   </div>
        // </div>
        <KPICard
          label={label}
          value={value}
          unit={unit}
          trend={trend}
          text={text}
          sparkData={sparkData}
        ></KPICard>
      ))}
    </div>
  );
}
