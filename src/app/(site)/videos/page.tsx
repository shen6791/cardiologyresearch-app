import { createClient } from '@/lib/supabase/server';
import type { Video } from '@/lib/types';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Videos — Dr. Faslur Rahuman' };

export default async function VideosPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('videos').select('*').eq('published', true).order('sort_order');
  const videos = (data ?? []) as Video[];

  return (
    <div>
      <PageHeader eyebrow="Media" title="Videos" />
      <div className="max-w-5xl mx-auto px-6 pb-24">
        {videos.length === 0 ? (
          <div className="border border-dashed border-[#d8d4c8] rounded-2xl p-12 text-center text-sm text-[#6b6a63]">No videos published yet. Check back soon.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {videos.map((v, i) => (
              <Reveal key={v.id} delay={i * 60}>
                <div className="card-lift border border-[#e6e3db] rounded-2xl overflow-hidden">
                  <div className="aspect-video bg-black">
                    <iframe src={v.video_url} className="w-full h-full" allowFullScreen title={v.title} />
                  </div>
                  <div className="p-4 font-medium">{v.title}</div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
