import { createClient } from '@supabase/supabase-js';
import fs from 'node:fs';

const env = fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf8');
const get = (k) => env.match(new RegExp(`^${k}=(.*)$`, 'm'))?.[1]?.trim() ?? '';
const url = get('NEXT_PUBLIC_SUPABASE_URL');
const serviceKey = get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });

async function main() {
  // Storage bucket for PDFs / images
  const { data: buckets } = await supabase.storage.listBuckets();
  if (!buckets?.find((b) => b.name === 'media')) {
    const { error } = await supabase.storage.createBucket('media', { public: true, fileSizeLimit: '20MB' });
    if (error) throw error;
    console.log('created bucket: media');
  } else {
    console.log('bucket already exists: media');
  }

  // Seed site settings
  await supabase.from('site_settings').update({
    doctor_name: 'Dr. Faslur Rahuman',
    tagline: 'Advancing interventional cardiology through evidence.',
    bio_intro: 'Dr. Faslur Rahuman is a full-time General and Interventional Cardiologist, working at the Colombo South Teaching Hospital and in leading private hospitals in Colombo. He has worked across several hospitals in Sri Lanka, contributing to the development of cardiology units and healthcare services.',
    bio_body: 'His research interest centres on interventional and diagnostic cardiology — exploring innovative solutions, driving evidence-based practice, and pushing the boundaries of current medical treatment. He has published in peer-reviewed journals, presented free papers at local and international forums, and served as a principal investigator for the GMRx2 International Multicenter Randomized Trial on a three-drug combination for hypertension, with most participants from Sri Lanka.',
    photo_url: '/dr-rahuman.png',
  }).eq('id', 1);
  console.log('seeded site_settings');

  const publications = [
    { title: 'Regulate Exercise ECG Program - Role of Exercise ECG in the Assessment of Coronary Artery Disease in a Tertiary Care Hospital in Sri Lanka', publisher: 'Annals of Clinical Case Reports', year: 2024, full_article_url: 'https://cardiologyresearch.clinsystem.com/', pdf_url: 'https://cardiologyresearch.clinsystem.com/', sort_order: 1 },
    { title: 'Outcome of early intervention for acute ST elevation myocardial infarction in a tertiary care cardiac centre in Sri Lanka.', publisher: 'Ceylon Medical Journal', year: 2016, full_article_url: 'https://cardiologyresearch.clinsystem.com/', pdf_url: 'https://cardiologyresearch.clinsystem.com/', sort_order: 2 },
    { title: 'A comparison of rescue and primary percutaneous coronary interventions for acute ST elevation myocardial infarction', publisher: 'Indian Heart Journal', year: 2017, full_article_url: 'https://www.sciencedirect.com/science/article/pii/S0019483217301372', pdf_url: 'https://cardiologyresearch.clinsystem.com/Angioplasty,%20Infarction,%20Reperfusion', sort_order: 3 },
    { title: 'Clinical Characteristics, Procedural Details, and Outcomes of Patients Who Underwent Percutaneous Coronary Intervention in Real-world Practice at a Tertiary Care Center in Sri Lanka', publisher: 'Journal of Indian College of Cardiology', year: 2023, full_article_url: 'https://journals.lww.com/jicc/fulltext/2023/13040/clinical_characteristics,_procedural_details,_and.6.aspx', pdf_url: 'https://journals.lww.com/jicc/_layouts/15/oaks.journals/downloadpdf.aspx?trckng_src_pg=ArticleViewer&an=02065251-202313040-00006', sort_order: 4 },
    { title: 'Clinical and Angiographic Pattern of Coronary Artery Disease in a Urban Sri Lankan Population', publisher: 'International Journal of Cardiology and Cardiovascular Disorder', year: 2024, full_article_url: 'https://unisciencepub.com/wp-content/uploads/2024/06/Clinical-and-Angiographic-Pattern-of-Coronary-Artery-Disease-in-a-Urban-Sri-Lankan-Population.pdf', pdf_url: 'https://unisciencepub.com/wp-content/uploads/2024/06/Clinical-and-Angiographic-Pattern-of-Coronary-Artery-Disease-in-a-Urban-Sri-Lankan-Population.pdf', sort_order: 5 },
  ];
  await supabase.from('publications').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('publications').insert(publications);
  console.log('seeded publications');

  await supabase.from('clinical_trials').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('clinical_trials').insert([{
    title: 'GMRx2 International Multicenter Randomized Trial',
    description: 'Principal investigator for a three-drug combination trial for hypertension — encompassing both active-controlled and placebo-controlled arms, with the majority of participants recruited from Sri Lanka.',
    link_label: 'Read in The Lancet',
    link_url: 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(24)01744-6/abstract',
    sort_order: 1,
  }]);
  console.log('seeded clinical_trials');

  const presentations = [
    { title: 'Clinical Characteristics, Procedural Details, and Outcomes of Patients Who Underwent Percutaneous Coronary Intervention in Real-World Practice at a Tertiary Care Centre in Sri Lanka', presented_at: 'Ceylon College of Physicians - 57th Anniversary Annual Academic Sessions 2024', sort_order: 1, links: ['https://docs.google.com/presentation/d/1y-ME7na7-eYgdFM5yqjeb_oHhnbskS6O/edit#slide=id.p1'] },
    { title: 'Clinical and angiographic pattern of coronary artery disease in a Sri Lankan population', presented_at: 'Ceylon College of Physicians', sort_order: 2, links: ['https://drive.google.com/file/d/1remGgQm-H_eiCo88klOFPojebma8Cqgh/view'] },
    { title: 'Outcome of patients undergoing early coronary intervention for the treatment of acute ST elevation myocardial infarction in a tertiary care cardiac centre in Sri Lanka', presented_at: 'SLMA 2015', sort_order: 3, links: ['https://drive.google.com/file/d/1WH9OzKJqz27jf2cj9yMS7fI-2v5svL1K/view'] },
    { title: 'Clinical Characteristics, Procedural Details, and Outcomes of Patients Who Underwent Percutaneous Coronary Intervention in Real-world Practice at a Tertiary Care Center in Sri Lanka', presented_at: '2nd World Congress on May 09-10, 2024 Bangkok, Thailand', sort_order: 4, links: [
      'https://drive.google.com/file/d/1WH9OzKJqz27jf2cj9yMS7fI-2v5svL1K/view',
      'https://www.heartcongress.scientexconference.com/pastconference/may2024/gallery#gallery-16',
      'https://drive.google.com/file/d/11cRmlLkcG-1gv6gMIyKcGATKYB2FbqQP/view',
      'https://cardiologyresearch.clinsystem.com/fgdfgh',
    ] },
  ];
  await supabase.from('presentation_links').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('presentations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  for (const p of presentations) {
    const { data, error } = await supabase.from('presentations').insert({ title: p.title, presented_at: p.presented_at, sort_order: p.sort_order }).select().single();
    if (error) throw error;
    const links = p.links.map((url, i) => ({ presentation_id: data.id, label: 'Show', url, sort_order: i + 1 }));
    await supabase.from('presentation_links').insert(links);
  }
  console.log('seeded presentations');

  await supabase.from('fellowships').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('fellowships').insert([{
    title: 'Fellow of the American College of Cardiology',
    subtitle: 'FACC',
    pdf_url: 'https://cardiologyresearch.clinsystem.com/resources/fellowship/FACC.pdf',
    sort_order: 1,
  }]);
  console.log('seeded fellowships');

  console.log('DONE');
}

main().catch((e) => { console.error(e); process.exit(1); });
