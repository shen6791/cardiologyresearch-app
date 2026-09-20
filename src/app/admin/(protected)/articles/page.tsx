import { createClient } from '@/lib/supabase/server';
import CrudEditor from '@/components/admin/CrudEditor';
import type { Field } from '@/components/admin/FieldConfig';

const fields: Field[] = [
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'body', label: 'Body', type: 'textarea' },
  { name: 'cover_url', label: 'Cover Image URL', type: 'url' },
  { name: 'published', label: 'Published', type: 'checkbox' },
  { name: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default async function ArticlesAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from('articles').select('*').order('sort_order');
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Articles</h1>
      <CrudEditor table="articles" fields={fields} initialRows={data ?? []} titleField="title" />
    </div>
  );
}
