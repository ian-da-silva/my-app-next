// components/listings/featured-rail.tsx
import { fetchFeatured } from "@/lib/fetchers";
import { ListingCard } from "./listing-card";

export async function FeaturedRail() {
  const items = await fetchFeatured(); // [{...}]
  if (!items.length) {
    return <div className="alert">Sem destaques no momento.</div>;
  }
  return (
    <div className="carousel rounded-box space-x-4">
      {items.map((l) => (
        <div key={l.id} className="carousel-item w-80">
          <ListingCard l={l} />
        </div>
      ))}
    </div>
  );
}
