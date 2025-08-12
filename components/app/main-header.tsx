// =============================================
// New: Global App Header for Logged-in users
// Reusable across all authenticated pages
// =============================================

// ---------------------------------
// components/app/main-header.tsx
// ---------------------------------
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type User = { name: string; avatarUrl?: string };
export function MainHeader({ user, alertsCount = 0 }: { user: User; alertsCount?: number }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const hasAlerts = alertsCount > 0;

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-base-100/80 border-b border-base-200">
      <div className="navbar container mx-auto px-4">
        {/* Left: Brand */}
        <div className="navbar-start gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {/* placeholder logo - replace with final SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5"><path fill="currentColor" d="M12 2c1.7 0 3 1.3 3 3v1.2c1.8.6 3 2.3 3 4.2v.6h-2.5l1.5 5H15l-1-3h-4l-1 3H7l1.5-5H6V10.4c0-1.9 1.2-3.6 3-4.2V5c0-1.7 1.3-3 3-3z"/></svg>
            </span>
            <span className="text-xl font-bold tracking-tight">MercadoBG</span>
          </Link>
        </div>

        {/* Center: quick actions */}
        <div className="navbar-center hidden md:flex">
          <nav className="menu menu-horizontal px-1">
            <li><Link href="/search">Explorar</Link></li>
            <li><Link href="/auctions">Leilões</Link></li>
            <li><Link href="/sell">Vender</Link></li>
          </nav>
        </div>

        {/* Right: alerts, search, user */}
        <div className="navbar-end gap-2">
          {/* Alerts with indicator */}
          <button className="btn btn-ghost btn-circle" aria-label="Alertas">
            <div className="indicator">
              {hasAlerts && <span className="indicator-item badge badge-error badge-xs" />}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6"><path fill="currentColor" d="M12 2a6 6 0 0 0-6 6v3.1l-1.4 2.8A1 1 0 0 0 5.5 16h13a1 1 0 0 0 .9-1.5L18 11.1V8a6 6 0 0 0-6-6zm0 20a3 3 0 0 0 3-3H9a3 3 0 0 0 3 3z"/></svg>
            </div>
          </button>

          {/* Open search bar */}          
          <button
            type="button"
            aria-label="Abrir busca"
            className="btn btn-ghost btn-circle"
            onClick={() => (window as any).openSearchModal?.()}
          >
            {/* ícone de lupa */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round"
                strokeLinejoin="round" strokeWidth="2"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" /></svg>
          </button>

          {/* User dropdown */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost gap-2">
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <Image src={user.avatarUrl || "/mock/avatar.jpg"} alt={user.name} width={32} height={32} />
                </div>
              </div>
              <span className="hidden sm:inline-block max-w-[140px] truncate text-left">{user.name}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 opacity-60"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 p-2 shadow">
              <li><Link href="/profile">Perfil</Link></li>
              <li><Link href="/orders">Minhas compras</Link></li>
              <li><Link href="/sales">Minhas vendas</Link></li>
              <li><Link href="/watchlist">Watchlist</Link></li>
              <li><Link href="/settings">Configurações</Link></li>
              <li><form action="/api/logout" method="post"><button type="submit">Sair</button></form></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Search modal */}
      {searchOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl">
            <form action="/search" className="join w-full">
              <input autoFocus name="q" className="input input-bordered join-item w-full" placeholder="Busque por título, editor, mecânica..." />
              <select name="category" className="select select-bordered join-item hidden sm:block">
                <option value="">Todas</option>
                <option>Euro</option>
                <option>Ameritrash</option>
                <option>Família</option>
                <option>Party</option>
                <option>Miniaturas</option>
              </select>
              <button className="btn btn-primary join-item" type="submit" onClick={() => setSearchOpen(false)}>Pesquisar</button>
            </form>
            <div className="modal-action">
              <button className="btn" onClick={() => setSearchOpen(false)}>Fechar</button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setSearchOpen(false)} />
        </div>
      )}
    </header>
  );
}