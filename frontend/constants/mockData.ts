// constants/mockData.ts
import { Booking } from "@/types/dashboard";

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "1",
    clientName: "Ahmed El Amrani",
    passportNumber: "AB123456",
    sellingPrice: 12500,
    status: "Paid",
    date: "2024-03-15",
  },
  {
    id: "2",
    clientName: "Sanae Mansouri",
    passportNumber: "CD789012",
    sellingPrice: 8900,
    status: "Pending",
    date: "2024-03-14",
  },
  {
    id: "3",
    clientName: "Yassine Touhami",
    passportNumber: "EF345678",
    sellingPrice: 15000,
    status: "Paid",
    date: "2024-03-13",
  },
];

export const PROGRAM_DATA = [
  { name: "Hajj", count: 45 },
  { name: "Omra", count: 120 },
  { name: "Tourisme", count: 85 },
];

export const SERVICE_PROFITS = [
  { name: "Visas", profit: 4500 },
  { name: "Vols", profit: 12000 },
  { name: "Assurances", profit: 2500 },
  { name: "Hôtels", profit: 8000 },
];
