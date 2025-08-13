// app/app/account/page.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

/* charts (same as before) */
function Bars({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const h = 80, w = 220, gap = 4;
  const bw = Math.floor((w - gap * (data.length - 1)) / data.length);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24">
      {data.map((v, i) => {
        const bh = Math.round((v / max) * (h - 2));
        const x = i * (bw + gap);
        const y = h - bh;
        return <rect key={i} x={x} y={y} width={bw} height={bh} rx="2" className="fill-primary/80" />;
      })}
    </svg>
  );
}
function Line({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const h = 80, w = 220;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24">
      <polyline fill="none" stroke="currentColor" strokeWidth="2" className="text-secondary" points={points} />
    </svg>
  );
}
function Donut({ values }: { values: { label: string; value: number }[] }) {
  const total = values.reduce((a, b) => a + b.value, 0) || 1;
  let acc = 0; const r = 30; const c = 2 * Math.PI * r;
  const palette = ["text-primary","text-secondary","text-accent","text-warning","text-info","text-success"];
  return (
    <div className="flex items-center justify-center gap-4">
      <svg viewBox="0 0 80 80" className="w-24 h-24 -rotate-90">
        <circle cx="40" cy="40" r={r} className="fill-none stroke-base-300" strokeWidth="10" />
        {values.map((v, i) => {
          const frac = v.value / total, dash = c * frac, dashArray = `${dash} ${c - dash}`;
          const el = (
            <circle key={i} cx="40" cy="40" r={r} strokeWidth="10" fill="none"
              className={`stroke-current ${palette[i % palette.length]}`}
              strokeDasharray={dashArray} strokeDashoffset={-acc} />
          );
          acc += dash; return el;
        })}
      </svg>
      <ul className="text-sm list-none pl-0">
        {values.map((v, i) => (
          <li key={v.label} className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${["bg-primary","bg-secondary","bg-accent","bg-warning","bg-info","bg-success"][i % 6]}`} />
            {v.label}: <span className="font-semibold">{v.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AccountDashboard() {
  const kpis = {
    sellsMonth: 12, sellsTotal: 143,
    purchasesMonth: 5, purchasesTotal: 52,
    bankAccounts: 2,
    unanswered: 3,
    productsListed: 28,
    reimbursements: 1,
    auctionsCreated: 4, auctionsFollowed: 9, myBids: 6,
    withdrawable: 2190.45, pending: 540.0,
  };
  const [hideMoney, setHideMoney] = useState(true);
  const barsData = useMemo(() => [6,3,7,4,8,9,5,10,7,8,12,9], []);
  const lineSales = useMemo(() => [12,9,14,10,16,18,13,17,19,15,20,22], []);
  const lineVisits = useMemo(() => [30,28,34,29,40,37,42,38,46,44,48,45], []);
  const donutSources = useMemo(() => ([
    { label: "Direto", value: 44 },
    { label: "Busca", value: 26 },
    { label: "Social", value: 18 },
    { label: "E-mail", value: 12 },
  ]), []);
  const fmt = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const Money = ({ value }: { value: number }) => <span>{hideMoney ? "••••" : fmt(value)}</span>;

  // common class so all small tiles reserve room for a subtitle line
  const STAT_CLASS = "stat bg-base-100 rounded-2xl shadow-sm border border-base-300 min-h-[120px]";

  return (
    <div className="space-y-6">
      {/* KPI Row: Vendas / Compras are split cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Vendas (split, no inner borders) */}
        {/* Leilões (same split layout as Vendas/Compras; no inner borders; vertical dividers) */}
        <Link href="/app/auctions" className="no-underline text-inherit">
          <div className="stat bg-base-100 rounded-2xl shadow-sm border border-base-300 min-h-[120px]">
            <div className="stat-title">Leilões</div>

            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="text-center">
                <div className="text-xs opacity-70">Criados</div>
                <div className="text-2xl font-semibold text-primary">{kpis.auctionsCreated}</div>
              </div>

              {/* vertical divider (robust across DaisyUI versions) */}
              <span className="w-px h-10 bg-base-300 rounded" />

              <div className="text-center">
                <div className="text-xs opacity-70">Seguindo</div>
                <div className="text-2xl font-semibold text-primary">{kpis.auctionsFollowed}</div>
              </div>

              <span className="w-px h-10 bg-base-300 rounded" />

              <div className="text-center">
                <div className="text-xs opacity-70">Meus lances</div>
                <div className="text-2xl font-semibold text-primary">{kpis.myBids}</div>
              </div>
            </div>
          </div>
        </Link>

        {/* Compras (split, no inner borders) */}
        <Link href="/app/orders" className="no-underline text-inherit">
          <div className={STAT_CLASS}>
            <div className="stat-title">Compras</div>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="text-xs opacity-70">Último mês</div>
                <div className="text-2xl font-semibold text-primary">{kpis.purchasesMonth}</div>
              </div>

              {/* vertical divider at center */}
              <div className="divider divider-vertical mx-2" />

              <div className="text-center">
                <div className="text-xs opacity-70">Total</div>
                <div className="text-2xl font-semibold text-primary">{kpis.purchasesTotal}</div>
              </div>
            </div>
          </div>
        </Link>

        {/* Contas bancárias (with Principal:) */}
        <Link href="/app/bank" className="no-underline text-inherit">
          <div className={STAT_CLASS}>
            <div className="stat-title">Contas bancárias</div>
            <div className="stat-value text-primary">{kpis.bankAccounts}</div>
            <div className="stat-desc">
              <span className="opacity-70">Principal:</span> Nubank • ••••1234
            </div>
          </div>
        </Link>

        {/* Perguntas (reserve subtitle line via min-h) */}
        <Link href="/app/questions" className="no-underline text-inherit">
          <div className={STAT_CLASS}>
            <div className="stat-title">Perguntas sem resposta</div>
            <div className="stat-value text-primary">{kpis.unanswered}</div>
            <div className="stat-desc">&nbsp;</div>
          </div>
        </Link>
      </div>

      {/* Second row (unchanged structure except consistent min height) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/app/products" className="no-underline text-inherit">
          <div className={STAT_CLASS}>
            <div className="stat-title">Produtos listados</div>
            <div className="stat-value text-primary">{kpis.productsListed}</div>
            <div className="stat-desc">&nbsp;</div>
          </div>
        </Link>

        <Link href="/app/reimbursements" className="no-underline text-inherit">
          <div className={STAT_CLASS}>
            <div className="stat-title">Reembolsos</div>
            <div className="stat-value text-primary">{kpis.reimbursements}</div>
            <div className="stat-desc">&nbsp;</div>
          </div>
        </Link>

        <Link href="/app/auctions" className="no-underline text-inherit">
          <div className={STAT_CLASS}>
            <div className="stat-title">Leilões</div>
            <div className="stat-desc">
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="p-2 rounded-box border border-base-200 text-center">
                  <div className="text-xs opacity-70">Criados</div>
                  <div className="text-lg font-semibold">{kpis.auctionsCreated}</div>
                </div>
                <div className="p-2 rounded-box border border-base-200 text-center">
                  <div className="text-xs opacity-70">Seguindo</div>
                  <div className="text-lg font-semibold">{kpis.auctionsFollowed}</div>
                </div>
                <div className="p-2 rounded-box border border-base-200 text-center">
                  <div className="text-xs opacity-70">Meus lances</div>
                  <div className="text-lg font-semibold">{kpis.myBids}</div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Finance + donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card bg-base-100 rounded-2xl shadow-sm border border-base-300 lg:col-span-2">
          <div className="card-body items-center text-center">
            <h3 className="card-title justify-center font-semibold">Saldo para saque</h3>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-center justify-items-center">
              <div>
                <div className="text-4xl font-bold"><Money value={kpis.withdrawable} /></div>
                <button onClick={() => setHideMoney(v => !v)} className="btn btn-ghost btn-xs mt-2">
                  {hideMoney ? "Mostrar" : "Ocultar"}
                </button>
              </div>
              <div className="divider md:divider-horizontal my-0" />
              <div>
                <div className="opacity-70 text-sm">A liberar (vendas em andamento)</div>
                <div className="text-2xl font-semibold"><Money value={kpis.pending} /></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 rounded-2xl shadow-sm border border-base-300">
          <div className="card-body items-center text-center">
            <h3 className="card-title justify-center font-semibold">Origem das visitas</h3>
            <Donut values={donutSources} />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="card bg-base-100 rounded-2xl shadow-sm border border-base-300 xl:col-span-2">
          <div className="card-body items-center text-center">
            <h3 className="card-title justify-center font-semibold">Receita (12 períodos)</h3>
            <Bars data={barsData} />
          </div>
        </div>

        <div className="card bg-base-100 rounded-2xl shadow-sm border border-base-300">
          <div className="card-body items-center text-center">
            <h3 className="card-title justify-center font-semibold">Downloads do app</h3>
            <Line data={lineSales} />
            <div className="text-sm opacity-70">variação mensal</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="card bg-base-100 rounded-2xl shadow-sm border border-base-300">
          <div className="card-body items-center text-center">
            <h3 className="card-title justify-center font-semibold">Visitas únicas</h3>
            <Line data={lineVisits} />
          </div>
        </div>

        <div className="card bg-base-100 rounded-2xl shadow-sm border border-base-300">
          <div className="card-body items-center text-center">
            <h3 className="card-title justify-center font-semibold">Atalhos</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/app/sell/new" className="btn btn-primary btn-sm">+ Novo anúncio</Link>
              <Link href="/app/auctions/new" className="btn btn-secondary btn-sm">Criar leilão</Link>
              <Link href="/app/bank" className="btn btn-outline btn-sm">Conta para receber</Link>
              <Link href="/app/questions" className="btn btn-ghost btn-sm">Responder perguntas</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}