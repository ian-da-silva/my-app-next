// app/app/account/page.tsx
"use client";

import Link from "next/link";

/** MOCKS */
const userMock = {
  name: "Ian Segobio",
  email: "ian@example.com",
  avatarUrl: "/mock/avatar-01.png",
};
const reputationMock = {
  score: 4.8,
  total: 64,
  badges: ["Confiável", "Entrega Rápida", "Bem Avaliado"],
};

/** Ícones */
function IconBag() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m4-9l2 9"/>
    </svg>
  );
}
function IconStore() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v2H3zM5 7h14v13H5z"/>
    </svg>
  );
}
function IconGrid() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 8v-8h8v8h-8z"/>
    </svg>
  );
}
function IconHammer() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 21l9-9 4 4-9 9H2zM20.7 7.3l-4-4-3.3 3.3 4 4 3.3-3.3z"/>
    </svg>
  );
}
function IconUser() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm7 9a7 7 0 00-14 0h14z"/>
    </svg>
  );
}
function IconMap() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
    </svg>
  );
}
function IconBank() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zm-9 8v7h18v-7l-9 4.5L3 10z"/>
    </svg>
  );
}
function IconGear() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm9.4 4a7.46 7.46 0 01-.14 1.4l2.06 1.6-2 3.46-2.44-1a7.5 7.5 0 01-2.42 1.4l-.36 2.6H9.9l-.36-2.6a7.5 7.5 0 01-2.42-1.4l-2.44 1-2-3.46 2.06-1.6A7.46 7.46 0 014.6 12c0-.48.05-.96.14-1.4L2.68 9l2-3.46 2.44 1A7.5 7.5 0 019.54 5.1l.36-2.6h4.2l.36 2.6a7.5 7.5 0 012.42 1.4l2.44-1 2 3.46-2.06 1.6c.09.44.14.92.14 1.4z"/>
    </svg>
  );
}

/** Cards do topo com visuais */
function NameCard() {
  return (
    <div className="card border border-base-200 overflow-hidden">
      {/* faixa superior com gradiente + pattern */}
      <div className="relative h-20 bg-gradient-to-r from-primary/90 via-secondary/80 to-accent/80">
        {/* pattern de bolinhas */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "12px 12px",
            color: "white",
          }}
        />
      </div>

      <div className="card-body pt-0">
        <div className="-mt-10 flex items-center gap-4">
          <div className="avatar">
            <div className="w-20 rounded-full ring ring-base-100 ring-offset-2 ring-offset-base-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={userMock.avatarUrl} alt={userMock.name} />
            </div>
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold truncate">{userMock.name}</h1>
            <p className="text-sm opacity-70 truncate">{userMock.email}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <div className="badge badge-success badge-sm">Verificado</div>
              <div className="badge badge-ghost badge-sm">Membro desde 2023</div>
            </div>
          </div>
          <div className="ms-auto">
            <Link href="/app/profile" className="btn btn-sm">Editar perfil</Link>
          </div>
        </div>

        {/* Atalhos rápidos */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/app/sell/new" className="btn btn-primary btn-sm">+ Novo anúncio</Link>
          <Link href="/app/auctions/new" className="btn btn-secondary btn-sm"><IconHammer /> Criar leilão</Link>
          <Link href="/app/bank" className="btn btn-ghost btn-sm"><IconBank /> Conta para receber</Link>
        </div>
      </div>
    </div>
  );
}

