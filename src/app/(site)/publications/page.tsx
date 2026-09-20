import { createClient } from '@/lib/supabase/server';
import type { Publication } from '@/lib/types';
import PageHeader from '@/components/PageHeader';
import PreviewButton from '@/components/PreviewButton';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Publications — Dr. Faslur Rahuman' };

export default async function PublicationsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('publications').select('*').order('sort_order');
  const pubs = (data ?? []) as Publication[];

  return (
    <div>
      <PageHeader eyebrow="Research" title="Publications" sub={`${pubs.length} peer-reviewed articles in cardiology and cardiovascular disease.`} />
      <div className="max-w-5xl mx-auto px-6 pb-24 flex flex-col gap-4">
        {pubs.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i * 60, 240)}>
            <div className="card-lift border border-[#e6e3db] rounded-lg p-6 flex flex-col gap-3">
              <div className="text-xs font-semibold tracking-wide uppercase text-[#0f5d52]">{p.publisher}{p.year ? ` · ${p.year}` : ''}</div>
              <div className="font-medium text-[#1c1c1a] leading-snug">{p.title}</div>
              <div className="flex gap-5 text-sm font-medium">
                {p.full_article_url && <PreviewButton label="Abstract" url={p.full_article_url} title={p.title} />}
                {p.full_article_url && <a href={p.full_article_url} target="_blank" rel="noopener" className="text-[#0f5d52] hover:underline">Full Article</a>}
                {p.pdf_url && <PreviewButton label="PDF" url={p.pdf_url} title={p.title} />}
              </div>
            </div>
          </Reveal>
        ))}
        {pubs.length === 0 && <div className="text-sm text-[#6b6a63]">No publications yet.</div>}
      </div>
    </div>
  );
}
