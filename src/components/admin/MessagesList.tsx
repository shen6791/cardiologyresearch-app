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
        <div key={m.id} className="border border-[#e6e3db] bg-white rounded-xl p-5 flex flex-col gap-2">
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <div>
              <div className="font-medium">{m.name} <span className="text-[#6b6a63] font-normal">&lt;{m.email}&gt;</span></div>
              {m.subject && <div className="text-sm text-[#0f5d52] mt-0.5">{m.subject}</div>}
            </div>
            <div className="text-xs text-[#6b6a63] flex-none">{new Date(m.created_at).toLocaleString()}</div>
          </div>
          <p className="text-sm text-[#3d3c37] whitespace-pre-line">{m.message}</p>
          <div className="flex justify-end">
            <button onClick={() => remove(m.id)} className="text-[#ff6b6b] text-sm font-semibold">Delete</button>
          </div>
        </div>
      ))}
      {messages.length === 0 && <div className="text-sm text-[#6b6a63] text-center py-10">No messages yet.</div>}
    </div>
  );
}
