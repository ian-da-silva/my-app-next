// app/page.tsx
// Next.js (App Router) landing page using Tailwind CSS + DaisyUI v5
// Drop this file into /app/page.tsx. Assumes Tailwind + DaisyUI are configured.

import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main data-theme="emerald" className="min-h-screen bg-base-100 text-base-content">
      <SiteNav />
      <Hero />
      <KeyStats />
      <Categories />
      <Featured />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}

function SiteNav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-base-100/80 border-b border-base-200">
      <div className="navbar container mx-auto px-4">
        <div className="navbar-start gap-2">
          <label htmlFor="menu-drawer" className="btn btn-ghost lg:hidden" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </label>
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {/* Simple meeple/anvil glyph */}
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
      {/* Mobile drawer */}
      <input id="menu-drawer" type="checkbox" className="drawer-toggle hidden" />
      <div className="drawer-side lg:hidden">
        <label htmlFor="menu-drawer" className="drawer-overlay"></label>
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

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-base-300 px-3 py-1 text-sm">
            <span className="badge badge-primary badge-xs"></span>
            Novo: Leilões semanais & venda direta
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Compre e venda <span className="text-primary">board games</span> com segurança
          </h1>
          <p className="text-base md:text-lg opacity-80 max-w-prose">
            MercadoBG é o marketplace brasileiro para jogos de tabuleiro. Cadastre seus jogos, participe de leilões e encontre raridades com avaliações e mediação integrada.
          </p>
          <SearchBar />
          <div className="flex flex-wrap gap-4">
            <Link href="/listings/new" className="btn btn-primary">Anunciar jogo</Link>
            <Link href="#destaques" className="btn btn-outline">Explorar ofertas</Link>
          </div>
          <div className="flex items-center gap-6 pt-4 text-sm">
            <div className="flex items-center gap-2"><span className="badge badge-outline">Sem taxa de cadastro</span></div>
            <div className="flex items-center gap-2"><span className="badge badge-outline">Proteção ao comprador</span></div>
            <div className="flex items-center gap-2"><span className="badge badge-outline">Envio facilitado</span></div>
          </div>
        </div>
        <div className="relative">
          <div className="mockup-window border bg-base-200">
            <div className="bg-base-100 p-6">
              <div className="grid grid-cols-3 gap-4">
                {sampleGameThumbs.map((g) => (
                  <div key={g.id} className="card bg-base-100 shadow-sm hover:shadow transition">
                    <figure className="aspect-square">
                      <Image src={g.img} alt={g.title} width={300} height={300} className="object-cover" />
                    </figure>
                    <div className="card-body p-3">
                      <h3 className="card-title text-base line-clamp-1">{g.title}</h3>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-semibold">R$ {g.price}</span>
                        <span className="badge badge-ghost">{g.condition}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* decorative blobs */}
          <div className="absolute -z-10 -top-10 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -z-10 bottom-0 -left-10 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}

function SearchBar() {
  return (
    <form action="/search" className="join w-full max-w-2xl">
      <input name="q" className="input input-bordered join-item w-full" placeholder="Busque por título, editor, mecânica..." />
      <select name="category" className="select select-bordered join-item hidden sm:block">
        <option value="">Todas</option>
        <option>Euro</option>
        <option>Ameritrash</option>
        <option>Família</option>
        <option>Party</option>
        <option>Miniaturas</option>
      </select>
      <button className="btn btn-primary join-item" type="submit">Pesquisar</button>
    </form>
  );
}

function KeyStats() {
  const stats = [
    { label: "Jogos ativos", value: "3.2k" },
    { label: "Vendedores verificados", value: "1.1k" },
    { label: "Ofertas hoje", value: "480+" },
    { label: "Avaliação média", value: "4.9/5" },
  ];
  return (
    <section className="bg-base-200">
      <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="stat bg-base-100 rounded-2xl shadow-sm">
            <div className="stat-title">{s.label}</div>
            <div className="stat-value text-primary">{s.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { k: "Novidades", icon: "🔥", href: "/search?sort=new" },
    { k: "Leilões", icon: "⏱️", href: "/auctions" },
    { k: "Colecionáveis", icon: "🃏", href: "/search?tag=colecionaveis" },
    { k: "Família", icon: "👨‍👩‍👧", href: "/search?tag=familia" },
    { k: "Pesados", icon: "🧠", href: "/search?tag=pesado" },
    { k: "Acessórios", icon: "🧩", href: "/search?tag=acessorios" },
  ];
  return (
    <section id="categorias" className="container mx-auto px-4 py-12 space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold">Explore por categoria</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cats.map((c) => (
          <Link href={c.href} key={c.k} className="card bg-base-200 hover:bg-base-300 transition">
            <div className="card-body items-center text-center">
              <span className="text-3xl" aria-hidden>{c.icon}</span>
              <span className="font-medium">{c.k}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section id="destaques" className="container mx-auto px-4 py-12 space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Destaques de hoje</h2>
          <p className="opacity-80">Leilões terminando em breve e ofertas imperdíveis.</p>
        </div>
        <div className="hidden md:flex join">
          <button className="btn join-item">Todos</button>
          <button className="btn join-item btn-ghost">Leilões</button>
          <button className="btn join-item btn-ghost">Venda direta</button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredListings.map((l) => (
          <article key={l.id} className="card bg-base-100 shadow hover:shadow-lg transition">
            <figure className="aspect-[4/3]">
              <Image alt={l.title} src={l.img} width={640} height={480} className="object-cover" />
            </figure>
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h3 className="card-title text-lg line-clamp-1">{l.title}</h3>
                {l.isAuction ? (
                  <span className="badge badge-warning">Leilão</span>
                ) : (
                  <span className="badge">Direto</span>
                )}
              </div>
              <p className="text-sm opacity-80 line-clamp-2">{l.desc}</p>
              <div className="flex items-center justify-between pt-2">
                <div className="text-xl font-bold">R$ {l.price}</div>
                {l.isAuction ? (
                  <div className="text-sm">
                    <span className="opacity-70">Termina em</span>{" "}
                    <span className="font-semibold">{l.endsIn}</span>
                  </div>
                ) : (
                  <div className="text-sm opacity-70">{l.location}</div>
                )}
              </div>
              <div className="card-actions justify-end pt-2">
                <Link href={`/listing/${l.id}`} className="btn btn-primary btn-block">Ver oferta</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: 1, t: "Crie sua conta", d: "Cadastre-se e verifique seu e-mail para comprar e vender com segurança." },
    { n: 2, t: "Publique ou dê lances", d: "Anuncie em minutos ou participe de leilões em tempo real." },
    { n: 3, t: "Envie com etiqueta", d: "Gere etiqueta de frete e acompanhe tudo pela plataforma." },
    { n: 4, t: "Pagamento protegido", d: "Liberação do valor apenas após confirmação do recebimento." },
  ];
  return (
    <section id="como-funciona" className="bg-base-200">
      <div className="container mx-auto px-4 py-16 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">Como funciona</h2>
          <p className="opacity-80">Simples para iniciantes, completo para colecionadores.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-10">
                    <span className="text-sm">{s.n}</span>
                  </div>
                </div>
                <h3 className="card-title pt-2">{s.t}</h3>
                <p className="opacity-80">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { n: "Marina", c: "Porto Alegre", t: "Vendi minha coleção em 2 semanas. Processo todo dentro da plataforma, super prático." },
    { n: "Rafael", c: "Curitiba", t: "Arrematei um jogo raro por um preço ótimo. A proteção ao comprador me deu confiança." },
    { n: "Thiago", c: "São Paulo", t: "Os filtros por mecânica e tempo de jogo são excelentes pra achar algo pro meu grupo." },
  ];
  return (
    <section id="depoimentos" className="container mx-auto px-4 py-16 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Quem já usa o MercadoBG</h2>
        <p className="opacity-80">Feedback real de jogadores pelo Brasil.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <figure key={i} className="card bg-base-100 shadow">
            <div className="card-body">
              <blockquote className="italic">“{it.t}”</blockquote>
              <figcaption className="pt-2 opacity-80">{it.n} — {it.c}</figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-gradient-to-br from-primary to-secondary text-primary-content">
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold">Pronto para jogar?</h2>
          <p className="opacity-90">Cadastre-se gratuitamente e comece a comprar e vender agora mesmo.</p>
        </div>
        <div className="flex md:justify-end gap-3">
          <Link href="/signup" className="btn btn-neutral">Criar conta</Link>
          <Link href="/listings/new" className="btn btn-outline">Anunciar jogo</Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
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

// ----------------------------
// Sample data used in the mock UI (replace with real data from your API)
// ----------------------------
const sampleGameThumbs = [
  { id: 1, title: "Gloomhaven: Jaws of the Lion", price: "290", condition: "Novo", img: "/jaws.png" },
  { id: 2, title: "Wingspan", price: "230", condition: "Usado", img: "/jaws.png" },
  { id: 3, title: "Azul", price: "150", condition: "Usado", img: "/jaws.png" },
  { id: 4, title: "Spirit Island", price: "320", condition: "Novo", img: "/jaws.png" },
  { id: 5, title: "Terraforming Mars", price: "280", condition: "Usado", img: "/jaws.png" },
  { id: 6, title: "Brass: Birmingham", price: "350", condition: "Novo", img: "/jaws.png" },
];

const featuredListings = [
  { id: "a1", title: "Everdell + Expansões", desc: "Coleção com inserts 3D e sleeves premium.", price: "420", isAuction: true, endsIn: "2h 14m", location: "POA", img: "/jaws.png" },
  { id: "a2", title: "Blood Rage", desc: "Com todas as exclusivas da campanha.", price: "680", isAuction: false, endsIn: "", location: "São Paulo", img: "/jaws.png" },
  { id: "a3", title: "Clank! Catacombs", desc: "Semi-novo, sem marcas de uso.", price: "250", isAuction: false, endsIn: "", location: "Curitiba", img: "/jaws.png" },
  { id: "a4", title: "Great Western Trail 2ª Edição", desc: "Versão brasileira, completa.", price: "340", isAuction: true, endsIn: "45m", location: "Belo Horizonte", img: "/jaws.png" },
];

// ----------------------------
// Implementation Notes (DaisyUI v5 + Tailwind + Next.js)
// ----------------------------
// 1) Tailwind config: enable DaisyUI plugin and themes. Example:
//    // tailwind.config.ts
//    import type { Config } from 'tailwindcss'
//    const config: Config = {
//      content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
//      plugins: [require("daisyui")],
//      daisyui: { themes: ["emerald", "dark"] },
//    }
//    export default config
//
// 2) globals.css should include Tailwind directives and optional container defaults:
//    @tailwind base; @tailwind components; @tailwind utilities;
//    .container { @apply max-w-7xl; }
//
// 3) Next/Image placeholders: Place the mock images in /public/mock/ or swap for remote images (configure next.config.js if using external domains).
//
// 4) Accessibility: all interactive elements use standard <a>/<button> with clear labels; color contrast relies on DaisyUI theme.
//
// 5) Replace the sample arrays with data fetched from your API (e.g., in server component via fetch() or move sections to client components if using hooks/filters).
//
// 6) Components are kept in a single file for handoff. In production split into /components/* and import into app/page.tsx.
