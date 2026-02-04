// components/dashboard/RecentActivity.tsx
import { Booking } from "@/types/dashboard";

interface RecentActivityProps {
  bookings: Booking[];
  dict: {
    clientName: string;
    passport: string;
    price: string;
    status: string;
    paid: string;
    pending: string;
  };
}

export const RecentActivityTable = ({
  bookings,
  dict,
}: RecentActivityProps) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left rtl:text-right">
      <thead>
        <tr className="border-b border-slate-100 dark:border-slate-800">
          <th className="pb-4 font-semibold text-slate-600 dark:text-slate-400 text-sm">
            {dict.clientName}
          </th>
          <th className="pb-4 font-semibold text-slate-600 dark:text-slate-400 text-sm">
            {dict.passport}
          </th>
          <th className="pb-4 font-semibold text-slate-600 dark:text-slate-400 text-sm">
            {dict.price}
          </th>
          <th className="pb-4 font-semibold text-slate-600 dark:text-slate-400 text-sm">
            {dict.status}
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
        {bookings.map((booking) => (
          <tr
            key={booking.id}
            className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <td className="py-4 text-sm font-medium text-slate-900 dark:text-slate-200">
              {booking.clientName}
            </td>
            <td className="py-4 text-sm text-slate-500 dark:text-slate-400">
              {booking.passportNumber}
            </td>
            <td className="py-4 text-sm font-semibold text-slate-900 dark:text-white">
              {new Intl.NumberFormat("fr-MA").format(booking.sellingPrice)} DH
            </td>
            <td className="py-4">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  booking.status === "Paid"
                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50"
                    : "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-800/50"
                }`}
              >
                {booking.status === "Paid" ? dict.paid : dict.pending}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
