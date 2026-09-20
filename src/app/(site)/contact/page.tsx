import { createClient } from '@/lib/supabase/server';
import type { SiteSettings } from '@/lib/types';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';

export const metadata = { title: 'Contact — Dr. Faslur Rahuman' };

export default async function ContactPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('site_settings').select('*').eq('id', 1).single();
  const s = settings as SiteSettings;

  return (
    <div>
      <PageHeader eyebrow="Get in touch" title="Contact" sub="Send a message directly, or reach out by email." />
      <div className="max-w-5xl mx-auto px-6 pb-24 grid md:grid-cols-[1fr_1.4fr] gap-8">
        <Reveal>
          <div className="card-lift border border-[#e6e3db] rounded-2xl p-8 h-fit">
            <div className="font-display font-semibold text-lg">{s.doctor_name}</div>
            <div className="text-sm text-[#6b6a63] mt-1 mb-6">Ceylon Cardiology Research</div>
            <a href={`mailto:${s.contact_email}`} className="btn-lift inline-block px-6 py-3 rounded-md bg-[#4a5d23] text-white font-medium text-sm">
              Email {s.contact_email}
            </a>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  );
}
