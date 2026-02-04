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

// Define specific interfaces for the data structures
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
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const ServiceProfitsChart = ({
  data,
}: {
  data: ServiceProfitData[];
}) => (
  <div className="h-[300px] w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#f1f5f9"
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#64748b", fontSize: 12 }}
        />
        <Tooltip cursor={{ fill: "#f8fafc" }} />
        <Bar
          dataKey="profit"
          fill="#0d9488"
          radius={[4, 4, 0, 0]}
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
