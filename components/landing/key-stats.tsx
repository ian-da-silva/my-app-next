// ---------------------------------
// components/landing/key-stats.tsx
// ---------------------------------
export type Stat = { label: string; value: string };
export function KeyStats({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-base-200">
      <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="stat bg-base-100 rounded-2xl shadow-sm">
            <div className="stat-title">{s.label}</div>
            <div className="stat-value text-primary">{s.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}