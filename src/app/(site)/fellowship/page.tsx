import { createClient } from '@/lib/supabase/server';
import type { Fellowship } from '@/lib/types';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Fellowship — Dr. Faslur Rahuman' };

export default async function FellowshipPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('fellowships').select('*').order('sort_order');
  const items = (data ?? []) as Fellowship[];

  return (
    <div>
      <PageHeader eyebrow="Credentials" title="Fellowship" />
      <div className="max-w-5xl mx-auto px-6 pb-24 flex flex-col gap-4">
        {items.map((f, i) => (
          <Reveal key={f.id} delay={i * 60}>
            <div className="card-lift border border-[#e6e3db] rounded-2xl p-7 flex items-center gap-6 flex-wrap">
              <div className="w-14 h-14 rounded-2xl bg-[#1d4ed8] flex items-center justify-center flex-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8"><path d="M12 2l2.6 5.9L21 8.7l-4.5 4.2 1.2 6.4L12 16.3 6.3 19.3l1.2-6.4L3 8.7l6.4-.8L12 2z" strokeLinejoin="round"/></svg>
              </div>
              <div className="flex-1 min-w-56">
                <div className="font-display text-lg font-semibold">{f.title}</div>
                {f.subtitle && <div className="text-sm text-[#6b6a63] mt-1">{f.subtitle}</div>}
              </div>
              {f.pdf_url && <a href={f.pdf_url} target="_blank" rel="noopener" className="btn-lift px-5 py-2.5 rounded-md border border-[#d8d4c8] text-sm font-medium hover:border-[#1d4ed8]">Learn More</a>}
            </div>
          </Reveal>
        ))}
        {items.length === 0 && <div className="text-sm text-[#6b6a63]">No fellowship entries yet.</div>}
      </div>
    </div>
  );
}
