"use client";

import { useState, useRef } from "react";
import {
  User,
  ChevronDown,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useClickOutside } from "@/hooks/useClickOutside";

interface HeaderDictionary {
  common: {
    title: string;
    settings: string;
    logout: string;
  };
  dashboard: {
    header: {
      title: string;
    };
  };
}

interface HeaderProps {
  dict: HeaderDictionary;
  lang: string;
}

export function Header({ dict, lang }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsProfileOpen(false));

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-teal-600 dark:text-teal-400">
          {dict.common.title}
        </h2>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
          {dict.dashboard.header.title}
        </p>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <LanguageSwitcher />
        <ThemeToggle />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
              <User size={18} />
            </div>
            <ChevronDown
              size={14}
              className={`text-slate-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isProfileOpen && (
            <div
              className={`absolute ${lang === "ar" ? "left-0" : "right-0"} mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg py-1 z-50`}
            >
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Admin User
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  admin@trevio.ma
                </p>
              </div>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <SettingsIcon size={16} /> {dict.common.settings}
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                <LogOut size={18} />
                <span className="text-sm font-medium hidden md:block">
                  {dict.common.logout}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
