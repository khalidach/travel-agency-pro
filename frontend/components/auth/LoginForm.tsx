"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

// Schema definition
const loginSchema = z.object({
  agencyName: z.string().min(2, "Agency name is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface AuthDict {
  auth: {
    title: string;
    subtitle: string;
    agencyName: string;
    agencyPlaceholder: string;
    username: string;
    usernamePlaceholder: string;
    password: string;
    loading: string;
    loginButton: string;
  };
}

interface LoginFormProps {
  dict: AuthDict;
  lang: string;
}

export function LoginForm({ dict, lang }: LoginFormProps) {
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include", // <--- CRITICAL: Tells browser to accept the cookie
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      // We do NOT store token in localStorage anymore.
      // The browser automatically stores the HttpOnly cookie.

      router.push(`/${lang}/dashboard`);
      router.refresh(); // Ensure middleware re-runs on navigation
    } catch (err: Error | unknown) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Invalid credentials or connection error",
      );
    } finally {
      setLoading(false);
    }
  };

  const isRtl = lang === "ar";

  return (
    <div className="relative bg-[var(--bg-surface)] border border-[var(--border-default)] py-8 px-8 shadow-xl rounded-xl w-full transition-colors duration-300">
      {/* Top Right Controls */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="bg-[var(--bg-hover)] rounded-md flex items-center p-1">
          <LanguageSwitcher />
        </div>
        <div className="bg-[var(--bg-hover)] rounded-md">
          <ThemeToggle />
        </div>
      </div>

      {/* Header */}
      <div className="mb-8 text-center space-y-2 mt-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--accent-sky-bg)] text-[var(--brand-default)] mb-2">
          <Globe className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          {dict.auth.title}
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          {dict.auth.subtitle}
        </p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        dir={isRtl ? "rtl" : "ltr"}
      >
        {/* Error Message Display */}
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-md">
            {error}
          </div>
        )}

        {/* Agency Name */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-[var(--text-primary)]">
            {dict.auth.agencyName}
          </label>
          <Input
            {...register("agencyName")}
            placeholder={dict.auth.agencyPlaceholder}
            className={`bg-[var(--bg-subtle)] border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:ring-[var(--brand-default)] ${
              isRtl ? "text-right" : ""
            }`}
          />
          {errors.agencyName && (
            <p className="text-xs text-red-500">
              {errors.agencyName.message || "Required"}
            </p>
          )}
        </div>

        {/* Username */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-[var(--text-primary)]">
            {dict.auth.username}
          </label>
          <Input
            {...register("username")}
            placeholder={dict.auth.usernamePlaceholder}
            className={`bg-[var(--bg-subtle)] border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:ring-[var(--brand-default)] ${
              isRtl ? "text-right" : ""
            }`}
          />
          {errors.username && (
            <p className="text-xs text-red-500">
              {errors.username.message || "Required"}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-[var(--text-primary)]">
            {dict.auth.password}
          </label>
          <Input
            type="password"
            {...register("password")}
            placeholder="••••••"
            className={`bg-[var(--bg-subtle)] border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus-visible:ring-[var(--brand-default)] ${
              isRtl ? "text-right" : ""
            }`}
          />
          {errors.password && (
            <p className="text-xs text-red-500">
              {errors.password.message || "Required"}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--brand-default)] hover:bg-[var(--brand-dark)] text-white"
        >
          {loading ? dict.auth.loading : dict.auth.loginButton}
        </Button>
      </form>
    </div>
  );
}
