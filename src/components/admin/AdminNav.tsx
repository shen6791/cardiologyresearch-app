'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/settings', label: 'Site Settings' },
  { href: '/admin/publications', label: 'Publications' },
  { href: '/admin/trials', label: 'Clinical Trials' },
  { href: '/admin/presentations', label: 'Presentations' },
  { href: '/admin/articles', label: 'Articles' },
  { href: '/admin/videos', label: 'Videos' },
  { href: '/admin/fellowships', label: 'Fellowship' },
  { href: '/admin/messages', label: 'Messages' },
];

export default function AdminNav({ role, email }: { role: string; email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  const navLinks = (
    <nav className="flex flex-col gap-1 text-sm">
      {links.map((l) => (
        <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
          className={`px-3 py-2 rounded-lg transition ${pathname === l.href ? 'bg-[#0f5d52]/10 text-[#0f5d52]' : 'text-[#6b6a63] hover:bg-[#f7f6f3] hover:text-[#1c1c1a]'}`}>
          {l.label}
        </Link>
      ))}
      {role === 'super_admin' && (
        <Link href="/admin/users" onClick={() => setOpen(false)}
          className={`px-3 py-2 rounded-lg transition ${pathname === '/admin/users' ? 'bg-[#0f5d52]/10 text-[#0f5d52]' : 'text-[#6b6a63] hover:bg-[#f7f6f3] hover:text-[#1c1c1a]'}`}>
          Admin Accounts
        </Link>
      )}
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-[#e6e3db] flex items-center justify-between px-5 py-4">
        <div className="font-display font-semibold">Admin Panel</div>
        <button onClick={() => setOpen((v) => !v)} className="flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
          <span className="w-5 h-px bg-[#1c1c1a]" />
          <span className="w-5 h-px bg-[#1c1c1a]" />
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-b border-[#e6e3db] p-4">
          {navLinks}
          <button onClick={signOut} className="text-xs text-left text-[#ff6b6b] hover:underline mt-4">Sign out</button>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-none border-r border-[#e6e3db] p-6 flex-col gap-1 sticky top-0 h-screen">
        <div className="font-display font-semibold mb-1">Admin Panel</div>
        <div className="text-xs text-[#6b6a63] mb-6 truncate">{email} · <span className="text-[#0f5d52]">{role === 'super_admin' ? 'Super Admin' : 'Admin'}</span></div>
        {navLinks}
        <div className="mt-auto flex flex-col gap-2 pt-6">
          <a href="/" target="_blank" className="text-xs text-[#6b6a63] hover:text-[#1c1c1a]">View live site →</a>
          <button onClick={signOut} className="text-xs text-left text-[#ff6b6b] hover:underline">Sign out</button>
        </div>
      </aside>
    </>
  );
}
