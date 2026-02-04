"use client";

import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const redirectedPathname = (locale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => router.push(redirectedPathname("fr"))}
        className="px-2 py-1 text-sm font-medium hover:underline"
      >
        FR
      </button>
      <button
        onClick={() => router.push(redirectedPathname("ar"))}
        className="px-2 py-1 text-sm font-medium hover:underline"
      >
        AR
      </button>
    </div>
  );
}
