/* khalidach/travel-agency-pro/frontend/components/dashboard/Charts.tsx */
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
            <Cell
              key={`cell-${index}`}
              fill={`var(--text-type${(index % 3) + 1})`}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--tooltip-bg)",
            borderColor: "var(--tooltip-border)",
            borderRadius: "8px",
            color: "var(--tooltip-text2)",
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
          }}
          itemStyle={{ color: "var(--tooltip-text)" }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value) => (
            <span className="text-[var(--text-secondary)] text-sm">
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export const ServiceProfitsChart = ({
  data,
  profitLabel,
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
          stroke="var(--chart-grid)"
        />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--chart-text)", fontSize: 12 }}
          dy={10}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "var(--chart-text)", fontSize: 12 }}
        />
        <Tooltip
          cursor={{ fill: "var(--bg-hover)" }}
          contentStyle={{
            backgroundColor: "var(--tooltip-bg)",
            borderColor: "var(--tooltip-border)",
            borderRadius: "8px",
            color: "var(--tooltip-text)",
          }}
          itemStyle={{ color: "var(--tooltip-text2)" }}
        />
        <Bar
          dataKey="profit"
          name={profitLabel}
          fill="var(--brand-default)"
          radius={[4, 4, 0, 0]}
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
);
