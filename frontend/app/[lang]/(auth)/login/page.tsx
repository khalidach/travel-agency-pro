import { getDictionary } from "@/lib/get-dictionaries";
import { LoginForm } from "@/components/auth/LoginForm";

export default async function LoginPage({
  params,
}: {
  params: Promise<{ lang: "ar" | "fr" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <LoginForm dict={dict} lang={lang} />;
}
