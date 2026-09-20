import { createClient } from '@/lib/supabase/server';
import CrudEditor from '@/components/admin/CrudEditor';
import type { Field } from '@/components/admin/FieldConfig';

const fields: Field[] = [
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'video_url', label: 'Embed URL (e.g. YouTube embed link)', type: 'url' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'published', label: 'Published', type: 'checkbox' },
  { name: 'sort_order', label: 'Sort Order', type: 'number' },
];

export default async function VideosAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from('videos').select('*').order('sort_order');
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold">Videos</h1>
      <CrudEditor table="videos" fields={fields} initialRows={data ?? []} titleField="title" />
    </div>
  );
}
