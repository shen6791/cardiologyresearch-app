import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createClient();
  const [pubs, trials, pres, articles, videos, fellowships] = await Promise.all([
    supabase.from('publications').select('id', { count: 'exact', head: true }),
    supabase.from('clinical_trials').select('id', { count: 'exact', head: true }),
    supabase.from('presentations').select('id', { count: 'exact', head: true }),
    supabase.from('articles').select('id', { count: 'exact', head: true }),
    supabase.from('videos').select('id', { count: 'exact', head: true }),
    supabase.from('fellowships').select('id', { count: 'exact', head: true }),
  ]);

  const cards = [
    { label: 'Publications', count: pubs.count ?? 0, href: '/admin/publications' },
    { label: 'Clinical Trials', count: trials.count ?? 0, href: '/admin/trials' },
    { label: 'Presentations', count: pres.count ?? 0, href: '/admin/presentations' },
    { label: 'Articles', count: articles.count ?? 0, href: '/admin/articles' },
    { label: 'Videos', count: videos.count ?? 0, href: '/admin/videos' },
    { label: 'Fellowship Entries', count: fellowships.count ?? 0, href: '/admin/fellowships' },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Manage every section of the public site from here.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="border border-[var(--border)] bg-[var(--bg)] rounded-2xl p-6 hover:border-[var(--accent)]/50 transition">
            <div className="text-3xl font-display font-semibold text-[var(--accent)]">{c.count}</div>
            <div className="text-sm text-[var(--muted)] mt-1">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
