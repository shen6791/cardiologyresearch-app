'use client';

import { useEffect, useRef, useState } from 'react';

export default function StickyStack({ children }: { children: React.ReactNode[] }) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const stickyTop = 112;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
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
  }, [enabled]);

  return (
    <div className="flex flex-col gap-5 md:gap-0">
      {(children as React.ReactNode[]).map((child, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className={enabled ? 'sticky transition-[filter] duration-100' : ''}
          style={enabled ? { top: `${stickyTop}px`, zIndex: i + 1, paddingBottom: '24px' } : undefined}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
