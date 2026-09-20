export default function PageHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="max-w-5xl mx-auto px-6 pt-16 pb-10">
      <div className="text-xs font-semibold tracking-widest uppercase text-[#0f5d52] mb-3">{eyebrow}</div>
      <h1 className="font-display text-3xl md:text-4xl font-semibold text-[#1c1c1a]">{title}</h1>
      {sub && <p className="text-[#6b6a63] mt-3 max-w-2xl">{sub}</p>}
    </div>
  );
}
