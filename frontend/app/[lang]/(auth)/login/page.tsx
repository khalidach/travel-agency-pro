"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";

// Import your existing components
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// Validation Schema
const loginSchema = z.object({
  agencyName: z.string().min(2, "Agency name is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const [lang, setLang] = React.useState("fr");

  React.useEffect(() => {
    params.then((p) => setLang(p.lang));
  }, [params]);

  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      console.log("Login:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(`/${lang}/dashboard`);
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white dark:bg-[#151920] py-8 px-8 shadow-xl rounded-xl border border-gray-100 dark:border-gray-800 w-full max-w-md">
      {/* Top Right Controls: Language & Theme */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-md flex items-center p-1">
          <LanguageSwitcher />
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-md">
          <ThemeToggle />
        </div>
      </div>

      {/* Header Section */}
      <div className="mb-8 text-center space-y-2 mt-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-2">
          <Globe className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {lang === "ar" ? "تسجيل الدخول" : "Connexion"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {lang === "ar"
            ? "أدخل تفاصيل حسابك"
            : "Accédez à votre espace agence"}
        </p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        {/* Agency Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {lang === "ar" ? "اسم الوكالة" : "Nom de l'Agence"}
          </label>
          <Input
            {...register("agencyName")}
            placeholder={lang === "ar" ? "تريفيو للسفر" : "ex: Trevio Travel"}
            className={lang === "ar" ? "text-right" : ""}
          />
          {errors.agencyName && (
            <p className="text-xs text-red-500">{errors.agencyName.message}</p>
          )}
        </div>

        {/* Username */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {lang === "ar" ? "اسم المستخدم" : "Nom d'utilisateur"}
          </label>
          <Input
            {...register("username")}
            placeholder={lang === "ar" ? "أدمن" : "ex: admin"}
            className={lang === "ar" ? "text-right" : ""}
          />
          {errors.username && (
            <p className="text-xs text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {lang === "ar" ? "كلمة المرور" : "Mot de passe"}
          </label>
          <Input
            type="password"
            {...register("password")}
            placeholder="••••••"
            className={lang === "ar" ? "text-right" : ""}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "..." : lang === "ar" ? "دخول" : "Se connecter"}
        </Button>
      </form>
    </div>
  );
}
