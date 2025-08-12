import { MainHeader } from "@/components/app/main-header";
import { SearchModal } from "@/components/app/search-modal";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const user = { name: "Usuário (mock)", avatarUrl: "/mock/avatar-01.png" };
  const alertsCount = 3;

  return (
    <>
      <MainHeader user={user} alertsCount={alertsCount} />
      <div className="container mx-auto px-4 py-6">{children}</div>
      <SearchModal />
    </>
  );
}
