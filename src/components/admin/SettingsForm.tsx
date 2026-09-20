'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { SiteSettings } from '@/lib/types';

export default function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [form, setForm] = useState<SiteSettings>(initial);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function save() {
    setBusy(true);
    const { id, ...payload } = form;
    void id;
    const { error } = await supabase.from('site_settings').update(payload).eq('id', 1);
    setBusy(false);
    if (!error) setSaved(true);
  }

  return (
    <div className="border border-[#e6e3db] bg-white rounded-2xl p-7 flex flex-col gap-5 max-w-2xl">
      <Field label="Doctor Name" value={form.doctor_name} onChange={(v) => set('doctor_name', v)} />
      <Field label="Tagline / Hero Headline" value={form.tagline} onChange={(v) => set('tagline', v)} textarea />
      <Field label="About — Intro Paragraph" value={form.bio_intro} onChange={(v) => set('bio_intro', v)} textarea />
      <Field label="About — Body Paragraph" value={form.bio_body} onChange={(v) => set('bio_body', v)} textarea />
      <Field label="About — Closing Paragraph" value={form.bio_outro} onChange={(v) => set('bio_outro', v)} textarea />
      <Field label="Photo URL" value={form.photo_url ?? ''} onChange={(v) => set('photo_url', v)} />
      <Field label="Contact Email" value={form.contact_email} onChange={(v) => set('contact_email', v)} />
      <div className="flex items-center gap-4 pt-2">
        <button disabled={busy} onClick={save} className="px-6 py-3 rounded-full bg-[#0f5d52] text-[#ffffff] font-semibold text-sm hover:brightness-110 disabled:opacity-50">
          {busy ? 'Saving…' : 'Save Changes'}
        </button>
        {saved && <span className="text-sm text-[#0f5d52]">Saved.</span>}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-[#6b6a63]">{label}</label>
      {textarea ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)}
          className="bg-[#f7f6f3] border border-[#e6e3db] rounded-lg px-4 py-3 outline-none focus:border-[#0f5d52]" />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)}
          className="bg-[#f7f6f3] border border-[#e6e3db] rounded-lg px-4 py-3 outline-none focus:border-[#0f5d52]" />
      )}
    </div>
  );
}
