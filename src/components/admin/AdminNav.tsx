'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
];

export default function AdminNav({ role, email }: { role: string; email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <aside className="w-64 flex-none border-r border-[#1e2740] p-6 flex flex-col gap-1 sticky top-0 h-screen">
      <div className="font-display font-semibold mb-1">Admin Panel</div>
      <div className="text-xs text-[#8a97b8] mb-6 truncate">{email} · <span className="text-[#4fe3c1]">{role === 'super_admin' ? 'Super Admin' : 'Admin'}</span></div>
      <nav className="flex flex-col gap-1 text-sm">
        {links.map((l) => (
          <Link key={l.href} href={l.href}
            className={`px-3 py-2 rounded-lg transition ${pathname === l.href ? 'bg-[#4fe3c1]/10 text-[#4fe3c1]' : 'text-[#8a97b8] hover:bg-white/5 hover:text-white'}`}>
            {l.label}
          </Link>
        ))}
        {role === 'super_admin' && (
          <Link href="/admin/users"
            className={`px-3 py-2 rounded-lg transition ${pathname === '/admin/users' ? 'bg-[#4fe3c1]/10 text-[#4fe3c1]' : 'text-[#8a97b8] hover:bg-white/5 hover:text-white'}`}>
            Admin Accounts
          </Link>
        )}
      </nav>
      <div className="mt-auto flex flex-col gap-2 pt-6">
        <a href="/" target="_blank" className="text-xs text-[#8a97b8] hover:text-white">View live site →</a>
        <button onClick={signOut} className="text-xs text-left text-[#ff6b6b] hover:underline">Sign out</button>
      </div>
    </aside>
  );
}
