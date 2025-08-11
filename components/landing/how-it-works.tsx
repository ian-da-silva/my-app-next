// ---------------------------------
// components/landing/how-it-works.tsx
// ---------------------------------
export function HowItWorks() {
  const steps = [
    { n: 1, t: "Crie sua conta", d: "Cadastre-se e verifique seu e-mail para comprar e vender com segurança." },
    { n: 2, t: "Publique ou dê lances", d: "Anuncie em minutos ou participe de leilões em tempo real." },
    { n: 3, t: "Envie com etiqueta", d: "Gere etiqueta de frete e acompanhe tudo pela plataforma." },
    { n: 4, t: "Pagamento protegido", d: "Liberação do valor apenas após confirmação do recebimento." },
  ];
  return (
    <section id="como-funciona" className="bg-base-200">
      <div className="container mx-auto px-4 py-16 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">Como funciona</h2>
          <p className="opacity-80">Simples para iniciantes, completo para colecionadores.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-10"><span className="text-sm">{s.n}</span></div>
                </div>
                <h3 className="card-title pt-2">{s.t}</h3>
                <p className="opacity-80">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
