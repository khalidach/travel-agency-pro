// app/dashboard/page.tsx
"use client";
import { useState, useEffect } from "react";
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

export default function TrevioDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div className="p-8">
        <DashboardSkeleton />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      {/* Header & Global Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Aperçu de l&apos;Agence
          </h1>
          <p className="text-slate-500">
            Bon retour sur votre tableau de bord Trevio
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200 shadow-sm">
          <Calendar className="w-4 h-4 text-slate-400 ml-2" />
          <input
            type="date"
            className="text-sm border-none focus:ring-0 text-slate-600 cursor-pointer"
          />
          <span className="text-slate-300">→</span>
          <input
            type="date"
            className="text-sm border-none focus:ring-0 text-slate-600 cursor-pointer"
          />
          <button className="bg-teal-600 text-white p-1.5 rounded-md hover:bg-teal-700 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Top Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Chiffre d'Affaires"
          value="450 230 DH"
          icon={Wallet}
          colorClass="bg-teal-50 text-teal-600"
        />
        <StatCard
          title="Bénéfice Net"
          value="82 400 DH"
          icon={LayoutDashboard}
          colorClass="bg-sky-50 text-sky-600"
        />
        <StatCard
          title="Réservations Actives"
          value="156"
          icon={Calendar}
          colorClass="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Programmes"
          value="12"
          icon={Briefcase}
          colorClass="bg-cyan-50 text-cyan-600"
        />
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-teal-600" />
            Répartition des Profits par Service
          </h3>
          <ServiceProfitsChart data={SERVICE_PROFITS} />
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-sky-600" />
            Distribution des Programmes
          </h3>
          <ProgramDistribution data={PROGRAM_DATA} />
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800">Réservations Récentes</h3>
          <button className="text-sm text-teal-600 font-semibold hover:underline">
            Voir tout
          </button>
        </div>
        <RecentActivityTable bookings={MOCK_BOOKINGS} />
      </div>
    </div>
  );
}
