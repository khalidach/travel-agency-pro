"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0d9488", "#0ea5e9", "#6366f1"];

interface ProgramData {
  name: string;
  count: number;
}

interface ServiceProfitData {
  name: string;
  profit: number;
}

export const ProgramDistribution = ({ data }: { data: ProgramData[] }) => (
  <div className="h-[300px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          stroke="none"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--tooltip-bg, #fff)",
            border: "none",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
          itemStyle={{ color: "var(--tooltip-text, #1e293b)" }}
        />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const ServiceProfitsChart = ({
  data,
  profitLabel, // New prop for translation
}: {
  data: ServiceProfitData[];
  profitLabel: string;
}) => (
  <div className="h-[300px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#e2e8f0"
          className="dark:stroke-slate-800"
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#94a3b8", fontSize: 12 }}
        />
        <Tooltip
          cursor={{ fill: "rgba(148, 163, 184, 0.1)" }}
          contentStyle={{
            backgroundColor: "rgb(15 23 42)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
          }}
        />
        <Bar
          dataKey="profit"
          name={profitLabel} // This ensures the tooltip shows the translated word
          fill="#0d9488"
          radius={[4, 4, 0, 0]}
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
