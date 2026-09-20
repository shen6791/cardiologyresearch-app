'use client';

import { useEffect, useRef, useState } from 'react';

export default function AnimatedStat({ value, label }: { value: string; label: string }) {
  const numMatch = value.match(/^(\d+)(\D*)$/);
  const target = numMatch ? parseInt(numMatch[1], 10) : null;
  const suffix = numMatch ? numMatch[2] : '';
  const [display, setDisplay] = useState(target === null ? value : '0');
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done.current) {
          done.current = true;
          const duration = 800;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setDisplay(String(Math.round(progress * target)));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="p-8 text-center border-r border-[#e6e3db] last:border-r-0">
      <div className="font-display text-2xl font-semibold text-[#0f5d52] tabular-nums">{display}{suffix}</div>
      <div className="text-xs text-[#6b6a63] mt-2">{label}</div>
    </div>
  );
}
