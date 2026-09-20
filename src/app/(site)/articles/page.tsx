import { createClient } from '@/lib/supabase/server';
import type { Article } from '@/lib/types';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Articles — Dr. Faslur Rahuman' };

export default async function ArticlesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('articles').select('*').eq('published', true).order('sort_order');
  const articles = (data ?? []) as Article[];

  return (
    <div>
      <PageHeader eyebrow="Writing" title="Articles" />
      <div className="max-w-5xl mx-auto px-6 pb-24">
        {articles.length === 0 ? (
          <div className="border border-dashed border-[#d8d4c8] rounded-lg p-12 text-center text-sm text-[#6b6a63]">No articles published yet. Check back soon.</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {articles.map((a, i) => (
              <Reveal key={a.id} delay={i * 60}>
                <div className="card-lift border border-[#e6e3db] rounded-lg p-5 flex flex-col gap-3 h-full">
                  {a.cover_url && <img src={a.cover_url} alt="" className="rounded-md h-36 w-full object-cover" />}
                  <div className="font-medium">{a.title}</div>
                  {a.body && <p className="text-sm text-[#6b6a63] line-clamp-3">{a.body}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
