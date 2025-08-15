// app/listings/new/page.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// --- Types ---
type ListingType = "sale" | "auction";

type FormState = {
  listingType: ListingType;
  title: string;
  gameId: string; // bg table FK (string to keep it generic)
  condition: "new" | "like_new" | "very_good" | "good" | "acceptable";
  language: string;
  isSealed: boolean;
  price: string; // as string for input control
  quantity: number;
  acceptOffers: boolean;
  shippingIncluded: boolean;
  shippingNotes: string;
  location: string;
  description: string;
  tags: string;
  // Auction
  startPrice: string;
  buyNowPrice: string;
  bidIncrement: string;
  reservePrice: string;
  startsAt: string; // datetime-local
  endsAt: string; // datetime-local
};

const initialState: FormState = {
  listingType: "sale",
  title: "",
  gameId: "",
  condition: "very_good",
  language: "Português-BR",
  isSealed: false,
  price: "",
  quantity: 1,
  acceptOffers: true,
  shippingIncluded: false,
  shippingNotes: "",
  location: "",
  description: "",
  tags: "",
  startPrice: "",
  buyNowPrice: "",
  bidIncrement: "5",
  reservePrice: "",
  startsAt: "",
  endsAt: "",
};

export default function NewListingPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- Simple image previews ---
  useEffect(() => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [files]);

  // --- Derived: show auction fields? ---
  const isAuction = form.listingType === "auction";

  // --- Handlers ---
  const update = (patch: Partial<FormState>) => setForm((f) => ({ ...f, ...patch }));

  const onNumber = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^0-9.,-]/g, "");
    update({ [key]: v } as any);
  };

  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fs = Array.from(e.target.files || []);
    setFiles(fs.slice(0, 10)); // max 10 images
  };

  const validate = (): boolean => {
    const err: Record<string, string> = {};
    if (!form.title.trim()) err.title = "Required";
    if (!form.gameId.trim()) err.gameId = "Select a game";
    if (form.listingType === "sale" && !form.price) err.price = "Set a price";
    if (isAuction) {
      if (!form.startPrice) err.startPrice = "Required";
      if (!form.endsAt) err.endsAt = "Set an end date";
    }
    if (files.length === 0) err.images = "Add at least one photo";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      // Build FormData to send to your backend
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
      files.forEach((f, i) => fd.append("images", f, f.name || `photo-${i}.jpg`));

      // TODO: Replace with your actual endpoint
      const res = await fetch("/api/listings/create", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Failed to create listing");

      // Redirect or show success
      window.location.href = "/app/app/dashboard";
    } catch (err) {
      console.error(err);
      setErrors((e) => ({ ...e, submit: "Could not save. Try again." }));
    } finally {
      setSubmitting(false);
    }
  };

  // --- Mock options (replace with fetched options from /api/bg or similar) ---
  const gameOptions = useMemo(
    () => [
      { id: "1", name: "Catan" },
      { id: "2", name: "Azul" },
      { id: "3", name: "Terraforming Mars" },
      { id: "4", name: "Gloomhaven" },
    ],
    []
  );

  return (
    <main className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="breadcrumbs text-sm mb-4">
        <ul>
          <li><Link href="/">Início</Link></li>
          <li><Link href="/listings">Anúncios</Link></li>
          <li>Novo Anúncio</li>
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        {/* Header */}
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold">Criar anúncio</h1>
          <p className="text-base-content/70">Venda direta ou leilão. Use fotos reais e descreva claramente a condição.</p>
        </header>

        {/* Steps (visual only) */}
        <ul className="steps w-full">
          <li className="step step-primary">Detalhes</li>
          <li className="step step-primary">Fotos</li>
          <li className="step">Revisar & Publicar</li>
        </ul>

        <form className="grid grid-cols-1 lg:grid-cols-3 gap-6" onSubmit={submit}>
          {/* Left: Form fields */}
          <section className="lg:col-span-2 flex flex-col gap-6">
{/* Listing type */}
<div className="card bg-base-100 shadow">
  <div className="card-body gap-6">
    <h2 className="card-title">Tipo de anúncio</h2>

    {/* Toggle Venda/Leilão */}
    <div role="tablist" className="tabs tabs-boxed w-fit">
      <button
        role="tab"
        className={`tab ${form.listingType === "sale" ? "tab-active" : ""}`}
        onClick={(e) => { e.preventDefault(); update({ listingType: "sale" }); }}
      >
        Venda direta
      </button>
      <button
        role="tab"
        className={`tab ${form.listingType === "auction" ? "tab-active" : ""}`}
        onClick={(e) => { e.preventDefault(); update({ listingType: "auction" }); }}
      >
        Leilão
      </button>
    </div>

    {/* DUAS COLUNAS: rótulos (200px) | campos (1fr) */}
    <div className="grid gap-4">
      {/* Jogo */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
        <div className="text-sm md:text-base font-medium">Jogo</div>
        <div className="flex flex-col gap-1">
          <select
            className="select select-bordered"
            value={form.gameId}
            onChange={(e) => update({ gameId: e.target.value })}
          >
            <option value="" disabled>Selecione o jogo</option>
            {gameOptions.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
          {errors.gameId && <span className="text-xs text-error">{errors.gameId}</span>}
        </div>
      </div>

      {/* Título */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
        <div className="text-sm md:text-base font-medium">Título do anúncio</div>
        <div className="flex flex-col gap-1">
          <input
            className="input input-bordered"
            placeholder="Ex.: Terraforming Mars + Expansões"
            value={form.title}
            onChange={(e) => update({ title: e.target.value })}
          />
          {errors.title && <span className="text-xs text-error">{errors.title}</span>}
        </div>
      </div>

      {/* Idioma */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
        <div className="text-sm md:text-base font-medium">Idioma</div>
        <input
          className="input input-bordered"
          placeholder="Português-BR"
          value={form.language}
          onChange={(e) => update({ language: e.target.value })}
        />
      </div>

      {/* Condição */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
        <div className="text-sm md:text-base font-medium">Condição</div>
        <select
          className="select select-bordered"
          value={form.condition}
          onChange={(e) => update({ condition: e.target.value as FormState["condition"] })}
        >
          <option value="new">Novo (lacrado)</option>
          <option value="like_new">Como novo</option>
          <option value="very_good">Muito bom</option>
          <option value="good">Bom</option>
          <option value="acceptable">Aceitável</option>
        </select>
      </div>

      {/* Lacrado */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
        <div className="text-sm md:text-base font-medium">Lacrado</div>
        <label className="label cursor-pointer justify-start gap-3 m-0">
          <input
            type="checkbox"
            className="toggle"
            checked={form.isSealed}
            onChange={(e) => update({ isSealed: e.target.checked })}
          />
          <span className="label-text">Produto lacrado</span>
        </label>
      </div>

      {/* Localização */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
        <div className="text-sm md:text-base font-medium">Localização</div>
        <input
          className="input input-bordered"
          placeholder="São Leopoldo - RS"
          value={form.location}
          onChange={(e) => update({ location: e.target.value })}
        />
      </div>

      {/* CAMPOS DE VENDA DIRETA */}
      {form.listingType === "sale" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
            <div className="text-sm md:text-base font-medium">Preço (R$)</div>
            <div className="flex flex-col gap-1">
              <input
                className="input input-bordered"
                placeholder="Ex.: 250,00"
                inputMode="decimal"
                value={form.price}
                onChange={onNumber("price")}
              />
              {errors.price && <span className="text-xs text-error">{errors.price}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
            <div className="text-sm md:text-base font-medium">Quantidade</div>
            <input
              type="number"
              min={1}
              className="input input-bordered"
              value={form.quantity}
              onChange={(e) =>
                update({ quantity: Math.max(1, Number(e.target.value || 1)) })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
            <div className="text-sm md:text-base font-medium">Ofertas</div>
            <label className="label cursor-pointer justify-start gap-3 m-0">
              <input
                type="checkbox"
                className="toggle"
                checked={form.acceptOffers}
                onChange={(e) => update({ acceptOffers: e.target.checked })}
              />
              <span className="label-text">Aceitar ofertas</span>
            </label>
          </div>
        </>
      )}

      {/* CAMPOS DE LEILÃO */}
      {form.listingType === "auction" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
            <div className="text-sm md:text-base font-medium">Lance inicial (R$)</div>
            <div className="flex flex-col gap-1">
              <input
                className="input input-bordered"
                inputMode="decimal"
                placeholder="Ex.: 100,00"
                value={form.startPrice}
                onChange={onNumber("startPrice")}
              />
              {errors.startPrice && <span className="text-xs text-error">{errors.startPrice}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
            <div className="text-sm md:text-base font-medium">Incremento de lance (R$)</div>
            <input
              className="input input-bordered"
              inputMode="decimal"
              placeholder="Ex.: 5,00"
              value={form.bidIncrement}
              onChange={onNumber("bidIncrement")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
            <div className="text-sm md:text-base font-medium">Compre Já (opcional)</div>
            <input
              className="input input-bordered"
              inputMode="decimal"
              placeholder="Ex.: 300,00"
              value={form.buyNowPrice}
              onChange={onNumber("buyNowPrice")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
            <div className="text-sm md:text-base font-medium">Preço de reserva (opcional)</div>
            <input
              className="input input-bordered"
              inputMode="decimal"
              placeholder="Ex.: 200,00"
              value={form.reservePrice}
              onChange={onNumber("reservePrice")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
            <div className="text-sm md:text-base font-medium">Início</div>
            <input
              type="datetime-local"
              className="input input-bordered"
              value={form.startsAt}
              onChange={(e) => update({ startsAt: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
            <div className="text-sm md:text-base font-medium">Término</div>
            <div className="flex flex-col gap-1">
              <input
                type="datetime-local"
                className="input input-bordered"
                value={form.endsAt}
                onChange={(e) => update({ endsAt: e.target.value })}
              />
              {errors.endsAt && <span className="text-xs text-error">{errors.endsAt}</span>}
            </div>
          </div>
        </>
      )}

      {/* Descrição */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-4">
        <div className="text-sm md:text-base font-medium mt-2 md:mt-2">Descrição</div>
        <textarea
          className="textarea textarea-bordered min-h-28"
          placeholder="Estado das cartas/peças, se tem sleeves, inserts, manual, etc."
          value={form.description}
          onChange={(e) => update({ description: e.target.value })}
        />
      </div>

      {/* Tags */}
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] items-center gap-2 md:gap-4">
        <div className="text-sm md:text-base font-medium">Tags</div>
        <input
          className="input input-bordered"
          placeholder="family, euro, br"
          value={form.tags}
          onChange={(e) => update({ tags: e.target.value })}
        />
      </div>
    </div>
  </div>
</div>

            {/* Shipping */}
            <div className="card bg-base-100 shadow">
              <div className="card-body gap-4">
                <h2 className="card-title">Entrega</h2>
                <label className="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" className="toggle" checked={form.shippingIncluded} onChange={(e) => update({ shippingIncluded: e.target.checked })} />
                  <span className="label-text">Frete incluso</span>
                </label>
                <label className="form-control">
                  <div className="label"><span className="label-text">Observações de envio</span></div>
                  <input className="input input-bordered" placeholder="Correios PAC/SEDEX, retirada em mãos, etc." value={form.shippingNotes} onChange={(e) => update({ shippingNotes: e.target.value })} />
                </label>
              </div>
            </div>

            {/* Photos */}
            <div className="card bg-base-100 shadow">
              <div className="card-body gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="card-title">Fotos do produto</h2>
                  {errors.images && <span className="text-error text-sm">{errors.images}</span>}
                </div>
                <input type="file" className="file-input file-input-bordered w-full" accept="image/*" multiple onChange={onFiles} />

                {previews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {previews.map((src, i) => (
                      <figure key={i} className="relative aspect-square overflow-hidden rounded-box border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={`preview-${i}`} className="h-full w-full object-cover" />
                        <button type="button" className="btn btn-xs btn-circle absolute top-2 right-2" onClick={() => setFiles((fs) => fs.filter((_, idx) => idx !== i))}>✕</button>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right: Live preview & actions */}
          <aside className="lg:col-span-1 flex flex-col gap-6">
            {/* Live preview */}
            <div className="card bg-base-100 shadow">
              <div className="card-body gap-4">
                <h3 className="card-title">Pré‑visualização</h3>
                <div className="card bg-base-200">
                  <div className="card-body gap-3">
                    <div className="aspect-video relative rounded-box overflow-hidden bg-base-300">
                      {previews[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={previews[0]} alt="preview" className="h-full w-full object-cover" />
                      ) : (
                        <div className="grid place-items-center h-full text-base-content/50">Sem foto</div>
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm opacity-70">{gameOptions.find(g => g.id === form.gameId)?.name || "Jogo"}</div>
                        <div className="font-semibold truncate">{form.title || "Título do anúncio"}</div>
                        <div className="flex gap-2 mt-1">
                          <div className="badge badge-outline">
                            {form.condition === "new" ? "Novo" :
                             form.condition === "like_new" ? "Como novo" :
                             form.condition === "very_good" ? "Muito bom" :
                             form.condition === "good" ? "Bom" : "Aceitável"}
                          </div>
                          {form.isSealed && <div className="badge badge-primary">Lacrado</div>}
                        </div>
                      </div>
                      <div className="text-right">
                        {isAuction ? (
                          <>
                            <div className="text-xl font-bold">R$ {form.startPrice || "--"}</div>
                            <div className="text-xs opacity-70">Lance inicial</div>
                          </>
                        ) : (
                          <>
                            <div className="text-xl font-bold">R$ {form.price || "--"}</div>
                            <div className="text-xs opacity-70">à vista</div>
                          </>
                        )}
                      </div>
                    </div>
                    {isAuction && form.endsAt && (
                      <div className="text-xs opacity-70">Termina em: {new Date(form.endsAt).toLocaleString()}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Publish */}
            <div className="card bg-base-100 shadow">
              <div className="card-body gap-4">
                {errors.submit && <div className="alert alert-error"><span>{errors.submit}</span></div>}
                <button type="submit" className={`btn btn-primary w-full ${submitting ? "btn-disabled" : ""}`} disabled={submitting}>
                  {submitting ? "Publicando…" : "Publicar anúncio"}
                </button>
                <Link href="/app/app/dashboard" className="btn btn-ghost w-full">Cancelar</Link>
                <p className="text-xs opacity-70">Ao publicar, você concorda com as regras de venda do MercadoBG.</p>
              </div>
            </div>
          </aside>
        </form>

        {/* Help */}
        <details className="collapse bg-base-200">
          <summary className="collapse-title text-md font-medium">Dicas para vender mais</summary>
          <div className="collapse-content text-sm leading-relaxed">
            <ul className="list-disc pl-5 space-y-1">
              <li>Faça fotos claras, com boa luz, mostrando componentes e caixa.</li>
              <li>Descreva marcas de uso e se há sleeves, inserts, manual, etc.</li>
              <li>Escolha preço competitivo consultando histórico de vendas.</li>
              <li>Combine opções de envio e retirada em mãos quando possível.</li>
            </ul>
          </div>
        </details>
      </div>
    </main>
  );
}
