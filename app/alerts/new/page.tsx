// app/alerts/new/page.tsx
"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";

// NOTE: Pure Tailwind + daisyUI v5 (no shadcn)
// Página geral de criação de alertas: o usuário escolhe o JOGO e define filtros/notificações.
// Mantém a mesma estética da listagem: cards, dividers, bordas sutis, paddings compactos.

// Types
type AlertFrequency = "instant" | "hourly" | "daily" | "weekly";

type Game = { id: string | number; title: string; thumbnail?: string };

export default function AlertsCreatePage() {
  // --- Mock de catálogo de jogos (substituir por fetch real) ---
  const [games] = useState<Game[]>([
    { id: 1, title: "Catan", thumbnail: "/jaws.png" },
    { id: 2, title: "Azul", thumbnail: "/jaws.png" },
    { id: 3, title: "Terraforming Mars", thumbnail: "/jaws.png" },
    { id: 4, title: "Pandemic", thumbnail: "/jaws.png" },
    { id: 5, title: "Wingspan", thumbnail: "/jaws.png" },
  ]);

  // --- Seletor de jogo ---
  const [query, setQuery] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredGames = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return games.slice(0, 10);
    return games.filter(g => g.title.toLowerCase().includes(q)).slice(0, 20);
  }, [games, query]);

  // --- Filtros/Notificações (iguais à versão por jogo) ---
  const [mode, setMode] = useState<"any" | "filtered">("filtered");
  const [priceMin, setPriceMin] = useState<string>("");
  const [priceMax, setPriceMax] = useState<string>("");
  const [condition, setCondition] = useState<string>("");
  const [locationCity, setLocationCity] = useState<string>("");
  const [radiusKm, setRadiusKm] = useState<number>(50);
  const [hasSleeves, setHasSleeves] = useState<boolean>(false);
  const [isVersionLanguage, setIsVersionLanguage] = useState<string>("");
  const [edition, setEdition] = useState<string>("");
  const [includeExpansions, setIncludeExpansions] = useState<boolean>(false);
  const [saleTypeAuction, setSaleTypeAuction] = useState<boolean>(true);
  const [saleTypeDirect, setSaleTypeDirect] = useState<boolean>(true);
  const [sellerRating, setSellerRating] = useState<number>(0);
  const [onlyVerifiedSellers, setOnlyVerifiedSellers] = useState<boolean>(false);
  const [shippingOption, setShippingOption] = useState<string>("");
  const [keywordsInclude, setKeywordsInclude] = useState<string>("");
  const [keywordsExclude, setKeywordsExclude] = useState<string>("");
  const [frequency, setFrequency] = useState<AlertFrequency>("instant");
  const [limitPerDay, setLimitPerDay] = useState<number>(10);
  const [channels, setChannels] = useState<{ email: boolean; push: boolean; inapp: boolean }>(
    { email: true, push: true, inapp: true }
  );

  const disabled = mode === "any";

  const estimatedMatches = useMemo(() => {
    // Placeholder heurístico para UX de prévia
    let score = 42; // base
    if (priceMin || priceMax) score -= 8;
    if (condition) score -= 6;
    if (radiusKm < 50) score -= 10;
    if (!saleTypeAuction || !saleTypeDirect) score -= 5;
    if (sellerRating > 0) score -= 4;
    if (onlyVerifiedSellers) score -= 3;
    if (keywordsInclude) score -= 4;
    if (keywordsExclude) score -= 2;
    return Math.max(score, 0);
  }, [priceMin, priceMax, condition, radiusKm, saleTypeAuction, saleTypeDirect, sellerRating, onlyVerifiedSellers, keywordsInclude, keywordsExclude]);

  function selectGame(g: Game) {
    setSelectedGame(g);
    setQuery(g.title);
    setDropdownOpen(false);
  }

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!inputRef.current) return;
      if (!inputRef.current.contains(e.target as Node)) setDropdownOpen(false);
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedGame) {
      alert("Selecione um jogo para criar o alerta.");
      return;
    }
    const payload = {
      gameId: selectedGame.id,
      mode,
      filters: disabled
        ? null
        : {
            priceMin: priceMin ? Number(priceMin) : null,
            priceMax: priceMax ? Number(priceMax) : null,
            condition: condition || null,
            locationCity: locationCity || null,
            radiusKm,
            hasSleeves,
            language: isVersionLanguage || null,
            edition: edition || null,
            includeExpansions,
            saleType: { auction: saleTypeAuction, direct: saleTypeDirect },
            sellerRating,
            onlyVerifiedSellers,
            shippingOption: shippingOption || null,
            keywordsInclude: keywordsInclude || null,
            keywordsExclude: keywordsExclude || null,
          },
      notifications: {
        channels,
        frequency,
        limitPerDay,
      },
    };

    // TODO: substituir por POST real (/api/alerts)
    console.log("Submitting alert:", payload);
    alert("Alerta salvo! Você receberá notificações conforme suas preferências.");
  }

  const canSubmit = !!selectedGame;

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="breadcrumbs text-sm mb-4">
        <ul>
          <li><Link href="/">Início</Link></li>
          <li><Link href="/alerts">Alertas</Link></li>
          <li>Novo</li>
        </ul>
      </div>

      <section className="grid gap-6 lg:grid-cols-12">
        {/* Left column: form */}
        <form onSubmit={onSubmit} className="lg:col-span-8 space-y-6">
          <div className="card bg-base-100 border border-base-200">
            <div className="card-body gap-4">
              <div className="flex items-center gap-4">
                <div className="avatar">
  <div className="w-16 h-16 rounded bg-base-200 flex items-center justify-center">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    {selectedGame ? (
      <img src={selectedGame.thumbnail || "/jaws.png"} alt={selectedGame.title} className="object-cover w-full h-full" />
    ) : (
      <span className="text-xl">🎲</span>
    )}
  </div>
