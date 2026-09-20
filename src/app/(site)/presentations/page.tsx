import { createClient } from '@/lib/supabase/server';
import type { Presentation } from '@/lib/types';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Presentations — Dr. Faslur Rahuman' };

export default async function PresentationsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('presentations').select('*, presentation_links(*)').order('sort_order');
  const items = (data ?? []) as Presentation[];

  return (
    <div>
      <PageHeader eyebrow="Research" title="Presentations & Posters" sub="Conference talks and poster presentations, local and international." />
      <div className="max-w-5xl mx-auto px-6 pb-24 flex flex-col divide-y divide-[#e6e3db] border border-[#e6e3db] rounded-lg">
        {items.map((p, i) => (
          <Reveal key={p.id} delay={Math.min(i * 60, 240)}>
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#f7f6f3] transition-colors">
              <div>
                <div className="font-medium text-[#1c1c1a]">{p.title}</div>
                {p.presented_at && <div className="text-sm text-[#6b6a63] mt-1">Presented at: {p.presented_at}</div>}
              </div>
              <div className="flex gap-4 flex-wrap flex-none">
                {p.presentation_links?.map((l) => (
                  <a key={l.id} href={l.url} target="_blank" rel="noopener" className="text-sm font-medium text-[#0f5d52] hover:underline">{l.label} →</a>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
        {items.length === 0 && <div className="p-6 text-sm text-[#6b6a63]">No presentations listed yet.</div>}
      </div>
    </div>
  );
}
