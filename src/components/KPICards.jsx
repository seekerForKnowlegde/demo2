import { Line, LineChart, ResponsiveContainer } from "recharts";
import { summaryKPIs } from "../data/mockData";

function formatNum(n, unit) {
  if (unit === "$") return `${unit}${(n / 1000).toLocaleString()}K`;
  return n.toLocaleString();
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
