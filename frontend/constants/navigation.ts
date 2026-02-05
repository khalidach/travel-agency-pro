// frontend/constants/navigation.ts
import {
  LayoutDashboard,
  Briefcase,
  Settings,
  Users,
  FileText,
} from "lucide-react";
import { MenuItem } from "@/types/navigation";

export const MENU_CONFIG: MenuItem[] = [
  {
    title: "dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    roles: ["admin", "agent"],
  },
  {
    title: "management",
    icon: Briefcase,
    roles: ["admin", "manager"],
    subItems: [
      { title: "bookings", href: "/bookings" },
      { title: "programs", href: "/programs" },
    ],
  },
  {
    title: "clients",
    icon: Users,
    href: "/clients",
    roles: ["admin", "agent"],
  },
  {
    title: "reports",
    icon: FileText,
    href: "/reports",
    roles: ["admin"],
  },
  {
    title: "settings",
    icon: Settings,
    href: "/settings",
    roles: ["admin"],
  },
];
