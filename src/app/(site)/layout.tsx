import { createClient } from '@/lib/supabase/server';
import type { SiteSettings } from '@/lib/types';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PdfModalProvider from '@/components/PdfModalProvider';
import ScrollToTop from '@/components/ScrollToTop';

export const revalidate = 0;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('site_settings').select('*').eq('id', 1).single();
  const s = settings as SiteSettings | null;

  return (
    <PdfModalProvider>
      <SiteHeader doctorName={s?.doctor_name ?? 'Dr. Faslur Rahuman'} />
      <main>{children}</main>
      <SiteFooter doctorName={s?.doctor_name ?? 'Dr. Faslur Rahuman'} email={s?.contact_email ?? 'csthcardioresearch@gmail.com'} />
      <ScrollToTop />
    </PdfModalProvider>
  );
}
