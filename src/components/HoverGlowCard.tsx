'use client';

import { useRef } from 'react';

export default function HoverGlowCard({ children, className = '', tilt = true }: { children: React.ReactNode; className?: string; tilt?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
    if (tilt) {
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = (0.5 - (y / rect.height)) * 8;
      el.style.setProperty('--tilt-x', `${rotateX}deg`);
      el.style.setProperty('--tilt-y', `${rotateY}deg`);
    }
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`hover-glow-card relative overflow-hidden ${tilt ? 'tilt-card' : ''} ${className}`}
    >
      <div className="hover-glow-layer pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300" />
      <div className="relative">{children}</div>
    </div>
  );
}
