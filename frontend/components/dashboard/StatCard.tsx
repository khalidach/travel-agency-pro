/* khalidach/travel-agency-pro/frontend/components/dashboard/StatCard.tsx */
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
  <div className="bg-[var(--bg-surface)] p-6 rounded-xl border border-[var(--border-default)] shadow-sm hover:shadow-md transition-all">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[var(--text-muted)]">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-[var(--text-primary)]">
          {value}
        </h3>
      </div>
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);
