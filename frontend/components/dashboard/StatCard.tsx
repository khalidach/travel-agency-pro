// components/dashboard/StatCard.tsx
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  colorClass: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  colorClass,
}: StatCardProps) => (
  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-slate-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);
