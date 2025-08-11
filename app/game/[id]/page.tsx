"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// NOTE: Drop this file at: app/game/[id]/page.tsx
// Head checkboxes + LIST layout for offers (grid rows), with Tailwind classes
// restricted to safe defaults (no custom theme required).

// --- Types (adjust to your API) ---
interface Game {
  id: string;
  name: string;
  thumbnailUrl?: string;
  year?: number;
  publisher?: string;
  players?: string; // e.g. "2–4"
  playtime?: string; // e.g. "60–90 min"
}

interface Offer {
  id: string;
  price: number; // in BRL
  currency?: string; // "BRL"
  condition: "new" | "used";
  shippingIncluded?: boolean; // frete grátis
  type: "auction" | "direct";
  seller: {
    id: string;
    name: string;
    rating?: number; // 0–5
    city?: string;
    state?: string; // "RS"
    avatarUrl?: string;
  };
  notes?: string;
  createdAt?: string;
}

// --- Helper components ---
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">
      {children}
    </span>
  );
}

function RowSeparator() {
  return <div className="h-px bg-gray-200 dark:bg-gray-800" />;
}

// A grid-based row so columns alinham certinho com o cabeçalho
function OfferRow({ offer }: { offer: Offer }) {
  return (
    <li className="grid w-full items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl transition md:[grid-template-columns:minmax(12rem,auto)_minmax(7rem,auto)_1fr_minmax(8rem,auto)]">
      {/* Seller */}
      <div className="flex items-center gap-3">
        {offer.seller.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={offer.seller.avatarUrl}
            alt={offer.seller.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800" />
        )}
        <div className="leading-5">
          <div className="font-medium">{offer.seller.name}</div>
          <div className="text-xs text-gray-500">
            {offer.seller.city}
            {offer.seller.city && offer.seller.state ? ", " : ""}
            {offer.seller.state}
          </div>
        </div>
      </div>

      {/* Condition */}
      <div>
        <div className="text-xs text-gray-500 md:hidden">Condição</div>
        <div className="font-medium capitalize text-sm md:text-base">
          {offer.condition === "new" ? "Novo" : "Usado"}
        </div>
      </div>

      {/* Notes */}
      <div className="min-w-0">
        <div className="text-xs text-gray-500 md:hidden">Observações</div>
        <div className="truncate text-sm">{offer.notes || "—"}</div>
      </div>

      {/* Price & badges */}
      <div className="justify-self-end text-right">
        <div className="mb-1 flex items-center justify-end gap-2">
          {offer.shippingIncluded && <Badge>Frete grátis</Badge>}
          <Badge>{offer.type === "auction" ? "Leilão" : "Direto"}</Badge>
        </div>
        <div className="text-xs text-gray-500">Preço</div>
        <div className="text-lg font-semibold">
          {offer.currency === "BRL" || !offer.currency ? "R$" : offer.currency}
          {offer.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </div>
        <Link href={`/offers/${offer.id}`} className="mt-1 inline-block text-sm underline">
          Ver oferta
        </Link>
      </div>
    </li>
  );
}

// --- Page ---
export default function GamePage() {
  const [game, setGame] = useState<Game | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const { id } = useParams() as { id: string };

  // Filters in HEADER (checkboxes inside the game header)
  const [showOnlyNew, setShowOnlyNew] = useState(false);
  const [showFreeShipping, setShowFreeShipping] = useState(false);
  const [showAuctions, setShowAuctions] = useState(true);
  const [showDirect, setShowDirect] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Fetch game
    (async () => {
      try {
        const res = await fetch(`/api/bg/${id}`, { cache: "no-store" });
        if (res.ok) {
          const g = await res.json();
          setGame({
            id: g.id ?? id,
            name: g.name ?? g.title ?? "Jogo",
            thumbnailUrl: g.thumbnailUrl ?? g.image,
            year: g.year,
            publisher: g.publisher,
            players: g.players,
            playtime: g.playtime,
          });
        } else {
          setGame({ id, name: "Jogo" });
        }
      } catch {
        setGame({ id, name: "Jogo" });
      }
    })();

    // Fetch offers for this game
    (async () => {
      try {
        const res = await fetch(`/api/listings?gameId=${id}`, { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setOffers(data as Offer[]);
        } else {
          // Fallback mock for local dev
          setOffers([
            {
              id: "1",
              price: 250,
              condition: "used",
              shippingIncluded: true,
              type: "direct",
              seller: { id: "u1", name: "Carlos A.", city: "São Leopoldo", state: "RS" },
              notes: "Completo, pouco uso, sem marcas.",
            },
            {
              id: "2",
              price: 180,
              condition: "used",
              shippingIncluded: false,
              type: "auction",
              seller: { id: "u2", name: "Marina F.", city: "Porto Alegre", state: "RS" },
              notes: "Cantos da caixa com leve desgaste.",
            },
            {
              id: "3",
              price: 399,
              condition: "new",
              shippingIncluded: true,
              type: "direct",
              seller: { id: "u3", name: "Loja Meeple+", city: "Canoas", state: "RS" },
              notes: "Lacado, NF-e e garantia.",
            },
          ]);
        }
      } catch {
        // same mock in error
        setOffers([
          {
            id: "1",
            price: 250,
            condition: "used",
            shippingIncluded: true,
            type: "direct",
            seller: { id: "u1", name: "Carlos A.", city: "São Leopoldo", state: "RS" },
            notes: "Completo, pouco uso, sem marcas.",
          },
          {
            id: "2",
            price: 180,
            condition: "used",
            shippingIncluded: false,
            type: "auction",
            seller: { id: "u2", name: "Marina F.", city: "Porto Alegre", state: "RS" },
            notes: "Cantos da caixa com leve desgaste.",
          },
          {
            id: "3",
            price: 399,
            condition: "new",
            shippingIncluded: true,
            type: "direct",
            seller: { id: "u3", name: "Loja Meeple+", city: "Canoas", state: "RS" },
            notes: "Lacado, NF-e e garantia.",
          },
        ]);
      }
    })();
  }, [id]);

  const filtered = useMemo(() => {
    return offers.filter((o) => {
      if (showOnlyNew && o.condition !== "new") return false;
      if (showFreeShipping && !o.shippingIncluded) return false;
      if (!showAuctions && o.type === "auction") return false;
      if (!showDirect && o.type === "direct") return false;
      return true;
    });
  }, [offers, showOnlyNew, showFreeShipping, showAuctions, showDirect]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      {/* Header with checkboxes inside */}
      <section className="mb-6 rounded-2xl border bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950/50">
        <div className="flex items-start gap-4">
          {game?.thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={game.thumbnailUrl}
              alt={game.name}
              className="w-20 h-20 rounded-xl object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-xl bg-gray-200 dark:bg-gray-800" />)
          }

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-semibold leading-tight">{game?.name ?? "Jogo"}</h1>
                <p className="text-sm text-gray-500">
                  {game?.year ? `${game.year} • ` : ""}
                  {game?.publisher ? `${game.publisher} • ` : ""}
                  {game?.players ? `${game.players} jogadores • ` : ""}
                  {game?.playtime ?? "—"}
                </p>
              </div>

              {/* Checkboxes live *inside* the header */}
              <fieldset className="grid grid-cols-2 gap-x-6 gap-y-2 rounded-xl border p-3 text-sm md:grid-cols-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                    checked={showOnlyNew}
                    onChange={(e) => setShowOnlyNew(e.target.checked)}
                  />
                  Somente novos
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                    checked={showFreeShipping}
                    onChange={(e) => setShowFreeShipping(e.target.checked)}
                  />
                  Frete grátis
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                    checked={showAuctions}
                    onChange={(e) => setShowAuctions(e.target.checked)}
                  />
                  Leilões
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300"
                    checked={showDirect}
                    onChange={(e) => setShowDirect(e.target.checked)}
                  />
                  Compra direta
                </label>
              </fieldset>
            </div>
          </div>
        </div>
      </section>

      {/* Offer list (LIST layout, not cards) */}
      <section className="rounded-2xl border bg-white dark:border-gray-800 dark:bg-gray-950/50">
        {/* List Header */}
        <div className="hidden md:grid items-center gap-4 px-4 py-3 text-xs text-gray-500 md:[grid-template-columns:minmax(12rem,auto)_minmax(7rem,auto)_1fr_minmax(8rem,auto)]">
          <div>Vendedor</div>
          <div>Condição</div>
          <div>Observações</div>
          <div className="text-right">Preço</div>
        </div>
        <RowSeparator />

        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {filtered.length === 0 ? (
            <li className="p-6 text-center text-sm text-gray-500">
              Nenhuma oferta com os filtros atuais.
            </li>
          ) : (
            filtered.map((o) => <OfferRow key={o.id} offer={o} />)
          )}
        </ul>
      </section>
    </main>
  );
}