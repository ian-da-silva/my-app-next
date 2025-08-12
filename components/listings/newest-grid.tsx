// components/listings/newest-grid.tsx
import { fetchNewest } from "@/lib/fetchers";
import { ListingCard } from "./listing-card";

export async function NewestGrid({ pageSize = 24 }: { pageSize?: number }) {
  const items = await fetchNewest(pageSize);
  if (!items.length) return <div className="alert">Nenhuma listagem ainda.</div>;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((l) => <ListingCard key={l.id} l={l} />)}
    </div>
  );
}
