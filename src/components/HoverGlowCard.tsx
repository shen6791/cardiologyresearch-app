'use client';

import { useRef } from 'react';

export default function HoverGlowCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`hover-glow-card relative overflow-hidden ${className}`}
    >
      <div className="hover-glow-layer pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300" />
      <div className="relative">{children}</div>
    </div>
  );
}
