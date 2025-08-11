// ---------------------------------
// components/landing/categories.tsx
// ---------------------------------
import Link from "next/link";
const cats = [
  { k: "Novidades", icon: "🔥", href: "/search?sort=new" },
  { k: "Leilões", icon: "⏱️", href: "/auctions" },
  { k: "Colecionáveis", icon: "🃏", href: "/search?tag=colecionaveis" },
  { k: "Família", icon: "👨‍👩‍👧", href: "/search?tag=familia" },
  { k: "Pesados", icon: "🧠", href: "/search?tag=pesado" },
  { k: "Acessórios", icon: "🧩", href: "/search?tag=acessorios" },
];
export function Categories() {
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