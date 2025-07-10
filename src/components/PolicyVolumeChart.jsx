import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianAxis,
  CartesianGrid,
} from "recharts";
// import { regionVolumes } from "../data/mockData";
import { usePrompt } from "./PromptContext";

export default function PolicyVolumeChart() {
  const { promptData } = usePrompt();

  const countryStats = promptData?.global?.country_stats;

  const regionVolumes = Object.entries(countryStats).map(
    ([country, volume]) => ({
      region: country,
      vol: volume,
    })
  );

  console.log("Converted regionVolumes:", regionVolumes);
  return (
    <div className="mt-8 border rounded-lg p-4 h-[250px] shadow-sm">
      <h3 className="text-sm text-gray-500 mb-2">Policy Volume by Region</h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="70%">
          <BarChart
            data={regionVolumes}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              dataKey="region"
              tick={{ fontSize: 12, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar
              dataKey="vol"
              radius={[10, 10, 10, 10]}
              fill="rgba(251,78,11)"
              barSize={10}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
