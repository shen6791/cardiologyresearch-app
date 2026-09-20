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
    <div className="min-h-screen bg-[#f7f6f3] flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="border border-[#e6e3db] bg-white rounded-2xl p-10 w-full max-w-sm flex flex-col gap-5">
        <div className="text-center mb-2">
          <div className="font-display text-2xl font-semibold">Admin Sign In</div>
          <div className="text-sm text-[#6b6a63] mt-1">Ceylon Cardiology Research</div>
        </div>
        {error && <div className="text-sm text-[#ff6b6b] bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 rounded-lg px-4 py-3">{error}</div>}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[#6b6a63]">Email</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="bg-[#f7f6f3] border border-[#e6e3db] rounded-lg px-4 py-3 outline-none focus:border-[#0f5d52]" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs text-[#6b6a63]">Password</label>
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="bg-[#f7f6f3] border border-[#e6e3db] rounded-lg px-4 py-3 outline-none focus:border-[#0f5d52]" />
        </div>
        <button disabled={loading} className="mt-2 bg-[#0f5d52] text-[#ffffff] font-semibold rounded-lg py-3 hover:brightness-110 transition disabled:opacity-50">
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
