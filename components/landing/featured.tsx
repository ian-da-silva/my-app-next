// ---------------------------------
// components/landing/featured.tsx
// ---------------------------------
import Image from "next/image";
import Link from "next/link";
export type FeaturedItem = { id: string; title: string; desc: string; price: string; isAuction: boolean; endsIn: string; location: string; img: string };
export function Featured({ items }: { items: FeaturedItem[] }) {
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
        {items.map((l) => (
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
                  <div className="text-sm"><span className="opacity-70">Termina em </span><span className="font-semibold">{l.endsIn}</span></div>
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