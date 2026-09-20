'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Profile, AdminInvite, AppRole } from '@/lib/types';

export default function UsersEditor({ initialProfiles, initialInvites, currentUserId }: { initialProfiles: Profile[]; initialInvites: AdminInvite[]; currentUserId: string }) {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [invites, setInvites] = useState<AdminInvite[]>(initialInvites);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<AppRole>('admin');
  const [busy, setBusy] = useState(false);
  const supabase = createClient();

  async function sendInvite(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { data, error } = await supabase.from('admin_invites').insert({ email, role, invited_by: currentUserId }).select().single();
    setBusy(false);
    if (!error && data) {
      setInvites((i) => [...i, data as AdminInvite]);
      setEmail('');
    }
  }

  async function revokeInvite(inviteEmail: string) {
    await supabase.from('admin_invites').delete().eq('email', inviteEmail);
    setInvites((i) => i.filter((x) => x.email !== inviteEmail));
  }

  async function changeRole(id: string, newRole: AppRole) {
    await supabase.from('profiles').update({ role: newRole }).eq('id', id);
    setProfiles((p) => p.map((x) => (x.id === id ? { ...x, role: newRole } : x)));
  }

  async function revokeAccess(id: string) {
    if (!confirm('Remove this admin\'s access to the panel? Their login will remain but lose all admin rights.')) return;
    await supabase.from('profiles').delete().eq('id', id);
    setProfiles((p) => p.filter((x) => x.id !== id));
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="border border-[var(--border)] bg-[var(--bg)] rounded-2xl p-7 flex flex-col gap-4">
        <div className="font-display font-medium">Invite a new admin</div>
        <p className="text-sm text-[var(--muted)]">Enter the email address of the person you want to give access to. They then sign up at <span className="text-white">/admin/signup</span> with that exact email and are automatically granted the role below.</p>
        <form onSubmit={sendInvite} className="flex gap-3 flex-wrap items-end">
          <div className="flex flex-col gap-2 flex-1 min-w-52">
            <label className="text-xs text-[var(--muted)]">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)]" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-[var(--muted)]">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value as AppRole)}
              className="bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--accent)]">
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>
          <button disabled={busy} className="px-6 py-3 rounded-full bg-[var(--accent)] text-[var(--bg)] font-semibold text-sm hover:brightness-110 disabled:opacity-50">
            Send Invite
          </button>
        </form>
      </div>

      {invites.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="text-xs text-[var(--muted)] uppercase tracking-wide">Pending invites</div>
          {invites.map((inv) => (
            <div key={inv.email} className="border border-[var(--border)] bg-[var(--bg)] rounded-xl p-4 flex items-center justify-between">
              <div className="text-sm">{inv.email} <span className="text-[var(--accent)] ml-2">{inv.role}</span></div>
              <button onClick={() => revokeInvite(inv.email)} className="text-[var(--danger)] text-sm font-semibold">Revoke</button>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="text-xs text-[var(--muted)] uppercase tracking-wide">Active admins</div>
        {profiles.map((p) => (
          <div key={p.id} className="border border-[var(--border)] bg-[var(--bg)] rounded-xl p-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="text-sm">{p.email} {p.id === currentUserId && <span className="text-[var(--muted)]">(you)</span>}</div>
            <div className="flex items-center gap-3">
              <select value={p.role} onChange={(e) => changeRole(p.id, e.target.value as AppRole)} disabled={p.id === currentUserId}
                className="bg-[var(--bg-soft)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--accent)] disabled:opacity-50">
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
              {p.id !== currentUserId && (
                <button onClick={() => revokeAccess(p.id)} className="text-[var(--danger)] text-sm font-semibold">Revoke Access</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
