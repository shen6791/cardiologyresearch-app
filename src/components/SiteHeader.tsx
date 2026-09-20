'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/publications', label: 'Publications' },
  { href: '/abstracts', label: 'Abstracts' },
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
  void doctorName;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#e6e3db]">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <Link href="/" className="font-display text-base sm:text-lg font-semibold tracking-tight">Ceylon Cardiology Research</Link>
        <nav className="hidden lg:flex gap-6 text-sm text-[#6b6a63]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-link hover:text-[#0f5d52] transition-colors ${pathname === l.href ? 'active text-[#0f5d52] font-medium' : ''}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <button onClick={() => setOpen((v) => !v)} className="lg:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
          <span className={`w-5 h-px bg-[#1c1c1a] transition-transform duration-200 ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
          <span className={`w-5 h-px bg-[#1c1c1a] transition-transform duration-200 ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
        </button>
      </div>
      <div className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${open ? 'max-h-[70vh]' : 'max-h-0'}`}>
        <nav className="border-t border-[#e6e3db] flex flex-col overflow-y-auto max-h-[70vh]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={`px-6 py-3 text-sm border-b border-[#e6e3db] transition-colors ${pathname === l.href ? 'text-[#0f5d52] font-medium' : 'text-[#6b6a63]'}`}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
