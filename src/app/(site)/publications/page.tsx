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
          <div className="text-sm text-[#6b6a63]">No publications yet.</div>
        ) : (
          <StickyStack>
            {pubs.map((p, i) => (
              <div key={p.id} className="relative border border-[#e9e7e0] rounded-2xl p-8 bg-white flex flex-col gap-3 overflow-hidden shadow-[0_20px_50px_-30px_rgba(0,0,0,0.15)]">
                <span className="font-display absolute -top-6 right-4 text-[110px] font-extrabold text-[#1a1a17]/[0.03] select-none leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="relative text-xs font-semibold tracking-wide uppercase text-[#1d4ed8]">{p.publisher}{p.year ? ` · ${p.year}` : ''}</div>
                <div className="relative font-medium text-[#1a1a17] leading-snug text-lg max-w-2xl">{p.title}</div>
                <div className="relative flex gap-5 text-sm font-medium pt-1">
                  {p.full_article_url && <PreviewButton label="Abstract" url={p.full_article_url} title={p.title} />}
                  {p.full_article_url && <a href={p.full_article_url} target="_blank" rel="noopener" className="text-[#1d4ed8] hover:underline">Full Article</a>}
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
