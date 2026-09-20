import { createClient } from '@/lib/supabase/server';
import type { ClinicalTrial } from '@/lib/types';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Clinical Trials — Dr. Faslur Rahuman' };

export default async function TrialsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('clinical_trials').select('*').order('sort_order');
  const trials = (data ?? []) as ClinicalTrial[];

  return (
    <div>
      <PageHeader eyebrow="Research" title="Clinical Trials" sub="Multicenter and investigator-led trials." />
      <div className="max-w-5xl mx-auto px-6 pb-24 flex flex-col gap-4">
        {trials.map((t, i) => (
          <Reveal key={t.id} delay={i * 60}>
            <div className="card-lift border border-[var(--border)] rounded-lg p-7 flex flex-col gap-3 bg-[var(--bg-soft)]">
              <div className="font-display text-xl font-semibold">{t.title}</div>
              <p className="text-[var(--text)] leading-relaxed">{t.description}</p>
              {t.link_url && <a href={t.link_url} target="_blank" rel="noopener" className="text-[var(--accent)] font-medium text-sm">{t.link_label ?? 'Read more'} →</a>}
            </div>
          </Reveal>
        ))}
        {trials.length === 0 && <div className="text-sm text-[var(--muted)]">No clinical trials listed yet.</div>}
      </div>
    </div>
  );
}
