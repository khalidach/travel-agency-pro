"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";

// 1. Validation Schema
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

  // Unwrapping params safely
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
      console.log("Attempting Login:", data);

      // TODO: Connect to NestJS Backend here
      // const res = await fetch('http://localhost:3001/auth/login', { ... })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success Redirect
      router.push(`/${lang}/dashboard`);
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#151920] py-8 px-8 shadow-xl rounded-xl border border-gray-100 dark:border-gray-800">
      {/* Header Section */}
      <div className="mb-8 text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-2">
          <Globe className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Trevio Portal
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Secure access for agencies
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Agency Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nom de l&apos;Agence
          </label>
          <Input
            {...register("agencyName")}
            placeholder="ex: Trevio Travel"
            autoComplete="organization"
          />
          {errors.agencyName && (
            <p className="text-xs text-red-500">{errors.agencyName.message}</p>
          )}
        </div>

        {/* Username */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nom d&apos;utilisateur
          </label>
          <Input
            {...register("username")}
            placeholder="ex: admin"
            autoComplete="username"
          />
          {errors.username && (
            <p className="text-xs text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Mot de passe
          </label>
          <Input
            type="password"
            {...register("password")}
            placeholder="••••••"
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 rounded bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
              Connexion...
            </span>
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>
    </div>
  );
}
