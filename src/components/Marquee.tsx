export default function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-[var(--border)] bg-[var(--bg-soft)] py-4">
      <div className="marquee-track gap-12">
        {loop.map((item, i) => (
          <span key={i} className="text-sm font-medium text-[var(--muted)] whitespace-nowrap flex items-center gap-3">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
