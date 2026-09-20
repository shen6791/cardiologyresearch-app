import { createClient } from '@/lib/supabase/server';
import CrudEditor from '@/components/admin/CrudEditor';
import type { Field } from '@/components/admin/FieldConfig';

const fields: Field[] = [
  { name: 'title', label: 'Title', type: 'textarea' },
  { name: 'publisher', label: 'Publisher', type: 'text' },
  { name: 'year', label: 'Year', type: 'number' },
  { name: 'full_article_url', label: 'Full Article URL', type: 'url' },
  { name: 'pdf_url', label: 'PDF URL', type: 'url' },
  { name: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default async function PublicationsAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from('publications').select('*').order('sort_order');
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Publications</h1>
      <CrudEditor table="publications" fields={fields} initialRows={data ?? []} titleField="title" />
    </div>
  );
}
