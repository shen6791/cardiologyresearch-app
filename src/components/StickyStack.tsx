'use client';

import { useEffect, useRef } from 'react';

export default function StickyStack({ children }: { children: React.ReactNode[] }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const stickyTop = 112;

  useEffect(() => {
    let raf = 0;
    function update() {
      const cards = refs.current.filter(Boolean) as HTMLDivElement[];
      for (let i = 0; i < cards.length - 1; i++) {
        const next = cards[i + 1];
        const nextTop = next.getBoundingClientRect().top;
        const distance = 260;
        const ratio = Math.min(Math.max(1 - (nextTop - stickyTop) / distance, 0), 1);
        cards[i].style.transform = `scale(${1 - 0.06 * ratio})`;
        cards[i].style.opacity = `${1 - 0.6 * ratio}`;
        cards[i].style.filter = `blur(${8 * ratio}px)`;
      }
      raf = requestAnimationFrame(update);
    }
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="flex flex-col">
      {(children as React.ReactNode[]).map((child, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className="sticky transition-[filter] duration-100"
          style={{ top: `${stickyTop}px`, zIndex: i + 1, paddingBottom: '24px' }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
