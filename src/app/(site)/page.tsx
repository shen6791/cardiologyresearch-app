import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { SiteSettings, Publication, ClinicalTrial, Presentation, Fellowship } from '@/lib/types';
import Reveal from '@/components/Reveal';
import AnimatedStat from '@/components/AnimatedStat';
import PageHeader from '@/components/PageHeader';

const researchAreas = [
  { title: 'Interventional Cardiology', desc: 'Percutaneous coronary intervention and catheter-based treatment of coronary artery disease.' },
  { title: 'Diagnostic Cardiology', desc: 'Exercise ECG and non-invasive assessment of coronary artery disease.' },
  { title: 'Cardiovascular Research', desc: 'Clinical characteristics, procedural outcomes and angiographic patterns of coronary artery disease in Sri Lankan populations.' },
  { title: 'Hypertension', desc: 'Combination antihypertensive therapy, as principal investigator on the GMRx2 multicenter trial.' },
  { title: 'Clinical Trials', desc: 'Multicenter, randomized, active- and placebo-controlled trial design and investigation.' },
];

export default async function Home() {
  const supabase = await createClient();
  const [{ data: settings }, { data: publications }, { data: trials }, { data: presentations }] = await Promise.all([
    supabase.from('site_settings').select('*').eq('id', 1).single(),
    supabase.from('publications').select('*').order('sort_order'),
    supabase.from('clinical_trials').select('*').order('sort_order'),
    supabase.from('presentations').select('id', { count: 'exact' }),
  ]);
  const s = settings as SiteSettings;
  const pubs = (publications ?? []) as Publication[];
  const trialList = (trials ?? []) as ClinicalTrial[];
  const presCount = (presentations as Presentation[] | null)?.length ?? 0;
  const journals = Array.from(new Set(pubs.map((p) => p.publisher))).filter(Boolean);

  const stats: { value: string; label: string }[] = [];
  if (pubs.length > 0) stats.push({ value: `${pubs.length}`, label: 'Publications' });
  if (trialList.length > 0) stats.push({ value: `${trialList.length}`, label: 'International Trials' });
  if (presCount > 0) stats.push({ value: `${presCount}`, label: 'Presentations' });
  stats.push({ value: 'FACC', label: 'ACC Fellowship' });

  return (
    <div>
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-16 md:pt-24 pb-16 grid md:grid-cols-[1.3fr_1fr] gap-12 md:gap-16 items-center">
        <div className="flex flex-col gap-5">
          <div className="text-sm font-semibold text-[var(--accent)] tracking-wide">{s.doctor_name}</div>
          <div className="text-sm text-[var(--muted)] -mt-3">General &amp; Interventional Cardiologist · Cardiology Research</div>
          <h1 className="font-display text-4xl md:text-[3.25rem] font-bold leading-[1.1] text-[var(--text)] tracking-tight">
            {s.tagline}
          </h1>
          <p className="text-[var(--muted)] text-base leading-relaxed max-w-xl">{s.bio_intro}</p>
          <div className="flex items-center gap-6 pt-2 flex-wrap">
            <Link href="/publications" className="px-5 py-2.5 rounded-md bg-[var(--accent)] text-white font-medium text-sm hover:bg-[var(--accent-strong)] transition-colors">
              Explore Research
            </Link>
            <Link href="/publications" className="px-5 py-2.5 rounded-md border border-[var(--border-strong)] font-medium text-sm hover:border-[var(--accent)] transition-colors">
              Publications
            </Link>
            <Link href="/contact" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--accent)] transition-colors">
              Contact →
            </Link>
          </div>
        </div>
        <img
          src={s.photo_url ?? '/dr-rahuman.png'}
          alt={`Portrait of ${s.doctor_name}`}
          className="w-full max-w-xs mx-auto md:max-w-none aspect-[4/5] object-cover rounded-lg border border-[var(--border)]"
        />
      </section>

      {/* RESEARCH AT A GLANCE */}
      <section className="border-y border-[var(--border)] bg-[var(--bg-soft)]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

      {/* RESEARCH AREAS */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20">
          <PageHeader eyebrow="Focus" title="Research Areas" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)] -mt-4">
            {researchAreas.map((area) => (
              <div key={area.title} className="bg-[var(--bg)] p-6 flex flex-col gap-2">
                <div className="font-display font-semibold text-[var(--text)]">{area.title}</div>
                <div className="text-sm text-[var(--muted)] leading-relaxed">{area.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* SELECTED PUBLICATIONS */}
      {pubs.length > 0 && (
        <Reveal>
          <section className="max-w-6xl mx-auto px-6 pb-20">
            <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
              <PageHeader eyebrow="Research" title="Selected Publications" />
              <Link href="/publications" className="text-sm font-medium text-[var(--accent)] hover:underline mb-2">View all →</Link>
            </div>
            <div className="flex flex-col divide-y divide-[var(--border)] border-t border-b border-[var(--border)] -mt-4">
              {pubs.slice(0, 3).map((p) => (
                <div key={p.id} className="py-5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div className="font-medium text-[var(--text)] max-w-2xl">{p.title}</div>
                  <div className="text-sm text-[var(--muted)] flex-none">{p.publisher}{p.year ? ` · ${p.year}` : ''}</div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* CLINICAL TRIALS */}
      {trialList.length > 0 && (
        <Reveal>
          <section className="max-w-6xl mx-auto px-6 pb-20">
            <PageHeader eyebrow="Research" title="Clinical Trials" />
            <div className="flex flex-col gap-4 -mt-4">
              {trialList.map((t) => (
                <div key={t.id} className="border border-[var(--border)] p-6 flex flex-col gap-2 bg-[var(--bg-soft)]">
                  <div className="font-display font-semibold text-[var(--text)]">{t.title}</div>
                  <p className="text-sm text-[var(--muted)] leading-relaxed max-w-3xl">{t.description}</p>
                  {t.link_url && <a href={t.link_url} target="_blank" rel="noopener" className="text-sm font-medium text-[var(--accent)] hover:underline w-fit">{t.link_label ?? 'Read more'} →</a>}
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* ABOUT TEASER */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-[1fr_1.6fr] gap-12">
          <PageHeader eyebrow="Biography" title="About" />
          <div className="flex flex-col gap-4 text-[var(--text)] leading-relaxed -mt-4">
            <p>{s.bio_body}</p>
            <Link href="/about" className="text-sm font-medium text-[var(--accent)] hover:underline w-fit">Read full biography →</Link>
          </div>
        </section>
      </Reveal>

      {/* SELECTED JOURNALS */}
      {journals.length > 0 && (
        <Reveal>
          <section className="border-y border-[var(--border)] bg-[var(--bg-soft)] py-14">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-xs font-semibold tracking-widest uppercase text-[var(--muted)] mb-6">Selected Journals &amp; Research Publications</div>
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                {journals.map((j) => (
                  <span key={j} className="font-display text-lg text-[var(--text)]">{j}</span>
                ))}
              </div>
            </div>
          </section>
        </Reveal>
      )}
    </div>
  );
}
