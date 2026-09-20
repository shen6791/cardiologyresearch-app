'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Field } from './FieldConfig';

type Row = Record<string, unknown> & { id: string };

export default function CrudEditor({
  table,
  fields,
  initialRows,
  titleField,
}: {
  table: string;
  fields: Field[];
  initialRows: Row[];
  titleField: string;
}) {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [busy, setBusy] = useState(false);
  const supabase = createClient();

  function emptyRow(): Row {
    const row: Row = { id: '' };
    fields.forEach((f) => { row[f.name] = f.type === 'checkbox' ? false : f.type === 'number' ? null : ''; });
    return row;
  }

  async function save(row: Row) {
    setBusy(true);
    const payload = { ...row };
    delete (payload as { id?: string }).id;
    if (row.id) {
      const { error } = await supabase.from(table).update(payload).eq('id', row.id);
      if (!error) setRows((rs) => rs.map((r) => (r.id === row.id ? row : r)));
    } else {
      const { data, error } = await supabase.from(table).insert(payload).select().single();
      if (!error && data) setRows((rs) => [...rs, data as Row]);
    }
    setBusy(false);
    setEditing(null);
    setCreating(false);
  }

  async function remove(id: string) {
    if (!confirm('Delete this entry? This cannot be undone.')) return;
    setBusy(true);
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) setRows((rs) => rs.filter((r) => r.id !== id));
    setBusy(false);
  }

  const activeRow = editing ?? (creating ? emptyRow() : null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <button
          onClick={() => { setCreating(true); setEditing(null); }}
          className="px-5 py-2.5 rounded-full bg-[#4fe3c1] text-[#05070c] text-sm font-semibold hover:brightness-110"
        >
          + Add new
        </button>
      </div>

      {activeRow && (
        <div className="glass rounded-2xl p-6 flex flex-col gap-4">
          {fields.map((f) => (
            <div key={f.name} className="flex flex-col gap-2">
              <label className="text-xs text-[#8a97b8]">{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  rows={4}
                  value={(activeRow[f.name] as string) ?? ''}
                  onChange={(e) => setEditingField(f.name, e.target.value)}
                  className="bg-[#0b0f1a] border border-[#1e2740] rounded-lg px-4 py-3 outline-none focus:border-[#4fe3c1]"
                />
              ) : f.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  checked={Boolean(activeRow[f.name])}
                  onChange={(e) => setEditingField(f.name, e.target.checked)}
                  className="w-5 h-5"
                />
              ) : (
                <input
                  type={f.type === 'number' ? 'number' : f.type === 'url' ? 'url' : 'text'}
                  value={(activeRow[f.name] as string | number) ?? ''}
                  onChange={(e) => setEditingField(f.name, f.type === 'number' ? Number(e.target.value) : e.target.value)}
                  className="bg-[#0b0f1a] border border-[#1e2740] rounded-lg px-4 py-3 outline-none focus:border-[#4fe3c1]"
                />
              )}
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button disabled={busy} onClick={() => save(activeRow)} className="px-5 py-2.5 rounded-full bg-[#4fe3c1] text-[#05070c] text-sm font-semibold hover:brightness-110 disabled:opacity-50">
              {busy ? 'Saving…' : 'Save'}
            </button>
            <button onClick={() => { setEditing(null); setCreating(false); }} className="px-5 py-2.5 rounded-full border border-[#1e2740] text-sm font-semibold">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {rows.map((row) => (
          <div key={row.id} className="glass rounded-xl p-5 flex items-center justify-between gap-4">
            <div className="font-medium truncate">{String(row[titleField] ?? '(untitled)')}</div>
            <div className="flex gap-3 flex-none text-sm font-semibold">
              <button onClick={() => { setEditing(row); setCreating(false); }} className="text-[#6a8cff] hover:underline">Edit</button>
              <button onClick={() => remove(row.id)} className="text-[#ff6b6b] hover:underline">Delete</button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <div className="text-sm text-[#8a97b8] text-center py-10">No entries yet.</div>}
      </div>
    </div>
  );

  function setEditingField(name: string, value: unknown) {
    const target = editing ?? emptyRow();
    const updated = { ...target, [name]: value };
    if (editing) setEditing(updated);
    else { setCreating(true); setEditing(updated); }
  }
}
