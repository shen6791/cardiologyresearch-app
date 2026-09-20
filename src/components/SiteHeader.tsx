'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const links = [
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
  const [scrolled, setScrolled] = useState(false);
  void doctorName;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) setScrolled(true);
  }, [open]);

  return (
    <div className="sticky top-0 z-40 flex justify-center px-3 pt-4">
      <header
        className={`w-full max-w-5xl border border-[#e9e7e0] transition-[background-color,backdrop-filter,box-shadow,border-radius] duration-300 ${
          open ? 'rounded-3xl' : 'rounded-full'
        } ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]' : 'bg-white/50 backdrop-blur-sm'
        }`}
      >
        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <Link href="/" className="flex items-center gap-2 pl-1 sm:pl-2 min-w-0 flex-1 lg:flex-none">
            <span className="w-8 h-8 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center font-display text-xs font-extrabold flex-none">CR</span>
            <span className="font-display font-bold tracking-tight text-[13px] sm:text-sm truncate">Ceylon Cardiology Research</span>
          </Link>
          <nav className="hidden lg:flex gap-5 text-sm text-[#6b6a63] flex-none">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={`nav-link hover:text-[#1d4ed8] transition-colors ${pathname === l.href ? 'active text-[#1d4ed8] font-medium' : ''}`}>
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" className="hidden md:inline-flex btn-lift items-center px-5 py-2 rounded-full border border-[#1a1a17]/15 text-sm font-medium hover:border-[#1d4ed8] transition-colors flex-none">
            Contact
          </Link>
          <button onClick={() => setOpen((v) => !v)} className="lg:hidden flex flex-col gap-1.5 p-2 mr-1 flex-none" aria-label="Toggle menu">
            <span className={`w-5 h-px bg-[#1a1a17] transition-transform duration-200 ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
            <span className={`w-5 h-px bg-[#1a1a17] transition-transform duration-200 ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </button>
        </div>
        <div className={`lg:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${open ? 'max-h-[70vh]' : 'max-h-0'}`}>
          <nav className="border-t border-[#e9e7e0] flex flex-col overflow-y-auto max-h-[70vh] px-2 pb-2">
            {[...links, { href: '/contact', label: 'Contact' }].map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`px-4 py-3 text-sm rounded-2xl transition-colors ${pathname === l.href ? 'text-[#1d4ed8] font-medium bg-[#e8eefd]' : 'text-[#6b6a63] hover:bg-[#f7f6f3]'}`}>
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
}
