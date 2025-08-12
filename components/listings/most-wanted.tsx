// components/listings/most-wanted.tsx
import Link from "next/link";
import Image from "next/image";
import { fetchMostWanted } from "@/lib/fetchers";

type WantedGame = {
  gameId: number;
  name: string;
  year?: number;
  imageUrl?: string;
  wantCount: number;
};

export async function MostWanted({ limit = 9 }: { limit?: number }) {
  const items: WantedGame[] = await fetchMostWanted(limit);
  if (!items.length) return <div className="text-sm opacity-70">Sem dados ainda.</div>;
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {items.map((g) => (
        <Link
          key={g.gameId}
          href={`/app/game/${g.gameId}`}
          className="card bg-base-100 border border-base-200 hover:shadow"
        >
          <figure className="overflow-hidden">
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
    alt={g.name}
    src={g.imageUrl}
    className="w-full h-48 object-cover md:h-40" // altura controlada
  />
</figure>
          <div className="card-body py-3 px-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{g.name}{g.year ? ` (${g.year})` : ""}</h3>
              <div className="badge badge-primary">{g.wantCount} querem</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
