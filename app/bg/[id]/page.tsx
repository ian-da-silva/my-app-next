// app/bg/[id]/page.tsx
// MercadoBG — Página de detalhes do Boardgame (SEM backend)
// - Header compacto em "card" com badge de nota
// - Estrelas de 10 pontos (estático)
// - Listagens em linha (estilo tabela) com colunas
// - Abas estáticas
// - Sem event handlers (compatível com Server Components)

import Image from "next/image";
import Link from "next/link";
import { MainHeader } from "@/components/app/main-header"; // cabeçalho global

// ============================
// Constantes
// ============================
const PLACEHOLDER_IMG = "/jaws.png"; // arquivo em public/jaws.png

// ============================
// Tipagens
// ============================
export type Bg = {
  id: number;
  name: string;
  year_published?: number | null;
  min_players?: number | null;
  max_players?: number | null;
  min_age?: number | null;
  play_time?: number | null;
  designers?: string[] | null;
  artists?: string[] | null;
  publishers?: string[] | null;
  categories?: string[] | null;
  mechanics?: string[] | null;
  image?: string | null;
  description?: string | null;
  rating_avg?: number | null; // média 0-10
  rating_count?: number | null; // nº de votos
  weight_avg?: number | null; // complexidade 0-5
  is_expansion?: boolean;
  expands?: { id: number; name: string } | null;
};

export type Listing = {
  id: number;
  bg_id: number;
  type: "venda" | "leilao" | string;
  price: number;
  currency?: string | null;
  condition?: string | null;
  created_at?: string | null;
  seller_id?: number | null;
  seller_name?: string | null;
  thumbnail?: string | null;
  location_city?: string | null;
  location_state?: string | null;
};

// ============================
// MOCK DATA — apenas para visualizar
// ============================
const MOCK_BG: Record<string, Bg> = {
  "1": {
    id: 1,
    name: "Hansa Teutonica: Big Box",
    year_published: 2020,
    min_players: 3,
    max_players: 5,
    min_age: 12,
    play_time: 90,
    designers: ["Andreas Steding"],
    artists: ["Dennis Lohausen"],
    publishers: ["Pegasus Spiele"],
    categories: ["Econômico", "Rede/Conexão"],
    mechanics: ["Controle de Área", "Melhoria de Ações"],
    image: null,
    description: "Construa redes de comércio e otimize seus privilégios para dominar a Liga Hanseática.",
    rating_avg: 8.4,
    rating_count: 6600,
    weight_avg: 2.97,
    is_expansion: false,
    expands: null,
  },
  "2": {
    id: 2,
    name: "Gloomhaven",
    year_published: 2017,
    min_players: 1,
    max_players: 4,
    min_age: 14,
    play_time: 120,
    designers: ["Isaac Childres"],
    artists: ["Alexander Elichev"],
    publishers: ["Cephalofair Games"],
    categories: ["Aventura", "Cooperativo"],
    mechanics: ["Campanha", "Gestão de Mão"],
    image: null,
    description: "Campanha cooperativa com combate tático baseado em cartas.",
    rating_avg: 8.7,
    rating_count: 86000,
    weight_avg: 3.8,
    is_expansion: false,
    expands: null,
  },
  "3": {
    id: 3,
    name: "Forgotten Circles",
    year_published: 2019,
    min_players: 1,
    max_players: 4,
    min_age: 14,
    play_time: 120,
    designers: ["Isaac Childres"],
    artists: ["Alexander Elichev"],
    publishers: ["Cephalofair Games"],
    categories: ["Expansão"],
    mechanics: ["Campanha"],
    image: null,
    description: "Expansão que adiciona novos cenários e a classe Aesther Diviner.",
    rating_avg: 8.0,
    rating_count: 12000,
    weight_avg: 3.6,
    is_expansion: true,
    expands: { id: 2, name: "Gloomhaven" },
  },
};

