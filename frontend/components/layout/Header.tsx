/* khalidach/travel-agency-pro/frontend/components/layout/Header.tsx */
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
    <header className="h-16 border-b border-[var(--border-default)] bg-[var(--bg-surface)] px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-4">
        {/* Updated to use semantic brand color */}
        <h2 className="text-xl font-bold text-brand">{dict.common.title}</h2>
        <span className="text-[var(--text-tertiary)]">|</span>
        <p className="text-sm font-medium text-[var(--text-muted)] hidden sm:block">
          {dict.dashboard.header.title}
        </p>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <LanguageSwitcher />
        <ThemeToggle />

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--box-color)] flex items-center justify-center text-brand">
              <User size={18} color="var(--bg-surface)" />
            </div>
            <ChevronDown
              size={14}
              className={`text-[var(--icon-muted)] transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isProfileOpen && (
            <div
              className={`absolute ${lang === "ar" ? "left-0" : "right-0"} mt-2 w-48 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-xl shadow-lg py-1 z-50`}
            >
              <div className="px-4 py-2 border-b border-[var(--border-subtle)]">
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Admin User
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  admin@trevio.ma
                </p>
              </div>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-subtle)] transition-colors">
                <SettingsIcon size={16} /> {dict.common.settings}
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[var(--logout-color)] hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                <LogOut size={18} color="var(--logout-color)" />
                <span className="text-sm font-medium hidden md:block text-[var(--logout-color)]">
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
