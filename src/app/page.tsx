import { createClient } from '@/lib/supabase/server';
import type { SiteSettings, Publication, ClinicalTrial, Presentation, Fellowship, Article, Video } from '@/lib/types';
import PdfModalProvider from '@/components/PdfModalProvider';
import PreviewButton from '@/components/PreviewButton';

export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();

  const [{ data: settings }, { data: publications }, { data: trials }, { data: presentations }, { data: fellowships }, { data: articles }, { data: videos }] =
    await Promise.all([
      supabase.from('site_settings').select('*').eq('id', 1).single(),
      supabase.from('publications').select('*').order('sort_order'),
      supabase.from('clinical_trials').select('*').order('sort_order'),
      supabase.from('presentations').select('*, presentation_links(*)').order('sort_order'),
      supabase.from('fellowships').select('*').order('sort_order'),
      supabase.from('articles').select('*').eq('published', true).order('sort_order'),
      supabase.from('videos').select('*').eq('published', true).order('sort_order'),
    ]);

  const s = settings as SiteSettings;
  const pubs = (publications ?? []) as Publication[];
  const trialList = (trials ?? []) as ClinicalTrial[];
  const presList = (presentations ?? []) as Presentation[];
  const fellowshipList = (fellowships ?? []) as Fellowship[];
  const articleList = (articles ?? []) as Article[];
  const videoList = (videos ?? []) as Video[];

  return (
    <PdfModalProvider>
      <div className="min-h-screen grid-glow">
        {/* NAV */}
        <header className="sticky top-0 z-40 glass">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
            <a href="#top" className="font-display font-semibold tracking-tight text-lg">{s.doctor_name}</a>
            <nav className="hidden md:flex gap-7 text-sm text-[#8a97b8]">
              <a href="#publications" className="hover:text-white transition">Publications</a>
              <a href="#trials" className="hover:text-white transition">Trials</a>
              <a href="#presentations" className="hover:text-white transition">Presentations</a>
              <a href="#articles" className="hover:text-white transition">Articles</a>
              <a href="#videos" className="hover:text-white transition">Videos</a>
              <a href="#fellowship" className="hover:text-white transition">Fellowship</a>
              <a href="#contact" className="hover:text-white transition">Contact</a>
            </nav>
          </div>
        </header>

        <div id="top" />

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#4fe3c1]">
              <span className="w-6 h-px bg-[#4fe3c1]" /> Cardiology Research
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight glow-text">
              {s.tagline}
            </h1>
            <p className="text-[#8a97b8] text-lg leading-relaxed max-w-xl">{s.bio_intro}</p>
            <div className="flex gap-4 flex-wrap">
              <a href="#publications" className="px-6 py-3 rounded-full bg-[#4fe3c1] text-[#05070c] font-semibold text-sm hover:brightness-110 transition">View Publications</a>
              <a href="#contact" className="px-6 py-3 rounded-full border border-[#1e2740] text-sm font-semibold hover:border-[#4fe3c1] transition">Get in Touch</a>
            </div>
          </div>
          <div className="relative flex-none">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#4fe3c1]/20 to-[#6a8cff]/20 blur-2xl" />
            <img
              src={s.photo_url ?? '/dr-rahuman.png'}
              alt={s.doctor_name}
              className="relative w-72 h-88 md:w-80 md:h-96 object-cover rounded-3xl border border-[#1e2740]"
            />
          </div>
        </section>

        {/* STATS */}
        <section className="border-y border-[#1e2740] bg-[#0b0f1a]/60">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
            {[
              [`${pubs.length}+`, 'Peer-Reviewed Publications'],
              [`${trialList.length}`, 'International Trials'],
              [`${presList.length}`, 'Conference Presentations'],
              ['FACC', 'American College of Cardiology'],
            ].map(([num, label]) => (
              <div key={label} className="p-8 text-center border-r border-[#1e2740] last:border-r-0">
                <div className="font-display text-3xl font-semibold text-[#4fe3c1]">{num}</div>
                <div className="text-xs text-[#8a97b8] mt-2">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section className="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row gap-16">
          <div className="md:w-56 flex-none text-xs font-semibold tracking-widest uppercase text-[#4fe3c1]">About</div>
          <div className="flex-1 flex flex-col gap-5 max-w-3xl">
            <p className="text-lg leading-relaxed">{s.bio_intro}</p>
            <p className="text-[#8a97b8] leading-relaxed">{s.bio_body}</p>
          </div>
        </section>

        {/* PUBLICATIONS */}
        <section id="publications" className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex items-baseline justify-between mb-10 flex-wrap gap-3">
            <h2 className="font-display text-3xl font-semibold">Publications</h2>
            <span className="text-sm text-[#8a97b8]">{pubs.length} peer-reviewed articles</span>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {pubs.map((p) => (
              <div key={p.id} className="glass rounded-2xl p-7 flex flex-col gap-3 hover:border-[#4fe3c1]/50 transition">
                <div className="text-xs font-semibold tracking-wide uppercase text-[#4fe3c1]">{p.publisher} · {p.year}</div>
                <div className="font-medium leading-snug">{p.title}</div>
                <div className="flex gap-5 mt-auto pt-2 text-sm font-semibold">
                  {p.full_article_url && <PreviewButton label="Abstract" url={p.full_article_url} title={p.title} />}
                  {p.full_article_url && <a href={p.full_article_url} target="_blank" rel="noopener" className="text-[#6a8cff] hover:underline">Full Article</a>}
                  {p.pdf_url && <PreviewButton label="PDF" url={p.pdf_url} title={p.title} />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRIALS */}
        <section id="trials" className="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row gap-16">
          <div className="md:w-56 flex-none text-xs font-semibold tracking-widest uppercase text-[#4fe3c1]">Clinical Trials</div>
          <div className="flex-1 flex flex-col gap-6 max-w-3xl">
            {trialList.map((t) => (
              <div key={t.id} className="glass rounded-2xl p-8 flex flex-col gap-4">
                <div className="font-display text-xl font-semibold">{t.title}</div>
                <p className="text-[#8a97b8] leading-relaxed">{t.description}</p>
                {t.link_url && <a href={t.link_url} target="_blank" rel="noopener" className="text-[#4fe3c1] font-semibold text-sm">{t.link_label ?? 'Read more'} →</a>}
              </div>
            ))}
          </div>
        </section>

        {/* PRESENTATIONS */}
        <section id="presentations" className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="font-display text-3xl font-semibold mb-10">Presentations &amp; Posters</h2>
          <div className="flex flex-col gap-px rounded-2xl overflow-hidden border border-[#1e2740]">
            {presList.map((p) => (
              <div key={p.id} className="bg-[#0b0f1a] p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="font-medium">{p.title}</div>
                  {p.presented_at && <div className="text-sm text-[#8a97b8] mt-1">Presented At: {p.presented_at}</div>}
                </div>
                <div className="flex gap-4 flex-wrap flex-none">
                  {p.presentation_links?.map((l) => (
                    <a key={l.id} href={l.url} target="_blank" rel="noopener" className="text-sm font-semibold text-[#4fe3c1]">{l.label} →</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ARTICLES */}
        <section id="articles" className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="font-display text-3xl font-semibold mb-8">Articles</h2>
          {articleList.length === 0 ? (
            <div className="border border-dashed border-[#1e2740] rounded-2xl p-10 text-center text-[#8a97b8] text-sm">No articles published yet. Check back soon.</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-5">
              {articleList.map((a) => (
                <div key={a.id} className="glass rounded-2xl p-6 flex flex-col gap-3">
                  {a.cover_url && <img src={a.cover_url} alt="" className="rounded-xl h-36 w-full object-cover" />}
                  <div className="font-medium">{a.title}</div>
                  {a.body && <p className="text-sm text-[#8a97b8] line-clamp-3">{a.body}</p>}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* VIDEOS */}
        <section id="videos" className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="font-display text-3xl font-semibold mb-8">Videos</h2>
          {videoList.length === 0 ? (
            <div className="border border-dashed border-[#1e2740] rounded-2xl p-10 text-center text-[#8a97b8] text-sm">No videos published yet. Check back soon.</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {videoList.map((v) => (
                <div key={v.id} className="glass rounded-2xl overflow-hidden">
                  <div className="aspect-video bg-black">
                    <iframe src={v.video_url} className="w-full h-full" allowFullScreen title={v.title} />
                  </div>
                  <div className="p-5 font-medium">{v.title}</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FELLOWSHIP */}
        <section id="fellowship" className="max-w-6xl mx-auto px-6 py-20">
          {fellowshipList.map((f) => (
            <div key={f.id} className="glass rounded-2xl p-8 flex items-center gap-8 flex-wrap">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4fe3c1] to-[#6a8cff] flex items-center justify-center flex-none">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#05070c" strokeWidth="1.8"><path d="M12 2l2.6 5.9L21 8.7l-4.5 4.2 1.2 6.4L12 16.3 6.3 19.3l1.2-6.4L3 8.7l6.4-.8L12 2z" strokeLinejoin="round"/></svg>
              </div>
              <div className="flex-1 min-w-60">
                <div className="font-display text-xl font-semibold">{f.title}</div>
                {f.subtitle && <div className="text-sm text-[#8a97b8] mt-1">{f.subtitle}</div>}
              </div>
              {f.pdf_url && <a href={f.pdf_url} target="_blank" rel="noopener" className="px-6 py-3 rounded-full border border-[#1e2740] text-sm font-semibold hover:border-[#4fe3c1] transition">Learn More</a>}
            </div>
          ))}
        </section>

        {/* FOOTER */}
        <footer id="contact" className="border-t border-[#1e2740] bg-[#0b0f1a]/60">
          <div className="max-w-6xl mx-auto px-6 py-16 flex justify-between items-center flex-wrap gap-6">
            <div>
              <div className="font-display font-semibold text-lg">{s.doctor_name}</div>
              <div className="text-sm text-[#8a97b8] mt-1">Ceylon Cardiology Research</div>
            </div>
            <a href={`mailto:${s.contact_email}`} className="text-[#4fe3c1] font-semibold">{s.contact_email}</a>
            <div className="text-sm text-[#8a97b8]">© {new Date().getFullYear()} Cardiology Research</div>
          </div>
        </footer>
      </div>
    </PdfModalProvider>
  );
}
