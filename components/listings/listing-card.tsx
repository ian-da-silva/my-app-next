// components/listings/listing-card.tsx
import Image from "next/image";
import Link from "next/link";

export type Listing = {
  id: number;
  title: string;
  price: number; // em BRL
  currency?: string;
  condition: "novo" | "usado" | "excelente" | "bom";
  location?: string;
  gameId?: number;
  imageUrl?: string;
  seller?: { id: number; name: string; avatarUrl?: string; rating?: number };
  tags?: string[];
};

export function ListingCard({ l }: { l: Listing }) {
  return (
    <div className="card bg-base-100 border border-base-200 hover:shadow-lg transition">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
            alt={l.title}
            src={l.imageUrl ?? "/mock/listing.jpg"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
        />
        </div>
      <div className="card-body gap-3">
        <Link href={`/app/listing/${l.id}`} className="card-title text-base hover:link">
          {l.title}
        </Link>
        <div className="flex items-center gap-2">
          <div className="text-lg font-bold">
            {(l.currency ?? "R$")}{l.price.toLocaleString("pt-BR")}
          </div>
          <div className="badge">{l.condition}</div>
          {l.location ? <div className="badge badge-ghost">{l.location}</div> : null}
        </div>
        <div className="flex flex-wrap gap-1">
          {(l.tags ?? []).slice(0, 3).map((t) => (
            <div key={t} className="badge badge-outline">{t}</div>
          ))}
        </div>
        <div className="card-actions justify-between items-center">
          {l.seller ? (
            <div className="flex items-center gap-2">
              <div className="avatar">
                <div className="w-6 rounded-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={l.seller.avatarUrl ?? "/mock/avatar.jpg"} alt={l.seller.name} />
                </div>
              </div>
              <span className="text-sm">{l.seller.name}</span>
            </div>
          ) : <div />}
          <Link href={`/app/listing/${l.id}`} className="btn btn-sm btn-primary">Ver</Link>
        </div>
      </div>
    </div>
  );
}
