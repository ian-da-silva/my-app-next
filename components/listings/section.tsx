// components/listings/section.tsx
export function Section({
  title,
  subtitle,
  children,
  right,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode; // ex: “Ver tudo”
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          {subtitle ? <p className="text-sm text-base-content/70">{subtitle}</p> : null}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}