const MOCK_LISTINGS: Listing[] = [
  {
    id: 101,
    bg_id: 1,
    type: "venda",
    price: 220,
    currency: "BRL",
    condition: "Como novo",
    created_at: "2025-08-10T12:00:00Z",
    seller_id: 7,
    seller_name: "João",
    thumbnail: null,
    location_city: "São Leopoldo",
    location_state: "RS",
  },
  {
    id: 102,
    bg_id: 1,
    type: "leilao",
    price: 150,
    currency: "BRL",
    condition: "Usado",
    created_at: "2025-08-11T12:00:00Z",
    seller_id: 8,
    seller_name: "Maria",
    thumbnail: null,
    location_city: "Porto Alegre",
    location_state: "RS",
  },
  {
    id: 201,
    bg_id: 2,
    type: "venda",
    price: 650,
    currency: "BRL",
    condition: "Lacrado",
    created_at: "2025-08-09T12:00:00Z",
    seller_id: 9,
    seller_name: "Pedro",
    thumbnail: null,
    location_city: "Canoas",
    location_state: "RS",
  },
];

// ============================
// Utilitários
// ============================
function formatPrice(value: number, currency = "BRL") {
  try {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency }).format(value);
  } catch {
    return `R$ ${value.toFixed(2)}`;
  }
}

function joinList(arr?: string[] | null) {
  return arr && arr.length ? arr.join(", ") : "—";
}

function formatK(n?: number | null) {
  if (!n) return "0";
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
}

function formatDateBR(iso?: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("pt-BR");
  } catch {
    return "—";
  }
}

