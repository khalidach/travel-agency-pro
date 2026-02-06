import { getDictionary } from "@/lib/get-dictionaries";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as "ar" | "fr");

  return <DashboardClient dict={dict} />;
}
