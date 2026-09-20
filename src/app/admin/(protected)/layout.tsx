import { createClient } from '@/lib/supabase/server';
import type { Profile } from '@/lib/types';
import AdminNav from '@/components/admin/AdminNav';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/admin/login');

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  if (!profile) {
    return (
      <div className="min-h-screen bg-[var(--bg-soft)] flex items-center justify-center px-6">
        <div className="border border-[var(--border)] bg-[var(--bg)] rounded-2xl p-10 max-w-md text-center flex flex-col gap-4">
          <div className="font-display text-xl font-semibold">Not Authorized</div>
          <p className="text-sm text-[var(--muted)]">Your account isn&apos;t linked to an admin role yet. Ask a super admin to invite <span className="text-[var(--text)] font-medium">{user.email}</span>.</p>
          <a href="/admin/login" className="text-[var(--accent)] text-sm font-semibold">Back to login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-soft)] flex flex-col lg:flex-row">
      <AdminNav role={(profile as Profile).role} email={(profile as Profile).email} />
      <main className="flex-1 p-5 sm:p-8 max-w-5xl w-full">{children}</main>
    </div>
  );
}
