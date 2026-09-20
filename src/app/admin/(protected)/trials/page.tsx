import { createClient } from '@/lib/supabase/server';
import CrudEditor from '@/components/admin/CrudEditor';
import type { Field } from '@/components/admin/FieldConfig';

const fields: Field[] = [
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'link_label', label: 'Link Label', type: 'text' },
  { name: 'link_url', label: 'Link URL', type: 'url' },
  { name: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default async function TrialsAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from('clinical_trials').select('*').order('sort_order');
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Clinical Trials</h1>
      <CrudEditor table="clinical_trials" fields={fields} initialRows={data ?? []} titleField="title" />
    </div>
  );
}
