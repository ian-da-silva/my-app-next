// ---------------------------------
// components/landing/site-nav.tsx
// ---------------------------------
"use client";
import Link from "next/link";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-base-100/80 border-b border-base-200">
      <div className="navbar container mx-auto px-4">
        <div className="navbar-start gap-2">
          <label htmlFor="menu-drawer" className="btn btn-ghost lg:hidden" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </label>
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5"><path fill="currentColor" d="M12 2c1.7 0 3 1.3 3 3v1.2c1.8.6 3 2.3 3 4.2v.6h-2.5l1.5 5H15l-1-3h-4l-1 3H7l1.5-5H6V10.4c0-1.9 1.2-3.6 3-4.2V5c0-1.7 1.3-3 3-3z"/></svg>
            </span>
            <span className="text-xl font-bold tracking-tight">MercadoBG</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link href="#categorias">Categorias</Link></li>
            <li><Link href="#destaques">Destaques</Link></li>
            <li><Link href="#como-funciona">Como funciona</Link></li>
            <li><Link href="#depoimentos">Depoimentos</Link></li>
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <Link href="/login" className="btn btn-ghost">Entrar</Link>
          <Link href="/signup" className="btn btn-primary">Criar conta</Link>
        </div>
      </div>
      <input id="menu-drawer" type="checkbox" className="drawer-toggle hidden" />
      <div className="drawer-side lg:hidden">
        <label htmlFor="menu-drawer" className="drawer-overlay" />
        <ul className="menu p-4 w-80 min-h-full bg-base-100">
          <li><Link href="#categorias">Categorias</Link></li>
          <li><Link href="#destaques">Destaques</Link></li>
          <li><Link href="#como-funciona">Como funciona</Link></li>
          <li><Link href="#depoimentos">Depoimentos</Link></li>
          <li className="mt-2"><Link href="/login">Entrar</Link></li>
          <li><Link href="/signup">Criar conta</Link></li>
        </ul>
      </div>
    </header>
  );
}