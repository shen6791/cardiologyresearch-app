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
      <div className="min-h-screen bg-[#f7f6f3] flex items-center justify-center px-6">
        <div className="border border-[#e6e3db] bg-white rounded-2xl p-10 max-w-md text-center flex flex-col gap-4">
          <div className="font-display text-xl font-semibold">Not Authorized</div>
          <p className="text-sm text-[#6b6a63]">Your account isn&apos;t linked to an admin role yet. Ask a super admin to invite <span className="text-white">{user.email}</span>.</p>
          <a href="/admin/login" className="text-[#0f5d52] text-sm font-semibold">Back to login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f6f3] flex">
      <AdminNav role={(profile as Profile).role} email={(profile as Profile).email} />
      <main className="flex-1 p-8 max-w-5xl">{children}</main>
    </div>
  );
}
