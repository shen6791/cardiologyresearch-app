'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    if (data.session) {
      router.push('/admin');
      router.refresh();
    } else {
      setDone(true);
    }
  }

  return (
    <div className="min-h-screen grid-glow flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="glass rounded-2xl p-10 w-full max-w-sm flex flex-col gap-5">
        <div className="text-center mb-2">
          <div className="font-display text-2xl font-semibold">Admin Sign Up</div>
          <div className="text-sm text-[#8a97b8] mt-1">Use the exact email a super admin invited</div>
        </div>
        {error && <div className="text-sm text-[#ff6b6b] bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 rounded-lg px-4 py-3">{error}</div>}
        {done ? (
          <div className="text-sm text-[#4fe3c1] text-center">
            Account created. If email confirmation is required, check your inbox, then <a href="/admin/login" className="underline">sign in</a>.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#8a97b8]">Email</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0b0f1a] border border-[#1e2740] rounded-lg px-4 py-3 outline-none focus:border-[#4fe3c1]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#8a97b8]">Password</label>
              <input required minLength={6} type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="bg-[#0b0f1a] border border-[#1e2740] rounded-lg px-4 py-3 outline-none focus:border-[#4fe3c1]" />
            </div>
            <button disabled={loading} className="mt-2 bg-[#4fe3c1] text-[#05070c] font-semibold rounded-lg py-3 hover:brightness-110 transition disabled:opacity-50">
              {loading ? 'Creating…' : 'Create Account'}
            </button>
          </>
        )}
        <a href="/admin/login" className="text-center text-sm text-[#8a97b8] hover:text-white">Already have an account? Sign in</a>
      </form>
    </div>
  );
}
