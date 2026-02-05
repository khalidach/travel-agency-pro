"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Updated ThemeToggle with smooth absolute transitions and hydration handling.
 * Based on the existing component structure.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch by ensuring the component is mounted before rendering theme-specific icons
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-2 w-9 h-9" aria-hidden="true" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
      aria-label="Toggle theme"
    >
      <div className="relative h-5 w-5">
        {/* Sun Icon: Rotates out and scales down in dark mode with a 500ms ease-in-out transition */}
        <Sun className="h-5 w-5 absolute top-0 left-0 rotate-0 scale-100 transition-all duration-500 ease-in-out dark:-rotate-90 dark:scale-0" />
        {/* Moon Icon: Rotates in and scales up in dark mode with a 500ms ease-in-out transition */}
        <Moon className="h-5 w-5 absolute top-0 left-0 rotate-90 scale-0 transition-all duration-500 ease-in-out dark:rotate-0 dark:scale-100" />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
