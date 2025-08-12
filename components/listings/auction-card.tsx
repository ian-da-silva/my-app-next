// components/listings/auction-card.tsx
import Image from "next/image";
import Link from "next/link";

export type Auction = {
  id: number;
  title: string;
  currentBid: number;
  endsAt: string; // ISO
  bidsCount: number;
  imageUrl?: string;
};

function Countdown({ endsAt }: { endsAt: string }) {
  const d = new Date(endsAt).getTime() - Date.now();
  const secs = Math.max(0, Math.floor(d / 1000));
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  // DaisyUI countdown (client seria melhor p/ vivo; aqui é RSC snapshot)
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs opacity-70">Termina em</span>
      <span className="countdown font-mono text-sm">
        <span style={{ "--value": h } as any}></span>:
        <span style={{ "--value": m } as any}></span>:
        <span style={{ "--value": s } as any}></span>
      </span>
    </div>
  );
}

export function AuctionCard({ a }: { a: Auction }) {
  return (
    <div className="card bg-base-100 border border-base-200 hover:shadow-lg transition">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          alt={a.title}
          src={a.imageUrl ?? "/mock/listing.jpg"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="card-body gap-3">
        <Link href={`/app/auction/${a.id}`} className="card-title text-base hover:link">
          {a.title}
        </Link>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">Lance: R${a.currentBid.toLocaleString("pt-BR")}</div>
          <div className="badge badge-ghost">{a.bidsCount} lances</div>
        </div>
        <Countdown endsAt={a.endsAt} />
        <div className="card-actions justify-end">
          <Link href={`/app/auction/${a.id}`} className="btn btn-sm btn-secondary">Dar lance</Link>
        </div>
      </div>
    </div>
  );
}
