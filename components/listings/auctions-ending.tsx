// components/listings/auctions-ending.tsx
import { fetchAuctionsEnding } from "@/lib/fetchers";
import { AuctionCard } from "./auction-card";

export async function AuctionsEnding({ limit = 9 }: { limit?: number }) {
  const items = await fetchAuctionsEnding(limit);
  if (!items.length) return <div className="text-sm opacity-70">Nada por aqui ainda.</div>;
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {items.map((a) => <AuctionCard key={a.id} a={a} />)}
    </div>
  );
}
