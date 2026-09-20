import { createClient } from '@/lib/supabase/server';
import type { Publication } from '@/lib/types';
import PageHeader from '@/components/PageHeader';
import PreviewButton from '@/components/PreviewButton';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Abstracts — Dr. Faslur Rahuman' };

export default async function AbstractsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('publications').select('*').order('sort_order');
  const pubs = (data ?? []) as Publication[];

  return (
    <div>
      <PageHeader eyebrow="Research" title="Abstracts" sub={`${pubs.length} abstracts from published work.`} />
      <div className="max-w-5xl mx-auto px-6 pb-24 flex flex-col divide-y divide-[#e6e3db] border border-[#e6e3db] rounded-lg">
        {pubs.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i * 60, 240)}>
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#f7f6f3] transition-colors">
              <div>
                <div className="text-xs font-semibold tracking-wide uppercase text-[#0f5d52]">{p.publisher}{p.year ? ` · ${p.year}` : ''}</div>
                <div className="font-medium text-[#1c1c1a] mt-1 max-w-xl">{p.title}</div>
              </div>
              {p.full_article_url && (
                <div className="flex-none">
                  <PreviewButton label="Abstract" url={p.full_article_url} title={p.title} />
                </div>
              )}
            </div>
          </Reveal>
        ))}
        {pubs.length === 0 && <div className="p-6 text-sm text-[#6b6a63]">No abstracts yet.</div>}
      </div>
    </div>
  );
}
