import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { SiteSettings, Publication, ClinicalTrial, Presentation, Fellowship } from '@/lib/types';
import Reveal from '@/components/Reveal';
import AnimatedStat from '@/components/AnimatedStat';

export default async function Home() {
  const supabase = await createClient();
  const [{ data: settings }, { data: publications }, { data: trials }, { data: presentations }, { data: fellowships }] = await Promise.all([
    supabase.from('site_settings').select('*').eq('id', 1).single(),
    supabase.from('publications').select('id', { count: 'exact' }),
    supabase.from('clinical_trials').select('id', { count: 'exact' }),
    supabase.from('presentations').select('id', { count: 'exact' }),
    supabase.from('fellowships').select('id', { count: 'exact' }),
  ]);
  const s = settings as SiteSettings;
  const pubCount = (publications as Publication[] | null)?.length ?? 0;
  const trialCount = (trials as ClinicalTrial[] | null)?.length ?? 0;
  const presCount = (presentations as Presentation[] | null)?.length ?? 0;
  const fellowshipCount = (fellowships as Fellowship[] | null)?.length ?? 0;
  void fellowshipCount;

  const sections = [
    { href: '/publications', label: 'Publications', desc: 'Peer-reviewed research articles.' },
    { href: '/abstracts', label: 'Abstracts', desc: 'Abstracts from published work.' },
    { href: '/clinical-trials', label: 'Clinical Trials', desc: 'Multicenter and investigator-led trials.' },
    { href: '/presentations', label: 'Presentations & Posters', desc: 'Conference talks and posters.' },
    { href: '/articles', label: 'Articles', desc: 'Writing for a general audience.' },
    { href: '/videos', label: 'Videos', desc: 'Talks and recorded sessions.' },
    { href: '/fellowship', label: 'Fellowship', desc: 'Professional credentials.' },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 flex flex-col md:flex-row items-center gap-14">
        <div className="flex-1 flex flex-col gap-6">
          <div className="hero-fade-1 text-xs font-semibold tracking-widest uppercase text-[#0f5d52]">Cardiology Research</div>
          <h1 className="hero-fade-2 font-display text-4xl md:text-5xl font-semibold leading-tight text-[#1c1c1a]">{s.tagline}</h1>
          <p className="hero-fade-3 text-[#6b6a63] text-lg leading-relaxed max-w-lg">{s.bio_intro}</p>
          <div className="hero-fade-4 flex gap-4 flex-wrap pt-1">
            <Link href="/publications" className="btn-lift px-6 py-3 rounded-md bg-[#0f5d52] text-white font-medium text-sm">View Publications</Link>
            <Link href="/contact" className="btn-lift px-6 py-3 rounded-md border border-[#d8d4c8] text-sm font-medium hover:border-[#0f5d52] transition-colors">Get in Touch</Link>
          </div>
        </div>
        <img src={s.photo_url ?? '/dr-rahuman.png'} alt={s.doctor_name} className="hero-fade-img w-56 h-64 sm:w-64 sm:h-72 md:w-72 md:h-80 object-cover rounded-xl border border-[#e6e3db] flex-none" />
      </section>

      {/* STATS */}
      <section className="border-y border-[#e6e3db] bg-[#f7f6f3]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4">
          <AnimatedStat value={`${pubCount}+`} label="Publications" />
          <AnimatedStat value={`${trialCount}`} label="International Trials" />
          <AnimatedStat value={`${presCount}`} label="Presentations" />
          <AnimatedStat value="FACC" label="ACC Fellowship" />
        </div>
      </section>

      {/* ABOUT */}
      <Reveal>
        <section className="max-w-5xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-14">
          <div className="md:w-48 flex-none text-xs font-semibold tracking-widest uppercase text-[#0f5d52]">About</div>
          <div className="flex-1 max-w-2xl text-[#3d3c37] leading-relaxed">{s.bio_body}</div>
        </section>
      </Reveal>

      {/* SECTION LINKS */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sections.map((sec, i) => (
            <Reveal key={sec.href} delay={i * 60}>
              <Link href={sec.href} className="card-lift group border border-[#e6e3db] rounded-lg p-6 hover:border-[#0f5d52] flex flex-col gap-2 h-full">
                <div className="font-display font-semibold group-hover:text-[#0f5d52] transition-colors">{sec.label}</div>
                <div className="text-sm text-[#6b6a63]">{sec.desc}</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
