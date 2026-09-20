'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/publications', label: 'Publications' },
  { href: '/abstracts', label: 'Abstracts' },
  { href: '/clinical-trials', label: 'Clinical Trials' },
  { href: '/presentations', label: 'Presentations' },
  { href: '/articles', label: 'Articles' },
  { href: '/videos', label: 'Videos' },
  { href: '/fellowship', label: 'Fellowship' },
];

export default function SiteHeader({ doctorName }: { doctorName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 bg-[var(--bg)]/90 backdrop-blur border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5">
        <Link href="/" className="flex items-center gap-2.5 min-w-0">
          <span className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-display text-xs font-extrabold flex-none">CR</span>
          <span className="font-display font-bold tracking-tight text-[13px] sm:text-sm truncate">{doctorName}</span>
        </Link>

        <nav className="hidden lg:flex gap-5 text-sm text-[var(--muted)] flex-none">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={`nav-link hover:text-[var(--accent)] transition-colors ${pathname === l.href ? 'active text-[var(--accent)] font-medium' : ''}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 flex-none">
          <ThemeToggle className="hidden sm:flex" />
          <Link href="/contact" className="hidden md:inline-flex items-center px-4 py-2 border-b border-transparent hover:border-[var(--accent)] text-sm font-medium text-[var(--text)] transition-colors">
            Contact
          </Link>
          <button onClick={() => setOpen((v) => !v)} className="lg:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
            <span className={`w-5 h-px bg-[var(--text)] transition-transform duration-200 ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
            <span className={`w-5 h-px bg-[var(--text)] transition-transform duration-200 ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      <div className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${open ? 'max-h-[70vh]' : 'max-h-0'}`}>
        <nav className="border-t border-[var(--border)] flex flex-col overflow-y-auto max-h-[70vh] px-2 pb-2">
          {[...links, { href: '/contact', label: 'Contact' }].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={`px-4 py-3 text-sm rounded-lg transition-colors ${pathname === l.href ? 'text-[var(--accent)] font-medium bg-[var(--accent-soft)]' : 'text-[var(--muted)] hover:bg-[var(--bg-soft)]'}`}>
              {l.label}
            </Link>
          ))}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-[var(--muted)]">Appearance</span>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </div>
  );
}
