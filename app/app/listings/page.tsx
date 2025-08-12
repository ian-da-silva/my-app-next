// app/app/listings/page.tsx
import { FiltersBar } from "@/components/listings/filters-bar";
import { Section } from "@/components/listings/section";
import { ListingCard, type Listing } from "@/components/listings/listing-card";
import { AuctionCard, type Auction } from "@/components/listings/auction-card";
import { NearbyGrid, type ListingWithDistance } from "@/components/listings/nearby-grid";
import Image from "next/image";
import Link from "next/link";

// ---------------------
// MOCK DATA (dummy) COM IMAGENS LOCAIS + AVATARS
// ---------------------
const featuredMock: Listing[] = [
  {
    id: 101,
    title: "Gloomhaven (2ª Ed.)",
    price: 850,
    condition: "excelente",
    location: "Porto Alegre, RS",
    imageUrl: "/mock/listing-101.png",
    tags: ["base game", "pt-br"],
    seller: { id: 1, name: "Lojista RS", avatarUrl: "/mock/avatar-01.png" },
  },
  {
    id: 102,
    title: "Ark Nova + Expansão Aquarium",
    price: 520,
    condition: "bom",
    location: "Canoas, RS",
    imageUrl: "/mock/listing-102.png",
    tags: ["expansão"],
    seller: { id: 2, name: "Juliana", avatarUrl: "/mock/avatar-02.png" },
  },
  {
    id: 103,
    title: "Wingspan (Edição Europa)",
    price: 290,
    condition: "novo",
    location: "São Leopoldo, RS",
    imageUrl: "/mock/listing-103.png",
    tags: ["lacrado"],
    seller: { id: 3, name: "Rafael", avatarUrl: "/mock/avatar-03.png" },
  },
];

const auctionsEndingMock: Auction[] = [
  {
    id: 201,
    title: "Brass: Birmingham (Deluxe)",
    currentBid: 410,
    bidsCount: 12,
    endsAt: new Date(Date.now() + 2 * 3600_000).toISOString(),
    imageUrl: "/mock/listing-201.png",
  },
  {
    id: 202,
    title: "Twilight Imperium 4 + Prophecy of Kings",
    currentBid: 930,
    bidsCount: 21,
    endsAt: new Date(Date.now() + 5 * 3600_000).toISOString(),
    imageUrl: "/mock/listing-202.png",
  },
  {
    id: 203,
    title: "Azul (1ª Edição)",
    currentBid: 120,
    bidsCount: 5,
    endsAt: new Date(Date.now() + 45 * 60_000).toISOString(),
    imageUrl: "/mock/listing-203.png",
  },
];

const mostWantedMock = [
  { gameId: 301, name: "Catan", year: 1995, imageUrl: "/mock/game-301.png", wantCount: 245 },
  { gameId: 302, name: "Dune: Imperium", year: 2020, imageUrl: "/mock/game-302.png", wantCount: 190 },
  { gameId: 303, name: "Heat: Pedal to the Metal", year: 2022, imageUrl: "/mock/game-303.png", wantCount: 177 },
];

const priceDropsMock: Listing[] = [
  {
    id: 401,
    title: "Root (Base)",
    price: 260,
    condition: "usado",
    location: "Novo Hamburgo, RS",
    imageUrl: "/mock/listing-401.png",
    tags: ["-15%"],
    seller: { id: 9, name: "Marcos", avatarUrl: "/mock/avatar-04.png" },
  },
  {
    id: 402,
    title: "Cascadia",
    price: 190,
    condition: "excelente",
    location: "São Leopoldo, RS",
    imageUrl: "/mock/listing-402.png",
    tags: ["-10%"],
    seller: { id: 10, name: "Dani", avatarUrl: "/mock/avatar-05.png" },
  },
  {
    id: 403,
    title: "Agricola (Revised)",
    price: 310,
    condition: "bom",
    location: "Esteio, RS",
    imageUrl: "/mock/listing-403.png",
    tags: ["-8%"],
    seller: { id: 11, name: "Leo", avatarUrl: "/mock/avatar-06.png" },
  },
];

