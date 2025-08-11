// ---------------------------------
// components/landing/footer.tsx
// ---------------------------------
import Link from "next/link";
export function Footer() {
  return (
    <footer className="bg-base-200">
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <aside className="space-y-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5"><path fill="currentColor" d="M12 2c1.7 0 3 1.3 3 3v1.2c1.8.6 3 2.3 3 4.2v.6h-2.5l1.5 5H15l-1-3h-4l-1 3H7l1.5-5H6V10.4c0-1.9 1.2-3.6 3-4.2V5c0-1.7 1.3-3 3-3z"/></svg>
            </span>
            <span className="font-bold">MercadoBG</span>
          </Link>
          <p className="opacity-80 text-sm">O marketplace de board games feito por jogadores, para jogadores.</p>
        </aside>
        <nav>
          <h6 className="footer-title">Navegação</h6>
          <ul className="space-y-2">
            <li><Link href="#categorias">Categorias</Link></li>
            <li><Link href="#destaques">Destaques</Link></li>
            <li><Link href="#como-funciona">Como funciona</Link></li>
            <li><Link href="#depoimentos">Depoimentos</Link></li>
          </ul>
        </nav>
        <nav>
          <h6 className="footer-title">Conta</h6>
          <ul className="space-y-2">
            <li><Link href="/login">Entrar</Link></li>
            <li><Link href="/signup">Criar conta</Link></li>
            <li><Link href="/help">Ajuda</Link></li>
          </ul>
        </nav>
        <form className="space-y-3">
          <h6 className="footer-title">Receba novidades</h6>
          <fieldset className="form-control w-full max-w-xs">
            <label className="label"><span className="label-text">Seu e-mail</span></label>
            <div className="join w-full">
              <input type="email" placeholder="voce@email.com" className="input input-bordered join-item w-full" />
              <button className="btn btn-primary join-item" type="submit">Assinar</button>
            </div>
            <label className="label"><span className="label-text-alt">Sem spam, prometemos.</span></label>
          </fieldset>
        </form>
      </div>
      <div className="border-t border-base-300">
        <div className="container mx-auto px-4 py-6 text-sm flex flex-col md:flex-row gap-3 md:gap-6 justify-between">
          <p>© {new Date().getFullYear()} MercadoBG. Todos os direitos reservados.</p>
          <div className="flex gap-4 opacity-80">
            <Link href="/terms">Termos</Link>
            <Link href="/privacy">Privacidade</Link>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}