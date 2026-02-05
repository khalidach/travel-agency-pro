// frontend/types/navigation.ts
import { LucideIcon } from "lucide-react";

export interface SubMenuItem {
  title: string;
  href: string;
  accessKey?: string; // Key to check against user limits
}

export interface MenuItem {
  title: string;
  icon: LucideIcon;
  href?: string;
  roles?: string[]; // Allowed roles (e.g., ['admin', 'manager'])
  subItems?: SubMenuItem[];
  accessKey?: string;
}
