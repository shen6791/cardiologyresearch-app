'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Presentation, PresentationLink } from '@/lib/types';

export default function PresentationsEditor({ initial }: { initial: Presentation[] }) {
  const [items, setItems] = useState<Presentation[]>(initial);
  const [busy, setBusy] = useState(false);
  const supabase = createClient();

  async function addPresentation() {
    const { data, error } = await supabase.from('presentations').insert({ title: 'New presentation', sort_order: items.length + 1 }).select('*, presentation_links(*)').single();
    if (!error && data) setItems((i) => [...i, data as Presentation]);
  }

  async function updatePresentation(id: string, field: string, value: unknown) {
    setItems((i) => i.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  async function savePresentation(p: Presentation) {
    setBusy(true);
    await supabase.from('presentations').update({ title: p.title, presented_at: p.presented_at, sort_order: p.sort_order }).eq('id', p.id);
    setBusy(false);
  }

  async function removePresentation(id: string) {
    if (!confirm('Delete this presentation and all its links?')) return;
    await supabase.from('presentations').delete().eq('id', id);
    setItems((i) => i.filter((p) => p.id !== id));
  }

  async function addLink(presentationId: string) {
    const { data, error } = await supabase.from('presentation_links').insert({ presentation_id: presentationId, label: 'Show', url: 'https://', sort_order: 1 }).select().single();
    if (!error && data) {
      setItems((i) => i.map((p) => (p.id === presentationId ? { ...p, presentation_links: [...(p.presentation_links ?? []), data as PresentationLink] } : p)));
    }
  }

  async function updateLink(presentationId: string, linkId: string, field: string, value: unknown) {
    setItems((i) => i.map((p) => (p.id === presentationId
      ? { ...p, presentation_links: p.presentation_links.map((l) => (l.id === linkId ? { ...l, [field]: value } : l)) }
      : p)));
  }

  async function saveLink(link: PresentationLink) {
    setBusy(true);
    await supabase.from('presentation_links').update({ label: link.label, url: link.url }).eq('id', link.id);
    setBusy(false);
  }

  async function removeLink(presentationId: string, linkId: string) {
    await supabase.from('presentation_links').delete().eq('id', linkId);
    setItems((i) => i.map((p) => (p.id === presentationId ? { ...p, presentation_links: p.presentation_links.filter((l) => l.id !== linkId) } : p)));
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <button onClick={addPresentation} className="px-5 py-2.5 rounded-full bg-[#4fe3c1] text-[#05070c] text-sm font-semibold hover:brightness-110">+ Add presentation</button>
      </div>
      {items.map((p) => (
        <div key={p.id} className="glass rounded-2xl p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-[#8a97b8]">Title</label>
            <textarea rows={2} value={p.title} onChange={(e) => updatePresentation(p.id, 'title', e.target.value)} onBlur={() => savePresentation(p)}
              className="bg-[#0b0f1a] border border-[#1e2740] rounded-lg px-4 py-3 outline-none focus:border-[#4fe3c1]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-[#8a97b8]">Presented At</label>
            <input value={p.presented_at ?? ''} onChange={(e) => updatePresentation(p.id, 'presented_at', e.target.value)} onBlur={() => savePresentation(p)}
              className="bg-[#0b0f1a] border border-[#1e2740] rounded-lg px-4 py-3 outline-none focus:border-[#4fe3c1]" />
          </div>

          <div className="flex flex-col gap-3 pl-4 border-l border-[#1e2740]">
            <div className="text-xs text-[#8a97b8]">Links</div>
            {p.presentation_links?.map((l) => (
              <div key={l.id} className="flex gap-3 items-center">
                <input value={l.label} onChange={(e) => updateLink(p.id, l.id, 'label', e.target.value)} onBlur={() => saveLink({ ...l, label: l.label })}
                  className="w-28 bg-[#0b0f1a] border border-[#1e2740] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#4fe3c1]" />
                <input value={l.url} onChange={(e) => updateLink(p.id, l.id, 'url', e.target.value)} onBlur={() => saveLink({ ...l, url: l.url })}
                  className="flex-1 bg-[#0b0f1a] border border-[#1e2740] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#4fe3c1]" />
                <button onClick={() => removeLink(p.id, l.id)} className="text-[#ff6b6b] text-sm font-semibold">Remove</button>
              </div>
            ))}
            <button onClick={() => addLink(p.id)} className="text-[#6a8cff] text-sm font-semibold self-start">+ Add link</button>
          </div>

          <div className="flex justify-end pt-2">
            <button onClick={() => removePresentation(p.id)} className="text-[#ff6b6b] text-sm font-semibold">Delete presentation</button>
          </div>
        </div>
      ))}
      {busy && <div className="text-xs text-[#8a97b8]">Saving…</div>}
    </div>
  );
}
