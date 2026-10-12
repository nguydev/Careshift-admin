/* eslint-disable react/prop-types */
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useWorkerJoiningChartQuery } from "../redux/features/admin/dashboard/dashboardApi";

const DashboardHomeTable = () => {
  const [year, setYear] = useState(dayjs().year());
  const { data: apiData } = useWorkerJoiningChartQuery(year);

  // Transform API data to match chart expectations
  const chartData =
    apiData?.data?.map((item) => ({
      month: item.Month.substring(0, 3), // Convert "January" to "Jan"
      value: item.Value,
    })) || [];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-200 p-1 rounded shadow text-center text-sm">
          {payload[0].value}
        </div>
      );
    }
    return null;
  };

  const handleYearChange = (date) => {
    setYear(date?.year() ?? null);
  };

  return (
    <div className="bg-cyan-50 rounded shadow-sm border p-4 max-w-full">
      {/* Header */}
      <div className="flex justify-between items-center bg-cyan-400 p-3 rounded-t">
        <h2 className="text-white font-bold text-xl">Workers Joining chart</h2>
        <DatePicker
          picker="year"
          value={dayjs().year(year)}
          onChange={handleYearChange}
        />
      </div>

      {/* Chart */}
      <div style={{ width: "100%", height: 440 }} className="mt-4">
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 20, bottom: 5 }}>
            <XAxis
              tick={{ stroke: "#464343", strokeWidth: 0.5, fill: "#5E9A2D" }}
              style={{ fontWeight: "400", color: "#FFFFFF" }}
              dataKey="month"
            />
            <YAxis
              tickCount={6}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, "dataMax + 5"]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f0f0f0" }} />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
              isAnimationActive={false}
              fill="#52D3E4"
            >
              <LabelList dataKey="value" position="top" formatter={chartData} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardHomeTable;
