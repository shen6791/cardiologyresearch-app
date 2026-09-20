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
      <div className="border border-[#e6e3db] rounded-2xl p-8 bg-[#eaf2f0] text-[#1d4ed8]">
        Thank you — your message has been sent. We&apos;ll get back to you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-[#e6e3db] rounded-2xl p-8 flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[#6b6a63]">Name</label>
          <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="bg-[#f7f6f3] border border-[#e6e3db] rounded-2xl px-4 py-3 outline-none focus:border-[#1d4ed8]" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[#6b6a63]">Email</label>
          <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="bg-[#f7f6f3] border border-[#e6e3db] rounded-2xl px-4 py-3 outline-none focus:border-[#1d4ed8]" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs text-[#6b6a63]">Subject</label>
        <input value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          className="bg-[#f7f6f3] border border-[#e6e3db] rounded-2xl px-4 py-3 outline-none focus:border-[#1d4ed8]" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs text-[#6b6a63]">Message</label>
        <textarea required rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="bg-[#f7f6f3] border border-[#e6e3db] rounded-2xl px-4 py-3 outline-none focus:border-[#1d4ed8]" />
      </div>
      {status === 'error' && <div className="text-sm text-[#c0392b]">Something went wrong. Please try again or email us directly.</div>}
      <button disabled={status === 'sending'} className="self-start px-6 py-3 rounded-md bg-[#1d4ed8] text-white font-medium text-sm hover:bg-[#1739a6] transition disabled:opacity-50">
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
