// components/dashboard/RecentActivity.tsx
import { Booking } from "@/types/dashboard";

export const RecentActivityTable = ({ bookings }: { bookings: Booking[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-slate-100">
          <th className="pb-4 font-semibold text-slate-600 text-sm">
            Nom du Client
          </th>
          <th className="pb-4 font-semibold text-slate-600 text-sm">
            Passeport
          </th>
          <th className="pb-4 font-semibold text-slate-600 text-sm">Prix</th>
          <th className="pb-4 font-semibold text-slate-600 text-sm">Statut</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {bookings.map((booking) => (
          <tr
            key={booking.id}
            className="group hover:bg-slate-50 transition-colors"
          >
            <td className="py-4 text-sm font-medium text-slate-900">
              {booking.clientName}
            </td>
            <td className="py-4 text-sm text-slate-500">
              {booking.passportNumber}
            </td>
            <td className="py-4 text-sm font-semibold text-slate-900">
              {new Intl.NumberFormat("fr-MA").format(booking.sellingPrice)} DH
            </td>
            <td className="py-4">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  booking.status === "Paid"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-amber-50 text-amber-700 border border-amber-100"
                }`}
              >
                {booking.status === "Paid" ? "Payé" : "En attente"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
