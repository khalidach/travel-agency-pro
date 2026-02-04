// types/dashboard.ts
export type ProgramType = "Hajj" | "Umrah" | "Tourism";
export type PaymentStatus = "Paid" | "Pending";

export interface Booking {
  id: string;
  clientName: string;
  passportNumber: string;
  sellingPrice: number;
  status: PaymentStatus;
  date: string;
}

export interface ProgramStats {
  name: ProgramType;
  value: number;
}
