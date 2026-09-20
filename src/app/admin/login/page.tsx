'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/admin');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[var(--bg-soft)] flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="border border-[var(--border)] bg-[var(--bg)] rounded-2xl p-10 w-full max-w-sm flex flex-col gap-5">
        <div className="text-center mb-2">
          <div className="font-display text-2xl font-semibold">Admin Sign In</div>
          <div className="text-sm text-[var(--muted)] mt-1">Ceylon Cardiology Research</div>
        </div>
        {error && <div className="text-sm text-[var(--danger)] bg-[var(--danger)]/10 border border-[var(--danger)]/30 rounded-lg px-4 py-3">{error}</div>}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[var(--muted)]">Email</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)]" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[var(--muted)]">Password</label>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)]" />
        </div>
        <button disabled={loading} className="mt-2 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-lg py-3 hover:brightness-110 transition disabled:opacity-50">
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
