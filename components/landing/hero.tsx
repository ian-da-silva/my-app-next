// ---------------------------------
// components/landing/hero.tsx
// ---------------------------------
import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "@/components/landing/search-bar";

export type Thumb = { id: number; title: string; price: string; condition: string; img: string };
export function Hero({ thumbs }: { thumbs: Thumb[] }) {
  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-base-300 px-3 py-1 text-sm">
            <span className="badge badge-primary badge-xs" />
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
            <div className="badge badge-outline">Sem taxa de cadastro</div>
            <div className="badge badge-outline">Proteção ao comprador</div>
            <div className="badge badge-outline">Envio facilitado</div>
          </div>
        </div>
        <div className="relative">
          <div className="mockup-window border bg-base-200">
            <div className="bg-base-100 p-6">
              <div className="grid grid-cols-3 gap-4">
                {thumbs.map((g) => (
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
          <div className="absolute -z-10 -top-10 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -z-10 bottom-0 -left-10 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
        </div>
      </div>
    </section>
  );
}