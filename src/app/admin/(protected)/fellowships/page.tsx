import { createClient } from '@/lib/supabase/server';
import CrudEditor from '@/components/admin/CrudEditor';
import type { Field } from '@/components/admin/FieldConfig';

const fields: Field[] = [
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'subtitle', label: 'Subtitle', type: 'text' },
  { name: 'pdf_url', label: 'PDF URL', type: 'url' },
  { name: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default async function FellowshipsAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from('fellowships').select('*').order('sort_order');
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Fellowship</h1>
      <CrudEditor table="fellowships" fields={fields} initialRows={data ?? []} titleField="title" />
    </div>
  );
}
