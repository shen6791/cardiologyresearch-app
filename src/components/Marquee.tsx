export default function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-[#e9e7e0] bg-[#f7f6f3] py-4">
      <div className="marquee-track gap-12">
        {loop.map((item, i) => (
          <span key={i} className="text-sm font-medium text-[#6b6a63] whitespace-nowrap flex items-center gap-3">
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8]/40" />
          </span>
        ))}
      </div>
    </div>
  );
}
