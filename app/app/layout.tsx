import { MainHeader } from "@/components/app/main-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const user = { name: "Usuário (mock)", avatarUrl: "/mock/avatar.jpg" };
  const alertsCount = 3;

  return (
    <main className="min-h-dvh flex flex-col">
      <MainHeader user={user} alertsCount={alertsCount} />
      <div className="container mx-auto px-4 py-6 flex-1">
        {children} {/* <- sem isso, a página some */}
      </div>
    </main>
  );
}
