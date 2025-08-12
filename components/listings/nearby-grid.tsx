// components/listings/nearby-grid.tsx
import { ListingCard, Listing } from "@/components/listings/listing-card";

export type ListingWithDistance = Listing & {
  distanceKm?: number; // distância estimada do usuário
};

export function NearbyGrid({ items }: { items: ListingWithDistance[] }) {
  if (!items?.length) {
    return <div className="text-sm opacity-70">Nenhuma listagem próxima.</div>;
  }
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {items.map((l) => (
        <div key={l.id} className="relative">
          {/* Badge de distância */}
          {typeof l.distanceKm === "number" ? (
            <div className="absolute right-2 top-2 z-10 badge badge-accent shadow">
              {l.distanceKm.toFixed(0)} km
            </div>
          ) : null}
          <ListingCard l={l} />
        </div>
      ))}
    </div>
  );
}
