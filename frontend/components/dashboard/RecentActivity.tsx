/* khalidach/travel-agency-pro/frontend/components/dashboard/RecentActivity.tsx */
import { Booking } from "@/types/dashboard";

interface RecentActivityProps {
  bookings: Booking[];
  currency: string;
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
  currency,
  dict,
}: RecentActivityProps) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left rtl:text-right">
      <thead>
        <tr className="border-b border-[var(--border-subtle)]">
          <th className="pb-4 font-semibold text-[var(--text-secondary)] text-sm">
            {dict.clientName}
          </th>
          <th className="pb-4 font-semibold text-[var(--text-secondary)] text-sm">
            {dict.passport}
          </th>
          <th className="pb-4 font-semibold text-[var(--text-secondary)] text-sm">
            {dict.price}
          </th>
          <th className="pb-4 font-semibold text-[var(--text-secondary)] text-sm">
            {dict.status}
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[var(--border-subtle)]">
        {bookings.map((booking) => (
          <tr
            key={booking.id}
            className="group hover:bg-[var(--bg-hover)] transition-colors"
          >
            <td className="py-4 text-sm font-medium text-[var(--text-primary)]">
              {booking.clientName}
            </td>
            <td className="py-4 text-sm text-[var(--text-muted)]">
              {booking.passportNumber}
            </td>
            <td className="py-4 text-sm font-semibold text-[var(--text-primary)]">
              {new Intl.NumberFormat("fr-MA").format(booking.sellingPrice)}{" "}
              {currency}
            </td>
            <td className="py-4">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                  booking.status === "Paid"
                    ? "bg-[var(--status-success-bg)] text-[var(--status-success-text)] border-[var(--status-success-border)]"
                    : "bg-[var(--status-warning-bg)] text-[var(--status-warning-text)] border-[var(--status-warning-border)]"
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
