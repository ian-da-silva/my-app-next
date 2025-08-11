// ---------------------------------
// components/landing/testimonials.tsx
// ---------------------------------
export function Testimonials() {
  const items = [
    { n: "Marina", c: "Porto Alegre", t: "Vendi minha coleção em 2 semanas. Processo todo dentro da plataforma, super prático." },
    { n: "Rafael", c: "Curitiba", t: "Arrematei um jogo raro por um preço ótimo. A proteção ao comprador me deu confiança." },
    { n: "Thiago", c: "São Paulo", t: "Os filtros por mecânica e tempo de jogo são excelentes pra achar algo pro meu grupo." },
  ];
  return (
    <section id="depoimentos" className="container mx-auto px-4 py-16 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold">Quem já usa o MercadoBG</h2>
        <p className="opacity-80">Feedback real de jogadores pelo Brasil.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <figure key={i} className="card bg-base-100 shadow">
            <div className="card-body">
              <blockquote className="italic">“{it.t}”</blockquote>
              <figcaption className="pt-2 opacity-80">{it.n} — {it.c}</figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}