</div>
                <div>
                  <h1 className="card-title leading-tight">Criar alerta — {selectedGame?.title || "Selecione um jogo"}</h1>
                  <p className="text-sm text-base-content/70">Escolha o jogo e defina quando você quer ser notificado.</p>
                </div>
              </div>

              <div className="divider my-0" />

              {/* Game Picker */}
              <div className="grid md:grid-cols-12 gap-4 items-start">
                <label className="md:col-span-3 text-sm font-medium mt-1">Jogo</label>
                <div className="md:col-span-9 w-full">
                  <div className="dropdown w-full">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Busque pelo nome do jogo"
                      className="input input-bordered input-sm w-full"
                      value={query}
                      onChange={(e)=>{ setQuery(e.target.value); setDropdownOpen(true); }}
                      onFocus={()=> setDropdownOpen(true)}
                    />
                    {dropdownOpen && (
                      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full max-h-64 overflow-auto mt-2 z-10">
                        {filteredGames.length === 0 && (
                          <li className="text-xs opacity-60 px-2 py-1">Nenhum resultado</li>
                        )}
                        {filteredGames.map((g)=> (
                          <li key={g.id}>
                            <button type="button" className="justify-start" onClick={()=>selectGame(g)}>
                              {g.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {selectedGame && (
                    <div className="mt-2 flex items-center gap-3">
                      <span className="badge badge-outline">Selecionado: {selectedGame.title}</span>
                      <button type="button" className="btn btn-ghost btn-xs" onClick={()=>{ setSelectedGame(null); setQuery(""); setDropdownOpen(false); }}>Trocar</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Mode Switch */}
              <div className="grid md:grid-cols-12 gap-4 items-center">
                <label className="md:col-span-3 text-sm font-medium">Modo de alerta</label>
                <div className="md:col-span-9">
                  <div className="join join-horizontal w-full">
                    <input
                      className="join-item btn btn-sm"
                      type="radio"
                      name="mode"
                      aria-label="Qualquer anúncio"
                      checked={mode === "any"}
                      onChange={() => setMode("any")}
                    />
                    <input
                      className="join-item btn btn-sm"
                      type="radio"
                      name="mode"
                      aria-label="Com filtros"
                      checked={mode === "filtered"}
                      onChange={() => setMode("filtered")}
                    />
                  </div>
                  <p className="text-xs mt-2 text-base-content/60">
                    "Qualquer anúncio": você receberá tudo. "Com filtros": apenas quando as condições abaixo forem atendidas.
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="grid md:grid-cols-12 gap-4 items-center">
                <label className="md:col-span-3 text-sm font-medium">Preço (R$)</label>
                <div className="md:col-span-9 grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="Mínimo"
                    className="input input-bordered input-sm"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    disabled={disabled}
                    min={0}
                  />
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="Máximo"
                    className="input input-bordered input-sm"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    disabled={disabled}
                    min={0}
                  />
                </div>
              </div>

              {/* Condition */}
              <div className="grid md:grid-cols-12 gap-4 items-center">
                <label className="md:col-span-3 text-sm font-medium">Condição</label>
                <div className="md:col-span-9">
                  <select className="select select-bordered select-sm w-full" value={condition} onChange={(e)=>setCondition(e.target.value)} disabled={disabled}>
                    <option value="">Qualquer</option>
                    <option value="novo">Novo / Lacrado</option>
                    <option value="excelente">Excelente</option>
                    <option value="bom">Bom</option>
                    <option value="ok">Ok (marcas de uso)</option>
                    <option value="ruim">Ruim (faltando peças)</option>
                  </select>
                </div>
              </div>

              {/* Location & radius */}
              <div className="grid md:grid-cols-12 gap-4 items-center">
                <label className="md:col-span-3 text-sm font-medium">Localização</label>
                <div className="md:col-span-9 grid sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Cidade/UF"
                    className="input input-bordered input-sm"
                    value={locationCity}
                    onChange={(e)=>setLocationCity(e.target.value)}
                    disabled={disabled}
                  />
                  <div className="col-span-2 flex items-center gap-3">
                    <input
                      type="range"
                      min={5}
                      max={500}
                      step={5}
                      className="range range-xs"
                      value={radiusKm}
                      onChange={(e)=>setRadiusKm(Number(e.target.value))}
                      disabled={disabled}
                    />
                    <span className="badge badge-outline">{radiusKm} km</span>
                  </div>
                </div>
              </div>

              {/* Details row */}
              <div className="grid md:grid-cols-12 gap-4 items-center">
                <label className="md:col-span-3 text-sm font-medium">Detalhes</label>
                <div className="md:col-span-9 grid sm:grid-cols-3 gap-2">
                  <label className="label cursor-pointer justify-start gap-2">
                    <input type="checkbox" className="checkbox checkbox-sm" checked={hasSleeves} onChange={(e)=>setHasSleeves(e.target.checked)} disabled={disabled} />
                    <span className="label-text text-sm">Sleeves inclusos</span>
                  </label>
                  <select className="select select-bordered select-sm" value={isVersionLanguage} onChange={(e)=>setIsVersionLanguage(e.target.value)} disabled={disabled}>
                    <option value="">Idioma (qualquer)</option>
                    <option value="pt-br">Português</option>
                    <option value="en">Inglês</option>
                    <option value="es">Espanhol</option>
                    <option value="de">Alemão</option>
                    <option value="fr">Francês</option>
                  </select>
                  <input type="text" placeholder="Edição (ex: 2ª, Deluxe)" className="input input-bordered input-sm" value={edition} onChange={(e)=>setEdition(e.target.value)} disabled={disabled} />
                </div>
              </div>

              {/* Expansions & sale type */}
<div className="grid md:grid-cols-12 gap-4 items-center">
  <label className="md:col-span-3 text-sm font-medium">Tipo de anúncio</label>
  <div className="md:col-span-9 grid sm:grid-cols-12 items-center gap-3">
    {/* Primeira linha: tipos */}
    <label className="label cursor-pointer justify-start gap-2 sm:col-span-4">
      <input type="checkbox" className="checkbox checkbox-sm" checked={saleTypeDirect} onChange={(e)=>setSaleTypeDirect(e.target.checked)} disabled={disabled} />
      <span className="label-text text-sm">Venda direta</span>
    </label>
    <label className="label cursor-pointer justify-start gap-2 sm:col-span-4">
      <input type="checkbox" className="checkbox checkbox-sm" checked={saleTypeAuction} onChange={(e)=>setSaleTypeAuction(e.target.checked)} disabled={disabled} />
      <span className="label-text text-sm">Leilão</span>
    </label>
    {/* Segunda linha: alinhada à direita com offset consistente */}
    <label className="label cursor-pointer justify-start gap-2 sm:col-start-5 sm:col-span-8">
      <input type="checkbox" className="checkbox checkbox-sm" checked={includeExpansions} onChange={(e)=>setIncludeExpansions(e.target.checked)} disabled={disabled} />
      <span className="label-text text-sm">Incluir expansões</span>
    </label>
  </div>
</div>

              {/* Seller quality */}
<div className="grid md:grid-cols-12 gap-4 items-center">
  <label className="md:col-span-3 text-sm font-medium">Vendedor</label>
  <div className="md:col-span-9 grid sm:grid-cols-12 items-center gap-3">
    <div className="flex items-center gap-3 sm:col-span-4">
      <span className="text-xs text-base-content/60">Nota mínima</span>
      <input type="range" min={0} max={5} step={1} className="range range-xs" value={sellerRating} onChange={(e)=>setSellerRating(Number(e.target.value))} disabled={disabled} />
      <span className="badge badge-outline">{sellerRating}★</span>
    </div>
    <label className="label cursor-pointer justify-start gap-2 sm:col-start-5 sm:col-span-8">
      <input type="checkbox" className="checkbox checkbox-sm" checked={onlyVerifiedSellers} onChange={(e)=>setOnlyVerifiedSellers(e.target.checked)} disabled={disabled} />
      <span className="label-text text-sm">Apenas vendedores verificados</span>
    </label>
  </div>
</div>

              {/* Shipping */}
              <div className="grid md:grid-cols-12 gap-4 items-start">
                <label className="md:col-span-3 text-sm font-medium mt-1">Entrega</label>
                <div className="md:col-span-9">
                  <div className="grid sm:grid-cols-12 gap-2">
                    {/* Left: labels */}
                    <div className="sm:col-span-4 flex flex-col gap-2 pt-[2px]">
                      <span className="text-xs text-base-content/70 h-9 flex items-center">Opção</span>
                      <span className="text-xs text-base-content/70 h-9 flex items-center">Incluir palavras</span>
                      <span className="text-xs text-base-content/70 h-9 flex items-center">Excluir palavras</span>
                    </div>
                    {/* Right: fields */}
                    <div className="sm:col-span-8 flex flex-col gap-2">
                      <select className="select select-bordered select-sm h-9" value={shippingOption} onChange={(e)=>setShippingOption(e.target.value)} disabled={disabled}>
                        <option value="">Qualquer</option>
                        <option value="retirada">Retirada em mãos</option>
                        <option value="envio">Envio (Correios/Transportadora)</option>
                        <option value="ambos">Ambos</option>
                      </select>
                      <input type="text" placeholder="Ex.: frete incluso, entrega rápida" className="input input-bordered input-sm h-9" value={keywordsInclude} onChange={(e)=>setKeywordsInclude(e.target.value)} disabled={disabled} />
                      <input type="text" placeholder="Ex.: sem envio, somente retirada" className="input input-bordered input-sm h-9" value={keywordsExclude} onChange={(e)=>setKeywordsExclude(e.target.value)} disabled={disabled} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="divider my-0" />

              {/* Notifications */}
<div className="grid md:grid-cols-12 gap-4 items-start">
  <label className="md:col-span-3 text-sm font-medium mt-1">Notificações</label>
  <div className="md:col-span-9 grid sm:grid-cols-12 gap-2">
    {/* Canais (checkboxes) */}
    <div className="sm:col-span-4">
      <div className="flex flex-col gap-2">
        <label className="label cursor-pointer justify-start gap-2 h-9">
          <input type="checkbox" className="checkbox checkbox-sm" checked={channels.email} onChange={(e)=>setChannels((c)=>({...c, email:e.target.checked}))} />
          <span className="label-text text-sm">Email</span>
        </label>
        <label className="label cursor-pointer justify-start gap-2 h-9">
          <input type="checkbox" className="checkbox checkbox-sm" checked={channels.push} onChange={(e)=>setChannels((c)=>({...c, push:e.target.checked}))} />
          <span className="label-text text-sm">Push</span>
        </label>
        <label className="label cursor-pointer justify-start gap-2 h-9">
          <input type="checkbox" className="checkbox checkbox-sm" checked={channels.inapp} onChange={(e)=>setChannels((c)=>({...c, inapp:e.target.checked}))} />
          <span className="label-text text-sm">In‑app</span>
        </label>
      </div>
    </div>

    {/* Frequência + Limite */}
    <div className="sm:col-span-8 grid grid-cols-2 gap-2 items-center">
      <select className="select select-bordered select-sm h-9" value={frequency} onChange={(e)=>setFrequency(e.target.value as AlertFrequency)}>
        <option value="instant">Instantâneo</option>
        <option value="hourly">De hora em hora</option>
        <option value="daily">Diário (resumo)</option>
        <option value="weekly">Semanal (resumo)</option>
      </select>
      <div className="flex items-center gap-2">
        <input type="number" min={1} max={50} className="input input-bordered input-sm h-9 w-full" value={limitPerDay} onChange={(e)=>setLimitPerDay(Number(e.target.value))} />
        <span className="text-xs text-base-content/60">máx/dia</span>
      </div>
    </div>
  </div>
</div>

<div className="divider my-0" />

{/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-base-content/60">
                  {mode === "any" ? (
                    <span>Você receberá <b>todos</b> os novos anúncios do jogo selecionado.</span>
                  ) : (
                    <span>
                      Estimativa: <span className="badge badge-outline">{estimatedMatches} anúncios/mês</span> com os filtros atuais.
                    </span>
                  )}
                </div>
                <div className="join">
                  <Link href={`/alerts`} className="btn btn-ghost btn-sm join-item">Cancelar</Link>
                  <button type="submit" className="btn btn-primary btn-sm join-item" disabled={!canSubmit}>Salvar alerta</button>
                </div>
              </div>
            </div>
          </div>

          {/* Existing subscriptions (geral) */}
          <ExistingAlertsList />
        </form>

        {/* Right column: live summary */}
        <aside className="lg:col-span-4">
          <div className="card bg-base-100 border border-base-200 sticky top-24">
            <div className="card-body">
              <h3 className="card-title text-base">Resumo do alerta</h3>
              <div className="text-sm space-y-2">
                <p><span className="opacity-60">Jogo:</span> <b>{selectedGame?.title || "— selecione"}</b></p>
                <p>
                  <span className="opacity-60">Modo:</span> {mode === "any" ? "Qualquer anúncio" : "Com filtros"}
                </p>
                {mode === "filtered" && (
                  <ul className="list-disc list-inside space-y-1">
                    {(priceMin || priceMax) && <li>Preço: R$ {priceMin || "?"} – {priceMax || "?"}</li>}
                    {condition && <li>Condição: {condition}</li>}
                    {(locationCity || radiusKm) && <li>Local: {locationCity || "—"} • raio {radiusKm} km</li>}
                    {hasSleeves && <li>Com sleeves</li>}
                    {isVersionLanguage && <li>Idioma: {isVersionLanguage.toUpperCase()}</li>}
                    {edition && <li>Edição: {edition}</li>}
                    <li>Tipo: {saleTypeDirect ? "Direta" : ""}{saleTypeDirect && saleTypeAuction ? " / " : ""}{saleTypeAuction ? "Leilão" : ""}</li>
                    {(sellerRating>0) && <li>Nota mínima: {sellerRating}★</li>}
                    {onlyVerifiedSellers && <li>Apenas verificados</li>}
                    {shippingOption && <li>Entrega: {shippingOption}</li>}
                    {keywordsInclude && <li>Incluir: {keywordsInclude}</li>}
                    {keywordsExclude && <li>Excluir: {keywordsExclude}</li>}
                  </ul>
                )}
              </div>
              <div className="divider"/>
              <div className="text-sm space-y-2">
                <p><span className="opacity-60">Canais:</span> {[channels.email&&"email", channels.push&&"push", channels.inapp&&"in‑app"].filter(Boolean).join(", ") || "—"}</p>
                <p><span className="opacity-60">Frequência:</span> {frequency}</p>
                <p><span className="opacity-60">Limite:</span> {limitPerDay} / dia</p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

// Mock component for the user's existing alerts (all games)
function ExistingAlertsList() {
  // Substituir por GET real (/api/alerts)
  const [items] = useState<Array<{
    id: string;
    mode: "any" | "filtered";
    summary: string;
    gameTitle: string;
    active: boolean;
    createdAt: string;
  }>>([
    { id: "a1", mode: "any", summary: "Qualquer anúncio", gameTitle: "Catan", active: true, createdAt: "2025-08-01" },
    { id: "a2", mode: "filtered", summary: "Até R$250, POA +50km, Direto", gameTitle: "Wingspan", active: true, createdAt: "2025-08-10" },
  ]);

  return (
    <div className="card bg-base-100 border border-base-200">
      <div className="card-body gap-4">
        <h2 className="card-title text-base">Meus alertas</h2>
        {items.length === 0 ? (
          <p className="text-sm text-base-content/60">Você ainda não criou alertas.</p>
        ) : (
          <ul className="menu bg-base-100 rounded-box">
            {items.map((it)=> (
              <li key={it.id}>
                <div className="flex items-center gap-3 py-3">
                  <span className={`badge badge-sm ${it.mode === "any" ? "badge-neutral" : "badge-primary"}`}>{it.mode === "any" ? "Qualquer" : "Filtrado"}</span>
                  <span className="flex-1 text-sm">{it.gameTitle} • {it.summary}</span>
                  <span className="text-xs opacity-60">{new Date(it.createdAt).toLocaleDateString()}</span>
                  <div className="join">
                    <button className="btn btn-ghost btn-xs join-item">Editar</button>
                    <button className="btn btn-ghost btn-xs join-item">Desativar</button>
                    <button className="btn btn-error btn-xs join-item">Excluir</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}