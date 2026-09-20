import { createClient } from '@/lib/supabase/server';
import SettingsForm from '@/components/admin/SettingsForm';

export default async function SettingsAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single();
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Site Settings</h1>
      <SettingsForm initial={data} />
    </div>
  );
}
