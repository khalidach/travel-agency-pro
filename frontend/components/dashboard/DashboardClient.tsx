/* khalidach/travel-agency-pro/frontend/components/dashboard/DashboardClient.tsx */
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Wallet,
  Briefcase,
  Calendar,
  PieChart as PieIcon,
  LayoutDashboard,
  Filter,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  ProgramDistribution,
  ServiceProfitsChart,
} from "@/components/dashboard/Charts";
import { RecentActivityTable } from "@/components/dashboard/RecentActivity";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import {
  MOCK_BOOKINGS,
  PROGRAM_DATA,
  SERVICE_PROFITS,
} from "@/constants/mockData";

interface DashboardDictionary {
  common: {
    title: string;
    description: string;
    dashboard: string;
    settings: string;
    darkMode: string;
    lightMode: string;
    currency: string;
  };
  dashboard: {
    header: {
      title: string;
      subtitle: string;
    };
    stats: {
      revenue: string;
      profit: string;
      bookings: string;
      programs: string;
    };
    charts: {
      serviceProfits: string;
      programDist: string;
      services: Record<string, string>;
      programs: Record<string, string>;
    };
    table: {
      title: string;
      viewAll: string;
      clientName: string;
      passport: string;
      price: string;
      status: string;
      paid: string;
      pending: string;
    };
  };
}

interface DashboardClientProps {
  dict: DashboardDictionary;
}

export function DashboardClient({ dict }: DashboardClientProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Translate labels for the charts
  const translatedServiceData = useMemo(() => {
    const mapping: Record<string, string> = {
      Visas: dict.dashboard.charts.services.visas,
      Vols: dict.dashboard.charts.services.flights,
      Assurances: dict.dashboard.charts.services.insurance,
      Hôtels: dict.dashboard.charts.services.hotels,
    };
    return SERVICE_PROFITS.map((item) => ({
      ...item,
      name: mapping[item.name] || item.name,
    }));
  }, [dict]);

  const translatedProgramData = useMemo(() => {
    const mapping: Record<string, string> = {
      Hajj: dict.dashboard.charts.programs.hajj,
      Omra: dict.dashboard.charts.programs.omra,
      Tourisme: dict.dashboard.charts.programs.tourism,
    };
    return PROGRAM_DATA.map((item) => ({
      ...item,
      name: mapping[item.name] || item.name,
    }));
  }, [dict]);

  if (loading) {
    return (
      <div className="p-8">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-subtle)] p-4 md:p-8 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            {dict.dashboard.header.title}
          </h1>
          <p className="text-[var(--text-muted)]">
            {dict.dashboard.header.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[var(--bg-surface)] p-2 rounded-lg border border-[var(--border-default)] shadow-sm">
          <Calendar className="w-4 h-4 text-[var(--icon-muted)] mx-2" />
          <input
            type="date"
            className="text-sm border-none bg-transparent focus:ring-0 text-[var(--text-secondary)] cursor-pointer"
          />
          <span className="text-[var(--text-tertiary)]">→</span>
          <input
            type="date"
            className="text-sm border-none bg-transparent focus:ring-0 text-[var(--text-secondary)] cursor-pointer"
          />
          <button className="bg-[var(--brand-default)] text-white p-1.5 rounded-md hover:bg-[var(--brand-dark)] transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title={dict.dashboard.stats.revenue}
          value={`450 230 ${dict.common.currency}`}
          icon={Wallet}
          colorClass="bg-[var(--accent-teal-bg)] text-[var(--accent-teal-text)]"
        />
        <StatCard
          title={dict.dashboard.stats.profit}
          value={`82 400 ${dict.common.currency}`}
          icon={LayoutDashboard}
          colorClass="bg-[var(--accent-sky-bg)] text-[var(--accent-sky-text)]"
        />
        <StatCard
          title={dict.dashboard.stats.bookings}
          value="156"
          icon={Calendar}
          colorClass="bg-[var(--accent-indigo-bg)] text-[var(--accent-indigo-text)]"
        />
        <StatCard
          title={dict.dashboard.stats.programs}
          value="12"
          icon={Briefcase}
          colorClass="bg-[var(--accent-cyan-bg)] text-[var(--accent-cyan-text)]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-[var(--bg-surface)] p-6 rounded-xl border border-[var(--border-default)] shadow-sm">
          <h3 className="font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-[var(--brand-default)]" />
            {dict.dashboard.charts.serviceProfits}
          </h3>
          <ServiceProfitsChart
            data={translatedServiceData}
            profitLabel={dict.dashboard.stats.profit}
          />
        </div>

        <div className="bg-[var(--bg-surface)] p-6 rounded-xl border border-[var(--border-default)] shadow-sm">
          <h3 className="font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-[var(--brand-light)]" />
            {dict.dashboard.charts.programDist}
          </h3>
          <ProgramDistribution data={translatedProgramData} />
        </div>
      </div>

      <div className="bg-[var(--bg-surface)] p-6 rounded-xl border border-[var(--border-default)] shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-[var(--text-primary)]">
            {dict.dashboard.table.title}
          </h3>
          <button className="text-sm text-[var(--brand-default)] font-semibold hover:underline">
            {dict.dashboard.table.viewAll}
          </button>
        </div>
        <RecentActivityTable
          bookings={MOCK_BOOKINGS}
          dict={dict.dashboard.table}
          currency={dict.common.currency}
        />
      </div>
    </div>
  );
}
