import { createClient } from '@/lib/supabase/server';
import MessagesList from '@/components/admin/MessagesList';

export default async function MessagesAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Contact Messages</h1>
      <MessagesList initial={data ?? []} />
    </div>
  );
}
