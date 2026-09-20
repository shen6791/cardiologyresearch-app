import { createClient } from '@/lib/supabase/server';
import type { SiteSettings } from '@/lib/types';
import PageHeader from '@/components/PageHeader';

export const metadata = { title: 'Contact — Dr. Faslur Rahuman' };

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('site_settings').select('*').eq('id', 1).single();
  const s = settings as SiteSettings;

  return (
    <div>
      <PageHeader eyebrow="Get in touch" title="Contact" />
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="border border-[#e6e3db] rounded-lg p-8 max-w-lg">
          <div className="font-display font-semibold text-lg">{s.doctor_name}</div>
          <div className="text-sm text-[#6b6a63] mt-1 mb-6">Ceylon Cardiology Research</div>
          <a href={`mailto:${s.contact_email}`} className="inline-block px-6 py-3 rounded-md bg-[#0f5d52] text-white font-medium text-sm hover:bg-[#0c4a41] transition">
            Email {s.contact_email}
          </a>
        </div>
      </div>
    </div>
  );
}
