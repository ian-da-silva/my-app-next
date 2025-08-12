// components/listings/price-drops.tsx
import { fetchPriceDrops } from "@/lib/fetchers";
import { ListingCard } from "./listing-card";

export async function PriceDrops({ limit = 9 }: { limit?: number }) {
  const items = await fetchPriceDrops(limit);
  if (!items.length) return <div className="text-sm opacity-70">Sem quedas de preço recentes.</div>;
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {items.map((l) => <ListingCard key={l.id} l={l} />)}
    </div>
  );
}
