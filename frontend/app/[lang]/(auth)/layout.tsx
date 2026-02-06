/* frontend/app/[lang]/(auth)/layout.tsx */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-[#0f1115]">
      <div className="w-full max-w-md p-4">{children}</div>
    </div>
  );
}
