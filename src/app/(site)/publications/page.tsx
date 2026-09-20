import { createClient } from '@/lib/supabase/server';
import type { Publication } from '@/lib/types';
import PageHeader from '@/components/PageHeader';
import PreviewButton from '@/components/PreviewButton';
import StickyStack from '@/components/StickyStack';

export const metadata = { title: 'Publications — Dr. Faslur Rahuman' };

export default async function PublicationsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('publications').select('*').order('sort_order');
  const pubs = (data ?? []) as Publication[];

  return (
    <div>
      <PageHeader eyebrow="Research" title="Publications" sub={`${pubs.length} peer-reviewed articles in cardiology and cardiovascular disease.`} />
      <div className="max-w-5xl mx-auto px-6 pb-24">
        {pubs.length === 0 ? (
          <div className="text-sm text-[var(--muted)]">No publications yet.</div>
        ) : (
          <StickyStack>
            {pubs.map((p, i) => (
              <div key={p.id} className="relative border border-[var(--border)] rounded-lg p-8 bg-[var(--bg)] flex flex-col gap-3 overflow-hidden">
                <span className="font-display absolute -top-6 right-4 text-[110px] font-extrabold text-[var(--text)]/[0.03] select-none leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative text-xs font-semibold tracking-wide uppercase text-[var(--accent)]">{p.publisher}{p.year ? ` · ${p.year}` : ''}</div>
                <div className="relative font-medium text-[var(--text)] leading-snug text-lg max-w-2xl">{p.title}</div>
                <div className="relative flex gap-5 text-sm font-medium pt-1">
                  {p.full_article_url && <PreviewButton label="Abstract" url={p.full_article_url} title={p.title} />}
                  {p.full_article_url && <a href={p.full_article_url} target="_blank" rel="noopener" className="text-[var(--accent)] hover:underline">Full Article</a>}
                  {p.pdf_url && <PreviewButton label="PDF" url={p.pdf_url} title={p.title} />}
                </div>
              </div>
            ))}
          </StickyStack>
        )}
      </div>
    </div>
  );
}
