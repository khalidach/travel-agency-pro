// frontend/app/[lang]/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { getDictionary } from "@/lib/get-dictionaries";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang = "fr" } = await params;
  const dict = await getDictionary(lang as "ar" | "fr");

  return {
    title: `${dict.common.title} - ${dict.common.dashboard}`,
    description: dict.common.description,
  };
}

export async function generateStaticParams() {
  return [{ lang: "ar" }, { lang: "fr" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang?: string }>;
}) {
  const { lang = "fr" } = await params;
  const direction = lang === "ar" ? "rtl" : "ltr";
  const dict = await getDictionary(lang as "ar" | "fr");

  // Mock user data for initialization
  const user = {
    role: "admin",
  };

  return (
    <html lang={lang} dir={direction} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header dict={dict} lang={lang} />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar dict={dict} userRole={user.role} />
              <main className="flex-1 overflow-y-auto relative">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