const newestMock: Listing[] = [
  {
    id: 501,
    title: "7 Wonders (2ª Ed.)",
    price: 210,
    condition: "novo",
    location: "São Leopoldo, RS",
    imageUrl: "/mock/listing-501.png",
    seller: { id: 20, name: "Lia", avatarUrl: "/mock/avatar-07.png" },
  },
  {
    id: 502,
    title: "Everdell + Bellfaire",
    price: 530,
    condition: "excelente",
    location: "Sapucaia do Sul, RS",
    imageUrl: "/mock/listing-502.png",
    seller: { id: 21, name: "Caio", avatarUrl: "/mock/avatar-08.png" },
  },
  {
    id: 503,
    title: "The Crew",
    price: 95,
    condition: "bom",
    location: "Porto Alegre, RS",
    imageUrl: "/mock/listing-503.png",
    seller: { id: 22, name: "Ana", avatarUrl: "/mock/avatar-09.png" },
  },
];

const nearbyMock: ListingWithDistance[] = [
  {
    id: 601,
    title: "Ticket to Ride: Europe",
    price: 220,
    condition: "excelente",
    location: "São Leopoldo, RS",
    imageUrl: "/mock/listing-601.png",
    seller: { id: 30, name: "Bruno", avatarUrl: "/mock/avatar-10.png" },
    distanceKm: 3,
  },
  {
    id: 602,
    title: "Splendor",
    price: 140,
    condition: "bom",
    location: "Canoas, RS",
    imageUrl: "/mock/listing-602.png",
    seller: { id: 31, name: "Camila", avatarUrl: "/mock/avatar-02.png" },
    distanceKm: 21,
  },
  {
    id: 603,
    title: "Kingdomino",
    price: 85,
    condition: "excelente",
    location: "Novo Hamburgo, RS",
    imageUrl: "/mock/listing-603.png",
    seller: { id: 32, name: "Pedro", avatarUrl: "/mock/avatar-03.png" },
    distanceKm: 14,
  },
];

// ---------------------
// PAGE — 1 seção por “faixa” (sem colunas paralelas)
// ---------------------
export default function ListingsPage({
  searchParams,
}: {
  searchParams?: { q?: string; sort?: string };
}) {
  return (
    <div className="space-y-10">
      <FiltersBar initialQuery={searchParams?.q} initialSort={searchParams?.sort} />

      {/* Em destaque (rail horizontal) */}
      <Section title="Em destaque" subtitle="Lançamentos e ofertas selecionadas" right={<a className="link link-primary" href="#">Ver tudo</a>}>
        <div className="overflow-x-auto">
          <div className="flex gap-4 min-w-full">
            {featuredMock.map((l) => (
              <div key={l.id} className="w-80 shrink-0">
                <ListingCard l={l} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Leilões terminando */}
      <Section title="Leilões terminando" subtitle="Últimas horas para dar seu lance" right={<a className="link link-primary" href="#">Ver todos</a>}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {auctionsEndingMock.map((a) => <AuctionCard key={a.id} a={a} />)}
        </div>
      </Section>

      {/* Mais desejados */}
      <Section title="Mais desejados" subtitle="Com base no número de ‘quero’" right={<a className="link link-primary" href="#">Ranking completo</a>}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mostWantedMock.map((g) => (
            <Link key={g.gameId} href={`/app/game/${g.gameId}`} className="card bg-base-100 border border-base-200 hover:shadow">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image alt={g.name} src={g.imageUrl} fill className="object-cover" />
              </div>
              <div className="card-body py-3 px-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{g.name}{g.year ? ` (${g.year})` : ""}</h3>
                  <div className="badge badge-primary">{g.wantCount} querem</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Quedas de preço */}
      <Section title="Quedas de preço" subtitle="Entradas recentes com redução" right={<a className="link link-primary" href="#">Ver todas</a>}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {priceDropsMock.map((l) => <ListingCard key={l.id} l={l} />)}
        </div>
      </Section>

      {/* Perto de você */}
      <Section title="Perto de você" subtitle="Listagens próximas com retirada mais fácil" right={<a className="link link-primary" href="#">Ajustar localização</a>}>
        <NearbyGrid items={nearbyMock} />
      </Section>

      {/* Mais recentes */}
      <Section title="Mais recentes" subtitle="Novas publicações">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {newestMock.map((l) => <ListingCard key={l.id} l={l} />)}
        </div>
      </Section>
    </div>
  );
}