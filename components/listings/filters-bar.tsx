// components/listings/filters-bar.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SORTS = [
  { v: "newest", label: "Mais recentes" },
  { v: "price_asc", label: "Preço ↑" },
  { v: "price_desc", label: "Preço ↓" },
  { v: "ending_soon", label: "Leilões terminando" },
];

export function FiltersBar({
  initialQuery,
  initialSort = "newest",
}: {
  initialQuery?: string;
  initialSort?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [q, setQ] = useState(initialQuery ?? "");
  const [sort, setSort] = useState(initialSort);

  function apply() {
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q); else url.searchParams.delete("q");
    if (sort) url.searchParams.set("sort", sort); else url.searchParams.delete("sort");
    router.push(url.pathname + "?" + url.searchParams.toString());
  }

  return (
    <div className="card bg-base-100 border border-base-200">
      <div className="card-body p-4 md:p-6">
        <div className="join w-full">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="input input-bordered join-item flex-1"
            placeholder="Buscar por jogo, expansão, edição..."
            aria-label="Buscar listagens"
          />
          <select
            className="select select-bordered join-item w-44"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Ordenar"
          >
            {SORTS.map((s) => (
              <option key={s.v} value={s.v}>{s.label}</option>
            ))}
          </select>
          <button onClick={apply} className="btn btn-primary join-item">Aplicar</button>
        </div>
        <div className="flex flex-wrap gap-2 pt-3">
          {/* filtros rápidos (mock) */}
          <div className="label">Filtros rápidos:</div>
          <button className="btn btn-xs">Base game</button>
          <button className="btn btn-xs">Expansão</button>
          <button className="btn btn-xs">Novo/lacrado</button>
          <button className="btn btn-xs">Local/Próximo</button>
        </div>
      </div>
    </div>
  );
}
