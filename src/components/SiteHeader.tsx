'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/publications', label: 'Publications' },
  { href: '/clinical-trials', label: 'Clinical Trials' },
  { href: '/presentations', label: 'Presentations' },
  { href: '/articles', label: 'Articles' },
  { href: '/videos', label: 'Videos' },
  { href: '/fellowship', label: 'Fellowship' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader({ doctorName }: { doctorName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#e6e3db]">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">{doctorName}</Link>
        <nav className="hidden md:flex gap-7 text-sm text-[#6b6a63]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`hover:text-[#0f5d52] transition ${pathname === l.href ? 'text-[#0f5d52] font-medium' : ''}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <button onClick={() => setOpen((v) => !v)} className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
          <span className="w-5 h-px bg-[#1c1c1a]" />
          <span className="w-5 h-px bg-[#1c1c1a]" />
        </button>
      </div>
      {open && (
        <nav className="md:hidden border-t border-[#e6e3db] flex flex-col">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={`px-6 py-3 text-sm border-b border-[#e6e3db] ${pathname === l.href ? 'text-[#0f5d52] font-medium' : 'text-[#6b6a63]'}`}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
