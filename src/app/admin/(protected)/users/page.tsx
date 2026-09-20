import { createClient } from '@/lib/supabase/server';
import UsersEditor from '@/components/admin/UsersEditor';
import { redirect } from 'next/navigation';

export default async function UsersAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: myProfile } = await supabase.from('profiles').select('role').eq('id', user!.id).single();
  if (myProfile?.role !== 'super_admin') redirect('/admin');

  const [{ data: profiles }, { data: invites }] = await Promise.all([
    supabase.from('profiles').select('*').order('created_at'),
    supabase.from('admin_invites').select('*').order('created_at'),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Admin Accounts</h1>
      <UsersEditor initialProfiles={profiles ?? []} initialInvites={invites ?? []} currentUserId={user!.id} />
    </div>
  );
}