function ReputationCard() {
  const scorePct = Math.round((reputationMock.score / 5) * 100); // para radial-progress
  return (
    <div className="card bg-base-100 border border-base-200">
      <div className="card-body">
        <h3 className="card-title">Reputação</h3>

        <div className="flex items-center gap-6">
          {/* radial-progress */}
          <div className="radial-progress text-primary" style={{ "--value": scorePct, "--size": "4.5rem" } as any}>
            {reputationMock.score.toFixed(1)}
          </div>

          <div className="space-y-2">
            {/* estrelas DaisyUI */}
            <div className="rating rating-sm">
              {[1,2,3,4,5].map((i)=>(
                <input
                  key={i}
                  type="radio"
                  name="rating-rc"
                  className="mask mask-star-2 bg-primary"
                  readOnly
                  checked={i === Math.round(reputationMock.score)}
                />
              ))}
            </div>
            <div className="text-sm opacity-70">{reputationMock.total} avaliações</div>
            <div className="flex flex-wrap gap-2">
              {reputationMock.badges.map((b)=>(
                <div key={b} className="badge badge-ghost">{b}</div>
              ))}
            </div>
          </div>

          <div className="ms-auto">
            <Link href="/app/reviews" className="btn btn-outline btn-sm">Ver avaliações</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Card-link com faixa colorida + hover “vivo” */
function LinkCard({
  href, title, desc, chips, color = "from-primary/15 to-primary/5", icon,
}: {
  href: string; title: string; desc?: string; chips?: string[]; color?: string; icon?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group card border border-base-200 hover:shadow-xl transition will-change-transform hover:-translate-y-0.5"
    >
      {/* faixa superior suave */}
      <div className={`h-1 bg-gradient-to-r ${color}`} />
      <div className="card-body">
        <div className="flex items-start gap-3">
          <div className="btn btn-ghost btn-circle pointer-events-none group-hover:scale-110 transition">
            {icon ?? <IconGrid />}
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold">{title}</h4>
            {desc ? <p className="text-sm opacity-70">{desc}</p> : null}
            {chips?.length ? (
              <div className="flex flex-wrap gap-2 pt-2">
                {chips.map((c) => <div key={c} className="badge badge-ghost">{c}</div>)}
              </div>
            ) : null}
          </div>
          <div className="ms-auto opacity-60 group-hover:opacity-100 transition">
            {/* chevron */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707A1 1 0 018.707 5.293l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/></svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

/** Página */
export default function AccountOverviewPage() {
  return (
    <div className="space-y-8">
      {/* TOPO: duas colunas com visual mais rico */}
      <div className="grid lg:grid-cols-2 gap-6">
        <NameCard />
        <ReputationCard />
      </div>

      <div className="divider">Gerenciamento</div>

      {/* LINKS: duas colunas, cards com faixas coloridas */}
      <div className="grid lg:grid-cols-2 gap-6">
        <LinkCard
          href="/app/orders"
          title="Compras"
          desc="Acompanhe pedidos, pagamentos e entregas."
          chips={["em andamento", "histórico"]}
          color="from-primary/20 to-primary/5"
          icon={<IconBag />}
        />
        <LinkCard
          href="/app/sales"
          title="Vendas"
          desc="Gerencie anúncios, pagamentos e envio."
          chips={["rascunhos", "publicados"]}
          color="from-secondary/20 to-secondary/5"
          icon={<IconStore />}
        />
        <LinkCard
          href="/app/products"
          title="Produtos cadastrados"
          desc="Catálogo de itens que você adicionou."
          chips={["base game", "expansões"]}
          color="from-accent/20 to-accent/5"
          icon={<IconGrid />}
        />
        <LinkCard
          href="/app/auctions"
          title="Leilões"
          desc="Seus leilões, com lance e seguidos."
          chips={["meus", "lance ativo", "seguindo"]}
          color="from-warning/20 to-warning/5"
          icon={<IconHammer />}
        />
        <LinkCard
          href="/app/profile"
          title="Dados de cadastro"
          desc="Seu nome, e-mail, telefone e documento."
          color="from-info/20 to-info/5"
          icon={<IconUser />}
        />
        <LinkCard
          href="/app/address"
          title="Endereço"
          desc="Onde você recebe e de onde envia."
          color="from-success/20 to-success/5"
          icon={<IconMap />}
        />
        <LinkCard
          href="/app/bank"
          title="Contas bancárias"
          desc="Onde você recebe pagamentos."
          color="from-neutral/20 to-neutral/5"
          icon={<IconBank />}
        />
        <LinkCard
          href="/app/settings"
          title="Preferências & Notificações"
          desc="Alertas, privacidade e integrações."
          color="from-error/20 to-error/5"
          icon={<IconGear />}
        />
      </div>
    </div>
  );
}