// ============================
// Estrelas 0-10 (estático)
// ============================
function Stars10({ value = 0, max = 10 }: { value?: number; max?: number }) {
  const v = Math.max(0, Math.min(max, value));
  const full = Math.floor(v);
  const empty = max - full;
  return (
    <div className="inline-flex items-center gap-0.5 align-middle">
      {Array.from({ length: full }).map((_, i) => (
        <svg key={`f${i}`} viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-current text-warning"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      ))}
      {Array.from({ length: empty }).map((_, i) => (
        <svg key={`e${i}`} viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 text-base-300"><path fill="currentColor" d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
      ))}
    </div>
  );
}

function ScoreBadge({ score, votes }: { score?: number | null; votes?: number | null }) {
  return (
    <div className="flex items-center gap-3">
      <div className="badge badge-success badge-lg px-3 py-3 text-lg font-bold rounded-xl">
        {score?.toFixed(1) ?? "—"}
      </div>
      <div className="text-sm text-base-content/70">{formatK(votes)} ratings</div>
    </div>
  );
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-3 py-2">
      <div className="text-xs uppercase tracking-wide text-base-content/60">{label}</div>
      <div className="text-sm md:text-base font-medium">{value}</div>
    </div>
  );
}

function ExpansionPill({ expands }: { expands?: Bg["expands"] }) {
  if (!expands) return null;
  return (
    <div className="mb-2">
      <span className="badge badge-outline">
        Expands: <Link href={`/bg/${expands.id}`} className="ml-1 link link-primary">{expands.name}</Link>
      </span>
    </div>
  );
}

// ============================
// Listagens — cabeçalho e linha (1 linha por item)
// ============================
function ListingsHeader() {
  return (
    <div className="px-4 py-2 border-b border-base-200 hidden md:grid md:grid-cols-[56px_150px_140px_1fr_180px_120px] text-xs uppercase tracking-wide text-base-content/60">
      <div className=""> &nbsp; </div>
      <div>Tipo/Condição</div>
      <div className="text-right">Preço</div>
      <div>Vendedor</div>
      <div>Local</div>
      <div>Incluído</div>
    </div>
  );
}

function ListingRow({ item, fallbackImage }: { item: Listing; fallbackImage?: string | null }) {
  const location = [item.location_city, item.location_state].filter(Boolean).join("/ ");
  const src = (item.thumbnail || fallbackImage || PLACEHOLDER_IMG) as string;
  return (
    <li className="px-2 md:px-0">
      <Link href={`/listings/${item.id}`} className="block hover:bg-base-50/40">
        <div className="px-4 py-3 grid grid-cols-[56px_1fr] md:grid-cols-[56px_150px_140px_1fr_180px_120px] items-center gap-3">
          {/* Thumb */}
          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
            <Image src={src} alt={String(item.id)} fill className="object-cover" />
          </div>

          {/* Tipo/Condição (mobile: junto) */}
          <div className="text-xs md:text-sm text-base-content/70 flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full border border-base-300 uppercase">{item.type}</span>
            {item.condition && <span className="px-2 py-0.5 rounded-full border border-base-300">{item.condition}</span>}
          </div>

          {/* Preço */}
          <div className="hidden md:block text-sm md:text-base font-semibold text-right">{formatPrice(item.price, item.currency || "BRL")}</div>

          {/* Vendedor */}
          <div className="hidden md:block text-sm truncate">{item.seller_name || "—"}</div>

          {/* Local */}
          <div className="hidden md:block text-sm truncate">{location || "—"}</div>

          {/* Data */}
          <div className="hidden md:block text-sm text-base-content/70">{formatDateBR(item.created_at)}</div>
        </div>
      </Link>
    </li>
  );
}

function SortBar({ count, sort, id }: { count: number; sort: string; id: string }) {
  const sorts = [
    { value: "price_asc", label: "Menor preço" },
    { value: "price_desc", label: "Maior preço" },
    { value: "recent", label: "Mais recentes" },
  ];
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 py-3">
      <div className="text-sm text-base-content/70">{count} {count === 1 ? "oferta" : "ofertas"}</div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Ordenar por:</span>
        <div className="join">
          {sorts.map((s) => (
            <Link key={s.value} href={`/bg/${id}?sort=${s.value}`} className={`btn btn-sm join-item ${sort === s.value ? "btn-primary" : "btn-outline"}`}>
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================
// Página (SEM FETCH) — usa mocks
// ============================
export default async function Page({ params, searchParams }: { params: { id: string }; searchParams: { [k: string]: string | string[] | undefined } }) {
  const id = params.id;
  const sort = (typeof searchParams?.sort === "string" ? searchParams.sort : "price_asc") as string;

  const bg: Bg =
    MOCK_BG[id] || {
      id: Number(id),
      name: `Jogo #${id}`,
      image: null,
      year_published: null,
      min_players: null,
      max_players: null,
      min_age: null,
      play_time: null,
      designers: null,
      artists: null,
      publishers: null,
      categories: null,
      mechanics: null,
      description: "Descrição do jogo indisponível no modo de visualização.",
      rating_avg: 0,
      rating_count: 0,
      weight_avg: 0,
      is_expansion: false,
      expands: null,
    };

  const rawListings = MOCK_LISTINGS.filter((l) => String(l.bg_id) === String(id));

  const listings = [...rawListings].sort((a, b) => {
    switch (sort) {
      case "price_desc":
        return (b.price ?? 0) - (a.price ?? 0);
      case "recent":
        return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      case "price_asc":
      default:
        return (a.price ?? 0) - (b.price ?? 0);
    }
  });

  const userRatingMock10 = 7; // 0-10 estático para "Minha nota"

  return (
    <div className="min-h-screen bg-base-200/40">
      {/* Cabeçalho global */}
      <MainHeader user={{ name: "Usuário" }} alertsCount={0} />

      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
        {/* ===== Header Card compacto ===== */}
        <div className="rounded-2xl bg-base-100 shadow-sm ring-1 ring-base-200/70 p-4 md:p-5">
          {/* Expansão? */}
          <ExpansionPill expands={bg.expands || undefined} />

          <div className="grid grid-cols-[112px_1fr] md:grid-cols-[140px_1fr] gap-4 items-center">
            {/* Capa menor */}
            <div className="relative w-[112px] md:w-[140px] aspect-[3/4] rounded-xl overflow-hidden bg-base-200">
              <Image src={(bg.image || PLACEHOLDER_IMG) as string} alt={bg.name} fill className="object-cover" priority />
            </div>

            {/* Conteúdo à direita */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <ScoreBadge score={bg.rating_avg} votes={bg.rating_count || 0} />
                <h1 className="text-xl md:text-2xl font-bold leading-tight truncate">{bg.name}</h1>
                {bg.year_published && (<span className="text-base-content/60">({bg.year_published})</span>)}
              </div>

              {/* Estrelas do usuário (0-10, estático) */}
              <div className="mt-1 flex items-center gap-2 text-sm text-base-content/70">
                <span>Minha nota:</span>
                <Stars10 value={userRatingMock10} />
                <span className="text-xs text-base-content/60">{userRatingMock10}/10</span>
              </div>

              {/* Linha de stats, estilo compacto */}
              <div className="mt-3 flex flex-wrap divide-x divide-base-200">
                <QuickStat label="Jogadores" value={`${bg.min_players ?? "?"}–${bg.max_players ?? "?"}`} />
                <QuickStat label="Tempo" value={bg.play_time ? `${bg.play_time} min` : "—"} />
                <QuickStat label="Idade" value={bg.min_age ? `${bg.min_age}+` : "—"} />
                <QuickStat label="Peso (1–5)" value={bg.weight_avg ? `${bg.weight_avg.toFixed(2)} / 5` : "—"} />
              </div>

              {/* Metadados curtos */}
              <div className="mt-3 text-xs md:text-sm text-base-content/70 space-x-3">
                <span><b>Designer:</b> {joinList(bg.designers)}</span>
                <span><b>Artista:</b> {joinList(bg.artists)}</span>
                <span><b>Editora:</b> {joinList(bg.publishers)}</span>
              </div>

              {/* Ações */}
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/sell?bg=${bg.id}`} className="btn btn-primary btn-sm rounded-full">Vender este jogo</Link>
                <Link href={`/alerts/new?bg=${bg.id}`} className="btn btn-outline btn-sm rounded-full">Criar alerta de preço</Link>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Descrição ===== */}
        <section className="mt-6">
          <h2 className="text-lg md:text-xl font-semibold mb-2">Descrição</h2>
          <div className="rounded-2xl bg-base-100 ring-1 ring-base-200/70 p-4 text-sm md:text-base text-base-content/80">
            {bg.description || "Sem descrição disponível."}
          </div>
        </section>

        {/* ===== Listagens ===== */}
        <section className="mt-6">
          <h2 className="text-lg md:text-xl font-semibold mb-2">Listagens disponíveis</h2>
          <div className="rounded-2xl bg-base-100 ring-1 ring-base-200/70">
            <SortBar count={listings.length} sort={sort} id={id} />
            {listings.length === 0 ? (
              <div className="px-4 py-10 text-center text-base-content/70">Nenhuma listagem para este jogo no momento.</div>
            ) : (
              <>
                <ListingsHeader />
                <ul className="divide-y divide-base-200">
                  {listings.map((item) => (
                    <ListingRow key={item.id} item={item} fallbackImage={(bg.image || PLACEHOLDER_IMG) as string} />
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>

        {/* ===== Abas (estáticas) ===== */}
        <section className="mt-6">
          <div role="tablist" className="tabs tabs-lifted">
            <a role="tab" className="tab tab-active" href="#reviews">Reviews</a>
            <a role="tab" className="tab" href="#forum">Fórum</a>
            <a role="tab" className="tab" href="#files">Arquivos</a>
            <a role="tab" className="tab" href="#images">Imagens</a>
          </div>
          <div id="reviews" className="rounded-b-2xl bg-base-100 ring-1 ring-base-200/70 p-4 mt-[-1px]">
            <p className="text-base-content/70 text-sm">(Placeholder) Área de reviews da comunidade.</p>
          </div>
          <div id="forum" className="rounded-2xl bg-base-100 ring-1 ring-base-200/70 p-4 mt-4">
            <p className="text-base-content/70 text-sm">(Placeholder) Tópicos de fórum.</p>
          </div>
          <div id="files" className="rounded-2xl bg-base-100 ring-1 ring-base-200/70 p-4 mt-4">
            <p className="text-base-content/70 text-sm">(Placeholder) Arquivos de usuários (regras, player aids...).</p>
          </div>
          <div id="images" className="rounded-2xl bg-base-100 ring-1 ring-base-200/70 p-4 mt-4">
            <p className="text-base-content/70 text-sm">(Placeholder) Galeria de imagens.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export const dynamic = "force-dynamic";
