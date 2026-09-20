'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type Message = { id: string; name: string; email: string; subject: string | null; message: string; created_at: string };

export default function MessagesList({ initial }: { initial: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initial);
  const supabase = createClient();

  async function remove(id: string) {
    if (!confirm('Delete this message?')) return;
    await supabase.from('contact_messages').delete().eq('id', id);
    setMessages((m) => m.filter((x) => x.id !== id));
  }

  return (
    <div className="flex flex-col gap-3">
      {messages.map((m) => (
        <div key={m.id} className="border border-[var(--border)] bg-[var(--bg)] rounded-xl p-5 flex flex-col gap-2">
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <div>
              <div className="font-medium">{m.name} <span className="text-[var(--muted)] font-normal">&lt;{m.email}&gt;</span></div>
              {m.subject && <div className="text-sm text-[var(--accent)] mt-0.5">{m.subject}</div>}
            </div>
            <div className="text-xs text-[var(--muted)] flex-none">{new Date(m.created_at).toLocaleString()}</div>
          </div>
          <p className="text-sm text-[var(--text)] whitespace-pre-line">{m.message}</p>
          <div className="flex justify-end">
            <button onClick={() => remove(m.id)} className="text-[var(--danger)] text-sm font-semibold">Delete</button>
          </div>
        </div>
      ))}
      {messages.length === 0 && <div className="text-sm text-[var(--muted)] text-center py-10">No messages yet.</div>}
    </div>
  );
}
