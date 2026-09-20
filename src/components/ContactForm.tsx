'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    const { error } = await supabase.from('contact_messages').insert(form);
    if (error) {
      setStatus('error');
      return;
    }
    setStatus('sent');
    setForm({ name: '', email: '', subject: '', message: '' });
  }

  if (status === 'sent') {
    return (
      <div className="border border-[var(--border)] rounded-lg p-8 bg-[var(--accent-soft)] text-[var(--accent)]">
        Thank you — your message has been sent. We&apos;ll get back to you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-[var(--border)] rounded-lg p-8 flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[var(--muted)]">Name</label>
          <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)]" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[var(--muted)]">Email</label>
          <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)]" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs text-[var(--muted)]">Subject</label>
        <input value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          className="bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)]" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs text-[var(--muted)]">Message</label>
        <textarea required rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)]" />
      </div>
      {status === 'error' && <div className="text-sm text-[var(--danger)]">Something went wrong. Please try again or email us directly.</div>}
      <button disabled={status === 'sending'} className="self-start px-6 py-3 rounded-md bg-[var(--accent)] text-white font-medium text-sm hover:bg-[var(--accent-strong)] transition disabled:opacity-50">
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
