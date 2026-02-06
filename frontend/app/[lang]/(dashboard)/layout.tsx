/* frontend/app/[lang]/(dashboard)/layout.tsx */
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { getDictionary } from "@/lib/get-dictionaries";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: "ar" | "fr" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // Mock user for layout (Will come from auth later)
  const user = { role: "admin" };

  return (
    <div className="min-h-screen flex flex-col">
      <Header dict={dict} lang={lang} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar dict={dict} userRole={user.role} lang={lang} />
        <main className="flex-1 overflow-y-auto relative bg-[var(--bg-subtle)]">
          {children}
        </main>
      </div>
    </div>
  );
}
