import { createClient } from '@/lib/supabase/server';
import PresentationsEditor from '@/components/admin/PresentationsEditor';

export default async function PresentationsAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from('presentations').select('*, presentation_links(*)').order('sort_order');
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Presentations &amp; Posters</h1>
      <PresentationsEditor initial={data ?? []} />
    </div>
  );
}
