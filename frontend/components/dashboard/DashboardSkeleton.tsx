// components/dashboard/DashboardSkeleton.tsx
export const DashboardSkeleton = () => (
  <div className="space-y-8 animate-pulse">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-32 bg-slate-100 rounded-xl" />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="h-80 bg-slate-100 rounded-xl lg:col-span-2" />
      <div className="h-80 bg-slate-100 rounded-xl" />
    </div>
  </div>
);
