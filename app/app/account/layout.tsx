// app/app/account/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const IconDashboard = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm10 0h8v5h-8V3zM3 13h8v8H3v-8zm10 5h8v3h-8v-3z"/></svg>
);
const IconStore = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18v2H3zM5 7h14v13H5z"/></svg>
);
const IconCart = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4h-2l-1 2H1v2h2l3.6 7.59L5 19a2 2 0 102 0h8a2 2 0 102 0h-9l1.1-2h7.45a2 2 0 001.8-1.1L23 9H6.42l-.94-2H7V4z"/></svg>
);
const IconBank = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM3 10v9h18v-9l-9 4.5L3 10z"/></svg>
);
const IconHelp = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm2.07-7.75l-.9.92A2 2 0 0013 12h-2v-.5a3 3 0 01.88-2.12l1.24-1.26a1.5 1.5 0 10-2.12-2.12l-.92.92L8.6 5.7a3.5 3.5 0 014.95 4.95z"/></svg>
);

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const crumbs = [
    { name: "Início", href: "/" },
    { name: "Minha conta", href: "/app/account" },
    ...(pathname?.split("/").filter(Boolean).slice(2) || []).map((seg, i, arr) => {
      const href = "/app/" + arr.slice(0, i + 1).join("/");
      return { name: seg.replace(/-/g, " "), href };
    }),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header from root layout */}

      <div className="flex-1 bg-base-200/50">
        <div className="container mx-auto px-4 py-6">
          {/* GRID: fixed 16rem sidebar + fluid content; tighter gap */}
          <div className="grid grid-cols-[16rem_minmax(0,1fr)] gap-2">
            {/* Sidebar (everything constrained to 16rem) */}
            <aside className="space-y-3 w-[16rem]">
              {/* Dashboard panel (gradient) */}
              <Link
                href="/app/account"
                className={`block w-full overflow-hidden rounded-2xl p-4 text-base-100 bg-gradient-to-r from-primary to-secondary shadow-sm border border-base-200 ${
                  pathname === "/app/account" ? "" : "opacity-90 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-2 font-semibold">
                  <IconDashboard /> <span>Dashboard</span>
                </div>
              </Link>

              {/* Accordion menu (same width & radius) */}
              <div className="menu bg-base-100 rounded-2xl border border-base-200 shadow-sm w-full">
                <div className="collapse collapse-arrow">
                  <input type="checkbox" defaultChecked />
                  <div className="collapse-title flex items-center gap-2">
                    <IconStore /> <span>Vendas</span>
                  </div>
                  <div className="collapse-content border-l-2 border-base-300 pl-4">
                    <ul className="menu menu-sm">
                      <li><Link href="/app/sales">Minhas vendas</Link></li>
                      <li><Link href="/app/auctions">Leilões</Link></li>
                      <li><Link href="/app/products">Produtos</Link></li>
                    </ul>
                  </div>
                </div>

                <div className="collapse collapse-arrow">
                  <input type="checkbox" />
                  <div className="collapse-title flex items-center gap-2">
                    <IconCart /> <span>Compras</span>
                  </div>
                  <div className="collapse-content border-l-2 border-base-300 pl-4">
                    <ul className="menu menu-sm">
                      <li><Link href="/app/orders">Pedidos</Link></li>
                      <li><Link href="/app/following">Seguindo</Link></li>
                    </ul>
                  </div>
                </div>

                <div className="collapse collapse-arrow">
                  <input type="checkbox" />
                  <div className="collapse-title flex items-center gap-2">
                    <IconBank /> <span>Financeiro</span>
                  </div>
                  <div className="collapse-content border-l-2 border-base-300 pl-4">
                    <ul className="menu menu-sm">
                      <li><Link href="/app/bank">Contas bancárias</Link></li>
                      <li><Link href="/app/reimbursements">Reembolsos</Link></li>
                      <li><Link href="/app/payouts">Saques</Link></li>
                    </ul>
                  </div>
                </div>

                <div className="collapse collapse-arrow">
                  <input type="checkbox" />
                  <div className="collapse-title flex items-center gap-2">
                    <IconHelp /> <span>Suporte</span>
                  </div>
                  <div className="collapse-content border-l-2 border-base-300 pl-4">
                    <ul className="menu menu-sm">
                      <li><Link href="/app/questions">Perguntas</Link></li>
                      <li><Link href="/app/tickets">Tickets</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main */}
            <main className="min-w-0 space-y-6">
              <nav aria-label="breadcrumbs" className="breadcrumbs text-sm">
                <ul>
                  {crumbs.map((c, i) => (
                    <li key={i}>
                      {i < crumbs.length - 1 ? <Link href={c.href}>{c.name}</Link> : <span>{c.name}</span>}
                    </li>
                  ))}
                </ul>
              </nav>

              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}