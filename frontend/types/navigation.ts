// frontend/types/navigation.ts
import { LucideIcon } from "lucide-react";

export interface SubMenuItem {
  title: string;
  href: string;
}

export interface MenuItem {
  title: string;
  icon: LucideIcon;
  href?: string;
  roles?: string[]; // Allowed roles (e.g., ['admin', 'manager'])
  subItems?: SubMenuItem[];
}
