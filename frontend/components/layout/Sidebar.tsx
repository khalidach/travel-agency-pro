// frontend/components/layout/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { MENU_CONFIG } from "@/constants/navigation";

interface SidebarDictionary {
  dashboard: {
    charts: {
      services: Record<string, string>;
    };
  };
}

interface SidebarProps {
  dict: SidebarDictionary;
  userRole: string;
}

export function Sidebar({ dict, userRole }: SidebarProps) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const filteredMenu = MENU_CONFIG.filter(
    (item) => !item.roles || item.roles.includes(userRole),
  );

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 h-[calc(100vh-64px)] overflow-y-auto hidden lg:block transition-colors">
      <nav className="p-4 space-y-2">
        {filteredMenu.map((item) => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isOpen = openSubmenu === item.title;

          return (
            <div key={item.title} className="space-y-1">
              {hasSubItems ? (
                <>
                  <button
                    onClick={() => setOpenSubmenu(isOpen ? null : item.title)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-sm font-medium transition-colors ${
                      isOpen
                        ? "bg-slate-50 dark:bg-slate-900 text-teal-600"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span>
                        {dict.dashboard.charts.services[item.title] ||
                          item.title}
                      </span>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="ltr:ml-9 rtl:mr-9 space-y-1">
                      {item.subItems?.map((sub) => (
                        <Link
                          key={sub.href}
                          href={`/${sub.href}`}
                          className={`flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                            pathname.includes(sub.href)
                              ? "text-teal-600 font-semibold"
                              : "text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                          }`}
                        >
                          <span>
                            {dict.dashboard.charts.services[sub.title] ||
                              sub.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={`/${item.href}`}
                  className={`flex items-center justify-between p-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname.includes(item.href || "")
                      ? "bg-teal-50 dark:bg-teal-900/20 text-teal-600"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    <span>
                      {dict.dashboard.charts.services[item.title] || item.title}
                    </span>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
