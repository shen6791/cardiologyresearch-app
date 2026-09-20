import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { SiteSettings, Publication, ClinicalTrial, Presentation } from '@/lib/types';
import PageHeader from '@/components/PageHeader';

export const metadata = { title: 'About' };

export default async function AboutPage() {
  const supabase = await createClient();
  const [{ data: settings }, { data: publications }, { data: trials }, { data: presentations }] = await Promise.all([
    supabase.from('site_settings').select('*').eq('id', 1).single(),
    supabase.from('publications').select('*').order('sort_order'),
    supabase.from('clinical_trials').select('*').order('sort_order'),
    supabase.from('presentations').select('*').order('sort_order'),
  ]);
  const s = settings as SiteSettings;
  const pubs = (publications ?? []) as Publication[];
  const trialList = (trials ?? []) as ClinicalTrial[];
  const presList = (presentations ?? []) as Presentation[];

  const sections = [
    { id: 'clinical-practice', title: 'Clinical Practice', body: s.bio_intro },
    { id: 'research-interests', title: 'Research Interests', body: 'A particular interest in interventional and diagnostic cardiology, with research aimed at exploring innovative solutions, driving evidence-based practice, and pushing the boundaries of current medical treatment.' },
    { id: 'research-experience', title: 'Research Experience', body: s.bio_body },
  ];

  return (
    <div>
      <PageHeader eyebrow="Biography" title={`About ${s.doctor_name}`} sub="General & Interventional Cardiologist — Cardiology Research" />

      <div className="max-w-3xl mx-auto px-6 pb-16 flex flex-col gap-12">
        {sections.map((sec) => (
          <div key={sec.id} id={sec.id} className="flex flex-col gap-3">
            <h2 className="font-display text-xl font-semibold text-[var(--text)]">{sec.title}</h2>
            <p className="text-[var(--muted)] leading-relaxed">{sec.body}</p>
          </div>
        ))}

        <div className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-semibold text-[var(--text)]">Publications</h2>
          {pubs.length > 0 ? (
            <>
              <p className="text-[var(--muted)] leading-relaxed">{pubs.length} peer-reviewed {pubs.length === 1 ? 'article' : 'articles'} in cardiology and cardiovascular disease.</p>
              <Link href="/publications" className="text-sm font-medium text-[var(--accent)] hover:underline w-fit">View all publications →</Link>
            </>
          ) : (
            <p className="text-[var(--muted)]">No publications listed yet.</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-semibold text-[var(--text)]">Clinical Trials</h2>
          {trialList.length > 0 ? (
            <>
              <p className="text-[var(--muted)] leading-relaxed">{s.bio_outro}</p>
              <Link href="/clinical-trials" className="text-sm font-medium text-[var(--accent)] hover:underline w-fit">View clinical trials →</Link>
            </>
          ) : (
            <p className="text-[var(--muted)]">No clinical trials listed yet.</p>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-display text-xl font-semibold text-[var(--text)]">Academic Presentations</h2>
          {presList.length > 0 ? (
            <>
              <p className="text-[var(--muted)] leading-relaxed">{presList.length} conference {presList.length === 1 ? 'presentation' : 'presentations'}, local and international.</p>
              <Link href="/presentations" className="text-sm font-medium text-[var(--accent)] hover:underline w-fit">View presentations →</Link>
            </>
          ) : (
            <p className="text-[var(--muted)]">No presentations listed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
