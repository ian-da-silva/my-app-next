// ---------------------------------
// components/landing/cta.tsx
// ---------------------------------
import Link from "next/link";
export function CTA() {
  return (
    <section className="bg-gradient-to-br from-primary to-secondary text-primary-content">
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold">Pronto para jogar?</h2>
          <p className="opacity-90">Cadastre-se gratuitamente e comece a comprar e vender agora mesmo.</p>
        </div>
        <div className="flex md:justify-end gap-3">
          <Link href="/signup" className="btn btn-neutral">Criar conta</Link>
          <Link href="/listings/new" className="btn btn-outline">Anunciar jogo</Link>
        </div>
      </div>
    </section>
  );
}