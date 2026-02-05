"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Lock } from "lucide-react";
import { MENU_CONFIG } from "@/constants/navigation";

/**
 * Interface representing the structure of the translation dictionary
 * required by the Sidebar component.
 */
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
  userLimits: Record<string, boolean>;
}

export function Sidebar({ dict, userRole, userLimits }: SidebarProps) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const checkAccess = (accessKey?: string) => {
    if (!accessKey) return true;
    return userLimits[accessKey] !== false;
  };

  const filteredMenu = MENU_CONFIG.filter(
    (item) => !item.roles || item.roles.includes(userRole),
  );

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 h-[calc(100vh-64px)] overflow-y-auto hidden lg:block transition-colors">
      <nav className="p-4 space-y-2">
        {filteredMenu.map((item) => {
          const hasAccess = checkAccess(item.accessKey);
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
                      {item.subItems?.map((sub) => {
                        const subHasAccess = checkAccess(sub.accessKey);
                        return (
                          <Link
                            key={sub.href}
                            href={subHasAccess ? `/${sub.href}` : "#"}
                            className={`flex items-center justify-between p-2 rounded-lg text-sm transition-colors ${
                              pathname.includes(sub.href)
                                ? "text-teal-600 font-semibold"
                                : "text-slate-500 dark:text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
                            } ${!subHasAccess ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            <span>
                              {dict.dashboard.charts.services[sub.title] ||
                                sub.title}
                            </span>
                            {!subHasAccess && <Lock size={12} />}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={hasAccess ? `/${item.href}` : "#"}
                  className={`flex items-center justify-between p-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname.includes(item.href || "")
                      ? "bg-teal-50 dark:bg-teal-900/20 text-teal-600"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                  } ${!hasAccess ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    <span>
                      {dict.dashboard.charts.services[item.title] || item.title}
                    </span>
                  </div>
                  {!hasAccess && <Lock size={14} />}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
